import Link from '@docusaurus/Link';
import VideoGrid from '@site/src/components/VideoGrid';

// Renders a project's automatically-fetched playlist videos, or the same
// "nothing curated yet" fallback already used across every project's
// Developer Exchange section when the playlist is empty (a new playlist
// with no uploads yet, or a transient fetch gap) -- so a project switches
// over to the grid the moment its playlist has content, with no further
// code change needed. Either way, a link to the site-wide video library
// follows -- every project's Developer Exchange section is "a place videos
// are shown" that should hook back to it.
export default function ProjectVideos({ videos, name }) {
  return (
    <>
      {videos && videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <p>
          No {name}-specific videos are curated here yet. Browse the full{' '}
          <a href="https://www.youtube.com/@5GMAG">5G-MAG YouTube channel</a> in the meantime.
        </p>
      )}
      <p>
        <Link to="/videos">Browse all 5G-MAG videos &rarr;</Link>
      </p>
    </>
  );
}
