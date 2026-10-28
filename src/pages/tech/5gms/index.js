import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = <path d="M7 4v16l13 -8l-13 -8" />;

export default function FiveGMS() {
  return (
    <ProjectHome
      techUrl="/tech/5gms"
      icon={ICON}
      accent="#00a0d2"
      description="5G Media Streaming (5GMS): the 3GPP architecture for adaptive media streaming over mobile networks, and the open-source reference tools that implement it."
      analysisHref="/tech/5gms/overview"
      standardsHref="/standards/5gms"
      softwareHref="/reference-tools/5gms"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Before 5GMS, 3GPP&apos;s streaming architecture was the Packet Switched Streaming
                (PSS) architecture in TS 26.233, which contains the unicast delivery architecture for RTSP,
                progressive download and 3GP DASH. TS 26.233 has no version after Release 15 (V15.0.0).
                The 3GPP study on media distribution over 5G (TR 26.891) concluded that the RTSP/RTP part
                of PSS is no longer required.
              </p>
              <p className={styles.whyMattersBody}>
                The same study recommended defining a 5G Media Streaming architecture based on a
                function-based design, to leverage 5G features for existing and new media services, and
                inviting key industry players and standards bodies to share their usage scenarios:
                classical broadcast content providers, emerging media service providers and mobile network
                operators running media services (TR 26.891 clause 8.2). 5GMS is specified in TS 26.501.
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
