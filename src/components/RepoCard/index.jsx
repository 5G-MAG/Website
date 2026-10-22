import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { REPO_PAGES } from '@site/src/data/repoPages';
import useAnchors from '@site/src/utils/useAnchors';
import { ALL_REPOS, ALL_PROJECTS, BASKET_ACCENT, ICON_CATALOG, displayNameOf } from '@site/src/data/baskets';
import releasesData from '@site/static/data/releases.json';
import styles from './styles.module.css';

// One repository card, the same everywhere a repository is shown: the tool pages
// (ProjectRepositories), the technology landing pages (ProjectRepoSection) and the
// tutorial component lists (RepoCards). It shows the owning project's icon, the name,
// whether the repository is open source or Early Access, what it is, what it
// implements, runs on and depends on, its latest release, and the actions that matter
// (the repository itself, its page on this site where there is one, Issues, Pull
// Requests, Releases). Everything is read from the taxonomy; nothing is typed here.

// releases.json is grouped by project name, not by repo slug.
export function releaseFor(repoSlug) {
  for (const project of releasesData.projects) {
    const r = project.releases.find((rel) => rel.repo === repoSlug);
    if (r && r.tag !== 'No Release' && r.date !== '-') return r;
  }
  return null;
}

export function daysSince(dateStr) {
  return Math.max(0, Math.floor((Date.now() - new Date(`${dateStr}T12:00:00Z`).getTime()) / 86400000));
}

export function formatAge(days) {
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 7) return `${days}d ago`;
  if (days < 14) return '1w ago';
  return `${Math.round(days / 7)}w ago`;
}

// Repository slug -> the page of the project that owns it, so a "Depends on" tag naming
// another 5G-MAG repository links to the page about it.
const PAGE_BY_REPO = new Map(ALL_REPOS.map((r) => [r.slug, r.originHref]));

// Project name -> basket, so a card is tinted with the technology area it belongs to.
// A project with no basket has no accent to give it; its card uses the site's primary colour.
const BASKET_BY_PROJECT_NAME = new Map(ALL_PROJECTS.map((p) => [displayNameOf(p), p.basket]));

// The owning project's accent colour, or null when its project has no technology area to take one from.
export function accentFor(entry) {
  const basket = BASKET_BY_PROJECT_NAME.get(entry.originName);
  return basket ? BASKET_ACCENT[basket] : null;
}

export function OriginIcon({ name }) {
  const paths = name && ICON_CATALOG[name];
  if (!paths || !paths.length) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function TagRow({ label, items, className, render }) {
  if (!items || items.length === 0) return null;
  return (
    <div className={styles.tagRow}>
      <span className={styles.tagLabel}>{label}</span>
      {items.map((x) => (
        <span key={x} className={`${styles.tag} ${className}`}>
          {render ? render(x) : x}
        </span>
      ))}
    </div>
  );
}

// `entry` is one ALL_REPOS row; `meta` is the repository's repoMetadata record where one is curated.
export default function RepoCard({ entry, meta }) {
  const repoSlug = entry.slug;
  const displayName = meta?.display_name || entry.name;
  const repoUrl = meta?.repo_url || entry.url;
  const description = meta?.description || entry.description;
  const standards = meta?.standards || [];
  const software = meta?.software || entry.software || [];
  const dependencies = meta?.dependencies || [];
  const license = meta?.license;
  const isPublic = meta ? meta.public : true;
  const accent = accentFor(entry);
  const release = releaseFor(repoSlug);
  const ownPage = REPO_PAGES[repoSlug];
  const earlyAccess = useBaseUrl('/early-access');
  useAnchors(`repo-${repoSlug}`);

  return (
    <article id={`repo-${repoSlug}`} className={styles.card} style={accent ? { '--repo-accent': accent } : undefined}>
      <header className={styles.head}>
        <span className={styles.iconTile}>
          <OriginIcon name={entry.originIcon} />
        </span>
        <div className={styles.titleBlock}>
          <h3 className={styles.name}>
            <a href={repoUrl} target="_blank" rel="noreferrer">
              {displayName}
            </a>
          </h3>
          <code className={styles.slug}>{repoSlug}</code>
        </div>
        {!isPublic && (
          <a className={`${styles.status} ${styles.statusEarly}`} href={earlyAccess}>
            Early Access
          </a>
        )}
      </header>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.tags}>
        <TagRow label="Standards" items={standards} className={styles.tagStandard} />
        <TagRow label="Runs on" items={software} className={styles.tagSoftware} />
        <TagRow
          label="Depends on"
          items={dependencies}
          className={styles.tagDependency}
          render={(d) => {
            const childPage = REPO_PAGES[d];
            const page = childPage || PAGE_BY_REPO.get(d);
            return page && d !== repoSlug ? <a href={childPage || `${page}/#repo-${d}`}>{d}</a> : d;
          }}
        />
        {license && (
          <div className={styles.tagRow}>
            <span className={styles.tagLabel}>License</span>
            <span className={`${styles.tag} ${styles.tagLicense}`}>{license}</span>
          </div>
        )}
      </div>

      {release && (
        <p className={styles.release}>
          <span className={styles.releaseLabel}>Latest release</span>
          <a href={release.url} target="_blank" rel="noreferrer" className={styles.releaseTag}>
            {release.tag}
          </a>
          <span>
            {release.date} &middot; {formatAge(daysSince(release.date))}
          </span>
        </p>
      )}

      <footer className={styles.actions}>
        <a className={`${styles.button} ${styles.buttonPrimary}`} href={repoUrl} target="_blank" rel="noreferrer">
          View repository
        </a>
        {ownPage && (
          <a className={`${styles.button} ${styles.buttonGhost}`} href={ownPage}>
            About this tool
          </a>
        )}
        <a className={`${styles.button} ${styles.buttonGhost}`} href={`${repoUrl}/issues`} target="_blank" rel="noreferrer">
          Issues
        </a>
        <a className={`${styles.button} ${styles.buttonGhost}`} href={`${repoUrl}/pulls`} target="_blank" rel="noreferrer">
          Pull Requests
        </a>
        <a className={`${styles.button} ${styles.buttonGhost}`} href={`${repoUrl}/releases`} target="_blank" rel="noreferrer">
          Releases
        </a>
      </footer>
    </article>
  );
}
