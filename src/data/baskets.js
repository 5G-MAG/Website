import projectsData from './projects.json';

// The single source of truth for 5G-MAG's topic taxonomy: which baskets
// exist, which projects sit under each, which real pages (Technical
// Analysis & Blueprints at /tech, Standards, Reference Tools, Testbeds)
// each project has, and which repositories it produced.
//
// Before this file, basket assignment was defined independently in three
// places that drifted apart: src/data/domainPillars.js (About's grid),
// the Work at a Glance / Where We Stand diagram (a Claude artifact, not
// in this codebase), and a project-roster editor's own database (never
// synced back here). This file is the fix: domainPillars.js is retiring
// in favor of it (see that file's own note), and the diagram should read
// from it too once it's ported into the site.
//
// Vocabulary, settled here after "pillar", "domain", "category", "group"
// and "topic" had all been used for one of these two things at different
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
// Media have no entry there).
//
// Status (Under Study / Technical Analysis / Software Accelerator /
// Showcase) is deliberately NOT in this file -- it's derived from repos
// and releases.json (a project reaches Software Accelerator only once it
// has a dedicated repo of its own; Mature only once that repo has a
// release), not a fact to hand-author and let drift from the data again.

export const BASKETS = [
  {
    key: 'content-delivery',
    title: 'Content Delivery',
    description: 'Getting media to a device over an active connection: unicast streaming and its delivery transport.',
  },
  {
    key: 'rtc',
    title: 'Real-Time Communications (RTC)',
    description: 'Two-way, live communication: video calls and conferencing, not one-way delivery.',
  },
  {
    key: '5g-broadcast',
    title: '5G Broadcast',
    description: 'Over-the-air TV, radio and emergency alerts: no SIM, no return channel, unlimited audience.',
  },
  {
    key: 'multicast',
    title: 'Multicast',
    description: 'One-to-many delivery over a live network connection: efficient at scale, still connection-based.',
  },
  {
    key: 'ntn',
    title: 'Non-Terrestrial Networks (NTN)',
    description: 'Extending network reach via satellite.',
  },
  {
    key: 'immersive-media',
    title: 'Immersive Media',
    description: 'Media beyond flat video: avatars, volumetric capture, XR.',
  },
  {
    key: 'connected-media-production',
    title: 'Connected Media Production',
    description:
      'Network capabilities a production or contribution workflow needs: capability exposure, private networks, guaranteed timing.',
  },
  {
    key: 'research-topics',
    title: 'Research Topics',
    description: 'Forward-looking work, ahead of any reference tool.',
  },
  {
    key: 'testbeds',
    title: 'Testbeds & Evaluation',
    description: 'Where we test and benchmark technology, rather than build a reference implementation of it.',
  },
];

export const PROJECTS = [
  {
    key: '5gms',
    name: '5G Media Streaming (5GMS)',
    basket: 'content-delivery',
    projectsJsonName: '5G Media Streaming (5GMS)',
    pages: { tech: '/tech/5gms', standards: '/standards/5gms', referenceTools: '/reference-tools/5gms', testbeds: null },
  },
  {
    key: 'data-collection',
    name: 'Data Collection & Analytics',
    basket: 'content-delivery',
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
    name: 'Real-Time Communications',
    basket: 'rtc',
    projectsJsonName: null,
    pages: { tech: '/tech/rtc', standards: '/standards/rtc', referenceTools: null, testbeds: null },
  },
  {
    key: '5g-broadcast-tv-radio',
    name: '5G Broadcast - TV and Radio Services',
    basket: '5g-broadcast',
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
    // Same situation as Content Delivery Protocols: domainPillars.js left
    // it unassigned because it spans Content Delivery and 5G Broadcast.
    // 5G Broadcast is the primary basket here (matching the diagram).
    relatedBaskets: ['content-delivery'],
    projectsJsonName: 'DVB-I Services over 5G Systems',
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
    projectsJsonName: '5G Multicast Broadcast Services (MBS)',
    pages: { tech: '/tech/5g-mbs', standards: '/standards/5g-mbs', referenceTools: '/reference-tools/5g-mbs', testbeds: null },
  },
  {
    key: 'ntn',
    name: 'Non-Terrestrial Networks',
    basket: 'ntn',
    projectsJsonName: null,
    pages: { tech: '/tech/ntn', standards: '/standards/ntn', referenceTools: null, testbeds: null },
  },
  {
    key: 'avatar',
    name: 'Avatar Communication',
    basket: 'immersive-media',
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
    name: 'Volumetric Video (MPEG V3C)',
    basket: 'immersive-media',
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
    name: 'XR / 3D Scenes',
    basket: 'immersive-media',
    projectsJsonName: 'XR/3D Scenes with MPEG-I Scene Description',
    pages: { tech: '/tech/xr', standards: '/standards/xr', referenceTools: '/reference-tools/xr', testbeds: null },
  },
  {
    key: 'network-apis',
    name: 'Network APIs (CAMARA)',
    basket: 'connected-media-production',
    projectsJsonName: 'CAMARA Connectivity Quality Management APIs',
    pages: {
      tech: '/tech/network-apis',
      standards: '/standards/network-apis',
      referenceTools: '/reference-tools/network-apis',
      testbeds: null,
    },
  },
  {
    key: '5g-core',
    name: '5G Core Service Consumers',
    basket: 'connected-media-production',
    // Missing from domainPillars.js entirely (its Connected Media
    // Production chips are Network APIs / Non-Public Networks /
    // Time-Sensitive Communications only) despite being a real project
    // with its own reference-tools page. Added here.
    projectsJsonName: '5G Core Service Consumers',
    pages: {
      // No /tech or /standards page exists for this project anywhere on
      // the site -- confirmed 2026-09-23, not an oversight in this file.
      tech: null,
      standards: null,
      referenceTools: '/reference-tools/5g-core',
      testbeds: null,
    },
  },
  {
    key: 'npn',
    name: 'Non-Public Networks',
    basket: 'connected-media-production',
    projectsJsonName: null,
    pages: { tech: '/tech/npn', standards: '/standards/npn', referenceTools: null, testbeds: null },
  },
  {
    key: 'tsc',
    name: 'Time-Sensitive Communications',
    basket: 'connected-media-production',
    projectsJsonName: null,
    pages: { tech: '/tech/tsc', standards: '/standards/tsc', referenceTools: null, testbeds: null },
  },
  {
    key: '6g-media',
    name: '6G Media (standards analysis)',
    basket: 'research-topics',
    projectsJsonName: null,
    pages: { tech: '/tech/6g', standards: '/standards/6g', referenceTools: null, testbeds: null },
  },
  {
    key: 'ai-traffic',
    name: 'AI Traffic Characterization (6G Testbed)',
    // Missing from domainPillars.js entirely -- it has no Testbeds &
    // Evaluation basket at all. Added here, matching the diagram.
    basket: 'testbeds',
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

// Every project in a given basket, in PROJECTS' own order.
export function projectsInBasket(basketKey) {
  return PROJECTS.filter((p) => p.basket === basketKey);
}
