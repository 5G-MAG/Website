#!/usr/bin/env node
// Refreshes static/data/releases.json: the latest GitHub release for
// every repo in every 5G-MAG project, feeding the Releases section of /developer/community
// page. Repos/projects with no public releases yet are simply omitted.
//
// Requires a token with public read access as SYNC_TOKEN or GITHUB_TOKEN
// (any authenticated token works). Without one, limited to 60 req/hour.
const https = require('https');
const fs = require('fs');
const path = require('path');
const { PROJECTS, repoName, repoBranch } = require('./lib/projects');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'releases.json');

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-releases-script',
        Accept: 'application/vnd.github+json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    };
    https
      .get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode === 404) {
            resolve(null); // no releases for this repo
            return;
          }
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

// GitHub has no "latest release on branch X" endpoint — /releases/latest
// always considers the whole repo. For a branch-scoped entry (e.g.
// rt-mbms-tx-for-qrd-and-crd is tracked separately on `main` vs
// `emergency-alerts`), fetch the full release list instead and match on
// target_commitish, the branch/commit a release's tag was cut from.
async function latestReleaseOnBranch(repo, branch) {
  const releases = await apiGet(`/repos/${ORG}/${repo}/releases?per_page=100`);
  if (!Array.isArray(releases)) return null;
  return releases.find((r) => r.target_commitish === branch) || null;
}

async function latestRelease(repoEntry) {
  const repo = repoName(repoEntry);
  const branch = repoBranch(repoEntry);
  const release = branch
    ? await latestReleaseOnBranch(repo, branch)
    : await apiGet(`/repos/${ORG}/${repo}/releases/latest`);
  if (!release) return null;
  return {
    repo,
    branch,
    tag: release.tag_name,
    date: release.published_at ? release.published_at.slice(0, 10) : '-',
    url: release.html_url,
    author_login: release.author ? release.author.login : null,
    author_avatar: release.author ? release.author.avatar_url : null,
  };
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
    const releases = [];
    for (const repoEntry of project.repos) {
      let release;
      try {
        release = await latestRelease(repoEntry);
      } catch (e) {
        const branch = repoBranch(repoEntry);
        const label = branch ? `${repoName(repoEntry)}@${branch}` : repoName(repoEntry);
        console.warn(`  skip ${label}: ${e.message}`);
        continue;
      }
      if (release) releases.push(release);
    }
    console.log(`${project.name}: ${releases.length}/${project.repos.length} repos have a release`);
    if (releases.length === 0) continue;

    releases.sort((a, b) => b.date.localeCompare(a.date));

    projects.push({
      name: project.name,
      doc_url: project.doc_url,
      tagline: project.tagline,
      releases_slug: project.releases_slug,
      latest_date: releases[0].date,
      releases,
    });
  }

  const output = {
    updated_at: formatTimestamp(new Date()),
    projects,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${projects.length} projects to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
