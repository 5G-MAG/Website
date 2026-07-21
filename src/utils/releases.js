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
