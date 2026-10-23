#!/usr/bin/env node
// Refreshes static/data/repo-metadata.json: what GitHub itself says about every 5G-MAG repository the taxonomy lists --
// description, licence (SPDX), main language, topics, home page, whether it is private or archived, the default branch
// and the date of the last push. The site reads it so that these facts are never typed twice: a repository that goes
// public stops showing "Early Access" on its own, and the structured data on the project pages (schema.org
// SoftwareSourceCode) and /ai-context.json carry the same values.
// It also lists the repositories of the organisation that no project of the taxonomy lists (`untracked`), so a new
// repository does not go unnoticed, and the entries of the taxonomy whose `public` flag no longer matches GitHub (`drift`).
//
// Requires SYNC_TOKEN or GITHUB_TOKEN (a token that can read the organisation's private repositories sees them all; without
// one only the public repositories are read and the others are left out).
const https = require('https');
const fs = require('fs');
const path = require('path');
const { PROJECTS, REPO_METADATA, repoName } = require('./lib/projects');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'repo-metadata.json');

function get(urlPath) {
  return new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: 'api.github.com',
          path: urlPath,
          headers: {
            'User-Agent': '5g-mag-portal-repo-metadata-script',
            Accept: 'application/vnd.github+json',
            ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
          },
        },
        (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => {
            if (res.statusCode < 200 || res.statusCode >= 300) return reject(new Error(`${urlPath} -> ${res.statusCode}`));
            resolve({ body: JSON.parse(data), link: res.headers.link || '' });
          });
        }
      )
      .on('error', reject);
  });
}

async function orgRepos() {
  const all = [];
  for (let page = 1; page < 20; page += 1) {
    const { body, link } = await get(`/orgs/${ORG}/repos?type=all&per_page=100&page=${page}`);
    all.push(...body);
    if (!/rel="next"/.test(link)) break;
  }
  return all;
}

(async () => {
  const listed = new Set(PROJECTS.flatMap((p) => (p.repos || []).map(repoName)));
  Object.values(REPO_METADATA).forEach((entries) => entries.forEach((e) => listed.add(e.repo_slug)));

  const repos = {};
  const byName = new Map((await orgRepos()).map((r) => [r.name, r]));
  for (const slug of [...listed].sort()) {
    const r = byName.get(slug);
    if (!r) continue; // renamed, deleted or not readable with this token: left out, the taxonomy's own values apply
    repos[slug] = {
      description: r.description || null,
      license: r.license && r.license.spdx_id && r.license.spdx_id !== 'NOASSERTION' ? r.license.spdx_id : null,
      language: r.language || null,
      topics: r.topics || [],
      homepage: r.homepage || null,
      private: !!r.private,
      archived: !!r.archived,
      default_branch: r.default_branch,
      pushed_at: (r.pushed_at || '').slice(0, 10),
      url: r.html_url,
    };
  }

  const untracked = [...byName.values()]
    .filter((r) => !listed.has(r.name) && !r.archived)
    .map((r) => ({ name: r.name, description: r.description || null, private: !!r.private }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const drift = [];
  Object.values(REPO_METADATA).forEach((entries) =>
    entries.forEach((e) => {
      const g = repos[e.repo_slug];
      if (g && e.public === g.private) drift.push({ repo: e.repo_slug, taxonomy_public: e.public, github_private: g.private });
    })
  );

  const out = { updated_at: new Date().toISOString().slice(0, 10), repos, untracked, drift };
  fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2) + '\n');
  console.log(`${Object.keys(repos).length} repositories, ${untracked.length} not in the taxonomy, ${drift.length} public/private flags out of date`);
  untracked.forEach((u) => console.log(`  not in the taxonomy: ${u.name}${u.private ? ' (private)' : ''}`));
  drift.forEach((d) => console.log(`  flag differs from GitHub: ${d.repo} (taxonomy public=${d.taxonomy_public}, GitHub private=${d.github_private})`));
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
