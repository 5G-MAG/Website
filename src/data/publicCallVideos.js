// Hand-verified historical list of every Dev Public Call recording,
// newest first. Same reasoning as workshopVideos.js: YouTube's playlist
// RSS feed only returns the ~15 most recent items, so this is the source
// of truth for the full history, merged with the live feed for new
// uploads. Re-verify against
// https://www.youtube.com/playlist?list=PLFqKJZ78_IWUfQ-K4qWf4sx4R9L_DgG7f
// if this list is ever in doubt.
//
// "Bringing stage events with real actors to your home in VR" -- the
// raw YouTube title has a typo ("evets"); kept corrected here as this
// page's prose already did before this file existed.
export const PUBLIC_CALL_VIDEOS = [
  { id: 'vxQFL2d_CBI', title: 'Special Session on Immersive Media', by: null },
  { id: 'Xf2ChEFMzFA', title: 'Enabling Portable XR Experiences across Devices and Networks', by: 'By Frédéric Plourde (Collabora)' },
  { id: 'yuCrUlNdtQE', title: 'Bringing stage events with real actors to your home in VR', by: 'By Joachim Keinert (Fraunhofer IIS)' },
  { id: 'SvNWzIEURU0', title: "Optimization of the Reference Tools' 5G Broadcast Receiver", by: 'By Rubens Brraka (Politecnico di Torino)' },
  { id: 'FSiWpyTgT5M', title: "Using SES's DVB-NIP Analyzer to test 5G-MAG's FLUTE Library rt-libflute", by: 'By Yannick Poirier (SES)' },
];

/** Same merge rule as mergeWorkshopVideos: a live-feed entry not already
 * in the seed is a new upload, shown with no byline until someone adds
 * it here; a feed entry matching a seed id defers to the seed's own
 * (possibly hand-corrected) title. */
export function mergePublicCallVideos(feedVideos) {
  const seedIds = new Set(PUBLIC_CALL_VIDEOS.map((v) => v.id));
  const newFromFeed = (feedVideos || [])
    .filter((v) => !seedIds.has(v.id))
    .map((v) => ({ id: v.id, title: v.title, by: null }));
  return [...newFromFeed, ...PUBLIC_CALL_VIDEOS];
}
