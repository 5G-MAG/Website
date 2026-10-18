import React, { memo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { groupBlogSidebarItemsByYear } from '@docusaurus/plugin-content-blog/client';

// Docusaurus's own BlogSidebar/Content, with one change: a year in the sidebar is the label of its group, not a
// heading. The original makes it an h3, which on these pages follows the page's h1 and skips h2.
function BlogSidebarYearGroup({ year, yearGroupHeadingClassName, children }) {
  return (
    <div role="group" aria-label={year}>
      <div className={yearGroupHeadingClassName} aria-hidden="true">
        {year}
      </div>
      {children}
    </div>
  );
}

function BlogSidebarContent({ items, yearGroupHeadingClassName, ListComponent }) {
  const themeConfig = useThemeConfig();
  if (themeConfig.blog.sidebar.groupByYear) {
    const itemsByYear = groupBlogSidebarItemsByYear(items);
    return (
      <>
        {itemsByYear.map(([year, yearItems]) => (
          <BlogSidebarYearGroup key={year} year={year} yearGroupHeadingClassName={yearGroupHeadingClassName}>
            <ListComponent items={yearItems} />
          </BlogSidebarYearGroup>
        ))}
      </>
    );
  }
  return <ListComponent items={items} />;
}

export default memo(BlogSidebarContent);
