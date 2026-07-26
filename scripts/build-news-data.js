#!/usr/bin/env node
// Refreshes static/data/news.json: the latest blog posts (title, date,
// slug, a short excerpt), feeding Home's hero slideshow. Unlike the
// fetch-*.js scripts, this needs no external API or token -- blog/ is
// local content, so it's cheap enough to regenerate on every dev/build
// run (see package.json's pre* hooks) rather than on a schedule.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUTPUT = path.join(ROOT, 'static', 'data', 'news.json');

// Blog post filenames are Docusaurus's own YYYY-MM-DD-slug.md(x) convention
// -- the date prefix is the authoritative publish date (matches what
// Docusaurus itself uses to sort/display the blog when frontmatter has no
// explicit `date:`), not each file's filesystem mtime.
const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})-/;

// First real paragraph before the truncate marker, for a short excerpt --
// strips MDX import lines and blank lines, which aren't post content.
function extractExcerpt(body) {
  const truncateIdx = body.search(/<!--\s*truncate\s*-->|\{\/\*\s*truncate\s*\*\/\}/);
  const beforeTruncate = truncateIdx === -1 ? body : body.slice(0, truncateIdx);
  const lines = beforeTruncate
    .split('\n')
    .filter((line) => line.trim() && !line.trim().startsWith('import '));
  return lines.join(' ').replace(/\s+/g, ' ').trim();
}

function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const dateMatch = file.match(DATE_PREFIX);
    const date = data.date || (dateMatch ? dateMatch[1] : null);
    const slug = data.slug || file.replace(/\.mdx?$/, '').replace(DATE_PREFIX, '');
    return {
      title: data.title,
      date,
      slug,
      tags: data.tags || [],
      image: data.image || null,
      excerpt: extractExcerpt(content),
    };
  });

  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const output = { updated_at: new Date().toISOString(), posts };
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${posts.length} posts to ${OUTPUT}`);
}

main();
