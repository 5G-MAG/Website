import { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import releasesData from '@site/static/data/releases.json';
import statsData from '@site/static/data/community-stats.json';
import pullRequestsData from '@site/static/data/pull-requests.json';
import projectsData from '@site/src/data/projects.json';
import { CONTRIBUTORS } from '@site/src/data/contributors';
import { activityLabel } from '@site/src/utils/communityStats';
import styles from './styles.module.css';

// Same exclusion set CommunityStatsBoard used to keep its summary totals
// matching the 5G-MAG/Getting-Started hub's own dashboard, repo for repo --
// preserved here since this component replaces that one.
const NOT_ON_HUB_DASHBOARD = new Set([
  '5GC_APIs',
  'cmcd-toolkit',
  'rt-wui',
  'rt-xr-gITFast',
  'srsRAN',
]);

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

function ageColorClass(days) {
  if (days <= 90) return styles.ageGreen;
  if (days <= 180) return styles.ageOrange;
  return styles.ageRed;
}

const STATUS_CLASSES = {
  Active: styles.statusActive,
  Maintenance: styles.statusMaintenance,
  Stable: styles.statusStable,
};

function ContributorAvatar({ company }) {
  const c = CONTRIBUTORS.find((entry) => entry.name === company);
  const logoSrc = useBaseUrl(c ? `/assets/images/contributors/${c.logo}` : undefined);
  if (!c) return null;
  return (
    <a href={c.href} target="_blank" rel="noreferrer" title={c.name} className={styles.contributorAvatar}>
      <img src={logoSrc} alt="" loading="lazy" />
    </a>
  );
}

// One row per source dataset (releases.json, community-stats.json,
// pull-requests.json) is merged here by project `name` -- verified to be
// an identical string across all three files. community-stats.json has the
// most complete project list (18), so it drives the merge; a project
// missing from releases.json (no releases yet) or pull-requests.json (no
// open PRs) just gets an empty array for that facet instead of being
// dropped.
function buildMergedProjects() {
  const releasesByName = new Map(releasesData.projects.map((p) => [p.name, p]));
  const prsByName = new Map(pullRequestsData.projects.map((p) => [p.name, p]));

  return statsData.projects.map((statsProject) => {
    const releaseProject = releasesByName.get(statsProject.name);
    const prProject = prsByName.get(statsProject.name);
    const releases = releaseProject
      ? [...releaseProject.releases].filter((r) => r.date !== '-').sort((a, b) => b.date.localeCompare(a.date))
      : [];
    const openPRs = prProject ? prProject.pulls : [];
    const latestRelease = releases[0];
    const mostRecentPush = statsProject.repos.reduce(
      (latest, r) => (!latest || (r.pushed_at || '') > latest ? r.pushed_at : latest),
      null
    );

    return {
      name: statsProject.name,
      doc_url: statsProject.doc_url,
      tagline: statsProject.tagline,
      repos: statsProject.repos,
      releases,
      openPRs,
      latestRelease,
      status: activityLabel(mostRecentPush),
    };
  });
}

function RepoStatsTable({ repos }) {
  return (
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
          {repos.map((repo) => {
            const status = activityLabel(repo.pushed_at);
            return (
              <tr key={repo.repo}>
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
                  <span className={`${styles.statusPill} ${STATUS_CLASSES[status]}`}>{status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function OpenPRList({ pulls }) {
  return (
    <div className={styles.prList}>
      {pulls.map((pr) => {
        const days = daysSince(pr.created_at);
        return (
          <div className={styles.prRow} key={`${pr.repo}-${pr.number}`}>
            <div className={styles.prMain}>
              <span className={styles.prRepo}>{pr.repo}</span>
              <a href={pr.url} className={styles.prTitle} target="_blank" rel="noreferrer">
                {pr.title}
              </a>
              <span className={pr.draft ? styles.pillDraft : styles.pillReady}>
                {pr.draft ? 'Draft' : 'Ready'}
              </span>
              <span className={`${styles.prAge} ${ageColorClass(days)}`}>
                #{pr.number} &middot; {formatAge(days)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectDetails({ project }) {
  const releaseUrl = project.doc_url ? project.doc_url + 'resources' : null;
  const latestDays = project.latestRelease ? daysSince(project.latestRelease.date) : 9999;
  const contributors = projectsData.find((p) => p.name === project.name)?.contributors || [];

  return (
    <details className={styles.projectDetails}>
      <summary className={styles.projectSummary}>
        <span className={styles.projectSummaryMain}>
          <span className={styles.projectName}>{project.name}</span>
          {latestDays <= 30 && <span className={styles.badgeNew}>New release</span>}
        </span>
        <span className={styles.projectSummaryMeta}>
          <span className={`${styles.statusPill} ${STATUS_CLASSES[project.status]}`}>{project.status}</span>
          <span>{project.repos.length} {project.repos.length === 1 ? 'repo' : 'repos'}</span>
          {project.openPRs.length > 0 && (
            <span className={styles.prCountBadge}>{project.openPRs.length} open PR{project.openPRs.length === 1 ? '' : 's'}</span>
          )}
        </span>
      </summary>

      <div className={styles.projectBody}>
        {project.tagline && <p className={styles.projectTagline}>{project.tagline}</p>}

        {contributors.length > 0 && (
          <div className={styles.contributorRow}>
            {contributors.map((company) => (
              <ContributorAvatar key={company} company={company} />
            ))}
          </div>
        )}

        {project.releases.length > 0 && (
          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Latest Releases</h4>
            <ul className={styles.releaseList}>
              {project.releases.slice(0, 3).map((r) => (
                <li key={`${r.repo}-${r.tag}`}>
                  <a href={r.url} target="_blank" rel="noreferrer" className={styles.releaseTag}>
                    {r.tag}
                  </a>{' '}
                  <span className={styles.releaseDate}>
                    {formatDate(r.date)} &middot; {formatAge(daysSince(r.date))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.subsection}>
          <h4 className={styles.subsectionTitle}>Repository Stats</h4>
          <RepoStatsTable repos={project.repos} />
        </div>

        {project.openPRs.length > 0 && (
          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Open Pull Requests</h4>
            <OpenPRList pulls={project.openPRs} />
          </div>
        )}

        <div className={styles.projectFooter}>
          {releaseUrl && (
            <Link className="button button--primary button--sm" to={releaseUrl}>
              View Releases
            </Link>
          )}
          {project.doc_url && (
            <Link className="button button--outline button--primary button--sm" to={project.doc_url}>
              Documentation
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}

function FullTimeline({ projects }) {
  const allReleases = projects
    .flatMap((p) => p.releases.map((r) => ({ ...r, projectName: p.name, projectDocUrl: p.doc_url })))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className={styles.timeline}>
      {allReleases.map((r, i) => {
        const days = daysSince(r.date);
        return (
          <div className={styles.timelineEntry} key={`${r.repo}-${r.tag}-${i}`}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <div className={styles.timelineHeader}>
                <a href={r.url} className={styles.timelineTag} target="_blank" rel="noreferrer">
                  {r.tag}
                </a>
                {days <= 30 && <span className={styles.badgeNew}>New</span>}
                <span className={styles.timelineDate}>
                  {formatDate(r.date)} &middot; {formatAge(days)}
                </span>
              </div>
              <div className={styles.timelineMeta}>
                {r.projectDocUrl ? (
                  <Link to={r.projectDocUrl} className={styles.timelineProject}>
                    {r.projectName}
                  </Link>
                ) : (
                  <span className={styles.timelineProject}>{r.projectName}</span>
                )}
                <span className={styles.timelineSep}>&middot;</span>
                <a
                  href={`https://github.com/5G-MAG/${r.repo}`}
                  className={styles.timelineRepo}
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.repo}
                </a>
              </div>
            </div>
            {r.author_login && (
              <a
                href={`https://github.com/${r.author_login}`}
                className={styles.timelineAvatar}
                target="_blank"
                rel="noreferrer"
                title={r.author_login}
              >
                <img src={r.author_avatar} alt="" />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Replaces the former CommunityReleases + CommunityPullRequests +
// CommunityStatsBoard trio (2026-07-29): those three each re-enumerated the
// same ~18 projects independently -- a project's releases, its repo stats
// and its open PRs lived in three unrelated places on the page instead of
// together. This merges all three by project name into one collapsed-by-
// default per-project view, plus an optional full cross-project release
// timeline for anyone who wants the flat chronological feed.
export default function CommunityProjects() {
  const [showTimeline, setShowTimeline] = useState(false);
  const projects = buildMergedProjects();

  if (statsData.updated_at === null) {
    return <p>Community activity data isn&apos;t available yet. Check back soon.</p>;
  }

  const hubTrackedRepos = [...new Map(
    projects.flatMap((p) => p.repos).map((r) => [r.repo, r])
  ).values()].filter((r) => !NOT_ON_HUB_DASHBOARD.has(r.repo));

  const totals = hubTrackedRepos.reduce(
    (acc, r) => ({
      stars: acc.stars + (r.stars || 0),
      forks: acc.forks + (r.forks || 0),
      views: acc.views + (r.total_views || 0),
      clones: acc.clones + (r.total_clones || 0),
    }),
    { stars: 0, forks: 0, views: 0, clones: 0 }
  );

  const totalOpenPRs = projects.reduce((n, p) => n + p.openPRs.length, 0);

  return (
    <>
      <p>
        Releases, repository stats and open pull requests for every Reference Tools and Testbeds
        project, grouped together instead of spread across separate lists. Updated:{' '}
        {statsData.updated_at}.
      </p>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryCard}>
          <h3>Total Stars</h3>
          <span className={styles.summaryValue}>&#11088; {totals.stars}</span>
        </div>
        <div className={styles.summaryCard}>
          <h3>Total Forks</h3>
          <span className={styles.summaryValue}>&#127811; {totals.forks}</span>
        </div>
        <div className={styles.summaryCard}>
          <h3>Total Views</h3>
          <span className={styles.summaryValue}>&#128064; {totals.views}</span>
        </div>
        <div className={styles.summaryCard}>
          <h3>Open Pull Requests</h3>
          <span className={styles.summaryValue}>{totalOpenPRs}</span>
        </div>
      </div>

      <div className={styles.projectList}>
        {projects.map((project) => (
          <ProjectDetails key={project.name} project={project} />
        ))}
      </div>

      <div className={styles.timelineToggleSection}>
        <button
          type="button"
          className={styles.timelineToggle}
          onClick={() => setShowTimeline((v) => !v)}
        >
          {showTimeline ? 'Hide' : 'Show'} full chronological release history &darr;
        </button>
        {showTimeline && <FullTimeline projects={projects} />}
      </div>
    </>
  );
}
