import { useState } from 'react';
import VideoCard from '../VideoCard';
import styles from './styles.module.css';

export default function VideoGrid({ videos }) {
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className={styles.grid}>
      {videos.map((v) => (
        <VideoCard
          key={v.id}
          video={v}
          isPlaying={playingId === v.id}
          onPlay={() => setPlayingId(v.id)}
        />
      ))}
    </div>
  );
}
