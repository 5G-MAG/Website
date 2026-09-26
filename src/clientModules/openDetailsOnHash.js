// If a URL hash targets a <details> element (or something nested inside
// one), opens every ancestor <details> so the link doesn't land on
// collapsed, invisible content. Needed once pages started folding real
// depth into <details> for progressive disclosure (the 5GMS Technical
// Analysis rewrite, and any future page using the same pattern) while
// external links elsewhere on the site still point at anchors that now sit
// inside one — native anchor scrolling does not open a closed <details> on
// its own.
function openTargetDetails() {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;
  let el;
  try {
    el = document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return;
  }
  if (!el) return;

  let node = el;
  let opened = false;
  while (node) {
    if (node.tagName === 'DETAILS' && !node.open) {
      node.open = true;
      opened = true;
    }
    node = node.parentElement;
  }
  // Layout only settles once `open` takes effect; the browser's own anchor
  // scroll (computed while the content was still collapsed) leaves the
  // target off-screen otherwise.
  if (opened) {
    requestAnimationFrame(() => el.scrollIntoView());
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', openTargetDetails);
  window.addEventListener('load', openTargetDetails);
  // Docusaurus hydrates client-side after this module first evaluates;
  // a short delay lets the target element exist before the first attempt.
  setTimeout(openTargetDetails, 0);
}

export function onRouteDidUpdate() {
  openTargetDetails();
}
