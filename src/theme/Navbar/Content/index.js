import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ErrorCauseBoundary, ThemeClassNames } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import { GITHUB_ICON, SLACK_ICON, LINKEDIN_ICON, LOCK_ICON, SEARCH_ICON } from '../../socialIcons';
import { SLACK_INVITE_URL, SOCIAL_LINKS } from '../../../data/socialLinks';
import { useNavbarItems } from '../../navItems';
import { SECTION_NAV, SOLUTIONS_ITEMS, TECHNOLOGY_GROUPS, ACCELERATOR_GROUPS, stripBaseUrl } from '../../../data/sectionNav';
import { ICON_CATALOG } from '../../../data/baskets';
import styles from './styles.module.css';

// Same route-family concept as SectionNav's own matching (a section's pill
// bar and this navbar underline must always agree on "am I in this
// section"), but resolved to whichever top-navbar item is that section's
// entry point. Needed because a few section pages live at decoupled
// root-level slugs rather than nested under their section's own path (e.g.
// /structure, /partnerships, /contact for "About Us" at /about) — Docusaurus's
// own prefix-matching on a navbar item's `to` never sees those as the same
// route family, so the sliding indicator would otherwise settle nowhere at
// all while on one of them.
function matchesPrefix(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function resolveSectionHref(pathname) {
  const section = SECTION_NAV.find((s) => s.prefixes.some((p) => matchesPrefix(pathname, p)));
  return section?.titleHref;
}

function findLinkByHref(container, href, baseUrl) {
  if (!container || !href) return null;
  const links = container.querySelectorAll('a.navbar__link');
  for (const link of links) {
    try {
      if (stripBaseUrl(new URL(link.href, window.location.origin).pathname, baseUrl) === href) return link;
    } catch {
      // Ignore unparseable hrefs (shouldn't happen for same-origin nav links).
    }
  }
  return null;
}

// The search-local plugin's own search bar has an unusual DOM shape (a
// zero-width positioning container that the real ~200px input overflows
// past), which makes it unreliable to clip down to just its icon with
// CSS alone. Collapsing our own wrapper to width 0 sidesteps that (an
// overflow:hidden ancestor clips a descendant's rendered box regardless
// of the descendant's own overflow:visible), and we show a plain icon
// button in its place until expanded.
function CollapsibleSearch({ children }) {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef(null);

  // Runs after the real input mounts/becomes visible, so focus lands
  // there reliably.
  useEffect(() => {
    if (expanded) {
      wrapperRef.current?.querySelector('input')?.focus();
    }
  }, [expanded]);

  // Click-outside (rather than onBlur) to collapse: the search-local
  // plugin's own input handling causes extra focus churn right after it
  // mounts/focuses, which made a blur-based check collapse it right back
  // even though focus had genuinely landed on the input.
  useEffect(() => {
    if (!expanded) return undefined;
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        const input = wrapperRef.current.querySelector('input');
        if (!input || !input.value) setExpanded(false);
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') {
        wrapperRef.current?.querySelector('input')?.blur();
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [expanded]);

  return (
    <div ref={wrapperRef} className={styles.searchCollapse}>
      {!expanded && (
        <button
          type="button"
          className={styles.navIconLink}
          aria-label="Search"
          title="Search"
          onClick={() => setExpanded(true)}
        >
          {SEARCH_ICON}
        </button>
      )}
      <div className={clsx(styles.searchInner, expanded && styles.searchInnerExpanded)}>
        {children}
      </div>
    </div>
  );
}

// Present on every page regardless of navbar variant (home/tech/default) —
// rendered directly rather than through the config-driven NavbarItems so
// they can be plain icon-only anchors (external, no client-side routing
// needed for any of them).
const GITHUB_HREF = SOCIAL_LINKS.find((s) => s.key === 'github').href;
const LINKEDIN_HREF = SOCIAL_LINKS.find((s) => s.key === 'linkedin').href;

function GlobalNavActions() {
  return (
    <>
      <a
        href={GITHUB_HREF}
        target="_blank"
        rel="noreferrer"
        className={clsx(styles.navIconLink, styles.navSpaced)}
        aria-label="GitHub"
        title="GitHub"
      >
        {GITHUB_ICON}
      </a>
      <a
        href={LINKEDIN_HREF}
        target="_blank"
        rel="noreferrer"
        className={clsx(styles.navIconLink, styles.navSpaced)}
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        {LINKEDIN_ICON}
      </a>
      <a
        href={SLACK_INVITE_URL}
        target="_blank"
        rel="noreferrer"
        className={clsx(styles.navIconLink, styles.navSpaced)}
        aria-label="Slack"
        title="Slack"
      >
        {SLACK_ICON}
      </a>
      <a
        href="https://member.5g-mag.com"
        target="_blank"
        rel="noreferrer"
        className={clsx(styles.navIconLink, styles.navSpaced, styles.membersAreaIcon)}
        aria-label="Members Area"
        title="Members Area"
      >
        {LOCK_ICON}
      </a>
    </>
  );
}

// A thin bar that glides beneath whichever top-level menu item is
// hovered, settling back under the current page's item on mouse-leave
// (or hiding if nothing in the menu matches the current route). Only
// tracks direct .navbar__link children (the dropdown triggers and plain
// links), not the flyout menu contents inside an open dropdown, which
// already have their own hover treatment.
function SlidingIndicatorGroup({ items }) {
  const containerRef = useRef(null);
  const restingRef = useRef(null);
  const [indicator, setIndicator] = useState({ opacity: 0 });
  const { pathname: rawPathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const pathname = stripBaseUrl(rawPathname, siteConfig.baseUrl);

  const measure = (el) => {
    const container = containerRef.current;
    if (!container || !el) return null;
    const containerRect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return { left: rect.left - containerRect.left, width: rect.width };
  };

  const settleOnActive = () => {
    const container = containerRef.current;
    const sectionHref = resolveSectionHref(pathname);
    // Solutions covers the area pages and the Technical Analysis (the /tech section, including the
    // per-topic Standards pages that SECTION_NAV files under it).
    const onAreaPage = SOLUTIONS_ITEMS.some((i) => matchesPrefix(pathname, i.href)) || sectionHref === '/tech';
    const activeEl =
      (onAreaPage ? container?.querySelector('[data-solutions-trigger]') : null) ??
      findLinkByHref(container, sectionHref, siteConfig.baseUrl) ??
      container?.querySelector('.navbar__link--active');
    const rect = measure(activeEl);
    restingRef.current = rect;
    setIndicator(rect ? { ...rect, opacity: 1 } : { opacity: 0 });
  };

  useEffect(() => {
    settleOnActive();
    window.addEventListener('resize', settleOnActive);
    return () => window.removeEventListener('resize', settleOnActive);
    // Re-measure whenever the route changes (active item moves) or the
    // item set itself changes (Technology and Standards / Software
    // Accelerator expanding into their own sub-nav).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, items]);

  const settleOnHovered = (e) => {
    const link = e.target.closest('.navbar__link');
    if (!link || !containerRef.current?.contains(link)) return;
    const rect = measure(link);
    if (rect) setIndicator({ ...rect, opacity: 1 });
  };

  const settleOnResting = () => {
    setIndicator(restingRef.current ? { ...restingRef.current, opacity: 1 } : { opacity: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={styles.navGroup}
      onMouseOver={settleOnHovered}
      onMouseLeave={settleOnResting}
      onFocus={settleOnHovered}
      onBlur={settleOnResting}
    >
      <span
        className={styles.slidingIndicator}
        style={{
          left: indicator.left ?? 0,
          width: indicator.width ?? 0,
          opacity: indicator.opacity,
        }}
        aria-hidden="true"
      />
      <NavbarItems items={items} />
    </div>
  );
}

// Which top-level navbar items open a small flyout on hover/focus, and what
// it shows. The pillar items (Software Accelerator,
// Standardisation, Deploy) carry a `subtitle` on their matching
// SECTION_NAV entry (2026-08-24 design audit: those labels are 5G-MAG's own
// internal vocabulary, not self-explanatory from the navbar alone before a
// click). News (2026-09-10) gets the same flyout so Podcast and Magazine
// are reachable without a click through to /news first, but carries no
// subtitle of its own -- a bare item list needs no explaining. Looked up by
// titleHref so the flyout content has one source, the same SECTION_NAV data
// the pill sub-nav bar itself already renders from; deliberately explicit
// (which items open a flyout) rather than "every navbar item whose
// SECTION_NAV entry happens to have items", most of which don't want one.
const NAV_DROPDOWN_HREFS = ['/standards', '/developer', '/deploy', '/news'];
const NAV_DROPDOWNS = new Map(
  NAV_DROPDOWN_HREFS.map((href) => [href, SECTION_NAV.find((s) => s.titleHref === href)])
);

function renderNavbarItem(item) {
  return (
    <ErrorCauseBoundary
      onError={(error) =>
        new Error(
          `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
          { cause: error }
        )
      }
    >
      <NavbarItem {...item} />
    </ErrorCauseBoundary>
  );
}

// Mirrors the CSS :hover/:focus-within triggers that already show/hide
// .navDropdownMenu (styles.module.css) with a matching React `expanded`
// flag, used only to drive aria-haspopup/aria-expanded on the trigger link
// -- the visual show/hide stays pure CSS, unchanged. NavbarNavLink
// (@docusaurus/theme-classic) spreads any unrecognised item props (here,
// the two aria-* keys) straight onto the underlying <Link>/<a>, so this
// needs no swizzle of that component. `preview.subtitle` is optional (News
// has none) so the paragraph is only rendered when there is one to show.
function NavDropdownItem({ item, preview }) {
  const [expanded, setExpanded] = useState(false);
  const link = renderNavbarItem({ ...item, 'aria-haspopup': 'true', 'aria-expanded': expanded });
  return (
    <span
      className={styles.navDropdownWrapper}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
      }}
    >
      {link}
      <div
        className={clsx(styles.navDropdownMenu, styles.navAreasMenu, preview.items.length <= 4 && styles.navAreasMenuNarrow)}
        aria-label={`${preview.title} quick links`}
      >
        <SectionHeadCard title={preview.menuTitle || preview.title} subtitle={preview.subtitle} href={preview.titleHref} icon={SECTION_ICONS[preview.titleHref]} />
        {/* `featured` entries (the section's main destinations, solid chips in its pill row) come
            first as larger cards; the rest follow as icon rows. */}
        {preview.items.some((sub) => sub.featured) && (
          <ul className={styles.navFeatured}>
            {preview.items.filter((sub) => sub.featured).map((sub) => (
              <li key={sub.href}>
                <Link to={sub.href} className={styles.navFeaturedCard}>
                  <span className={clsx(styles.navAreaIcon, styles.navHeadIcon)}><NavItemIcon href={sub.href} size={20} /></span>
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <ul className={clsx(styles.navAreaGrid, preview.items.length <= 4 && styles.navAreaGridSingle)}>
          {preview.items.filter((sub) => !sub.featured).map((sub) => (
            <li key={sub.href}>
              <Link to={sub.href} className={styles.navAreaLink}>
                <span className={styles.navAreaIcon}><NavItemIcon href={sub.href} /></span>
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </span>
  );
}

// An icon from the taxonomy catalog (the same shapes the area and project pages use), or raw path data.
function CatalogIcon({ name, paths, size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(paths || ICON_CATALOG[name] || []).map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

// Icons for the section dropdowns' entries, by destination: a catalog name where the destination
// already uses one (Testbeds' flask, the 5G Broadcast antenna), else Tabler-style line paths, the set
// the destination hub pages use (Reference Tools' </>, the Tutorials rocket).
const NAV_ITEM_ICONS = {
  '/reference-tools': ['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16'],
  '/testbeds': 'flask',
  '/tutorials': ['M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z', 'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z', 'M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0', 'M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5'],
  '/community': ['M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', 'M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2', 'M16 3.13a4 4 0 0 1 0 7.75', 'M21 21v-2a4 4 0 0 0 -3 -3.85'],
  // the Community Activity page's own banner icon
  '/community/activity': ['M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0', 'M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1', 'M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0', 'M17 10h2a2 2 0 0 1 2 2v1', 'M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0', 'M3 13v-1a2 2 0 0 1 2 -2h2'],
  '/license': ['M14 3v4a1 1 0 0 0 1 1h4', 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z', 'M9 13l6 0', 'M9 17l6 0'],
  '/early-access': ['M7 14a4 4 0 1 1 0 -8a4 4 0 0 1 0 8', 'M11 10h10', 'M18 10v3', 'M21 10v2'],
  '/developer/exchanges': ['M3 4l18 0', 'M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10', 'M12 16l0 4', 'M9 20l6 0', 'M8 12l3 -3l2 2l3 -3'],
  '/standards/requirements': ['M3.5 5.5l1.5 1.5l2.5 -2.5', 'M3.5 11.5l1.5 1.5l2.5 -2.5', 'M3.5 17.5l1.5 1.5l2.5 -2.5', 'M11 6l9 0', 'M11 12l9 0', 'M11 18l9 0'],
  '/surveys': ['M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z', 'M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z', 'M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z'],
  '/standards#feedback': ['M8 9h8', 'M8 13h6', 'M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z'],
  '/ls': ['M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z', 'M3 7l9 6l9 -6'],
  '/workshops': ['M3 4l18 0', 'M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10', 'M12 16l0 4', 'M9 20l6 0', 'M8 12l3 -3l2 2l3 -3'],
  '/deploy/5g-broadcast-plugfest': 'antenna-signal',
  '/deploy#demos': ['M7 4v16l13 -8l-13 -8'],
  '/deploy#plugfests': ['M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', 'M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2', 'M16 3.13a4 4 0 0 1 0 7.75', 'M21 21v-2a4 4 0 0 0 -3 -3.85'],
  '/deploy#assets': ['M12 4l-8 4l8 4l8 -4l-8 -4', 'M4 12l8 4l8 -4', 'M4 16l8 4l8 -4'],
  '/podcast': ['M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -6 0z', 'M5 10a7 7 0 0 0 14 0', 'M8 21l8 0', 'M12 17l0 4'],
  '/magazine': ['M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0', 'M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0', 'M3 6l0 13', 'M12 6l0 13', 'M21 6l0 13'],
};

// Each section's own hub-page icon (the HubHero icon on /standards, /developer, /deploy, /news),
// shown on that section's header card at the top of its dropdown.
const SECTION_ICONS = {
  '/standards': ['M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1'],
  '/developer': ['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16'],
  '/deploy': ['M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5', 'M12 12l8 -4.5', 'M12 12l0 9', 'M12 12l-8 -4.5', 'M16 5.25l-8 4.5'],
  '/news': ['M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11', 'M8 8l4 0', 'M8 12l4 0', 'M8 16l4 0'],
};

// Solutions has no hub page and no icon of its own: its header card uses a lightbulb (what you can
// build), a shape no other section uses.
const SOLUTIONS_ICON = ['M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7', 'M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3', 'M9.7 17l4.6 0'];

// The header card: the section's icon, name and one-line description. It links to the section's
// hub page when there is one (`href`), and is plain text otherwise (Solutions).
function SectionHeadCard({ title, subtitle, href, icon, action }) {
  const body = (
    <>
      <span className={clsx(styles.navAreaIcon, styles.navHeadIcon)}>
        <CatalogIcon paths={icon} size={20} />
      </span>
      <span className={styles.navHeadText}>
        <b>{title}</b>
        {subtitle && <small>{subtitle}</small>}
      </span>
      {href && <span className={styles.navHeadArrow} aria-hidden="true">→</span>}
    </>
  );
  return href ? (
    <Link to={href} className={styles.navHeadCard}>{body}</Link>
  ) : (
    <div className={clsx(styles.navHeadCard, styles.navHeadStatic)}>
      {body}
      {action && <Link to={action.href} className={styles.navHeadAction}>{action.label} →</Link>}
    </div>
  );
}

function NavItemIcon({ href, size = 18 }) {
  const icon = NAV_ITEM_ICONS[href];
  if (!icon) return null;
  return typeof icon === 'string' ? <CatalogIcon name={icon} size={size} /> : <CatalogIcon paths={icon} size={size} />;
}

// The wide panel shared by the Solutions and Software Accelerator menus: one card per area, the card
// title opening the area's page, the lines under it each a project.
function MegaCard({ g }) {
  return (
    <div className={styles.navMegaCard} style={{ '--accent': g.accent }}>
      <Link to={g.href} className={styles.navMegaArea}>
        <span className={styles.navAreaIcon}><CatalogIcon name={g.icon} size={17} /></span>
        <span className={styles.navMegaAreaTitle}>{g.title}</span>
        <span className={styles.navMegaAreaArrow} aria-hidden="true">→</span>
      </Link>
      <ul className={styles.navMegaList}>
        {g.items.map((sub) => (
          <li key={sub.href}>
            <Link to={sub.href}>
              <CatalogIcon name={sub.icon} size={16} />
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaGroups({ groups }) {
  return (
    <div className={clsx(styles.navMegaGroups, styles.navSolutionsScroll)}>
      {groups.map((g) => <MegaCard key={g.title} g={g} />)}
    </div>
  );
}

// Opens a wide panel on hover or focus. The panel is wide: a pointer heading for a card on its far side
// crosses the neighbouring navbar items first, so closing is delayed briefly and the panel stays open
// while the pointer travels. `trigger(expanded)` draws the item that opens it.
function MegaMenu({ trigger, label, children }) {
  const [expanded, setExpanded] = useState(false);
  const closeTimer = useRef(null);
  const open = () => {
    clearTimeout(closeTimer.current);
    setExpanded(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setExpanded(false), 350);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  return (
    <span
      className={clsx(styles.navDropdownWrapper, expanded && styles.navDropdownOpen)}
      onMouseEnter={open}
      onMouseLeave={closeSoon}
      onFocus={open}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
      }}
    >
      {trigger(expanded)}
      <div className={clsx(styles.navDropdownMenu, styles.navMegaMenu)} aria-label={label}>
        {children}
      </div>
    </span>
  );
}

// Solutions has no page of its own: its trigger is a button that opens one wide panel with one card per
// area: the card title opens the area page, the lines under it each project's Technical Analysis (this
// replaces the former separate Technology menu).
function SolutionsMenu({ item }) {
  return (
    <MegaMenu
      label="Solutions"
      trigger={(expanded) => (
        <button
          type="button"
          data-solutions-trigger
          className={clsx('navbar__item navbar__link clean-btn', item.className)}
          aria-haspopup="true"
          aria-expanded={expanded}
        >
          {item.label}
        </button>
      )}
    >
      <SectionHeadCard title="Solutions" subtitle="What you can build, area by area, and the technology behind it."
        icon={SOLUTIONS_ICON} action={{ label: 'All technology', href: '/tech' }} />
      <MegaGroups groups={TECHNOLOGY_GROUPS} />
    </MegaMenu>
  );
}

// One big card for a destination: its title (a link to the destination's page) over the projects. The areas
// of the Reference Tools card are small labels, not links; they are dealt, in order, into columns of about
// the same height (a label plus one line per project).
function BigCard({ title, subtitle, href, accent, groups, flat = false }) {
  const weight = (g) => g.items.length + 2;
  const target = groups.reduce((a, g) => a + weight(g), 0) / 3;
  const cols = [[], [], []];
  let before = 0;
  groups.forEach((g) => {
    cols[Math.min(2, Math.floor((before + weight(g) / 2) / target))].push(g);
    before += weight(g);
  });
  const list = (items) => (
    <ul className={styles.navMegaList}>
      {items.map((sub) => (
        <li key={sub.href}>
          <Link to={sub.href}>
            <CatalogIcon name={sub.icon} size={16} />
            {sub.label}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.navBigCard} style={{ '--accent': accent }}>
      <Link to={href} className={styles.navBigHead}>
        <span className={clsx(styles.navAreaIcon, styles.navHeadIcon)}><NavItemIcon href={href} size={20} /></span>
        <span className={styles.navHeadText}>
          <b>{title}</b>
          <small>{subtitle}</small>
        </span>
        <span className={styles.navMegaAreaArrow} aria-hidden="true">→</span>
      </Link>
      {flat ? (
        <div className={styles.navBigFlat}>{list(groups.flatMap((g) => g.items))}</div>
      ) : (
        <div className={styles.navBigCols}>
          {cols.map((col, k) => (
            <div key={k} className={styles.navBigCol}>
              {col.map((g) => (
                <div key={g.title} style={{ '--accent': g.accent }}>
                  <div className={styles.navMegaLabel}>
                    <CatalogIcon name={g.icon} size={15} />
                    {g.title}
                  </div>
                  {list(g.items)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Software Accelerator: the section's header card, its community links as a row of buttons, then two big
// cards, Reference Tools (every project with code, by area) and Testbeds, each project opening its page.
// `preview` is the section's SECTION_NAV entry.
function AcceleratorMenu({ item, preview }) {
  const community = preview.items.filter((sub) => !sub.featured);
  const testbeds = ACCELERATOR_GROUPS.filter((g) => g.href === '/testbeds');
  const tools = ACCELERATOR_GROUPS.filter((g) => g.href !== '/testbeds');
  return (
    <MegaMenu
      label={`${preview.title} quick links`}
      trigger={(expanded) => renderNavbarItem({ ...item, 'aria-haspopup': 'true', 'aria-expanded': expanded })}
    >
      <SectionHeadCard title={preview.menuTitle || preview.title} subtitle={preview.subtitle} href={preview.titleHref} icon={SECTION_ICONS[preview.titleHref]} />
      <ul className={styles.navAccelCommunity}>
        {community.map((sub) => (
          <li key={sub.href}>
            <Link to={sub.href}>
              <NavItemIcon href={sub.href} size={18} />
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.navAcceleratorScroll}>
        <BigCard title="Reference Tools" subtitle="Open-source code, project by project." href="/reference-tools"
          accent="#00a0d2" groups={tools} />
        <BigCard title="Testbeds" subtitle="Test environments and evaluation frameworks." href="/testbeds"
          accent="#4a6b8a" groups={testbeds} flat />
      </div>
    </MegaMenu>
  );
}

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => {
        if (item.solutionsMenu) return <SolutionsMenu key={i} item={item} />;
        const preview = NAV_DROPDOWNS.get(item.to);
        if (!preview) return <React.Fragment key={i}>{renderNavbarItem(item)}</React.Fragment>;
        if (item.to === '/developer') return <AcceleratorMenu key={i} item={item} preview={preview} />;
        return (
          <NavDropdownItem key={i} item={item} preview={preview} />
        );
      })}
    </>
  );
}

function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className={clsx(ThemeClassNames.layout.navbar.containerLeft, 'navbar__items')}>
        {left}
      </div>
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right'
        )}
      >
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <SlidingIndicatorGroup items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <GlobalNavActions />
          {!searchBarItem && (
            <CollapsibleSearch>
              <NavbarSearch>
                <SearchBar />
              </NavbarSearch>
            </CollapsibleSearch>
          )}
          <NavbarColorModeToggle className={styles.colorModeToggle} />
        </>
      }
    />
  );
}
