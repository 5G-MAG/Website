#!/usr/bin/env node
// Parses every doc file's frontmatter with the same library Docusaurus uses
// (gray-matter) so a broken YAML block (e.g. an unquoted colon in a
// description) is caught here instead of failing `npm run build` deep in
// the webpack/MDX pipeline.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const DOC_DIRS = ['docs-tech', 'docs-developer'];

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

if (errors.length > 0) {
  console.error(`\nFrontmatter validation failed on ${errors.length} file(s):\n`);
  for (const { file, message } of errors) {
    console.error(`  ${file}\n    ${message.split('\n')[0]}\n`);
  }
  console.error('Common cause: an unquoted "key: value" description containing its own colon.');
  console.error('Fix by wrapping the value in double quotes, e.g. description: "Some text: with a colon."\n');
  process.exit(1);
}

console.log(`Frontmatter OK across ${files.length} doc files.`);
