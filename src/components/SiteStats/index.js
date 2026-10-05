import { FACT_REPOSITORIES, FACT_CLONES, FACT_SPEC_ISSUES, FACT_SDO_INPUTS, STATS_UPDATED } from '@site/src/data/facts';
import styles from './styles.module.css';

// The four counted facts (static/data/site-stats.json, refreshed daily by
// scripts/fetch-site-stats.js), closing the homepage intro.
const TILES = [
  { ...FACT_REPOSITORIES, label: 'project repositories' },
  { ...FACT_CLONES, label: 'clones', sub: 'unique cloners per day, since 5 Oct 2026' },
  { ...FACT_SPEC_ISSUES, label: 'issues raised on specifications', sub: 'through GitHub' },
  { ...FACT_SDO_INPUTS, label: 'inputs and liaison statements', sub: 'sent to standards bodies' },
];

export default function SiteStats() {
  const day = STATS_UPDATED ? new Date(`${STATS_UPDATED.slice(0, 10)}T00:00:00Z`) : null;
  const date = day
    ? day.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : null;
  return (
    <div className={styles.strip}>
      <div className={styles.grid}>
        {TILES.map((t) => (
          <div key={t.label} className={styles.tile}>
            <span className={styles.num}>{t.value}</span>
            <span className={styles.label}>{t.label}</span>
            {t.sub && <span className={styles.sub}>{t.sub}</span>}
          </div>
        ))}
      </div>
      {date && <p className={styles.foot}>Updated daily · {date}</p>}
    </div>
  );
}
