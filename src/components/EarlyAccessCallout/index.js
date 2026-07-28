import Link from '@docusaurus/Link';
import { icon } from '@site/src/components/GodeeperCard';
import styles from './styles.module.css';

const LOCK_ICON_PATH = (
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
  </>
);

export default function EarlyAccessCallout() {
  return (
    <div className={styles.callout}>
      <div className={styles.iconWrap}>{icon(LOCK_ICON_PATH)}</div>
      <div className={styles.body}>
        <span className={styles.kicker}>Only for 5G-MAG Members and under invitation</span>
        <h3 className={styles.title}>Early Access</h3>
        <p className={styles.desc}>
          Selected projects are set to private. Request access below — every request is reviewed
          manually, case by case.
        </p>

        <Link className="button button--primary" to="/early-access">
          Request Early Access &rarr;
        </Link>
      </div>
    </div>
  );
}
