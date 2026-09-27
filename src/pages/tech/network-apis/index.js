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
// instruction: "the name should be the one in the taxonomy") -- the page's
// former hand-typed title ("Connectivity Quality with Network APIs") was
// neither this nor taxonomy.json's `displayName` ("Network APIs for
// Connectivity Quality"). ProjectRepoSection still needs displayNameOf()
// separately below: it matches against ALL_REPOS's own projectName field,
// which baskets.js builds from displayNameOf(), not from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/network-apis');
const PROJECT_NAME = PROJECT.name;

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

const KEY_SPECS = [
  {
    ref: 'CAMARA Quality on Demand (QoD) API',
    purpose: 'Requests stable latency or prioritised throughput for a media flow on demand, for example a low-latency contribution link.',
  },
  {
    ref: 'CAMARA Connectivity Insights API',
    purpose: "Checks whether the network can currently meet an application's quality requirements before or during a session.",
  },
  {
    ref: 'CAMARA Network Slice Booking API',
    purpose: 'Reserves network slice resources for a given area and time window ahead of an event.',
  },
  {
    ref: '3GPP TS 23.434 (SEAL)',
    purpose: 'Provides common enabling services (group management, configuration, network resource management) that support network capability exposure.',
  },
];

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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
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

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              A CAMARA API is deliberately thin: the media application sees a small REST resource,
              for example a QoD <code>session</code> or a slice <code>booking</code>. Behind that
              resource sit two further layers, so a single API call travels CAMARA API &rarr; NEF
              (3GPP northbound exposure) &rarr; PCF (policy decision) &rarr; SMF/UPF (enforcement on
              the device&apos;s PDU session, its active data connection to the network).
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>API / specification</th>
                    <th>What it does for media</th>
                  </tr>
                </thead>
                <tbody>
                  {KEY_SPECS.map((r) => (
                    <tr key={r.ref}>
                      <td className={styles.feeTableTier}>{r.ref}</td>
                      <td>{r.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              <strong>3GPP northbound exposure.</strong> The Network Exposure Function (NEF) is the
              5G Core function that exposes capabilities to an Application Function (AF). Its
              northbound APIs are specified in{' '}
              <a href="https://www.3gpp.org/dynareport/29522.htm">TS 29.522</a>. For QoS the relevant
              northbound API is <code>AsSessionWithQoS</code> (the RESTful form of the{' '}
              <code>Nnef_AFsessionWithQoS</code> service). In 4G/EPC the equivalent function is the
              Service Capability Exposure Function (SCEF); operators commonly deploy a combined
              SCEF+NEF. Discovery, onboarding and authentication of these APIs are handled by the
              Common API Framework (CAPIF),{' '}
              <a href="https://www.3gpp.org/dynareport/23222.htm">TS 23.222</a> /{' '}
              <a href="https://www.3gpp.org/dynareport/29222.htm">TS 29.222</a>.
            </p>

            <p>
              <strong>5G Core policy and control.</strong> The NEF forwards the request to the Policy
              Control Function (PCF) via <code>Npcf_PolicyAuthorization</code> (
              <a href="https://www.3gpp.org/dynareport/29514.htm">TS 29.514</a>). The PCF authorises
              the AF request and installs policy on the subscriber&apos;s PDU session, which the
              Session Management Function (SMF) and User Plane Function (UPF) enforce. Slice-related
              requests instead touch slice management (provisioning) and, at runtime, the SEAL
              Network Slice Capability Enablement (NSCE) service in{' '}
              <a href="https://www.3gpp.org/dynareport/23434.htm">TS 23.434</a>.
            </p>

            <p>
              The application never sees the PCF, SMF or UPF. This is the value CAMARA adds: one
              operator-agnostic contract in place of per-operator 3GPP integration. It is also the
              source of most of the open questions 5G-MAG records on the analysis pages, because
              information that exists inside the core (measured latency, service-area availability)
              is not always surfaced back through the CAMARA abstraction.
            </p>

            <p>
              <strong>Common building blocks.</strong> Cross-cutting behaviour is defined once in the
              CAMARA Commonalities working group and reused by every API on the analysis pages: a
              device object identified by <code>phoneNumber</code>, <code>networkAccessIdentifier</code>{' '}
              or an IP address; application-server and port scoping so QoS applies to a specific flow
              rather than all of a device&apos;s traffic; OAuth 2.0 authorisation (three-legged for
              operations on a specific end user, two-legged for back-office operations); asynchronous
              notifications delivered as{' '}
              <a href="https://cloudevents.io/">CloudEvents</a> 1.0 JSON to a consumer-supplied sink;
              and a common error model with an optional <code>x-correlator</code> tracing header.
            </p>

            <p>
              <strong>API families.</strong> The CAMARA APIs 5G-MAG analyses fall into a few families:
              QoS for a flow or device (
              <Link to="/tech/network-apis/camara-quality-on-demand">Quality on Demand</Link>,{' '}
              <Link to="/tech/network-apis/camara-qos-provisioning">QoS Provisioning</Link>,{' '}
              <Link to="/tech/network-apis/camara-qos-booking">QoS Booking</Link> and{' '}
              <Link to="/tech/network-apis/camara-qos-booking-assignment">QoS Booking and Assignment</Link>
              , all consuming a named profile from{' '}
              <Link to="/tech/network-apis/camara-qos-profiles">QoS Profiles</Link>); area and time
              reservation for many devices (
              <Link to="/tech/network-apis/camara-network-slice-booking">Network Slice Booking</Link>{' '}
              and{' '}
              <Link to="/tech/network-apis/camara-dedicated-networks">Dedicated Networks</Link>); and
              requirements and monitoring (
              <Link to="/tech/network-apis/camara-application-profiles">Application Profiles</Link>{' '}
              declares an application&apos;s needs once, and{' '}
              <Link to="/tech/network-apis/camara-connectivity-insights">Connectivity Insights</Link>{' '}
              plus{' '}
              <Link to="/tech/network-apis/camara-connectivity-insights-subscriptions">
                Connectivity Insights Subscriptions
              </Link>{' '}
              check whether the network can meet them). All of these APIs are still pre-1.0
              (<code>v0</code>/<code>wip</code>) at the time of writing, delivered through
              CAMARA&apos;s twice-yearly meta-releases, so field names and enumerations can change
              between releases.
            </p>

            <p>
              The{' '}
              <Link to="/tech/network-apis/network-api-initiatives">
                CAMARA Project and 3GPP APIs
              </Link>{' '}
              page indexes every individual API analysis above. Two further sets of pages apply this
              to real workflows: <Link to="/tech/network-apis/content-production/introduction">
                Content Production &amp; Contribution
              </Link>{' '}
              covers professional content production and contribution scenarios, and{' '}
              <Link to="/tech/network-apis/live-media-distribution/introduction">
                Live Media Distribution
              </Link>{' '}
              covers the visibility gap between content providers and network operators for live
              distribution.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/5gms">5G Media Streaming (5GMS)</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
