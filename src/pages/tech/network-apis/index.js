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
// instruction: "the name should be the one in the taxonomy") -- the page's
// former hand-typed title ("Connectivity Quality with Network APIs") was
// neither this nor taxonomy.json's `displayName` ("Network APIs for
// Connectivity Quality"). ProjectRepoSection still needs displayNameOf()
// separately below: it matches against ALL_REPOS's own projectName field,
// which baskets.js builds from displayNameOf(), not from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/network-apis');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/network-apis.md doc. Its
// real sub-pages (the CAMARA API analyses, the content-production and
// live-media-distribution scenario sets) stay as real docs under
// docs/tech/network-apis/ -- only this one top-level page moved out of
// the docs system.

// This project's own icon (iconCatalog['api-server'] in
// src/data/taxonomy.json) -- bare <path> elements, passed straight to
// HubHero (unlike HubDestinationCard below, which needs the full <svg>
// wrapper from GodeeperCard's icon() helper).
const API_SERVER_ICON = (
  <>
    <path d="M4 13h5" />
    <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
    <path d="M20 8v8" />
    <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['connected-media-production']
// in src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, since this page only ever needs its own single
// project's accent.
const ACCENT = '#d1477a';

export default function NetworkAPIs() {
  const coverImg = useBaseUrl('/assets/images/projects/network-apis.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Introduces 5G-MAG's analysis of CAMARA network APIs for QoS, slicing and connectivity insight in media use cases, and the underlying 3GPP exposure chain."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={API_SERVER_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Requesting, monitoring, and managing dynamic network resources and QoS
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Mobile networks can expose selected capabilities, for example the ability to request
                  a given quality of service, reserve a network slice, or check current connectivity,
                  to outside applications through standardised, portable interfaces, instead of each
                  operator offering its own proprietary interface. Network APIs are those interfaces,
                  applied here to media use cases: they let a media application programmatically
                  request the network conditions it needs, whether that is guaranteed bandwidth for a
                  live production feed, a low-latency path for a real-time contribution link, or
                  priority routing for a breaking news stream.
                </p>
                <p>
                  5G-MAG&apos;s work centres on the CAMARA project (a Linux Foundation initiative with
                  GSMA support) and its mapping to 3GPP-defined APIs, applied specifically to media
                  production and live distribution use cases. GSMA Open Gateway (OGW) API profiles
                  align these CAMARA APIs across operators.
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
                Without CAMARA, a media application that wants a specific network guarantee — a
                low-latency contribution link, a reserved slice for an event — has to integrate
                directly against each operator&apos;s own 3GPP-exposed interfaces (NEF, then PCF for
                policy), a separate integration per operator. CAMARA hides that chain behind one
                small, operator-agnostic REST resource, so a developer builds against a single API
                once and it works across any operator that implements the same CAMARA profile,
                instead of maintaining a bespoke integration for every network it needs to reach.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/network-apis/network-api-initiatives"
              standardsHref="/standards/network-apis"
              softwareHref="/reference-tools/network-apis"
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
