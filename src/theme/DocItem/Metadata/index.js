import Metadata from '@theme-original/DocItem/Metadata';
import { PageMetadata } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ALL_PROJECTS, displayNameOf, projectTitleOf } from '@site/src/data/baskets';

// Page titles that are the same on every project ("Tutorials", "Features"): search engines list them as duplicates, and a
// result that says only "Tutorials" does not say whose. The project's name is added to the <title> and the social title;
// the heading on the page is unchanged.
const GENERIC_TITLES = new Set([
  'Tutorials',
  'Implementation Detail',
  'Features',
  'Architecture',
  'Requirements',
  'Reference Scenarios',
  'Using CAMARA APIs',
  'Workflows',
  'Introduction',
]);
const TOOL_LABEL = { 'reference-tools': 'Reference Tools', testbeds: 'Testbed', validation: 'Validation Tool' };
const SECTION_ROOTS = new Set(['tech', 'reference-tools', 'testbeds', 'validation', 'standards']);

const lastSegment = (url) => (url || '').replace(/\/+$/, '').split('/').pop();
const words = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const PROJECT_TITLES = new Set(ALL_PROJECTS.flatMap((p) => [projectTitleOf(p), displayNameOf(p), p.name]));

function projectOf(segments) {
  return ALL_PROJECTS.find((p) => lastSegment(p.tech_url) === segments[1] || lastSegment(p.doc_url) === segments[1]);
}

export function qualifiedTitle(title, permalink) {
  const segments = permalink.split('/').filter(Boolean);
  if (segments.length < 2 || !SECTION_ROOTS.has(segments[0])) return null;
  const project = projectOf(segments);
  if (!project && segments[0] === 'standards' && segments.length === 2 && PROJECT_TITLES.has(title) && !/specification/i.test(title)) return `${title}: Specifications`;
  if (!project) return null;
  // A tool, testbed or validator page is named after the tool; a technology or specifications page after the project.
  const toolPage = ['reference-tools', 'testbeds', 'validation'].includes(segments[0]);
  const name = toolPage ? displayNameOf(project) : projectTitleOf(project);
  if (GENERIC_TITLES.has(title)) {
    const area = segments[0] === 'tech' && segments.length > 3 ? `${words(segments[2])}, ` : '';
    return `${title}: ${area}${name}`;
  }
  // A project's own page and its overview share one name; the overview says so.
  if (segments[0] === 'tech' && segments[segments.length - 1] === 'overview' && title === name) return `${title}: Overview`;
  // The page of a tool, testbed or validator and the page of its project share one name; the tool's page says so.
  if (toolPage && segments.length === 2 && title === name) return `${title}: ${TOOL_LABEL[segments[0]]}`;
  // The specifications page of a project carries the project's own name; say so, so it differs from its technology page.
  if (segments[0] === 'standards' && segments.length === 2 && !/specification/i.test(title)) return `${title}: Specifications`;
  return null;
}

export default function MetadataWrapper(props) {
  const { metadata } = useDoc();
  const title = qualifiedTitle(metadata.title, metadata.permalink);
  return (
    <>
      <Metadata {...props} />
      {title && <PageMetadata title={title} />}
    </>
  );
}
