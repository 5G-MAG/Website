import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { ALL_PROJECTS, BASKET_ACCENT } from '@site/src/data/baskets';
import styles from '../tech/index.module.css';
// Shared with /reference-tools and /showcase; see the comment there
// for why (2026-08-24 findability audit; extended here 2026-08-25).
import filterStyles from '../reference-tools/styles.module.css';
// The exact same gradient-header-plus-grid card, topic-building function
// and TOPIC_META entries /reference-tools uses -- reused rather than
// copied, so the two can't drift apart (direct instruction: "same
// format... same search bar and everything").
import { CategoryCard, topicFor } from '../reference-tools';

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
      <HubHero
        title="Testbeds & Evaluation Frameworks"
        icon={TESTBEDS_ICON_PATH}
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
            <p className={filterStyles.filterLabel}>Looking for a specific testbed or technology?</p>
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
              <p className={filterStyles.filterEmpty}>
                No testbeds match &ldquo;{query}&rdquo;. Try a broader technology name (e.g. &ldquo;AI&rdquo;
                or &ldquo;video&rdquo;).
              </p>
            ) : (
              <div className={styles.categoryColumns}>
                <CategoryCard
                  title="Testbeds & Evaluation Frameworks"
                  accent={BASKET_ACCENT.testbeds}
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

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
