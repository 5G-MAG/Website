#!/usr/bin/env node
// Interim local-only tool: edit every Hub page's HubHero title and intro
// (topic-lead) paragraph from one browser page instead of hunting through
// each src/pages/*/index.js file. Not part of the built site — run it
// separately (`node scripts/hub-title-editor.js`) while `npm run start` is
// running, and the Docusaurus dev server will hot-reload each page as soon
// as this tool saves its file. Safe to delete once no longer needed.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 4001;

const HUB_PAGES = [
  { key: 'about', label: 'About Us', file: 'src/pages/about/index.js' },
  { key: 'membership', label: 'Membership', file: 'src/pages/membership/index.js' },
  { key: 'tech', label: 'Explainers & Profiles', file: 'src/pages/tech/index.js' },
  { key: 'standards', label: 'Feedback & Requirements', file: 'src/pages/standards/index.js' },
  { key: 'demos', label: 'Interop & Demos', file: 'src/pages/demos/index.js' },
  { key: 'testbeds', label: 'Testbeds', file: 'src/pages/testbeds/index.js' },
  {
    key: 'reference-tools',
    label: 'Reference Tools',
    file: 'src/pages/reference-tools/index.js',
  },
  { key: 'applications', label: 'Applications', file: 'src/pages/applications/index.js' },
  { key: 'developer', label: 'Software Accelerator', file: 'src/pages/developer/index.js' },
  { key: 'news', label: 'News', file: 'src/pages/news/index.js' },
  { key: 'events', label: 'Events', file: 'src/pages/events/index.js' },
];

// Matches from the HubHero JSX tag up to its first title="..." attribute,
// non-greedy so it can't run past this component's own title into some
// later, unrelated title= elsewhere in the file.
const HERO_TITLE_RE = /(<HubHero[\s\S]*?title=")([^"]*)(")/;

// Every Hub page has exactly one topic-lead paragraph (the intro line
// ported out of HubHero's old description prop), right below the hero.
const LEAD_RE = /(<p className="topic-lead">)([\s\S]*?)(<\/p>)/;

function decodeEntities(s) {
  return s
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function encodeEntities(s) {
  return s.replace(/&/g, '&amp;').replace(/'/g, '&apos;');
}

function readMatch(file, re) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const m = src.match(re);
  return m ? m[2] : null;
}

function readTitle(file) {
  return readMatch(file, HERO_TITLE_RE);
}

function readLead(file) {
  const raw = readMatch(file, LEAD_RE);
  return raw === null ? null : decodeEntities(raw);
}

function writeTitle(file, newTitle) {
  const full = path.join(ROOT, file);
  const src = fs.readFileSync(full, 'utf8');
  if (!HERO_TITLE_RE.test(src)) throw new Error(`No HubHero title found in ${file}`);
  const escaped = newTitle.replace(/\\/g, '\\\\').replace(/"/g, '&quot;');
  const updated = src.replace(HERO_TITLE_RE, (_, pre, _old, post) => `${pre}${escaped}${post}`);
  fs.writeFileSync(full, updated, 'utf8');
}

function writeLead(file, newLead) {
  const full = path.join(ROOT, file);
  const src = fs.readFileSync(full, 'utf8');
  if (!LEAD_RE.test(src)) throw new Error(`No topic-lead paragraph found in ${file}`);
  const escaped = encodeEntities(newLead.trim());
  const updated = src.replace(LEAD_RE, (_, pre, _old, post) => `${pre}${escaped}${post}`);
  fs.writeFileSync(full, updated, 'utf8');
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPage() {
  const rows = HUB_PAGES.map((p) => {
    let title = '';
    let lead = '';
    let error = '';
    try {
      title = readTitle(p.file);
      lead = readLead(p.file);
    } catch (e) {
      error = e.message;
    }
    return `
      <section class="card" data-key="${p.key}">
        <div class="card__meta">
          <span class="card__label">${escapeHtml(p.label)}</span>
          <span class="card__file">${escapeHtml(p.file)}</span>
        </div>
        ${
          error
            ? `<p class="card__error">${escapeHtml(error)}</p>`
            : `
        <div class="preview">
          <div class="preview__title" id="preview-title-${p.key}">${escapeHtml(title)}</div>
        </div>
        <form class="card__form" data-key="${p.key}" data-field="title">
          <label>Title</label>
          <input
            type="text"
            name="value"
            value="${escapeHtml(title)}"
            oninput="document.getElementById('preview-title-${p.key}').textContent = this.value"
          />
          <button type="submit">Save</button>
          <span class="card__status"></span>
        </form>
        <div class="preview__lead" id="preview-lead-${p.key}">${escapeHtml(lead)}</div>
        <form class="card__form" data-key="${p.key}" data-field="lead">
          <label>Intro</label>
          <textarea
            name="value"
            rows="2"
            oninput="document.getElementById('preview-lead-${p.key}').textContent = this.value"
          >${escapeHtml(lead)}</textarea>
          <button type="submit">Save</button>
          <span class="card__status"></span>
        </form>
        `
        }
      </section>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Hub page titles &amp; intros — interim editor</title>
<style>
  :root { color-scheme: light dark; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    max-width: 780px;
    margin: 2.5rem auto;
    padding: 0 1.25rem 4rem;
    color: #1c2530;
    background: #f6f8fa;
  }
  h1 { font-size: 1.4rem; margin-bottom: 0.25rem; }
  p.lede { color: #55606b; margin-top: 0; margin-bottom: 2rem; font-size: 0.95rem; }
  .card {
    background: #fff;
    border: 1px solid #e1e6ea;
    border-radius: 10px;
    padding: 1rem 1.1rem;
    margin-bottom: 0.9rem;
  }
  .card__meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.6rem; }
  .card__label { font-weight: 700; font-size: 0.95rem; }
  .card__file { font-size: 0.75rem; color: #8894a0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .card__error { color: #b3261e; font-size: 0.85rem; }
  .preview {
    background: linear-gradient(to right, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.18) 100%), linear-gradient(to right, #003580 0%, #00a0d2 100%);
    padding: 0.85rem 1rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
  .preview__title { color: #fff; font-weight: 700; font-size: 1.15rem; }
  .preview__lead {
    font-size: 0.85rem;
    line-height: 1.5;
    color: #33404a;
    background: #eef1f4;
    border-left: 3px solid #00a0d2;
    border-radius: 6px;
    padding: 0.55rem 0.75rem;
    margin: 0 0 0.6rem;
  }
  .card__form { display: flex; gap: 0.5rem; align-items: flex-start; margin-bottom: 0.7rem; }
  .card__form label {
    flex-shrink: 0;
    width: 2.6rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #8894a0;
    padding-top: 0.5rem;
  }
  .card__form input, .card__form textarea {
    flex: 1;
    padding: 0.45rem 0.6rem;
    border-radius: 6px;
    border: 1px solid #cbd3d9;
    font-size: 0.9rem;
    font-family: inherit;
    resize: vertical;
  }
  .card__form button {
    padding: 0.45rem 0.9rem;
    border-radius: 6px;
    border: none;
    background: #00589e;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.85rem;
    height: fit-content;
  }
  .card__form button:hover { background: #003580; }
  .card__status { font-size: 0.8rem; color: #2a9d4a; padding-top: 0.5rem; }
  @media (prefers-color-scheme: dark) {
    body { background: #14181c; color: #e7ebef; }
    .card { background: #1d2227; border-color: #2c333a; }
    .card__file { color: #8b98a4; }
    .preview__lead { background: #202832; color: #cfd8e0; }
    .card__form input, .card__form textarea { background: #14181c; color: #e7ebef; border-color: #3a4149; }
  }
</style>
</head>
<body>
  <h1>Hub page titles &amp; intros</h1>
  <p class="lede">Interim tool — edits write directly to each page's source file; the dev server hot-reloads automatically.</p>
  ${rows}
  <script>
    document.querySelectorAll('form.card__form').forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const key = form.dataset.key;
        const field = form.dataset.field;
        const value = form.querySelector('[name="value"]').value;
        const status = form.querySelector('.card__status');
        status.textContent = 'Saving…';
        try {
          const res = await fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, field, value }),
          });
          if (!res.ok) throw new Error(await res.text());
          status.textContent = 'Saved ✓';
          setTimeout(() => { status.textContent = ''; }, 2000);
        } catch (err) {
          status.textContent = 'Error: ' + err.message;
        }
      });
    });
  </script>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderPage());
    return;
  }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { key, field, value } = JSON.parse(body);
        const page = HUB_PAGES.find((p) => p.key === key);
        if (!page) throw new Error(`Unknown page key: ${key}`);
        if (typeof value !== 'string' || !value.trim()) throw new Error('Value cannot be empty');
        if (field === 'title') writeTitle(page.file, value);
        else if (field === 'lead') writeLead(page.file, value);
        else throw new Error(`Unknown field: ${field}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(e.message);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Hub title/intro editor running at http://localhost:${PORT}`);
});
