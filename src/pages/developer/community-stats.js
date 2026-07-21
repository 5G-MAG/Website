import Layout from '@theme/Layout';
import communityStatsData from '@site/static/data/community-stats.json';
import { activityLabel } from '@site/src/utils/communityStats';
import styles from './community-stats.module.css';

const STATUS_CLASSES = {
  Active: styles.statusActive,
  Maintenance: styles.statusMaintenance,
  Stable: styles.statusStable,
};

function repoStatus(pushedAt) {
  const label = activityLabel(pushedAt);
  return { label, className: STATUS_CLASSES[label] };
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className={styles.summaryCard}>
      <h4>{label}</h4>
      <span className={styles.summaryValue}>
        {icon} {value}
      </span>
    </div>
  );
}

function RepoRow({ repo }) {
  const status = repoStatus(repo.pushed_at);
  return (
    <tr>
      <td>
        <a href={repo.repo_url} target="_blank" rel="noreferrer" className={styles.repoLink}>
          {repo.repo}
        </a>
      </td>
      <td className={styles.numCell}>{repo.stars}</td>
      <td className={styles.numCell}>{repo.forks}</td>
      <td className={styles.numCell}>{repo.open_issues}</td>
      <td className={styles.numCell}>{repo.total_views}</td>
      <td className={styles.numCell}>{repo.total_clones}</td>
      <td>
        <span className={`${styles.statusPill} ${status.className}`}>{status.label}</span>
      </td>
    </tr>
  );
}

function ProjectTable({ project }) {
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
      <div className={styles.tableWrap}>
        <table className={styles.repoTable}>
          <thead>
            <tr>
              <th>Repository</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Issues</th>
              <th>Views</th>
              <th>Clones</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {project.repos.map((repo) => (
              <RepoRow key={repo.repo} repo={repo} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CommunityStatsPage() {
  const projects = communityStatsData.projects.filter((p) => p.repos.length > 0);
  const allRepos = projects.flatMap((p) => p.repos);
  const totals = allRepos.reduce(
    (acc, r) => ({
      stars: acc.stars + (r.stars || 0),
      forks: acc.forks + (r.forks || 0),
      views: acc.views + (r.total_views || 0),
      clones: acc.clones + (r.total_clones || 0),
    }),
    { stars: 0, forks: 0, views: 0, clones: 0 }
  );

  return (
    <Layout
      title="Community Stats"
      description="Per-repository GitHub activity metrics across all 5G-MAG Reference Tools projects"
    >
      <main>
        <div className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Community Stats</h1>
            <p className={styles.subtitle}>
              Per-repository activity across every Reference Tools project.
              {communityStatsData.updated_at
                ? ` Updated: ${communityStatsData.updated_at}.`
                : ' Not yet synced.'}
            </p>
          </div>
        </div>
        <div className="container padding-bottom--xl">
          {communityStatsData.updated_at === null ? (
            <p>Community stats aren&apos;t available yet. Check back soon.</p>
          ) : (
            <>
              <div className={styles.summaryContainer}>
                <SummaryCard label="Total Stars" value={totals.stars} icon="⭐" />
                <SummaryCard label="Total Forks" value={totals.forks} icon="🍴" />
                <SummaryCard label="Total Views" value={totals.views} icon="👀" />
                <SummaryCard label="Total Clones" value={totals.clones} icon="📥" />
              </div>
              {projects.map((project) => (
                <ProjectTable key={project.name} project={project} />
              ))}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
