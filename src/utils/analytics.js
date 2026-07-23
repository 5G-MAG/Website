// Google Analytics (GA4), loaded manually rather than via
// @docusaurus/plugin-google-gtag: that plugin injects gtag.js
// unconditionally into every page's <head> at build time, with no way to
// gate it behind consent. Loading it ourselves, only after the visitor
// accepts the cookie banner, means no analytics cookie is ever set
// without consent — matching what /privacy already promises visitors
// ("a cookie banner appears on your first visit... consent request for
// analytics cookies").
//
// Needs a real GA4 Measurement ID from whoever owns/creates the GA
// property (Admin -> Data Streams -> your web stream, format
// "G-XXXXXXXXXX"). Until set, the banner still shows (so the consent
// flow itself can be tested), but accepting is a no-op rather than
// silently loading nothing with no explanation.
export const GA_MEASUREMENT_ID = 'G-SJRJJ9SPWK';

export const GA_CONFIGURED = GA_MEASUREMENT_ID !== 'YOUR_GA_MEASUREMENT_ID';

let loaded = false;

export function loadGoogleAnalytics() {
  if (!GA_CONFIGURED || loaded || typeof window === 'undefined') return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line no-inner-declarations
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  // send_page_view: false — Docusaurus is a client-side-routed SPA, so the
  // initial pageview would fire correctly but subsequent in-app
  // navigations wouldn't; trackPageview() below is called explicitly on
  // every route change instead (see src/theme/Root.js).
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  trackPageview(window.location.pathname + window.location.search);
}

export function trackPageview(path) {
  if (!loaded || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function isAnalyticsLoaded() {
  return loaded;
}
