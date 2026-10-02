import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { CATEGORIES as PROJECT_CATEGORIES, CategoryCard as ProjectCategoryCard, filterCategories as filterProjectCategories } from '../reference-tools';

// The Reference Tools project boxes, for the projects that have an Application Showcase page (their
// list of Application Showcases, at <Reference Tools page>/tutorials); each card opens that page.
const APPLICATION_SHOWCASE_SLUGS = [
  '5gms', 'data-collection', 'content-delivery', '5g-broadcast', 'emergency-alerts', 'dvb-i', '5g-mbs',
  'xr', 'v3c', 'vdmc', 'avatar', 'network-apis', '5g-core', '3gpp-platforms',
];
const SHOWCASE_CATEGORIES = PROJECT_CATEGORIES.map((c) => ({
  ...c,
  topics: c.topics
    .filter((t) => APPLICATION_SHOWCASE_SLUGS.includes(t.href.replace('/reference-tools/', '')))
    .map((t) => ({ ...t, href: `${t.href}/tutorials` })),
})).filter((c) => c.topics.length > 0);
const SHOWCASE_PROJECT_COUNT = SHOWCASE_CATEGORIES.reduce((n, c) => n + c.topics.length, 0);
import styles from '../tech/index.module.css';
// Shared with /reference-tools, which the filter bar pattern below was
// first built for (2026-08-24 findability audit); reused here rather than
// duplicated, same cross-directory-module convention as the `styles`
// import above (../tech/index.module.css).
import filterStyles from '../reference-tools/styles.module.css';

// The Application Showcases rocket (src/data/projectIcons.js).
const APPS_ICON_PATH = (
  <>
    <path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z" />
    <path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z" />
    <path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0" />
    <path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5" />
  </>
);

export default function Applications() {
  const [projectQuery, setProjectQuery] = useState('');
  const filteredProjects = useMemo(() => filterProjectCategories(SHOWCASE_CATEGORIES, projectQuery), [projectQuery]);
  const shownProjects = useMemo(() => filteredProjects.reduce((n, c) => n + c.topics.length, 0), [filteredProjects]);

  return (
    <Layout
      title="Showcases"
      description="Overview of 5G-MAG’s application areas: streaming, broadcast, multicast, XR, volumetric video, and network APIs."
    >
      <HubHero
        title="Application Showcases"
        icon={APPS_ICON_PATH}
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
            <p className={filterStyles.filterLabel}>Each project&apos;s Application Showcases</p>
            <div className={filterStyles.filterBar}>
              <input
                type="search"
                className={filterStyles.filterInput}
                placeholder={`Filter ${SHOWCASE_PROJECT_COUNT} projects by name or technology…`}
                value={projectQuery}
                onChange={(e) => setProjectQuery(e.target.value)}
                aria-label="Filter Application Showcases by project"
              />
              {projectQuery && (
                <span className={filterStyles.filterCount}>
                  {shownProjects} of {SHOWCASE_PROJECT_COUNT}
                </span>
              )}
            </div>
            {filteredProjects.length === 0 ? (
              <p className={filterStyles.filterEmpty}>No projects match &ldquo;{projectQuery}&rdquo;.</p>
            ) : (
              <div className={styles.categoryColumns}>
                {filteredProjects.map((c) => (
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
