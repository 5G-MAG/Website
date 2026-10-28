import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import { ChartRow, iconForCatalogKey } from '@site/src/components/ProjectStatus';
import { BASKET_ACCENT, BASKET_PAGE, STAGE_GROUPS, WHERE_WE_STAND_ROWS, displayNameOf, projectTitleOf } from '@site/src/data/baskets';
import { areaTopics } from '@site/src/data/areaStatus';
import filterStyles from '../reference-tools/styles.module.css';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import useAnchors from '@site/src/utils/useAnchors';

// A handful of the most recent Technology Exchange sessions -- the full
// gallery (grouped by session, with intro text) lives at /tech/exchanges.
const TECHNOLOGY_EXCHANGES_FEATURED = (youtubePlaylists.technologyExchange?.videos || []).slice(0, 6);

// ChartRow (the swimlane roadmap bar -- design language directly
// requested: DVB's own workplan-overview roadmap at dvb.org) and
// iconForCatalogKey now live in src/components/ProjectStatus, shared with
// each project's own /tech page (2026-09-27, raised directly: "use
// exactly what's already in tech" rather than a second status widget).

// Where We Stand's rows (one per basket) are WHERE_WE_STAND_ROWS in
// src/data/baskets.js, shared with BasketJumpRow.
const STAGE_BASKET_ROWS = WHERE_WE_STAND_ROWS;

function StageTable({ projects }) {
  return (
    <div className={styles.chartGroupRows}>
      {projects.map((p) => (
        <ChartRow key={p.name} project={p} />
      ))}
    </div>
  );
}

// Sourced from the grey "motivation" strip on the 5G-MAG Portfolio Slides
// (slide 6: "Explainers and Profiles of Standards Specifications"), not the
// dark-card row below it: "Profiles and Blueprints" / "Tech Documentation
// and Explainers" is the real section content, not motivation framing.
const PILLARS = [
  {
    title: 'Specification analysis for real-world applications',
    body: 'The Technical Analysis pages break specification text down into what it actually means for a working deployment.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    ),
  },
  {
    title: 'Making standards actionable',
    body: 'Implementation Blueprints turn that analysis into step-by-step build procedures, reused across the industry.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
        <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
        <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
        <path d="M11 6l9 0" />
        <path d="M11 12l9 0" />
        <path d="M11 18l9 0" />
      </svg>
    ),
  },
  {
    title: 'Lowering the barrier to entry',
    body: 'So engineers outside the standards process can get up to speed without reading the spec text itself.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 8l0 .01" />
        <path d="M11 12l1 0l0 4l1 0" />
      </svg>
    ),
  },
];

// One card of the "Start here" grid: the solution area, how many projects it holds and how its topics stand.
function SolutionCard({ b }) {
  const topics = areaTopics(b.key);
  const accent = BASKET_ACCENT[b.key] || '#00a0d2';
  const n = b.projects.length;
  return (
    <Link to={BASKET_PAGE[b.key] || `#${b.key}`} className={styles.solutionCard} style={{ '--accent': accent }}>
      <span className={styles.solutionHead}>
        {iconForCatalogKey(b.icon) && <span className={styles.solutionIcon}>{iconForCatalogKey(b.icon)}</span>}
        <span className={styles.solutionName}>{b.title}</span>
      </span>
      <span className={styles.solutionMeta}>{n} {n === 1 ? 'project' : 'projects'}</span>
      <span className={styles.solutionTags}>
        {topics.available.length > 0 && (
          <span className={`${styles.solutionTag} ${styles.tagAvailable}`}>Available {topics.available.length}</span>
        )}
        <span className={`${styles.solutionTag} ${styles.tagIncubation}`}>
          Incubation {topics.written ? topics.incubation.length : '(in preparation)'}
        </span>
      </span>
      <span className={styles.solutionGo}>Open the solution &rarr;</span>
    </Link>
  );
}

export default function Home() {
  useAnchors('solutions', 'projects', ...STAGE_BASKET_ROWS.map((b) => b.key));
  const [query, setQuery] = useState('');
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STAGE_BASKET_ROWS.map((b) => {
      const all = b.areaRow ? [b.areaRow] : b.projects;
      const list = q
        ? all.filter((p) => `${b.title} ${projectTitleOf(p)} ${displayNameOf(p)} ${(p.sdos || []).join(' ')} ${p.tagline || ''}`.toLowerCase().includes(q))
        : all;
      return { b, list };
    }).filter((x) => x.list.length > 0);
  }, [query]);
  const total = STAGE_BASKET_ROWS.reduce((n, b) => n + (b.areaRow ? 1 : b.projects.length), 0);
  const count = shown.reduce((n, x) => n + x.list.length, 0);
  return (
    <Layout
      title="Technical Docs and Standards Work"
      description="Technical analysis and specification tracking across streaming, immersive media, broadcast, real-time communications, production, NTN, 6G media…"
    >
      <HubHero
        title="Technology"
        icon={
          <>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
            <path d="M9 17l0 -5" />
            <path d="M12 17l0 -1" />
            <path d="M15 17l0 -3" />
          </>
        }
        actions={[
          <a key="solutions" className="button button--primary" href="#solutions">
            Start with a solution
          </a>,
          <a key="projects" className="button button--outline button--primary" href="#projects">
            Find a project
          </a>,
          <Link key="exchanges" className="button button--outline button--primary" to="/tech/exchanges">
            Technology Exchanges
          </Link>,
          <Link
            key="propose"
            className="button button--outline button--primary"
            to="/membership#request-membership"
          >
            Bring your topic or project
          </Link>,
        ]}
      />

      <main>
        {/* Start here: the solutions are the starting point of the site, so they come first and are large. */}
        <section id="solutions" className={styles.section} style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}>
          <div className="container">
            <div className={styles.startHead}>
              <span className={styles.startPill}>Start here</span>
              <h2 className={styles.startTitle}>Choose a solution</h2>
              <p className={styles.startText}>
                The solutions are the starting point. Each one shows what is Available today and what is in Incubation, and
                leads on to the technology, the tools, the Playgrounds and the kits.
              </p>
            </div>
            <div className={styles.solutionGrid}>
              {STAGE_BASKET_ROWS.map((b) => (
                <SolutionCard key={b.key} b={b} />
              ))}
            </div>
          </div>
        </section>

        {/* The one list of every project, by solution. Each project opens its own technology page. */}
        <section
          id="projects"
          className={`${styles.section} ${styles.sectionAlt}`}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>All projects</h2>
            <p className={styles.sectionSubtitle}>
              Every project, grouped by solution, with how far along it is: under study, technical analysis, software.
              Click a project&apos;s name to open its page.
            </p>
            <div className={filterStyles.filterBar}>
              <input
                type="search"
                className={filterStyles.filterInput}
                placeholder={`Filter ${total} projects by name, standards body or solution…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Filter the projects"
              />
              {query && (
                <span className={filterStyles.filterCount}>
                  {count} of {total}
                </span>
              )}
            </div>
            <nav className={styles.areaJump} aria-label="Jump to a solution">
              {STAGE_BASKET_ROWS.map((b) => (
                <a key={b.key} href={`#${b.key}`} className={styles.areaJumpLink} style={{ '--accent': BASKET_ACCENT[b.key] || '#00a0d2' }}>
                  {b.title}
                </a>
              ))}
            </nav>
            {shown.length === 0 && <p className={filterStyles.filterEmpty}>No project matches &ldquo;{query}&rdquo;.</p>}
            {shown.map(({ b, list }) => {
              // The solution's colour tints only its banner; the rows use the site's blue.
              const basketAccent = BASKET_ACCENT[b.key] || '#00a0d2';
              return (
                <div
                  key={b.key}
                  id={b.key}
                  className={styles.basketBlock}
                  style={{ '--accent': 'var(--ifm-color-primary)', scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
                >
                  <div className={styles.basketHeader} style={{ '--accent': basketAccent }}>
                    {iconForCatalogKey(b.icon) && <span className={styles.basketIcon}>{iconForCatalogKey(b.icon)}</span>}
                    <div>
                      <h3 className={styles.basketTitle}>
                        {BASKET_PAGE[b.key] ? <Link to={BASKET_PAGE[b.key]}>{b.title} →</Link> : b.title}
                      </h3>
                      <p className={styles.basketMeta}>
                        {b.areaRow
                          ? 'Technology area under study: click its name to open its page'
                          : <>{b.projects.length} {b.projects.length === 1 ? 'project' : 'projects'}</>}
                      </p>
                    </div>
                  </div>
                  <div className={styles.basketLegend}>
                    <div className={styles.basketLegendLabelCol}>Project</div>
                    <div className={styles.basketLegendStages}>
                      {STAGE_GROUPS.map((st) => (
                        <span key={st.key} className={styles.basketLegendStage}>
                          {st.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <StageTable projects={list} />
                </div>
              );
            })}
            <div className={styles.inviteBlock}>
              <h2 className={styles.inviteTitle}>Don&apos;t see your topic here?</h2>
              <p className={styles.inviteBody}>5G-MAG&apos;s members set this landscape.</p>
              <div className={styles.inviteLinks}>
                <Link to="/membership#request-membership" className={styles.inviteLink}>
                  Bring your topic or project &rarr;
                </Link>
                <Link to="/contributing" className={styles.inviteLink}>
                  See how to build together &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What a technology page gives you: three short items and where to go next. */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>From Specifications to Practice</h2>
            <p className={styles.sectionSubtitle}>
              Understand it. Prove its value. Scale it. Resources produced by 5G-MAG members, covering the full
              cycle from reading a spec to shaping the next one.
            </p>
            <div className={styles.pillarGrid3}>
              {PILLARS.map((pl) => (
                <div key={pl.title} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{pl.icon}</div>
                  <h3 className={styles.pillarTitle}>{pl.title}</h3>
                  {pl.body && <p className={styles.pillarBody}>{pl.body}</p>}
                </div>
              ))}
            </div>
            <p className={styles.sectionSubtitle} style={{ marginTop: '1.5rem' }}>
              See it built: browse the <Link to="/reference-tools">Reference Tools</Link> behind these specifications,
              evaluate them on a <Link to="/testbeds">Testbed</Link>, or follow the <Link to="/tutorials">Tutorials</Link> to run them.
            </p>
          </div>
        </section>

        {/* Technology Exchanges, featured */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Technology Exchanges</h2>
            <p className={styles.sectionSubtitle}>
              Recorded workshop talks explaining 3GPP and MPEG media specifications to industry.
            </p>
            <VideoGrid videos={TECHNOLOGY_EXCHANGES_FEATURED} />
            <div className={styles.onAirFeaturedMore}>
              <Link to="/tech/exchanges">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        {/* The 3 destinations "What You'll Find Here" used to carry that
            appear nowhere else on this page and aren't in a sidebar here
            either (this hub's root is a custom page, not a docs page, so
            the docs sidebar never renders on it) -- a plain link line
            rather than reviving a second card grid for just three items. */}
        <div className="container">
          <p className={styles.otherResourcesLine}>
            Also on this hub:{' '}
            <Link to="/tech/specifications">Specifications</Link>
            {' · '}
            <Link to="/tech/3gpp-work-items">3GPP Work Items per Release</Link>
          </p>
        </div>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
