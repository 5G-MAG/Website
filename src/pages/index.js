import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import StandardsLoopDiagram from '@site/src/components/StandardsLoopDiagram';
import MembersMarquee from '@site/src/components/MembersMarquee';
import GodeeperCard, { icon } from '@site/src/components/GodeeperCard';
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { SCOPE_TAGS } from '@site/src/data/scopeTags';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { chunk } from '@site/src/utils/chunk';
import { sampleRandom } from '@site/src/utils/random';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import releasesData from '@site/static/data/releases.json';

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
function AreaCard({ title, short, body, href, icon: cardIcon }) {
  return (
    <Link className={styles.activityCard} to={href}>
      <div className={styles.activityIconBand}>
        {icon(cardIcon)}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </div>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{body}</p>
      </div>
      <div className={styles.activityArrow}>Explore {short} &rarr;</div>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
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
            <p className={styles.sectionSubtitle}>
              We are not a standards body. We do not write specs. We translate them into things that
              run.
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            <div className="scope-marquee" style={{ marginBottom: '1.5rem' }}>
              <div className="scope-marquee-track">
                {chunk(
                  SCOPE_TAGS.filter((tag) => tag.d),
                  [3, 4, 3]
                ).map((row, rowIndex) => (
                  <div key={rowIndex} className="scope-marquee-row">
                    {row.map((tag) => (
                      <span key={tag.label} className="scope-chip">
                        {icon(<path d={tag.d} />)}
                        {tag.label}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="godeeper-grid godeeper-grid--4col">
              {SCOPE_PILLARS.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Developer Exchanges */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>See It In Action</h2>
            <p className={styles.sectionSubtitle}>
              From the people building it: recorded talks and demos from 5G-MAG members and
              contributors.
            </p>
            <VideoGrid videos={videos} />
            <div className={styles.onAirMore}>
              <Link to="/developer/exchanges">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Four pillars */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>{"Discover 5G-MAG's work"}</h2>
            <p className={styles.sectionSubtitle}>Based on open specifications, to address market needs.</p>
            <p className={styles.sectionSubtitle}>
              Together with our members we are running the loop from specifications to products —
              keeping connected media applications and network technologies open, interoperable
              and deployable at scale.
            </p>
            <StandardsLoopDiagram />

            <div className={clsx(styles.activityGrid, styles['activityGrid--4col'])}>
              {DISCOVER_WORK.map((p) => (
                <AreaCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Releases */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Latest Releases
                </h2>
                <p className={styles.releasesUpdated}>Updated: {releasesData.updated_at}</p>
              </div>
              <Link className={styles.releasesViewAll} to="/community#releases">
                View all releases &rarr;
              </Link>
            </div>
            <div className={styles.releasesGrid}>
              {releasesData.projects.slice(0, 6).map((project) => (
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
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/membership#our-members">See all members &rarr;</Link>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
