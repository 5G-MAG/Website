import Link from '@docusaurus/Link';
import { SLACK_INVITE_URL } from '@site/src/data/socialLinks';
import { GITHUB_ICON, SLACK_ICON } from '@site/src/theme/socialIcons';
import styles from '@site/src/pages/tech/index.module.css';

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const MEMBERSHIP_ICON = (
  <svg {...ICON_PROPS}>
    <path d="M17 21v-2a4 4 0 0 0 -4 -4h-6a4 4 0 0 0 -4 4v2" />
    <path d="M7 11a4 4 0 1 0 0 -8a4 4 0 0 0 0 8z" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SUBSCRIBE_ICON = (
  <svg {...ICON_PROPS}>
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
    <path d="M3 7l9 6l9 -6" />
  </svg>
);

const TILES = [
  {
    key: 'membership',
    to: '/membership#request-membership',
    icon: MEMBERSHIP_ICON,
    title: 'Become a member',
    desc: 'Request membership, sponsorship and partnership information',
    cta: 'Get started',
  },
  {
    key: 'github',
    href: 'https://github.com/5G-MAG',
    icon: GITHUB_ICON,
    title: 'GitHub',
    desc: 'Browse and contribute to our repositories',
    cta: 'Explore',
  },
  {
    key: 'slack',
    href: SLACK_INVITE_URL,
    icon: SLACK_ICON,
    title: 'Slack',
    desc: 'Join the conversation',
    cta: 'Join',
  },
  {
    key: 'subscribe',
    to: '/subscribe',
    icon: SUBSCRIBE_ICON,
    title: 'Subscribe to Updates',
    desc: 'Get 5G-MAG updates by email',
    cta: 'Sign up',
  },
];

function Tile({ to, href, icon, title, desc, cta }) {
  const content = (
    <>
      {icon}
      <strong>{title}</strong>
      <span className="tile-desc">{desc}</span>
      <span className="tile-cta">{cta} &rarr;</span>
    </>
  );
  return to ? (
    <Link to={to} className="community-tile">
      {content}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className="community-tile">
      {content}
    </a>
  );
}

// Shared sitewide closing CTA — same title, copy and four tiles on every
// hub page (About, Membership, Tech, Standards, Developer, Testing, Events,
// News). Replaces each page's previous bespoke "Join the Community" button
// row / "Get Involved" tiles so the site ends on one consistent call to
// action rather than a different one per section.
export default function JoinTheEffort({ id, alt = false }) {
  return (
    <section id={id} className={alt ? `${styles.section} ${styles.sectionAlt}` : styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Join the Effort</h2>
        <p className={styles.sectionSubtitle}>
          Help shape what connected media looks like next and scale your projects with the
          industry.
        </p>
        <div className="community-tiles community-tiles--even">
          {TILES.map((t) => (
            <Tile key={t.key} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
