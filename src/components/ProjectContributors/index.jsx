import useBaseUrl from '@docusaurus/useBaseUrl';
import projects from '@site/src/data/projects.json';
import { CONTRIBUTORS } from '@site/src/data/contributors';
import styles from './styles.module.css';

function ContributorLogo({ company }) {
  const c = CONTRIBUTORS.find((entry) => entry.name === company);
  const logoSrc = useBaseUrl(c ? `/assets/images/contributors/${c.logo}` : undefined);
  if (!c) {
    return (
      <span className={styles.card} title={company}>
        <span className={styles.label}>{company}</span>
      </span>
    );
  }
  return (
    <a href={c.href} target="_blank" rel="noreferrer" title={c.name} className={styles.card}>
      <img src={logoSrc} alt={c.name} loading="lazy" />
      <span className={styles.label}>{c.name.split(' - ')[0]}</span>
    </a>
  );
}

// Company-level contributor credit. With a project `name`, sourced from
// `projects.json`'s `contributors` field (derived from actual commit/PR
// authorship cross-referenced against GitHub CLA team membership, then
// reviewed and corrected manually — see the per-project mapping review
// done 2026-07-28). Not every project has this field populated (e.g.
// Common Tools, 3GPP RAN and Core Platforms, Dependency were deliberately
// excluded), so this renders nothing rather than an empty section when
// there's no data for `name`. Without a `name`, renders the full
// site-wide contributor roster instead (e.g. /license) -- always current,
// unlike the static logo image this replaced.
export default function ProjectContributors({ name }) {
  let contributors;
  if (name) {
    const project = projects.find((p) => p.name === name);
    contributors = project?.contributors;
  } else {
    contributors = CONTRIBUTORS.map((c) => c.name);
  }

  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {contributors.map((company) => (
        <ContributorLogo key={company} company={company} />
      ))}
    </div>
  );
}
