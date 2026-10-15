import ProjectTools from '@site/src/components/ProjectTools';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import { icon } from '@site/src/components/GodeeperCard';
import { ICON_CATALOG } from '@site/src/data/baskets';

// The row every per-project /tech page opens its "How It Works, Today" section with: the project's Technology and
// Specifications, then its Software Accelerator tools by kind (ProjectTools, found from the page's address). Icons
// come from the shared ICON_CATALOG (src/data/taxonomy.json). Extra props that older call sites still pass (the
// software link, accent) are ignored: the tools come from the taxonomy.
export default function ProjectDestinationCards({ analysisHref, standardsHref }) {
  return (
    <>
      <div
        className="godeeper-grid"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
      >
        <HubDestinationCard
          title="Technology"
          desc="A blueprint of how this technology works, and what it's good for."
          href={analysisHref}
          linkLabel="Explore More"
          icon={icon(iconPaths('doc-report'))}
        />
        <HubDestinationCard
          title="Specifications"
          desc="The real specifications this technology is built on."
          href={standardsHref}
          linkLabel="Explore More"
          icon={icon(iconPaths('certificate'))}
        />
      </div>
      <ProjectTools />
    </>
  );
}

function iconPaths(key) {
  const paths = ICON_CATALOG[key];
  return (
    <>
      {(paths || []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}
