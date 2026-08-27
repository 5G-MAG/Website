import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import StandardsLoopDiagram from '@site/src/components/StandardsLoopDiagram';
import GodeeperCard from '@site/src/components/GodeeperCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import PhotoGallery from '@site/src/components/PhotoGallery';
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
  // Real, existing photos -- reference tools and applications running on
  // real hardware, at real events -- not stock imagery.
  const showcasePhotos = [
    {
      src: useBaseUrl('/assets/images/gallery/reference-tools-demo-rig.jpg'),
      alt: '5G-MAG Reference Tools demo rig with SDR hardware and phones running 5GMS and volumetric demos',
      caption: '5G Media Streaming & volumetric video, running on SDR hardware',
    },
    {
      src: useBaseUrl('/assets/images/gallery/camara-dedicated-networks-demo.png'),
      alt: 'CAMARA Dedicated Networks reference tool demo interface',
      caption: 'CAMARA Dedicated Networks, a network API reference tool',
    },
    {
      src: useBaseUrl('/assets/images/gallery/5g-broadcast-plugfest-2026.jpg'),
      alt: '5G Broadcast PlugFest 2026, hosted by Fraunhofer FOKUS in Berlin',
      caption: '5G Broadcast PlugFest 2026, Fraunhofer FOKUS, Berlin',
    },
  ];

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
            <p className={styles.leadParagraph}>
              5G-MAG is a neutral platform bridging standards and real-world deployments: keeping
              connected media applications open, interoperable and deployable at scale.
            </p>
            <p className={`${styles.leadParagraph} ${styles['leadParagraph--last']}`}>
              Technology, backed by open standards, ready to scale across the industry.
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
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1.5rem' }}>
              We take in specifications from standards bodies, feed back real-world requirements,
              accelerate software implementation, and validate technologies through interop and
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

        {/* Examples of Our Work */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Examples of Our Work</h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1.5rem' }}>
              Reference Tools and Applications running on real hardware, at real events — not just
              specifications on paper.
            </p>
            <PhotoGallery photos={showcasePhotos} />
            <div style={{ textAlign: 'center', marginTop: '2rem', fontWeight: 600 }}>
              <Link to="/applications">See Applications &rarr;</Link>
              {' · '}
              <Link to="/reference-tools">See Reference Tools &rarr;</Link>
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
