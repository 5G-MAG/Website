#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const CHANNEL_ID = 'UCKzSvQnMItdCHelTd9Pg3aQ';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MAX_VIDEOS = 6;
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'youtube.json');

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
      title: title
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"'),
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: thumb || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published: published ? published.split('T')[0] : null,
    });

    if (entries.length >= MAX_VIDEOS) break;
  }
  return entries;
}

async function main() {
  console.log(`Fetching YouTube RSS feed for channel ${CHANNEL_ID}…`);
  try {
    const xml = await get(FEED_URL);
    const videos = parseEntries(xml);
    const output = {
      channel: 'https://www.youtube.com/@5GMAG',
      updated_at: new Date().toISOString().split('T')[0],
      videos,
    };
    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
    console.log(`Wrote ${videos.length} videos to ${OUTPUT}`);
  } catch (err) {
    console.error('Failed to fetch YouTube feed:', err.message);
    if (!fs.existsSync(OUTPUT)) {
      fs.writeFileSync(
        OUTPUT,
        JSON.stringify({ channel: '', updated_at: '', videos: [] }, null, 2)
      );
    }
    throw err;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
