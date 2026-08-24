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
// Accelerator, Technology, Standardisation, In Action), is the
// plain-language one-liner the top navbar's mega-menu
// (src/theme/Navbar/Content/index.js) shows on hover/focus — verbatim the
// same text as that page's own hero-band topic-lead paragraph, so a
// visitor sees the same clarification before the click that they'd get
// immediately after it (2026-08-24 design audit: these four labels are
// 5G-MAG's internal vocabulary, not self-explanatory from the navbar alone).
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
  // entry (2026-07-23) — previously /applications, /reference-tools and
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
      '/applications',
      '/early-access',
      '/community',
      '/license',
    ],
    title: 'Software Accelerator',
    titleHref: '/developer',
    subtitle: 'Open-source developer community. Reference tools, testbeds and applications for connected media experiences.',
    items: [
      { label: 'Reference Tools', href: '/reference-tools' },
      { label: 'Testbeds', href: '/testbeds' },
      { label: 'Applications', href: '/applications' },
      { label: 'Developer Exchanges', href: '/developer/exchanges' },
      { label: 'Early Access', href: '/early-access' },
      { label: 'Community', href: '/community' },
      { label: 'License', href: '/license' },
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
    prefixes: ['/tech'],
    title: 'Technology',
    titleHref: '/tech',
    subtitle: 'Specification profiles and implementation guidance — by the members, for the industry.',
    items: [
      { label: 'Implementation Blueprints', href: '/tech/blueprints' },
      { label: 'Technology Exchange', href: '/tech/exchanges' },
      { label: '3GPP Work Items', href: '/tech/3gpp-work-items' },
      { label: 'Glossary', href: '/tech/glossary' },
    ],
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
  // the Standardisation bar. A new per-topic Standards page needs its
  // path added here as well as to techTopics.js.
  {
    prefixes: [
      '/standards/5g-broadcast',
      '/standards/5g-broadcast-standards-evolution',
      '/standards/5g-mbs',
      '/standards/5g-mbs-standards-evolution',
      '/standards/5gms',
      '/standards/6g',
      '/standards/ai-ml',
      '/standards/avatar',
      '/standards/beyond-2d',
      '/standards/data-collection',
      '/standards/dvb-i',
      '/standards/emergency-alerts',
      '/standards/multimedia',
      '/standards/network-apis',
      '/standards/npn',
      '/standards/ntn',
      '/standards/rtc',
      '/standards/tsc',
      '/standards/v3c',
      '/standards/xr',
    ],
    title: 'Technology',
    titleHref: '/tech',
    subtitle: 'Specification profiles and implementation guidance — by the members, for the industry.',
    items: [
      { label: 'Implementation Blueprints', href: '/tech/blueprints' },
      { label: 'Technology Exchange', href: '/tech/exchanges' },
      { label: '3GPP Work Items', href: '/tech/3gpp-work-items' },
      { label: 'Glossary', href: '/tech/glossary' },
    ],
  },
  // /standards itself and its three contributor pages: 5G-MAG as a participant
  // in the standards process, which is a different thing from the per-topic
  // specification pages above.
  {
    prefixes: ['/standards', '/surveys'],
    title: 'Standardisation',
    titleHref: '/standards',
    subtitle: 'Shaping standards through concrete requirements and experienced-based feedback — submitted to SDOs.',
    items: [
      { label: 'Requirements towards SDOs', href: '/standards/requirements' },
      { label: 'Industry Surveys', href: '/surveys' },
      { label: 'Feedback to SDOs', href: '/standards#feedback' },
      { label: 'Liaison Statements & Inputs', href: '/standards/ls' },
      { label: 'Workshops for Standards', href: '/standards#standards-workshops' },
    ],
  },
  {
    prefixes: ['/action'],
    title: 'In Action',
    titleHref: '/action',
    subtitle: 'From specifications to code, and from code to deployments and products.',
    // Demos is the activity layer (plugfests, demos, trials) — it does not
    // own or gatekeep Testbeds or Reference Tools, so beyond its own
    // plugfest write-ups it has no sub-items pointing back at those.
    items: [
      { label: '5G Broadcast PlugFest 2026', href: '/action/5g-broadcast-plugfest' },
      { label: 'Demonstrators', href: '/action#demonstrators' },
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
      { label: 'Workshop Archive', href: '/workshops' },
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
    items: [{ label: 'Podcast', href: '/podcast' }],
  },
  {
    prefixes: ['/podcast'],
    title: 'Podcast',
    titleHref: '/podcast',
    items: [{ label: 'News', href: '/news' }],
  },
];
