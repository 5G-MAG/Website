import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { familyForPath } from '@site/src/utils/projectFamily';
import { TOOL_KINDS } from '@site/src/components/ToolsByKind';
import { ICON_CATALOG, displayNameOf } from '@site/src/data/baskets';
import styles from './styles.module.css';

const KIND_LABEL = {
  'Reference Tools': 'Reference Tool',
  'Testbeds and Evaluation Frameworks': 'Testbed',
  'Validation Tools': 'Validation Tool',
  Platforms: 'Platform',
};

function Icon({ paths }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

// One row of a project's block: an icon chip, a title with one line, and on the right the kind of tool (or an arrow
// for the project's own pages). The same row for Technology, Specifications and every tool.
export function ProjectRow({ href, title, desc, kind, iconKey, iconPaths }) {
  const paths = iconPaths || ICON_CATALOG[iconKey] || [];
  const body = (
    <>
      <span className={styles.chip}>
        <Icon paths={paths} />
      </span>
      <span>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </span>
      {kind ? <span className={styles.kind}>{kind}</span> : <span className={styles.arrow}>→</span>}
    </>
  );
  return href ? (
    <Link to={href} className={styles.row}>
      {body}
    </Link>
  ) : (
    <div className={`${styles.row} ${styles.rowStatic}`}>{body}</div>
  );
}

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
      .map((p) => ({
        p,
        kind:
          p.type === 'evaluation-framework'
            ? 'Evaluation Framework'
            : KIND_LABEL[k.title] || k.title,
      }))
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
          <ProjectRow
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
