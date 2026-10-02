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
// former hand-typed title ("Real-Time Communications") was not the
// taxonomy string.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/rtc');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/rtc/rtc.md doc. Same
// Layout/HubHero every hub page (/tech, /standards, /developer...) uses,
// not the doc-tier topic-banner.
//
// 2026-09-27: docs/tech/rtc/overview.mdx now exists and techTopics.js's own entry
// carries `autogen: 'rtc'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor. taxonomy.json's doc_url, previously null,
// now points at docs/home/reference-tools/rtc/index.mdx, itself a
// placeholder honestly stating no dedicated tool exists yet (1 repo,
// rt-3gpp-swap, is tracked there) -- softwareHref below points at it.
const WEBRTC_ARROWS_ICON = (
  <>
    <path d="M7 21v-6" />
    <path d="M20 6l-3 -3l-3 3" />
    <path d="M10 18l-3 3l-3 -3" />
    <path d="M7 3v2" />
    <path d="M7 9v2" />
    <path d="M17 3v6" />
    <path d="M17 21v-2" />
    <path d="M17 15v-2" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['rtc'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, matching how 5gms/5g-mbs do the same.
const ACCENT = '#4f63d6';

export default function RTC() {
  const coverImg = useBaseUrl('/assets/images/projects/rtc.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="The 3GPP architecture for real-time media communication integrated into the 5G System, based on 5G Media Streaming and WebRTC."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={WEBRTC_ARROWS_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Interactive, low-latency, real-time media communication
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  3GPP defines an architecture for real-time media communication integrated into the 5G System:
                  the delivery of delay-sensitive media from one peer to another with support of the 5G network.
                  An RTC Application Function and an RTC Application Server support RTC endpoints that use a
                  subset of the WebRTC protocol stack.
                </p>
                <p>
                  The architecture is based on 5G Media Streaming. Both are realisations of one generalised
                  Media Delivery architecture, and share their provisioning and media session handling APIs.
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
                Beyond traditional telephony, real-time media is needed for immersive XR conferencing and
                between third-party applications in the device and the network. 3GPP extended the 5G Media
                Streaming principles to it, so that the 5G System can support both operator and third-party
                services: from a session that runs over the top, with QoS, bit rate recommendations and QoE
                reporting from the operator, to a session the operator hosts itself.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/rtc/overview"
              standardsHref="/standards/rtc"
              softwareHref="/reference-tools/rtc"
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
