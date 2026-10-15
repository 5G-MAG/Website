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
  return (
    <RowList>
      <h3 className={styles.sectionHead}>Documentation</h3>
      {analysisHref && (
        <ListRow
          href={analysisHref}
          title="Technology"
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
