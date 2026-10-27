import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import contentIndex from '@site/static/data/content-index.json';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import filterStyles from '@site/src/pages/reference-tools/styles.module.css';
import styles from './styles.module.css';

// Every tutorial of the site, grouped by the project it belongs to, so that no tutorial is more than two clicks from the menu.
// Drawn from static/data/content-index.json (scripts/build-content-index.js), so a new tutorial appears here by itself.
const SECTION = { 'reference-tools': 'Reference Tool', testbeds: 'Testbed', validation: 'Validation Tool' };

function buildGroups() {
  const groups = new Map();
  for (const page of contentIndex) {
    const parts = page.url.split('/').filter(Boolean);
    if (!SECTION[parts[0]] || parts[2] !== 'tutorials' || parts.length < 4) continue; // the tutorials index of a tool is its group heading
    const key = `${parts[0]}/${parts[1]}`;
    if (!groups.has(key)) {
      const project = ALL_PROJECTS.find((p) => (p.doc_url || '').replace(/\/$/, '') === `/${key}`);
      groups.set(key, { key, kind: SECTION[parts[0]], name: project ? displayNameOf(project) : parts[1], href: `/${key}/tutorials`, items: [] });
    }
    groups.get(key).items.push({ url: page.url, title: page.title, description: page.description });
  }
  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name));
}
const GROUPS = buildGroups();
const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function AllTutorials() {
  const [query, setQuery] = useState('');
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GROUPS;
    return GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((i) => `${g.name} ${i.title} ${i.description}`.toLowerCase().includes(q)),
    })).filter((g) => g.items.length > 0);
  }, [query]);
  const count = shown.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <p className={filterStyles.filterLabel}>All {TOTAL} tutorials, by project</p>
      <div className={filterStyles.filterBar}>
        <input
          type="search"
          className={filterStyles.filterInput}
          placeholder={`Filter ${TOTAL} tutorials by project, title or technology…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter all tutorials"
        />
        {query && <span className={filterStyles.filterCount}>{count} of {TOTAL}</span>}
      </div>
      {shown.length === 0 ? (
        <p className={filterStyles.filterEmpty}>No tutorials match &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className={styles.grid}>
          {shown.map((g) => (
            <section key={g.key} className={styles.group}>
              <h3 className={styles.groupTitle}>
                <Link to={g.href}>{g.name}</Link>
                <span className={styles.kind}>{g.kind}</span>
              </h3>
              <ul className={styles.list}>
                {g.items.map((i) => (
                  <li key={i.url}>
                    <Link to={i.url}>{i.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
