import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import styles from '../tech/index.module.css';

const KITS_ICON_PATH = (
  <>
    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12l0 9" />
    <path d="M12 12l-8 -4.5" />
  </>
);

export default function DeploymentKits() {
  return (
    <Layout
      title="Deployment Kits"
      description="Packages, images and apps from 5G-MAG projects that you can put into a product. Coming soon."
    >
      <HubHero
        title="Deployment Kits"
        icon={KITS_ICON_PATH}
        actions={[
          <Link key="sw" className="button button--primary" to="/software">
            Software Factory
          </Link>,
          <Link key="ref" className="button button--outline button--primary" to="/reference-tools">
            Reference Tools
          </Link>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Coming soon</h2>
            <p className={styles.sectionSubtitle}>
              A Deployment Kit is a package, a container image or an app from a 5G-MAG project, ready to put into a
              product. Each kit will belong to a project and be listed here with the project it comes from. None is
              published yet. Until then, the <Link to="/reference-tools">Reference Tools</Link> and the{' '}
              <Link to="/tutorials">Tutorials</Link> show how to build and run the software.
            </p>
          </div>
        </section>
        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
