import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import ShowcaseDiagram from '@site/src/components/ShowcaseDiagram';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { SHOWCASE_BASKETS, SHOWCASE_STATUS, FEATURE_STATUS } from '@site/src/data/showcases';
import { BASKETS, ICON_CATALOG, projectsInBasket, displayNameOf } from '@site/src/data/baskets';
import { CATEGORIES as PROJECT_CATEGORIES } from '@site/src/pages/reference-tools';
import boxStyles from '@site/src/pages/tech/index.module.css';

// One area (taxonomy basket) page. An area with content in showcases.js gets the full page; any other area
// gets the same layout and its projects, with its "What you can build" part marked in preparation.
import styles from './styles.module.css';


const ICONS = {
  insight: (
    <>
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </>
  ),
  quality: <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />,
  cdn: (
    <>
      <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
      <path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
      <path d="M7 8l0 .01" />
      <path d="M7 16l0 .01" />
    </>
  ),
  // Live contribution: the video camera, the Connected Media Production area's own icon.
  contribution: (
    <>
      <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
      <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
    </>
  ),
};

// A topic's icon: its own shape above, or a catalog icon named by the topic (`icon` in showcases.js).
function Icon({ id, iconKey, size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[id] || (ICON_CATALOG[iconKey] || []).map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

function ProjectRow({ projects }) {
  return (
    <div className={styles.projects}>
      <span className={styles.smallLabel}>Projects in this area</span>
      <div className={styles.projectChips}>
        {projects.map((p) => (
          <Link key={p.name} className={styles.projectChip} to={p.tech_url}>
            <span className={styles.tileIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {(ICON_CATALOG[p.icon] || []).map((d) => <path key={d} d={d} />)}
              </svg>
            </span>
            <span>
              <b>{displayNameOf(p)}</b>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const DOT = { yes: styles.dotYes, partial: styles.dotPartial, early: styles.dotPartial, no: styles.dotNo };

function Showcase({ topic }) {
  const s = topic.showcase;
  return (
    <article className={styles.feat}>
      <ShowcaseDiagram name={topic.diagram} className={styles.featPic} />
      <div className={styles.featBody}>
        <span className={`${styles.badge} ${s.status === 'available' ? styles.badgeYes : styles.badgePartial}`}>
          {SHOWCASE_STATUS[s.status]}
        </span>
        <Heading as="h3" className={styles.featTitle}>{s.title}</Heading>
        <p className={styles.muted}>{s.about}</p>
        <div className={styles.features}>
          <span className={styles.smallLabel}>Features</span>
          {s.features.map((f) => (
            <span key={f.name} className={styles.feature}>
              <i className={`${styles.dot} ${DOT[f.status]}`} aria-hidden="true" />
              {f.name} <em>{FEATURE_STATUS[f.status]}</em>
            </span>
          ))}
        </div>
        {/* only a showcase that is available can be tried; an early-stage one shows no button */}
        {s.status === 'available' && s.tutorial && !s.tutorial.inPreparation && (
          <div className={styles.tutorial}>
            <Link className="button button--primary" to={s.tutorial.to}>Try it →</Link>
          </div>
        )}
      </div>
    </article>
  );
}

function Pipeline({ items }) {
  return (
    <div className={styles.pipe}>
      <span className={styles.smallLabel}>Also possible</span>
      <ul className={styles.plist}>
        <li className={styles.phead} aria-hidden="true">
          <span>What you could build</span>
          <span>Needs</span>
          <span>In the Reference Tools</span>
        </li>
        {items.map((p) => (
          <li key={p.title}>
            <span className={styles.pname}>{p.title}</span>
            {p.needs ? <span className={styles.muted}>{p.needs}</span> : <span className={styles.tbd}>Feature to be identified</span>}
            <span className={styles.pstatus}>{p.needs ? FEATURE_STATUS[p.status] : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The "What you can build" heading's icon: the Application Showcases rocket (src/data/projectIcons.js).
const ROCKET = [
  'M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z',
  'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z',
  'M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0',
  'M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5',
];

const PLACEHOLDER_LEAD = 'What you can build in this area is in preparation. The projects below show where the work stands today.';

export default function AreaPage({ basketKey }) {
  const basket = BASKETS.find((b) => b.key === basketKey);
  const content = Object.values(SHOWCASE_BASKETS).find((c) => c.basket === basketKey);
  const icon = ICON_CATALOG[basket.icon] || [];
  // An area with no project yet but its own stage (Towards 6G Media) shows itself, as /tech's chart does.
  const own = projectsInBasket(basketKey);
  const projects = (own.length ? own : basket.stages && basket.tech_url
    ? [{ name: basket.title, icon: basket.icon, tech_url: basket.tech_url, stages: basket.stages }] : []);
  // The area's box as on the Reference Tools page (its colour band only, not its description), holding the
  // same tiles as the topic buttons: icon and name, each opening the project's Technology page. An area
  // with no box there (Towards 6G Media) keeps the small row.
  const category = PROJECT_CATEGORIES.find((c) => c.title === basket.title);
  const topics = content?.topics || [];
  const lead = content?.lead || PLACEHOLDER_LEAD;
  return (
    <Layout
      title={basket.title}
      description={content?.description || `${basket.title}: what 5G-MAG members are building in this area, and the projects behind it.`}
    >
      <header className={styles.hero}>
        <div className={`container ${styles.heroIn}`}>
          <div>
            <span className={styles.kicker}>
              <span className={styles.kickerIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icon.map((d) => <path key={d} d={d} />)}
                </svg>
              </span>
              {basket.title}
            </span>
            <Heading as="h1" className={styles.heroTitle}>{content?.headline || basket.title}</Heading>
            {lead.split(/\n\s*\n/).map((para) => (
              <p key={para} className={styles.heroLead}>{para}</p>
            ))}
          </div>
          {content?.heroDiagram ? (
            <ShowcaseDiagram name={content.heroDiagram} className={styles.heroPic} />
          ) : (
            // Where the area's diagram will go: its icon, marked as a placeholder.
            <div className={styles.heroPlaceholder} aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="88" height="88" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {icon.map((d) => <path key={d} d={d} />)}
              </svg>
              <span>Placeholder</span>
            </div>
          )}
        </div>
      </header>
      <main>
        {/* The projects sit in their own band, apart from the hero above and what follows. */}
        <section className={styles.projectBand}>
          <div className="container">
            {category && projects.length > 0 ? (
              <div className={`${boxStyles.categoryCard} ${styles.projectBox}`}>
                <div className={boxStyles.categoryHeader} style={{ '--accent': category.accent || 'var(--ifm-color-primary)' }}>
                  <h3 className={boxStyles.categoryTitle}>Projects in this area</h3>
                </div>
                <div className={styles.projectTiles}>
                  {projects.map((p) => (
                    // The same tile as the topic buttons below: icon and name.
                    <Link key={p.name} className={styles.tile} to={p.tech_url}>
                      <span className={styles.tileIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {(ICON_CATALOG[p.icon] || []).map((d) => <path key={d} d={d} />)}
                        </svg>
                      </span>
                      <b>{displayNameOf(p)}</b>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              projects.length > 0 && <ProjectRow projects={projects} />
            )}
          </div>
        </section>
        {/* With a single topic, its own heading opens the part; the outer heading and buttons are for two or more. */}
        {topics.length > 1 && (
          <div className="container">
            <div className={`${styles.topicHead} ${styles.useCasesHead}`}>
              <span className={styles.topicIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ROCKET.map((d) => <path key={d} d={d} />)}
                </svg>
              </span>
              <Heading as="h2" id="what-you-can-build" className={styles.topicTitle}>What you can build</Heading>
            </div>
            <nav className={styles.tiles} aria-label="Topics">
              {topics.map((t) => (
                <Link key={t.id} className={styles.tile} to={`#${t.id}`}>
                  <span className={styles.tileIcon}><Icon id={t.id} iconKey={t.icon} /></span>
                  <b>{t.title}</b>
                </Link>
              ))}
            </nav>
          </div>
        )}
        {topics.map((t, i) => (
          <section key={t.id} className={`${styles.topic} ${i % 2 ? styles.topicAlt : ''}`}>
            <div className="container">
              <div className={styles.topicHead}>
                <span className={styles.topicIcon}><Icon id={t.id} iconKey={t.icon} size={26} /></span>
                <Heading as="h2" id={t.id} className={styles.topicTitle}>{t.title}</Heading>
              </div>
              {t.showcase ? <Showcase topic={t} /> : <p className={styles.muted}>Nothing to try yet in the Reference Tools.</p>}
              {t.pipeline.length > 0 && <Pipeline items={t.pipeline} />}
            </div>
          </section>
        ))}
        {topics.length === 0 && (
          // The same place this part takes on a finished area page, marked as in preparation.
          <section className={styles.topic}>
            <div className="container">
              <div className={styles.topicHead}>
                <span className={styles.topicIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ROCKET.map((d) => <path key={d} d={d} />)}
                  </svg>
                </span>
                <Heading as="h2" id="what-you-can-build" className={styles.topicTitle}>What you can build</Heading>
              </div>
              <div className={styles.placeholderGrid}>
                {[1, 2, 3].map((n) => (
                  <div key={n} className={styles.placeholderCard}>
                    <span className={styles.prep}>Placeholder</span>
                    <b>In preparation</b>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <JoinTheEffort alt />
    </Layout>
  );
}
