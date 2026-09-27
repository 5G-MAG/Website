import React from 'react';
import { ALL_REPOS, ALL_PROJECTS, BASKET_ACCENT, repoMetaFor, displayNameOf } from '@site/src/data/baskets';
import releasesData from '@site/static/data/releases.json';
import styles from './styles.module.css';

// releases.json is grouped by project name (like REPO_METADATA), not by
// repo slug -- same cross-group lookup shape as baskets.js's own
// repoMetaFor(), needed here because a repo shown under one project's
// "Also used by" cluster may have its real release data filed under a
// different project's own group.
function releaseFor(repoSlug) {
  for (const project of releasesData.projects) {
    const r = project.releases.find((rel) => rel.repo === repoSlug);
    if (r && r.tag !== 'No Release' && r.date !== '-') return r;
  }
  return null;
}

function daysSince(dateStr) {
  return Math.max(0, Math.floor((Date.now() - new Date(`${dateStr}T12:00:00Z`).getTime()) / 86400000));
}

function formatAge(days) {
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 7) return `${days}d ago`;
  if (days < 14) return '1w ago';
  return `${Math.round(days / 7)}w ago`;
}

// Project name -> basket, so a repo's card can be tinted with the
// technology area it really belongs to (its origin project's basket, e.g.
// 5GMS's own repos vs. a cross-referenced Content Delivery Protocols repo
// shown under "Also used by"). A project with `basket: null` (real,
// documented case -- shared infra/reference-consumer repos with no domain
// of their own, e.g. 5G Core Service Consumers) has no accent to give it;
// that card is left untinted rather than inventing one.
const BASKET_BY_PROJECT_NAME = new Map(ALL_PROJECTS.map((p) => [displayNameOf(p), p.basket]));

// Compact per-repo card: license/standards/software/dependency tags only --
// no activity status pill (removed per direct instruction, "delete the
// active quiet, make it more compact"). `entry` is one ALL_REPOS row (real
// slug + real origin attribution); `meta` is that same repo's full
// repoMetadata record where one is curated (license/standards/software/
// dependencies/is_auxiliary/public) -- ALL_REPOS itself only carries a
// display_name/description/url/software subset, so this looks the rest up
// separately rather than duplicating that data in two places.
function RepoCard({ entry, meta }) {
  const repoSlug = entry.slug;
  const displayName = meta?.display_name || entry.name;
  const repoUrl = meta?.repo_url || entry.url;
  const description = meta?.description || entry.description;
  const standards = meta?.standards || [];
  const software = meta?.software || entry.software || [];
  const dependencies = meta?.dependencies || [];
  const license = meta?.license;
  const isPublic = meta ? meta.public : true;
  const basket = BASKET_BY_PROJECT_NAME.get(entry.originName);
  const accent = basket ? BASKET_ACCENT[basket] : null;
  const release = releaseFor(repoSlug);

  return (
    <div
      className={styles.repoCard}
      style={accent ? { '--repo-accent': accent } : undefined}
    >
      <div className={styles.repoHeader}>
        <div className={styles.repoHeaderInfo}>
          <a href={repoUrl} className={styles.repoName} target="_blank" rel="noreferrer">
            {displayName}
          </a>
          <code className={styles.repoSlug}>{repoSlug}</code>
          {!isPublic && (
            <a className={styles.badgePrivate} href="/early-access">
              Early Access
            </a>
          )}
        </div>
        <div className={styles.repoHeaderActions}>
          <a className={styles.bubbleLink} href={`${repoUrl}/issues`} target="_blank" rel="noreferrer">
            Issues
          </a>
          <a className={styles.bubbleLink} href={`${repoUrl}/pulls`} target="_blank" rel="noreferrer">
            Pull Requests
          </a>
          {/* Generic link, not conditioned on any known release existing --
              GitHub's own releases page reads fine with zero releases, and
              this project has no per-repo "has releases" data to check
              anyway. */}
          <a className={styles.bubbleLink} href={`${repoUrl}/releases`} target="_blank" rel="noreferrer">
            Releases
          </a>
        </div>
      </div>

      {description && <p className={styles.repoDescription}>{description}</p>}

      <div className={styles.repoTags}>
        {standards.length > 0 && (
          <span className={styles.tagGroup}>
            <span className={styles.tagLabel}>Standards</span>
            {standards.map((s) => (
              <span key={s} className={`${styles.tag} ${styles.tagStandard}`}>
                {s}
              </span>
            ))}
          </span>
        )}
        {software.length > 0 && (
          <span className={styles.tagGroup}>
            <span className={styles.tagLabel}>Runs on</span>
            {software.map((s) => (
              <span key={s} className={`${styles.tag} ${styles.tagSoftware}`}>
                {s}
              </span>
            ))}
          </span>
        )}
        {dependencies.length > 0 && (
          <span className={styles.tagGroup}>
            <span className={styles.tagLabel}>Depends on</span>
            {dependencies.map((d) => (
              <span key={d} className={`${styles.tag} ${styles.tagDependency}`}>
                {d}
              </span>
            ))}
          </span>
        )}
        {license && (
          <span className={styles.tagGroup}>
            <span className={styles.tagLabel}>License</span>
            <span className={`${styles.tag} ${styles.tagLicense}`}>{license}</span>
          </span>
        )}
      </div>

      {release && (
        <p className={styles.repoRelease}>
          Latest release:{' '}
          <a href={release.url} target="_blank" rel="noreferrer" className={styles.repoReleaseTag}>
            {release.tag}
          </a>{' '}
          &middot; {release.date} &middot; {formatAge(daysSince(release.date))}
        </p>
      )}
    </div>
  );
}

export default function ProjectRepositories({ project }) {
  // `project` is the folder-name slug shared by every reference-tools/
  // testbeds page (e.g. "5gms" for both /reference-tools/5gms/ and this
  // component) -- resolved back to the real taxonomy project so its own
  // `repos` array (not just REPO_METADATA's grouping, which only ever held
  // this project's OWN repos) can be read, including any repo it cross-
  // references but doesn't itself own.
  const taxonomyProject = ALL_PROJECTS.find(
    (p) => p.doc_url === `/reference-tools/${project}/` || p.doc_url === `/testbeds/${project}/`
  );
  const projectDisplayName = taxonomyProject ? displayNameOf(taxonomyProject) : null;
  const repos = projectDisplayName ? ALL_REPOS.filter((r) => r.projectName === projectDisplayName) : [];

  if (repos.length === 0) {
    return (
      <p className={styles.empty}>
        Detailed repository metadata is not curated for this project yet, see the repository list
        above.
      </p>
    );
  }

  // Same clustering as ProjectRepoSection (src/components/ProjectRepoSection):
  // this project's own repos first with no heading, then one heading per
  // OTHER real owner for repos this project cross-references but doesn't
  // itself own (e.g. 5GMS's own deployment also uses Content Delivery
  // Protocols' rt-media-origin and rt-cmmf-encoder, and 5G Core Service
  // Consumers' rt-5gc-service-consumers) -- raised directly ("you need to
  // also include the repositories that are dependencies... what you
  // already did somewhere else"). Real dependency repos, not fabricated:
  // exactly what this project's own taxonomy.json `repos` array already
  // cross-references, via the same origin attribution ALL_REPOS computes.
  const own = repos.filter((r) => r.originName === projectDisplayName);
  const shared = repos.filter((r) => r.originName !== projectDisplayName);
  const byOrigin = new Map();
  for (const r of shared) {
    if (!byOrigin.has(r.originName)) byOrigin.set(r.originName, []);
    byOrigin.get(r.originName).push(r);
  }
  const clusters = [
    { label: null, repos: own },
    ...[...byOrigin.entries()].map(([label, clusterRepos]) => ({ label, repos: clusterRepos })),
  ].filter((c) => c.repos.length > 0);

  return (
    <>
      {clusters.map((cluster) => (
        <div key={cluster.label || 'own'} className={cluster.label ? styles.repoCluster : undefined}>
          {cluster.label && <h4 className={styles.clusterHeading}>Also used by {cluster.label}</h4>}
          <div className={styles.repoGrid}>
            {cluster.repos.map((entry) => (
              <RepoCard key={entry.key} entry={entry} meta={repoMetaFor(entry.slug)} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
