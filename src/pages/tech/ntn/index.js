import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy") -- the page's
// former hand-typed title ("Non-Terrestrial Networks") dropped taxonomy.json's
// "in 5G Systems" suffix.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/ntn');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/ntn.md doc. Same
// Layout/HubHero every hub page uses, not the doc-tier topic-banner. Its
// real sub-pages (the 4 analysis docs) stay as real docs under
// docs/tech/ntn/ -- only this one top-level page moved out of the docs
// system; techTopics.js's ntn entry already carries no techDoc field
// (autogen: 'ntn' only), so both sidebars already treat it the same way
// they treat the migrated 5gms/5g-mbs entries.
//
// 2026-09-27: taxonomy.json's doc_url, previously null, now points at
// docs/home/reference-tools/ntn/index.mdx, itself a placeholder honestly
// stating no dedicated tool or repository exists yet -- softwareHref below
// points at it instead of leaving the Software card muted.
const SATELLITE_ICON = (
  <>
    <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z" />
    <path d="M6 10l-3 3l3 3l3 -3" />
    <path d="M10 6l3 -3l3 3l-3 3" />
    <path d="M14 17a3 3 0 0 0 3 -3" />
    <path d="M20 13a9 9 0 0 0 -9 9" />
  </>
);

// This topic's own basket accent (BASKET_ACCENT.ntn in src/data/baskets.js)
// -- a plain literal here rather than importing the whole map for one
// color, matching how 5gms/5g-mbs's own flagship pages do this.
const ACCENT = '#1a9e93';

export default function NTN() {
  const coverImg = useBaseUrl('/assets/images/projects/ntn.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Extending 5G coverage via satellite and HAPS as a delivery layer for MBS multicast and broadcast."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={SATELLITE_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Expanding network connectivity via satellite and HAPS for content delivery
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Non-Terrestrial Networks (NTN) extend 5G coverage via satellite (geostationary GEO and
                  low Earth orbit LEO) and high-altitude platform stations (HAPS), standardised in 3GPP
                  Release 17. For media distribution, NTN is not a standalone system: it is a delivery
                  infrastructure layer on top of which existing 5G services such as MBS Multicast and MBS
                  Broadcast can be deployed. 5G-MAG&apos;s work in this area focuses on the specific
                  challenges NTN introduces: propagation delay, Doppler effects, handover between
                  satellite beams, and device mobility across terrestrial and non-terrestrial segments.
                </p>
                <p>
                  <strong>No dedicated reference tool exists for NTN.</strong> The 5G-MAG MBS reference
                  tools (for Multicast and Broadcast) are the relevant software for NTN deployment
                  scenarios — see{' '}
                  <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>. For satellite broadcast
                  delivery using the FeMBMS (5G Broadcast) waveform, see{' '}
                  <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link>.
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
                Terrestrial infrastructure doesn&apos;t reach every area a broadcaster needs to serve,
                and building a separate service layer for satellite delivery would mean maintaining
                two parallel stacks. NTN avoids that: it standardises only the radio-layer adaptations
                a long, variable-delay satellite path needs — a large UE-specific timing advance,
                Doppler pre-compensation, the k-offset scheduling adjustment — so the existing MBS
                Multicast and Broadcast user-service and streaming layers can run over a satellite or
                HAPS access exactly as they do terrestrially, reaching areas outside terrestrial
                coverage without a second, incompatible delivery system.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/ntn/analysis-mobility-ntn"
              standardsHref="/standards/ntn"
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
