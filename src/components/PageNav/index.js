import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// A chip that groups several items under one label instead of listing them
// all flat in the row — e.g. Software Accelerator's Community-related pages
// (How to Contribute, Releases, Roadmap, ...) nest under a single "Community"
// chip rather than each getting its own top-level pill. `item.href` is
// optional — when present (e.g. Community itself still resolves to
// /developer#community) the label is its own link and a separate caret
// button toggles the panel; without it, the whole chip is just a toggle.
//
// The panel is rendered through a portal into document.body rather than
// as a plain absolutely-positioned child. .navRow (the pill row itself)
// sets overflow-x: auto for horizontal scrolling on crowded/narrow rows,
// which per the CSS overflow spec forces its computed overflow-y to auto
// too — so a panel positioned inside it gets silently clipped at the row's
// own bottom edge instead of drawing over the page content below. Portaling
// to body and positioning with getBoundingClientRect sidesteps that clipping
// entirely instead of fighting it with z-index (which can't win against an
// ancestor's overflow box).
function NavDropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const triggerWrapRef = useRef(null);
  const panelRef = useRef(null);

  function updateCoords() {
    const el = triggerWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ top: rect.bottom + 6, left: rect.left, minWidth: rect.width });
  }

  useEffect(() => {
    if (!open) return undefined;
    updateCoords();
    function handlePointerDown(event) {
      const inTrigger = triggerWrapRef.current && triggerWrapRef.current.contains(event.target);
      const inPanel = panelRef.current && panelRef.current.contains(event.target);
      if (!inTrigger && !inPanel) setOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updateCoords);
    // capture: true so this also fires for scrolling inside .navRow itself
    // (the horizontally-scrollable pill row), not just the window.
    window.addEventListener('scroll', updateCoords, true);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [open]);

  // Route changes (picking a child, or navigating away entirely) should
  // always leave the panel closed for the next visit.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const active = item.children.some((child) => isActive(pathname, child.href));
  const triggerClassName = active
    ? `${styles.navChip} ${styles.navDropdownTrigger} ${styles.navChipActive}`
    : `${styles.navChip} ${styles.navDropdownTrigger}`;

  const caret = (
    <svg
      className={open ? `${styles.navDropdownCaret} ${styles.navDropdownCaretOpen}` : styles.navDropdownCaret}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );

  return (
    <div className={styles.navDropdown} ref={triggerWrapRef}>
      {item.href ? (
        <span className={active ? `${styles.navChip} ${styles.navChipActive}` : styles.navChip}>
          <Link to={item.href} className={styles.navDropdownLabel} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
          <button
            type="button"
            className={styles.navDropdownCaretBtn}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label={`Show ${item.label} submenu`}
            onClick={() => setOpen((v) => !v)}
          >
            {caret}
          </button>
        </span>
      ) : (
        <button
          type="button"
          className={triggerClassName}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {item.label}
          {caret}
        </button>
      )}
      {open && coords &&
        createPortal(
          <div
            ref={panelRef}
            className={styles.navDropdownPanel}
            role="menu"
            style={{ top: coords.top, left: coords.left, minWidth: Math.max(coords.minWidth, 220) }}
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                role="menuitem"
                className={
                  isActive(pathname, child.href)
                    ? `${styles.navDropdownLink} ${styles.navDropdownLinkActive}`
                    : styles.navDropdownLink
                }
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

// Presentational pill-row: highlights whichever item matches the current
// route, everything else is a plain link. Rendered globally by
// SectionNav (src/components/SectionNav), which resolves the current
// route to a section's canonical item list — see src/data/sectionNav.js.
// Kept as its own component since SectionNav needs exactly this
// rendering/active-state logic and nothing page-specific.
export default function PageNav({ title, titleHref, items }) {
  const { pathname } = useLocation();
  return (
    <nav className={styles.pageNav} aria-label="Section navigation">
      <div className={`container ${styles.navRow}`}>
        {title && (
          <>
            <Link to={titleHref} className={styles.navSectionLabel}>
              {title}
            </Link>
            {items.length > 0 && <span className={styles.navDivider} aria-hidden="true" />}
          </>
        )}
        {items.map((item) => {
          if (item.children) {
            return <NavDropdown key={item.label} item={item} pathname={pathname} />;
          }
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={active ? `${styles.navChip} ${styles.navChipActive}` : styles.navChip}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
