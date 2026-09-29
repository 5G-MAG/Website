import Link from '@docusaurus/Link';
import { iconForCatalogKey } from '@site/src/components/ProjectStatus';
import { BASKET_ACCENT, WHERE_WE_STAND_ROWS } from '@site/src/data/baskets';
import styles from './styles.module.css';

// One tile per Where We Stand basket (icon on the basket's accent, name,
// project count), so a reader can jump straight to a basket instead of
// scrolling past the others. On /tech itself (`inPage`) a tile is a plain
// in-page anchor to the basket's own block; elsewhere it links to that
// block on /tech. The counts come from the same rows the chart renders, so
// a tile never promises a different number than the block it opens.
export default function BasketJumpRow({ inPage = false, label = 'Technology areas' }) {
  return (
    <nav className={styles.row} aria-label={label}>
      {WHERE_WE_STAND_ROWS.map((b) => {
        const n = b.projects.length;
        const body = (
          <>
            <span className={styles.icon}>{iconForCatalogKey(b.icon)}</span>
            <span className={styles.name}>{b.title}</span>
            <span className={styles.count}>
              {n} {n === 1 ? 'project' : 'projects'}
            </span>
          </>
        );
        const style = { '--accent': BASKET_ACCENT[b.key] || '#00a0d2' };
        return inPage ? (
          <a key={b.key} href={`#${b.key}`} className={styles.tile} style={style}>
            {body}
          </a>
        ) : (
          <Link key={b.key} to={`/tech#${b.key}`} className={styles.tile} style={style}>
            {body}
          </Link>
        );
      })}
    </nav>
  );
}
