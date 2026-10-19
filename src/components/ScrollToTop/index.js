import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const THRESHOLD = 300;

/* The stock Docusaurus button only shows while scrolling up, so it is hidden
   when a visitor reaches the bottom of a page. This one shows whenever the
   page is scrolled past THRESHOLD. */
export default function ScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > THRESHOLD);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      title="Back to top"
      tabIndex={shown ? 0 : -1}
      className={clsx('clean-btn', styles.button, shown && styles.shown)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    />
  );
}
