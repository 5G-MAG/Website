import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
  <>
    <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z" />
    <path d="M6 10l-3 3l3 3l3 -3" />
    <path d="M10 6l3 -3l3 3l-3 3" />
    <path d="M14 17a3 3 0 0 0 3 -3" />
    <path d="M20 13a9 9 0 0 0 -9 9" />
  </>
);

export default function NTN() {
  return (
    <ProjectHome
      techUrl="/tech/ntn"
      icon={ICON}
      accent="#1a9e93"
      description="Extending 5G coverage via satellite and HAPS as a delivery layer for MBS multicast and broadcast."
      analysisHref="/tech/ntn/overview"
      standardsHref="/standards/ntn"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Terrestrial infrastructure doesn&apos;t reach every area a broadcaster needs to serve,
                and building a separate service layer for satellite delivery would mean maintaining
                two parallel stacks. NTN avoids that: it standardises only the radio-layer adaptations
                a long, variable-delay satellite path needs: a large UE-specific timing advance,
                Doppler pre-compensation, the k-offset scheduling adjustment: so the existing MBS
                Multicast and Broadcast user-service and streaming layers can run over a satellite or
                HAPS access exactly as they do terrestrially, reaching areas outside terrestrial
                coverage without a second, incompatible delivery system.
              </p>
        </>
      }
    >
      <p>
                  Non-Terrestrial Networks (NTN) extend 5G coverage via satellite (geostationary GEO and
                  low Earth orbit LEO) and high-altitude platform stations (HAPS), standardised in 3GPP
                  Release 17. For media distribution, NTN is not a standalone system: it is a delivery
                  infrastructure layer on top of which existing 5G services such as MBS Multicast and MBS
                  Broadcast can be deployed. 5G-MAG&apos;s work in this area focuses on the specific
                  challenges NTN introduces: propagation delay, Doppler effects, handover between
                  satellite beams, and device mobility across terrestrial and non-terrestrial segments.
                </p>
                <p>
                  <strong>No dedicated reference tool exists for NTN.</strong> The 5G-MAG MBS reference
                  tools (for Multicast and Broadcast) are the relevant software for NTN deployment
                  scenarios: see{' '}
                  <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>. For satellite broadcast
                  delivery using the FeMBMS (5G Broadcast) waveform, see{' '}
                  <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link>.
                </p>
    </ProjectHome>
  );
}
