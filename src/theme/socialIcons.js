import React from 'react';
import { SOCIAL_LINKS as SOCIAL_LINK_DATA } from '../data/socialLinks';

// Shared icon set for the global nav actions (Navbar/Content) and the
// footer's icon row (docusaurus.config.js), so both stay in sync from one
// place instead of duplicating SVG path data. The path strings themselves
// live in src/data/socialLinks.js (plain, JSX-free) since docusaurus.config.js
// is evaluated directly by Node with no JSX transform available — this file
// wraps those same raw strings into rendered React icons for site components.
function icon(svgPath) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgPath }}
    />
  );
}

const iconByKey = Object.fromEntries(SOCIAL_LINK_DATA.map((s) => [s.key, icon(s.svgPath)]));

export const GITHUB_ICON = iconByKey.github;
export const SLACK_ICON = iconByKey.slack;
export const LINKEDIN_ICON = iconByKey.linkedin;
export const YOUTUBE_ICON = iconByKey.youtube;
export const SPOTIFY_ICON = iconByKey.spotify;

export const LOCK_ICON = icon(
  '<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" />'
);

export const SEARCH_ICON = icon(
  '<path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />'
);

// Canonical list of social/community links, shared between the navbar
// and the footer icon row.
export const SOCIAL_LINKS = SOCIAL_LINK_DATA.map((s) => ({
  label: s.label,
  href: s.href,
  icon: iconByKey[s.key],
}));

export const MEMBER_AREA_LINK = {
  label: 'Members Area',
  href: 'https://member.5g-mag.com',
  icon: LOCK_ICON,
};
