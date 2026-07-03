// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '5G-MAG',
  tagline: 'Developer documentation, specification analysis and standards work',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  // TODO: confirm final domain before real deployment (placeholder — see plan follow-up notes)
  url: 'https://hub.5g-mag.com',
  baseUrl: '/',
  organizationName: '5G-MAG',
  projectName: '5g-mag-portal',

  onBrokenLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownImages: 'ignore',
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'developer',
        path: 'docs-developer',
        routeBasePath: 'developer',
        sidebarPath: './sidebars-developer.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tech',
        path: 'docs-tech',
        routeBasePath: 'tech',
        sidebarPath: './sidebars-tech.js',
      },
    ],
  ],

  presets: [[
    'classic',
    ({
      docs: false,
      blog: false,
      theme: { customCss: './src/css/custom.css' },
    }),
  ]],

  themeConfig: ({
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: '',
      logo: { alt: '5G-MAG Logo', src: 'assets/images/5g-mag-logo-with-text.png' },
      items: [
        { to: '/', label: 'Home', position: 'left' },
        { to: '/developer', label: 'Developer Portal', position: 'left' },
        { to: '/developer/applications', label: 'Applications', position: 'left' },
        { to: '/developer/projects', label: 'Reference Tools', position: 'left' },
        { to: '/developer/testbeds', label: 'Testbeds', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          docsPluginId: 'tech',
          label: 'Technical Docs & Standards',
          position: 'left',
        },
        { to: '/developer/dashboard', label: 'Activity Dashboard', position: 'right' },
        { to: '/developer/community', label: 'Developer Community', position: 'right' },
        { href: 'https://github.com/5G-MAG', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Developer Portal',
          items: [
            { label: 'Applications', to: '/developer/applications' },
            { label: 'Reference Tools', to: '/developer/projects' },
            { label: 'GitHub Getting-Started', href: 'https://github.com/5G-MAG/Getting-Started' },
          ],
        },
        {
          title: 'Technical Documentation',
          items: [
            { label: 'Introduction', to: '/tech/intro' },
            { label: 'Capability Areas', to: '/#capability-areas' },
            { label: 'GitHub Tech', href: 'https://github.com/5G-MAG/Tech' },
          ],
        },
        {
          title: 'Standards',
          items: [
            { label: 'Feedback and Inputs', to: '/tech/standards/feedback' },
            { label: 'GitHub Standards', href: 'https://github.com/5G-MAG/Standards' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: '5G-MAG Website', href: 'https://www.5g-mag.com' },
            { label: 'Discussions', href: 'https://github.com/orgs/5G-MAG/discussions' },
            { label: 'Slack', href: 'https://join.slack.com/t/5g-mag/shared_invite/zt-trtvsmw5-yYgcRidDgIS7x_u48sTuQA' },
            { label: 'GitHub', href: 'https://github.com/5G-MAG' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 5G-MAG - The Media Connectivity Association`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  }),
};

export default config;
