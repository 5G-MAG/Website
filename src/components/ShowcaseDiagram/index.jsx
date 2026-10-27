import React, { useEffect, useRef } from 'react';
import { DIAGRAMS } from './diagrams';
import { AREA_HEROES } from './areaHeroes';
import { PRODUCTION_DIAGRAMS } from './productionDiagrams';

// A showcase concept diagram. The markup is generated, static and contains no user input. Animated diagrams
// (SMIL) are paused on their first frame for visitors who ask for reduced motion.
// `wide` re-frames the 480 x 310 scene to the picture part of a 16:9 card that keeps its lower 12% for a caption bar
// (the picture is then 88% of the card, a ratio of about 2.02), and stretches the scene's background over the extra
// width: the scene stays centred and fills its area edge to edge instead of being letterboxed.
// A band of headroom above and below the 310 high scene keeps its top and bottom edge elements off the card's border.
const HEAD = 14;
const WIDE_HEIGHT = 310 + 2 * HEAD;
const WIDE_WIDTH = Math.round(WIDE_HEIGHT * (1 / (0.88 * (9 / 16))) * 10) / 10;
const WIDE_X = Math.round(((480 - WIDE_WIDTH) / 2) * 10) / 10;

function widen(markup) {
  return markup
    .replace('viewBox="0 0 480 310"', `viewBox="${WIDE_X} ${-HEAD} ${WIDE_WIDTH} ${WIDE_HEIGHT}"`)
    .replace(/<rect width="100%" height="100%" fill="(url\(#[^)]+\))"\/>/, `<rect x="${WIDE_X}" y="${-HEAD}" width="${WIDE_WIDTH}" height="${WIDE_HEIGHT}" fill="$1"/>`);
}

export default function ShowcaseDiagram({ name, className, wide = false }) {
  const markup = DIAGRAMS[name] ?? AREA_HEROES[name] ?? PRODUCTION_DIAGRAMS[name];
  const ref = useRef(null);
  useEffect(() => {
    const svg = ref.current?.querySelector('svg');
    if (!svg?.pauseAnimations) return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (query.matches) {
        svg.pauseAnimations();
        svg.setCurrentTime(1);
      } else {
        svg.unpauseAnimations();
      }
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [name]);
  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: wide ? widen(markup) : markup }} />;
}
