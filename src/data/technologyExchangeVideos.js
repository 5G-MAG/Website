// Technology Exchange (docs/tech/videos.mdx) groups videos by session, with
// hand-written intro text and per-series bylines that can't come from a
// YouTube feed automatically -- so the curated `sessions` array in that file
// stays hand-maintained. This only backstops the gap: any video already in
// the live playlist but not yet placed into a curated session (a brand-new
// upload) is surfaced in its own "Recently added" group instead of silently
// missing, using the byline the fetch script already parsed from its
// YouTube description, if any.
export function mergeTechnologyExchangeSessions(sessions, feedVideos) {
  const knownIds = new Set(
    sessions.flatMap((session) =>
      session.series
        ? session.series.flatMap((s) => s.videos.map((v) => v.id))
        : session.videos.map((v) => v.id)
    )
  );
  const newVideos = (feedVideos || []).filter((v) => !knownIds.has(v.id));
  if (!newVideos.length) return sessions;
  return [
    {
      id: 'recent',
      filterLabel: 'Recently added',
      title: 'Recently added',
      sub: 'Not yet grouped into a specific session.',
      videos: newVideos,
    },
    ...sessions,
  ];
}
