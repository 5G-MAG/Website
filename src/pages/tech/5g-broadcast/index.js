import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
  <>
    <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
    <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
    <path d="M9 21l3 -9l3 9" />
    <path d="M10 19h4" />
  </>
);

export default function FiveGBroadcast() {
  return (
    <ProjectHome
      techUrl="/tech/5g-broadcast"
      icon={ICON}
      accent="#e07b1a"
      description="Technical entry point for LTE-based 5G Broadcast."
      analysisHref="/tech/5g-broadcast/overview"
      standardsHref="/standards/5g-broadcast"
      softwareHref="/reference-tools/5g-broadcast/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                A cellular unicast stream costs more network capacity the bigger its audience gets, no
                matter how popular the content. Broadcast TV and radio don&apos;t work that way, and
                5G Broadcast keeps that property: a receiver bootstraps entirely from the broadcast
                signal itself, no SIM, no return channel, no prior connection to the network, by
                first synchronising on the narrowband Cell Acquisition Subframe, then following the
                system information it carries out to the wider PMCH payload. One transmission reaches
                every receiver in coverage simultaneously, so the network cost of reaching a million
                viewers is the same as reaching one.
              </p>
        </>
      }
    >
      <p>
                  LTE-based 5G Broadcast is a profile of existing 3GPP Long Term Evolution (LTE)
                  specifications that enables one-to-many delivery of TV, radio and emergency alerts over
                  dedicated broadcast carriers, without requiring a return channel or SIM card on the
                  receiver. It builds on Further evolved Multimedia Broadcast Multicast Service (FeMBMS),
                  itself an evolution of evolved Multimedia Broadcast Multicast Service (eMBMS); the three
                  names refer to the same LTE-based broadcast lineage. ETSI standardises it as TS 103 720,
                  which 5G-MAG actively maintains and extends to cover 3GPP Release 18 and 19 enhancements.
                </p>
                <p>
                  TS 103 720 covers both directions of that same transport for linear TV and radio:
                  the transmit side and the modem/receive side. The same transmit/receive chain is
                  also the platform{' '}
                  <Link to="/tech/emergency-alerts">5G Broadcast - Emergency Alerts</Link> layers Cell
                  Broadcast Service public warning on top of.
                </p>
    </ProjectHome>
  );
}
