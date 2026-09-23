import projectsData from './projects.json';
import releasesData from '../../static/data/releases.json';

// The single source of truth for 5G-MAG's topic taxonomy: which baskets
// exist, which projects sit under each, what stage each project has
// reached, which real pages (Technical Analysis & Blueprints at /tech,
// Standards, Reference Tools, Testbeds) each project has, and which
// repositories and releases it produced.
//
// WHERE EACH FACT ACTUALLY LIVES (read this before adding a field):
//   - Repos belonging to a project: src/data/projects.json's `repos`
//     array. Hand-maintained -- this is the one place a new repo gets
//     added, per that file's own scripts/lib/projects.js comment ("add a
//     repo there, not here, to have it tracked everywhere").
//   - Releases: static/data/releases.json. NOT hand-maintained --
//     scripts/fetch-releases.js regenerates it from the real GitHub API
//     every day (.github/workflows, cron '0 0 * * *'), reading its repo
//     list from projects.json above. Contributors, PRs and community
//     stats follow the same pattern (fetch-contributors.js,
//     fetch-pull-requests.js, fetch-community-stats.js), all on the same
//     daily schedule, all keyed off the same one repos list. This
//     automation already existed before this file did; nothing here
//     replaces it -- reposFor() and releaseInfoFor() below only read it.
//   - Basket assignment and stage (`basket` and `status` below): THIS
//     file, a curated call -- informed by the automated repo/release
//     facts above but not mechanically derived from them (a project can
//     have one lone release from a year ago; whether that alone means
//     "advanced" is a judgment call, not a formula -- see
//     releaseInfoFor()'s own comment, and the rule this rests on: a
//     single release isn't on its own telling).
//
// This file, its EXCLUDED list, and every current basket/project name and
// status below were reconciled from a staging artifact (a Claude-hosted
// database used to review and reclassify everything interactively) once
// that review settled, 2026-09-23. domainPillars.js is retiring in favor
// of this file (see that file's own note), and the Work at a Glance /
// Where We Stand diagram (still a Claude artifact, not in this codebase)
// should read from it too once it's ported into the site.
//
// Vocabulary, settled after "pillar", "domain", "category", "group" and
// "topic" had all been used for one of these two things at different
// points: "Basket" is the one term for a top-level grouping. "Project" is
// the one term for a real thing 5G-MAG works on, each in exactly one
// basket -- matching projects.json's own name for the same idea.
//
// Repo counts are NOT hand-authored here -- see reposFor() below, which
// cross-references projectsJsonName into projects.json's own `repos`
// array, so the two files can't drift on repo counts the way basket
// assignment itself just did. A project with projectsJsonName: null has
// no repository at all yet (confirmed against projects.json, 2026-09-23:
// RTC, NTN, Non-Public Networks, Time-Sensitive Communications and 6G
// Media have no entry there) -- or, for DVB-I, has a repo that is really
// another project's own (see DVB-I's own comment below).

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

// Real repositories/projects that are not a topic in their own right --
// shared infrastructure other projects build on (Common Tools, 3GPP RAN
// and Core Platforms) or a reference-consumer repo without a domain of
// its own (5G Core Service Consumers). Each still has a real
// reference-tools page (linked below) -- excluded from PROJECTS/baskets
// only, not hidden from the site.
export const EXCLUDED = [
  {
    key: 'common-tools',
    name: 'Common Tools',
    reason: 'Shared helper repositories other reference tools depend on -- rt-common-shared.',
    referenceTools: '/reference-tools/common-tools',
  },
  {
    key: '3gpp-ran-core-platforms',
    name: '3GPP RAN and Core Platforms',
    reason: 'Lab-ready 5G RAN and Core built on Open5GS and srsRAN forks -- infrastructure other projects run on, not a topic.',
    referenceTools: '/reference-tools/3gpp-platforms',
  },
  {
    key: '5g-core-service-consumers',
    name: '5G Core Service Consumers',
    reason: 'Reference consumer repo, not a topic in its own right.',
    referenceTools: '/reference-tools/5g-core',
  },
];

export const PROJECTS = [
  {
    key: '5gms',
    name: '5G Media Streaming (5GMS) Architecture',
    basket: 'content-delivery',
    status: 'advanced',
    projectsJsonName: '5G Media Streaming (5GMS)',
    pages: { tech: '/tech/5gms', standards: '/standards/5gms', referenceTools: '/reference-tools/5gms', testbeds: null },
  },
  {
    key: 'data-collection',
    name: 'Data Collection & Analytics',
    basket: 'content-delivery',
    status: 'basic',
    projectsJsonName: 'UE Data Collection, Reporting and Event Exposure',
    pages: {
      tech: '/tech/data-collection/data-collection-event-exposure',
      standards: '/standards/data-collection',
      referenceTools: '/reference-tools/data-collection',
      testbeds: null,
    },
  },
  {
    key: 'content-delivery-protocols',
    name: 'Content Delivery Protocols',
    basket: 'content-delivery',
    status: 'basic',
    // domainPillars.js left this project out of every basket, on its own
    // reasoning that it serves two: "for one-way delivery ... over
    // broadcast and multicast". Real and worth keeping -- Content
    // Delivery is the primary basket here (matching the diagram), the
    // other two are recorded, not dropped.
    relatedBaskets: ['5g-broadcast', 'multicast'],
    projectsJsonName: 'Content Delivery Protocols',
    pages: {
      tech: '/tech/content-delivery',
      standards: '/standards/content-delivery',
      referenceTools: '/reference-tools/content-delivery',
      testbeds: null,
    },
  },
  {
    key: 'rtc',
    name: 'Real-time Media Communication (RTC) Architecture',
    basket: 'rtc',
    status: 'technical-analysis',
    projectsJsonName: null,
    pages: { tech: '/tech/rtc', standards: '/standards/rtc', referenceTools: null, testbeds: null },
  },
  {
    key: '5g-broadcast-tv-radio',
    name: '5G Broadcast - TV and Radio Services',
    basket: '5g-broadcast',
    status: 'advanced',
    projectsJsonName: '5G Broadcast - TV and Radio Services',
    pages: {
      tech: '/tech/5g-broadcast',
      standards: '/standards/5g-broadcast',
      referenceTools: '/reference-tools/5g-broadcast',
      testbeds: null,
    },
  },
  {
    key: 'emergency-alerts',
    name: '5G Broadcast - Emergency Alerts',
    basket: '5g-broadcast',
    status: 'basic',
    projectsJsonName: '5G Broadcast - Emergency Alerts',
    pages: {
      // Shares its /tech page with TV and Radio Services -- one real page
      // ("5G Broadcast - TV, Radio and Emergency Alerts") covers both;
      // /standards keeps them as two separate pages. Recorded as-is, not
      // reconciled by this file.
      tech: '/tech/5g-broadcast',
      standards: '/standards/emergency-alerts',
      referenceTools: '/reference-tools/emergency-alerts',
      testbeds: null,
    },
  },
  {
    key: 'dvb-i',
    name: 'DVB-I Services over 5G Systems',
    basket: '5g-broadcast',
    status: 'technical-analysis',
    // Same situation as Content Delivery Protocols: domainPillars.js left
    // it unassigned because it spans Content Delivery and 5G Broadcast.
    // 5G Broadcast is the primary basket here (matching the diagram).
    relatedBaskets: ['content-delivery'],
    // Built on 5GMS's own repo, not a dedicated DVB-I implementation --
    // projects.json lists only rt-5gms-application, which 5GMS's own
    // entry already claims. projectsJsonName stays null (not "DVB-I
    // Services over 5G Systems") so reposFor() correctly returns 0 for
    // this project instead of double-counting 5GMS's repo. The real
    // relationship is recorded explicitly instead.
    projectsJsonName: null,
    relatedProjects: ['5gms'],
    pages: {
      tech: '/tech/dvb-i/dvb-i-5g',
      standards: '/standards/dvb-i',
      referenceTools: '/reference-tools/dvb-i',
      testbeds: null,
    },
  },
  {
    key: 'mbs',
    name: '5G Multicast Broadcast Services (MBS)',
    basket: 'multicast',
    status: 'advanced',
    projectsJsonName: '5G Multicast Broadcast Services (MBS)',
    pages: { tech: '/tech/5g-mbs', standards: '/standards/5g-mbs', referenceTools: '/reference-tools/5g-mbs', testbeds: null },
  },
  {
    key: 'ntn',
    name: 'Non-Terrestrial Networks in 5G Systems',
    basket: 'ntn',
    status: 'technical-analysis',
    projectsJsonName: null,
    pages: { tech: '/tech/ntn', standards: '/standards/ntn', referenceTools: null, testbeds: null },
  },
  {
    key: 'avatar',
    name: 'Conversational Avatar Communication',
    basket: 'immersive-media',
    status: 'basic',
    projectsJsonName: 'Conversational Avatar Communication with MPEG ARF',
    pages: {
      // /tech and /standards disagree on the slug for this same project
      // (avatar-communications vs. avatar) -- recorded as-is, not
      // reconciled by this file.
      tech: '/tech/avatar-communications',
      standards: '/standards/avatar',
      referenceTools: '/reference-tools/avatar',
      testbeds: null,
    },
  },
  {
    key: 'v3c',
    name: 'Volumetric Video Experiences',
    basket: 'immersive-media',
    status: 'basic',
    projectsJsonName: 'MPEG V3C Immersive Platform',
    pages: {
      // Same kind of /tech vs /standards slug disagreement as Avatar
      // (volumetric vs. v3c) -- recorded as-is, not reconciled here.
      tech: '/tech/volumetric',
      standards: '/standards/v3c',
      referenceTools: '/reference-tools/v3c',
      testbeds: null,
    },
  },
  {
    key: 'xr',
    name: 'XR Media & 3D Scenes',
    basket: 'immersive-media',
    status: 'basic',
    projectsJsonName: 'XR/3D Scenes with MPEG-I Scene Description',
    pages: { tech: '/tech/xr', standards: '/standards/xr', referenceTools: '/reference-tools/xr', testbeds: null },
  },
  {
    key: 'network-apis',
    name: 'Network APIs for Connectivity Quality',
    basket: 'connected-media-production',
    status: 'basic',
    projectsJsonName: 'CAMARA Connectivity Quality Management APIs',
    pages: {
      tech: '/tech/network-apis',
      standards: '/standards/network-apis',
      referenceTools: '/reference-tools/network-apis',
      testbeds: null,
    },
  },
  {
    key: 'npn',
    name: 'Non-Public Networks',
    basket: 'connected-media-production',
    status: 'technical-analysis',
    projectsJsonName: null,
    pages: { tech: '/tech/npn', standards: '/standards/npn', referenceTools: null, testbeds: null },
  },
  {
    key: 'tsc',
    name: 'Time-Sensitive Communications (TSC)',
    basket: 'connected-media-production',
    status: 'technical-analysis',
    projectsJsonName: null,
    pages: { tech: '/tech/tsc', standards: '/standards/tsc', referenceTools: null, testbeds: null },
  },
  {
    key: '6g-media',
    name: '6G Media (standards analysis)',
    basket: 'research-topics',
    status: 'technical-analysis',
    projectsJsonName: null,
    pages: { tech: '/tech/6g', standards: '/standards/6g', referenceTools: null, testbeds: null },
  },
  {
    key: 'ai-traffic',
    name: 'AI Traffic Characterization (6G Testbed)',
    // Missing from domainPillars.js entirely -- it has no Testbeds &
    // Evaluation basket at all. Added here, matching the diagram.
    basket: 'testbeds',
    status: 'basic',
    projectsJsonName: 'AI Traffic Characterization',
    pages: {
      // Shares its /tech page with 6G Media -- "Towards 6G Media"'s own
      // text explicitly covers this testbed ("the 5G-MAG 6G Testbed
      // provides an early experimental platform...").
      tech: '/tech/6g',
      standards: null,
      referenceTools: null,
      testbeds: '/testbeds/6g-testbed',
    },
  },
  {
    key: 'ai-ml',
    name: 'AI/ML Evaluation Framework',
    // CORRECTED from domainPillars.js, which files this under Research
    // Topics. Research Topics is defined as "ahead of any reference
    // tool"; this one has a real repo (rt-ai-ml-evaluation-framework).
    // Testbeds & Evaluation's own definition ("where we test and
    // benchmark technology") fits an "Evaluation Framework" with working
    // code far better. Matches the diagram, not domainPillars.js.
    basket: 'testbeds',
    status: 'basic',
    projectsJsonName: 'AI/ML Evaluation Framework',
    pages: {
      tech: '/tech/ai-ml',
      standards: '/standards/ai-ml',
      referenceTools: null,
      testbeds: '/testbeds/ai-ml',
    },
  },
  {
    key: 'beyond-2d',
    name: 'Beyond 2D Evaluation Framework',
    // Missing from domainPillars.js entirely, same reason as AI Traffic
    // Characterization. Added here, matching the diagram.
    basket: 'testbeds',
    status: 'basic',
    projectsJsonName: 'Beyond 2D Evaluation Framework',
    pages: {
      // Nested under Volumetric's own /tech page, not a top-level route.
      tech: '/tech/volumetric/beyond-2d',
      standards: '/standards/beyond-2d',
      referenceTools: null,
      testbeds: '/testbeds/beyond-2d',
    },
  },
];

// Repositories 5G-MAG maintains purely as shared infrastructure, not as
// output attributable to any one project -- excluded everywhere a
// project's own repo count is computed, matching the rule already
// established for the Work at a Glance diagram ("a repository only
// counts once it's a project's own"). rt-common-shared is Common Tools'
// own (and only) repo, listed under most projects below it;
// open5gs/srsRAN_4G/rt-srsRAN_Project are 3GPP RAN and Core Platforms'
// own repos, listed under MBS.
const INFRASTRUCTURE_REPOS = ['rt-common-shared', 'open5gs', 'srsRAN_4G', 'rt-srsRAN_Project'];

// A project's repositories, cross-referenced from projects.json by name
// rather than duplicated here -- excludes INFRASTRUCTURE_REPOS. Returns
// [] for a project with no projectsJsonName (no repo exists yet) or if
// the cross-reference can't be resolved (projects.json entry renamed or
// removed without updating this file -- fails visibly as an empty list,
// not silently as a wrong count).
export function reposFor(project) {
  if (!project.projectsJsonName) return [];
  const entry = projectsData.find((p) => p.name === project.projectsJsonName);
  if (!entry) return [];
  return (entry.repos || [])
    .map((r) => (typeof r === 'string' ? r : r.name))
    .filter((name) => !INFRASTRUCTURE_REPOS.includes(name));
}

// A project's own release history, cross-referenced from static/data/
// releases.json by name -- same principle as reposFor(): the fact lives
// in one automated place, not duplicated here. releases.json is not
// hand-maintained: scripts/fetch-releases.js re-derives it from GitHub
// every day via a scheduled GitHub Actions workflow (.github/workflows,
// cron '0 0 * * *'), reading its own repo list from projects.json (via
// scripts/lib/projects.js, a thin Node-compatible re-export of the same
// file this module imports) -- so a repo's release history here is never
// more than a day stale, with no manual step. Excludes releases of
// INFRASTRUCTURE_REPOS, same exclusion as reposFor(), so a shared repo's
// release doesn't inflate every project that merely depends on it.
// Returns { count: 0, latestDate: null } for a project with no
// projectsJsonName, no releases.json entry, or only infrastructure
// releases -- never throws, since a repo can genuinely have zero
// releases yet.
export function releaseInfoFor(project) {
  if (!project.projectsJsonName) return { count: 0, latestDate: null };
  const entry = releasesData.projects.find((p) => p.name === project.projectsJsonName);
  if (!entry) return { count: 0, latestDate: null };
  const own = (entry.releases || []).filter((r) => !INFRASTRUCTURE_REPOS.includes(r.repo));
  if (!own.length) return { count: 0, latestDate: null };
  const latestDate = own.reduce((max, r) => (r.date > max ? r.date : max), own[0].date);
  return { count: own.length, latestDate };
}

// Every project in a given basket, in PROJECTS' own order.
export function projectsInBasket(basketKey) {
  return PROJECTS.filter((p) => p.basket === basketKey);
}
