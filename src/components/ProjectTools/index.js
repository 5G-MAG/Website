import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { familyForPath } from '@site/src/utils/projectFamily';
import { TOOL_KINDS } from '@site/src/components/ToolsByKind';
import { displayNameOf } from '@site/src/data/baskets';
import ListRow, { kindLabelOf } from '@site/src/components/ListRow';
import styles from './styles.module.css';

// The Software Accelerator tools of the project whose page this is, as rows, each with its kind. A tool that has no
// page yet is listed but not linked. `only` limits the list to one tool (a page with one section per testbed).
export default function ProjectTools({ only }) {
  const { pathname } = useLocation();
  const family = familyForPath(pathname);
  const rows = TOOL_KINDS.flatMap((k) =>
    family
      .filter(
        (p) =>
          k.test(p) &&
          !p.partOf &&
          (!only || (p.doc_url || '').replace(/\/$/, '') === only.replace(/\/$/, ''))
      )
      .map((p) => ({ p, kind: kindLabelOf(p) }))
  );
  return (
    <>
      <h3 className={styles.sectionHead}>Software Accelerator</h3>
      {rows.length === 0 ? (
        <p style={{ margin: 0, color: 'var(--ifm-color-emphasis-700)' }}>
          No tool has been published for this project yet. See the{' '}
          <Link to="/developer">Software Accelerator</Link> for what the programme builds, or{' '}
          <Link to="/contributing">contribute</Link> to build one.
        </p>
      ) : (
        rows.map(({ p, kind }) => (
          <ListRow
            key={p.name}
            href={p.doc_url ? p.doc_url.replace(/\/$/, '') : undefined}
            title={displayNameOf(p)}
            desc={p.doc_url ? p.tagline || '' : 'Coming soon.'}
            kind={kind}
            iconKey={p.icon}
          />
        ))
      )}
    </>
  );
}
