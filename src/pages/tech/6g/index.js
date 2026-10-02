import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, BASKETS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// ProjectRepoSection matches against ALL_REPOS's own projectName field,
// which baskets.js builds from displayNameOf() -- derive it from
// taxonomy data rather than hardcoding it.
const AI_TRAFFIC_PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/6g');

// This page's own taxonomy.json project (AI Traffic Characterization)
// carries basket "testbeds", not towards-6g, since it is fundamentally a
// testbed -- so it can't name this page after itself the way every other
// flagship page does. Direct instruction: use the towards-6g basket's own
// title instead, the same basket this page is grouped under via
// techTopics.js's BASKET_OVERRIDES (see the comment below).
const BASKET_TITLE = BASKETS.find((b) => b.key === 'towards-6g').title;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former docs/tech/6g.md
// doc. Same Layout/HubHero every hub page uses, not the doc-tier
// topic-banner.
//
// This page's taxonomy.json project, AI Traffic Characterization, carries
// basket "testbeds" (doc_url /testbeds/6g-testbed/), not towards-6g.
// techTopics.js keeps /tech/6g grouped under Towards 6G Media via an
// explicit BASKET_OVERRIDES entry (see its own comment), so this page
// uses the towards-6g accent and icon ("chip", src/data/taxonomy.json
// iconCatalog.chip) throughout, even though the Software destination it
// links to belongs to the project's own "testbeds" basket.
// 2026-09-27: docs/tech/6g/overview.mdx now exists and holds the
// content of this page's former "How It Works" section (moved there per
// owner decision) and techTopics.js's own entry
// carries `autogen: '6g'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor.
const CHIP_ICON = (
  <>
    <path d="M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
    <path d="M10 9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3" />
  </>
);

// The towards-6g basket's own accent (BASKET_ACCENT['towards-6g']
// in src/data/baskets.js) -- this page's basket per techTopics.js's
// BASKET_OVERRIDES, not the testbeds basket that AI Traffic
// Characterization otherwise carries.
const ACCENT = '#c4622f';

export default function Towards6GMedia() {
  const coverImg = useBaseUrl('/assets/images/projects/6g-testbed.png');
  return (
    <Layout
      title={BASKET_TITLE}
      description="Describes 5G-MAG's media requirements input to 6G standardisation at 3GPP and ITU-R, and its AI-driven testbed for media traffic analysis."
    >
      <HubHero
        title={BASKET_TITLE}
        icon={CHIP_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Early media requirements towards 6G standardisation
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  6G (IMT-2030) is the next generation of mobile standards, currently in the
                  research and requirements phase at 3GPP and ITU-R (International
                  Telecommunication Union Radiocommunication sector), with initial specifications
                  expected from 2028. 5G-MAG actively contributes media-specific requirements and
                  use cases to the 6G standardisation process, covering media delivery at extreme
                  data rates, Artificial Intelligence (AI)-native network management for media
                  traffic, immersive and haptic experiences, and the evolution of broadcast and
                  multicast.
                </p>
                <p>
                  In parallel, the 5G-MAG 6G AI Traffic Characterization Testbed provides an early experimental platform for
                  AI-driven media traffic classification and optimisation over 5G networks,
                  informing future 6G design. The testbed produces labelled traffic datasets and
                  classification results that 5G-MAG uses to shape its requirement inputs to
                  3GPP.
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
                Requirements written at the study stage carry more weight when they&apos;re backed by
                measurement instead of assumption. AI workloads behave differently from classic media
                streaming — bursty request/response cycles, asymmetric uplink/downlink ratios,
                sensitivity to time-to-first-token as well as sustained throughput — and those
                differences matter for a 6G system meant to carry them. The 6G AI Traffic Characterization Testbed exists to
                characterise those patterns under controlled, reproducible network conditions, so
                5G-MAG&apos;s media-requirements input to 3GPP and ITU-R is grounded in real measured
                traffic behaviour rather than assumption alone.
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
