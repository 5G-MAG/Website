import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { SLACK_INVITE_URL, SOCIAL_LINKS } from '@site/src/data/socialLinks';
import styles from '../tech/index.module.css';

const NEWS_ICON_PATH = (
  <>
    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
    <path d="M8 8l4 0" />
    <path d="M8 12l4 0" />
    <path d="M8 16l4 0" />
  </>
);

export default function News() {
  const linkedin = SOCIAL_LINKS.find((s) => s.key === 'linkedin').href;
  return (
    <Layout title="News" description="Announcements and updates from 5G-MAG.">
      <HubHero
        title="News"
        icon={NEWS_ICON_PATH}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Announcements and updates from 5G-MAG.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Content coming soon</h2>
            <p className={styles.sectionSubtitle} style={{ maxWidth: '640px', margin: '0 auto' }}>
              This page is being finalised.
            </p>
            <p
              className={styles.sectionSubtitle}
              style={{ maxWidth: '640px', margin: '0.5rem auto 0' }}
            >
              In the meantime, follow{' '}
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              ,{' '}
              <a href={SLACK_INVITE_URL} target="_blank" rel="noreferrer">
                Slack
              </a>
              , or <a href="/subscribe">subscribe by email</a> for the latest updates.
            </p>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
