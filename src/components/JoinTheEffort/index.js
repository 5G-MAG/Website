import Link from '@docusaurus/Link';
import { SLACK_INVITE_URL, SOCIAL_LINKS } from '@site/src/data/socialLinks';
import { GITHUB_ICON, SLACK_ICON, LINKEDIN_ICON } from '@site/src/theme/socialIcons';
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

const SUBSCRIBE_ICON = (
  <svg {...ICON_PROPS}>
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
    <path d="M3 7l9 6l9 -6" />
  </svg>
);

// The six ways in, as on the "Get involved" slide of the 5G-MAG General Deck
// (aligned 2026-09-29); "Become a member" stays as the section's main button.
const PLUS_ICON = (
  <svg {...ICON_PROPS}>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>
);

const KEY_ICON = (
  <svg {...ICON_PROPS}>
    <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
    <path d="M15 9h.01" />
  </svg>
);

const TILES = [
  {
    key: 'topic',
    to: '/membership#request-membership',
    icon: PLUS_ICON,
    title: 'Bring your topic or project',
    desc: 'Don’t see your topic here? Bring it, or your project, as a member.',
    cta: 'Get started',
  },
  {
    key: 'early-access',
    to: '/early-access',
    icon: KEY_ICON,
    title: 'Early Access',
    desc: 'Request access to Reference Tools and Testbeds still in development.',
    cta: 'Request access',
  },
  {
    key: 'github',
    href: 'https://github.com/5G-MAG',
    icon: GITHUB_ICON,
    title: 'Contribute code',
    desc: 'No membership needed: sign the CLA and open a pull request on GitHub.',
    cta: 'Explore',
  },
  {
    key: 'developers',
    to: '/community',
    icon: SLACK_ICON,
    title: 'Join the developers',
    desc: 'The Dev Community on Slack and the Reference Tools mailing list.',
    cta: 'Join',
  },
  {
    key: 'subscribe',
    to: '/subscribe',
    icon: SUBSCRIBE_ICON,
    title: 'Stay informed',
    desc: 'Email updates, the 5G-MAG Magazine and The Handshake podcast.',
    cta: 'Sign up',
  },
  {
    key: 'linkedin',
    href: SOCIAL_LINKS.find((l) => l.key === 'linkedin').href,
    icon: LINKEDIN_ICON,
    title: 'Follow us',
    desc: 'News on LinkedIn; talks and demos on YouTube.',
    cta: 'Follow',
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

// Shared sitewide closing CTA — same title, copy and six tiles on every
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
        <div style={{ textAlign: 'center', margin: '0 0 1.5rem' }}>
          <Link className="button button--primary button--lg" to="/membership#request-membership">
            Become a member
          </Link>
        </div>
        <div className="community-tiles community-tiles--even">
          {TILES.map(({ key, ...t }) => (
            <Tile key={key} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
