import ProjectTools from '@site/src/components/ProjectTools';
import { LinkCard } from '@site/src/components/ToolsByKind';
import styles from '@site/src/components/ToolsByKind/styles.module.css';

// The block every per-project /tech page opens its "How It Works, Today" section with: the project's Technology and
// Specifications as small cards, then its Software Accelerator tools by kind (ProjectTools, found from the page's
// address). All of them are the same small card. Extra props that older call sites still pass (the software link,
// accent) are ignored: the tools come from the taxonomy.
export default function ProjectDestinationCards({ analysisHref, standardsHref }) {
  return (
    <>
      <div className={styles.chips} style={{ marginTop: '0.5rem' }}>
        <LinkCard href={analysisHref} label="Technology" iconKey="doc-report" />
        <LinkCard href={standardsHref} label="Specifications" iconKey="certificate" />
      </div>
      <ProjectTools />
    </>
  );
}
