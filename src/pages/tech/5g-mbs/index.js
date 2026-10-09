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
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/5g-mbs');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms),
// replacing the former docs/tech/5g-mbs.mdx doc. Same Layout/HubHero every
// hub page (/tech, /standards, /developer...) uses, not the doc-tier
// topic-banner. Its real sub-pages (Overview, Service Layer, Service &
// System Aspects, RAN Aspects, and the three analysis pages) stay as real
// docs under docs/tech/5g-mbs/ -- only this one top-level page moved out
// of the docs system.
const BROADCAST_ICON = (
  <>
    <path d="M12 12l0 .01" />
    <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
    <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
    <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
    <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['broadcast-multicast'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, since this page only ever needs its own single
// project's accent.
const ACCENT = '#e07b1a';

export default function FiveGMBS() {
  const coverImg = useBaseUrl('/assets/images/projects/5g-mbs.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Introduces 3GPP 5G Multicast Broadcast Services (MBS): delivery methods and reference tools."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={BROADCAST_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Multicast and Broadcast delivery for 5G-NR-based terrestrial and non-terrestrial networks
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Multicast &amp; Broadcast in 5G (MBS) introduces native point-to-multipoint delivery
                  into 5G New Radio (NR), standardised from 3GPP Release 17 onwards. Delivery can be
                  point-to-multipoint (PTM), one transmission shared by many devices, or point-to-point
                  (PTP), a separate copy per device, with the network choosing between them. Unlike
                  LTE-based broadcast (evolved Multimedia Broadcast Multicast Service, eMBMS), 5G MBS is
                  integrated directly into the 5G Core and Radio Access Network (RAN), enabling efficient
                  distribution of identical content to many devices simultaneously, whether for live TV,
                  emergency alerts, or software updates.
                </p>
                <p>
                  5G-MAG implements the MBS user service layer defined in 3GPP{' '}
                  <a href="https://www.3gpp.org/dynareport/26502.htm">TS 26.502</a>, covering service
                  announcement, session management, and media delivery, across a chain of 10
                  repositories from the application-provider tooling down to the RAN and UE.
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
                Sending the same content to a stadium full of devices as separate unicast streams
                consumes network capacity proportional to the audience size, however large it gets.
                MBS avoids that by building multicast and broadcast directly into the 5G Core and RAN,
                rather than as a separate overlay the way LTE-based eMBMS was: the network can choose
                point-to-multipoint delivery, one transmission reaching every device at once, instead
                of a per-device copy. That is what makes live TV, emergency alerts and mass software
                distribution practical at any audience size, without capacity scaling with the number
                of receivers.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/5g-mbs/overview-mbs"
              standardsHref="/standards/5g-mbs"
              softwareHref="/reference-tools/5g-mbs"
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
