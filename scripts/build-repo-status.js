#!/usr/bin/env node
// Writes the status of every repository in the taxonomy, from data the daily job has already fetched
// (static/data/repo-activity.json and static/data/releases.json). No GitHub access is needed.
//
//   static/data/repo-status.json              { updated_at, rule, repos: { <repo>: { status, ... } } }
//   static/badges/status/<repo>.json          a shields.io endpoint badge, read by each repository's README:
//     https://img.shields.io/endpoint?url=https://www.5g-mag.com/badges/status/<repo>.json
//
// The rule, as decided by the project owner (2026-10-19):
//   no release                                         Under Development
//   a release, and activity in the last year           Actively Maintained
//   a release, and no activity in the last year        Stable
// Activity is a commit on the integration branch (`development`, or a branch whose name contains it, else the
// default branch) that is not housekeeping (README and banner syncs, see fetch-repo-activity.js), a release, or an
// open pull request, other than a README-format one, updated in the last year.
const fs = require('fs');
const path = require('path');
const { PROJECTS, repoName } = require('./lib/projects');

const ROOT = path.join(__dirname, '..');
const DATA = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'static', 'data', f), 'utf8'));
const WINDOW_DAYS = 365;
const COLOURS = { 'Actively Maintained': '2e9e5b', Stable: '007a9e', 'Under Development': 'e67e22' };

function daysSince(day, now) {
  if (!day) return Infinity;
  return (now - new Date(`${day}T00:00:00Z`)) / 86400000;
}

function main() {
  const now = new Date();
  const activity = DATA('repo-activity.json');
  const releases = DATA('releases.json');

  const latestRelease = new Map();
  for (const project of releases.projects || []) {
    for (const r of project.releases || []) {
      if (!latestRelease.has(r.repo) || r.date > latestRelease.get(r.repo)) latestRelease.set(r.repo, r.date);
    }
  }
  const byRepo = new Map();
  for (const project of activity.projects || []) for (const r of project.repos || []) byRepo.set(r.repo, r);

  const slugs = new Set();
  for (const p of PROJECTS) for (const r of p.repos || []) slugs.add(repoName(r));

  const repos = {};
  for (const slug of [...slugs].sort()) {
    const a = byRepo.get(slug);
    const release = (a && a.latest_release) || latestRelease.get(slug) || null;
    let lastWork = null;
    if (a) {
      const names = (a.branches || []).filter((b) => /development/.test(b.name));
      const branches = names.length ? names : (a.branches || []).filter((b) => b.default);
      lastWork = branches
        .map((b) => b.last_work_commit || b.last_commit)
        .filter(Boolean)
        .sort()
        .pop() || null;
    }
    const recentPulls = ((a && a.pulls) || []).filter(
      (p) => !p.title.startsWith('docs: apply the 5G-MAG README format') && daysSince(p.updated_at || p.created_at, now) <= WINDOW_DAYS,
    ).length;
    const active = daysSince(lastWork, now) <= WINDOW_DAYS || daysSince(release, now) <= WINDOW_DAYS || recentPulls > 0;
    const status = !release ? 'Under Development' : active ? 'Actively Maintained' : 'Stable';
    repos[slug] = { status, latest_release: release, last_work_commit: lastWork, open_pulls_last_year: recentPulls };
  }

  const out = {
    updated_at: now.toISOString().slice(0, 10),
    rule: 'No release: Under Development. A release, and a non-housekeeping commit on development, a release, or an open pull request updated in the last 365 days: Actively Maintained. Otherwise Stable.',
    repos,
  };
  fs.writeFileSync(path.join(ROOT, 'static', 'data', 'repo-status.json'), JSON.stringify(out, null, 2) + '\n');

  const dir = path.join(ROOT, 'static', 'badges', 'status');
  fs.mkdirSync(dir, { recursive: true });
  for (const [slug, r] of Object.entries(repos)) {
    const badge = { schemaVersion: 1, label: 'Status', message: r.status, color: COLOURS[r.status], cacheSeconds: 86400 };
    fs.writeFileSync(path.join(dir, `${slug}.json`), JSON.stringify(badge) + '\n');
  }
  const counts = {};
  Object.values(repos).forEach((r) => (counts[r.status] = (counts[r.status] || 0) + 1));
  console.log(`repo status: ${Object.keys(repos).length} repositories`, counts);
}

main();
