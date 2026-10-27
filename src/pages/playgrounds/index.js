import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { PLAYGROUNDS } from '@site/src/data/playgrounds';
import styles from '../tech/index.module.css';
import cardStyles from './playgrounds.module.css';

const PLAY_ICON_PATH = <path d="M7 4v16l13 -8l-13 -8" />;

export default function Playgrounds() {
  return (
    <Layout
      title="Playgrounds"
      description="Playgrounds of the Media Connectivity Software Accelerator: ready kits for trying a technology, such as the CAMARA Network APIs with a members-only sandbox."
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
            <h2 className={styles.sectionTitle}>Try a technology</h2>
            <p className={styles.sectionSubtitle}>
              A Playground is a ready kit for trying a technology on a real network: example code, the tools to run it
              and, where it needs one, a sandbox to run it against. Each Playground belongs to a project and is listed
              here with the project it comes from.
            </p>
            <div className={cardStyles.list}>
              {PLAYGROUNDS.map((p) => (
                <Link key={p.slug} to={p.href} className={cardStyles.card}>
                  <span className={cardStyles.badges}>
                    {p.badges.map((b) => (
                      <span key={b} className={cardStyles.badge}>{b}</span>
                    ))}
                    <span className={`${cardStyles.badge} ${cardStyles.lock}`}>Sandbox: {p.sandbox}</span>
                  </span>
                  <span className={cardStyles.cardTitle}>{p.title}</span>
                  <span className={cardStyles.cardText}>{p.summary}</span>
                  <span className={cardStyles.more}>Open the Playground &rarr;</span>
                </Link>
              ))}
            </div>
            <p className={cardStyles.soon}>More Playgrounds will be listed here as the projects publish them.</p>
          </div>
        </section>
        <JoinTheEffort alt variant="tool" />
      </main>
    </Layout>
  );
}
