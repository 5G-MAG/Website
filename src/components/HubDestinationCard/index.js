import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Docusaurus's own <Link> does not open an absolute URL in a new tab by
// itself (unlike a real external link convention, that has to be asked
// for) -- auto-detect so every consumer of this component gets that for
// free instead of each having to remember it, the way standards/
// index.js's old CategoryCard did with its own startsWith('http') check.
function CardLink({ href, className, style, children }) {
  const external = /^https?:\/\//.test(href);
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className} style={style}>
      {children}
    </a>
  ) : (
    <Link to={href} className={className} style={style}>
      {children}
    </Link>
  );
}

// A darker shade of a basket's own accent (see BASKET_ACCENT in
// src/data/baskets.js) for the icon band's gradient dark stop -- the
// gradient's own light stop is the accent color itself, unchanged. Kept
// local: nothing outside this card's own gradient needs a darkened
// accent, so it isn't a second entry in that shared color map.
function darken(hex, amount = 0.35) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * (1 - amount));
  const g = Math.round(((n >> 8) & 255) * (1 - amount));
  const b = Math.round((n & 255) * (1 - amount));
  return `rgb(${r}, ${g}, ${b})`;
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
// `accent`: a basket's own color (BASKET_ACCENT in src/data/baskets.js),
// tinting the icon band and top border in place of the fixed
// --ifm-color-primary every other consumer of this card still gets --
// omit it and nothing changes. `basketLabel`: the basket's own title,
// shown under the card's title in that same color. `repoCount`: a
// project's real repository count, shown as one linked bubble rather
// than a chip per repo -- direct GitHub links stay one click further, on
// the project's own page. `largeTitle`: the card's title (compact or
// not) set to the same size as Where We Stand's own project-name text
// (src/pages/tech/index.js's .chartRowName, 0.98rem/600) -- for either
// variant, omit it and that card's title stays at today's size (smaller
// for compact, larger for the icon-band variant). `big`: compact only --
// a bigger icon chip and more breathing room, for cards that are the
// main content of their page (reference-tools, testbeds) rather than a
// dense secondary grid (standards, showcase) -- omit it and a compact
// card stays at today's smaller size.
export default function HubDestinationCard({
  icon,
  title,
  desc,
  href,
  linkLabel = 'Explore more',
  compact = false,
  tag,
  tags,
  standards,
  repoCount,
  secondaryLinks,
  footerLinks,
  accent,
  basketLabel,
  largeTitle = false,
  big = false,
}) {
  const accentStyle = accent ? { '--accent': accent, '--accent-dark': darken(accent) } : undefined;
  // Standards (the real SDOs this project's specifications and repos
  // implement, taxonomy.json's own `sdos`) render first and accent-
  // colored, above the plain-grey software tags -- direct instruction:
  // "that's more important than whether linux android etc".
  const standardsNodes = standards && standards.length > 0 && (
    <div className={styles.standardsRow}>
      {standards.map((s) => (
        <span key={s} className={styles.standardsTag}>
          {s}
        </span>
      ))}
    </div>
  );
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

  // A project's own repository count, as one bubble linking to its own
  // page -- same "N repositories" bubble Where We Stand's chart already
  // uses for its Software stage (src/pages/tech/index.js), not a chip per
  // repo: some projects carry 9-11 of these (e.g. 5G Broadcast - TV and
  // Radio Services), and every one of them is already listed in full via
  // <ProjectRepositories> on the project's own page, one click further.
  const repoBubble = repoCount > 0 && (
    <div className={clsx(styles.repoBubbleRow, compact && styles.repoBubbleRowCompact)}>
      <CardLink href={href} className={styles.repoBubble}>
        {repoCount} {repoCount === 1 ? 'repository' : 'repositories'}
      </CardLink>
    </div>
  );

  // Compact: icon is its own small square badge, title+desc+tags sit in a
  // body block beside it (like a list row). Default: icon and title share
  // one big colored band, desc sits below in its own block (the original
  // ProductTypeCard/ActivityCard layout).
  const mainContent = compact ? (
    <>
      <div className={clsx(styles.iconBandCompact, big && styles.iconBandCompactLg)}>{icon}</div>
      <div className={styles.bodyCompact}>
        <h4 className={clsx(styles.bandTitleCompact, largeTitle && styles.bandTitleCompactLg)}>{title}</h4>
        {basketLabel && <div className={styles.basketLabelCompact}>{basketLabel}</div>}
        <p className={styles.descCompact}>{desc}</p>
        {standardsNodes}
        {tagNodes}
      </div>
    </>
  ) : (
    <>
      <div className={styles.iconBand}>
        {icon}
        <h3 className={clsx(styles.bandTitle, largeTitle && styles.bandTitleLg)}>{title}</h3>
      </div>
      <div className={styles.body}>
        {basketLabel && <div className={styles.basketLabel}>{basketLabel}</div>}
        <p className={styles.desc}>{desc}</p>
        {standardsNodes}
        {tagNodes}
      </div>
    </>
  );

  // Compact cards skip the big footer bar (it would cost too much
  // vertical space repeated 10-16 times); the icon band + body are
  // themselves the click target, same as before this component existed.
  if (compact) {
    return (
      <div className={clsx(styles.compactWrap, big && styles.compactWrapLg)} style={accentStyle}>
        <CardLink href={href} className={styles.cardCompact}>
          {mainContent}
        </CardLink>
        {secondaryLinks?.map((s) => (
          <CardLink key={s.href} href={s.href} className={styles.secondaryLink}>
            {s.label}
          </CardLink>
        ))}
        {repoBubble}
      </div>
    );
  }

  if (footerLinks?.length) {
    return (
      <div className={styles.card} style={accentStyle}>
        <CardLink href={href} className={styles.cardMain}>
          {mainContent}
        </CardLink>
        {repoBubble}
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
    <CardLink href={href} className={styles.card} style={accentStyle}>
      {mainContent}
      <div className={styles.footer}>{linkLabel} &rarr;</div>
    </CardLink>
  );
}
