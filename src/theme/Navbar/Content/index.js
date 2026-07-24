import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
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
import { SECTION_NAV, stripBaseUrl } from '../../../data/sectionNav';
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
    const activeEl =
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

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
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
      ))}
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
