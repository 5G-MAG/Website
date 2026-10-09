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
// former hand-typed title ("XR and MPEG-I Scene Description") was neither
// this nor taxonomy.json's `displayName` ("XR Media & 3D Scenes").
// ProjectRepoSection still needs displayNameOf() separately below: it
// matches against ALL_REPOS's own projectName field, which baskets.js
// builds from displayNameOf(), not from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/xr');
const PROJECT_NAME = displayNameOf(PROJECT);

// A per-project "flagship" page, replacing the former docs/tech/xr.mdx doc --
// same treatment as /tech/5gms (src/pages/tech/5gms/index.js), the validated
// template this page follows. No sidebar, a standalone page. Its one real
// sub-page (MPEG-I Scene Description) stays as a real doc under
// docs/tech/xr/ -- only this top-level page moved out of the docs system;
// see techTopics.js's own xr entry for the sidebar-side half of this (it was
// already techDoc-less, autogen: 'xr' only covers that subfolder).

// This project's own icon (iconCatalog['ar-frame'] in src/data/taxonomy.json)
// -- HubHero takes bare <path> elements directly (unlike HubDestinationCard's
// icon prop below, which needs a complete <svg>, hence the icon() wrapping
// there).
const AR_FRAME_ICON = (
  <>
    <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
    <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
    <path d="M3 17v2a2 2 0 0 0 2 2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M17 21h2a2 2 0 0 0 2 -2v-2" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['immersive-media'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms page.
const ACCENT = '#8355c7';

export default function XR() {
  const coverImg = useBaseUrl('/assets/images/projects/xr.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="MPEG-I scene description and XR media integration over 5G: the scene format and 5G-MAG's reference tools."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={AR_FRAME_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Composing, positioning, and temporally synchronizing dynamic 3D visual and audio objects for XR
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Extended Reality (XR) and 3D scene delivery bring interactive, spatially-aware content
                  to 5G devices, from augmented reality overlays to full virtual environments. 5G-MAG&apos;s
                  work centres on MPEG-I Scene Description (ISO/IEC 23090-14), a standard format for
                  describing dynamic 3D scenes composed of glTF 3D objects, audio, and haptic elements.
                </p>
                <p>
                  Scene Description content can be transported using the 5G Media Streaming (5GMS)
                  framework, enabling adaptive and policy-driven delivery of immersive media alongside
                  the scene&apos;s own glTF assets and media tracks.
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
                Without a common scene format, an XR application&apos;s rendering engine and its media
                pipeline are locked together — swapping either one means rebuilding the other. MPEG-I
                Scene Description avoids that by splitting the two roles cleanly: the Presentation
                Engine renders the scene and knows nothing about how media gets decoded, while the
                Media Access Function (MAF) is transport- and codec-agnostic, building whatever
                pipeline a media object needs behind a fixed API. The same scene document plays
                identically whether the media arrives over MPEG-DASH, RTP/SRTP or a local file, so a
                content author writes one scene and a device vendor builds one MAF, instead of every
                combination needing its own integration.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/xr/mpeg-i-scene-description"
              standardsHref="/standards/xr"
              softwareHref="/reference-tools/xr/"
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
