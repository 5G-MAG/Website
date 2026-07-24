import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import StandardsLoopDiagram from '@site/src/components/StandardsLoopDiagram';
import GodeeperCard from '@site/src/components/GodeeperCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import { FACT_SPEC_ISSUES, FACT_SDO_INPUTS, FACT_REPOSITORIES, FACT_CLONES } from '@site/src/data/facts';
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

const LOOP_FACTS = [FACT_SPEC_ISSUES, FACT_SDO_INPUTS, FACT_REPOSITORIES, FACT_CLONES];

export default function About() {
  return (
    <Layout title="About Us" description="About 5G-MAG, The Media Connectivity Association.">
      <HubHero
        title="About Us"
        icon={ABOUT_ICON_PATH}
        actions={[
          <Link
            key="join"
            className="button button--primary"
            to="/membership#request-membership"
          >
            Become a member
          </Link>,
          <a
            key="overview"
            className="button button--outline button--primary"
            href="pathname:///docs/Overview.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download an Overview &#8595;
          </a>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">5G-MAG is a neutral platform bridging standards and real-world deployments: keeping connected media applications open, interoperable and deployable at scale.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Scope: Media and Connectivity</h2>
            <p className={styles.sectionSubtitle}>
              &ldquo;We are not a standards body. We do not write specs. We translate them into
              things that run.&rdquo;
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
            <h2 className={styles.sectionTitle}>Running the Loop: From Standards to Products</h2>
            <p className={styles.sectionSubtitle}>
              We take in specifications from standards bodies, feed back real-world requirements,
              accelerate software implementation, and validate technologies through interop and
              plugfests — before it ships into products.
            </p>

            <StandardsLoopDiagram />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.sectionSubtitle}>
              Based on open specifications, to address market needs. Together with our members we
              are running the loop from specifications to products — keeping connected media
              applications and network technologies open, interoperable and deployable at scale.
            </p>
            <div className="godeeper-grid godeeper-grid--4col">
              {DISCOVER_WORK.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The Work, in Numbers</h2>
            <p className={styles.sectionSubtitle}>Proof the loop runs, not just a description of it.</p>
            <div className="summary-container">
              {LOOP_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h3>{f.label}</h3>
                  <span className="summary-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort />
      </main>
    </Layout>
  );
}
