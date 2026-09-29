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
import VideoGrid from '@site/src/components/VideoGrid';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import BasketJumpRow from '@site/src/components/BasketJumpRow';
import ReleaseCard from '@site/src/components/ReleaseCard';
import { EventsAgendaPreview } from '@site/src/components/EventsAgenda';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { NEWS_PREVIEW } from '@site/src/data/newsPreview';
import {
  ALL_PROJECTS as projectsData,
  BASKETS,
  BASKET_ACCENT,
  ICON_CATALOG,
  STAGE_GROUPS,
  basketStageReach,
  displayNameOf,
  reposFor,
} from '@site/src/data/baskets';
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

// A basket's own icon, same catalog Where We Stand itself reads (tech/
// index.js's iconForCatalogKey) -- a one-line local copy rather than an
// export from that page, same pattern reference-tools/testbeds already
// each keep their own copy of.
function iconForCatalogKey(key) {
  const paths = key && ICON_CATALOG[key];
  if (!paths || !paths.length) return null;
  return icon(
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

// Where We Stand, rolled up to one row per basket instead of the full
// per-project chart -- basketStageReach() is true for a stage once ANY
// of that basket's own projects reached it. Every basket, even one
// with no project past Under Study yet: an empty-looking row is itself
// the invitation this section makes (see .standInvite below), not
// something to filter out.
const STAND_BASKETS = BASKETS.map((b) => {
  const basketProjects = projectsData.filter((p) => p.basket === b.key);
  return {
    ...b,
    accent: BASKET_ACCENT[b.key] || '#00a0d2',
    reach: basketStageReach(basketProjects),
    repoCount: basketProjects.reduce((n, p) => n + reposFor(p).length, 0),
    projects: basketProjects,
  };
});

// One card per basket -- icon, name and a checklist spelling out every
// stage in STAGE_GROUPS by name, checked or not (tried as an unlabeled
// segment bar first, with a shared axis header naming the columns once
// -- still read as "meaningless" once a reader reached a row with no
// label of its own, raised directly). The head+checklist link to that
// basket's own spot on the full chart at /tech#where-we-stand
// (tech/index.js's basketBlock carries id={b.key}).
//
// Below that, one icon+name row per project in the basket -- raised
// directly ("add a row with the icons of the actual projects so we can
// jump directly to the landing tech page of each project") -- each
// jumping straight to that project's own tech_url, skipping the
// basket-level chart entirely. A first pass showed the icon alone with
// the name only as a hover tooltip; raised directly ("the icon alone
// doesn't say much") that the name itself needed to be visible, not
// just discoverable on hover -- so this is a vertical list (a row of
// icon-only tiles has no room for a name at 3-per-line card width)
// with the name printed next to its icon. Every basketed project has a
// tech_url and a valid icon key (checked against taxonomy.json
// directly), so no fallback rendering is needed for either. This list
// sits outside the basket Link (nested <a> tags are invalid HTML), as
// its own sibling.
function StandCard({ basket }) {
  return (
    <div className={styles.standCard} style={{ '--accent': basket.accent }}>
      <Link to={`/tech#${basket.key}`} className={styles.standCardLink}>
        <div className={styles.standCardHead}>
          <span className={styles.standIcon}>{iconForCatalogKey(basket.icon)}</span>
          <span className={styles.standName}>{basket.title}</span>
        </div>
        <div className={styles.standChecklist}>
          {STAGE_GROUPS.map((g, i) => {
            const done = basket.reach[i];
            const withCount = g.key === 'software' && done && basket.repoCount > 0;
            return (
              <div
                key={g.key}
                className={clsx(styles.standCheckRow, done && styles.standCheckRowDone)}
              >
                <span className={clsx(styles.standDot, done && styles.standDotDone)} />
                {g.label}
                {withCount && ` (${basket.repoCount} ${basket.repoCount === 1 ? 'repository' : 'repositories'})`}
              </div>
            );
          })}
        </div>
      </Link>
      {basket.projects.length > 0 && (
        <div className={styles.standProjectList}>
          {basket.projects.map((p) => (
            <Link key={p.name} to={p.tech_url} className={styles.standProjectItem}>
              <span className={styles.standProjectIcon}>{iconForCatalogKey(p.icon)}</span>
              <span className={styles.standProjectName}>{displayNameOf(p)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// The four things 5G-MAG does, named in so many words at the top of the
// first section. Icons are ones the site already draws: the old TV and the
// signal bars from MediaConnectivityDiagram's halo and the catalog, the
// Standards hub's own speech bubble, and the catalog's code brackets (the
// Reference Tools icon). Standards and Open Source reuse the one-liners
// src/data/discoverWork.js already gives those two activities.
const THEMES = [
  {
    title: 'Multimedia',
    body: 'Streaming, broadcast, real-time communication and immersive media.',
    to: '/tech',
    cta: 'Technology areas',
    d: ['M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9', 'M16 3l-4 4l-4 -4'],
  },
  {
    title: 'Connectivity',
    body: '5G systems today and 6G next: multicast, satellite, private networks and network APIs.',
    to: '/tech#where-we-stand',
    cta: 'Where we stand',
    d: ICON_CATALOG['antenna-bars-5'],
  },
  {
    title: 'Standards',
    body: 'Feedback and requirements to standards bodies, from real deployments.',
    to: '/standards',
    cta: 'Standards',
    d: ['M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1'],
  },
  {
    title: 'Open Source',
    body: 'Open-source reference tools turning specs into working code.',
    to: '/reference-tools',
    cta: 'Reference Tools',
    d: ICON_CATALOG.code,
  },
];

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

      {/* A dedicated, prominent search band right below the hero -- modeled
          on dvb.org's homepage, which puts search here rather than leaving
          it as a small navbar icon only. Reuses @theme/SearchBar, the same
          component the navbar uses, just given a bigger, more discoverable
          home here. One bar, not two: no separate custom suggestion UI --
          this is the real Algolia DocSearch widget (2026-09-28), which
          already does live-as-you-type suggestions on its own. */}
      <div className={styles.homeSearchWrap}>
        <div className="container">
          <p className={styles.homeSearchLabel}>Looking for specific software or technology?</p>
          <div className={styles.homeSearchBox}>
            <SearchBar />
          </div>
          <p className={styles.homeJumpLabel}>Or go straight to a technology area</p>
          <BasketJumpRow />
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
            request, so Where We Stand sits immediately before On Air
            instead of two sections away). */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.introSplit}>
              <div>
                <h2 className={clsx(styles.sectionTitle, styles.introTitle)}>
                  At the intersection of Media and Connectivity
                </h2>
                <p className={styles.introLead}>
                  Open specifications and open-source software, turned into{' '}
                  <span className={styles.noWrap}>real-world</span> applications.
                </p>
                <p className={styles.introLine}>
                  A not-for-profit, neutral platform, driven by our members: they set the priorities, we execute.
                </p>
                <p className={styles.introLine}>
                  Members build together, and back technologies that actually get deployed, not specifications that stall.
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
              {THEMES.map((t) => (
                <Link key={t.title} to={t.to} className={styles.themeCard}>
                  <span className={styles.themeIcon}>
                    {icon(
                      <>
                        {t.d.map((d, i) => (
                          <path key={i} d={d} />
                        ))}
                      </>
                    )}
                  </span>
                  <span className={styles.themeTitle}>{t.title}</span>
                  <span className={styles.themeBody}>{t.body}</span>
                  <span className={styles.themeCta}>{t.cta} &rarr;</span>
                </Link>
              ))}
            </div>

            {/* Real photos alternating with icon+title banner cover-slides
                for every DOMAIN_PILLARS topic -- see SHOWCASE_SLIDES' own
                comment for why, and why this rotates rather than showing a
                grid. */}
            <FadingSlideRow slides={showcaseSlides} />
          </div>
        </section>

        {/* Where We Stand -- its own section, collapsed to basket level
            on purpose: the full per-project chart is one click away at
            /tech#where-we-stand, and each card here links straight to
            its own spot there. Plain-tinted (2026-09-27: moved to sit
            directly before On Air, at direct request) so the two still
            alternate against each other. */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Where We Stand</h2>
            <p className={styles.sectionSubtitle}>
              How far each technology area has come, from under study to software — the full
              breakdown, project by project, is at{' '}
              <Link to="/tech#where-we-stand">Where We Stand</Link>.
            </p>
            <div className={styles.standGrid}>
              {STAND_BASKETS.map((b) => (
                <StandCard key={b.key} basket={b} />
              ))}
            </div>

            {/* Same invite banner as Where We Stand's own full chart
                (tech/index.js's .inviteBlock) -- this landscape is set by
                5G-MAG's members, not the other way around. */}
            <div className={styles.inviteBlock}>
              <h3 className={styles.inviteTitle}>Don&apos;t see your topic here?</h3>
              <p className={styles.inviteBody}>5G-MAG&apos;s members set this landscape.</p>
              <div className={styles.inviteLinks}>
                <Link to="/membership#request-membership" className={styles.inviteLink}>
                  Propose a topic as a member &rarr;
                </Link>
                <Link to="/contributing" className={styles.inviteLink}>
                  See how to build together &rarr;
                </Link>
              </div>
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
