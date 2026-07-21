import { useEffect, useId, useRef, useState } from 'react';
import styles from './styles.module.css';

// Shared by the hero on the homepage, /tech and /developer: detects the
// user's OS/browser-level "reduce motion" preference and keeps it in sync
// if the setting changes while the page is open (e.g. toggled in system
// settings without a reload).
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// Radius (in viewBox units) within which the cursor pushes a tile away,
// and the max distance a tile can be shoved — a playful "disturb the
// cloud" hover effect, skipped entirely under prefers-reduced-motion.
const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 46;

// The floating, cursor-repelled "icon cloud" used across the homepage,
// /tech and /developer heroes. Each page supplies its own `tiles` array
// (position/size/color/icon path); this component owns only the shared
// mechanism: the gentle float animation, the mouse-repel physics, and the
// prefers-reduced-motion gating that turns both off.
//
// tiles: Array<{ cx: number, cy: number, size: number, rot: number, color: string, d: string }>
//   - cx/cy: tile center, in the 950x560 viewBox coordinate space
//   - size: tile edge length (square tiles)
//   - rot: rotation in degrees
//   - color: tile background fill
//   - d: SVG path `d` attribute for the (single-path, tabler-style) icon drawn on the tile
export default function HeroFigure({ tiles }) {
  const reducedMotion = usePrefersReducedMotion();
  const svgRef = useRef(null);
  const tileRefs = useRef([]);
  const rafRef = useRef(null);
  const shadowFilterId = useId();

  const settleTiles = () => {
    tileRefs.current.forEach((el) => {
      if (el) el.style.transform = 'translate(0px, 0px)';
    });
  };

  const repelTiles = (mouseX, mouseY) => {
    tiles.forEach((t, i) => {
      const el = tileRefs.current[i];
      if (!el) return;
      const dx = t.cx - mouseX;
      const dy = t.cy - mouseY;
      const dist = Math.hypot(dx, dy) || 0.001;
      if (dist >= REPEL_RADIUS) {
        el.style.transform = 'translate(0px, 0px)';
        return;
      }
      const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
      el.style.transform = `translate(${(dx / dist) * push}px, ${(dy / dist) * push}px)`;
    });
  };

  const handleMouseMove = (e) => {
    if (reducedMotion || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 950;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 560;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => repelTiles(mouseX, mouseY));
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    settleTiles();
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 950 560"
      className={styles.heroFigure}
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <filter id={shadowFilterId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#001a33" floodOpacity="0.35" />
        </filter>
      </defs>

      {tiles.map((t, i) => {
        const iconScale = (t.size * 0.62) / 24;
        return (
          <g key={i} ref={(el) => (tileRefs.current[i] = el)} className={styles.tileRepel}>
            <g transform={`translate(${t.cx},${t.cy}) rotate(${t.rot})`}>
              <g>
                {!reducedMotion && (
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 -7; 0 0"
                    dur={`${3.4 + (i % 3) * 0.5}s`}
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                    keyTimes="0; 0.5; 1"
                  />
                )}
                <rect
                  x={-t.size / 2}
                  y={-t.size / 2}
                  width={t.size}
                  height={t.size}
                  rx={t.size * 0.24}
                  fill={t.color}
                  filter={`url(#${shadowFilterId})`}
                />
                <g
                  transform={`translate(${-12 * iconScale},${-12 * iconScale}) scale(${iconScale})`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={t.d} />
                </g>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
