import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// A row of pills at the top of a long page, one per section, linking to the section's heading anchor.
export default function JumpMenu({ label = 'Jump to', items }) {
  return (
    <nav className={styles.menu} aria-label={label}>
      <span className={styles.label}>{label}</span>
      {items.map(([text, id]) => (
        <Link key={id} to={`#${id}`} className={styles.pill}>
          {text}
        </Link>
      ))}
    </nav>
  );
}
