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
// instruction: "the name should be the one in the taxonomy"). ProjectRepoSection
// still needs displayNameOf() separately below: it matches against
// ALL_REPOS's own projectName field, which baskets.js builds from
// displayNameOf(), not from `name` (same value here, but derived properly
// so a later taxonomy.json displayName addition doesn't silently break it).
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/vdmc');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former docs/tech/vdmc.md
// doc. Same Layout/HubHero every hub page uses, not the doc-tier
// topic-banner. taxonomy.json's own `image` for this project is null, so
// the intro below is single-column prose, no cover image grid.
//
// 2026-09-27: docs/tech/vdmc/overview.mdx now exists as a structural
// placeholder (it says so itself -- taxonomy.json's "technical-analysis"
// stage is still false, so there is no real deep-dive content yet, here or
// on this page) and techTopics.js's own entry carries `autogen: 'vdmc'`,
// so the topic now DOES have a real sidebar presence -- analysisHref below
// points at it directly rather than at the in-page "#how-it-works" anchor.
const ICOSAHEDRON_ICON = (
  <>
    <path d="M21 8.007v7.986a2 2 0 0 1 -1.006 1.735l-7 4.007a2 2 0 0 1 -1.988 0l-7 -4.007a2 2 0 0 1 -1.006 -1.735v-7.986a2 2 0 0 1 1.006 -1.735l7 -4.007a2 2 0 0 1 1.988 0l7 4.007a2 2 0 0 1 1.006 1.735" />
    <path d="M3.29 6.97l4.21 2.03" />
    <path d="M20.71 6.97l-4.21 2.03" />
    <path d="M20.7 17h-17.4" />
    <path d="M11.76 2.03l-4.26 6.97l-4.3 7.84" />
    <path d="M12.24 2.03q 2.797 4.44 4.26 6.97t 4.3 7.84" />
    <path d="M12 17l-4.5 -8h9l-4.5 8" />
    <path d="M12 17v5" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['immersive-media'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms page's own ACCENT.
const ACCENT = '#8355c7';

export default function VDMC() {
  const coverImg = useBaseUrl('/assets/images/projects/vdmc.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="ISO/IEC 23090-29 Video-based Dynamic Mesh Coding (V-DMC) -- compressing 3D meshes that deform over time using video codecs."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={ICOSAHEDRON_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Compressing moving 3D surface meshes for real-time immersive environments
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Dynamic Mesh Coding (V-DMC, Video-based Dynamic Mesh Coding, ISO/IEC 23090-29) is an
                  MPEG standard from ISO/IEC JTC 1/SC 29/WG 7 (Coding of 3D Graphics and Haptics) for
                  compressing 3D meshes whose geometry, connectivity and attributes change per frame --
                  for example animated avatars, characters or performance-capture content. Rather than
                  coding a mesh&apos;s full geometry directly, V-DMC reduces each frame to a simplified
                  &quot;basemesh&quot; (a connectivity structure that may itself change per frame) plus
                  per-frame displacement offsets that refine the geometry, along with a texture atlas,
                  and then reuses existing video codecs (HEVC, VVC) to compress that data.
                </p>
                <p>
                  This differs from <Link to="/tech/v3c">MPEG V3C Immersive Platform</Link>, which is
                  point-cloud based; V-DMC targets well-parameterized mesh surfaces where point-cloud
                  methods are less efficient.
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
                A moving 3D mesh — an animated character or a performance capture — has geometry,
                connectivity and attributes that all change per frame, and coding that directly has no
                practical hardware path. V-DMC reduces each frame to a simplified basemesh plus
                per-frame displacement offsets and a texture atlas, then hands that data to existing
                video codecs (HEVC, VVC) rather than defining a new one. That reuse is what makes
                dynamic mesh content deliverable at all on mobile-class hardware, for the specific
                case — well-parameterized mesh surfaces — where the point-cloud approach V3C uses is
                less efficient.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/vdmc/overview"
              standardsHref="/standards/vdmc"
              softwareHref="/reference-tools/vdmc/"
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
