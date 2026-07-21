import Layout from '@theme/Layout';
import NotFoundContent from '@site/src/components/NotFoundContent';

export default function NotFound() {
  return (
    <Layout
      title="Page Not Found"
      description="The page you were looking for doesn't exist on this site."
    >
      <NotFoundContent />
    </Layout>
  );
}
