import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
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

export default function VDMC() {
  return (
    <ProjectHome
      techUrl="/tech/vdmc"
      icon={ICON}
      accent="#8355c7"
      description="ISO/IEC 23090-29 Video-based Dynamic Mesh Coding (V-DMC) -- compressing 3D meshes that deform over time using video codecs."
      analysisHref="/tech/vdmc/overview"
      standardsHref="/standards/vdmc"
      softwareHref="/reference-tools/vdmc/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                A moving 3D mesh, an animated character or a performance capture, has geometry,
                connectivity and attributes that all change per frame, and coding that directly has no
                practical hardware path. V-DMC reduces each frame to a simplified basemesh plus
                per-frame displacement offsets and a texture atlas, then hands that data to existing
                video codecs (HEVC, VVC) rather than defining a new one. That reuse is what makes
                dynamic mesh content deliverable at all on mobile-class hardware, for the specific
                case, well-parameterised mesh surfaces, where the point-cloud approach V3C uses is
                less efficient.
              </p>
        </>
      }
    >
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
                  point-cloud based; V-DMC targets well-parameterised mesh surfaces where point-cloud
                  methods are less efficient.
                </p>
    </ProjectHome>
  );
}
