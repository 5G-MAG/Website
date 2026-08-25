import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Docusaurus's own <Link> does not open an absolute URL in a new tab by
// itself (unlike a real external link convention, that has to be asked
// for) -- auto-detect so every consumer of this component gets that for
// free instead of each having to remember it, the way standards/
// index.js's old CategoryCard did with its own startsWith('http') check.
function CardLink({ href, className, children }) {
  const external = /^https?:\/\//.test(href);
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

// The one shared "destination card" for every hub-family page (tech,
// standards, developer, action, reference-tools, testbeds, applications,
// homepage) -- see styles.module.css for why this exists as a single
// component. `compact` renders the same icon-band/gradient/border visual
// language at a smaller size for dense grids (e.g. 16 topics on one
// page) instead of a fundamentally different card design.
//
// `secondaryLinks`: extra destinations related to the same card (e.g. a
// topic's own Standards page) rendered as their own link rows below the
// main clickable area -- never nested inside it, browsers don't allow an
// <a> inside an <a>.
// `footerLinks`: replaces the single "linkLabel ->" footer with a row of
// named links (e.g. testbeds' Documentation/Roadmap/Releases), for cards
// whose real footer was never one single call to action to begin with.
export default function HubDestinationCard({
  icon,
  title,
  desc,
  href,
  linkLabel = 'Explore more',
  compact = false,
  tag,
  tags,
  secondaryLinks,
  footerLinks,
}) {
  const tagNodes = (
    <>
      {tag && <span className={styles.tag}>{tag}</span>}
      {tags && tags.length > 0 && (
        <div className={styles.tagRow}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );

  // Compact: icon is its own small square badge, title+desc+tags sit in a
  // body block beside it (like a list row). Default: icon and title share
  // one big colored band, desc sits below in its own block (the original
  // ProductTypeCard/ActivityCard layout).
  const mainContent = compact ? (
    <>
      <div className={styles.iconBandCompact}>{icon}</div>
      <div className={styles.bodyCompact}>
        <h4 className={styles.bandTitleCompact}>{title}</h4>
        <p className={styles.descCompact}>{desc}</p>
        {tagNodes}
      </div>
    </>
  ) : (
    <>
      <div className={styles.iconBand}>
        {icon}
        <h3 className={styles.bandTitle}>{title}</h3>
      </div>
      <div className={styles.body}>
        <p className={styles.desc}>{desc}</p>
        {tagNodes}
      </div>
    </>
  );

  // Compact cards skip the big footer bar (it would cost too much
  // vertical space repeated 10-16 times); the icon band + body are
  // themselves the click target, same as before this component existed.
  if (compact) {
    return (
      <div className={styles.compactWrap}>
        <CardLink href={href} className={styles.cardCompact}>
          {mainContent}
        </CardLink>
        {secondaryLinks?.map((s) => (
          <CardLink key={s.href} href={s.href} className={styles.secondaryLink}>
            {s.label}
          </CardLink>
        ))}
      </div>
    );
  }

  if (footerLinks?.length) {
    return (
      <div className={styles.card}>
        <CardLink href={href} className={styles.cardMain}>
          {mainContent}
        </CardLink>
        <div className={clsx(styles.footer, styles.footerLinks)}>
          {footerLinks.map((f) => (
            <CardLink key={f.href} href={f.href}>
              {f.label} &rarr;
            </CardLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <CardLink href={href} className={styles.card}>
      {mainContent}
      <div className={styles.footer}>{linkLabel} &rarr;</div>
    </CardLink>
  );
}
