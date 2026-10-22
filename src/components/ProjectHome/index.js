import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectPath from '@site/src/components/ProjectPath';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import ProjectDeckBand from '@site/src/components/ProjectDeckBand';
import AskAi from '@site/src/components/AskAi';
import ProjectRoadmap from '@site/src/components/ProjectRoadmap';
import { PROJECT_ROADMAPS } from '@site/src/data/projectRoadmaps';
import { ALL_PROJECTS, ALL_REPOS, displayNameOf, projectTitleOf } from '@site/src/data/baskets';
import { SDOS } from '@site/src/data/sdos';
import styles from '@site/src/pages/tech/index.module.css';

// The card of one standards body behind a project, from the taxonomy's `sdos`. The logo is decorative: the name
// is written next to it.
function SdoCard({ sdo }) {
  const logo = useBaseUrl(SDOS[sdo]?.logo || '/');
  return (
    <div className="standard-card">
      {SDOS[sdo]?.logo ? (
        <>
          <img src={logo} alt="" />
          <span className="standard-card__label">{sdo}</span>
        </>
      ) : (
        <span className="standard-card__text">{sdo}</span>
      )}
    </div>
  );
}

// The landing page every project shares (/tech/<project>), in this order: hero with the taxonomy tagline, the intro
// with cover image, why it matters, the overview deck, the three steps (Technical Analysis, Specifications, Software
// Accelerator), Standards Implemented, Open Source, Built Together, and Repositories.
// A page passes only what is its own: the intro and "why it matters" prose as children, and its icon and cover.
//   title, tagline: when the page is not named after the taxonomy project (the 6G study).
//   repoNames: the names of the tools whose repositories the page lists, when they differ from the project's own.
//   cover: the image name in /assets/images/projects, or false for a project that has none yet.
//   implemented: the curated Standards Implemented block; without it the page shows none (the taxonomy's sdos would only be the bodies it relates to).
export default function ProjectHome({
  techUrl,
  icon,
  accent,
  title: pageTitle,
  tagline,
  repoNames,
  description,
  analysisHref,
  standardsHref,
  softwareHref,
  softwareIsTestbed,
  cover,
  whyTitle = 'The Problem It Solves',
  why,
  wrapImage = true,
  repoRows = true,
  implemented,
  children,
}) {
  const project = ALL_PROJECTS.find((p) => p.tech_url === techUrl);
  const name = displayNameOf(project);              // the tool's name: it matches the repositories' projectName
  const title = pageTitle || projectTitleOf(project);   // the project's own name, the title of this page
  const slug = techUrl.split('/').pop();
  const coverImg = useBaseUrl(`/assets/images/projects/${cover || slug}.png`);
  const repoProjects = repoNames || name;
  const repoList = Array.isArray(repoProjects) ? repoProjects : [repoProjects];
  const hasRepos = ALL_REPOS.some((r) => repoList.includes(r.projectName));
  const sdos = project.sdos || [];
  const prose = (
    <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
      {children}
      {sdos.length > 0 && (
        <div className={styles.capabilityTags}>
          {sdos.map((s) => (
            <span key={s} className={styles.capabilityTag}>
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Layout title={title} description={description}>
      <HubHero
        title={title}
        icon={icon}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            {tagline || project.tagline}
          </p>,
        ]}
      />

      <main>
        <section className={`${styles.section} ${styles.sectionIntro}`}>
          <div className="container">
            {cover === false ? (
              prose
            ) : wrapImage ? (
              <>
                <img className={styles.introImageFloat} src={coverImg} alt={`${name}, project cover`} />
                {prose}
              </>
            ) : (
              <div className={styles.introGrid}>
                {prose}
                <img
                  src={coverImg}
                  alt={`${name}, project cover`}
                  style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
                />
              </div>
            )}
            <AskAi />
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
            <ProjectPath
              accent={accent}
              analysisHref={analysisHref}
              standardsHref={standardsHref}
              softwareHref={softwareHref}
              softwareIsTestbed={softwareIsTestbed}
            />
          </div>
        </section>

        {PROJECT_ROADMAPS[slug] && (
          <section className={styles.section}>
            <div className="container">
              <ProjectRoadmap slug={slug} accent={accent} />
            </div>
          </section>
        )}

        {/* Only a curated block is shown. The taxonomy's sdos name the bodies a project relates to, which is not the same as
            the standards it implements (5G MBS also implements IETF specifications through its FLUTE library). */}
        {implemented && (
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <h2 className={styles.sectionTitle}>Standards Implemented</h2>
              {implemented || (
                <>
                  <div className="standard-card-row">
                    {sdos.map((s) => (
                      <SdoCard key={s} sdo={s} />
                    ))}
                  </div>
                  {standardsHref && (
                    <p>
                      See <Link to={standardsHref}>{title}: Specification list</Link> for the specifications, their version
                      history and 5G-MAG&apos;s own standards contributions.
                    </p>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        {hasRepos && (
          <section id="repositories" className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <ProjectRepoSection projectNames={repoProjects} rows={repoRows} />
            </div>
          </section>
        )}

        <JoinTheEffort alt variant="tool" />
      </main>
    </Layout>
  );
}
