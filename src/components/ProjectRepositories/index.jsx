import React from 'react';
import RepoCard from '@site/src/components/RepoCard';
import cardStyles from '@site/src/components/RepoCard/styles.module.css';
import { ALL_REPOS, ALL_PROJECTS, repoMetaFor, displayNameOf } from '@site/src/data/baskets';

export default function ProjectRepositories({ project, compact = false }) {
  // `project` is the folder-name slug shared by every reference-tools/
  // testbeds page (e.g. "5gms" for both /reference-tools/5gms/ and this
  // component) -- resolved back to the real taxonomy project so its own
  // `repos` array (not just REPO_METADATA's grouping, which only ever held
  // this project's OWN repos) can be read, including any repo it cross-
  // references but doesn't itself own.
  const taxonomyProject = ALL_PROJECTS.find(
    (p) =>
      p.doc_url === `/reference-tools/${project}/` ||
      p.doc_url === `/testbeds/${project}/` ||
      p.doc_url === `/validation/${project}/`
  );
  const projectDisplayName = taxonomyProject ? displayNameOf(taxonomyProject) : null;
  const repos = projectDisplayName ? ALL_REPOS.filter((r) => r.projectName === projectDisplayName) : [];

  if (repos.length === 0) {
    return (
      <p className={cardStyles.empty}>
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
        <div key={cluster.label || 'own'} className={cluster.label ? cardStyles.cluster : undefined}>
          {cluster.label && <h3 className={cardStyles.clusterHeading}>Also used by {cluster.label}</h3>}
          <div className={compact ? `${cardStyles.grid} ${cardStyles.gridCompact}` : cardStyles.grid}>
            {cluster.repos.map((entry) => (
              <RepoCard key={entry.key} entry={entry} meta={repoMetaFor(entry.slug)} compact={compact} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
