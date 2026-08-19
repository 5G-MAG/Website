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
    mermaid: true,
    hooks: {
      onBrokenMarkdownImages: 'throw',
    },
  },

  // Mermaid is used only for the diagram kinds a purpose-built component does
  // not express well: call flows (sequence diagrams) and data models. The
  // architecture diagrams use src/components/ArchitectureMap instead, which is
  // data-driven and can carry the implementing repository per entity.
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    // Redirect map cut down (2026-07-29): the large PREFIX_MAP this plugin
    // used to carry only protected against bookmarks/search-engine links to
    // this Docusaurus site's OWN old internal paths from its pre-launch
    // reorgs. That protection stopped mattering once www.5g-mag.com went
    // live (2026-07-28): the domain never served any of those old paths --
    // it was 100% Wix until the cutover -- and hub.5g-mag.com, the only
    // domain where old paths were ever briefly reachable, is being
    // eliminated rather than kept as a redirect source. So none of those
    // entries could ever fire from real traffic hitting this domain. Left
    // registered with an empty redirect list so it's ready the next time a
    // live, publicly-linked page on www.5g-mag.com actually moves.
    //
    // First real use of that (2026-08-11): the 18 per-project Standards
    // pages moved from /tech/standards/<project> to /standards/<project>.
    // Unlike the pre-launch reorgs above, these paths WERE live on
    // www.5g-mag.com since the 2026-07-28 cutover, so external
    // links/bookmarks/search-engine indexing may point at the old path.
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/tech/standards/5g-broadcast', to: '/standards/5g-broadcast' },
          { from: '/tech/standards/5g-broadcast-standards-evolution', to: '/standards/5g-broadcast-standards-evolution' },
          { from: '/tech/standards/5g-mbs', to: '/standards/5g-mbs' },
          { from: '/tech/standards/5gms', to: '/standards/5gms' },
          { from: '/tech/standards/6g', to: '/standards/6g' },
          { from: '/tech/standards/ai-ml', to: '/standards/ai-ml' },
          { from: '/tech/standards/avatar', to: '/standards/avatar' },
          { from: '/tech/standards/beyond-2d', to: '/standards/beyond-2d' },
          { from: '/tech/standards/data-collection', to: '/standards/data-collection' },
          { from: '/tech/standards/dvb-i', to: '/standards/dvb-i' },
          { from: '/tech/standards/multimedia', to: '/standards/multimedia' },
          { from: '/tech/standards/network-apis', to: '/standards/network-apis' },
          { from: '/tech/standards/npn', to: '/standards/npn' },
          { from: '/tech/standards/ntn', to: '/standards/ntn' },
          { from: '/tech/standards/rtc', to: '/standards/rtc' },
          { from: '/tech/standards/tsc', to: '/standards/tsc' },
          { from: '/tech/standards/v3c', to: '/standards/v3c' },
          { from: '/tech/standards/xr', to: '/standards/xr' },
          // These two DID go briefly live on www.5g-mag.com (merged to main
          // as part of the same push that first synced private -> public,
          // then removed again days later once their duplication with the
          // project's existing Standards/Scope pages was caught) -- redirect
          // to wherever their content actually ended up.
          { from: '/reference-tools/multimedia/rt-libflute-standards', to: '/standards/multimedia' },
          { from: '/reference-tools/multimedia/rt-libflute-implementation', to: '/reference-tools/multimedia/scope' },
        ],
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
            { label: 'Privacy Notice', to: '/privacy' },
          ],
        },
        {
          title: 'Explainers & Profiles',
          items: [
            { label: 'Overview', to: '/tech' },
            { label: 'Categories & Topics', to: '/tech#categories-topics' },
            { label: 'Technology Exchange', to: '/tech/exchanges' },
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
            { label: 'Podcast', to: '/podcast' },
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
