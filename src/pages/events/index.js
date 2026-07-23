import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { SLACK_INVITE_URL, SOCIAL_LINKS } from '@site/src/data/socialLinks';
import { FACT_LARGE_EVENTS, FACT_YEARLY_CONFERENCE } from '@site/src/data/facts';
import styles from '../tech/index.module.css';

const EVENTS_ICON_PATH = (
  <>
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
    <path d="M16 3l0 4" />
    <path d="M8 3l0 4" />
    <path d="M4 11l16 0" />
    <path d="M8 15h2v2h-2l0 -2" />
  </>
);

const EVENT_FACTS = [FACT_LARGE_EVENTS, FACT_YEARLY_CONFERENCE];

const EVENT_PAGES = [
  { title: 'MWC Barcelona', desc: 'Stand 5C30, Swiss Pavilion, Hall 5', href: '/mwc' },
  { title: 'IBC', desc: 'EBU stand, booth 10.D21', href: '/ibc' },
  { title: 'Future Media Townhall', desc: 'RAI Amsterdam', href: '/fmt' },
];

const WORKSHOP_PAGES = [
  { title: 'OSCAR Workshop', desc: 'Open-Source Core, Applications and RAN', href: '/events/oscar' },
  { title: 'OSMART Workshops', desc: 'Open-Source Media Application Reference Tools', href: '/events/osmart' },
];

export default function Events() {
  const linkedin = SOCIAL_LINKS.find((s) => s.key === 'linkedin').href;
  return (
    <Layout
      title="Events"
      description="Where to meet 5G-MAG — recurring industry events and the Future Media Townhall."
    >
      <HubHero
        title="Events"
        icon={EVENTS_ICON_PATH}
        actions={[
          <a
            key="linkedin"
            className="button button--primary button--lg"
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            Follow on LinkedIn
          </a>,
          <Link
            key="subscribe"
            className="button button--outline button--primary button--lg"
            to="/subscribe"
          >
            Subscribe to Updates
          </Link>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Where to meet 5G-MAG — both when we organize events and when we are invited to attend.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Dev Public Call</h2>
            <p className={styles.sectionSubtitle}>
              5G-MAG&apos;s open monthly session — anyone can join, no membership required.
            </p>
            <div style={{ textAlign: 'center' }}>
              <Link className="button button--primary button--lg" to="/events/public-call">
                Join &amp; Watch Recordings
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Events</h2>
            <p className={styles.sectionSubtitle}>
              Trade shows and conferences 5G-MAG organizes or takes part in.
            </p>
            <div className={styles.pillarGrid3}>
              {EVENT_PAGES.map((e) => (
                <Link key={e.href} to={e.href} className={styles.linkCard}>
                  <h3 className={styles.linkCardTitle}>{e.title}</h3>
                  <p className={styles.linkCardBody}>{e.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workshops"
          className={styles.section}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>Workshops</h2>
            <p className={styles.sectionSubtitle}>
              Community workshops 5G-MAG co-organizes with other open-source and standards groups.
            </p>
            <div className={styles.pillarGrid3}>
              {WORKSHOP_PAGES.map((w) => (
                <Link key={w.href} to={w.href} className={styles.linkCard}>
                  <h3 className={styles.linkCardTitle}>{w.title}</h3>
                  <p className={styles.linkCardBody}>{w.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>
              In the meantime, 5G-MAG members regularly show up at
            </h2>
            <div className="summary-container">
              {EVENT_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h4>{f.label}</h4>
                  <span className="summary-value">{f.value}</span>
                  <span className="stats-sub">{f.sub}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              Follow{' '}
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>{' '}
              or join{' '}
              <a href={SLACK_INVITE_URL} target="_blank" rel="noreferrer">
                Slack
              </a>{' '}
              for announcements as dates are confirmed.
            </p>
          </div>
        </section>

        <JoinTheEffort />
      </main>
    </Layout>
  );
}
