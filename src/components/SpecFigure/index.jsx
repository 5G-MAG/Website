import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// A figure redrawn from a 3GPP specification (static/img/tech/<topic>/generated/). Shown no wider than its
// own drawing so small figures keep the same text size as large ones; the caption names the figure, and
// "Redrawn from" keeps the source visible without the reader opening the image.
export default function SpecFigure({ src, width, height, spec, figure, title, alt }) {
  const url = useBaseUrl(src);
  return (
    <figure className={styles.figure}>
      <a className={styles.frame} href={url} target="_blank" rel="noopener noreferrer" title="Open full size">
        {/* below 600px a figure's labels get too small to read, so it scrolls inside the frame instead */}
        {/* width and height reserve the figure's space before it loads, so jumping to a section below it lands */}
        <img loading="lazy" src={url} alt={alt || title} width={width} height={height}
          style={{ maxWidth: width ? `${width}px` : undefined, minWidth: width ? `${Math.min(width, 600)}px` : undefined }} />
      </a>
      <figcaption className={styles.caption}>
        <span className={styles.title}>{title}</span>
        <span className={styles.source}>Redrawn from {spec}, figure {figure}</span>
        {width > 600 && <span className={styles.hint}>Scroll sideways, or tap the figure to open it full size.</span>}
      </figcaption>
    </figure>
  );
}
