import Link from '@docusaurus/Link';
import { icon } from '@site/src/components/GodeeperCard';
import { EARLY_ACCESS_PROJECTS } from '@site/src/data/earlyAccessProjects';
import styles from './styles.module.css';

const LOCK_ICON_PATH = (
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
  </>
);

// Shared across Home (compact), /developer and /membership (full) so the
// three projects currently gated and the review-process wording can't drift
// into three different stories about the same thing.
export default function EarlyAccessCallout({ compact = false }) {
  return (
    <div className={styles.callout}>
      <div className={styles.iconWrap}>{icon(LOCK_ICON_PATH)}</div>
      <div className={styles.body}>
        <span className={styles.kicker}>Members &amp; Contributors</span>
        <h3 className={styles.title}>Early Access to What&apos;s Next</h3>
        <p className={styles.desc}>
          Selected projects are still in development and set to private. Request access below —
          every request is reviewed manually, case by case.
        </p>

        {!compact && (
          <ul className={styles.projectList}>
            {EARLY_ACCESS_PROJECTS.map((p) => (
              <li key={p.href}>
                <Link to={p.href}>{p.name}</Link>
              </li>
            ))}
          </ul>
        )}

        <Link className="button button--primary" to="/early-access">
          Request Early Access &rarr;
        </Link>
      </div>
    </div>
  );
}
