import Link from '@docusaurus/Link';
import { ICON_CATALOG } from '@site/src/data/baskets';
import styles from './styles.module.css';

// The one list row used for every tool, page and kind on the site: an icon chip, a title with one line, and on the
// right either the kind of tool (a filled pill with its icon) or an arrow. A row without an href is not a link.

// The icon of each kind, the same as in the Software Accelerator menu.
export const KIND_ICON = {
  'Reference Tool': ['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16'],
  Testbed: ['M9 3l6 0', 'M10 9l4 0', 'M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6'],
  'Evaluation Framework': ['M9 3l6 0', 'M10 9l4 0', 'M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6'],
  'Validation Tool': ['M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8', 'M14 19l2 2l4 -4', 'M9 8h4', 'M9 12h2'],
  Platform: ['M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5'],
};

// The kind of a tool as one short label, from its type in the taxonomy.
export function kindLabelOf(project) {
  switch (project.type) {
    case 'reference-tool':
      return 'Reference Tool';
    case 'testbed':
      return 'Testbed';
    case 'evaluation-framework':
      return 'Evaluation Framework';
    case 'validation-tool':
      return 'Validation Tool';
    case 'platform':
    case 'common-tools':
      return 'Platform';
    default:
      return null;
  }
}

export function Icon({ paths, size = 20 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
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

export default function ListRow({ href, title, desc, kind, iconKey, iconPaths, arrow = true }) {
  const paths = iconPaths || ICON_CATALOG[iconKey] || [];
  const body = (
    <>
      <span className={styles.chip}>
        <Icon paths={paths} />
      </span>
      <span>
        <div className={styles.title}>{title}</div>
        {desc && <div className={styles.desc}>{desc}</div>}
      </span>
      {kind ? (
        <span className={styles.kind}>
          {KIND_ICON[kind] && <Icon paths={KIND_ICON[kind]} size={16} />}
          {kind}
        </span>
      ) : arrow && href ? (
        <span className={styles.arrow}>→</span>
      ) : (
        <span />
      )}
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

export function RowList({ children }) {
  return <div className={styles.list}>{children}</div>;
}
