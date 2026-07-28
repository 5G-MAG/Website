import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import MembersMarquee from '@site/src/components/MembersMarquee';
import { icon } from '@site/src/components/GodeeperCard';
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { EventsAgendaPreview } from '@site/src/components/EventsAgenda';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { NEWS_PREVIEW } from '@site/src/data/newsPreview';
import { sampleRandom } from '@site/src/utils/random';
import { sortByLatestRelease } from '@site/src/utils/releases';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import releasesData from '@site/static/data/releases.json';

const LATEST_RELEASE_PROJECTS = sortByLatestRelease(releasesData.projects);
const LATEST_NEWS = [...NEWS_PREVIEW].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

const VIDEO_COUNT = 5;

// A handful of the most recent Developer Exchange sessions -- shown until
// the client-side effect below swaps in a random sample, and also the
// server-rendered/first-paint set (so hydration has something stable to
// match before Math.random() is allowed to run).
const INITIAL_VIDEOS = (youtubePlaylists.developer?.videos || []).slice(0, VIDEO_COUNT);

// Every video across the entire 5G-MAG YouTube channel -- the 5 named
// category playlists plus every per-project playlist -- deduped by video
// id (some videos are cross-listed in more than one playlist).
const ALL_CHANNEL_VIDEOS = (() => {
  const categories = ['workshops', 'developer', 'publicCall', 'demos', 'technologyExchange'];
  const byId = new Map();
  for (const key of categories) {
    for (const v of youtubePlaylists[key]?.videos || []) byId.set(v.id, v);
  }
  for (const project of Object.values(youtubePlaylists.projects || {})) {
    for (const v of project.videos || []) byId.set(v.id, v);
  }
  return [...byId.values()];
})();

// A bigger, bolder invitation than the plain GodeeperCard used elsewhere
// for this same data (About's "What We Do" still uses GodeeperCard) --
// this section is Home's main gateway into the site's 4 top-level areas,
// so it gets the more prominent icon-band treatment plus an explicit
// "Explore X" call to action, matching ActivityCard/ProductTypeCard's
// styling on Tech/Standards/Developer's own "What You'll Find Here"
// sections rather than inventing a new look.
function AreaCard({ title, body, href, icon: cardIcon }) {
  return (
    <Link className={styles.activityCard} to={href}>
      <div className={styles.activityIconBand}>
        {icon(cardIcon)}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </div>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{body}</p>
      </div>
      <div className={styles.activityArrow}>Explore more &rarr;</div>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const { withBaseUrl } = useBaseUrlUtils();
  const [videos, setVideos] = useState(INITIAL_VIDEOS);

  // Client-only, after hydration: swap in a random sample from the whole
  // channel so every full page load shows a different set, without a
  // server/client markup mismatch (Math.random() can't run during SSR).
  useEffect(() => {
    setVideos(sampleRandom(ALL_CHANNEL_VIDEOS, VIDEO_COUNT));
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description="5G-MAG is the industry association bridging media and connectivity standards to working implementations, from specification analysis to open-source reference tools."
    >
      <HeroSlideshow />

      <main>
        {/* Who We Are */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              At the intersection of Media and Connectivity
            </h2>
            <p style={{ maxWidth: '760px', margin: '0 auto 1rem', lineHeight: 1.7, textAlign: 'center' }}>
              &ldquo;We are not a standards body. We do not write specs. We translate them into
              things that run.&rdquo;
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            <div className={clsx(styles.activityGrid, styles['activityGrid--4col'])}>
              {DISCOVER_WORK.map((p) => (
                <AreaCard key={p.title} {...p} />
              ))}
            </div>

            <div className={styles.onAirMore}>
              <Link to="/about">Learn more about us &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Developer Exchanges */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Work In Action</h2>
            <p className={styles.sectionSubtitle}>
              Recorded talks, demos and calls from across all of 5G-MAG&apos;s work — Developer
              Exchanges, Public Calls, workshops and more.
            </p>
            <VideoGrid videos={videos} singleRow />
            <div className={styles.onAirMore}>
              <Link to="/videos">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Latest News
                </h2>
                <p className={styles.releasesUpdated}>Announcements from 5G-MAG</p>
              </div>
              <Link className={styles.releasesViewAll} to="/news">
                View all news &rarr;
              </Link>
            </div>
            <div className="event-post-grid">
              {LATEST_NEWS.map((post) => (
                <Link key={post.href} to={post.href} className="event-post-card">
                  <img loading="lazy" src={withBaseUrl(post.image)} alt={post.title} />
                  <span className="event-post-title">{post.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Where to find us */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Where to Find Us
                </h2>
                <p className={styles.releasesUpdated}>
                  Events, conferences, workshops, webinars and calls
                </p>
              </div>
              <Link className={styles.releasesViewAll} to="/events#agenda">
                Full agenda &rarr;
              </Link>
            </div>
            <EventsAgendaPreview events={EVENTS_AGENDA} />
          </div>
        </section>

        {/* Latest Releases */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Media Connectivity Software Accelerator: Latest Releases
                </h2>
                <p className={styles.releasesUpdated}>Updated: {releasesData.updated_at}</p>
              </div>
              <Link className={styles.releasesViewAll} to="/community#releases">
                View all releases &rarr;
              </Link>
            </div>
            <div className={styles.releasesGrid}>
              {LATEST_RELEASE_PROJECTS.slice(0, 6).map((project) => (
                <ReleaseCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Members */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Members</h2>
            <p className={styles.sectionSubtitle}>
              A thriving, open community — membership is open to any organization willing to join
              the efforts.
            </p>
          </div>
          <MembersMarquee />
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
            <Link to="/membership#our-members">See all members &rarr;</Link>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
