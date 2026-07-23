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
    prefixes: ['/about', '/contact', '/partnerships', '/structure'],
    title: 'About Us',
    titleHref: '/about',
    items: [
      { label: 'Structure', href: '/structure' },
      { label: 'Partnerships', href: '/partnerships' },
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
    ],
    title: 'Software Accelerator',
    titleHref: '/developer',
    items: [
      { label: 'Reference Tools', href: '/reference-tools' },
      { label: 'Applications', href: '/applications' },
      { label: 'Testbeds', href: '/testbeds' },
      { label: 'Early Access', href: '/early-access' },
      { label: 'Community', href: '/community' },
      { label: 'License', href: '/developer/license' },
    ],
  },
  {
    prefixes: ['/tech'],
    title: 'Explainers & Profiles',
    titleHref: '/tech',
    items: [
      { label: 'On Air Video Gallery', href: '/tech/videos' },
      { label: 'Glossary', href: '/tech/glossary' },
      { label: 'Requirements', href: '/standards/requirements' },
      { label: 'Feedback', href: '/standards' },
    ],
  },
  {
    prefixes: ['/standards'],
    title: 'Feedback & Requirements',
    titleHref: '/standards',
    items: [
      { label: 'Methodology', href: '/standards/methodology' },
      { label: 'Liaison Statements & Inputs', href: '/standards/ls' },
      { label: 'Workshops supporting Standardization', href: '/standards/workshops' },
      { label: 'Requirements & Workshop Inputs', href: '/standards/requirements' },
      { label: 'Meetings with 3GPP SA4', href: '/standards/3gpp-issue-tracking' },
    ],
  },
  {
    prefixes: ['/testing'],
    title: 'Interop & Testing',
    titleHref: '/testing',
    // Testing is the activity layer (plugfests, demos, trials) — it does not
    // own or gatekeep Testbeds or Reference Tools, so beyond its own
    // plugfest write-ups it has no sub-items pointing back at those.
    items: [
      { label: '5G Broadcast PlugFest 2026', href: '/testing/5g-broadcast-plugfest' },
      { label: 'Demonstrators', href: '/testing#demos' },
    ],
  },
  {
    prefixes: ['/events'],
    title: 'Events',
    titleHref: '/events',
    items: [
      { label: 'Dev Public Call', href: '/events/public-call' },
      { label: 'MWC', href: '/mwc' },
      { label: 'IBC', href: '/ibc' },
      { label: 'FMT', href: '/fmt' },
      { label: 'Workshops', href: '/events#workshops' },
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
