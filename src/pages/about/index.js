import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import StandardsLoopDiagram from '@site/src/components/StandardsLoopDiagram';
import GodeeperCard from '@site/src/components/GodeeperCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import styles from '../tech/index.module.css';

const ABOUT_ICON_PATH = (
  <>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </>
);

const HOW_WE_WORK = [
  { title: 'Member-driven', body: 'We add resources to our members’ efforts.' },
  { title: 'Open', body: 'Open to the industry to engage and collaborate.' },
  { title: 'Agile', body: 'At the pace of standards and the market.' },
  { title: 'Pragmatic', body: 'With actionable activities and outcomes.' },
];

export default function About() {
  return (
    <Layout
      title="About Us"
      description="5G-MAG works with its members to shape global standards and turn them into deployable solutions, through open specifications and open-source software. A neutral, not-for-profit platform at the intersection of Media and Connectivity."
    >
      <HubHero
        title="About Us"
        icon={ABOUT_ICON_PATH}
        actions={[
          <Link
            key="join"
            className="button button--primary"
            to="/membership#request-membership"
          >
            Become a Member
          </Link>,
          <a
            key="overview"
            className="button button--outline button--primary"
            href={useBaseUrl('/docs/Overview.pdf')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download an Overview &#8595;
          </a>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Scope: Media and Connectivity</h2>
            <p className={styles.leadParagraph}>
              Technology moves fast: global players shape it, the internet makes it borderless, and
              it soon becomes a commodity.
            </p>
            <p className={`${styles.leadParagraph} ${styles['leadParagraph--last']}`}>
              We work with our members to shape global standards and turn them into deployable
              solutions, through open specifications and open-source software. A neutral,
              not-for-profit platform to enable collaboration, share resources and efforts, and bring
              new media experiences to users faster.
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            <div className="godeeper-grid godeeper-grid--4col">
              {SCOPE_PILLARS.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Running the Loop: From Requirements to Products</h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: '1.5rem' }}>
              From specifications to products: we feed back requirements, build open-source
              implementations and test interoperability before launch.
            </p>

            <StandardsLoopDiagram />

            <p className={styles.sectionSubtitle} style={{ marginTop: '2rem' }}>
              Four pillars, from specification to deployed product.
            </p>
            <div className="godeeper-grid godeeper-grid--4col">
              {DISCOVER_WORK.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* How we work: slide "Member-driven" of the 5G-MAG General Deck (aligned 2026-09-29). */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How we work</h2>
            <p className={styles.sectionSubtitle}>
              Addressing industry pain points with open specifications.
            </p>
            <div className="community-tiles community-tiles--even">
              {HOW_WE_WORK.map((v) => (
                <div key={v.title} className="community-tile">
                  <strong>{v.title}</strong>
                  <span className="tile-desc">{v.body}</span>
                </div>
              ))}
            </div>
            <p className={styles.sectionSubtitle} style={{ marginTop: '1.5rem' }}>
              Three workgroups carry the work: Technology and Standards, Development and Ecosystem,
              and Promotion and Communication. <Link to="/structure">How 5G-MAG is organized &rarr;</Link>
            </p>
          </div>
        </section>

        <JoinTheEffort />
      </main>
    </Layout>
  );
}
