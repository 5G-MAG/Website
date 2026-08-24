import { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { stripBaseUrl } from '@site/src/data/sectionNav';
import styles from './styles.module.css';

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Presentational pill-row: highlights whichever item matches the current
// route, everything else is a plain link. Rendered globally by
// SectionNav (src/components/SectionNav), which resolves the current
// route to a section's canonical item list — see src/data/sectionNav.js.
// Kept as its own component since SectionNav needs exactly this
// rendering/active-state logic and nothing page-specific.
export default function PageNav({ title, titleHref, items }) {
  const { pathname: rawPathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const pathname = stripBaseUrl(rawPathname, siteConfig.baseUrl);

  // On a narrow viewport this row scrolls horizontally with no visual hint
  // that it does (2026-08-24 design audit: the last pill sat cut off at the
  // edge, easy to miss on a phone). Tracks whether there's unseen content
  // past the right edge -- true whenever the row overflows and hasn't been
  // scrolled all the way to its end -- and only then applies the fade mask,
  // so a row that fits at the current width shows no fade at all.
  const rowRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      setCanScrollRight(row.scrollWidth - row.clientWidth - row.scrollLeft > 1);
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav className={styles.pageNav} aria-label="Section navigation">
      <div
        ref={rowRef}
        className={`container ${styles.navRow} ${canScrollRight ? styles.navRowFade : ''}`}
      >
        {title && (
          <>
            <Link to={titleHref} className={styles.navSectionLabel}>
              {title}
            </Link>
            {items.length > 0 && <span className={styles.navDivider} aria-hidden="true" />}
          </>
        )}
        {items.map((item) => {
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
