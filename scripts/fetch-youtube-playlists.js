#!/usr/bin/env node
/* Fetch the 4 category playlists (Workshops, Reference Tools/Developer
 * Exchange, Dev Public Call, Demos) via YouTube's public per-playlist RSS
 * feed -- same no-API-key approach as fetch-youtube.js, just several feeds
 * instead of one channel feed.
 *
 * IMPORTANT LIMITATION: YouTube's playlist RSS feed only ever returns the
 * ~15 most recently added items, never the full playlist history. That's
 * fine for "recent videos" widgets (the developer gallery), but NOT
 * enough on its own for a page meant to list every workshop video ever
 * published. The Workshop and Public Call pages solve this by merging
 * this feed's output with a hand-verified historical seed list (see
 * src/data/workshopVideos.js / src/data/publicCallVideos.js) at render
 * time -- this script's only job is to keep the *recent* end fresh, not
 * to be a complete archive by itself.
 *
 * Also note: unlike a proper YouTube Data API response, the RSS feed has
 * no per-video "who's speaking" field -- that's why every seed entry
 * carries its own hand-written `by`, and why a playlist entry that
 * doesn't match any seed id just renders with no byline (same convention
 * used throughout the banner deck: no known presenter -> omit the
 * credit line rather than guess).
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const PLAYLISTS = {
  workshops: 'PLFqKJZ78_IWUDXCiSLahAB5Av7QxOoUKX',
  developer: 'PLFqKJZ78_IWW_lQytNhfVmFl9U_lLBEcF',
  publicCall: 'PLFqKJZ78_IWUfQ-K4qWf4sx4R9L_DgG7f',
  // "5G-MAG Demos" -- interop plugfest / trade-show demo recordings, feeds
  // the Interop & Testing page rather than the Developer or Workshops ones.
  demos: 'PLBwVxw5NGYvM',
};

const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'youtube-playlists.json');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function parseEntries(xml) {
  const entries = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = entryRe.exec(xml)) !== null) {
    const block = m[1];
    const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<media:title>([^<]+)<\/media:title>/) ||
      block.match(/<title>([^<]+)<\/title>/) ||
      [])[1];
    const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1];
    const thumb = (block.match(/<media:thumbnail url="([^"]+)"/) || [])[1];

    if (!videoId || !title) continue;

    entries.push({
      id: videoId,
      title: decodeEntities(title),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published: published ? published.split('T')[0] : null,
    });
  }
  return entries;
}

async function fetchPlaylist(name, playlistId) {
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
  console.log(`Fetching "${name}" playlist (${playlistId})…`);
  const xml = await get(url);
  const videos = parseEntries(xml);
  console.log(`  -> ${videos.length} videos`);
  return { playlistId, playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}`, videos };
}

async function main() {
  const output = { updated_at: new Date().toISOString().split('T')[0] };
  let anyFailed = false;

  for (const [name, playlistId] of Object.entries(PLAYLISTS)) {
    try {
      output[name] = await fetchPlaylist(name, playlistId);
    } catch (err) {
      console.error(`Failed to fetch playlist "${name}":`, err.message);
      anyFailed = true;
      // Keep whatever this key held before rather than wiping it to
      // empty -- a transient fetch failure shouldn't blank out a
      // gallery that was working yesterday.
      if (fs.existsSync(OUTPUT)) {
        const prev = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
        if (prev[name]) output[name] = prev[name];
      }
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`Wrote ${OUTPUT}`);
  if (anyFailed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
