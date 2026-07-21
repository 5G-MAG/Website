import releasesData from '@site/static/data/releases.json';
import styles from './styles.module.css';

function daysSince(dateStr) {
  if (!dateStr || dateStr === '-') return 9999;
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000)
  );
}

function formatAge(days) {
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 7) return `${days}d ago`;
  if (days < 14) return '1w ago';
  return `${Math.round(days / 7)}w ago`;
}

export default function ProjectReleases({ name }) {
  const project = releasesData.projects.find((p) => p.name === name);
  if (!project) {
    return (
      <p className={styles.updatedAt}>
        No release data available for this project yet — check the project&apos;s GitHub
        repositories directly in the meantime.
      </p>
    );
  }

  const releases = [...project.releases]
    .filter((r) => r.tag !== 'No Release' && r.date !== '-')
    .sort((a, b) => b.date.localeCompare(a.date));

  if (releases.length === 0) {
    return (
      <p className={styles.updatedAt}>
        No releases published yet for this project — check back soon.
      </p>
    );
  }

  return (
    <>
      <ul className={styles.releaseList} aria-label={`Releases for ${name}`}>
        {releases.map((r) => {
          const days = daysSince(r.date);
          return (
            <li key={r.repo} className={styles.releaseRow}>
              <div className={styles.releaseRepoInfo}>
                <a
                  href={`https://github.com/5G-MAG/${r.repo}`}
                  className={styles.releaseRepoName}
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.repo}
                </a>
                <div className={styles.releaseMeta}>
                  {days <= 30 && <span className={styles.badgeNew}>New</span>}
                  <a href={r.url} className={styles.releaseTag} target="_blank" rel="noreferrer">
                    {r.tag}
                  </a>
                  <span className={styles.releaseDate}>
                    {r.date} · {formatAge(days)}
                  </span>
                </div>
              </div>
              {r.author_login && (
                <a
                  href={`https://github.com/${r.author_login}`}
                  className={styles.releaseAuthor}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={r.author_avatar}
                    alt={r.author_login}
                    className={styles.releaseAuthorAvatar}
                  />
                  <span>{r.author_login}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <p className={styles.updatedAt}>Data updated: {releasesData.updated_at}</p>
    </>
  );
}
