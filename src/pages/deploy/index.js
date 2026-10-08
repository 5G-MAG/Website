import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import styles from '../tech/index.module.css';
import useAnchors from '@site/src/utils/useAnchors';
import { AssetTiles } from '@site/src/components/ProjectDeploy';
import { ALL_PROJECTS, isTestbed } from '@site/src/data/baskets';
import { CATEGORIES as PROJECT_CATEGORIES, CategoryCard, topicFor } from '../reference-tools';

// Every project's Deploy page, in the Reference Tools boxes plus one for the testbeds; each card opens
// /deploy/<project>.
const toDeploy = (t) => ({ ...t, href: `/deploy/${t.href.split('/').pop()}` });
const DEPLOY_CATEGORIES = [
  ...PROJECT_CATEGORIES.map((c) => ({ ...c, topics: c.topics.map(toDeploy) })),
  { title: 'Testbeds', desc: 'Testbeds and evaluation frameworks.', topics: ALL_PROJECTS.filter((p) => isTestbed(p) && !p.parent).map(topicFor).map(toDeploy) },
].filter((c) => c.topics.length > 0);

// The package: what a product team takes away from here (the same icon as the navbar's Deploy entry).
const DEPLOY_ICON_PATH = (
  <>
    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12l0 9" />
    <path d="M12 12l-8 -4.5" />
    <path d="M16 5.25l-8 4.5" />
  </>
);

// Sourced from the grey "motivation" strip on the 5G-MAG Portfolio Slides
// (slide 13: "Validation, Interop Plugfests, Demos and Applications"), not
// the dark-card row below it — "End-to-End Demos and Use Cases" / "Interop
// Events and Plugfests" / "Showcase at Industry Events and Trials" is the
// real section content, not motivation framing.
const ACTIVITIES = [
  { title: 'End-to-End Demos and Use Cases', body: 'User-facing demonstrations that abstract technical complexity.' },
  { title: 'Interoperability Events and Plugfests', body: 'With shared code, so interop does not start from scratch at plugfests.' },
  { title: 'Showcase at Industry Events and Trials', body: 'Promotion and demonstration of value, not just specs.' },
];

// A stack: the assets.
const ASSETS_ICON = (
  <>
    <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
    <path d="M4 12l8 4l8 -4" />
    <path d="M4 16l8 4l8 -4" />
  </>
);

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

// "What You'll Find Here": demos, plugfests and the assets to onboard
// into a product. Nothing here hands off to Reference Tools or Testbeds -- that's
// the Software Accelerator's territory.
const WHATS_HERE = [
  {
    title: 'Demos',
    desc: 'Recorded plugfest and trade-show demonstrations.',
    href: '/deploy#demos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4" />
        <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z" />
      </svg>
    ),
  },
  {
    title: 'Plugfests',
    desc: 'Interoperability plugfests where reference code is tested side by side.',
    href: '/deploy#plugfests',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    ),
  },
  {
    title: 'Deployable Assets',
    desc: 'Packages, modules, Docker images and apps to onboard into your product. Coming soon.',
    href: '/deploy#assets',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ASSETS_ICON}</svg>,
  },
];

// Testing Events -- just the PlugFest today, structured to hold more cards
// as future testing events are added.
const TESTING_EVENTS = [
  {
    title: '5G Broadcast PlugFest 2026',
    body: 'Multi-vendor interoperability testing against ETSI TS 103 720, hosted by Fraunhofer FOKUS in Berlin.',
    href: '/deploy/5g-broadcast-plugfest',
  },
];

function ActivityCard({ title, desc, href, icon: cardIcon }) {
  return <HubDestinationCard icon={cardIcon} title={title} desc={desc} href={href} />;
}

// Same calendar icon as /events (EVENTS_ICON_PATH there) -- a testing
// event is an event, no need for a different icon per entry.
const TESTING_EVENT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M16 3l0 4" />
    <path d="M8 3l0 4" />
    <path d="M4 11l16 0" />
    <path d="M8 15h2v2h-2l0 -2" />
  </svg>
);

function ActionEventCard({ title, body, href }) {
  return <HubDestinationCard icon={TESTING_EVENT_ICON} title={title} desc={body} href={href} linkLabel="Read more" />;
}

function DemosSection() {
  useAnchors('demos');
  const videos = youtubePlaylists.demos?.videos || [];
  if (!videos.length) return null;

  return (
    <section id="demos" className={`${styles.section} ${styles.sectionAlt}`} style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '0.2rem' }}>
              Demos
            </h2>
            <p className={styles.sectionSubtitle} style={{ textAlign: 'left', margin: 0 }}>
              Recordings of plugfest and trade-show demos
            </p>
          </div>
          <Link to="/videos" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            Browse all 5G-MAG videos &rarr;
          </Link>
        </div>
        <VideoGrid videos={videos} kicker="Demo" />
      </div>
    </section>
  );
}

function AssetsSection() {
  useAnchors('assets');
  return (
    <section id="assets" className={`${styles.section} ${styles.sectionAlt}`} style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Deployable Assets</h2>
        <p className={styles.sectionSubtitle}>
          What you can onboard into your product, project by project. Coming soon.
        </p>
        <AssetTiles />
        <div className={styles.categoryColumns} style={{ marginTop: '2rem' }}>
          {DEPLOY_CATEGORIES.map((c) => (
            <CategoryCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Deploy() {
  useAnchors('plugfests');
  const plugfestImg = useBaseUrl('/assets/images/gallery/5g-broadcast-plugfest-2026.jpg');
  const tradeshowImg = useBaseUrl('/assets/images/gallery/tradeshow-booth-demo.jpg');
  return (
    <Layout
      title="Deploy"
      description="Demos, interop plugfests and deployable assets to onboard 5G-MAG technology into products."
    >
      <HubHero
        title="Deploy"
        icon={DEPLOY_ICON_PATH}
        actions={[
          <a key="demos" className="button button--primary" href="#demos">
            See Demos
          </a>,
          <a key="plugfests" className="button button--outline button--primary" href="#plugfests">
            Plugfests
          </a>,
          <a key="assets" className="button button--outline button--primary" href="#assets">
            Deployable Assets
          </a>,
        ]}
      />

      <main>
        {/* What You'll Find Here, Out in the field, Demonstrators and
            Testing Events -- the actual browsable destinations, moved
            ahead of the framing sections below (2026-08-26 findability
            pass) so a visitor reaches real content without scrolling
            past "Why It Matters" first every time. */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What You&apos;ll Find Here</h2>
            <p className={styles.sectionSubtitle}>
              From the Reference Tools to your products: see them demonstrated, tested at
              plugfests, and onboard them. To run the tools yourself, see the <Link to="/tutorials">Tutorials</Link>.
            </p>
            <div className={styles.activityGrid}>
              {WHATS_HERE.map((r) => (
                <ActivityCard key={r.href} {...r} />
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters -- ahead of the full Out in the field/Demos/Testing
            Events content below (2026-08-26: raised directly, "cards,
            then motivation, then the full topics for easy access, then
            maybe examples and videos"). */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why It Matters</h2>
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
            {/* What that means in practice: the three activity cards of the General
                Deck's "Validation, Interop Plugfests, Demos and Applications" slide. */}
            <p className={styles.sectionSubtitle} style={{ marginTop: '2rem' }}>
              Specifications to code. Code to deployments.
            </p>
            <div className="community-tiles community-tiles--even">
              {ACTIVITIES.map((a) => (
                <div key={a.title} className="community-tile">
                  <strong>{a.title}</strong>
                  <span className="tile-desc">{a.body}</span>
                </div>
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
                  <Link to="/deploy/5g-broadcast-plugfest">5G Broadcast Plugfest 2026</Link> —
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

        {/* Plugfests */}
        <section
          id="plugfests"
          className={styles.section}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>Plugfests</h2>
            <p className={styles.sectionSubtitle}>
              Multi-vendor interoperability events where 5G-MAG reference code is tested side by
              side with other implementations.
            </p>
            <div className={styles.pillarGrid3}>
              {TESTING_EVENTS.map((e) => (
                <ActionEventCard key={e.href} {...e} />
              ))}
            </div>
          </div>
        </section>

        <AssetsSection />

        <JoinTheEffort />
      </main>
    </Layout>
  );
}
