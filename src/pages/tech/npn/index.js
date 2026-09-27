import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy").
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/npn');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page (same 2026-09-25 pilot as /tech/5gms,
// /tech/rtc and /tech/ntn), replacing the former docs/tech/npn.md doc. Same
// Layout/HubHero every hub page uses, not the doc-tier topic-banner.
//
// 2026-09-27: docs/tech/npn/overview.mdx now exists as a structural
// placeholder (real content still lives in this page's own "How It Works"
// section below, not yet migrated there) and techTopics.js's own entry
// carries `autogen: 'npn'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor. taxonomy.json's doc_url, previously null,
// now points at docs/home/reference-tools/npn/index.mdx, itself a
// placeholder honestly stating no dedicated tool or repository exists yet
// -- softwareHref below points at it.
const LOCK_ICON = (
  <>
    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
  </>
);

// This topic's own basket accent (BASKET_ACCENT['connected-media-production']
// in src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, matching how every other flagship page does this.
const ACCENT = '#d1477a';

// Ported from the former docs/tech/npn.md's "Deployment models in detail"
// table (source-derived, unchanged facts, JSX table shape instead of a
// Markdown table).
const MODEL_COMPARISON = [
  {
    aspect: 'Who operates the core',
    snpn: 'Operates its own 5G core and is not dependent on any PLMN. Because the organisation runs the core, it controls the Unified Data Management (UDM), Policy Control Function (PCF) and Session Management Function (SMF) configuration directly, which is what makes tight QoS and slicing policy for production traffic practical.',
    pninpn: "The NPN is realised through a PLMN -- i.e. the public network operator's core.",
  },
  {
    aspect: 'How the network is identified',
    snpn: 'Identified by the pair (PLMN ID, NID). Two NID assignment models exist: self-assignment (the NID is chosen individually by the SNPN at deployment time and is not guaranteed unique) and coordinated assignment (the NID is assigned so that it, alone or in combination with the PLMN ID, is globally unique).',
    pninpn: 'Identified as part of the host PLMN.',
  },
  {
    aspect: 'How isolation / access control is achieved',
    snpn: 'The UE performs SNPN-specific network selection: it reads the available SNPNs from broadcast system information and matches them against its configured list, using either automatic or manual selection mode.',
    pninpn: 'Achieved by one or more of: a dedicated DNN, a dedicated Network Slice instance (identified by an S-NSSAI), and a Closed Access Group (CAG). A CAG is advertised by cells in their broadcast information; a UE that is a member of the CAG (per its CAG configuration in the subscription) may camp on and access those cells, while non-members are barred. The CAG mechanism therefore provides cell-level access control, whereas slicing provides logical traffic separation inside the core. In practice a media PNI-NPN combines both: a CAG to keep unauthorised devices off the production cells, and a slice to isolate and dimension the production traffic.',
  },
];

export default function NPN() {
  return (
    <Layout
      title={PROJECT_NAME}
      description="Private 5G (SNPN and PNI-NPN) deployment models, identity/onboarding, and QoS/spectrum considerations for live production."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={LOCK_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Private networks replacing legacy COFDM and RF-based contribution links
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ maxWidth: '860px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              <p>
                Non-Public Networks (NPNs) are private 5G deployments operated for a specific
                organisation or use case, defined in 3GPP Release 16. In media production, NPNs
                allow broadcasters to deploy dedicated 5G infrastructure for live production
                workflows, replacing legacy contribution links (satellite, ISDN, fibre) with a
                programmable, low-latency wireless fabric. 5G-MAG&apos;s work covers deployment
                models, spectrum access strategies, User Equipment (UE) registration and
                on-boarding, and the specific requirements of live production environments such as
                time-sensitive communications.
              </p>
              <p>
                <strong>No dedicated reference tool exists for NPN.</strong> This area is
                documented through the analysis below. Live production over an NPN often needs
                deterministic timing, so for time-sensitive media transport over NPNs see also{' '}
                <Link to="/tech/tsc">Time-Sensitive Communications (TSC)</Link>.
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
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                A broadcaster deploying its own private 5G network doesn&apos;t want to become a full
                mobile operator with its own subscriber database — NPN avoids that: the Release 17
                Credentials Holder split lets a broadcaster&apos;s existing central identity system
                authenticate devices onto a venue-operated SNPN directly, and UE onboarding lets a
                whole fleet of cameras and devices be provisioned automatically rather than configured
                one by one. Together they are what makes dedicated, controllable 5G infrastructure for
                live production practical to actually deploy, in place of the legacy satellite, ISDN
                or fibre contribution links it replaces.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/npn/overview"
              standardsHref="/standards/npn"
              softwareHref="/reference-tools/npn"
            />
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/11">Execution Plan</a>
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              There are two deployment models, and the plain-language names map to the 3GPP terms
              as follows: a standalone NPN is a fully independent private network (Stand-alone
              Non-Public Network, SNPN), while an NPN integrated with a public network reuses the
              operator&apos;s Public Land Mobile Network (PLMN) with private access control (Public
              Network Integrated NPN, PNI-NPN, which uses a Closed Access Group, CAG, to restrict
              which devices may connect).
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/23501.htm">TS 23.501</a> (NPN architecture,
              clauses on SNPN and PNI-NPN),{' '}
              <a href="https://www.3gpp.org/dynareport/33501.htm">TS 33.501</a> (NPN security),{' '}
              <a href="https://www.3gpp.org/dynareport/22261.htm">TS 22.261</a> (service
              requirements for NPNs).
            </p>

            <h3>Deployment models in detail</h3>
            <p>
              The two models differ in who operates the core, how the network is identified, and
              how isolation or access control is achieved:
            </p>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>SNPN (Stand-alone Non-Public Network)</th>
                    <th>PNI-NPN (Public Network Integrated NPN)</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_COMPARISON.map((r) => (
                    <tr key={r.aspect}>
                      <td className={styles.feeTableTier}>{r.aspect}</td>
                      <td>{r.snpn}</td>
                      <td>{r.pninpn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Identity, credentials and onboarding</h3>
            <p>
              The Release 16 baseline assumes the SNPN holds the subscription and credentials
              itself. Release 17 decoupled these:
            </p>
            <ul>
              <li>
                <strong>Credentials Holder (CH).</strong> The entity that owns the subscription
                credentials can be separate from the SNPN that provides access. The CH may be a
                3GPP entity (an AUSF/UDM belonging to another SNPN or a PLMN) or a non-3GPP entity
                (an external AAA server reached for authentication). When the CH is an AUSF/UDM,
                the authentication flow resembles the roaming case; when it is an AAA server,
                key-generating EAP methods are used. This lets, for example, a broadcaster&apos;s
                central identity system authenticate devices onto a venue-operated SNPN.
              </li>
              <li>
                <strong>UE onboarding.</strong> A UE configured only with Default UE Credentials
                can attach to an Onboarding SNPN (ON) purely to be provisioned. The onboarding
                network authenticates the UE against a Default Credentials Server (DCS) and then
                hands off to a Provisioning Server, which installs the SNPN subscription
                credentials and configuration. After provisioning, the UE deregisters from the ON
                and registers on the target SNPN normally. This is aimed at bringing fleets of
                devices onto a private network without per-device manual configuration.
              </li>
            </ul>
            <p>
              Security procedures for both the CH and onboarding cases are specified in the NPN
              security clauses of <a href="https://www.3gpp.org/dynareport/33501.htm">TS 33.501</a>.
            </p>

            <h3>Access over non-3GPP networks</h3>
            <p>
              An NPN device can reach the 5G core over untrusted or trusted non-3GPP access (for
              example a wired LAN, Wi-Fi, or a fixed backhaul). The stage 3 procedures for
              accessing the 5GC via non-3GPP access networks are defined in TS 24.502. This is
              relevant where production equipment is cabled but still needs to be a first-class
              subscriber of the private 5G core; note the scope caution on the{' '}
              <Link to="/standards/npn">Standards</Link> page regarding this reference.
            </p>

            <h3>QoS, slicing and dimensioning for production</h3>
            <p>
              Media production traffic is dominated by high-bitrate uplink (camera contribution)
              rather than the downlink-heavy profile of consumer networks. The NPN operator
              therefore has to dimension radio and transport for sustained aggregate uplink, and
              use 5G QoS Flows with appropriate 5QI values and Guaranteed Bit Rate (GBR) where a
              flow must not be starved. Network slicing (an S-NSSAI per production service class)
              provides isolation between, say, a critical camera contribution slice and a general
              crew-comms slice. Where deterministic timing is required on top of guaranteed
              bandwidth, the NPN is combined with Time Sensitive Communications; see{' '}
              <Link to="/tech/tsc">Time-Sensitive Communications (TSC)</Link>.
            </p>

            <h3>Spectrum</h3>
            <p>
              Spectrum access for NPNs is a national regulatory matter and varies by country.
              Broadly, options include locally licensed dedicated spectrum where a regulator has
              set aside bands for private/vertical use, spectrum leased from an operator,
              shared-access frameworks, and unlicensed bands. The specific bands, licence
              conditions and power limits differ between administrations, so any concrete spectrum
              plan should be checked against the relevant national regulator rather than assumed.
              This is an operational and regulatory question rather than a 3GPP specification
              question.
            </p>

            <h3>Release timeline</h3>
            <ul>
              <li>
                <strong>Release 16</strong>: SNPN and PNI-NPN models, NID, CAG. Architecture in TS
                23.501; security in TS 33.501; requirements in TS 22.261 and (for professional
                media) <a href="https://www.3gpp.org/dynareport/22263.htm">TS 22.263</a>.
              </li>
              <li>
                <strong>Release 17</strong>: Credentials Holder, external AAA authentication, UE
                onboarding and remote provisioning.
              </li>
              <li>
                <strong>Release 18 and later</strong>: NPN enhancements (eNPN Phase 2): mobility and
                service continuity between SNPNs using equivalent SNPN lists, broader non-3GPP
                access support for SNPN, and access to localised services via a hosting network.
              </li>
            </ul>

            <p>
              <strong>Related:</strong> <Link to="/tech/tsc">Time-Sensitive Communications (TSC)</Link>{' '}
              &middot; <Link to="/standards/npn">Standards: Non-Public Networks</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
