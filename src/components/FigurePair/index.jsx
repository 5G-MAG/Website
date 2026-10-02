import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import figStyles from '@site/src/components/SpecFigure/styles.module.css';
import styles from './styles.module.css';

// Two figures side by side (one above the other on narrow screens). A click opens a figure full size in an
// in-page viewer; Esc, the close button or a click outside closes it.
function Item({ fig, onOpen }) {
  const url = useBaseUrl(fig.src);
  return (
    <figure className={styles.item}>
      <span className={styles.label}>{fig.label}</span>
      {/* maxWidth (optional): a narrow drawing is shown no wider than this, centred, so its text keeps its size */}
      <button type="button" className={`${figStyles.frame} ${styles.frame}`} onClick={() => onOpen(fig, url)} title="Open larger"
        style={fig.maxWidth ? { maxWidth: `${fig.maxWidth}px`, alignSelf: 'center' } : undefined}>
        <img loading="lazy" src={url} alt={fig.alt} width={fig.width} height={fig.height} />
      </button>
      <figcaption className={figStyles.caption}>
        <span className={figStyles.title}>{fig.title}</span>
        <span className={figStyles.source}>{fig.source}</span>
      </figcaption>
    </figure>
  );
}

export default function FigurePair({ figures, note }) {
  const [open, setOpen] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <div className={styles.wrap}>
      <div className={styles.pair}>
        {figures.map((f) => (
          <Item key={f.src} fig={f} onOpen={(fig, url) => setOpen({ ...fig, url })} />
        ))}
      </div>
      {note && <p className={styles.note}>{note}</p>}
      <dialog ref={dialog} className={styles.dialog} onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dialog.current) setOpen(null); }} aria-label={open ? open.title : 'Figure'}>
        {open && (
          <div className={styles.viewer}>
            <div className={styles.bar}>
              <b>{open.label}: {open.title}</b>
              <button type="button" className={styles.close} onClick={() => setOpen(null)} aria-label="Close">×</button>
            </div>
            <div className={styles.scroll}><img src={open.url} alt={open.alt} /></div>
          </div>
        )}
      </dialog>
    </div>
  );
}
