import Link from '@docusaurus/Link';
import VideoGrid from '@site/src/components/VideoGrid';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';

// A handful of recent videos from the wider Developer Exchange, shown when a
// project has none of its own yet -- an actual widget of real videos rather
// than just a link out to YouTube.
const RECENT_DEVELOPER_EXCHANGES = (youtubePlaylists.developer?.videos || []).slice(0, 6);

// Renders a project's automatically-fetched playlist videos, or -- while the
// playlist is empty (a new playlist with no uploads yet, or a transient
// fetch gap) -- a handful of recent videos from the wider Developer
// Exchange, so this section always shows an actual video widget rather than
// a text link out to YouTube. Either way, a link to the site-wide video
// library follows -- every project's Developer Exchange section is "a place
// videos are shown" that should hook back to it.
export default function ProjectVideos({ videos, name }) {
  return (
    <>
      {videos && videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <>
          <p>No {name}-specific videos are curated here yet. In the meantime, here's what's recent from the wider Developer Exchange:</p>
          <VideoGrid videos={RECENT_DEVELOPER_EXCHANGES} />
        </>
      )}
      <p>
        <Link to="/videos">Browse all 5G-MAG videos &rarr;</Link>
      </p>
    </>
  );
}
