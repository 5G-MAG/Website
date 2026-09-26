import roadmapData from '@site/static/data/roadmaps.json';
import styles from './styles.module.css';

// A project's own "next steps": static/data/roadmaps.json filtered to the
// items whose real, org-curated `labels` match this project's `topics`.
//
// Every item in roadmaps.json links to github.com/5G-MAG/Tech/issues/<n> --
// one shared planning repo, never a project's own code repo, so there is no
// structural way to filter "this project's items" from the URL alone
// (verified directly, see the project plan's "Correction 2"). Labels are the
// only real, already-fetched signal that ties an item to a technology area
// (e.g. "Topic: Streaming & Media Delivery"), so `topics` is a hand-curated
// list of such labels, kept on the calling project's own taxonomy.json entry
// (`roadmapTopics`) -- not derived here, since it isn't mechanically
// derivable today. See the project plan's GitHub-roadmap proposal for the
// process change that would let this become a direct project-name match
// instead of a hand-maintained label list.
//
// Reuses CommunityRoadmap's own status-grouping logic (not re-derived) so
// the two components can't quietly disagree on how statuses are ordered.
const STATUS_ORDER = ['In Progress', 'Backlog', 'Todo', 'Done', 'No Status'];

function groupByStatus(items) {
  const groups = new Map();
  for (const item of items) {
    const key = item.status || 'No Status';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const orderedKeys = [
    ...STATUS_ORDER.filter((s) => groups.has(s)),
    ...[...groups.keys()].filter((s) => !STATUS_ORDER.includes(s)),
  ];
  return orderedKeys.map((status) => ({ status, items: groups.get(status) }));
}

function ItemCard({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className={styles.itemCard}>
      <span className={styles.itemTitle}>{item.title}</span>
      {item.labels.length > 0 && (
        <span className={styles.labelRow}>
          {item.labels.map((label) => (
            <span key={label} className={styles.labelPill}>
              {label}
            </span>
          ))}
        </span>
      )}
    </a>
  );
}

function StatusColumn({ status, items }) {
  return (
    <div className={styles.statusColumn}>
      <div className={styles.statusColumnHeader}>
        <h4 className={styles.statusColumnTitle}>{status}</h4>
        <span className={styles.statusCount}>{items.length}</span>
      </div>
      <div className={styles.itemList}>
        {items.map((item) => (
          <ItemCard key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectRoadmap({ topics = [] }) {
  const matched = roadmapData.items.filter((item) => item.labels.some((l) => topics.includes(l)));

  return (
    <>
      <p>
        Items from the{' '}
        <a href="https://github.com/orgs/5G-MAG/projects/48" target="_blank" rel="noreferrer">
          Reference Tools Roadmaps board
        </a>{' '}
        tagged {topics.map((t) => `"${t}"`).join(' or ')}.
        {roadmapData.updated_at ? ` Updated: ${roadmapData.updated_at}.` : ' Not yet synced.'}
      </p>
      {matched.length === 0 ? (
        <p>
          No labelled items match right now — see the{' '}
          <a href="https://github.com/orgs/5G-MAG/projects/48" target="_blank" rel="noreferrer">
            full org roadmap
          </a>
          .
        </p>
      ) : (
        <div className={styles.board}>
          {groupByStatus(matched).map((group) => (
            <StatusColumn key={group.status} status={group.status} items={group.items} />
          ))}
        </div>
      )}
    </>
  );
}
