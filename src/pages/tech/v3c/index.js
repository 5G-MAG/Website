import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
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

export default function V3C() {
  return (
    <ProjectHome
      techUrl="/tech/v3c"
      icon={ICON}
      accent="#8355c7"
      description="V3C volumetric video platform for immersive 5G experiences: V-PCC and MIV coding, delivery over 5G, and reference tools."
      analysisHref="/tech/beyond-2d"
      standardsHref="/standards/v3c"
      softwareHref="/reference-tools/v3c/"
      why={
        <>
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
        </>
      }
    >
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
                  and point-cloud formats): closely related to V3C but tracked as its own topic.
                </p>
    </ProjectHome>
  );
}
