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
// instruction: "the name should be the one in the taxonomy"), rather than
// an independent literal that can drift from a later taxonomy rename.
// ProjectRepoSection still needs displayNameOf() separately below: it
// matches against ALL_REPOS's own projectName field, which baskets.js
// builds from displayNameOf(), not from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/5gms');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (2026-09-25 pilot), replacing the former
// docs/tech/5gms.mdx doc -- raised directly ("I would like to use the
// regular page with hero and so on... a normal page", confirmed: "no
// sidebar, true standalone page"). Same Layout/HubHero every hub page
// (/tech, /standards, /developer...) uses, not the doc-tier topic-banner.
// Its 3 real sub-pages (Overview, 5GMSd Features, Advanced Media
// Delivery) stay as real docs under docs/tech/5gms/ -- only this one
// top-level page moved out of the docs system; see techTopics.js's own
// comment on the 5gms entry for the sidebar-side half of this change.
const PLAY_ICON = <path d="M7 4v16l13 -8l-13 -8" />;

// This project's own basket accent (BASKET_ACCENT['content-delivery'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, since this page (unlike tech/index.js) only
// ever needs its own single project's accent.
const ACCENT = '#00a0d2';

const M1_M8 = [
  { ref: 'M1', connects: 'Application Provider → AF', standardised: 'Yes', purpose: 'Provisioning: the Application Provider configures the AF with content, policies and reporting settings.' },
  { ref: 'M2', connects: 'Application Provider → AS', standardised: 'Yes (optional)', purpose: 'Content ingest: media is ingested into the AS, pulled by the AS or pushed by the provider.' },
  { ref: 'M3', connects: 'AF → AS', standardised: 'Yes (added in Release 18)', purpose: 'AS configuration and management, and media session handling. Internal and not specified up to Release 17.' },
  { ref: 'M4', connects: 'AS → Media Player', standardised: 'Yes', purpose: 'Media delivery to the device, typically DASH or HLS over HTTP.' },
  { ref: 'M5', connects: 'Media Session Handler ↔ AF', standardised: 'Yes', purpose: 'Media session handling and reporting: consumption, metrics, network assistance, dynamic policies.' },
  { ref: 'M6 / M7', connects: '5GMS-Aware Application → Media Session Handler / Media Player', standardised: 'Yes (UE-internal)', purpose: 'On-device APIs: M6 to use 5GMS functions, M7 for media access control. The Media Session Handler and Media Player also offer these APIs to each other at M11.' },
  { ref: 'M8', connects: 'Application Provider ↔ 5GMS-Aware Application', standardised: 'No (private, beyond the scope of standardisation)', purpose: 'Information exchange between the application and the provider, for example Service Access Information.' },
];

export default function FiveGMS() {
  const coverImg = useBaseUrl('/assets/images/projects/5gms.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Introduces the 3GPP 5G Media Streaming (5GMS) framework, its architecture, M1-M8 reference points, key specifications, and reference tools."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={PLAY_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Driving collaboration between mobile networks and media applications
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  5G Media Streaming (5GMS) is specified by 3GPP in TS 26.501 as a set of extensions to
                  the 5G System architecture. It supports media streaming services from mobile network
                  operators and from third parties, in downlink, where the network is the origin of the
                  media, and in uplink, where the device is.
                </p>
                <p>
                  The architecture is divided into independent components, so that it can be deployed
                  with different degrees of integration between mobile network operators and content
                  providers. Media can be streamed as it is produced (live) or after it has been
                  produced (on demand).
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
                Before 5GMS, 3GPP&apos;s streaming architecture was the Packet Switched Streaming
                architecture in TS 26.233, mainly developed for RTSP streaming. When the Release 16 work
                began, 3GPP considered it unfit for 5G media streaming services. Meanwhile, classical
                broadcast and content distribution services were migrating towards modern distribution
                architectures.
              </p>
              <p className={styles.whyMattersBody}>
                A 3GPP study on media distribution over 5G (TR 26.891) concluded that a new 5G media
                streaming architecture was required to enable any type of deployment of streaming
                services over 5G. 5GMS is that architecture. Its Release 16 work item asked for input
                from broadcasters, content providers and emerging media service providers, and from
                mobile network operators running their own media services.
              </p>
              <p className={styles.whyMattersBody}>
                As of Release 19, TS 26.501 defines these features for media streaming in the 5G
                System: content hosting, content publishing and content preparation; network
                assistance and dynamic policies; consumption and QoE metrics reporting; edge
                processing; delivery via eMBMS and via MBS; data collection, reporting and exposure;
                3GPP Service URL handling; and remote control. TS 26.501 states that many of its features
                are motivated by the conclusions of TR 26.804, the Study on 5G media streaming
                extensions.
              </p>
              <p className={styles.whyMattersBody} style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                Sources: WID SP-180984 (5GMSA, Release 16), clauses 3 and 4; TS 26.501 V19.4.0,
                clauses 1 and 4.0.1 to 4.0.14.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/5gms/overview"
              standardsHref="/standards/5gms"
              softwareHref="/reference-tools/5gms"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        {/* Reference Tools for This Project -- its own section, real repos
            with their own icon (raised directly: "include a section on
            the Reference Tools or testbeds available in relation to the
            project... include its own icon", then "the cards should not
            be touched, we need a section" after a first pass folded this
            into the Reference Tools destination card above). Generalised
            into ProjectRepoSection (2026-09-25) once the other 16 project
            pages needed the exact same section, not a hand-rolled copy
            per page. */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={displayNameOf(PROJECT)} accent={ACCENT} />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              5GMS separates control from media: the Application Function (AF) manages sessions and
              policy, while the Application Server (AS) actually delivers the content. The reference
              points below (M1-M8) are the named interfaces that connect these pieces together — most
              are 3GPP-standardised APIs; M8 is private and beyond the scope of standardisation. The table shows the downlink (5GMSd) case.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a> (5GMS general
              description and architecture),{' '}
              <a href="https://www.3gpp.org/dynareport/26512.htm">TS 26.512</a> (5GMS protocols and
              APIs), <a href="https://www.3gpp.org/dynareport/26510.htm">TS 26.510</a> (generalised
              media delivery provisioning and media session handling, created in Release 18),{' '}
              <a href="https://www.3gpp.org/dynareport/26511.htm">TS 26.511</a> (5GMS profiles, codecs
              and formats). Related UE data collection and reporting is specified in{' '}
              <a href="https://www.3gpp.org/dynareport/26531.htm">TS 26.531</a> (architecture) and{' '}
              <a href="https://www.3gpp.org/dynareport/26532.htm">TS 26.532</a> (protocols and
              formats).
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Reference point</th>
                    <th>Connects</th>
                    <th>Standardised?</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {M1_M8.map((r) => (
                    <tr key={r.ref}>
                      <td className={styles.feeTableTier}>{r.ref}</td>
                      <td>{r.connects}</td>
                      <td>{r.standardised}</td>
                      <td>{r.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              The AF also reaches the 5G Core: directly from a trusted data network, for example the
              PCF for policy and QoS, or through the NEF from an external one.
            </p>

            <p>
              The downlink direction (5GMSd) uses a &quot;d&quot; suffix (M1d to M8d) and the uplink
              direction (5GMSu) a &quot;u&quot; suffix (M1u to M8u). The 5G-MAG reference tools
              implement the downlink direction.
            </p>

            <p>
              Two points on the specification structure are worth noting for implementers. First, in
              Release 18 the provisioning and media session handling operations moved from TS 26.512
              to TS 26.510, which a 5GMS System and a Real-Time media Communication (RTC) System can
              both use; TS 26.512 refers to them. Up to Release 17 they are specified in TS 26.512,
              and TS 26.510 does not exist. Second, 5GMS consumption and QoE metrics reporting can feed the generic UE
              data collection framework specified in TS 26.531 (architecture) and TS 26.532 (protocols
              and formats), which is where event exposure to consuming functions such as the Network
              Data Analytics Function (NWDAF) or an Event Consumer AF is defined.
            </p>

            <p>
              5G-MAG&apos;s own{' '}
              <a href={useBaseUrl('/docs/Reference_Tools_5G_Media_Streaming.pdf')}>
                reference tools overview slide deck
              </a>{' '}
              maps these reference tools to the architecture above, and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/6">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>{' '}
              &middot; <Link to="/standards/data-collection">UE Data Collection, Reporting and Event
              Exposure</Link> &middot; <Link to="/standards/dvb-i">DVB-I Services over 5G Systems</Link>{' '}
              &middot; <Link to="/standards/rtc">Real-time Media Communication (RTC) Architecture</Link>
            </p>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
