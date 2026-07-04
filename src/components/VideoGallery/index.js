import { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

function VideoCard({ video, isPlaying, onPlay }) {
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

export default function VideoGallery({ workshops }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [playingId, setPlayingId] = useState(null);

  const visibleWorkshops = workshops.filter((w) => activeFilter === 'all' || w.id === activeFilter);

  return (
    <div className={styles.gallery}>
      <div className={styles.filters}>
        <button
          type="button"
          className={clsx(styles.filterChip, activeFilter === 'all' && styles.filterChipActive)}
          aria-pressed={activeFilter === 'all'}
          onClick={() => { setActiveFilter('all'); setPlayingId(null); }}
        >
          All workshops
        </button>
        {workshops.map((w) => (
          <button
            key={w.id}
            type="button"
            className={clsx(styles.filterChip, activeFilter === w.id && styles.filterChipActive)}
            aria-pressed={activeFilter === w.id}
            onClick={() => { setActiveFilter(w.id); setPlayingId(null); }}
          >
            {w.filterLabel}
          </button>
        ))}
      </div>

      {visibleWorkshops.map((w) => (
        <div key={w.id} className={styles.workshopGroup}>
          <h2 className={styles.workshopHeading}>{w.title}</h2>
          <p className={styles.workshopSub}>{w.sub}</p>
          {w.series ? (
            w.series.map((s, sIdx) => (
              <div key={sIdx} className={styles.seriesBlock}>
                {s.title && <h3 className={styles.seriesTitle}>{s.title}</h3>}
                {s.by && <p className={styles.seriesByline}>By {s.by}</p>}
                <div className={styles.grid}>
                  {s.videos.map((v) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      isPlaying={playingId === v.id}
                      onPlay={() => setPlayingId(v.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.grid}>
              {w.videos.map((v) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  isPlaying={playingId === v.id}
                  onPlay={() => setPlayingId(v.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
