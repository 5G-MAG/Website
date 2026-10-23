import React from 'react';
import data from '@site/static/data/internal-call.json';
import taxonomy from '@site/src/data/taxonomy.json';
import { isTestbed, typeOf } from '@site/src/data/baskets';
import styles from './styles.module.css';

// The agenda of the Developers' Internal Call, built from static/data/internal-call.json (scripts/fetch-internal-call.js):
// per project, the repositories ready to release, the new pull requests, issues and discussions, and the stalled items.
// A pull request and an issue are different things and are drawn differently: its own icon and colour. Items of
// private repositories are listed with their titles, like the others.

const ORG = 'https://github.com/5G-MAG';
const W = data.windows;

const svg = (children) => (
  <svg className={styles.ic} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const PR_ICON = svg(<><circle cx="6" cy="18" r="2" /><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M6 8v8" /><path d="M11 6h5a2 2 0 0 1 2 2v8" /></>);
const ISSUE_ICON = svg(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1" /></>);
const DISC_ICON = svg(<path d="M4 5h16v11H9l-5 4z" />);

const plural = (n, one, many) => `${n} ${n === 1 ? one : many ?? `${one}s`}`;

function Repo({ name }) {
  return <a className={styles.repo} href={`${ORG}/${name}`} target="_blank" rel="noreferrer">{name}</a>;
}

function Kind({ item }) {
  if (item.kind === 'pull') return <span className={`${styles.kind} ${styles.pr}`}>{PR_ICON} {item.draft ? 'Draft pull request' : 'Pull request'}</span>;
  if (item.kind === 'discussion') return <span className={`${styles.kind} ${styles.disc}`}>{DISC_ICON} Discussion</span>;
  return <span className={`${styles.kind} ${styles.issue}`}>{ISSUE_ICON} Issue{item.bug ? ' · bug' : ''}</span>;
}

function Row({ item, right }) {
  const label = item.title || `#${item.number}, title not shown (private repository)`;
  return (
    <tr>
      <td><Kind item={item} /></td>
      <td><Repo name={item.repo} /> <a href={item.url} target="_blank" rel="noreferrer">{label}</a></td>
      <td className={`${styles.muted} ${styles.nowrap}`}>{right}</td>
    </tr>
  );
}

const isReview = (i) => i.kind === 'pull' && !i.draft;
const issuesOf = (p) => p.new.filter((i) => i.kind === 'issue').sort((a, b) => Number(b.bug) - Number(a.bug));
const discItems = (p) => p.discussions.map((d) => ({ ...d, kind: 'discussion', number: 0 }));

function Chips({ prs, issues, discs }) {
  const bugs = issues.filter((i) => i.bug).length;
  return (
    <div className={styles.chips}>
      {prs > 0 && <span className={`${styles.kind} ${styles.pr}`}>{PR_ICON} {plural(prs, 'pull request')} to review</span>}
      {issues.length > 0 && <span className={`${styles.kind} ${styles.issue}`}>{ISSUE_ICON} {plural(issues.length, 'new issue')}{bugs ? `, ${bugs} bug` : ''}</span>}
      {discs > 0 && <span className={`${styles.kind} ${styles.disc}`}>{DISC_ICON} {plural(discs, 'discussion')}</span>}
    </div>
  );
}

// The classification of the projects: first the taxonomy baskets (the platforms and shared tools, which belong to no
// basket, come first), then in each basket the type of tool, as everywhere on the site.
const OTHER = 'other';
const BASKET_LABEL = { ...Object.fromEntries(taxonomy.baskets.map((b) => [b.key, b.title])), [OTHER]: 'Platforms and shared tools' };
const BASKET_ORDER = [OTHER, ...taxonomy.baskets.map((b) => b.key)];
const basketByName = new Map(taxonomy.projects.map((p) => [p.name, p.basket || OTHER]));
const basketOf = (p) => basketByName.get(p.name) || OTHER;
const TYPE_ORDER = ['platform', 'reference-tool', 'testbed', 'validation-tool', 'developer-tools', 'common-tools', 'project'];
const TYPE_PLURAL = {
  platform: 'Platforms',
  'reference-tool': 'Reference Tools',
  testbed: 'Testbeds and Evaluation Frameworks',
  'validation-tool': 'Validation Tools',
  'developer-tools': 'Developer Tools',
  'common-tools': 'Common Tools',
  project: 'Projects',
};
// A testbed and an evaluation framework are one type, as everywhere on the site (isTestbed in baskets.js).
const typeByName = new Map(taxonomy.projects.map((p) => [p.name, isTestbed(p) ? 'testbed' : typeOf(p)]));
const typeOfProject = (p) => typeByName.get(p.name) || 'project';
const groupsOf = (list) => BASKET_ORDER
  .map((key) => {
    const inBasket = list.filter((p) => basketOf(p) === key);
    return {
      type: key,
      label: BASKET_LABEL[key],
      count: inBasket.length,
      subs: TYPE_ORDER
        .map((type) => ({ type, label: TYPE_PLURAL[type], list: inBasket.filter((p) => typeOfProject(p) === type) }))
        .filter((g) => g.list.length > 0),
    };
  })
  .filter((g) => g.count > 0);
// The anchor of a project's block on this page, from the project's own address (its name where it has none).
const anchorOf = (p) => `project-${(p.doc_url || p.name).replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
const hasWork = (p) => p.new.length || p.release.length || p.stalled.length || p.discussions.length;

const statusClass = { Ready: 'ready', Waiting: 'waiting', 'No milestone': 'nomilestone', 'No release': 'nomilestone' };

export default function InternalCall() {
  const projects = data.projects;
  const stalledTotal = projects.reduce((s, p) => s + p.stalled.length, 0);
  const unanswered = projects.reduce((s, p) => s + p.stalled.filter((i) => i.unanswered).length, 0);
  const prsStalled = projects.reduce((s, p) => s + p.stalled.filter((i) => i.kind === 'pull').length, 0);
  const bugsStalled = stalledTotal - prsStalled;
  const releases = projects.flatMap((p) => p.release);
  const count = (s) => releases.filter((r) => r.status === s).length;
  const allPrs = projects.flatMap((p) => p.new.filter(isReview));
  const allBugs = projects.flatMap((p) => p.new.filter((i) => i.kind === 'issue' && i.bug));
  const allDisc = projects.flatMap((p) => p.discussions);

  const plan = [
    ['0:00', '5 min', 'Welcome and news', ''],
    ['0:05', '25 min', 'Ready for release', `${count('Ready')} ready, ${count('Waiting')} waiting, ${count('No milestone')} without a milestone`],
    ['0:30', '25 min', 'Pull requests to review', plural(allPrs.length, 'pull request')],
    ['0:55', '15 min', 'New issues and discussions', `${plural(allBugs.length, 'bug issue')}, ${plural(allDisc.length, 'discussion')}`],
    ['1:10', '15 min', 'Stalled and project round', `${plural(stalledTotal, 'stalled item')}: unblock, hand over or close`],
    ['1:25', '5 min', 'Next steps and owners', ''],
  ];

  const groups = groupsOf(projects);

  return (
    <div className={styles.page}>
      <p className={styles.updated}>Data of {data.updated_at}. Every repository linked to a project is counted, private ones too, and every title is shown.</p>

      <div className={styles.notice} role="note">
        <strong>&#9888; {plural(stalledTotal, 'stalled item')}.</strong> Every open pull request and issue with no activity for {W.ACTIVE_DAYS} days: {plural(prsStalled, 'pull request')} and {plural(bugsStalled, 'issue')}, of which {unanswered} nobody has answered. They are not on the agenda; each project below carries a folded list with its own.
      </div>

      <h2>Suggested Agenda for the call: 90 minutes</h2>
      <div className={styles.tableBox}>
        <table className={styles.grid}>
          <thead><tr><th>Time</th><th>Length</th><th>Part</th><th>What fits today</th></tr></thead>
          <tbody>
          {plan.map(([t, m, what, detail]) => (
            <tr key={t}><td className={styles.muted}>{t}</td><td><strong>{m}</strong></td><td>{what}</td><td className={styles.muted}>{detail}</td></tr>
          ))}
        </tbody></table>
      </div>

      <h2>At a glance, by project</h2>
      <div className={styles.tableBox}>
        <table className={styles.grid}>
          <thead>
            <tr><th>Project</th><th className={styles.center}>{PR_ICON} Pull requests to review</th><th className={styles.center}>{ISSUE_ICON} New issues (bugs)</th><th className={styles.center}>{DISC_ICON} Discussions</th><th className={styles.center}>Ready to release</th><th className={styles.center}>&#9888; Stalled</th></tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <React.Fragment key={g.type}>
                <tr><th colSpan={6} className={styles.groupRow}>{g.label} <span className={styles.muted}>({g.count})</span></th></tr>
            {g.subs.map((sub) => (
              <React.Fragment key={sub.type}>
                <tr><th colSpan={6} className={styles.subRow}>{sub.label}</th></tr>
            {sub.list.map((p) => {
              const prs = p.new.filter(isReview).length;
              const drafts = p.new.filter((i) => i.kind === 'pull' && i.draft).length;
              const issues = issuesOf(p);
              const bugs = issues.filter((i) => i.bug).length;
              const num = (n) => (n > 0 ? <strong>{n}</strong> : <span className={styles.muted}>0</span>);
              return (
                <tr key={p.name}>
                  <td>{hasWork(p) ? <a href={`#${anchorOf(p)}`}><strong>{p.name}</strong></a> : <strong>{p.name}</strong>}</td>
                  <td className={styles.center}>{num(prs)}{drafts > 0 && <span className={styles.muted}> (+{drafts} draft{drafts === 1 ? '' : 's'})</span>}</td>
                  <td className={styles.center}>{num(issues.length)}{bugs > 0 && <span className={styles.muted}> ({bugs})</span>}</td>
                  <td className={styles.center}>{num(p.discussions.length)}</td>
                  <td className={styles.center}>{num(p.release.filter((r) => r.status === 'Ready').length)}</td>
                  <td className={styles.center}>{p.stalled.length > 0 ? <span className={styles.warn}>&#9888; {p.stalled.length}</span> : <span className={styles.muted}>0</span>}</td>
                </tr>
              );
            })}
              </React.Fragment>
            ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Project by project</h2>
      <p className={styles.muted}>
        One block per project, grouped by the baskets of the taxonomy: its release status, then its pull requests, issues and discussions, then its stalled items.
        A <span className={`${styles.kind} ${styles.pr}`}>pull request</span> is a proposed change to the code, raised or updated in the last {W.ACTIVE_DAYS} days and ready for review (drafts are listed too, marked as drafts, and are not counted);
        an <span className={`${styles.kind} ${styles.issue}`}>issue</span> is a reported problem or request, raised or updated in the last {W.ACTIVE_DAYS} days, bugs first; every older open one is under stalled;
        a <span className={`${styles.kind} ${styles.disc}`}>discussion</span> is a GitHub Discussion updated in the last {W.RECENT_DAYS} days.
        Release status: <span className={`${styles.status} ${styles.ready}`}>Ready</span> no pull request is open for the next milestone;{' '}
        <span className={`${styles.status} ${styles.waiting}`}>Waiting</span> some are, and the numbers are listed;{' '}
        <span className={`${styles.status} ${styles.nomilestone}`}>No milestone</span> none is open, so nothing can be said; <span className={`${styles.status} ${styles.nomilestone}`}>No release</span> the repository has never had a release. The next milestone is the open one with the lowest version number.
      </p>
      {groups.map((g) => (
        <React.Fragment key={g.type}>
      <h3 className={styles.groupTitle}>{g.label}</h3>
      {g.subs.map((sub) => (
        <React.Fragment key={sub.type}>
      <h4 className={styles.subTitle}>{sub.label}</h4>
      {sub.list.filter((p) => !hasWork(p)).length > 0 && (
        <p className={styles.muted}>Nothing to look at: {sub.list.filter((p) => !hasWork(p)).map((p) => p.name).join(', ')}.</p>
      )}
      {sub.list.filter(hasWork).map((p) => {
        const prs = p.new.filter(isReview);
        const issues = issuesOf(p);
        const discs = discItems(p);
        const drafts = p.new.filter((i) => i.kind === 'pull' && i.draft);
        const items = [
          ...prs.map((i) => ({ i, date: i.date.slice(0, 10) })),
          ...drafts.map((i) => ({ i, date: i.date.slice(0, 10) })),
          ...issues.map((i) => ({ i, date: i.date })),
          ...discs.map((i) => ({ i, date: i.date })),
        ];
        const itemTable = (list) => (
          <table className={styles.grid}>
            <thead><tr><th>Kind</th><th>Repository and title</th><th>Date</th></tr></thead>
            <tbody>{list.map(({ i, date }) => <Row key={`${i.kind}${i.repo}${i.number}${i.url}`} item={i} right={date} />)}</tbody>
          </table>
        );
        return (
          <section key={p.name} id={anchorOf(p)} className={styles.card}>
            <div className={styles.cardHead}>
              <h3>{p.name}{p.doc_url && <a className={styles.pageLink} href={p.doc_url}>project page</a>}</h3>
              <Chips prs={prs.length} issues={issues} discs={discs.length} />
            </div>
            <div className={styles.cardBody}>
              {p.release.length > 0 && (
                <>
                  <h4 className={styles.part}>Release</h4>
                  <table className={styles.grid}>
                    <thead><tr><th>Status</th><th>Repository</th><th>Next milestone</th><th>Commits ahead of main</th><th>Open PRs in it</th></tr></thead>
                    <tbody>
                      {p.release.map((r) => (
                        <tr key={r.repo}>
                          <td><span className={`${styles.status} ${styles[statusClass[r.status]]}`}>{r.status}</span></td>
                          <td><Repo name={r.repo} /></td>
                          <td>{r.milestone ? <a href={`${ORG}/${r.repo}/milestones`} target="_blank" rel="noreferrer">{r.milestone}</a> : <span className={styles.muted}>none open</span>}</td>
                          <td className={styles.center}><a href={`${ORG}/${r.repo}/compare/main...development`} target="_blank" rel="noreferrer">{r.ahead}</a></td>
                          <td>{(r.status === 'No milestone' || r.status === 'No release') ? <span className={styles.muted}>none</span> : r.pending.length === 0 ? '0' : r.pending.map((n, k) => (
                            <React.Fragment key={n}>{k > 0 && ', '}<a href={`${ORG}/${r.repo}/pull/${n}`} target="_blank" rel="noreferrer">#{n}</a></React.Fragment>
                          ))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              {items.length > 0 && (
                <>
                  <h4 className={styles.part}>Pull requests, issues and discussions</h4>
                  {itemTable(items.slice(0, 6))}
                  {items.length > 6 && (
                    <details className={styles.more}>
                      <summary>Show the other {items.length - 6}</summary>
                      {itemTable(items.slice(6))}
                    </details>
                  )}
                </>
              )}
              {p.stalled.length > 0 && (
                <details className={styles.more}>
                  <summary><span className={styles.warn}>&#9888; {p.stalled.length} stalled</span> <span className={styles.muted}>kept off the agenda: open to see</span></summary>
                  <table className={styles.grid}>
                    <thead><tr><th>Kind</th><th>Repository and title</th><th>Idle</th></tr></thead>
                    <tbody>{p.stalled.map((i) => <Row key={`s${i.repo}${i.number}`} item={i} right={i.unanswered ? `${i.idle} days, no reply` : `${i.idle} days`} />)}</tbody>
                  </table>
                </details>
              )}
            </div>
          </section>
        );
      })}
        </React.Fragment>
      ))}
        </React.Fragment>
      ))}
    </div>
  );
}
