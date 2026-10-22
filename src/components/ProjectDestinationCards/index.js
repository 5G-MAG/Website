import { useLocation } from '@docusaurus/router';
import { familyForPath } from '@site/src/utils/projectFamily';
import { TECH_OVERVIEW } from '@site/src/data/techOverviews';
import ProjectTools from '@site/src/components/ProjectTools';
import ListRow, { RowList } from '@site/src/components/ListRow';
import styles from '@site/src/components/ProjectTools/styles.module.css';

// The block every per-project /tech page opens its "How It Works, Today" section with, as two sections of rows: Documentation (Technology and
// Specifications, when they exist), then a Software Accelerator section with the tools that exist, each with its kind (ProjectTools, found
// from the page's address). Extra props that older call sites still pass (the accent) are ignored; a page that has
// one section per testbed passes that testbed's page, and only that testbed is listed.
export default function ProjectDestinationCards({
  analysisHref,
  standardsHref,
  softwareHref,
  softwareIsTestbed = false,
}) {
  // The Technology row always opens the project's overview, whichever page of the project it sits on.
  const { pathname } = useLocation();
  const techUrl = TECH_OVERVIEW[analysisHref]
    ? analysisHref
    : familyForPath(pathname).find((p) => p.tech_url)?.tech_url;
  const analysis = TECH_OVERVIEW[techUrl] || analysisHref;
  return (
    <RowList>
      <h3 className={styles.sectionHead}>Documentation</h3>
      {analysisHref && (
        <ListRow
          href={analysis}
          title="Technical Analysis and Blueprints"
          desc="How this technology works, and what it is good for."
          iconKey="doc-report"
        />
      )}
      {standardsHref && (
        <ListRow
          href={standardsHref}
          title="Specifications"
          desc="The real specifications this technology is built on."
          iconKey="certificate"
        />
      )}
      <ProjectTools only={softwareIsTestbed ? softwareHref : undefined} />
    </RowList>
  );
}
