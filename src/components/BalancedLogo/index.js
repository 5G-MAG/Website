import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Logos come in every shape, from square marks (Ericsson, Huawei) to long
// wordmarks (InterDigital, Bitstem). Fitting each one into the same box
// (object-fit: contain) makes square logos fill it and wide ones look tiny,
// so this sizes every logo to the same visible area instead, capped by the
// slot. The files themselves are trimmed to their content, so the area is
// the logo's, not its blank margin's.
export default function BalancedLogo({ src, alt = '', area = 5200, maxWidth = 170, maxHeight = 80 }) {
  const ref = useRef(null);
  const [size, setSize] = useState(null);
  const measure = useCallback(() => {
    const img = ref.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    let w = Math.sqrt(area * ratio);
    let h = w / ratio;
    if (w > maxWidth) {
      w = maxWidth;
      h = w / ratio;
    }
    if (h > maxHeight) {
      h = maxHeight;
      w = h * ratio;
    }
    setSize({ width: Math.round(w), height: Math.round(h) });
  }, [area, maxWidth, maxHeight]);
  // An image already decoded before hydration never fires onLoad.
  useEffect(() => {
    if (ref.current?.complete) measure();
  }, [measure]);
  return (
    <span className={styles.slot} style={{ height: maxHeight }}>
      <img ref={ref} src={src} alt={alt} loading="lazy" onLoad={measure} style={size ?? undefined} />
    </span>
  );
}
