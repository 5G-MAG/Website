#!/usr/bin/env node
// Suggests which companies actively contribute to each Reference
// Tools/Testbeds project, derived from real commit authorship
// cross-referenced against GitHub CLA team membership (one team per
// company, named "CLA <Company>").
//
// IMPORTANT: this writes a DRAFT to static/data/project-contributors-draft.json,
// not directly into src/data/projects.json's own `contributors` field. That
// field is hand-curated on top of this signal — it includes corrections this
// script cannot derive on its own (a contributor active only via open PRs
// rather than merged commits, a company self-reported on a contributor's
// GitHub profile rather than CLA-team membership, or a deliberate distinction
// between a member entity and its contributing subsidiary). Overwriting it
// automatically would silently discard that manual review. Re-run this
// on demand, diff the draft against projects.json's `contributors`, and
// merge by hand.
//
// Requires SYNC_TOKEN with `repo` + `read:org` scopes on the 5G-MAG org
// (read:org for team listings/membership, repo since some tracked repos
// are private).
const https = require('https');
const fs = require('fs');
const path = require('path');
const { PROJECTS, repoName } = require('./lib/projects');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'project-contributors-draft.json');

// Repos shared across many projects (utility/common code, not specific to
// any one project) -- excluded as evidence everywhere except a project
// whose *own* repo list is exactly this set (e.g. Common Tools), where
// it's the genuine subject rather than noise.
const SHARED_REPOS = new Set(['rt-common-shared']);

// Maps each company's CLA team slug to the exact company name used in
// src/data/contributors.js -- keep in sync if either list changes.
const TEAM_TO_COMPANY = {
  'cla-bbc': 'BBC - British Broadcasting Corporation',
  'cla-bbm': 'Big Blue Marble',
  'cla-bitstem': 'Bitstem',
  'cla-dolby': 'Dolby Laboratories',
  'cla-ebu': 'EBU - European Broadcasting Union',
  'cla-ericsson': 'Ericsson',
  'cla-fraunhofer-fokus': 'Fraunhofer FOKUS',
  'cla-huawei': 'Huawei',
  'cla-interdigital': 'InterDigital',
  'cla-motion-spell': 'Motion Spell',
  'cla-nokia': 'Nokia',
  'cla-philips': 'Philips',
  'cla-phine-tech': 'phine.tech',
  'cla-qualcomm': 'Qualcomm',
  'cla-upv': 'iTEAM - Universitat Politècnica de València',
};

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-project-contributors-script',
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
          if (!data.trim()) {
            resolve([]);
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

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) {
    throw new Error('SYNC_TOKEN/GITHUB_TOKEN required (needs read:org + repo scopes).');
  }

  console.log('Building username -> company map from CLA teams...');
  const usernameToCompany = new Map();
  for (const [slug, company] of Object.entries(TEAM_TO_COMPANY)) {
    let members;
    try {
      members = await apiGet(`/orgs/${ORG}/teams/${slug}/members?per_page=100`);
    } catch (e) {
      console.warn(`  skip team ${slug}: ${e.message}`);
      continue;
    }
    for (const m of members) {
      const set = usernameToCompany.get(m.login) || new Set();
      set.add(company);
      usernameToCompany.set(m.login, set);
    }
    console.log(`  ${slug}: ${members.length} members`);
  }

  console.log('Fetching commit contributors per repo...');
  const allRepos = new Set();
  for (const project of PROJECTS) {
    for (const entry of project.repos) allRepos.add(repoName(entry));
  }

  const repoContributors = new Map();
  for (const repo of allRepos) {
    try {
      const data = await apiGet(`/repos/${ORG}/${repo}/contributors?per_page=100&anon=false`);
      repoContributors.set(repo, data.map((c) => ({ login: c.login, commits: c.contributions })));
    } catch (e) {
      console.warn(`  skip ${repo}: ${e.message}`);
      repoContributors.set(repo, []);
    }
  }

  console.log('Cross-referencing per project...');
  const suggestions = [];
  for (const project of PROJECTS) {
    const repos = project.repos.map(repoName);
    const isSharedRepoProject = repos.every((r) => SHARED_REPOS.has(r));
    const companies = new Map(); // company -> [{ login, repo, commits }]

    for (const repo of repos) {
      if (SHARED_REPOS.has(repo) && !isSharedRepoProject) continue;
      for (const c of repoContributors.get(repo) || []) {
        const comps = usernameToCompany.get(c.login);
        if (!comps) continue;
        for (const company of comps) {
          const list = companies.get(company) || [];
          list.push({ login: c.login, repo, commits: c.commits });
          companies.set(company, list);
        }
      }
    }

    suggestions.push({
      name: project.name,
      suggested_contributors: [...companies.keys()].sort(),
      evidence: Object.fromEntries(companies),
    });
  }

  const output = {
    updated_at: formatTimestamp(new Date()),
    note:
      'Draft only -- cross-reference against src/data/projects.json\'s hand-curated `contributors` ' +
      'field before merging. This signal misses PR-only/review-only contribution and any company ' +
      'affiliation not reflected in CLA team membership.',
    projects: suggestions,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote draft suggestions for ${suggestions.length} projects to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
