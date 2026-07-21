import Link from '@docusaurus/Link';
import { SLACK_INVITE_URL } from '@site/src/data/socialLinks';
import styles from '@site/src/pages/tech/index.module.css';

const MEMBERSHIP_ICON = (
  <>
    <path d="M17 21v-2a4 4 0 0 0 -4 -4h-6a4 4 0 0 0 -4 4v2" />
    <path d="M7 11a4 4 0 1 0 0 -8a4 4 0 0 0 0 8z" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

const GITHUB_ICON = (
  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
);

const SLACK_ICON = (
  <>
    <path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6" />
    <path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6" />
    <path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6" />
    <path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6" />
  </>
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
    key: 'discussions',
    href: 'https://github.com/orgs/5G-MAG/discussions',
    icon: GITHUB_ICON,
    title: 'GitHub Discussions',
    desc: 'Ask questions, share ideas',
    cta: 'Discuss',
  },
];

function Tile({ to, href, icon, title, desc, cta }) {
  const content = (
    <>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icon}
      </svg>
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
