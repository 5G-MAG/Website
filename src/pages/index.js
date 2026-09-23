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
import GodeeperCard, { icon } from '@site/src/components/GodeeperCard';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { EventsAgendaPreview } from '@site/src/components/EventsAgenda';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { BENEFITS } from '@site/src/data/membershipBenefits';
import { NEWS_PREVIEW } from '@site/src/data/newsPreview';
import projectsData from '@site/src/data/projects.json';
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

// The business case for joining, picked from /membership's own real
// BENEFITS list (src/data/membershipBenefits.js) rather than reworded
// here, per standing feedback that homepage copy should be fetched from
// About/Membership, not freshly drafted. These three speak most directly
// to a decision-maker rather than an engineer: shared effort, speed to
// market, de-risking an unproven bet. Filtered by title, not index, so a
// reorder in membershipBenefits.js doesn't change which three show here
// -- but a title rename there will silently drop that entry; keep the
// two files' titles in sync.
const BUSINESS_CASE_TITLES = [
  'Mutualised effort to grow your project',
  'Early access to pre-public code',
  'De-risk on deployments',
];
const BUSINESS_CASE_BENEFITS = BENEFITS.filter((b) => BUSINESS_CASE_TITLES.includes(b.title));

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

// One real cover-slide card per project (projects.json) -- the exact
// design already used for release/community cards site-wide (navy/cyan
// gradient, category pill, project title, icon, 5G-MAG logo), not
// hand-built here. "Dependency" is excluded: it has no image or doc_url
// (external forks/dependencies 5G-MAG maintains, not a first-class
// reference-tool project with its own page -- see its own tagline).
const PROJECT_CARDS = projectsData
  .filter((p) => p.image && p.doc_url)
  .map((p) => ({ type: 'project', src: p.image, alt: p.name, href: p.doc_url }));

const SHOWCASE_SLIDES = [...USE_CASE_PHOTOS, ...PROJECT_CARDS];

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
  const firstProjectIdx = slides.findIndex((s) => s.type === 'project');
  const secondPhotoIdx = slides.findIndex((s, i) => s.type === 'photo' && i !== firstPhotoIdx);
  const initial = [firstPhotoIdx, firstProjectIdx, secondPhotoIdx].map((i) => (i === -1 ? 0 : i));
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (slides.length <= 3) return undefined;
    const timers = active.map((_, slot) =>
      setInterval(
        () => {
          setActive((prev) => {
            let next;
            do {
              next = Math.floor(Math.random() * slides.length);
            } while (next === prev[slot] || prev.includes(next));
            const copy = [...prev];
            copy[slot] = next;
            return copy;
          });
        },
        3000 + slot * 1200
      )
    );
    return () => timers.forEach(clearInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.fadingRow}>
      {active.map((activeIdx, slot) => (
        <div key={slot} className={styles.fadingSlot}>
          {slides.map((s, i) => {
            const isActive = i === activeIdx;
            const wrapperClass = clsx(styles.fadingImgWrap, isActive && styles.fadingImgActive);
            const img = <img src={s.src} alt={isActive ? s.alt : ''} loading="lazy" className={styles.fadingImg} />;
            return s.href ? (
              <Link key={s.src} to={s.href} className={wrapperClass} aria-hidden={!isActive}>
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
            <p style={{ maxWidth: '760px', margin: '0 auto 0.75rem', lineHeight: 1.6, textAlign: 'center', fontSize: '1.25rem', fontWeight: 600 }}>
              Open specifications and open-source software, turned into real-world applications.
            </p>
            <p style={{ maxWidth: '700px', margin: '0 auto 0.75rem', lineHeight: 1.6, textAlign: 'center', fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)' }}>
              A not-for-profit, neutral platform, driven by our members: they set the priorities, we execute.
            </p>
            <p style={{ maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 1.6, textAlign: 'center', fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)' }}>
              Members build together, and back technologies that actually get deployed, not specifications that stall.
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            {/* Real photos alternating with icon+title banner cover-slides
                for every DOMAIN_PILLARS topic -- see SHOWCASE_SLIDES' own
                comment for why, and why this rotates rather than showing a
                grid. No "See It Running" label above it (dropped per
                review) -- the row speaks for itself, right before the link
                into the full breakdown. */}
            <FadingSlideRow slides={showcaseSlides} />

            <div className={styles.onAirMore} style={{ marginBottom: '2.5rem' }}>
              <Link to="/about#what-we-work-on">Explore what we work on &rarr;</Link>
            </div>

            <div className={clsx(styles.activityGrid, styles['activityGrid--4col'])}>
              {DISCOVER_WORK.map((p) => (
                <AreaCard key={p.title} {...p} />
              ))}
            </div>

            <div className={styles.onAirMore}>
              <Link to="/about">Learn more about us &rarr;</Link>
              {' · '}
              <Link to="/membership#request-membership">Become a member &rarr;</Link>
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

        {/* Why Members Join */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Members Join</h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1.5rem' }}>
              The business case for joining, in three points.
            </p>
            <div className="godeeper-grid">
              {BUSINESS_CASE_BENEFITS.map((b) => (
                <GodeeperCard key={b.title} {...b} />
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
