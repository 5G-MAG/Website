import ProjectTools from '@site/src/components/ProjectTools';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import { icon } from '@site/src/components/GodeeperCard';
import { ICON_CATALOG } from '@site/src/data/baskets';

// The block every per-project /tech page opens its "How It Works, Today" section with: the project's Technology and
// Specifications, then its Software Accelerator tools by kind (ProjectTools, found from the page's address). All of
// them are the same big card. Extra props that older call sites still pass (the software link, accent) are ignored:
// the tools come from the taxonomy; a page that has one section per testbed passes that testbed's page.
export default function ProjectDestinationCards({
  analysisHref,
  standardsHref,
  softwareHref,
  softwareIsTestbed = false,
}) {
  return (
    <>
      <div className="godeeper-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <HubDestinationCard
          title="Technology"
          desc="How this technology works, and what it is good for."
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
      {/* A section per testbed (the page loops over them) lists only that testbed; any other page lists the whole project. */}
      <ProjectTools only={softwareIsTestbed ? softwareHref : undefined} />
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
