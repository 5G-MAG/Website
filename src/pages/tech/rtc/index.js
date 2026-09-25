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
// former hand-typed title ("Real-Time Communications") was not the
// taxonomy string.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/rtc');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/rtc/rtc.md doc. Same
// Layout/HubHero every hub page (/tech, /standards, /developer...) uses,
// not the doc-tier topic-banner.
//
// Unlike 5gms/5g-mbs, RTC has no separate analysis sub-page of its own --
// the old doc was a single file (docs/tech/rtc/rtc.md, nested one level
// down though its URL was flat, /tech/rtc) and taxonomy.json's doc_url for
// this project is null (no Reference Tools page exists yet, despite 1
// repo being tracked elsewhere -- see the Software card below). So this
// page carries its own "How It Works" content directly in the section
// below, rather than linking out to a docs/tech/rtc/* sub-page the way
// 5gms links to docs/tech/5gms/overview-5gms.
const WEBRTC_ARROWS_ICON = (
  <>
    <path d="M7 21v-6" />
    <path d="M20 6l-3 -3l-3 3" />
    <path d="M10 18l-3 3l-3 -3" />
    <path d="M7 3v2" />
    <path d="M7 9v2" />
    <path d="M17 3v6" />
    <path d="M17 21v-2" />
    <path d="M17 15v-2" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['rtc'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, matching how 5gms/5g-mbs do the same.
const ACCENT = '#4f63d6';

export default function RTC() {
  return (
    <Layout
      title={PROJECT_NAME}
      description="Overview of 3GPP's RTC architecture (TS 26.506), WebRTC transport stack, and its relation to 5GMSu and IMS communication."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={WEBRTC_ARROWS_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Interactive, low-latency, real-time media communication
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ maxWidth: '860px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              <p>
                Real-Time Communications (RTC) covers the 3GPP work on interactive, low-latency media
                such as conversational audio and video, immersive calls and interactive streaming,
                where the round-trip delay must stay low enough for two-way interaction. It builds on
                the uplink side of 5G Media Streaming (5GMSu) and related delivery functions. 5G-MAG
                tracks how these capabilities support real-time media services over 5G. For acronyms
                used here, see the <Link to="/tech/glossary">Glossary</Link>.
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
                Interactive media (conversational calls, collaborative streaming) has different
                requirements than 5GMS&apos;s one-way delivery — but building it as a completely
                separate system would mean an operator maintaining two unrelated session-handling and
                provisioning stacks. RTC avoids that by reusing 5GMS concepts wherever possible, with
                both systems being pulled onto a shared media delivery specification (TS 26.510) so
                the same Media Session Handler and AF provisioning can serve either one. That shared
                foundation is also what lets the collaboration model flex from one end to the other —
                an operator can provide just connectivity and QoS for a third-party WebRTC service, or
                host the full signalling and media stack itself, under the same architecture.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="#how-it-works"
              standardsHref="/standards/rtc"
              softwarePlaceholderRepo={{ name: '3GPP SWAP Protocol', href: 'https://github.com/5G-MAG/rt-3gpp-swap' }}
            />
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/19">Execution Plan</a>
            </p>
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
              RTC is 3GPP&apos;s interactive, WebRTC-based counterpart to 5G Media Streaming&apos;s
              one-way delivery paths, reusing 5GMS concepts wherever possible so the two can share
              session-handling and delivery functions.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26506.htm">TS 26.506</a> (5G Real-time Media
              Communication Architecture, Stage 2),{' '}
              <a href="https://www.3gpp.org/dynareport/26113.htm">TS 26.113</a> (RTC stage 3:
              procedures, APIs and protocols),{' '}
              <a href="https://www.3gpp.org/dynareport/26510.htm">TS 26.510</a> (harmonised media
              delivery specification shared with 5GMS).
            </p>

            <h3>The RTC architecture (TS 26.506)</h3>
            <p>
              3GPP SA4 specified a dedicated 5G Real-time Media Communication Architecture (Stage 2)
              in <a href="https://www.3gpp.org/dynareport/26506.htm">TS 26.506</a>, with the stage-3
              procedures, APIs and protocols in{' '}
              <a href="https://www.3gpp.org/dynareport/26113.htm">TS 26.113</a>. The design reuses 5G
              Media Streaming (5GMS) concepts wherever possible, so RTC functions and 5GMS functions
              can share media session handling and media delivery. At a high level the architecture
              places:
            </p>
            <ul>
              <li>An <strong>RTC Application Provider</strong> offering the service.</li>
              <li>
                An <strong>RTC Application Function (AF)</strong> and{' '}
                <strong>RTC Application Server (AS)</strong> on the network side, handling
                provisioning, session control and media functions.
              </li>
              <li>An <strong>RTC-aware application</strong> on the UE.</li>
            </ul>
            <p>
              These are connected by named reference points, analogous to the M1..M8 model used in
              5GMS. Because RTC was defined after 5GMS, the harmonised provisioning and
              session-handling functions are being pulled into a common media delivery specification,{' '}
              <a href="https://www.3gpp.org/dynareport/26510.htm">TS 26.510</a>, so that the same
              functions can serve both 5GMS and RTC; not all functions are shared yet.
            </p>

            <h3>Collaboration scenarios</h3>
            <p>
              The architecture is defined for a range of collaboration scenarios that differ in how
              much of the service the mobile operator provides. At one end the operator provides only
              connectivity and QoS support for a third-party WebRTC service; at the other end the
              operator hosts the signalling and media functions (for example acting as a WebRTC gateway
              or media function). Intermediate scenarios have the operator provide some functions (such
              as TURN relays or a media gateway) while the application provider keeps the rest. This
              lets one architecture cover both operator-assisted third-party services and
              operator-run RTC services.
            </p>

            <h3>WebRTC transport stack</h3>
            <p>RTC media transport uses the WebRTC protocol stack:</p>
            <ul>
              <li><strong>Media</strong>: RTP with RTCP feedback, secured as DTLS-SRTP.</li>
              <li>
                <strong>Connectivity / NAT traversal</strong>: ICE, using STUN for server-reflexive
                candidates and TURN for relayed candidates.
              </li>
              <li>
                <strong>Data</strong>: WebRTC data channels, i.e. SCTP over DTLS, for reliable or
                partially-reliable messaging alongside the media.
              </li>
            </ul>
            <p>
              Codec handling follows the WebRTC requirements (for example the IETF video codec
              requirements referenced on the standards page). QoS for the media flows is requested
              from the 5G system through the exposure interfaces (NEF, then PCF for policy) so that an
              RTC session can obtain better-than-best-effort treatment; for production use this is
              normally combined with a{' '}
              <Link to="/tech/npn">Non-Public Networks</Link> so uplink capacity can be reserved.
            </p>

            <h3>Signalling</h3>
            <p>
              WebRTC does not mandate a signalling protocol; the offer/answer exchange must be carried
              by some out-of-band channel. Within the 3GPP RTC work the signalling options are handled
              in the architecture and protocol specifications. One protocol developed in this context
              is RESPECT, a WebRTC-compatible session-control (signalling) protocol documented in the
              Release 19 study{' '}
              <a href="https://www.3gpp.org/dynareport/26930.htm">TR 26.930</a> (Study on the
              enhancement for Immersive Real-Time communication for WebRTC). As study output it is not
              a normative 3GPP protocol; the normative RTC protocols and APIs remain those of TS 26.113.
            </p>

            <h3>Relationship to 5GMSu and to IMS</h3>
            <ul>
              <li>
                <strong>5GMSu (uplink 5G Media Streaming)</strong> is a one-way, device-to-network
                streaming path within the 5GMS framework (
                <a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a>,{' '}
                <a href="https://www.3gpp.org/dynareport/26512.htm">TS 26.512</a>, and the harmonised
                TS 26.510). It suits contribution/ingest where interactivity is not required.
              </li>
              <li>
                <strong>RTC (TS 26.506 / TS 26.113)</strong> is the interactive, WebRTC-based path,
                suited to conversational and collaborative media and low-latency two-way contribution.
              </li>
              <li>
                <strong>IMS-based real-time communication</strong>, including IMS Multimedia Telephony
                (<a href="https://www.3gpp.org/dynareport/26114.htm">TS 26.114</a>) and the more recent
                IMS Data Channel / NG-RTC work, is a separate, IMS-anchored path. NG-RTC adds a data
                channel, AI media processing and a service-based interface to IMS; its stage 3 was
                progressed in Release 18. Which path a service uses depends on whether it is anchored
                in IMS telephony or in the 5GMS/RTC media framework.
              </li>
            </ul>

            <h3>Release timeline</h3>
            <ul>
              <li>
                <strong>Release 16 to 17</strong>: 5GMS foundations (TS 26.501, TS 26.512) including
                the 5GMSu uplink path; IMS Multimedia Telephony (TS 26.114).
              </li>
              <li>
                <strong>Release 18</strong>: RTC architecture (TS 26.506) and protocols (TS 26.113);
                harmonised media delivery (TS 26.510); IMS Data Channel / NG-RTC stage 3.
              </li>
              <li>
                <strong>Release 19 and later</strong>: RTC enhancements, including immersive real-time
                communication over WebRTC, studied in TR 26.930 (published as V19.0.0, October 2025);
                TS 26.506, TS 26.113 and TS 26.510 continue to evolve under Release 19.
              </li>
            </ul>

            <p>
              <strong>Related:</strong> <Link to="/tech/npn">Non-Public Networks</Link>{' '}
              &middot; <Link to="/tech/tsc">Time-Sensitive Communications (TSC)</Link>{' '}
              &middot; <Link to="/standards/rtc">Standards: Real-time Media Communication (RTC) Architecture</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
