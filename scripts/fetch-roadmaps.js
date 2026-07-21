#!/usr/bin/env node
// Refreshes static/data/roadmaps.json from the org-wide GitHub Projects
// board (5G-MAG project #44), for the /developer/roadmap page. Ported from
// 5G-MAG/Tech's "Sync Project Boards" workflow (Jekyll _data/roadmaps.json),
// with cursor-based pagination added since a 100-item single page is easy
// for a long-running board to exceed over time.
//
// Requires a token as SYNC_TOKEN or GITHUB_TOKEN — unlike the REST-based
// fetch scripts, the GraphQL API always requires authentication, so this
// one cannot run unauthenticated.
const https = require('https');
const fs = require('fs');
const path = require('path');

const ORG = '5G-MAG';
const PROJECT_NUMBER = 44;
const TOKEN = process.env.SYNC_TOKEN || process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'static', 'data', 'roadmaps.json');

const QUERY = `
  query($org: String!, $number: Int!, $cursor: String) {
    organization(login: $org) {
      projectV2(number: $number) {
        items(first: 100, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          nodes {
            content {
              ... on Issue { title url labels(first: 10) { nodes { name } } }
              ... on PullRequest { title url labels(first: 10) { nodes { name } } }
            }
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field { ... on ProjectV2FieldCommon { name } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function graphqlPost(query, variables) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const options = {
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'User-Agent': '5g-mag-portal-roadmaps-script',
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`GraphQL request -> ${res.statusCode}: ${data.slice(0, 300)}`));
          return;
        }
        const parsed = JSON.parse(data);
        if (parsed.errors) {
          reject(new Error(`GraphQL errors: ${JSON.stringify(parsed.errors)}`));
          return;
        }
        resolve(parsed.data);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function fetchAllItems() {
  const items = [];
  let cursor = null;
  for (;;) {
    const data = await graphqlPost(QUERY, { org: ORG, number: PROJECT_NUMBER, cursor });
    const project = data.organization && data.organization.projectV2;
    if (!project)
      throw new Error(`Project #${PROJECT_NUMBER} not found or not visible to this token`);

    for (const node of project.items.nodes) {
      const content = node.content;
      if (!content) continue; // items can point at content the token can't see, or be empty draft items

      let status = 'No Status';
      for (const f of node.fieldValues.nodes) {
        if (f.field && f.field.name === 'Status') status = f.name;
      }

      items.push({
        title: content.title,
        url: content.url,
        status,
        labels: (content.labels ? content.labels.nodes : []).map((l) => l.name),
      });
    }

    if (!project.items.pageInfo.hasNextPage) break;
    cursor = project.items.pageInfo.endCursor;
  }
  return items;
}

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

async function main() {
  if (!TOKEN) {
    throw new Error(
      'SYNC_TOKEN or GITHUB_TOKEN is required — the GraphQL Projects API has no unauthenticated tier.'
    );
  }

  const items = await fetchAllItems();
  const output = {
    updated_at: formatTimestamp(new Date()),
    items,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${items.length} roadmap items to ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
