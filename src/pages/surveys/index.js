import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import styles from '../tech/index.module.css';

const SURVEY_ICON_PATH = (
  <>
    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="2" />
    <path d="M9 14l2 2l4 -4" />
  </>
);

export default function Surveys() {
  return (
    <Layout
      title="Industry Survey"
      description="Share your input through 5G-MAG's industry survey — help shape the requirements and priorities members bring to standards bodies."
    >
      <HubHero title="Industry Survey" icon={SURVEY_ICON_PATH} />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">
          Your input helps shape the requirements 5G-MAG brings to standards bodies.
        </p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className={styles.sectionTitle}>
                Connectivity Quality Management (CQM) in Media Production Applications
              </h2>
              <p style={{ textAlign: 'left', lineHeight: 1.6 }}>
                Mobile connectivity for live production can sometimes be unreliable today due to
                variability in coverage and the impact of congestion. Bonded cellular has long been
                used to increase both reliability and redundancy through the use of multiple SIM
                cards simultaneously across multiple operators. Alternatively, Low Earth Orbit
                satellite (e.g. Starlink) can be used for broadband connectivity while non-public
                (private) networks on dedicated spectrum can be used for local production
                connectivity.
              </p>
              <p style={{ textAlign: 'left', lineHeight: 1.6 }}>
                Mobile Network Operators (MNOs) are currently aiming to make mobile connectivity
                more predictable and manageable, by means of exposing connectivity-related
                capabilities via APIs. This survey is collecting information to understand whether
                these capabilities are a fit for the workflows of media production and
                contribution.
              </p>
              <a
                className="button button--primary button--lg"
                href="https://docs.google.com/forms/d/e/1FAIpQLScGuknLeqzgiFalOimrXqwFvZLYsi3xQNdy_X10iyiNkLDzPg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '1rem' }}
              >
                Take the Survey ↗
              </a>
            </div>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
