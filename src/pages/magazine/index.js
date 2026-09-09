import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PDF_PATH = '/magazine/5G-MAGazine-Issue-01.pdf';

export default function Magazine() {
  const pdfUrl = useBaseUrl(PDF_PATH);
  return (
    <Layout title="Magazine" description="The 5G-MAG Magazine as a downloadable PDF.">
      <main className="container" style={{ padding: '2rem 0' }}>
        <h1>5G-MAG Magazine</h1>
        <div className="pdf-embed-wrapper">
          <iframe loading="lazy" className="pdf-embed" src={pdfUrl} title="5G-MAG Magazine" />
        </div>
        <a
          className="button button--outline button--primary"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the magazine (PDF)
        </a>
      </main>
    </Layout>
  );
}
