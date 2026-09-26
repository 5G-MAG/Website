import styles from './styles.module.css';

// Renders the "ideal system" half of a project's shared blueprint
// (src/data/blueprints/<project>.js) for its Technical Analysis page: what a
// feature is for and the clause/API references that define it. Deliberately
// does NOT render `status`/`statusEvidence`/`note` -- that's the Reference
// Tools page's job (via ImplementationBoard, reading the same array), so the
// "ideal" and "actual" halves of a claim never appear merged in one place
// (RULES.md rule 3).
//
// `specRef.quote` renders in its own visually-distinct, explicitly-labelled
// block when it's still a placeholder (the pilot ships every row this way --
// see the data file's own header comment) so a reader can never mistake an
// unverified placeholder for a real, checked citation.
function isPlaceholderQuote(quote) {
  return !quote || quote.startsWith('TODO');
}

function Citation({ specRef }) {
  if (!specRef) return null;
  const placeholder = isPlaceholderQuote(specRef.quote);
  return (
    <div className={styles.citation}>
      <p className={styles.citationLine}>
        <strong>{specRef.doc}</strong> {specRef.version && <span>{specRef.version}</span>}, clause{' '}
        <code>{specRef.clause}</code>
        {specRef.proceduralClause && (
          <>
            {' '}
            (procedure: <code>{specRef.proceduralClause}</code>)
          </>
        )}
      </p>
      {placeholder ? (
        <p className={styles.quotePending}>
          <span className={styles.pendingTag}>Citation pending</span> {specRef.quote}
        </p>
      ) : (
        <blockquote className={styles.quote}>{specRef.quote}</blockquote>
      )}
    </div>
  );
}

function ApiTable({ apis }) {
  if (!apis || apis.length === 0) return null;
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Reference Point</th>
            <th scope="col">Procedure clause</th>
            <th scope="col">API</th>
            <th scope="col">API clause</th>
          </tr>
        </thead>
        <tbody>
          {apis.map((a, i) => (
            <tr key={`${a.referencePoint}-${a.api}-${i}`}>
              <td>{a.referencePoint}</td>
              <td>{a.procedureClause}</td>
              <td>{a.api}</td>
              <td>{a.apiClause}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FeatureBlueprint({ features = [] }) {
  return (
    <div className={styles.wrap}>
      {features.map((f) => (
        <section key={f.id} id={f.id} className={styles.feature}>
          <h3 className={styles.featureTitle}>{f.name}</h3>
          <p className={styles.description}>{f.idealDescription}</p>
          <Citation specRef={f.specRef} />
          <ApiTable apis={f.apis} />
        </section>
      ))}
    </div>
  );
}
