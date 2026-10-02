#!/usr/bin/env node
// Refreshes static/data/repo-activity.json: every non-archived 5G-MAG repository, public or private, classified by
// project from src/data/taxonomy.json, with its open pull requests, open issues and branches, for the
// /community/activity page. Repositories no taxonomy project lists are left out.
//
// Requires SYNC_TOKEN or GITHUB_TOKEN: branches come from the GraphQL API (one query per repository gives
// every branch with its last commit date), which has no unauthenticated tier.
const https = require('https');
const fs = require('fs');
const path = require('path');
const { PROJECTS, REPO_METADATA, repoName } = require('./lib/projects');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'repo-activity.json');

function request(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method,
        hostname: 'api.github.com',
        path: urlPath,
        headers: {
          'User-Agent': '5g-mag-portal-repo-activity-script',
          Accept: 'application/vnd.github+json',
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          if (res.statusCode >= 400) return reject(new Error(`${res.statusCode} ${urlPath}`));
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAllPages(basePath) {
  const all = [];
  for (let page = 1; ; page += 1) {
    const sep = basePath.includes('?') ? '&' : '?';
    const body = await request('GET', `${basePath}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(body) || body.length === 0) break;
    all.push(...body);
    if (body.length < 100) break;
  }
  return all;
}

const day = (t) => (t ? t.slice(0, 10) : null);

async function branches(repo) {
  const out = [];
  let after = null;
  for (;;) {
    const q = `query($o:String!,$r:String!,$a:String){repository(owner:$o,name:$r){
      defaultBranchRef{name}
      refs(refPrefix:"refs/heads/",first:100,after:$a){pageInfo{hasNextPage endCursor}
        nodes{name target{... on Commit{committedDate}}}}}}`;
    const res = await request('POST', '/graphql', { query: q, variables: { o: ORG, r: repo, a: after } });
    const r = res.data && res.data.repository;
    if (!r) throw new Error(JSON.stringify(res.errors || res).slice(0, 200));
    const def = r.defaultBranchRef ? r.defaultBranchRef.name : null;
    for (const n of r.refs.nodes) {
      out.push({ name: n.name, default: n.name === def, last_commit: day(n.target && n.target.committedDate) });
    }
    if (!r.refs.pageInfo.hasNextPage) break;
    after = r.refs.pageInfo.endCursor;
  }
  out.sort((a, b) => (b.default - a.default) || (b.last_commit || '').localeCompare(a.last_commit || ''));
  return out;
}

async function activity(repo, meta) {
  const [pulls, issues, br] = await Promise.all([
    getAllPages(`/repos/${ORG}/${repo}/pulls?state=open`),
    getAllPages(`/repos/${ORG}/${repo}/issues?state=open`),
    branches(repo),
  ]);
  return {
    repo,
    url: `https://github.com/${ORG}/${repo}`,
    description: meta.description || null,
    auxiliary: !!meta.auxiliary,
    private: !!meta.private,
    pushed_at: day(meta.pushed_at),
    pulls: pulls.map((p) => ({
      number: p.number, title: p.title, url: p.html_url, draft: !!p.draft,
      author: p.user ? p.user.login : null, created_at: day(p.created_at), base: p.base ? p.base.ref : null,
    })),
    // the issues endpoint also returns pull requests; keep issues only
    issues: issues.filter((i) => !i.pull_request).map((i) => ({
      number: i.number, title: i.title, url: i.html_url,
      author: i.user ? i.user.login : null, created_at: day(i.created_at),
      labels: (i.labels || []).map((l) => l.name),
    })),
    branches: br,
  };
}

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) throw new Error('SYNC_TOKEN or GITHUB_TOKEN is required (branches use the GraphQL API).');
  // type=all: private repositories are listed too (at the site owner's request), marked as private
  const orgRepos = (await getAllPages(`/orgs/${ORG}/repos?type=all`)).filter((r) => !r.archived);
  const byName = new Map(orgRepos.map((r) => [r.name, r]));
  // auxiliary flag per repository, from taxonomy.json repoMetadata
  const auxiliary = new Set();
  Object.values(REPO_METADATA).forEach((list) => list.forEach((m) => m.is_auxiliary && auxiliary.add(m.repo_slug)));

  const cache = new Map();
  const load = async (name) => {
    if (!cache.has(name)) {
      const r = byName.get(name);
      try {
        cache.set(name, await activity(name, { description: r.description, pushed_at: r.pushed_at, auxiliary: auxiliary.has(name), private: r.private }));
      } catch (e) {
        console.warn(`  skip ${name}: ${e.message}`);
        cache.set(name, null);
      }
    }
    return cache.get(name);
  };

  const assigned = new Set();
  const projects = [];
  for (const project of PROJECTS) {
    const names = [...new Set((project.repos || []).map(repoName))].filter((n) => byName.has(n));
    if (!names.length) continue;
    const repos = [];
    for (const n of names) {
      assigned.add(n);
      const a = await load(n);
      if (a) repos.push(a);
    }
    repos.sort((x, y) => (x.auxiliary - y.auxiliary) || x.repo.localeCompare(y.repo));
    projects.push({ name: project.name, doc_url: project.doc_url || null, repos });
    console.log(`${project.name}: ${repos.length} repositories`);
  }
  fs.writeFileSync(OUTPUT, JSON.stringify({ updated_at: formatTimestamp(new Date()), projects }, null, 2) + '\n');
  console.log(`Wrote ${cache.size} repositories to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
