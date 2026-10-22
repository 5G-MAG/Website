import useBaseUrl from '@docusaurus/useBaseUrl';
import { DOCUMENTS } from '@site/src/data/projectDocuments';
import styles from './styles.module.css';

// The 5G-MAG explainers and reports of a project, as a list of PDFs: kind, title, length and size. The list is in
// src/data/projectDocuments.js, keyed by the project's /tech/<slug>.
export default function ProjectDocuments({ slug }) {
  const base = useBaseUrl('/docs/');
  const docs = DOCUMENTS[slug];
  if (!docs || docs.length === 0) return null;
  return (
    <ul className={styles.list}>
      {docs.map((d) => (
        <li key={d.file} className={styles.item}>
          <span className={styles.kind}>{d.kind}</span>
          <a className={styles.title} href={`${base}${d.file}`} target="_blank" rel="noreferrer">{d.title}</a>
          <span className={styles.meta}>
            PDF, {d.pages} {d.pages === 1 ? 'page' : 'pages'}, {d.sizeKb >= 1024 ? `${(d.sizeKb / 1024).toFixed(1)} MB` : `${d.sizeKb} KB`}
          </span>
        </li>
      ))}
    </ul>
  );
}
