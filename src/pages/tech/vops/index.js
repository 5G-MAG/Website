import ProjectHome from '@site/src/components/ProjectHome';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/vops' && !p.parent);
const TESTBEDS = ALL_PROJECTS.filter((p) => p.parent === PROJECT.name);

// Copy restates TS 26.265 V19.3.0, clause 1 (Scope), clause 3.1 (Operation Point) and
// annex B.2.3 as the Standards page already cites it.
const CERT_ICON = (
  <>
    <path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
    <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
    <path d="M6 9l12 0" />
    <path d="M6 12l3 0" />
    <path d="M6 15l2 0" />
  </>
);

export default function VideoOperationPoints() {
  return (
    <ProjectHome
      techUrl="/tech/vops"
      icon={CERT_ICON}
      accent="#00a0d2"
      description="Video capabilities and operation points of 3GPP TS 26.265, and the conformance validator for them."
      analysisHref="/tech/vops/overview"
      standardsHref="/standards/vops"
      softwareHref={TESTBEDS[0]?.doc_url}
      softwareIsTestbed
      repoNames={TESTBEDS.map(displayNameOf)}
      cover={false}
      why={
        <p className={styles.whyMattersBody}>
          Video encoders and decoders on 3GPP User Equipment also provide interoperability points for
          third-party services, and video capabilities are predominantly independent of the service in
          use. Operation points give service specifications one place to refer to, and the conformance
          validator lets a bitstream be tested against them.
        </p>
      }
    >
      <p>
        TS 26.265 addresses the definition of video capabilities and Operation Points such that 3GPP
        service specifications as well as third-party service providers can refer to the
        interoperability points defined in it. An Operation Point is a collection of discrete
        combinations of different video representation formats, including spatial and temporal
        resolutions, colour mapping, transfer functions, and the encoding format.
      </p>
      <p>
        The VOPS Conformance Validator is the validation tool of this project. It checks video bitstreams for
        conformance against the operation points of the specification.
      </p>
    </ProjectHome>
  );
}
