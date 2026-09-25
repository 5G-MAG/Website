import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import { ChartRow, iconForCatalogKey } from '@site/src/components/ProjectStatus';
import {
  BASKET_ACCENT,
  BASKETS,
  PROJECTS,
  STAGE_GROUPS,
} from '@site/src/data/baskets';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';

// A handful of the most recent Technology Exchange sessions -- the full
// gallery (grouped by session, with intro text) lives at /tech/exchanges.
const TECHNOLOGY_EXCHANGES_FEATURED = (youtubePlaylists.technologyExchange?.videos || []).slice(0, 6);

// ChartRow (the swimlane roadmap bar -- design language directly
// requested: DVB's own workplan-overview roadmap at dvb.org) and
// iconForCatalogKey now live in src/components/ProjectStatus, shared with
// each project's own /tech page (2026-09-27, raised directly: "use
// exactly what's already in tech" rather than a second status widget).

// AI Traffic Characterization's own basket is "testbeds" (it is
// fundamentally a testbed), but its analysis lives on /tech/6g under
// Towards 6G Media, the same override techTopics.js's BASKET_OVERRIDES
// applies for that page's nav grouping -- without it this row would have
// no member project and vanish from the chart entirely.
const STAGE_BASKET_ROWS = BASKETS.map((b) => ({
  ...b,
  projects: PROJECTS.filter(
    (p) => p.stages && (p.basket === b.key || (b.key === 'towards-6g' && p.name === 'AI Traffic Characterization'))
  ),
})).filter((b) => b.projects.length > 0);

function StageTable({ projects, accent }) {
  return (
    <div className={styles.chartGroupRows} style={{ '--accent': accent }}>
      {projects.map((p) => (
        <ChartRow key={p.name} project={p} />
      ))}
    </div>
  );
}

// Sourced from the grey "motivation" strip on the 5G-MAG Portfolio Slides
// (slide 6: "Explainers and Profiles of Standards Specifications"), not the
// dark-card row below it — "Profiles and Blueprints" / "Tech Documentation
// and Explainers" is the real section content, not motivation framing.
const PILLARS = [
  {
    title: 'Specification analysis for real-world applications',
    body: 'Technical Analysis breaks specification text down into what it actually means for a working deployment.',
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

export default function Home() {
  return (
    <Layout
      title="Technical Docs and Standards Work"
      description="Specification analysis, implementation explainers and standards feedback work from 5G-MAG members, organised by technology area."
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
          <a key="docs" className="button button--primary" href="#where-we-stand">
            Documentation
          </a>,
        ]}
      />

      <main>
        {/* Why It Matters -- why this hub exists, first thing after the hero.
            No longer paired with a "How This Fits Together" section
            (removed: that Standards -> Analysis -> Tools -> Applications
            chain duplicated /about's "Running the Loop: From Requirements to
            Products", which already covers it with its own
            StandardsLoopDiagram). */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why It Matters</h2>
            <p className={styles.sectionSubtitle}>
              Understand it. Prove its value. Scale it. Resources produced by 5G-MAG members —
              covering the full cycle from reading a spec to shaping the next one.
            </p>
            <div className={styles.pillarGrid3}>
              {PILLARS.map((p) => (
                <div key={p.title} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{p.icon}</div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  {p.body && <p className={styles.pillarBody}>{p.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where We Stand -- this hub's real "what's here" surface
            (raised directly: drop the old "What You'll Find Here" card
            grid entirely and go straight into this instead, since every
            row already links to that project's own Documentation,
            Specifications and Reference Tools -- per-project, not
            per-resource-type; the separate "Analysis & Explainers" topic
            grid this used to sit alongside was removed for the same
            reason, raised directly, once this chart covered the same
            ground). See STAGE_BASKET_ROWS' own comment. */}
        <section
          id="where-we-stand"
          className={styles.section}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>Where We Stand</h2>
            <p className={styles.sectionSubtitle}>What we are working on, and how far along it is.</p>
            {STAGE_BASKET_ROWS.map((b) => {
              const accent = BASKET_ACCENT[b.key] || '#00a0d2';
              return (
                <div
                  key={b.key}
                  id={b.key}
                  className={styles.basketBlock}
                  style={{ '--accent': accent }}
                >
                  <div className={styles.basketHeader}>
                    {iconForCatalogKey(b.icon) && (
                      <span className={styles.basketIcon}>{iconForCatalogKey(b.icon)}</span>
                    )}
                    <div>
                      <h3 className={styles.basketTitle}>{b.title}</h3>
                      {/* Landing here straight from a homepage anchor link
                          (StandCard) should not require scrolling up to
                          find out what the coloured bars mean, or which
                          part of the row to click -- raised directly:
                          "when jumping to the anchor you know exactly
                          where you are... very clear that the next step
                          is to go to the project page". */}
                      <p className={styles.basketMeta}>
                        {b.projects.length} {b.projects.length === 1 ? 'project' : 'projects'} —
                        click a project&apos;s name to open its own page
                      </p>
                    </div>
                  </div>
                  {/* The stage-name legend, repeated inside every basket
                      block instead of once at the top of the whole section
                      (raised directly: arriving via an anchor used to skip
                      past the one shared legend, leaving the bars
                      unexplained) -- shares chartRow's own grid so each
                      label lines up exactly above its own column, same
                      mechanism the original single shared axis used. */}
                  <div className={styles.basketLegend}>
                    <div className={styles.basketLegendLabelCol}>Technology Area</div>
                    <div className={styles.basketLegendStages}>
                      {STAGE_GROUPS.map((s) => (
                        <span key={s.key} className={styles.basketLegendStage}>
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <StageTable projects={b.projects} accent={accent} />
                </div>
              );
            })}
            <div className={styles.inviteBlock}>
              <h3 className={styles.inviteTitle}>Don&apos;t see your topic here?</h3>
              <p className={styles.inviteBody}>5G-MAG&apos;s members set this landscape.</p>
              <div className={styles.inviteLinks}>
                <Link to="/membership#request-membership" className={styles.inviteLink}>
                  Propose a topic as a member &rarr;
                </Link>
                <Link to="/contributing" className={styles.inviteLink}>
                  See how to build together &rarr;
                </Link>
              </div>
            </div>
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
            <Link to="/tech/glossary">Glossary</Link>
            {' · '}
            <Link to="/tech/3gpp-work-items">3GPP Work Items per Release</Link>
          </p>
        </div>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
