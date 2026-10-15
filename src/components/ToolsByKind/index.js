import Link from '@docusaurus/Link';
import {
  ALL_PROJECTS,
  ICON_CATALOG,
  displayNameOf,
  isReferenceTool,
  isTestbed,
  isValidationTool,
  isPlatform,
  isCommonTools,
} from '@site/src/data/baskets';
import styles from './styles.module.css';

// Every tool that has a page, grouped by kind. One compact link per tool: the same list wherever a page shows
// "all the tools", so the classification is the same everywhere.
export const withPage = (p) => p.doc_url && !p.partOf;
// The kinds that list tools, with their page and test.
export const TOOL_KINDS = [
  { title: 'Reference Tools', href: '/reference-tools', test: isReferenceTool },
  { title: 'Testbeds and Evaluation Frameworks', href: '/testbeds', test: isTestbed },
  { title: 'Validation Tools', href: '/validation', test: isValidationTool },
  { title: 'Platforms', href: '/reference-tools/3gpp-platforms', test: (p) => isPlatform(p) || isCommonTools(p) },
];

export function ToolCard({ project }) {
  const paths = ICON_CATALOG[project.icon] || [];
  const body = (
    <>
      <span className={styles.chipIcon}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {paths.map((d) => <path key={d} d={d} />)}
        </svg>
      </span>
      <span>
        {displayNameOf(project)}
        {!project.doc_url && <small className={styles.chipSoon}>Coming soon</small>}
      </span>
    </>
  );
  // A tool that has no page yet is listed under its project, but is not a link.
  return project.doc_url ? (
    <Link to={project.doc_url.replace(/\/$/, '')} className={styles.chip}>
      {body}
    </Link>
  ) : (
    <div className={`${styles.chip} ${styles.chipStatic}`}>{body}</div>
  );
}

// The same card for a plain link with an icon from the catalog (a project's Technology and Specifications).
export function LinkCard({ href, label, iconKey }) {
  const paths = ICON_CATALOG[iconKey] || [];
  return (
    <Link to={href} className={styles.chip}>
      <span className={styles.chipIcon}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {paths.map((d) => <path key={d} d={d} />)}
        </svg>
      </span>
      {label}
    </Link>
  );
}

export default function ToolsByKind() {
  return (
    <div className={styles.kinds}>
      {TOOL_KINDS.map((k) => {
        const tools = ALL_PROJECTS.filter((p) => k.test(p) && withPage(p));
        if (tools.length === 0) return null;
        return (
          <div key={k.title} className={styles.kind}>
            <h3 className={styles.kindTitle}>
              <Link to={k.href}>{k.title}</Link>
            </h3>
            <div className={styles.chips}>
              {tools.map((p) => <ToolCard key={p.name} project={p} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
