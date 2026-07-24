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
import { SCOPE_TAGS } from '@site/src/data/scopeTags';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { chunk } from '@site/src/utils/chunk';
import styles from './index.module.css';

// A cross-section sample of member/contributor demos, not the full library —
// see /tech/videos for that. Plays inline (VideoGrid/VideoCard's "tally
// light" treatment, the same one used on the full video galleries) rather
// than linking through to each source page, for more visual weight on the
// homepage; "Browse the full library" below still covers cross-linking.
const ON_AIR_FEATURED = [
  {
    id: 'e_xK_ckkhgc',
    title: 'Demonstrating MBS User Service Announcement mechanisms',
  },
  {
    id: 'hkVgL8yq0V8',
    title: 'Emergency Alerts over 5G Broadcast embedded in DVB-T2 at IBC 2025',
  },
  {
    id: '4C9bySDoVqA',
    title: 'MPEG V3C Immersive Platform at IBC 2025',
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
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

        {/* On Air */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>On Air</h2>
            <p className={styles.sectionSubtitle}>
              Hear it from the people building it: recorded demos and talks from 5G-MAG members and
              contributors.
            </p>
            <VideoGrid videos={ON_AIR_FEATURED} />
            <div className={styles.onAirMore}>
              <Link to="/tech/videos">Browse the full library &rarr;</Link>
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
