import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import HeroFigure from '@site/src/components/HeroFigure';
import ProjectIcon from '@site/src/components/ProjectIcon';
import releasesData from '@site/static/data/releases.json';
import { isRC, daysSince, formatAge } from '@site/src/utils/releases';
import styles from './styles.module.css';

// Auto-advancing hero: a brand/overview slide plus one slide per each of
// the 3 most recent projects with a release, showing that project's
// latest releases and contributors. Originally /developer's hero; moved
// to the homepage (2026-07-18) as the site's single front door, while
// /developer itself now uses the same compact HubHero as every other hub.
const TONE_A = '#00A0D2';
const ANCHOR_REFTOOLS = '#f38d3c';
const ANCHOR_TESTBEDS = '#74b85c';
const ANCHOR_APPS = '#7c52e4';

const HERO_TILES = [
  {
    cx: 286,
    cy: 158,
    size: 130,
    rot: -0.4,
    color: ANCHOR_REFTOOLS,
    d: 'M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16',
  }, // Reference Tools
  {
    cx: 740,
    cy: 394,
    size: 128,
    rot: 6.6,
    color: ANCHOR_TESTBEDS,
    d: 'M9 3l6 0 M10 9l4 0 M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6',
  }, // Testbeds
  {
    cx: 614,
    cy: 205,
    size: 130,
    rot: -6.5,
    color: ANCHOR_APPS,
    d: 'M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0 M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5',
  }, // Applications
  // Randomly added (no repeats)
  {
    cx: 812,
    cy: 260,
    size: 111,
    rot: 8.2,
    color: TONE_A,
    d: 'M14 3v4a1 1 0 0 0 1 1h4 M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2 M9 17l0 -5 M12 17l0 -1 M15 17l0 -3',
  }, // UE Data Collection
  { cx: 304, cy: 321, size: 112, rot: -0.3, color: TONE_A, d: 'M7 4v16l13 -8l-13 -8' }, // 5G Media Streaming
  {
    cx: 164,
    cy: 382,
    size: 98,
    rot: 8.5,
    color: TONE_A,
    d: 'M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1 M6 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3v-4h4',
  }, // 5GC Service Consumers
  {
    cx: 437,
    cy: 244,
    size: 94,
    rot: 4.1,
    color: TONE_A,
    d: 'M4 8v-2a2 2 0 0 1 2 -2h2 M4 16v2a2 2 0 0 0 2 2h2 M16 4h2a2 2 0 0 1 2 2v2 M16 20h2a2 2 0 0 0 2 -2v-2 M12 12.5l4 -2.5 M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5 M8 10v4.5l4 2.5',
  }, // V3C Immersive
  {
    cx: 565,
    cy: 364,
    size: 100,
    rot: 8.1,
    color: TONE_A,
    d: 'M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5',
  }, // Common Tools
  {
    cx: 754,
    cy: 151,
    size: 81,
    rot: -3.7,
    color: TONE_A,
    d: 'M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9 M16 3l-4 4l-4 -4',
  }, // DVB-I over 5G
  {
    cx: 157,
    cy: 203,
    size: 80,
    rot: 5.9,
    color: TONE_A,
    d: 'M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1 M9 15l3 -3l3 3 M12 12l0 9',
  }, // Multimedia Protocols
];

// Homepage's own icon cloud (distinct from HERO_TILES above, which is the
// brand slide's tighter 3-anchor cluster) — a curated 14-icon selection,
// all in the site's real topic-banner blue, four size tiers for a real
// size gradient. Positions are rejection-sampled against the canvas edges
// and every other tile, then scored for left/right balance.
const HOME_TILES = [
  // Big
  {
    cx: 313,
    cy: 395,
    size: 129,
    rot: 8.5,
    color: TONE_A,
    d: 'M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M16.616 13.924a5 5 0 1 0 -9.23 0 M20.307 15.469a9 9 0 1 0 -16.615 0 M9 21l3 -9l3 9 M10 19h4',
  }, // 5G Broadcast TV Radio
  { cx: 702, cy: 341, size: 130, rot: -2.3, color: TONE_A, d: 'M7 4v16l13 -8l-13 -8' }, // 5G Media Streaming
  {
    cx: 439,
    cy: 115,
    size: 128,
    rot: -3.8,
    color: TONE_A,
    d: 'M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0 M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2 M3 7v-2a2 2 0 0 1 2 -2h2 M3 17v2a2 2 0 0 0 2 2h2 M17 3h2a2 2 0 0 1 2 2v2 M17 21h2a2 2 0 0 0 2 -2v-2',
  }, // XR Media
  {
    cx: 129,
    cy: 146,
    size: 131,
    rot: -6.4,
    color: TONE_A,
    d: 'M4 13h5 M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3 M20 8v8 M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5',
  }, // Network APIs
  // Medium
  {
    cx: 745,
    cy: 177,
    size: 108,
    rot: -0.4,
    color: TONE_A,
    d: 'M4 8v-2a2 2 0 0 1 2 -2h2 M4 16v2a2 2 0 0 0 2 2h2 M16 4h2a2 2 0 0 1 2 2v2 M16 20h2a2 2 0 0 0 2 -2v-2 M12 12.5l4 -2.5 M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5 M8 10v4.5l4 2.5',
  }, // V3C Immersive
  {
    cx: 82,
    cy: 381,
    size: 107,
    rot: -3.7,
    color: TONE_A,
    d: 'M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4 M12 2v2 M9 12v9 M15 12v9 M5 16l4 -2 M15 14l4 2 M9 18h6 M10 8v.01 M14 8v.01',
  }, // Conversational Avatar
  {
    cx: 491,
    cy: 449,
    size: 109,
    rot: -0.8,
    color: TONE_A,
    d: 'M7 21v-6 M20 6l-3 -3l-3 3 M10 18l-3 3l-3 -3 M7 3v2 M7 9v2 M17 3v6 M17 21v-2 M17 15v-2',
  }, // Real-Time Communications
  {
    cx: 301,
    cy: 164,
    size: 104,
    rot: -0.9,
    color: TONE_A,
    d: 'M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z M6 10l-3 3l3 3l3 -3 M10 6l3 -3l3 3l-3 3 M14 17a3 3 0 0 0 3 -3 M20 13a9 9 0 0 0 -9 9',
  }, // Non-Terrestrial Networks
  // Small
  {
    cx: 880,
    cy: 394,
    size: 90,
    rot: -5.2,
    color: TONE_A,
    d: 'M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8 M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8 M17.5 16a3.5 3.5 0 0 0 0 -7h-.5 M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0 M6.5 16a3.5 3.5 0 0 1 0 -7h.5 M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10',
  }, // AI ML
  {
    cx: 541,
    cy: 326,
    size: 89,
    rot: 3.9,
    color: TONE_A,
    d: 'M12 12l0 .01 M14.828 9.172a4 4 0 0 1 0 5.656 M17.657 6.343a8 8 0 0 1 0 11.314 M9.168 14.828a4 4 0 0 1 0 -5.656 M6.337 17.657a8 8 0 0 1 0 -11.314',
  }, // 5G Multicast Broadcast
  {
    cx: 580,
    cy: 112,
    size: 90,
    rot: -0.8,
    color: TONE_A,
    d: 'M14 3v4a1 1 0 0 0 1 1h4 M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2 M9 17l0 -5 M12 17l0 -1 M15 17l0 -3',
  }, // UE Data Collection
  {
    cx: 868,
    cy: 239,
    size: 89,
    rot: -1.9,
    color: TONE_A,
    d: 'M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1 M9 15l3 -3l3 3 M12 12l0 9',
  }, // Multimedia Protocols
  // Tiny
  {
    cx: 189,
    cy: 463,
    size: 72,
    rot: 9.7,
    color: TONE_A,
    d: 'M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9 M16 3l-4 4l-4 -4',
  }, // DVB-I over 5G
  {
    cx: 391,
    cy: 280,
    size: 76,
    rot: 7.7,
    color: TONE_A,
    d: 'M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2 M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1 M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1',
  }, // 5G Broadcast Emergency Alerts
];

const PROJECT_TYPE_MAP = {
  '5G Media Streaming': 'Reference Tools',
  '5G Broadcast TV Radio': 'Reference Tools',
  'XR Media': 'Reference Tools',
  '5G Multicast Broadcast': 'Reference Tools',
  'UE Data Collection': 'Reference Tools',
  'V3C Immersive': 'Reference Tools',
  'Multimedia Delivery Protocols': 'Reference Tools',
  'DVB-I over 5G': 'Reference Tools',
  '5G Broadcast Emergency Alerts': 'Reference Tools',
  '5GC Service Consumers': 'Reference Tools',
  'Conversational Avatar': 'Reference Tools',
  'Beyond 2D Video Experiences': 'Testbed',
  'Network APIs': 'Reference Tools',
  '6G Testbed and AI Traffic': 'Testbed',
  'AI ML': 'Testbed',
};

const HOME_SLIDE = { type: 'home' };
const BRAND_SLIDE = { type: 'brand' };

export default function HeroSlideshow() {
  const releaseSlides = releasesData.projects.slice(0, 3).map((p) => ({ type: 'release', ...p }));
  const slides = [HOME_SLIDE, BRAND_SLIDE, ...releaseSlides];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const slide = slides[active];

  function slideBg() {
    return 'linear-gradient(to right, #003580 0%, #00A0D2 100%)';
  }

  return (
    <header
      className={styles.slideshow}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stable, always-present H1 for the homepage's only heading — the slide
          headings below rotate every 8s and, on release slides, aren't an H1
          at all, so the document needs one heading that doesn't depend on
          which slide happens to be active. */}
      <h1 className="sr-only">5G-MAG — The Media Connectivity Association</h1>
      {slides.map((s, i) => (
        <div
          key={i}
          className={clsx(styles.slide, i === active && styles.slideActive)}
          style={{ backgroundImage: slideBg() }}
        />
      ))}

      <div key={active} className={styles.slideContentWrapper}>
        {slide.type === 'home' ? (
          <div className={styles.slideOverlay}>
            <div
              className="container"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem',
              }}
            >
              <div>
                <img
                  src="/img/5g-mag-logo-white.png"
                  alt="5G-MAG — The Media Connectivity Association"
                  style={{
                    height: '68px',
                    width: 'auto',
                    marginBottom: '1.25rem',
                    display: 'block',
                  }}
                />
                <p className={styles.slideTitle}>Bridging Standards and Deployments</p>
                <p className={styles.slideSubtitle}>
                  At the intersection of Media and Connectivity, for generations to come
                </p>
                <div className={styles.slideButtons}>
                  <Link
                    className="button button--primary button--lg"
                    to="/membership#request-membership"
                  >
                    Become a member
                  </Link>
                  <Link
                    className={clsx(
                      'button button--outline button--primary button--lg',
                      styles.slideBtnOutline
                    )}
                    to="/about"
                  >
                    About Us
                  </Link>
                </div>
              </div>
              <HeroFigure tiles={HOME_TILES} />
            </div>
          </div>
        ) : slide.type === 'brand' ? (
          <div className={styles.slideOverlay}>
            <div
              className="container"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem',
              }}
            >
              <div>
                <img
                  src="/img/5g-mag-logo-white.png"
                  alt="5G-MAG — The Media Connectivity Association"
                  style={{
                    height: '68px',
                    width: 'auto',
                    marginBottom: '1.25rem',
                    display: 'block',
                  }}
                />
                <p className={styles.slideTitle}>Media Connectivity Software Accelerator</p>
                <p className={styles.slideSubtitle}>
                  Open-source developer community. Reference tools, testbeds and applications for
                  connected media experiences.
                </p>
                <div className={styles.slideButtons}>
                  <Link className="button button--primary button--lg" to="/developer#community">
                    Join the Effort
                  </Link>
                  <Link
                    className={clsx(
                      'button button--outline button--primary button--lg',
                      styles.slideBtnOutline
                    )}
                    to="/reference-tools"
                  >
                    Explore All Projects
                  </Link>
                  <a
                    className={clsx(
                      'button button--outline button--primary button--lg',
                      styles.slideBtnOutline
                    )}
                    href="pathname:///docs/Reference_Tools_Overview.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Overview ↓
                  </a>
                </div>
              </div>
              <HeroFigure tiles={HERO_TILES} />
            </div>
          </div>
        ) : (
          <div className={styles.slideOverlayCards}>
            <div className="container">
              <div className={styles.slideCard}>
                <div className={styles.slideCardHeader}>
                  <p className={styles.slideEyebrow}>
                    <span className={styles.slideEyebrowPill}>
                      <span className={styles.slideEyebrowPillDot} />
                      {isRC(slide.releases[0]) ? 'Release Candidate' : 'New Release'}
                    </span>
                    {PROJECT_TYPE_MAP[slide.name] && (
                      <span className={styles.slideEyebrowGroupPill}>
                        {PROJECT_TYPE_MAP[slide.name]}
                      </span>
                    )}
                  </p>
                  <div className={styles.slideCardHeaderMain}>
                    <ProjectIcon name={slide.name} className={styles.slideCardHeaderIcon} />
                    <h2 className={styles.slideCardTitle}>
                      <span className={styles.slideCardTitlePrefix}>New Releases for </span>
                      {slide.name}
                    </h2>
                  </div>
                </div>
                <div className={styles.slideCardBody}>
                  <div className={styles.slideCardReleasesCol}>
                    <ul className={styles.slideReleases}>
                      {slide.releases
                        .sort((a, b) => b.date.localeCompare(a.date))
                        .slice(0, 6)
                        .map((r) => (
                          <li key={r.repo} className={styles.slideReleaseItem}>
                            <a
                              href={r.url}
                              className={styles.slideReleaseLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {r.repo}
                            </a>
                            <div className={styles.slideReleaseMeta}>
                              <span className={clsx(styles.slideTag, isRC(r) && styles.slideTagRc)}>
                                {r.tag}
                              </span>
                              <span className={styles.slideAge}>
                                {formatAge(daysSince(r.date))}
                              </span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className={styles.slideCardContributorsCol}>
                    <p className={styles.slideContributorsLabel}>
                      Congratulations to the contributors
                    </p>
                    <div className={styles.slideProjectPanelAvatarRow}>
                      {slide.releases
                        .filter((r) => r.author_login)
                        .reduce((acc, r) => {
                          if (!acc.find((a) => a.login === r.author_login)) {
                            acc.push({ login: r.author_login, avatar: r.author_avatar });
                          }
                          return acc;
                        }, [])
                        .map((a) => (
                          <a
                            key={a.login}
                            href={`https://github.com/${a.login}`}
                            className={styles.slideProjectPanelAvatar}
                            target="_blank"
                            rel="noreferrer"
                            title={a.login}
                          >
                            <img src={a.avatar} alt={a.login} />
                            <span className={styles.slideProjectPanelAvatarName}>{a.login}</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
                {slide.doc_url && (
                  <div className={styles.slideCardFooter}>
                    <Link className="button button--primary button--lg" to={slide.doc_url}>
                      Documentation
                    </Link>
                    <Link
                      className={clsx(
                        'button button--outline button--primary button--lg',
                        styles.slideBtnOutline
                      )}
                      to={`${slide.doc_url}${slide.releases_slug || 'resources'}`}
                    >
                      Releases
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.slideDots}>
        {slides.map((s, i) => (
          <button
            key={i}
            className={clsx(styles.slideDot, i === active && styles.slideDotActive)}
            onClick={() => setActive(i)}
            aria-label={s.type === 'home' ? 'Home' : s.type === 'brand' ? 'Overview' : s.name}
          >
            {i === active && (
              <span className={styles.slideDotLabel}>
                {s.type === 'home' ? 'Home' : s.type === 'brand' ? 'Overview' : s.name}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
