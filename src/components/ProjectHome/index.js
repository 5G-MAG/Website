import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import ProjectDeckBand from '@site/src/components/ProjectDeckBand';
import { ALL_PROJECTS, ALL_REPOS, displayNameOf, projectTitleOf } from '@site/src/data/baskets';
import styles from '@site/src/pages/tech/index.module.css';

// The landing page every project shares (/tech/<project>): hero with the taxonomy tagline, the
// intro with cover image, why it matters, the Documentation and Software sections, contributors, and repositories.
// A page passes only what is its own: the intro and "why it matters" prose as children, and its icon and cover.
export default function ProjectHome({
  techUrl,
  icon,
  accent,
  description,
  analysisHref,
  standardsHref,
  softwareHref,
  softwareIsTestbed,
  cover,
  whyTitle = 'The Problem It Solves',
  why,
  children,
}) {
  const project = ALL_PROJECTS.find((p) => p.tech_url === techUrl);
  const name = displayNameOf(project);              // the tool's name: it matches the repositories' projectName
  const title = projectTitleOf(project);            // the project's own name, the title of this page
  const slug = techUrl.split('/').pop();
  const coverImg = useBaseUrl(`/assets/images/projects/${cover || slug}.png`);
  const hasRepos = ALL_REPOS.some((r) => r.projectName === name);

  return (
    <Layout title={title} description={description}>
      <HubHero
        title={title}
        icon={icon}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            {project.tagline}
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.introGrid}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                {children}
                {project.sdos?.length > 0 && (
                  <div className={styles.capabilityTags}>
                    {project.sdos.map((s) => (
                      <span key={s} className={styles.capabilityTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <img
                src={coverImg}
                alt={`${name}, project cover`}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            {why && (
              <div className={styles.whyMattersBlock}>
                <h2 className={styles.whyMattersTitle}>{whyTitle}</h2>
                {why}
              </div>
            )}
          </div>
        </section>

        <ProjectDeckBand slug={slug} />

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={accent}
              analysisHref={analysisHref}
              standardsHref={standardsHref}
              softwareHref={softwareHref}
              softwareIsTestbed={softwareIsTestbed}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        {hasRepos && (
          <section id="repositories" className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <ProjectRepoSection projectNames={name} accent={accent} />
            </div>
          </section>
        )}

        <JoinTheEffort alt variant="tool" />
      </main>
    </Layout>
  );
}
