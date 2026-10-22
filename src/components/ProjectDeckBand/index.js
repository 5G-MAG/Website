import useBaseUrl from '@docusaurus/useBaseUrl';
import { PROJECT_DECKS } from '@site/src/data/projectDecks';
import styles from './styles.module.css';

// The project's overview deck as a band right after the introduction of its page: the cover of the first slide, stacked
// like slides, and one button to the PDF. The band is dark in light and dark mode alike (the hero's gradient).
export default function ProjectDeckBand({ slug }) {
  const deck = PROJECT_DECKS[slug];
  const pdf = useBaseUrl(`/docs/${slug}.pdf`);
  const cover = useBaseUrl(`/assets/images/projects/${slug}-deck-cover.jpg`);
  if (!deck) return null;
  return (
    <section className={styles.band} aria-labelledby="deck-band-title">
      <div className={`container ${styles.grid}`}>
        <a className={styles.cover} href={pdf} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
          <img loading="lazy" src={cover} alt="" width="1280" height="720" />
        </a>
        <div>
          <div className={styles.eyebrow}>Overview deck</div>
          <h2 id="deck-band-title" className={styles.title}>The project at a glance</h2>
          <p className={styles.text}>
            What it is, how it works, and where the Reference Tools stand, in one deck you can share.
          </p>
          <a className={styles.button} href={pdf} target="_blank" rel="noreferrer">
            Download the deck
            <span className="sr-only"> ({deck.title})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
