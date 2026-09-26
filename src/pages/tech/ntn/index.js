import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy") -- the page's
// former hand-typed title ("Non-Terrestrial Networks") dropped taxonomy.json's
// "in 5G Systems" suffix.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/ntn');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/ntn.md doc. Same
// Layout/HubHero every hub page uses, not the doc-tier topic-banner. Its
// real sub-pages (the 4 analysis docs) stay as real docs under
// docs/tech/ntn/ -- only this one top-level page moved out of the docs
// system; techTopics.js's ntn entry already carries no techDoc field
// (autogen: 'ntn' only), so both sidebars already treat it the same way
// they treat the migrated 5gms/5g-mbs entries.
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
  return (
    <Layout
      title={PROJECT_NAME}
      description="Extending 5G coverage via satellite and HAPS as a delivery layer for MBS multicast and broadcast: system model, radio-layer adaptations, and the specifications 5G-MAG tracks."
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
            <div style={{ maxWidth: '820px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              <p>
                Non-Terrestrial Networks (NTN) extend 5G coverage via satellite (geostationary GEO and
                low Earth orbit LEO) and high-altitude platform stations (HAPS), standardised in 3GPP
                Release 17. For media distribution, NTN is not a standalone system: it is a delivery
                infrastructure layer on top of which existing 5G services such as MBS Multicast and MBS
                Broadcast can be deployed. 5G-MAG&apos;s work in this area focuses on the specific
                challenges NTN introduces: propagation delay, Doppler effects, handover between
                satellite beams, and device mobility across terrestrial and non-terrestrial segments.
                For acronyms used here, see the <Link to="/tech/glossary">Glossary</Link>.
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
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>Why It Matters</h3>
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

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              NTN reuses the 5G system and the NR protocol stack; the differences are concentrated in
              the radio and in a small number of architecture roles.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/38811.htm">TR 38.811</a> (Study on NR access to
              non-terrestrial networks: the foundational NTN study item),{' '}
              <a href="https://www.3gpp.org/dynareport/38821.htm">TR 38.821</a> (Solutions for NR to
              support NTN), TS 38.300 (NR overall description, NTN aspects),{' '}
              <a href="https://www.3gpp.org/dynareport/38863.htm">TR 38.863</a> (NTN related RF and
              co-existence aspects). For satellite broadcast delivery, see also ETSI TS 103 720 (5G
              Broadcast system for linear TV and radio), which is relevant to GEO-based NTN broadcast
              scenarios.
            </p>

            <h3>NTN system model and terminology</h3>
            <ul>
              <li>
                <strong>Feeder link / service link.</strong> The feeder link connects the satellite to
                the ground gateway; the service link connects the satellite to the device (UE).
                One-way propagation delay accumulates over both, which is why GEO round trips are
                large.
              </li>
              <li>
                <strong>Transparent vs regenerative payload.</strong> In a transparent (bent-pipe)
                payload the gNB, in NTN terms the <em>Satellite Access Node (SAN)</em>, is on the
                ground and the satellite only relays and frequency-translates. In a regenerative
                payload the gNB (or its lower layers) is on board the spacecraft. Release 17
                standardised the transparent case; regenerative deployments are addressed in later
                releases. See{' '}
                <a href="https://www.3gpp.org/dynareport/38300.htm">TS 38.300</a>.
              </li>
              <li>
                <strong>Beam / cell / mapped cell.</strong> A satellite radiates one or more beams. A
                beam maps to an NR cell on the ground. As NGSO satellites move, the beam either stays
                pointed at a fixed ground area for a while (quasi-Earth-fixed beam) or sweeps across
                the ground (earth-moving beam). This distinction drives the handover models on the{' '}
                <Link to="/tech/ntn/analysis-mobility-ntn">Mobility Aspects for NTN</Link> page.
              </li>
              <li>
                <strong>GNSS at the UE.</strong> NTN assumes the device has GNSS so it can compute its
                own timing advance and Doppler pre-compensation from its position and the satellite
                ephemeris.
              </li>
            </ul>

            <h3>Radio-layer adaptations for NTN</h3>
            <p>
              The long, variable delay and the large Doppler shift on fast NGSO links are handled
              mainly at the physical and MAC layers, with assistance signalled in system information:
              a large, UE-specific <strong>timing advance</strong> computed from GNSS position and
              satellite ephemeris (plus a network-broadcast common component, anchored to an epoch
              time with a validity window); <strong>Doppler pre-compensation</strong> on the service
              link, computed by the device from geometry; a <strong>k-offset</strong> scheduling
              offset so uplink grants and other timing relationships remain valid despite the long
              round trip; and <strong>HARQ/RRC/MAC timers</strong> adapted for round trips that can
              far exceed terrestrial values, with some HARQ processes disabled and reliability moved to
              higher layers.
            </p>

            <h3>NTN system information for media delivery</h3>
            <p>Two system information blocks are central to media over NTN:</p>
            <ul>
              <li>
                <strong>SIB19</strong> carries the NTN assistance information a device needs to
                acquire and track a satellite cell: serving-cell (and optionally neighbour-cell)
                ephemeris, common timing advance parameters, the k-offset, the epoch time and its
                validity duration, and the cell reference location. SIB19 was introduced with the
                Release 17 NTN work in{' '}
                <a href="https://www.3gpp.org/dynareport/38331.htm">TS 38.331</a>.
              </li>
              <li>
                <strong>SIB27</strong>, introduced in Release 19 of TS 38.331, conveys the Intended
                Service Area (ISA) of MBS broadcast services for NTN, describing where a broadcast
                service applies as a polygon or a circle; see the ASN.1 walkthrough on the{' '}
                <Link to="/tech/ntn/analysis-mbs-broadcast-over-ntn">MBS Broadcast over NTN</Link>{' '}
                page.
              </li>
            </ul>
            <p>
              For MBS Broadcast, the terrestrial broadcast SIBs (SIB20 and SIB21 in TS 38.331) apply
              as on the ground; the NTN-specific additions are SIB19 and the ISA signalling.
            </p>

            <h3>Carrying MBS over NTN</h3>
            <p>
              Media over NTN is delivered with the same MBS service layers used on the ground, applied
              over a satellite or HAPS access:
            </p>
            <ul>
              <li>
                <strong>Delivery mode 1 (multicast)</strong>, per{' '}
                <a href="https://www.3gpp.org/dynareport/23247.htm">TS 23.247</a>, targets higher QoS
                and RRC_CONNECTED devices, and the RAN can switch a device between point-to-point
                (PTP) and point-to-multipoint (PTM) delivery. Over NTN this switching is a key tool
                for reliability during handover.
              </li>
              <li>
                <strong>Delivery mode 2 (broadcast)</strong>, also per TS 23.247, is receivable in
                RRC_IDLE and RRC_INACTIVE as well as RRC_CONNECTED, which suits wide-area linear
                content to many devices.
              </li>
              <li>
                <strong>User-service and streaming layers.</strong> The SA4 MBS user-service layer (
                <a href="https://www.3gpp.org/dynareport/26502.htm">TS 26.502</a>) and 5G Media
                Streaming (<a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a>) sit
                above MBS transport and are, in principle, agnostic to whether the access is
                terrestrial or non-terrestrial. Application-layer FEC and object delivery (for example
                FLUTE over ROUTE/LCT) matter more over NTN because retransmission over long paths is
                expensive.
              </li>
            </ul>
            <p>
              The application of MBS over NTN is being defined in Release 19 and later, with broadcast
              over GSO and NGSO, then multicast, discussed as separable steps. Treat orbit-by-orbit and
              mode-by-mode placement as provisional.
            </p>

            <h3>What each analysis page adds</h3>
            <ul>
              <li>
                <Link to="/tech/ntn/analysis-mobility-ntn">Mobility Aspects for NTN</Link> sets out
                three deployment models (single NTN operator; common NTN/TN operator; independent
                operators) and the beam handover models (quasi-Earth-fixed vs earth-moving), with
                soft-switch and hard-switch handover and their service-interruption ranges.
              </li>
              <li>
                <Link to="/tech/ntn/analysis-mbs-multicast-over-ntn">MBS Multicast over NTN</Link>{' '}
                covers the base multicast scenario, including autonomous RAN switching between PTP
                and PTM and the roles of the Application Service Provider and NTN operator.
              </li>
              <li>
                <Link to="/tech/ntn/analysis-mobility-mbs-multicast-over-ntn">
                  Mobility for MBS Multicast over NTN
                </Link>{' '}
                treats lossless handover for a whole multicast group, distinguishing
                satellite-triggered from user-triggered mobility.
              </li>
              <li>
                <Link to="/tech/ntn/analysis-mbs-broadcast-over-ntn">MBS Broadcast over NTN</Link>{' '}
                shows that broadcast reuses the terrestrial procedures almost unchanged, the
                NTN-specific parts being SIB19 and the ISA carried in SIB27.
              </li>
            </ul>

            <p>
              See the <a href="https://github.com/orgs/5G-MAG/projects/44/views/13">Execution Plan</a>{' '}
              for current implementation work.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>{' '}
              &middot; <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link> &middot;{' '}
              <Link to="/standards/5g-mbs">
                Standards: 5G Multicast &amp; Broadcast Services
              </Link>{' '}
              &middot; <Link to="/standards/5g-broadcast">Standards: 5G Broadcast - TV, Radio and Emergency Alerts</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
