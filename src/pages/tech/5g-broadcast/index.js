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

// This basket's own accent (BASKET_ACCENT['5g-broadcast'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map, same reasoning as the 5gms page's own ACCENT constant: this
// page only ever needs its own basket's color.
const ACCENT = '#e07b1a';

// Ported from docs/tech/5g-broadcast.mdx's "Numerologies (subcarrier
// spacings)" table -- the full set profiled by ETSI TS 103 720.
const NUMEROLOGIES = [
  { scs: '15 kHz', release: '(LTE baseline)', cp: 'standard', use: 'CAS; mixed-mode operation' },
  { scs: '7.5 kHz', release: 'Rel-14', cp: '~33 microseconds', use: 'standard-area broadcast' },
  { scs: '1.25 kHz', release: 'Rel-14', cp: '~200 microseconds', use: 'high-power high-tower, very large SFN' },
  { scs: '2.5 kHz', release: 'Rel-16', cp: '~100 microseconds', use: 'mobile reception (up to ~250 km/h)' },
  { scs: '0.37 kHz', release: 'Rel-16', cp: '~300 microseconds', use: 'very large SFN (inter-site distance up to ~100 km)' },
];

// Ported from the same doc's "Channel bandwidths" table -- the UHF broadcast
// bandwidths added in Release 17, signalled by `pmch-Bandwidth-r17` in SIB13.
const BANDWIDTHS = [
  { code: 'n30', bw: '6 MHz', prb: '30' },
  { code: 'n35', bw: '7 MHz', prb: '35' },
  { code: 'n40', bw: '8 MHz', prb: '40' },
];

export default function FiveGBroadcast() {
  const coverImg = useBaseUrl('/assets/images/projects/5g-broadcast.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Technical entry point for LTE-based 5G Broadcast: the broadcast chain, numerologies, bandwidths, and Rel-14 to Rel-19 evolution."
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
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
                  5G-MAG&apos;s reference tools implement both sides of that same transport for linear
                  TV and radio: the transmitter (rt-mbms-tx) and the modem/receiver (rt-mbms-modem)
                  chain, letting anyone building a broadcast transmitter or receiver validate against a
                  real, running reference. The same transmit/receive chain is also the platform{' '}
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
              <h3 className={styles.whyMattersTitle}>Why It Matters</h3>
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
            <h2 className={styles.sectionTitle}>Built By</h2>
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
              A 5G Broadcast receiver has to bootstrap itself from nothing: there&apos;s no SIM, no return
              channel, and no prior connection to the network. LTE-based 5G Broadcast is a one-way
              physical layer built on the LTE TS 36.xxx series -- a receiver acquires the cell, reads the
              broadcast control information, then decodes the multicast traffic channel, with no uplink
              and no per-user state.
            </p>

            <p>
              <strong>Key specifications:</strong> ETSI TS 103 720 (5G Broadcast System for linear TV and
              radio), 3GPP <a href="https://www.3gpp.org/dynareport/36976.htm">TR 36.976</a> (LTE-based 5G
              broadcast overview), 3GPP <a href="https://www.3gpp.org/dynareport/26346.htm">TS 26.346</a>{' '}
              (MBMS protocols and codecs), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26347.htm">TS 26.347</a> (MBMS application
              programming interface).
            </p>

            <p>
              <strong>PMCH (Physical Multicast Channel)</strong> carries the broadcast payload; in an
              MBMS-dedicated cell it occupies almost the whole carrier. <strong>CAS (Cell Acquisition
              Subframe)</strong> is the entry point -- one radio frame per 40 ms period (SFN mod 4 == 0)
              uses 15 kHz SCS with the standard cyclic prefix and carries PSS, SSS, PBCH, PCFICH, PDCCH and
              PDSCH, letting the receiver synchronise and decode MIB-MBMS (on PBCH) and SIB1-MBMS without a
              USIM. The CAS occupies a narrow 15 or 25 PRB (3 or 5 MHz) regardless of the PMCH bandwidth, so
              the receiver bootstraps narrow and the SIBs then point it at the wider PMCH.{' '}
              <strong>MCCH (Multicast Control Channel)</strong> carries the MBSFN (Multicast-Broadcast
              Single-Frequency Network) area configuration -- which services map to which PMCH, MCS,
              scheduling -- and is re-read at each modification-period boundary so the receiver can pick up
              transmitter-side changes. <strong>MTCH (Multicast Traffic Channel)</strong> is the logical
              channel that maps the user-service data onto PMCH.
            </p>

            <p>Acquisition order on the receiver, step by step:</p>
            <ol>
              <li>Synchronise on PSS/SSS in the CAS.</li>
              <li>Decode PBCH to get MIB-MBMS (bandwidth, SFN, semi-static CFI).</li>
              <li>Decode SIB1-MBMS (cell access, SI scheduling).</li>
              <li>Decode SIB13 (MBSFN area info, ROM info, extended bandwidth).</li>
              <li>Decode MCCH.</li>
              <li>Decode PMCH/MTCH -- the receiver is now showing the channel.</li>
            </ol>

            <h3>Numerologies (subcarrier spacings)</h3>
            <p>
              The choice of subcarrier spacing (SCS) trades cyclic-prefix length (and therefore maximum
              SFN reach and mobility tolerance) against overhead. The full set profiled by ETSI TS 103 720
              is:
            </p>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>SCS</th>
                    <th>3GPP release</th>
                    <th>Cyclic prefix (approx.)</th>
                    <th>Primary use case</th>
                  </tr>
                </thead>
                <tbody>
                  {NUMEROLOGIES.map((n) => (
                    <tr key={n.scs}>
                      <td className={styles.feeTableTier}>{n.scs}</td>
                      <td>{n.release}</td>
                      <td>{n.cp}</td>
                      <td>{n.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              The 0.37 kHz numerology uses a 3 ms slot structure and defines two reference-signal placement
              variants selected by <code>timeSeparation</code> (<code>sl2</code> and <code>sl4</code>);
              this is signalled per MBSFN area in <code>MBSFN-AreaInfo-r16</code> (
              <a href="https://www.3gpp.org/dynareport/36331.htm">TS 36.331</a>). The MBSFN
              reference-signal patterns for each numerology are defined in{' '}
              <a href="https://www.3gpp.org/dynareport/36211.htm">TS 36.211</a> clause 6.10.2.2.
            </p>

            <h3>Channel bandwidths</h3>
            <p>
              The PMCH can use the standard LTE bandwidths (up to 20 MHz) carried in MIB-MBMS, or the UHF
              broadcast bandwidths added in Release 17 and signalled by <code>pmch-Bandwidth-r17</code> in
              SIB13:
            </p>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>pmch-Bandwidth-r17</th>
                    <th>Bandwidth</th>
                    <th>PRB</th>
                  </tr>
                </thead>
                <tbody>
                  {BANDWIDTHS.map((b) => (
                    <tr key={b.code}>
                      <td className={styles.feeTableTier}>
                        <code>{b.code}</code>
                      </td>
                      <td>{b.bw}</td>
                      <td>{b.prb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              When present, <code>pmch-Bandwidth-r17</code> overrides the narrowband CAS bandwidth for the
              PMCH region; its absence means the legacy LTE bandwidth applies. See{' '}
              <Link to="/tech/5g-broadcast/parameters-in-use">Operational Parameters in Use</Link> for the
              values observed in practice.
            </p>

            <h3>Specifications by 3GPP release</h3>
            <p>
              The features below are profiled by ETSI TS 103 720. For the standards-tracking narrative with
              the version-to-release mapping and the release-by-release table, see{' '}
              <Link to="/standards/5g-broadcast">
                Standards: 5G Broadcast - TV, Radio and Emergency Alerts
              </Link>
              .
            </p>

            <p>
              <strong>Release 14 (FeMBMS baseline).</strong> The foundation: the MBMS-dedicated cell
              (almost 100% of the carrier for broadcast), the 1.25 kHz and 7.5 kHz numerologies with
              extended cyclic prefix, the CAS frame structure, 256-QAM on PMCH (with the extended TBS
              table), and the broadcast control blocks MIB-MBMS (<code>MasterInformationBlock-MBMS-r14</code>,
              on PBCH) and SIB1-MBMS (<code>SystemInformationBlockType1-MBMS-r14</code>). Shorter MCCH
              repetition and modification periods (down to one radio frame) support faster
              system-information updates.
            </p>
            <p>
              <strong>Release 16 (LTE-based 5G Terrestrial Broadcast, normative).</strong> The normative
              work item adds the 2.5 kHz and 0.37 kHz numerologies and their reference-signal patterns,
              PDCCH Format 4 (aggregation level 16) for robust control-channel reception, PBCH repetition
              across CAS subframes for faster MIB acquisition, the <code>MBSFN-AreaInfo-r16</code> structure
              (carrying <code>subcarrierSpacingMBMS-r16</code> and <code>timeSeparation-r16</code>), the
              semi-static CFI in MIB-MBMS (<code>semiStaticCFI-MBMS-r16</code>), and Receive-Only Mode (ROM)
              information in SIB13 (<code>MBMS-ROM-Info-r16</code>), which lets a receiver be redirected to
              MBMS content on another carrier without a return channel.
            </p>
            <p>
              <strong>Release 17 (channel bandwidths).</strong> Adds the 6/7/8 MHz PMCH bandwidths (30/35/40
              PRB) via <code>pmch-Bandwidth-r17</code>, with updated TBS and PMCH resource-allocation
              tables. This is the release profiled by the published ETSI TS 103 720 v1.2.1 (June 2023),
              which also defines the Base, Main and 5GMS receiver categories.
            </p>
            <p>
              <strong>Release 18 (UHF bands, receive-only).</strong> A spectrum-layer change only: the
              receive-only (downlink-only) UHF bands Band 107 (612 to 652 MHz) and Band 108 (470 to 698
              MHz), defined as standalone downlink-only (SDO) bands in Table 5.5H-1 of{' '}
              <a href="https://www.3gpp.org/dynareport/36101.htm">TS 36.101</a>, with base-station
              requirements in <a href="https://www.3gpp.org/dynareport/36104.htm">TS 36.104</a>;{' '}
              <a href="https://www.3gpp.org/dynareport/36307.htm">TS 36.307</a> makes the SDO broadcast
              bands release-independent from Release 17. There are no new numerologies and no MAC or RRC
              changes. The published ETSI TS 103 720 v1.2.1 does not yet include specific frequency bands;
              its clause 8 defers them to a future revision.
            </p>
            <p>
              <strong>Release 19 (PMCH Phase 2, CAS muting, new bands).</strong> PMCH Phase 2 adds time
              interleaving (spreading a transport block across N consecutive subframes for time diversity,
              with a scheduling window M), frequency interleaving, a per-subframe cyclic shift (different
              values per cell in an SFN reduce boundary interference), TBS scaling, and extended SI
              scheduling periods, all carried in a new RRC v1900 extension chain. The PMCH-specific MCS
              tables (<a href="https://www.3gpp.org/dynareport/36213.htm">TS 36.213</a> clause 11.1, Tables
              11.1-1 and 11.1-2, the latter extending to 256-QAM) already exist in the Release 18 version
              of TS 36.213. CAS muting frees synchronisation-channel airtime for PMCH by transmitting
              PSS/SSS/PBCH only in the active part of each period (<code>cas-MutingConfig-r19</code> in the
              new <code>SystemInformationBlockType1-MBMS-v1900</code> extension). Two further receive-only
              UHF bands, Band 112 (470 to 608 MHz) and Band 113 (606 to 698 MHz), are defined in Table
              5.5H-1 of TS 36.101 and are release-independent from Release 17. These features postdate the
              published ETSI TS 103 720 v1.2.1 and are expected in a later revision.
            </p>

            <details>
              <summary>References to verify</summary>
              <p>
                The identifiers above have been verified against the published specifications: the RRC
                structures against TS 36.331 V19.3.0, the MBSFN reference-signal clause against TS 36.211,
                the PDCCH Format 4 definition and the PMCH MCS tables against TS 36.211 and TS 36.213
                (Release 14 to Release 19 versions), the band definitions and release placement against TS
                36.101 (Table 5.5H-1), TS 36.104 and TS 36.307, and the ETSI TS 103 720 v1.2.1 content
                against the published ETSI PDF. Feature-level details that originate in an internal 5G-MAG
                standards-tracking document and were not re-checked clause by clause: the Release 14 MCCH
                repetition and modification period values, the Release 16 PBCH-repetition description, and
                the Release 19 interleaving and TBS-scaling parameter descriptions (N, M and the
                per-subframe cyclic-shift behaviour). The{' '}
                <Link to="/standards/5g-broadcast">Standards page</Link> carries the release-by-release
                identifier list.
              </p>
            </details>

            <p>
              5G-MAG&apos;s own{' '}
              <a href={useBaseUrl('/docs/Reference_Tools_5G_Broadcast.pdf')}>
                reference tools overview slide deck
              </a>{' '}
              summarises the transmitter and receiver chain, and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/7">Execution Plan</a> tracks current
              implementation work. See also{' '}
              <Link to="/tech/exchanges#5g-media-streaming-over-embms-3gpp-release-17">
                5G Media Streaming over eMBMS (3GPP Release 17)
              </Link>{' '}
              for the related VideoTech session.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/tech/emergency-alerts">5G Broadcast - Emergency Alerts</Link> (Cell Broadcast
              Service public warning, layered on this same transmit and receive chain) &middot;{' '}
              <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>{' '}
              (the NR-native multicast and broadcast technology, a separate topic with a similar name)
              &middot; <Link to="/standards/content-delivery">Standards: Content Delivery Protocols</Link>{' '}
              (the FLUTE and ROUTE transport used to carry files over the broadcast bearer) &middot;{' '}
              <Link to="/standards/dvb-i">Standards: DVB-I Services over 5G Systems</Link> (DVB-I service
              discovery, used to present broadcast services alongside broadband ones)
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
