import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
  <>
    <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
    <path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
    <path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
  </>
);

export default function EmergencyAlerts() {
  return (
    <ProjectHome
      techUrl="/tech/emergency-alerts"
      icon={ICON}
      accent="#e07b1a"
      description="Cell Broadcast Service (CBS) public warning delivery over LTE-based 5G Broadcast."
      analysisHref="/tech/emergency-alerts/overview"
      standardsHref="/standards/emergency-alerts"
      softwareHref="/reference-tools/emergency-alerts/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                A warning delivered only over a data connection fails exactly when it matters most:
                when the cellular network is congested with everyone trying to check on each other, or
                down entirely. Carrying the alert as a Cell Broadcast message on the same free-to-air
                broadcast carrier as TV and radio sidesteps that: it needs no SIM, no subscription and
                no return channel, so it reaches idle, roaming and otherwise unattached devices the
                same way it reaches every other receiver in coverage. Layering this on the existing 5G
                Broadcast chain, rather than building a separate alerting stack, also means no new
                receiver hardware is needed beyond what TV and radio delivery already requires.
              </p>
        </>
      }
    >
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
    </ProjectHome>
  );
}
