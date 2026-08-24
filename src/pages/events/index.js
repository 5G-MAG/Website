import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import PhotoGallery from '@site/src/components/PhotoGallery';
import { UpcomingAgenda, PastAgenda } from '@site/src/components/EventsAgenda';
import { SLACK_INVITE_URL, SOCIAL_LINKS } from '@site/src/data/socialLinks';
import { FACT_LARGE_EVENTS, FACT_YEARLY_CONFERENCE } from '@site/src/data/facts';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
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
  {
    title: 'MWC Barcelona',
    desc: 'Stand 5C30, Swiss Pavilion, Hall 5',
    href: '/mwc',
    img: '/assets/images/events/mwc-2026.png',
  },
  { title: 'IBC', desc: 'EBU stand, booth 10.D21', href: '/ibc', img: '/assets/images/events/ibc-2026.png' },
  {
    title: 'Future Media Townhall',
    desc: 'RAI Amsterdam',
    href: '/fmt',
    img: '/assets/images/fmt/fmt-2026-banner.png',
  },
];

const WORKSHOP_PAGES = [
  { title: 'OSCAR Workshop', desc: 'Open-Source Core, Applications and RAN', href: '/oscar' },
  { title: 'OSMART Workshops', desc: 'Open-Source Media Application Reference Tools', href: '/osmart' },
];

function EventCard({ title, desc, href, img }) {
  const resolvedImg = useBaseUrl(img);
  return (
    <Link to={href} className={styles.linkCard}>
      {img && (
        <img className={styles.linkCardImg} src={resolvedImg} alt="" loading="lazy" />
      )}
      <h3 className={styles.linkCardTitle}>{title}</h3>
      <p className={styles.linkCardBody}>{desc}</p>
    </Link>
  );
}

export default function Events() {
  const linkedin = SOCIAL_LINKS.find((s) => s.key === 'linkedin').href;
  const galleryPhotos = [
    {
      src: useBaseUrl('/assets/images/gallery/5g-broadcast-plugfest-2026.jpg'),
      alt: '5G Broadcast PlugFest 2026, hosted by Fraunhofer FOKUS in Berlin',
    },
    {
      src: useBaseUrl('/assets/images/gallery/3gpp-imt2030-contribution.jpg'),
      alt: '5G-MAG contribution to 3GPP IMT-2030',
    },
    {
      src: useBaseUrl('/assets/images/gallery/tradeshow-booth-demo.jpg'),
      alt: '5G-MAG trade show booth demonstrating 5G Media Streaming and 5G Broadcast',
    },
    {
      src: useBaseUrl('/assets/images/fmt/gallery/photo-04.jpg'),
      alt: 'Future Media Townhall 2025: a speaker presents on the history of streaming technology',
    },
    {
      src: useBaseUrl('/assets/images/fmt/gallery/photo-07.jpg'),
      alt: 'Future Media Townhall 2025: a panel discussion on tangible standardization projects for the Rel-20 and 6G era',
    },
    {
      src: useBaseUrl('/assets/images/fmt/gallery/photo-10.jpg'),
      alt: 'Future Media Townhall 2025: a panel discussion in front of a 3GPP Release 19-21 timeline chart',
    },
  ];
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
            className="button button--primary"
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            Follow on LinkedIn
          </a>,
          <Link
            key="subscribe"
            className="button button--outline button--primary"
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
        {/* Upcoming: dated events 5G-MAG attends/presents at, as opposed to
            the evergreen Flagship Events cards below */}
        <section
          id="agenda"
          className={`${styles.section} ${styles.sectionAlt}`}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <p className={styles.sectionSubtitle}>
              Conferences, workshops, webinars and calls where 5G-MAG participates or is invited
              to attend.
            </p>
            <UpcomingAgenda events={EVENTS_AGENDA} />
          </div>
        </section>

        {/* Flagship: evergreen trade-show cards, front and center */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Flagship Events</h2>
            <p className={styles.sectionSubtitle}>
              Trade shows and conferences 5G-MAG organizes or takes part in.
            </p>
            <div className={styles.pillarGrid3}>
              {EVENT_PAGES.map((e) => (
                <EventCard key={e.href} {...e} />
              ))}
            </div>
          </div>
        </section>

        {/* Past: the same dated Agenda list's history, kept separate from
            Upcoming so Flagship Events can sit between the two */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Past Events</h2>
            <p className={styles.sectionSubtitle}>
              Previous conferences, workshops, webinars and calls.
            </p>
            <PastAgenda events={EVENTS_AGENDA} />
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
              <Link to="/events/agenda">Browse the full agenda archive &rarr;</Link>
            </p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Dev Public Call</h2>
            <p className={styles.sectionSubtitle}>
              5G-MAG&apos;s open monthly session — anyone can join, no membership required.
            </p>
            <div style={{ textAlign: 'center' }}>
              <Link className="button button--primary button--lg" to="/public-call">
                Join &amp; Watch Recordings
              </Link>
            </div>
          </div>
        </section>

        <section
          id="workshops"
          className={styles.section}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>Community Workshops</h2>
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
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
              <Link to="/workshops#workshop--session-archive">Browse the full workshop &amp; session archive &rarr;</Link>
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Gallery</h2>
            <p className={styles.sectionSubtitle}>
              Highlights from across 5G-MAG events — plugfests, trade shows and the Future Media
              Townhall.
            </p>
            <PhotoGallery photos={galleryPhotos} />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Recurring Appearances</h2>
            <div className="summary-container">
              {EVENT_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h3>{f.label}</h3>
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
