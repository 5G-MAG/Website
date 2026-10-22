import styles from './styles.module.css';
import { PROJECT_ROADMAPS } from '@site/src/data/projectRoadmaps';

// The "Latest updates and roadmap" slide of the project's slide deck, as a block of the project page: the same
// columns in the same order (the backlog first, then in development, then released) and the same words. The data
// is written by the deck build (admin-graphics/slides), so the page and the deck cannot differ.
const COLUMN_COLOURS = { RELEASED: '#2E8B5A', 'IN DEVELOPMENT': '#0A6E9C' };

export default function ProjectRoadmap({ slug, accent }) {
  const roadmap = PROJECT_ROADMAPS[slug];
  if (!roadmap) return null;
  return (
    <div className={styles.roadmap}>
      <h2 className={styles.title}>Latest updates and roadmap</h2>
      <p className={styles.status}>Status on {roadmap.read}</p>
      <div className={styles.columns}>
        {roadmap.phases.map((phase) => {
          const colour = COLUMN_COLOURS[phase.label] || accent || 'var(--ifm-color-primary)';
          return (
            <section key={phase.label} className={styles.column} style={{ '--phase': colour }}>
              <h3 className={styles.phase}>{phase.label.toLowerCase()}</h3>
              <ul className={styles.items}>
                {phase.items.map((item) => (
                  <li key={item.head} className={styles.item}>
                    <strong>{item.head}</strong>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      {roadmap.merged && (
        <p className={styles.merged}>
          <strong>Merged since {roadmap.since}</strong> {roadmap.merged}
        </p>
      )}
    </div>
  );
}
