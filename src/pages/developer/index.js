import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import releasesData from '@site/static/data/releases.json';
import youtubeData from '@site/static/data/youtube.json';

const PROJECT_TYPE_MAP = {
  '5G Media Streaming':        'Reference Tools',
  '5G Broadcast TV Radio':     'Reference Tools',
  'XR Media':                  'Reference Tools',
  '5G Multicast Broadcast':    'Reference Tools',
  'UE Data Collection':        'Reference Tools',
  'V3C Immersive':             'Reference Tools',
  'Multimedia Protocols':      'Reference Tools',
  'DVB-I over 5G':             'Reference Tools',
  'Emergency Alerts':          'Reference Tools',
  '5G Core Service Consumers': 'Reference Tools',
  'Conversational Avatar':     'Reference Tools',
  'Beyond 2D':                 'Reference Tools',
  'Network APIs':              'Reference Tools',
  '6G Testbed':                'Testbed',
  'AI ML':                     'Testbed',
};

const PRODUCT_TYPES = [
  {
    icon: 'Reference Tools',
    label: 'Reference Tools',
    description:
      'Reference implementations of specifications for rapid prototyping, validation and verification. The foundation of everything we build.',
    href: '/developer/projects',
  },
  {
    icon: 'Testbeds',
    label: 'Testbeds & Evaluation Tools',
    description:
      'Research platforms for testing, data collection and performance evaluation of emerging technologies.',
    href: '/developer/testbeds',
  },
  {
    icon: 'Applications',
    label: 'Application Prototypes',
    description:
      'MVPs and demonstrations that run complete systems built on Reference Tools, enabling real applications and services.',
    href: '/developer/applications',
  },
];

const CATEGORIES = [
  {
    title: 'Streaming, Media Delivery & Data Collection',
    desc: 'End-to-end 5G media streaming from network to client, including data collection and reporting.',
    topics: [
      { title: '5G Media Streaming',        desc: 'Streaming AF/AS — 3GPP TS 26.5xx',      href: '/developer/5gms',                     icon: <ProjectIcon name="5G Media Streaming" /> },
      { title: 'UE Data Collection',         desc: 'Reporting and event exposure',            href: '/developer/data-collection',  icon: <ProjectIcon name="UE Data Collection" /> },
      { title: 'Multimedia Content Delivery',desc: 'Multi-CDN and protocol tooling',          href: '/developer/multimedia',            icon: <ProjectIcon name="Multimedia Protocols" /> },
      { title: 'DVB-I over 5G',             desc: 'DVB-I service delivery over 5G',           href: '/developer/dvb-i',                           icon: <ProjectIcon name="DVB-I over 5G" /> },
    ],
  },
  {
    title: '5G Broadcast for TV, Radio & Emergency Alerts',
    desc: 'LTE-based 5G broadcast for TV and radio services, plus standardised emergency alert delivery.',
    topics: [
      { title: '5G Broadcast',              desc: 'LTE-based TV & radio broadcast',           href: '/developer/5g-broadcast',                 icon: <ProjectIcon name="5G Broadcast TV Radio" /> },
      { title: 'Emergency Alerts',          desc: 'Broadcast-based public warning system',    href: '/developer/emergency-alerts',                       icon: <ProjectIcon name="5G Broadcast Emergency Alerts" /> },
    ],
  },
  {
    title: 'Multicast & Broadcast Services in 5G',
    desc: 'Full 5G-native multicast and broadcast services, including 5G MBS and related network functions.',
    topics: [
      { title: '5G Multicast Broadcast',    desc: '5G MBS architecture and tooling',          href: '/developer/5g-mbs',         icon: <ProjectIcon name="5G Multicast Broadcast" /> },
      { title: '5G Core Service Consumers', desc: '5GC consumer reference tools',             href: '/developer/5g-core',              icon: <ProjectIcon name="5G Core Service Consumers" /> },
    ],
  },
  {
    title: 'XR and MPEG-I Scene Description',
    desc: 'MPEG-I scene description and avatar communications for immersive 5G experiences.',
    topics: [
      { title: 'XR Media Integration',      desc: 'XR and scene description over 5G',        href: '/developer/xr',             icon: <ProjectIcon name="XR Media" /> },
      { title: 'Avatar Communications',     desc: 'MPEG ARF avatar communication',            href: '/developer/avatar',                  icon: <ProjectIcon name="Conversational Avatar" /> },
    ],
  },
  {
    title: 'Volumetric Video & Beyond 2D',
    desc: 'V3C immersive platform and beyond-2D video evaluation frameworks.',
    topics: [
      { title: 'V3C Immersive Platform',    desc: 'Volumetric 3D content platform',           href: '/developer/v3c',                 icon: <ProjectIcon name="V3C Immersive" /> },
      { title: 'Beyond-2D Evaluation',      desc: 'Video quality evaluation tools',           href: '/developer/beyond-2d',         icon: <ProjectIcon name="Beyond 2D" /> },
    ],
  },
  {
    title: 'Network APIs & Advanced Services',
    desc: 'CAMARA-compliant network API integration and next-generation testbeds.',
    topics: [
      { title: 'Network APIs',              desc: 'CAMARA QoS and device-aware apps',         href: '/developer/network-apis',                           icon: <ProjectIcon name="Network APIs" /> },
      { title: '6G Testbed & AI Traffic',   desc: 'Next-gen network testbed',                 href: '/developer/6g-testbed',                  icon: <ProjectIcon name="6G Testbed" /> },
      { title: 'AI/ML Evaluation',          desc: 'AI/ML framework for media',                href: '/developer/ai-ml',             icon: <ProjectIcon name="AI ML" /> },
    ],
  },
];

const PILLARS = [
  {
    title: 'Early Validation',
    body: 'Implementation evidence that informs specification development before standards are finalised.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Collaborative Development',
    body: 'Eliminating redundant effort when multiple organisations address the same technical challenges.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Accelerated Deployment',
    body: 'Proven reference implementations designed for real-world adoption and scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
  },
  {
    title: 'Open by Design',
    body: 'IPR-friendly licensing designed for broad industry participation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
      </svg>
    ),
  },
];

const SLIDE_ICONS = {
  '5G Media Streaming':            '<path d="M7 4v16l13 -8l-13 -8"/>',
  '5G Broadcast TV Radio':         '<path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/>',
  'XR Media':                      '<path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"/><path d="M3 7v-2a2 2 0 0 1 2 -2h2"/><path d="M3 17v2a2 2 0 0 0 2 2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 21h2a2 2 0 0 0 2 -2v-2"/>',
  '5G Multicast Broadcast':        '<path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/>',
  'UE Data Collection':            '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/>',
  'V3C Immersive':                 '<path d="M4 8v-2a2 2 0 0 1 2 -2h2"/><path d="M4 16v2a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M16 20h2a2 2 0 0 0 2 -2v-2"/><path d="M12 12.5l4 -2.5"/><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5"/><path d="M8 10v4.5l4 2.5"/>',
  'Beyond 2D':                     '<path d="M4.338 5.53c5.106 1.932 10.211 1.932 15.317 0a1 1 0 0 1 1.345 .934v11c0 .692 -.692 1.2 -1.34 .962c-5.107 -1.932 -10.214 -1.932 -15.321 0c-.648 .246 -1.339 -.242 -1.339 -.935v-11.027a1 1 0 0 1 1.338 -.935l0 .001"/>',
  'AI ML':                         '<path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/>',
  'Multimedia Protocols':          '<path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12l0 9"/>',
  'Conversational Avatar':         '<path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4"/><path d="M12 2v2"/><path d="M9 12v9"/><path d="M15 12v9"/><path d="M5 16l4 -2"/><path d="M15 14l4 2"/><path d="M9 18h6"/><path d="M10 8v.01"/><path d="M14 8v.01"/>',
  '6G Testbed':                    '<path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0"/><path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6"/><path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6"/><path d="M6 9h12"/><path d="M3 20h7"/><path d="M14 20h7"/><path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M12 15v3"/>',
  'DVB-I over 5G':                 '<path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/>',
  'Network APIs':                  '<path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/>',
  '5G Broadcast Emergency Alerts': '<path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2"/><path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1"/><path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1"/>',
  '5G Core Service Consumers':     '<path d="M6.657 16c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"/><path d="M12 16v5"/><path d="M16 16v4a1 1 0 0 0 1 1h4"/><path d="M8 16v4a1 1 0 0 1 -1 1h-4"/>',
  'Auxiliary Tools':               '<path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5"/>',
  'Reference Tools':               '<path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>',
  'Testbeds':                      '<path d="M9 3l6 0"/><path d="M10 9l4 0"/><path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6"/>',
  'Applications':                  '<path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z"/><path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z"/><path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0"/><path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5"/>',
};

function ProjectIcon({ name, className }) {
  const paths = SLIDE_ICONS[name];
  if (!paths) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

function SlideIcon({ name }) {
  return <ProjectIcon name={name} className={styles.slideProjectIcon} />;
}

function isRC(release) {
  if (!release) return false;
  if (release.prerelease) return true;
  return release.tag && /-rc(\.|[0-9]|$)/i.test(release.tag);
}

function daysSince(dateStr) {
  if (!dateStr || dateStr === '-') return 9999;
  return Math.max(0, Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000));
}

function formatAge(days) {
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 7)  return `${days}d ago`;
  if (days < 14) return '1w ago';
  return `${Math.round(days / 7)}w ago`;
}

const BRAND_SLIDE = { type: 'brand' };

function HeroSlideshow() {
  const releaseSlides = releasesData.projects.slice(0, 3).map((p) => ({ type: 'release', ...p }));
  const slides = [BRAND_SLIDE, ...releaseSlides];
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
      {slides.map((s, i) => (
        <div
          key={i}
          className={clsx(styles.slide, i === active && styles.slideActive)}
          style={{ backgroundImage: slideBg() }}
        />
      ))}

      <div key={active} className={styles.slideContentWrapper}>
      {slide.type === 'brand' ? (
        <div className={styles.slideOverlay}>
          <div className="container">
            <p className={styles.slideEyebrow}>Reference Tools. Testbeds. Applications.</p>
            <h1 className={styles.slideTitle}>Media Connectivity Software Accelerator</h1>
            <p className={styles.slideSubtitle}>
              Open-Source Developer Community
            </p>
            <div className={styles.slideButtons}>
              <Link className="button button--primary button--lg" to="/developer/community">
                Join the Community
              </Link>
              <Link
                className={clsx('button button--outline button--lg', styles.slideBtnOutline)}
                to="/developer/projects"
              >
                Explore All Projects
              </Link>
              <a
                className={clsx('button button--outline button--lg', styles.slideBtnOutline)}
                href="/docs/Reference_Tools_Overview.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Overview ↓
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.slideOverlayCards}>
          <div className="container">
            <div className={styles.slideCard}>
              <div className={styles.slideCardHeader}>
                <p className={styles.slideEyebrow}>
                  <span className={clsx(styles.slideEyebrowDot, isRC(slide.releases[0]) && styles.slideEyebrowDotRc)} />
                  {isRC(slide.releases[0]) ? 'Release Candidate' : 'New Release'}
                  {PROJECT_TYPE_MAP[slide.name] && (
                    <span className={clsx(
                      styles.slideEyebrowBadge,
                      PROJECT_TYPE_MAP[slide.name] === 'Testbed' && styles.slideEyebrowBadgeTestbed,
                      PROJECT_TYPE_MAP[slide.name] === 'Application Prototypes' && styles.slideEyebrowBadgeApp,
                    )}>{PROJECT_TYPE_MAP[slide.name]}</span>
                  )}
                </p>
                <div className={styles.slideCardHeaderMain}>
                  <ProjectIcon name={slide.name} className={styles.slideCardHeaderIcon} />
                  <div>
                    <h1 className={styles.slideCardTitle}>New Releases for {slide.name}</h1>
                    {slide.tagline && <p className={styles.slideCardTagline}>{slide.tagline}</p>}
                  </div>
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
                          <a href={r.url} className={styles.slideReleaseLink} target="_blank" rel="noreferrer">
                            {r.repo}
                          </a>
                          <div className={styles.slideReleaseMeta}>
                            <span className={clsx(styles.slideTag, isRC(r) && styles.slideTagRc)}>{r.tag}</span>
                            <span className={styles.slideAge}>{formatAge(daysSince(r.date))}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className={styles.slideCardContributorsCol}>
                  <p className={styles.slideContributorsLabel}>Congratulations to the contributors</p>
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
              <div className={styles.slideCardFooter}>
                <Link
                  className="button button--primary button--lg"
                  to={slide.doc_url}
                >
                  Documentation
                </Link>
                <Link
                  className={clsx('button button--outline button--lg', styles.slideBtnOutline)}
                  to={`${slide.doc_url}releases`}
                >
                  Releases
                </Link>
              </div>
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
            aria-label={s.type === 'brand' ? 'Overview' : s.name}
          >
            {i === active && (
              <span className={styles.slideDotLabel}>
                {s.type === 'brand' ? 'Overview' : s.name}
              </span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}

function ReleaseCard({ project }) {
  const rows = project.releases
    .filter((r) => r.tag !== 'No Release' && r.date !== '-')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <div className={styles.releaseCard}>
      <div className={styles.releaseCardHeader}>
        <ProjectIcon name={project.name} className={styles.releaseCardIcon} />
        <h3 className={styles.releaseCardTitle}>{project.name}</h3>
      </div>
      <div className={styles.releaseCardBody}>
        {rows.map((r) => {
          const days = daysSince(r.date);
          return (
            <div key={r.repo} className={styles.releaseRow}>
              <a
                href={`https://github.com/5G-MAG/${r.repo}`}
                className={styles.releaseRepo}
                target="_blank"
                rel="noreferrer"
                title={r.repo}
              >
                {r.repo}
              </a>
              <div className={styles.releaseMeta}>
                {days <= 30 && <span className={styles.badgeNew}>New</span>}
                <a href={r.url} className={styles.releaseTag} target="_blank" rel="noreferrer">
                  {r.tag}
                </a>
                <span className={styles.releaseDate}>{formatAge(days)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.releaseCardFooter}>
        <Link className={styles.releaseDocLink} to={project.doc_url}>
          Documentation &rarr;
        </Link>
        <Link className={styles.releaseRelLink} to={`${project.doc_url}releases`}>
          Releases &rarr;
        </Link>
      </div>
    </div>
  );
}

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

function ProductTypeCard({ icon, label, description, href }) {
  return (
    <Link className={styles.productCard} to={href}>
      <div className={styles.productCardIconBand}>
        <ProjectIcon name={icon} className={styles.productCardBandIcon} />
        <h3 className={styles.productCardBandTitle}>{label}</h3>
      </div>
      <div className={styles.productCardBody}>
        <p className={styles.productCardDesc}>{description}</p>
      </div>
      <div className={styles.productCardFooter}>
        Explore {label} &rarr;
      </div>
    </Link>
  );
}

function VideoCard({ video }) {
  return (
    <a
      className={styles.videoCard}
      href={video.url}
      target="_blank"
      rel="noreferrer"
      title={video.title}
    >
      <div className={styles.videoThumb}>
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        <div className={styles.videoPlay}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <div className={styles.videoInfo}>
        <p className={styles.videoTitle}>{video.title}</p>
        <span className={styles.videoDate}>{video.published}</span>
      </div>
    </a>
  );
}

function VideoSection() {
  const { videos, channel } = youtubeData;
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.videoHeader}>
          <div>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '0.2rem' }}>
              See it in action
            </h2>
            <p className={styles.sectionSubtitle} style={{ textAlign: 'left', margin: 0 }}>
              Latest videos from the 5G-MAG YouTube channel
            </p>
          </div>
          <a
            className={styles.videoViewAll}
            href={channel}
            target="_blank"
            rel="noreferrer"
          >
            See all videos &rarr;
          </a>
        </div>
        <div className={styles.videoGrid}>
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ title, body, icon }) {
  return (
    <div className={styles.pillarCard}>
      {icon && <div className={styles.pillarIcon}>{icon}</div>}
      <h3 className={styles.pillarTitle}>{title}</h3>
      <p className={styles.pillarBody}>{body}</p>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Open-source reference implementations — from specifications to working code"
    >
      <HeroSlideshow />

      <main>
        {/* Product Types */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open-source today, live in products tomorrow</h2>
            <p className={styles.sectionSubtitle}>
              The Media Connectivity Software Accelerator brings together open-source reference tools, end-to-end application scenarios, and testbeds under a single developer community.
            </p>
            <div className={styles.productGrid}>
              {PRODUCT_TYPES.map((item) => (
                <ProductTypeCard key={item.href} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why the Media Connectivity Software Accelerator?</h2>
            <p className={styles.sectionSubtitle}>
              Media and network technologies move fast. As applications and smart networks converge, the central question becomes whether what we are building today is ready for deployment.
            </p>
            <div className={styles.pillarGrid}>
              {PILLARS.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
            <div className={styles.pillarActions}>
              <Link className="button button--primary button--lg" to="/developer/community">
                Developer Community
              </Link>
              <Link className="button button--outline button--primary button--lg" to="/developer/dashboard">
                Activity Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Videos */}
        <VideoSection />

        {/* Use Cases */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What do you want to build?</h2>
            <p className={styles.sectionSubtitle}>
              Select a capability area to find the right reference tools and documentation.
            </p>
            <div className={styles.categoryColumns}>
              {CATEGORIES.map((c) => (
                <CategoryCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Releases */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2 className={styles.sectionTitle} style={{ marginBottom: '0.2rem', textAlign: 'left' }}>
                  Latest Releases
                </h2>
                <p className={styles.releasesUpdated}>Updated: {releasesData.updated_at}</p>
              </div>
              <Link className={styles.releasesViewAll} to="/developer/releases">
                View all releases &rarr;
              </Link>
            </div>
            <div className={styles.releasesGrid}>
              {releasesData.projects.slice(0, 6).map((project) => (
                <ReleaseCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the Community</h2>
            <p className={styles.sectionSubtitle}>
              Open to any organisation or independent developer willing to collaborate.
            </p>
            <div className={styles.communityLinks}>
              <a
                className="button button--primary button--lg"
                href="https://github.com/5G-MAG"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="button button--outline button--primary button--lg"
                href="https://join.slack.com/t/5g-mag/shared_invite/zt-trtvsmw5-yYgcRidDgIS7x_u48sTuQA"
                target="_blank"
                rel="noreferrer"
              >
                Slack
              </a>
              <a
                className="button button--outline button--primary button--lg"
                href="https://groups.google.com/g/5g-mag-reference-tools"
                target="_blank"
                rel="noreferrer"
              >
                Google Group
              </a>
              <Link
                className="button button--outline button--primary button--lg"
                to="/developer/public-call"
              >
                Monthly Public Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
