import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, BASKETS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// ProjectRepoSection matches against ALL_REPOS's own projectName field,
// which baskets.js builds from displayNameOf() -- derive it from
// taxonomy data rather than hardcoding it.
const AI_TRAFFIC_PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/6g');

// This page's own taxonomy.json project (AI Traffic Characterization)
// carries basket "testbeds", not towards-6g, since it is fundamentally a
// testbed -- so it can't name this page after itself the way every other
// flagship page does. Direct instruction: use the towards-6g basket's own
// title instead, the same basket this page is grouped under via
// techTopics.js's BASKET_OVERRIDES (see the comment below).
const BASKET_TITLE = BASKETS.find((b) => b.key === 'towards-6g').title;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former docs/tech/6g.md
// doc. Same Layout/HubHero every hub page uses, not the doc-tier
// topic-banner.
//
// This page's taxonomy.json project, AI Traffic Characterization, carries
// basket "testbeds" (doc_url /testbeds/6g-testbed/), not towards-6g.
// techTopics.js keeps /tech/6g grouped under Towards 6G Media via an
// explicit BASKET_OVERRIDES entry (see its own comment), so this page
// uses the towards-6g accent and icon ("chip", src/data/taxonomy.json
// iconCatalog.chip) throughout, even though the Software destination it
// links to belongs to the project's own "testbeds" basket. There is no
// autogen sub-page folder for this topic (no docs/tech/6g/ directory), so
// "Technical Analysis" points at this page's own How It Works section
// rather than a separate doc, the same pattern content-delivery's page
// uses.
const CHIP_ICON = (
  <>
    <path d="M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
    <path d="M10 9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3" />
  </>
);

// The towards-6g basket's own accent (BASKET_ACCENT['towards-6g']
// in src/data/baskets.js) -- this page's basket per techTopics.js's
// BASKET_OVERRIDES, not the testbeds basket that AI Traffic
// Characterization otherwise carries.
const ACCENT = '#c4622f';

const IMT2030_SCENARIOS = [
  { scenario: 'Immersive communication', origin: 'Evolves eMBB', relevance: 'Primary scenario for high-rate and immersive media (volumetric, XR, high-resolution)' },
  { scenario: 'Massive communication', origin: 'Evolves mMTC', relevance: 'Sensor and device data; indirect (metadata, telemetry)' },
  { scenario: 'Hyper-reliable and low-latency communication (HRLLC)', origin: 'Evolves URLLC', relevance: 'Interactive and real-time media, remote production, haptics' },
  { scenario: 'Ubiquitous connectivity', origin: 'New', relevance: 'Broadcast/multicast reach, non-terrestrial delivery' },
  { scenario: 'AI and communication', origin: 'New', relevance: 'AI-native traffic management for media; AI/ML model and inference traffic as a workload' },
  { scenario: 'Integrated sensing and communication (ISAC)', origin: 'New', relevance: 'Context capture for media applications; not a delivery path in itself' },
];

const SIXG_STUDIES = [
  { study: 'TR 22.870', href: 'https://www.3gpp.org/dynareport/22870.htm', group: 'SA1', track: '6G Stage 1', focus: '6G use cases and candidate service requirements, clustered around the IMT-2030 usage scenarios' },
  { study: 'TR 26.870', href: 'https://www.3gpp.org/dynareport/26870.htm', group: 'SA4', track: '6G media', focus: 'Media aspects of a 6G system: media services, formats, traffic and delivery' },
  { study: 'TR 26.847', href: 'https://www.3gpp.org/dynareport/26847.htm', group: 'SA4', track: '5G media AI/ML', focus: 'Evaluation of AI and ML in 5G media services; evaluation testbeds, scenarios and metrics' },
  { study: 'TR 22.874', href: 'https://www.3gpp.org/dynareport/22874.htm', group: 'SA1', track: '5G AI/ML', focus: 'Traffic characteristics and performance requirements for AI/ML model transfer in 5GS' },
];

export default function Towards6GMedia() {
  const coverImg = useBaseUrl('/assets/images/projects/6g-testbed.png');
  return (
    <Layout
      title={BASKET_TITLE}
      description="Describes 5G-MAG's media requirements input to 6G standardisation at 3GPP and ITU-R, and its AI-driven testbed for media traffic analysis."
    >
      <HubHero
        title={BASKET_TITLE}
        icon={CHIP_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Early media requirements towards 6G standardisation
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  6G (IMT-2030) is the next generation of mobile standards, currently in the
                  research and requirements phase at 3GPP and ITU-R (International
                  Telecommunication Union Radiocommunication sector), with initial specifications
                  expected from 2028. 5G-MAG actively contributes media-specific requirements and
                  use cases to the 6G standardisation process, covering media delivery at extreme
                  data rates, Artificial Intelligence (AI)-native network management for media
                  traffic, immersive and haptic experiences, and the evolution of broadcast and
                  multicast. For acronyms used here, see the{' '}
                  <Link to="/tech/glossary">Glossary</Link>.
                </p>
                <p>
                  In parallel, the 5G-MAG 6G Testbed provides an early experimental platform for
                  AI-driven media traffic classification and optimisation over 5G networks,
                  informing future 6G design. The testbed produces labelled traffic datasets and
                  classification results that 5G-MAG uses to shape its requirement inputs to
                  3GPP.
                </p>
                {AI_TRAFFIC_PROJECT.sdos?.length > 0 && (
                  <div className={styles.capabilityTags}>
                    {AI_TRAFFIC_PROJECT.sdos.map((s) => (
                      <span key={s} className={styles.capabilityTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <img
                src={coverImg}
                alt={BASKET_TITLE}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>Why It Matters</h3>
              <p className={styles.whyMattersBody}>
                Requirements written at the study stage carry more weight when they&apos;re backed by
                measurement instead of assumption. AI workloads behave differently from classic media
                streaming — bursty request/response cycles, asymmetric uplink/downlink ratios,
                sensitivity to time-to-first-token as well as sustained throughput — and those
                differences matter for a 6G system meant to carry them. The 6G Testbed exists to
                characterise those patterns under controlled, reproducible network conditions, so
                5G-MAG&apos;s media-requirements input to 3GPP and ITU-R is grounded in real measured
                traffic behaviour rather than assumption alone.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="#how-it-works"
              standardsHref="/standards/6g"
              softwareHref="/testbeds/6g-testbed/"
              softwareIsTestbed
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
            <ProjectRepoSection projectNames={displayNameOf(AI_TRAFFIC_PROJECT)} accent={ACCENT} isTestbed />
          </div>
        </section>

        <section className={styles.section} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              No normative 6G specification exists yet. Everything below that concerns 6G
              behaviour is study-stage and provisional; where a number or requirement is not yet
              decided in 3GPP or ITU-R, it should be treated as an open question rather than a
              settled value.
            </p>

            <p>
              <strong>Key standardisation bodies:</strong> ITU-R IMT-2030 (framework), 3GPP
              working group SA1 (requirements), 3GPP working groups SA2 and SA4 (architecture and
              media aspects).
            </p>

            <h3>The IMT-2030 usage scenarios and where media sits</h3>
            <p>
              The global 6G framework is{' '}
              <a href="https://www.itu.int/dms_pubrec/itu-r/rec/m/R-REC-M.2160-0-202311-I!!PDF-E.pdf">
                Recommendation ITU-R M.2160-0
              </a>{' '}
              (November 2023). It defines six usage scenarios, mapped below to their 5G
              (IMT-2020) origin and to media relevance.
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>IMT-2030 usage scenario</th>
                    <th>Origin</th>
                    <th>Media relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {IMT2030_SCENARIOS.map((r) => (
                    <tr key={r.scenario}>
                      <td className={styles.feeTableTier}>{r.scenario}</td>
                      <td>{r.origin}</td>
                      <td>{r.relevance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              M.2160 also states overarching design principles (sustainability, security and
              resilience, connecting the unconnected, and ubiquitous intelligence) and extends the
              5G capability set with new capabilities. These are targets, not specifications: the
              numeric values and the mechanisms to reach them are the subject of the 3GPP work
              below.
            </p>

            <h3>Standardisation timeline and where the work is</h3>
            <p>
              6G in 3GPP is a Release-21 target. The current activity is study-stage in Release
              20.
            </p>
            <ul>
              <li>
                <strong>ITU-R</strong> completed the framework (M.2160) in 2023 and is
                progressing the detailed technical performance requirements and evaluation
                methodology for IMT-2030 through Working Party 5D.
              </li>
              <li>
                <strong>3GPP SA1</strong> produced TR 22.870 (Study on 6G Use Cases and Service
                Requirements) at the study stage; the normative Stage 1 6G requirements are
                expected in Release 21.
              </li>
              <li>
                <strong>3GPP SA2 and SA4</strong> are running architecture and media studies.
                SA4&apos;s media study is TR 26.870.
              </li>
              <li>
                <strong>Initial 6G specifications</strong> are expected around 2028.
              </li>
            </ul>

            <h3>Study items relevant to media in 6G</h3>
            <p>
              The following studies are the current primary sources. TR 22.870 and TR 26.870 are
              the 6G studies; the AI/ML studies are 5G Advanced work that the 6G media work builds
              on.
            </p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Study</th>
                    <th>Group</th>
                    <th>Track</th>
                    <th>Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {SIXG_STUDIES.map((r) => (
                    <tr key={r.study}>
                      <td className={styles.feeTableTier}>
                        <a href={r.href}>{r.study}</a>
                      </td>
                      <td>{r.group}</td>
                      <td>{r.track}</td>
                      <td>{r.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              TR 26.847 and TR 22.874 matter for 6G because two of the new IMT-2030 scenarios
              (immersive communication and AI and communication) drive traffic that these studies
              already characterise: high-rate media flows on one side, and model transfer flows on
              the other. See{' '}
              <Link to="/tech/ai-ml">AI/ML Evaluation Framework</Link> for the interface and procedure
              detail.
            </p>

            <h3>Why an experimental testbed at the study stage</h3>
            <p>
              Standardisation at the study stage is requirement-driven, and requirements are
              stronger when backed by measurement. AI workloads (large language models, image and
              video generation, agentic multi-step tool calling, real-time multimodal interaction)
              produce traffic patterns that differ from classic media streaming. These include
              bursty request/response cycles, asymmetric uplink/downlink ratios, long-lived
              sessions with variable think-time, and sensitivity to time-to-first-token as well as
              to sustained throughput. The 5G-MAG 6G Testbed exists to characterise these patterns
              under controlled, reproducible network conditions.
            </p>
            <p>Concretely, the testbed:</p>
            <ul>
              <li>
                Emulates realistic network conditions on a single machine using Linux Traffic
                Control (<code>tc</code>) with <code>netem</code> and Hierarchical Token Bucket
                (HTB), including profiles derived from 3GPP 5QI values (see{' '}
                <a href="https://www.3gpp.org/dynareport/23501.htm">TS 23.501</a>, the
                standardised 5QI to QoS-characteristics mapping) and candidate 6G conditions (for
                example a hyper-reliable low-latency profile).
              </li>
              <li>
                Runs AI and media workloads over those conditions and captures traffic at L3/L4
                (via tcpdump) and optionally L7 (via mitmproxy).
              </li>
              <li>
                Logs metrics for large-scale, reproducible analysis, producing labelled datasets
                and classification results.
              </li>
            </ul>
            <p>
              These outputs are what 5G-MAG uses to ground its media and AI-traffic requirement
              inputs to 3GPP. Full detail, including the emulator YAML profile schema and the AI
              characterisation architecture, is on the{' '}
              <Link to="/testbeds/6g-testbed/scope">6G Testbed developer scope page</Link>.
            </p>

            <h3>Inputs from 5G-MAG to 3GPP Workshops on 6G</h3>
            <p>
              Each link below downloads a ZIP contribution package (the submitted document and
              its supporting files) from the 3GPP file server.
            </p>
            <ul>
              <li>
                3GPP Workshop on 6G -{' '}
                <a href="https://www.3gpp.org/ftp/workshop/2025-03-10_3GPP_6G_WS/Docs/6GWS-250137.zip">
                  6G &amp; Media: General views &amp; priorities
                </a>
                : 5G-MAG&apos;s overall views and priorities for media in 6G.
              </li>
              <li>
                3GPP SA1 IMT-2030 -{' '}
                <a href="https://www.3gpp.org/ftp/workshop/2024-05-08_3GPP_Stage1_IMT2030_UC_WS/Docs/SWS-240007.zip">
                  Views from 5G-MAG towards IMT-2030
                </a>
                : 5G-MAG&apos;s requirements-stage input to the SA1 IMT-2030 use-case workshop.
              </li>
            </ul>

            <p>
              The <a href="https://github.com/orgs/5G-MAG/projects/44/views/15">Execution Plan</a>{' '}
              tracks current implementation work.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>: 5G-native MBS,
              one of the delivery mechanisms expected to evolve towards 6G &middot;{' '}
              <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link>: LTE-based broadcast delivery and
              its evolution &middot; <Link to="/standards/6g">Standards: Towards 6G Media</Link>:
              the standards-tracking view of this topic
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
