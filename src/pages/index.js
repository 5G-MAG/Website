import SiteStats from '@site/src/components/SiteStats';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import NextUp from '@site/src/components/NextUp';
import AskAi from '@site/src/components/AskAi';
import StandardsBasedOn from '@site/src/components/StandardsBasedOn';
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
import { ALL_PROJECTS as projectsData, BASKET_ACCENT, BASKET_PAGE, BASKETS, ICON_CATALOG } from '@site/src/data/baskets';
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

// The Developer Exchange sessions first, then other videos until there are enough for full rows.
const INITIAL_VIDEOS = [
  ...(youtubePlaylists.developer?.videos || []),
  ...ALL_CHANNEL_VIDEOS,
]
  .filter((v, i, all) => all.findIndex((x) => x.id === v.id) === i)
  .slice(0, VIDEO_COUNT);

// Real photos of the technologies named just above (in DOMAIN_PILLARS and
// DISCOVER_WORK) actually running -- not stock imagery, same convention
// About's "Examples of Our Work" gallery already uses.
const USE_CASE_PHOTOS = [
  {
    type: 'photo',
    src: '/assets/images/gallery/reference-tools-demo-rig.jpg',
    alt: '5G Media Streaming, live on real devices, 5G-MAG Reference Tools demo rig with SDR hardware and phones',
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
    alt: 'Network APIs: the CAMARA Dedicated Networks reference tool reserving connectivity on demand',
  },
  {
    type: 'photo',
    src: '/assets/images/gallery/5g-broadcast-plugfest-2026.jpg',
    alt: 'Validated at PlugFests: interop testing across vendors at the 5G Broadcast PlugFest 2026',
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
  // The hero animation of each solution area, opening the area's page.
  { name: 'hero', basket: 'content-delivery', alt: 'Animation: media flowing from a service through the network to viewers, with what they experience flowing back' },
  { name: 'rtc', basket: 'rtc', alt: 'Animation: two callers talking live through a 5G network' },
  { name: 'bcast', basket: 'broadcast-multicast', alt: 'Animation: one transmission reaching many receivers, with unicast where needed' },
  { name: 'ntn', basket: 'ntn', alt: 'Animation: satellites passing overhead and connecting a remote area' },
  { name: 'imm', basket: 'immersive-media', alt: 'Animation: a 3D scene streamed to a person in a headset, with their movement flowing back' },
  { name: 'prod', basket: 'connected-media-production', alt: 'Animation: live cameras sending video over a 5G uplink to a production hub' },
  { name: 'sixgai', basket: 'towards-6g', alt: 'Animation: devices with AI features and AI models working together over a 6G system' },
  // The pictures of the topics inside the areas, opening that topic.
  { name: 'insight', basket: 'content-delivery', anchor: 'insight', title: 'QoE and audience analytics', alt: 'Picture: a player reporting quality of experience metrics to a dashboard' },
  { name: 'cdn', basket: 'content-delivery', anchor: 'cdn', title: 'CDN and edge delivery', alt: 'Picture: content hosted at the edge of the mobile network' },
  { name: 'network', basket: 'content-delivery', anchor: 'quality', title: 'Network-assisted streaming', alt: 'Picture: a phone and the network helping each other for better streaming' },
  { name: 'broadcast', basket: 'broadcast-multicast', anchor: 'hybrid', title: 'Hybrid broadcast and unicast delivery', alt: 'Picture: broadcast for what is common and unicast where needed' },
  { name: 'ai', basket: 'towards-6g', anchor: 'ai-traffic', title: 'AI traffic characterization', alt: 'Animation: an AI app talking to a model over an emulated network while the traffic is captured' },
  { name: 'vops', basket: 'content-delivery', href: '/validation/vops', title: 'Video Operation Points', alt: 'Picture: a video bitstream checked against an operation point, with a pass or fail for every assertion' },
].map((a) => {
  const basket = BASKETS.find((b) => b.key === a.basket);
  return {
    type: 'animation',
    name: a.name,
    alt: a.alt,
    href: a.href || (a.anchor ? `${BASKET_PAGE[a.basket]}#${a.anchor}` : BASKET_PAGE[a.basket]),
    title: a.title || basket.title,
    icon: ICON_CATALOG[basket.icon] || [],
    accent: BASKET_ACCENT[a.basket] || '#00a0d2',
  };
});

const SHOWCASE_SLIDES = [...USE_CASE_PHOTOS, ...ANIMATION_SLIDES, ...PROJECT_CARDS];

// How often each kind of slide is chosen when a slot moves on: the animations are the new thing, so they come up
// more often than their share of the pool.
const KIND_WEIGHT = { animation: 0.4, photo: 0.3, project: 0.3 };

// Seconds a slot stays on a slide before it moves on. Animations stay long enough to be watched.
const DWELL = { still: 9000, animation: 17000 };

// A shuffled bag per kind of slide: each slide is shown once before any comes round again, in an order that is
// different on every visit.
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeBags(slides) {
  const bags = {};
  const refill = (kind) => {
    bags[kind] = shuffle(slides.map((s, i) => i).filter((i) => slides[i].type === kind));
  };
  const draw = (kind, exclude = []) => {
    if (!bags[kind] || bags[kind].length === 0) refill(kind);
    const at = bags[kind].findIndex((i) => !exclude.includes(i));
    if (at === -1) {
      refill(kind);
      const retry = bags[kind].findIndex((i) => !exclude.includes(i));
      return bags[kind].splice(retry === -1 ? 0 : retry, 1)[0];
    }
    return bags[kind].splice(at, 1)[0];
  };
  return { draw };
}

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
  // Nothing shows on the server's first paint (-1). Once the page is in the browser the three tiles pick a random
  // photo, animation and project card and fade in, so there is no swap from a fixed set to a random one a second
  // or two after the page loads. (Choosing at random during the first render would not match what the server sent.)
  const initial = [-1, -1, -1];
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
    const bags = makeBags(slides);
    // The first paint is the same on the server and in the browser; once mounted, the three tiles start from a
    // random photo, animation and project card, so every visit opens differently.
    const start = [bags.draw('photo'), bags.draw('animation'), bags.draw('project')];
    activeRef.current = start;
    setActive(start);
    const step = (slot) => {
      const prev = activeRef.current;
      const next = bags.draw(pickKind(), prev);
      const copy = [...prev];
      copy[slot] = next;
      activeRef.current = copy;
      setActive(copy);
      setLeaving((l) => l.map((v, k) => (k === slot ? prev[slot] : v)));
      later(() => setLeaving((l) => l.map((v, k) => (k === slot ? null : v))), 2600);
      later(() => step(slot), dwell(next) + slot * 700);
    };
    start.forEach((idx, slot) => later(() => step(slot), dwell(idx) + slot * 2500));
    return () => {
      stopped = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <ShowcaseDiagram name={s.name} className={styles.fadingAnimArt} wide />
                  <span className={styles.fadingCaption}>
                    <span className={styles.fadingCaptionIcon} style={{ background: s.accent }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {s.icon.map((d) => <path key={d} d={d} />)}
                      </svg>
                    </span>
                    {s.title} &rarr;
                  </span>
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
      title="5G-MAG"
      description="At the intersection of Media and Connectivity, for generations to come: streaming, immersive media, broadcast, real-time, production, NTN and 6G."
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
          <AskAi about="/llms.txt" collapsed />
          <BasketJumpRow label="Solutions" />

          {/* Real photos alternating with icon+title banner cover-slides
              for every DOMAIN_PILLARS topic -- see SHOWCASE_SLIDES' own
              comment for why, and why this rotates rather than showing a
              grid. Right under the solution areas. */}
          <FadingSlideRow slides={showcaseSlides} />

          {/* Same invite banner as Where We Stand's own full chart
              (tech/index.js's .inviteBlock): after the photo row, because the
              landscape is set by 5G-MAG's members, not the other way around. */}
          <div className={styles.inviteBlock}>
            <h2 className={styles.inviteTitle}>Don&apos;t see your topic here?</h2>
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
                  We are a neutral, non-profit association enabling organisations to collaborate, share development efforts, scale software projects, and bring open technologies to market faster.
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
            <VideoGrid videos={videos} kicker="Replay" fiveUp />
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

        {/* The standards bodies behind what we are developing, right before the Software Accelerator's releases. */}
        <StandardsBasedOn />

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
              Open to any organisation willing to join, and member-driven once you do.
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
