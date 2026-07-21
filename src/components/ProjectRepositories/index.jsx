import React from 'react';
import repoMetadata from '@site/src/data/repoMetadata.json';
import styles from './styles.module.css';

export default function ProjectRepositories({ project }) {
  const repos = repoMetadata[project];

  if (!repos || repos.length === 0) {
    return (
      <p className={styles.empty}>
        Detailed repository metadata is not curated for this project yet, see the
        repository list above.
      </p>
    );
  }

  return (
    <ul className={styles.repoList}>
      {repos.map((repo) => (
        <li key={repo.repo_slug} className={styles.repoRow}>
          <div className={styles.repoHeader}>
            <a
              href={repo.repo_url}
              className={styles.repoName}
              target="_blank"
              rel="noreferrer"
            >
              {repo.display_name}
            </a>
            <code className={styles.repoSlug}>{repo.repo_slug}</code>
            {repo.is_auxiliary && <span className={styles.badgeAux}>Auxiliary</span>}
            {!repo.public && <span className={styles.badgePrivate}>Private</span>}
          </div>

          {repo.description && (
            <p className={styles.repoDescription}>{repo.description}</p>
          )}

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
      ))}
    </ul>
  );
}
