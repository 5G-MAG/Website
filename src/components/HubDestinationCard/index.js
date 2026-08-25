import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// The shared "big destination card" used at the top of each hub page for
// its real, top-level browsable content -- e.g. /developer's Reference
// Tools/Testbeds/Applications, /action's Demos/Testing Events. See
// styles.module.css for why this exists as one component rather than
// four near-identical copies.
export default function HubDestinationCard({ icon, title, desc, href, linkLabel = 'Explore more' }) {
  return (
    <Link className={styles.card} to={href}>
      <div className={styles.iconBand}>
        {icon}
        <h3 className={styles.bandTitle}>{title}</h3>
      </div>
      <div className={styles.body}>
        <p className={styles.desc}>{desc}</p>
      </div>
      <div className={styles.footer}>{linkLabel} &rarr;</div>
    </Link>
  );
}
