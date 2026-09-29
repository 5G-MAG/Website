import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import StandardsLoopDiagram from '@site/src/components/StandardsLoopDiagram';
import GodeeperCard from '@site/src/components/GodeeperCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import styles from '../tech/index.module.css';

const ABOUT_ICON_PATH = (
  <>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </>
);

export default function About() {
  return (
    <Layout
      title="About Us"
      description="5G-MAG is a neutral not-for-profit association at the intersection of Media and Connectivity. Driven by our members, we support their efforts in bridging standards and deployments through open specifications and open-source software."
    >
      <HubHero
        title="About Us"
        icon={ABOUT_ICON_PATH}
        actions={[
          <Link
            key="join"
            className="button button--primary"
            to="/membership#request-membership"
          >
            Become a Member
          </Link>,
          <a
            key="overview"
            className="button button--outline button--primary"
            href={useBaseUrl('/docs/Overview.pdf')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download an Overview &#8595;
          </a>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Scope: Media and Connectivity</h2>
            <p className={styles.leadParagraph}>
              &ldquo;We are not a standards body. We do not write specs. We translate them into
              things that run.&rdquo;
            </p>
            <p className={`${styles.leadParagraph} ${styles['leadParagraph--last']}`}>
              5G-MAG is a neutral not-for-profit association at the intersection of Media and
              Connectivity. Driven by our members, we support their efforts in bridging standards and
              deployments through open specifications and open-source software.
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            <div className="godeeper-grid godeeper-grid--4col">
              {SCOPE_PILLARS.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Running the Loop: From Requirements to Products</h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1.5rem' }}>
              We take in specifications from standards bodies, feed back real-world requirements,
              accelerate open-source implementation, and validate technologies through interop and
              plugfests — before it ships into products.
            </p>

            <StandardsLoopDiagram />

            <p className={styles.sectionSubtitle} style={{ marginTop: '2rem' }}>
              Four pillars, from specification to deployed product.
            </p>
            <div className="godeeper-grid godeeper-grid--4col">
              {DISCOVER_WORK.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort />
      </main>
    </Layout>
  );
}
