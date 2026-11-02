import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { icon } from '@site/src/components/GodeeperCard';
import styles from './styles.module.css';

const SIGN_ICON_PATH = (
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    <path d="M9 15l2 2l4 -4" />
  </>
);

export default function BecomeContributorBanner() {
  const cla = useBaseUrl('/Getting-Started/OFFICIAL_5G-MAG_Contributor_License_Agreement.pdf');
  const ccla = useBaseUrl('/Getting-Started/OFFICIAL_5G-MAG_Corporate_Contributor_License_Agreement.pdf');
  return (
    <section className={styles.banner} aria-labelledby="become-contributor-title">
      <div className={styles.iconWrap}>{icon(SIGN_ICON_PATH)}</div>
      <div className={styles.body}>
        <span className={styles.kicker}>Open to the industry, no membership needed</span>
        <h3 id="become-contributor-title" className={styles.title}>
          Become a contributor
        </h3>
        <p className={styles.desc}>
          Sign the Contributor License Agreement (CLA) and have it on file with 5G-MAG, and your
          code can be merged into the Reference Tools.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/community#becoming-a-contributor">
            Become a contributor &rarr;
          </Link>
          <a className={styles.ghost} href={cla} target="_blank" rel="noreferrer">
            Download the CLA (individual)
          </a>
          <a className={styles.ghost} href={ccla} target="_blank" rel="noreferrer">
            Download the CCLA (corporate)
          </a>
        </div>
      </div>
    </section>
  );
}
