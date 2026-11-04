import styles from './styles.module.css';
import { PROJECT_ROADMAPS } from '@site/src/data/projectRoadmaps';
import ROADMAP_PROJECTS from '@site/src/data/roadmapProjects.json';

// The roadmap of the project as a block of the project page: three columns (brought to study, on-going, outcomes) with
// their entries. The entries come from the public GitHub board "5G-MAG Roadmaps" (scripts/fetch-project-roadmaps.js), so
// the page, the decks and the Where We Stand slides show the same words. The link under the columns opens the board view
// of the project, where 5G-MAG officials edit the entries.
const BOARD = 'https://github.com/orgs/5G-MAG/projects/76';
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
      {ROADMAP_PROJECTS[slug] && (
        <p className={styles.board}>
          <a href={`${BOARD}/views/${ROADMAP_PROJECTS[slug].view}`} target="_blank" rel="noopener noreferrer">
            Edit or follow this roadmap on GitHub
          </a>
        </p>
      )}
    </div>
  );
}
