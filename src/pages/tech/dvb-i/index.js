import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy"), rather than
// an independent literal that happens to match today but can drift from a
// later taxonomy rename.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/dvb-i');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/dvb-i/dvb-i-5g.mdx doc. Same
// Layout/HubHero every hub page (/tech, /standards, /developer...) uses, not
// the doc-tier topic-banner. Its "How It Works" content (data model,
// implementation blueprint, delivery-over-5G scenarios) lives in the
// project's one analysis doc, docs/tech/dvb-i/analysis-dvb-i-over-5g-gaps.mdx,
// which analysisHref below points at.
//
// taxonomy.json's own icon key for this project is "device-tv" (Tabler's
// name for this drawing) -- the literal path data below is copied from
// iconCatalog['device-tv'] there.
const TV_ICON = (
  <>
    <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
    <path d="M16 3l-4 4l-4 -4" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['content-delivery'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, since this page only ever needs its own single
// project's accent.
const ACCENT = '#00a0d2';

export default function DvbI() {
  const coverImg = useBaseUrl('/assets/images/projects/dvb-i.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Explains DVB-I service discovery over 5G Broadcast, 5G Media Streaming, and hybrid delivery."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={TV_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            DVB-I service discovery combined with 5GMS and 5G Broadcast delivery
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  DVB-I (DVB internet, an ETSI-published DVB specification) lets a device discover and
                  present linear TV and radio services delivered over IP, listing broadcast and
                  broadband streams together in a single service list. This page covers how DVB-I
                  service discovery works over 5G Systems, so that services carried by 5G Broadcast or
                  5G Media Streaming can appear alongside other IP-delivered content.
                </p>
                <p>
                  5G-MAG tracks this work and maintains related reference tooling, built by contributors
                  including Fraunhofer FOKUS, Dolby Laboratories, Qualcomm and the BBC. The project has
                  no repositories of its own: the reference tools linked below implement the delivery
                  scenarios against the specifications this page describes.
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
                Without DVB-I, a broadcaster&apos;s 5G Broadcast service and its 5GMS unicast service
                would look like two unrelated things to a device, discovered separately with no
                common presentation. DVB-I&apos;s service instance model fixes that: one logical
                service can carry several delivery instances — a broadcast instance and a unicast
                instance for the same channel — and the device picks between them by priority, or, for
                a hybrid device already tuned to the broadcast signal directly, de-duplicates the two
                so the same channel doesn&apos;t appear twice. That is what lets broadcast and
                broadband content sit in one combined service list instead of two separate discovery
                systems a viewer has to reconcile themselves.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/dvb-i/analysis-dvb-i-over-5g-gaps"
              standardsHref="/standards/dvb-i"
              softwareHref="/reference-tools/dvb-i/"
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
