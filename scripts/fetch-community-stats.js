#!/usr/bin/env node
// Refreshes static/data/community-stats.json: per-repo stars, forks, open
// issues and traffic (views/clones) across the curated project repos, for
// the /developer/community-stats page. Ported from the equivalent step in
// 5G-MAG/Getting-Started's old "Sync Repo Data" workflow (Jekyll
// _data/community_stats.json).
//
// IMPORTANT: unlike fetch-releases.js/fetch-pull-requests.js (any public
// read token works), the /traffic/views and /traffic/clones endpoints
// require a token with PUSH access on every repo queried here. SYNC_TOKEN
// must be a PAT belonging to an account with write access across the
// 5G-MAG projects tracked below, or views/clones will silently read as 0
// for repos it can't access (see the 403 handling in trafficCount below).
//
// GitHub's traffic API only reports a rolling 14-day window, not an
// all-time total, so this script keeps a running cumulative estimate by
// reading its own previous output and folding in each day's new count —
// the same approach the original Jekyll script used, since there's no API
// that returns true lifetime totals.
const https = require('https');
const fs = require('fs');
const path = require('path');
const { PROJECTS, repoName } = require('./lib/projects');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'community-stats.json');

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-community-stats-script',
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

// Traffic endpoints need their own wrapper: a 401/403 there means "this
// token lacks push access on this repo" (expected for some repos, treated
// as zero) rather than a real failure — unlike a 401/403 on the plain repo
// lookup above, which should still surface as an error (e.g. rate-limit
// exhaustion also returns 403 and must not be silently swallowed).
async function apiGetTrafficOrNull(urlPath) {
  try {
    return await apiGet(urlPath);
  } catch (e) {
    if (/-> 401:|-> 403:/.test(e.message)) return null;
    throw e;
  }
}

function latestDayCount(trafficResp, key) {
  if (!trafficResp || !Array.isArray(trafficResp[key]) || trafficResp[key].length === 0) return 0;
  return trafficResp[key][trafficResp[key].length - 1].count || 0;
}

function loadPreviousStats() {
  const previous = new Map(); // repo -> { total_views, total_clones }
  try {
    const raw = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
    for (const project of raw.projects || []) {
      for (const repo of project.repos || []) {
        previous.set(repo.repo, {
          total_views: repo.total_views || 0,
          total_clones: repo.total_clones || 0,
        });
      }
    }
  } catch {
    // no previous output yet — start every cumulative counter at 0
  }
  return previous;
}

async function statsForRepo(repo, previous) {
  let repoData;
  try {
    repoData = await apiGet(`/repos/${ORG}/${repo}`);
  } catch (e) {
    console.warn(`  skip ${repo}: ${e.message}`);
    return null;
  }

  const [views, clones] = await Promise.all([
    apiGetTrafficOrNull(`/repos/${ORG}/${repo}/traffic/views`),
    apiGetTrafficOrNull(`/repos/${ORG}/${repo}/traffic/clones`),
  ]);
  const views14d = views ? views.count || 0 : 0;
  const clones14d = clones ? clones.count || 0 : 0;
  const prev = previous.get(repo) || { total_views: 0, total_clones: 0 };

  return {
    repo,
    stars: repoData.stargazers_count || 0,
    forks: repoData.forks_count || 0,
    open_issues: repoData.open_issues_count || 0,
    pushed_at: repoData.pushed_at ? repoData.pushed_at.slice(0, 10) : null,
    views_14d: views14d,
    clones_14d: clones14d,
    // Running estimate of lifetime totals, since /traffic only exposes a
    // 14-day window — see the module comment above.
    total_views: Math.max(views14d, prev.total_views + latestDayCount(views, 'views')),
    total_clones: Math.max(clones14d, prev.total_clones + latestDayCount(clones, 'clones')),
    repo_url: `https://github.com/${ORG}/${repo}`,
  };
}

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) {
    console.warn(
      'Warning: no SYNC_TOKEN/GITHUB_TOKEN set — traffic endpoints will fail without push access.'
    );
  }

  const previous = loadPreviousStats();
  // Community stats have no branch concept (stars/forks/traffic are
  // whole-repo metrics), so a repo shared across many categories — e.g.
  // rt-common-shared appears under all 10 — only needs fetching once.
  const statsCache = new Map();
  const projects = [];
  for (const project of PROJECTS) {
    const repos = [];
    for (const repoEntry of project.repos) {
      const name = repoName(repoEntry);
      if (!statsCache.has(name)) {
        statsCache.set(name, await statsForRepo(name, previous));
      }
      const stats = statsCache.get(name);
      if (stats) repos.push(stats);
    }
    console.log(`${project.name}: ${repos.length}/${project.repos.length} repos synced`);
    projects.push({
      name: project.name,
      doc_url: project.doc_url,
      tagline: project.tagline,
      repos,
    });
  }

  const output = {
    updated_at: formatTimestamp(new Date()),
    projects,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote community stats for ${projects.length} projects to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
