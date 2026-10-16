import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
  <>
    <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
    <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
    <path d="M3 17v2a2 2 0 0 0 2 2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M17 21h2a2 2 0 0 0 2 -2v-2" />
  </>
);

export default function XR() {
  return (
    <ProjectHome
      techUrl="/tech/xr"
      icon={ICON}
      accent="#8355c7"
      description="MPEG-I scene description and XR media integration over 5G: the scene format and 5G-MAG's reference tools."
      analysisHref="/tech/xr/mpeg-i-scene-description"
      standardsHref="/standards/xr"
      softwareHref="/reference-tools/xr/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Without a common scene format, an XR application&apos;s rendering engine and its media
                pipeline are locked together: swapping either one means rebuilding the other. MPEG-I
                Scene Description avoids that by splitting the two roles cleanly: the Presentation
                Engine renders the scene and knows nothing about how media gets decoded, while the
                Media Access Function (MAF) is transport- and codec-agnostic, building whatever
                pipeline a media object needs behind a fixed API. The same scene document plays
                identically whether the media arrives over MPEG-DASH, RTP/SRTP or a local file, so a
                content author writes one scene and a device vendor builds one MAF, instead of every
                combination needing its own integration.
              </p>
        </>
      }
    >
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
    </ProjectHome>
  );
}
