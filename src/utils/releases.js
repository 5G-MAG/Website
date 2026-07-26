// Shared release-freshness helpers used by /developer's ReleaseCard and by
// HeroSlideshow's release cards.
export function isRC(release) {
  if (!release) return false;
  if (release.prerelease) return true;
  return release.tag && /-rc(\.|[0-9]|$)/i.test(release.tag);
}

export function daysSince(dateStr) {
  if (!dateStr || dateStr === '-') return 9999;
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000)
  );
}

export function formatAge(days) {
  if (days === 0) return 'today';
  if (days === 1) return '1d ago';
  if (days < 7) return `${days}d ago`;
  if (days < 14) return '1w ago';
  return `${Math.round(days / 7)}w ago`;
}

// releases.json's own `projects` array order is just static/data/releases.json's
// generation order (projects.json's own array order, in turn) -- NOT sorted by
// recency. Every "Latest Releases" card grid (Home, Developer, HeroSlideshow's
// release slides) wants most-recently-updated first, so sort by each project's
// own `latest_date` before slicing to however many cards it shows.
export function sortByLatestRelease(projects) {
  return [...projects].sort((a, b) => (b.latest_date || '').localeCompare(a.latest_date || ''));
}
