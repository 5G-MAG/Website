import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import styles from '../tech/index.module.css';
// Shared with /reference-tools and /showcase; see the comment there
// for why (2026-08-24 findability audit; extended here 2026-08-25).
import filterStyles from '../reference-tools/styles.module.css';
// The exact same gradient-header-plus-grid card, topic-building function
// and TOPIC_META entries /reference-tools uses -- reused rather than
// copied, so the two can't drift apart (direct instruction: "same
// format... same search bar and everything").
import { CategoryCard, topicFor } from '../reference-tools';

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

// Every doc_url'd project in the testbeds basket -- same "no second
// hand-maintained array to drift" reasoning as reference-tools/index.js's
// own REFTOOLS_PROJECTS, and the exact complement of that filter, so a
// project can never silently vanish from both pages or appear on neither.
const TESTBED_PROJECTS = ALL_PROJECTS.filter((p) => p.doc_url && p.basket === 'testbeds').map(topicFor);

export default function Testbeds() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TESTBED_PROJECTS;
    return TESTBED_PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (p.standards || []).some((s) => s.toLowerCase().includes(q)) ||
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
