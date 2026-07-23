import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import CookieConsentBanner from '@site/src/components/CookieConsentBanner';
import { trackPageview, isAnalyticsLoaded } from '@site/src/utils/analytics';

// Fires a GA pageview on every client-side route change. A plain page load
// already gets one from loadGoogleAnalytics() itself (see analytics.js);
// this only covers in-app navigations after that, and is a no-op entirely
// until the visitor has accepted the cookie banner (isAnalyticsLoaded()
// stays false until then).
function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    if (isAnalyticsLoaded()) {
      trackPageview(location.pathname + location.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  return null;
}

// Wraps every page regardless of navbar variant/plugin instance — the one
// swizzle point Docusaurus offers for "mount this globally, once."
export default function Root({ children }) {
  return (
    <>
      {children}
      <RouteChangeTracker />
      <CookieConsentBanner />
    </>
  );
}
