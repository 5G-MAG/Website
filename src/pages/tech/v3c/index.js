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
// former hand-typed title ("Volumetric Video with MPEG V3C") was neither
// this nor taxonomy.json's `displayName`. ProjectRepoSection still needs
// displayNameOf() separately below: it matches against ALL_REPOS's own
// projectName field, which baskets.js builds from displayNameOf(), not
// from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/v3c');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page (following the 5GMS pilot, src/pages/tech/5gms/index.js),
// replacing the former docs/tech/volumetric.mdx doc -- same Layout/HubHero every hub
// page (/tech, /standards, /developer...) uses, not the doc-tier topic-banner. This
// topic's one real sub-doc, Beyond 2D Video (docs/tech/volumetric/beyond-2d.mdx, URL
// /tech/beyond-2d), stays as a real doc -- only this top-level page moved out of the
// docs system. techTopics.js's "Volumetric Video with MPEG V3C" entry already carries
// no `techDoc` id and keeps `autogen: 'volumetric'` for that sub-doc, so no sidebar
// wiring changes were needed for this move.
const CUBE_ICON = (
  <>
    <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
    <path d="M4 16v2a2 2 0 0 0 2 2h2" />
    <path d="M16 4h2a2 2 0 0 1 2 2v2" />
    <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
    <path d="M12 12.5l4 -2.5" />
    <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" />
    <path d="M8 10v4.5l4 2.5" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['immersive-media'] in
// src/data/baskets.js) as a plain literal, same reasoning as 5gms/index.js.
const ACCENT = '#8355c7';

export default function V3C() {
  const coverImg = useBaseUrl('/assets/images/projects/v3c.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="V3C volumetric video platform for immersive 5G experiences: V-PCC and MIV coding, delivery over 5G, and reference tools."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={CUBE_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Volumetric video platform for immersive experiences
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Volumetric video represents 3D objects and scenes as point clouds or mesh-based
                  data, so viewers can move freely around the content rather than watching from a
                  fixed camera angle. 5G-MAG&apos;s work is built on MPEG V3C (Visual Volumetric
                  Video-based Coding, ISO/IEC 23090-5), the framework that defines the container and
                  compression for volumetric content. Two profiles build on it: V-PCC (Video-based
                  Point Cloud Compression) and MIV (MPEG Immersive Video).
                </p>
                <p>
                  The MPEG V3C Immersive Platform reference tools provide an end-to-end pipeline for
                  encoding, streaming, and rendering V3C content over 5G networks. The related{' '}
                  <Link to="/tech/beyond-2d">Beyond 2D Video Experiences</Link> work extends this to evaluation
                  frameworks for next-generation visual experiences (stereoscopic, multi-view, depth
                  and point-cloud formats) — closely related to V3C but tracked as its own topic.
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
                Volumetric content (point clouds, multi-view-plus-depth) has no dedicated hardware
                codec of its own, and building one is not practical on mobile-class devices. V3C
                sidesteps that entirely: it projects the 3D data onto 2D planes and hands the
                resulting component videos to an ordinary 2D video codec (HEVC, and in later editions
                VVC), reserving CPU/GPU work only for the atlas parsing and 3D reconstruction on top.
                That is what makes volumetric delivery practical today, and it is also why a V3C
                stream can reuse the same DASH packaging, CDN and player-provisioning machinery as
                conventional video, instead of needing a parallel delivery stack built from scratch.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/beyond-2d"
              standardsHref="/standards/v3c"
              softwareHref="/reference-tools/v3c/"
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
            <ProjectRepoSection projectNames={displayNameOf(PROJECT)} accent={ACCENT} />
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
