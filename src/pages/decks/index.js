import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { BASKETS, ALL_PROJECTS } from '@site/src/data/baskets';
import { PROJECT_DECKS } from '@site/src/data/projectDecks';
import { GENERAL_DECKS } from '@site/src/data/generalDecks';
import styles from '../tech/index.module.css';
import deckStyles from './styles.module.css';

const ICON = (
  <>
    <path d="M3 4h18" />
    <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" />
    <path d="M12 16v4" />
    <path d="M9 20h6" />
    <path d="M8 12l3 -3l2 2l3 -3" />
  </>
);

// A deck: the cover of its first slide, its title, its length, and where to get it. The page is built from the deck data
// (src/data/projectDecks.js, src/data/generalDecks.js) and the taxonomy, so a deck added there appears here.
function DeckTile({ cover, title, pages, file, page, pageLabel, description }) {
  const pdf = useBaseUrl(file);
  const img = useBaseUrl(cover);
  return (
    <article className={deckStyles.tile}>
      <a href={pdf} target="_blank" rel="noreferrer" className={deckStyles.coverLink}>
        <img src={img} alt={`Cover slide of the deck ${title}`} width="1280" height="720" loading="lazy" className={deckStyles.cover} />
      </a>
      <h3 className={deckStyles.title}>{title}</h3>
      {description && <p className={deckStyles.desc}>{description}</p>}
      <div className={deckStyles.meta}>
        <span>{pages} slides</span>
        <span className={deckStyles.actions}>
          <a href={pdf} target="_blank" rel="noreferrer">Download (PDF)</a>
          {page && <Link to={page}>{pageLabel || 'Project page'}</Link>}
        </span>
      </div>
    </article>
  );
}

// The taxonomy project behind a deck slug (/tech/<slug>): the area it belongs to and its page title.
function projectOf(slug) {
  const matches = ALL_PROJECTS.filter((p) => (p.tech_url || '').replace(/\/$/, '').split('/').pop() === slug);
  return matches.find((p) => p.type === 'project' || p.type === 'reference-tool' || p.type === 'platform') || matches[0] || null;
}

export default function Decks() {
  const groups = BASKETS.map((b) => ({
    basket: b,
    decks: Object.entries(PROJECT_DECKS)
      .map(([slug, d]) => ({ slug, d, project: projectOf(slug) }))
      .filter((x) => x.project && x.project.basket === b.key),
  })).filter((g) => g.decks.length > 0);
  const placed = new Set(groups.flatMap((g) => g.decks.map((x) => x.slug)));
  const others = Object.entries(PROJECT_DECKS).filter(([slug]) => !placed.has(slug));

  return (
    <Layout
      title="Slide Decks"
      description="The 5G-MAG slide decks: the general decks about the programme, and one overview deck for every project, to download and present."
    >
      <HubHero title="Slide Decks" icon={ICON} />
      <main>
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionSubtitle} style={{ maxWidth: '46rem', margin: '0 auto 2rem', textAlign: 'center' }}>
              The decks 5G-MAG uses to present its work. Each one is a PDF you can download and share. The project decks are rebuilt
              from this website, so their names, repositories and releases are the ones on the pages.
            </p>
            <h2 className={styles.sectionTitle}>The programme</h2>
            <div className={deckStyles.grid}>
              {GENERAL_DECKS.map((d) => (
                <DeckTile key={d.id} cover={d.cover} title={d.title} pages={d.pages} file={d.file} description={d.description} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The projects</h2>
            {groups.map((g) => (
              <div key={g.basket.key} className={deckStyles.group}>
                <h3 className={deckStyles.groupTitle}>{g.basket.title}</h3>
                <div className={deckStyles.grid}>
                  {g.decks.map(({ slug, d, project }) => (
                    <DeckTile
                      key={slug}
                      cover={`/assets/images/projects/${slug}-deck-cover.jpg`}
                      title={d.title}
                      pages={d.pages}
                      file={`/docs/decks/${slug}.pdf`}
                      page={project.tech_url}
                    />
                  ))}
                </div>
              </div>
            ))}
            {others.length > 0 && (
              <div className={deckStyles.group}>
                <h3 className={deckStyles.groupTitle}>Other projects</h3>
                <div className={deckStyles.grid}>
                  {others.map(([slug, d]) => (
                    <DeckTile
                      key={slug}
                      cover={`/assets/images/projects/${slug}-deck-cover.jpg`}
                      title={d.title}
                      pages={d.pages}
                      file={`/docs/decks/${slug}.pdf`}
                      page={`/tech/${slug}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <JoinTheEffort alt variant="tool" />
      </main>
    </Layout>
  );
}
