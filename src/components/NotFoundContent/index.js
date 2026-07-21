import clsx from 'clsx';
import Link from '@docusaurus/Link';

// Shared between src/pages/404.js (the literal /404 route, and the page
// static hosts like GitHub Pages fall back to for any unmatched real HTTP
// request) and src/theme/NotFound/Content (Docusaurus's own client-side
// catch-all for a broken in-app link/navigation to a route that doesn't
// exist — a separate rendering path from the literal /404 page, stock
// Docusaurus otherwise shows its generic "Page Not Found" text there
// instead of this).
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <h1>Page not found</h1>
          <p>
            The page you were looking for doesn&apos;t exist, or the link that brought you here may
            be out of date. Try one of these instead:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="button button--primary button--lg" to="/">
              Homepage
            </Link>
            <Link className="button button--outline button--primary button--lg" to="/tech">
              Explainers & Profiles
            </Link>
            <Link className="button button--outline button--primary button--lg" to="/standards">
              Feedback & Requirements
            </Link>
            <Link className="button button--outline button--primary button--lg" to="/developer">
              Software Accelerator
            </Link>
            <Link className="button button--outline button--primary button--lg" to="/search">
              Search
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
