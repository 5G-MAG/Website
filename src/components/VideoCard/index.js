import styles from './styles.module.css';

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function VideoCard({ video, isPlaying, onPlay }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumbWrap}>
        {isPlaying ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.thumbButton}
            onClick={onPlay}
            aria-label={`Play: ${video.title}`}
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.id}/mqdefault.jpg)` }}
          >
            <span className={styles.playBtn}>{PLAY_ICON}</span>
          </button>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>{video.title}</p>
        {video.by && <p className={styles.cardByline}>{video.by}</p>}
      </div>
    </div>
  );
}
