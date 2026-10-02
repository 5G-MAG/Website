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
// instruction: "the name should be the one in the taxonomy").
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/npn');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms,
// /tech/rtc and /tech/ntn), replacing the former docs/tech/npn.md doc. Same
// Layout/HubHero every hub page uses, not the doc-tier topic-banner.
//
// 2026-09-27: docs/tech/npn/overview.mdx now exists and holds the
// content of this page's former "How It Works" section (moved there per
// owner decision) and techTopics.js's own entry
// carries `autogen: 'npn'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor. taxonomy.json's doc_url, previously null,
// now points at docs/home/reference-tools/npn/index.mdx, itself a
// placeholder honestly stating no dedicated tool or repository exists yet
// -- softwareHref below points at it.
const LOCK_ICON = (
  <>
    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
  </>
);

// This topic's own basket accent (BASKET_ACCENT['connected-media-production']
// in src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, matching how every other flagship page does this.
const ACCENT = '#d1477a';

export default function NPN() {
  const coverImg = useBaseUrl('/assets/images/projects/npn.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Private 5G (SNPN and PNI-NPN) deployment models, identity/onboarding, and QoS/spectrum considerations for live production."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={LOCK_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Private networks replacing legacy COFDM and RF-based contribution links
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Non-Public Networks (NPNs) are private 5G deployments operated for a specific
                  organisation or use case, defined in 3GPP Release 16. In media production, NPNs
                  allow broadcasters to deploy dedicated 5G infrastructure for live production
                  workflows, replacing legacy contribution links (satellite, ISDN, fibre) with a
                  programmable, low-latency wireless fabric. 5G-MAG&apos;s work covers deployment
                  models, spectrum access strategies, User Equipment (UE) registration and
                  on-boarding, and the specific requirements of live production environments such as
                  time-sensitive communications.
                </p>
                <p>
                  <strong>No dedicated reference tool exists for NPN.</strong> This area is
                  documented through the analysis below. Live production over an NPN often needs
                  deterministic timing, so for time-sensitive media transport over NPNs see also{' '}
                  <Link to="/tech/tsc">Time-Sensitive Communications (TSC)</Link>.
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
                A broadcaster deploying its own private 5G network doesn&apos;t want to become a full
                mobile operator with its own subscriber database — NPN avoids that: the Release 17
                Credentials Holder split lets a broadcaster&apos;s existing central identity system
                authenticate devices onto a venue-operated SNPN directly, and UE onboarding lets a
                whole fleet of cameras and devices be provisioned automatically rather than configured
                one by one. Together they are what makes dedicated, controllable 5G infrastructure for
                live production practical to actually deploy, in place of the legacy satellite, ISDN
                or fibre contribution links it replaces.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/npn/overview"
              standardsHref="/standards/npn"
              softwareHref="/reference-tools/npn"
            />
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/11">Execution Plan</a>
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
