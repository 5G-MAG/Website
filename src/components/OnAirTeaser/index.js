import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

// A clickable preview of one video, linking through to the full gallery
// (VideoGrid/VideoCard) elsewhere on the same page or a sibling page, rather
// than playing inline — this is a teaser, not a player. Shares VideoCard's
// visual language (thumbnail + centered play button) so a project's video
// content looks the same whether you meet it here first or in the gallery
// itself. `kicker` defaults to "On Air" for cross-cutting showcases (Home,
// Tech hub); reference-tools/testbeds pages pass "Developer Exchange".
export default function OnAirTeaser({ videoId, title, href, by, kicker = 'On Air' }) {
  return (
    <Link to={href} className={styles.teaser}>
      <div className={styles.thumbWrap}>
        <img
          className={styles.thumb}
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt=""
          loading="lazy"
        />
        <span className={styles.playBtn}>{PLAY_ICON}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.kicker}>{kicker}</span>
        <span className={styles.title}>{title}</span>
        {by && <span className={styles.byline}>{by}</span>}
      </div>
    </Link>
  );
}
