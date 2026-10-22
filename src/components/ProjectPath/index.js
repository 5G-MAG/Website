import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { familyForPath } from '@site/src/utils/projectFamily';
import { TECH_OVERVIEW } from '@site/src/data/techOverviews';
import { TECH_PAGES } from '@site/src/data/techPages';
import { TOOL_KINDS } from '@site/src/components/ToolsByKind';
import { ICON_CATALOG, displayNameOf } from '@site/src/data/baskets';
import { Icon, kindLabelOf } from '@site/src/components/ListRow';
import styles from './styles.module.css';

const trim = (url) => url.replace(/\/$/, '');

// The names of the links are the names of the side menu (Overview, Architecture, Features, Procedures; Specification list, Release
// history; Repositories, Implementation status, Tutorials), so a card and the menu say the same thing about the same page.
// The block every project page shares, in three steps: Learn (Technical Analysis), Standards (Specifications) and Build
// (Software Accelerator). Each step is a card with a few links into what is behind it, and only the links to pages that
// exist are shown, so a project with one analysis page and one tool gets a short card, not an empty one.
export default function ProjectPath({ analysisHref, standardsHref, softwareHref, softwareIsTestbed = false }) {
  const { pathname } = useLocation();
  const docs = new Set(Object.values(useAllDocsData()).flatMap((p) => p.versions.flatMap((v) => v.docs.map((d) => trim(d.path)))));
  const exists = (url) => docs.has(trim(url));
  const family = familyForPath(pathname);

  const techUrl = TECH_OVERVIEW[analysisHref] ? analysisHref : family.find((p) => p.tech_url)?.tech_url;
  const pages = TECH_PAGES[techUrl] || { overview: TECH_OVERVIEW[techUrl] || analysisHref };
  const learn = [
    ['Overview', pages.overview],
    ['Architecture', pages.architecture],
    ['Features', pages.features],
    ['Procedures', pages.procedures],
  ].filter(([, to]) => to && (to === analysisHref || exists(to)));

  const specs = [
    ['Specification list', standardsHref],
    ['Release history', standardsHref && `${trim(standardsHref)}/evolution`],
  ].filter(([label, to]) => to && (label === 'Specification list' || exists(to)));

  const tools = TOOL_KINDS.flatMap((k) =>
    family.filter((p) => k.test(p) && !p.partOf && (!softwareIsTestbed || trim(p.doc_url || '') === trim(softwareHref || '')))
  );
  const built = tools.filter((p) => p.doc_url);
  const build =
    built.length === 1
      ? [
          ['Repositories', trim(built[0].doc_url)],
          ['Implementation status', `${trim(built[0].doc_url)}/implementation`],
          ['Tutorials', `${trim(built[0].doc_url)}/tutorials`],
        ].filter(([label, to]) => label === 'Repositories' || exists(to))
      : built.map((p) => [displayNameOf(p), trim(p.doc_url), kindLabelOf(p)]);

  const steps = [
    analysisHref && {
      label: 'Learn',
      title: 'Technical Analysis',
      desc: 'How this technology works, and what it is good for.',
      links: learn,
      icon: ICON_CATALOG['doc-report'],
    },
    standardsHref && {
      label: 'Standards',
      title: 'Specifications',
      desc: 'The specifications this technology is built on.',
      links: specs,
      icon: ICON_CATALOG.certificate,
    },
    {
      label: 'Build',
      title: 'Software Accelerator',
      desc: built.length ? 'The open-source software that implements it.' : null,
      links: build,
      icon: ICON_CATALOG[built[0]?.icon] || ICON_CATALOG['doc-report'],
    },
  ].filter(Boolean);

  return (
    <div>
      <h2 className={styles.title}>From idea to running code</h2>
      <p className={styles.sub}>Read it, check it against the standard, then run it.</p>
      <div className={styles.path}>
        {steps.map((s, i) => (
          <div key={s.label} className={`${styles.step} ${styles['step' + (i + 1)]}`}>
            <span className={styles.num}>{i + 1}</span>
            <div className={styles.eyebrow}>{s.label}</div>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            {s.desc && <p className={styles.desc}>{s.desc}</p>}
            {s.links.length === 0 ? (
              <p className={styles.desc}>
                No tool has been published for this project yet. See the <Link to="/developer">Software Accelerator</Link> for what the
                programme builds, or <Link to="/contributing">contribute</Link> to build one.
              </p>
            ) : (
              <ul className={styles.links}>
                {s.links.map(([label, to, kind]) => (
                  <li key={label + to}>
                    <Link to={to}>
                      <span>
                        {label}
                        {kind && <span className={styles.kind}>{kind}</span>}
                      </span>
                      <span className={styles.arrow} aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
