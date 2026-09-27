import React from 'react';
import styles from './styles.module.css';

const CONTAINER_TONE_CLASS = {
  scope: styles.containerScope,
  system: styles.containerSystem,
  external: styles.containerExternal,
};

const EDGE_STYLE_CLASS = {
  solid: styles.edgeSolid,
  dashed: styles.edgeDashed,
  dotted: styles.edgeDotted,
};

// Spec-derived architecture, drawn as real boxes/containers/lines rather
// than ArchitectureMap's CSS-grid-of-cards -- direct instruction ("take the
// architecture from the 3GPP specifications, convert it to SVG, indicate
// which blocks are implemented and which repo implements them"), corrected
// once already to trace the site's own real reference figure
// (static/img/tech/5gms/5GMS_Downlink.png) rather than an invented layout.
// `entities` is the same real per-entity data ArchitectureMap already reads
// (id, label, repo, repoUrl); `containers` are the real figure's own
// background groupings (UE, 5GMSd Client, 5G System, DN); `nodes` gives
// each entity's box position, hand-traced against that figure, not
// algorithmic; `edges` are the real reference points, with the same line
// style (solid/dashed/dotted) as that figure's own legend.
//
// "Implemented" means "a real repo exists for this box" -- a coarser,
// already-100%-real signal, deliberately not the same claim as the
// Implementation Board below it (which tracks per-feature completeness and
// still carries real, honestly-unaudited placeholders for several rows).
export default function ArchitectureDiagram({ entities, containers, nodes, edges, spec }) {
  const byId = new Map(entities.map((e) => [e.id, e]));
  const topRoute = edges.some((e) => e.route === 'top');
  const topMargin = topRoute ? 34 : 0;
  const maxX = Math.max(...Object.values(nodes).map((n) => n.x + n.w), ...containers.map((c) => c.x + c.w)) + 20;
  const maxY = Math.max(...Object.values(nodes).map((n) => n.y + n.h), ...containers.map((c) => c.y + c.h)) + 20;

  function anchor(id) {
    const n = nodes[id];
    return { cx: n.x + n.w / 2, cy: n.y + n.h / 2, ...n };
  }

  function edgePath(e) {
    const a = anchor(e.from);
    const b = anchor(e.to);

    if (e.route === 'top') {
      const y = -topMargin + 14;
      return {
        d: `M ${a.cx} ${a.y} L ${a.cx} ${y} L ${b.cx} ${y} L ${b.cx} ${b.y}`,
        midX: (a.cx + b.cx) / 2,
        midY: y,
      };
    }
    if (e.route === 'left') {
      const x = Math.min(a.x, b.x) - 12;
      return {
        d: `M ${a.x} ${a.cy} L ${x} ${a.cy} L ${x} ${b.cy} L ${b.x} ${b.cy}`,
        midX: x,
        midY: (a.cy + b.cy) / 2,
      };
    }
    const sameColumn = a.x === b.x;
    const x1 = sameColumn ? a.cx : a.cx < b.cx ? a.x + a.w : a.x;
    const y1 = sameColumn ? (a.cy < b.cy ? a.y + a.h : a.y) : a.cy;
    const x2 = sameColumn ? b.cx : a.cx < b.cx ? b.x : b.x + b.w;
    const y2 = sameColumn ? (a.cy < b.cy ? b.y : b.y + b.h) : b.cy;
    return { d: `M ${x1} ${y1} L ${x2} ${y2}`, midX: (x1 + x2) / 2, midY: (y1 + y2) / 2 };
  }

  return (
    <figure className={styles.wrap}>
      <svg
        viewBox={`0 ${-topMargin} ${maxX} ${maxY + topMargin}`}
        role="img"
        aria-label={`${spec} architecture diagram, entities coloured by whether a real implementing repository exists`}
        className={styles.svg}
      >
        {containers.map((c) => (
          <g key={c.id} className={CONTAINER_TONE_CLASS[c.tone]}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={10} className={styles.containerBox} />
            <text x={c.x + c.w / 2} y={c.y + c.h - 10} textAnchor="middle" className={styles.containerLabel}>
              {c.label}
            </text>
          </g>
        ))}

        {edges.map((e) => {
          const { d, midX, midY } = edgePath(e);
          return (
            <g key={`${e.from}-${e.to}-${e.label}`} className={EDGE_STYLE_CLASS[e.style || 'solid']}>
              <path d={d} fill="none" className={styles.edgeLine} />
              {e.exposedApi && <circle cx={midX} cy={midY} r={5} className={styles.exposedApiDot} />}
              <rect
                x={midX - e.label.length * 3.4 - 4}
                y={midY - 21}
                width={e.label.length * 6.8 + 8}
                height={16}
                rx={3}
                className={styles.edgeLabelBg}
              />
              <text x={midX} y={midY - 9} textAnchor="middle" className={styles.edgeLabel}>
                {e.label}
              </text>
            </g>
          );
        })}

        {Object.entries(nodes).map(([id, n]) => {
          const entity = byId.get(id);
          if (!entity) return null;
          const implemented = Boolean(entity.repo);
          const content = (
            <g className={implemented ? styles.nodeImplemented : styles.nodeMissing}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={8} className={styles.nodeBox} />
              <foreignObject x={n.x + 6} y={n.y + 6} width={n.w - 12} height={n.h - 12}>
                <div className={styles.nodeContent}>
                  <span className={styles.nodeLabel}>{entity.label}</span>
                  {implemented ? (
                    <span className={styles.nodeRepo}>{entity.repo}</span>
                  ) : (
                    <span className={styles.nodeRepoMissing}>no repo yet</span>
                  )}
                </div>
              </foreignObject>
            </g>
          );
          return implemented ? (
            <a key={id} href={entity.repoUrl} target="_blank" rel="noreferrer" className={styles.nodeLink}>
              {content}
            </a>
          ) : (
            <React.Fragment key={id}>{content}</React.Fragment>
          );
        })}
      </svg>
      <figcaption className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendSwatchImplemented}`} /> Real repo exists (click a
          box to open it)
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendSwatchMissing}`} /> No repo yet
        </span>
        <span className={styles.legendItem}>
          <svg width="24" height="10" aria-hidden="true">
            <line x1="0" y1="5" x2="24" y2="5" className={styles.legendLineSolid} />
          </svg>
          5GMSd Scope
        </span>
        <span className={styles.legendItem}>
          <svg width="24" height="10" aria-hidden="true">
            <line x1="0" y1="5" x2="24" y2="5" className={styles.legendLineDotted} />
          </svg>
          Out of scope (M8d)
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} /> Exposed API
        </span>
      </figcaption>
      <p className={styles.omissionNote}>
        NEF and PCF (generic 5G Core functions the AF also connects to over N33/N5) are not shown — they have no
        5G-MAG reference-tools repository of their own and are out of this inventory&apos;s scope, not a difference
        from the real figure.
      </p>
    </figure>
  );
}
