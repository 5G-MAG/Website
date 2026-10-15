import ProjectTools, { ProjectRow } from '@site/src/components/ProjectTools';
import styles from '@site/src/components/ProjectTools/styles.module.css';

// The block every per-project /tech page opens its "How It Works, Today" section with, as one list of rows: the
// project's Technology and Specifications, then its Software Accelerator tools with their kind (ProjectTools, found
// from the page's address). Extra props that older call sites still pass (the accent) are ignored; a page that has
// one section per testbed passes that testbed's page, and only that testbed is listed.
export default function ProjectDestinationCards({
  analysisHref,
  standardsHref,
  softwareHref,
  softwareIsTestbed = false,
}) {
  return (
    <div className={styles.list}>
      <ProjectRow
        href={analysisHref}
        title="Technology"
        desc="How this technology works, and what it is good for."
        iconKey="doc-report"
      />
      <ProjectRow
        href={standardsHref}
        title="Specifications"
        desc="The real specifications this technology is built on."
        iconKey="certificate"
      />
      <ProjectTools only={softwareIsTestbed ? softwareHref : undefined} />
    </div>
  );
}
