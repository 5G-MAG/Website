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
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/data-collection');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) and the content-delivery page built the
// same way -- replacing the former
// docs/tech/data-collection/data-collection-event-exposure.mdx doc. Same
// Layout/HubHero every hub page uses, not the doc-tier topic-banner.
//
// The "How It Works" content lives in docs/tech/data-collection/overview.mdx
// (techTopics.js's own entry carries `autogen: 'data-collection'`), and
// analysisHref below points at it.
const DOC_REPORT_ICON = (
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
    <path d="M9 17l0 -5" />
    <path d="M12 17l0 -1" />
    <path d="M15 17l0 -3" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['content-delivery'] in
// src/data/baskets.js, taxonomy.json's basket for this project) -- a plain
// literal here rather than importing the whole map for one color, same
// reasoning as the 5gms and content-delivery pages' own ACCENT.
const ACCENT = '#00a0d2';

export default function DataCollection() {
  const coverImg = useBaseUrl('/assets/images/projects/data-collection.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="The 3GPP architecture for collecting and reporting UE data in the 5G System and exposing it as events, and its instantiation in 5G Media Streaming."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={DOC_REPORT_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Collection and reporting of UE data, and its exposure as events
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  3GPP defines a generic architecture for collecting and reporting data in the 5G System.
                  A Data Collection Application Function (AF) obtains UE data from data collection clients,
                  processes it, and exposes it as events to the NWDAF and to Event Consumer AFs.
                </p>
                <p>
                  The architecture is meant to be instantiated for particular 5G System features. 5G Media
                  Streaming instantiates it, with the Data Collection AF inside the 5GMS AF.
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
                Devices and media services know a lot about how a service performs: what was played, and
                with what quality. 3GPP defined one common way to collect that data, process it, and share it
                with the parties that need it, such as network analytics. Access is controlled: each party
                receives only the processed data it is allowed to see.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/data-collection/overview"
              standardsHref="/standards/data-collection"
              softwareHref="/reference-tools/data-collection/"
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
