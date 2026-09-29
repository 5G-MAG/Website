import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// A project's Reference Tools or Testbed slide (from the 5G-MAG deck's
// Project Covers section) beside the page's description, the way the /tech
// pages show their cover; below the text on narrow screens.
export default function ProjectSlide({ image, alt, children }) {
  return (
    <div className={styles.grid}>
      <div className={styles.text}>{children}</div>
      <img className={`${styles.slide} project-slide`} src={useBaseUrl(image)} alt={alt} loading="lazy" width="1280" height="720" />
    </div>
  );
}
