#!/usr/bin/env node
// Builds static/data/events.json, the agenda behind Home's "Where to Find Us", the hero slides and the Events page,
// from the events' own pages, so adding an event means writing its page and nothing else. Like build-news-data.js it
// needs no network access and runs on every dev and build run (see package.json's pre* hooks).
//
// Two kinds of page carry an event:
//   events-blog/*.mdx   every post is an agenda event (href /events/agenda/<slug>)
//   docs/home/**/*.mdx  an evergreen page that has an `agenda:` block, such as /ibc and /fmt (href is the page's route)
//
// The event is described in an `agenda:` block of the page's frontmatter:
//
//   agenda:
//     title: 5G-MAG at IBC 2026      # short name for the cards; a post falls back to its own title
//     date: 2026-09-11               # first day of the event (not the date the post was published)
//     endDate: 2026-09-14            # optional, for events of several days
//     location: Amsterdam, RAI       # required
//     type: Conference               # a post falls back to its first tag
//     image: /assets/images/...      # a post falls back to its own image
//     flagship: true                 # optional: MWC, IBC and FMT, shown on the hero slideshow further ahead
//
// A problem in any of these fails the run with the file name, so a bad event never reaches the site silently.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, 'static', 'data', 'events.json');
const BLOG_DIR = path.join(ROOT, 'events-blog');
const DOCS_DIR = path.join(ROOT, 'docs', 'home');
const BLOG_ROUTE = '/events/agenda';

const DATE = /^\d{4}-\d{2}-\d{2}$/;

// gray-matter turns an unquoted 2026-09-11 into a Date at UTC midnight.
function dayOf(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === 'string' ? value.trim() : '';
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const errors = [];
const events = [];

function addEvent(file, data, kind) {
  const rel = path.relative(ROOT, file);
  const agenda = data.agenda;
  if (!agenda || typeof agenda !== 'object') {
    errors.push(`${rel}: an event page needs an "agenda:" block (date, location, ...).`);
    return;
  }
  const date = dayOf(agenda.date);
  const endDate = agenda.endDate ? dayOf(agenda.endDate) : null;
  const title = agenda.title || (kind === 'post' ? data.title : '');
  const type = agenda.type || (kind === 'post' && Array.isArray(data.tags) ? data.tags[0] : '');
  const image = agenda.image || (kind === 'post' ? data.image : '');
  const location = agenda.location || '';

  let href;
  if (kind === 'post') {
    const slug = data.slug || path.basename(file).replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
    href = `${BLOG_ROUTE}/${slug}`;
  } else {
    const relDoc = path.relative(DOCS_DIR, file).replace(/\.mdx?$/, '').split(path.sep).join('/');
    href = data.slug ? String(data.slug) : `/${relDoc.replace(/\/index$/, '')}`;
  }

  if (!DATE.test(date)) errors.push(`${rel}: agenda.date must be a day like 2026-09-11 (got "${date}").`);
  if (endDate && !DATE.test(endDate)) errors.push(`${rel}: agenda.endDate must be a day like 2026-09-14 (got "${endDate}").`);
  if (endDate && DATE.test(date) && DATE.test(endDate) && endDate < date) errors.push(`${rel}: agenda.endDate is before agenda.date.`);
  if (!title) errors.push(`${rel}: agenda.title is missing.`);
  if (!type) errors.push(`${rel}: agenda.type is missing (and the post has no tag to fall back to).`);
  if (!image) errors.push(`${rel}: agenda.image is missing (and the post has no image to fall back to).`);
  if (!location) errors.push(`${rel}: agenda.location is missing.`);
  if (image && !fs.existsSync(path.join(ROOT, 'static', image))) errors.push(`${rel}: image ${image} is not in static/.`);

  const event = { date, endDate, title, type, location, href };
  if (agenda.flagship === true) event.flagship = true;
  event.image = image;
  events.push(event);
}

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))) {
  const full = path.join(BLOG_DIR, file);
  addEvent(full, matter(fs.readFileSync(full, 'utf8')).data, 'post');
}
for (const file of walk(DOCS_DIR, [])) {
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  if (data.agenda) addEvent(file, data, 'page');
}

const seen = new Set();
for (const e of events) {
  if (seen.has(e.href)) errors.push(`Two events share the address ${e.href}.`);
  seen.add(e.href);
}

if (errors.length) {
  console.error(`build-events-data: ${errors.length} problem(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

events.sort((a, b) => a.date.localeCompare(b.date) || (a.endDate || '').localeCompare(b.endDate || '') || a.title.localeCompare(b.title));

fs.writeFileSync(OUTPUT, JSON.stringify({ events }, null, 2) + '\n');
console.log(`Wrote ${events.length} events to ${OUTPUT}`);
