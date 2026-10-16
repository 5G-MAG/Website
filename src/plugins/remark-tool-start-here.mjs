// Puts the "Start here" block of a tool right under the page's banner. A tool's landing page
// (docs/home/{reference-tools,testbeds,validation}/<tool>/index.mdx) opens with a hand-written banner,
// <div class="topic-banner">; this adds <ToolStartHere /> as the next element after it, so the block sits under the
// banner on every tool page without editing each page. ToolStartHere is registered in src/theme/MDXComponents.js.
const TOOL_PAGE = /[\\/]docs[\\/]home[\\/](reference-tools|testbeds|validation)[\\/][^\\/]+[\\/]index\.mdx?$/;

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
    if (!TOOL_PAGE.test(file.path || '')) return;
    const i = tree.children.findIndex(isBanner);
    if (i === -1) return;
    tree.children.splice(i + 1, 0, {
      type: 'mdxJsxFlowElement',
      name: 'ToolStartHere',
      attributes: [],
      children: [],
    });
  };
}
