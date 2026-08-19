/**
 * Swizzled (ejected) from @docusaurus/theme-classic's default Layout,
 * whose full source is at
 * node_modules/@docusaurus/theme-classic/lib/theme/Layout/index.js —
 * the only change here is <SectionNav /> inserted between <Navbar /> and
 * the page-content wrapper, so it renders as global chrome on every page
 * (custom src/pages/*.js pages and every docs plugin's pages alike),
 * right below the main navbar, computed from the current route. See
 * src/components/SectionNav for the route -> nav-items resolution.
 */
import React from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { PageMetadata, SkipToContentFallbackId, ThemeClassNames } from '@docusaurus/theme-common';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import SectionNav, { useSection } from '@site/src/components/SectionNav';
import styles from './styles.module.css';

export default function Layout(props) {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;
  // Stamps the current section's accent key on the content wrapper so the
  // per-section accent tokens in custom.css ([data-section='...']) reach
  // page content; SectionNav stamps its own wrapper the same way for the
  // pill bar. Undefined outside any section, so no attribute is rendered
  // and components fall back to brand primary.
  const section = useSection();

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <SectionNav />

      <div
        id={SkipToContentFallbackId}
        data-section={section?.accent}
        className={clsx(
          ThemeClassNames.layout.main.container,
          ThemeClassNames.wrapper.main,
          styles.mainWrapper,
          wrapperClassName
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}
