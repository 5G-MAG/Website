// After every build, writes two files that list every indexable page of the site with its title and description:
//   /llms-full.txt  Markdown, grouped by section, for AI assistants that read the site (the short index is /llms.txt)
//   /pages.json     the same as data
// They are made from the built HTML, so they cannot differ from what a search engine sees, and they are never edited by
// hand. Redirect stubs, the 404 page, the search page and any page marked noindex are left out.
import fs from 'node:fs';
import path from 'node:path';

const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#x27|#39);/g, (m) => entities[m]);

function attr(html, re) {
  const m = html.match(re);
  if (!m) return '';
  return decode(m[1].replace(/^"|"$/g, '')).trim();
}

function* pages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'img') continue;
      yield* pages(full);
    } else if (entry.name === 'index.html') yield full;
  }
}

const SECTIONS = {
  tech: 'Technology: technical analysis of each project',
  standards: 'Standardisation: specifications and contributions',
  'reference-tools': 'Reference Tools of the Media Connectivity Software Accelerator',
  testbeds: 'Testbeds',
  validation: 'Validation Tools',
  tutorials: 'Tutorials',
  news: 'News',
  events: 'Events',
  about: 'About',
  membership: 'Membership',
};

export default function seoIndex() {
  return {
    name: 'seo-index',
    async postBuild({ outDir, siteConfig }) {
      const site = siteConfig.url.replace(/\/$/, '');
      const list = [];
      for (const file of pages(outDir)) {
        const html = fs.readFileSync(file, 'utf8');
        if (/http-equiv=["']?refresh/i.test(html) || /name=["']?robots["']?[^>]*noindex/i.test(html)) continue;
        const url = '/' + path.relative(outDir, path.dirname(file)).split(path.sep).join('/');
        if (url === '/404' || url.startsWith('/search')) continue;
        const title = attr(html, /<title data-rh=["']?true["']?>([^<]*)<\/title>/).replace(/ \| [^|]*$/, '');
        const description = attr(html, /<meta data-rh=["']?true["']? name=["']?description["']? content=("[^"]*"|[^ >]*)/);
        if (!title) continue;
        list.push({ url: url === '/.' || url === '/' ? '/' : url + '/', title, description });
      }
      list.sort((a, b) => a.url.localeCompare(b.url));
      fs.writeFileSync(path.join(outDir, 'pages.json'), JSON.stringify({ site, pages: list.map((p) => ({ ...p, url: site + p.url })) }, null, 1));

      const groups = new Map();
      for (const p of list) {
        const key = p.url.split('/')[1] || 'home';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(p);
      }
      const lines = [
        '# The Media Connectivity Association (5G-MAG): every page',
        '',
        `> Every indexable page of ${site}, with its title and description, grouped by section. The short index is ${site}/llms.txt and the machine-readable map of projects and repositories is ${site}/ai-context.json.`,
        '',
      ];
      for (const [key, items] of groups) {
        lines.push(`## ${SECTIONS[key] || key.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}`, '');
        for (const p of items) lines.push(`- [${p.title}](${site}${p.url})${p.description ? `: ${p.description}` : ''}`);
        lines.push('');
      }
      fs.writeFileSync(path.join(outDir, 'llms-full.txt'), lines.join('\n'));
      // eslint-disable-next-line no-undef
      console.log(`[seo-index] ${list.length} pages -> llms-full.txt, pages.json`);
    },
  };
}
