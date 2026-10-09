import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/ai-in-media-services');
const TESTBEDS = ALL_PROJECTS.filter((p) => p.parent === PROJECT.name);

// Copy restates the 3GPP portal's titles of TR 26.927 and TR 26.847, TR 26.870 as the site already restates it,
// and the AI/ML Evaluation Framework repository's README.
const BRAIN_ICON = (
  <>
    <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
    <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
    <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
    <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
    <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
    <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
  </>
);

// BASKET_ACCENT['towards-6g'] in src/data/baskets.js.
const ACCENT = '#2e9e5b';

export default function AIForMedia() {
  const coverImg = useBaseUrl('/assets/images/projects/ai-ml.png');
  return (
    <Layout
      title={PROJECT.name}
      description="AI and ML for media: the AI/ML Evaluation Framework and the 6G AI Traffic Characterization Testbed."
    >
      <HubHero
        title={PROJECT.name}
        icon={BRAIN_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Evaluating AI and ML for media, and the traffic of AI media services
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  AI and ML in 5G media services are studied and evaluated in 3GPP SA4, in TR 26.927 and
                  TR 26.847. 5G-MAG builds two testbeds for this work: the AI/ML Evaluation Framework, which
                  implements the evaluation framework defined in TR 26.927, and the 6G AI Traffic
                  Characterization Testbed, which measures the traffic of AI media services for the 6G media
                  study (TR 26.870).
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
                alt={PROJECT.name}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                The evaluation framework establishes a common way to evaluate the scenarios collected for the
                FS_AI4Media study, with shared testbed architectures, metrics and test configurations for each
                scenario. The traffic characteristics of media services are relevant to the design of 6G radio
                and service architectures, and for AI media services the 6G study obtains them itself, with a
                testbed that makes the measurements.
              </p>
            </div>
          </div>
        </section>

        {TESTBEDS.map((tb, i) => (
          <section key={tb.name} className={`${styles.section} ${i % 2 === 0 ? styles.sectionAlt : ''}`}>
            <div className="container">
              <h2 className={styles.sectionTitle}>{displayNameOf(tb)}</h2>
              <ProjectDestinationCards
                accent={ACCENT}
                analysisHref={`${tb.tech_url}`}
                standardsHref={tb.standards_url}
                softwareHref={tb.doc_url}
                softwareIsTestbed
              />
            </div>
          </section>
        ))}

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={TESTBEDS.map(displayNameOf)} accent={ACCENT} isTestbed />
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
