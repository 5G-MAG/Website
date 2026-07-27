import Link from '@docusaurus/Link';
import communityStatsData from '@site/static/data/community-stats.json';
import { activityLabel } from '@site/src/utils/communityStats';
import styles from './styles.module.css';

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
      <h3>{label}</h3>
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
        <h3 className={styles.projectSectionTitle}>{project.name}</h3>
        {project.doc_url && (
          <Link className="button button--outline button--primary button--sm" to={project.doc_url}>
            Documentation
          </Link>
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

// Content-only (no Layout/page-header) version of the former standalone
// /developer/community-stats page, for use as one section of the
// consolidated /developer/community page. Not to be confused with
// src/components/CommunityStats, the per-project stats table embedded on
// individual reference-tool pages -- this is the sitewide overview.
// Not part of the 5G-MAG/Getting-Started hub's own dashboard
// (hub.5g-mag.com/Getting-Started/pages/dashboard.html) -- excluded here so
// the summary totals match that page's totals exactly, repo for repo.
// Still shown with their own real numbers in the per-project tables below.
const NOT_ON_HUB_DASHBOARD = new Set([
  '5GC_APIs',
  'cmcd-toolkit',
  'rt-wui',
  'rt-xr-gITFast',
  'srsRAN',
]);

export default function CommunityStatsBoard() {
  const projects = communityStatsData.projects.filter((p) => p.repos.length > 0);
  // Dedupe by repo name before summing -- a repo shared across many
  // projects (e.g. rt-common-shared, listed under all 10) would otherwise
  // have its stars/forks/views/clones counted once per project that
  // references it, inflating every total well past the real per-repo
  // numbers.
  const uniqueRepos = [...new Map(projects.flatMap((p) => p.repos).map((r) => [r.repo, r])).values()];
  const hubTrackedRepos = uniqueRepos.filter((r) => !NOT_ON_HUB_DASHBOARD.has(r.repo));
  const totals = hubTrackedRepos.reduce(
    (acc, r) => ({
      stars: acc.stars + (r.stars || 0),
      forks: acc.forks + (r.forks || 0),
      views: acc.views + (r.total_views || 0),
      clones: acc.clones + (r.total_clones || 0),
    }),
    { stars: 0, forks: 0, views: 0, clones: 0 }
  );

  if (communityStatsData.updated_at === null) {
    return <p>Community stats aren&apos;t available yet. Check back soon.</p>;
  }

  return (
    <>
      <p>
        Per-repository activity across every Reference Tools project. Updated:{' '}
        {communityStatsData.updated_at}.
      </p>
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
  );
}
