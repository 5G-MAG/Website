import HubDestinationCard from '@site/src/components/HubDestinationCard';
import { icon } from '@site/src/components/GodeeperCard';
import { ALL_REPOS, ICON_CATALOG } from '@site/src/data/baskets';
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
// "Also used by Content Delivery Protocols"), grouping its repos
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
export default function ProjectRepoSection({ projectNames, accent, isTestbed = false }) {
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
      <h2 className={styles.sectionTitle}>{isTestbed ? 'Testbeds' : 'Reference Tools'} for This Project</h2>
      <p className={styles.sectionSubtitle}>
        The real, running software for this technology — {repos.length}{' '}
        {repos.length === 1 ? 'repository' : 'repositories'}.
      </p>
      {clusters.map((cluster) => (
        <div key={cluster.label || 'own'} style={cluster.label ? { marginTop: '1.75rem' } : undefined}>
          {cluster.label && (
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Also used by {cluster.label}</h3>
          )}
          <div className="godeeper-grid">
            {cluster.repos.map((r) => (
              <HubDestinationCard
                key={r.key}
                compact
                accent={accent}
                icon={iconForCatalogKey(r.originIcon)}
                title={r.name}
                desc={shortDesc(r.description)}
                href={r.url}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// The same cards for a chosen list of repositories, by slug, in the order given: e.g. the components a
// tutorial needs. A repository listed under several projects shows once, with its owning project's icon.
export function RepoCards({ slugs, accent }) {
  const repos = slugs.map((slug) => ALL_REPOS.find((r) => r.slug === slug && r.originName === r.projectName) || ALL_REPOS.find((r) => r.slug === slug)).filter(Boolean);
  if (repos.length === 0) return null;
  return (
    <div className="godeeper-grid">
      {repos.map((r) => (
        <HubDestinationCard
          key={r.slug}
          compact
          accent={accent}
          icon={iconForCatalogKey(r.originIcon)}
          title={r.name}
          desc={shortDesc(r.description)}
          href={r.url}
        />
      ))}
    </div>
  );
}

function iconForCatalogKey(key) {
  const paths = key && ICON_CATALOG[key];
  if (!paths || !paths.length) return null;
  return icon(
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

// A repo's own real description, cut to one short clause rather than the
// full multi-sentence text or dropped outright (raised directly: "the
// description should be minimal" then "you are very radical" once it
// was removed entirely). Trims to a word boundary at or before 60 chars,
// so nothing is cut mid-word.
function shortDesc(description) {
  if (!description) return undefined;
  const first = description.split(/(?<=[.!?])\s/)[0];
  if (first.length <= 60) return first;
  const cut = first.slice(0, 60);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
