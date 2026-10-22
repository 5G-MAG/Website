import useBaseUrl from '@docusaurus/useBaseUrl';
import { PROJECT_DECKS } from '@site/src/data/projectDecks';

// The project's slide deck: the cover of its first slide, linking to the PDF.
export default function ProjectDeck({ slug, heading = true }) {
  const deck = PROJECT_DECKS[slug];
  const pdf = useBaseUrl(`/docs/${slug}.pdf`);
  const cover = useBaseUrl(`/assets/images/projects/${slug}-deck-cover.jpg`);
  if (!deck) return null;
  return (
    <div>
      {heading && <h2 style={{ marginBottom: '0.75rem' }}>Slide Deck</h2>}
      <div className="event-post-grid" style={{ gridTemplateColumns: 'minmax(0, 36rem)' }}>
        <a className="event-post-card" href={pdf} target="_blank" rel="noreferrer">
          <img loading="lazy" src={cover} alt={`Cover slide of the ${deck.title} deck`} width="1280" height="720" style={{ height: 'auto' }} />
          <span className="event-post-title">{deck.title}: overview and updates (PDF, {deck.pages} slides)</span>
        </a>
      </div>
    </div>
  );
}
