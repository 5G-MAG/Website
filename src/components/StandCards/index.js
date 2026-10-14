import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { iconForCatalogKey } from '@site/src/components/ProjectStatus';
import {
  ALL_PROJECTS as projectsData,
  BASKET_ACCENT,
  STAGE_GROUPS,
  TOPIC_BASKETS,
  basketStageReach,
  displayNameOf,
  reposFor,
} from '@site/src/data/baskets';
import styles from './styles.module.css';

// One card per technology area, rolled up from the same taxonomy as the full chart below it. A stage is ticked
// once ANY project of the area reached it (basketStageReach). Every area is shown, even one with no project past
// Under Study: an empty-looking card is itself the invitation of this page.
const STAND_BASKETS = TOPIC_BASKETS.map((b) => {
  const basketProjects = projectsData.filter((p) => p.basket === b.key && !p.parent);
  return {
    ...b,
    accent: BASKET_ACCENT[b.key] || '#00a0d2',
    reach: basketStageReach(basketProjects, b.stages),
    repoCount: basketProjects.reduce((n, p) => n + reposFor(p).length, 0),
    projects: basketProjects,
  };
});

// The head and checklist link to the area's own block in the full chart (`#<key>` on this page). Below them, one
// icon and name per project, each linking to that project's own technology page. The project list sits outside
// the area link (nested <a> tags are invalid HTML), as its own sibling.
function StandCard({ basket }) {
  return (
    <div className={styles.standCard} style={{ '--accent': basket.accent }}>
      <Link to={`/tech#${basket.key}`} className={styles.standCardLink}>
        <div className={styles.standCardHead}>
          <span className={styles.standIcon}>{iconForCatalogKey(basket.icon)}</span>
          <span className={styles.standName}>{basket.title}</span>
        </div>
        <div className={styles.standChecklist}>
          {STAGE_GROUPS.map((g, i) => {
            const done = basket.reach[i];
            const withCount = g.key === 'software' && done && basket.repoCount > 0;
            return (
              <div key={g.key} className={clsx(styles.standCheckRow, done && styles.standCheckRowDone)}>
                <span className={clsx(styles.standDot, done && styles.standDotDone)} />
                {g.label}
                {withCount && ` (${basket.repoCount} ${basket.repoCount === 1 ? 'repository' : 'repositories'})`}
              </div>
            );
          })}
        </div>
      </Link>
      {basket.projects.length > 0 && (
        <div className={styles.standProjectList}>
          {basket.projects.map((p) => (
            <Link key={p.name} to={p.tech_url} className={styles.standProjectItem}>
              <span className={styles.standProjectIcon}>{iconForCatalogKey(p.icon)}</span>
              <span className={styles.standProjectName}>{displayNameOf(p)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StandCards() {
  return (
    <div className={styles.standGrid}>
      {STAND_BASKETS.map((b) => (
        <StandCard key={b.key} basket={b} />
      ))}
    </div>
  );
}
