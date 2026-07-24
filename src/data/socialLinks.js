// Single source of truth for community/social links (label, href, and raw
// SVG path data) — consumed both by docusaurus.config.js (plain Node, no
// JSX transform available at config-eval time, so paths are kept as raw
// strings here) and by src/theme/socialIcons.js (React side, which wraps
// these same strings via dangerouslySetInnerHTML). Previously this data was
// hand-duplicated in both places, and the Slack invite URL additionally
// existed in two different URL formats across ~13 files.
export const SLACK_INVITE_URL =
  'https://join.slack.com/t/5g-mag/shared_invite/zt-44la3q72s-Mrb13bWpHA33GiCbWJ6C3Q';

export const SOCIAL_LINKS = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/5G-MAG',
    svgPath:
      '<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />',
  },
  {
    key: 'slack',
    label: 'Slack',
    href: SLACK_INVITE_URL,
    svgPath:
      '<path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6" /><path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6" /><path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6" /><path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6" />',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/5g-mag/',
    svgPath:
      '<path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@5GMAG',
    svgPath:
      '<path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" /><path d="M10 9l5 3l-5 3l0 -6" />',
  },
  {
    key: 'spotify',
    label: 'Spotify',
    href: 'https://open.spotify.com/show/4GHmI1TEtBLPbvAR8RUBcf',
    svgPath:
      '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" /><path d="M9 15c1.5 -1 4 -1 5 .5" /><path d="M7 9c2 -1 6 -2 10 .5" />',
  },
];
