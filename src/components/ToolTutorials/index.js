import Link from '@docusaurus/Link';
import ListRow, { RowList } from '@site/src/components/ListRow';

// Every tutorial of a tool, listed on its Reference Tools, Testbed or Validation page right under the Start here
// block. The list is read from the tool's folder when the page is built (src/plugins/remark-tool-start-here.mjs),
// so a new tutorial appears here without anyone editing the page.
export default function ToolTutorials({ data }) {
  const { hub, items } = JSON.parse(data);
  return (
    <section aria-label="Tutorials" style={{ margin: '0 0 1.5rem' }}>
      <h2 id="tutorials" style={{ fontSize: '1.15rem', margin: '0 0 0.5rem' }}>
        Tutorials{' '}
        {hub && (
          <Link to={hub} style={{ fontSize: '0.85rem', fontWeight: 500, marginLeft: '0.5rem' }}>
            All tutorials
          </Link>
        )}
      </h2>
      <RowList>
        {items.map((t) => (
          <ListRow key={t.href} href={t.href} title={t.title} desc={t.desc} iconKey="route" />
        ))}
      </RowList>
    </section>
  );
}
