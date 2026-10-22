import React from 'react';
import { OriginIcon, releaseFor, daysSince, formatAge } from '@site/src/components/RepoCard';
import { repoMetaFor } from '@site/src/data/baskets';
import useAnchors from '@site/src/utils/useAnchors';
import styles from './styles.module.css';

// A repository is one row: owning project's icon, name, slug, a lock where the repository is in Early Access, the
// latest release and a link to the repository. Rows are grouped by the project that owns them, as ProjectRepositories
// groups the cards. The lock is explained once, above the list, by EarlyAccessLegend.

export function LockIcon() {
  return (
    <svg className={styles.lock} role="img" aria-label="Early Access" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>Early Access</title>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function EarlyAccessLegend() {
  return (
    <p className={styles.legend}>
      <LockIcon /> Early Access: available to members first
    </p>
  );
}

export function isEarlyAccess(slug) {
  const meta = repoMetaFor(slug);
  return meta ? !meta.public : false;
}

function Row({ entry }) {
  const meta = repoMetaFor(entry.slug);
  const name = meta?.display_name || entry.name;
  const url = meta?.repo_url || entry.url;
  const release = releaseFor(entry.slug);
  useAnchors(`repo-${entry.slug}`);
  return (
    <div className={styles.row} id={`repo-${entry.slug}`}>
      <span className={styles.icon}><OriginIcon name={entry.originIcon} /></span>
      <div className={styles.name}>
        <b>{name}</b>
        <code className={styles.slug}>{entry.slug}</code>
        {isEarlyAccess(entry.slug) && <LockIcon />}
      </div>
      <span className={styles.grow} />
      {release ? (
        <span className={styles.release}>
          <a href={release.url} target="_blank" rel="noreferrer"><b>{release.tag}</b></a>
          <span className={styles.age}>{release.date} &middot; {formatAge(daysSince(release.date))}</span>
        </span>
      ) : (
        <span className={styles.age}>no release yet</span>
      )}
      <div className={styles.actions}>
        <a className={`${styles.button} ${styles.primary}`} href={url} target="_blank" rel="noreferrer">View repository</a>
        <a className={styles.button} href={`${url}/issues`} target="_blank" rel="noreferrer">Issues</a>
        <a className={styles.button} href={`${url}/pulls`} target="_blank" rel="noreferrer">Pull Requests</a>
        <a className={styles.button} href={`${url}/releases`} target="_blank" rel="noreferrer">Releases</a>
      </div>
    </div>
  );
}

export default function RepoRows({ clusters }) {
  return (
    <>
      <EarlyAccessLegend />
      {clusters.map((c) => (
        <div key={c.label || 'own'}>
          {c.label && <h3 className={styles.heading}>Also used by {c.label}</h3>}
          <div className={styles.list}>
            {c.repos.map((entry) => <Row key={entry.key} entry={entry} />)}
          </div>
        </div>
      ))}
    </>
  );
}
