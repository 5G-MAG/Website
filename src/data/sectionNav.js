import { BASKETS, TOPIC_BASKETS, BASKET_PAGE, BASKET_ACCENT, PROJECTS, ALL_PROJECTS, techLabelOf, isTestbed, displayNameOf } from './baskets';
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

// The Solutions mega menu: every project with its own Technical Analysis page, grouped under its area
// (taxonomy order); each group's title links to the area page. An area with no project yet but its own
// page lists that page instead. Testbeds are not listed here: they are in the Software Accelerator menu.
export const TECHNOLOGY_GROUPS = TOPIC_BASKETS.map((b) => {
  const items = PROJECTS.filter((p) => p.basket === b.key && p.tech_url)
    .map((p) => ({ label: techLabelOf(p), href: p.tech_url, icon: p.icon }));
  return {
    title: b.title,
    href: BASKET_PAGE[b.key] || `/tech#${b.key}`,
    icon: b.icon,
    accent: BASKET_ACCENT[b.key],
    items: items.length ? items : b.tech_url ? [{ label: b.title, href: b.tech_url, icon: b.icon }] : [],
  };
}).filter((g) => g.items.length);

// The Software Accelerator mega menu: every project that has code, laid out like Solutions (same areas,
// order, colours and icons) but each project opens its Reference Tools page; Testbeds is its own group
// (each opens a testbed's page) and the tools that are not an area's (platforms, shared libraries) come last.
// A project without a repository yet (NTN, NPN, TSC) is not listed until it has one.
const stripSlash = (u) => u.replace(/\/$/, '');
export const ACCELERATOR_GROUPS = TOPIC_BASKETS.map((b) => ({
  title: b.title,
  href: BASKET_PAGE[b.key] || `/tech#${b.key}`,
  icon: b.icon,
  accent: BASKET_ACCENT[b.key],
  items: PROJECTS.filter((p) => p.basket === b.key && p.doc_url && !isTestbed(p) && p.repos.length)
    .map((p) => ({ label: displayNameOf(p), href: stripSlash(p.doc_url), icon: p.icon })),
})).filter((g) => g.items.length).concat(
  [{
    title: 'Testbeds & Evaluation Frameworks',
    href: '/testbeds',
    icon: 'flask',
    accent: BASKET_ACCENT.testbeds,
    items: PROJECTS.filter(isTestbed).map((p) => ({ label: displayNameOf(p), href: stripSlash(p.doc_url), icon: p.icon })),
  }].filter((g) => g.items.length),
  [{
    title: 'Platforms and shared tools',
    href: '/reference-tools',
    icon: 'tool',
    accent: '#7a8795',
    items: ALL_PROJECTS.filter((p) => !p.basket && p.doc_url && p.doc_url.startsWith('/reference-tools/') && p.repos.length)
      .map((p) => ({ label: displayNameOf(p), href: stripSlash(p.doc_url), icon: p.icon })),
  }].filter((g) => g.items.length)
);

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
    prefixes: ['/about', '/contact', '/partnerships', '/structure', '/subscribe', '/privacy'],
    title: 'About Us',
    titleHref: '/about',
    items: [
      { label: 'Structure', href: '/structure' },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'Contact', href: '/contact' },
      { label: 'Subscribe', href: '/subscribe' },
      { label: 'Privacy Notice', href: '/privacy' },
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
  // Every route under the Software Accelerator umbrella shares this one
  // entry (2026-07-23) — previously /showcase, /reference-tools and
  // /testbeds each carried their own separate, shorter, self-excluding item
  // list (missing Early Access and License, and drifting further any time
  // one list was updated but not the others), and /early-access matched no
  // prefix at all so it got no bar whatsoever. One shared entry, matched by
  // every prefix in the section, is the only way this can't drift again.
  {
    prefixes: [
      '/developer',
      '/reference-tools',
      '/testbeds',
      '/tutorials',
      '/developer-assets',
      '/early-access',
      '/community',
      '/contributing',
      '/license',
    ],
    title: 'Software Accelerator',
    // The full name, shown on the header card inside the top bar's dropdown only.
    menuTitle: 'Media Connectivity Software Accelerator',
    titleHref: '/developer',
    subtitle: 'Open-source developer community.',
    // Reference Tools / Testbeds / Tutorials are this section's three real
    // destinations (real code, real environments, step-by-step guides)
    // -- `featured: true` renders them as solid chips in PageNav, distinct
    // from the plain outline chips below them, which are secondary/meta
    // pages (exchanges, access, community process) rather than destinations
    // in their own right.
    // Order past the 3 featured destinations follows direct instruction
    // (2026-09-26): "order of importance after reference tools, testbeds
    // and showcase is: Developer Community, License, Early Access,
    // Developer Exchanges." Contributing is deliberately NOT its own pill
    // here — it's reached via Developer Community instead. Community's own
    // "Where to Go Next" tile links to /contributing (the code workflow);
    // the developer hub's "Become a contributor" link points at Community's
    // own Becoming a Contributor section instead (the CLA/joining side).
    items: [
      { label: 'Reference Tools', href: '/reference-tools', featured: true },
      { label: 'Testbeds', href: '/testbeds', featured: true },
      { label: 'Tutorials', href: '/tutorials', featured: true },
      { label: 'Developer Assets', href: '/developer-assets', featured: true },
      { label: 'Developer Community', href: '/community' },
      { label: 'Community Activity', href: '/community/activity' },
      { label: 'License', href: '/license' },
      { label: 'Early Access', href: '/early-access' },
      { label: 'Developer Exchanges', href: '/developer/exchanges' },
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
      { label: 'Dev Public Call', href: '/public-call' },
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
      { label: 'Workshops for Standards', href: '/workshops' },
    ],
  },
  {
    prefixes: ['/deploy'],
    title: 'Deploy',
    titleHref: '/deploy',
    subtitle: 'Demos, plugfests and deployable assets to onboard into your products.',
    // From the tools to products: demos, interop plugfests, and the assets:
    // packages, modules, Docker images and apps. It does not own Testbeds or
    // Reference Tools, so it has no sub-items pointing back at those.
    items: [
      { label: 'Demos', href: '/deploy#demos' },
      { label: 'Plugfests', href: '/deploy#plugfests' },
      { label: '5G Broadcast PlugFest 2026', href: '/deploy/5g-broadcast-plugfest' },
      { label: 'Deployable Assets', href: '/deploy#assets' },
    ],
  },
  {
    prefixes: ['/events', '/public-call', '/workshops', '/oscar', '/osmart'],
    title: 'Events',
    titleHref: '/events',
    items: [
      { label: 'Dev Public Call', href: '/public-call' },
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
    prefixes: ['/news'],
    title: 'News',
    titleHref: '/news',
    items: [
      { label: 'Podcast', href: '/podcast' },
      { label: 'Magazine', href: '/magazine' },
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
