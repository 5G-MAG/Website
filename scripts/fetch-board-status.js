#!/usr/bin/env node
// Refreshes src/data/boardStatus.json, the "Work plan" block of the Implementation status pages, from the public
// implementation boards of 5G-MAG/ProjectBoards (5GMS, MBS, 5G Broadcast, RTC; project numbers in src/data/boardProjects.json).
// The boards are the source of truth:
//
//   - a FEATURE is an issue of Kind "Feature": something the system offers, as it arrived in one release (field "Introduced in")
//   - a TASK is an issue of Kind "Task", a sub-issue of its feature: the cases one or more functions must meet for it
//   - the field Status is where a task stands: Not audited, Backlog, In progress, In review, Verifying, Supported, Needs review, On hold
//   - the fields Part, Feature, Component (the functions the specification names), Document, Clause and Cases describe it
//
// The boards are public and the read needs no more than the workflow's own token (the GraphQL API has no anonymous tier).
// The script writes nothing unless every check passes, so a mistake on a board never reaches a page: the last good file stays.
// The file holds no timestamp of the run, so a commit happens only when something on a board changed.
//
//   node scripts/fetch-board-status.js            read the boards, check, write src/data/boardStatus.json
//   node scripts/fetch-board-status.js --check    the same without writing
//
// Environment: GITHUB_TOKEN or SYNC_TOKEN; BOARDS_OVERRIDE=true accepts a large drop of entries (read the log first).
// Writes "changes=<n>" to $GITHUB_OUTPUT when set: the number of features and tasks added, removed, or moved to another status.
const https = require('https');
const fs = require('fs');
const path = require('path');

const ORG = '5G-MAG';
const TOKEN = process.env.GITHUB_TOKEN || process.env.SYNC_TOKEN || '';
const OVERRIDE = process.env.BOARDS_OVERRIDE === 'true';
const CHECK_ONLY = process.argv.includes('--check');
const OUTPUT = path.join(__dirname, '..', 'src', 'data', 'boardStatus.json');
const REGISTRY = require('../src/data/boardProjects.json');
const STATUSES = ['Not audited', 'Backlog', 'In progress', 'In review', 'Verifying', 'Supported', 'Needs review', 'On hold'];
const MIN_SHARE = 0.8;      // fewer than 80 per cent of the entries of the last file counts as a mistake

const QUERY = `
  query($org: String!, $number: Int!, $cursor: String) {
    organization(login: $org) {
      projectV2(number: $number) {
        items(first: 100, after: $cursor, orderBy: { field: POSITION, direction: ASC }) {
          pageInfo { hasNextPage endCursor }
          nodes {
            status: fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
            kind: fieldValueByName(name: "Kind") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
            part: fieldValueByName(name: "Part") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
            introduced: fieldValueByName(name: "Introduced in") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
            feature: fieldValueByName(name: "Feature") { ... on ProjectV2ItemFieldTextValue { text } }
            component: fieldValueByName(name: "Component") { ... on ProjectV2ItemFieldTextValue { text } }
            clause: fieldValueByName(name: "Clause") { ... on ProjectV2ItemFieldTextValue { text } }
            cases: fieldValueByName(name: "Cases") { ... on ProjectV2ItemFieldNumberValue { number } }
            content {
              __typename
              ... on Issue { number title url state parent { number } }
            }
          }
        }
      }
    }
  }
`;

function graphqlPost(query, variables) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const req = https.request({
      hostname: 'api.github.com', path: '/graphql', method: 'POST',
      headers: { 'User-Agent': '5g-mag-portal-board-status', Accept: 'application/vnd.github+json', 'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body), Authorization: `Bearer ${TOKEN}` },
    }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`GraphQL HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(60000, () => req.destroy(new Error('GraphQL request timed out')));
    req.write(body);
    req.end();
  });
}

async function fetchAllItems(number) {
  const items = [];
  let cursor = null;
  for (;;) {
    const json = await graphqlPost(QUERY, { org: ORG, number, cursor });
    if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors).slice(0, 300)}`);
    const project = json.data && json.data.organization && json.data.organization.projectV2;
    if (!project) throw new Error(`The board ${ORG} project ${number} could not be read (null)`);
    items.push(...project.items.nodes);
    if (!project.items.pageInfo.hasNextPage) return items;
    cursor = project.items.pageInfo.endCursor;
  }
}

// One board: its features, each with its tasks, in the order of the board; and the list of errors.
function build(slug, items) {
  const errors = [];
  const features = new Map();
  const tasks = [];
  for (const it of items) {
    const c = it.content;
    if (!c || c.__typename !== 'Issue') continue;
    const where = `${slug} #${c.number} "${c.title.slice(0, 50)}"`;
    if (c.state !== 'OPEN') { errors.push(`${where}: closed, but still on the board`); continue; }
    const status = it.status && it.status.name;
    if (!STATUSES.includes(status)) { errors.push(`${where}: Status must be one of ${STATUSES.join(', ')}`); continue; }
    const kind = it.kind && it.kind.name;
    const release = it.introduced && it.introduced.name;
    if (kind === 'Feature') {
      features.set(c.number, { number: c.number, url: c.url, name: (it.feature && it.feature.text) || c.title, release, part: (it.part && it.part.name) || null, tasks: [] });
    } else if (kind === 'Task') {
      tasks.push({ where, parent: c.parent && c.parent.number, task: { number: c.number, url: c.url, title: c.title, status, release,
        functions: ((it.component && it.component.text) || '').split(';').map((s) => s.trim()).filter(Boolean), clauses: (it.clause && it.clause.text) || '', cases: (it.cases && it.cases.number) || 0 } });
    } else {
      errors.push(`${where}: Kind must be Feature or Task`);
    }
  }
  for (const t of tasks) {
    const f = features.get(t.parent);
    if (!f) { errors.push(`${t.where}: its parent #${t.parent} is not a feature of this board`); continue; }
    f.tasks.push(t.task);
  }
  for (const f of features.values()) if (!f.tasks.length) errors.push(`${slug} #${f.number} "${f.name}": a feature without tasks`);
  return { features: [...features.values()], errors };
}

const total = (data) => Object.values(data).reduce((n, b) => n + b.features.length + b.features.reduce((m, f) => m + f.tasks.length, 0), 0);
const keys = (data) => new Set(Object.entries(data).flatMap(([slug, b]) => b.features.flatMap((f) => [`${slug}|f|${f.number}`, ...f.tasks.map((t) => `${slug}|t|${t.number}|${t.status}`)])));

async function main() {
  if (!TOKEN) throw new Error('No token: set GITHUB_TOKEN or SYNC_TOKEN');
  const old = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, 'utf8')) : {};
  const next = {};
  const errors = [];
  for (const [slug, reg] of Object.entries(REGISTRY)) {
    if (slug.startsWith('_')) continue;
    const { features, errors: e } = build(slug, await fetchAllItems(reg.board));
    errors.push(...e);
    const parts = [...new Set(features.map((f) => f.part).filter(Boolean))];
    next[slug] = { title: reg.title, board: `https://github.com/orgs/${ORG}/projects/${reg.board}`, parts, features };
    if (!features.length) errors.push(`${slug}: the board shows no features`);
  }
  if (!OVERRIDE && total(old) && total(next) < MIN_SHARE * total(old)) errors.push(`The boards show ${total(next)} entries, fewer than ${MIN_SHARE * 100} per cent of the ${total(old)} of the last file`);
  if (errors.length) {
    console.error(`Not written. ${errors.length} problem(s), the last good file stays:`);
    errors.slice(0, 40).forEach((e) => console.error(' - ' + e));
    process.exit(1);
  }
  const before = keys(old);
  const after = keys(next);
  const changes = [...after].filter((k) => !before.has(k)).length + [...before].filter((k) => !after.has(k)).length;
  const text = JSON.stringify(next, null, 1) + '\n';
  const changed = !fs.existsSync(OUTPUT) || fs.readFileSync(OUTPUT, 'utf8') !== text;
  console.log(`${Object.keys(next).length} boards, ${total(next)} features and tasks, ${changes} added, removed or moved, file ${changed ? 'changes' : 'unchanged'}`);
  if (changed && !CHECK_ONLY) fs.writeFileSync(OUTPUT, text);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changes=${changes}\n`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
