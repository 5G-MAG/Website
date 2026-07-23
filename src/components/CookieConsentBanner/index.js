import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { loadGoogleAnalytics } from '@site/src/utils/analytics';
import styles from './styles.module.css';

const STORAGE_KEY = '5gmag-cookie-consent'; // 'accepted' | 'declined'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted') {
      loadGoogleAnalytics();
    } else if (stored !== 'declined') {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    window.localStorage.setItem(STORAGE_KEY, 'accepted');
    loadGoogleAnalytics();
    setVisible(false);
  }

  function handleDecline() {
    window.localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p className={styles.text}>
        We use analytics cookies to understand how visitors use this site. We only set them with
        your consent — see our <Link to="/privacy">privacy notice</Link> for details.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={handleDecline}>
          Decline
        </button>
        <button type="button" className={styles.accept} onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
