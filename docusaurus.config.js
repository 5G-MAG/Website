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
  tagline: 'We bridge standards and deployments. We transform specifications into open-source software to boost deployability.',
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

  clientModules: [require.resolve('./src/clientModules/openDetailsOnHash.js')],

  plugins: [
    // One Deploy page per project, /deploy/<slug>, where <slug> is the last segment of the project's Reference
    // Tools or testbed page (projectSlugOf in src/data/baskets.js). Placeholders until assets are published.
    function projectDeployPages(context) {
      return {
        name: 'project-deploy-pages',
        async contentLoaded({ actions }) {
          const fs = await import('node:fs');
          const path = await import('node:path');
          const taxonomy = JSON.parse(fs.readFileSync(path.join(context.siteDir, 'src/data/taxonomy.json'), 'utf8'));
          for (const p of taxonomy.projects) {
            if (!p.doc_url || p.auxiliary) continue;
            const slug = p.doc_url.replace(/\/$/, '').split('/').pop();
            actions.addRoute({
              path: `/deploy/${slug}`,
              component: '@site/src/components/ProjectDeploy/index.jsx',
              exact: true,
              props: { slug },
            });
          }
        },
      };
    },
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
    // First real use of that (2026-08-11): the 20 per-project Standards
    // pages moved from /tech/standards/<project> to /standards/<project>.
    // Unlike the pre-launch reorgs above, these paths WERE live on
    // www.5g-mag.com since the 2026-07-28 cutover, so external
    // links/bookmarks/search-engine indexing may point at the old path.
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/tech/standards/5g-broadcast', to: '/standards/5g-broadcast' },
          { from: '/tech/standards/5g-broadcast-standards-evolution', to: '/standards/5g-broadcast/evolution' },
          { from: '/tech/standards/5g-mbs', to: '/standards/5g-mbs' },
          { from: '/tech/standards/5g-mbs-standards-evolution', to: '/standards/5g-mbs/evolution' },
          { from: '/tech/standards/5gms', to: '/standards/5gms' },
          { from: '/tech/5gms/features-5gmsd', to: '/tech/5gms/features' },
          // 5G MBS Technical Analysis rebuilt on overview / architecture / features (2026-10-03).
          { from: '/tech/5g-mbs/mbs-service-layer', to: '/tech/5g-mbs/architecture-user-services' },
          { from: '/tech/5g-mbs/mbs-service-system-aspects', to: '/tech/5g-mbs/architecture-system' },
          { from: '/tech/5g-mbs/ran-aspects', to: '/tech/5g-mbs/architecture-system' },
          // Architecture and Features split into an MBS User Services page and an MBS System page (2026-10-04)
          { from: '/tech/5g-mbs/architecture', to: '/tech/5g-mbs/architecture-user-services' },
          { from: '/tech/5g-mbs/features', to: '/tech/5g-mbs/features-user-services' },
          // MBS Multicast in RRC_INACTIVE folded into the MBS Multicast page (2026-10-04)
          { from: '/tech/5g-mbs/analysis-mbs-multicast-inactive-ran', to: '/tech/5g-mbs/analysis-mbs-multicast' },
          // MBS Multicast mobility folded into the MBS Multicast page (2026-10-05)
          { from: '/tech/5g-mbs/mobility-mbs-multicast', to: '/tech/5g-mbs/analysis-mbs-multicast' },
          { from: '/tech/standards/6g', to: '/standards/6g' },
          { from: '/tech/standards/ai-ml', to: '/standards/ai-ml' },
          { from: '/tech/standards/avatar', to: '/standards/avatar' },
          { from: '/tech/standards/beyond-2d', to: '/standards/beyond-2d' },
          { from: '/tech/standards/data-collection', to: '/standards/data-collection' },
          { from: '/tech/standards/dvb-i', to: '/standards/dvb-i' },
          { from: '/tech/standards/emergency-alerts', to: '/standards/emergency-alerts' },
          { from: '/tech/standards/multimedia', to: '/standards/content-delivery' },
          { from: '/tech/standards/network-apis', to: '/standards/network-apis' },
          { from: '/tech/standards/npn', to: '/standards/npn' },
          { from: '/tech/standards/ntn', to: '/standards/ntn' },
          { from: '/tech/standards/rtc', to: '/standards/rtc' },
          { from: '/tech/standards/tsc', to: '/standards/tsc' },
          { from: '/tech/standards/v3c', to: '/standards/v3c' },
          { from: '/tech/standards/xr', to: '/standards/xr' },
          { from: '/tech/standards/3gpp-issue-tracking', to: '/standards/3gpp-issue-tracking' },
          { from: '/tech/standards/ls', to: '/ls' },
          { from: '/standards/ls', to: '/ls' },
          { from: '/tech/standards/requirements', to: '/standards/requirements' },
          { from: '/tech/5gms/overview-5gms', to: '/tech/5gms/overview' },
          // /reference-tools/5gms/resources removed (2026-09-27): its real
          // content (Packages table) moved onto the project index, its
          // Repositories/Releases lists were redundant with sections already
          // on that same index.
          { from: '/reference-tools/5gms/resources', to: '/reference-tools/5gms' },
          // /reference-tools/5gms/scope removed (2026-09-27): the project's
          // sub-pages were consolidated down to index/tutorials/implementation;
          // all of scope's real content (deployment configurations, downlink
          // entity figure, Provisioning Session example, Docker deployment)
          // moved onto the Implementation Detail page.
          { from: '/reference-tools/5gms/scope', to: '/reference-tools/5gms/implementation' },
          // These two DID go briefly live on www.5g-mag.com (merged to main
          // as part of the same push that first synced private -> public,
          // then removed again days later once their duplication with the
          // project's existing Standards/Scope pages was caught) -- redirect
          // to wherever their content actually ended up.
          { from: '/reference-tools/multimedia/rt-libflute-standards', to: '/standards/content-delivery' },
          { from: '/reference-tools/multimedia/rt-libflute-implementation', to: '/reference-tools/content-delivery/implementation' },
          // Reference Tools template rollout (2026-09-27): every project's
          // Scope + Resources pages consolidated into one Implementation
          // Detail page, with Repositories/Releases folded onto the project
          // index -- same pattern as the 5gms pilot above. Real content
          // (deployment diagrams, feature audits, packages tables) moved,
          // not dropped; see each project's implementation.mdx.
          { from: '/reference-tools/3gpp-platforms/scope', to: '/reference-tools/3gpp-platforms/implementation' },
          { from: '/reference-tools/3gpp-platforms/resources', to: '/reference-tools/3gpp-platforms' },
          { from: '/reference-tools/5g-broadcast/scope', to: '/reference-tools/5g-broadcast/implementation' },
          { from: '/reference-tools/5g-broadcast/resources', to: '/reference-tools/5g-broadcast' },
          { from: '/reference-tools/5g-core/scope', to: '/reference-tools/5g-core/implementation' },
          { from: '/reference-tools/5g-core/resources', to: '/reference-tools/5g-core' },
          { from: '/reference-tools/5g-mbs/scope', to: '/reference-tools/5g-mbs/implementation' },
          { from: '/reference-tools/5g-mbs/resources', to: '/reference-tools/5g-mbs' },
          { from: '/reference-tools/avatar/scope', to: '/reference-tools/avatar/implementation' },
          { from: '/reference-tools/avatar/resources', to: '/reference-tools/avatar' },
          { from: '/reference-tools/content-delivery/scope', to: '/reference-tools/content-delivery/implementation' },
          { from: '/reference-tools/content-delivery/resources', to: '/reference-tools/content-delivery' },
          { from: '/reference-tools/data-collection/scope', to: '/reference-tools/data-collection/implementation' },
          { from: '/reference-tools/data-collection/resources', to: '/reference-tools/data-collection' },
          { from: '/reference-tools/ntn', to: '/tech/ntn' },
          { from: '/reference-tools/npn', to: '/tech/npn' },
          { from: '/reference-tools/tsc', to: '/tech/tsc' },
          { from: '/reference-tools/dvb-i/scope', to: '/reference-tools/dvb-i/implementation' },
          { from: '/reference-tools/dvb-i/resources', to: '/reference-tools/dvb-i' },
          { from: '/reference-tools/emergency-alerts/scope', to: '/reference-tools/emergency-alerts/implementation' },
          { from: '/reference-tools/emergency-alerts/resources', to: '/reference-tools/emergency-alerts' },
          { from: '/reference-tools/network-apis/scope', to: '/reference-tools/network-apis/implementation' },
          { from: '/reference-tools/network-apis/resources', to: '/reference-tools/network-apis' },
          { from: '/reference-tools/v3c/scope', to: '/reference-tools/v3c/implementation' },
          { from: '/reference-tools/v3c/resources', to: '/reference-tools/v3c' },
          { from: '/reference-tools/vdmc/scope', to: '/reference-tools/vdmc/implementation' },
          { from: '/reference-tools/vdmc/resources', to: '/reference-tools/vdmc' },
          { from: '/reference-tools/xr/scope', to: '/reference-tools/xr/implementation' },
          { from: '/reference-tools/xr/resources', to: '/reference-tools/xr' },
          { from: '/reference-tools/common-tools/scope', to: '/reference-tools/common-tools/implementation' },
          { from: '/reference-tools/common-tools/resources', to: '/reference-tools/common-tools' },
          // /testing renamed to /action (2026-08-24): live on www.5g-mag.com
          // since the 2026-07-28 cutover, so bookmarks/search-engine
          // indexing may still point at the old path.
          { from: '/community/developer-assets', to: '/developer-tools' },
          { from: '/developer-assets', to: '/developer-tools' },
          { from: '/reference-tools/standards2deployments', to: '/developer-tools' },
          { from: '/ai-for-media', to: '/towards-6g-media' },
          { from: '/testing', to: '/deploy' },
          { from: '/testing/5g-broadcast-plugfest', to: '/deploy/5g-broadcast-plugfest' },
          // /action ("In Action") renamed to /deploy ("Deploy") on 2026-10-05.
          { from: '/action', to: '/deploy' },
          { from: '/action/5g-broadcast-plugfest', to: '/deploy/5g-broadcast-plugfest' },
          // /applications renamed to /showcase (2026-09-23): bookmarks and
          // search-engine indexing may still point at the old path. The
          // per-category demo pages it also covered were folded into each
          // project's Application Showcase page and removed, so only the hub
          // and the unlisted authoring template still have a target.
          // /showcase ("Showcases") renamed to /tutorials ("Tutorials") on 2026-10-05.
          { from: ['/applications', '/showcase'], to: '/tutorials' },
          { from: ['/applications/streaming/sample-multi-angle-replay', '/showcase/streaming/sample-multi-angle-replay'], to: '/tutorials/streaming/sample-multi-angle-replay' },
          // "Multimedia Delivery Protocols" topic renamed to "Content Delivery
          // Protocols" (2026-09-10): the lead concept is the transport, not
          // the media type it happens to carry -- rt-libflute (FLUTE/ROUTE,
          // RFC 6726/9223) is a general object-delivery protocol, not
          // multimedia-specific. All five paths below were live on
          // www.5g-mag.com, so bookmarks/search-engine indexing may still
          // point at the old paths.
          { from: '/standards/multimedia', to: '/standards/content-delivery' },
          { from: '/tech/multimedia/multimedia-content-delivery', to: '/tech/content-delivery' },
          { from: '/reference-tools/multimedia', to: '/reference-tools/content-delivery' },
          { from: '/reference-tools/multimedia/scope', to: '/reference-tools/content-delivery/implementation' },
          { from: '/reference-tools/multimedia/resources', to: '/reference-tools/content-delivery' },
          { from: '/reference-tools/multimedia/tutorials', to: '/reference-tools/content-delivery/tutorials' },
          // Standards Evolution pages renamed from a flat "-standards-evolution"
          // suffix to a nested "/evolution" path, to match every other topic's
          // own new companion page (2026-09-28). Both were live before this
          // rename.
          { from: '/standards/5g-mbs-standards-evolution', to: '/standards/5g-mbs/evolution' },
          { from: '/standards/5g-broadcast-standards-evolution', to: '/standards/5g-broadcast/evolution' },
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
        breadcrumbs: false,
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
        breadcrumbs: false,
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

  // One themes array only: a second `themes:` key elsewhere in this object
  // would silently overwrite this one (JS object-literal semantics), which
  // is exactly how the mermaid theme was once dropped while the search
  // theme survived.
  themes: [
    // Mermaid is used only for the diagram kinds a purpose-built component
    // does not express well: call flows (sequence diagrams) and data models.
    // The architecture diagrams use src/components/ArchitectureMap instead,
    // which is data-driven and can carry the implementing repository per
    // entity.
    '@docusaurus/theme-mermaid',
    // Algolia DocSearch (2026-09-28): replaces the local lunr-based search
    // (@easyops-cn/docusaurus-search-local). That plugin had no way to
    // weight one page's match above another's -- every field was indexed
    // unboosted, so short exact-title matches beat longer, more relevant
    // pages purely on lunr's default length normalization, with no config
    // option to fix it (confirmed against its own PluginOptions type and
    // index-building source -- there is no boost/weight/priority field).
    // DocSearch's crawler + Algolia's own relevance/typo-tolerance replaces
    // that mechanism outright rather than working around it.
    //
    // Not listed here: preset-classic auto-adds
    // '@docusaurus/theme-search-algolia' itself whenever themeConfig.algolia
    // is set (node_modules/@docusaurus/preset-classic/lib/index.js) --
    // listing it again here throws "used 2 times with ID default".
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
    // DocSearch (free program) crawl approved 2026-09-28, indexing
    // www.5g-mag.com. apiKey here is the public Search-Only key DocSearch's
    // own dashboard hands out for client-side embedding -- not the Admin
    // key -- so it's safe to commit.
    algolia: {
      appId: 'G1APNTN3JA',
      apiKey: '98a7babf8ef984646df72b7de6bfc298',
      indexName: 'Website',
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
          title: 'Technical Resources',
          items: [
            { label: 'Overview', to: '/tech' },
            { label: 'Where We Stand', to: '/tech#where-we-stand' },
            { label: 'Technology Exchange', to: '/tech/exchanges' },
          ],
        },
        {
          title: 'Standardisation',
          items: [
            { label: 'Overview', to: '/standards' },
            { label: 'Requirements towards SDOs', to: '/standards/requirements' },
            { label: 'Liaison Statements & Inputs', to: '/ls' },
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
            { label: 'Tutorials', to: '/tutorials' },
            { label: 'Testbeds', to: '/testbeds' },
            { label: 'Developer Exchanges', to: '/developer/exchanges' },
            { label: 'Early Access', to: '/early-access' },
            { label: 'Developer Community', to: '/community' },
            { label: 'Open-Source Licenses', to: '/license' },
          ],
        },
        {
          title: 'Deploy',
          items: [{ label: 'Overview', to: '/deploy' }],
        },
        {
          title: 'Videos',
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
            { label: 'Magazine', to: '/magazine' },
            { label: 'Subscribe for Updates', to: '/subscribe' },
            ...SOCIAL_LINKS.map((s) => socialFooterItem(s.label, s.href, s.svgPath)),
          ],
        },
      ],
      // The icon credit is the last line of every page, as the Tabler Icons
      // MIT License asks its notice to accompany copies of the icons; the
      // license link points at the copy this site serves.
      copyright: `Copyright © ${new Date().getFullYear()} 5G-MAG - The Media Connectivity Association<br /><span class="footer__credits">Icons: <a href="https://tabler.io/icons" target="_blank" rel="noopener noreferrer">Tabler Icons</a>, <a href="/licenses/tabler-icons-LICENSE.txt" target="_blank" rel="noopener noreferrer">MIT License</a></span>`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  },
};

export default config;
