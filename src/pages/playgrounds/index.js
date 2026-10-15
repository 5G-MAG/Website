import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import styles from '../tech/index.module.css';

const PLAY_ICON_PATH = <path d="M7 4v16l13 -8l-13 -8" />;

export default function Playgrounds() {
  return (
    <Layout
      title="Playgrounds"
      description="Environments where you can try a 5G-MAG technology with nothing to install. Coming soon."
    >
      <HubHero
        title="Playgrounds"
        icon={PLAY_ICON_PATH}
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
              A Playground is a ready environment where you can try a technology safely, with nothing to install and
              nothing to break: change a value and see the effect. Each one will belong to a project and be listed
              here with the project it comes from. None is published yet. Until then, the{' '}
              <Link to="/reference-tools">Reference Tools</Link> and the <Link to="/tutorials">Tutorials</Link> show
              how to build and run the software.
            </p>
          </div>
        </section>
        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
