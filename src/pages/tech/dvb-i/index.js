import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
    <path d="M16 3l-4 4l-4 -4" />
  </>
);

export default function DvbI() {
  return (
    <ProjectHome
      techUrl="/tech/dvb-i"
      icon={ICON}
      accent="#00a0d2"
      description="Explains DVB-I service discovery over 5G Broadcast, 5G Media Streaming, and hybrid delivery."
      analysisHref="/tech/dvb-i/analysis-dvb-i-over-5g-gaps"
      standardsHref="/standards/dvb-i"
      softwareHref="/reference-tools/dvb-i/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Without DVB-I, a broadcaster&apos;s 5G Broadcast service and its 5GMS unicast service
                would look like two unrelated things to a device, discovered separately with no
                common presentation. DVB-I&apos;s service instance model fixes that: one logical
                service can carry several delivery instances: a broadcast instance and a unicast
                instance for the same channel: and the device picks between them by priority, or, for
                a hybrid device already tuned to the broadcast signal directly, de-duplicates the two
                so the same channel doesn&apos;t appear twice. That is what lets broadcast and
                broadband content sit in one combined service list instead of two separate discovery
                systems a viewer has to reconcile themselves.
              </p>
        </>
      }
    >
      <p>
                  DVB-I (DVB internet, an ETSI-published DVB specification) lets a device discover and
                  present linear TV and radio services delivered over IP, listing broadcast and
                  broadband streams together in a single service list. This page covers how DVB-I
                  service discovery works over 5G Systems, so that services carried by 5G Broadcast or
                  5G Media Streaming can appear alongside other IP-delivered content.
                </p>
                <p>
                  5G-MAG tracks this work and maintains related reference tooling, built by contributors
                  including Fraunhofer FOKUS, Dolby Laboratories, Qualcomm and the BBC. The project has
                  no repositories of its own: the reference tools linked below implement the delivery
                  scenarios against the specifications this page describes.
                </p>
    </ProjectHome>
  );
}
