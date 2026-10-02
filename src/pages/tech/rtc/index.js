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
      description="Overview of 3GPP's RTC architecture (TS 26.506)."
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
                  Real-Time Communications (RTC) covers the 3GPP work on interactive, low-latency media
                  such as conversational audio and video, immersive calls and interactive streaming,
                  where the round-trip delay must stay low enough for two-way interaction. It builds on
                  the uplink side of 5G Media Streaming (5GMSu) and related delivery functions. 5G-MAG
                  tracks how these capabilities support real-time media services over 5G.
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
                Interactive media (conversational calls, collaborative streaming) has different
                requirements than 5GMS&apos;s one-way delivery — but building it as a completely
                separate system would mean an operator maintaining two unrelated session-handling and
                provisioning stacks. RTC avoids that by reusing 5GMS concepts wherever possible, with
                both systems being pulled onto a shared media delivery specification (TS 26.510) so
                the same Media Session Handler and AF provisioning can serve either one. That shared
                foundation is also what lets the collaboration model flex from one end to the other —
                an operator can provide just connectivity and QoS for a third-party WebRTC service, or
                host the full signalling and media stack itself, under the same architecture.
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
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/19">Execution Plan</a>
            </p>
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
