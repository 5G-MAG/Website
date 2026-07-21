import Layout from '@theme/Layout';
import roadmapData from '@site/static/data/roadmaps.json';
import styles from './roadmap.module.css';

// Fixed display order for the statuses this project board actually uses;
// anything else (custom or renamed statuses) is appended after, so a board
// change surfaces a new column instead of silently dropping items.
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
        <h2 className={styles.statusColumnTitle}>{status}</h2>
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

export default function RoadmapPage() {
  const groups = groupByStatus(roadmapData.items);

  return (
    <Layout
      title="Roadmap"
      description="Major features tracked on the 5G-MAG Reference Tools Roadmaps project board"
    >
      <main>
        <div className={styles.header}>
          <div className="container">
            <h1 className={styles.title}>Roadmap</h1>
            <p className={styles.subtitle}>
              Major features tracked on the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/48" target="_blank" rel="noreferrer">
                Reference Tools Roadmaps board
              </a>
              .
              {roadmapData.updated_at ? ` Updated: ${roadmapData.updated_at}.` : ' Not yet synced.'}
            </p>
          </div>
        </div>
        <div className="container padding-bottom--xl">
          {roadmapData.updated_at === null ? (
            <p>Roadmap data isn&apos;t available yet. Check back soon.</p>
          ) : roadmapData.items.length === 0 ? (
            <p>No items found on the board right now.</p>
          ) : (
            <div className={styles.board}>
              {groups.map((group) => (
                <StatusColumn key={group.status} status={group.status} items={group.items} />
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
