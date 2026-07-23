#!/usr/bin/env node
// Refreshes static/data/pull-requests.json: every open PR across the
// curated project repos, grouped by project, for the Pull Requests section of /community
// page. Ported from the equivalent step in 5G-MAG/Getting-Started's old
// "Sync Repo Data" workflow (Jekyll _data/pull_requests.json), rewritten so
// derived fields (status color, days-open) are computed at render time
// instead of baked into the JSON, avoiding staleness between syncs.
//
// Requires a token with public read access as SYNC_TOKEN or GITHUB_TOKEN
// (any authenticated token works). Without one, limited to 60 req/hour.
const https = require('https');
const fs = require('fs');
const path = require('path');
const { PROJECTS, repoName, repoBranch } = require('./lib/projects');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'pull-requests.json');

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-pull-requests-script',
        Accept: 'application/vnd.github+json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    };
    https
      .get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`${urlPath} -> ${res.statusCode}: ${data.slice(0, 200)}`));
            return;
          }
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

async function getAllPages(basePath) {
  const all = [];
  for (let page = 1; ; page += 1) {
    const sep = basePath.includes('?') ? '&' : '?';
    const body = await apiGet(`${basePath}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(body) || body.length === 0) break;
    all.push(...body);
    if (body.length < 100) break;
  }
  return all;
}

async function lastComment(pr) {
  // Skip the extra request entirely when GitHub already told us there are
  // no comments — cuts API usage roughly in half across a project set this size.
  if (!pr.comments) return null;
  const comments = await apiGet(
    `/repos/${ORG}/${pr.base.repo.name}/issues/${pr.number}/comments?per_page=100`
  );
  if (!Array.isArray(comments) || comments.length === 0) return null;
  const last = comments[comments.length - 1];
  return {
    login: last.user ? last.user.login : null,
    date: last.created_at ? last.created_at.slice(0, 10) : null,
  };
}

async function pullsForRepo(repoEntry) {
  const repo = repoName(repoEntry);
  const branch = repoBranch(repoEntry);
  // GitHub's PR list endpoint filters by target/base branch natively —
  // used for repos like rt-mbms-tx-for-qrd-and-crd or open5gs that need
  // separate tracking per branch under different project categories.
  const branchQuery = branch ? `&base=${encodeURIComponent(branch)}` : '';
  let prs;
  try {
    prs = await getAllPages(`/repos/${ORG}/${repo}/pulls?state=open${branchQuery}`);
  } catch (e) {
    console.warn(`  skip ${repo}${branch ? `@${branch}` : ''}: ${e.message}`);
    return [];
  }
  const out = [];
  for (const pr of prs) {
    const comment = await lastComment(pr);
    out.push({
      repo,
      branch,
      number: pr.number,
      title: pr.title,
      url: pr.html_url,
      draft: !!pr.draft,
      author_login: pr.user ? pr.user.login : null,
      author_avatar: pr.user ? pr.user.avatar_url : null,
      created_at: pr.created_at ? pr.created_at.slice(0, 10) : null,
      last_comment_by: comment ? comment.login : null,
      last_comment_date: comment ? comment.date : null,
    });
  }
  return out;
}

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) {
    console.warn('Warning: no SYNC_TOKEN/GITHUB_TOKEN set — limited to 60 requests/hour.');
  }

  const projects = [];
  for (const project of PROJECTS) {
    const pulls = [];
    for (const repo of project.repos) {
      pulls.push(...(await pullsForRepo(repo)));
    }
    console.log(`${project.name}: ${pulls.length} open PRs`);
    pulls.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
    projects.push({
      name: project.name,
      doc_url: project.doc_url,
      tagline: project.tagline,
      pulls,
    });
  }

  const output = {
    updated_at: formatTimestamp(new Date()),
    projects,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  const total = projects.reduce((n, p) => n + p.pulls.length, 0);
  console.log(`Wrote ${total} open PRs across ${projects.length} projects to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
