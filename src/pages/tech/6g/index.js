import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// ProjectRepoSection matches against ALL_REPOS's own projectName field,
// which baskets.js builds from displayNameOf() -- derive it from
// taxonomy data rather than hardcoding it.
const AI_TRAFFIC_PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/6g');

// The study's title, not the project's: this page is the 6G media study as a whole, and AI Traffic
// Characterization (a testbed project of the AI for Media area) is the part of it 5G-MAG works on.
const BASKET_TITLE = 'Towards 6G Media';

// A per-project "flagship" page, following the 5gms pilot (src/pages/tech/5gms/index.js). Copy restates
// TR 26.870 V0.6.1: Introduction, clause 1, clause 6.3.3.1 and annex B.
const CHIP_ICON = (
  <>
    <path d="M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
    <path d="M10 9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3" />
  </>
);

// The study page's own accent.
const ACCENT = '#2e9e5b';

export default function Towards6GMedia() {
  const coverImg = useBaseUrl('/assets/images/projects/6g-testbed.png');
  return (
    <Layout
      title={BASKET_TITLE}
      description="The 3GPP study on media aspects for 6G (TR 26.870), and the testbed it uses to measure the traffic of AI media services."
    >
      <HubHero
        title={BASKET_TITLE}
        icon={CHIP_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Study on Media Aspects for 6G System (TR 26.870)
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  The 6G AI Traffic Characterization Testbed is a testbed of the <Link to="/tech/ai-for-media">AI for Media</Link> project.
                </p>
                <p>
                  This study aims to identify media-related opportunities and gaps in the context of 6G. It
                  builds on service requirements defined by SA1 and architectural enhancements defined by SA2.
                  The conclusions of this study will form the basis for further detailed studies as well as
                  normative work.
                </p>
                <p>
                  Annexes C and D of the study document the evaluation of AI traffic characteristics and the
                  testbed for it, which is the 6G AI Traffic Characterization Testbed.
                </p>
                {AI_TRAFFIC_PROJECT.sdos?.length > 0 && (
                  <div className={styles.capabilityTags}>
                    {AI_TRAFFIC_PROJECT.sdos.map((s) => (
                      <span key={s} className={styles.capabilityTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <img
                src={coverImg}
                alt={BASKET_TITLE}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                The traffic characteristics of media services are relevant to the design of 6G radio and
                service architectures, and for AI media services the study obtains them itself. Its five
                initial findings are that AI traffic is uplink heavy in some scenarios, that it is bursty,
                that round-trip delay determines responsiveness, that traffic varies within one
                application, and that some traffic is structured in tokens. The findings are to be updated
                as more measurement results become available, which is what the testbed produces.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/6g/overview"
              standardsHref="/standards/6g"
              softwareHref="/testbeds/6g-testbed/"
              softwareIsTestbed
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
            <ProjectRepoSection projectNames={displayNameOf(AI_TRAFFIC_PROJECT)} accent={ACCENT} isTestbed />
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
