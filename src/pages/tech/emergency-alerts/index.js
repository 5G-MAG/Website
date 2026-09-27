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

// New flagship page (direct instruction, 2026-09-27): taxonomy.json's "5G
// Broadcast - Emergency Alerts" project was split out of the shared
// /tech/5g-broadcast page into its own tech_url/standards_url via the
// taxonomy-admin portal (npm run taxonomy-admin) -- /standards/emergency-alerts
// and /reference-tools/emergency-alerts/ already existed as real, complete
// docs; this was the one missing piece. Content below is adapted from those
// two already-published docs (docs/home/standards/emergency-alerts.mdx,
// docs/home/reference-tools/emergency-alerts/implementation.mdx), not invented here.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/emergency-alerts');
const PROJECT_NAME = PROJECT.name;

const SOS_ICON = (
  <>
    <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
    <path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
    <path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
  </>
);

// This basket's own accent (BASKET_ACCENT['5g-broadcast'] in
// src/data/baskets.js) -- same basket, and the same accent, as the sibling
// /tech/5g-broadcast page this was split out of.
const ACCENT = '#e07b1a';

const CBS_FIELDS = [
  {
    field: 'Message Identifier',
    role: 'Identifies the warning type / source (for example a CMAS or ETWS category)',
    notes: "Assigned in 3GPP TS 23.041 clause 9.4.1.2.2; the reference transmitter's default configuration uses the fixed identifier 0x1102, which TS 23.041 assigns to the ETWS combined earthquake and tsunami warning.",
  },
  {
    field: 'Serial Number',
    role: 'Distinguishes and versions a message (geographical scope, message code, update number)',
    notes: 'Changing the update number signals an updated message for the same event.',
  },
  {
    field: 'Data Coding Scheme',
    role: 'Selects the character set / language of the message body',
    notes: 'Follows the CBS data coding scheme rules in TS 23.041.',
  },
  {
    field: 'Warning Message Segment',
    role: 'Carries the alert text, possibly split across segments',
    notes: 'The transmitter marks the last segment and sets the segment number; the payload is the encoded warning text.',
  },
];

export default function EmergencyAlerts() {
  const coverImg = useBaseUrl('/assets/images/projects/emergency-alerts.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Cell Broadcast Service (CBS) public warning delivery over LTE-based 5G Broadcast: the SIB12 message model, transmit/receive architecture, key specifications, and reference tools."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={SOS_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Emergency warnings delivered over 5G Broadcast
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Public warning over 5G Broadcast carries emergency alerts (earthquake and tsunami
                  warnings, and CMAS-style civil alerts) to any receiver in coverage, using the same
                  free-to-air LTE-based broadcast carrier as linear TV and radio. Because it needs no
                  SIM, no subscription and no return channel, it keeps working when the cellular
                  network is congested or unavailable, which is exactly when warnings matter most.
                </p>
                <p>
                  The warning-message handling is added to the existing{' '}
                  <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link> transmit and
                  receive chain rather than introduced as a separate stack: it is best understood as a
                  feature set layered on that broader platform, developed and tracked together with
                  it.
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
                A warning delivered only over a data connection fails exactly when it matters most:
                when the cellular network is congested with everyone trying to check on each other, or
                down entirely. Carrying the alert as a Cell Broadcast message on the same free-to-air
                broadcast carrier as TV and radio sidesteps that — it needs no SIM, no subscription and
                no return channel, so it reaches idle, roaming and otherwise unattached devices the
                same way it reaches every other receiver in coverage. Layering this on the existing 5G
                Broadcast chain, rather than building a separate alerting stack, also means no new
                receiver hardware is needed beyond what TV and radio delivery already requires.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/emergency-alerts/overview"
              standardsHref="/standards/emergency-alerts"
              softwareHref="/reference-tools/emergency-alerts/"
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

        <section className={styles.section} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              An alert is passed to the transmitter, encoded as a Cell Broadcast Service (CBS) message
              carried in a System Information Block, broadcast over the FeMBMS carrier, and received
              and presented on a device -- reusing the 5G Broadcast receiver rather than requiring an
              alert-specific one.
            </p>

            <p>
              <strong>Key specifications:</strong> ETSI TS 103 720 (5G Broadcast System for linear TV
              and radio services -- clause 5.15.3.3 defines PWS support, the delivery of warning
              messages via SIB broadcast on the E-UTRAN Uu downlink), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/23041.htm">TS 23.041</a> (Technical realization
              of Cell Broadcast Service, CBS: message structure, message identifiers, serial numbers
              and data coding for ETWS and CMAS), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/36331.htm">TS 36.331</a> (defines{' '}
              <code>SystemInformationBlockType12</code> and the UE actions on receiving a
              warning-message SIB), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/36976.htm">TR 36.976</a> (overall description of
              LTE-based 5G broadcast).
            </p>

            <p>
              Public warning here follows the Public Warning System (PWS) approach: CBS is the
              delivery mechanism, and the alert types it can carry include the Earthquake and Tsunami
              Warning System (ETWS) and the Commercial Mobile Alert System (CMAS).
            </p>

            <h3>What the reference tools implement</h3>
            <p>
              The Emergency Alerts feature set is realised on the LTE-based 5G Broadcast transmit
              chain. Two components are involved on the transmit side, and the receive side reuses the
              existing 5G Broadcast receiver:
            </p>
            <ul>
              <li>
                <strong>RAN / physical-layer transmitter.</strong> The 5G Broadcast transmitter builds
                the E-UTRA system information carried on the broadcast carrier. For public warning,
                this is where the warning-message System Information Blocks are scheduled and encoded
                onto the radio frame. In the current tooling this role is filled by the{' '}
                <code>rt-mbms-tx-for-qrd-and-crd</code> transmitter (built on the srsRAN 4G codebase),
                which schedules and transmits the SIB12 message that triggers a CMAS alert on a
                connected 5G Broadcast device.
              </li>
              <li>
                <strong>SIB12 encoding.</strong> The transmitter constructs the SIB12 message body from
                a set of CBS fields (message identifier, serial number, data coding scheme, and the
                warning-message segment carrying the alert text). In the initial implementation these
                fields are set to fixed values so that a default alert (for example a tsunami or
                earthquake warning) is broadcast; work is in progress to let a developer supply custom
                message content and warning type instead of a hardcoded payload.
              </li>
              <li>
                <strong>Receiver / device.</strong> A 5G Broadcast capable device tuned to the carrier
                decodes the system information, detects the warning-message SIB, decodes the CBS
                payload, and presents the alert. The receive path reuses the 5G Broadcast modem and
                receiver components rather than introducing an emergency-alert-specific receiver.
              </li>
            </ul>
            <p>
              The mapping to the standard: the transmitter plays the role of the E-UTRAN cell (the eNB
              in a live network); the SIB12 it emits is the same warning-message structure a live
              network would broadcast; and the device applies the standard UE procedure for acquiring
              and acting on warning-message system information.
            </p>

            <h3>The CBS message model on the transmit side</h3>
            <p>
              CBS carries a warning message as a short, self-contained data structure rather than as an
              IP flow, which is what lets it reach idle and non-attached devices. The main fields a
              developer will encounter when configuring or extending the transmitter are:
            </p>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>CBS field</th>
                    <th>Role</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CBS_FIELDS.map((f) => (
                    <tr key={f.field}>
                      <td className={styles.feeTableTier}>{f.field}</td>
                      <td>{f.role}</td>
                      <td>{f.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              For CMAS-style alerts the message is carried in <strong>SIB12</strong>. For ETWS the
              notification and body are carried in <strong>SIB10</strong> and <strong>SIB11</strong>{' '}
              respectively; the current transmit tooling focuses on the SIB12 (CMAS) path, so ETWS-specific
              SIB10/SIB11 behaviour should be confirmed against the repositories and Kanban board before
              being assumed present.
            </p>

            <h3>What is not in scope</h3>
            <p>
              The reference tools do not include the upstream network signalling that populates a live
              PWS: a Cell Broadcast Entity feeding a Cell Broadcast Centre, the CBC-to-MME
              Write-Replace Warning procedure, or the MME-to-eNB distribution. The tools stand in for
              the output of that chain by generating the SIB directly, so they demonstrate the last hop
              (network to device over broadcast) rather than a full PWS deployment.
            </p>

            <p>
              5G-MAG&apos;s own{' '}
              <a href={useBaseUrl('/docs/Reference_Tools_Emergency_Alerts_5G_Broadcast.pdf')}>
                reference tools overview slide deck
              </a>{' '}
              introduces the alert path, the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/48/views/12">Roadmap</a> tracks current
              implementation work, and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/20">
                MBMS: Public Warning System
              </a>{' '}
              board tracks the underlying developer issues.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link> (the underlying
              transmit and receive platform this extends) &middot;{' '}
              <Link to="/standards/5g-broadcast">
                Standards: 5G Broadcast - TV, Radio and Emergency Alerts
              </Link>{' '}
              (the full specification set, including ETSI TS 103 720, that this builds on)
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
