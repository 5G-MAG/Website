import React, {useState, useCallback, useMemo} from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import {prefersReducedMotion} from '@docusaurus/theme-common';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import SidebarToggleContext from './SidebarToggleContext';
import styles from './styles.module.css';

export default function DocRootLayout({children}) {
  const sidebar = useDocsSidebar();
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
    [sidebar, hiddenSidebar, toggleSidebar],
  );

  return (
    <SidebarToggleContext.Provider value={sidebarToggleValue}>
      <div className={styles.docsWrapper}>
        <BackToTopButton />
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
