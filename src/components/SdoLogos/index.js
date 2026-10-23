import useBaseUrl from '@docusaurus/useBaseUrl';
import { SDOS } from '@site/src/data/sdos';
import styles from './styles.module.css';

// One standards body as a white tile: its logo and name (or the name alone where it has no logo), linked to its site.
// The logos sit on white in both themes because several are dark on transparent.
export function SdoTile({ name, className = '' }) {
  const sdo = SDOS[name];
  const logo = useBaseUrl(sdo?.logo || '/');
  if (!sdo) return null;
  const label = sdo.label || (sdo.note ? `${name} (${sdo.note})` : name);
  return (
    <a className={`${styles.tile} ${className}`} href={sdo.href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {sdo.logo ? <img src={logo} alt="" className={styles.logo} /> : null}
      <span className={sdo.logo ? styles.caption : styles.name}>{label}</span>
    </a>
  );
}

// The standards bodies a project builds on, from the taxonomy's `sdos`, under the sentence that says what they are.
export default function SdoLogos({ names, heading = 'This project is based on technology developed by:' }) {
  const known = (names || []).filter((n) => SDOS[n]);
  if (known.length === 0) return null;
  return (
    <div className={styles.block}>
      <p className={styles.heading}>{heading}</p>
      <div className={styles.row}>
        {known.map((n) => (
          <SdoTile key={n} name={n} />
        ))}
      </div>
    </div>
  );
}
