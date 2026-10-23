import React from 'react';
import data from '@site/static/data/internal-call.json';
import styles from './styles.module.css';

// The agenda of the Developers' Internal Call, built from static/data/internal-call.json (scripts/fetch-internal-call.js):
// per project, the repositories ready to release, the new pull requests, issues and discussions, and the stalled items.
// A pull request and an issue are different things and are drawn differently: its own icon and colour. Items of
// private repositories carry no title (the data has none), only the repository and the number.

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

const statusClass = { Ready: 'ready', Waiting: 'waiting', 'No milestone': 'nomilestone' };

export default function InternalCall() {
  const projects = data.projects;
  const stalledTotal = projects.reduce((s, p) => s + p.stalled.length, 0);
  const backlogTotal = projects.reduce((s, p) => s + p.backlog, 0);
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

  const active = projects.filter((p) => p.new.length || p.release.length || p.stalled.length || p.discussions.length);

  return (
    <div className={styles.page}>
      <p className={styles.updated}>Data of {data.updated_at}. Every repository linked to a project is counted, private ones too; the titles of items in private repositories are never shown.</p>

      <div className={styles.notice} role="note">
        <strong>&#9888; {plural(stalledTotal, 'stalled item')}.</strong> {plural(prsStalled, 'pull request')} with no update for {W.STALE_DAYS} days or more and {plural(bugsStalled, 'bug')} with no update for {W.BUG_DAYS} days or more. They are not on the agenda; each project below carries a folded warning with its own. A further <strong>{backlogTotal} issues</strong> have had no update for a year or more: a backlog to clean up, counted here and not listed.
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
            {active.map((p) => {
              const prs = p.new.filter(isReview).length;
              const issues = issuesOf(p);
              const bugs = issues.filter((i) => i.bug).length;
              const num = (n) => (n > 0 ? <strong>{n}</strong> : <span className={styles.muted}>0</span>);
              return (
                <tr key={p.name}>
                  <td><strong>{p.name}</strong></td>
                  <td className={styles.center}>{num(prs)}</td>
                  <td className={styles.center}>{num(issues.length)}{bugs > 0 && <span className={styles.muted}> ({bugs})</span>}</td>
                  <td className={styles.center}>{num(p.discussions.length)}</td>
                  <td className={styles.center}>{num(p.release.filter((r) => r.status === 'Ready').length)}</td>
                  <td className={styles.center}>{p.stalled.length > 0 ? <span className={styles.warn}>&#9888; {p.stalled.length}</span> : <span className={styles.muted}>0</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Project by project</h2>
      <p className={styles.muted}>
        One block per project: its release status, then its pull requests, issues and discussions, then its stalled items.
        A <span className={`${styles.kind} ${styles.pr}`}>pull request</span> is a proposed change to the code, raised in the last {W.NEW_DAYS} days and ready for review (drafts are not counted);
        an <span className={`${styles.kind} ${styles.issue}`}>issue</span> is a reported problem or request, raised in the last {W.NEW_DAYS} days, bugs first;
        a <span className={`${styles.kind} ${styles.disc}`}>discussion</span> is a GitHub Discussion updated in the last {W.RECENT_DAYS} days.
        Release status: <span className={`${styles.status} ${styles.ready}`}>Ready</span> no pull request is open for the next milestone;{' '}
        <span className={`${styles.status} ${styles.waiting}`}>Waiting</span> some are, and the numbers are listed;{' '}
        <span className={`${styles.status} ${styles.nomilestone}`}>No milestone</span> none is open, so nothing can be said. The next milestone is the open one with the lowest version number.
      </p>
      {active.map((p) => {
        const prs = p.new.filter(isReview);
        const issues = issuesOf(p);
        const discs = discItems(p);
        const items = [
          ...prs.map((i) => ({ i, date: i.date.slice(0, 10) })),
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
          <section key={p.name} className={styles.card}>
            <div className={styles.cardHead}>
              <h3>{p.name}</h3>
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
                          <td>{r.status === 'No milestone' ? <span className={styles.muted}>no milestone</span> : r.pending.length === 0 ? '0' : r.pending.map((n, k) => (
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
                    <tbody>{p.stalled.map((i) => <Row key={`s${i.repo}${i.number}`} item={i} right={`${i.idle} days`} />)}</tbody>
                  </table>
                </details>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
