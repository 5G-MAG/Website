import pullRequestsData from '@site/static/data/pull-requests.json';
import styles from './styles.module.css';

// One project's open pull requests, standalone -- ported out of
// src/components/CommunityProjects (the /community page's own OpenPRList),
// which only ever renders this per-project inline as part of its own
// whole-org board. Real, cron-fetched data (scripts/fetch-pull-requests.js,
// daily): no placeholder here, unlike the blueprint's spec/status fields.
//
// `name`: the project's full display name, the same join key
// ProjectReleases/CommunityStats already use against their own JSON files
// (not the `project` slug ProjectRepositories takes -- see that component's
// own comment for why the two conventions differ).

function daysSince(dateStr) {
  if (!dateStr || dateStr === '-') return 9999;
  return Math.max(0, Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000));
}

function formatAge(days) {
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 7) return `${days}d ago`;
  if (days < 14) return '1w ago';
  return `${Math.round(days / 7)}w ago`;
}

function ageColorClass(days) {
  if (days <= 90) return styles.ageGreen;
  if (days <= 180) return styles.ageOrange;
  return styles.ageRed;
}

export default function ProjectOpenPRs({ name }) {
  const project = pullRequestsData.projects.find((p) => p.name === name);
  const pulls = project?.pulls || [];

  if (pulls.length === 0) {
    return <p className={styles.empty}>No open pull requests right now.</p>;
  }

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
