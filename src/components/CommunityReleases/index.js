import Link from '@docusaurus/Link';
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

function formatDate(dateStr) {
  if (!dateStr || dateStr === '-') return '';
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ProjectCard({ project }) {
  const latest = [...project.releases]
    .filter((r) => r.date !== '-')
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const days = latest ? daysSince(latest.date) : 9999;
  const repoCount = project.releases.length;
  const releaseUrl = project.doc_url ? project.doc_url + (project.releases_slug || 'resources') : null;

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardHeader}>
        <h3 className={styles.projectCardTitle}>{project.name}</h3>
        {days <= 30 && <span className={styles.badgeNew}>New</span>}
      </div>
      {project.tagline && <p className={styles.projectCardTagline}>{project.tagline}</p>}
      <div className={styles.projectCardMeta}>
        <span>
          {repoCount} {repoCount === 1 ? 'repository' : 'repositories'}
        </span>
        {latest && (
          <span>
            Latest: {latest.date} · {formatAge(days)}
          </span>
        )}
      </div>
      {(releaseUrl || project.doc_url) && (
        <div className={styles.projectCardFooter}>
          {releaseUrl && (
            <Link className="button button--primary button--sm" to={releaseUrl}>
              View Releases &rarr;
            </Link>
          )}
          {project.doc_url && (
            <Link
              className="button button--outline button--primary button--sm"
              to={project.doc_url}
            >
              Documentation
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function TimelineEntry({ release, projectName, projectDocUrl }) {
  const days = daysSince(release.date);
  return (
    <div className={styles.timelineEntry}>
      <div className={styles.timelineDot} />
      <div className={styles.timelineContent}>
        <div className={styles.timelineHeader}>
          <a href={release.url} className={styles.timelineTag} target="_blank" rel="noreferrer">
            {release.tag}
          </a>
          {days <= 30 && <span className={styles.badgeNew}>New</span>}
          <span className={styles.timelineDate}>
            {formatDate(release.date)} · {formatAge(days)}
          </span>
        </div>
        <div className={styles.timelineMeta}>
          {projectDocUrl ? (
            <Link to={projectDocUrl} className={styles.timelineProject}>
              {projectName}
            </Link>
          ) : (
            <span className={styles.timelineProject}>{projectName}</span>
          )}
          <span className={styles.timelineSep}>·</span>
          <a
            href={`https://github.com/5G-MAG/${release.repo}`}
            className={styles.timelineRepo}
            target="_blank"
            rel="noreferrer"
          >
            {release.repo}
          </a>
          {release.branch && <span className={styles.timelineBranch}>@{release.branch}</span>}
        </div>
      </div>
      {release.author_login && (
        <a
          href={`https://github.com/${release.author_login}`}
          className={styles.timelineAvatar}
          target="_blank"
          rel="noreferrer"
          title={release.author_login}
        >
          <img src={release.author_avatar} alt={release.author_login} />
        </a>
      )}
    </div>
  );
}

// Content-only (no Layout/page-header) version of the former standalone
// /developer/releases page, for use as one section of the consolidated
// /developer/community page.
export default function CommunityReleases() {
  const allReleases = releasesData.projects
    .flatMap((project) =>
      project.releases
        .filter((r) => r.date !== '-')
        .map((r) => ({ ...r, projectName: project.name, projectDocUrl: project.doc_url }))
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  if (releasesData.updated_at === null) {
    return (
      <p>
        Release data hasn&apos;t been generated yet. Run{' '}
        <code>node scripts/fetch-releases.js</code> locally, or wait for the nightly{' '}
        <code>Update Data</code> workflow to populate this section.
      </p>
    );
  }

  return (
    <>
      <p>
        Latest releases across all 5G-MAG reference tool projects. Updated: {releasesData.updated_at}.
      </p>
      <div className={styles.grid}>
        {releasesData.projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div className={styles.timelineSection}>
        <h3 className={styles.timelineSectionTitle}>Chronological Release History</h3>
        <div className={styles.timeline}>
          {allReleases.map((r, i) => (
            <TimelineEntry
              key={`${r.repo}-${r.tag}-${i}`}
              release={r}
              projectName={r.projectName}
              projectDocUrl={r.projectDocUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
