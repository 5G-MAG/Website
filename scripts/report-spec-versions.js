// Lists, for every specification the docs cite with a version ("TS 26.501 V20.0.0"), the versions cited and how often,
// highest first. A citation says which version a statement was checked against, so it is changed by re-checking the
// statement, not by search and replace; this report shows where the docs are behind the newest version they cite
// (run it when a new version of a specification is published): npm run report:specs
const fs = require('fs');
const path = require('path');

const ROOTS = ['docs', 'src/data/specs', 'src/pages'];
const CITATION = /\b(TS|TR) (\d{2}\.\d{3}) V(\d+)\.(\d+)\.(\d+)/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(mdx?|jsx?)$/.test(e.name)) out.push(p);
  }
  return out;
}

const seen = {};
for (const root of ROOTS.filter((r) => fs.existsSync(r))) {
  for (const file of walk(root)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(CITATION)) {
      const key = `${m[1]} ${m[2]}`;
      const ver = `${m[3]}.${m[4]}.${m[5]}`;
      seen[key] ??= {};
      seen[key][ver] ??= new Set();
      seen[key][ver].add(file);
    }
  }
}

const cmp = (a, b) => a.split('.').map(Number).reduce((d, n, i) => d || n - b.split('.').map(Number)[i], 0);
for (const spec of Object.keys(seen).sort()) {
  const versions = Object.keys(seen[spec]).sort(cmp).reverse();
  if (versions.length < 2) continue;
  console.log(`${spec}: newest cited V${versions[0]}`);
  for (const v of versions.slice(1)) console.log(`  V${v}: ${seen[spec][v].size} file(s), for example ${[...seen[spec][v]][0]}`);
}
