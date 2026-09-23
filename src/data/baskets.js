import projectsData from './projects.json';
import releasesData from '../../static/data/releases.json';

// src/data/projects.json is now the single, concentrated master for
// 5G-MAG's topic taxonomy -- basket, status, pages, repos, releases-slug,
// image, tagline and contributors all live on ONE array, in ONE file, per
// direct instruction ("I want to have a single point, all very
// concentrated, not to have multiple hops here and there"). This file is
// deliberately almost empty: the 9 basket titles (added elsewhere so
// rarely they don't need their own file either, but a project's `basket`
// field has to point at something) and a handful of read-only helpers.
// There used to be a second, separately-maintained PROJECTS array here,
// cross-referencing projects.json by name -- that was itself one of the
// "hops" this change removes. Don't reintroduce it: add a field to a
// projects.json entry directly, not to a parallel structure here.
//
// `name` on a projects.json entry is a STABLE key other real systems
// match on exactly -- CommunityProjects' PROJECT_CATEGORY lookup,
// ProjectContributors' frontmatter `name="..."` attributes, and the
// releases.json/community-stats.json/pull-requests.json the daily GitHub
// Actions cron writes (scripts/fetch-releases.js and friends, reading
// their own repo list from this same file via scripts/lib/projects.js).
// Renaming `name` breaks all of those until things are updated in
// lockstep. `displayName`, where present, is what a person actually
// renamed it to on review -- prefer it for anything shown to a reader,
// via displayNameOf() below, and never use it as a matching key.
//
// `basket: null` marks a real repo/project that isn't a topic in its own
// right (shared infrastructure, an external fork, a reference-consumer
// repo with no domain of its own) -- see `excludedReason` on that entry
// for why. It still has a real reference-tools page where one exists;
// only its place in the basket/status taxonomy is absent.
//
// Status (Under Study / Technical Analysis / Basic / Advanced / Showcase)
// is a curated call, informed by -- not mechanically derived from -- a
// project's own repos and releases.json (a project can have one lone
// release from a year ago; whether that alone means "advanced" is a
// judgment call, not a formula). `pages` (tech/standards/referenceTools/
// testbeds) records which real page of each kind exists, verified
// against the site's own routes rather than assumed; `null` means none
// exists, not an oversight.

export const BASKETS = [
  { key: 'content-delivery', title: 'Content Delivery and Streaming' },
  { key: 'rtc', title: 'Real-Time Communications (RTC)' },
  { key: '5g-broadcast', title: '5G Broadcast' },
  { key: 'multicast', title: 'Point-to-Multipoint Communication' },
  { key: 'ntn', title: 'Non-Terrestrial Networks (NTN)' },
  { key: 'immersive-media', title: 'Immersive Media' },
  { key: 'connected-media-production', title: 'Connected Media Production' },
  { key: 'research-topics', title: 'Towards 6G' },
  { key: 'testbeds', title: 'Testbeds & Evaluation Frameworks' },
];

// What to show a reader: the renamed title if this project has one,
// otherwise its stable name. Never use this as a lookup key -- use
// `project.name` for that (see the file header for why).
export function displayNameOf(project) {
  return project.displayName || project.name;
}

// Every real topic project, in projects.json's own order -- excludes the
// `basket: null` entries (shared infrastructure, external forks, bare
// reference-consumer repos; see EXCLUDED below for those).
export const PROJECTS = projectsData.filter((p) => p.basket);

// The `basket: null` entries themselves, for the one place (a "not a
// topic" listing) that needs to show they exist and why.
export const EXCLUDED = projectsData.filter((p) => !p.basket);

// Every project in a given basket, in projects.json's own order.
export function projectsInBasket(basketKey) {
  return PROJECTS.filter((p) => p.basket === basketKey);
}

// A project's own repositories -- INFRASTRUCTURE_REPOS excluded, matching
// the rule established for the Work at a Glance diagram ("a repository
// only counts once it's a project's own"). rt-common-shared is Common
// Tools' own (and only) repo, listed under most projects; open5gs/
// srsRAN_4G/rt-srsRAN_Project are 3GPP RAN and Core Platforms' own repos,
// listed under MBS.
const INFRASTRUCTURE_REPOS = ['rt-common-shared', 'open5gs', 'srsRAN_4G', 'rt-srsRAN_Project'];

export function reposFor(project) {
  return (project.repos || [])
    .map((r) => (typeof r === 'string' ? r : r.name))
    .filter((name) => !INFRASTRUCTURE_REPOS.includes(name));
}

// A project's own release history, cross-referenced from static/data/
// releases.json by `name` (the stable key, never displayName) --
// releases.json is not hand-maintained: scripts/fetch-releases.js
// re-derives it from the real GitHub API every day via a scheduled
// GitHub Actions workflow (.github/workflows, cron '0 0 * * *'), reading
// its own repo list from this same projects.json. So a repo's release
// history here is never more than a day stale, with no manual step.
// Keeps only releases whose repo is still in reposFor(project) TODAY --
// not just "not infrastructure" -- so a project whose repos array just
// changed (DVB-I: had rt-5gms-application, corrected to []) doesn't keep
// showing a release attributed to a repo it no longer claims, stale until
// releases.json's next automated run happens to catch up. Returns
// { count: 0, latestDate: null } for a project with no releases.json
// entry, no repos of its own, or only infrastructure/foreign releases --
// never throws, since a repo can genuinely have zero releases yet.
export function releaseInfoFor(project) {
  const entry = releasesData.projects.find((p) => p.name === project.name);
  if (!entry) return { count: 0, latestDate: null };
  const ownRepoNames = new Set(reposFor(project));
  const own = (entry.releases || []).filter((r) => ownRepoNames.has(r.repo));
  if (!own.length) return { count: 0, latestDate: null };
  const latestDate = own.reduce((max, r) => (r.date > max ? r.date : max), own[0].date);
  return { count: own.length, latestDate };
}
