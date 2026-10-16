import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
  <>
    <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M12 10l0 3l2 2" />
    <path d="M7 4l-2.75 2" />
    <path d="M17 4l2.75 2" />
  </>
);

export default function TSC() {
  return (
    <ProjectHome
      techUrl="/tech/tsc"
      icon={ICON}
      accent="#d1477a"
      description="Explains how 3GPP Time Sensitive Communications lets 5G carry deterministic, low-jitter traffic for live production over Non-Public Networks."
      analysisHref="/tech/tsc/overview"
      standardsHref="/standards/tsc"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Deterministic, time-synchronised delivery normally means joining a full IEEE 802.1 TSN
                bridge with a Centralized Network Configuration controller: infrastructure most media
                productions have no reason to run. A Release 17 outcome removes that requirement:
                deterministic QoS and time synchronisation can be requested directly through the
                TSCTSF and NEF, without configuring the 5G system as part of a wired TSN network at
                all. That lighter path is what makes bounded-latency, time-synchronised transport
                practical for a production that only needs it over its own NPN, rather than full
                integration into a plant-wide TSN schedule.
              </p>
        </>
      }
    >
      <p>
                  Time Sensitive Communications (TSC) covers the 3GPP features that let a 5G network
                  carry traffic with bounded, predictable latency and tight timing, rather than
                  best-effort delivery. In media production this matters for live workflows, for
                  example synchronising cameras, audio and control signals over a wireless link where
                  jitter and timing drift are not acceptable.
                </p>
                <p>
                  5G-MAG tracks how these deterministic-delivery capabilities apply to professional
                  media, in particular over the <Link to="/tech/npn">Non-Public Networks</Link> that
                  broadcasters use for on-site production.
                </p>
    </ProjectHome>
  );
}
