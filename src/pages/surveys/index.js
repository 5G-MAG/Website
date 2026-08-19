import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { SURVEYS } from '@site/src/data/surveys';
import styles from '../tech/index.module.css';

const SURVEY_ICON_PATH = (
  <>
    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="2" />
    <path d="M9 14l2 2l4 -4" />
  </>
);

function OpenSurvey({ survey }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className={styles.sectionTitle}>{survey.title}</h2>
          {survey.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} style={{ textAlign: 'left', lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}
          <a
            className="button button--primary button--lg"
            href={survey.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '1rem' }}
          >
            Take the Survey &#8599;
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Surveys() {
  const openSurveys = SURVEYS.filter((s) => s.status === 'open');
  const closedSurveys = SURVEYS.filter((s) => s.status === 'closed');

  return (
    <Layout
      title="Industry Surveys"
      description="Share your input through 5G-MAG's industry surveys — help shape the requirements and priorities members bring to standards bodies."
    >
      <HubHero title="Industry Surveys" icon={SURVEY_ICON_PATH} />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">
          Your input helps shape the requirements 5G-MAG brings to standards bodies.
        </p>
      </div>

      <main>
        {openSurveys.length > 0 ? (
          openSurveys.map((survey) => <OpenSurvey key={survey.id} survey={survey} />)
        ) : (
          <section className={styles.section}>
            <div className="container" style={{ textAlign: 'center' }}>
              <p className={styles.sectionSubtitle}>
                No survey is currently open — check back soon.
              </p>
            </div>
          </section>
        )}

        {closedSurveys.length > 0 && (
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <div className="archive-panel">
                <span className="year-eyebrow year-eyebrow--past">Past Surveys</span>
                <div className={styles.pillarGrid3}>
                  {closedSurveys.map((survey) => (
                    <div key={survey.id} className={styles.pillarCard}>
                      <h3 className={styles.pillarTitle}>{survey.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
