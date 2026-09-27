import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { icon } from '@site/src/components/GodeeperCard';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import { ALL_PROJECTS, BASKETS, BASKET_ACCENT, ICON_CATALOG, reposFor } from '@site/src/data/baskets';
import styles from '../tech/index.module.css';
import filterStyles from './styles.module.css';

const REFTOOLS_ICON_PATH = (
  <>
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l4 4l-4 4" />
    <path d="M14 4l-4 16" />
  </>
);

// A project's icon is its own `icon` field in src/data/taxonomy.json --
// rather than a second hand-drawn copy on this page, same pattern as
// tech/index.js's iconForHref and testbeds/index.js's iconForTitle.
function iconForProject(project) {
  const paths = project.icon && ICON_CATALOG[project.icon];
  if (!paths || !paths.length) return null;
  return icon(
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

// Hand-written copy for each Reference Tools destination -- kept here since
// it's specific to this page ("what this looks like as software to build
// with"), not part of the taxonomy itself. `tags` are the union of a
// project's own repos' `software` field in taxonomy.json's `repoMetadata`
// (APK folded into Android, since APK is just that platform's build
// artifact) -- a small, fixed vocabulary (Linux, Android, Docker, Windows,
// Cloud, Web, API), not a filter UI. Two projects (avatar, network-apis)
// have no `software` entries recorded there yet, so they carry no tags; an
// existing gap in that data, not something invented for this page.
// Re-derive by hand from repoMetadata if a project's repo set changes.
const TOPIC_META = {
  '3GPP RAN and Core Platforms': {
    desc: 'Open5GS-based 5G core and srsRAN-based RAN for lab and field testing.',
    tags: ['Linux'],
  },
  '5G Broadcast - Emergency Alerts': {
    desc: 'Broadcast-based public warning system using 5G Broadcast infrastructure.',
    tags: ['Linux', 'Cloud'],
  },
  '5G Broadcast - TV and Radio Services': {
    desc: 'LTE-based transmitter, middleware and modem for TV & radio broadcast over 5G.',
    tags: ['Linux', 'Android', 'Docker', 'Web', 'Cloud'],
  },
  '5G Core Service Consumers': {
    desc: 'Reference consumer implementations for 5G Core (5GC) capability exposure APIs.',
    tags: ['Linux'],
  },
  '5G Media Streaming (5GMS)': {
    desc: '3GPP AF/AS implementation for adaptive media delivery over 5G.',
    tags: ['Linux', 'Android', 'Docker', 'Web', 'API', 'Cloud'],
  },
  '5G Multicast Broadcast Services (MBS)': {
    desc: '5G MBS client and network functions for native multicast delivery.',
    tags: ['Linux', 'Android', 'Docker', 'Web', 'Cloud'],
  },
  'DVB-I Services over 5G Systems': {
    desc: 'DVB-I service discovery and delivery adapted for 5G hybrid networks.',
    tags: ['Android'],
  },
  'UE Data Collection, Reporting and Event Exposure': {
    desc: 'On-device (UE) data collection and reporting per 3GPP TS 26.531.',
    tags: ['Linux', 'Docker', 'API', 'Cloud'],
  },
  'Conversational Avatar Communication with MPEG ARF': {
    desc: 'Real-time avatar streaming using the MPEG Avatar Representation Format (ARF) standard.',
    tags: ['Android', 'Docker', 'Windows', 'Web'],
  },
  'MPEG V3C Immersive Platform': {
    desc: 'End-to-end pipeline for volumetric 3D content production and delivery.',
    tags: ['Linux', 'Android', 'Windows'],
  },
  'XR/3D Scenes with MPEG-I Scene Description': {
    desc: 'Unity player for MPEG-I Scene Description with 5G media integration.',
    tags: ['Linux', 'Android', 'Windows'],
  },
  'Dynamic Mesh Coding': {
    desc: 'Web-based decoder and player for V-DMC (ISO/IEC 23090-29) content, in progress.',
    tags: ['Web'],
  },
  'Content Delivery Protocols': {
    desc: 'Multi-CDN tooling and protocol implementations for media delivery.',
    tags: ['Linux'],
  },
  'CAMARA Connectivity Quality Management APIs': {
    desc: 'CAMARA-compliant API clients for QoS-aware media applications.',
  },
  'Real-time Media Communication (RTC) Architecture': {
    desc: 'No dedicated reference tool yet; one related repository (3GPP SWAP Protocol) is tracked below.',
    tags: ['Web', 'Docker'],
  },
  'Non-Terrestrial Networks in 5G Systems': {
    desc: 'Analysis-only today — see the Technical Analysis and Specifications for what\'s defined.',
  },
  'Non-Public Networks': {
    desc: 'Analysis-only today — see the Technical Analysis and Specifications for what\'s defined.',
  },
  'Time-Sensitive Communications (TSC)': {
    desc: 'Analysis-only today — see the Technical Analysis and Specifications for what\'s defined.',
  },
  'Common Tools': {
    desc: 'Shared scripts, example configurations and build utilities used across several Reference Tools.',
    tags: ['Linux', 'Cloud'],
  },
  // Testbeds-basket entries -- /testbeds/index.js reuses this same map and
  // topicFor() below (direct instruction: "same format... same search bar
  // and everything"), rather than keeping its own hand-written array that
  // could silently drift from taxonomy.json the way a project's own
  // `basket`/`doc_url` already can't here (REFTOOLS_PROJECTS' own filter
  // picks up a new project automatically; /testbeds' filter below does too).
  'AI Traffic Characterization': {
    desc: 'AI traffic profiling and 5G-to-6G migration testbed.',
    tags: ['Linux'],
  },
  'AI/ML Evaluation Framework': {
    desc: 'Framework for evaluating AI/ML solutions in mobile media services.',
    tags: ['Linux'],
  },
  'Beyond 2D Evaluation Framework': {
    desc: 'Test and evaluation framework for immersive video quality assessment.',
    tags: ['Linux'],
  },
};

const BASKET_DESC = {
  'content-delivery': 'Reference implementations for delivering and streaming media over broadband networks.',
  '5g-broadcast': 'Reference implementations of LTE-based 5G Broadcast for TV, radio and emergency alerts.',
  'immersive-media': 'Reference implementations of MPEG scene-description, avatar and volumetric-video standards.',
  multicast: 'Reference implementations of native multicast delivery over 5G.',
  'connected-media-production': 'Reference implementations of CAMARA telco network APIs for connected production.',
  rtc: 'Reference implementations for interactive, low-latency, real-time media communication.',
  ntn: 'Reference implementations for content delivery over satellite and HAPS non-terrestrial networks.',
};

// Every doc_url'd project except the testbeds-basket ones, which are
// /testbeds' own destinations, not this page's -- same exclusion techTopics.js
// already applies on the Tech side (AI Traffic Characterization etc. reach
// their testbed page via a plain link there, not a Reference Tools card
// here). Grouped by basket, same taxonomy and same order as tech/index.js's
// TECH_GROUPS, so a project's basket move or a new project with a doc_url
// picks up here automatically -- no second hand-maintained array to drift.
const REFTOOLS_PROJECTS = ALL_PROJECTS.filter((p) => p.doc_url && p.basket !== 'testbeds');

// Build-time-only self-check (code-derived, no spec claim): TOPIC_META is
// hand-maintained, unlike REFTOOLS_PROJECTS' own filter above -- a new
// doc_url'd project (here or in /testbeds, which shares this same map)
// with no entry would silently render a blank-description card instead of
// erroring, since HubDestinationCard has no guard on an undefined `desc`.
// Guarded to the Node-side build/SSR pass only, same as baskets.js's own
// SHARED_REPO_OWNERS check.
if (typeof window === 'undefined') {
  const testbedProjects = ALL_PROJECTS.filter((p) => p.doc_url && p.basket === 'testbeds');
  const missing = [...REFTOOLS_PROJECTS, ...testbedProjects]
    .filter((p) => !TOPIC_META[p.name])
    .map((p) => p.name);
  if (missing.length > 0) {
    throw new Error(
      `src/pages/reference-tools/index.js: TOPIC_META is missing an entry for: ${missing.join(', ')}\n` +
        `Add a { desc, tags? } entry for each, or its card on /reference-tools or /testbeds renders with no description.`
    );
  }
}

// Exported for /testbeds/index.js, which builds its own topic list with
// this same function over its own (testbeds-basket) project filter --
// same reasoning as CategoryCard's own export below.
export function topicFor(project) {
  const meta = TOPIC_META[project.name] || {};
  const basket = BASKETS.find((b) => b.key === project.basket);
  return {
    title: project.displayName || project.name,
    desc: meta.desc,
    href: project.doc_url.replace(/\/$/, ''),
    // The real SDOs this project's specifications and repos implement --
    // taxonomy.json's own `sdos`, not a second hand-maintained list here
    // (unlike `tags`/TOPIC_META above): every repo-level `standards` entry
    // added this session already sums to exactly this same set per
    // project, confirmed by hand, so there is no second source to drift
    // from by deriving it here instead.
    standards: project.sdos,
    tags: meta.tags,
    icon: iconForProject(project),
    repoCount: reposFor(project).length,
    // No longer accent-tinted (2026-09-27, direct instruction: "only the
    // repositories will keep the color" -- these per-project tiles aren't
    // repository cards, so they revert to the site's normal blue, same as
    // the ProjectDestinationCards triad on each flagship page). basketLabel
    // stays; it's real information (which basket this project belongs to),
    // not a color choice.
    basketLabel: basket?.title,
  };
}

// The `basket: null` projects above that are still real Reference Tools
// destinations (3GPP RAN and Core Platforms, Common Tools, 5G Core Service
// Consumers) are not a basket topic -- see their own `excludedReason` in
// taxonomy.json -- so they get one explicit residual group rather than
// being silently dropped by the per-basket grouping below.
const CATEGORIES = [
  ...BASKETS.map((b) => ({
    title: b.title,
    desc: BASKET_DESC[b.key],
    // 2026-09-27: propagated from /tech's own Where We Stand basket
    // banners, direct instruction -- each basket's own accent color, kept
    // to the header band only (project cards below keep their own
    // existing per-project accent, untouched).
    accent: BASKET_ACCENT[b.key],
    topics: REFTOOLS_PROJECTS.filter((p) => p.basket === b.key).map(topicFor),
  })),
  {
    title: 'Shared Infrastructure',
    desc: 'Shared infrastructure and reference-consumer repositories other Reference Tools projects build on or exercise.',
    // No real basket, so no accent -- CategoryCard falls back to the
    // site's normal blue, same as every basket-less card already does
    // elsewhere.
    topics: REFTOOLS_PROJECTS.filter((p) => !p.basket).map(topicFor),
  },
].filter((c) => c.topics.length > 0);

// Exported for /testbeds' own single-basket grid, which wants exactly
// this same gradient-header-plus-grid box rather than a second copy of
// it (that page's own basket happens to be just one, but the shared
// look is the point, not the count).
export function CategoryCard({ title, desc, accent, topics }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader} style={{ '--accent': accent || 'var(--ifm-color-primary)' }}>
        <h3 className={styles.categoryTitle}>{title}</h3>
        <p className={styles.categoryDesc}>{desc}</p>
      </div>
      <div className={styles.categoryTopicGrid}>
        {topics.map((t) => (
          <HubDestinationCard
            key={t.href}
            compact
            largeTitle
            big
            icon={t.icon}
            title={t.title}
            desc={t.desc}
            href={t.href}
            standards={t.standards}
            tags={t.tags}
            repoCount={t.repoCount}
            accent={t.accent}
            basketLabel={t.basketLabel}
          />
        ))}
      </div>
    </div>
  );
}

// Filters CATEGORIES by a plain-text query against each topic's own title,
// description and tags (not the category's, so a query like "5gms" or
// "android" surfaces only the matching topic cards, inside whichever
// category they live in, rather than the whole category because the
// category description happened to mention it too). A category with zero
// remaining topics is dropped entirely rather than shown empty.
function filterCategories(query) {
  const q = query.trim().toLowerCase();
  if (!q) return CATEGORIES;
  return CATEGORIES.map((c) => ({
    ...c,
    topics: c.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        (t.standards || []).some((s) => s.toLowerCase().includes(q)) ||
        (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
    ),
  })).filter((c) => c.topics.length > 0);
}

export default function ReferenceTools() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => filterCategories(query), [query]);
  const totalTopics = useMemo(() => CATEGORIES.reduce((n, c) => n + c.topics.length, 0), []);
  const shownTopics = useMemo(() => filtered.reduce((n, c) => n + c.topics.length, 0), [filtered]);

  return (
    <Layout
      title="Reference Tools"
      description="Directory of 5G-MAG Reference Tools projects and their repositories, grouped by technology area."
    >
      <HubHero
        title="Reference Tools"
        icon={REFTOOLS_ICON_PATH}
        actions={[
          <Link key="contribute" className="button button--primary" to="/contributing">
            Contribute
          </Link>,
          <Link key="license" className="button button--outline button--primary" to="/license">
            License Model
          </Link>,
          <Link key="early-access" className="button button--outline button--primary" to="/early-access">
            Early Access
          </Link>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <p className={filterStyles.filterLabel}>Looking for a specific project or technology?</p>
            <div className={filterStyles.filterBar}>
              <input
                type="search"
                className={filterStyles.filterInput}
                placeholder={`Filter ${totalTopics} projects by name or technology…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Filter Reference Tools projects"
              />
              {query && (
                <span className={filterStyles.filterCount}>
                  {shownTopics} of {totalTopics}
                </span>
              )}
            </div>
            {filtered.length === 0 ? (
              <p className={filterStyles.filterEmpty}>
                No projects match &ldquo;{query}&rdquo;. Try a broader technology name (e.g.
                &ldquo;broadcast&rdquo; or &ldquo;multicast&rdquo;).
              </p>
            ) : (
              <div className={styles.categoryColumns}>
                {filtered.map((c) => (
                  <CategoryCard key={c.title} {...c} />
                ))}
              </div>
            )}
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
