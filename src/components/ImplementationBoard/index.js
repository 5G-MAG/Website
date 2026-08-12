import styles from './styles.module.css';

// Implementation status board for the reference-tools Scope pages.
//
// These pages carry a per-feature audit against the defining specifications --
// genuinely valuable, but previously rendered as ten stacked tables (130 rows
// for MBS alone), every one expanded, with the status cell holding both a
// verdict and its full justification. Nothing could be scanned.
//
// This renders the same data as: a component board showing where each part of
// the chain stands, then one collapsed section per specification. Two rules
// keep it honest:
//   1. Every count on the board is DERIVED from the rows below it, so the
//      summary can never drift away from the detail it summarises.
//   2. Status is a state (one of the five below); the reasoning lives in its
//      own `note` field, so the status column stays skimmable.
//
// Sections use native <details>, so they remain keyboard-accessible, printable
// and findable by the browser's own in-page search.

const STATUS = {
  yes: { label: 'Implemented', short: 'Yes', className: 'stateYes' },
  partial: { label: 'Partially implemented', short: 'Partial', className: 'statePartial' },
  hold: { label: 'On hold', short: 'Hold', className: 'stateHold' },
  // Distinct from `hold`: on hold means a decision was taken to wait, unknown
  // means nobody has checked yet. Collapsing the two would overstate what the
  // audit actually establishes.
  unknown: { label: 'Not yet verified', short: 'To check', className: 'stateUnknown' },
  no: { label: 'Not implemented', short: 'No', className: 'stateNo' },
  na: { label: 'Out of scope', short: 'N/A', className: 'stateNa' },
};

// Notes are authored as plain strings, but some carry a link to the issue that
// explains a gap. Rendering them raw would print the markdown source, so inline
// [text](url) links are turned into real anchors here. Deliberately minimal:
// this is a note field, not a place for general markdown.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function inline(text) {
  if (!text || !text.includes('](')) return text;
  const out = [];
  let last = 0;
  let m;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <a key={`${m[2]}-${m.index}`} href={m[2]} target="_blank" rel="noreferrer">
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function tally(rows) {
  const counts = { yes: 0, partial: 0, hold: 0, unknown: 0, no: 0, na: 0 };
  rows.forEach((r) => {
    // A row in a paired section (transmit/receive, for example) carries one
    // state per side; each side is counted, since each is separately audited.
    const states = r.statuses || [r.status];
    states.forEach((st) => {
      if (counts[st] !== undefined) counts[st] += 1;
    });
  });
  // "Out of scope" rows are deliberately excluded from the denominator: they
  // are not gaps, they are decisions about what this component is for.
  const scored = counts.yes + counts.partial + counts.hold + counts.unknown + counts.no;
  return { ...counts, scored, done: counts.yes };
}

function StatusChip({ status }) {
  const s = STATUS[status] || STATUS.na;
  return (
    <span className={`${styles.chip} ${styles[s.className]}`} title={s.label}>
      {s.short}
    </span>
  );
}

export default function ImplementationBoard({ components = [], sections = [] }) {
  const perComponent = components.map((c) => {
    const own = sections.filter((s) => s.component === c.name);
    const rows = own.flatMap((s) => s.rows || []);
    return { ...c, sections: own, ...tally(rows) };
  });

  const overall = tally(sections.flatMap((s) => s.rows || []));

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        <span className={styles.legendLabel}>Across the whole chain</span>
        <span className={styles.legendCounts}>
          <StatusChip status="yes" /> {overall.yes}
          <StatusChip status="partial" /> {overall.partial}
          <StatusChip status="hold" /> {overall.hold}
          <StatusChip status="no" /> {overall.no}
          <span className={styles.legendTotal}>{overall.scored} audited items</span>
        </span>
      </div>

      {perComponent.length > 0 && (
        <div className={styles.board}>
          {perComponent.map((c) => {
            const pct = c.scored ? Math.round((c.done / c.scored) * 100) : null;
            return (
              <div key={c.name} className={styles.card}>
                <span className={styles.cardName}>{c.name}</span>
                {c.repo && <span className={styles.cardRepo}>{c.repo}</span>}
                {pct !== null && (
                  <>
                    <div
                      className={styles.bar}
                      role="img"
                      aria-label={`${c.done} of ${c.scored} audited items implemented`}
                    >
                      <i
                        className={pct === 100 ? styles.barFull : styles.barPart}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={styles.cardCount}>
                      {c.done} of {c.scored} implemented
                      {c.hold > 0 && `, ${c.hold} on hold`}
                    </span>
                  </>
                )}
                {pct === null && c.status && <span className={styles.cardCount}>{c.status}</span>}
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.sections}>
        {sections.map((s) => {
          const t = tally(s.rows || []);
          return (
            <details key={s.spec + s.title} className={styles.section}>
              <summary className={styles.summary}>
                <span className={styles.spec}>{s.spec}</span>
                <span className={styles.sectionTitle}>{s.title}</span>
                <span className={styles.sectionCount}>
                  {t.scored > 0 && t.done === t.scored && 'all implemented'}
                  {t.scored > 0 && t.done < t.scored && `${t.done}/${t.scored}`}
                </span>
              </summary>
              <div className={styles.body}>
                {s.intro && <p className={styles.intro}>{inline(s.intro)}</p>}
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th scope="col">Feature</th>
                        {s.columns ? (
                          s.columns.map((c) => (
                            <th scope="col" key={c}>
                              {c}
                            </th>
                          ))
                        ) : (
                          <>
                            {s.whereLabel && <th scope="col">{s.whereLabel}</th>}
                            <th scope="col">Status</th>
                          </>
                        )}
                        <th scope="col">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(s.rows || []).map((r, i) => (
                        <tr key={`${r.feature}-${i}`}>
                          <th scope="row" className={styles.feature}>
                            {inline(r.feature)}
                          </th>
                          {s.columns ? (
                            (r.statuses || []).map((st, j) => (
                              <td className={styles.statusCell} key={`${s.columns[j]}-${j}`}>
                                <StatusChip status={st} />
                              </td>
                            ))
                          ) : (
                            <>
                              {s.whereLabel && (
                                <td className={styles.whereCell}>{r.where || ''}</td>
                              )}
                              <td className={styles.statusCell}>
                                <StatusChip status={r.status} />
                              </td>
                            </>
                          )}
                          <td className={styles.noteCell}>{inline(r.note) || ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
