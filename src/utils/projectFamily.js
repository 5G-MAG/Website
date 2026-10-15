import { ALL_PROJECTS } from '@site/src/data/baskets';

const lastSegment = (url) => (url ? url.replace(/\/$/, '').split('/').pop() : null);

// The pages of a project's family, found from the first segment after the section (/tech/5gms/features -> '5gms'):
// every taxonomy entry whose Technology, Specifications or software page has that slug, and the entries that are
// part of one of them (a testbed of a project). A testbed or validator that shares its project's Technology and
// Specifications pages is in the same family.
export const PROJECT_SECTIONS = ['tech', 'standards', 'reference-tools', 'testbeds', 'validation'];

export function familyForPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2 || !PROJECT_SECTIONS.includes(parts[0])) return [];
  const slug = parts[1];
  const direct = ALL_PROJECTS.filter(
    (p) =>
      lastSegment(p.tech_url) === slug ||
      lastSegment(p.standards_url) === slug ||
      lastSegment(p.doc_url) === slug,
  );
  const names = new Set(direct.map((p) => p.name));
  const children = ALL_PROJECTS.filter((p) => p.parent && names.has(p.parent) && !names.has(p.name));
  return [...direct, ...children];
}
