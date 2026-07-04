#!/usr/bin/env node
// Aggregates contributor activity (commit counts) across every public
// 5G-MAG repository into static/data/contributors.json, for the "Top
// Contributors" section on the Developer Community page.
//
// Requires a token with public read access as SYNC_TOKEN or GITHUB_TOKEN
// (any authenticated token works — GitHub's org/contributors endpoints
// only need public data). Without one, the script still runs but is
// limited to the 60 req/hour unauthenticated rate limit.
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const ORG     = '5G-MAG';
const TOKEN   = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT  = path.join(__dirname, '..', 'static', 'data', 'contributors.json');

// Docs/site repos, not Reference Tools code — excluded so the ranking
// reflects software contribution. Adjust freely.
const EXCLUDE_REPOS = new Set(['Getting-Started', 'Tech', 'Standards', '5g-mag-portal', 'Website', '.github']);

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-contributors-script',
        Accept: 'application/vnd.github+json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    };
    https.get(options, (res) => {
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
    }).on('error', reject);
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

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) {
    console.warn('Warning: no SYNC_TOKEN/GITHUB_TOKEN set — limited to 60 requests/hour.');
  }

  console.log(`Discovering public repositories in the ${ORG} organization...`);
  const repos = (await getAllPages(`/orgs/${ORG}/repos?type=public`))
    .filter((r) => !r.archived && !r.fork && !EXCLUDE_REPOS.has(r.name))
    .map((r) => r.name);
  console.log(`Found ${repos.length} repositories to scan.`);

  const totals = new Map(); // login -> { login, avatar_url, html_url, contributions, repos: Set }

  for (const repo of repos) {
    let contributors;
    try {
      contributors = await getAllPages(`/repos/${ORG}/${repo}/contributors`);
    } catch (e) {
      console.warn(`  skip ${repo}: ${e.message}`);
      continue;
    }
    for (const c of contributors) {
      if (!c.login || c.type === 'Bot') continue;
      const entry = totals.get(c.login) || {
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        contributions: 0,
        repos: new Set(),
      };
      entry.contributions += c.contributions;
      entry.repos.add(repo);
      totals.set(c.login, entry);
    }
    console.log(`  ${repo}: ${contributors.length} contributors`);
  }

  const ranked = [...totals.values()]
    .sort((a, b) => b.contributions - a.contributions)
    .map((c) => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      contributions: c.contributions,
      repo_count: c.repos.size,
    }));

  const output = {
    updated_at: formatTimestamp(new Date()),
    repo_count: repos.length,
    contributors: ranked,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${ranked.length} contributors (across ${repos.length} repos) to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
