import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { familyForPath } from '@site/src/utils/projectFamily';
import { TOOL_KINDS } from '@site/src/components/ToolsByKind';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import { icon } from '@site/src/components/GodeeperCard';
import { ICON_CATALOG, displayNameOf } from '@site/src/data/baskets';

const GRID = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' };

const KIND_LABEL = {
  'Reference Tools': 'Reference Tool',
  'Testbeds and Evaluation Frameworks': 'Testbed',
  'Validation Tools': 'Validation Tool',
  Platforms: 'Platform',
};

function toolIcon(project) {
  return icon(
    <>
      {(ICON_CATALOG[project.icon] || []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

// The Software Accelerator tools of the project whose page this is, by kind: the same big card as Technology and
// Specifications, so the three read as one block. A tool that has no page yet is listed but not linked.
export default function ProjectTools({ only }) {
  const { pathname } = useLocation();
  const family = familyForPath(pathname);
  const groups = TOOL_KINDS.map((k) => ({
    ...k,
    tools: family.filter(
      (p) =>
        k.test(p) &&
        !p.partOf &&
        (!only || (p.doc_url || '').replace(/\/$/, '') === only.replace(/\/$/, ''))
    ),
  })).filter((g) => g.tools.length > 0);
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ margin: '0 0 1rem' }}>Software Accelerator tools</h3>
      {groups.length === 0 ? (
        <p style={{ margin: 0, color: 'var(--ifm-color-emphasis-700)' }}>
          No tool has been published for this project yet. See the{' '}
          <Link to="/developer">Software Accelerator</Link> for what the programme builds, or{' '}
          <Link to="/contributing">contribute</Link> to build one.
        </p>
      ) : (
        <div style={GRID}>
          {groups.flatMap((g) =>
            g.tools.map((p) => (
              <HubDestinationCard
                key={p.name}
                title={displayNameOf(p)}
                basketLabel={p.type === 'evaluation-framework' ? 'Evaluation Framework' : KIND_LABEL[g.title] || g.title}
                desc={p.doc_url ? p.tagline || '' : 'Coming soon.'}
                href={p.doc_url ? p.doc_url.replace(/\/$/, '') : undefined}
                disabled={!p.doc_url}
                linkLabel="Explore More"
                icon={toolIcon(p)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
