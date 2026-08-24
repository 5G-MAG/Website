import React from 'react';
import repoMetadata from '@site/src/data/repoMetadata.json';
import statsData from '@site/static/data/community-stats.json';
import { activityLabel } from '@site/src/utils/communityStats';
import styles from './styles.module.css';

// Last-push activity, keyed by repo slug, from the same dataset
// /community's own stats table reads (src/components/CommunityProjects) --
// this is the one place a visitor deciding whether to click through to a
// repo actually is (2026-08-24 findability audit: every other resource
// page linked out bare, with no activity signal, while /community showed
// the same repos with full stats). Not every repoMetadata entry has a
// matching community-stats record (e.g. a forked dependency tracked only
// as a repoMetadata "dependency", not its own community-stats project) --
// those simply render with no pill rather than a fabricated one.
const REPO_ACTIVITY = new Map(
  statsData.projects.flatMap((p) => p.repos.map((r) => [r.repo, r.pushed_at]))
);

const STATUS_CLASSES = {
  Active: styles.statusActive,
  Maintenance: styles.statusMaintenance,
  Quiet: styles.statusQuiet,
};

export default function ProjectRepositories({ project }) {
  const repos = repoMetadata[project];

  if (!repos || repos.length === 0) {
    return (
      <p className={styles.empty}>
        Detailed repository metadata is not curated for this project yet, see the repository list
        above.
      </p>
    );
  }

  return (
    <ul className={styles.repoList}>
      {repos.map((repo) => {
        const pushedAt = REPO_ACTIVITY.get(repo.repo_slug);
        const status = pushedAt ? activityLabel(pushedAt) : null;
        return (
        <li key={repo.repo_slug} className={styles.repoRow}>
          <div className={styles.repoHeader}>
            <a href={repo.repo_url} className={styles.repoName} target="_blank" rel="noreferrer">
              {repo.display_name}
            </a>
            <code className={styles.repoSlug}>{repo.repo_slug}</code>
            {status && (
              <span
                className={`${styles.statusPill} ${STATUS_CLASSES[status]}`}
                title={`Last push: ${pushedAt}`}
              >
                {status}
              </span>
            )}
            {repo.is_auxiliary && <span className={styles.badgeAux}>Auxiliary</span>}
            {!repo.public && (
              <span className={styles.privateGroup}>
                <span className={styles.badgePrivate}>Private</span>
                <a className={styles.earlyAccess} href="/early-access">
                  request access
                </a>
              </span>
            )}
          </div>

          {repo.description && <p className={styles.repoDescription}>{repo.description}</p>}

          <div className={styles.repoTags}>
            {repo.license && (
              <span className={styles.tagGroup}>
                <span className={styles.tagLabel}>License</span>
                <span className={`${styles.tag} ${styles.tagLicense}`}>{repo.license}</span>
              </span>
            )}
            {repo.standards.length > 0 && (
              <span className={styles.tagGroup}>
                <span className={styles.tagLabel}>Standards</span>
                {repo.standards.map((s) => (
                  <span key={s} className={`${styles.tag} ${styles.tagStandard}`}>
                    {s}
                  </span>
                ))}
              </span>
            )}
            {repo.software.length > 0 && (
              <span className={styles.tagGroup}>
                <span className={styles.tagLabel}>Runs on</span>
                {repo.software.map((s) => (
                  <span key={s} className={`${styles.tag} ${styles.tagSoftware}`}>
                    {s}
                  </span>
                ))}
              </span>
            )}
            {repo.dependencies.length > 0 && (
              <span className={styles.tagGroup}>
                <span className={styles.tagLabel}>Depends on</span>
                {repo.dependencies.map((d) => (
                  <span key={d} className={`${styles.tag} ${styles.tagDependency}`}>
                    {d}
                  </span>
                ))}
              </span>
            )}
          </div>
        </li>
        );
      })}
    </ul>
  );
}
