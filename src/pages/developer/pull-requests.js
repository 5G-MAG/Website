import Layout from '@theme/Layout';
import pullRequestsData from '@site/static/data/pull-requests.json';
import styles from './pull-requests.module.css';

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
        <h2 className={styles.projectSectionTitle}>{project.name}</h2>
        {project.doc_url && (
          <a className="button button--outline button--primary button--sm" href={project.doc_url}>
            Documentation
          </a>
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

export default function PullRequestsPage() {
  const projects = pullRequestsData.projects.filter((p) => p.pulls.length > 0);
  const total = pullRequestsData.projects.reduce((n, p) => n + p.pulls.length, 0);

  return (
    <Layout
      title="Open Pull Requests"
      description="Open pull requests across all 5G-MAG Reference Tools projects"
    >
      <main>
        <div className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Open Pull Requests</h1>
            <p className={styles.subtitle}>
              {total} open across every Reference Tools project.
              {pullRequestsData.updated_at
                ? ` Updated: ${pullRequestsData.updated_at}.`
                : ' Not yet synced.'}
            </p>
          </div>
        </div>
        <div className="container padding-bottom--xl">
          {pullRequestsData.updated_at === null ? (
            <p>Pull request data isn&apos;t available yet. Check back soon.</p>
          ) : projects.length === 0 ? (
            <p>No open pull requests across any tracked project right now.</p>
          ) : (
            projects.map((project) => <ProjectSection key={project.name} project={project} />)
          )}
        </div>
      </main>
    </Layout>
  );
}
