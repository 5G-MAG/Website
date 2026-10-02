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

export default function EmergencyAlerts() {
  const coverImg = useBaseUrl('/assets/images/projects/emergency-alerts.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Cell Broadcast Service (CBS) public warning delivery over LTE-based 5G Broadcast."
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
            <div className={styles.introGrid}>
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


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
