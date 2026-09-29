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
const PROJECT_NAME = PROJECT.name;

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

const BITSTREAM_COMPONENTS = [
  {
    component: 'Atlas sub-bitstream',
    carries: 'Patch data, tile/frame structure, parameter sets',
    notes: 'The V3C-specific layer; not an ordinary video stream',
  },
  {
    component: 'Common atlas sub-bitstream (MIV)',
    carries: 'Camera/view parameters shared across the scene',
    notes: 'Present for MIV; lets the renderer place views in space',
  },
  {
    component: 'Occupancy video',
    carries: 'Validity mask for packed samples',
    notes: 'Ordinary 2D video',
  },
  {
    component: 'Geometry video',
    carries: 'Depth (MIV) or point geometry (V-PCC)',
    notes: 'Ordinary 2D video',
  },
  {
    component: 'Attribute video(s)',
    carries: 'Texture and optional attributes',
    notes: 'One or more ordinary 2D videos',
  },
];

export default function V3C() {
  const coverImg = useBaseUrl('/assets/images/projects/v3c.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="V3C volumetric video platform for immersive 5G experiences: V-PCC and MIV coding, bitstream structure, delivery over 5G, and reference tools."
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

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              V3C (ISO/IEC 23090-5) does not define a new low-level video codec. It defines a way to
              represent 3D content so that conventional 2D video codecs (HEVC, and in later editions
              VVC) do the compression, with a compact metadata layer carrying the 3D structure. The
              pipeline is projection based.
            </p>

            <p>
              <strong>Key specifications:</strong> ISO/IEC 23090-5 (V3C and V-PCC, Video-based Point
              Cloud Compression), ISO/IEC 23090-12 (MIV, MPEG Immersive Video), ISO/IEC 23090-10
              (carriage of V3C data, that is how the coded data is stored in and transported by file
              and streaming formats),{' '}
              <a href="https://www.3gpp.org/dynareport/26512.htm">TS 26.512</a> (5G Media Streaming
              (5GMS) transport for volumetric content delivery).
            </p>

            <ol>
              <li>
                <strong>Projection.</strong> The 3D source (a point cloud for V-PCC, or a set of
                camera views with depth for MIV) is projected onto 2D planes. For V-PCC, connected
                regions of the point cloud are projected onto the plane whose normal best matches the
                surface; for MIV, the input is already a set of views, and redundant content between
                views is pruned.
              </li>
              <li>
                <strong>Patch generation and packing.</strong> Each projected region becomes a patch.
                Patches are packed into 2D atlas frames, and the placement is recorded in the atlas
                metadata so the decoder can invert the process.
              </li>
              <li>
                <strong>Component video generation.</strong> The packing produces parallel 2D videos:
                a geometry video (depth or point position), an occupancy video (which samples are
                valid), and one or more attribute videos (texture, and optionally reflectance or
                transparency).
              </li>
              <li>
                <strong>Video coding.</strong> Each component video is coded with a standard 2D video
                codec. This is what lets V3C reuse hardware video decoders.
              </li>
              <li>
                <strong>Multiplexing.</strong> The coded component videos plus the atlas
                sub-bitstream are assembled into a V3C bitstream as a sequence of V3C units.
              </li>
            </ol>

            <p>
              At the client the process runs in reverse: parse the atlas, decode the component
              videos, then reconstruct the point cloud (V-PCC) or synthesise the requested viewport
              (MIV).
            </p>

            <h3>Bitstream components</h3>
            <p>A V3C bitstream carries a small number of clearly separated components:</p>

            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Carries</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {BITSTREAM_COMPONENTS.map((r) => (
                    <tr key={r.component}>
                      <td className={styles.feeTableTier}>{r.component}</td>
                      <td>{r.carries}</td>
                      <td>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Because the component videos are ordinary coded video, a decoder can offload them to a
              hardware video decoder and reserve CPU/GPU work for the atlas parsing and 3D
              reconstruction. That separation is the reason V3C is practical on mobile-class hardware.
            </p>

            <h3>V-PCC versus MIV</h3>
            <p>
              The two profiles address different capture models and reconstruct different things at
              the client.
            </p>
            <p>
              <strong>V-PCC</strong> (part of ISO/IEC 23090-5) targets a dynamic point cloud,
              typically a single captured object or performer. The client reconstructs the point
              cloud itself, which the application can then place in a scene and view from any angle.
              The main coding tools are the projection of point regions onto per-normal planes, the
              packing of those projections, and the coding of geometry, occupancy, and attribute
              videos.
            </p>
            <p>
              <strong>MIV</strong> (ISO/IEC 23090-12, an extension of V3C) targets a scene captured by
              several cameras with depth, and gives the viewer six degrees of freedom over a limited
              viewing volume (translation within a bounded region plus free rotation). Rather than
              reconstruct a full 3D model, the client synthesises the specific viewport requested by
              the current head pose, using the decoded texture and geometry views plus the view
              parameters in the common atlas. MIV defines profiles that trade decoder complexity
              against flexibility:
            </p>
            <ul>
              <li><strong>Main</strong>: geometry coded with embedded occupancy.</li>
              <li>
                <strong>Extended</strong>: separable occupancy and additional flexibility, including
                an optional transparency attribute.
              </li>
              <li>
                <strong>Extended Restricted Geometry</strong> (a sub-profile of Extended): geometry
                restricted so that transparency stands in for explicit geometry, enabling multi-plane
                image (MPI) delivery.
              </li>
              <li>
                <strong>Geometry Absent</strong>: no geometry is coded; the client derives geometry
                (for example by depth estimation), reducing the transmitted data at the cost of
                client-side processing.
              </li>
            </ul>
            <p>Both profiles emit a V3C bitstream, so they share the same carriage and packaging.</p>

            <h3>Carriage, packaging, and delivery</h3>
            <p>
              ISO/IEC 23090-10 specifies how a V3C bitstream is stored in the ISO Base Media File
              Format (ISOBMFF, ISO/IEC 14496-12) and how the atlas and component videos are organised
              into tracks and multiplexed with other media. It includes support for DASH (ISO/IEC
              23009-1) so a V3C presentation can be described as an adaptive streaming presentation
              and delivered over HTTP. An amendment (ISO/IEC 23090-10:2022/Amd 1) adds support for
              packed video data, and MPEG maintains a conformance and reference-software part for
              carriage (ISO/IEC 23090-25) and a separate conformance-testing part for V3C with V-PCC
              itself (ISO/IEC 23090-20).
            </p>
            <p>
              For delivery over mobile networks, the V3C DASH presentation is treated as ordinary
              media by the 5G Media Streaming pipeline: it is ingested, packaged, and delivered under{' '}
              <a href="https://www.3gpp.org/dynareport/26501.htm">TS 26.501</a> (architecture) and TS
              26.512 (protocols and APIs). The 5G Media Streaming functions do not need to understand
              the volumetric semantics; they see DASH segments referencing coded video and metadata
              tracks. This is what allows volumetric assets to reuse the same CDN, packaging, and
              player-provisioning machinery as conventional streaming.
            </p>

            <h3>End-to-end pipeline</h3>
            <p>
              A V3C deployment covers five stages: encode source content into a V3C bitstream,
              package it, deliver it over the transport described above, then decode and render it
              in real time on the client. On playback, a V3C decoder reconstructs the 3D
              representation from the atlas and its associated video sub-bitstreams (geometry,
              occupancy, attributes) before handing it to the presentation layer — a separation of
              concerns that keeps the V3C-specific decode work independent of whatever engine or
              renderer presents the result. For the current, authoritative repository list and
              implementation status, see the{' '}
              <Link to="/reference-tools/v3c/">Reference Tools</Link> scope and repositories pages.
            </p>

            <h3>Beyond 2D Video Experiences</h3>
            <p>
              The <Link to="/tech/beyond-2d">Beyond 2D Video Experiences</Link> work provides an evaluation
              framework for benchmarking encoding, streaming, and rendering pipelines for
              next-generation visual formats that go beyond traditional flat-screen video —
              stereoscopic video, multi-view video, video plus depth, and point clouds — including the
              V-PCC, MIV and V-DMC (Video-based Dynamic Mesh Coding, ISO/IEC 23090-29) coding
              approaches that relate to V3C. It relates to the 3GPP study captured in{' '}
              <a href="https://www.3gpp.org/dynareport/26956.htm">TR 26.956</a> (Evaluation and
              Characterization of Beyond 2D Video Formats and Codecs). See the{' '}
              <Link to="/tech/beyond-2d">Beyond 2D Video Experiences</Link> page for the full technical treatment,
              including the evaluation scenarios, pipeline and metrics.
            </p>

            <p>
              <strong>Technical paper:</strong>{' '}
              <a href="https://www.interdigital.com/research_papers/efficient-delivery-and-rendering-on-client-devices-via-mpeg-i-standards-for-emerging-volumetric-video-experiences">
                Efficient delivery and rendering on client devices via MPEG-I standards for emerging
                volumetric video experiences
              </a>
              , by C. Guede (InterDigital), P. Fontaine (InterDigital), J. Mulard (InterDigital), B.
              Leroy (InterDigital), C. Quinquis (InterDigital), R. Gendrot (InterDigital), S. Gudumasu
              (InterDigital), V. Allié (InterDigital), B. Kroon (Philips), B. Sonneveldt (Philips), R.
              Schimanofsky (Philips).
            </p>

            <p>
              5G-MAG&apos;s own{' '}
              <a href={useBaseUrl('/docs/Reference_Tools_V3C_Immersive_Platform.pdf')}>
                MPEG V3C Immersive Platform reference tools slide deck
              </a>{' '}
              introduces the volumetric delivery pipeline, and the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/10">Execution Plan</a> tracks
              current implementation work.
            </p>

            <p>
              <strong>Related:</strong> <Link to="/tech/beyond-2d">Beyond 2D Video Experiences</Link> &middot;{' '}
              <Link to="/tech/xr">XR/3D Scenes with MPEG-I Scene Description</Link> &middot;{' '}
              <Link to="/standards/v3c">Standards: MPEG V3C Immersive Platform</Link> &middot;{' '}
              <Link to="/standards/beyond-2d">Standards: Beyond 2D Video Experiences</Link>
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
