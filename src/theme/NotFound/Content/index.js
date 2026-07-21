import NotFoundContent from '@site/src/components/NotFoundContent';

// Swizzled so Docusaurus's own client-side catch-all route (rendered by the
// stock @theme/NotFound wrapper for any URL that doesn't match a real route)
// shows the same branded content as src/pages/404.js, instead of the
// generic "Page Not Found" / "We could not find what you were looking for"
// default — visiting the literal /404 path and navigating to a genuinely
// broken link are two different rendering paths in Docusaurus, and only the
// former used to be customized here.
export default function NotFound({ className }) {
  return <NotFoundContent className={className} />;
}
