#!/usr/bin/env node
// Refreshes static/data/community-stats.json: per-repo stars, forks, open
// issues and traffic (views/clones) across the curated project repos, for
// the Community Stats section of /developer/community. Ported from the equivalent step in
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
// reading its own previous output and folding in each complete day once —
// the same approach the original Jekyll script used, since there's no API
// that returns true lifetime totals.
//
// Clones are counted as unique cloners per day (`total_unique_clones`), not
// as clone operations: GitHub's clone `count` includes every repeated and
// automated clone (one repository showed 578 clones by 13 cloners in 14 days).
// That running total starts from the first run of this rule (5 October 2026),
// seeded with the complete days still inside GitHub's 14-day window, and is
// what the site shows. `total_clones` (operations) is kept as before.
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

// Adds each complete UTC day exactly once: only days after the last one
// already folded in (`through`), and never today, whose count is still
// growing. Adding "the latest day" on every run instead counted a day again
// whenever the workflow ran more than once that day.
function newCompleteDays(trafficResp, key, through, today, field = 'count') {
  if (!trafficResp || !Array.isArray(trafficResp[key])) return 0;
  return trafficResp[key]
    .filter((d) => {
      const day = (d.timestamp || '').slice(0, 10);
      return day > through && day < today;
    })
    .reduce((n, d) => n + (d[field] || 0), 0);
}

function loadPreviousStats() {
  const previous = new Map(); // repo -> { total_views, total_clones, total_unique_clones, ... }
  try {
    const raw = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
    // Files written before traffic_counted_through existed had already added
    // the day of their run (partially); treat that day as counted.
    const lastRun = (raw.updated_at || '').slice(0, 10);
    for (const project of raw.projects || []) {
      for (const repo of project.repos || []) {
        previous.set(repo.repo, {
          total_views: repo.total_views || 0,
          total_clones: repo.total_clones || 0,
          traffic_counted_through: repo.traffic_counted_through || lastRun,
          total_unique_clones: repo.total_unique_clones || 0,
          // empty before the unique-cloner rule existed: the first run takes the whole 14-day window
          unique_clones_counted_through: repo.unique_clones_counted_through || '',
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
  const prev = previous.get(repo) || {
    total_views: 0, total_clones: 0, traffic_counted_through: '', total_unique_clones: 0, unique_clones_counted_through: '',
  };
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const through = prev.traffic_counted_through || '';
  const uniqueThrough = prev.unique_clones_counted_through || '';

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
    total_views: Math.max(views14d, prev.total_views + newCompleteDays(views, 'views', through, today)),
    total_clones: Math.max(clones14d, prev.total_clones + newCompleteDays(clones, 'clones', through, today)),
    unique_clones_14d: clones ? clones.uniques || 0 : 0,
    // Sum of daily unique cloners over the complete days counted so far; see the module comment.
    total_unique_clones: prev.total_unique_clones + newCompleteDays(clones, 'clones', uniqueThrough, today, 'uniques'),
    // false when the token could not read this repo's traffic (401/403), so a
    // 0 above is not mistaken for a real zero.
    traffic_ok: Boolean(views && clones),
    // Last day folded into the totals above; a failed traffic call keeps the old marker.
    traffic_counted_through: views && clones ? (yesterday > through ? yesterday : through) : through,
    unique_clones_counted_through: clones ? (yesterday > uniqueThrough ? yesterday : uniqueThrough) : uniqueThrough,
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
