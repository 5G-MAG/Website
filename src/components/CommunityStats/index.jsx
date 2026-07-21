import communityStatsData from '@site/static/data/community-stats.json';
import { activityLabel } from '@site/src/utils/communityStats';

export default function CommunityStats({ name }) {
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
              </td>
              <td>{repo.stars}</td>
              <td>{repo.forks}</td>
              <td>{repo.total_views}</td>
              <td>{repo.total_clones}</td>
              <td>{activityLabel(repo.pushed_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
