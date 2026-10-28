import { TOPIC_BASKETS, BASKET_PAGE, BASKET_ACCENT, PROJECTS, ALL_PROJECTS, techLabelOf, isTestbed, isReferenceTool, isValidationTool, displayNameOf, typeOf, PROJECT_TYPES } from './baskets';
import { ALL_TOPICS } from '../../techTopics.js';

// Canonical per-section nav items, keyed by the route prefix(es) they
// apply to. Consumed by src/components/SectionNav to render one
// consistent pill-row across an entire section — the hub page AND every
// docs sub-page nested under it — rather than each page defining (and
// self-excluding from) its own list. PageNav itself highlights whichever
// item matches the current route, so the current page's own item stays
// in the list instead of being omitted.
//
// `title` labels the bar itself (what section am I in) and is a link back
// to that section's hub — `title` text matches the corresponding top-navbar
// item's own label where one exists (src/theme/navItems.js), so the same
// section is never named two different ways across the page.
//
// `subtitle`, present only on the four pillar entries (Software
// Accelerator, Technology, Standardisation, Deploy), is the
// plain-language one-liner the top navbar's mega-menu
// (src/theme/Navbar/Content/index.js) shows on hover/focus (2026-08-24
// design audit: these four labels are 5G-MAG's internal vocabulary, not
// self-explanatory from the navbar alone). Originally kept verbatim
// identical to that page's own hero-band topic-lead paragraph; the two
// diverged (2026-08-25) once /tech's and /standards' own topic-lead grew
// long enough to also reference their fuller original pillar names --
// too long for the compact hover panel. Curate this one for brevity on
// its own terms; it no longer has to match the page word-for-word.
//
// useLocation().pathname is the raw browser path, which includes baseUrl
// (e.g. '/Website/structure' while baseUrl is '/Website/' for interim
// testing) -- but every prefix/href above is written root-relative
// ('/structure'), matching baseUrl ':' '/' (the eventual production
// state). Both consumers of SECTION_NAV (SectionNav and the navbar's
// sliding indicator) need to strip baseUrl before matching, or every
// comparison silently fails and the section nav disappears entirely --
// exactly what happened when baseUrl became '/Website/'. Centralized here
// so there's one implementation, not two copies drifting apart.
export function stripBaseUrl(pathname, baseUrl) {
  if (!baseUrl || baseUrl === '/') return pathname;
  if (pathname === baseUrl || pathname === baseUrl.slice(0, -1)) return '/';
  if (pathname.startsWith(baseUrl)) return `/${pathname.slice(baseUrl.length)}`;
  return pathname;
}

// Technology's own menu items are the baskets themselves (raised
// directly: "Tech should contain the baskets"), not the hub's meta-pages
// (Blueprints, Specifications, etc. -- those stay one click away on /tech
// itself). Same order and titles as BASKETS (taxonomy.json), the same
// list Where We Stand rolls up on both /tech and the homepage, so this
// menu can't drift from what those actually show. Each links to that
// basket's own anchor on /tech (tech/index.js's basketBlock carries
// id={b.key}).
const TECHNOLOGY_ITEMS = TOPIC_BASKETS.map((b) => ({ label: b.title, href: `/tech#${b.key}` }));

// The Solutions mega menu: every project with its own Technology page, grouped under its area
// (taxonomy order); each group's title links to the area page. An area with no project yet but its own
// page lists that page instead. Testbeds are not listed here: they are in the Software Accelerator menu.
// The Software Accelerator menu, area by area: each area is one card, each project in it one row with what it
// offers, Reference Tools and/or its testbeds, as links. An area with nothing to offer yet is not listed.
const stripSlash = (u) => u.replace(/\/$/, '');
// The Software Accelerator menu, area by area. One set of cards for Reference Tools (the projects that have code)
// and one for Testbeds (each testbed, under the area of the project that hosts it).
const cardsBy = (projects, rows) => TOPIC_BASKETS.map((b) => ({
  title: b.title,
  icon: b.icon,
  accent: BASKET_ACCENT[b.key],
  items: projects.filter((p) => p.basket === b.key).map(rows).filter(Boolean),
})).filter((g) => g.items.length);
const hasCode = (p) => p.doc_url && (p.repos || []).length;
const toolRow = (p) => (isReferenceTool(p) && hasCode(p)
  ? { label: displayNameOf(p), icon: p.icon, href: stripSlash(p.doc_url) } : null);
const validationRow = (p) => (isValidationTool(p) && p.doc_url
  ? { label: displayNameOf(p), icon: p.icon, href: stripSlash(p.doc_url) } : null);
const testbedRow = (p) => (isTestbed(p) ? { label: displayNameOf(p), icon: p.icon, href: stripSlash(p.doc_url) } : null);
// The kinds of software, area by area. Playgrounds and Deployment Kits do not exist yet.
export const FACTORY_TOOL_AREAS = cardsBy(PROJECTS, toolRow);
export const FACTORY_VALIDATION_AREAS = cardsBy(ALL_PROJECTS, validationRow);
export const FACTORY_TESTBED_AREAS = cardsBy(ALL_PROJECTS, testbedRow);

// The two areas with a single project each, shown as half-height cards stacked in one column of the Solutions menu.
export const HALF_AREAS = ['ntn', 'towards-6g'];
export const TECHNOLOGY_GROUPS = TOPIC_BASKETS.map((b) => {
  const items = PROJECTS.filter((p) => p.basket === b.key && p.tech_url)
    .map((p) => ({ label: techLabelOf(p), href: p.tech_url, icon: p.icon, tag: ['testbed', 'evaluation-framework', 'validation-tool'].includes(typeOf(p)) ? PROJECT_TYPES[typeOf(p)] : undefined }));
  return {
    key: b.key,
    title: b.title,
    href: BASKET_PAGE[b.key] || `/tech#${b.key}`,
    icon: b.icon,
    accent: BASKET_ACCENT[b.key],
    items: items.length ? items : b.tech_url ? [{ label: b.title, href: b.tech_url, icon: b.icon }] : [],
  };
}).filter((g) => g.items.length);

// The area pages, in taxonomy order: the Solutions menu and the Solutions bar on each area page.
export const SOLUTIONS_ITEMS = TOPIC_BASKETS.map((b) => ({ label: b.title, href: BASKET_PAGE[b.key], icon: b.icon, accent: BASKET_ACCENT[b.key] })).filter((i) => i.href);

// Every per-topic Standards doc's own URL, derived from techTopics.js's
// ALL_TOPICS (2026-09-27: was a hand-listed array here, and had silently
// drifted -- content-delivery's own second Standards doc, /standards/cmmf,
// and vdmc's /standards/vdmc were both missing, so those two pages fell
// through to the generic Standardisation bar below instead of this
// Technology one, unlike every sibling per-topic Standards page. Deriving
// from ALL_TOPICS instead of hand-listing means a topic's Standards docs
// can never drift from this list again -- same reasoning as
// techTopics.js's own header comment about the Tech/Standards sidebars.
const PER_TOPIC_STANDARDS_PREFIXES = ALL_TOPICS.flatMap((t) =>
  (t.standards || []).map((s) => `/${s.doc}`)
);

export const SECTION_NAV = [
  {
    prefixes: ['/about', '/contact', '/partnerships', '/structure', '/privacy', '/decks'],
    title: 'About Us',
    titleHref: '/about',
    subtitle: 'Who we are, and what we do',
    items: [
      { label: 'Structure', href: '/structure' },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'Slide Decks', href: '/decks' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    prefixes: ['/membership'],
    title: 'Membership',
    titleHref: '/membership',
    items: [
      { label: 'Request information', href: '/membership#request-membership' },
      { label: 'Our Members', href: '/membership#our-members' },
    ],
  },
  // The Software Accelerator: the programme and what it builds, kind by kind. Its long name, Media Connectivity
  // Software Accelerator, heads the panel of the top bar. Tutorials explain how to run the tools, so they sit here too.
  {
    prefixes: ['/developer', '/reference-tools', '/testbeds', '/validation', '/playgrounds', '/kits', '/developer-tools', '/tutorials', '/early-access', '/community', '/contributing', '/license', '/public-call', '/internal-call'],
    title: 'Software Accelerator',
    menuTitle: 'Media Connectivity Software Accelerator',
    titleHref: '/developer',
    subtitle: 'The programme and community that build open-source software.',
    items: [
      { label: 'Reference Tools', href: '/reference-tools', featured: true, prominent: true, group: 'What it builds' },
      { label: 'Testbeds', href: '/testbeds', featured: true, prominent: true, group: 'What it builds' },
      { label: 'Deployment Kits', href: '/kits', featured: true, prominent: true, group: 'What it builds' },
      { label: 'Validation Tools', href: '/validation', group: 'What it builds' },
      { label: 'Playgrounds', href: '/playgrounds', group: 'What it builds' },
      { label: 'Developer Tools', href: '/developer-tools', group: 'What it builds' },
      { label: 'Tutorials', href: '/tutorials', group: 'The programme' },
      { label: 'Developer Community', href: '/community', group: 'The programme' },
      { label: "Developers' Public Call", href: '/public-call', group: 'The programme' },
      { label: "Developers' Internal Call", href: '/internal-call', group: 'The programme' },
      { label: 'Early Access', href: '/early-access', group: 'The programme' },
      { label: 'License', href: '/license', group: 'The programme' },
    ],
  },
  {
    prefixes: ['/videos'],
    title: 'Videos',
    titleHref: '/videos',
    items: [
      { label: 'All Videos', href: '/videos' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Developer Exchanges', href: '/developer/exchanges' },
      { label: "Developers' Public Call", href: '/public-call' },
      { label: 'Technology Exchange', href: '/tech/exchanges' },
    ],
  },
  {
    // Solutions has no hub page of its own: its bar title is plain text, and the top-bar item is a menu.
    prefixes: Object.values(BASKET_PAGE),
    title: 'Solutions',
    items: SOLUTIONS_ITEMS,
  },
  {
    prefixes: ['/tech'],
    title: 'Technology',
    titleHref: '/tech',
    subtitle: 'Specification profiles and implementation guidance.',
    items: TECHNOLOGY_ITEMS,
  },
  // The per-topic Standards pages are Tech hub content served under
  // /standards/<topic> URLs: they list the specifications behind a topic's
  // analysis and reference tools. They therefore carry the Technology bar
  // and render the Tech topic menu (see standardsSidebar in
  // sidebars-home.js), so the section a reader is in is the same one the
  // sidebar beside them shows.
  //
  // This entry must stay ABOVE the '/standards' entry below: the matcher is
  // first-match-wins (SectionNav and the navbar indicator both use
  // SECTION_NAV.find), so these exact paths would otherwise fall through to
  // the Standardisation bar. Prefixes are derived above (see
  // PER_TOPIC_STANDARDS_PREFIXES) from techTopics.js's own ALL_TOPICS, so a
  // new per-topic Standards page picks this up automatically -- no matching
  // edit needed here anymore.
  {
    prefixes: PER_TOPIC_STANDARDS_PREFIXES,
    title: 'Technology',
    titleHref: '/tech',
    subtitle: 'Specification profiles and implementation guidance.',
    items: TECHNOLOGY_ITEMS,
  },
  // /standards itself and its three contributor pages: 5G-MAG as a participant
  // in the standards process, which is a different thing from the per-topic
  // specification pages above.
  {
    prefixes: ['/standards', '/surveys', '/ls'],
    title: 'Standardisation',
    titleHref: '/standards',
    subtitle: 'Feedback and requirements to standards bodies.',
    items: [
      { label: 'Requirements towards SDOs', href: '/standards/requirements' },
      { label: 'Industry Surveys', href: '/surveys' },
      { label: 'Feedback to SDOs', href: '/standards#feedback' },
      { label: 'Liaison Statements & Inputs', href: '/ls' },
      { label: 'Contributions to Other Industry Fora', href: '/standards/industry-fora' },
      { label: 'Workshops for Standards', href: '/workshops' },
    ],
  },
  {
    prefixes: ['/deployments'],
    title: 'Deployments',
    titleHref: '/deployments',
    subtitle: 'Helping technology reach deployment.',
    // Activities only: demos, interop plugfests and testing events. Software
    // (tools, validators, Deployment Kits) lives in the Software Accelerator. It does not own Testbeds or
    // Reference Tools, so it has no sub-items pointing back at those.
    items: [
      { label: 'Demos', href: '/deployments#demos' },
      { label: 'Plugfests', href: '/deployments#plugfests' },
      { label: 'Testing and interoperability', href: '/deployments/testing' },
    ],
  },
  {
    prefixes: ['/events', '/public-call', '/workshops', '/oscar', '/osmart'],
    title: 'Events',
    titleHref: '/events',
    items: [
      { label: "Developers' Public Call", href: '/public-call' },
      { label: 'MWC', href: '/mwc' },
      { label: 'IBC', href: '/ibc' },
      { label: 'FMT', href: '/fmt' },
      { label: 'Community Workshops', href: '/events#workshops' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'OSCAR Workshop', href: '/oscar' },
      { label: 'OSMART Workshops', href: '/osmart' },
    ],
  },
  {
    prefixes: ['/mwc'],
    title: 'MWC',
    titleHref: '/mwc',
    items: [{ label: 'Events', href: '/events' }],
  },
  {
    prefixes: ['/ibc'],
    title: 'IBC',
    titleHref: '/ibc',
    items: [{ label: 'Events', href: '/events' }],
  },
  {
    prefixes: ['/fmt'],
    title: 'FMT',
    titleHref: '/fmt',
    items: [{ label: 'Events', href: '/events' }],
  },
  {
    prefixes: ['/news', '/subscribe'],
    title: 'News',
    titleHref: '/news',
    items: [
      { label: 'Podcast', href: '/podcast' },
      { label: 'Magazine', href: '/magazine' },
      { label: 'Subscribe', href: '/subscribe' },
    ],
  },
  {
    prefixes: ['/podcast'],
    title: 'Podcast',
    titleHref: '/podcast',
    items: [
      { label: 'News', href: '/news' },
      { label: 'Magazine', href: '/magazine' },
    ],
  },
  {
    prefixes: ['/magazine'],
    title: 'Magazine',
    titleHref: '/magazine',
    items: [
      { label: 'News', href: '/news' },
      { label: 'Podcast', href: '/podcast' },
    ],
  },
];
