import taxonomyData from './taxonomy.json';
import releasesData from '../../static/data/releases.json';

// src/data/taxonomy.json is the single, concentrated master for 5G-MAG's
// topic taxonomy -- baskets AND projects (basket, status, doc_url/tech_url/
// standards_url, repos, sdos, contributors, tagline) together in ONE file,
// per direct instruction ("I just want 1 file to rule all"). This module is
// the one entry point the website reads it through: every React page or
// component that needs basket/project data imports from here (ALL_PROJECTS
// below), not from taxonomy.json directly -- scripts/lib/projects.js is the
// equivalent entry point for the Node-side fetch-*.js/validate-frontmatter.js
// scripts, which can't `require` this file since it's ES module syntax.
//
// `name` is intentionally the taxonomy-admin tool's own "Name (stable
// key -- careful)" field: editable, but meant to be edited rarely and
// deliberately. Renaming it can still break a real dependent, so prefer
// a URL field (`tech_url`/`doc_url`) as the matching key wherever one
// naturally already pins the same project to a fixed, physical location
// -- a route only changes alongside a deliberate page move, so it can't
// go stale the way a display-oriented `name` edit silently would.
// Every /tech/<project>/index.js page's own `ALL_PROJECTS.find(...)` and
// ProjectContributors (src/components/ProjectContributors) both match on
// a URL field for exactly this reason (fixed in the same pass that added
// the SHARED_REPO_OWNERS build check below, after the same rename-drift
// class of bug kept resurfacing).
//
// What still matches by `name`, because no URL field applies: SHARED_
// REPO_OWNERS values below; the daily GitHub Actions cron's own join key
// across releases.json/community-stats.json/pull-requests.json
// (scripts/fetch-releases.js and friends read their project list from
// this same file via scripts/lib/projects.js, and write that same
// `name` back out) -- self-healing on the next cron run after a rename,
// not a permanent break, but stale until then. `displayName`, where
// present, is what a person actually renamed it to on review -- prefer
// it for anything shown to a reader, via displayNameOf() below, and
// never use it as a matching key.
//
// `basket: null` marks a real repo/project that isn't a topic in its own
// right (shared infrastructure, an external fork, a reference-consumer
// repo with no domain of its own) -- see `excludedReason` on that entry
// for why. It still has a real reference-tools page where one exists;
// only its place in the basket/status taxonomy is absent.
//
// `stages` (Under Study / Technical Analysis / Basic / Advanced / Showcase)
// is a set of independent ticks, not one ordinal value: reaching a later
// stage does not imply every earlier one happened the same way, so each key
// on `stages` is its own curated boolean, informed by -- not mechanically
// derived from -- a project's own repos and releases.json. `doc_url`,
// `tech_url` and `standards_url` record which real page of each kind
// exists, verified against the site's own routes rather than assumed;
// `null` means none exists, not an oversight.

export const BASKETS = taxonomyData.baskets;

// The baskets shown as technology topics and Solutions areas. Testbeds are not a basket: a testbed belongs to a
// technology area like any other project and is a testbed by its type (`isTestbed`, below).
export const TOPIC_BASKETS = BASKETS;

// Accent color per basket -- originally Where We Stand's own chart-row
// color (src/pages/tech/index.js), lifted here as the single source once
// the Reference Tools and Testbeds project cards started reading it too,
// so the three pages can't drift apart on what a basket's color is.
// Each area's own page (Solutions in the top bar): what you can build there and the projects behind it.
export const BASKET_PAGE = {
  'content-delivery': '/content-delivery-and-streaming',
  'rtc': '/real-time-communications',
  'broadcast-multicast': '/broadcast-and-multicast',
  'ntn': '/non-terrestrial-networks',
  'immersive-media': '/immersive-media',
  'connected-media-production': '/connected-media-production',
  'towards-6g': '/towards-6g-media',
};

export const BASKET_ACCENT = {
  'content-delivery': '#00a0d2',
  'broadcast-multicast': '#e07b1a',
  'immersive-media': '#8355c7',
  'connected-media-production': '#d1477a',
  rtc: '#4f63d6',
  ntn: '#1a9e93',
  'towards-6g': '#2e9e5b',
  testbeds: '#4a6b8a',
};

// Where We Stand's own stage grouping (src/pages/tech/index.js) -- a
// project's `stages` field has 5 underlying ticks (same as the taxonomy
// admin tool's STAGE_OPTIONS), grouped here since "Basic" and "Advanced"
// read as two different things to a visitor unfamiliar with the
// taxonomy, so they're one "Software" stage here. Lifted to this shared
// file once the homepage's own basket-level rollup needed the same
// stages, so the two pages can't drift on what they are.
//
// Showcase used to be a 4th stage here -- removed (raised directly:
// "makes no sense to be honest"), since no project's chart row or
// checklist ever had real content to show for it (see bubblesForGroup's
// own comment in tech/index.js, which never populated a Showcase
// bubble either). The underlying stages.showcase tick in taxonomy.json
// and the taxonomy admin tool's own checkbox for it are untouched --
// this only stops displaying it on Where We Stand's own charts.
export const STAGE_GROUPS = [
  { key: 'under-study', label: 'Under Study', reached: (s) => !!s?.['under-study'] },
  {
    key: 'technical-analysis',
    label: 'Technical Analysis',
    reached: (s) => !!s?.['technical-analysis'],
  },
  { key: 'software', label: 'Software', reached: (s) => !!(s?.basic || s?.advanced) },
];

// A basket's own rolled-up reach per STAGE_GROUPS stage -- true once ANY
// of its projects reached that stage, for a basket-level summary (the
// homepage's own strip) that doesn't show individual projects. A basket
// may also carry its own `stages` in taxonomy.json, for an area that is
// itself at a stage before any project of its own exists (Towards 6G
// Media: under study).
export function basketStageReach(basketProjects, basketStages) {
  return STAGE_GROUPS.map((g) => g.reached(basketStages) || basketProjects.some((p) => g.reached(p.stages)));
}

// Per-repo detail (description, license, standards, dependencies, software,
// public/auxiliary flags) for the <ProjectRepositories project="slug"> card
// list, keyed by the slug literal every project's .mdx pages already hard-
// code -- kept as its own nested object rather than folded into a project's
// `repos` array, since it's a different key (slug, not `name`) and covers
// only some of a project's repos, not all of them.
export const REPO_METADATA = taxonomyData.repoMetadata;

// Every project entry, basketed or excluded, in taxonomy.json's own order.
// The one array the website's React side should import for "give me every
// project" -- CommunityProjects, ProjectContributors and the homepage all
// read this instead of reaching into taxonomy.json themselves.
export const ALL_PROJECTS = taxonomyData.projects;

// Named icon shapes (arrays of SVG path `d` strings), keyed by name --
// a project's own `icon` field is one of these keys, not raw path data, so
// an icon is a pick from a fixed catalog (selectable in the taxonomy admin
// tool) rather than a one-off drawing baked into every project that wants
// it. Two or more projects can share a key on purpose (e.g. V3C and Dynamic
// Mesh Coding both use "cube").
export const ICON_CATALOG = taxonomyData.iconCatalog;

// Every organisation that has signed a CLA (name, href, logo filename) --
// the site-wide roster (e.g. /license, /community), distinct from a single
// project's own `contributors` field (who's actively contributed code to
// that project, a strict subset of this list). Single source with
// scripts/lib/projects.js's own CONTRIBUTORS export -- both read this same
// taxonomy.json field, so there is exactly one place that knows who's
// signed (2026-09-28: replaced the separate src/data/contributors.js,
// which could drift from it).
export const CONTRIBUTORS = taxonomyData.contributors;

// What to show a reader: the renamed title if this project has one,
// otherwise its stable name. Never use this as a lookup key -- use
// `project.name` for that (see the file header for why).
export function displayNameOf(project) {
  return project.displayName || project.name;
}

// Every real topic project, in taxonomy.json's own order -- excludes the
// `basket: null` entries (shared infrastructure, external forks, bare
// reference-consumer repos; see EXCLUDED below for those).
// A testbed that is part of a project (`parent`) is listed under Testbeds, and the project in its area; the
// project is not a testbed itself.
export const PROJECTS = ALL_PROJECTS.filter((p) => p.basket && !p.parent);

// Where We Stand's rows on /tech: one per basket, in taxonomy order, with
// the projects that have a `stages` entry. A basket with no such project
// but its own `stages` in taxonomy.json (Towards 6G Media: under study) gets
// one `areaRow` for the area itself instead, linking to the basket's own
// `tech_url`, so the chart shows the same stage as the homepage card rather
// than borrowing a project from another basket. Shared so the jump tiles
// above the chart and on the homepage count what the chart shows.
export const WHERE_WE_STAND_ROWS = TOPIC_BASKETS.map((b) => {
  const projects = PROJECTS.filter((p) => p.stages && p.basket === b.key && !isTestbed(p));
  const areaRow =
    projects.length === 0 && b.stages
      ? { name: b.title, tech_url: b.tech_url, icon: b.icon, stages: b.stages }
      : null;
  return { ...b, projects, areaRow };
}).filter((b) => b.projects.length > 0 || b.areaRow);

// The `basket: null` entries themselves, for the one place (a "not a
// topic" listing) that needs to show they exist and why.
export const EXCLUDED = ALL_PROJECTS.filter((p) => !p.basket);

// Every project in a given basket, in taxonomy.json's own order.
// A testbed is a project whose own pages are under /testbeds/, whatever its
// area: the AI/ML Evaluation Framework and the 6G testbed are testbeds of AI and Media Traffic, in Towards 6G Media.
export function isTestbed(project) {
  return Boolean(project.doc_url && project.doc_url.startsWith('/testbeds/'));
}

// A project's slug: the last segment of its Reference Tools or testbed page (`/reference-tools/5gms/` -> '5gms').
// Its Deploy page is /deploy/<slug>; docusaurus.config.js creates one per project with this same rule.
export function projectSlugOf(project) {
  return project.doc_url ? project.doc_url.replace(/\/$/, '').split('/').pop() : null;
}

export function deployUrlOf(project) {
  const slug = projectSlugOf(project);
  return slug ? `/deploy/${slug}` : null;
}

export function projectBySlug(slug) {
  return ALL_PROJECTS.find((p) => projectSlugOf(p) === slug);
}

// The name a link to a project's Technology page carries. A testbed's display name names the testbed, so
// its Technology page is labelled with the project name (AI Traffic Characterization, not the 6G AI Traffic
// Characterization Testbed).
export function techLabelOf(project) {
  return isTestbed(project) ? project.name : displayNameOf(project);
}

export function projectsInBasket(basketKey) {
  return PROJECTS.filter((p) => p.basket === basketKey);
}

// A project's own repositories -- counted for their real owner(s) only,
// matching the rule established for the Work at a Glance diagram ("a
// repository only counts once it's a project's own"). open5gs is the
// one repo genuinely double-listed by this exact slug, under both 3GPP
// RAN and Core Platforms (branch main, its real owner) and MBS (branch
// 5mbs, a dependency it merely forks) -- counted for the former, not the
// latter, so the same physical fork isn't counted twice across the
// site. This was a flat name blacklist (INFRASTRUCTURE_REPOS) applied to
// every project alike, including open5gs's own real owner -- also
// wrongly caught rt-common-shared, srsRAN_4G and rt-srsRAN_Project,
// checked against every project's own `repos` array and every
// repoMetadata group (2026-09-24, raised directly: "3GPP RAN and Core
// Platforms have many more repositories, actually all the forks") and
// none of those three appears anywhere but its one real owner (MBS's
// own RAN forks use the different slugs srsRAN_4G_mbs/
// srsRAN_Project_mbs; rt-common-shared appears only in Common Tools'
// own data), so blacklisting them only hid each one's own repos with no
// double-count to avoid.
//
// Each entry lists every project this repo should still count for (not
// just one) -- rt-media-origin (2026-09-25, raised directly: "the
// rt-media-origin is part of 5gms" / "the media-origin is also for the
// V3C") is genuinely shared across three projects spanning two baskets:
// its original owner Content Delivery Protocols, 5G Media Streaming
// (5GMS, same basket as Content Delivery Protocols -- excluded here so
// the content-delivery basket's own aggregate doesn't double-count it),
// and MPEG V3C Immersive Platform (a different basket, immersive-media,
// so it counts there too via V3C, its only representative in that
// basket). rt-5gc-service-consumers (part of the basket-less "5G Core
// Service Consumers" reference-consumer project, raised the same way)
// is now also listed under 5GMS's own `repos` for display on its page,
// but only counts toward its original owner -- 5G Core Service
// Consumers has no basket of its own, so this has no aggregate to
// double into regardless, kept for consistency with the pattern above.
//
// releaseInfoFor below also reads reposFor(project), so MBS's own
// release feed still excludes any open5gs release the same way it did
// before this change (MBS was never open5gs's owner here either); 3GPP
// RAN and Core Platforms has no static/data/releases.json entry at all
// yet, so its own release feed is unaffected too, for now.
const SHARED_REPO_OWNERS = {
  open5gs: ['3GPP RAN and Core Platforms'],
  'rt-media-origin': ['Content Delivery Protocols', 'MPEG V3C Immersive Platform', '5G Multicast Broadcast Services (MBS)'],
  'rt-5gc-service-consumers': ['5G Core Service Consumers'],
  'rt-cmmf-encoder': ['Content Delivery Protocols'],
  'rt-libflute': ['Content Delivery Protocols', '5G Broadcast - TV and Radio Services', '5G Multicast Broadcast Services (MBS)'],
  'rt-3gpp-swap': ['Conversational Avatar Communication with MPEG ARF', 'Real-time Media Communication (RTC) Architecture'],
  'cmcd-toolkit': ['5G Media Streaming (5GMS)'],
  'rt-mbms-application': ['5G Broadcast - TV and Radio Services'],
  'rt-mbms-tx': ['5G Broadcast - TV and Radio Services'],
  'rt-mbms-tx-for-qrd-and-crd': ['5G Broadcast - TV and Radio Services', '5G Broadcast - Emergency Alerts'],
  'rt-5gms-application': ['5G Media Streaming (5GMS)'],
};

// Build-time-only self-check (code-derived, no spec claim): a repo slug
// listed in more than one project's own `repos` array but missing from
// SHARED_REPO_OWNERS above silently gets counted as fully "own" by BOTH
// projects in reposFor() below and mis-attributed by ALL_REPOS' own
// origin/icon logic further down -- this exact class of bug was found
// and fixed by hand three times in one session (rt-3gpp-swap, cmcd-
// toolkit, the rt-mbms-* repos) before this check existed. Guarded to
// the Node-side build/SSR pass only (never the browser bundle), so it
// fails the build loudly the moment a taxonomy edit introduces a new
// unreconciled shared repo, rather than shipping a silently wrong count
// or icon until someone notices and greps for it again.
if (typeof window === 'undefined') {
  const ownersBySlug = new Map();
  for (const project of ALL_PROJECTS) {
    for (const r of project.repos || []) {
      const slug = typeof r === 'string' ? r : r.name;
      if (!ownersBySlug.has(slug)) ownersBySlug.set(slug, []);
      ownersBySlug.get(slug).push(project.name);
    }
  }
  const unreconciled = [...ownersBySlug.entries()].filter(
    ([slug, owners]) => owners.length > 1 && !(slug in SHARED_REPO_OWNERS)
  );
  if (unreconciled.length > 0) {
    const detail = unreconciled.map(([slug, owners]) => `  ${slug} -> ${owners.join(', ')}`).join('\n');
    throw new Error(
      `src/data/taxonomy.json: repo(s) listed under more than one project but missing from ` +
        `SHARED_REPO_OWNERS in src/data/baskets.js:\n${detail}\n` +
        `Add each to SHARED_REPO_OWNERS (true owner(s) first) to fix repo counts and icon attribution.`
    );
  }

  // SHARED_REPO_OWNERS' own values are project `name`s too, so a rename
  // that only updates the renamed project's own dependents (its /tech
  // page, ProjectContributors) would leave a stale name sitting here,
  // silently un-matching (reposFor()/ALL_REPOS then treat the repo as
  // if that owner no longer exists at all, rather than erroring).
  const knownNames = new Set(ALL_PROJECTS.map((p) => p.name));
  const staleOwnerRefs = Object.entries(SHARED_REPO_OWNERS).flatMap(([slug, owners]) =>
    owners.filter((name) => !knownNames.has(name)).map((name) => `  ${slug} -> ${name}`)
  );
  if (staleOwnerRefs.length > 0) {
    throw new Error(
      `src/data/baskets.js: SHARED_REPO_OWNERS names a project that no longer exists in ` +
        `src/data/taxonomy.json (renamed or deleted?):\n${staleOwnerRefs.join('\n')}\n` +
        `Update SHARED_REPO_OWNERS to the project's current name.`
    );
  }
}

export function reposFor(project) {
  // A project that hosts testbeds counts their repositories as its own.
  const hosted = ALL_PROJECTS.filter((c) => c.parent === project.name).flatMap((c) => c.repos || []);
  return [...(project.repos || []), ...hosted]
    .map((r) => (typeof r === 'string' ? r : r.name))
    .filter((name) => !(name in SHARED_REPO_OWNERS) || SHARED_REPO_OWNERS[name].includes(project.name));
}

// REPO_METADATA is grouped by an arbitrary key (historically one per
// project, but never guaranteed 1:1 -- see the taxonomy admin tool's own
// repoMetaEntry, this is the same lookup for the site side), not by repo
// slug directly. Search every group rather than assuming which one a slug
// lives in.
export function repoMetaFor(repoSlug) {
  for (const entries of Object.values(REPO_METADATA)) {
    const entry = entries.find((e) => e.repo_slug === repoSlug);
    if (entry) return entry;
  }
  return null;
}

// Every real repo across every real (doc_url'd) project, one flat list --
// not reposFor()'s deduplicated-by-owner count above (built for a
// project's own repo COUNT), every repo entry exactly as each project's
// own `repos` array declares it, branch included, so open5gs's two real,
// distinct branches (3GPP RAN and Core Platforms' main, MBS's 5mbs) each
// show as their own row rather than one being hidden.
//
// Raised directly: a visitor who knows a specific tool's name (e.g. "CMMF
// Encoder") but not which project owns it had no way to find it from the
// homepage in fewer than about 5 clicks. Shared here (not built inline on
// /developer, its first consumer) once the homepage's own live-suggestion
// search needed the same list, so the two can't drift.
// name -> project object, so a shared repo can look up its true primary
// owner (see originName/originIcon/originHref below) regardless of
// which OTHER project's own `repos` array is merely cross-referencing
// it.
const PROJECT_BY_NAME = new Map(ALL_PROJECTS.map((proj) => [proj.name, proj]));

export const ALL_REPOS = ALL_PROJECTS.filter((p) => p.doc_url)
  .flatMap((p) =>
    (p.repos || []).map((r) => {
      const slug = typeof r === 'string' ? r : r.name;
      const branch = typeof r === 'string' ? null : r.branch;
      const meta = repoMetaFor(slug);
      // A shared repo's real identity (icon, name, link) always comes
      // from its true primary owner (SHARED_REPO_OWNERS' first entry),
      // never from whichever OTHER project's own repos array is merely
      // cross-referencing it -- raised directly ("you are not using the
      // right icons... this is a disaster if not all updated
      // automatically"): showing 5GMS's own icon on a genuinely-Content-
      // -Delivery-owned tool just because 5GMS also lists it was exactly
      // that disaster. `projectName`/`projectIcon`/`projectHref` stay
      // context-based (which page's repos array surfaced this entry --
      // needed so a /tech page's own repo section can still filter by
      // `projectName`); `originName`/`originIcon`/`originHref` are the
      // one true identity, equal to the context ones for a repo that
      // isn't shared at all.
      const ownerName = SHARED_REPO_OWNERS[slug]?.[0];
      const originProject = (ownerName && PROJECT_BY_NAME.get(ownerName)) || p;
      return {
        key: `${slug}@${branch || 'default'}@${p.name}`,
        slug,
        branch,
        name: meta?.display_name || slug,
        description: meta?.description || '',
        url: meta?.repo_url || `https://github.com/5G-MAG/${slug}`,
        software: meta?.software || [],
        projectName: displayNameOf(p),
        projectHref: p.doc_url.replace(/\/$/, ''),
        projectIcon: p.icon,
        originName: displayNameOf(originProject),
        originHref: (originProject.doc_url || p.doc_url).replace(/\/$/, ''),
        originIcon: originProject.icon,
      };
    })
  )
  .sort((a, b) => a.name.localeCompare(b.name));

// Empty query returns every repo (the full list a browsing page like
// /developer wants at rest) -- callers that only want live suggestions
// while typing (the homepage's autocomplete) gate on the query itself
// being non-empty before rendering, rather than this returning nothing.
export function filterRepos(query) {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_REPOS;
  return ALL_REPOS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.slug.toLowerCase().includes(q) ||
      r.projectName.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.software.some((s) => s.toLowerCase().includes(q))
  );
}

// A project's own release history, cross-referenced from static/data/
// releases.json by `name` (the stable key, never displayName) --
// releases.json is not hand-maintained: scripts/fetch-releases.js
// re-derives it from the real GitHub API every day via a scheduled
// GitHub Actions workflow (.github/workflows, cron '0 0 * * *'), reading
// its own repo list from this same taxonomy.json. So a repo's release
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
