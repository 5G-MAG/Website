import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';

// Swizzled (2026-07-28) to add each post's frontmatter `image` as a
// thumbnail on the /news list view -- the default theme only ever uses that
// field for the social-card meta tag, never renders it inline. Only shown
// in list view (!isBlogPostPage): the full post page already has its own
// copy of the image inline in the post body itself, so repeating it above
// the title there would just duplicate it.
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

export default function BlogPostItem({ children, className }) {
  const containerClassName = useContainerClassName();
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemThumbnail />
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
