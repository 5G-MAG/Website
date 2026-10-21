import React from 'react';
import Link from '@docusaurus/Link';
import { REPO_PAGES } from '@site/src/data/repoPages';
import { ALL_REPOS, repoMetaFor } from '@site/src/data/baskets';
import styles from './styles.module.css';

// The compact counterpart of RepoCard, for places where a repository is one row of a search result, an index or a
// statistics table. It renders what follows the repository name there, so every list shows a repository the same way
// as the card: the Early Access badge (only where a repository is in Early Access) and a link to the repository's page on this site (its own page
// where it has one, otherwise the owning project's page at the repository's card, #repo-<slug>). The name itself,
// linked to GitHub, stays with the caller, which keeps its own row styling.

const ORIGIN_HREF = new Map(ALL_REPOS.map((r) => [r.slug, r.originHref]));

// Page on this site that is about this repository, or null when no project lists it.
export function repoPageFor(slug) {
  if (REPO_PAGES[slug]) return REPO_PAGES[slug];
  const origin = ORIGIN_HREF.get(slug);
  // /developer-tools lists no repository cards, so there is nothing to link to there
  return origin && !origin.startsWith('/developer-tools') ? `${origin}/#repo-${slug}` : null;
}

// `priv` is a fallback for a repository the taxonomy has no record of; the taxonomy wins where it has one.
export function RepoStatus({ slug, priv }) {
  const meta = repoMetaFor(slug);
  const isPublic = meta ? meta.public : !priv;
  // Whether a repository is private matters only for this badge.
  return isPublic ? null : (
    <Link className={`${styles.status} ${styles.early}`} to="/early-access">
      Early Access
    </Link>
  );
}

export default function RepoRef({ slug, page = true, priv }) {
  const href = page ? repoPageFor(slug) : null;
  return (
    <span className={styles.ref}>
      <RepoStatus slug={slug} priv={priv} />
      {href && (
        <Link className={styles.page} to={href}>
          Tool page
        </Link>
      )}
    </span>
  );
}
