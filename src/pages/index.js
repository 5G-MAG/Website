import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import StandardsLoopDiagram from '@site/src/components/StandardsLoopDiagram';
import MembersMarquee from '@site/src/components/MembersMarquee';
import GodeeperCard, { icon } from '@site/src/components/GodeeperCard';
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import PhotoGallery from '@site/src/components/PhotoGallery';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { SCOPE_TAGS } from '@site/src/data/scopeTags';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { chunk } from '@site/src/utils/chunk';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import releasesData from '@site/static/data/releases.json';

// A handful of the most recent Developer Exchange sessions -- the full
// gallery lives at /developer/exchanges. Plays inline (VideoGrid/VideoCard's
// "tally light" treatment, the same one used on the full video galleries)
// rather than linking through to each source page, for more visual weight on
// the homepage; "Browse the full library" below still covers cross-linking.
const DEVELOPER_EXCHANGES_FEATURED = (youtubePlaylists.developer?.videos || []).slice(0, 6);

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  // Real, existing photos -- reference tools and applications running on
  // real hardware, at real events -- not stock imagery.
  const showcasePhotos = [
    {
      src: useBaseUrl('/assets/images/gallery/reference-tools-demo-rig.jpg'),
      alt: '5G-MAG Reference Tools demo rig with SDR hardware and phones running 5GMS and volumetric demos',
    },
    {
      src: useBaseUrl('/assets/images/gallery/camara-dedicated-networks-demo.png'),
      alt: 'CAMARA Dedicated Networks reference tool demo interface',
    },
    {
      src: useBaseUrl('/assets/images/gallery/5g-broadcast-plugfest-2026.jpg'),
      alt: '5G Broadcast PlugFest 2026, hosted by Fraunhofer FOKUS in Berlin',
    },
  ];

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
            <h2 className={styles.sectionTitle}>Developer Exchanges</h2>
            <p className={styles.sectionSubtitle}>
              Hear it from the people building it: recorded demos and talks from 5G-MAG members and
              contributors.
            </p>
            <VideoGrid videos={DEVELOPER_EXCHANGES_FEATURED} />
            <div className={styles.onAirMore}>
              <Link to="/developer/exchanges">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Examples of Our Work */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Examples of Our Work</h2>
            <p className={styles.sectionSubtitle}>
              Reference Tools and Applications running on real hardware, at real events — not just
              specifications on paper.
            </p>
            <PhotoGallery photos={showcasePhotos} />
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/applications">See Applications &rarr;</Link>
              {' · '}
              <Link to="/reference-tools">See Reference Tools &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Four pillars */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>{"Discover 5G-MAG's work"}</h2>
            <p className={styles.sectionSubtitle}>
              Based on open specifications, to address market needs. Together with our members we
              are running the loop from specifications to products — keeping connected media
              applications and network technologies open, interoperable and deployable at scale.
            </p>
            <StandardsLoopDiagram />

            <div className="godeeper-grid godeeper-grid--4col">
              {DISCOVER_WORK.map((p) => (
                <GodeeperCard key={p.title} {...p} />
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
