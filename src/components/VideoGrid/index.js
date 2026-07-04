import { useState } from 'react';
import styles from './styles.module.css';

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function VideoGrid({ videos }) {
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className={styles.grid}>
      {videos.map((v) => (
        <div key={v.id} className={styles.card}>
          <div className={styles.thumbWrap}>
            {playingId === v.id ? (
              <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                title={v.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className={styles.thumbButton}
                onClick={() => setPlayingId(v.id)}
                aria-label={`Play: ${v.title}`}
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${v.id}/mqdefault.jpg)` }}
              >
                <span className={styles.playBtn}>{PLAY_ICON}</span>
              </button>
            )}
          </div>
          <div className={styles.cardBody}>
            <p className={styles.cardTitle}>{v.title}</p>
            {v.by && <p className={styles.cardByline}>{v.by}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
