import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ALL_PROJECTS as projects } from '@site/src/data/baskets';
import { CONTRIBUTORS } from '@site/src/data/contributors';
import { stripBaseUrl } from '@site/src/data/sectionNav';
import styles from './styles.module.css';

// Always the last card, same size/shape as a real logo card, so it reads
// as "join this list" rather than a separate unrelated callout -- direct
// instruction: "one more card in the same style as the contributor logo".
// /contributing is the real, already-linked destination for this
// (src/data/sectionNav.js's own Community menu entry), not a guessed URL.
function BecomeContributorCard() {
  return (
    <Link to="/contributing" className={`${styles.card} ${styles.ctaCard}`}>
      <span className={styles.ctaIcon} aria-hidden="true">
        +
      </span>
      <span className={styles.label}>Become a Contributor</span>
    </Link>
  );
}

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

// Company-level contributor credit, sourced from taxonomy.json's
// `contributors` field (derived from actual commit/PR authorship
// cross-referenced against GitHub CLA team membership, then reviewed and
// corrected manually — see the per-project mapping review done
// 2026-07-28). Not every project has this field populated (e.g. Common
// Tools, 3GPP RAN and Core Platforms, Dependency were deliberately
// excluded), so a resolved project with no contributors yet still renders
// -- just the trailing "Become a Contributor" card alone, which is arguably
// the single most useful place for it (nobody credited yet is exactly
// where asking for one matters most). Only a genuinely unresolved project
// (a caller-supplied `name` that doesn't exist) renders nothing at all.
//
// Resolves its own project by matching the current page's own route
// against that project's taxonomy.json `doc_url` OR `tech_url` -- not a
// `name` prop a caller has to type out and keep in sync by hand. `name`'s
// taxonomy.json role is a "stable key ... careful" (baskets.js's own
// header comment) precisely because the admin tool lets it be renamed; a
// hardcoded prop string here would silently stop matching the moment
// that happened, the same class of drift already found and fixed
// elsewhere this session (SHARED_REPO_OWNERS, per-project /tech page
// lookups). `doc_url`/`tech_url` are each effectively pinned by the page's
// own existence at that route, so there is nothing here left to fall out
// of sync -- checking both lets the same component work unmodified on a
// project's Reference Tools doc page (doc_url) and its /tech flagship
// page (tech_url). An explicit `name` prop is still honoured, for a page
// that deliberately wants a specific project's credits regardless of its
// own route (none currently do). With neither a resolvable project nor
// an explicit `name`, renders the full site-wide contributor roster
// instead (e.g. /license) -- always current, unlike the static logo
// image this replaced.
// `doc_url` values in taxonomy.json carry a trailing slash (matching a
// Docusaurus index route's real pathname exactly); `tech_url` values
// don't. Comparing with any trailing slash stripped from both sides
// makes the match work for either field regardless of that convention
// difference, rather than assuming one page shape.
const withoutTrailingSlash = (s) => (s && s !== '/' ? s.replace(/\/$/, '') : s);

export default function ProjectContributors({ name }) {
  const { pathname: rawPathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const pathname = withoutTrailingSlash(stripBaseUrl(rawPathname, siteConfig.baseUrl));

  let contributors;
  if (name) {
    const project = projects.find((p) => p.name === name);
    contributors = project?.contributors;
  } else {
    const project = projects.find(
      (p) => withoutTrailingSlash(p.doc_url) === pathname || withoutTrailingSlash(p.tech_url) === pathname
    );
    contributors = project ? project.contributors || [] : CONTRIBUTORS.map((c) => c.name);
  }

  if (!contributors) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {contributors.map((company) => (
        <ContributorLogo key={company} company={company} />
      ))}
      <BecomeContributorCard />
    </div>
  );
}
