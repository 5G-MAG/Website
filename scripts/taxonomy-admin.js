#!/usr/bin/env node
// Local-only tool: edit src/data/taxonomy.json -- baskets, projects and
// their repo assignments -- from one browser page instead of hand-editing
// JSON. Deliberately split into three separate tabs matching the order
// someone actually works in: name the baskets, then name/place the
// projects, then assign repos to a project. Repos are editable ONLY on the
// Repositories tab -- there is no second, competing place to touch a
// project's repo list, so "what is what" stays obvious.
//
// Not part of the built site -- run separately (`npm run taxonomy-admin`)
// any time you want to review or edit the taxonomy; no need to also run
// `npm run start`. Every edit writes straight to taxonomy.json on disk;
// commit it like any other change. One file, one entry point: baskets and
// projects used to be two separate JSON files -- merged so there is only
// ever one file to open, edit or commit for the whole taxonomy.
//
// The Repositories tab holds no file of its own: which repos exist, and
// whether each is private/archived, is GitHub's state, not this repo's, so
// it is fetched live from `gh repo list` on every page load and on
// "Refresh" -- never cached to a second JSON file.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 4002;
const TAXONOMY_FILE = path.join(ROOT, 'src/data/taxonomy.json');

// Independent ticks, not a single ordinal value: a project reaching
// "Advanced" does not imply every earlier stage was actually done the
// same way (e.g. it may have skipped a separate technical-analysis
// write-up). Each key is its own boolean on project.stages.
const STAGE_OPTIONS = [
  { key: 'under-study', label: 'Under Study' },
  { key: 'technical-analysis', label: 'Technical Analysis' },
  { key: 'basic', label: 'Basic' },
  { key: 'advanced', label: 'Mature' },
  { key: 'showcase', label: 'Showcase' },
];
const SDO_SUGGESTIONS = ['3GPP', 'MPEG (ISO/IEC)', 'IETF', 'DVB', 'IEEE', 'W3C', 'CAMARA', 'ETSI'];

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Atomic: write to a sibling temp file, then rename over the target, so a
// process killed mid-write can never leave the real file half-written.
function writeJSON(file, data) {
  const tmp = `${file}.tmp${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n', 'utf8');
  fs.renameSync(tmp, file);
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function sendJSON(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function renderPage() {
  const taxonomy = readJSON(TAXONOMY_FILE);
  const projects = taxonomy.projects;
  const baskets = taxonomy.baskets;
  const iconCatalog = taxonomy.iconCatalog || {};
  const repoMetadata = taxonomy.repoMetadata || {};
  const initial = JSON.stringify({ projects, baskets, iconCatalog, repoMetadata }).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>5G-MAG taxonomy admin</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #ffffff; --surface: #ffffff; --bg-mist: #f2f7fb;
    --ink: #0b1b33; --ink-soft: #4a5b73; --ink-faint: #7889a0;
    --line: #dbe5ee; --line-strong: #b9c9da; --navy: #003580; --cyan: #00a0d2; --cyan-dark: #007a9e;
    --good-bg: #eaf7ee; --good-ink: #1c6b3a;
    --danger: #b3261e; --danger-bg: #fdecea;
    --shadow: 0 1px 2px rgba(11,27,51,0.06), 0 8px 24px rgba(11,27,51,0.06);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0e1420; --surface: #161d2c; --bg-mist: #131a27;
      --ink: #eef3f9; --ink-soft: #b2c2d8; --ink-faint: #7f93ad;
      --line: #26324a; --line-strong: #34435f; --navy: #6d9ce8; --cyan: #34bbea; --cyan-dark: #7fd8f2;
      --good-bg: #103322; --good-ink: #7fd9a0;
      --danger: #ff8a80; --danger-bg: #3a1614;
      --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.35);
    }
  }
  * { box-sizing: border-box; }
  body {
    background: var(--bg); color: var(--ink);
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    margin: 0; padding-inline: 20px; padding-block: 32px 64px;
  }
  .wrap { max-width: 900px; margin: 0 auto; }
  .eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--cyan-dark); }
  h1 { text-wrap: balance; font-size: clamp(1.5rem, 4vw, 1.9rem); font-weight: 700; margin: 8px 0 0; color: var(--navy); }
  .lead { max-width: 680px; line-height: 1.6; color: var(--ink-soft); margin-top: 10px; font-size: 0.92rem; }
  .lead code { background: var(--bg-mist); border-radius: 4px; padding: 1px 5px; font-size: 0.87em; }

  .status-banner {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--good-bg); color: var(--good-ink);
    border-radius: 999px; padding: 5px 12px; font-size: 0.78rem; font-weight: 600;
    margin-top: 14px; opacity: 0; transition: opacity 0.3s ease;
  }
  .status-banner.show { opacity: 1; }
  .status-banner.error { background: var(--danger-bg); color: var(--danger); }

  .step-bar { display: flex; gap: 8px; margin-top: 22px; flex-wrap: wrap; }
  .step-btn {
    font-size: 0.86rem; font-weight: 600; color: var(--ink-soft); font-family: inherit;
    background: var(--surface); border: 1px solid var(--line); border-radius: 999px; cursor: pointer;
    padding: 8px 16px;
  }
  .step-btn.active { color: #fff; background: var(--navy); border-color: var(--navy); }
  .step-hint { font-size: 0.84rem; color: var(--ink-soft); margin-top: 12px; padding: 10px 14px; background: var(--bg-mist); border-radius: 10px; border-left: 3px solid var(--cyan); }

  .list { margin-top: 18px; border: 1px solid var(--line); border-radius: 14px; background: var(--surface); box-shadow: var(--shadow); overflow: hidden; }

  .basket-row { display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-bottom: 1px solid var(--line); }
  .basket-row:last-child { border-bottom: none; }
  .basket-title-input {
    font-size: 1rem; font-weight: 700; color: var(--navy); font-family: inherit;
    background: var(--bg-mist); border: 1px solid var(--line); border-radius: 7px;
    padding: 7px 10px; flex: 1; min-width: 0;
  }
  .basket-title-input:focus { border-color: var(--cyan); outline: none; }
  .basket-count { font-size: 0.7rem; font-weight: 700; color: var(--ink-faint); white-space: nowrap; font-variant-numeric: tabular-nums; }

  .project-row { border-bottom: 1px solid var(--line); padding: 12px 18px; }
  .project-row:last-child { border-bottom: none; }
  .project-row-main { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .field { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .field label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-faint); }
  .field input[type="text"], .field select {
    font-size: 0.85rem; color: var(--ink); font-family: inherit;
    background: var(--bg-mist); border: 1px solid var(--line); border-radius: 7px;
    padding: 7px 9px;
  }
  .field input[type="text"]:focus, .field select:focus { border-color: var(--cyan); outline: none; }
  .field.display-name { flex: 1 1 220px; }
  .field.display-name input { font-weight: 600; font-size: 0.92rem; background: var(--surface); border-color: var(--line-strong); }
  .field.basket-pick { flex: 0 1 190px; }
  .field.stable-name input { color: var(--ink-faint); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.72rem; }

  .row-actions { display: flex; gap: 6px; margin-left: auto; }
  .icon-picker { display: flex; align-items: center; gap: 6px; }
  .icon-preview { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 6px; background: var(--bg-mist); border: 1px solid var(--line); color: var(--navy); flex: 0 0 auto; }
  .icon-empty { font-size: 0.7rem; color: var(--ink-faint); }
  .icon-picker select { flex: 1 1 100px; min-width: 0; }
  .icon-btn {
    font-size: 0.72rem; font-weight: 700; color: var(--ink-faint); font-family: inherit;
    background: none; border: none; cursor: pointer; padding: 6px 8px; border-radius: 6px; white-space: nowrap;
  }
  .icon-btn:hover { color: var(--cyan-dark); background: var(--bg-mist); }
  .icon-btn.danger:hover:not(:disabled) { color: var(--danger); background: var(--danger-bg); }
  .icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .advanced { margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--line); display: none; flex-direction: column; gap: 10px; }
  .advanced.show { display: flex; }
  .advanced-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .advanced-row .field { flex: 1 1 150px; }

  .chip-row { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
  .chip {
    display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; font-weight: 600;
    background: var(--bg-mist); border: 1px solid var(--line); border-radius: 999px; padding: 3px 6px 3px 10px;
  }
  .chip.repo { color: var(--cyan-dark); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .chip.sdo { color: var(--navy); border-color: var(--line-strong); }
  .chip.contributor { color: var(--ink-soft); }

  .stage-ticks { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 14px; margin-top: 10px; }
  .stage-tick { display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; color: var(--ink-soft); cursor: pointer; }
  .stage-tick input { cursor: pointer; }
  .stage-group { display: inline-flex; align-items: center; gap: 4px 10px; flex-wrap: wrap; padding: 3px 10px 3px 8px; border: 1px dashed var(--line-strong); border-radius: 999px; }
  .stage-group-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--cyan-dark); }

  .board-row { display: flex; align-items: baseline; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .board-row > .field-label { flex: 0 0 90px; }
  .chip button {
    font-size: 0.85rem; line-height: 1; color: var(--ink-faint); background: none;
    border: none; cursor: pointer; padding: 0 2px; font-family: inherit;
  }
  .chip button:hover { color: var(--danger); }
  .chip-add {
    font-size: 0.72rem; color: var(--ink); font-family: inherit;
    background: var(--surface); border: 1px dashed var(--line-strong); border-radius: 999px;
    padding: 3px 10px; width: 170px;
  }
  .chip-add:focus { border-color: var(--cyan); outline: none; }

  .related-row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
  .related-toggle { font-size: 0.72rem; font-weight: 600; color: var(--cyan-dark); background: none; border: none; cursor: pointer; padding: 2px 0; font-family: inherit; }
  .related-chips { display: flex; flex-wrap: wrap; gap: 5px; }
  .related-chip {
    font-size: 0.68rem; font-weight: 600; border-radius: 999px; padding: 3px 9px; cursor: pointer;
    border: 1px solid var(--line); background: var(--surface); color: var(--ink-soft); font-family: inherit;
  }
  .related-chip.active { background: var(--navy); color: #fff; border-color: var(--navy); }

  .add-row-btn {
    font-size: 0.82rem; font-weight: 600; color: var(--cyan-dark); font-family: inherit;
    background: var(--surface); border: 1px dashed var(--line-strong); border-radius: 10px;
    padding: 10px; width: 100%; cursor: pointer; text-align: center; margin-top: 10px;
  }
  .add-row-btn:hover { background: var(--bg-mist); }

  .repo-row { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-bottom: 1px solid var(--line); flex-wrap: wrap; }
  .repo-row:last-child { border-bottom: none; }
  .repo-row.unassigned { background: var(--danger-bg); }
  .repo-row.multi-icon { background: var(--good-bg); }
  .repo-icons { display: inline-flex; align-items: center; gap: 2px; flex: 0 0 auto; color: var(--navy); }
  .repo-icons .icon-empty { color: var(--ink-faint); }
  .repo-icons .multi-flag { font-size: 0.62rem; font-weight: 700; color: var(--good-ink); margin-left: 2px; cursor: help; }
  .repo-name { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.82rem; font-weight: 600; color: var(--ink); flex: 0 0 auto; }
  .repo-dispname { font-size: 0.8rem; color: var(--ink); font-family: inherit; background: var(--bg-mist); border: 1px solid var(--line); border-radius: 7px; padding: 5px 8px; flex: 1 1 160px; min-width: 0; }
  .repo-dispname:focus { border-color: var(--cyan); outline: none; }
  .repo-badge { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; border-radius: 5px; padding: 2px 6px; color: var(--ink-faint); background: var(--bg-mist); border: 1px solid var(--line); }
  .repo-assignments { display: flex; flex-wrap: wrap; gap: 5px; flex: 1 1 100%; min-width: 0; }
  .unassigned-label { font-size: 0.72rem; font-weight: 700; color: var(--danger); }
  .assign-select { font-size: 0.78rem; color: var(--ink); font-family: inherit; background: var(--surface); border: 1px dashed var(--line-strong); border-radius: 999px; padding: 3px 8px; flex: 0 0 auto; }
  .repo-meta-note { padding: 12px 16px; font-size: 0.78rem; color: var(--ink-faint); line-height: 1.6; }
  .repo-tab-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin-top: 4px; flex-wrap: wrap; }
  .refresh-btn {
    font-size: 0.78rem; font-weight: 600; color: var(--cyan-dark); font-family: inherit;
    background: var(--surface); border: 1px solid var(--line-strong); border-radius: 999px;
    padding: 5px 12px; cursor: pointer;
  }
  .refresh-btn:hover { background: var(--bg-mist); }
  .fetched-at { font-size: 0.76rem; color: var(--ink-faint); }

  footer.close { border-top: 1px solid var(--line); padding-top: 18px; margin-top: 30px; color: var(--ink-soft); font-size: 0.82rem; line-height: 1.6; }
  footer.close b { color: var(--ink); }
  footer.close code { background: var(--bg-mist); border-radius: 4px; padding: 1px 5px; font-size: 0.9em; }
</style>
</head>
<body>
<div class="wrap">
  <div class="eyebrow">5G-MAG &middot; taxonomy admin</div>
  <h1>Baskets, Projects &amp; Repos</h1>
  <p class="lead">Three separate steps, in order. Edits write straight to <code>src/data/taxonomy.json</code> on disk.</p>
  <div class="status-banner" id="statusBanner">Saved</div>

  <datalist id="sdoOptions">
    ${SDO_SUGGESTIONS.map((s) => `<option value="${escapeHtml(s)}"></option>`).join('\n    ')}
  </datalist>

  <div class="step-bar">
    <button type="button" class="step-btn active" data-step="baskets">1. Baskets</button>
    <button type="button" class="step-btn" data-step="projects">2. Projects</button>
    <button type="button" class="step-btn" data-step="repos">3. Repositories</button>
  </div>

  <div id="stepBaskets">
    <p class="step-hint">A basket is a topic group (e.g. &ldquo;5G Broadcast&rdquo;). Just names here &mdash; projects go in step 2.</p>
    <div class="list" id="basketList"></div>
    <button class="add-row-btn" id="addBasketBtn" type="button">+ Add a basket</button>
  </div>

  <div id="stepProjects" hidden>
    <p class="step-hint">A project is one topic page (e.g. &ldquo;5G Media Streaming&rdquo;). Pick its basket here, or &ldquo;Not a topic&rdquo; to exclude it from the diagram. Repos are assigned in step 3, not here.</p>
    <div class="list" id="projectList"></div>
    <button class="add-row-btn" id="addProjectBtn" type="button">+ Add a project</button>
  </div>

  <div id="stepRepos" hidden>
    <p class="step-hint">Every repository in the 5G-MAG GitHub org. Assign an unassigned one to a project on the right; unassign by clicking a chip's &times;. Set its display name in the text box (this is what shows on its Reference Tools page). Its icon on the left is inherited live from the project(s) it is assigned to (change it on the Projects tab) &mdash; a &#9888; means it is assigned to more than one project with different icons and has no single right answer; use the small dropdown next to the icon to manually pick one for cases like that (&ldquo;inherit&rdquo; clears the override).</p>
    <div class="repo-tab-head">
      <span class="fetched-at" id="fetchedAt"></span>
      <button type="button" class="refresh-btn" id="refreshReposBtn">Refresh from GitHub</button>
    </div>
    <div class="list" id="repoList"></div>
  </div>

  <footer class="close">
    <b>Saves directly to disk on every change</b> -- commit <code>src/data/taxonomy.json</code> like any other edit. Reload this page any time to confirm what's on disk.
  </footer>
</div>

<script>
window.__INITIAL__ = ${initial};
window.__STAGE_OPTIONS__ = ${JSON.stringify(STAGE_OPTIONS)};
</script>
<script src="/app.js"></script>
</body>
</html>`;
}

function renderClientScript() {
  return `(function () {
  var basketListEl = document.getElementById('basketList');
  var projectListEl = document.getElementById('projectList');
  var repoListEl = document.getElementById('repoList');
  var banner = document.getElementById('statusBanner');
  var addBasketBtn = document.getElementById('addBasketBtn');
  var addProjectBtn = document.getElementById('addProjectBtn');
  var stepBaskets = document.getElementById('stepBaskets');
  var stepProjects = document.getElementById('stepProjects');
  var stepRepos = document.getElementById('stepRepos');
  var fetchedAtEl = document.getElementById('fetchedAt');
  var refreshReposBtn = document.getElementById('refreshReposBtn');

  var STAGE_OPTIONS = window.__STAGE_OPTIONS__;
  var projects = window.__INITIAL__.projects;
  var baskets = window.__INITIAL__.baskets;
  var iconCatalog = window.__INITIAL__.iconCatalog;
  var repoMetadata = window.__INITIAL__.repoMetadata;
  var repoCatalog = null;
  var repoCatalogError = null;
  var saveTimer = null;
  var openAdvanced = {};

  function flashSaved(label, isError) {
    banner.textContent = label || 'Saved';
    banner.classList.toggle('error', !!isError);
    banner.classList.add('show');
    clearTimeout(banner._t);
    banner._t = setTimeout(function () { banner.classList.remove('show'); }, isError ? 3000 : 1400);
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function slugify(text, existingKeys) {
    var base = text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
    var key = base, n = 2;
    while (existingKeys.indexOf(key) !== -1) { key = base + '-' + n; n++; }
    return key;
  }
  function repoLabel(r) { return typeof r === 'string' ? r : (r.name + '@' + r.branch); }
  function reposFor(project) {
    return (project.repos || []).map(function (r) { return typeof r === 'string' ? r : r.name; });
  }
  function iconSvg(key, size) {
    var paths = key && iconCatalog[key];
    if (!paths) return '<span class="icon-empty">&mdash;</span>';
    var inner = paths.map(function (d) { return '<path d="' + d + '"></path>'; }).join('');
    return '<svg width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }
  function iconPickerHtml(idx, currentKey) {
    var options = '<option value="">&mdash; none &mdash;</option>' + Object.keys(iconCatalog).sort().map(function (key) {
      return '<option value="' + key + '"' + (key === currentKey ? ' selected' : '') + '>' + key + '</option>';
    }).join('');
    return (
      '<div class="icon-picker">' +
        '<span class="icon-preview" data-icon-preview="' + idx + '">' + iconSvg(currentKey) + '</span>' +
        '<select class="f-icon" data-idx="' + idx + '">' + options + '</select>' +
      '</div>'
    );
  }
  function assignmentsFor(repoName) {
    return projects.filter(function (p) { return reposFor(p).indexOf(repoName) !== -1; });
  }

  // repoMetadata is grouped by an arbitrary key (historically one per
  // project, but never guaranteed 1:1) -- search every group for the
  // repo_slug rather than assuming which group it lives in.
  function repoMetaEntry(repoName) {
    for (var group in repoMetadata) {
      var arr = repoMetadata[group];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].repo_slug === repoName) return arr[i];
      }
    }
    return null;
  }
  // A repo assigned to a project but never fetched/described yet (e.g. just
  // assigned on this tab) has no repoMetadata entry at all -- create a
  // minimal stub, grouped under the repo's own slug, the first time its
  // display name is edited, rather than silently discarding the edit.
  function ensureRepoMetaEntry(repoName) {
    var existing = repoMetaEntry(repoName);
    if (existing) return existing;
    var entry = {
      repo_slug: repoName, display_name: '', description: '',
      repo_url: 'https://github.com/5G-MAG/' + repoName, branch: 'main',
      license: null, standards: [], dependencies: [], software: [],
      public: true, is_auxiliary: null,
    };
    repoMetadata[repoName] = [entry];
    return entry;
  }
  // A repo's icon is inherited live from whichever project(s) it is
  // assigned to, same master-file rule as everywhere else on this site --
  // UNLESS its repoMetadata entry carries an explicit "icon" override. That
  // only exists for a repo genuinely shared by several projects with no
  // single natural owner (e.g. rt-libflute, used by three), where someone
  // had to make a deliberate call rather than have one get picked by
  // array order; setting it here silences the ambiguity warning below.
  function iconsForRepo(repoName) {
    var meta = repoMetaEntry(repoName);
    if (meta && meta.icon) return [meta.icon];
    var keys = [];
    assignmentsFor(repoName).forEach(function (p) {
      if (p.icon && keys.indexOf(p.icon) === -1) keys.push(p.icon);
    });
    return keys;
  }

  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: projects, baskets: baskets, repoMetadata: repoMetadata }),
      }).then(function (res) {
        if (!res.ok) return res.text().then(function (t) { throw new Error(t); });
        flashSaved();
      }).catch(function (e) { flashSaved('Save failed: ' + e.message, true); });
    }, 400);
  }

  function basketOptionsHtml(currentKey) {
    var opts = baskets.map(function (b) {
      return '<option value="' + b.key + '"' + (b.key === currentKey ? ' selected' : '') + '>' + escapeHtml(b.title) + '</option>';
    }).join('');
    return opts + '<option value=""' + (currentKey ? '' : ' selected') + '>&mdash; Not a topic &mdash;</option>';
  }
  // Basic and Mature (data key still "advanced") are the two grades of one
  // "Software" milestone -- shown on the public Where We Stand chart as a
  // single "Software" column, not two separate ones (raised directly: with
  // no grouping shown here, a Basic/Mature checkbox pair reads as two
  // unrelated stages instead of one "is there software yet, and how far"
  // question). Wrapped in its own labeled pill so that grouping is visible
  // here too, not just on the public chart.
  function tickHtml(idx, o, stages) {
    var checked = !!stages[o.key];
    return '<label class="stage-tick"><input type="checkbox" class="f-stage" data-idx="' + idx + '" data-stage="' + o.key + '"' + (checked ? ' checked' : '') + '> ' + o.label + '</label>';
  }
  function stageTicksHtml(idx, stages) {
    stages = stages || {};
    var byKey = {};
    STAGE_OPTIONS.forEach(function (o) { byKey[o.key] = o; });
    var parts = [];
    parts.push(tickHtml(idx, byKey['under-study'], stages));
    parts.push(tickHtml(idx, byKey['technical-analysis'], stages));
    parts.push(
      '<span class="stage-group"><span class="stage-group-label">Software</span>' +
      tickHtml(idx, byKey['basic'], stages) +
      tickHtml(idx, byKey['advanced'], stages) +
      '</span>'
    );
    parts.push(tickHtml(idx, byKey['showcase'], stages));
    return parts.join('');
  }

  // ---- Step 1: Baskets (title only) ----
  function renderBaskets() {
    var counts = {};
    projects.forEach(function (p) { if (p.basket) counts[p.basket] = (counts[p.basket] || 0) + 1; });
    basketListEl.innerHTML = baskets.map(function (b) {
      var n = counts[b.key] || 0;
      return (
        '<div class="basket-row">' +
          '<input type="text" class="basket-title-input f-basket-title" data-key="' + b.key + '" value="' + escapeHtml(b.title) + '">' +
          '<span class="basket-count">' + n + (n === 1 ? ' project' : ' projects') + '</span>' +
          '<button type="button" class="icon-btn danger" data-delete-basket="' + b.key + '"' + (n ? ' disabled title="Move its projects out first (step 2)"' : '') + '>Delete</button>' +
        '</div>'
      );
    }).join('');
  }

  // ---- Step 2: Projects (name + basket; repos live only in step 3) ----
  function projectRowHtml(p, idx) {
    var adv = !!openAdvanced[idx];
    var sdos = p.sdos || [];
    var sdoChips = sdos.map(function (s, i) {
      return '<span class="chip sdo">' + escapeHtml(s) + '<button type="button" data-remove-sdo="' + idx + '" data-sdo-index="' + i + '">&times;</button></span>';
    }).join('');
    var contributors = p.contributors || [];
    var contributorChips = contributors.map(function (c, i) {
      return '<span class="chip contributor">' + escapeHtml(c) + '<button type="button" data-remove-contributor="' + idx + '" data-contributor-index="' + i + '">&times;</button></span>';
    }).join('');
    var otherBaskets = baskets.filter(function (b) { return b.key !== p.basket; });
    var relatedB = p.relatedBaskets || [];
    var basketChips = otherBaskets.map(function (b) {
      var active = relatedB.indexOf(b.key) !== -1;
      return '<button type="button" class="related-chip' + (active ? ' active' : '') + '" data-project="' + idx + '" data-related-basket="' + b.key + '">' + escapeHtml(b.title) + '</button>';
    }).join('');
    var relatedP = p.relatedProjects || [];
    var projectChips = projects.map(function (op, opIdx) {
      if (opIdx === idx) return '';
      var active = relatedP.indexOf(op.name) !== -1;
      return '<button type="button" class="related-chip' + (active ? ' active' : '') + '" data-project="' + idx + '" data-related-project="' + escapeHtml(op.name) + '">' + escapeHtml(op.displayName || op.name) + '</button>';
    }).join('');
    var repoCount = (p.repos || []).length;

    return (
      '<div class="project-row" data-project-idx="' + idx + '">' +
        '<div class="project-row-main">' +
          '<div class="field display-name"><label>Project name</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="displayName" value="' + escapeHtml(p.displayName || '') + '" placeholder="' + escapeHtml(p.name) + '"></div>' +
          '<div class="field basket-pick"><label>Basket</label><select class="f-basket" data-idx="' + idx + '">' + basketOptionsHtml(p.basket) + '</select></div>' +
          '<div class="field small"><label>Icon</label>' + iconPickerHtml(idx, p.icon) + '</div>' +
          '<div class="row-actions">' +
            '<button type="button" class="icon-btn" data-toggle-advanced="' + idx + '">' + (adv ? 'Less \\u25be' : 'More \\u25b8') + '</button>' +
            '<button type="button" class="icon-btn danger" data-delete-project="' + idx + '">Delete</button>' +
          '</div>' +
        '</div>' +
        '<div class="stage-ticks">' + stageTicksHtml(idx, p.stages) + '</div>' +
        '<div class="link-row">' +
          '<div class="field"><label>doc_url (reference-tools/testbed)</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="doc_url" value="' + escapeHtml(p.doc_url || '') + '"></div>' +
          '<div class="field"><label>tech_url</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="tech_url" value="' + escapeHtml(p.tech_url || '') + '"></div>' +
          '<div class="field"><label>standards_url</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="standards_url" value="' + escapeHtml(p.standards_url || '') + '"></div>' +
        '</div>' +
        '<div class="board-row"><span class="field-label">SDO</span>' +
          '<div class="chip-row">' + sdoChips + '<input type="text" class="chip-add" list="sdoOptions" placeholder="+ SDO" data-add-sdo="' + idx + '"></div>' +
        '</div>' +
        '<div class="board-row"><span class="field-label">Contributors</span>' +
          '<div class="chip-row">' + contributorChips + '<input type="text" class="chip-add" placeholder="+ contributor" data-add-contributor="' + idx + '"></div>' +
        '</div>' +
        '<div class="advanced' + (adv ? ' show' : '') + '" data-advanced="' + idx + '">' +
          '<div class="advanced-row">' +
            '<div class="field stable-name"><label>Name (stable key &mdash; careful)</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="name" value="' + escapeHtml(p.name) + '"></div>' +
            '<div class="field"><label>Tagline</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="tagline" value="' + escapeHtml(p.tagline || '') + '"></div>' +
          '</div>' +
          (!p.basket ? '<div class="advanced-row"><div class="field"><label>Why excluded</label><input type="text" class="f-field" data-idx="' + idx + '" data-field="excludedReason" value="' + escapeHtml(p.excludedReason || '') + '"></div></div>' : '') +
          '<div class="related-row">' +
            '<button type="button" class="related-toggle" data-toggle="relb-' + idx + '">' + (relatedB.length ? 'Also basket: ' + relatedB.map(function (k) { var b = baskets.find(function (x) { return x.key === k; }); return b ? escapeHtml(b.title) : k; }).join(', ') : '+ also relates to another basket') + '</button>' +
            '<div class="related-chips" data-chips="relb-' + idx + '" hidden>' + basketChips + '</div>' +
          '</div>' +
          '<div class="related-row">' +
            '<button type="button" class="related-toggle" data-toggle="relp-' + idx + '">' + (relatedP.length ? 'Built on: ' + relatedP.join(', ') : '+ built on another project\\u2019s repo') + '</button>' +
            '<div class="related-chips" data-chips="relp-' + idx + '" hidden>' + projectChips + '</div>' +
          '</div>' +
          '<p style="font-size:0.76rem;color:var(--ink-faint);margin:0;">' + repoCount + (repoCount === 1 ? ' repo' : ' repos') + ' assigned &mdash; edit those on the <b>3. Repositories</b> tab.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderProjects() {
    var order = projects.map(function (p, idx) { return idx; })
      .sort(function (a, b) { return (projects[a].displayName || projects[a].name).localeCompare(projects[b].displayName || projects[b].name); });
    projectListEl.innerHTML = order.map(function (idx) { return projectRowHtml(projects[idx], idx); }).join('');
  }

  // ---- Step 3: Repositories ----
  function projectPickerOptions(excludeIdx) {
    var exclude = excludeIdx || [];
    return '<option value="">+ assign to another project&hellip;</option>' + projects
      .map(function (p, idx) { return { p: p, idx: idx }; })
      .filter(function (x) { return exclude.indexOf(x.idx) === -1; })
      .sort(function (a, b) { return (a.p.displayName || a.p.name).localeCompare(b.p.displayName || b.p.name); })
      .map(function (x) { return '<option value="' + x.idx + '">' + escapeHtml(x.p.displayName || x.p.name) + '</option>'; })
      .join('');
  }
  function repoRowHtml(repo) {
    var assigned = assignmentsFor(repo.name);
    var assignedIdx = assigned.map(function (p) { return projects.indexOf(p); });
    var badges = (repo.private ? '<span class="repo-badge">private</span>' : '') + (repo.archived ? '<span class="repo-badge">archived</span>' : '');
    var chips = assigned.map(function (p) {
      var idx = projects.indexOf(p);
      return '<span class="chip repo">' + escapeHtml(p.displayName || p.name) + '<button type="button" data-unassign-repo="' + escapeHtml(repo.name) + '" data-unassign-idx="' + idx + '">&times;</button></span>';
    }).join('');
    var meta = repoMetaEntry(repo.name);
    var override = meta ? meta.icon : null;
    var iconKeys = iconsForRepo(repo.name);
    var multi = !override && iconKeys.length > 1;
    var iconHtml = iconKeys.length === 0
      ? '<span class="icon-empty">&mdash;</span>'
      : iconKeys.map(function (k) { return iconSvg(k, 18); }).join('');
    var iconTitle = override
      ? 'Manually set to ' + override + ' (overrides inheritance -- pick "inherit" in the dropdown to remove)'
      : multi
      ? 'Belongs to ' + assigned.length + ' projects with different icons (' + iconKeys.join(', ') + ') -- pick one below if they should share a single icon'
      : (iconKeys.length ? 'Inherited from ' + (assigned[0].displayName || assigned[0].name) : 'No project has an icon assigned yet');
    var overrideOptions = '<option value="">&mdash; inherit &mdash;</option>' + Object.keys(iconCatalog).sort().map(function (key) {
      return '<option value="' + key + '"' + (key === override ? ' selected' : '') + '>' + key + '</option>';
    }).join('');
    var dispName = meta ? (meta.display_name || '') : '';
    // The picker to add ANOTHER project always shows, even once assigned --
    // a repo like rt-common-shared genuinely belongs to many projects at
    // once, so assigning it once must never remove the ability to assign
    // it again.
    var body = '<div class="repo-assignments">' + chips + (assigned.length ? '' : '<span class="unassigned-label">Unassigned</span>') + '</div>' +
      '<select class="assign-select" data-assign-repo="' + escapeHtml(repo.name) + '">' + projectPickerOptions(assignedIdx) + '</select>';
    return (
      '<div class="repo-row' + (assigned.length ? '' : ' unassigned') + (multi ? ' multi-icon' : '') + '">' +
        '<span class="repo-icons" title="' + escapeHtml(iconTitle) + '">' + iconHtml + (multi ? '<span class="multi-flag">&#9888;</span>' : '') + '</span>' +
        '<select class="assign-select f-repo-icon-override" data-repo="' + escapeHtml(repo.name) + '" title="Manually pick this repo\\'s icon instead of inheriting it">' + overrideOptions + '</select>' +
        '<span class="repo-name">' + escapeHtml(repo.name) + '</span>' + badges +
        '<input type="text" class="repo-dispname f-repo-dispname" data-repo="' + escapeHtml(repo.name) + '" placeholder="Display name" value="' + escapeHtml(dispName) + '">' +
        body +
      '</div>'
    );
  }
  function renderRepos() {
    if (repoCatalogError) {
      repoListEl.innerHTML = '<div class="repo-meta-note"><b>Could not load repositories:</b> ' + escapeHtml(repoCatalogError) + '</div>';
      fetchedAtEl.textContent = '';
      return;
    }
    if (!repoCatalog) {
      repoListEl.innerHTML = '<div class="repo-meta-note">Loading repositories from GitHub&hellip;</div>';
      fetchedAtEl.textContent = '';
      return;
    }
    var sorted = repoCatalog.repos.slice()
      .sort(function (a, b) { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
    repoListEl.innerHTML = sorted.map(repoRowHtml).join('');
    fetchedAtEl.textContent = 'Repository list as of ' + new Date(repoCatalog.fetchedAt).toLocaleString();
  }

  function loadRepoCatalog() {
    repoCatalogError = null;
    renderRepos();
    return fetch('/api/repos').then(function (res) {
      if (!res.ok) return res.text().then(function (t) { throw new Error(t); });
      return res.json();
    }).then(function (catalog) {
      repoCatalog = catalog;
      renderRepos();
      wireEvents();
    }).catch(function (e) {
      repoCatalogError = e.message;
      renderRepos();
    });
  }

  function renderAll() {
    renderBaskets();
    renderProjects();
    renderRepos();
    wireEvents();
  }

  function wireEvents() {
    document.querySelectorAll('.f-basket-title').forEach(function (el) {
      el.addEventListener('input', function () {
        var key = el.getAttribute('data-key');
        var b = baskets.find(function (x) { return x.key === key; });
        b.title = el.value;
        persist();
        renderProjects();
      });
    });
    document.querySelectorAll('[data-delete-basket]').forEach(function (el) {
      el.addEventListener('click', function () {
        if (el.disabled) return;
        var key = el.getAttribute('data-delete-basket');
        baskets = baskets.filter(function (b) { return b.key !== key; });
        persist();
        renderAll();
      });
    });
    document.querySelectorAll('.f-field').forEach(function (el) {
      el.addEventListener('input', function () {
        var idx = parseInt(el.getAttribute('data-idx'), 10), field = el.getAttribute('data-field');
        projects[idx][field] = field === 'name' ? el.value : (el.value || null);
        persist();
      });
    });
    document.querySelectorAll('.f-basket').forEach(function (el) {
      el.addEventListener('change', function () {
        var idx = parseInt(el.getAttribute('data-idx'), 10);
        projects[idx].basket = el.value || null;
        persist();
        renderAll();
      });
    });
    document.querySelectorAll('.f-icon').forEach(function (el) {
      el.addEventListener('change', function () {
        var idx = parseInt(el.getAttribute('data-idx'), 10);
        var key = el.value || null;
        projects[idx].icon = key;
        var preview = document.querySelector('[data-icon-preview="' + idx + '"]');
        if (preview) preview.innerHTML = iconSvg(key);
        persist();
      });
    });
    document.querySelectorAll('.f-stage').forEach(function (el) {
      el.addEventListener('change', function () {
        var idx = parseInt(el.getAttribute('data-idx'), 10), key = el.getAttribute('data-stage');
        var p = projects[idx];
        p.stages = p.stages || {};
        p.stages[key] = el.checked;
        persist();
      });
    });
    document.querySelectorAll('[data-toggle-advanced]').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = el.getAttribute('data-toggle-advanced');
        openAdvanced[idx] = !openAdvanced[idx];
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-remove-sdo]').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-remove-sdo'), 10), i = parseInt(el.getAttribute('data-sdo-index'), 10);
        projects[idx].sdos.splice(i, 1);
        persist();
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-add-sdo]').forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        var idx = parseInt(el.getAttribute('data-add-sdo'), 10);
        var val = el.value.trim();
        if (!val) return;
        var cur = projects[idx].sdos || [];
        if (cur.indexOf(val) !== -1) { el.value = ''; return; }
        projects[idx].sdos = cur.concat([val]);
        persist();
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-remove-contributor]').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-remove-contributor'), 10), i = parseInt(el.getAttribute('data-contributor-index'), 10);
        projects[idx].contributors.splice(i, 1);
        persist();
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-add-contributor]').forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        var idx = parseInt(el.getAttribute('data-add-contributor'), 10);
        var val = el.value.trim();
        if (!val) return;
        var cur = projects[idx].contributors || [];
        if (cur.indexOf(val) !== -1) { el.value = ''; return; }
        projects[idx].contributors = cur.concat([val]);
        persist();
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-toggle]').forEach(function (el) {
      el.addEventListener('click', function () {
        var chips = document.querySelector('[data-chips="' + el.getAttribute('data-toggle') + '"]');
        if (chips) chips.hidden = !chips.hidden;
      });
    });
    document.querySelectorAll('.related-chip[data-related-basket]').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-project'), 10), key = el.getAttribute('data-related-basket');
        var cur = projects[idx].relatedBaskets || [];
        projects[idx].relatedBaskets = cur.indexOf(key) === -1 ? cur.concat([key]) : cur.filter(function (k) { return k !== key; });
        openAdvanced[idx] = true;
        persist();
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('.related-chip[data-related-project]').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-project'), 10), name = el.getAttribute('data-related-project');
        var cur = projects[idx].relatedProjects || [];
        projects[idx].relatedProjects = cur.indexOf(name) === -1 ? cur.concat([name]) : cur.filter(function (k) { return k !== name; });
        openAdvanced[idx] = true;
        persist();
        renderProjects();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-delete-project]').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-delete-project'), 10);
        projects.splice(idx, 1);
        persist();
        renderAll();
      });
    });
    document.querySelectorAll('.f-repo-dispname').forEach(function (el) {
      el.addEventListener('input', function () {
        var repoName = el.getAttribute('data-repo');
        var entry = ensureRepoMetaEntry(repoName);
        entry.display_name = el.value;
        persist();
      });
    });
    document.querySelectorAll('.f-repo-icon-override').forEach(function (el) {
      el.addEventListener('change', function () {
        var repoName = el.getAttribute('data-repo');
        var entry = ensureRepoMetaEntry(repoName);
        entry.icon = el.value || null;
        persist();
        renderRepos();
        wireEvents();
      });
    });
    document.querySelectorAll('[data-assign-repo]').forEach(function (el) {
      el.addEventListener('change', function () {
        var repoName = el.getAttribute('data-assign-repo'), idx = el.value;
        if (idx === '') return;
        idx = parseInt(idx, 10);
        projects[idx].repos = (projects[idx].repos || []).concat([repoName]);
        persist();
        renderAll();
      });
    });
    document.querySelectorAll('[data-unassign-repo]').forEach(function (el) {
      el.addEventListener('click', function () {
        var repoName = el.getAttribute('data-unassign-repo'), idx = parseInt(el.getAttribute('data-unassign-idx'), 10);
        projects[idx].repos = (projects[idx].repos || []).filter(function (r) { return (typeof r === 'string' ? r : r.name) !== repoName; });
        persist();
        renderAll();
      });
    });
  }

  document.querySelectorAll('.step-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.step-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
      var step = btn.getAttribute('data-step');
      stepBaskets.hidden = step !== 'baskets';
      stepProjects.hidden = step !== 'projects';
      stepRepos.hidden = step !== 'repos';
    });
  });

  addBasketBtn.addEventListener('click', function () {
    var title = prompt('New basket name:');
    if (!title) return;
    var key = slugify(title, baskets.map(function (b) { return b.key; }));
    baskets.push({ key: key, title: title });
    persist();
    renderAll();
  });
  addProjectBtn.addEventListener('click', function () {
    var name = prompt('New project name:');
    if (!name) return;
    projects.push({
      name: name, basket: null, excludedReason: '', repos: [], sdos: [], contributors: [], stages: {},
      doc_url: null, tech_url: null, standards_url: null, tagline: ''
    });
    persist();
    renderAll();
  });
  refreshReposBtn.addEventListener('click', function () {
    refreshReposBtn.disabled = true;
    refreshReposBtn.textContent = 'Refreshing\\u2026';
    loadRepoCatalog().finally(function () {
      refreshReposBtn.disabled = false;
      refreshReposBtn.textContent = 'Refresh from GitHub';
    });
  });

  renderAll();
  loadRepoCatalog();
})();
`;
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderPage());
    return;
  }

  if (req.method === 'GET' && req.url === '/app.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
    res.end(renderClientScript());
    return;
  }

  if (req.method === 'POST' && req.url === '/api/save') {
    readBody(req).then((body) => {
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (e) {
        return sendJSON(res, 400, { error: 'Invalid JSON body' });
      }
      const { projects, baskets, repoMetadata } = parsed;
      if (!Array.isArray(projects) || !Array.isArray(baskets) || typeof repoMetadata !== 'object' || repoMetadata === null) {
        return sendJSON(res, 400, { error: 'Expected { projects: [...], baskets: [...], repoMetadata: {...} }' });
      }
      try {
        // repoMetadata's per-repo license/description/standards detail (for
        // <ProjectRepositories>) is now editable here too (display_name),
        // so it is written from the client's copy like the rest -- but
        // iconCatalog is not part of this page's editable state (the icon
        // picker only ever reads it), so that one still comes fresh off
        // disk rather than the in-memory copy, which could be stale if the
        // page has been open a long time.
        const current = readJSON(TAXONOMY_FILE);
        writeJSON(TAXONOMY_FILE, {
          baskets,
          projects,
          repoMetadata,
          iconCatalog: current.iconCatalog,
        });
      } catch (e) {
        return sendJSON(res, 500, { error: `Write failed: ${e.message}` });
      }
      sendJSON(res, 200, { ok: true });
    }).catch((e) => sendJSON(res, 500, { error: e.message }));
    return;
  }

  if (req.method === 'GET' && req.url === '/api/repos') {
    try {
      const out = execFileSync(
        'gh',
        ['repo', 'list', '5G-MAG', '--limit', '200', '--json', 'name,isPrivate,isArchived'],
        { encoding: 'utf8' }
      );
      const raw = JSON.parse(out);
      const repos = raw.map((r) => ({ name: r.name, private: r.isPrivate, archived: r.isArchived }));
      sendJSON(res, 200, { fetchedAt: new Date().toISOString(), repos });
    } catch (e) {
      sendJSON(res, 500, { error: `Could not run 'gh repo list' -- is the GitHub CLI installed and authenticated? (${e.message})` });
    }
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Taxonomy admin running at http://localhost:${PORT}`);
  console.log('Edits write straight to src/data/taxonomy.json.');
});
