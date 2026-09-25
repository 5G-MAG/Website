import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { ALL_PROJECTS, BASKETS, BASKET_ACCENT, ICON_CATALOG, reposFor } from '@site/src/data/baskets';
import styles from '../tech/index.module.css';
// Shared with /reference-tools and /showcase; see the comment there
// for why (2026-08-24 findability audit; extended here 2026-08-25).
import filterStyles from '../reference-tools/styles.module.css';
// The exact same gradient-header-plus-grid card /reference-tools uses per
// basket -- reused rather than copied, so the two can't drift apart
// (direct instruction: "exactly same format").
import { CategoryCard } from '../reference-tools';

const icon = (paths) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    {paths}
  </svg>
);

const TESTBEDS_ICON_PATH = (
  <>
    <path d="M9 3l6 0" />
    <path d="M10 9l4 0" />
    <path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6" />
  </>
);

// Each testbed's icon is its project's own `icon` field in
// src/data/taxonomy.json -- a key into ICON_CATALOG -- rather than a second
// hand-drawn copy on this page (that duplication is how "AI Traffic
// Characterization" and "Beyond 2D Evaluation Framework" ended up sharing a
// cube glyph with unrelated projects elsewhere on the site while looking
// distinct here; see src/pages/tech/index.js's iconForHref for the same
// pattern). Selecting a different catalog key for a project changes its
// icon everywhere that reads from the master file, including here.
function iconForTitle(title) {
  const project = ALL_PROJECTS.find((p) => p.name === title);
  const paths = project?.icon && ICON_CATALOG[project.icon];
  if (!paths || !paths.length) return null;
  return icon(
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

// A testbed's own repository count, from taxonomy.json's real `repos`
// ownership -- same source reference-tools/index.js's topicFor reads.
function repoCountFor(title) {
  const project = ALL_PROJECTS.find((p) => p.name === title);
  return project ? reposFor(project).length : 0;
}

// Same basket-accent/label lookup as reference-tools/index.js's topicFor.
// Every current testbed sits in the one 'testbeds' basket, but this
// resolves it per-project rather than hardcoding that key, so a future
// testbed in a different basket still picks up its own color and label.
function basketInfoFor(title) {
  const project = ALL_PROJECTS.find((p) => p.name === title);
  const basket = project && BASKETS.find((b) => b.key === project.basket);
  return { accent: basket && BASKET_ACCENT[basket.key], basketLabel: basket?.title };
}

// `tags` are drawn from the union of each project's own repos' `software`
// field in taxonomy.json's `repoMetadata`, same convention and same caveat
// as reference-tools/index.js's CATEGORIES: re-derive from there rather
// than hand-editing here if a project's repo set changes. The
// filter bar promises "technology" search (see below), which needs this
// field to be real rather than absent -- it was missing here even though
// the placeholder already claimed it (2026-08-26 findability follow-up).
const TESTBED_PROJECTS = [
  {
    title: 'AI Traffic Characterization',
    desc: 'AI traffic profiling and 5G-to-6G migration testbed.',
    href: '/testbeds/6g-testbed',
    icon: iconForTitle('AI Traffic Characterization'),
    tags: ['Linux'],
    repoCount: repoCountFor('AI Traffic Characterization'),
    ...basketInfoFor('AI Traffic Characterization'),
  },
  {
    title: 'AI/ML Evaluation Framework',
    desc: 'Framework for evaluating AI/ML solutions in mobile media services.',
    href: '/testbeds/ai-ml',
    icon: iconForTitle('AI/ML Evaluation Framework'),
    tags: ['Linux'],
    repoCount: repoCountFor('AI/ML Evaluation Framework'),
    ...basketInfoFor('AI/ML Evaluation Framework'),
  },
  {
    title: 'Beyond 2D Evaluation Framework',
    desc: 'Test and evaluation framework for immersive video quality assessment.',
    href: '/testbeds/beyond-2d',
    icon: iconForTitle('Beyond 2D Evaluation Framework'),
    tags: ['Linux'],
    repoCount: repoCountFor('Beyond 2D Evaluation Framework'),
    ...basketInfoFor('Beyond 2D Evaluation Framework'),
  },
];

export default function Testbeds() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TESTBED_PROJECTS;
    return TESTBED_PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (p.tags || []).some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <Layout
      title="Testbeds"
      description="Overview of 5G-MAG testbeds and evaluation frameworks for 6G traffic characterization, AI/ML, and beyond-2D video quality assessment."
    >
      <div className="container" style={{ marginTop: '1.75rem' }}>
        <div className="topic-banner">
          <div className="topic-banner__icon-wrap">{icon(TESTBEDS_ICON_PATH)}</div>
          <div className="topic-banner__text">
            <span className="topic-banner__kicker">Software Accelerator</span>
            <h1>Testbeds and Evaluation Tools</h1>
          </div>
        </div>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            {TESTBED_PROJECTS.length > 3 && (
              <div className={filterStyles.filterBar}>
                <input
                  type="search"
                  className={filterStyles.filterInput}
                  placeholder={`Filter ${TESTBED_PROJECTS.length} testbeds by name or technology…`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Filter Testbeds"
                />
                {query && (
                  <span className={filterStyles.filterCount}>
                    {filtered.length} of {TESTBED_PROJECTS.length}
                  </span>
                )}
              </div>
            )}
            {filtered.length === 0 ? (
              <p className={filterStyles.filterEmpty}>No testbeds match &ldquo;{query}&rdquo;.</p>
            ) : (
              <div className={styles.categoryColumns}>
                <CategoryCard
                  title="Testbeds & Evaluation Frameworks"
                  desc={
                    <>
                      Access arrangements differ per testbed (some are open, others available on
                      request or through the community channels) — see{' '}
                      <Link to="/community">Developer Community</Link> for how to get in touch.
                    </>
                  }
                  topics={filtered}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
