import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import styles from './styles.module.css';

// Swizzled (2026-07-28) to add each post's frontmatter `image` as a
// thumbnail on the /news list view -- the default theme only ever uses that
// field for the social-card meta tag, never renders it inline.
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

function BlogPostItemThumbnail() {
  const { metadata, assets, frontMatter, isBlogPostPage } = useBlogPost();
  const image = assets.image ?? frontMatter.image;
  const resolvedImage = useBaseUrl(image ?? '');
  if (isBlogPostPage || !image) return null;
  return (
    <Link to={metadata.permalink} className="blog-post-thumbnail">
      <img loading="lazy" src={resolvedImage} alt={metadata.title} />
    </Link>
  );
}

// The full post page's own header treatment (2026-08-24 design audit: a
// bare title with no visual header read as unfinished next to every other
// article-style page). Every existing post already hand-authored this same
// frontmatter image inline, immediately below its lead paragraph, with
// identical styling copy-pasted into each -- promoted here to a single
// automatic hero above the title instead, so a new post gets it for free
// and there is one place to change the treatment. The now-redundant inline
// copy was removed from each existing post in the same change.
function BlogPostItemHeroImage() {
  const { metadata, assets, frontMatter, isBlogPostPage } = useBlogPost();
  const image = assets.image ?? frontMatter.image;
  const resolvedImage = useBaseUrl(image ?? '');
  if (!isBlogPostPage || !image) return null;
  return <img loading="lazy" src={resolvedImage} alt={metadata.title} className={styles.heroImage} />;
}

export default function BlogPostItem({ children, className }) {
  const containerClassName = useContainerClassName();
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemThumbnail />
      <BlogPostItemHeroImage />
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
