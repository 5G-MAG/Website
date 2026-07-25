import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// A simple click-to-zoom photo gallery: a grid of thumbnails that opens a
// full-screen lightbox on click, with keyboard (Escape/Left/Right) and
// backdrop-click support. `photos` is [{ src, alt }], with src already
// resolved (e.g. via useBaseUrl) by the caller.
export default function PhotoGallery({ photos }) {
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
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={styles.thumbButton}
            onClick={() => setActiveIndex(index)}
            aria-label={`View larger photo: ${photo.alt}`}
          >
            <img loading="lazy" src={photo.src} alt={photo.alt} />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setActiveIndex(null)}
        >
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
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
          >
            &#8249;
          </button>

          <img
            className={styles.overlayImage}
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className={clsx(styles.navButton, styles.navButtonNext)}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i + 1) % photos.length);
            }}
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
