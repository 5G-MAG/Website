import { ALL_PROJECTS, ICON_CATALOG } from '@site/src/data/baskets';
import { SLIDE_ICONS } from '@site/src/data/projectIcons';

// A project's icon is its taxonomy.json `icon` key drawn from iconCatalog,
// looked up by the project's name (or displayName), so a release card shows
// the same drawing as the project's own pages. SLIDE_ICONS covers the
// non-project labels (the developer portal's product-type cards).
const PROJECT_ICON_PATHS = {};
for (const p of ALL_PROJECTS) {
  const paths = p.icon && ICON_CATALOG[p.icon];
  if (!paths) continue;
  const markup = paths.map((d) => `<path d="${d}"/>`).join('');
  PROJECT_ICON_PATHS[p.name] = markup;
  if (p.displayName) PROJECT_ICON_PATHS[p.displayName] = markup;
}

export default function ProjectIcon({ name, className }) {
  const paths = PROJECT_ICON_PATHS[name] || SLIDE_ICONS[name];
  if (!paths) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
