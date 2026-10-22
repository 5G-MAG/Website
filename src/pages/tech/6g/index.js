import Link from '@docusaurus/Link';
import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

// The study's title, not the project's: this page is the 6G media study as a whole, and AI Traffic
// Characterization (a testbed project of the AI in Media Services area) is the part of it 5G-MAG works on.
const BASKET_TITLE = 'Towards 6G Media';

// Copy restates TR 26.870 V0.6.1: Introduction, clause 1, clause 6.3.3.1 and annex B.
const CHIP_ICON = (
  <>
    <path d="M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
    <path d="M10 9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3" />
  </>
);

export default function Towards6GMedia() {
  return (
    <ProjectHome
      techUrl="/tech/6g"
      title={BASKET_TITLE}
      tagline="Study on Media Aspects for 6G System (TR 26.870)"
      icon={CHIP_ICON}
      accent="#2e9e5b"
      description="The 3GPP study on media aspects for 6G (TR 26.870), and the testbed it uses to measure the traffic of AI media services."
      analysisHref="/tech/6g/overview"
      standardsHref="/standards/6g"
      softwareHref="/testbeds/6g-testbed/"
      softwareIsTestbed
      cover="6g-testbed"
      wrapImage={false}
      why={
        <p className={styles.whyMattersBody}>
          The traffic characteristics of media services are relevant to the design of 6G radio and
          service architectures, and for AI media services the study obtains them itself. Its five
          initial findings are that AI traffic is uplink heavy in some scenarios, that it is bursty,
          that round-trip delay determines responsiveness, that traffic varies within one
          application, and that some traffic is structured in tokens. The findings are to be updated
          as more measurement results become available, which is what the testbed produces.
        </p>
      }
    >
      <p>
        6G AI Traffic Characterization is a testbed of the <Link to="/tech/ai-in-media-services">AI in Media Services</Link> project.
      </p>
      <p>
        This study aims to identify media-related opportunities and gaps in the context of 6G. It
        builds on service requirements defined by SA1 and architectural enhancements defined by SA2.
        The conclusions of this study will form the basis for further detailed studies as well as
        normative work.
      </p>
      <p>
        Annexes C and D of the study document the evaluation of AI traffic characteristics and the
        testbed for it, which is 6G AI Traffic Characterization.
      </p>
    </ProjectHome>
  );
}
