import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy") -- the page's
// former hand-typed title ("Time Sensitive Communications") dropped the
// taxonomy string's hyphen and "(TSC)" suffix.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/tsc');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former
// docs/tech/tsc/tsc.md doc. Same Layout/HubHero every hub page uses, not
// the doc-tier topic-banner. Unlike 5gms/5g-mbs, TSC has no repos of its
// own (taxonomy.json: repos: 0); its analysis (formerly this page's own
// "How It Works" section) lives in docs/tech/tsc/overview.mdx.
//
// 2026-09-27: docs/tech/tsc/overview.mdx now exists and holds that
// analysis, and techTopics.js's own
// entry carries `autogen: 'tsc'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor. taxonomy.json's doc_url, previously null,
// now points at docs/home/reference-tools/tsc/index.mdx, itself a
// placeholder honestly stating no dedicated tool or repository exists yet
// -- softwareHref below points at it.
const CLOCK_ICON = (
  <>
    <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M12 10l0 3l2 2" />
    <path d="M7 4l-2.75 2" />
    <path d="M17 4l2.75 2" />
  </>
);

// This topic's own basket accent (BASKET_ACCENT['connected-media-production']
// in src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms page's own ACCENT.
const ACCENT = '#d1477a';

export default function TSC() {
  const coverImg = useBaseUrl('/assets/images/projects/tsc.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Explains how 3GPP Time Sensitive Communications lets 5G carry deterministic, low-jitter traffic for live production over Non-Public Networks."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={CLOCK_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Deterministic, low-jitter transport for tightly synchronised professional media
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Time Sensitive Communications (TSC) covers the 3GPP features that let a 5G network
                  carry traffic with bounded, predictable latency and tight timing, rather than
                  best-effort delivery. In media production this matters for live workflows, for
                  example synchronising cameras, audio and control signals over a wireless link where
                  jitter and timing drift are not acceptable.
                </p>
                <p>
                  5G-MAG tracks how these deterministic-delivery capabilities apply to professional
                  media, in particular over the <Link to="/tech/npn">Non-Public Networks</Link> that
                  broadcasters use for on-site production.
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
                Deterministic, time-synchronised delivery normally means joining a full IEEE 802.1 TSN
                bridge with a Centralized Network Configuration controller — infrastructure most media
                productions have no reason to run. A Release 17 outcome removes that requirement:
                deterministic QoS and time synchronisation can be requested directly through the
                TSCTSF and NEF, without configuring the 5G system as part of a wired TSN network at
                all. That lighter path is what makes bounded-latency, time-synchronised transport
                practical for a production that only needs it over its own NPN, rather than full
                integration into a plant-wide TSN schedule.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/tsc/overview"
              standardsHref="/standards/tsc"
              softwareHref="/reference-tools/tsc"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
