import Link from '@docusaurus/Link';
import {
  ALL_PROJECTS,
  displayNameOf,
  isReferenceTool,
  isTestbed,
  isValidationTool,
  isPlatform,
  isCommonTools,
} from '@site/src/data/baskets';
import ListRow, { RowList, kindLabelOf } from '@site/src/components/ListRow';
import styles from './styles.module.css';

// Every tool, grouped by kind. The same rows wherever a page lists "all the tools", so the classification is the
// same everywhere.
export const withPage = (p) => p.doc_url && !p.partOf;

// The kinds that list tools, with their page and test.
export const TOOL_KINDS = [
  { title: 'Reference Tools', href: '/reference-tools', test: isReferenceTool },
  { title: 'Testbeds and Evaluation Frameworks', href: '/testbeds', test: isTestbed },
  { title: 'Validation Tools', href: '/validation', test: isValidationTool },
  { title: 'Platforms', href: '/reference-tools/3gpp-platforms', test: (p) => isPlatform(p) || isCommonTools(p) },
];

// A tool as a row: its name, one line and its kind.
export function ToolRow({ project }) {
  return (
    <ListRow
      href={project.doc_url ? project.doc_url.replace(/\/$/, '') : undefined}
      title={displayNameOf(project)}
      desc={project.doc_url ? project.tagline || '' : 'Coming soon.'}
      kind={kindLabelOf(project)}
      iconKey={project.icon}
    />
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
            <RowList>
              {tools.map((p) => (
                <ToolRow key={p.name} project={p} />
              ))}
            </RowList>
          </div>
        );
      })}
    </div>
  );
}
