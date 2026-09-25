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
// former hand-typed title ("Time Sensitive Communications") dropped the
// taxonomy string's hyphen and "(TSC)" suffix.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/tsc');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former
// docs/tech/tsc/tsc.md doc. Same Layout/HubHero every hub page uses, not
// the doc-tier topic-banner. Like content-delivery this topic had no
// techDoc entry in techTopics.js to begin with (its category link was
// never wired to a doc), so no sidebar-side change accompanies this
// move. Unlike 5gms/5g-mbs, TSC has no sub-pages of its own (taxonomy.json:
// repos: 0, doc_url: null) so its full analysis lives in this page's own
// "How It Works" section rather than being split across separate docs.
const CLOCK_ICON = (
  <>
    <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M12 10l0 3l2 2" />
    <path d="M7 4l-2.75 2" />
    <path d="M17 4l2.75 2" />
  </>
);

// This topic's own basket accent (BASKET_ACCENT['connected-media-production']
// in src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms page's own ACCENT.
const ACCENT = '#d1477a';

const RELEASE_TIMELINE = [
  {
    release: 'Release 16',
    detail:
      '5G system as a TSN bridge; DS-TT/NW-TT; transparent forwarding of gPTP with residence-time correction; TSN-to-5G QoS mapping.',
  },
  {
    release: 'Release 17',
    detail:
      'TSCTSF; generalised time synchronisation (multiple IEEE 802.1AS / IEEE 1588 clock roles); exposure of deterministic QoS and time-sync control to AFs via NEF; deterministic QoS without a full TSN bridge.',
  },
  {
    release: 'Release 18 and later',
    detail:
      'Further deterministic-networking, survivability and time-sync accuracy enhancements. Confirm scope and placement against the 3GPP work plan.',
  },
];

export default function TSC() {
  return (
    <Layout
      title={PROJECT_NAME}
      description="Explains how 3GPP Time Sensitive Communications lets 5G carry deterministic, low-jitter traffic for live production over Non-Public Networks."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={CLOCK_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Deterministic, low-jitter transport for tightly synchronised professional media
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '860px' }}>
              <p>
                Time Sensitive Communications (TSC) covers the 3GPP features that let a 5G network
                carry traffic with bounded, predictable latency and tight timing, rather than
                best-effort delivery. In media production this matters for live workflows, for
                example synchronising cameras, audio and control signals over a wireless link where
                jitter and timing drift are not acceptable.
              </p>
              <p>
                5G-MAG tracks how these deterministic-delivery capabilities apply to professional
                media, in particular over the <Link to="/tech/npn">Non-Public Networks</Link> that
                broadcasters use for on-site production. For acronyms used here, see the{' '}
                <Link to="/tech/glossary">Glossary</Link>.
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
                Deterministic, time-synchronised delivery normally means joining a full IEEE 802.1 TSN
                bridge with a Centralized Network Configuration controller — infrastructure most media
                productions have no reason to run. A Release 17 outcome removes that requirement:
                deterministic QoS and time synchronisation can be requested directly through the
                TSCTSF and NEF, without configuring the 5G system as part of a wired TSN network at
                all. That lighter path is what makes bounded-latency, time-synchronised transport
                practical for a production that only needs it over its own NPN, rather than full
                integration into a plant-wide TSN schedule.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="#how-it-works"
              standardsHref="/standards/tsc"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Built By</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              The 5G system is modelled as a TSN bridge, carrying deterministic traffic and shared
              timing between wired IEEE 802.1 TSN segments across a wireless hop.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/23501.htm">TS 23.501</a> (TSC clause: the 5G
              system modelled as a TSN bridge, NW-TT/DS-TT, time synchronisation),{' '}
              <a href="https://www.3gpp.org/dynareport/23502.htm">TS 23.502</a> (TSC procedures),{' '}
              <a href="https://www.3gpp.org/dynareport/38331.htm">TS 38.331</a> (RRC support for time
              synchronisation), IEEE 802.1Qbv / 802.1Qcc / 802.1AS (scheduled traffic, centralized
              TSN configuration and time synchronisation, referenced by the 3GPP TSC model).
            </p>

            <h3>The 5G-as-TSN-bridge model</h3>
            <p>
              The integration point between 5G and wired IEEE 802.1 TSN is defined in the TSC
              clauses of TS 23.501 (clauses 5.27 and 5.28). The 5G system is modelled as one or more
              virtual TSN bridges. Each bridge has ports realised by TSN Translators:
            </p>
            <ul>
              <li>
                <strong>NW-TT (Network-side TSN Translator)</strong> at the UPF. It terminates the
                wired TSN network, holds the bridge management information exposed to the TSN
                control plane, and translates between the TSN world and 5G QoS. A single NW-TT can
                host multiple ports.
              </li>
              <li>
                <strong>DS-TT (Device-side TSN Translator)</strong> at the UE. It terminates the TSN
                endpoint (for example a camera or an audio device) and applies hold-and-forward/gate
                behaviour for egress toward that endpoint.
              </li>
            </ul>
            <p>
              A PDU Session between the UE and the UPF forms the internal path of the bridge. TSN
              streams are mapped onto 5G QoS Flows within that PDU Session, so a stream with a
              strict deadline is carried on a QoS Flow with a matching 5QI and, where needed, a
              Guaranteed Bit Rate. Because the whole 5G segment is abstracted as a bridge, the
              external TSN Centralized Network Configuration (CNC) can compute schedules across it
              using ordinary TSN tooling; the 5G system reports its bridge capabilities (including
              per-port propagation and processing delays) to the CNC.
            </p>

            <h3>Time synchronisation architecture</h3>
            <p>Two clocks coexist:</p>
            <ul>
              <li>
                The <strong>5G clock (5G GM)</strong>, which the 5G system distributes internally to
                UEs and translators.
              </li>
              <li>
                The <strong>TSN/working clock</strong>, the (g)PTP time relevant to the application,
                carried across the bridge per IEEE 802.1AS.
              </li>
            </ul>
            <p>
              In the Release 16 model the 5G system behaves as a time-aware relay: gPTP event
              messages entering at one translator are timestamped, carried across the 5G system,
              and corrected for the measured residence time before egress at the other translator,
              so the downstream clock stays accurate. Release 17 generalised this so the 5G system
              can take different roles in an IEEE 802.1AS time-aware domain and can operate as an
              IEEE 1588 boundary clock or transparent clock, and so that time-synchronisation
              service can be requested and controlled through the control plane rather than being
              purely a transparent forwarding behaviour. For media, the working clock is typically
              PTP as used by SMPTE ST 2059, which is the same IEEE 1588 base, so the 5G time-sync
              machinery maps onto the timing model the ST 2110 plant already uses.
            </p>

            <h3>Control plane: TSCTSF, NEF and AF</h3>
            <p>
              Release 17 introduced the Time Sensitive Communication and Time Synchronization
              Function (TSCTSF). It is the network function through which deterministic QoS and
              time-synchronisation services are requested and coordinated:
            </p>
            <ul>
              <li>
                An <strong>Application Function (AF)</strong> in the operator&apos;s trust domain
                can interact with the TSCTSF directly.
              </li>
              <li>
                An <strong>AF outside that trust domain</strong> reaches the TSCTSF through the{' '}
                <strong>Network Exposure Function (NEF)</strong>.
              </li>
            </ul>
            <p>
              Through this interface the AF can provide traffic characteristics (periodicity, burst
              size, direction, arrival time reference) that let the system optimise scheduling,
              request the associated QoS, and activate or deactivate time synchronisation for
              specified UEs/ports. The TSCTSF works with the PCF to install the corresponding policy
              and with the SMF/UPF to realise it. Toward the wired TSN network, the
              bridge-management and scheduling interworking follows IEEE 802.1Qcc (fully centralized
              model), with the NW-TT presenting the 5G bridge to the CNC.
            </p>

            <h3>Scheduled traffic and gating</h3>
            <p>
              Deterministic egress toward a TSN endpoint uses gate behaviour aligned with IEEE
              802.1Qbv (enhancements for scheduled traffic): the translator opens and closes
              transmission gates according to a schedule derived from the CNC configuration and the
              shared clock. Combined with the bounded latency of the 5G QoS Flow, this gives an
              end-to-end path where a frame leaves the wired network, crosses the 5G segment, and is
              delivered to the wireless endpoint within a known window.
            </p>

            <h3>Deterministic QoS without a full TSN bridge</h3>
            <p>
              Not every media deployment wants to run a wired TSN control plane. A relevant Release
              17 outcome is that deterministic QoS and time synchronisation can be requested via the
              TSCTSF/NEF without the 5G system having to be configured as part of a full IEEE 802.1
              TSN bridge with a CNC. For a production that only needs bounded-latency,
              time-synchronised transport over its NPN (not integration into a plant-wide TSN
              schedule), this lighter path is often the practical one. Which approach is chosen
              depends on whether the wireless segment must participate in a network-wide TSN
              schedule or simply deliver deterministic transport to endpoints.
            </p>

            <h3>Release timeline</h3>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Release</th>
                    <th>What it adds</th>
                  </tr>
                </thead>
                <tbody>
                  {RELEASE_TIMELINE.map((r) => (
                    <tr key={r.release}>
                      <td className={styles.feeTableTier}>{r.release}</td>
                      <td>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The <a href="https://github.com/orgs/5G-MAG/projects/44/views/24">Execution Plan</a>{' '}
              tracks current work on this topic.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/npn">Non-Public Networks</Link> (TSC media
              transport typically runs over an NPN) &middot;{' '}
              <Link to="/tech/rtc">Real-time Media Communication (RTC) Architecture</Link> (the interactive
              WebRTC-based counterpart, for conversational and collaborative media rather than
              deterministic essence transport) &middot;{' '}
              <Link to="/standards/tsc">Standards: Time-Sensitive Communications (TSC)</Link> (the
              standards-tracking view of this topic)
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
