// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
import { SOCIAL_LINKS } from './src/data/socialLinks.js';

// Docusaurus footer columns only render plain text links; this builds an
// icon+label link via the `html` escape hatch (column items support
// `html` as an alternative to `label`+`href`), so the "Follow Us" column
// can show a brand icon next to each name instead of plain text. Icon/href
// data comes from src/data/socialLinks.js, the single source of truth also
// consumed by src/theme/socialIcons.js on the React side.
function socialFooterItem(label, href, svgInner) {
  return {
    html: `<a class="footer__link-item" href="${href}" target="_blank" rel="noreferrer" style="display:flex;align-items:center;gap:0.45rem;">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;">${svgInner}</svg>
      <span>${label}</span>
    </a>`,
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '5G-MAG - The Media Connectivity Association',
  tagline: 'Developer documentation, specification analysis and standards work',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  // Cutover (2026-07-28): www.5g-mag.com replaces the Wix-hosted site and
  // becomes this repo's own GitHub Pages custom domain, ending the interim
  // hub.5g-mag.com/Website/ subpath arrangement (hub.5g-mag.com itself is
  // being eliminated, not redirected). This config change alone does
  // nothing live -- it only takes effect once (1) 5G-MAG/Website's GitHub
  // repo Settings -> Pages -> Custom domain is set to www.5g-mag.com, and
  // (2) Gandi's DNS has a CNAME record for `www` pointing at
  // 5g-mag.github.io, replacing whatever currently resolves it to Wix. Both
  // of those are external, manual steps outside this repo.
  url: 'https://www.5g-mag.com',
  baseUrl: '/',
  organizationName: '5G-MAG',
  projectName: 'Website',

  onBrokenLinks: 'throw',
  // Custom JSX pages (src/pages/**) render some anchors (e.g. #categories-topics,
  // and video-card ids on /tech/videos) at runtime; Docusaurus's static link
  // checker only sees MDX-authored headings, so it always flags these as
  // broken even though they resolve correctly in the browser. Left at 'warn'
  // so real anchor regressions still show up in build output without failing CI.
  onBrokenAnchors: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownImages: 'throw',
    },
  },

  plugins: [
    // Old -> new path prefixes from the 2026-07-18 domain consolidation
    // (most of docs-developer moved to root-level paths in docs/home; the
    // docs-developer plugin instance itself was later retired entirely,
    // its last 3 docs folded into docs/home with slug overrides — see
    // sidebars-home.js). Source folders themselves were later tidied from
    // flat docs-home/docs-tech into docs/home + docs/tech (2026-07-19) —
    // routeBasePath values are unchanged, so no URL was affected.
    // Ordered longest/most-specific prefix first, since a path is matched
    // against the FIRST prefix it starts with.
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Static, non-parametric redirects that don't fit the prefix/suffix
        // pattern createRedirects below relies on (e.g. /developer has many
        // children of its own, so a broad ['/developer', '/community']
        // PREFIX_MAP entry would wrongly also redirect /community/<anything>
        // to /developer/<anything> for every unrelated child page).
        // /community itself is no longer a redirect source (2026-07-23): it's
        // the real, consolidated community page's own path now — see the
        // '/community' PREFIX_MAP entry below for its own alias history.
        redirects: [],
        createRedirects(existingPath) {
          const PREFIX_MAP = [
            // Public Call: the /community version (join/calendar) and the
            // /tech version (recordings) first merged into one page under
            // /events (2026-07-23), then moved again to root (2026-07-24)
            // once "Dev Public Call" was treated as one of the site's 4
            // "In Action" video categories rather than an Events sub-page.
            [
              '/public-call',
              [
                '/community/public-call',
                '/developer/public-call',
                '/tech/public-call',
                '/events/public-call',
              ],
            ],
            // Workshops: moved from under /standards (2026-07-24) for the
            // same "In Action" category reason as Public Call above.
            ['/workshops', '/standards/workshops'],
            // OSCAR/OSMART: moved to root (2026-07-28) for consistency with
            // every other standalone event page (MWC, IBC, FMT, Public Call,
            // Workshops) -- all directly-accessible top-level URLs rather
            // than nested under /events, even though they're still linked
            // from there.
            ['/oscar', '/events/oscar'],
            ['/osmart', '/events/osmart'],
            // Technology Exchange: renamed from /tech/videos (2026-07-24) to
            // match the "Technology Exchanges" naming used for this category
            // elsewhere (the /tech hub widget, Developer Exchanges, etc.).
            ['/tech/exchanges', '/tech/videos'],
            ['/license', '/developer/license'],
            // How-to-use, Guidelines for Contributors, Releases, Pull
            // Requests, Community Stats, Roadmap and Top Contributors
            // (formerly 7 separate /developer/* pages, each with its own
            // history of prior aliases going back to /community/* and
            // /dashboard/* from earlier reorgs) were consolidated into one
            // page (2026-07-23), removing the need for the "Community" nav
            // item's dropdown. That page first lived at /developer/community,
            // then moved again to /community (2026-07-23, same day) once it
            // became clear "Community" deserved a top-level path rather than
            // living under Software Accelerator. Every prior alias for any
            // of the 7 original pages, their own now-retired direct slugs,
            // and /developer/community itself all redirect straight to
            // /community.
            //
            // The 3 entries below (each with an empty alias list) exist only
            // to shadow the broad '/community' rule further down for these
            // specific real sub-pages -- without them, the matcher's suffix
            // logic (`existingPath.startsWith(newPrefix + '/')`) appends
            // each sub-page's suffix to all 18 of '/community' aliases
            // below, generating dozens of nonsensical redirect pages like
            // /developer/roadmap/using-this-documentation (2026-07-28 audit
            // finding -- none of those 18 aliases were ever a parent of
            // these 3 pages, they were themselves leaf pages pre-consolidation).
            ['/community/contributing', []],
            ['/community/release-process', []],
            ['/community/using-this-documentation', []],
            [
              '/community',
              [
                '/developer/community',
                '/community/how-to-use',
                '/developer/how-to-use',
                '/community/guidelines-contributors',
                '/developer/guidelines-contributors',
                '/community/contributors',
                '/contributors',
                '/developer/contributors',
                '/developer/dashboard/software-releases',
                '/community/dashboard/software-releases',
                '/dashboard/software-releases',
                '/developer/releases',
                '/developer/dashboard/pull-requests',
                '/community/dashboard/pull-requests',
                '/dashboard/pull-requests',
                '/developer/pull-requests',
                '/developer/dashboard',
                '/community/dashboard',
                '/dashboard',
                '/developer/community-stats',
                '/developer/roadmap',
              ],
            ],
            // Liaison Statements, Glossary, Methodology and 3GPP Work Items
            // moved from /tech/standards/* to /standards/* (2026-07-18 hub
            // reorg). LS and Methodology stayed; Glossary and 3GPP Work
            // Items moved on again to /tech (2026-07-19) — general
            // portal-wide reference material, not Feedback/Requirements/LS,
            // so all their older aliases now redirect to /tech instead.
            ['/standards/ls', '/tech/standards/ls'],
            // The Developer Portal's own glossary (previously /developer/glossary)
            // was merged into this one (2026-07-18): near-total overlap in
            // content, and this page is the more complete and more
            // discoverable of the two.
            [
              '/tech/glossary',
              ['/standards/glossary', '/tech/standards/glossary', '/developer/glossary'],
            ],
            ['/tech/3gpp-work-items', ['/standards/3gpp-work-items', '/tech/standards/3gpp-work-items']],
            // These three /resources entries must stay ABOVE the plain
            // '/testbeds/<slug>' rules right below: the redirect matcher
            // returns on the first prefix match, and '/testbeds/6g-testbed'
            // is itself a prefix of '/testbeds/6g-testbed/resources', so a
            // broader rule listed first would shadow this more specific one.
            [
              '/testbeds/6g-testbed/resources',
              ['/testbeds/6g-testbed/repositories', '/testbeds/6g-testbed/releases'],
            ],
            [
              '/testbeds/ai-ml/resources',
              [
                '/testbeds/ai-ml/projects',
                '/testbeds/ai-ml/repositories',
                '/testbeds/ai-ml/releases',
              ],
            ],
            [
              '/testbeds/beyond-2d/resources',
              [
                '/testbeds/beyond-2d/projects',
                '/testbeds/beyond-2d/repositories',
                '/testbeds/beyond-2d/releases',
              ],
            ],
            ['/testbeds/6g-testbed', '/developer/6g-testbed'],
            ['/testbeds/ai-ml', '/developer/ai-ml'],
            ['/testbeds/beyond-2d', '/developer/beyond-2d'],
            // 2026-07-19: each reference-tools/testbeds project's Project
            // Roadmap, GitHub Repos, Packages and Releases pages merged into
            // one Resources page, to cut down the per-project page count
            // (piloted on 5GMS first, then rolled out everywhere else that
            // had the same page set). 3gpp-platforms (repositories.mdx) and
            // common-tools (releases.mdx) got the same Resources
            // consolidation later, once the reference-tools structure was
            // made coherent across all projects (2026-07-22).
            [
              '/reference-tools/3gpp-platforms/resources',
              ['/reference-tools/3gpp-platforms/repositories'],
            ],
            [
              '/reference-tools/common-tools/resources',
              ['/reference-tools/common-tools/releases'],
            ],
            [
              '/reference-tools/5gms/resources',
              [
                '/reference-tools/5gms/projects',
                '/reference-tools/5gms/repositories',
                '/reference-tools/5gms/packages',
                '/reference-tools/5gms/releases',
              ],
            ],
            [
              '/reference-tools/5g-broadcast/resources',
              [
                '/reference-tools/5g-broadcast/projects',
                '/reference-tools/5g-broadcast/repositories',
                '/reference-tools/5g-broadcast/releases',
              ],
            ],
            [
              '/reference-tools/5g-core/resources',
              [
                '/reference-tools/5g-core/projects',
                '/reference-tools/5g-core/repositories',
                '/reference-tools/5g-core/releases',
              ],
            ],
            [
              '/reference-tools/5g-mbs/resources',
              [
                '/reference-tools/5g-mbs/projects',
                '/reference-tools/5g-mbs/repositories',
                '/reference-tools/5g-mbs/packages',
                '/reference-tools/5g-mbs/releases',
              ],
            ],
            [
              '/reference-tools/avatar/resources',
              ['/reference-tools/avatar/repositories', '/reference-tools/avatar/releases'],
            ],
            [
              '/reference-tools/data-collection/resources',
              [
                '/reference-tools/data-collection/projects',
                '/reference-tools/data-collection/repositories',
                '/reference-tools/data-collection/packages',
                '/reference-tools/data-collection/releases',
              ],
            ],
            [
              '/reference-tools/dvb-i/resources',
              [
                '/reference-tools/dvb-i/projects',
                '/reference-tools/dvb-i/repositories',
                '/reference-tools/dvb-i/releases',
              ],
            ],
            [
              '/reference-tools/emergency-alerts/resources',
              [
                '/reference-tools/emergency-alerts/projects',
                '/reference-tools/emergency-alerts/repositories',
                '/reference-tools/emergency-alerts/releases',
              ],
            ],
            [
              '/reference-tools/multimedia/resources',
              [
                '/reference-tools/multimedia/projects',
                '/reference-tools/multimedia/repositories',
                '/reference-tools/multimedia/releases',
              ],
            ],
            [
              '/reference-tools/network-apis/resources',
              ['/reference-tools/network-apis/repositories', '/reference-tools/network-apis/releases'],
            ],
            [
              '/reference-tools/v3c/resources',
              [
                '/reference-tools/v3c/projects',
                '/reference-tools/v3c/repositories',
                '/reference-tools/v3c/releases',
              ],
            ],
            [
              '/reference-tools/xr/resources',
              [
                '/reference-tools/xr/projects',
                '/reference-tools/xr/repositories',
                '/reference-tools/xr/releases',
              ],
            ],
            ['/reference-tools/3gpp-platforms', '/developer/3gpp-platforms'],
            ['/reference-tools/5g-broadcast', '/developer/5g-broadcast'],
            ['/reference-tools/5g-core', '/developer/5g-core'],
            ['/reference-tools/5g-mbs', '/developer/5g-mbs'],
            ['/reference-tools/5gms', '/developer/5gms'],
            ['/reference-tools/avatar', '/developer/avatar'],
            ['/reference-tools/common-tools', '/developer/common-tools'],
            ['/reference-tools/data-collection', '/developer/data-collection'],
            ['/reference-tools/dvb-i', '/developer/dvb-i'],
            ['/reference-tools/emergency-alerts', '/developer/emergency-alerts'],
            ['/reference-tools/multimedia', '/developer/multimedia'],
            ['/reference-tools/network-apis', '/developer/network-apis'],
            ['/reference-tools/v3c', '/developer/v3c'],
            ['/reference-tools/xr', '/developer/xr'],
            ['/reference-tools', '/developer/projects'],
            // Squashed-together slugs (no hyphen) renamed to match the
            // hyphenated convention used everywhere else on the site.
            // Placed ahead of the broad '/applications' rule below, since
            // that rule would otherwise match first and shadow these.
            ['/applications/5g-broadcast', '/applications/5gbroadcast'],
            ['/applications/multicast-broadcast', '/applications/multicastbroadcast'],
            ['/applications/network-apis', '/applications/networkapis'],
            // 2026-07-22: multicast-broadcast.md and xr.md were retired as
            // separate Applications pages; their content now lives on
            // streaming.md and volumetric.md respectively. Must stay ABOVE
            // the broad '/applications' rule below for the same reason as
            // the squashed-slug entries above it: that rule would otherwise
            // match '/applications/streaming' and '/applications/volumetric'
            // first and shadow these more specific ones.
            ['/applications/streaming', '/applications/multicast-broadcast'],
            ['/applications/volumetric', '/applications/xr'],
            ['/tech/volumetric/beyond-2d', '/tech/volumetric/beyond2d'],
            ['/applications', '/developer/applications'],
            ['/testbeds', '/developer/testbeds'],
            // Interop & Demos: path reverted from /demos back to /testing
            // (2026-07-25) -- the visible "Interop & Demos" label is unchanged,
            // only the URL moved back. See the 2026-07-24 note this replaces:
            // that earlier move went /testing -> /demos.
            ['/testing', '/demos'],
            ['/contact', '/about/contact'],
            ['/partnerships', '/about/partnerships'],
            ['/structure', '/about/structure'],
            // 3gpp-issue-tracking was a flat sibling of feedback.md under
            // docs-tech/standards/, NOT nested under it — so this needs its
            // own exact entry rather than falling through to the /standards
            // prefix rule below (which would wrongly append it as a child
            // of /tech/standards/feedback instead of a sibling).
            ['/standards/3gpp-issue-tracking', '/tech/standards/3gpp-issue-tracking'],
            // Shadows the broad '/standards' rule below for this specific
            // sub-page, same reasoning as the /community entries above --
            // without it, '/standards/methodology/requirements' and
            // '/tech/standards/feedback/requirements' get generated (2026-07-28
            // audit finding); Requirements and Methodology/Feedback were
            // always sibling pages, never nested.
            ['/standards/requirements', []],
            // Methodology (previously its own page at /standards/methodology,
            // itself moved from /tech/standards/methodology in the 2026-07-18
            // hub reorg) merged into the main /standards page's Feedback
            // section (2026-07-28) -- both its own former URL and its older
            // /tech/standards alias now redirect straight to the hub page.
            [
              '/standards',
              ['/tech/standards/feedback', '/standards/methodology', '/tech/standards/methodology'],
            ],
          ];
          for (const [newPrefix, oldPrefix] of PREFIX_MAP) {
            if (existingPath === newPrefix || existingPath.startsWith(`${newPrefix}/`)) {
              const suffix = existingPath.slice(newPrefix.length);
              const oldPrefixes = Array.isArray(oldPrefix) ? oldPrefix : [oldPrefix];
              return oldPrefixes.map((p) => p + suffix);
            }
          }
          return undefined;
        },
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        // A second, separate blog instance from the main News feed
        // (preset-classic's `blog` below, at /news) -- this one is
        // specifically for events 5G-MAG is invited to attend or speak at
        // (conferences, workshops, webinars, Dev Public Calls), as opposed
        // to News, which is reserved for 5G-MAG's own releases/press. Posts
        // here never appear in /news; they're surfaced via the Agenda
        // section on /events instead.
        id: 'events',
        path: 'events-blog',
        routeBasePath: 'events/agenda',
        blogTitle: 'Events Agenda',
        blogDescription: 'Events where 5G-MAG participates, presents or is invited to attend.',
        blogSidebarTitle: 'Agenda',
        postsPerPage: 20,
        showReadingTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tech',
        path: 'docs/tech',
        routeBasePath: 'tech',
        sidebarPath: './sidebars-tech.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        // Organizational pages (About, Membership, ...) that sit alongside the
        // homepage rather than under /developer or /tech — served directly
        // off the site root (routeBasePath '') so /about and /membership
        // don't get an extra path segment prefixed.
        id: 'home',
        path: 'docs/home',
        routeBasePath: '',
        sidebarPath: './sidebars-home.js',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          path: 'blog',
          routeBasePath: 'news',
          blogTitle: 'News',
          blogDescription: 'Announcements and updates from 5G-MAG.',
          blogSidebarTitle: 'Recent news',
          postsPerPage: 10,
          showReadingTime: true,
        },
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: ['/developer', '/tech'],
        docsPluginIdForPreferredVersion: 'tech',
        indexBlog: false,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    // Light by default for every first-time visitor, regardless of their
    // OS/browser dark-mode preference (respectPrefersColorScheme: false)
    // -- the manual toggle in the navbar still works and is remembered
    // (localStorage) for anyone who switches to dark themselves.
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: false },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: '',
      logo: { alt: '5G-MAG Logo', src: 'assets/images/5g-mag-logo-with-text.png' },
      // The actual item lists come from src/theme/navItems.js, consumed by
      // the swizzled Navbar/Content (desktop) and
      // Navbar/MobileSidebar/PrimaryMenu (mobile) components — both are
      // route-aware (Technology and Standards / Software Accelerator
      // expand into their own sub-nav while you're inside that section).
      // This array must stay non-empty: Docusaurus's own
      // useNavbarMobileSidebar hook checks its length to decide whether
      // the mobile hamburger button renders at all, regardless of what
      // the swizzled components actually show.
      items: [{ to: '/', label: '5G-MAG', position: 'left' }],
    },
    footer: {
      style: 'dark',
      // Redefined 2026-07-26 via an interactive pick-and-arrange pass (the
      // user ticked/assigned every item themselves, column by column) --
      // this is no longer a 1:1 mirror of the navbar's own item order like
      // the previous version was. Notably: Membership stays in "About Us"
      // but Events and News moved to "Follow Us" instead; a new "In Action"
      // column was added for the video-hub destinations; GitHub Tech and
      // GitHub Getting-Started were deliberately dropped (not an oversight).
      links: [
        {
          title: 'About Us',
          items: [
            { label: 'About Us', to: '/about' },
            { label: 'Structure', to: '/structure' },
            { label: 'Partnerships', to: '/partnerships' },
            { label: 'Contact', to: '/contact' },
            { label: 'Membership', to: '/membership' },
          ],
        },
        {
          title: 'Explainers & Profiles',
          items: [
            { label: 'Overview', to: '/tech' },
            { label: 'Categories & Topics', to: '/tech/#categories-topics' },
            { label: 'Technology Exchanges', to: '/tech/exchanges' },
          ],
        },
        {
          title: 'Feedback & Requirements',
          items: [
            { label: 'Overview', to: '/standards' },
            { label: 'Requirements towards SDOs', to: '/standards/requirements' },
            { label: 'Liaison Statements & Inputs', to: '/standards/ls' },
            { label: 'GitHub Standards', href: 'https://github.com/5G-MAG/Standards' },
          ],
        },
        {
          // Name matches the navbar item, the hub page's own SectionNav
          // title, and src/theme/navItems.js — kept in sync deliberately
          // rather than the previous "Developer Portal" (still used as a
          // descriptive term in body prose, but not the section's own name).
          title: 'Software Accelerator',
          items: [
            { label: 'Overview', to: '/developer' },
            { label: 'Reference Tools', to: '/reference-tools' },
            { label: 'Applications', to: '/applications' },
            { label: 'Testbeds', to: '/testbeds' },
            { label: 'Developer Exchanges', to: '/developer/exchanges' },
            { label: 'Early Access', to: '/early-access' },
            { label: 'Community', to: '/community' },
            { label: 'Open-Source Licenses', to: '/license' },
          ],
        },
        {
          title: 'Interop & Demos',
          items: [{ label: 'Overview', to: '/testing' }],
        },
        {
          title: 'Our Work In Action',
          items: [
            { label: 'All Videos', to: '/videos' },
            { label: 'Workshops', to: '/workshops' },
            { label: 'Developer Exchanges', to: '/developer/exchanges' },
            { label: 'Dev Public Call', to: '/public-call' },
            { label: 'Technology Exchange', to: '/tech/exchanges' },
          ],
        },
        {
          title: 'Follow Us',
          items: [
            { label: 'Events', to: '/events' },
            { label: 'News', to: '/news' },
            { label: 'Subscribe for Updates', to: '/subscribe' },
            ...SOCIAL_LINKS.map((s) => socialFooterItem(s.label, s.href, s.svgPath)),
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 5G-MAG - The Media Connectivity Association`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  },
};

export default config;
