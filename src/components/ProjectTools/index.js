import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { familyForPath } from '@site/src/utils/projectFamily';
import { ToolCard, TOOL_KINDS, withPage } from '@site/src/components/ToolsByKind';
import styles from '@site/src/components/ToolsByKind/styles.module.css';

// The Software Accelerator tools of the project whose page this is, by kind. The same cards and the same kinds as the
// Software Accelerator page, so a tool looks the same wherever it is listed.
export default function ProjectTools() {
  const { pathname } = useLocation();
  const family = familyForPath(pathname);
  const groups = TOOL_KINDS.map((k) => ({
    ...k,
    tools: family.filter((p) => k.test(p) && withPage(p)),
  })).filter((g) => g.tools.length > 0);
  return (
    <div className={styles.tools}>
      <h3 style={{ margin: '0 0 0.75rem' }}>Software Accelerator tools</h3>
      {groups.length === 0 ? (
        <p className={styles.toolsNone}>
          No tool has been published for this project yet. See the <Link to="/developer">Software Accelerator</Link>{' '}
          for what the programme builds, or <Link to="/contributing">contribute</Link> to build one.
        </p>
      ) : (
        <div className={styles.kinds} style={{ margin: 0, maxWidth: 'none' }}>
          {groups.map((g) => (
            <div key={g.title} className={styles.kind}>
              <h4 className={styles.kindTitle}>
                <Link to={g.href}>{g.title}</Link>
              </h4>
              <div className={styles.chips}>
                {g.tools.map((p) => (
                  <ToolCard key={p.name} project={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
