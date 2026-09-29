import useBrokenLinks from '@docusaurus/useBrokenLinks';

// Registers ids that a page renders itself with Docusaurus's broken-link
// checker. It only knows Markdown headings and <Heading> components, so
// without this every link to such an id is reported as a broken anchor,
// which buries the real ones.
export default function useAnchors(...ids) {
  const brokenLinks = useBrokenLinks();
  for (const id of ids) brokenLinks.collectAnchor(id);
}
