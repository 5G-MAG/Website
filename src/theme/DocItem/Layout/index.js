import React, { useState } from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import { useSidebarToggle } from '@theme/DocRoot/Layout/SidebarToggleContext';
import styles from './styles.module.css';
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}

function SidebarToggleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M9 4l0 16" />
    </svg>
  );
}

function TOCToggleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M15 4l0 16" />
    </svg>
  );
}

function HeaderToggleButton({ icon, titleId, defaultMessage, onClick }) {
  return (
    <button
      type="button"
      className={styles.headerToggleButton}
      onClick={onClick}
      title={translate({
        id: titleId,
        message: defaultMessage,
        description: 'The title attribute for a doc-page layout toggle button',
      })}
      aria-label={translate({
        id: titleId,
        message: defaultMessage,
        description: 'The title attribute for a doc-page layout toggle button',
      })}
    >
      {icon}
    </button>
  );
}

export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  const [tocHidden, setTocHidden] = useState(true);
  const sidebarToggle = useSidebarToggle();
  const showTocToggle = Boolean(docTOC.desktop);
  const showSidebarToggle = Boolean(sidebarToggle?.hasSidebar);
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && !tocHidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={styles.docItemHeaderRow}>
              {showSidebarToggle && (
                <HeaderToggleButton
                  icon={<SidebarToggleIcon />}
                  titleId="theme.docs.sidebar.toggleButtonTitle"
                  defaultMessage="Toggle sidebar"
                  onClick={sidebarToggle.toggleSidebar}
                />
              )}
              <div className={styles.docItemHeaderBreadcrumbs}>
                <DocBreadcrumbs />
              </div>
              {showTocToggle && (
                <HeaderToggleButton
                  icon={<TOCToggleIcon />}
                  titleId="theme.docs.toc.toggleButtonTitle"
                  defaultMessage="Toggle table of contents"
                  onClick={() => setTocHidden((v) => !v)}
                />
              )}
            </div>
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && !tocHidden && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
