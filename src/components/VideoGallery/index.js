import { useState } from 'react';
import clsx from 'clsx';
import VideoCard from '../VideoCard';
import styles from './styles.module.css';

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
          onClick={() => {
            setActiveFilter('all');
            setPlayingId(null);
          }}
        >
          All workshops
        </button>
        {workshops.map((w) => (
          <button
            key={w.id}
            type="button"
            className={clsx(styles.filterChip, activeFilter === w.id && styles.filterChipActive)}
            aria-pressed={activeFilter === w.id}
            onClick={() => {
              setActiveFilter(w.id);
              setPlayingId(null);
            }}
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
                <div className="video-wall">
                  <div className="video-wall__grid">
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
              </div>
            ))
          ) : (
            <div className="video-wall">
              <div className="video-wall__grid">
                {w.videos.map((v) => (
                  <VideoCard
                    key={v.id}
                    video={v}
                    isPlaying={playingId === v.id}
                    onPlay={() => setPlayingId(v.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
