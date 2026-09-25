import { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
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
  },
  'Content Delivery Protocols': {
    desc: 'Multi-CDN tooling and protocol implementations for media delivery.',
    tags: ['Linux'],
  },
  'CAMARA Connectivity Quality Management APIs': {
    desc: 'CAMARA-compliant API clients for QoS-aware media applications.',
  },
  'Common Tools': {
    desc: 'Shared scripts, example configurations and build utilities used across several Reference Tools.',
    tags: ['Linux', 'Cloud'],
  },
};

const BASKET_DESC = {
  'content-delivery': 'Reference implementations for delivering and streaming media over broadband networks.',
  '5g-broadcast': 'Reference implementations of LTE-based 5G Broadcast for TV, radio and emergency alerts.',
  'immersive-media': 'Reference implementations of MPEG scene-description, avatar and volumetric-video standards.',
  multicast: 'Reference implementations of native multicast delivery over 5G.',
  'connected-media-production': 'Reference implementations of CAMARA telco network APIs for connected production.',
};

// Every doc_url'd project except the testbeds-basket ones, which are
// /testbeds' own destinations, not this page's -- same exclusion techTopics.js
// already applies on the Tech side (AI Traffic Characterization etc. reach
// their testbed page via a plain link there, not a Reference Tools card
// here). Grouped by basket, same taxonomy and same order as tech/index.js's
// TECH_GROUPS, so a project's basket move or a new project with a doc_url
// picks up here automatically -- no second hand-maintained array to drift.
const REFTOOLS_PROJECTS = ALL_PROJECTS.filter((p) => p.doc_url && p.basket !== 'testbeds');

function topicFor(project) {
  const meta = TOPIC_META[project.name] || {};
  const basket = BASKETS.find((b) => b.key === project.basket);
  return {
    title: project.displayName || project.name,
    desc: meta.desc,
    href: project.doc_url.replace(/\/$/, ''),
    tags: meta.tags,
    icon: iconForProject(project),
    repoCount: reposFor(project).length,
    // Only set for a real basket topic -- the Shared Infrastructure
    // residual group below has no basket of its own, so its cards keep
    // the shared card's default color and no basket label.
    accent: basket && BASKET_ACCENT[basket.key],
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
    topics: REFTOOLS_PROJECTS.filter((p) => p.basket === b.key).map(topicFor),
  })),
  {
    title: 'Shared Infrastructure',
    desc: 'Shared infrastructure and reference-consumer repositories other Reference Tools projects build on or exercise.',
    topics: REFTOOLS_PROJECTS.filter((p) => !p.basket).map(topicFor),
  },
].filter((c) => c.topics.length > 0);

// Exported for /testbeds' own single-basket grid, which wants exactly
// this same gradient-header-plus-grid box rather than a second copy of
// it (that page's own basket happens to be just one, but the shared
// look is the point, not the count).
export function CategoryCard({ title, desc, topics }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
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
      <div className="container" style={{ marginTop: '1.75rem' }}>
        <div className="topic-banner">
          <div className="topic-banner__icon-wrap">{icon(REFTOOLS_ICON_PATH)}</div>
          <div className="topic-banner__text">
            <span className="topic-banner__kicker">Software Accelerator</span>
            <h1>Reference Tools</h1>
          </div>
        </div>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
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
      </main>
    </Layout>
  );
}
