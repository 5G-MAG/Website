#!/usr/bin/env node
// Refreshes static/data/site-stats.json: the headline counts shown on the
// homepage and in the stat rows of About/Developer/Membership/Standards
// (via src/data/facts.js), so no page carries a hand-copied number.
//
//   repositories    repositories that belong to a project page in
//                   taxonomy.json (each project's `repos` plus its
//                   repoMetadata group), public and Early Access (private),
//                   archived ones excluded. Pseudo-projects without a
//                   doc_url ("Dependency", website/org infrastructure) are
//                   not projects and do not count.
//   clones          sum of total_clones in community-stats.json, deduplicated
//                   by repo and without the repos the Community dashboard
//                   also leaves out (src/data/notOnHubDashboard.json). Run
//                   this after fetch-community-stats.js.
//   specIssues      issues (open and closed) in 5G-MAG/Standards.
//   sdoInputs       rows sent by 5G-MAG in the LS tables on
//                   docs/home/standards/ls.mdx (3GPP, MPEG) plus the distinct
//                   workshop inputs on docs/home/standards/requirements.mdx.
//
// A count that cannot be computed keeps its previous value and the script
// exits non-zero, so a failed run never publishes a wrong number (or 0).
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, 'static', 'data', 'site-stats.json');
const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const readJson = (rel) => JSON.parse(read(rel));

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-site-stats-script',
        Accept: 'application/vnd.github+json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    };
    https
      .get(options, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          if (res.statusCode !== 200) return reject(new Error(`${urlPath}: HTTP ${res.statusCode}`));
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

const repoSlug = (r) => (typeof r === 'string' ? r : r.repo_slug || r.name || r.repo);

async function repositories() {
  const tax = readJson('src/data/taxonomy.json');
  const meta = new Map();
  const names = new Set();
  for (const p of tax.projects) {
    if (!p.doc_url) continue;
    const slug = p.doc_url.replace(/\/$/, '').split('/').pop();
    for (const r of p.repos || []) names.add(repoSlug(r).toLowerCase());
    for (const r of tax.repoMetadata[slug] || []) {
      names.add(repoSlug(r).toLowerCase());
      meta.set(repoSlug(r).toLowerCase(), r);
    }
  }
  // Visibility and archive state come from GitHub when the token can list the
  // org's private repos; otherwise from taxonomy.json's own `public` flags.
  let gh = null;
  if (TOKEN) {
    try {
      const all = [];
      for (let page = 1; page < 10; page++) {
        const batch = await apiGet(`/orgs/${ORG}/repos?type=all&per_page=100&page=${page}`);
        all.push(...batch);
        if (batch.length < 100) break;
      }
      if (all.some((r) => r.private)) gh = new Map(all.map((r) => [r.name.toLowerCase(), r]));
    } catch (e) {
      console.warn(`repositories: GitHub listing failed (${e.message}); using taxonomy.json flags`);
    }
  }
  let pub = 0;
  let early = 0;
  for (const n of names) {
    if (gh) {
      const r = gh.get(n);
      if (!r || r.archived) continue;
      if (r.private) early++;
      else pub++;
    } else {
      const m = meta.get(n);
      if (!m || typeof m.public !== 'boolean') throw new Error(`repositories: no public flag for ${n}`);
      if (m.public) pub++;
      else early++;
    }
  }
  if (pub + early === 0) throw new Error('repositories: counted 0');
  return { total: pub + early, public: pub, earlyAccess: early, source: gh ? 'github' : 'taxonomy' };
}

function clones() {
  const stats = readJson('static/data/community-stats.json');
  const skip = new Set(readJson('src/data/notOnHubDashboard.json'));
  const byRepo = new Map();
  for (const p of stats.projects) for (const r of p.repos || []) byRepo.set(r.repo, r);
  let total = 0;
  for (const [repo, r] of byRepo) if (!skip.has(repo)) total += r.total_clones || 0;
  if (!total) throw new Error('clones: counted 0');
  return total;
}

async function specIssues() {
  const res = await apiGet(`/search/issues?q=${encodeURIComponent(`repo:${ORG}/Standards is:issue`)}&per_page=1`);
  if (!res.total_count) throw new Error('specIssues: counted 0');
  return res.total_count;
}

function sdoInputs() {
  // Every "<SDO>: Incoming / Outgoing LS and Inputs" table (3GPP, MPEG, ...),
  // rows sent by 5G-MAG ("Out" or "In/Out"), plus each distinct workshop
  // document on the requirements page (a tile and a figure can link the same one).
  const ls = read('docs/home/standards/ls.mdx');
  const sections = ls.split(/\n(?=## )/).filter((sec) => /^## .*: Incoming \/ Outgoing LS and Inputs/.test(sec));
  if (!sections.length) throw new Error('sdoInputs: no "Incoming / Outgoing LS and Inputs" table found');
  // One input counts once: an LS sent to several groups appears as one row per
  // group (each with its own Tdoc number) but is one document. Key = year +
  // title; titles can contain brackets ("[SD] ..."), so the title is the
  // cell's link text up to the "](http" that starts its URL. MPEG
  // contributions carry their m-number in the title, so recurring titles
  // at different meetings stay separate.
  const out = new Set(
    sections
      .flatMap((sec) => sec.split('\n'))
      .filter((l) => /^\|\s*\d{4}\s*\|\s*(Out|In\/Out)\s*\|/.test(l))
      .map((l) => {
        const cells = l.split('|').map((c) => c.trim());
        const title = cells[4].replace(/\]\(https?:[^)]*\).*$/, '').replace(/^\[/, '');
        return `${cells[1]}|${title.toLowerCase().replace(/\s+/g, ' ')}`;
      })
  ).size;
  const req = read('docs/home/standards/requirements.mdx');
  const ws = req.split(/\n(?=## )/).find((sec) => sec.startsWith('## Inputs to 3GPP Workshops'));
  if (!ws) throw new Error('sdoInputs: workshop inputs heading not found');
  const docs = new Set(
    [...ws.matchAll(/<a href="([^"]+)"[^>]*class="community-tile"/g)].map((m) => m[1].split('/').pop())
  );
  if (!out || !docs.size) throw new Error(`sdoInputs: counted ${out} LS rows and ${docs.size} workshop inputs`);
  return out + docs.size;
}

(async () => {
  const previous = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, 'utf8')) : {};
  const next = { ...previous };
  let failed = false;
  const steps = { repositories, clones, specIssues, sdoInputs };
  for (const [key, fn] of Object.entries(steps)) {
    try {
      next[key] = await fn();
      console.log(`${key}: ${JSON.stringify(next[key])}`);
    } catch (e) {
      failed = true;
      console.error(`${key}: ${e.message}; keeping ${JSON.stringify(previous[key])}`);
    }
  }
  next.updated_at = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  fs.writeFileSync(OUTPUT, JSON.stringify(next, null, 2) + '\n');
  if (failed) process.exit(1);
})();
