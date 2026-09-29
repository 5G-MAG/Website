import clsx from 'clsx';
import styles from '@site/src/pages/tech/index.module.css';

// A titled row of stat cards, in the same summary-card style as /membership's
// "Our work at a glance". Values come from src/data/facts.js (counted daily).
export default function StatRow({ title, subtitle, facts, alt = false, id }) {
  return (
    <section id={id} className={clsx(styles.section, alt && styles.sectionAlt)}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        <div className="summary-container">
          {facts.map((f) => (
            <div key={f.label} className="summary-card">
              <h3>{f.label}</h3>
              <span className="summary-value">{f.value}</span>
              {f.sub && <span className="stats-sub">{f.sub}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
