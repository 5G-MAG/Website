#!/usr/bin/env node
// Refreshes static/data/releases.json: the latest GitHub release for
// every repo in every 5G-MAG project, feeding the /developer/releases
// page. Repos/projects with no public releases yet are simply omitted.
//
// Requires a token with public read access as SYNC_TOKEN or GITHUB_TOKEN
// (any authenticated token works). Without one, limited to 60 req/hour.
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const ORG    = '5G-MAG';
const TOKEN  = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'releases.json');

// Curated repo -> project mapping, matching the categories used on the
// Activity Dashboard. Add a repo here to have its releases tracked.
const PROJECTS = [
  {
    name: '5G Media Streaming',
    doc_url: '/developer/5gms/',
    tagline: 'End-to-end 5G media streaming from network to client · 3GPP TS 26.501',
    repos: [
      'rt-5gms-application-function', 'rt-5gms-application-server', 'rt-5gms-application',
      'rt-5gms-media-session-handler', 'rt-5gms-media-stream-handler',
      'rt-5gms-common-android-library', 'rt-5gms-application-provider', 'rt-common-shared',
    ],
  },
  {
    name: '5G Broadcast TV Radio',
    doc_url: '/developer/5g-broadcast/',
    tagline: 'LTE-based 5G broadcast for TV, radio and emergency alerts',
    repos: ['rt-mbms-mw', 'rt-mbms-modem', 'rt-mbms-tx', 'rt-wui', 'rt-mbms-mw-android', 'rt-libflute'],
  },
  {
    name: 'XR Media',
    doc_url: '/developer/xr/',
    tagline: 'MPEG-I scene description and XR media integration over 5G',
    repos: ['rt-xr-unity-player', 'rt-xr-maf-native', 'rt-xr-content', 'rt-xr-blender-exporter'],
  },
  {
    name: '5G Multicast Broadcast',
    doc_url: '/developer/5g-mbs/',
    tagline: '5G-native multicast and broadcast services · 3GPP 5G MBS',
    repos: ['rt-mbs-function', 'rt-mbs-transport-function', 'rt-mbs-examples'],
  },
  {
    name: 'UE Data Collection',
    doc_url: '/developer/data-collection/',
    tagline: 'UE-side data collection, reporting and event exposure · 3GPP TS 26.531',
    repos: ['rt-data-collection-application-function'],
  },
  {
    name: 'V3C Immersive',
    doc_url: '/developer/v3c/',
    tagline: 'V3C volumetric video platform for immersive 5G experiences',
    repos: ['rt-v3c-unity-player', 'rt-v3c-decoder-plugin', 'rt-v3c-content'],
  },
  {
    name: '5GC Service Consumers',
    doc_url: '/developer/5g-core/',
    tagline: 'Reference consumers for 5G Core capability exposure APIs',
    repos: ['rt-5gc-service-consumers'],
  },
  {
    name: 'Beyond 2D Video Experiences',
    doc_url: '/developer/beyond-2d/',
    tagline: 'Evaluation framework for beyond-2D video experiences',
    repos: ['rt-beyond2d-evaluation-framework'],
  },
  {
    name: '6G Testbed and AI Traffic',
    doc_url: '/developer/6g-testbed/',
    tagline: '6G testbed and AI-driven traffic characterization',
    repos: ['6G-Testbed'],
  },
  {
    name: 'Network APIs',
    doc_url: '/developer/network-apis/',
    tagline: 'Network capability exposure through CAMARA APIs',
    repos: ['rt-camara-examples'],
  },
];

function apiGet(urlPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'User-Agent': '5g-mag-portal-releases-script',
        Accept: 'application/vnd.github+json',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 404) {
          resolve(null); // no releases for this repo
          return;
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`${urlPath} -> ${res.statusCode}: ${data.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function latestRelease(repo) {
  const release = await apiGet(`/repos/${ORG}/${repo}/releases/latest`);
  if (!release) return null;
  return {
    repo,
    tag: release.tag_name,
    date: release.published_at ? release.published_at.slice(0, 10) : '-',
    blink: false,
    url: release.html_url,
    author_login: release.author ? release.author.login : null,
    author_avatar: release.author ? release.author.avatar_url : null,
  };
}

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) {
    console.warn('Warning: no SYNC_TOKEN/GITHUB_TOKEN set — limited to 60 requests/hour.');
  }

  const projects = [];
  for (const project of PROJECTS) {
    const releases = [];
    for (const repo of project.repos) {
      let release;
      try {
        release = await latestRelease(repo);
      } catch (e) {
        console.warn(`  skip ${repo}: ${e.message}`);
        continue;
      }
      if (release) releases.push(release);
    }
    console.log(`${project.name}: ${releases.length}/${project.repos.length} repos have a release`);
    if (releases.length === 0) continue;

    releases.sort((a, b) => b.date.localeCompare(a.date));
    // Mark the single most recent release across the whole project.
    releases[0].blink = true;

    projects.push({
      name: project.name,
      doc_url: project.doc_url,
      tagline: project.tagline,
      latest_date: releases[0].date,
      releases,
    });
  }

  const output = {
    updated_at: formatTimestamp(new Date()),
    projects,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${projects.length} projects to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
