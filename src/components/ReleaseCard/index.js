import Link from '@docusaurus/Link';
import ProjectIcon from '@site/src/components/ProjectIcon';
import { daysSince, formatAge } from '@site/src/utils/releases';
import styles from './styles.module.css';

// A compact per-project release card: latest 4 tags, each with a "New"
// badge if under 30 days old, plus links to the project's docs/releases
// pages. Used on both /developer (its original home) and Home.
export default function ReleaseCard({ project }) {
  const rows = project.releases
    .filter((r) => r.tag !== 'No Release' && r.date !== '-')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <div className={styles.releaseCard}>
      <div className={styles.releaseCardHeader}>
        <ProjectIcon name={project.name} className={styles.releaseCardIcon} />
        <h3 className={styles.releaseCardTitle}>{project.name}</h3>
      </div>
      <div className={styles.releaseCardBody}>
        {rows.map((r) => {
          const days = daysSince(r.date);
          return (
            <div key={r.repo} className={styles.releaseRow}>
              <a
                href={`https://github.com/5G-MAG/${r.repo}`}
                className={styles.releaseRepo}
                target="_blank"
                rel="noreferrer"
                title={r.repo}
              >
                {r.repo}
              </a>
              <div className={styles.releaseMeta}>
                {days <= 30 && <span className={styles.badgeNew}>New</span>}
                <a href={r.url} className={styles.releaseTag} target="_blank" rel="noreferrer">
                  {r.tag}
                </a>
                <span className={styles.releaseDate}>{formatAge(days)}</span>
              </div>
            </div>
          );
        })}
      </div>
      {project.doc_url && (
        <div className={styles.releaseCardFooter}>
          <Link className={styles.releaseDocLink} to={project.doc_url}>
            View Documentation &rarr;
          </Link>
          <Link className={styles.releaseRelLink} to={`${project.doc_url}${project.releases_slug || 'resources'}`}>
            View Releases &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
