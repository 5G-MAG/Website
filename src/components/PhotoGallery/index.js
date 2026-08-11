import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// A simple click-to-zoom photo gallery: a grid of thumbnails that opens a
// full-screen lightbox on click, with keyboard (Escape/Left/Right) and
// backdrop-click support. `photos` is [{ src, alt }], with src already
// resolved (e.g. via useBaseUrl) by the caller.
export default function PhotoGallery({ photos, thumbAspect = '1 / 1', columns }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, photos.length]);

  return (
    <>
      <div
        className={clsx(styles.grid, columns && styles.gridFixedCols)}
        style={columns ? { '--gallery-cols': columns } : undefined}
      >
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={styles.thumbButton}
            onClick={() => setActiveIndex(index)}
            aria-label={`View larger photo: ${photo.alt}`}
          >
            <img loading="lazy" src={photo.src} alt={photo.alt} style={{ aspectRatio: thumbAspect }} />
          </button>
        ))}
      </div>

      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Photo viewer">
          {/* Backdrop click-to-close as a real button (covers the whole
              overlay, sits behind the content) rather than an onClick on
              the dialog div itself — same behavior, but keyboard-reachable
              and lint-clean (click-events-have-key-events). Escape/arrow
              keys are additionally handled document-wide above. */}
          <button
            type="button"
            className={styles.backdropButton}
            onClick={() => setActiveIndex(null)}
            aria-label="Close photo viewer"
            tabIndex={-1}
          />
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
          >
            &times;
          </button>

          <button
            type="button"
            className={clsx(styles.navButton, styles.navButtonPrev)}
            onClick={() => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          {/* No stopPropagation needed: the backdrop is a sibling button
              behind this image, not an ancestor, so clicks here never
              reach it. */}
          <img
            className={styles.overlayImage}
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
          />

          <button
            type="button"
            className={clsx(styles.navButton, styles.navButtonNext)}
            onClick={() => setActiveIndex((i) => (i + 1) % photos.length)}
            aria-label="Next photo"
          >
            &#8250;
          </button>

          <div className={styles.counter}>
            {activeIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
