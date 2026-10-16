import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12v9" />
    <path d="M12 12l-8 -4.5" />
  </>
);

export default function ContentDelivery() {
  return (
    <ProjectHome
      techUrl="/tech/content-delivery"
      icon={ICON}
      accent="#00a0d2"
      description="Covers the FLUTE and ROUTE transport protocols used to deliver DASH, HLS, and CMAF media over broadcast and multicast networks."
      analysisHref="/tech/content-delivery/overview"
      standardsHref="/standards/content-delivery"
      softwareHref="/reference-tools/content-delivery/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                A broadcast or multicast bearer has no return channel, so a receiver can never ask for
                a retransmission: reliability has to come from somewhere else, and Forward Error
                Correction carried by FLUTE and ROUTE is that mechanism. Keeping the media format
                (DASH, HLS, CMAF) and the transport (FLUTE for files, ROUTE for real-time objects)
                strictly separate is what lets the same packaged content run over either one: a
                broadcaster packages a CMAF asset once, and it can be delivered over FLUTE for a
                download-style MBMS scenario or over ROUTE for ATSC 3.0-style real-time delivery,
                without repackaging for each transport.
              </p>
        </>
      }
    >
      <p>
                  Content delivery over broadcast and multicast networks relies on transport
                  protocols that can deliver files and media objects one-way, without a return
                  channel from each receiver. This project covers File Delivery over Unidirectional
                  Transport (FLUTE) and Real-time Object delivery over Unidirectional Transport
                  (ROUTE), which underpin 5G-MAG&apos;s broadcast and multicast work.
                </p>
                <p>
                  5G-MAG maintains open-source implementations, including the FLUTE library used
                  in the 5G Broadcast tools, a media origin, and a Coded Multisource Media Format
                  (CMMF) encoder.
                </p>
    </ProjectHome>
  );
}
