import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSlideshow from '@site/src/components/HeroSlideshow';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import MembersMarquee from '@site/src/components/MembersMarquee';
import SearchBar from '@theme/SearchBar';
import { icon } from '@site/src/components/GodeeperCard';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { EventsAgendaPreview } from '@site/src/components/EventsAgenda';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { BENEFITS } from '@site/src/data/membershipBenefits';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { TECH_AREAS } from '@site/src/data/techAreas';
import { NEWS_PREVIEW } from '@site/src/data/newsPreview';
import { sampleRandom } from '@site/src/utils/random';
import { sortByLatestRelease } from '@site/src/utils/releases';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import releasesData from '@site/static/data/releases.json';

const LATEST_RELEASE_PROJECTS = sortByLatestRelease(releasesData.projects);
const LATEST_NEWS = [...NEWS_PREVIEW].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

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

// A bigger, bolder invitation than the plain GodeeperCard used elsewhere
// for this same data (About's "What We Do" still uses GodeeperCard) --
// this section is Home's main gateway into the site's 4 top-level areas,
// so it gets the more prominent icon-band treatment plus an explicit
// "Explore X" call to action, matching ActivityCard/ProductTypeCard's
// styling on Tech/Standards/Developer's own "What You'll Find Here"
// sections rather than inventing a new look.
function AreaCard({ title, body, href, icon: cardIcon }) {
  return <HubDestinationCard icon={icon(cardIcon)} title={title} desc={body} href={href} />;
}

// Real photos of the technologies named just above (in TECH_AREAS and
// DISCOVER_WORK) actually running -- not stock imagery, same convention
// About's "Examples of Our Work" gallery already uses. Added, then
// expanded from an initial 3 to cover more of the named technology areas,
// then switched from a static 6-photo grid with captions to a 3-slot row
// that rotates through this whole pool with a crossfade (2026-08-27
// feedback, in order: "we need something visual about streaming, immersive
// media, automotive infotainment"; "I do not like unless you add more tech
// than just these 3"; "just a row of 3 images, not captions and something
// that changes images randomly with some fading"). No real photo of a car
// infotainment deployment exists in the asset library, so that use case is
// named in the alt text instead of illustrated with a fabricated/stock
// image -- it's a real target of the MBS work shown
// (docs/tech/5g-mbs/overview-mbs.mdx: MBS User Services reaching
// "smartphones, smart TVs or car infotainment systems"), not invented.
const USE_CASE_PHOTOS = [
  {
    src: '/assets/images/gallery/reference-tools-demo-rig.jpg',
    alt: '5G Media Streaming, live on real devices — 5G-MAG Reference Tools demo rig with SDR hardware and phones',
  },
  {
    src: '/assets/images/5gbc/reference-tools-broadcast-demo.jpg',
    alt: '5G Broadcast reaching TV, radio and car infotainment systems — the 5G-MAGflix app running next to a broadcast receiver',
  },
  {
    src: '/assets/images/xr/volumetric-capture-demo.jpg',
    alt: 'Immersive & Volumetric Media, captured and viewed in AR on a phone',
  },
  {
    src: '/assets/images/emergency-alerts/emergency-alert.jpg',
    alt: '5G Broadcast Emergency Alerts delivered straight to a handset from an SDR transmitter',
  },
  {
    src: '/assets/images/gallery/camara-dedicated-networks-demo.png',
    alt: 'Network APIs — the CAMARA Dedicated Networks reference tool reserving connectivity on demand',
  },
  {
    src: '/assets/images/gallery/5g-broadcast-plugfest-2026.jpg',
    alt: 'Validated at PlugFests — interop testing across vendors at the 5G Broadcast PlugFest 2026',
  },
];

// A 3-slot row where each slot independently cycles through USE_CASE_PHOTOS
// and crossfades to the next -- every photo in the pool eventually shows in
// every slot, so all 6 use cases surface over time without needing 6 tiles
// on screen at once. Every photo image is rendered into every slot (stacked,
// opacity-toggled) rather than swapping `src`, so the crossfade is a pure
// CSS opacity transition with no flash of a half-loaded image; the browser
// dedupes the repeated <img> requests against the same URL either way.
// Client-only rotation (like the video sampling above): SSR/first paint
// shows a fixed slot 0/1/2 assignment so hydration has something stable to
// match, and setInterval only starts after mount.
function FadingPhotoRow({ photos }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const initial = photos.map((_, i) => i % photos.length).slice(0, 3);
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (photos.length <= 3) return undefined;
    const timers = active.map((_, slot) =>
      setInterval(
        () => {
          setActive((prev) => {
            let next;
            do {
              next = Math.floor(Math.random() * photos.length);
            } while (next === prev[slot] || prev.includes(next));
            const copy = [...prev];
            copy[slot] = next;
            return copy;
          });
        },
        5000 + slot * 1700
      )
    );
    return () => timers.forEach(clearInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.fadingRow}>
      {active.map((activeIdx, slot) => (
        <div key={slot} className={styles.fadingSlot}>
          {photos.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={i === activeIdx ? p.alt : ''}
              loading="lazy"
              className={clsx(styles.fadingImg, i === activeIdx && styles.fadingImgActive)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const { withBaseUrl } = useBaseUrlUtils();
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const useCasePhotos = USE_CASE_PHOTOS.map((p) => ({ ...p, src: withBaseUrl(p.src) }));

  // Client-only, after hydration: swap in a random sample from the whole
  // channel so every full page load shows a different set, without a
  // server/client markup mismatch (Math.random() can't run during SSR).
  useEffect(() => {
    setVideos(sampleRandom(ALL_CHANNEL_VIDEOS, VIDEO_COUNT));
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description="5G-MAG is the industry association bridging media and connectivity standards to working implementations, from specification analysis to open-source reference tools."
    >
      <HeroSlideshow />

      {/* Example A: a dedicated, prominent search band right below the hero --
          modeled on dvb.org's homepage, which puts search here rather than
          leaving it as a small navbar icon only. Reuses the same indexed
          search (@easyops-cn/docusaurus-search-local) the navbar already
          uses, just given a bigger, more discoverable home here. */}
      <div className={styles.homeSearchWrap}>
        <div className="container">
          <p className={styles.homeSearchLabel}>Looking for something specific?</p>
          <div className={styles.homeSearchBox}>
            <SearchBar />
          </div>
        </div>
      </div>

      <main>
        {/* Who We Are */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              At the intersection of Media and Connectivity
            </h2>
            <p style={{ maxWidth: '760px', margin: '0 auto 1rem', lineHeight: 1.7, textAlign: 'center' }}>
              &ldquo;We are not a standards body. We do not write specs. We translate them into
              things that run.&rdquo;
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            {/* See It Running: real photos of the technology areas named
                below, actually in use -- see USE_CASE_PHOTOS' own comment
                for why, and why this rotates rather than showing a grid.
                Placed here, ahead of the chips/cards (2026-08-27 feedback:
                "can the see it running sit before the explore by technology
                area?"), so the concrete proof comes right after the
                diagram, before naming the areas in text. */}
            <p className={styles.techAreaLabel}>See It Running</p>
            <FadingPhotoRow photos={useCasePhotos} />

            <p className={styles.techAreaLabel}>Explore by technology area</p>
            <div className={styles.techAreaRow}>
              {TECH_AREAS.map((t) => (
                <Link key={t.href} to={t.href} className={styles.techAreaChip}>
                  {t.label}
                </Link>
              ))}
            </div>

            <div className={clsx(styles.activityGrid, styles['activityGrid--4col'])}>
              {DISCOVER_WORK.map((p) => (
                <AreaCard key={p.title} {...p} />
              ))}
            </div>

            <div className={styles.onAirMore}>
              <Link to="/about">Learn more about us &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Developer Exchanges */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>On Air</h2>
            <p className={styles.sectionSubtitle}>
              Recorded talks, demos and calls from across all of 5G-MAG&apos;s work — Developer
              Exchanges, Public Calls, workshops and more.
            </p>
            <VideoGrid videos={videos} kicker="Replay" singleRow />
            <div className={styles.onAirMore}>
              <Link to="/videos">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Latest News
                </h2>
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
          </div>
        </section>

        {/* Where to find us */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Where to Find Us
                </h2>
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
              <Link className={styles.releasesViewAll} to="/community#projects">
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
              A thriving, open community — membership is open to any organization willing to join
              the efforts.
            </p>
          </div>
          <MembersMarquee />
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
            <Link to="/membership#our-members">See all members &rarr;</Link>
          </div>
        </section>

        {/* Example B: a short "why join" pitch, homepage-only, ahead of the
            shared JoinTheEffort tiles below -- modeled on dvb.org's numbered
            membership pitch, but quoting /membership's own established
            "What you get that you won't get alone" copy verbatim (via the
            shared BENEFITS data) rather than drafting new wording (2026-08-27
            feedback: pull from the real About/Membership copy, don't invent).
            JoinTheEffort itself is shared across 8 hub pages and stays
            untouched; this is specific to the homepage, and deliberately
            carries no heading of its own so "Join the Effort" below reads as
            the title for both. */}
        <section className={clsx(styles.section, styles.sectionAlt, styles.whyJoinSection)}>
          <div className="container">
            <ol className={styles.whyJoinList}>
              {BENEFITS.slice(0, 3).map((b, i) => (
                <li key={b.title}>
                  <span className={styles.whyJoinNum}>{i + 1}</span>
                  <div>
                    <strong>{b.title}.</strong>
                    <p>{b.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
