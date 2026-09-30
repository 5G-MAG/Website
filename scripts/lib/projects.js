// Single entry point for every fetch-*.js sync script and every check in
// validate-frontmatter.js. The data itself lives in one place,
// src/data/taxonomy.json — a plain JSON file so it's loadable both here via
// plain Node `require` (no transpilation available for these scripts) and
// from the website's React pages via a normal JS import (src/data/baskets.js
// is that side's equivalent entry point), the same way src/data/socialLinks.js
// already serves both docusaurus.config.js and the React theme. Add a repo
// or a basket to taxonomy.json (not to a second file, and not here) to have
// it tracked everywhere.
//
// A repo entry in a project's `repos` array is either a plain string (the
// whole repo, no branch scoping) or `{name, branch}` for a repo that needs
// to be tracked differently per category — e.g. rt-mbms-tx-for-qrd-and-crd
// is 5G Broadcast TV Radio on its `main` branch but 5G Broadcast Emergency
// Alerts on its `emergency-alerts` branch. repoName/repoBranch below
// normalize both shapes.
const path = require('path');

const TAXONOMY_FILE = path.join(__dirname, '../../src/data/taxonomy.json');
const taxonomyData = require(TAXONOMY_FILE);
const PROJECTS = taxonomyData.projects;
const BASKETS = taxonomyData.baskets;
// Per-repo detail (description, license, standards, dependencies, software,
// public/auxiliary flags) for the <ProjectRepositories project="slug"> card
// list, keyed by the slug literal every project's .mdx pages already hard-
// code -- kept as its own nested object rather than folded into PROJECTS'
// `repos` arrays, since it's a different key (slug, not `name`) and covers
// only some of a project's repos, not all of them.
const REPO_METADATA = taxonomyData.repoMetadata;
// Named icon shapes a project's own `icon` field picks from -- see
// src/data/baskets.js's ICON_CATALOG export for the full rationale.
const ICON_CATALOG = taxonomyData.iconCatalog;
// Every organisation that has signed a CLA (name, href, logo filename) --
// the site-wide roster shown on /license and /community, distinct from a
// single project's own `contributors` field (who has *actively contributed
// code* to that project specifically, a strict subset of this list). Used
// to live in src/data/contributors.js, a second file that could (and did)
// drift from this one; merged in here 2026-09-28 so there is exactly one
// place that knows who's signed.
const CONTRIBUTORS = taxonomyData.contributors;

function repoName(entry) {
  return typeof entry === 'string' ? entry : entry.name;
}

function repoBranch(entry) {
  return typeof entry === 'string' ? null : entry.branch || null;
}

module.exports = { PROJECTS, BASKETS, REPO_METADATA, ICON_CATALOG, CONTRIBUTORS, repoName, repoBranch, TAXONOMY_FILE };
