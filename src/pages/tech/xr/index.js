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
// former hand-typed title ("XR and MPEG-I Scene Description") was neither
// this nor taxonomy.json's `displayName` ("XR Media & 3D Scenes").
// ProjectRepoSection still needs displayNameOf() separately below: it
// matches against ALL_REPOS's own projectName field, which baskets.js
// builds from displayNameOf(), not from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/xr');
const PROJECT_NAME = PROJECT.name;

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
      description="MPEG-I scene description and XR media integration over 5G: the scene format, its device and delivery model, and 5G-MAG's reference tools."
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Extended Reality (XR) and 3D scene delivery bring interactive, spatially-aware content
                  to 5G devices, from augmented reality overlays to full virtual environments. 5G-MAG&apos;s
                  work centres on MPEG-I Scene Description (ISO/IEC 23090-14), a standard format for
                  describing dynamic 3D scenes composed of glTF 3D objects, audio, and haptic elements.
                </p>
                <p>
                  Scene Description content can be transported using the 5G Media Streaming (5GMS)
                  framework, enabling adaptive and policy-driven delivery of immersive media. 5G-MAG&apos;s
                  reference tools — an MPEG-I-aware media player, native MAF and content pipeline — let
                  anyone building an XR client validate against a real, running implementation.
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

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              XR delivery combines a scene format, a runtime that plays it, a delivery layer over 5G,
              and a device capability model. MPEG defines the scene format; 3GPP defines how it is
              delivered over 5G and what a device must be able to play.
            </p>

            <p>
              <strong>Key specifications:</strong> ISO/IEC 23090-14 (MPEG-I Scene Description), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26928.htm">TR 26.928</a> (Extended Reality (XR) in
              5G), <a href="https://www.3gpp.org/dynareport/26512.htm">TS 26.512</a> (5GMS transport),
              ISO/IEC 23090-2 (OMAFv2, the second edition of the Omnidirectional Media Format).
            </p>

            <p>
              MPEG-I Scene Description (ISO/IEC 23090-14) extends Khronos glTF 2.0 (also published as
              ISO/IEC 12113). glTF describes the static scene: node hierarchy, meshes, materials,
              textures, cameras and animations. The MPEG extensions add what glTF alone cannot express:
              references to external and timed media, circular buffers for streaming, spatial audio,
              real-world anchoring, interactivity, avatars, lighting and haptics.
            </p>

            <p>
              At runtime, ISO/IEC 23090-14 defines a processing model with two roles. The{' '}
              <strong>Presentation Engine</strong> parses the scene, renders each frame, and drives
              playback; it knows the viewer&apos;s pose and object poses and can pass that information
              downstream so delivery can be optimised. The{' '}
              <strong>Media Access Function (MAF)</strong> is asked, through the MAF API, to make a
              media object available in a given format — it builds a pipeline (access, demux, decode,
              format conversion) appropriate to the object&apos;s MIME type and codec parameters, and
              writes the result into buffers that the Presentation Engine reads. The MAF is deliberately
              transport- and codec-agnostic: the same scene can be served over MPEG-DASH, RTP/SRTP or
              local files without changing the scene document. This decoupling is the core
              interoperability contract of the standard; the{' '}
              <Link to="/tech/xr/mpeg-i-scene-description">MPEG-I Scene Description</Link> page details
              the glTF extensions and the buffer/MAF interfaces in full.
            </p>

            <p>
              For streamed and on-demand immersive media, the 5G Media Streaming (5GMS) framework
              applies: 3GPP <a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a> defines the
              architecture (Media Session Handler, Media AF/AS, provisioning and reporting) and TS
              26.512 defines the protocols and APIs. For conversational and low-latency AR (for example
              AR calls), the Real-Time Communication work (the{' '}
              <a href="https://www.3gpp.org/dynareport/26506.htm">TS 26.506</a>/RTC family) applies, and
              split rendering uses WebRTC transport.
            </p>

            <p>
              On the device side, TR 26.928 (Rel-16) and{' '}
              <a href="https://www.3gpp.org/dynareport/26998.htm">TR 26.998</a> (Rel-17) established the
              reference architectures for XR and for glass-type AR/MR devices, and the STAR (stand-alone)
              and EDGAR (edge-dependent) device classes.{' '}
              <a href="https://www.3gpp.org/dynareport/26119.htm">TS 26.119</a> (MeCAR) turns these into
              a concrete capability model — device categories (thin AR glasses, AR glasses, XR phone, XR
              HMD) and the audio, video, scene and XR-system capabilities each supports — and aligns the
              on-device XR client with the Khronos OpenXR runtime API, so an AR application can query
              poses, spaces and inputs in a portable way. A STAR device can render a complex scene
              locally; an EDGAR device cannot, so rendering is split between the device and a network
              renderer. The Split Rendering Media Service Enabler ({' '}
              <a href="https://www.3gpp.org/dynareport/26565.htm">TS 26.565</a>, Rel-18) specifies this
              for non-IMS services: a Split Rendering Client and Server establish a session over the SWAP
              control protocol, and the rendered media itself is carried over WebRTC.
            </p>

            <p>
              5G-MAG&apos;s own{' '}
              <a href={useBaseUrl('/docs/Reference_Tools_XR_Media_MPEG_I_SD.pdf')}>
                reference tools overview slide deck
              </a>{' '}
              introduces the XR Media reference tools and how MPEG-I Scene Description is used in 5G
              delivery, and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/9">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/avatar">Conversational Avatar Communication with MPEG ARF</Link> &middot;{' '}
              <Link to="/tech/v3c">MPEG V3C Immersive Platform</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
