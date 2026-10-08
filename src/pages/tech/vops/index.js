import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/vops' && !p.parent);
const TESTBEDS = ALL_PROJECTS.filter((p) => p.parent === PROJECT.name);

// Placeholder landing page. Copy restates TS 26.265 V19.3.0, clause 1 (Scope), clause 3.1 (Operation Point) and
// annex B.2.3 as the Standards page already cites it. BASKET_ACCENT['content-delivery'] in src/data/baskets.js.
const ACCENT = '#00a0d2';
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
    <Layout
      title={PROJECT.name}
      description="Video capabilities and operation points of 3GPP TS 26.265, and the conformance validator for them."
    >
      <HubHero
        title={PROJECT.name}
        icon={CERT_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Video capabilities and operation points, with a conformance validator
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '62rem' }}>
              <p>
                TS 26.265 addresses the definition of video capabilities and Operation Points such that 3GPP
                service specifications as well as third-party service providers can refer to the
                interoperability points defined in it. An Operation Point is a collection of discrete
                combinations of different video representation formats, including spatial and temporal
                resolutions, colour mapping, transfer functions, and the encoding format.
              </p>
              <p>
                The VOPS Conformance Validator is the testbed of this project. It checks video bitstreams for
                conformance against the operation points of the specification.
              </p>
              <div className={styles.capabilityTags}>
                <span className={styles.capabilityTag}>3GPP</span>
              </div>
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                Video encoders and decoders on 3GPP User Equipment also provide interoperability points for
                third-party services, and video capabilities are predominantly independent of the service in
                use. Operation points give service specifications one place to refer to, and the conformance
                validator lets a bitstream be tested against them.
              </p>
            </div>
          </div>
        </section>

        {TESTBEDS.map((tb) => (
          <section key={tb.name} className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <h2 className={styles.sectionTitle}>{displayNameOf(tb)}</h2>
              <ProjectDestinationCards
                accent={ACCENT}
                analysisHref="/tech/vops/overview"
                standardsHref={tb.standards_url}
                softwareHref={tb.doc_url}
                softwareIsTestbed
              />
            </div>
          </section>
        ))}

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={TESTBEDS.map(displayNameOf)} accent={ACCENT} isTestbed />
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
