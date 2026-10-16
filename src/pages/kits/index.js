import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import styles from '../tech/index.module.css';

const KITS_ICON_PATH = (
  <>
    <path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z" />
    <path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z" />
    <path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0" />
    <path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5" />
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
          <Link key="sw" className="button button--primary" to="/developer">
            Software Accelerator
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
