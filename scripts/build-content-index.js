#!/usr/bin/env node
// Writes static/data/content-index.json: every documentation page (docs/home and docs/tech) with its address, title and
// description, read from the front matter. The Tutorials index and the All content page are drawn from it, so a new tutorial
// or page shows up there by itself. Run before every build and start (see package.json); the file is not committed.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const SOURCES = [
  { dir: 'docs/home', base: '' },
  { dir: 'docs/tech', base: '/tech' },
];

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (/\.mdx?$/.test(e.name) && !e.name.startsWith('_')) yield full;
  }
}

function frontMatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  try {
    return yaml.load(m[1]) || {};
  } catch (e) {
    return {};
  }
}

const pages = [];
for (const { dir, base } of SOURCES) {
  const abs = path.join(ROOT, dir);
  for (const file of walk(abs)) {
    const fm = frontMatter(file);
    if (fm.draft || fm.unlisted) continue;
    const rel = path.relative(abs, file).replace(/\.mdx?$/, '').split(path.sep);
    const name = rel[rel.length - 1];
    const folder = rel.slice(0, -1);
    // Docusaurus: index.md, README.md and a file named like its folder stand for the folder itself.
    const dirParts = name === 'index' || name.toLowerCase() === 'readme' || name === folder[folder.length - 1] ? folder : rel;
    let url;
    if (fm.slug) url = fm.slug.startsWith('/') ? fm.slug : '/' + [...folder, fm.slug].join('/');
    else url = '/' + dirParts.join('/');
    url = (base + (url === '/' ? '' : url)).replace(/\/+/g, '/') || '/';
    if (!url.endsWith('/')) url += '/';
    const h1 = (fs.readFileSync(file, 'utf8').match(/^<h1>(.*?)<\/h1>/m) || [])[1];
    pages.push({ url, title: fm.sidebar_label || fm.title || h1 || name, description: fm.description || '' });
  }
}
pages.sort((a, b) => a.url.localeCompare(b.url));
fs.mkdirSync(path.join(ROOT, 'static', 'data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'static', 'data', 'content-index.json'), JSON.stringify(pages, null, 1) + '\n');
console.log(`Content index: ${pages.length} documentation pages -> static/data/content-index.json`);
