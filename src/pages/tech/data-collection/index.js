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
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/data-collection');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) and the content-delivery page built the
// same way -- replacing the former
// docs/tech/data-collection/data-collection-event-exposure.mdx doc. Same
// Layout/HubHero every hub page uses, not the doc-tier topic-banner. This
// topic had no techDoc entry in techTopics.js to begin with (its category
// link was never wired to the doc, and it has no autogen sub-docs either),
// so no sidebar-side change accompanies this move -- see techTopics.js's
// own "UE Data Collection, Reporting and Event Exposure" entry.
const DOC_REPORT_ICON = (
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
    <path d="M9 17l0 -5" />
    <path d="M12 17l0 -1" />
    <path d="M15 17l0 -3" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['content-delivery'] in
// src/data/baskets.js, taxonomy.json's basket for this project) -- a plain
// literal here rather than importing the whole map for one color, same
// reasoning as the 5gms and content-delivery pages' own ACCENT.
const ACCENT = '#00a0d2';

const REFERENCE_POINTS = [
  { ref: 'R1', endpoints: 'Provisioning AF ↔ DCAF', service: 'Ndcaf_DataReportingProvisioning (TS 26.532)', purpose: 'Create/modify provisioning sessions, data reporting configurations and Data Access Profiles.' },
  { ref: 'R2', endpoints: 'Direct Data Collection Client (UE) ↔ DCAF', service: 'Ndcaf_DataReporting (TS 26.532)', purpose: 'Fetch reporting configuration and submit reports directly; encrypted transfer required.' },
  { ref: 'R3', endpoints: 'Indirect Data Collection Client (ASP server) ↔ DCAF', service: 'Ndcaf_DataReporting (TS 26.532)', purpose: 'Fetch configuration and submit reports collected from UE Applications (via R8).' },
  { ref: 'R4', endpoints: 'Application Server ↔ DCAF', service: 'Ndcaf_DataReporting (TS 26.532)', purpose: 'Fetch configuration and submit reports from the server side.' },
  { ref: 'R5', endpoints: 'DCAF ↔ NWDAF', service: 'Naf_EventExposure / Nnef_EventExposure (TS 29.517)', purpose: 'Expose processed events to network analytics.' },
  { ref: 'R6', endpoints: 'DCAF ↔ Event Consumer AF', service: 'Naf_EventExposure / Nnef_EventExposure (TS 29.517)', purpose: 'Expose processed events to a consuming Application Function.' },
];

export default function DataCollection() {
  const coverImg = useBaseUrl('/assets/images/projects/data-collection.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Describes the 3GPP DCAF architecture, its R1-R6 reference points, and how UE data is reported and exposed to consumers as events."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={DOC_REPORT_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            User data collection and reporting, and exposure of network events to consumers
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  User Equipment (UE) data collection covers the 3GPP mechanisms by which a device
                  reports data, such as media consumption and quality of experience (QoE), to the
                  network, and by which the network exposes events to consuming functions. For media
                  services this feeds analytics and delivery optimisation.
                </p>
                <p>
                  This page covers the reference tooling and technical resources for the Data
                  Collection Application Function (DCAF) and event exposure framework. 5G-MAG tracks
                  this work and maintains related reference implementations. For acronyms used here,
                  see the <Link to="/tech/glossary">Glossary</Link>.
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
                Every media service that needs UE-side data — streaming QoE, RTC quality, or a future
                data domain nobody has defined yet — would otherwise have to build its own collection,
                provisioning and exposure stack from scratch. TS 26.531&apos;s DCAF framework is
                deliberately generic, so the same Data Collection Application Function, reference
                points and provisioning model are reused whether it runs standalone or embedded in 5G
                Media Streaming. Data Access Profiles are what keep that reuse safe: a consumer such as
                the NWDAF receives only the aggregated events a profile permits, not raw per-report
                data, so adding a new consumer doesn&apos;t mean widening what everyone else can see.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="#how-it-works"
              standardsHref="/standards/data-collection"
              softwareHref="/reference-tools/data-collection/"
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

        <section className={styles.section} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              The data collection and reporting framework is specified by 3GPP SA4 in two
              documents: TS 26.531 (the stage-2 architecture) and TS 26.532 (the stage-3 protocols
              and formats). The framework is deliberately abstract, so the same Data Collection
              Application Function (DCAF), the same reference points and the same provisioning
              model are reused whether the DCAF runs standalone or embedded in 5G Media Streaming.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26531.htm">TS 26.531</a> (Data Collection and
              Reporting, architecture),{' '}
              <a href="https://www.3gpp.org/dynareport/26532.htm">TS 26.532</a> (protocols and
              formats).
            </p>

            <h3>Framework and reference architecture</h3>
            <p>
              TS 26.531 defines a generic architecture intended to be instantiated inside another
              data domain, so the same DCAF, reference points and provisioning model are reused
              whether it runs standalone or embedded in 5G Media Streaming ({' '}
              <a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a>,{' '}
              <a href="https://www.3gpp.org/dynareport/26512.htm">TS 26.512</a>). The framework
              distinguishes a small set of functional entities:
            </p>
            <ul>
              <li>
                <strong>Data Collection Application Function (DCAF)</strong> &mdash; receives
                provisioning from the application, offers reporting configurations to clients,
                collects and buffers reported data, applies the configured processing, and exposes
                the resulting events.
              </li>
              <li>
                <strong>Provisioning AF</strong> &mdash; configures the DCAF: it creates
                provisioning sessions, defines reporting configurations (sampling, reporting
                conditions), and sets the Data Access Profiles that govern exposure.
              </li>
              <li>
                <strong>Direct Data Collection Client</strong> &mdash; a UE-side client that fetches
                its configuration from the DCAF and reports directly to it over an encrypted
                transfer protocol.
              </li>
              <li>
                <strong>Indirect Data Collection Client</strong> &mdash; a subfunction of the
                Application Service Provider&apos;s server that collects data from UE Applications
                (at reference point R8) and reports it onward to the DCAF.
              </li>
              <li>
                <strong>Application Server (AS)</strong> &mdash; a server-side source of reports for
                the same data set.
              </li>
              <li>
                <strong>Event Consumer AF</strong> &mdash; the function that subscribes to and
                receives exposed events; a typical consumer is the NWDAF ({' '}
                <a href="https://www.3gpp.org/dynareport/23288.htm">TS 23.288</a>), the 5G core
                analytics function.
              </li>
            </ul>

            <h3 id="reference-points-r1-to-r6">Reference points R1 to R6</h3>
            <p>
              The reference points are the named interfaces between the DCAF and the surrounding
              entities. The framework groups them by role: provisioning (R1), data reporting (R2,
              R3, R4) and event exposure (R5, R6). The table below is this page&apos;s{' '}
              <Link to="/tech/blueprints">implementation blueprint</Link>: for each reference point
              it names the endpoints, the service/API that operates over it, and what it does.
            </p>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Reference point</th>
                    <th>Endpoints</th>
                    <th>Service / API</th>
                    <th>What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_POINTS.map((r) => (
                    <tr key={r.ref}>
                      <td className={styles.feeTableTier}>{r.ref}</td>
                      <td>{r.endpoints}</td>
                      <td>{r.service}</td>
                      <td>{r.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              All clients that wish to report must first obtain a data collection and reporting
              configuration from the DCAF at R2, R3 or R4 as appropriate. The DCAF may expose events
              either directly as an Application Function (using the <code>Naf_EventExposure</code>{' '}
              operations) or through the Network Exposure Function (using the{' '}
              <code>Nnef_EventExposure</code> variants, with the NEF northbound/southbound APIs in{' '}
              <a href="https://www.3gpp.org/dynareport/29522.htm">TS 29.522</a> and{' '}
              <a href="https://www.3gpp.org/dynareport/29591.htm">TS 29.591</a>).
            </p>

            <h3>Provisioning and the exposure controls (R1)</h3>
            <p>
              Provisioning at R1 uses the <code>Ndcaf_DataReportingProvisioning</code> service (TS
              26.532). The flow has two parts: create a data reporting{' '}
              <strong>provisioning session</strong> (associating an Event ID and one or more data
              reporting configuration IDs with an Application Service Provider), then create one or
              more <strong>data reporting configurations</strong> that describe how data is sampled
              and reported and, critically, the <strong>Data Access Profiles</strong> that constrain
              exposure.
            </p>
            <p>
              A Data Access Profile specifies the processing that the DCAF must perform on collected
              UE data before it is exposed. For example, a profile can require time-window
              aggregation over a fixed duration using an aggregation function such as SUM, and can
              restrict which consumer types (for example NWDAF or a generic Event Consumer AF) may
              receive the resulting event. This is the mechanism by which the framework enforces
              data minimisation and controlled exposure: consumers at R5/R6 receive synthesised
              event data, not raw per-report data. The provisioning request bodies for creating a
              session and a configuration are shown on the{' '}
              <Link to="/reference-tools/data-collection/">developer scope page</Link>.
            </p>

            <h3>Data reporting (R2/R3/R4)</h3>
            <p>
              At R2 the Direct Data Collection Client first obtains its configuration, then opens a
              data reporting session (identifying the external application and the supported data
              domains, for example <code>COMMUNICATION</code>), and then submits reports. TS 26.532
              defines the reporting rules, including a <code>reportingFormat</code> URI per data
              reporting rule, and defines data types for 5GMS features (such as media streaming
              access activity) whose corresponding event types appear in TS 29.517 for exposure. An
              encrypted transfer protocol is mandated at R2 to protect the secrecy and integrity of
              collected UE data in transit. R3 (indirect client) and R4 (Application Server) use the
              same <code>Ndcaf_DataReporting</code> service, differing only in the reporting source.
            </p>

            <h3>Event subscription and exposure (R5/R6)</h3>
            <p>
              At R6, an Event Consumer AF creates an individual event exposure subscription on the
              DCAF using <code>Naf_EventExposure_Subscribe</code> (TS 29.517), naming the events of
              interest, optional event filters, a reporting method (for example periodic with a
              report period), and a notification URI. The DCAF then delivers matching events with{' '}
              <code>Naf_EventExposure_Notify</code>. R5 provides the same exposure toward the NWDAF.
              Because exposure is governed by the Data Access Profiles set at R1, a subscriber only
              receives the processed events that the provisioning permits for its consumer type.
            </p>

            <h3>Deployment shapes</h3>
            <p>
              The DCAF can be deployed standalone or integrated with 5G Downlink Media Streaming
              (5GMSd). In the standalone deployment the DCAF collects and exposes UE-side data on its
              own. In the integrated deployment it is combined with the 5GMSd data reporting
              framework, so media-specific reporting (such as QoE and consumption reporting) uses
              the DCAF as its collection endpoint. Docker-Compose setups are provided to bring up the
              standalone DCAF quickly for testing. The developer-facing detail, request/response
              examples and tutorials are on the{' '}
              <Link to="/reference-tools/data-collection/">developer scope page</Link>.
            </p>

            <p>
              The slide deck below introduces the UE data collection, reporting and event exposure
              framework; download the file for the full detail.
            </p>
            <div className="pdf-embed-wrapper">
              <iframe
                loading="lazy"
                className="pdf-embed"
                src={useBaseUrl('/docs/Reference_Tools_UE_data_collection.pdf')}
                title="UE Data Collection reference tools overview slide deck"
              ></iframe>
            </div>
            <p>
              <a href={useBaseUrl('/docs/Reference_Tools_UE_data_collection.pdf')}>
                Download the slide deck with more information
              </a>{' '}
              &middot; the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/6">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Recorded talk:</strong>{' '}
              <Link to="/tech/exchanges#ue-data-collection-and-reporting-framework-for-event-exposure-3gpp-release-17">
                UE Data Collection and Reporting framework for Event Exposure (3GPP Release 17)
              </Link>
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/standards/data-collection">Standards: UE Data Collection, Reporting and
              Event Exposure</Link>{' '}
              &middot; <Link to="/reference-tools/data-collection/">UE Data Collection, Reporting
              and Event Exposure Reference Tools</Link>{' '}
              &middot; <Link to="/tech/5gms">5G Media Streaming (5GMS)</Link>: the media delivery
              framework this data collection serves
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
