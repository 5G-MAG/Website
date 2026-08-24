// Shared "how recently was this repo pushed to" classification, used by both
// the Community Stats section of /developer/community and the per-project
// CommunityStats component embedded on each Reference Tool/Testbed index.
export function daysSince(dateStr) {
  if (!dateStr) return 9999;
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(dateStr + 'T12:00:00Z').getTime()) / 86400000)
  );
}

// 'Quiet' rather than 'Stable' for the >90-day case (2026-08-24
// findability audit): this is a push-recency measure, not a maturity or
// completeness judgement, and 'Stable' reads as an endorsement it isn't
// entitled to make -- a genuinely early-stage, incomplete tool that has
// simply stalled would read as 'Stable' under that name. No maturity
// signal exists elsewhere in this data; if one is wanted later it needs
// its own field, not an overload of this one.
export function activityLabel(pushedAt) {
  const days = daysSince(pushedAt);
  if (days <= 30) return 'Active';
  if (days <= 90) return 'Maintenance';
  return 'Quiet';
}
