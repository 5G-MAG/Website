import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';

// Swizzled (2026-07-28): the default theme uses a flat 3rem for this title
// in both contexts, which reads fine as a real post's own <h1> but far too
// large as a repeated <h2> in the /news list view -- each post's own image
// thumbnail (also added this session) makes the oversized title even more
// cramped above the fold. Same 3rem for the real post page, a smaller size
// for the list.
export default function BlogPostItemHeaderTitle({ className }) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { permalink, title } = metadata;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  return (
    <TitleHeading
      className={clsx(isBlogPostPage ? styles.title : styles.titleList, className)}
    >
      {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
    </TitleHeading>
  );
}
