import clsx from 'clsx';
import styles from './styles.module.css';

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Mirrors the GitHub-slugger algorithm used for markdown heading anchors,
// so hand-written links like `./videos#some-video-title` resolve to a card.
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export default function VideoCard({ video, isPlaying, onPlay, kicker = 'On Air' }) {
  return (
    <div id={slugify(video.title)} className={clsx(styles.card, styles.anchorTarget)}>
      <div className={styles.header}>
        <span className={styles.tally}>
          <span className={styles.dot} />
          {kicker}
        </span>
      </div>
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
