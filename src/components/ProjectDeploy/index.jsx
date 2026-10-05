import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { ICON_CATALOG, displayNameOf, projectBySlug } from '@site/src/data/baskets';
import styles from '@site/src/pages/tech/index.module.css';

// The kinds of assets a product team can onboard, shown as placeholders until they are published.
export const ASSET_KINDS = [
  { title: 'Packages', body: 'Installable builds of the Reference Tools.' },
  { title: 'Modules and libraries', body: 'Components to integrate into your own software.' },
  { title: 'Docker images', body: 'Containers to run in your network or cloud.' },
  { title: 'Apps (APKs)', body: 'Android applications to install on devices.' },
];

export function AssetTiles() {
  return (
    <div className="community-tiles community-tiles--even">
      {ASSET_KINDS.map((k) => (
        <div key={k.title} className="community-tile community-tile--static">
          <strong>{k.title}</strong>
          <span className="tile-desc">{k.body}</span>
          <span className="tile-desc"><em>Coming soon</em></span>
        </div>
      ))}
    </div>
  );
}

// One project's Deploy page (/deploy/<slug>, routed from docusaurus.config.js): the assets of that project to
// onboard into a product. Placeholders for now.
export default function ProjectDeploy({ slug }) {
  const project = projectBySlug(slug);
  const name = displayNameOf(project);
  const icon = (ICON_CATALOG[project.icon] || []).map((d) => <path key={d} d={d} />);
  return (
    <Layout title={`${name}: Deploy`} description={`Assets of ${name} to onboard into your product.`}>
      <HubHero
        title={name}
        icon={icon}
        actions={[
          project.tech_url && (
            <Link key="learn" className="button button--primary" to={project.tech_url}>Learn</Link>
          ),
          <Link key="implement" className="button button--outline button--primary" to={project.doc_url}>Implement</Link>,
          <Link key="all" className="button button--outline button--primary" to="/deploy#assets">All projects</Link>,
        ].filter(Boolean)}
      />
      <main>
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Deploy: assets to onboard into your product</h2>
            <p className={styles.sectionSubtitle}>
              Coming soon: the {name} assets you can onboard into your product will be listed here.
            </p>
            <AssetTiles />
          </div>
        </section>
        <JoinTheEffort />
      </main>
    </Layout>
  );
}
