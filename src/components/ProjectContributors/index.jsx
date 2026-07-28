import useBaseUrl from '@docusaurus/useBaseUrl';
import projects from '@site/src/data/projects.json';
import { CONTRIBUTORS } from '@site/src/data/contributors';
import styles from '@site/src/pages/tech/index.module.css';

function ContributorLogo({ company }) {
  const c = CONTRIBUTORS.find((entry) => entry.name === company);
  const logoSrc = useBaseUrl(c ? `/assets/images/contributors/${c.logo}` : undefined);
  if (!c) {
    return (
      <span className={styles.memberCard} title={company}>
        <span className={styles.memberCardLabel}>{company}</span>
      </span>
    );
  }
  return (
    <a href={c.href} target="_blank" rel="noreferrer" title={c.name} className={styles.memberCard}>
      <img src={logoSrc} alt={c.name} loading="lazy" />
      <span className={styles.memberCardLabel}>{c.name.split(' - ')[0]}</span>
    </a>
  );
}

// Company-level contributor credit for one Reference Tools/Testbeds
// project, sourced from `projects.json`'s `contributors` field (derived
// from actual commit/PR authorship cross-referenced against GitHub CLA
// team membership, then reviewed and corrected manually — see the
// per-project mapping review done 2026-07-28). Not every project has
// this field populated (e.g. Common Tools, 3GPP RAN and Core Platforms,
// Dependency were deliberately excluded), so this renders nothing rather
// than an empty section when there's no data for `name`.
export default function ProjectContributors({ name }) {
  const project = projects.find((p) => p.name === name);
  const contributors = project?.contributors;

  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <div className={styles.membersGrid}>
      {contributors.map((company) => (
        <ContributorLogo key={company} company={company} />
      ))}
    </div>
  );
}
