#!/usr/bin/env node
// Refreshes src/data/projectRoadmaps.json, the "Latest updates and roadmap" block of every project page, from the public
// GitHub Projects board "5G-MAG Roadmaps" (https://github.com/orgs/5G-MAG/projects/76). The board is the source of truth:
//
//   - one issue in 5G-MAG/Roadmaps per entry; its title is the headline shown on the page and on the slide
//   - the label project:<slug> says which project page the entry belongs to (slugs: src/data/roadmapProjects.json)
//   - the Status field is the column: Brought to Study, On-Going or Outcomes
//   - the order of the cards in a column is the order on the page (items are read by position)
//   - an entry appears only when its issue is open and "Show on page" is Yes; archived items are not returned by GitHub
//
// The board is public, so the read needs no more than the workflow's own token (GITHUB_TOKEN). The script writes nothing
// unless every check passes, so a mistake on the board never reaches a page: the last good file stays. The file holds no
// timestamp of the run; the "read" date of a project changes only when its content changes, so a commit happens only then.
//
//   node scripts/fetch-project-roadmaps.js            read the board, check, write src/data/projectRoadmaps.json
//   node scripts/fetch-project-roadmaps.js --check    the same without writing
//
// Environment: GITHUB_TOKEN or SYNC_TOKEN (a token is required even for a public board: the GraphQL API has no anonymous
// tier); ROADMAPS_OVERRIDE=true accepts a large drop of entries or an emptied project (read the log first).
// Writes "changes=<n>" to $GITHUB_OUTPUT when set: the number of entries added, removed or moved to another column.
const https = require('https');
const fs = require('fs');
const path = require('path');

const ORG = '5G-MAG';
const PROJECT_NUMBER = 76;
const REPO = '5G-MAG/Roadmaps';
const TOKEN = process.env.GITHUB_TOKEN || process.env.SYNC_TOKEN || '';
const OVERRIDE = process.env.ROADMAPS_OVERRIDE === 'true';
const CHECK_ONLY = process.argv.includes('--check');
const OUTPUT = path.join(__dirname, '..', 'src', 'data', 'projectRoadmaps.json');
const REGISTRY = require('../src/data/roadmapProjects.json');

const COLUMNS = [
  { status: 'Brought to Study', label: 'BROUGHT TO STUDY' },
  { status: 'On-Going', label: 'ON-GOING' },
  { status: 'Outcomes', label: 'OUTCOMES' },
];
const MAX_PER_COLUMN = 8;   // what the slide and the page lay out
const MAX_HEADLINE = 160;   // the longest headline today has 154 characters
const MIN_SHARE = 0.8;      // fewer than 80 per cent of the entries of the last file counts as a mistake

const QUERY = `
  query($org: String!, $number: Int!, $cursor: String) {
    organization(login: $org) {
      projectV2(number: $number) {
        items(first: 100, after: $cursor, orderBy: { field: POSITION, direction: ASC }) {
          pageInfo { hasNextPage endCursor }
          nodes {
            status: fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
            show: fieldValueByName(name: "Show on page") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
            content {
              __typename
              ... on Issue { number title state repository { nameWithOwner } labels(first: 20) { nodes { name } } }
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
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'User-Agent': '5g-mag-portal-project-roadmaps',
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        Authorization: `Bearer ${TOKEN}`,
      },
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

async function fetchAllItems() {
  const items = [];
  let cursor = null;
  for (;;) {
    const json = await graphqlPost(QUERY, { org: ORG, number: PROJECT_NUMBER, cursor });
    if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors).slice(0, 300)}`);
    const project = json.data && json.data.organization && json.data.organization.projectV2;
    // A board the token cannot see comes back as null, exactly like a board that does not exist.
    if (!project) throw new Error(`The board ${ORG} project ${PROJECT_NUMBER} could not be read (null)`);
    items.push(...project.items.nodes);
    if (!project.items.pageInfo.hasNextPage) return items;
    cursor = project.items.pageInfo.endCursor;
  }
}

// Turns the items of the board into { slug: { columns: { label: [headline] } } } and a list of errors.
function build(items) {
  const errors = [];
  const out = {};
  for (const item of items) {
    const c = item.content;
    if (!c || c.__typename !== 'Issue') continue;                 // draft items and pull requests are not entries
    if (c.state !== 'OPEN') continue;                              // closed means off the page
    if (!item.show || item.show.name !== 'Yes') continue;          // not reviewed, or hidden
    const where = `#${c.number} "${c.title.slice(0, 50)}"`;
    if (c.repository.nameWithOwner !== REPO) { errors.push(`${where}: the issue is in ${c.repository.nameWithOwner}, not ${REPO}`); continue; }
    const slugs = c.labels.nodes.map((l) => l.name).filter((n) => n.startsWith('project:')).map((n) => n.slice(8));
    if (slugs.length !== 1) { errors.push(`${where}: needs exactly one project label, has ${slugs.length}`); continue; }
    const slug = slugs[0];
    if (!REGISTRY[slug]) { errors.push(`${where}: unknown project "${slug}" (not in src/data/roadmapProjects.json)`); continue; }
    const column = COLUMNS.find((k) => item.status && k.status === item.status.name);
    if (!column) { errors.push(`${where}: Status must be one of ${COLUMNS.map((k) => k.status).join(', ')}`); continue; }
    const head = c.title.trim();
    if (!head) { errors.push(`${where}: empty headline`); continue; }
    if (head.length > MAX_HEADLINE) errors.push(`${where}: headline has ${head.length} characters, the limit is ${MAX_HEADLINE}`);
    const project = (out[slug] = out[slug] || Object.fromEntries(COLUMNS.map((k) => [k.label, []])));
    if (Object.values(project).some((list) => list.includes(head))) errors.push(`${where}: the same headline is already on the ${slug} roadmap`);
    project[column.label].push(head);
  }
  for (const [slug, project] of Object.entries(out)) {
    for (const [label, list] of Object.entries(project)) {
      if (list.length > MAX_PER_COLUMN) errors.push(`${slug}: ${label} has ${list.length} entries, the limit is ${MAX_PER_COLUMN}`);
    }
  }
  return { out, errors };
}

const total = (data) => Object.values(data).reduce((n, p) => n + p.phases.reduce((m, ph) => m + ph.items.length, 0), 0);
const keys = (data) => new Set(Object.entries(data).flatMap(([slug, p]) => p.phases.flatMap((ph) => ph.items.map((i) => `${slug}|${ph.label}|${i.head}`))));
const today = () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

async function main() {
  if (!TOKEN) throw new Error('No token: set GITHUB_TOKEN or SYNC_TOKEN');
  const old = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, 'utf8')) : {};
  const { out, errors } = build(await fetchAllItems());

  // The same shape the page components have always read: { slug: { read, phases: [{ label, items: [{ head }] }] } }, in the order of the registry.
  const next = {};
  for (const slug of Object.keys(REGISTRY)) {
    if (!out[slug]) continue;
    const phases = COLUMNS.map((k) => ({ label: k.label, items: out[slug][k.label].map((head) => ({ head })) }));
    const same = old[slug] && JSON.stringify(old[slug].phases) === JSON.stringify(phases);
    next[slug] = { read: same ? old[slug].read : today(), phases };
  }

  if (!OVERRIDE) {
    if (!Object.keys(next).length) {
      errors.push('The board shows no entries at all');
    } else {
      if (total(old) && total(next) < MIN_SHARE * total(old)) errors.push(`The board shows ${total(next)} entries, fewer than ${MIN_SHARE * 100} per cent of the ${total(old)} of the last file`);
      for (const slug of Object.keys(old)) {
        if (!next[slug]) errors.push(`${slug}: the roadmap has no entries on the board any more (it had ${total({ [slug]: old[slug] })})`);
      }
    }
  }
  if (errors.length) {
    console.error(`Not written. ${errors.length} problem(s), the last good file stays:`);
    errors.forEach((e) => console.error(' - ' + e));
    process.exit(1);
  }

  const before = keys(old);
  const after = keys(next);
  const changes = [...after].filter((k) => !before.has(k)).length + [...before].filter((k) => !after.has(k)).length;
  const text = JSON.stringify(next, null, 2) + '\n';
  const changed = !fs.existsSync(OUTPUT) || fs.readFileSync(OUTPUT, 'utf8') !== text;
  console.log(`${Object.keys(next).length} projects, ${total(next)} entries, ${changes} entries added, removed or moved, file ${changed ? 'changes' : 'unchanged'}`);
  if (changed && !CHECK_ONLY) fs.writeFileSync(OUTPUT, text);
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `changes=${changes}\n`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
