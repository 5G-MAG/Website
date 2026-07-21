import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import GodeeperCard, { icon } from '@site/src/components/GodeeperCard';
import { SLACK_INVITE_URL } from '@site/src/data/socialLinks';
import { SCOPE_TAGS } from '@site/src/data/scopeTags';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { chunk } from '@site/src/utils/chunk';
import styles from './index.module.css';

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

        {/* Four pillars */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>{"Discover 5G-MAG's work"}</h2>
            <p className={styles.sectionSubtitle}>
              Based on open specification to address market needs.
              <br />
              Four pillars - each lowering cost and accelerating time from specifications to
              deployment
            </p>
            <div className="godeeper-grid godeeper-grid--4col">
              {DISCOVER_WORK.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the Efforts</h2>
            <p className={styles.sectionSubtitle}>
              5G-MAG is an open industry association. Contributions to documentation and standards
              work are welcome.
            </p>
            <div className={styles.communityLinks}>
              <Link className="button button--primary button--lg" to="/membership#request-membership">
                Become a member
              </Link>
              <a
                className="button button--outline button--primary button--lg"
                href="https://github.com/5G-MAG"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="button button--outline button--primary button--lg"
                href={SLACK_INVITE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Slack
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
