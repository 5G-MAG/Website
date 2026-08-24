import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
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
];

// "What You'll Find Here" -- Testing only gives access to two things:
// recorded Demos and Testing Events (e.g. the PlugFest). Nothing here
// hands off to Reference Tools or Testbeds -- that's Developer's territory.
const WHATS_HERE = [
  {
    title: 'Demos',
    desc: 'Recorded plugfest and trade-show demonstrations.',
    href: '/action#demonstrators',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4" />
        <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z" />
      </svg>
    ),
  },
  {
    title: 'Testing Events',
    desc: 'Interoperability plugfests where reference code is tested side by side.',
    href: '/action#testing-events',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    ),
  },
];

// Testing Events -- just the PlugFest today, structured to hold more cards
// as future testing events are added.
const TESTING_EVENTS = [
  {
    title: '5G Broadcast PlugFest 2026',
    body: 'Multi-vendor interoperability testing against ETSI TS 103 720, hosted by Fraunhofer FOKUS in Berlin.',
    href: '/action/5g-broadcast-plugfest',
  },
];

function ActivityCard({ title, desc, href, icon: cardIcon }) {
  return (
    <Link className={styles.activityCard} to={href}>
      <div className={styles.activityIconBand}>
        {cardIcon}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </div>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{desc}</p>
      </div>
      <div className={styles.activityArrow}>View &rarr;</div>
    </Link>
  );
}

function TestingEventCard({ title, body, href }) {
  return (
    <Link to={href} className={styles.linkCard}>
      <h3 className={styles.linkCardTitle}>{title}</h3>
      <p className={styles.linkCardBody}>{body}</p>
    </Link>
  );
}

function DemosSection() {
  const videos = youtubePlaylists.demos?.videos || [];
  if (!videos.length) return null;

  return (
    <section id="demonstrators" className={`${styles.section} ${styles.sectionAlt}`} style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '0.2rem' }}>
              In Action
            </h2>
            <p className={styles.sectionSubtitle} style={{ textAlign: 'left', margin: 0 }}>
              Recordings of plugfest and trade-show demos
            </p>
          </div>
          <Link to="/videos" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            Browse all 5G-MAG videos &rarr;
          </Link>
        </div>
        <VideoGrid videos={videos} />
      </div>
    </section>
  );
}

export default function Testing() {
  const plugfestImg = useBaseUrl('/assets/images/gallery/5g-broadcast-plugfest-2026.jpg');
  const tradeshowImg = useBaseUrl('/assets/images/gallery/tradeshow-booth-demo.jpg');
  return (
    <Layout
      title="Interop & Demos"
      description="Plugfests and demonstrators to prove 5G-MAG implementations and value."
    >
      <HubHero
        title="Validation, Interop Plugfests, Demos and Applications"
        icon={INTEROP_ICON_PATH}
        actions={[
          <a key="demos" className="button button--primary" href="#demonstrators">
            See Demos In Action
          </a>,
          <a
            key="events"
            className="button button--outline button--primary"
            href="#testing-events"
          >
            Testing Events
          </a>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">From specifications to code, and from code to deployments and products.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Motivation</h2>
            <p className={styles.sectionSubtitle}>
              Making the value proposition tangible to the industry — through interoperability,
              early testing and plugfests.
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

        {/* What You'll Find Here */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What You&apos;ll Find Here</h2>
            <p className={styles.sectionSubtitle}>
              Every destination on this hub, in one place.
            </p>
            <div className={styles.activityGrid}>
              {WHATS_HERE.map((r) => (
                <ActivityCard key={r.href} {...r} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
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
                  src={plugfestImg}
                  alt="5G Broadcast Plugfest 2026, hosted by Fraunhofer FOKUS in Berlin"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  <Link to="/action/5g-broadcast-plugfest">5G Broadcast Plugfest 2026</Link> —
                  hosted by Fraunhofer FOKUS, Berlin.
                </p>
              </figure>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src={tradeshowImg}
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

        <DemosSection />

        {/* Testing Events */}
        <section id="testing-events" className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Testing Events</h2>
            <p className={styles.sectionSubtitle}>
              Multi-vendor interoperability events where 5G-MAG reference code is tested side by
              side with other implementations.
            </p>
            <div className={styles.pillarGrid3}>
              {TESTING_EVENTS.map((e) => (
                <TestingEventCard key={e.href} {...e} />
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
