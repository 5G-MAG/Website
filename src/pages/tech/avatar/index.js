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
// former hand-typed title ("Avatar Communication with MPEG ARF") was
// neither this nor taxonomy.json's `displayName`. ProjectRepoSection still
// needs displayNameOf() separately below: it matches against ALL_REPOS's
// own projectName field, which baskets.js builds from displayNameOf(), not
// from `name`.
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/avatar');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former
// docs/tech/avatar-communications.mdx doc. Same Layout/HubHero every hub
// page uses, not the doc-tier topic-banner. Like content-delivery, this
// topic had no techDoc entry in techTopics.js to begin with (its category
// link was never wired to the doc), so no sidebar-side change accompanies
// this move -- see techTopics.js's own "Avatar Communication with MPEG
// ARF" entry.

// src/data/taxonomy.json's iconCatalog['avatar-figure'] -- this project's
// own catalog icon, reused here rather than invented, same paths the old
// doc's topic-banner used directly.
const AVATAR_ICON = (
  <>
    <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" />
    <path d="M12 2v2" />
    <path d="M9 12v9" />
    <path d="M15 12v9" />
    <path d="M5 16l4 -2" />
    <path d="M15 14l4 2" />
    <path d="M9 18h6" />
    <path d="M10 8v.01" />
    <path d="M14 8v.01" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['immersive-media'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms/content-delivery
// pages' own ACCENT.
const ACCENT = '#8355c7';

const END_TO_END_STEPS = [
  {
    step: '1. Provisioning',
    detail:
      'Both endpoints obtain the base avatar (either a stored ARF asset or one generated for the user). Because the avatar model is shared, only animation and audio need to flow during the call.',
  },
  {
    step: '2. Session setup',
    detail:
      'The endpoints negotiate a real-time session, over the IMS-based conversational path (MTSI) or the RTC framework; the immersive audio codec (IVAS) and any avatar animation stream are negotiated through SDP.',
  },
  {
    step: '3. Capture and tracking',
    detail:
      'The sender tracks the participant from camera and microphone input and derives animation parameters (skeletal pose, facial blendshape weights, and similar) mapped onto the ARF landmarks and joints.',
  },
  {
    step: '4. Encode and packetise',
    detail: 'Animation parameters are formatted as ARF AAUs; audio is encoded with IVAS.',
  },
  {
    step: '5. Transport',
    detail:
      'AAUs are carried over RTP. The IETF is defining an RTP payload format for ARF animations (draft-ietf-avtcore-rtp-avatar) with single-unit, fragmentation, and aggregation packet modes; IVAS audio uses its own RTP payload format. The IMS data channel is one candidate carrier for the animation data.',
  },
  {
    step: '6. Render',
    detail:
      "The receiver's Presentation Engine applies the animation stream to the bound base avatar within the scene, and IVAS renders the spatial audio so the avatar is heard from its scene position.",
  },
];

export default function Avatar() {
  const coverImg = useBaseUrl('/assets/images/projects/avatar.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Explains the MPEG ARF avatar data model and how avatar animation is streamed over 5G for real-time conversational calls."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={AVATAR_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Real-time conversational avatars, animated from user to user
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Avatar Communications covers real-time conversational avatar systems in 5G
                  contexts, targeting the MPEG Avatar Representation Format (ARF) and its use for
                  avatar-based communications. Avatars are synthesised digital representations of
                  participants, animated in real time from audio and video input, enabling immersive
                  video calls and virtual presence experiences.
                </p>
                <p>
                  5G-MAG&apos;s work looks at the tools needed to encode, render, and stream avatars
                  over 5G networks: the avatar representation itself, its animation, and the media
                  transport that carries it. For acronyms used here, see the{' '}
                  <Link to="/tech/glossary">Glossary</Link>.
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
              <h3 className={styles.whyMattersTitle}>Why It Matters</h3>
              <p className={styles.whyMattersBody}>
                Before ARF, an avatar-based call needed the sender&apos;s capture/tracking system and
                the receiver&apos;s rendering engine to come from the same vendor&apos;s proprietary
                avatar format — there was no common way to describe the avatar asset itself or the
                animation stream driving it. ARF standardises both once: the base avatar (stored and
                exchanged as an ISOBMFF or Zip-based asset) and the animation stream (a sequence of
                compact Avatar Animation Units) are separate, interoperable formats, so a conforming
                client can load an avatar from one vendor and drive it with animation produced by a
                different vendor&apos;s tracking system, over an ordinary 5G call.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="#how-it-works"
              standardsHref="/standards/avatar"
              softwareHref="/reference-tools/avatar/"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Built By</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={displayNameOf(PROJECT)} accent={ACCENT} />
          </div>
        </section>

        <section className={styles.section} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              An avatar communication system combines three pieces: a representation of the avatar
              (its 3D model and how it is described), an animation stream that drives it in real
              time from a participant&apos;s audio and video, and a media transport that carries
              these over the network so remote participants see and hear the avatar. 5G-MAG&apos;s
              work looks at how these pieces map onto 5G media delivery.
            </p>

            <p>
              <strong>Key specifications:</strong> ISO/IEC 23090-39 (MPEG Avatar Representation
              Format, ARF), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26813.htm">TR 26.813</a> (Avatar
              Representation and Communication, the FS_AVATAR study item, completed in Release 19).
              An introductory teaser is also available on the{' '}
              <Link to="/tech/exchanges#avatar-communications-in-ar-calls">Technology Exchanges</Link>{' '}
              page.
            </p>

            <h3>The ARF data model</h3>
            <p>
              The Avatar Representation Format (ISO/IEC 23090-39) is built from two complementary
              specifications:
            </p>
            <ul>
              <li>
                A <strong>Base Avatar Format</strong> that stores the avatar asset. Its data model
                is composed of skeletons, meshes, blendshapes, skins, landmarks, and nodes (joints).
                The skeleton and joints give the avatar its articulation; meshes and skins give it
                surface geometry and how that geometry deforms with the skeleton; blendshapes
                provide expression and fine facial deformation; landmarks give named reference
                points used to map tracking data onto the model.
              </li>
              <li>
                An <strong>Animation Stream Format</strong> that carries the time-varying data used
                to animate a base avatar. The stream is a sequence of Avatar Animation Units (AAUs).
                Each AAU is a self-contained packetisation unit, similar in role to a NAL unit in
                video coding, and consists of an AAU header followed by zero or more AAU packets.
                Each AAU references an Avatar ID so that, in a multi-party session, animation data
                can be routed to the correct avatar.
              </li>
            </ul>
            <p>
              The base avatar can be stored and exchanged in two container types: an ISOBMFF
              container (ISO/IEC 14496-12) or a Zip-based container (ISO/IEC 21320-1). Because the
              base avatar and the animation are separate, a client can fetch and load the model once
              (or reuse one it already holds) and then receive only the compact animation stream
              during the call.
            </p>

            <h3>Scene placement via MPEG-I Scene Description</h3>
            <p>
              ARF does not, by itself, position an avatar in a room; that is the job of MPEG-I Scene
              Description (ISO/IEC 23090-14), a set of extensions to Khronos glTF 2.0. Avatar support
              was added to Scene Description through an amendment (ISO/IEC 23090-14:2023 Amendment
              2), which defines a glTF node extension that marks a particular node as the
              root/skeleton node of a humanoid avatar. In the 5G-MAG documentation this is referred
              to as the <code>MPEG_avatar</code> glTF extension, described on the{' '}
              <Link to="/tech/xr/mpeg-i-scene-description">MPEG-I Scene Description</Link> page. The
              Presentation Engine reads the scene, resolves the avatar node, binds the ARF base
              avatar to it, and then applies the incoming animation stream frame by frame. This is
              the same Presentation Engine / Media Access Function decoupling used across the other
              MPEG-I Scene Description tooling.
            </p>

            <h3>End-to-end procedure</h3>
            <p>At a high level, a conversational avatar session proceeds as follows:</p>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>What happens</th>
                  </tr>
                </thead>
                <tbody>
                  {END_TO_END_STEPS.map((r) => (
                    <tr key={r.step}>
                      <td className={styles.feeTableTier}>{r.step}</td>
                      <td>{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Interfaces and interoperability</h3>
            <p>
              An implementer has to respect four interoperability boundaries: the ARF base-avatar
              asset (so any conforming client can load the same avatar), the ARF animation stream
              and AAU structure (so animation produced by one endpoint can drive an avatar at
              another), the scene-description document that anchors the avatar, and the
              session-level negotiation (SDP media descriptions for IVAS audio and for the avatar
              animation payload). Keeping animation production separate from rendering means the
              tracking/animation component and the Unity-based presentation can evolve
              independently, provided both sides agree on the ARF stream format.
            </p>

            <div className="admonition admonition-note alert alert--secondary">
              <div className="admonition-heading">
                <span>ARF specification stage</span>
              </div>
              <div className="admonition-content">
                <p>
                  ARF (ISO/IEC 23090-39) was still at the Draft International Standard stage as of
                  2025; MPEG&apos;s own report of its 155th meeting (July 2026) states it has since
                  advanced to Final Draft International Standard, the stage just before publication,
                  so the base-avatar and animation-stream details above can still change before final
                  publication. Confirm the current stage on the{' '}
                  <a href="https://www.iso.org/standard/91745.html">ISO catalogue page</a> and treat
                  reference tooling as tracking a moving target.
                </p>
              </div>
            </div>

            <p>
              The slide deck below introduces the Avatar Communications reference tools and their
              role in 5G real-time communication.
            </p>
            <div className="pdf-embed-wrapper">
              <iframe
                loading="lazy"
                className="pdf-embed"
                src={useBaseUrl('/docs/Reference_Tools_Avatar.pdf')}
                title="Slide deck: Avatar Communications reference tools"
              ></iframe>
            </div>
            <p>
              <a href={useBaseUrl('/docs/Reference_Tools_Avatar.pdf')}>Download the slide deck</a>{' '}
              &middot; the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/9">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/tech/xr">XR/3D Scenes with MPEG-I Scene Description</Link>: the wider XR area,
              including the scene-description model that positions and animates avatars &middot;{' '}
              <Link to="/tech/xr/mpeg-i-scene-description">MPEG-I Scene Description</Link>: the{' '}
              <code>MPEG_avatar</code> glTF extension used for 3D avatar representation &middot;{' '}
              <Link to="/standards/avatar">Standards: Conversational Avatar Communication with MPEG ARF</Link>: the
              standards-tracking view of this topic.
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
