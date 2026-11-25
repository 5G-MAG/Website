import React, { useMemo, useState } from 'react';
import DATA from '@site/src/data/boardStatus.json';
import styles from './styles.module.css';

// The work plan of a project, read from its public implementation board in 5G-MAG/ProjectBoards (src/data/boardStatus.json, refreshed nightly by
// scripts/fetch-board-status.js). A feature is something the system offers, as it arrived in one 3GPP release; its tasks are what the functions must do for it,
// each with its place on the board (Not audited, Backlog, In progress, In review, Verifying, Supported, Needs review, On hold). The page makes no claim about
// the code: a task is Not audited until someone reads the code against it, and only then does it move.
const STAGES = ['Not audited', 'Backlog', 'In progress', 'In review', 'Verifying', 'Supported', 'Needs review', 'On hold'];
const relNum = (r) => parseInt(String(r || '').replace(/\D/g, ''), 10) || 0;

function counts(tasks) {
  const c = Object.fromEntries(STAGES.map((s) => [s, 0]));
  tasks.forEach((t) => { c[t.status] = (c[t.status] || 0) + 1; });
  return c;
}

export default function BoardStatus({ board, part, title }) {
  const b = DATA[board];
  const [rel, setRel] = useState('all');
  const features = useMemo(() => (b ? b.features.filter((f) => !part || f.part === part) : []), [b, part]);
  const releases = useMemo(() => [...new Set(features.flatMap((f) => [f.release, ...f.tasks.map((t) => t.release)]))].filter(Boolean).sort((x, y) => relNum(x) - relNum(y)), [features]);
  if (!b || !features.length) return null;
  const shown = features
    .map((f) => ({ ...f, shown: f.tasks.filter((t) => rel === 'all' || t.release === rel) }))
    .filter((f) => f.shown.length);
  const all = shown.flatMap((f) => f.shown);
  const c = counts(all);
  const cases = all.reduce((n, t) => n + t.cases, 0);
  return (
    <section className={styles.board} aria-label={title || 'Work plan'}>
      <p className={styles.intro}>
        What the 3GPP specifications ask of the implementations, as features and tasks on the public{' '}
        <a href={b.board}>{b.title} board</a>. A task is Not audited until someone reads the code against it; it then moves across the board.
        Open a feature to see its tasks.
      </p>
      <div className={styles.summary}>
        <div><b>{shown.length}</b><span>features</span></div>
        <div><b>{all.length}</b><span>tasks</span></div>
        <div><b>{cases.toLocaleString('en')}</b><span>cases</span></div>
        <div><b>{c['Supported']}</b><span>Supported</span></div>
        <div><b>{c['Not audited']}</b><span>Not audited</span></div>
      </div>
      <div className={styles.strip} role="img" aria-label={STAGES.filter((s) => c[s]).map((s) => `${s}: ${c[s]}`).join(', ')}>
        {STAGES.map((s, i) => (c[s] ? <i key={s} className={styles['b' + i]} style={{ width: `${(100 * c[s]) / all.length}%` }} title={`${s}: ${c[s]}`} /> : null))}
      </div>
      {releases.length > 1 && (
        <div className={styles.filters} role="group" aria-label="Release">
          {['all', ...releases].map((r) => (
            <button key={r} type="button" className={styles.chip} aria-pressed={rel === r} onClick={() => setRel(r)}>
              {r === 'all' ? 'All releases' : `Introduced in ${r}`}
            </button>
          ))}
        </div>
      )}
      {shown.map((f) => {
        const fc = counts(f.shown);
        return (
          <details key={f.number} className={styles.feature}>
            <summary>
              <span>{f.name}</span>
              <span className={styles.meta}>{f.release} · {f.shown.length} task{f.shown.length === 1 ? '' : 's'} · {fc['Supported']} Supported</span>
            </summary>
            <ul className={styles.tasks}>
              {f.shown.map((t) => (
                <li key={t.number}>
                  <span className={`${styles.pill} ${styles['s' + STAGES.indexOf(t.status)]}`}>{t.status}</span>
                  <a href={t.url}>#{t.number}</a>
                  <span>{t.clauses || t.title}</span>
                  <span className={styles.meta}>{t.functions.length ? t.functions.join(', ') : 'no function named'} · {t.cases} cases · {t.release}</span>
                </li>
              ))}
            </ul>
            <p className={styles.note}><a href={f.url}>The feature on the board (#{f.number})</a></p>
          </details>
        );
      })}
    </section>
  );
}
