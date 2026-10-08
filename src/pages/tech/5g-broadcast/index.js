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

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy"). ProjectRepoSection
// still needs displayNameOf() separately below: it matches against
// ALL_REPOS's own projectName field, which baskets.js builds from
// displayNameOf(), not from `name`.
//
// Used to cover TWO taxonomy.json projects sharing this one tech_url ("5G
// Broadcast - TV and Radio Services" and "5G Broadcast - Emergency Alerts").
// Direct instruction (2026-09-27), via the taxonomy-admin portal: Emergency
// Alerts was split out to its own /tech/emergency-alerts page -- see that
// page and techTopics.js's own comment on this entry for the other halves of
// this change. This page now covers only TV/Radio; its 2 real sub-pages
// (Deployment Profiles, Operational Parameters in Use) stay as real docs
// under docs/tech/5g-broadcast/.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/5g-broadcast');
const PROJECT_NAME = PROJECT.name;
const ANTENNA_ICON = (
  <>
    <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
    <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
    <path d="M9 21l3 -9l3 9" />
    <path d="M10 19h4" />
  </>
);

// This basket's own accent (BASKET_ACCENT['broadcast-multicast'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map, same reasoning as the 5gms page's own ACCENT constant: this
// page only ever needs its own basket's color.
const ACCENT = '#e07b1a';

export default function FiveGBroadcast() {
  const coverImg = useBaseUrl('/assets/images/projects/5g-broadcast.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Technical entry point for LTE-based 5G Broadcast."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={ANTENNA_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            The 3GPP-based broadcast delivery system bridging OTT streaming and broadcasting
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  LTE-based 5G Broadcast is a profile of existing 3GPP Long Term Evolution (LTE)
                  specifications that enables one-to-many delivery of TV, radio and emergency alerts over
                  dedicated broadcast carriers, without requiring a return channel or SIM card on the
                  receiver. It builds on Further evolved Multimedia Broadcast Multicast Service (FeMBMS),
                  itself an evolution of evolved Multimedia Broadcast Multicast Service (eMBMS); the three
                  names refer to the same LTE-based broadcast lineage. ETSI standardises it as TS 103 720,
                  which 5G-MAG actively maintains and extends to cover 3GPP Release 18 and 19 enhancements.
                </p>
                <p>
                  TS 103 720 covers both directions of that same transport for linear TV and radio:
                  the transmit side and the modem/receive side. The same transmit/receive chain is
                  also the platform{' '}
                  <Link to="/tech/emergency-alerts">5G Broadcast - Emergency Alerts</Link> layers Cell
                  Broadcast Service public warning on top of.
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
                A cellular unicast stream costs more network capacity the bigger its audience gets, no
                matter how popular the content. Broadcast TV and radio don&apos;t work that way, and
                5G Broadcast keeps that property: a receiver bootstraps entirely from the broadcast
                signal itself — no SIM, no return channel, no prior connection to the network — by
                first synchronising on the narrowband Cell Acquisition Subframe, then following the
                system information it carries out to the wider PMCH payload. One transmission reaches
                every receiver in coverage simultaneously, so the network cost of reaching a million
                viewers is the same as reaching one.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/5g-broadcast/deployment-profiles"
              standardsHref="/standards/5g-broadcast"
              softwareHref="/reference-tools/5g-broadcast/"
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
