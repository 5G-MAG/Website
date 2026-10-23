import Link from '@docusaurus/Link';
import { SDO_ORDER } from '@site/src/data/sdos';
import { SdoTile } from '@site/src/components/SdoLogos';
import styles from './styles.module.css';

// The front-page row: the standards bodies behind the technologies 5G-MAG is developing, on the same tiles as the project pages.
export default function StandardsBasedOn() {
  return (
    <section className={styles.band} aria-labelledby="based-on-title">
      <div className="container">
        <h2 id="based-on-title" className={styles.title}>
          We are currently developing technologies based on:
        </h2>
        <div className={styles.row}>
          {SDO_ORDER.map((name) => (
            <SdoTile key={name} name={name} className={styles.tile} />
          ))}
        </div>
        <p className={styles.more}>
          <Link to="/standards">See the specifications behind each project &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
