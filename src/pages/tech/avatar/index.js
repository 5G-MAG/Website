import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';

const ICON = (
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

export default function Avatar() {
  return (
    <ProjectHome
      techUrl="/tech/avatar"
      icon={ICON}
      accent="#8355c7"
      description="Explains how avatar animation is streamed over 5G for real-time conversational calls."
      analysisHref="/tech/avatar/overview"
      standardsHref="/standards/avatar"
      softwareHref="/reference-tools/avatar/"
      why={
        <>
          <p className={styles.whyMattersBody}>
                Before ARF, an avatar-based call needed the sender&apos;s capture/tracking system and
                the receiver&apos;s rendering engine to come from the same vendor&apos;s proprietary
                avatar format: there was no common way to describe the avatar asset itself or the
                animation stream driving it. ARF standardises both once: the base avatar (stored and
                exchanged as an ISOBMFF or Zip-based asset) and the animation stream (a sequence of
                compact Avatar Animation Units) are separate, interoperable formats, so a conforming
                client can load an avatar from one vendor and drive it with animation produced by a
                different vendor&apos;s tracking system, over an ordinary 5G call.
              </p>
        </>
      }
    >
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
                  transport that carries it.
                </p>
    </ProjectHome>
  );
}
