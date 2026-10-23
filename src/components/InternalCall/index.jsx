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
      <td className={styles.muted}>{right}</td>
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

  const withRelease = projects.filter((p) => p.release.length > 0);
  const withItems = projects.filter((p) => p.new.length || p.discussions.length);
  const active = projects.filter((p) => p.new.length || p.release.length || p.stalled.length || p.discussions.length);

  return (
    <div className={styles.page}>
      <p className={styles.updated}>Data of {data.updated_at}. Every repository linked to a project is counted, private ones too; the titles of items in private repositories are never shown.</p>

      <div className={styles.notice} role="note">
        <strong>&#9888; {plural(stalledTotal, 'stalled item')}.</strong> {plural(prsStalled, 'pull request')} with no update for {W.STALE_DAYS} days or more and {plural(bugsStalled, 'bug')} with no update for {W.BUG_DAYS} days or more. They are not on the agenda; each project below carries a folded warning with its own. A further <strong>{backlogTotal} issues</strong> have had no update for a year or more: a backlog to clean up, counted here and not listed.
      </div>

      <h2>Suggested Agenda for the call: 90 minutes</h2>
      <div className={styles.tableBox}>
        <table><tbody>
          {plan.map(([t, m, what, detail]) => (
            <tr key={t}><td className={styles.muted}>{t}</td><td><strong>{m}</strong></td><td>{what}</td><td className={styles.muted}>{detail}</td></tr>
          ))}
        </tbody></table>
      </div>

      <h2>Ready for release, by project</h2>
      <p className={styles.muted}>
        Work merged into <code>development</code> in the last {W.RECENT_DAYS} days and not yet in <code>main</code>.{' '}
        <span className={`${styles.status} ${styles.ready}`}>Ready</span> no pull request is open for the next milestone;{' '}
        <span className={`${styles.status} ${styles.waiting}`}>Waiting</span> some are, and the numbers are listed;{' '}
        <span className={`${styles.status} ${styles.nomilestone}`}>No milestone</span> no milestone is open, so nothing can be said. The next milestone is the open one with the lowest version number.
      </p>
      {withRelease.map((p) => (
        <section key={p.name} className={styles.project}>
          <h3>{p.name}</h3>
          <div className={styles.tableBox}>
            <table>
              <thead><tr><th>Status</th><th>Repository</th><th>Next milestone</th><th>Commits ahead of main</th><th>Open PRs in it</th></tr></thead>
              <tbody>
                {p.release.map((r) => (
                  <tr key={r.repo}>
                    <td><span className={`${styles.status} ${styles[statusClass[r.status]]}`}>{r.status}</span></td>
                    <td><Repo name={r.repo} /></td>
                    <td>{r.milestone ? <a href={`${ORG}/${r.repo}/milestones`} target="_blank" rel="noreferrer">{r.milestone}</a> : <span className={styles.muted}>none open</span>}</td>
                    <td className={styles.center}><a href={`${ORG}/${r.repo}/compare/main...development`} target="_blank" rel="noreferrer">{r.ahead}</a></td>
                    <td>{r.status === 'No milestone' ? <span className={styles.muted}>no milestone</span> : r.pending.length === 0 ? '0' : r.pending.map((n, i) => (
                      <React.Fragment key={n}>{i > 0 && ', '}<a href={`${ORG}/${r.repo}/pull/${n}`} target="_blank" rel="noreferrer">#{n}</a></React.Fragment>
                    ))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <h2>Pull requests, issues and discussions, by project</h2>
      <p className={styles.muted}>
        Three different things, each with its own icon and colour:{' '}
        <span className={`${styles.kind} ${styles.pr}`}>PR</span> a <strong>pull request</strong>, a proposed change to the code, raised in the last {W.NEW_DAYS} days and ready for review (drafts are not counted);{' '}
        <span className={`${styles.kind} ${styles.issue}`}>issue</span> an <strong>issue</strong>, a reported problem or request, raised in the last {W.NEW_DAYS} days, bugs first;{' '}
        <span className={`${styles.kind} ${styles.disc}`}>discussion</span> a <strong>GitHub Discussion</strong>, updated in the last {W.RECENT_DAYS} days.
      </p>
      {withItems.map((p) => {
        const prs = p.new.filter(isReview);
        const issues = issuesOf(p);
        const discs = discItems(p);
        if (!prs.length && !issues.length && !discs.length) return null;
        return (
          <section key={p.name} className={styles.project}>
            <h3>{p.name}</h3>
            <Chips prs={prs.length} issues={issues} discs={discs.length} />
            <details>
              <summary>Open the {plural(prs.length + issues.length + discs.length, 'item')}</summary>
              <div className={styles.tableBox}><table><tbody>
                {prs.map((i) => <Row key={`p${i.repo}${i.number}`} item={i} right={i.date.slice(0, 10)} />)}
                {issues.map((i) => <Row key={`i${i.repo}${i.number}`} item={i} right={i.date} />)}
                {discs.map((i) => <Row key={`d${i.url}`} item={i} right={i.date} />)}
              </tbody></table></div>
            </details>
          </section>
        );
      })}

      <h2>&#9888; Stalled, by project</h2>
      <p className={styles.muted}>A pull request with no update for {W.STALE_DAYS} days or more, or a bug with no update for {W.BUG_DAYS} days or more. They stay off the agenda.</p>
      {active.filter((p) => p.stalled.length).map((p) => (
        <details key={p.name} className={styles.stalled}>
          <summary><span className={styles.warn}>&#9888; {p.stalled.length}</span> {p.name}</summary>
          <div className={styles.tableBox}><table><tbody>
            {p.stalled.map((i) => <Row key={`s${i.repo}${i.number}`} item={i} right={`${i.idle} days idle`} />)}
          </tbody></table></div>
        </details>
      ))}
    </div>
  );
}
