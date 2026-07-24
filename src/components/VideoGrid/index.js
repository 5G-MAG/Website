import { useState } from 'react';
import clsx from 'clsx';
import VideoCard from '../VideoCard';
import styles from './styles.module.css';

export default function VideoGrid({ videos, kicker = 'On Air' }) {
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className={clsx('video-wall', styles.wallSpacing)}>
      <div className="video-wall__grid">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            isPlaying={playingId === v.id}
            onPlay={() => setPlayingId(v.id)}
            kicker={kicker}
          />
        ))}
      </div>
    </div>
  );
}
