import RepoCard from '@site/src/components/RepoCard';
import RepoRows from '@site/src/components/RepoRows';
import cardStyles from '@site/src/components/RepoCard/styles.module.css';
import { ALL_REPOS, repoMetaFor } from '@site/src/data/baskets';
import styles from '@site/src/pages/tech/index.module.css';

// The one shared "real repos behind this project" section every
// per-project /tech page's "How It Works, Today" area carries below its
// 3 destination cards (raised directly: "you have not included the
// repositories... can you check again tech/5gms and do all properly
// again?" -- 5GMS itself had this hand-rolled once already; generalised
// here into a shared component so it can't drift page to page the way
// the icon consts did before ProjectDestinationCards existed).
//
// `projectNames`: this page's own taxonomy.json project name(s) -- a
// plain string for a single-project topic, or an array for a topic
// covering more than one (5G Broadcast's TV/Radio and Emergency Alerts
// were this shape until split into their own tech_urls, 2026-09-27).
// Every real repo listed under ANY of them (ALL_REPOS, shared with the
// homepage and /developer's own All Repositories search) is shown.
//
// Clustered by true origin (raised directly: "I prefer if the repos are
// just clustered") -- this project's own repos first with no heading,
// then one small heading per OTHER real owner (e.g. 5GMS's page showing
// "Also used by Content Delivery Protocols and Tools"), grouping its repos
// together, using that repo's real originIcon/originName (baskets.js)
// rather than this page's own icon -- raised directly ("you are not
// using the right icons... automatically retrieved from the taxonomy").
//
// Renders nothing (not even a heading) when the project(s) have no real
// repos at all -- taxonomy.json's own doc_url is null for a few projects
// (NTN, RTC, NPN, TSC as of this writing) and ALL_REPOS only ever
// enumerates doc_url'd projects in the first place, so this is already
// the correct "nothing to show" case for those, not a special case to
// handle per page. `isTestbed`: true reads the heading as "Testbeds"
// instead of "Reference Tools" -- raised directly ("given we have
// testbeds maybe make clear if it is reference tools or testbed").
export default function ProjectRepoSection({ projectNames, rows = false }) {
  const names = Array.isArray(projectNames) ? projectNames : [projectNames];
  const repos = ALL_REPOS.filter((r) => names.includes(r.projectName));
  if (repos.length === 0) return null;

  const own = repos.filter((r) => names.includes(r.originName));
  const shared = repos.filter((r) => !names.includes(r.originName));
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
      <h2 className={styles.sectionTitle}>Repositories of This Project</h2>
      <p className={styles.sectionSubtitle}>
        The real, running software for this technology: what each repository is, what it implements, its latest release and where to find it.
      </p>
      {rows ? <RepoRows clusters={clusters} /> : clusters.map((cluster) => (
        <div key={cluster.label || 'own'} className={cluster.label ? cardStyles.cluster : undefined}>
          {cluster.label && <h3 className={cardStyles.clusterHeading}>Also used by {cluster.label}</h3>}
          <div className={cardStyles.grid}>
            {cluster.repos.map((r) => (
              <RepoCard key={r.key} entry={r} meta={repoMetaFor(r.slug)} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// The same cards for a chosen list of repositories, by slug, in the order given: e.g. the components a
// tutorial needs. A repository listed under several projects shows once, with its owning project's icon.
export function RepoCards({ slugs }) {
  const repos = slugs.map((slug) => ALL_REPOS.find((r) => r.slug === slug && r.originName === r.projectName) || ALL_REPOS.find((r) => r.slug === slug)).filter(Boolean);
  if (repos.length === 0) return null;
  return (
    <div className={cardStyles.grid}>
      {repos.map((r) => (
        <RepoCard key={r.slug} entry={r} meta={repoMetaFor(r.slug)} />
      ))}
    </div>
  );
}
