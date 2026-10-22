import React from 'react';
import styles from './styles.module.css';

// Figures shown next to each other on wide screens, one under the other on narrow ones.
export default function FigureRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}
