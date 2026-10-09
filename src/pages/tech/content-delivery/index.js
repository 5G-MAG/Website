import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy"). ProjectRepoSection
// still needs displayNameOf() separately below: it matches against
// ALL_REPOS's own projectName field, which baskets.js builds from
// displayNameOf(), not from `name` (same value here, but derived properly
// so a later taxonomy.json displayName addition doesn't silently break it).
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/content-delivery');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former
// docs/tech/content-delivery.mdx doc. Same Layout/HubHero every hub page
// uses, not the doc-tier topic-banner.
//
// The "How It Works" content lives in docs/tech/content-delivery/overview.mdx
// (techTopics.js's own entry carries `autogen: 'content-delivery'`), and
// analysisHref below points at it.
const PACKAGE_ICON = (
  <>
    <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12v9" />
    <path d="M12 12l-8 -4.5" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['content-delivery'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms page's own ACCENT.
const ACCENT = '#00a0d2';

export default function ContentDelivery() {
  const coverImg = useBaseUrl('/assets/images/projects/content-delivery.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Covers the FLUTE and ROUTE transport protocols used to deliver DASH, HLS, and CMAF media over broadcast and multicast networks."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={PACKAGE_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Content delivery origin, packaging, protocols and related tools
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Content delivery over broadcast and multicast networks relies on transport
                  protocols that can deliver files and media objects one-way, without a return
                  channel from each receiver. This project covers File Delivery over Unidirectional
                  Transport (FLUTE) and Real-time Object delivery over Unidirectional Transport
                  (ROUTE), which underpin 5G-MAG&apos;s broadcast and multicast work.
                </p>
                <p>
                  5G-MAG maintains open-source implementations, including the FLUTE library used
                  in the 5G Broadcast tools, a media origin, and a Coded Multisource Media Format
                  (CMMF) encoder.
                </p>
                {PROJECT.sdos?.length > 0 && (
                  <div className={styles.capabilityTags}>
                    {PROJECT.sdos.map((s) => (
                      <span key={s} className={styles.capabilityTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <img
                src={coverImg}
                alt={PROJECT_NAME}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                A broadcast or multicast bearer has no return channel, so a receiver can never ask for
                a retransmission — reliability has to come from somewhere else, and Forward Error
                Correction carried by FLUTE and ROUTE is that mechanism. Keeping the media format
                (DASH, HLS, CMAF) and the transport (FLUTE for files, ROUTE for real-time objects)
                strictly separate is what lets the same packaged content run over either one: a
                broadcaster packages a CMAF asset once, and it can be delivered over FLUTE for a
                download-style MBMS scenario or over ROUTE for ATSC 3.0-style real-time delivery,
                without repackaging for each transport.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/content-delivery/overview"
              standardsHref="/standards/content-delivery"
              softwareHref="/reference-tools/content-delivery/"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={displayNameOf(PROJECT)} accent={ACCENT} />
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
