import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SDOS, SDO_ORDER } from '@site/src/data/sdos';
import styles from './styles.module.css';

// The front-page row: the standards bodies behind the technologies 5G-MAG is developing. The logos sit on white tiles
// in both themes because several are dark on transparent.
function Tile({ name }) {
  const sdo = SDOS[name];
  const logo = useBaseUrl(sdo.logo || '/');
  const label = sdo.label || (sdo.note ? `${name} (${sdo.note})` : name);
  return (
    <a className={styles.tile} href={sdo.href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {sdo.logo ? <img src={logo} alt="" className={styles.logo} /> : null}
      <span className={sdo.logo ? styles.caption : styles.name}>{label}</span>
    </a>
  );
}

export default function StandardsBasedOn() {
  return (
    <section className={styles.band} aria-labelledby="based-on-title">
      <div className="container">
        <h2 id="based-on-title" className={styles.title}>
          We are currently developing technologies based on:
        </h2>
        <div className={styles.row}>
          {SDO_ORDER.map((name) => (
            <Tile key={name} name={name} />
          ))}
        </div>
        <p className={styles.more}>
          <Link to="/standards">See the specifications behind each project &rarr;</Link>
        </p>
      </div>
    </section>
  );
}
