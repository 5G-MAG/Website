#!/usr/bin/env node
// Parses every doc file's frontmatter with the same library Docusaurus uses
// (gray-matter) so a broken YAML block (e.g. an unquoted colon in a
// description) is caught here instead of failing `npm run build` deep in
// the webpack/MDX pipeline.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const DOC_DIRS = ['docs/tech', 'docs/home'];

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = DOC_DIRS.flatMap((d) => walk(path.join(ROOT, d), []));
const errors = [];

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  try {
    matter(raw);
  } catch (err) {
    errors.push({ file: path.relative(ROOT, file), message: err.message });
  }
}

// ---------------------------------------------------------------------------
// Data-join validation.
//
// The site joins pages to data through two unrelated key types, neither of
// which fails loudly: <ProjectRepositories project="X"> looks X up as an object
// key in repoMetadata.json, while ProjectReleases / CommunityStats /
// ProjectContributors match a free-text `name` string against projects.json.
// A typo or a rename in either direction renders an empty table or nothing at
// all, with a clean build and no warning. These checks turn that into an error.
const repoMetadata = require(path.join(ROOT, 'src/data/repoMetadata.json'));
const projectsJson = require(path.join(ROOT, 'src/data/projects.json'));
const projectNames = new Set(projectsJson.map((p) => p.name));
const metadataKeys = new Set(Object.keys(repoMetadata));

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);

  for (const m of raw.matchAll(/<ProjectRepositories\s+project="([^"]+)"/g)) {
    if (!metadataKeys.has(m[1])) {
      errors.push({
        file: rel,
        message: `ProjectRepositories project="${m[1]}" has no key in src/data/repoMetadata.json, so the repository table renders empty.`,
      });
    }
  }

  for (const m of raw.matchAll(
    /<(ProjectReleases|CommunityStats|ProjectContributors)\s+name="([^"]+)"/g
  )) {
    if (!projectNames.has(m[2])) {
      errors.push({
        file: rel,
        message: `${m[1]} name="${m[2]}" does not match any project name in src/data/projects.json, so it renders empty.`,
      });
    }
  }

  // A PDF reference that points at a file we do not ship is not a build error:
  // the page renders, the embed is blank and the download button 404s. Slide
  // decks are added to static/docs/ after the page that embeds them is written,
  // so this is the failure mode to expect. References inside MDX comments are
  // skipped, since that is how a page holds ready-to-use markup for a deck that
  // has not arrived yet.
  const live = raw.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  for (const m of live.matchAll(/['"(](\/docs\/[^'")\s]+\.pdf)['")]/g)) {
    if (!fs.existsSync(path.join(ROOT, 'static', m[1]))) {
      errors.push({
        file: rel,
        message: `References ${m[1]}, which is not in static/docs/. The embed renders blank and the download button 404s.`,
      });
    }
  }
}

if (errors.length > 0) {
  console.error(`\nFrontmatter validation failed on ${errors.length} file(s):\n`);
  for (const { file, message } of errors) {
    console.error(`  ${file}\n    ${message.split('\n')[0]}\n`);
  }
  console.error('Common cause: an unquoted "key: value" description containing its own colon.');
  console.error(
    'Fix by wrapping the value in double quotes, e.g. description: "Some text: with a colon."\n'
  );
  process.exit(1);
}

console.log(
  `Frontmatter and data joins OK across ${files.length} doc files ` +
    `(${metadataKeys.size} repo groups, ${projectNames.size} projects).`
);
