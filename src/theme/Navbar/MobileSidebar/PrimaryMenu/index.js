import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import { useNavbarItems, MOBILE_GLOBAL_ITEMS } from '../../../navItems';
import { SECTION_NAV, SOLUTIONS_ITEMS, TECHNOLOGY_GROUPS, FACTORY_TOOL_AREAS, FACTORY_VALIDATION_AREAS, FACTORY_TESTBED_AREAS, FACTORY_PLATFORM_AREAS } from '../../../../data/sectionNav';

// Docusaurus's stock PrimaryMenu reads items straight from
// useThemeConfig().navbar.items (a static config array) — since the
// desktop nav (Navbar/Content) sources its items from navItems.js instead,
// this override keeps the mobile drawer in sync: same item list, plus the
// desktop's icon-only GlobalNavActions (GitHub/LinkedIn/Slack/Members Area)
// as plain labeled links, since unlabeled icons alone would be a poor fit
// for a vertical text menu.
//
// The desktop nav's hover flyout (Navbar/Content) shows each pillar's own
// `subtitle` (SECTION_NAV) on hover/focus -- a newcomer on mobile never
// gets that (no hover, and this menu had no flyout mechanism at all), so
// "Standardisation"/"Software Accelerator"/"Deploy" read as
// unglossed internal jargon here (2026-09-27, member-acquisition clarity
// audit). Shown as a plain-text line under the item instead, derived from
// the same SECTION_NAV data the desktop flyout already uses, not a second
// hand-copied set of descriptions.
const NAV_SUBTITLE_BY_HREF = new Map(
  SECTION_NAV.filter((s) => s.subtitle).map((s) => [s.titleHref, s.subtitle])
);

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = [...useNavbarItems(), ...MOBILE_GLOBAL_ITEMS];
  return (
    <ul className="menu__list">
      {items.map((item, i) => {
        const subtitle = NAV_SUBTITLE_BY_HREF.get(item.to);
        return (
          // NavbarItem's mobile variant already renders its own <li
          // className="menu__list-item"> internally (Docusaurus's
          // DefaultNavbarItemMobile) -- wrapping it in another <li> here
          // produced invalid nested-<li> markup. The subtitle instead gets
          // its own sibling <li>, both direct children of this <ul>.
          <React.Fragment key={i}>
            {item.solutionsMenu ? (
              // Solutions has no page: a heading, then each area page with its projects' Technical
              // Analysis indented under it (the desktop mega menu's two parts), then the /tech hub.
              <>
                <li className="menu__list-item">
                  <span className={`menu__link ${item.className || ''}`}>{item.label}</span>
                </li>
                {SOLUTIONS_ITEMS.map((sub) => {
                  const group = TECHNOLOGY_GROUPS.find((g) => g.href === sub.href);
                  return (
                    <React.Fragment key={sub.href}>
                      <NavbarItem mobile to={sub.href} label={sub.label}
                        className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
                      {(group?.items || []).map((p) => (
                        <NavbarItem key={p.href} mobile to={p.href} label={p.label}
                          className="padding-left--lg margin-left--md" style={{ fontSize: '0.85rem' }}
                          onClick={() => mobileSidebar.toggle()} />
                      ))}
                    </React.Fragment>
                  );
                })}
                <NavbarItem mobile to="/tech" label="Where we stand"
                  className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
              </>
            ) : item.to === '/software' ? (
              // Software Factory: its own page, then each kind of software with its areas and projects indented under
              // it, as on desktop. Playgrounds and Deployment Kits are listed as coming soon.
              <>
                <NavbarItem mobile {...item} onClick={() => mobileSidebar.toggle()} />
                {[
                  ['Reference Tools', '/reference-tools', FACTORY_TOOL_AREAS],
                  ['Validation Tools', '/validation', FACTORY_VALIDATION_AREAS],
                  ['Testbeds and Evaluation Frameworks', '/testbeds', FACTORY_TESTBED_AREAS],
                  ['Platforms', '/software#platforms', FACTORY_PLATFORM_AREAS],
                ].map(([title, href, areas]) => (
                  <React.Fragment key={title}>
                    <NavbarItem mobile to={href} label={title}
                      className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
                    {areas.map((g) => (
                      <React.Fragment key={g.title}>
                        {areas.length > 1 && (
                          <li className="menu__list-item">
                            <span className="menu__link padding-left--lg margin-left--md"
                              style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: g.accent }}>
                              {g.title}
                            </span>
                          </li>
                        )}
                        {g.items.map((p) => (
                          <NavbarItem key={p.href} mobile to={p.href} label={p.label}
                            className="padding-left--lg margin-left--lg" style={{ fontSize: '0.85rem' }}
                            onClick={() => mobileSidebar.toggle()} />
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
                <NavbarItem mobile to="/software#playgrounds" label="Playgrounds (coming soon)"
                  className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
                <NavbarItem mobile to="/kits" label="Deployment Kits (coming soon)"
                  className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
                <NavbarItem mobile to="/tutorials" label="Tutorials"
                  className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
              </>
            ) : item.to === '/developer' ? (
              // Software Accelerator Programme: its own page, then the programme pages.
              <>
                <NavbarItem mobile {...item} onClick={() => mobileSidebar.toggle()} />
                {(SECTION_NAV.find((n) => n.titleHref === '/developer')?.items || []).map((sub) => (
                  <NavbarItem key={sub.href} mobile to={sub.href} label={sub.label}
                    className="padding-left--lg" onClick={() => mobileSidebar.toggle()} />
                ))}
              </>
            ) : (
              <NavbarItem mobile {...item} onClick={() => mobileSidebar.toggle()} />
            )}
            {subtitle && (
              <li className="menu__list-item">
                <p
                  style={{
                    margin: '-0.35rem 0 0.35rem',
                    padding: '0 0.75rem',
                    fontSize: '0.8rem',
                    color: 'var(--ifm-color-emphasis-600)',
                  }}
                >
                  {subtitle}
                </p>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
