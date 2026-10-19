import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
    <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
    <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
    <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
    <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
    <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
  </>
);

export default function AIForMedia() {
  return (
    <ProjectHome
      techUrl="/tech/ai-in-media-services"
      icon={ICON}
      accent="#2e9e5b"
      description="AI and ML for media: the AI/ML Evaluation Framework and 6G AI Traffic Characterization."
      softwareIsTestbed
      cover="ai-ml"
      why={
        <>
          <p className={styles.whyMattersBody}>
                The evaluation framework establishes a common way to evaluate the scenarios collected for the
                FS_AI4Media study, with shared testbed architectures, metrics and test configurations for each
                scenario. The traffic characteristics of media services are relevant to the design of 6G radio
                and service architectures, and for AI media services the 6G study obtains them itself, with a
                testbed that makes the measurements.
              </p>
        </>
      }
    >
      <p>
                  AI and ML in 5G media services are studied and evaluated in 3GPP SA4, in TR 26.927 and
                  TR 26.847. 5G-MAG builds two testbeds for this work: the AI/ML Evaluation Framework, which
                  is the repository cited by TR 26.847 for the AI4Media evaluations, and the 6G AI Traffic
                  Characterization Testbed, which measures the traffic of AI media services for the 6G media
                  study (TR 26.870).
                </p>
    </ProjectHome>
  );
}
