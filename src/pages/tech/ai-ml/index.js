import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy") -- the page's
// former hand-typed title ("AI/ML in 5G Media") was not the taxonomy
// string. ProjectRepoSection still needs displayNameOf() separately below:
// it matches against ALL_REPOS's own projectName field, which baskets.js
// builds from displayNameOf(), not from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/ai-ml');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former docs/tech/ai-ml.md
// doc. Same Layout/HubHero every hub page uses, not the doc-tier
// topic-banner.
//
// 2026-09-27: docs/tech/ai-ml/overview.mdx now exists as a structural
// placeholder (real content still lives in this page's own "How It Works"
// section below, not yet migrated there) and techTopics.js's own entry
// carries `autogen: 'ai-ml'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor.
const BRAIN_ICON = (
  <>
    <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
    <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
    <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
    <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
    <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
    <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['testbeds'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms and content-delivery
// pages' own ACCENT.
const ACCENT = '#4a6b8a';

export default function AiMl() {
  const coverImg = useBaseUrl('/assets/images/projects/ai-ml.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="How 3GPP's two AI/ML tracks fit together for media -- NWDAF network-side analytics (SA2) and UE-side data collection and reporting (SA4) -- and the reference tools evaluating AI/ML models for media."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={BRAIN_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Evaluation framework for AI/ML models in media processing for 3GPP systems
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  3GPP standardises AI/ML for 5G media along two complementary tracks, owned by
                  different working groups. <strong>SA2</strong> (system architecture) defines the
                  Network Data Analytics Function (NWDAF), which collects data from network
                  functions in the 5G core and produces analytics and predictions that other
                  functions can consume. <strong>SA4</strong> (media codecs and delivery) defines
                  the Data Collection and Reporting framework, which standardises how data is
                  gathered from User Equipment (UE) and media clients. A media-aware AI/ML use case
                  (for example, predicting a QoS drop before it affects a live stream) typically
                  needs both tracks feeding in together.
                </p>
                <p>
                  5G-MAG&apos;s <Link to="/testbeds/ai-ml/">AI/ML Evaluation Framework</Link>{' '}
                  provides benchmarks and datasets for evaluating AI/ML models applied to media
                  quality, adaptive bitrate selection and traffic classification, aligned with
                  SA4&apos;s study work covered below.
                </p>
                {PROJECT.sdos?.length > 0 && (
                  <div className={styles.capabilityTags}>
                    {PROJECT.sdos.map((s) => (
                      <span key={s} className={styles.capabilityTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <img
                src={coverImg}
                alt={PROJECT_NAME}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                A claim that an AI/ML model improves media quality, ABR selection or traffic
                classification is only useful if it can be checked against a common baseline —
                without one, every vendor&apos;s benchmark is measured on its own datasets and its own
                terms, and results can&apos;t be compared. The Evaluation Framework provides that
                common basis: shared benchmarks and datasets that let different AI/ML approaches be
                measured the same way, feeding directly into 3GPP SA4&apos;s own evaluation study
                (TR 26.847) instead of leaving that evidence to be assembled separately by each
                contributor.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/ai-ml/overview"
              standardsHref="/standards/ai-ml"
              softwareHref="/testbeds/ai-ml/"
              softwareIsTestbed
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={displayNameOf(PROJECT)} accent={ACCENT} isTestbed />
          </div>
        </section>

        <section className={styles.section} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              The two tracks differ in where their data comes from and what they produce: NWDAF
              works from network-side data and produces analytics for network and application
              functions to consume, while SA4&apos;s framework works from UE-side observations. The
              sections below cover NWDAF&apos;s own structure, how the two tracks meet, and SA4&apos;s
              study work on applying AI/ML directly to media processing.
            </p>

            <p>
              <strong>Key specifications:</strong> 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/23288.htm">TS 23.288</a> (NWDAF architecture,
              SA2), <a href="https://www.3gpp.org/dynareport/26531.htm">TS 26.531</a> and{' '}
              <a href="https://www.3gpp.org/dynareport/26532.htm">TS 26.532</a> (Data Collection and
              Reporting, SA4),{' '}
              <a href="https://www.3gpp.org/dynareport/26847.htm">TR 26.847</a> (Evaluation of AI
              and ML in 5G media services).
            </p>

            <h3>NWDAF: network-side analytics (SA2)</h3>
            <p>
              The Network Data Analytics Function (NWDAF) is the 5G core function through which
              network functions and other data sources expose measurements, and through which
              consumers request analytics or predictions derived from that data. TS 23.288 splits
              the NWDAF&apos;s internal role in two:
            </p>
            <ul>
              <li>
                <strong>AnLF (Analytics Logical Function)</strong>: produces the analytics or
                prediction output that a consumer (for example the PCF, for QoS policy, or an
                Application Function such as the 5GMS AF) subscribes to or requests.
              </li>
              <li>
                <strong>MTLF (Model Training Logical Function)</strong>: trains the ML models that
                an AnLF uses for inference, and can expose those models to other NWDAF instances.
              </li>
            </ul>
            <p>
              Splitting training from inference lets a model be trained once (potentially on a
              different NWDAF instance, closer to where the training data volume is largest) and
              reused for inference wherever it is needed. For a media session, a typical
              consumer-facing output is a load or QoS prediction that a function such as the 5GMS
              AF can act on ahead of time, for example by adjusting a bitrate ceiling before
              congestion actually hits. See{' '}
              <Link to="/standards/5gms">Standards: 5G Media Streaming (5GMS)</Link> for where the 5GMS AF
              sits in that path.
            </p>

            <h3>SA4 data collection: the UE-side input</h3>
            <p>
              The SA4 Data Collection and Reporting framework (TS 26.531, TS 26.532) standardises
              how a UE or media client reports consumption and quality-of-experience (QoE) data,
              and how that data is exposed as events to a consuming function. It is a generic
              framework, reused inside 5G Media Streaming for QoE reporting and available
              standalone. The full architecture (the Data Collection Application Function, its
              R1-R6 reference points, and how it exposes events to consumers including the NWDAF)
              is covered in detail on{' '}
              <Link to="/tech/data-collection">Tech: UE Data Collection, Reporting and Event Exposure</Link>; this page does not
              repeat that detail.
            </p>
            <p>
              For AI/ML purposes, the relevant point is where the two tracks meet: the Data
              Collection Application Function can expose its processed events to the NWDAF as one
              of its consumers (reference points R5/R6), so UE-side observations gathered under the
              SA4 framework can feed into SA2&apos;s network-side analytics rather than the two
              tracks running in isolation.
            </p>

            <h3>The SA4 AI/ML media studies: TR 26.927 and TR 26.847</h3>
            <p>
              SA4&apos;s study of applying AI/ML techniques directly to media processing and
              delivery, as distinct from the network-analytics use of AI/ML in NWDAF above, is
              captured in two companion technical reports, both published at version 19.0.0 in June
              2025 (Release 19):
            </p>
            <ul>
              <li>
                <a href="https://www.3gpp.org/dynareport/26927.htm">TR 26.927</a> (Study on
                Artificial Intelligence and Machine Learning in 5G media services) covers the
                functional side: media-based AI/ML use cases (object recognition in image and
                video, video quality enhancement in streaming, crowd-sourced media capture, natural
                language processing on speech) and the media service architecture for AI/ML,
                including split-inference configurations and model delivery.
              </li>
              <li>
                <a href="https://www.3gpp.org/dynareport/26847.htm">TR 26.847</a> (Evaluation of
                Artificial Intelligence and Machine Learning in 5G media services) is the evaluation
                companion: testbed architectures and anchors for split inferencing and model-data
                transmission, evaluation metrics, and scenarios such as compressed AI/ML model
                transfer for automatic speech recognition and video quality enhancement in
                streaming. The <Link to="/testbeds/ai-ml/">AI/ML Evaluation Framework</Link>{' '}
                reference tooling is aligned with this report.
              </li>
            </ul>

            <h3>Related AI/ML studies that feed 6G</h3>
            <p>
              <a href="https://www.3gpp.org/dynareport/22874.htm">TR 22.874</a> (SA1, Study on
              traffic characteristics and performance requirements for AI/ML model transfer in 5GS)
              is a companion study, on the network-transport side of AI/ML rather than the
              media-processing side: it looks at how model-transfer traffic itself behaves on the
              5G system. Both this study and TR 26.847 feed 5G-MAG&apos;s early input to 6G, where
              AI-native traffic management is one of the new IMT-2030 usage scenarios; see{' '}
              <Link to="/tech/6g">Towards 6G Media</Link> for that wider context.
            </p>

            <p>
              The <a href="https://github.com/orgs/5G-MAG/projects/44/views/16">Execution Plan</a>{' '}
              tracks current implementation work.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/tech/data-collection">UE Data Collection, Reporting and Event
              Exposure</Link> &middot; <Link to="/tech/6g">Towards 6G Media</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
