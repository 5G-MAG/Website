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

// Unique cloners, counted daily and added up, summed over the given projects. A repository shared by
// several projects counts once, and repositories the hub dashboard leaves out (`excluded`, a Set of repo names)
// do not count. One definition for the Community Activity totals and for the clone figure on the home page.
export function totalUniqueClones(projects, excluded = new Set()) {
  const repos = new Map(projects.flatMap((p) => p.repos).map((r) => [r.repo, r]));
  let total = 0;
  for (const r of repos.values()) {
    if (!excluded.has(r.repo)) total += r.total_unique_clones || 0;
  }
  return total;
}

// Stars, forks, views and unique cloners of the repositories of the given projects, each repository counted once and
// the repositories the hub dashboard leaves out (`excluded`) skipped. Used by the Community Activity totals and by
// the figures on the Membership page, so both show the same numbers.
export function communityTotals(projects, excluded = new Set()) {
  const repos = [...new Map(projects.flatMap((p) => p.repos).map((r) => [r.repo, r])).values()].filter(
    (r) => !excluded.has(r.repo)
  );
  const sum = (field) => repos.reduce((n, r) => n + (r[field] || 0), 0);
  return {
    repositories: repos.length,
    stars: sum('stars'),
    forks: sum('forks'),
    views: sum('total_views'),
    clones: totalUniqueClones(projects, excluded),
  };
}
