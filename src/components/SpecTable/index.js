import React from 'react';
import styles from '@site/src/components/SpecIndex/styles.module.css';

// A table in the style of the specification index (SpecIndex): bordered, scrolling inside its own box, an
// uppercase header row, the specification name in monospace. `columns`: header labels; `rows`: arrays of cells, one
// per column. The first cell of a row is the specification.
export default function SpecTable({ columns, rows }) {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th scope="col" key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i}>
              {cells.map((cell, j) => (j === 0 ? (
                <th scope="row" key={j} className={styles.specCell}>{cell}</th>
              ) : (
                <td key={j}>{cell}</td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
