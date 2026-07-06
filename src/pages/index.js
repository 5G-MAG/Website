import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    {paths}
  </svg>
);

// Same tabler-style icon paths used for the project cards on /developer
// (see SLIDE_ICONS in src/pages/developer/index.js) — reused here so the
// hero reads as "built from our own capability areas" rather than a
// generic or stock graphic. The 5G-MAG logo itself now lives above the
// headline instead of inside this cluster (see the hero markup below); the
// empty space where it used to sit is intentional breathing room.
// A curated 14-icon selection (trimmed down from an earlier 20-icon set —
// Reference Tools, Testbeds, Beyond 2D, Applications, Feedback &
// Requirements and Liaison Statements were removed for being too crowded),
// all in the site's real topic-banner blue (see .topic-banner in
// src/css/custom.css — every /tech page banner uses this gradient's
// lighter end, --ifm-color-primary), not an invented palette. Four size
// tiers — big / medium / small / tiny — give a real size gradient.
// Positions are rejection-sampled against the canvas edges and every other
// tile — requiring extra clearance between tiles of the SAME size tier —
// then scored for perfect left/right balance (against the canvas's true
// center) and the 4 big tiles spread well apart from each other.
const TONE_A = '#00A0D2';

const TILES = [
  // Big
  { cx: 313, cy: 395, size: 129, rot: 8.5,  color: TONE_A, d: 'M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0 M16.616 13.924a5 5 0 1 0 -9.23 0 M20.307 15.469a9 9 0 1 0 -16.615 0 M9 21l3 -9l3 9 M10 19h4' }, // 5G Broadcast TV Radio
  { cx: 702, cy: 341, size: 130, rot: -2.3, color: TONE_A, d: 'M7 4v16l13 -8l-13 -8' }, // 5G Media Streaming
  { cx: 439, cy: 115, size: 128, rot: -3.8, color: TONE_A, d: 'M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0 M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2 M3 7v-2a2 2 0 0 1 2 -2h2 M3 17v2a2 2 0 0 0 2 2h2 M17 3h2a2 2 0 0 1 2 2v2 M17 21h2a2 2 0 0 0 2 -2v-2' }, // XR Media
  { cx: 129, cy: 146, size: 131, rot: -6.4, color: TONE_A, d: 'M4 13h5 M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3 M20 8v8 M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5' }, // Network APIs
  // Medium
  { cx: 745, cy: 177, size: 108, rot: -0.4, color: TONE_A, d: 'M4 8v-2a2 2 0 0 1 2 -2h2 M4 16v2a2 2 0 0 0 2 2h2 M16 4h2a2 2 0 0 1 2 2v2 M16 20h2a2 2 0 0 0 2 -2v-2 M12 12.5l4 -2.5 M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5 M8 10v4.5l4 2.5' }, // V3C Immersive
  { cx: 82,  cy: 381, size: 107, rot: -3.7, color: TONE_A, d: 'M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4 M12 2v2 M9 12v9 M15 12v9 M5 16l4 -2 M15 14l4 2 M9 18h6 M10 8v.01 M14 8v.01' }, // Conversational Avatar
  { cx: 491, cy: 449, size: 109, rot: -0.8, color: TONE_A, d: 'M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4 M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z' }, // Real-Time Communications
  { cx: 301, cy: 164, size: 104, rot: -0.9, color: TONE_A, d: 'M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z M6 10l-3 3l3 3l3 -3 M10 6l3 -3l3 3l-3 3 M14 17a3 3 0 0 0 3 -3 M20 13a9 9 0 0 0 -9 9' }, // Non-Terrestrial Networks
  // Small
  { cx: 880, cy: 394, size: 90, rot: -5.2, color: TONE_A, d: 'M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8 M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8 M17.5 16a3.5 3.5 0 0 0 0 -7h-.5 M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0 M6.5 16a3.5 3.5 0 0 1 0 -7h.5 M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10' }, // AI ML
  { cx: 541, cy: 326, size: 89, rot: 3.9,  color: TONE_A, d: 'M12 12l0 .01 M14.828 9.172a4 4 0 0 1 0 5.656 M17.657 6.343a8 8 0 0 1 0 11.314 M9.168 14.828a4 4 0 0 1 0 -5.656 M6.337 17.657a8 8 0 0 1 0 -11.314' }, // 5G Multicast Broadcast
  { cx: 580, cy: 112, size: 90, rot: -0.8, color: TONE_A, d: 'M14 3v4a1 1 0 0 0 1 1h4 M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2 M9 17l0 -5 M12 17l0 -1 M15 17l0 -3' }, // UE Data Collection
  { cx: 868, cy: 239, size: 89, rot: -1.9, color: TONE_A, d: 'M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1 M9 15l3 -3l3 3 M12 12l0 9' }, // Multimedia Protocols
  // Tiny
  { cx: 189, cy: 463, size: 72, rot: 9.7,  color: TONE_A, d: 'M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9 M16 3l-4 4l-4 -4' }, // DVB-I over 5G
  { cx: 391, cy: 280, size: 76, rot: 7.7,  color: TONE_A, d: 'M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2 M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1 M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1' }, // 5G Broadcast Emergency Alerts
];

// A composition built from the site's own capability-area icons (streaming,
// XR, broadcast, network, immersive/V3C, data, multimedia, avatar) orbiting
// the 5G-MAG logo itself — reads as "here is what we work on, and who."
// Radius (in viewBox units) within which the cursor pushes a tile away,
// and the max distance a tile can be shoved — a playful "disturb the
// cloud" hover effect, skipped entirely under prefers-reduced-motion.
const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 46;

function HeroFigure() {
  const reducedMotion = usePrefersReducedMotion();
  const svgRef = useRef(null);
  const tileRefs = useRef([]);
  const rafRef = useRef(null);

  const settleTiles = () => {
    tileRefs.current.forEach((el) => {
      if (el) el.style.transform = 'translate(0px, 0px)';
    });
  };

  const repelTiles = (mouseX, mouseY) => {
    TILES.forEach((t, i) => {
      const el = tileRefs.current[i];
      if (!el) return;
      const dx = t.cx - mouseX;
      const dy = t.cy - mouseY;
      const dist = Math.hypot(dx, dy) || 0.001;
      if (dist >= REPEL_RADIUS) {
        el.style.transform = 'translate(0px, 0px)';
        return;
      }
      const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
      el.style.transform = `translate(${(dx / dist) * push}px, ${(dy / dist) * push}px)`;
    });
  };

  const handleMouseMove = (e) => {
    if (reducedMotion || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 950;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 560;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => repelTiles(mouseX, mouseY));
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    settleTiles();
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 950 560"
      className={styles.heroFigure}
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <filter id="tileShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#001a33" floodOpacity="0.35" />
        </filter>
      </defs>


      {TILES.map((t, i) => {
        const iconScale = (t.size * 0.62) / 24;
        return (
          <g key={i} ref={(el) => (tileRefs.current[i] = el)} className={styles.tileRepel}>
            <g transform={`translate(${t.cx},${t.cy}) rotate(${t.rot})`}>
              <g>
                {!reducedMotion && (
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 -7; 0 0"
                    dur={`${3.4 + (i % 3) * 0.5}s`}
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                    keyTimes="0; 0.5; 1"
                  />
                )}
                <rect
                  x={-t.size / 2} y={-t.size / 2} width={t.size} height={t.size}
                  rx={t.size * 0.24} fill={t.color} filter="url(#tileShadow)"
                />
                <g
                  transform={`translate(${-12 * iconScale},${-12 * iconScale}) scale(${iconScale})`}
                  fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d={t.d} />
                </g>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

const PORTALS = [
  {
    title: 'Software Accelerator Portal',
    tagline: 'Open-source reference tools, testbeds and application prototypes for 5G media and broadcast — built and maintained by the 5G-MAG community.',
    href: '/developer',
    icon: icon(<><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></>),
    links: [
      { label: 'Reference Tools', href: '/developer/projects' },
      { label: 'Testbeds', href: '/developer/testbeds' },
      { label: 'Application Prototypes', href: '/developer/applications' },
    ],
  },
  {
    title: 'Technical Docs & Standards Work',
    tagline: 'Specification analysis, implementation explainers and SDO contributions — feedback, requirements and liaison statements produced by our members.',
    href: '/tech',
    icon: icon(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M9 17l0 -5" /><path d="M12 17l0 -1" /><path d="M15 17l0 -3" /></>),
    links: [
      { label: 'Technical Documentation', href: '/tech/intro' },
      { label: 'Standards Work', href: '/tech/standards/feedback' },
    ],
  },
];

function PortalCard({ title, tagline, href, icon, links }) {
  return (
    <div className={styles.portalCard}>
      <Link to={href} className={styles.portalCardBand}>
        <span className={styles.portalCardIcon}>{icon}</span>
        <h2 className={styles.portalCardTitle}>{title}</h2>
      </Link>
      <div className={styles.portalCardBody}>
        <p className={styles.portalCardTagline}>{tagline}</p>
        <ul className={styles.portalCardLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <Link to={l.href}>{l.label} &rarr;</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>

      {/* Hero */}
      <header style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.18) 100%), linear-gradient(to right, #003580 0%, #00A0D2 100%)',
        height: '490px',
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 0 2.5rem',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <img
              src="/img/5g-mag-logo-white.png"
              alt="5G-MAG — The Media Connectivity Association"
              style={{ height: '68px', width: 'auto', marginBottom: '1.25rem', display: 'block' }}
            />
            <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.1rem' }}>
              Bridging Standards and Deployments
            </h1>
            <p className={styles.heroNowrap} style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Standards and open source for next-generation connected media experiences
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link className="button button--primary button--lg" to="/membership">
                Join the Efforts
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.75)' }}
                to="/about"
              >
                About Us
              </Link>
            </div>
          </div>
          <HeroFigure />
        </div>
      </header>

      <main>
        {/* Two portals */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Two ways to work with 5G-MAG</h2>
            <p className={styles.sectionSubtitle}>
              Whether you're building on our software or tracking the specifications behind it, start here.
            </p>
            <div className={styles.portalGrid}>
              {PORTALS.map((p) => <PortalCard key={p.href} {...p} />)}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the Community</h2>
            <p className={styles.sectionSubtitle}>
              5G-MAG is an open industry association. Contributions to documentation and standards work are welcome.
            </p>
            <div className={styles.communityLinks}>
              <a className="button button--primary button--lg" href="https://github.com/5G-MAG" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="button button--outline button--primary button--lg" href="https://join.slack.com/t/5g-mag/shared_invite/zt-trtvsmw5-yYgcRidDgIS7x_u48sTuQA" target="_blank" rel="noreferrer">
                Slack
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
