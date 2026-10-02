import React, { useEffect, useRef } from 'react';
import { DIAGRAMS } from './diagrams';

// A showcase concept diagram. The markup is generated, static and contains no user input. Animated diagrams
// (SMIL) are paused on their first frame for visitors who ask for reduced motion.
export default function ShowcaseDiagram({ name, className }) {
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
  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: DIAGRAMS[name] }} />;
}
