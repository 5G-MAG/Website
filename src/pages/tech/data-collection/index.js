import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
    <path d="M9 17l0 -5" />
    <path d="M12 17l0 -1" />
    <path d="M15 17l0 -3" />
  </>
);

export default function DataCollection() {
  return (
    <ProjectHome
      techUrl="/tech/data-collection"
      icon={ICON}
      accent="#00a0d2"
      description="The 3GPP architecture for collecting and reporting UE data in the 5G System and exposing it as events, and its instantiation in 5G Media Streaming."
      analysisHref="/tech/data-collection/overview"
      standardsHref="/standards/data-collection"
      softwareHref="/reference-tools/data-collection/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Devices and media services know a lot about how a service performs: what was played, and
                with what quality. 3GPP defined one common way to collect that data, process it, and share it
                with the parties that need it, such as network analytics. Access is controlled: each party
                receives only the processed data it is allowed to see.
              </p>
        </>
      }
    >
      <p>
                  3GPP defines a generic architecture for collecting and reporting data in the 5G System.
                  A Data Collection Application Function (AF) obtains UE data from data collection clients,
                  processes it, and exposes it as events to the NWDAF and to Event Consumer AFs.
                </p>
                <p>
                  The architecture is meant to be instantiated for particular 5G System features. 5G Media
                  Streaming instantiates it, with the Data Collection AF inside the 5GMS AF.
                </p>
    </ProjectHome>
  );
}
