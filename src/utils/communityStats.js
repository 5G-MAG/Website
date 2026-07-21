// Shared "how recently was this repo pushed to" classification, used by both
// the /developer/community-stats overview page and the per-project
// CommunityStats component embedded on each Reference Tool/Testbed index.
export function daysSince(dateStr) {
  if (!dateStr) return 9999;
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000)
  );
}

export function activityLabel(pushedAt) {
  const days = daysSince(pushedAt);
  if (days <= 30) return 'Active';
  if (days <= 90) return 'Maintenance';
  return 'Stable';
}
