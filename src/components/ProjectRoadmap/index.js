import styles from './styles.module.css';
import { PROJECT_ROADMAPS } from '@site/src/data/projectRoadmaps';

// The roadmap slide of the project's slide deck, as a block of the project page: the same columns in the same order
// (brought to study, on-going, outcomes) and the same words. The data is written from the Where We Stand slide of the
// project (admin-graphics/slides/where_we_stand, sync_website.py), so the page and the deck cannot differ. A project
// without such a slide keeps the columns of its own deck (known gaps, in development, released).
const COLUMN_COLOURS = {
  'BROUGHT TO STUDY': '#D64545', 'ON-GOING': '#E08A00', OUTCOMES: '#2E8B5A',
  RELEASED: '#2E8B5A', 'IN DEVELOPMENT': '#0A6E9C',
  'UNDER STUDY (BACKLOG)': '#D64545', COMPLETED: '#2E8B5A',
};

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
                    {item.body && <span>{item.body}</span>}
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
