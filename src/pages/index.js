import SiteStats from '@site/src/components/SiteStats';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import NextUp from '@site/src/components/NextUp';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import { HOME_WORK } from '@site/src/data/discoverWork';
import MembersMarquee from '@site/src/components/MembersMarquee';
import SearchBar from '@theme/SearchBar';
import { icon } from '@site/src/components/GodeeperCard';
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import BasketJumpRow from '@site/src/components/BasketJumpRow';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { EventsAgendaPreview } from '@site/src/components/EventsAgenda';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { ALL_PROJECTS as projectsData, BASKET_PAGE } from '@site/src/data/baskets';
import ShowcaseDiagram from '@site/src/components/ShowcaseDiagram';
import { sampleRandom } from '@site/src/utils/random';
import { sortByLatestRelease } from '@site/src/utils/releases';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import releasesData from '@site/static/data/releases.json';
import newsData from '@site/static/data/news.json';

const LATEST_RELEASE_PROJECTS = sortByLatestRelease(releasesData.projects);
// Built from blog/ on every dev and build run (scripts/build-news-data.js), so a new post appears
// here without editing this page. Posts without a cover image are skipped: the cards are image cards.
const LATEST_NEWS = [...newsData.posts]
  .filter((post) => post.image)
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 3)
  .map((post) => ({ title: post.title, image: post.image, href: `/news/${post.slug}` }));

const VIDEO_COUNT = 5;

// A handful of the most recent Developer Exchange sessions -- shown until
// the client-side effect below swaps in a random sample, and also the
// server-rendered/first-paint set (so hydration has something stable to
// match before Math.random() is allowed to run).
const INITIAL_VIDEOS = (youtubePlaylists.developer?.videos || []).slice(0, VIDEO_COUNT);

// Every video across the entire 5G-MAG YouTube channel -- the 5 named
// category playlists plus every per-project playlist -- deduped by video
// id (some videos are cross-listed in more than one playlist).
const ALL_CHANNEL_VIDEOS = (() => {
  const categories = ['workshops', 'developer', 'publicCall', 'demos', 'technologyExchange'];
  const byId = new Map();
  for (const key of categories) {
    for (const v of youtubePlaylists[key]?.videos || []) byId.set(v.id, v);
  }
  for (const project of Object.values(youtubePlaylists.projects || {})) {
    for (const v of project.videos || []) byId.set(v.id, v);
  }
  return [...byId.values()];
})();

// Real photos of the technologies named just above (in DOMAIN_PILLARS and
// DISCOVER_WORK) actually running -- not stock imagery, same convention
// About's "Examples of Our Work" gallery already uses.
const USE_CASE_PHOTOS = [
  {
    type: 'photo',
    src: '/assets/images/gallery/reference-tools-demo-rig.jpg',
    alt: '5G Media Streaming, live on real devices — 5G-MAG Reference Tools demo rig with SDR hardware and phones',
  },
  {
    type: 'photo',
    src: '/assets/images/5gbc/reference-tools-broadcast-demo.jpg',
    alt: '5G Broadcast reaching TV and radio receivers, the 5G-MAGflix app running next to a broadcast receiver',
  },
  {
    type: 'photo',
    src: '/assets/images/xr/volumetric-capture-demo.jpg',
    alt: 'Immersive & Volumetric Media, captured and viewed in AR on a phone',
  },
  {
    type: 'photo',
    src: '/assets/images/emergency-alerts/emergency-alert.jpg',
    alt: '5G Broadcast Emergency Alerts delivered straight to a handset from an SDR transmitter',
  },
  {
    type: 'photo',
    src: '/assets/images/gallery/camara-dedicated-networks-demo.png',
    alt: 'Network APIs — the CAMARA Dedicated Networks reference tool reserving connectivity on demand',
  },
  {
    type: 'photo',
    src: '/assets/images/gallery/5g-broadcast-plugfest-2026.jpg',
    alt: 'Validated at PlugFests — interop testing across vendors at the 5G Broadcast PlugFest 2026',
  },
];

// One real cover-slide card per project (taxonomy.json) -- the exact
// design already used for release/community cards site-wide (navy/cyan
// gradient, category pill, project title, icon, 5G-MAG logo), not
// hand-built here. "Dependency" is excluded: it has no image or doc_url
// (external forks/dependencies 5G-MAG maintains, not a first-class
// reference-tool project with its own page -- see its own tagline).
const PROJECT_CARDS = projectsData
  .filter((p) => p.image && p.doc_url)
  .map((p) => ({ type: 'project', src: p.image, alt: p.name, href: p.doc_url }));

// The hero animations of the solution pages, each opening its page. They are only mounted while they show (and
// while they fade out): an animated diagram that is hidden still runs, and seven of them in three slots would be
// twenty-one at once.
const ANIMATION_SLIDES = [
  { name: 'hero', basket: 'content-delivery', alt: 'Animation: media flowing from a service through the network to viewers, with what they experience flowing back' },
  { name: 'rtc', basket: 'rtc', alt: 'Animation: two callers talking live through a 5G network' },
  { name: 'bcast', basket: 'broadcast-multicast', alt: 'Animation: one transmission reaching many receivers, with unicast where needed' },
  { name: 'ntn', basket: 'ntn', alt: 'Animation: satellites passing overhead and connecting a remote area' },
  { name: 'imm', basket: 'immersive-media', alt: 'Animation: a 3D scene streamed to a person in a headset, with their movement flowing back' },
  { name: 'prod', basket: 'connected-media-production', alt: 'Animation: live cameras sending video over a 5G uplink to a production hub' },
  { name: 'sixg', basket: 'towards-6g', alt: 'Animation: media services reaching existing and new services over a 6G system' },
].map((a) => ({ type: 'animation', name: a.name, alt: a.alt, href: BASKET_PAGE[a.basket] }));

const SHOWCASE_SLIDES = [...USE_CASE_PHOTOS, ...ANIMATION_SLIDES, ...PROJECT_CARDS];

// How often each kind of slide is chosen when a slot moves on: the animations are the new thing, so they come up
// more often than their share of the pool.
const KIND_WEIGHT = { animation: 0.4, photo: 0.3, project: 0.3 };

// Seconds a slot stays on a slide before it moves on. Animations stay long enough to be watched.
const DWELL = { still: 7000, animation: 13000 };

function pickKind() {
  const r = Math.random();
  let acc = 0;
  for (const [kind, w] of Object.entries(KIND_WEIGHT)) {
    acc += w;
    if (r < acc) return kind;
  }
  return 'photo';
}

// A 3-slot row where each slot independently cycles through SHOWCASE_SLIDES
// (real demo photos and real per-project cover cards alike) and crossfades
// to the next -- every slide in the pool eventually shows in every slot,
// so the full set surfaces over time without needing every tile on screen
// at once. Every slide is rendered into every slot (stacked,
// opacity-toggled) rather than swapping content, so the crossfade is a
// pure CSS opacity transition with no flash of a half-loaded image; the
// browser dedupes the repeated <img> requests against the same URL either
// way. Client-only rotation: SSR/first paint shows a fixed slot 0/1/2
// assignment so hydration has something stable to match, and setInterval
// only starts after mount.
function FadingSlideRow({ slides }) {
  // One demo photo and one project card from the start (rather than
  // slides[0,1,2], which is always 3 photos since USE_CASE_PHOTOS is
  // listed first in SHOWCASE_SLIDES) -- otherwise a project card never
  // shows until the first swap fires several seconds in (raised in
  // review: banners weren't visibly appearing at all).
  const firstPhotoIdx = slides.findIndex((s) => s.type === 'photo');
  const firstAnimationIdx = slides.findIndex((s) => s.type === 'animation');
  const firstProjectIdx = slides.findIndex((s) => s.type === 'project');
  const initial = [firstPhotoIdx, firstAnimationIdx, firstProjectIdx].map((i) => (i === -1 ? 0 : i));
  const [active, setActive] = useState(initial);
  // The slide that has just left each slot, kept mounted until its fade-out has finished.
  const [leaving, setLeaving] = useState([null, null, null]);
  const activeRef = useRef(initial);

  useEffect(() => {
    if (slides.length <= 3) return undefined;
    const timers = new Set();
    let stopped = false;
    const later = (fn, ms) => {
      const id = setTimeout(() => {
        timers.delete(id);
        if (!stopped) fn();
      }, ms);
      timers.add(id);
    };
    // How long a slot stays on what it shows: long enough to take in a photo, and for an animation to run through
    // its whole cycle (8 to 12 seconds). The slots are staggered so they do not all change together.
    const dwell = (idx) => (slides[idx].type === 'animation' ? DWELL.animation : DWELL.still);
    const step = (slot) => {
      const prev = activeRef.current;
      const kind = pickKind();
      const pool = slides.map((x, i) => i).filter((i) => slides[i].type === kind && !prev.includes(i));
      const choices = pool.length ? pool : slides.map((x, i) => i).filter((i) => !prev.includes(i));
      const next = choices[Math.floor(Math.random() * choices.length)];
      const copy = [...prev];
      copy[slot] = next;
      activeRef.current = copy;
      setActive(copy);
      setLeaving((l) => l.map((v, k) => (k === slot ? prev[slot] : v)));
      later(() => setLeaving((l) => l.map((v, k) => (k === slot ? null : v))), 1400);
      later(() => step(slot), dwell(next) + slot * 700);
    };
    activeRef.current.forEach((idx, slot) => later(() => step(slot), dwell(idx) + slot * 2500));
    return () => {
      stopped = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.fadingRow}>
      {active.map((activeIdx, slot) => (
        <div key={slot} className={styles.fadingSlot}>
          {slides.map((s, i) => {
            const isActive = i === activeIdx;
            const wrapperClass = clsx(styles.fadingImgWrap, isActive && styles.fadingImgActive);
            if (s.type === 'animation') {
              if (!isActive && leaving[slot] !== i) return null;
              return (
                <Link key={s.name} to={s.href} className={clsx(wrapperClass, styles.fadingAnim,)} aria-label={s.alt} aria-hidden={!isActive} tabIndex={isActive ? undefined : -1}>
                  <ShowcaseDiagram name={s.name} className={styles.fadingAnimArt} />
                </Link>
              );
            }
            const img = <img src={s.src} alt={isActive ? s.alt : ''} loading="lazy" className={styles.fadingImg} />;
            return s.href ? (
              <Link key={s.src} to={s.href} className={wrapperClass} aria-hidden={!isActive} tabIndex={isActive ? undefined : -1}>
                {img}
              </Link>
            ) : (
              <span key={s.src} className={wrapperClass} aria-hidden={!isActive}>
                {img}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const { withBaseUrl } = useBaseUrlUtils();
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const showcaseSlides = SHOWCASE_SLIDES.map((s) => (s.type === 'photo' ? { ...s, src: withBaseUrl(s.src) } : s));

  // Client-only, after hydration: swap in a random sample from the whole
  // channel so every full page load shows a different set, without a
  // server/client markup mismatch (Math.random() can't run during SSR).
  useEffect(() => {
    setVideos(sampleRandom(ALL_CHANNEL_VIDEOS, VIDEO_COUNT));
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description="5G-MAG is a not-for-profit association bridging media and connectivity standards to working implementations, from specification analysis to open-source reference tools."
    >
      <HeroSlideshow />

      {/* What is coming up next, filled from the events agenda. */}
      <NextUp />

      {/* A dedicated, prominent search band right below the hero -- modeled
          on dvb.org's homepage, which puts search here rather than leaving
          it as a small navbar icon only. Reuses @theme/SearchBar, the same
          component the navbar uses, just given a bigger, more discoverable
          home here. One bar, not two: no separate custom suggestion UI --
          this is the real Algolia DocSearch widget (2026-09-28), which
          already does live-as-you-type suggestions on its own. */}
      <div className={styles.homeSearchWrap}>
        <div className="container">
          <p className={styles.homeSearchLabel}>Looking for specific software or solutions?</p>
          <div className={styles.homeSearchBox}>
            <SearchBar />
          </div>
          <BasketJumpRow label="Solutions" />

          {/* Same invite banner as Where We Stand's own full chart
              (tech/index.js's .inviteBlock): right under the solution areas, because the
              landscape is set by 5G-MAG's members, not the other way around. */}
          <div className={styles.inviteBlock}>
            <h3 className={styles.inviteTitle}>Don&apos;t see your topic here?</h3>
            <p className={styles.inviteBody}>5G-MAG&apos;s members set this landscape.</p>
            <div className={styles.inviteLinks}>
              <Link to="/membership#request-membership" className={styles.inviteLink}>
                Bring your topic or project &rarr;
              </Link>
              <Link to="/contributing" className={styles.inviteLink}>
                See how to build together &rarr;
              </Link>
            </div>
          </div>

          {/* Real photos alternating with icon+title banner cover-slides
              for every DOMAIN_PILLARS topic -- see SHOWCASE_SLIDES' own
              comment for why, and why this rotates rather than showing a
              grid. Under the invitation banner. */}
          <FadingSlideRow slides={showcaseSlides} />
        </div>
      </div>

      <main>
        {/* Who We Are -- the heading and the three mission lines, with the
            links under them, beside the Media and Connectivity diagram they
            describe; then the four theme cards; then the rotating photos.
            Chosen by the user from two rendered layouts (2026-09-29): with
            the cards between the mission lines and the diagram, the diagram
            sat on its own with no flow. First thing after the hero/search
            band (2026-09-27: swapped ahead of Where We Stand, at direct
            request). Where We Stand now lives on the Tech page only. */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.introSplit}>
              <div>
                <h2 className={clsx(styles.sectionTitle, styles.introTitle)}>
                  At the intersection of{' '}
                  <span className={styles.noWrap}>Media and Connectivity</span>
                </h2>
                <p className={styles.introLead}>
                  Driving the future of connected media experiences with open specifications and open-source software.
                </p>
                <p className={styles.introLine}>
                  We are a neutral, non-profit association enabling organizations to collaborate, share development efforts, scale software projects, and bring open technologies to market faster.
                </p>
                <div className={styles.introLinks}>
                  <Link to="/about">Learn more about us &rarr;</Link>
                  {' · '}
                  <Link to="/membership#request-membership">Become a member &rarr;</Link>
                </div>
              </div>
              <div>
                <MediaConnectivityDiagram />
              </div>
            </div>

            <div className={styles.themeGrid}>
              {HOME_WORK.map((t) => (
                <Link key={t.title} to={t.href} className={styles.themeCard}>
                  <span className={styles.themeIcon}>{icon(t.icon)}</span>
                  <span className={styles.themeTitle}>{t.title}</span>
                  <span className={styles.themeBody}>{t.body}</span>
                  <span className={styles.themeCta}>{t.cta} &rarr;</span>
                </Link>
              ))}
            </div>

            {/* Counted daily, never typed: see SiteStats. */}
            <SiteStats />
          </div>
        </section>

        {/* Replay: recorded talks, demos and calls (formerly On Air) */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Replay</h2>
            <p className={styles.sectionSubtitle}>
              Recorded talks, demos and calls from across all of 5G-MAG&apos;s work
            </p>
            <VideoGrid videos={videos} kicker="Replay" singleRow />
            <div className={styles.onAirMore}>
              <Link to="/videos">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        {/* News & Events -- merged from two separate back-to-back sections
            (raised directly: On Air / Latest News / Where to Find Us /
            Latest Releases in a row read as bloat, 4 near-identical
            "recent activity" blocks). Both are "here's what's
            happening" announcements, so they now share one section,
            each still with its own sub-heading, real content and "view
            all" link into its own full page. */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>News &amp; Events</h2>
            <div className={styles.releasesHeader} style={{ marginTop: '1.5rem' }}>
              <div>
                <h3
                  className={styles.sectionTitle}
                  style={{ fontSize: '1.15rem', marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Latest News
                </h3>
                <p className={styles.releasesUpdated}>Announcements from 5G-MAG</p>
              </div>
              <Link className={styles.releasesViewAll} to="/news">
                View all news &rarr;
              </Link>
            </div>
            <div className="event-post-grid">
              {LATEST_NEWS.map((post) => (
                <Link key={post.href} to={post.href} className="event-post-card">
                  <img loading="lazy" src={withBaseUrl(post.image)} alt="" />
                  <span className="event-post-title">{post.title}</span>
                </Link>
              ))}
            </div>

            <div className={styles.releasesHeader} style={{ marginTop: '2.75rem' }}>
              <div>
                <h3
                  className={styles.sectionTitle}
                  style={{ fontSize: '1.15rem', marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Where to Find Us
                </h3>
                <p className={styles.releasesUpdated}>
                  Events, conferences, workshops, webinars and calls
                </p>
              </div>
              <Link className={styles.releasesViewAll} to="/events#agenda">
                Full agenda &rarr;
              </Link>
            </div>
            <EventsAgendaPreview events={EVENTS_AGENDA} />
          </div>
        </section>

        {/* Latest Releases */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Media Connectivity Software Accelerator: Latest Releases
                </h2>
                <p className={styles.releasesUpdated}>Updated: {releasesData.updated_at}</p>
              </div>
              <Link className={styles.releasesViewAll} to="/community/activity#reference-tools">
                View all releases &rarr;
              </Link>
            </div>
            <div className={styles.releasesGrid}>
              {LATEST_RELEASE_PROJECTS.slice(0, 6).map((project) => (
                <ReleaseCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Members */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Members</h2>
            <p className={styles.sectionSubtitle}>
              Open to any organization willing to join — and member-driven once you do.
            </p>
          </div>
          <MembersMarquee />
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
            <Link to="/membership#our-members">See all members &rarr;</Link>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
