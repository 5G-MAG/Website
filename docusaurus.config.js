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

  // Decision (2026-07-18): consolidate onto the main www.5g-mag.com domain
  // long-term. tech.5g-mag.com and getting-started.5g-mag.com are to be
  // retired; developer.5g-mag.com is the only subdomain to remain,
  // redirecting to /developer. NONE of that domain/DNS work can happen
  // from this repo or this config value alone — it requires whoever
  // manages 5G-MAG's DNS and GitHub Pages custom-domain setting to: (1)
  // point www.5g-mag.com at this site's hosting, (2) decommission or
  // redirect the old subdomains, and (3) set up developer.5g-mag.com as a
  // redirect to www.5g-mag.com/developer (GitHub Pages serves one custom
  // domain per site with no server-side per-subdomain redirect support,
  // so that last step likely needs a small separate redirect mechanism —
  // e.g. a DNS/CDN-level redirect rule, or a minimal static page at that
  // domain — rather than anything Docusaurus itself can do).
  //
  // INTERIM (2026-07-23): serving this build under hub.5g-mag.com for
  // testing before the www cutover above. hub.5g-mag.com is still claimed
  // as another repo's custom domain at the account/org level, so this
  // repo is currently only reachable as a project-page subpath underneath
  // it (https://hub.5g-mag.com/Website/), not as its own root site —
  // baseUrl is set to match that reality (confirmed via Docusaurus's own
  // baseUrl-mismatch warning banner when it was still '/'). Once
  // hub.5g-mag.com (or www.5g-mag.com, for the real cutover) is released
  // and assigned as THIS repo's own custom domain, switch baseUrl back to
  // '/' and re-add a static/CNAME file with the target domain (removed
  // for now — a CNAME file claiming a root domain that's actively serving
  // this build under a subpath is a contradiction that would only cause
  // confusion if the domain conflict resolves unexpectedly).
  url: 'https://hub.5g-mag.com',
  baseUrl: '/Website/',
  organizationName: '5G-MAG',
  projectName: 'Website',

  onBrokenLinks: 'throw',
  // Custom JSX pages (src/pages/**) render some anchors (e.g. #capability-areas,
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
        redirects: [
          // /community was its own thin standalone page (Slack/Google
          // Group/GitHub links, all already offered by /developer's own
          // "Join the Community" section) — retired 2026-07-18 in favor
          // of that section, linked via the #community anchor.
          { to: '/developer', from: ['/community', '/developer/community'] },
        ],
        createRedirects(existingPath) {
          const PREFIX_MAP = [
            // Public Call: the /community version (join/calendar) and the
            // /tech version (recordings) merged into one page under /events.
            [
              '/events/public-call',
              ['/community/public-call', '/developer/public-call', '/tech/public-call'],
            ],
            // How-to-use, guidelines, Contributors and License moved BACK
            // from /community (and /license) to /developer (2026-07-18 hub
            // reorg) — each of these had already been at this same
            // /developer/* path once before (the very first,
            // pre-domain-consolidation location), so all prior aliases
            // redirect straight to it again.
            ['/developer/how-to-use', '/community/how-to-use'],
            ['/developer/guidelines-contributors', '/community/guidelines-contributors'],
            ['/developer/contributors', ['/community/contributors', '/contributors']],
            ['/developer/license', '/license'],
            // The old docs-based "Activity Dashboard" pages were placeholder
            // tables with no automation ever behind them (confirmed: no
            // script populated them, and Pull Requests had no data source
            // at all). Retired 2026-07-18 in favor of real synced pages —
            // /developer/releases and /developer/contributors already
            // existed; Pull Requests, Community Stats and Roadmap were
            // newly built, backed by fetch scripts ported from the
            // corresponding (working) automation in the old
            // 5G-MAG/Getting-Started and 5G-MAG/Tech repos.
            [
              '/developer/releases',
              [
                '/developer/dashboard/software-releases',
                '/community/dashboard/software-releases',
                '/dashboard/software-releases',
              ],
            ],
            [
              '/developer/pull-requests',
              [
                '/developer/dashboard/pull-requests',
                '/community/dashboard/pull-requests',
                '/dashboard/pull-requests',
              ],
            ],
            [
              '/developer/community-stats',
              ['/developer/dashboard', '/community/dashboard', '/dashboard'],
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
            ['/standards/methodology', '/tech/standards/methodology'],
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
            // had the same page set). external-tools was left alone -- it
            // never had this Roadmap/Packages/Releases spread to begin
            // with. 3gpp-platforms (repositories.mdx) and common-tools
            // (releases.mdx) got the same Resources consolidation later,
            // once the reference-tools structure was made coherent across
            // all 15 projects (2026-07-22).
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
            ['/reference-tools/external-tools', '/developer/external-tools'],
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
            ['/contact', '/about/contact'],
            ['/partnerships', '/about/partnerships'],
            ['/structure', '/about/structure'],
            // 3gpp-issue-tracking was a flat sibling of feedback.md under
            // docs-tech/standards/, NOT nested under it — so this needs its
            // own exact entry rather than falling through to the /standards
            // prefix rule below (which would wrongly append it as a child
            // of /tech/standards/feedback instead of a sibling).
            ['/standards/3gpp-issue-tracking', '/tech/standards/3gpp-issue-tracking'],
            ['/standards', '/tech/standards/feedback'],
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
      // Column order mirrors the main navbar's item order (see
      // src/theme/navItems.js: About Us, Membership, Explainers & Profiles,
      // Feedback & Requirements, Software Accelerator, Interop & Testing,
      // Events, News) -- the "About Us" column bundles Membership/Events/News
      // in with it (own sub-items already follow that same relative order),
      // since those don't get their own footer column; "Follow Us" has no
      // navbar equivalent so it stays last.
      links: [
        {
          title: 'About Us',
          items: [
            { label: 'About Us', to: '/about' },
            { label: 'Membership', to: '/membership' },
            { label: 'Events', to: '/events' },
            { label: 'News', to: '/news' },
          ],
        },
        {
          title: 'Explainers & Profiles',
          items: [
            { label: 'Capability Areas', to: '/tech/#capability-areas' },
            { label: 'GitHub Tech', href: 'https://github.com/5G-MAG/Tech' },
          ],
        },
        {
          title: 'Feedback & Requirements',
          items: [
            { label: 'Overview', to: '/standards' },
            { label: 'Liaison Statements', to: '/standards/ls' },
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
            { label: 'Applications', to: '/applications' },
            { label: 'Reference Tools', to: '/reference-tools' },
            { label: 'Testbeds', to: '/testbeds' },
            { label: 'Community', to: '/developer#community' },
            { label: 'Open-Source Licenses', to: '/developer/license' },
            { label: 'GitHub Getting-Started', href: 'https://github.com/5G-MAG/Getting-Started' },
          ],
        },
        {
          title: 'Interop & Testing',
          items: [{ label: 'Overview', to: '/testing' }],
        },
        {
          title: 'Follow Us',
          items: [
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
