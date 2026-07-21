import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import { useNavbarItems, MOBILE_GLOBAL_ITEMS } from '../../../navItems';

// Docusaurus's stock PrimaryMenu reads items straight from
// useThemeConfig().navbar.items (a static config array) — since the
// desktop nav (Navbar/Content) sources its items from navItems.js instead,
// this override keeps the mobile drawer in sync: same item list, plus the
// desktop's icon-only GlobalNavActions (GitHub/Slack/Members Area/Join now!)
// as plain labeled links, since unlabeled icons alone would be a poor fit
// for a vertical text menu.
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = [...useNavbarItems(), ...MOBILE_GLOBAL_ITEMS];
  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        <NavbarItem mobile {...item} onClick={() => mobileSidebar.toggle()} key={i} />
      ))}
    </ul>
  );
}
