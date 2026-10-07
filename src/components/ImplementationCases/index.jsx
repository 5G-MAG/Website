import React, { useEffect, useMemo, useState } from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.css';

// The implementation status of one project from its code audit (src/data/audit-<area>.json, written by
// Standards2Deployments projects/_scripts/build_audit.py). Every requirement is split into its cases; each case is
// implemented, differs from the specification, or absent, with what the code does. Readers see what works as well
// as what does not (RULES.md S11).
const VERDICT = {
  implemented: { label: 'Implemented', mark: '✓', cls: 'ok' },
  differs: { label: 'Differs from the specification', mark: '≠', cls: 'diff' },
  absent: { label: 'Absent', mark: '–', cls: 'off' },
  inconsistent: { label: 'Specification inconsistent', mark: '?', cls: 'inc' },
};

const tally = (cases) => ({
  total: cases.length,
  implemented: cases.filter((c) => c.verdict === 'implemented').length,
  differs: cases.filter((c) => c.verdict === 'differs').length,
  absent: cases.filter((c) => c.verdict === 'absent').length,
  inconsistent: cases.filter((c) => c.verdict === 'inconsistent').length,
});

function Count({ cases }) {
  const t = tally(cases);
  return (
    <span className={styles.count}>
      <b>{t.implemented} of {t.total}</b> implemented
      {t.differs ? ` · ${t.differs} differ${t.differs === 1 ? 's' : ''}` : ''}
      {t.absent ? ` · ${t.absent} absent` : ''}
      {t.inconsistent ? ` · ${t.inconsistent} where the specification is inconsistent` : ''}
    </span>
  );
}

// One block per case, in clause order; a long strip becomes a proportional bar.
function Strip({ cases }) {
  if (cases.length > 14) {
    const t = tally(cases);
    return (
      <span className={styles.bar} aria-hidden="true">
        {['implemented', 'differs', 'inconsistent', 'absent'].map((v) => (t[v] ? <span key={v} className={styles[VERDICT[v].cls]} style={{ width: `${(100 * t[v]) / t.total}%` }} /> : null))}
      </span>
    );
  }
  return (
    <span className={styles.strip} aria-hidden="true">
      {cases.map((c, i) => <span key={i} className={styles[VERDICT[c.verdict].cls]} />)}
    </span>
  );
}

const GH = 'M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5';

// The repository a requirement or case lives in, as a link: where to look for the code, or to fix it.
function Repo({ name, small }) {
  return (
    <a className={`${styles.repo} ${small ? styles.repoSmall : ''}`} href={`https://github.com/5G-MAG/${name}`}
      target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
      <svg viewBox="0 0 24 24" width={small ? 12 : 14} height={small ? 12 : 14} fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={GH} /></svg>
      {name}
    </a>
  );
}

function Item({ kind, title, text, conflict, repo }) {
  const v = VERDICT[kind];
  const cls = v ? v.cls : 'note';
  return (
    <li className={`${styles.item} ${styles[`${cls}Soft`]}`}>
      <span className={`${styles.mark} ${styles[`${cls}Text`]}`} aria-hidden="true">{v ? v.mark : 'i'}</span>
      <span>
        <span className={styles.case}>{title}{repo ? <Repo name={repo} small /> : null}</span>
        {text ? <span className={styles.why}>{text}</span> : null}
        {conflict ? <span className={styles.conflict}>{conflict}</span> : null}
      </span>
    </li>
  );
}

function Requirement({ r, comp, rel }) {
  const [open, setOpen] = useState(false);
  const works = r.cases.filter((c) => c.verdict === 'implemented');
  const not = r.cases.filter((c) => c.verdict !== 'implemented');
  const repos = r.repos || [];
  const many = repos.length > 1;
  return (
    <article className={styles.req}>
      <div className={styles.head} role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}>
        <span className={styles.name}>
          <b>{r.name}</b>
          <span className={styles.meta}>{comp} · {rel}</span>
          {repos.length ? <span className={styles.repos}>{repos.map((n) => <Repo key={n} name={n} />)}</span> : null}
        </span>
        <span className={styles.right}>
          <Strip cases={r.cases} />
          <Count cases={r.cases} />
        </span>
      </div>
      {open && (
        <div className={styles.body}>
          <div className={styles.cols}>
            <div>
              <h4 className={styles.colh}>What works</h4>
              {works.length ? (
                <ul className={styles.items}>{works.map((c) => <Item key={c.case} kind="implemented" title={c.case} text={c.what} repo={many ? c.repo : null} />)}</ul>
              ) : (
                <p className={styles.none}>No case of this requirement is implemented.</p>
              )}
              {r.exists ? <ul className={styles.items}><Item kind="note" title="Already in the code" text={r.exists} /></ul> : null}
            </div>
            <div>
              <h4 className={styles.colh}>What does not</h4>
              {not.length ? (
                <ul className={styles.items}>{not.map((c) => <Item key={c.case} kind={c.verdict} title={c.case} text={c.what} conflict={c.conflict} repo={c.repo || (repos.length === 1 ? repos[0] : null)} />)}</ul>
              ) : (
                <p className={styles.none}>Nothing: every case is implemented.</p>
              )}
            </div>
          </div>
          {r.noted && r.noted.length ? (
            <div>
              <h4 className={styles.colh}>Noted</h4>
              <ul className={styles.items}>{r.noted.map((t) => <Item key={t} kind="note" title={t} />)}</ul>
            </div>
          ) : null}
          <p className={styles.spec}>{r.spec.doc} {r.spec.version}, {r.spec.locator}</p>
        </div>
      )}
    </article>
  );
}

const slug = (t) => t.toLowerCase().replace(/\(.*?\)/g, '').trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// `only` (component keys) shows one part of an audit, for pages that present it in sections.
export default function ImplementationCases({ data, only }) {
  const keep = (k) => !only || only.includes(k);
  const comps = Object.entries(data.components).filter(([k]) => keep(k));
  const used = new Set(data.features.flatMap((f) => f.requirements.filter((r) => keep(r.component)).map((r) => r.release)));
  const rels = Object.entries(data.releases).filter(([k]) => used.has(k));
  const [comp, setComp] = useState('all');
  const [rel, setRel] = useState('all');
  // The 3GPP releases the same cases are judged at (releaseStatus): a case counts at a release only if its statement
  // is valid there (`releases`), with that release's verdict where it differs (`byRelease`).
  // Only the profiles releaseStatus names depend on a 3GPP release (unprofiled RFC requirements do not).
  const rsKeys = new Set((data.releaseStatus ? data.releaseStatus.profiles : [])
    .flatMap((p) => (typeof p === 'string' ? [p] : [p.key, ...(p.includes || [])])));
  const rs = data.releaseStatus && data.features.some((f) => f.requirements.some((r) => keep(r.component) && rsKeys.has(r.release)))
    ? data.releaseStatus : null;
  const issues = rs ? Object.entries(rs.issues) : [];
  const [at, setAt] = useState(rs ? rs.baseline : null);
  const atRelease = (c) => (c.byRelease && c.byRelease[at] ? { ...c, ...c.byRelease[at] } : c);
  const brokenLinks = useBrokenLinks();
  data.features.forEach((f) => brokenLinks.collectAnchor(slug(f.name)));
  const relShort = (k) => (data.releaseNames && data.releaseNames[k]) || data.releases[k].split(':')[0];
  const features = useMemo(() => data.features.map((f) => ({
    ...f,
    shown: f.requirements
      .filter((r) => keep(r.component) && (comp === 'all' || r.component === comp) && (rel === 'all' || r.release === rel))
      .map((r) => (at && rsKeys.has(r.release) ? { ...r, cases: r.cases.filter((c) => !c.releases || c.releases.includes(at)).map(atRelease) } : r))
      .filter((r) => r.cases.length),
  })).filter((f) => f.shown.length), [data, comp, rel, only, at]);
  const all = features.flatMap((f) => f.shown.flatMap((r) => r.cases));
  // a link to one feature (#content-hosting) opens it
  useEffect(() => {
    const el = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (el && el.tagName === 'DETAILS') { el.open = true; el.scrollIntoView(); }
  }, []);
  return (
    <div className={styles.wrap}>
      <ul className={styles.facts}>
        {rels.map(([k, label]) => <li key={k}>{label}.</li>)}
        {comps.map(([k, c]) => (
          <li key={k}>
            <b>{c.short}</b> ({c.name}):{' '}
            {c.repos.map((r, i) => (
              <React.Fragment key={r.repo}>
                {i > 0 && ', '}
                <a href={`https://github.com/5G-MAG/${r.repo}`} target="_blank" rel="noreferrer">{r.repo}</a>{r.version ? ` ${r.version}` : ''}
              </React.Fragment>
            ))}
            {c.builtAgainst ? `. Built against: ${c.builtAgainst}.` : '.'}
          </li>
        ))}
        <li><b>Source:</b> {data.method}, {data.audited}.</li>
      </ul>

      <div className={styles.filters}>
        <div className={styles.group} role="group" aria-label="Component">
          {[['all', 'All components'], ...comps.map(([k, c]) => [k, c.short])].map(([k, label]) => (
            <button key={k} type="button" className={styles.chip} aria-pressed={comp === k} onClick={() => setComp(k)}>{label}</button>
          ))}
        </div>
        <div className={styles.group} role="group" aria-label={rs ? 'Profile' : 'Release'}>
          {rels.length > 1 && [['all', rs ? 'All profiles' : 'All releases'], ...rels.map(([k]) => [k, relShort(k)])].map(([k, label]) => (
            <button key={k} type="button" className={styles.chip} aria-pressed={rel === k} onClick={() => setRel(k)}>{label}</button>
          ))}
        </div>
        {issues.length > 1 && (
          <div className={styles.group} role="group" aria-label="3GPP release">
            <span className={styles.over} style={{ alignSelf: 'center' }}>3GPP release</span>
            {issues.map(([k, docs]) => (
              <button key={k} type="button" className={styles.chip} aria-pressed={at === k} title={docs} onClick={() => setAt(k)}>Release {k}</button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.total}>
        <Strip cases={all} />
        <Count cases={all} />
        <span className={styles.over}>cases, over {features.reduce((n, f) => n + f.shown.length, 0)} requirements</span>
      </div>

      <p className={styles.key}>
        <span className={`${styles.pill} ${styles.okSoft} ${styles.okText}`}>✓ Implemented</span>
        <span className={`${styles.pill} ${styles.diffSoft} ${styles.diffText}`}>≠ Differs from the specification</span>
        <span className={`${styles.pill} ${styles.offSoft} ${styles.offText}`}>– Absent</span>
        <span className={`${styles.pill} ${styles.incSoft} ${styles.incText}`}>? Specification inconsistent: its text and its OpenAPI or tables disagree</span>
        <span className={`${styles.pill} ${styles.noteSoft} ${styles.noteText}`}>i Noted: observed, not a verdict against a clause</span>
      </p>

      {features.map((f) => (
        <details key={f.name} id={slug(f.name)} className={styles.feature}>
          <summary className={styles.fhead}>
            <span className={styles.name}>
              <b className={styles.fname}>{f.name}</b>
              {f.summary ? <span className={styles.meta}>{f.summary}</span> : null}
            </span>
            <span className={styles.right}>
              <Strip cases={f.shown.flatMap((r) => r.cases)} />
              <Count cases={f.shown.flatMap((r) => r.cases)} />
            </span>
          </summary>
          <div className={styles.reqs}>
            {f.shown.map((r) => (
              <Requirement key={r.id} r={r} comp={data.components[r.component].short} rel={relShort(r.release)} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
