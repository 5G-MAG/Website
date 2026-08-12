import styles from './styles.module.css';

// Architecture map: the specification's architecture first, with the
// implementing repository mapped onto it.
//
// The Scope pages already answered two questions separately -- "how is this
// technology structured" (prose plus a static PNG, where one existed at all)
// and "what have we built" (the repository table and the implementation
// board). A reader had to hold both in their head to see which box of the
// standard each repository actually is. This renders one picture that answers
// both: entities and reference points as the specification defines them, each
// entity labelled with the repository that implements it and how complete that
// implementation is.
//
// Deliberately not Mermaid. Its automatic layout produces generic boxes that
// cannot follow the site's design tokens, and the layer bands below (which are
// the part that makes the standard's structure readable) are not something its
// block syntax expresses well. This is a plain CSS grid, so it inherits the
// theme, reflows on narrow screens, and stays accessible as ordinary markup.
//
// Data lives in src/data/architecture/<project>.js. Where a project also has an
// implementation board, pass its sections as `status` so the map derives each
// entity's state from the same rows as the audit below it, and the two cannot
// disagree.

const OWNER = {
  reference: { label: '5G-MAG reference tool', className: 'ownerReference' },
  fork: { label: '5G-MAG fork of an upstream project', className: 'ownerFork' },
  external: { label: 'Third-party or out of scope', className: 'ownerExternal' },
};

const STATE = {
  yes: { label: 'Implemented', className: 'stateYes' },
  partial: { label: 'Partially implemented', className: 'statePartial' },
  no: { label: 'Not implemented', className: 'stateNo' },
};

// Roll the board's per-feature rows up to one state per component, so the map
// says "partially implemented" exactly when the audit does.
function deriveStates(sections) {
  if (!sections) return {};
  const out = {};
  sections.forEach((s) => {
    if (!s.component) return;
    const acc = out[s.component] || { yes: 0, other: 0 };
    (s.rows || []).forEach((r) => {
      (r.statuses || [r.status]).forEach((st) => {
        if (st === 'yes') acc.yes += 1;
        else if (st === 'partial' || st === 'no' || st === 'hold' || st === 'unknown') acc.other += 1;
      });
    });
    out[s.component] = acc;
  });
  return Object.fromEntries(
    Object.entries(out).map(([k, v]) => [
      k,
      v.other === 0 ? 'yes' : v.yes === 0 ? 'no' : 'partial',
    ])
  );
}

export default function ArchitectureMap({ architecture, status }) {
  const { layers = [], entities = [], spec, note } = architecture;
  const derived = deriveStates(status);

  const usedOwners = [...new Set(entities.map((e) => e.owner).filter(Boolean))];
  const anyState = entities.some((e) => e.state || derived[e.component]);

  return (
    <div className={styles.wrap}>
      {spec && (
        <p className={styles.spec}>
          Architecture as defined by <strong>{spec}</strong>, with the repository implementing each
          part.
        </p>
      )}

      <div className={styles.map}>
        {layers.map((layer) => {
          const inLayer = entities.filter((e) => e.layer === layer.id);
          if (inLayer.length === 0) return null;
          return (
            <section key={layer.id} className={styles.band}>
              <h4 className={styles.bandLabel}>
                {layer.label}
                {layer.spec && <span className={styles.bandSpec}>{layer.spec}</span>}
              </h4>
              <div className={styles.entities}>
                {inLayer.map((e) => {
                  const state = e.state || derived[e.component];
                  const owner = OWNER[e.owner] || OWNER.external;
                  return (
                    <div
                      key={e.id}
                      className={`${styles.entity} ${styles[owner.className]}`}
                      title={owner.label}
                    >
                      <span className={styles.entityLabel}>{e.label}</span>
                      {e.spec && <span className={styles.entitySpec}>{e.spec}</span>}
                      {e.repo ? (
                        <span className={styles.repo}>
                          {e.repoUrl ? (
                            <a href={e.repoUrl} target="_blank" rel="noreferrer">
                              {e.repo}
                            </a>
                          ) : (
                            e.repo
                          )}
                        </span>
                      ) : (
                        <span className={styles.repoNone}>not implemented here</span>
                      )}
                      {state && (
                        <span className={`${styles.state} ${styles[STATE[state].className]}`}>
                          {STATE[state].label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {layer.interfaces && (
                <p className={styles.interfaces}>
                  <span className={styles.interfacesLabel}>Reference points</span>
                  {layer.interfaces.map((i) => (
                    <code key={i} className={styles.rp}>
                      {i}
                    </code>
                  ))}
                </p>
              )}
            </section>
          );
        })}
      </div>

      <div className={styles.legend}>
        {usedOwners.map((o) => (
          <span key={o} className={styles.legendItem}>
            <i className={`${styles.swatch} ${styles[(OWNER[o] || OWNER.external).className]}`} />
            {(OWNER[o] || OWNER.external).label}
          </span>
        ))}
        {anyState && status && (
          <span className={styles.legendNote}>
            Implementation state is derived from the per-feature audit below.
          </span>
        )}
      </div>

      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
