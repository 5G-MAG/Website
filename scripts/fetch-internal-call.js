#!/usr/bin/env node
// Writes static/data/internal-call.json for the Developers' Internal Call page (/internal-call): per project, what
// the call should look at, read from GitHub for every repository the taxonomy lists, public or private.
//
//   new          pull requests and issues raised or updated in the last ACTIVE_DAYS days (drafts are marked as drafts)
//   release      repositories with work merged into `development` in the last RECENT_DAYS days that is not yet in
//                `main`: Ready (no open pull request for the next milestone), Waiting (some are) or No milestone
//                A repository that has never had a release is listed as No release.
//   discussions  GitHub Discussions updated in the last RECENT_DAYS days
//   stalled      every other open pull request and issue, so that nothing open is left out; an issue nobody has
//                commented on is marked as unanswered
//
// Items of private repositories are listed with their titles, like the others (at the site owner's request). A
// repository belongs to the project of type platform that lists it, else to the first project that lists it. Pull
// requests that only apply the README format are left out. Needs repo-activity.json (fetch-repo-activity.js runs
// before) and SYNC_TOKEN or GITHUB_TOKEN.
const https = require('https');
const { PROJECTS } = require('./lib/projects');
const fs = require('fs');
const path = require('path');

const ORG = '5G-MAG';
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const ACTIVE_DAYS = 30;
const RECENT_DAYS = 30;
const README_FORMAT = 'docs: apply the 5G-MAG README format';
const DATA = path.join(__dirname, '..', 'static', 'data');

function request(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method,
        hostname: 'api.github.com',
        path: urlPath,
        headers: {
          'User-Agent': '5g-mag-portal-internal-call-script',
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
      },
    );
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function pages(basePath) {
  const all = [];
  for (let page = 1; ; page += 1) {
    const sep = basePath.includes('?') ? '&' : '?';
    const body = await request('GET', `${basePath}${sep}per_page=100&page=${page}`);
    all.push(...body);
    if (body.length < 100) return all;
  }
}

const today = new Date();
const days = (iso) => Math.floor((today - new Date(iso)) / 86400000);
const version = (t) => ((t.match(/\d+/g) || []).slice(0, 3).map(Number));
function cmpVersion(a, b) {
  const x = version(a.title);
  const y = version(b.title);
  for (let i = 0; i < 3; i += 1) if ((x[i] ?? 9999) !== (y[i] ?? 9999)) return (x[i] ?? 9999) - (y[i] ?? 9999);
  return 0;
}

async function discussions(repo) {
  const query = `query($o:String!,$n:String!){repository(owner:$o,name:$n){hasDiscussionsEnabled discussions(first:10,orderBy:{field:UPDATED_AT,direction:DESC}){nodes{title url updatedAt comments{totalCount}}}}}`;
  const r = await request('POST', '/graphql', { query, variables: { o: ORG, n: repo } });
  const repoData = r.data && r.data.repository;
  return repoData && repoData.hasDiscussionsEnabled ? repoData.discussions.nodes : [];
}

async function main() {
  if (!TOKEN) throw new Error('SYNC_TOKEN or GITHUB_TOKEN is required.');
  const activity = JSON.parse(fs.readFileSync(path.join(DATA, 'repo-activity.json'), 'utf8'));
  const owner = new Map();
  // A platform claims its repositories first: open5gs belongs to 3GPP RAN and Core Platforms, not to the project
  // that builds on it.
  const platforms = new Set(PROJECTS.filter((q) => q.type === 'platform').map((q) => q.name));
  const ordered = [...activity.projects.filter((p) => platforms.has(p.name)), ...activity.projects.filter((p) => !platforms.has(p.name))];
  for (const p of ordered) for (const r of p.repos) if (!owner.has(r.repo)) owner.set(r.repo, p.name);

  const out = { updated_at: today.toISOString().slice(0, 16).replace('T', ' ') + ' UTC', windows: { ACTIVE_DAYS, RECENT_DAYS }, projects: [] };
  const byName = new Map();
  for (const p of activity.projects) {
    const entry = { name: p.name, doc_url: p.doc_url, new: [], release: [], discussions: [], stalled: [] };
    byName.set(p.name, entry);
    out.projects.push(entry);
  }

  const done = new Set();
  for (const p of activity.projects) {
    for (const r of p.repos) {
      if (done.has(r.repo)) continue;
      done.add(r.repo);
      const entry = byName.get(owner.get(r.repo));
      const priv = Boolean(r.private);
      const item = (kind, n, title, url, extra) => ({ kind, repo: r.repo, number: n, title, url, ...extra });
      try {
        // issues: the real update date and labels (repo-activity.json has neither)
        const issues = r.issues.length
          ? (await pages(`/repos/${ORG}/${r.repo}/issues?state=open`)).filter((i) => !i.pull_request)
          : [];
        for (const i of issues) {
          const bug = i.labels.some((l) => l.name === 'bug');
          const idle = days(i.updated_at);
          if (days(i.created_at) <= ACTIVE_DAYS || idle <= ACTIVE_DAYS) entry.new.push(item('issue', i.number, i.title, i.html_url, { bug, date: i.created_at.slice(0, 10) }));
          else entry.stalled.push(item('issue', i.number, i.title, i.html_url, { bug, idle, unanswered: i.comments === 0 }));
        }
        for (const q of r.pulls) {
          if (q.title.startsWith(README_FORMAT)) continue;
          const idle = days(q.updated_at || q.created_at);
          if (days(q.created_at) <= ACTIVE_DAYS || idle <= ACTIVE_DAYS) entry.new.push(item('pull', q.number, q.title, q.url, { draft: q.draft, date: q.created_at }));
          else entry.stalled.push(item('pull', q.number, q.title, q.url, { draft: q.draft, idle }));
        }
        // release readiness
        const names = (r.branches || []).map((b) => b.name);
        const main = (r.branches || []).find((b) => b.default);
        if (names.includes('development') && main && main.name !== 'development') {
          const cmp = await request('GET', `/repos/${ORG}/${r.repo}/compare/${main.name}...development`);
          if (cmp.ahead_by > 0) {
            const closed = await request('GET', `/repos/${ORG}/${r.repo}/pulls?state=closed&base=development&sort=updated&direction=desc&per_page=20`);
            const recent = closed.filter((x) => x.merged_at && days(x.merged_at) <= RECENT_DAYS);
            if (recent.length) {
              const milestones = (await pages(`/repos/${ORG}/${r.repo}/milestones?state=open`)).sort(cmpVersion);
              let status = 'No milestone';
              let milestone = null;
              let pending = [];
              if (milestones.length) {
                milestone = milestones[0].title;
                const open = await pages(`/repos/${ORG}/${r.repo}/pulls?state=open`);
                pending = open.filter((q) => q.milestone && q.milestone.title === milestone).map((q) => q.number);
                status = pending.length ? 'Waiting' : 'Ready';
              }
              entry.release.push({ repo: r.repo, private: priv, status, ahead: cmp.ahead_by, milestone, pending, latest_release: r.latest_release || null });
            }
          }
        }
        // a repository that has never had a release is listed too, whatever its recent activity
        if (!r.latest_release && !entry.release.some((x) => x.repo === r.repo)) {
          const ahead = names.includes('development') && main && main.name !== 'development'
            ? (await request('GET', `/repos/${ORG}/${r.repo}/compare/${main.name}...development`)).ahead_by
            : 0;
          const milestones = (await pages(`/repos/${ORG}/${r.repo}/milestones?state=open`)).sort(cmpVersion);
          entry.release.push({ repo: r.repo, private: priv, status: 'No release', ahead, milestone: milestones.length ? milestones[0].title : null, pending: [], latest_release: null });
        }
        // discussions
        for (const d of await discussions(r.repo)) {
          if (days(d.updatedAt) <= RECENT_DAYS) entry.discussions.push({ repo: r.repo, title: d.title, url: d.url, date: d.updatedAt.slice(0, 10), comments: d.comments.totalCount });
        }
      } catch (e) {
        console.warn(`  skip ${r.repo}: ${e.message}`);
      }
    }
  }
  for (const e of out.projects) {
    e.new.sort((a, b) => b.date.localeCompare(a.date));
    e.stalled.sort((a, b) => b.idle - a.idle);
    e.discussions.sort((a, b) => b.date.localeCompare(a.date));
    const order = { Ready: 0, Waiting: 1, 'No milestone': 2, 'No release': 3 };
    e.release.sort((a, b) => order[a.status] - order[b.status] || b.ahead - a.ahead);
  }
  fs.writeFileSync(path.join(DATA, 'internal-call.json'), `${JSON.stringify(out)}\n`);
  const n = out.projects.reduce((s, p) => s + p.new.length, 0);
  console.log(`Wrote ${out.projects.length} projects, ${n} new items`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
