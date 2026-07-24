import styles from './Navbar/Content/styles.module.css';
import { SLACK_INVITE_URL } from '../data/socialLinks';

// Shared between the desktop nav (Navbar/Content) and the mobile drawer
// (Navbar/MobileSidebar/PrimaryMenu) — the navbar renders identically on
// every route (matching the homepage), plain links only, no dropdowns.
// About's/Tech's own sub-pages still get a left sidebar on their actual doc
// content pages via sidebars-home.js / sidebars-tech.js (Docusaurus's own
// doc sidebar). Developer's own remaining docs (how-to-use, guidelines,
// license) live in docs/home too now but deliberately carry no sidebar —
// see the note at the bottom of sidebars-home.js.
export const ABOUT_ITEM = { to: '/about', label: 'About Us', position: 'left' };

export const MEMBERSHIP_ITEM = { to: '/membership', label: 'Membership', position: 'left' };
export const EVENTS_ITEM = { to: '/events', label: 'Events', position: 'left' };
export const NEWS_ITEM = { to: '/news', label: 'News', position: 'left' };

// 5G-MAG's four distinctive, defining activities (vs. the more general
// About/Membership/Events/News items) — matching the homepage's "Discover
// 5G-MAG's work" four-card section — so all four carry primaryNavItem to
// stand out with bolder, brand-colored text rather than blending in as just
// another menu entry. Spacing between every item (including this cluster's
// neighbors) is uniform — see .navGroup's `gap` in Navbar/Content/styles.module.css.
export const PROFILES_ITEM = {
  to: '/tech',
  label: 'Explainers & Profiles',
  position: 'left',
  className: styles.primaryNavItem,
};

export const FEEDBACK_ITEM = {
  to: '/standards',
  label: 'Feedback & Requirements',
  position: 'left',
  className: styles.primaryNavItem,
};

export const DEV_ITEM = {
  to: '/developer',
  label: 'Software Accelerator',
  position: 'left',
  className: styles.primaryNavItem,
};

export const INTEROP_ITEM = {
  to: '/demos',
  label: 'Interop & Demos',
  position: 'left',
  className: styles.primaryNavItem,
};

export function useNavbarItems() {
  return [
    ABOUT_ITEM,
    MEMBERSHIP_ITEM,
    PROFILES_ITEM,
    FEEDBACK_ITEM,
    DEV_ITEM,
    INTEROP_ITEM,
    EVENTS_ITEM,
    NEWS_ITEM,
  ];
}

// GitHub/Slack/Members Area — global actions rendered as plain icon-only
// anchors on desktop (see Navbar/Content's GlobalNavActions), but as
// regular labeled links here so they're reachable from the mobile drawer
// too (icons alone, unlabeled, would be a poor fit for a vertical text menu).
export const MOBILE_GLOBAL_ITEMS = [
  { href: 'https://github.com/5G-MAG', label: 'GitHub', position: 'left' },
  { href: 'https://www.linkedin.com/company/5g-mag/', label: 'LinkedIn', position: 'left' },
  {
    href: SLACK_INVITE_URL,
    label: 'Slack',
    position: 'left',
  },
  { href: 'https://member.5g-mag.com', label: 'Members Area', position: 'left' },
];
