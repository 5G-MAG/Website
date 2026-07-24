import VideoGrid from '@site/src/components/VideoGrid';

// Renders a project's automatically-fetched playlist videos, or the same
// "nothing curated yet" fallback already used across every project's
// Developer Exchange section when the playlist is empty (a new playlist
// with no uploads yet, or a transient fetch gap) -- so a project switches
// over to the grid the moment its playlist has content, with no further
// code change needed.
export default function ProjectVideos({ videos, name }) {
  if (videos && videos.length > 0) {
    return <VideoGrid videos={videos} />;
  }
  return (
    <p>
      No {name}-specific videos are curated here yet. Browse the full{' '}
      <a href="https://www.youtube.com/@5GMAG">5G-MAG YouTube channel</a> in the meantime.
    </p>
  );
}
