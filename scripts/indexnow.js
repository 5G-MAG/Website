#!/usr/bin/env node
// Tells the search engines that take IndexNow (Bing, Yandex, Seznam, Naver and others) which pages exist, right after a
// deploy, so new and changed pages are crawled in hours instead of weeks. Google does not take IndexNow: it reads
// /sitemap.xml, which is refreshed on every build, and the site's Search Console property (see docs/seo.md).
// The key is a public file at the root of the site (static/<key>.txt); the engine fetches it to check that the site's owner
// sent the request. Run by .github/workflows/deploy.yml, never by the build.
const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.5g-mag.com';
const KEY = fs.readdirSync(path.join(__dirname, '..', 'static')).map((f) => /^([0-9a-f]{32})\.txt$/.exec(f)).filter(Boolean)[0][1];
const sitemap = fs.readFileSync(path.join(__dirname, '..', 'build', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).slice(0, 10000);

const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList });

function send() {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: 'api.indexnow.org', path: '/indexnow', method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body) } },
      (res) => {
        res.resume();
        resolve(res.statusCode);
      }
    );
    req.on('error', reject);
    req.end(body);
  });
}

// Right after a deploy the key file may not be served yet (the engine answers 403); wait and try again.
(async () => {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const status = await send();
    console.log(`IndexNow: ${urlList.length} URLs sent, answer ${status} (attempt ${attempt})`);
    if (status < 300) return;
    await new Promise((r) => setTimeout(r, 60000));
  }
  process.exit(1);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
