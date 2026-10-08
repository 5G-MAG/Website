import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { ICON_CATALOG } from '@site/src/data/baskets';
import { DEVELOPER_ASSETS } from '@site/src/data/developerAssets';
import hubStyles from '../tech/index.module.css';
import styles from './styles.module.css';

const ROUTE_ICON_PATH = (
  <>
    {ICON_CATALOG.route.map((d) => (
      <path key={d} d={d} />
    ))}
  </>
);

function AssetIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICON_CATALOG[name] || []).map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

export default function DeveloperAssets() {
  return (
    <Layout
      title="Developer Assets"
      description="Assets for 5G-MAG members that support the transition of standards into deployments: tools, rules and working records for going from a specification to a working implementation."
    >
      <HubHero
        title="Developer Assets"
        icon={ROUTE_ICON_PATH}
        actions={[
          <Link key="early-access" className="button button--primary" to="/early-access">
            Request Early Access
          </Link>,
          <Link key="contribute" className="button button--outline button--primary" to="/contributing">
            Contribute
          </Link>,
        ]}
      />

      <main>
        <section className={hubStyles.section}>
          <div className="container">
            <p className={styles.lead}>
              Assets for 5G-MAG members that support the transition of standards into deployments. In Early Access.
            </p>
            <div className={styles.grid}>
              {DEVELOPER_ASSETS.map((a) => (
                <article key={a.id} className={styles.card}>
                  <span className={styles.icon}><AssetIcon name={a.icon} /></span>
                  <Heading as="h2" id={a.id} className={styles.title}>{a.title}</Heading>
                  <p className={styles.summary}>{a.summary}</p>
                </article>
              ))}
            </div>
            <p>
              <Link className="button button--primary" to="/early-access">Request Early Access</Link>
            </p>
          </div>
        </section>
        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
