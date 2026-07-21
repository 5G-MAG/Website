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
    items: [{ label: 'Request information', href: '/membership#request-membership' }],
  },
  {
    prefixes: ['/developer'],
    title: 'Software Accelerator',
    titleHref: '/developer',
    items: [
      { label: 'Reference Tools', href: '/reference-tools' },
      { label: 'Applications', href: '/applications' },
      { label: 'Testbeds', href: '/testbeds' },
      { label: 'Early Access', href: '/early-access' },
      { label: 'Community', href: '/developer#community' },
      { label: 'How to Contribute', href: '/developer/how-to-use' },
      { label: 'Guidelines for Contributors', href: '/developer/guidelines-contributors' },
      { label: 'Releases', href: '/developer/releases' },
      { label: 'Pull Requests', href: '/developer/pull-requests' },
      { label: 'Community Stats', href: '/developer/community-stats' },
      { label: 'Roadmap', href: '/developer/roadmap' },
      { label: 'Top Contributors', href: '/developer/contributors' },
      { label: 'License', href: '/developer/license' },
    ],
  },
  {
    prefixes: ['/tech'],
    title: 'Explainers & Profiles',
    titleHref: '/tech',
    items: [
      { label: 'Videos', href: '/tech/videos' },
      { label: 'External Videos', href: '/tech/videos-external' },
      { label: 'Glossary', href: '/tech/glossary' },
      { label: '3GPP Work Items per Release', href: '/tech/3gpp-work-items' },
    ],
  },
  {
    prefixes: ['/standards'],
    title: 'Feedback & Requirements',
    titleHref: '/standards',
    items: [
      { label: 'Meetings with 3GPP SA4', href: '/standards/3gpp-issue-tracking' },
      { label: 'Methodology', href: '/standards/methodology' },
      { label: 'Liaison Statements & Inputs', href: '/standards/ls' },
    ],
  },
  {
    prefixes: ['/applications'],
    title: 'Applications',
    titleHref: '/applications',
    items: [
      { label: 'Reference Tools', href: '/reference-tools' },
      { label: 'Testbeds', href: '/testbeds' },
      { label: 'Community', href: '/developer#community' },
    ],
  },
  {
    prefixes: ['/reference-tools'],
    title: 'Reference Tools',
    titleHref: '/reference-tools',
    items: [
      { label: 'Testbeds', href: '/testbeds' },
      { label: 'Applications', href: '/applications' },
      { label: 'Community', href: '/developer#community' },
    ],
  },
  {
    prefixes: ['/testbeds'],
    title: 'Testbeds',
    titleHref: '/testbeds',
    items: [
      { label: 'Reference Tools', href: '/reference-tools' },
      { label: 'Applications', href: '/applications' },
      { label: 'Community', href: '/developer#community' },
    ],
  },
  {
    prefixes: ['/testing'],
    title: 'Interop & Testing',
    titleHref: '/testing',
    items: [{ label: 'Testbeds & Evaluation Tools', href: '/testbeds' }],
  },
  {
    prefixes: ['/events'],
    title: 'Events',
    titleHref: '/events',
    items: [{ label: "Friday's Public Call", href: '/events/public-call' }],
  },
  {
    prefixes: ['/news'],
    title: 'News',
    titleHref: '/news',
    items: [],
  },
];
