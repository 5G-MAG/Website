#!/usr/bin/env node
// Writes the two files that tell a machine what the site and the 5G-MAG repositories are:
//   static/ai-context.json  a registry of the projects and repositories, with the page of each
//   static/llms.txt         the same as a short Markdown index (the llms.txt convention, https://llmstxt.org)
// Everything in them is read from the site's own data (src/data/taxonomy.json, static/data/releases.json); nothing is
// typed here, so the files cannot drift from the pages. Like the news and events data, they are rebuilt on every
// start and build (see package.json's pre* hooks), and no external service or token is needed.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.5g-mag.com';
const taxonomy = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'taxonomy.json'), 'utf8'));
const releases = JSON.parse(fs.readFileSync(path.join(ROOT, 'static', 'data', 'releases.json'), 'utf8'));
const config = fs.readFileSync(path.join(ROOT, 'docusaurus.config.js'), 'utf8');
const TAGLINE = (/tagline:\s*'([^']+)'/.exec(config) || [])[1] || '';

// The label the site's menu gives the software page of a project, by its kind.
const SOFTWARE_LABEL = { 'reference-tool': 'Reference Tools', platform: 'Reference Tools', 'common-tools': 'Reference Tools', testbed: 'Testbeds', 'evaluation-framework': 'Testbeds', 'validation-tool': 'Validation Tools' };

// Who owns a shared repository (the first project of its entry) and the repositories that have a page of their own,
// read from the same files the site's components read, so the registry follows them.
const baskets = fs.readFileSync(path.join(ROOT, 'src', 'data', 'baskets.js'), 'utf8');
const ownerBlock = baskets.slice(baskets.indexOf('SHARED_REPO_OWNERS = {'));
const OWNER = {};
for (const m of ownerBlock.slice(0, ownerBlock.indexOf('};')).matchAll(/^\s*'?([\w.-]+)'?:\s*\[\s*'([^']+)'/gm)) OWNER[m[1]] = m[2];
const repoPages = fs.readFileSync(path.join(ROOT, 'src', 'data', 'repoPages.js'), 'utf8');
const OWN_PAGE = {};
for (const m of repoPages.matchAll(/'([\w.-]+)':\s*'([^']+)'/g)) OWN_PAGE[m[1]] = m[2];

const abs = (p) => (p ? `${SITE}${p.replace(/\/$/, '')}` : null);
// An id from the page path (reference-tools-5gms, testbeds-beyond-2d, tech-beyond-2d), so a project and its tool never share one.
const idOf = (p) => (p.doc_url || p.tech_url || p.standards_url || '').replace(/^\/|\/$/g, '').replace(/\//g, '-');
// The area a repository's metadata is filed under: the last page of the project's technology URL, without a trailing /overview.
const areaOf = (p) => {
  const parts = (p.tech_url || p.doc_url || '').replace(/\/$/, '').split('/').filter(Boolean);
  if (parts[parts.length - 1] === 'overview') parts.pop();
  return (parts.pop() || '').toLowerCase();
};

// The latest release of every repository (releases.json is grouped by project).
const latest = {};
for (const proj of releases.projects || []) {
  for (const r of proj.releases || []) {
    if (!r.tag || r.tag === 'No Release' || !r.date || r.date === '-') continue;
    if (!latest[r.repo] || r.date > latest[r.repo].date) latest[r.repo] = { tag: r.tag, date: r.date, url: r.url };
  }
}

// Repository metadata is grouped by area; a repository listed under two areas keeps the entry of the project that lists it.
const metaGroups = taxonomy.repoMetadata || {};
const metaFor = (slug, areaSlug) => {
  const own = (metaGroups[areaSlug] || []).find((m) => m.repo_slug === slug);
  if (own) return own;
  for (const list of Object.values(metaGroups)) {
    const m = list.find((x) => x.repo_slug === slug);
    if (m) return m;
  }
  return null;
};

// What GitHub itself says about each repository (scripts/fetch-repo-metadata.js, refreshed daily): private or public, licence,
// language, topics and last push. Where it has an entry it wins over the taxonomy's hand-written flags.
let github = {};
try {
  github = JSON.parse(fs.readFileSync(path.join(ROOT, 'static', 'data', 'repo-metadata.json'), 'utf8')).repos || {};
} catch (e) {
  github = {};
}

const projects = [];
const repos = new Map();
for (const p of taxonomy.projects) {
  if (!p.tech_url && !p.doc_url && !p.standards_url) continue;
  const slug = areaOf(p);
  const repoSlugs = (p.repos || []).map((r) => (typeof r === 'string' ? r : r.name));
  projects.push({
    id: idOf(p),
    name: p.name,
    title: p.projectTitle || p.displayName || p.name,
    kind: p.type,
    summary: p.tagline || null,
    standardsBodies: p.sdos || [],
    pages: { technicalAnalysis: abs(p.tech_url), specifications: abs(p.standards_url), software: abs(p.doc_url) },
    relatedProjects: p.relatedProjects || [],
    repositories: repoSlugs,
  });
  for (const rs of repoSlugs) {
    const m = metaFor(rs, slug);
    if (!repos.has(rs)) {
      repos.set(rs, {
        slug: rs,
        name: m?.display_name || rs,
        description: m?.description || github[rs]?.description || null,
        url: m?.repo_url || `https://github.com/5G-MAG/${rs}`,
        licence: m?.license || github[rs]?.license || null,
        licenceSpdx: github[rs]?.license || null,
        language: github[rs]?.language || null,
        topics: github[rs]?.topics || [],
        lastPush: github[rs]?.pushed_at || null,
        standardsBodies: m?.standards || [],
        runsOn: m?.software || [],
        dependsOn: m?.dependencies || [],
        access: (github[rs] ? github[rs].private : m && m.public === false) ? 'early-access' : 'public',
        latestRelease: latest[rs] || null,
        projects: [],
        page: null,
      });
    }
    const r = repos.get(rs);
    r.projects.push(p.name);
    if (!r.page && p.doc_url) r.page = `${abs(p.doc_url)}#repo-${rs}`;
  }
}

// A repository is shown under the project that owns it, first; the others use it.
for (const r of repos.values()) {
  const owner = OWNER[r.slug];
  if (owner && r.projects.includes(owner)) r.projects = [owner, ...r.projects.filter((n) => n !== owner)];
  const ownerProject = taxonomy.projects.find((p) => p.name === r.projects[0]);
  if (OWN_PAGE[r.slug]) r.page = abs(OWN_PAGE[r.slug]);
  else if (ownerProject && ownerProject.doc_url) r.page = `${abs(ownerProject.doc_url)}#repo-${r.slug}`;
  r.project = r.projects[0];
  r.alsoUsedBy = r.projects.slice(1);
}

const registry = {
  about: `Machine-readable map of the 5G-MAG website: its projects, and the repositories behind them. Generated from the site's own data on every build; the pages it links to are the reference.`,
  organisation: {
    name: 'The Media Connectivity Association',
    alternateName: '5G-MAG',
    softwareAccelerator: 'Media Connectivity Software Accelerator',
    url: SITE,
    github: 'https://github.com/5G-MAG',
    description: TAGLINE,
  },
  site: SITE,
  files: { slideDecks: `${SITE}/decks`, llms: `${SITE}/llms.txt`, registry: `${SITE}/ai-context.json`, sitemap: `${SITE}/sitemap.xml` },
  notes: [
    'access "early-access" means the repository is available to members first; the page of the project says how to request it.',
    'standardsBodies names the bodies of the specifications a project or repository relates to; the exact specifications and versions are on the Specifications page of each project.',
  ],
  projects,
  repositories: [...repos.values()],
};
fs.writeFileSync(path.join(ROOT, 'static', 'ai-context.json'), JSON.stringify(registry, null, 2) + '\n');

// llms.txt: a short Markdown index, in the order a reader goes: the projects, then the repositories.
const lines = [];
lines.push('# 5G-MAG', '');
lines.push(`> ${TAGLINE}`, '');
lines.push(
  'The Media Connectivity Association (5G-MAG) is a neutral, not-for-profit association that works across mobile, broadcast and fixed networks, not only 5G. It works in seven areas: content delivery and streaming, immersive media, broadcast and multicast, real-time communications, connected media production, non-terrestrial networks (NTN) and towards 6G media. It publishes technical analysis of media specifications (3GPP, ETSI, MPEG, DVB, Khronos, CAMARA and others), tracks those specifications release by release, and builds open-source software that implements them in the Media Connectivity Software Accelerator. The projects include media streaming, XR and 3D scenes, 5G Broadcast, DVB-I, real-time communication, network APIs, non-terrestrial networks, AI in media services, 6G traffic characterization, and testbeds and validation tools. Membership is open to any organisation: members shape standards early, get early access to pre-public code, test at plugfests, share the cost of open-source development and scale their software projects (https://www.5g-mag.com/membership). Each project below has a Technical Analysis page, a Specifications page and, where software exists, a page for its Reference Tools, Testbeds or Validation Tools.',
  ''
);
lines.push('## Projects', '');
for (const pr of projects) {
  const parts = [];
  if (pr.pages.technicalAnalysis) parts.push(`[Technical Analysis](${pr.pages.technicalAnalysis})`);
  if (pr.pages.specifications) parts.push(`[Specifications](${pr.pages.specifications})`);
  if (pr.pages.software) parts.push(`[${SOFTWARE_LABEL[pr.kind] || 'Software'}](${pr.pages.software})`);
  lines.push(`- ${pr.title}${pr.summary ? `: ${pr.summary}` : ''}. ${parts.join(', ')}`);
}
lines.push('', '## Repositories', '');
for (const r of registry.repositories) {
  lines.push(`- [${r.slug}](${r.url})${r.description ? `: ${r.description.replace(/\s+/g, ' ').trim()}` : ''}${r.access === 'early-access' ? ' (Early Access)' : ''}`);
}
lines.push('', '## Slide decks', '');
lines.push(`- [Slide Decks](${SITE}/decks): the general decks about the programme and one overview deck for every project, as PDF`);
lines.push('', '## Machine-readable', '');
lines.push(`- [ai-context.json](${SITE}/ai-context.json): every project and repository above as JSON, with the page of each, its licence, its standards bodies, its dependencies and its latest release`);
lines.push(`- [sitemap.xml](${SITE}/sitemap.xml): every page of the site`, '');
fs.writeFileSync(path.join(ROOT, 'static', 'llms.txt'), lines.join('\n'));

console.log(`AI registry: ${projects.length} projects, ${registry.repositories.length} repositories -> static/ai-context.json, static/llms.txt`);
