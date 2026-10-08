import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import data from '@site/static/data/repo-activity.json';
import { ALL_PROJECTS, BASKETS, BASKET_ACCENT, ICON_CATALOG, isTestbed } from '@site/src/data/baskets';
import ProjectIcon from '@site/src/components/ProjectIcon';
import styles from './styles.module.css';

// Open pull requests, open issues and branches of every 5G-MAG repository, grouped by project
// (static/data/repo-activity.json, refreshed by scripts/fetch-repo-activity.js). Projects, repositories
// and each list fold, so the page stays short until the reader opens what they need.
const LIMIT = 12;

// Tabler outline icons for the three kinds of activity, and the Reference Tools code icon for a repository.
const ICONS = {
  pulls: '<path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M6 8l0 8"/><path d="M11 6h5a2 2 0 0 1 2 2v8"/><path d="M14 9l-3 -3l3 -3"/>',
  issues: '<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>',
  branches: '<path d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M7 8l0 8"/><path d="M9 18h6a2 2 0 0 0 2 -2v-5"/><path d="M14 14l3 -3l3 3"/>',
  repo: '<path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>',
};
export const Icon = ({ k, paths, className }) => (
  <svg className={className || styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: paths || ICONS[k] }} />
);
const basketIcon = (b) => (ICON_CATALOG[b.icon] || []).map((d) => `<path d="${d}"/>`).join('');

// Clusters: one per taxonomy area (basket), in the taxonomy's order, then the projects that belong to no area.
// Repositories no taxonomy project lists are not shown.
export const BASKET_OF = Object.fromEntries(ALL_PROJECTS.map((p) => [p.name, isTestbed(p) ? 'testbeds' : p.basket || null]));
export const CLUSTERS = [
  ...BASKETS.map((b) => ({ key: b.key, title: b.title, icon: basketIcon(b), accent: BASKET_ACCENT[b.key] })),
  { key: 'testbeds', title: 'Testbeds & Evaluation Frameworks', icon: basketIcon({ icon: 'flask' }), accent: BASKET_ACCENT.testbeds },
  { key: null, title: 'Shared libraries and platforms', icon: ICONS.repo, accent: '#587180' },
];

function Items({ items, render }) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, LIMIT);
  return (
    <>
      <ul className={styles.items}>{shown.map(render)}</ul>
      {items.length > LIMIT && (
        <button type="button" className={styles.more} onClick={() => setAll(!all)}>
          {all ? 'Show fewer' : `Show all ${items.length}`}
        </button>
      )}
    </>
  );
}

function List({ label, k, items, render }) {
  if (!items.length) return <div className={styles.none}><Icon k={k} /> {label}: none open</div>;
  return (
    <details className={styles.list}>
      <summary>
        <Icon k={k} /> {label} <span className={styles.n}>{items.length}</span>
      </summary>
      <Items items={items} render={render} />
    </details>
  );
}

// Pull request age, as on the project rows: up to 90 days green, up to 180 days orange, older red.
const ageDays = (d) => (d ? Math.max(0, Math.floor((Date.now() - new Date(d)) / 86400000)) : 0);
const ageClass = (days) => (days <= 90 ? styles.ageNew : days <= 180 ? styles.ageMid : styles.ageOld);
const pr = (p) => (
  <li key={p.number} className={styles.pr}>
    <span className={`${styles.dot} ${ageClass(ageDays(p.created_at))}`} title={`Open for ${ageDays(p.created_at)} days`} />
    <a href={p.url} target="_blank" rel="noreferrer">#{p.number} {p.title}</a>
    <span className={styles.meta}>
      {p.draft && <span className={styles.draft}>Draft</span>} {p.author} · {p.created_at} ({ageDays(p.created_at)} days)
    </span>
  </li>
);
const issue = (i) => (
  <li key={i.number}>
    <a href={i.url} target="_blank" rel="noreferrer">#{i.number} {i.title}</a>
    <span className={styles.meta}>
      {i.author} · {i.created_at}
      {i.labels.map((l) => <span key={l} className={styles.label}>{l}</span>)}
    </span>
  </li>
);
const branchItem = (repo) => (b) => (
  <li key={b.name}>
    <a href={`${repo.url}/tree/${encodeURIComponent(b.name)}`} target="_blank" rel="noreferrer"><code>{b.name}</code></a>
    <span className={styles.meta}>{b.default && <span className={styles.def}>Default</span>} last commit {b.last_commit}</span>
  </li>
);

export function Repo({ r }) {
  // pull requests listed in full, oldest first; issues and branches link straight to GitHub
  const pulls = [...r.pulls].sort((x, y) => (x.created_at || '').localeCompare(y.created_at || ''));
  return (
    <div className={styles.repo}>
      <div className={styles.repoHead}>
        <Icon k="repo" className={styles.repoIcon} />
        <a href={r.url} target="_blank" rel="noreferrer" className={styles.repoName}>{r.repo}</a>
        {r.auxiliary && <span className={styles.aux}>Auxiliary</span>}
        {r.private && <Link className={styles.early} to="/early-access">Early Access</Link>}
        {r.description && <span className={styles.desc}>{r.description}</span>}
        <span className={styles.repoLinks}>
          <a href={`${r.url}/issues`} target="_blank" rel="noreferrer"><Icon k="issues" /> Issues <span className={styles.n}>{r.issues.length}</span> ↗</a>
          <a href={`${r.url}/branches`} target="_blank" rel="noreferrer"><Icon k="branches" /> Branches <span className={styles.n}>{r.branches.length}</span> ↗</a>
          <span className={styles.push}>last push {r.pushed_at}</span>
        </span>
      </div>
      {pulls.length ? (
        <ul className={styles.items}>{pulls.map(pr)}</ul>
      ) : (
        <p className={styles.none}><Icon k="pulls" /> No open pull requests</p>
      )}
    </div>
  );
}

const sum = (repos, k) => repos.reduce((n, r) => n + r[k].length, 0);

function Counts({ repos }) {
  return (
    <span className={styles.counts}>
      <span title="Repositories"><Icon k="repo" /> {repos.length}</span>
      <span title="Open pull requests"><Icon k="pulls" /> {sum(repos, 'pulls')}</span>
      <span title="Open issues"><Icon k="issues" /> {sum(repos, 'issues')}</span>
      <span title="Branches"><Icon k="branches" /> {sum(repos, 'branches')}</span>
    </span>
  );
}

export const ACTIVITY_BY_PROJECT = Object.fromEntries(data.projects.map((p) => [p.name, p.repos]));
export const clusterStyles = styles;
export const AgeKey = () => (
  <span className={styles.ageKey}>
    Pull request age:
    <span><span className={`${styles.dot} ${styles.ageNew}`} /> up to 90 days</span>
    <span><span className={`${styles.dot} ${styles.ageMid}`} /> up to 180 days</span>
    <span><span className={`${styles.dot} ${styles.ageOld}`} /> older</span>
  </span>
);

export default function RepoActivity() {
  const [q, setQ] = useState('');
  const projects = useMemo(() => {
    const t = q.trim().toLowerCase();
    const inTaxonomy = data.projects.filter((p) => p.name in BASKET_OF);
    if (!t) return inTaxonomy;
    return inTaxonomy
      .map((p) => ({ ...p, repos: p.repos.filter((r) => r.repo.toLowerCase().includes(t) || p.name.toLowerCase().includes(t)) }))
      .filter((p) => p.repos.length);
  }, [q]);
  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <label htmlFor="repo-activity-filter" className={styles.sr}>Filter by project or repository</label>
        <input id="repo-activity-filter" type="search" placeholder="Filter by project or repository" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className={styles.legend}>
          <span><Icon k="repo" /> repositories</span><span><Icon k="pulls" /> open pull requests</span>
          <span><Icon k="issues" /> open issues</span><span><Icon k="branches" /> branches</span>
        </span>
        <span className={styles.meta}>Updated {data.updated_at}</span>
      </div>
      {CLUSTERS.map((c) => {
        const ps = projects.filter((p) => BASKET_OF[p.name] === c.key);
        if (!ps.length) return null;
        return (
          <section key={c.title} className={styles.cluster} style={{ '--accent': c.accent }}>
            <h3 className={styles.clusterTitle}><span className={styles.clusterIcon}><Icon paths={c.icon} /></span>{c.title}</h3>
            <div className={styles.grid}>
              {ps.map((p) => (
                <details key={p.name} className={styles.project} open={!!q.trim()}>
                  <summary>
                    <span className={styles.pIcon}><ProjectIcon name={p.name} /></span>
                    <span className={styles.pname}>{p.name}</span>
                    <Counts repos={p.repos} />
                  </summary>
                  {p.doc_url && <Link className={styles.doc} to={p.doc_url}>Project page</Link>}
                  <div className={styles.repoGrid}>{p.repos.map((r) => <Repo key={r.repo} r={r} />)}</div>
                </details>
              ))}
            </div>
          </section>
        );
      })}
      {!projects.length && <p className={styles.meta}>No project or repository matches.</p>}
    </div>
  );
}
