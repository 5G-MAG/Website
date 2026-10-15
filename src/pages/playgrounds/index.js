import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import {
  CATEGORIES as PROJECT_CATEGORIES,
  CategoryCard as ProjectCategoryCard,
  filterCategories as filterProjectCategories,
} from '../reference-tools';
import { TUTORIAL_SLUGS } from '@site/src/data/playgrounds';
import styles from '../tech/index.module.css';
import filterStyles from '../reference-tools/styles.module.css';

// Playgrounds: where you try a technology yourself. Today each entry is a project's step-by-step tutorials; ready
// environments with nothing to install will join the same list. Each entry opens that project's tutorials page
// (at <Reference Tools page>/tutorials).
const PLAYGROUND_CATEGORIES = PROJECT_CATEGORIES.map((c) => ({
  ...c,
  desc: 'Step-by-step tutorials for the projects in this area.',
  topics: c.topics
    .filter((t) => TUTORIAL_SLUGS.includes(t.href.replace('/reference-tools/', '')))
    .map((t) => ({ ...t, href: `${t.href}/tutorials` })),
})).filter((c) => c.topics.length > 0);
const PLAYGROUND_COUNT = PLAYGROUND_CATEGORIES.reduce((n, c) => n + c.topics.length, 0);

const PLAY_ICON_PATH = <path d="M7 4v16l13 -8l-13 -8" />;

export default function Playgrounds() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => filterProjectCategories(PLAYGROUND_CATEGORIES, query), [query]);
  const shown = useMemo(() => filtered.reduce((n, c) => n + c.topics.length, 0), [filtered]);

  return (
    <Layout
      title="Playgrounds"
      description="Try a 5G-MAG technology yourself: step-by-step tutorials for each project, and ready environments as they arrive."
    >
      <HubHero
        title="Playgrounds"
        icon={PLAY_ICON_PATH}
        actions={[
          <Link key="tools" className="button button--primary" to="/reference-tools">
            Reference Tools
          </Link>,
          <Link key="community" className="button button--outline button--primary" to="/community">
            Ask the community
          </Link>,
          <Link key="early-access" className="button button--outline button--primary" to="/early-access">
            Early Access
          </Link>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionSubtitle}>
              A Playground is where you try a technology yourself. Today each one is a project&apos;s step-by-step
              tutorials, from running the tool to testing it end to end. Ready environments with nothing to install
              will join this list.
            </p>
            <p className={filterStyles.filterLabel}>Each project&apos;s Playground</p>
            <div className={filterStyles.filterBar}>
              <input
                type="search"
                className={filterStyles.filterInput}
                placeholder={`Filter ${PLAYGROUND_COUNT} projects by name or technology…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Filter Playgrounds by project"
              />
              {query && (
                <span className={filterStyles.filterCount}>
                  {shown} of {PLAYGROUND_COUNT}
                </span>
              )}
            </div>
            {filtered.length === 0 ? (
              <p className={filterStyles.filterEmpty}>No projects match &ldquo;{query}&rdquo;.</p>
            ) : (
              <div className={styles.categoryColumns}>
                {filtered.map((c) => (
                  <ProjectCategoryCard key={c.title} {...c} />
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
