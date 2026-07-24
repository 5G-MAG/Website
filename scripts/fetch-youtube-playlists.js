#!/usr/bin/env node
/* Fetch the 4 category playlists (Workshops, Reference Tools/Developer
 * Exchange, Dev Public Call, Demos) plus the per-project playlists (see
 * PROJECT_PLAYLISTS) via YouTube's public per-playlist RSS feed -- same
 * no-API-key approach as fetch-youtube.js, just several feeds instead of
 * one channel feed.
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
 * Byline: the RSS feed's <media:description> is used to fill `by`
 * automatically, so a per-video credit doesn't need to be hand-typed
 * anywhere. Two conventions are recognised, checked in this order:
 *   1. A line starting with "Speaker:" or "Speakers:" (the convention to
 *      use going forward -- add it to the video's YouTube description).
 *   2. A description that is *entirely* "by NAME(S)" (an existing,
 *      organic convention already used on many past uploads).
 * A description matching neither just omits `by`, same as before.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const PLAYLISTS = {
  workshops: 'PLFqKJZ78_IWUDXCiSLahAB5Av7QxOoUKX',
  developer: 'PLFqKJZ78_IWW_lQytNhfVmFl9U_lLBEcF',
  publicCall: 'PLFqKJZ78_IWUfQ-K4qWf4sx4R9L_DgG7f',
  // "5G-MAG Demos" -- interop plugfest / trade-show demo recordings, feeds
  // the Interop & Demos page rather than the Developer or Workshops ones.
  demos: 'PLBwVxw5NGYvM',
};

// Per-project playlists, feeding each project's own Developer Exchange
// section (index.mdx teaser + tutorials page grid) instead of the shared
// widgets above. Written to output.projects[key] rather than a top-level
// key, to keep these namespaced separately from the 4 category playlists.
// A project not listed here has no dedicated playlist yet and keeps
// whatever manual content (or fallback text) its own page already has.
const PROJECT_PLAYLISTS = {
  '5g-broadcast': 'PLFqKJZ78_IWWbdf4rZ_SS9W0dqpLhKZz8',
  '5g-mbs': 'PLFqKJZ78_IWXSCsSEKeyAay10luuVF9io',
  '5gms': 'PLFqKJZ78_IWUibB6dMiabaVNDFLSGBWlx',
  'data-collection': 'PLFqKJZ78_IWWKZ0nJ-gR2dNVrZ0iIFQ05',
  'dvb-i': 'PLFqKJZ78_IWWx0OE_WRkHAomP7FXdwX4J',
  'emergency-alerts': 'PLFqKJZ78_IWVeyD2qw18szZe6zrukVv0e',
  multimedia: 'PLFqKJZ78_IWWokVokppoiAfb6CJYwVrJn',
  v3c: 'PLFqKJZ78_IWUNBlJetfmlc_873F3O2-0l',
  xr: 'PLFqKJZ78_IWVk0_h1oeizy9IZ0DmOUXkA',
  '6g-testbed': 'PLFV0QXnNeYCI',
  avatar: 'PLauJtH0v19QE',
  'network-apis': 'PLZLRpwWhBVgA',
  'ai-ml': 'PLWFUt97V21BY',
  'beyond-2d': 'PLbWrBE3RT180',
};

const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'youtube-playlists.json');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        // A non-2xx response (seen intermittently, e.g. a transient 404
        // from fetching many playlists back-to-back) is an HTML error
        // page, not a feed -- reject rather than resolve, so the caller's
        // "keep the previous data" fallback kicks in instead of silently
        // parsing 0 entries out of it and overwriting real data.
        if (res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
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

function extractByline(rawDescription) {
  if (!rawDescription) return null;
  const desc = decodeEntities(rawDescription).trim();
  if (!desc) return null;

  const speakerMatch = desc.match(/^Speakers?:\s*(.+)$/im);
  if (speakerMatch) return speakerMatch[1].trim();

  // Legacy organic convention: some descriptions are *entirely* "by
  // NAME(S)" and nothing else -- only match the whole (short, single-line)
  // description, not "by" appearing mid-sentence in a longer paragraph.
  if (!desc.includes('\n') && desc.length < 150) {
    const byMatch = desc.match(/^by\s+(.+)$/i);
    if (byMatch) return byMatch[1].trim();
  }

  return null;
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
    const description = (block.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1];

    if (!videoId || !title) continue;

    const by = extractByline(description);

    entries.push({
      id: videoId,
      title: decodeEntities(title),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published: published ? published.split('T')[0] : null,
      ...(by ? { by } : {}),
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
  const output = { updated_at: new Date().toISOString().split('T')[0], projects: {} };
  let anyFailed = false;
  const prev = fs.existsSync(OUTPUT) ? JSON.parse(fs.readFileSync(OUTPUT, 'utf8')) : {};

  for (const [name, playlistId] of Object.entries(PLAYLISTS)) {
    try {
      output[name] = await fetchPlaylist(name, playlistId);
    } catch (err) {
      console.error(`Failed to fetch playlist "${name}":`, err.message);
      anyFailed = true;
      // Keep whatever this key held before rather than wiping it to
      // empty -- a transient fetch failure shouldn't blank out a
      // gallery that was working yesterday.
      if (prev[name]) output[name] = prev[name];
    }
  }

  for (const [key, playlistId] of Object.entries(PROJECT_PLAYLISTS)) {
    try {
      output.projects[key] = await fetchPlaylist(key, playlistId);
    } catch (err) {
      console.error(`Failed to fetch project playlist "${key}":`, err.message);
      anyFailed = true;
      if (prev.projects && prev.projects[key]) output.projects[key] = prev.projects[key];
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
