import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = <path d="M7 4v16l13 -8l-13 -8" />;

export default function FiveGMS() {
  return (
    <ProjectHome
      techUrl="/tech/5gms"
      icon={ICON}
      accent="#00a0d2"
      description="Introduces the 3GPP 5G Media Streaming (5GMS) framework, why it exists, and the 5G-MAG reference tools that implement it."
      analysisHref="/tech/5gms/overview"
      standardsHref="/standards/5gms"
      softwareHref="/reference-tools/5gms"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Before 5GMS, 3GPP&apos;s streaming architecture was the Packet Switched Streaming
                architecture in TS 26.233, mainly developed for RTSP streaming. When the Release 16 work
                began, 3GPP considered it unfit for 5G media streaming services. Meanwhile, classical
                broadcast and content distribution services were migrating towards modern distribution
                architectures.
              </p>
              <p className={styles.whyMattersBody}>
                A 3GPP study on media distribution over 5G (TR 26.891) concluded that a new 5G media
                streaming architecture was required to enable any type of deployment of streaming
                services over 5G. 5GMS is that architecture. Its Release 16 work item asked for input
                from broadcasters, content providers and emerging media service providers, and from
                mobile network operators running their own media services.
              </p>
              <p className={styles.whyMattersBody}>
                As of Release 19, TS 26.501 defines these features for media streaming in the 5G
                System: content hosting, content publishing and content preparation; network
                assistance and dynamic policies; consumption and QoE metrics reporting; edge
                processing; delivery via eMBMS and via MBS; data collection, reporting and exposure;
                3GPP Service URL handling; and remote control. TS 26.501 states that many of its features
                are motivated by the conclusions of TR 26.804, the Study on 5G media streaming
                extensions.
              </p>
              <p className={styles.whyMattersBody} style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                Sources: WID SP-180984 (5GMSA, Release 16), clauses 3 and 4; TS 26.501 V19.4.0,
                clauses 1 and 4.0.1 to 4.0.14.
              </p>
        </>
      }
    >
      <p>
                  5G Media Streaming (5GMS) is specified by 3GPP in TS 26.501 as a set of extensions to
                  the 5G System architecture. It supports media streaming services from mobile network
                  operators and from third parties, in downlink, where the network is the origin of the
                  media, and in uplink, where the device is.
                </p>
                <p>
                  The architecture is divided into independent components, so that it can be deployed
                  with different degrees of integration between mobile network operators and content
                  providers. Media can be streamed as it is produced (live) or after it has been
                  produced (on demand).
                </p>
    </ProjectHome>
  );
}
