import { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageNav from '@site/src/components/PageNav';
import { SECTION_NAV, stripBaseUrl } from '@site/src/data/sectionNav';

function matchesPrefix(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

// Rendered once by the swizzled Layout (src/theme/Layout), right below the
// main navbar, on every single page. Replaces the old pattern of each hub
// page importing PageNav and passing its own (self-excluding) item list —
// that meant a page with a real docs sidebar (e.g. /developer/license)
// never got one at all. This looks up the current route in SECTION_NAV and
// renders the same PageNav pill-row for any page under that prefix, hub or
// sidebar page alike; PageNav highlights whichever item matches the
// current route itself, so nothing needs to omit itself from its own list.
//
// The docs sidebar (src/theme/DocRoot/Layout/Sidebar, src/theme/DocSidebar)
// positions itself using only --ifm-navbar-height, with no idea this bar
// exists between the navbar and the content — left alone, it overlaps this
// bar and swallows its clicks. So this measures its own rendered height and
// publishes it as --section-nav-height, which those sidebar stylesheets add
// on top of --ifm-navbar-height. Kept at 0px whenever no section matches
// (most pages), so the sidebar sits exactly where it always did.
export default function SectionNav() {
  const { pathname: rawPathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const pathname = stripBaseUrl(rawPathname, siteConfig.baseUrl);
  const section = SECTION_NAV.find((s) => s.prefixes.some((p) => matchesPrefix(pathname, p)));
  const ref = useRef(null);

  useEffect(() => {
    const setHeight = () => {
      const height = section && ref.current ? ref.current.offsetHeight : 0;
      document.documentElement.style.setProperty('--section-nav-height', `${height}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, [section, pathname]);

  if (!section) return null;
  return (
    <div ref={ref}>
      <PageNav title={section.title} titleHref={section.titleHref} items={section.items} />
    </div>
  );
}
