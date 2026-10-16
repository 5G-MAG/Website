import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

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

export default function AiMl() {
  return (
    <ProjectHome
      techUrl="/tech/ai-ml"
      icon={ICON}
      accent="#2e9e5b"
      description="AI/ML for media in 3GPP: NWDAF network-side analytics (SA2), the SA4 studies on AI/ML in 5G media services, and the reference tools evaluating AI/ML models for media."
      analysisHref="/tech/ai-ml/overview"
      standardsHref="/standards/ai-ml"
      softwareHref="/testbeds/ai-ml/"
      softwareIsTestbed
      why={
        <>
          <p className={styles.whyMattersBody}>
                A claim that an AI/ML model improves media quality, ABR selection or traffic
                classification is only useful if it can be checked against a common baseline;
                without one, every vendor&apos;s benchmark is measured on its own datasets and its own
                terms, and results can&apos;t be compared. The Evaluation Framework provides that
                common basis: shared benchmarks and datasets that let different AI/ML approaches be
                measured the same way, feeding directly into 3GPP SA4&apos;s own evaluation study
                (TR 26.847) instead of leaving that evidence to be assembled separately by each
                contributor.
              </p>
        </>
      }
    >
      <p>
                  A testbed of the <Link to="/tech/ai-in-media-services">AI in Media Services</Link> project.
                </p>
                <p>
                  3GPP covers AI/ML for 5G media in two places. <strong>SA2</strong> (system
                  architecture) defines the Network Data Analytics Function (NWDAF), which
                  collects data from network functions in the 5G core and produces analytics and
                  predictions that other functions can consume. <strong>SA4</strong> (media codecs
                  and delivery) studies AI and ML in 5G media services, in TR 26.927 and TR 26.847.
                </p>
                <p>
                  5G-MAG&apos;s <Link to="/testbeds/ai-ml/">AI/ML Evaluation Framework</Link>{' '}
                  is the repository cited by TR 26.847 for the AI4Media evaluations, with the
                  scenarios collected for the FS_AI4Media study. It is described in the repository
                  README and covered below.
                </p>
    </ProjectHome>
  );
}
