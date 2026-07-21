// Repo -> project mapping used by every fetch-*.js sync script (releases,
// pull requests, community stats). The data itself lives in a single place,
// src/data/projects.json — a plain JSON file so it's loadable both here via
// plain Node `require` (no transpilation available for these scripts) and
// from the website's React pages via a normal JS import, the same way
// src/data/socialLinks.js already serves both docusaurus.config.js and the
// React theme. Add a repo there (not here) to have it tracked everywhere,
// including a future Repositories listing per Reference Tool page.
//
// A repo entry in a project's `repos` array is either a plain string (the
// whole repo, no branch scoping) or `{name, branch}` for a repo that needs
// to be tracked differently per category — e.g. rt-mbms-tx-for-qrd-and-crd
// is 5G Broadcast TV Radio on its `main` branch but 5G Broadcast Emergency
// Alerts on its `emergency-alerts` branch. repoName/repoBranch below
// normalize both shapes.
const PROJECTS = require('../../src/data/projects.json');

function repoName(entry) {
  return typeof entry === 'string' ? entry : entry.name;
}

function repoBranch(entry) {
  return typeof entry === 'string' ? null : entry.branch || null;
}

module.exports = { PROJECTS, repoName, repoBranch };
