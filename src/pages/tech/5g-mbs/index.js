import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M12 12l0 .01" />
    <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
    <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
    <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
    <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
  </>
);

export default function FiveGMBS() {
  const logo = useBaseUrl('/assets/images/partnerships/3gpp-logo.png');
  const ietfLogo = useBaseUrl('/assets/logos/IETF.png');
  return (
    <ProjectHome
      techUrl="/tech/5g-mbs"
      icon={ICON}
      accent="#e07b1a"
      description="Introduces 3GPP 5G Multicast Broadcast Services (MBS): delivery methods and reference tools."
      analysisHref="/tech/5g-mbs/overview"
      standardsHref="/standards/5g-mbs"
      softwareHref="/reference-tools/5g-mbs"
      implemented={
        <>
          <div className="standard-card-row">
            <div className="standard-card">
              <img src={logo} alt="" />
              <span className="standard-card__label">3GPP</span>
            </div>
            <div className="standard-card">
              <img src={ietfLogo} alt="" />
              <span className="standard-card__label">IETF</span>
            </div>
          </div>
          <p>
            See <Link to="/standards/5g-mbs">Media delivery over 5G Multicast Broadcast Services on the Standards portal</Link> for
            version history and 5G-MAG&apos;s own standards contributions.
          </p>
        </>
      }
      why={
        <>
          <p className={styles.whyMattersBody}>
                Sending the same content to a stadium full of devices as separate unicast streams
                consumes network capacity proportional to the audience size, however large it gets.
                MBS avoids that by building multicast and broadcast directly into the 5G Core and RAN:
                the network can choose point-to-multipoint delivery, one transmission reaching every
                device at once, instead of a per-device copy. That is what makes live TV, emergency alerts and mass software
                distribution practical at any audience size, without capacity scaling with the number
                of receivers.
              </p>
        </>
      }
    >
      <p>
                  Multicast &amp; Broadcast in 5G (MBS) introduces native point-to-multipoint delivery
                  into 5G New Radio (NR), standardised from 3GPP Release 17 onwards, and is integrated
                  directly into the 5G Core and Radio Access Network (RAN). Delivery can be
                  point-to-multipoint (PTM), one transmission shared by many devices, or point-to-point
                  (PTP), a separate copy per device, with the network choosing between them. This
                  enables efficient distribution of identical content to many devices simultaneously,
                  whether for live TV, emergency alerts, or software updates.
                </p>
    </ProjectHome>
  );
}
