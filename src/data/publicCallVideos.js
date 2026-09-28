// Hand-verified historical list of every Dev Public Call recording,
// newest first. Same reasoning as workshopVideos.js: YouTube's playlist
// RSS feed only returns the ~15 most recent items, so this is the source
// of truth for the full history, merged with the live feed for new
// uploads. Re-verify against
// https://www.youtube.com/playlist?list=PLFqKJZ78_IWUfQ-K4qWf4sx4R9L_DgG7f
// if this list is ever in doubt.
//
// Ordered by YouTube publish date. The seven 2026-07-27 entries were
// uploaded together and carry no talk date, so they keep the playlist's
// own order. Titles are hand-corrected where the raw YouTube title has a
// typo ("evets", "pver") or omits the talk's subtitle, and use " - " as
// the separator like every other seed title.
//
// "Bringing stage events with real actors to your home in VR" -- the
// raw YouTube title has a typo ("evets"); kept corrected here as this
// page's prose already did before this file existed.
//
// 'U9VgiYORNrA' was previously listed on the (now-removed) External
// Videos page; moved here since it's a Dev Public Call recording.
// Hosted on the Khronos Group's own channel rather than 5G-MAG's, so
// unlike the other entries it won't reappear via the live feed merge
// below if ever removed from this list -- it has no other home.
export const PUBLIC_CALL_VIDEOS = [
  { id: 'EEB0c0bN44o', title: 'Spatial Computing for eXtended Reality (XR)', by: 'By Patrice Hirtzlin (InterDigital) and Jérémy Lacoche (Orange)' },
  { id: '1x2lL4Seac8', title: 'Initial steps into DVB-I over 5G Systems? StreamHub app', by: 'By Hyunmin Jeon (LG Electronics)' },
  { id: 'FFYBNKFABWA', title: 'The MOSAIC Project and the MOSAIC Platform capabilities', by: 'By Francesc Mas (3Cat)' },
  { id: 'mRV9fATxYPQ', title: 'Synchronized TV and XR Experiences', by: 'By Rafael Bermúdez (3Cat)' },
  { id: 'b2aRan5pwTY', title: 'From 3GPP Specifications to Code - Automating R&D with Artificial Intelligence', by: 'By Jakob Hoydis (NVIDIA)' },
  { id: '_URitkqaRJk', title: 'StreamCore 5G-VNF - Uplink Media Intelligence', by: 'By Chris Corobana and Sebastian Vaduva (Doctor Quantum Ltd)' },
  { id: 'CWhxilQEGSI', title: 'phine.af - Bringing CAMARA APIs and N5 together', by: 'By Stefan Spettel (phine.tech)' },
  { id: 'FSiWpyTgT5M', title: "Using SES's DVB-NIP Analyzer to test 5G-MAG's FLUTE Library rt-libflute", by: 'By Yannick Poirier (SES)' },
  { id: 'SvNWzIEURU0', title: "Optimization of the Reference Tools' 5G Broadcast Receiver", by: 'By Rubens Brraka (Politecnico di Torino)' },
  { id: 'yuCrUlNdtQE', title: 'Bringing stage events with real actors to your home in VR', by: 'By Joachim Keinert (Fraunhofer IIS)' },
  { id: 'Xf2ChEFMzFA', title: 'Enabling Portable XR Experiences across Devices and Networks', by: 'By Frédéric Plourde (Collabora)' },
  { id: 'vxQFL2d_CBI', title: 'Special Session on Immersive Media', by: null },
  { id: 'U9VgiYORNrA', title: 'glTF 2.0 Extensions in MPEG and 3GPP - Real time exchange for 3D Experiences', by: null },
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
