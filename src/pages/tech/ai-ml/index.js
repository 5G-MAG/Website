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
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former docs/tech/ai-ml.md
// doc. Same Layout/HubHero every hub page uses, not the doc-tier
// topic-banner.
//
// 2026-09-27: docs/tech/ai-ml/overview.mdx now exists and holds the
// content of this page's former "How It Works" section (moved there per
// owner decision) and techTopics.js's own entry
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

// This project's own basket accent (BASKET_ACCENT['towards-6g'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms and content-delivery
// pages' own ACCENT.
const ACCENT = '#2e9e5b';

export default function AiMl() {
  const coverImg = useBaseUrl('/assets/images/projects/ai-ml.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="AI/ML for media in 3GPP: NWDAF network-side analytics (SA2), the SA4 studies on AI/ML in 5G media services, and the reference tools evaluating AI/ML models for media."
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

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
