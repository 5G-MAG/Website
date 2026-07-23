// Hand-verified historical list of every 5G-MAG Workshop video, newest
// first. YouTube's playlist RSS feed (see scripts/fetch-youtube-playlists.js)
// only ever returns the ~15 most recently added items, never the full
// history, so this is the source of truth for anything older than that;
// the Workshop page merges this with the live feed so new uploads show up
// automatically without ever losing the older ones.
//
// `by` is left null wherever no presenter is confirmed -- these workshop
// recordings don't credit an individual speaker the way Public Call talks
// do, so there's nothing to show rather than a guess. Re-verify against
// https://www.youtube.com/playlist?list=PLFqKJZ78_IWUDXCiSLahAB5Av7QxOoUKX
// if this list is ever in doubt.
export const WORKSHOP_VIDEOS = [
  { id: '2j1ZXDK_4B0', title: 'Workshop on Media Energy Consumption Measurement and Exposure', by: null },
  { id: 'S5VK94lu_Dw', title: 'OSCAR Workshop - 12.06.2025', by: null },
  { id: 'ptXi6BIrBgo', title: 'Part II: Media Production: Deep dive into protocols - BBC', by: null },
  { id: 'KZB_jcfDh4Q', title: 'Part II: Media Production: Deep dive into protocols - Agile Content', by: null },
  { id: 'Q3qsSlewTF8', title: 'Part II: Media Production: Deep dive into protocols - ROSS Video', by: null },
  { id: 't6EsGfCDScg', title: 'Part II: Media Production: Deep dive into protocols - FranceTV/Globecast', by: null },
  { id: 'xCyLTd9gMZI', title: 'Part II: Media Production: Deep dive into protocols - Qualcomm', by: null },
  { id: '_tvrlIj7TxE', title: 'Part II: Media Production: Deep dive into protocols - NRK', by: null },
  { id: 'NjXyBrlnoss', title: 'Part II: Media Production: Deep dive into protocols - Nulink', by: null },
  { id: 'aQ-_Xf06etQ', title: 'Part II: Media Production: Deep dive into protocols - Vislink', by: null },
  { id: '5-CENdYtG_I', title: 'Part I: Media Production: Deep dive into protocols - David and Ivan', by: null },
  { id: 'tEVT1767U48', title: 'Part I: Media Production: Deep dive into protocols - Thorsten Lohmar', by: null },
  { id: 'fv7Wdwa2fVc', title: 'Part I: Media Production: Deep dive into protocols - Thibaud Biatek', by: null },
  { id: '8B3VoZGETSM', title: 'Part I: Media Production: Deep dive into protocols - Ian Wagdin', by: null },
  { id: 'tQ4fhFz9luo', title: 'Part I: Media Production: Deep dive into protocols - Introduction', by: null },
  { id: '6d2_taML3rw', title: 'Media Production over 5G NPN - Introduction to 3GPP', by: null },
  { id: 'YvBwLmHI9U8', title: 'Media Production over 5G NPN - Media production requirements and use cases in 3GPP', by: null },
  { id: '7CzVIw2_XvY', title: 'Media Production over 5G NPN - Technology landscape and transition to IP', by: null },
  { id: 'entS1U-LjPk', title: 'Media Production over 5G NPN - SA4 Study Item on Media Production over 5G NPN', by: null },
  { id: 'ByvbkBU8v3A', title: 'Media Production over 5G NPN - What are 5G Non-Public Networks?', by: null },
  { id: 'yivShX6pRDc', title: 'Media Production over 5G NPN - Introduction to 5G-MAG', by: null },
];

/** Merge the hand-verified historical list with the live playlist feed:
 * any feed entry not already in the seed (a genuinely new upload) is
 * added at the front with whatever title YouTube reports and no byline;
 * a feed entry that matches a seed id is ignored in favor of the seed's
 * own (possibly hand-corrected) title. */
export function mergeWorkshopVideos(feedVideos) {
  const seedIds = new Set(WORKSHOP_VIDEOS.map((v) => v.id));
  const newFromFeed = (feedVideos || [])
    .filter((v) => !seedIds.has(v.id))
    .map((v) => ({ id: v.id, title: v.title, by: null }));
  return [...newFromFeed, ...WORKSHOP_VIDEOS];
}
