// Puts the "Start here" block of a tool (ToolStartHere) or of a standards page (StandardsStartHere) right under the page's banner. A tool's landing page
// (docs/home/{reference-tools,testbeds,validation}/<tool>/index.mdx) opens with a hand-written banner,
// <div class="topic-banner">; this adds <ToolStartHere /> as the next element after it, so the block sits under the
// banner on every tool page without editing each page. ToolStartHere is registered in src/theme/MDXComponents.js.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const STANDARDS_PAGE = /[\\/]docs[\\/]home[\\/]standards[\\/][^\\/]+\.mdx?$/;
const TOOL_PAGE = /[\\/]docs[\\/]home[\\/](reference-tools|testbeds|validation)[\\/][^\\/]+[\\/]index\.mdx?$/;


// The tutorials of a tool, read from its folder when the page is built: every page in tutorials/ (but its index) and
// every flat tutorial-*.mdx beside the tool page. The tool page then lists them all, so each tutorial is one click
// from the Reference Tools, Testbed or Validation page, whatever the menu shows.
function tutorialsOf(file) {
  const dir = path.dirname(file);
  const m = /[\\/]docs[\\/]home[\\/]([^\\/]+)[\\/]([^\\/]+)$/.exec(dir);
  if (!m) return [];
  const base = `/${m[1]}/${m[2]}`;
  const found = [];
  const add = (abs, url, nested = false) => {
    const { data } = matter(fs.readFileSync(abs, 'utf8'));
    found.push({
      title: data.sidebar_label || data.title,
      desc: typeof data.description === 'string' ? data.description : '',
      href: data.slug && data.slug.startsWith('/') ? data.slug : url,
      position: (data.sidebar_position ?? 1e6) + (nested ? 1e7 : 0),
    });
  };
  // tutorials/ and the folders inside it (5GMS: tutorials/application-function/), the folders' pages after the others
  const walk = (abs, url, nested) => {
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      if (e.name.startsWith('_') || e.name.startsWith('.')) continue;
      if (e.isDirectory()) walk(path.join(abs, e.name), `${url}/${e.name}`, true);
      else if (/\.mdx?$/.test(e.name) && !/^index\.mdx?$/.test(e.name)) {
        add(path.join(abs, e.name), `${url}/${e.name.replace(/\.mdx?$/, '')}`, nested);
      }
    }
  };
  const sub = path.join(dir, 'tutorials');
  if (fs.existsSync(sub)) walk(sub, `${base}/tutorials`, false);
  for (const f of fs.readdirSync(dir)) {
    if (/^tutorial-.*\.mdx?$/.test(f)) add(path.join(dir, f), `${base}/${f.replace(/\.mdx?$/, '')}`);
  }
  found.sort((a, b) => a.position - b.position || a.title.localeCompare(b.title));
  const hub = fs.existsSync(path.join(dir, 'tutorials.mdx')) || fs.existsSync(path.join(dir, 'tutorials', 'index.mdx'));
  return found.length ? [{ hub: hub ? `${base}/tutorials` : null, items: found }] : [];
}

function isBanner(node) {
  return (
    node.type === 'mdxJsxFlowElement' &&
    node.name === 'div' &&
    (node.attributes || []).some(
      (a) => a.name === 'class' && typeof a.value === 'string' && a.value.split(/\s+/).includes('topic-banner'),
    )
  );
}

export default function remarkToolStartHere() {
  return (tree, file) => {
    const name = TOOL_PAGE.test(file.path || '')
      ? 'ToolStartHere'
      : STANDARDS_PAGE.test(file.path || '') && !/-standards-evolution\.mdx?$/.test(file.path)
        ? 'StandardsStartHere'
        : null;
    if (!name) return;
    // A page can opt out with `start_here: false` in its front matter.
    if (matter(String(file.value || '')).data.start_here === false) return;
    const i = tree.children.findIndex(isBanner);
    if (i === -1) return;
    tree.children.splice(i + 1, 0, {
      type: 'mdxJsxFlowElement',
      name,
      attributes: [],
      children: [],
    });
    if (name === 'ToolStartHere') {
      const [t] = tutorialsOf(file.path);
      if (t) {
        tree.children.splice(i + 2, 0, {
          type: 'mdxJsxFlowElement',
          name: 'ToolTutorials',
          attributes: [{ type: 'mdxJsxAttribute', name: 'data', value: JSON.stringify(t) }],
          children: [],
        });
      }
    }
  };
}
