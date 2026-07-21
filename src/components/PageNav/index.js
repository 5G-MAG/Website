import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

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
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
