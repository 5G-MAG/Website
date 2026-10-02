import React, { useState } from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './styles.module.css';

// The implementation status of one project from its code audit (src/data/implementation-<project>.json):
// one row per feature cluster, with the status of each component against each release, and the findings
// behind the row folded underneath. Each cell shows the share of the requirements checked for that component that
// are implemented, counted from the same rows its Details list shows, with a bar for the rest.
// Defaults are the 5GMS layout; a project's data file may set `columns`, `releaseGroups` and `sharedApis`.
const DEFAULT_COLUMNS = [['af', 'AF'], ['as', 'AS'], ['ue', 'Client'], ['tools', 'App Provider']];
const DEFAULT_RELEASES = [['R17', 'Release 17'], ['R19', 'Release 18/19']];
const DEFAULT_SHARED = { pattern: 'Provisioning Session|Service Access Information|Content Protocols Discovery', owners: ['Content hosting', 'Media session handling APIs'] };
const CELL = {
  implemented: ['Implemented', styles.ok],
  partial: ['Partial', styles.mid],
  absent: ['Absent', styles.off],
  'needs fix': ['Needs fix', styles.fix],
  unclear: ['Unclear', styles.unclear],
  'not specified': ['Not specified by 3GPP', styles.nspec],
  'not applicable': ['—', styles.na],
  'not in release': ['·', styles.na],
};

function Cell({ status }) {
  const [label, cls] = CELL[status] || [status, styles.na];
  return (
    <td className={styles.c}>
      <span className={`${styles.st} ${cls}`} title={status}>{label}</span>
    </td>
  );
}

const SEGMENTS = [['implemented', styles.sOk], ['partial', styles.sMid], ['needs fix', styles.sFix], ['unclear', styles.sUn], ['absent', styles.sOff]];

// A summary cell: share implemented, a bar of every status, and how many need fixing.
function ShareCell({ counts, fallback }) {
  const total = SEGMENTS.reduce((n, [k]) => n + (counts[k] || 0), 0);
  if (!total) return <Cell status={fallback} />;
  const done = counts.implemented || 0;
  const pct = Math.round((100 * done) / total);
  const fix = counts['needs fix'] || 0;
  const title = SEGMENTS.filter(([k]) => counts[k]).map(([k]) => `${counts[k]} ${k}`).join(', ');
  return (
    <td className={styles.share} title={title}>
      <span className={styles.pct}>{pct}%</span>
      <span className={styles.bar} aria-hidden="true">
        {SEGMENTS.map(([k, cls]) => (counts[k] ? <span key={k} className={cls} style={{ width: `${(100 * counts[k]) / total}%` }} /> : null))}
      </span>
      <span className={styles.subn}>{done} of {total}{fix ? <> · <span className={styles.fixn}>{fix} to fix</span></> : null}</span>
    </td>
  );
}

// Reviewers' markdown emphasis and code marks, which a table cell does not render.
const plain = (t) => (t || '').replace(/\*\*/g, '').replace(/`/g, '');

// Shared base APIs belong to the rows that own them; elsewhere they would repeat under every feature.

// One line per requirement and release, one status per component, in place of the reviewers' full notes.
function requirementRows(findings, cluster, shared, releases) {
  const BASE = new RegExp(shared.pattern);
  const rows = new Map();
  findings
    .filter((f) => f.status !== 'not applicable')
    .filter((f) => shared.owners.includes(cluster) || !BASE.test(f.requirement))
    .forEach((f) => {
      const requirement = plain(f.requirement).replace(/\s*\((?:tools|af|as|ue|content hosting)\)$/i, '');
      const key = `${f.release}|${requirement}`;
      if (!rows.has(key)) rows.set(key, { key, requirement, release: f.release, status: {} });
      rows.get(key).status[f.component] = f.status;
    });
  const order = (r) => r.release;
  return [...rows.values()].sort((a, b) => order(a).localeCompare(order(b)));
}

export default function ImplementationMatrix({ data }) {
  const COLUMNS = data.columns || DEFAULT_COLUMNS;
  const COMPONENTS = COLUMNS.map(([k]) => k);
  const SHORT = Object.fromEntries(COLUMNS);
  const RELEASES = data.releaseGroups || DEFAULT_RELEASES;
  const SHARED = data.sharedApis || DEFAULT_SHARED;
  const relLabel = (r) => (data.releaseNames
    ? Object.entries(data.releaseNames).reduce((t, [k, label]) => t.replace(k, label), r)
    : RELEASES.reduce((t, [k, label]) => t.replace(k, label.replace('Release ', 'Rel-')), r));
  // rows open independently: closing one above the clicked row would shift the page under the pointer
  const [open, setOpen] = useState(() => new Set());
  const toggle = (k) => setOpen((prev) => { const next = new Set(prev); next.has(k) ? next.delete(k) : next.add(k); return next; });
  // each row is an anchor (e.g. #network-assistance), so other pages can link to one feature
  const slug = (t) => t.toLowerCase().replace(/\(.*?\)/g, '').trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const brokenLinks = useBrokenLinks();
  data.summary.forEach((r) => brokenLinks.collectAnchor(slug(r.cluster)));
  return (
    <div className={styles.wrap}>
      <ul className={styles.meta}>
        <li>{RELEASES.map(([k]) => data.releases[k]).filter(Boolean).join('. ')}.</li>
        {COMPONENTS.map((c) => {
          const comp = data.components[c];
          return (
            <li key={c}>
              <b>{SHORT[c]}</b> ({comp.name}):{' '}
              {comp.repos.map(([repo, sha, tag], i) => (
                <React.Fragment key={repo}>
                  {i > 0 && ', '}
                  <a href={`https://github.com/5G-MAG/${repo}/tree/${sha}`} target="_blank" rel="noreferrer">{repo}</a>
                  {tag ? ` ${tag}` : ''} ({sha})
                </React.Fragment>
              ))}
              . Built against: {comp.pinned}.
            </li>
          );
        })}
        <li><b>Source:</b> {data.method} on {data.audited}.</li>
      </ul>
      <div className={styles.tbl}>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Feature</th>
              {RELEASES.map(([k, label]) => <th key={k} colSpan={COMPONENTS.length} className={styles.grp}>{label}</th>)}
              <th rowSpan={2}>What the code shows</th>
            </tr>
            <tr>
              {RELEASES.map(([rel]) => COMPONENTS.map((c) => <th key={rel + c} className={styles.c}>{SHORT[c]}</th>))}
            </tr>
          </thead>
          <tbody>
            {data.summary.map((row) => {
              const findings = data.findings.filter((f) => f.ids.some((id) => row.requirements.includes(id)));
              const reqRows = requirementRows(findings, row.cluster, SHARED, RELEASES);
              // which release group a requirement row counts under: the first group its release starts with
              const groupOf = (r) => (RELEASES.length === 1 ? RELEASES[0][0] : (RELEASES.find(([k]) => r.release.startsWith(k)) || RELEASES[RELEASES.length - 1])[0]);
              const countsFor = (rel, c) => reqRows.filter((r) => groupOf(r) === rel && r.status[c]).reduce((m, r) => ({ ...m, [r.status[c]]: (m[r.status[c]] || 0) + 1 }), {});
              const isOpen = open.has(row.cluster);
              return (
                <React.Fragment key={row.cluster}>
                  <tr id={slug(row.cluster)} className={styles.anchored}>
                    <td className={styles.feat}><b>{row.cluster}</b></td>
                    {RELEASES.map(([rel]) => COMPONENTS.map((c) => <ShareCell key={rel + c} counts={countsFor(rel, c)} fallback={row.status[rel][c]} />))}
                    <td className={styles.note}>
                      {row.note}
                      <button type="button" className={styles.toggle} aria-expanded={isOpen}
                        onClick={() => toggle(row.cluster)}>
                        {isOpen ? '▾ Hide details' : '▸ Details'}
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className={styles.subrow}>
                      <td colSpan={2 + COMPONENTS.length * RELEASES.length}>
                        <table className={styles.sub}>
                          <thead>
                            <tr><th>Requirement</th><th>Release</th>{COMPONENTS.map((c) => <th key={c} className={styles.c}>{SHORT[c]}</th>)}</tr>
                          </thead>
                          <tbody>
                            {reqRows.map((r) => (
                              <tr key={r.key}>
                                <td>{r.requirement}</td>
                                <td>{relLabel(r.release)}</td>
                                {COMPONENTS.map((c) => <Cell key={c} status={r.status[c] || 'not applicable'} />)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.key}>
        <span>Each cell: the share of the requirements checked for that component that are implemented. The bar shows the rest:</span>
        <span className={`${styles.st} ${styles.ok}`}>Implemented</span>
        <span className={`${styles.st} ${styles.mid}`}>Partial</span>
        <span className={`${styles.st} ${styles.fix}`}>Needs fix</span>
        <span className={`${styles.st} ${styles.off}`}>Absent</span>
        <span className={`${styles.st} ${styles.unclear}`}>Unclear</span>
        <span className={`${styles.st} ${styles.nspec}`}>Not specified by 3GPP</span>
        <span>— the component does not own the feature · · not in that release</span>
      </p>
    </div>
  );
}
