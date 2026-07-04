import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    {paths}
  </svg>
);

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

// Same floating + cursor-repel icon cloud as the homepage hero, compacted
// into a tighter cluster: 3 large anchor tiles for this page's own
// content (the two STANDARDS_ACTIVITIES plus a document icon for
// Technical Docs), each a distinct non-blue color reused from the
// numbered step-by-step process diagrams already used repeatedly across
// several /tech/network-apis pages (steps 0/1/2: pre-conditions,
// before-use, during-operation), plus 7 more randomly drawn from the
// remaining CATEGORIES topics (no repeats) in TONE_A to fill out the
// cloud without competing with the anchors.
const TONE_A = '#00A0D2';
const ANCHOR_FEEDBACK = '#7c52e4';
const ANCHOR_LIAISON = '#f38d3c';
const ANCHOR_DOCS = '#74b85c';
const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 46;

const HERO_TILES = [
  { cx: 286, cy: 158, size: 130, rot: -0.4, color: ANCHOR_FEEDBACK, d: 'M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1' }, // Feedback & Requirements
  { cx: 740, cy: 394, size: 128, rot: 6.6,  color: ANCHOR_LIAISON, d: 'M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M13 17.5v4.5l2 -1.5l2 1.5v-4.5 M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v3.5' }, // Liaison Statements & Inputs
  { cx: 614, cy: 205, size: 130, rot: -6.5, color: ANCHOR_DOCS, d: 'M14 3v4a1 1 0 0 0 1 1h4 M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2 M9 9l1 0 M9 13l6 0 M9 17l6 0' }, // Technical Docs (document icon)
  // Randomly added (no repeats)
  { cx: 812, cy: 260, size: 111, rot: 8.2,  color: TONE_A, d: 'M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4 M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z' }, // Real-Time Communications
  { cx: 304, cy: 321, size: 112, rot: -0.3, color: TONE_A, d: 'M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0 M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2 M3 7v-2a2 2 0 0 1 2 -2h2 M3 17v2a2 2 0 0 0 2 2h2 M17 3h2a2 2 0 0 1 2 2v2 M17 21h2a2 2 0 0 0 2 -2v-2' }, // XR and MPEG-I Scene Description
  { cx: 164, cy: 382, size: 98,  rot: 8.5,  color: TONE_A, d: 'M3 21l18 0 M9 8l1 0 M9 12l1 0 M9 16l1 0 M14 8l1 0 M14 12l1 0 M14 16l1 0 M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16' }, // Non-Public Networks
  { cx: 437, cy: 244, size: 94,  rot: 4.1,  color: TONE_A, d: 'M4 8v-2a2 2 0 0 1 2 -2h2 M4 16v2a2 2 0 0 0 2 2h2 M16 4h2a2 2 0 0 1 2 2v2 M16 20h2a2 2 0 0 0 2 -2v-2 M12 12.5l4 -2.5 M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5 M8 10v4.5l4 2.5' }, // Volumetric Video
  { cx: 565, cy: 364, size: 100, rot: 8.1,  color: TONE_A, d: 'M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4 M12 2v2 M9 12v9 M15 12v9 M5 16l4 -2 M15 14l4 2 M9 18h6 M10 8v.01 M14 8v.01' }, // Avatar Communication
  { cx: 754, cy: 151, size: 81,  rot: -3.7, color: TONE_A, d: 'M4 13h5 M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3 M20 8v8 M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5' }, // Network APIs
  { cx: 157, cy: 203, size: 80,  rot: 5.9,  color: TONE_A, d: 'M7 4v16l13 -8l-13 -8' }, // 5G Media Streaming
];

function HeroFigure() {
  const reducedMotion = usePrefersReducedMotion();
  const svgRef = useRef(null);
  const tileRefs = useRef([]);
  const rafRef = useRef(null);

  const repelTiles = (mouseX, mouseY) => {
    HERO_TILES.forEach((t, i) => {
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
    tileRefs.current.forEach((el) => {
      if (el) el.style.transform = 'translate(0px, 0px)';
    });
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
        <filter id="techTileShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#001a33" floodOpacity="0.35" />
        </filter>
      </defs>
      {HERO_TILES.map((t, i) => {
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
                  rx={t.size * 0.24} fill={t.color} filter="url(#techTileShadow)"
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

const CATEGORIES = [
  {
    title: 'Content Delivery at Scale',
    desc: 'For service providers, streaming platforms and network operators distributing live or on-demand media — from a single unicast stream to millions of simultaneous broadcast receivers, across any delivery mode.',
    topics: [
      {
        title: '5G Media Streaming', desc: 'Unicast on-demand and live content delivery over 5G.', href: '/tech/5gms',
        icon: icon(<path d="M7 4v16l13 -8l-13 -8" />),
      },
      {
        title: '5G Broadcast', desc: 'Over-the-air broadcast for TV, radio and emergency services.', href: '/tech/5g-broadcast',
        icon: icon(<><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.616 13.924a5 5 0 1 0 -9.23 0" /><path d="M20.307 15.469a9 9 0 1 0 -16.615 0" /><path d="M9 21l3 -9l3 9" /><path d="M10 19h4" /></>),
      },
      {
        title: 'Multicast and Broadcast Services', desc: '5G-native MBS for efficient one-to-many delivery.', href: '/tech/5g-mbs',
        icon: icon(<><path d="M12 12l0 .01" /><path d="M14.828 9.172a4 4 0 0 1 0 5.656" /><path d="M17.657 6.343a8 8 0 0 1 0 11.314" /><path d="M9.168 14.828a4 4 0 0 1 0 -5.656" /><path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></>),
      },
      {
        title: 'DVB-I over 5G', desc: 'Broadcast service discovery and hybrid delivery integration.', href: '/tech/dvb-i/dvb-i-5g',
        icon: icon(<><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" /><path d="M16 3l-4 4l-4 -4" /></>),
      },
      {
        title: 'Multimedia Content Delivery', desc: 'FLUTE and ROUTE transport for one-way delivery of DASH, HLS and CMAF content over broadcast and multicast.', href: '/tech/multimedia/multimedia-content-delivery',
        icon: icon(<><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" /><path d="M9 15l3 -3l3 3" /><path d="M12 12l0 9" /></>),
      },
      {
        title: 'Real-Time Communications', desc: 'Low-latency two-way media over 5G.', href: '/tech/rtc',
        icon: icon(<><path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4" /><path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z" /></>),
      },
      {
        title: 'Non-Terrestrial Networks', desc: 'MBS over satellite and NTN mobility analysis.', href: '/tech/ntn',
        icon: icon(<><path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z" /><path d="M6 10l-3 3l3 3l3 -3" /><path d="M10 6l3 -3l3 3l-3 3" /><path d="M14 17a3 3 0 0 0 3 -3" /><path d="M20 13a9 9 0 0 0 -9 9" /></>),
      },
    ],
  },
  {
    title: 'Immersive and Spatial Media',
    desc: 'For platforms and device vendors building next-generation viewing experiences — AR, VR, free-viewpoint video and avatar-based communication — delivered over 5G networks.',
    topics: [
      {
        title: 'XR and MPEG-I Scene Description', desc: 'AR/VR content delivery and interactive 3D scene composition.', href: '/tech/xr',
        icon: icon(<><path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" /><path d="M3 7v-2a2 2 0 0 1 2 -2h2" /><path d="M3 17v2a2 2 0 0 0 2 2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></>),
      },
      {
        title: 'Volumetric Video', desc: 'V3C point-cloud video and beyond-2D evaluation frameworks.', href: '/tech/volumetric',
        icon: icon(<><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /><path d="M12 12.5l4 -2.5" /><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" /><path d="M8 10v4.5l4 2.5" /></>),
      },
      {
        title: 'Avatar Communication with MPEG ARF', desc: 'Real-time conversational avatars over 5G using the MPEG Avatar Representation Format (ARF).', href: '/tech/avatar-communications',
        icon: icon(<><path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" /><path d="M12 2v2" /><path d="M9 12v9" /><path d="M15 12v9" /><path d="M5 16l4 -2" /><path d="M15 14l4 2" /><path d="M9 18h6" /><path d="M10 8v.01" /><path d="M14 8v.01" /></>),
      },
    ],
  },
  {
    title: 'Network Quality and Control',
    desc: 'For operators exposing QoS capabilities and developers consuming them — enabling media services to request network resources, monitor delivery quality and adapt dynamically to changing network conditions.',
    topics: [
      {
        title: 'Network APIs', desc: 'CAMARA and 3GPP APIs for QoS control and network event exposure.', href: '/tech/network-apis',
        icon: icon(<><path d="M4 13h5" /><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" /><path d="M20 8v8" /><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" /></>),
      },
      {
        title: 'UE Data Collection', desc: 'Device-side QoE feedback and analytics for delivery optimisation.', href: '/tech/data-collection/data-collection-event-exposure',
        icon: icon(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M9 17l0 -5" /><path d="M12 17l0 -1" /><path d="M15 17l0 -3" /></>),
      },
    ],
  },
  {
    title: 'Media Production and Contribution',
    desc: 'For production companies and network operators using 5G at studios, venues and remote locations where professional-grade reliability, timing accuracy and low latency are required.',
    topics: [
      {
        title: 'Non-Public Networks', desc: 'Private 5G deployments for media production venues.', href: '/tech/npn',
        icon: icon(<><path d="M3 21l18 0" /><path d="M9 8l1 0" /><path d="M9 12l1 0" /><path d="M9 16l1 0" /><path d="M14 8l1 0" /><path d="M14 12l1 0" /><path d="M14 16l1 0" /><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" /></>),
      },
      {
        title: 'Time Sensitive Communications', desc: 'Deterministic low-latency transport for professional media equipment.', href: '/tech/tsc',
        icon: icon(<><path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M12 10l0 3l2 2" /><path d="M7 4l-2.75 2" /><path d="M17 4l2.75 2" /></>),
      },
    ],
  },
  {
    title: 'Research and Innovation',
    desc: 'For engineers and researchers exploring how emerging capabilities — AI-driven delivery, satellite access and next-generation network architectures — will shape the future of media over 5G and 6G.',
    topics: [
      {
        title: '6G', desc: 'Early 6G research and technical analysis for future media technologies.', href: '/tech/6g',
        icon: icon(<><path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" /><path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" /><path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" /><path d="M6 9h12" /><path d="M3 20h7" /><path d="M14 20h7" /><path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12 15v3" /></>),
      },
    ],
  },
];

const STANDARDS_ACTIVITIES = [
  {
    title: 'Specification-to-Code',
    desc: 'Bridging normative 3GPP, ETSI and IETF specification text to working implementations — analysis, explainers and reports organised by topic area.',
    href: '/tech/intro',
    icon: icon(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M9 17l0 -5" /><path d="M12 17l0 -1" /><path d="M15 17l0 -3" /></>),
  },
  {
    title: 'Feedback & Requirements',
    desc: 'Implementation and deployment experience submitted as structured feedback and formal requirements to 3GPP, ETSI and other SDOs.',
    href: '/tech/standards/feedback',
    icon: icon(<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />),
  },
  {
    title: 'Liaison Statements & Inputs',
    desc: 'Formal liaison statements and informative documents provided to standards bodies on behalf of 5G-MAG members.',
    href: '/tech/standards/ls',
    icon: icon(<><path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" /><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v3.5" /></>),
  },
];

const PILLARS = [
  {
    title: 'Specification Analysis',
    body: 'In-depth technical analysis of 3GPP, ETSI and IETF specifications relevant to 5G media and broadcast — cutting through normative text to surface what matters for implementation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/>
      </svg>
    ),
  },
  {
    title: 'Implementation Explainers',
    body: 'Practical documentation bridging standards text and working software — written by engineers who have built and deployed the systems, not just read the specs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>
      </svg>
    ),
  },
  {
    title: 'Standards Engagement',
    body: 'Feedback to 3GPP and ETSI, formal requirements submissions and liaison statements — turning deployment experience into direct input to the specifications that matter.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"/><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v3.5"/>
      </svg>
    ),
  },
  {
    title: 'Reports & Videos',
    body: 'Slide decks, technical reports and video resources produced by 5G-MAG members — from working group presentations to deep-dive explainer videos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 4v16l13 -8l-13 -8"/>
      </svg>
    ),
  },
];

function CategoryCard({ title, desc, topics }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
        <h3 className={styles.categoryTitle}>{title}</h3>
        <p className={styles.categoryDesc}>{desc}</p>
      </div>
      <div className={styles.categoryTopicGrid}>
        {topics.map((t) => (
          <Link key={t.href} to={t.href} className={styles.categoryTopicCard}>
            {t.icon && <span className={styles.categoryTopicIcon}>{t.icon}</span>}
            <span className={styles.categoryTopicCardBody}>
              <span className={styles.categoryTopicName}>{t.title}</span>
              <span className={styles.categoryTopicDescText}>{t.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ title, desc, href, icon }) {
  return (
    <Link className={styles.activityCard} to={href}>
      <div className={styles.activityIconBand}>
        {icon}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </div>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{desc}</p>
      </div>
      <div className={styles.activityArrow}>View &rarr;</div>
    </Link>
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
            <h1 className={styles.heroNowrap} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.1rem' }}>
              Technical Docs and Standards Work
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Specification profiles, implementation guidelines and SDO contributions — by the members.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link className="button button--primary button--lg" to="/tech/intro">
                Technical Docs
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.75)' }}
                to="/tech/standards/feedback"
              >
                Standards Work
              </Link>
            </div>
          </div>
          <HeroFigure />
        </div>
      </header>

      <main>
        {/* What's here */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What you will find here</h2>
            <p className={styles.sectionSubtitle}>
              Resources produced by 5G-MAG members — covering the full cycle from reading a spec to shaping the next one.
            </p>
            <div className={styles.pillarGrid}>
              {PILLARS.map((p) => (
                <div key={p.title} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{p.icon}</div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarBody}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards Work */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Standards Work</h2>
            <p className={styles.sectionSubtitle}>
              How 5G-MAG engages with standards bodies — turning implementation experience into specification input.
            </p>
            <div className={styles.activityGrid}>
              {STANDARDS_ACTIVITIES.map((a) => <ActivityCard key={a.href} {...a} />)}
            </div>
            <div className={styles.pillarActions}>
              <Link className="button button--primary button--lg" to="/tech/standards/feedback">
                Browse Standards
              </Link>
              <a
                className="button button--outline button--primary button--lg"
                href="https://github.com/5G-MAG/Standards"
                target="_blank"
                rel="noreferrer"
              >
                GitHub Repository
              </a>
            </div>
          </div>
        </section>

        {/* Capability Areas */}
        <section id="capability-areas" className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Technical Documentation by Capability Area</h2>
            <p className={styles.sectionSubtitle}>
              Specification analysis, implementation explainers and reports — organised by technology area.
            </p>
            <div className={styles.categoryColumns}>
              {CATEGORIES.map((c) => <CategoryCard key={c.title} {...c} />)}
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
