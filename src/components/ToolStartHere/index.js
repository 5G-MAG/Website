import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { projectBySlug, reposFor, repoMetaFor, releaseInfoFor, displayNameOf } from '@site/src/data/baskets';
import { tutorialsUrlFor, implementationUrlFor } from '@site/src/data/tutorialPages';
import styles from './styles.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// An ISO date as "15 Oct 2026", the same on the server and in the browser.
function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : null;
}

// The facts a developer wants first, on the landing page of every tool (Reference Tool, testbed, validation tool):
// what it is, how to try it, the latest release, who can get the code, the licence, and where to ask. Facts that are
// not known are left out, not guessed. Found from the page's address.
export default function ToolStartHere() {
  const { pathname } = useLocation();
  const match = /^\/(reference-tools|testbeds|validation)\/([^/]+)\/?$/.exec(pathname);
  if (!match) return null;
  const project = projectBySlug(match[2]);
  if (!project || !project.doc_url) return null;

  const repos = reposFor(project);
  const metas = repos.map(repoMetaFor).filter(Boolean);
  const publicCount = metas.filter((m) => m.public).length;
  const licences = [...new Set(metas.map((m) => m.license).filter((l) => l && l !== 'Multiple'))];
  const { count, latestDate } = releaseInfoFor(project);
  const latest = formatDate(latestDate);
  const tutorials = tutorialsUrlFor(project.doc_url);
  const implementation = implementationUrlFor(project.doc_url);

  const rows = [
    project.tagline && ['What it is', project.tagline],
    latest && ['Latest release', `${latest}${count > 1 ? `, across ${count} releases` : ''}`],
    metas.length > 0 && [
      'Code',
      publicCount === metas.length ? (
        `All ${metas.length} ${metas.length === 1 ? 'repository is' : 'repositories are'} public.`
      ) : (
        <>
          {publicCount} of {metas.length} repositories are public. The others are in{' '}
          <Link to="/early-access">Early Access</Link>.
        </>
      ),
    ],
    licences.length > 0 && ['Licence', licences.join(', ')],
  ].filter(Boolean);

  return (
    <aside className={styles.box} aria-label={`Start here: ${displayNameOf(project)}`}>
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
        {tutorials && (
          <Link className="button button--primary button--sm" to={tutorials}>
            Tutorials
          </Link>
        )}
        {implementation && (
          <Link className="button button--outline button--primary button--sm" to={implementation}>
            Implementation detail
          </Link>
        )}
        <Link className="button button--outline button--primary button--sm" to="#repositories--releases">
          Repositories
        </Link>
        <Link className="button button--outline button--primary button--sm" to="/community">
          Ask the community
        </Link>
      </div>
    </aside>
  );
}
