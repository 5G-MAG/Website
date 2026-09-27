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
// displayNameOf(), not from `name` (same value here, but derived properly
// so a later taxonomy.json displayName addition doesn't silently break it).
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/5g-mbs');
const PROJECT_NAME = PROJECT.name;

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

// This project's own basket accent (BASKET_ACCENT['multicast'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, since this page only ever needs its own single
// project's accent.
const ACCENT = '#2e9e5b';

const DELIVERY_TERMS = [
  {
    term: 'Delivery method',
    layer: 'Radio (RAN)',
    values: 'PTM (point-to-multipoint) or PTP (point-to-point)',
    meaning: 'How the gNB (the 5G base station) physically sends the data over the air: one shared transmission, or a separate copy per device.',
  },
  {
    term: 'Delivery mode',
    layer: 'Radio (RAN), Layer 2',
    values: '1 (multicast), 2 (broadcast), or unicast',
    meaning: 'The Layer-2 configuration that carries the delivery method above — a separate setting from the method itself.',
  },
  {
    term: '5GC traffic delivery method',
    layer: 'Core network',
    values: 'Shared or individual',
    meaning: "How the 5G Core sends packets towards the radio: one copy per MBS-capable node (shared) or a per-UE copy for nodes that don't support MBS (individual). Describes the core, not the radio.",
  },
];

export default function FiveGMBS() {
  const coverImg = useBaseUrl('/assets/images/projects/5g-mbs.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Introduces 3GPP 5G Multicast Broadcast Services (MBS): the three-layer architecture, delivery methods and modes, key specifications, and reference tools."
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
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

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              An MBS session travels through three layers, from the content provider down to the
              device.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26502.htm">TS 26.502</a> (MBS user services),{' '}
              <a href="https://www.3gpp.org/dynareport/23247.htm">TS 23.247</a> (MBS architecture),{' '}
              <a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a> (5G Media Streaming,
              5GMS, framework referenced for hybrid delivery),{' '}
              <a href="https://www.3gpp.org/dynareport/38300.htm">TS 38.300</a> /{' '}
              <a href="https://www.3gpp.org/dynareport/38331.htm">TS 38.331</a> (RAN procedures for
              broadcast mode).
            </p>

            <ul>
              <li>
                The <strong>user-service layer</strong> (TS 26.502) is where a content provider
                provisions a service, has it announced to clients, ingests content and optionally
                repairs lost data. It is realised by the Multicast/Broadcast Service Function (MBSF)
                on the control plane and the Multicast/Broadcast Service Transport Function (MBSTF) on
                the user plane. This layer is optional: a provider can also drive the core directly.
              </li>
              <li>
                The <strong>5G Core layer</strong> (TS 23.247) defines the multicast and broadcast
                communication services, the MBS sessions that carry them, and the two ways the core
                delivers packets towards the radio: the 5GC shared method (one copy per MBS-capable RAN
                node) and the 5GC individual method (a per-UE copy for MBS-incapable nodes). The
                MBS-specific core functions are the MB-SMF and the MB-UPF.
              </li>
              <li>
                The <strong>NR / NG-RAN layer</strong> (TS 38.300 family) is where the gNB (the 5G base
                station) chooses point-to-multipoint (PTM) or point-to-point (PTP) delivery and applies
                one of three Layer-2 delivery modes.
              </li>
            </ul>

            <p>
              Two distinctions recur across the technical-analysis pages and are worth fixing early,
              since the terms sound alike but describe different layers:
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Layer</th>
                    <th>Values</th>
                    <th>What it means</th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERY_TERMS.map((r) => (
                    <tr key={r.term}>
                      <td className={styles.feeTableTier}>{r.term}</td>
                      <td>{r.layer}</td>
                      <td>{r.values}</td>
                      <td>{r.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The <Link to="/tech/5g-mbs/ran-aspects">RAN Aspects</Link> page keeps these separate in
              more detail. The <Link to="/tech/5g-mbs/overview-mbs">MBS Overview</Link> page introduces
              Multicast and Broadcast Services in plain language and the use cases each suits; the{' '}
              <Link to="/tech/5g-mbs/mbs-service-layer">Service Layer Aspects</Link> and{' '}
              <Link to="/tech/5g-mbs/mbs-service-system-aspects">Service &amp; System Aspects</Link>{' '}
              pages work through the user-service and 5G Core architecture in more detail.
            </p>

            <p>
              Three further pages analyse specific procedures in depth:{' '}
              <Link to="/tech/5g-mbs/mobility-mbs-multicast">
                Mobility aspects for MBS Multicast Services
              </Link>{' '}
              covers how multicast reception continues across handover between cells;{' '}
              <Link to="/tech/5g-mbs/analysis-mbs-multicast-inactive-ran">
                RAN Procedures for MBS Multicast Inactive
              </Link>{' '}
              covers the Release 18 extension that lets a UE receive multicast in the RRC_INACTIVE
              state; and{' '}
              <Link to="/tech/5g-mbs/analysis-mbs-broadcast-ran">
                RAN Procedures for MBS Broadcast
              </Link>{' '}
              works through the step-by-step radio acquisition of a broadcast service.
            </p>

            <p>
              5G-MAG&apos;s own{' '}
              <a href={useBaseUrl('/docs/Reference_Tools_5G_Multicast_Broadcast.pdf')}>
                reference tools overview slide deck
              </a>{' '}
              maps these reference tools to the architecture above, and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/8">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link> (the
              LTE-based, free-to-air broadcast technology — a separate topic with a similar name)
              &middot; <Link to="/tech/5gms">5G Media Streaming (5GMS)</Link> (the unicast delivery
              architecture whose user-service layer MBS extends) &middot;{' '}
              <Link to="/standards/content-delivery">Content Delivery Protocols</Link> (the FLUTE and
              ROUTE transport used by the MBS Object distribution method)
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
