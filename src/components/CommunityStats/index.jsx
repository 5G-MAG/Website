import communityStatsData from '@site/static/data/community-stats.json';
import { activityLabel } from '@site/src/utils/communityStats';
import RepoRef from '@site/src/components/RepoRef';
import { EarlyAccessLegend, EarlyAccessLock, isEarlyAccess } from '@site/src/components/RepoRows';
import styles from './styles.module.css';

// `variant="bars"`: one row per repository, views and clones as bars scaled to the largest repository.
function Bars({ project }) {
  const maxViews = Math.max(1, ...project.repos.map((r) => r.total_views || 0));
  const maxClones = Math.max(1, ...project.repos.map((r) => r.total_clones || 0));
  const pill = { Active: styles.pillActive, Maintenance: styles.pillMaintenance, Quiet: styles.pillQuiet };
  return (
    <>
      <blockquote>
        <p>
          <strong>Last Synced:</strong> {communityStatsData.updated_at}
        </p>
      </blockquote>
      <EarlyAccessLegend />
      <div className={styles.list}>
        {project.repos.map((r) => {
          const act = activityLabel(r.pushed_at);
          return (
            <div className={styles.row} key={r.repo}>
              <div className={styles.name}>
                <a href={r.repo_url} target="_blank" rel="noreferrer" className={styles.slug}>{r.repo}</a>
                {isEarlyAccess(r.repo) && <EarlyAccessLock />}
              </div>
              <div className={styles.bars}>
                <div className={styles.bar}>
                  <i className={styles.views} style={{ width: `${(100 * (r.total_views || 0)) / maxViews}%` }} />
                  <b>{(r.total_views || 0).toLocaleString('en')} views</b>
                </div>
                <div className={styles.bar}>
                  <i className={styles.clones} style={{ width: `${(100 * (r.total_clones || 0)) / maxClones}%` }} />
                  <b>{(r.total_clones ?? 0).toLocaleString('en')} clones</b>
                </div>
              </div>
              <div className={styles.sf}>
                <span title="Stars">&#9733; {r.stars}</span>
                <span title="Forks">&#9095; {r.forks}</span>
              </div>
              <span className={`${styles.pill} ${pill[act]}`}>{act}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function CommunityStats({ name, variant }) {
  const project = communityStatsData.projects.find((p) => p.name === name);

  if (!project || project.repos.length === 0) {
    return (
      <table className="health-table">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Repository</th>
            <th style={{ width: '10%' }}>Stars</th>
            <th style={{ width: '10%' }}>Forks</th>
            <th style={{ width: '15%' }}>Views (Total)</th>
            <th style={{ width: '20%' }}>Clones (Total)</th>
            <th style={{ width: '20%' }}>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6}>
              <em>Statistics for this project are not available yet.</em>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  if (variant === 'bars') return <Bars project={project} />;

  return (
    <>
      <blockquote>
        <p>
          <strong>Last Synced:</strong> {communityStatsData.updated_at}
        </p>
      </blockquote>
      <table className="health-table">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Repository</th>
            <th style={{ width: '10%' }}>Stars</th>
            <th style={{ width: '10%' }}>Forks</th>
            <th style={{ width: '15%' }}>Views (Total)</th>
            <th style={{ width: '20%' }}>Clones (Total)</th>
            <th style={{ width: '20%' }}>Activity</th>
          </tr>
        </thead>
        <tbody>
          {project.repos.map((repo) => (
            <tr key={repo.repo}>
              <td>
                <a href={repo.repo_url} target="_blank" rel="noreferrer">
                  {repo.repo}
                </a>
                <RepoRef slug={repo.repo} page={false} />
              </td>
              <td>{repo.stars}</td>
              <td>{repo.forks}</td>
              <td>{repo.total_views}</td>
              <td>{repo.total_clones ?? 0}</td>
              <td>{activityLabel(repo.pushed_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
