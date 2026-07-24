import Link from '@docusaurus/Link';
import pullRequestsData from '@site/static/data/pull-requests.json';
import styles from './styles.module.css';

function daysSince(dateStr) {
  if (!dateStr) return 9999;
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000)
  );
}

function ageColorClass(days) {
  if (days <= 90) return styles.ageGreen;
  if (days <= 180) return styles.ageOrange;
  return styles.ageRed;
}

function PullRequestRow({ pr }) {
  const days = daysSince(pr.created_at);
  return (
    <div className={styles.prRow}>
      <div className={styles.prMain}>
        <a
          href={`https://github.com/5G-MAG/${pr.repo}`}
          className={styles.prRepo}
          target="_blank"
          rel="noreferrer"
        >
          {pr.repo}
        </a>
        {pr.branch && <span className={styles.prBranch}>@{pr.branch}</span>}
        <a href={pr.url} className={styles.prTitle} target="_blank" rel="noreferrer">
          {pr.title}
        </a>
        <span className={pr.draft ? styles.pillDraft : styles.pillReady}>
          {pr.draft ? 'Draft' : 'Ready'}
        </span>
      </div>
      <div className={styles.prMeta}>
        {pr.author_avatar && (
          <img
            className={styles.authorAvatar}
            src={pr.author_avatar}
            alt={pr.author_login}
            loading="lazy"
          />
        )}
        <span className={styles.authorName}>@{pr.author_login}</span>
        {pr.last_comment_by && (
          <span className={styles.lastComment}>
            Last comment <strong>@{pr.last_comment_by}</strong> on {pr.last_comment_date}
          </span>
        )}
        <span className={`${styles.prAge} ${ageColorClass(days)}`}>
          #{pr.number} &middot; {days === 0 ? 'today' : `${days}d ago`}
        </span>
      </div>
    </div>
  );
}

function ProjectSection({ project }) {
  return (
    <div className={styles.projectSection}>
      <div className={styles.projectSectionHeader}>
        <h3 className={styles.projectSectionTitle}>{project.name}</h3>
        {project.doc_url && (
          <Link className="button button--outline button--primary button--sm" to={project.doc_url}>
            Documentation
          </Link>
        )}
      </div>
      <div className={styles.prList}>
        {project.pulls.map((pr) => (
          <PullRequestRow key={`${pr.repo}-${pr.number}`} pr={pr} />
        ))}
      </div>
    </div>
  );
}

// Content-only (no Layout/page-header) version of the former standalone
// /developer/pull-requests page, for use as one section of the
// consolidated /community page.
export default function CommunityPullRequests() {
  const projects = pullRequestsData.projects.filter((p) => p.pulls.length > 0);
  const total = pullRequestsData.projects.reduce((n, p) => n + p.pulls.length, 0);

  if (pullRequestsData.updated_at === null) {
    return <p>Pull request data isn&apos;t available yet. Check back soon.</p>;
  }

  return (
    <>
      <p>
        {total} open across every Reference Tools project. Updated: {pullRequestsData.updated_at}.
      </p>
      {projects.length === 0 ? (
        <p>No open pull requests across any tracked project right now.</p>
      ) : (
        projects.map((project) => <ProjectSection key={project.name} project={project} />)
      )}
    </>
  );
}
