import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import { TECH_OVERVIEW } from '@site/src/data/techOverviews';
import { ISSUE_TRACKER_GROUPS } from '@site/src/data/specs/issueTrackerProjects';
import styles from '@site/src/components/ToolStartHere/styles.module.css';

// The block every project's standards page opens with, under its banner: what the technology is, which bodies
// specify it, and where to go next (Technology, Software, release history, open issues). Everything comes from the
// taxonomy and from which pages exist, so it cannot drift from the rest of the site. Found from the page's address.
export default function StandardsStartHere() {
  const { pathname } = useLocation();
  const docs = Object.values(useAllDocsData()).flatMap((p) => p.versions.flatMap((v) => v.docs.map((d) => d.path)));
  const url = pathname.replace(/\/$/, '');
  const projects = ALL_PROJECTS.filter((p) => (p.standards_url || '').replace(/\/$/, '') === url);
  if (projects.length === 0) return null;

  const main = projects.find((p) => p.type === 'project') || projects[0];
  const sdos = main.sdos || [];
  const tech = TECH_OVERVIEW[main.tech_url] || main.tech_url;
  const software = projects.map((p) => p.doc_url).find(Boolean);
  const slug = url.split('/').pop();
  const evolution = docs.includes(`${url}/evolution`) ? `${url}/evolution` : null;
  const tracked = ISSUE_TRACKER_GROUPS.some((g) => g.key === slug);

  const rows = [
    main.tagline && ['What it is', main.tagline],
    sdos.length > 0 && ['Specified by', sdos.join(', ')],
  ].filter(Boolean);

  return (
    <aside className={styles.box} aria-label="Start here: this standard">
      <div className={styles.head}>Start here</div>
      <dl className={styles.facts}>
        {rows.map(([k, v]) => (
          <div key={k} className={styles.fact}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.actions}>
        {tech && (
          <Link className="button button--primary button--sm" to={tech}>
            Technical Analysis
          </Link>
        )}
        {software && (
          <Link className="button button--outline button--primary button--sm" to={software}>
            Software
          </Link>
        )}
        {evolution && (
          <Link className="button button--outline button--primary button--sm" to={evolution}>
            Release history
          </Link>
        )}
        {tracked && (
          <Link className="button button--outline button--primary button--sm" to="/standards/3gpp-issue-tracking">
            Open issues
          </Link>
        )}
        <Link className="button button--outline button--primary button--sm" to="/community">
          Ask the community
        </Link>
      </div>
    </aside>
  );
}
