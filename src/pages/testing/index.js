import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import styles from '../tech/index.module.css';

const INTEROP_ICON_PATH = (
  <>
    <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5" />
    <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5" />
    <path d="M3 21l2.5 -2.5" />
    <path d="M18.5 5.5l2.5 -2.5" />
    <path d="M10 11l-2 2" />
    <path d="M13 14l-2 2" />
  </>
);

// Sourced from the grey "motivation" strip on the 5G-MAG Portfolio Slides
// (slide 13: "Validation, Interop Plugfests, Demos and Applications"), not
// the dark-card row below it — "End-to-End Demos and Use Cases" / "Interop
// Events and Plugfests" / "Showcase at Industry Events and Trials" is the
// real section content, not motivation framing.
const PILLARS = [
  {
    title: 'Make value proposition tangible to the industry',
    body: 'Working demonstrations that show what a specification enables, not just what it says on paper.',
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
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
    ),
  },
  {
    title: 'Interoperability through early testing and plugfests',
    body: 'Shared reference code means plugfests test real interoperability from day one, instead of every participant starting from scratch.',
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
        <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
      </svg>
    ),
  },
  {
    title: 'Supporting application development and trials',
    body: 'Reference tools and testbeds that let application developers build and trial real products on top of proven implementations.',
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
        <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
      </svg>
    ),
  },
];

export default function Testing() {
  return (
    <Layout
      title="Interop & Testing"
      description="Plugfests and demonstrators to prove 5G-MAG implementations and value."
    >
      <HubHero
        title="Validation, Interop Plugfests, Demos and Applications"
        icon={INTEROP_ICON_PATH}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">From specifications to code, and from code to deployments and products.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Interop & Testing</h2>
            <p className={styles.sectionSubtitle}>
              Making the value proposition tangible to the industry — through interoperability,
              early testing and plugfests, and supporting application development and trials.
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

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Out in the field</h2>
            <p className={styles.sectionSubtitle}>
              End-to-end demos and showcases at industry events and trials — user-facing
              demonstrations that abstract technical complexity, promoting and demonstrating value,
              not just specs.
            </p>
            <div className={styles.photoGrid}>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src="/assets/images/gallery/5g-broadcast-plugfest-2026.jpg"
                  alt="5G Broadcast Plugfest 2026, hosted by Fraunhofer FOKUS in Berlin"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  5G Broadcast Plugfest 2026 — hosted by Fraunhofer FOKUS, Berlin.
                </p>
              </figure>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src="/assets/images/gallery/tradeshow-booth-demo.jpg"
                  alt="5G-MAG trade show booth demonstrating 5G Media Streaming and 5G Broadcast"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  World&apos;s first public demo of 5G Media Streaming and 5G Broadcast, on the
                  show floor.
                </p>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Where this happens</h2>
            <p className={styles.sectionSubtitle} style={{ maxWidth: '640px', margin: '0 auto' }}>
              Interoperability events and plugfests, with shared code — so interop testing does not
              start from scratch each time. That work is owned by the other two Software
              Accelerator sections, not hosted separately here.
            </p>
            <div className="community-tiles community-tiles--even">
              <Link to="/testbeds" className="community-tile">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 3l6 0" />
                  <path d="M10 9l4 0" />
                  <path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6" />
                </svg>
                <strong>Testbeds &amp; Evaluation Tools</strong>
                <span className="tile-desc">
                  Reproducible test environments and benchmark frameworks used to validate
                  implementations ahead of interoperability events.
                </span>
                <span className="tile-cta">Explore Testbeds &rarr;</span>
              </Link>
              <Link to="/reference-tools" className="community-tile">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 8l-4 4l4 4" />
                  <path d="M17 8l4 4l-4 4" />
                  <path d="M14 4l-4 16" />
                </svg>
                <strong>Reference Tools</strong>
                <span className="tile-desc">
                  The open, spec-compliant code that interoperability testing runs against.
                </span>
                <span className="tile-cta">Explore Reference Tools &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
