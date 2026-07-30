import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HeroFigure from '@site/src/components/HeroFigure';
import ProjectIcon from '@site/src/components/ProjectIcon';
import releasesData from '@site/static/data/releases.json';
import newsData from '@site/static/data/news.json';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { isRC, daysSince, formatAge, sortByLatestRelease } from '@site/src/utils/releases';
import styles from './styles.module.css';

// Lead time before an event's own date that it starts appearing as a
// homepage slide -- flagship trade shows (MWC/IBC/FMT, see `flagship` in
// eventsAgenda.js) get a longer runway than one-off webinars/workshops/calls,
// since they're bigger and worth advertising further ahead.
const FLAGSHIP_LEAD_DAYS = 45;
const NORMAL_LEAD_DAYS = 14;

function daysUntil(dateStr) {
  const ms = new Date(`${dateStr}T00:00:00Z`).getTime() - Date.now();
  return Math.ceil(ms / 86400000);
}

function slideLabel(s) {
  if (s.type === 'home') return 'Home';
  if (s.type === 'news' || s.type === 'event') return s.title;
  return s.name;
}

function formatEventDate(dateStr, endDateStr) {
  const opts = { day: 'numeric', month: 'short', year: 'numeric' };
  const start = new Date(`${dateStr}T00:00:00Z`).toLocaleDateString('en-GB', opts);
  if (!endDateStr) return start;
  const end = new Date(`${endDateStr}T00:00:00Z`).toLocaleDateString('en-GB', opts);
  return `${start} – ${end}`;
}

// Auto-advancing hero: the homepage slide plus one slide per each of the
// 3 most recent projects with a release, showing that project's latest
// releases and contributors.
const TONE_A = '#00A0D2';

// Homepage's own icon cloud — a curated 14-icon selection,
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
  }, // 5G Broadcast - TV and Radio Services
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
  }, // DVB-I Services over 5G Systems
  {
    cx: 391,
    cy: 280,
    size: 76,
    rot: 7.7,
    color: TONE_A,
    d: 'M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2 M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1 M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1',
  }, // 5G Broadcast - Emergency Alerts
];

const PROJECT_TYPE_MAP = {
  '5G Media Streaming (5GMS)': 'Reference Tools',
  '5G Broadcast - TV and Radio Services': 'Reference Tools',
  'XR/3D Scenes with MPEG-I Scene Description': 'Reference Tools',
  '5G Multicast Broadcast Services (MBS)': 'Reference Tools',
  'UE Data Collection, Reporting and Event Exposure': 'Reference Tools',
  'MPEG V3C Immersive Platform': 'Reference Tools',
  'Multimedia Delivery Protocols': 'Reference Tools',
  'DVB-I Services over 5G Systems': 'Reference Tools',
  '5G Broadcast - Emergency Alerts': 'Reference Tools',
  '5G Core Service Consumers': 'Reference Tools',
  'Conversational Avatar Communication with MPEG ARF': 'Reference Tools',
  'Beyond 2D Evaluation Framework': 'Testbed',
  'CAMARA Connectivity Quality Management APIs': 'Reference Tools',
  'AI Traffic Characterization': 'Testbed',
  'AI/ML Evaluation Framework': 'Testbed',
};

const HOME_SLIDE = { type: 'home' };

export default function HeroSlideshow() {
  const logoUrl = useBaseUrl('/img/5g-mag-logo-white.png');
  const releaseSlides = sortByLatestRelease(releasesData.projects)
    .slice(0, 3)
    .map((p) => ({ type: 'release', ...p, sortDate: p.latest_date }));
  // news.json is already sorted newest-first by scripts/build-news-data.js.
  const newsSlides = (newsData.posts || [])
    .slice(0, 3)
    .map((p) => ({ type: 'news', ...p, sortDate: p.date }));
  // An event enters rotation once it's within its lead time (45 days for
  // flagship trade shows, 14 for everything else) and drops out once it's
  // past -- sortDate is the event's own date so it interleaves with
  // releases/news by recency the same way they interleave with each other.
  const eventSlides = EVENTS_AGENDA.filter((e) => {
    const lead = e.flagship ? FLAGSHIP_LEAD_DAYS : NORMAL_LEAD_DAYS;
    const until = daysUntil(e.date);
    return until >= 0 && until <= lead;
  }).map((e) => ({ ...e, eventType: e.type, type: 'event', sortDate: e.date }));
  // Releases, news and events are each picked/filtered independently above,
  // then interleaved by date here -- so whichever is most recent (or, for
  // events, soonest) rotates in first regardless of type.
  const contentSlides = [...releaseSlides, ...newsSlides, ...eventSlides].sort((a, b) =>
    (b.sortDate || '').localeCompare(a.sortDate || '')
  );
  const slides = [HOME_SLIDE, ...contentSlides];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const slide = slides[active];
  // Only 'news' slides carry an image, but useBaseUrl is a hook and must run
  // unconditionally on every render -- harmless no-op (resolves to
  // undefined) when slide.image is absent, e.g. every non-news slide and
  // any news post without a cover image.
  const slideImageUrl = useBaseUrl(slide.image);

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
                  src={logoUrl}
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
                    className="button button--primary"
                    to="/membership#request-membership"
                  >
                    Become a Member
                  </Link>
                  <Link
                    className={clsx(
                      'button button--outline button--primary',
                      styles.slideBtnOutline
                    )}
                    to="/about"
                  >
                    About Us
                  </Link>
                  <Link
                    className={clsx(
                      'button button--outline button--primary',
                      styles.slideBtnOutline
                    )}
                    to="/subscribe"
                  >
                    Subscribe to Updates
                  </Link>
                </div>
              </div>
              <HeroFigure tiles={HOME_TILES} />
            </div>
          </div>
        ) : slide.type === 'news' ? (
          <div className={styles.slideOverlayCards}>
            <div className="container">
              <div className={styles.slideMediaRow}>
                {slide.image && (
                  <div className={styles.slideImageCard}>
                    <img src={slideImageUrl} alt="" />
                  </div>
                )}
                <div className={clsx(styles.slideCard, slide.image && styles.slideCardInRow)}>
                  <div className={styles.slideCardHeader}>
                    <p className={styles.slideEyebrow}>
                      <span className={styles.slideEyebrowPill}>
                        <span className={styles.slideEyebrowPillDot} />
                        News
                      </span>
                      {slide.tags && slide.tags[0] && (
                        <span className={styles.slideEyebrowGroupPill}>{slide.tags[0]}</span>
                      )}
                    </p>
                    <h2
                      className={styles.slideCardTitle}
                      style={{ whiteSpace: 'normal', fontSize: '1.6rem', lineHeight: 1.3 }}
                    >
                      {slide.title}
                    </h2>
                  </div>
                  <div className={styles.slideCardBody} style={{ display: 'block' }}>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {slide.excerpt}
                    </p>
                  </div>
                  <div className={styles.slideCardFooter}>
                    <Link className="button button--primary" to={`/news/${slide.slug}`}>
                      Read More
                    </Link>
                    <span className={styles.slideAge}>{formatAge(daysSince(slide.date))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : slide.type === 'event' ? (
          <div className={styles.slideOverlayCards}>
            <div className="container">
              <div className={styles.slideMediaRow}>
                <div className={styles.slideCard}>
                  <div className={styles.slideCardHeader}>
                    <p className={styles.slideEyebrow}>
                      <span className={styles.slideEyebrowPill}>
                        <span className={styles.slideEyebrowPillDot} />
                        {slide.flagship ? 'Flagship Event' : 'Upcoming Event'}
                      </span>
                      <span className={styles.slideEyebrowGroupPill}>{slide.eventType}</span>
                    </p>
                    <h2
                      className={styles.slideCardTitle}
                      style={{ whiteSpace: 'normal', fontSize: '1.6rem', lineHeight: 1.3 }}
                    >
                      {slide.title}
                    </h2>
                  </div>
                  <div className={styles.slideCardBody} style={{ display: 'block' }}>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                      {formatEventDate(slide.date, slide.endDate)} &middot; {slide.location}
                    </p>
                  </div>
                  <div className={styles.slideCardFooter}>
                    <Link className="button button--primary" to={slide.href}>
                      Learn More
                    </Link>
                    <span className={styles.slideAge}>in {daysUntil(slide.date)}d</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.slideOverlayCards}>
            <div className="container">
              <div className={styles.slideMediaRow}>
                {slide.image && (
                  <div className={styles.slideImageCard}>
                    <img src={slideImageUrl} alt="" />
                  </div>
                )}
                <div className={clsx(styles.slideCard, slide.image && styles.slideCardInRow)}>
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
                    <div className={styles.slideCardReleasesColFull}>
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
                  </div>
                  {slide.doc_url && (
                    <div className={styles.slideCardFooter}>
                      <Link className="button button--primary" to={slide.doc_url}>
                        Documentation
                      </Link>
                      <Link
                        className={clsx(
                          'button button--outline button--primary',
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
          </div>
        )}
      </div>

      <div className={styles.slideDots}>
        {slides.map((s, i) => (
          <button
            key={i}
            className={clsx(styles.slideDot, i === active && styles.slideDotActive)}
            onClick={() => setActive(i)}
            aria-label={slideLabel(s)}
          >
            {i === active && (
              <span className={styles.slideDotLabel}>{slideLabel(s)}</span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
