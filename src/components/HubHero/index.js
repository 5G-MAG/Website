import styles from './styles.module.css';

// Compact gradient hero shared by every Hub-tier custom page (/tech,
// /standards, /testing, /membership, /about, /events, /developer, and
// the News hub). Replaces the earlier full-height hero + HeroFigure
// icon-cloud (still used standalone on the homepage) with a single icon
// badge — same gradient and voice, leaner.
export default function HubHero({ title, icon, actions }) {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.heroRow}`}>
        <div className={styles.iconBadge}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {icon}
          </svg>
        </div>
        <div className={styles.heroText}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.actions}>{actions}</div>
        </div>
      </div>
    </header>
  );
}
