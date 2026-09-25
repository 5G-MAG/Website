import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy"), rather than
// an independent literal that happens to match today but can drift from a
// later taxonomy rename.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/dvb-i');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms and
// /tech/5g-mbs), replacing the former docs/tech/dvb-i/dvb-i-5g.mdx doc. Same
// Layout/HubHero every hub page (/tech, /standards, /developer...) uses, not
// the doc-tier topic-banner. Its full technical content (data model,
// implementation blueprint, delivery-over-5G scenarios) is ported into this
// page's own "How It Works" section below rather than kept as a separate
// analysis doc, because this project has no repos of its own and no other
// sub-page besides the one real doc that survives this change: the
// requirements/gaps analysis at docs/tech/dvb-i/analysis-dvb-i-over-5g-gaps.mdx,
// linked from the Technical Analysis card's footerLinks.
//
// taxonomy.json's own icon key for this project is "inbox-check" -- the
// literal path data below is copied from iconCatalog['inbox-check'] there.
const INBOX_CHECK_ICON = (
  <>
    <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
    <path d="M16 3l-4 4l-4 -4" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['5g-broadcast'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, since this page only ever needs its own single
// project's accent.
const ACCENT = '#e07b1a';

const BLUEPRINT_STEPS = [
  {
    step: '1. Locate a Service List Registry, or a pre-configured Service List',
    what: 'The client obtains an SLR endpoint (or a built-in/provisioned Service List URL directly) via a pre-configured URL, broadcast NIT/BAT signalling, a CICAM, or mDNS/DNS-SD.',
    clause: '5.1.3.1 (the options); 5.1.3.3–5.1.3.9 (each mechanism)',
  },
  {
    step: '2. Query the Service List Registry',
    what: 'HTTP GET to the SLR endpoint, optionally with filter parameters (TargetCountry, regulatorListFlag, Delivery, Language, Genre, ProviderName, inlineImages, image_variant, in that fixed order); the SLR returns an XML list of Service List Entry Points.',
    clause: '5.1.3.2 (the query); 5.3.1–5.3.2 (the response schema)',
  },
  {
    step: '3. Fetch the chosen Service List',
    what: 'HTTP GET to the Service List Server named in the entry point; returns the Service List XML document.',
    clause: '5.5.1 (ServiceList)',
  },
  {
    step: '4. Select a delivery instance per service',
    what: 'Where a Service has more than one ServiceInstance (for example broadcast and DASH), the client orders them by the @priority attribute (lower value wins); ties are implementation-dependent.',
    clause: '5.5.4 (ServiceInstanceType)',
  },
  {
    step: '5. Hybrid clients only: de-duplicate against a tuned broadcast service',
    what: "If the client also receives DVB-T/C/S directly, it matches a DVB-I instance against an already-tuned service using DVB Triplet/Network ID metadata, so it isn't listed twice.",
    clause: '5.2.1 (Service Instance Matching)',
  },
  {
    step: '6. Request Content Guide data',
    what: 'HTTP GET to the Content Guide Server referenced in the Service List entry; timestamp-filtered or now/next-filtered schedule, or full programme information, on demand.',
    clause: '6.5 (Schedule Information Requests); 6.6 (Programme Information Request)',
  },
];

const SCENARIOS = [
  {
    scenario: 'Standalone DVB-I over 5G Broadcast',
    bearer: 'Broadcast only',
    media: 'DVB-MABR carrying DVB-DASH',
    transport: 'ETSI TS 103 720 (LTE-based 5G Broadcast)',
  },
  {
    scenario: 'DVB-I over 5GMS',
    bearer: 'Unicast only',
    media: 'DVB-DASH',
    transport: '3GPP 5GMS (TS 26.501 and companions)',
  },
  {
    scenario: 'Concurrent / hybrid',
    bearer: 'Broadcast and unicast',
    media: 'DVB-DASH, DVB-MABR on the broadcast leg',
    transport: 'Both of the above',
  },
];

export default function DvbI() {
  const coverImg = useBaseUrl('/assets/images/projects/dvb-i.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Explains DVB-I service discovery and how DVB A178 deploys DVB-I services over 5G Broadcast, 5G Media Streaming, and hybrid delivery."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={INBOX_CHECK_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            DVB-I service discovery combined with 5GMS and 5G Broadcast delivery
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  DVB-I (DVB internet, an ETSI-published DVB specification) lets a device discover and
                  present linear TV and radio services delivered over IP, listing broadcast and
                  broadband streams together in a single service list. This page covers how DVB-I
                  service discovery works over 5G Systems, so that services carried by 5G Broadcast or
                  5G Media Streaming can appear alongside other IP-delivered content.
                </p>
                <p>
                  5G-MAG tracks this work and maintains related reference tooling, built by contributors
                  including Fraunhofer FOKUS, Dolby Laboratories, Qualcomm and the BBC. The project has
                  no repositories of its own: the reference tools linked below implement the delivery
                  scenarios against the specifications this page describes.
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
                Without DVB-I, a broadcaster&apos;s 5G Broadcast service and its 5GMS unicast service
                would look like two unrelated things to a device, discovered separately with no
                common presentation. DVB-I&apos;s service instance model fixes that: one logical
                service can carry several delivery instances — a broadcast instance and a unicast
                instance for the same channel — and the device picks between them by priority, or, for
                a hybrid device already tuned to the broadcast signal directly, de-duplicates the two
                so the same channel doesn&apos;t appear twice. That is what lets broadcast and
                broadband content sit in one combined service list instead of two separate discovery
                systems a viewer has to reconcile themselves.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/dvb-i/analysis-dvb-i-over-5g-gaps"
              standardsHref="/standards/dvb-i"
              softwareHref="/reference-tools/dvb-i/"
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
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              DVB-I service discovery is delivery-agnostic; 5G enters at one specific point, where a
              service instance&apos;s delivery parameters point at a 5G Media Streaming or 5G Broadcast
              transport.
            </p>

            <p>
              <strong>Key specifications:</strong> DVB A177 / ETSI TS 103 770 (DVB-I Service Discovery
              and Programme Metadata), DVB A178 / ETSI TR 103 972 (DVB-I service delivery over 5G
              Systems deployment guidelines).
            </p>

            <h3>DVB-I service discovery</h3>
            <p>
              DVB-I service discovery is specified by DVB A177, published in identical technical form by
              ETSI as TS 103 770 (Digital Video Broadcasting (DVB); Service Discovery and Programme
              Metadata for DVB-I). It is an XML-based, delivery-agnostic layer: the client discovers
              services and their metadata, and the delivery of the actual media is handled by whatever
              bearer each service references.
            </p>
            <ul>
              <li>
                <strong>Service List</strong>: the XML document a provider publishes. It contains one or
                more <code>Service</code> entries, each with a stable identifier, presentation metadata
                (names, logos), optional targeting, and one or more service instances.
              </li>
              <li>
                <strong>Service Instance</strong>: a concrete way to obtain a given service. Each
                instance carries a delivery parameter set that binds the service to a specific bearer
                and format. Multiple instances on one service is the mechanism used to describe the same
                channel over unicast, multicast, and broadcast at the same time.
              </li>
              <li>
                <strong>Content Guide / Programme Metadata</strong>: schedule (now/next and longer) and
                on-demand programme information, expressed with the DVB schemas aligned to the
                TV-Anytime data model, retrievable per service.
              </li>
            </ul>
            <p>
              The delivery-parameter types inside a service instance are the extension point the 5G work
              relies on: a DASH delivery (a DVB-DASH presentation) for unicast, a DVB multicast
              (DVB-MABR) session for scalable delivery, or a broadcast source carried on a broadcast
              bearer. Where a service has more than one instance, TS 103 770 Clause 5.5.4
              (<code>ServiceInstanceType</code>) gives each instance a <code>@priority</code> attribute:
              a lower value means higher priority, and the client selects accordingly. Tie-breaking
              between equal-priority instances is implementation-dependent — a client&apos;s own capability
              and coverage logic (and any broadcast/unicast fallback policy) comes in on top of the{' '}
              <code>@priority</code> ordering. A hybrid client that also receives the same content over
              classical DVB-T/C/S separately performs a distinct step, Service Instance Matching (Clause
              5.2.1): de-duplicating a DVB-I-discovered instance against an already-tuned broadcast
              service using DVB Triplet/Network ID metadata, so the two don&apos;t appear twice in the
              combined list.
            </p>
            <p>
              A client needs a starting point: TS 103 770 defines a Service List Registry (SLR) query API
              so a client can find service lists (for example filtered by country or provider) rather
              than relying on a hard-coded URL. In a 5G deployment the registry and service-list endpoints
              are ordinary HTTPS resources and can themselves be delivered over the unicast path.
            </p>

            <h3>Implementation blueprint</h3>
            <p>
              This is the client-side bootstrap sequence from a cold start to content-guide data, checked
              against ETSI TS 103 770 V1.2.1 (2024-09). Most of it is delivery-network-agnostic — steps
              1–3, 5 and 6 are plain DVB-I mechanics that work the same way over cable, satellite,
              terrestrial DTT or 5G. <strong>Step 4 is the one place &quot;over 5G&quot; enters</strong>: a
              service instance&apos;s delivery parameters can point at a DVB-DASH presentation carried
              over 5G Media Streaming (<a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a>)
              or a DVB-MABR session carried over 5G Broadcast (ETSI TS 103 720) — that specific mapping is
              what DVB A178 / TR 103 972 defines.
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>What happens</th>
                    <th>Clause</th>
                  </tr>
                </thead>
                <tbody>
                  {BLUEPRINT_STEPS.map((r) => (
                    <tr key={r.step}>
                      <td className={styles.feeTableTier}>{r.step}</td>
                      <td>{r.what}</td>
                      <td>{r.clause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.feeTableNote}>
              Verified against primary sources: checked directly against ETSI TS 103 770 V1.2.1
              (2024-09), downloaded from the ETSI deliverable server, and cross-checked against the DVB
              A177r8 / draft ETSI TS 103 770 V1.3.1 text (dated June 2026) for the same clauses — both
              give identical clause numbers and content for every row above. Instance selection is
              driven by the <code>@priority</code> attribute on <code>ServiceInstanceType</code> (Clause
              5.5.4), with capability/coverage logic only breaking ties between equal-priority instances;
              &quot;Service Instance Matching&quot; (Clause 5.2.1) is a distinct, hybrid-only step
              (de-duplicating against a directly-tuned broadcast service), not the general
              instance-selection mechanism.
            </p>

            <h3>Delivery over 5G Systems</h3>
            <p>
              The deployment guidance for carrying DVB-I over 5G is DVB A178, published by ETSI as TR 103
              972 (DVB-I service delivery over 5G Systems; Deployment Guidelines). It was produced by the
              DVB / 5G-MAG Joint Task Force, which mapped the commercial requirements captured in DVB C100
              (Commercial Requirements for DVB-I over 5G, 2021) into a reference architecture and
              per-scenario workflows, and recorded the specification gaps it found. Because TR 103 972 is
              a technical report, its output is guidance and recommended changes rather than normative
              requirements.
            </p>
            <p>
              The report proposes a single DVB-I-over-5G reference architecture that supports all three
              service scenarios, built on a clean split between layers: the <strong>service layer
              (DVB-I)</strong> handles discovery, selection and programme metadata, unchanged across
              scenarios; the <strong>media format layer (DVB)</strong> is DVB-DASH (ETSI TS 103 285) for
              the media presentation and DVB-MABR (ETSI TS 103 769) where multicast delivery is used; and
              the <strong>transport layer (3GPP / ETSI)</strong> is 5G Media Streaming for unicast and the
              LTE-based 5G Broadcast system (ETSI TS 103 720) for broadcast.
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Bearer</th>
                    <th>DVB media</th>
                    <th>3GPP / ETSI transport</th>
                  </tr>
                </thead>
                <tbody>
                  {SCENARIOS.map((r) => (
                    <tr key={r.scenario}>
                      <td className={styles.feeTableTier}>{r.scenario}</td>
                      <td>{r.bearer}</td>
                      <td>{r.media}</td>
                      <td>{r.transport}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              <strong>Standalone DVB-I over 5G Broadcast.</strong> The service list is delivered (or
              pre-provisioned) and the selected service instance references a broadcast source. The
              client receives a DVB-MABR-style multicast on the 5G Broadcast bearer and reconstructs the
              DVB-DASH presentation locally. There is no unicast return leg for the media itself; any
              interactivity depends on separate connectivity.
            </p>
            <p>
              <strong>DVB-I over 5GMS.</strong> The service instance references a DASH source served
              through 5G Media Streaming. The 5GMS downlink architecture (3GPP TS 26.501) provides the
              Media Application Server, session handling, and reporting; the DVB-DASH presentation is
              fetched and rendered by a 5GMS-aware client. The DVB-I layer above is unchanged.
            </p>
            <p>
              <strong>Concurrent / hybrid.</strong> Both a broadcast instance and a unicast instance are
              present for the same service. The client selects or switches between them based on coverage
              and capability, for example receiving popular linear channels over broadcast while using
              unicast for on-demand or out-of-coverage fallback.
            </p>
            <p>
              A specific alignment question the report examines is the relationship between DVB-I service
              discovery and the 3GPP service announcement used on the broadcast/multicast path: how a
              DVB-I service list can reference, or coexist with, that announcement rather than duplicating
              the same information in two places. This is one of the areas where recommended changes were
              fed back to the responsible bodies.
            </p>
            <p>
              The DVB-I layer itself exposes HTTP(S) interfaces: the Service List Registry query API, the
              service-list endpoint, and the content-guide/metadata endpoints, all defined in TS 103 770.
              On the transport side the reference points are those of the underlying 3GPP/ETSI systems
              rather than DVB — on the unicast path, the 5GMS reference points (for example the interfaces
              between the 5GMS-Aware Application, the Media Session Handler, the 5GMS AF, and the Media
              Application Server) apply as defined in 3GPP TS 26.501, see the{' '}
              <Link to="/tech/5gms">5GMS tech page</Link>; on the broadcast path, the reception and
              session-acquisition behaviour is defined by ETSI TS 103 720 and the underlying LTE
              terrestrial broadcast / MBMS procedures, see the{' '}
              <Link to="/tech/5g-broadcast">5G Broadcast tech page</Link>. DVB-I contributes the delivery
              parameters that tell the client which of these transports to use for a given service
              instance; it does not redefine the transport reference points.
            </p>
            <p>
              Because A178 is a technical report, a substantial part of its value is the catalogue of gaps
              it identified and the recommended changes to specifications owned by DVB, 3GPP and ETSI. The{' '}
              <Link to="/tech/dvb-i/analysis-dvb-i-over-5g-gaps">
                Requirements, Specifications and Gaps
              </Link>{' '}
              page maps the commercial requirements to the specifications addressing them and re-checks
              the fourteen gaps ETSI TR 103 972 recorded.
            </p>

            <p>
              The slide deck below introduces DVB-I service discovery over 5G Systems; download the file
              for the full detail.
            </p>
            <div className="pdf-embed-wrapper">
              <iframe
                loading="lazy"
                className="pdf-embed"
                src={useBaseUrl('/docs/Reference_Tools_DVB_I_over_5G.pdf')}
                title="DVB-I over 5G reference tools overview slide deck"
              />
            </div>
            <p>
              <a href={useBaseUrl('/docs/Reference_Tools_DVB_I_over_5G.pdf')}>
                Download the slide deck with more information
              </a>{' '}
              and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/17">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/standards/dvb-i">Standards: DVB-I Services over 5G Systems</Link> &middot;{' '}
              <Link to="/reference-tools/dvb-i/">
                DVB-I Services over 5G Systems Reference Tools
              </Link>{' '}
              &middot; <Link to="/tech/5gms">5G Media Streaming (5GMS)</Link> and{' '}
              <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link>: the
              unicast and broadcast delivery paths
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
