import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M4 13h5" />
    <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
    <path d="M20 8v8" />
    <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" />
  </>
);

export default function NetworkAPIs() {
  return (
    <ProjectHome
      techUrl="/tech/network-apis"
      icon={ICON}
      accent="#d1477a"
      description="Introduces 5G-MAG's analysis of CAMARA network APIs for QoS, slicing and connectivity insight in media use cases."
      analysisHref="/tech/network-apis/overview"
      standardsHref="/standards/network-apis"
      softwareHref="/reference-tools/network-apis"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Without CAMARA, a media application that wants a specific network guarantee: a
                low-latency contribution link, a reserved slice for an event: has to integrate
                directly against each operator&apos;s own interfaces, a separate integration per
                operator. CAMARA offers one small, operator-agnostic REST resource, so a developer builds against a single API
                once and it works across any operator that implements the same CAMARA profile,
                instead of maintaining a bespoke integration for every network it needs to reach.
              </p>
        </>
      }
    >
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
                  GSMA support) applied specifically to media
                  production and live distribution use cases. GSMA Open Gateway (OGW) API profiles
                  align these CAMARA APIs across operators.
                </p>
    </ProjectHome>
  );
}
