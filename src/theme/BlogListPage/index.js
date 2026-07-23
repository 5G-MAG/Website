import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { SLACK_INVITE_URL, SOCIAL_LINKS } from '@site/src/data/socialLinks';
import styles from '@site/src/pages/tech/index.module.css';

// News is served directly by the blog plugin (routeBasePath: 'news') --
// there is no separate src/pages/news/index.js hub anymore, since News *is*
// the blog: every post here is a news item, not two parallel concepts. This
// swizzled BlogListPage adds the same HubHero banner every other hub page
// uses, in place of Docusaurus's plain default title/description header.
const NEWS_ICON_PATH = (
  <>
    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
    <path d="M8 8l4 0" />
    <path d="M8 12l4 0" />
    <path d="M8 16l4 0" />
  </>
);

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function NewsHero() {
  const linkedin = SOCIAL_LINKS.find((s) => s.key === 'linkedin').href;
  return (
    <>
      <HubHero
        title="News"
        icon={NEWS_ICON_PATH}
        actions={[
          <a
            key="linkedin"
            className="button button--primary button--lg"
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            Follow on LinkedIn
          </a>,
          <Link
            key="podcast"
            className="button button--outline button--primary button--lg"
            to="/podcast"
          >
            Listen to the Podcast
          </Link>,
          <Link
            key="subscribe"
            className="button button--outline button--primary button--lg"
            to="/subscribe"
          >
            Subscribe to Updates
          </Link>,
        ]}
      />
      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">
          Announcements and updates from 5G-MAG. Follow{' '}
          <a href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          ,{' '}
          <a href={SLACK_INVITE_URL} target="_blank" rel="noreferrer">
            Slack
          </a>
          , or <Link to="/subscribe">subscribe by email</Link> for the latest updates.
        </p>
      </div>
    </>
  );
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <div className="container margin-vert--lg">
      <div className="row">
        <BlogSidebar sidebar={sidebar} />
        <main className={clsx('col', hasSidebar ? 'col--7' : 'col--9 col--offset-1')}>
          <BlogPostItems items={items} />
          <BlogListPaginator metadata={metadata} />
        </main>
      </div>
    </div>
  );
}

function PodcastPromo() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Podcast</h2>
        <p className={styles.sectionSubtitle}>
          The Handshake by 5G-MAG — connecting technology with the people behind it.
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link className="button button--primary button--lg" to="/podcast">
            Listen to Episodes
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BlogListPage(props) {
  const isFirstPage = props.metadata.page === 1;
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <Layout>
        {isFirstPage && <NewsHero />}
        <BlogListPageContent {...props} />
        {isFirstPage && (
          <>
            <PodcastPromo />
            <JoinTheEffort alt />
          </>
        )}
      </Layout>
    </HtmlClassNameProvider>
  );
}
