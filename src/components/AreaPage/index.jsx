import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import ShowcaseDiagram from '@site/src/components/ShowcaseDiagram';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { playgroundFor } from '@site/src/data/playgrounds';
import { areaTopics, topicTag } from '@site/src/data/areaStatus';
import { SHOWCASE_BASKETS, SHOWCASE_STATUS, FEATURE_STATUS } from '@site/src/data/showcases';
import { BASKETS, ICON_CATALOG, projectsInBasket, techLabelOf, projectBySlug, isTestbed, isValidationTool, PROJECT_TYPES, typeOf } from '@site/src/data/baskets';
import { CATEGORIES as PROJECT_CATEGORIES } from '@site/src/pages/reference-tools';
import boxStyles from '@site/src/pages/tech/index.module.css';

// One area (taxonomy basket) page. An area with content in showcases.js gets the full page; any other area
// gets the same layout and its projects, with its "Application showcases" part marked in preparation.
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
              <b>{techLabelOf(p)}</b>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const DOT = { yes: styles.dotYes, partial: styles.dotPartial, early: styles.dotPartial, incubation: styles.dotPartial, no: styles.dotNo };

function Showcase({ topic }) {
  const s = topic.showcase;
  return (
    <article className={styles.feat} style={topic.diagram ? undefined : { gridTemplateColumns: 'minmax(0, 1fr)' }}>
      {topic.diagram && <ShowcaseDiagram name={topic.diagram} className={styles.featPic} />}
      <div className={styles.featBody}>
        <span className={`${styles.badge} ${s.status === 'available' ? styles.badgeYes : styles.badgePartial}`}>
          {SHOWCASE_STATUS[s.status]}
        </span>
        <Heading as="h4" className={styles.featTitle}>{s.title}</Heading>
        <p className={styles.muted}>{s.about}</p>
        {s.features.length > 0 && (
        <div className={styles.features}>
          <span className={styles.smallLabel}>Features</span>
          {s.features.map((f) => (
            <span key={f.name} className={styles.feature}>
              <i className={`${styles.dot} ${DOT[f.status]}`} aria-hidden="true" />
              {f.name} <em>{FEATURE_STATUS[f.status]}</em>
            </span>
          ))}
        </div>
        )}
      </div>
    </article>
  );
}

// The "Application showcases" heading's icon: the Tutorials rocket (src/data/projectIcons.js).
const ROCKET = [
  'M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z',
  'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z',
  'M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0',
  'M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5',
];

// "What could come next": a wrench, things still to build.
const NOT_YET_ICON = ['M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5'];

// The four things a visitor can do with an item, each on the item's main project: learn about it, implement it,
// experiment with it in the Playgrounds, and deploy it with the Deployment Kits.
const PATHS = [
  { key: 'learn', title: 'Learn', hint: 'How it works, and the specifications',
    icon: ['M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0', 'M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0', 'M3 6l0 13', 'M12 6l0 13', 'M21 6l0 13'] },
  { key: 'implement', title: 'Implement', hint: 'The project’s Software Accelerator tools',
    icon: ['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16'] },
  { key: 'experiment', title: 'Experiment', hint: 'Try it in the Playgrounds',
    icon: ['M7 4v16l13 -8l-13 -8'] },
  { key: 'deploy', title: 'Deploy', hint: 'Deployment Kits for your product',
    icon: ['M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z', 'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z', 'M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0', 'M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5'] },
];

// Where each action goes. Experiment opens the Playgrounds and Deploy opens the Deployment Kits.
function pathTargets(project, topic) {
  if (!project) return {};
  return {
    learn: topic.learn || project.tech_url,
    implement: project.doc_url,
    experiment: playgroundFor(topic.project)?.href || '/playgrounds',
    deploy: '/kits',
  };
}

function Paths({ topic }) {
  const project = projectBySlug(topic.project);
  const to = pathTargets(project, topic);
  return (
    <nav className={styles.paths} aria-label={`${topic.title}: what would you like to do?`}>
      <p className={styles.pathsTitle}>What would you like to do?</p>
      {project && (
        <p className={styles.pathsProject}>
          Main project: <b>{topic.projectLabel || techLabelOf(project)}</b>
        </p>
      )}
      <div className={styles.pathGrid}>
        {PATHS.map((p) => {
          const inner = (
            <>
              <span className={styles.pathIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {p.icon.map((d) => <path key={d} d={d} />)}
                </svg>
              </span>
              <span className={styles.pathText}>
                <b>{p.title}</b>
                <span className={styles.pathHint}>{to[p.key] ? p.hint : 'In preparation'}</span>
              </span>
              {to[p.key] && <span className={styles.pathArrow} aria-hidden="true">→</span>}
            </>
          );
          return to[p.key] ? (
            <Link key={p.key} className={styles.path} to={to[p.key]}>{inner}</Link>
          ) : (
            <span key={p.key} className={`${styles.path} ${styles.pathOff}`} aria-disabled="true">{inner}</span>
          );
        })}
      </div>
    </nav>
  );
}

// One item's place in the Reference Tools, as a coloured pill.
const PILL = { no: styles.pillNo, partial: styles.pillPartial, early: styles.pillPartial, incubation: styles.pillPartial, unknown: styles.pillUnknown, yes: styles.pillYes };

// What cannot be built yet under one topic: a card per item, saying what it would need.
function NotYetGroup({ topic }) {
  return (
    <div className={styles.notYetGroup}>
      <h3 className={styles.notYetTopic}>
        <span className={styles.notYetTopicIcon}><Icon id={topic.id} iconKey={topic.icon} size={20} /></span>
        {topic.title}
      </h3>
      <ul className={styles.notYetGrid}>
        {topic.pipeline.map((p) => (
          <li key={p.title} className={styles.notYetCard}>
            <span className={styles.notYetTitle}>{p.title}</span>
            <span className={styles.notYetNeeds}>
              <b>Needs:</b> {p.needs || <em>a feature still to be identified</em>}
            </span>
            {p.needs && (
              <span className={`${styles.notYetPill} ${PILL[p.status] || styles.pillUnknown}`}>
                In the Reference Tools: {FEATURE_STATUS[p.status]}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// The heading of one of the two groups of a solution page: Available, then Incubation.
function GroupHead({ id, tag, count }) {
  const available = tag === 'available';
  return (
    <div className={`${styles.groupHead} ${available ? styles.groupAvailable : styles.groupIncubation}`}>
      <div className="container">
        <Heading as="h2" id={id} className={styles.groupTitle}>
          <span className={styles.groupDot} aria-hidden="true" />
          {available ? 'Available' : 'Incubation'}
          {count > 0 && <span className={styles.groupCount}>{count} {count === 1 ? 'topic' : 'topics'}</span>}
        </Heading>
        <p className={styles.groupText}>
          {available
            ? 'Topics you can work with today, using the Reference Tools of the Media Connectivity Software Accelerator. A feature that is still in incubation says so.'
            : 'Topics the association is exploring. Each one shows what is in place and what it still needs to become available.'}
        </p>
      </div>
    </div>
  );
}

// The hero animation of each area that has no `heroDiagram` in showcases.js (scripts/area-heroes.py draws them).
const AREA_HERO = {
  rtc: 'rtc',
  'broadcast-multicast': 'bcast',
  ntn: 'ntn',
  'immersive-media': 'imm',
  'connected-media-production': 'prod',
};

const PLACEHOLDER_LEAD = 'The application showcases for this area are in preparation. The projects below show where the work stands today.';

export default function AreaPage({ basketKey }) {
  const basket = BASKETS.find((b) => b.key === basketKey);
  const content = Object.values(SHOWCASE_BASKETS).find((c) => c.basket === basketKey);
  const icon = ICON_CATALOG[basket.icon] || [];
  // An area with no project yet but its own stage shows itself, as /tech's chart does.
  const own = projectsInBasket(basketKey);
  const projects = own.length ? own : basket.stages && basket.tech_url
    ? [{ name: basket.title, icon: basket.icon, tech_url: basket.tech_url, stages: basket.stages }] : [];
  // The area's box as on the Reference Tools page (its colour band only, not its description), holding the
  // same tiles as the topic buttons: icon and name, each opening the project's Technology page. An area
  // with no box there (Towards 6G Media) keeps the small row.
  const category = PROJECT_CATEGORIES.find((c) => c.title === basket.title);
  const topics = content?.topics || [];
  const groups = areaTopics(basketKey);
  const heroDiagram = content?.heroDiagram || AREA_HERO[basketKey];
  const lead = content?.lead || PLACEHOLDER_LEAD;
  const renderTopic = (t, i) => (
    <section key={t.id} className={`${styles.topic} ${i % 2 ? styles.topicAlt : ''}`}>
      <div className="container">
        <div className={styles.topicHead}>
          <span className={styles.topicIcon}><Icon id={t.id} iconKey={t.icon} size={26} /></span>
          <Heading as="h3" id={t.id} className={styles.topicTitle}>{t.title}</Heading>
        </div>
        {t.showcase ? <Showcase topic={t} /> : (
          <p className={styles.muted}>
            {t.pipeline?.length
              ? 'This topic is still open for the Reference Tools. What it would need is listed under What could come next, below.'
              : 'No showcase for this topic yet.'}
          </p>
        )}
        {topicTag(t) === 'incubation' && !t.showcase && t.pipeline?.length > 0 ? (
          <a className={styles.incubation} href="#what-could-come-next">Incubation</a>
        ) : (
          <Paths topic={t} />
        )}
      </div>
    </section>
  );
  return (
    <Layout
      title={content?.seoTitle || basket.title}
      description={content?.description || `${basket.title}: what The Media Connectivity Association members are building in this area, and the projects behind it.`}
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
          {heroDiagram ? (
            <ShowcaseDiagram name={heroDiagram} className={styles.heroPic} />
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
      <section className={styles.startBand} aria-labelledby="start-here">
        <div className={`container ${styles.startRow}`}>
          <span className={styles.startPill}>Start here</span>
          <div className={styles.startText}>
            <Heading as="h2" id="start-here" className={styles.startTitle}>This is the starting point</Heading>
            <p>
              Solutions are where every visit begins. Pick a topic below, then follow Learn, Implement, Experiment and
              Deploy. <b>Available</b> topics work with the Reference Tools today; <b>Incubation</b> topics are being explored.
            </p>
          </div>
          <nav className={styles.startLegend} aria-label="Jump to a group of topics">
            {groups.available.length > 0 && (
              <a href="#available" className={`${styles.legendChip} ${styles.legendAvailable}`}>
                <span className={styles.groupDot} aria-hidden="true" /> Available <b>{groups.available.length}</b>
              </a>
            )}
            <a href="#incubation" className={`${styles.legendChip} ${styles.legendIncubation}`}>
              <span className={styles.groupDot} aria-hidden="true" /> Incubation <b>{groups.written ? groups.incubation.length : 'in preparation'}</b>
            </a>
          </nav>
        </div>
      </section>
      <main>
        {/* The projects sit in their own band, apart from the hero above and what follows. */}
        <section className={styles.projectBand}>
          <div className="container">
            {category && projects.length > 0 ? (
              <div className={`${boxStyles.categoryCard} ${styles.projectBox}`}>
                <div className={boxStyles.categoryHeader} style={{ '--accent': category.accent || 'var(--ifm-color-primary)' }}>
                  <h2 className={boxStyles.categoryTitle}>Projects in this area</h2>
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
                      <b>{techLabelOf(p)}</b>
                      {(isTestbed(p) || isValidationTool(p)) && <span className={styles.tileTag}>{PROJECT_TYPES[typeOf(p)]}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              projects.length > 0 && <ProjectRow projects={projects} />
            )}
          </div>
        </section>
        {/* The topic buttons, by tag. With a single topic, its own heading opens the part and there are no buttons. */}
        {topics.length > 1 && (
          <div className="container">
            <div className={`${styles.topicHead} ${styles.useCasesHead}`}>
              <span className={styles.topicIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ROCKET.map((d) => <path key={d} d={d} />)}
                </svg>
              </span>
              <Heading as="h2" id="application-showcases" className={styles.topicTitle}>Topics in this solution</Heading>
            </div>
            {[['available', 'Available', groups.available], ['incubation', 'Incubation', groups.incubation]]
              .filter(([, , list]) => list.length > 0)
              .map(([tag, label, list]) => (
                <div key={tag} className={styles.tileGroup}>
                  <span className={`${styles.tileGroupLabel} ${tag === 'available' ? styles.legendAvailable : styles.legendIncubation}`}>
                    <span className={styles.groupDot} aria-hidden="true" /> {label}
                  </span>
                  <nav className={styles.tiles} aria-label={`${label} topics`}>
                    {list.map((t) => (
                      <Link key={t.id} className={styles.tile} to={`#${t.id}`}>
                        <span className={styles.tileIcon}><Icon id={t.id} iconKey={t.icon} /></span>
                        <b>{t.title}</b>
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
          </div>
        )}
        {groups.available.length > 0 && <GroupHead id="available" tag="available" count={groups.available.length} />}
        {groups.available.map((t, i) => renderTopic(t, i))}
        {(groups.incubation.length > 0 || !groups.written) && (
          <GroupHead id="incubation" tag="incubation" count={groups.incubation.length} />
        )}
        {groups.incubation.map((t, i) => renderTopic(t, groups.available.length + i))}
        {/* What cannot be built yet, gathered from every topic, with the call to join and contribute. */}
        {topics.some((t) => t.pipeline.length > 0) && (
          <section className={`${styles.topic} ${topics.length % 2 ? styles.topicAlt : ''}`}>
            <div className="container">
              <div className={styles.topicHead}>
                <span className={styles.topicIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {NOT_YET_ICON.map((d) => <path key={d} d={d} />)}
                  </svg>
                </span>
                <Heading as="h2" id="what-could-come-next" className={styles.topicTitle}>What could come next</Heading>
              </div>
              <p className={styles.notYetLead}>
                Ideas for what could be built next in this area. Each builds on features that the Reference Tools
                could add, or that are still being specified.
              </p>
              {topics.filter((t) => t.pipeline.length > 0).map((t) => (
                <NotYetGroup key={t.id} topic={t} />
              ))}
              <div className={boxStyles.inviteBlock}>
                <h3 className={boxStyles.inviteTitle}>Want to help build one of these?</h3>
                <p className={boxStyles.inviteBody}>
                  5G-MAG&apos;s members decide what the Reference Tools do next. Join to bring your topic, or contribute the missing features.
                </p>
                <div className={boxStyles.inviteLinks}>
                  <Link to="/membership#request-membership" className={boxStyles.inviteLink}>Join 5G-MAG &rarr;</Link>
                  <Link to="/contributing" className={boxStyles.inviteLink}>Contribute to the Reference Tools &rarr;</Link>
                </div>
              </div>
            </div>
          </section>
        )}
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
                <Heading as="h2" id="application-showcases" className={styles.topicTitle}>Application showcases</Heading>
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
      <JoinTheEffort alt variant="tool" />
    </Layout>
  );
}
