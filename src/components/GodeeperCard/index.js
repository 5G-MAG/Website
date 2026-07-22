import Link from '@docusaurus/Link';

// Shared "go deeper" topic card — used for the four-pillar grids on the
// homepage and /about (previously each page defined its own copy of both
// this component and the icon() helper below).
export const icon = (paths) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    {paths}
  </svg>
);

export default function GodeeperCard({ title, body, icon: cardIcon, href }) {
  const inner = (
    <>
      <div className="godeeper-card__band">
        {icon(cardIcon)}
        <h3>{title}</h3>
      </div>
      <div className="godeeper-card__body">{typeof body === 'string' ? <p>{body}</p> : body}</div>
    </>
  );
  return href ? (
    <Link className="godeeper-card" to={href}>
      {inner}
    </Link>
  ) : (
    <div className="godeeper-card godeeper-card--static">{inner}</div>
  );
}
