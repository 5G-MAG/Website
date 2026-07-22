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

// The kinds of real-world activity this section covers — not a hand-off to
// Testbeds or Reference Tools. Examples point back at the two photos in
// "Out in the field" above rather than naming any additional event.
const EVENT_TYPES = [
  {
    title: 'Interoperability plugfests',
    body: 'Multi-vendor events where 5G-MAG reference code is tested side by side with other implementations — like the 5G Broadcast Plugfest 2026 hosted by Fraunhofer FOKUS in Berlin, pictured above.',
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
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    ),
  },
  {
    title: 'Trade-show demos',
    body: 'Public, end-to-end demonstrations on the show floor that make a specification’s value visible to a non-technical audience — like the 5G Media Streaming and 5G Broadcast booth demo pictured above.',
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
        <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4" />
        <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z" />
      </svg>
    ),
  },
  {
    title: 'Industry trials',
    body: 'Putting implementations to work in real deployment conditions, ahead of commercial products built on the same specifications.',
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
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
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
            <p className={styles.sectionSubtitle}>
              Interoperability plugfests, trade-show demos and industry trials — proving that
              specifications work together in the real world, not just on paper.
            </p>
            <div className={styles.pillarGrid3}>
              {EVENT_TYPES.map((e) => (
                <div key={e.title} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{e.icon}</div>
                  <h3 className={styles.pillarTitle}>{e.title}</h3>
                  {e.body && <p className={styles.pillarBody}>{e.body}</p>}
                </div>
              ))}
            </div>
            <p className={styles.sectionSubtitle} style={{ marginTop: '2rem', marginBottom: 0 }}>
              The tools and testbeds shown off at these events live at{' '}
              <Link to="/reference-tools">Reference Tools</Link> and{' '}
              <Link to="/testbeds">Testbeds</Link>.
            </p>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
