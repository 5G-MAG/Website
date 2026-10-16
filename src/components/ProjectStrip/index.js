import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { familyForPath } from '@site/src/utils/projectFamily';
import { TECH_OVERVIEW } from '@site/src/data/techOverviews';
import { displayNameOf, typeOf, isTestbed } from '@site/src/data/baskets';
import styles from './styles.module.css';

function softwareLabel(p) {
  const t = typeOf(p);
  if (t === 'validation-tool') return 'Validation Tool';
  if (isTestbed(p)) return t === 'evaluation-framework' ? 'Evaluation Framework' : 'Testbed';
  return 'Reference Tools';
}

export default function ProjectStrip({ contained = false }) {
  const { pathname } = useLocation();
  const family = familyForPath(pathname);
  if (family.length === 0) return null;
  const lead = family.find((p) => p.type === 'project') || family[0];
  const tech = family.find((p) => p.tech_url)?.tech_url;
  const spec = family.find((p) => p.standards_url)?.standards_url;
  const software = family.filter((p) => p.doc_url);
  const items = [
    tech && { label: 'Technology', to: TECH_OVERVIEW[tech] || tech, base: tech },
    spec && { label: 'Specifications', to: spec },
    ...software.map((p) => ({
      label: softwareLabel(p) !== 'Reference Tools' || software.length > 1 ? displayNameOf(p) : 'Software',
      to: p.doc_url,
    })),
  ].filter(Boolean);
  if (items.length < 2) return null;
  const active = items.reduce((best, it) => {
    const base = (it.base || it.to).replace(/\/$/, '');
    const hit = pathname === base || pathname.startsWith(base + '/');
    return hit && (!best || base.length > (best.base || best.to).replace(/\/$/, '').length) ? it : best;
  }, null);
  const strip = (
    <nav className={styles.strip} aria-label="Pages of this project">
      <span className={styles.name}>{displayNameOf(lead)}</span>
      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.to + it.label}>
            <Link to={it.to} className={`${styles.item} ${active === it ? styles.active : ''}`} aria-current={active === it ? 'page' : undefined}>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
  return contained ? <div className="container" style={{ paddingTop: '1rem' }}>{strip}</div> : strip;
}
