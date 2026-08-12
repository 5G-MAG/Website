import { useMemo, useState } from 'react';
import styles from './styles.module.css';

// A searchable, filterable specification index. Replaces the deeply nested
// bullet outlines the Standards pages used to carry: a catalogue of 40-60
// specifications is lookup material (people arrive knowing they want the RAN
// specs, or everything added in Release 17), and a five-level outline can be
// neither filtered nor searched, so the only way through it was scrolling.
//
// `specs` is [{ id, title, url, layer, release?, note? }]. Layers and releases
// are derived from the data rather than configured, so a project only has to
// maintain its own list -- see src/data/specs/<project>.js.
// `controlsThreshold` is why this component can be used on every Standards page
// rather than only the large ones: below it the search box and filter chips are
// not rendered at all, so a page listing four specifications gets a clean table
// instead of a filter UI it has no use for, while a page listing forty-four
// gets the full controls. Same visual language either way, and a short list
// grows into its controls on its own as specifications are added.
export default function SpecIndex({ specs, layerOrder = [], controlsThreshold = 12 }) {
  const [query, setQuery] = useState('');
  const [layer, setLayer] = useState(null);
  const [release, setRelease] = useState(null);
  const showControls = specs.length >= controlsThreshold;

  const layers = useMemo(() => {
    const found = [...new Set(specs.map((s) => s.layer).filter(Boolean))];
    // Keep the caller's preferred order where given, append anything else.
    return [
      ...layerOrder.filter((l) => found.includes(l)),
      ...found.filter((l) => !layerOrder.includes(l)),
    ];
  }, [specs, layerOrder]);

  // A release column only earns its place when most of the catalogue actually
  // carries one. Several pages state a release for just one or two of their
  // specifications, which would otherwise render a column that is almost
  // entirely blank and reads as missing data rather than as "not stated".
  const releases = useMemo(() => {
    const withRelease = specs.filter((s) => s.release);
    if (withRelease.length < Math.max(3, specs.length * 0.4)) return [];
    return [...new Set(withRelease.map((s) => s.release))].sort((a, b) => Number(a) - Number(b));
  }, [specs]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return specs.filter((s) => {
      if (layer && s.layer !== layer) return false;
      if (release && String(s.release) !== String(release)) return false;
      if (!q) return true;
      return (
        s.id.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        (s.note || '').toLowerCase().includes(q)
      );
    });
  }, [specs, query, layer, release]);

  const filtered = Boolean(query.trim() || layer || release);

  return (
    <div className={styles.wrap}>
      {showControls && (
        <div className={styles.controls}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search specification number or title..."
            aria-label="Search specifications"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.chips} role="group" aria-label="Filter by layer">
            <button
              type="button"
              className={`${styles.chip} ${layer === null ? styles.chipOn : ''}`}
              aria-pressed={layer === null}
              onClick={() => setLayer(null)}
            >
              All layers
            </button>
            {layers.map((l) => (
              <button
                key={l}
                type="button"
                className={`${styles.chip} ${layer === l ? styles.chipOn : ''}`}
                aria-pressed={layer === l}
                onClick={() => setLayer(layer === l ? null : l)}
              >
                {l}
              </button>
            ))}
          </div>
          {releases.length > 1 && (
            <div className={styles.chips} role="group" aria-label="Filter by release">
              {releases.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`${styles.chip} ${String(release) === String(r) ? styles.chipOn : ''}`}
                  aria-pressed={String(release) === String(r)}
                  onClick={() => setRelease(String(release) === String(r) ? null : r)}
                >
                  Rel-{r}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {showControls && (
        <p className={styles.count} aria-live="polite">
          {visible.length} of {specs.length} specifications
          {filtered && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => {
                setQuery('');
                setLayer(null);
                setRelease(null);
              }}
            >
              Clear filters
            </button>
          )}
        </p>
      )}

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Specification</th>
              <th scope="col">Title</th>
              <th scope="col">Layer</th>
              {releases.length > 0 && <th scope="col">Rel</th>}
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr key={s.id + s.title}>
                <th scope="row" className={styles.specCell}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.id}
                    </a>
                  ) : (
                    s.id
                  )}
                </th>
                <td>
                  {s.title}
                  {s.note && <span className={styles.note}>{s.note}</span>}
                </td>
                <td>
                  <span className={styles.layer}>{s.layer}</span>
                </td>
                {releases.length > 0 && <td className={styles.rel}>{s.release || ''}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visible.length === 0 && (
        <p className={styles.empty}>No specification matches those filters.</p>
      )}
    </div>
  );
}
