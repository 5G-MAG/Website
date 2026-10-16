import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M7 21v-6" />
    <path d="M20 6l-3 -3l-3 3" />
    <path d="M10 18l-3 3l-3 -3" />
    <path d="M7 3v2" />
    <path d="M7 9v2" />
    <path d="M17 3v6" />
    <path d="M17 21v-2" />
    <path d="M17 15v-2" />
  </>
);

export default function RTC() {
  return (
    <ProjectHome
      techUrl="/tech/rtc"
      icon={ICON}
      accent="#4f63d6"
      description="The 3GPP architecture for real-time media communication integrated into the 5G System, based on 5G Media Streaming and WebRTC."
      analysisHref="/tech/rtc/overview"
      standardsHref="/standards/rtc"
      softwareHref="/reference-tools/rtc"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Beyond traditional telephony, real-time media is needed for immersive XR conferencing and
                between third-party applications in the device and the network. 3GPP extended the 5G Media
                Streaming principles to it, so that the 5G System can support both operator and third-party
                services: from a session that runs over the top, with QoS, bit rate recommendations and QoE
                reporting from the operator, to a session the operator hosts itself.
              </p>
        </>
      }
    >
      <p>
                  3GPP defines an architecture for real-time media communication integrated into the 5G System:
                  the delivery of delay-sensitive media from one peer to another with support of the 5G network.
                  An RTC Application Function and an RTC Application Server support RTC endpoints that use a
                  subset of the WebRTC protocol stack.
                </p>
                <p>
                  The architecture is based on 5G Media Streaming. Both are realisations of one generalised
                  Media Delivery architecture, and share their provisioning and media session handling APIs.
                </p>
    </ProjectHome>
  );
}
