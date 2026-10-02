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
// page uses, not the doc-tier topic-banner.
//
// 2026-09-27: docs/tech/avatar/overview.mdx now exists as a structural
// placeholder (it now also holds the content of this page's former
// "How It Works" section) and techTopics.js's own entry
// carries `autogen: 'avatar'`, so the topic now DOES have a real sidebar
// presence -- analysisHref below points at it directly rather than at the
// in-page "#how-it-works" anchor.

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

export default function Avatar() {
  const coverImg = useBaseUrl('/assets/images/projects/avatar.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Explains how avatar animation is streamed over 5G for real-time conversational calls."
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
            <div className={styles.introGrid}>
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
                  transport that carries it.
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
              analysisHref="/tech/avatar/overview"
              standardsHref="/standards/avatar"
              softwareHref="/reference-tools/avatar/"
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
