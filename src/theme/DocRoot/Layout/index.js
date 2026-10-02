import React, { useState, useCallback, useMemo } from 'react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import { prefersReducedMotion } from '@docusaurus/theme-common';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import SidebarToggleContext from './SidebarToggleContext';
import styles from './styles.module.css';

export default function DocRootLayout({ children }) {
  const sidebar = useDocsSidebar();
  // Starts open on every doc page (2026-09-27, direct instruction: "make the
  // menu always open on the left... in general always up" -- reversing an
  // earlier "starts collapsed" instruction). The HeaderToggleButton in
  // DocItem/Layout (this same swizzle set) remains the way to collapse it --
  // Docusaurus's own stock CollapseButton/ExpandButton were already removed
  // from this project's DocSidebar/Desktop and this Sidebar component, so
  // that header button is the single, deliberate affordance, not a second
  // one competing with a native one.
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    // onTransitionEnd won't fire when sidebar animation is disabled
    // fixes https://github.com/facebook/docusaurus/issues/8918
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar]);

  const sidebarToggleValue = useMemo(
    () => ({
      hasSidebar: Boolean(sidebar),
      hiddenSidebar,
      toggleSidebar,
    }),
    [sidebar, hiddenSidebar, toggleSidebar]
  );

  return (
    <SidebarToggleContext.Provider value={sidebarToggleValue}>
      <div className={styles.docsWrapper}>
        <div className={styles.docRoot}>
          {sidebar && (
            <DocRootLayoutSidebar
              sidebar={sidebar.items}
              hiddenSidebarContainer={hiddenSidebarContainer}
              hiddenSidebar={hiddenSidebar}
              setHiddenSidebar={setHiddenSidebar}
              toggleSidebar={toggleSidebar}
            />
          )}
          <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
            {children}
          </DocRootLayoutMain>
        </div>
      </div>
    </SidebarToggleContext.Provider>
  );
}
