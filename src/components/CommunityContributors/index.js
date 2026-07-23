import contributorsData from '@site/static/data/contributors.json';
import styles from './styles.module.css';

function SpotlightCard({ c, rank }) {
  return (
    <a
      href={c.html_url}
      target="_blank"
      rel="noreferrer"
      className={rank === 1 ? `${styles.spotCard} ${styles.spotCardFirst}` : styles.spotCard}
    >
      <span className={styles.spotRank}>#{rank}</span>
      <img className={styles.avatar} src={c.avatar_url} alt={c.login} loading="lazy" />
      <span className={styles.spotName}>{c.login}</span>
      <span className={styles.spotStats}>
        <span className={styles.statPill}>{c.contributions} contributions</span>
        <span className={styles.statPill}>
          {c.repo_count} {c.repo_count === 1 ? 'repo' : 'repos'}
        </span>
      </span>
    </a>
  );
}

function RankRow({ c, rank, maxContributions }) {
  const pct = Math.max(4, Math.round((c.contributions / maxContributions) * 100));
  return (
    <a href={c.html_url} target="_blank" rel="noreferrer" className={styles.rankRow}>
      <span className={styles.rankNum}>{rank}</span>
      <img className={styles.avatarSm} src={c.avatar_url} alt={c.login} loading="lazy" />
      <span className={styles.rankNameBlock}>
        <span className={styles.rankName}>{c.login}</span>
        <span className={styles.rankMeta}>
          {c.repo_count} {c.repo_count === 1 ? 'repository' : 'repositories'}
        </span>
      </span>
      <span className={styles.rankMetric}>
        <span className={styles.rankBarTrack}>
          <span className={styles.rankBarFill} style={{ width: `${pct}%` }} />
        </span>
        <span className={styles.rankCount}>{c.contributions}</span>
      </span>
    </a>
  );
}

// Content-only (no Layout/page-header) version of the former standalone
// /developer/contributors page, for use as one section of the
// consolidated /community page.
export default function CommunityContributors() {
  const { contributors, updated_at, repo_count } = contributorsData;
  const spotlight = contributors.slice(0, 4);
  const rest = contributors.slice(4, 20);
  const maxContributions = contributors.length > 0 ? contributors[0].contributions : 1;

  if (contributors.length === 0) {
    return <p>Contributor stats aren&apos;t available yet. Check back soon.</p>;
  }

  return (
    <>
      <p>
        Ranked by commits across every public 5G-MAG repository
        {repo_count ? ` (${repo_count} repositories)` : ''}.
        {updated_at ? ` Updated: ${updated_at}.` : ' Not yet synced.'}
      </p>
      <div className={styles.spotlightGrid}>
        {spotlight.map((c, i) => (
          <SpotlightCard key={c.login} c={c} rank={i + 1} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className={styles.rankList}>
          {rest.map((c, i) => (
            <RankRow key={c.login} c={c} rank={i + 5} maxContributions={maxContributions} />
          ))}
        </div>
      )}
    </>
  );
}
