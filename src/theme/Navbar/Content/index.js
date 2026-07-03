import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';

// On /tech/* pages, the navbar shows only the Technical Docs & Standards
// menu on the left, and links back to the Developer Portal + GitHub on the
// right — everything else (Reference Tools, Testbeds, Application
// Prototypes, Activity Dashboard, Developer Community) is dev-portal-only
// navigation and doesn't belong here.
const TECH_LEFT_ITEMS = [
  {
    type: 'docSidebar',
    sidebarId: 'tutorialSidebar',
    docsPluginId: 'tech',
    label: 'Technical Docs & Standards',
    position: 'left',
  },
];

const TECH_RIGHT_ITEMS = [
  {to: '/developer', label: 'Developer Portal', position: 'right'},
  {href: 'https://github.com/5G-MAG', label: 'GitHub', position: 'right'},
];

function useNavbarItems(isTechSection) {
  // TODO temporary casting until ThemeConfig type is improved
  const defaultItems = useThemeConfig().navbar.items;
  return isTechSection
    ? [...TECH_LEFT_ITEMS, ...TECH_RIGHT_ITEMS]
    : defaultItems;
}

function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner">
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          'navbar__items',
        )}>
        {left}
      </div>
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right',
        )}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const {pathname} = useLocation();
  const isTechSection = pathname.startsWith('/tech');
  const items = useNavbarItems(isTechSection);
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
