import clsx from 'clsx';
import pageStyles from '@site/src/pages/tech/index.module.css';
import styles from './styles.module.css';

// "Standards and Open Source", as on slides 10 and 11 of the 5G-MAG General
// Deck (aligned 2026-09-29): the case (open source after the freeze versus
// from the start) and the proposal (three actions along a work item).
const CASE = [
  {
    stage: 'Evaluation',
    today: ['Duplicated prototypes.', ' Each organization builds its own to evaluate a draft; results differ and feedback is slow.'],
    start: ['One shared baseline.', ' Drafts are validated against running code before the freeze, while gaps are cheap to fix.'],
  },
  {
    stage: 'Interoperability',
    today: ['Late interop bugs.', ' Testing starts from scratch at plugfests; errors, some in the specification, surface late.'],
    start: ['Faster plugfests.', ' Implementers start from the same code: shorter preparation, faster root-cause analysis.'],
  },
  {
    stage: 'Deployment',
    today: ['Slow deployment.', ' Years can pass from a frozen specification to production-ready code; early adopters carry the cost alone.'],
    start: ['Earlier deployment.', ' End-to-end demos and trials run before commercial products, and feed evidence back into the standard.'],
  },
];

const STEPS = [
  {
    phase: 'Work item launch',
    title: 'Plan it at launch',
    body: 'Define the open-source software and evaluation platform track from day one: where the code lives, its scope, the evaluation metrics. Reuse existing open platforms.',
  },
  {
    phase: 'Drafting',
    title: 'Engage implementers during drafting',
    body: 'Involve open-source communities while the specification is written, and invest in that development. Running code surfaces issues that text review cannot.',
  },
  {
    phase: 'Freeze and deployment',
    title: 'Make the value tangible',
    body: 'End-to-end demos and benchmark platforms show that the standard works. They lower cost for the whole ecosystem: members and non-members alike, start-ups, academia.',
  },
];

export default function OpenSourceFromTheStart({ id = 'standards-and-open-source' }) {
  return (
    <section id={id} className={pageStyles.section}>
      <div className="container">
        <h2 className={pageStyles.sectionTitle}>Enabling open-source software from the start of every project</h2>
        <p className={pageStyles.sectionSubtitle}>
          A specification is only valuable once it can be implemented, tested and deployed. Open
          source is the mechanism that makes it work.
        </p>

        <div className={styles.caseTable} role="table" aria-label="Open source after the freeze compared with open source from the start">
          <div className={styles.caseHead} role="row">
            <span role="columnheader" />
            <span role="columnheader" className={styles.headToday}>Today: open source after the freeze</span>
            <span role="columnheader" className={styles.headStart}>With open source from the start</span>
          </div>
          {CASE.map((r) => (
            <div key={r.stage} className={styles.caseRow} role="row">
              <span role="rowheader" className={styles.stage}>{r.stage}</span>
              <p role="cell" className={styles.today}><strong>{r.today[0]}</strong>{r.today[1]}</p>
              <p role="cell" className={styles.start}><strong>{r.start[0]}</strong>{r.start[1]}</p>
            </div>
          ))}
        </div>

        <h3 className={styles.proposalTitle}>
          We make open-source software and evaluation platforms work-plan deliverables, not optional extras
        </h3>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.phase}>{s.phase}</span>
              <span className={styles.num}>{i + 1}</span>
              <strong className={styles.stepTitle}>{s.title}</strong>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className={clsx(styles.oneLine)}>
          <span>In one line, for every new work item</span>
          “Open-source software and evaluation platform: home and scope identified at launch.”
        </p>
      </div>
    </section>
  );
}
