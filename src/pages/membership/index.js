import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ContactForm from '@site/src/components/ContactForm';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import GodeeperCard from '@site/src/components/GodeeperCard';
import { FACT_REPOSITORIES, FACT_CLONES, FACT_LARGE_EVENTS, FACT_YEARLY_CONFERENCE } from '@site/src/data/facts';
import styles from '../tech/index.module.css';

const MEMBERSHIP_ICON_PATH = (
  <>
    <path d="M17 21v-2a4 4 0 0 0 -4 -4h-6a4 4 0 0 0 -4 4v2" />
    <path d="M7 11a4 4 0 1 0 0 -8a4 4 0 0 0 0 8z" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

const BENEFITS = [
  {
    title: 'Influence, not just adopt when too late',
    body: 'Shape the standards and technologies before others set them without you.',
    href: '/standards',
    icon: (
      <>
        <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      </>
    ),
  },
  {
    title: 'Early access to pre-public code',
    body: 'Access implementations before publication and be faster to market.',
    href: '/early-access',
    icon: (
      <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
    ),
  },
  {
    title: 'Prepare for plugfests & interop',
    body: 'Test your implementation in advance and build reference vector traces.',
    href: '/testing',
    icon: (
      <>
        <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5" />
        <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5" />
        <path d="M3 21l2.5 -2.5" />
        <path d="M18.5 5.5l2.5 -2.5" />
        <path d="M10 11l-2 2" />
        <path d="M13 14l-2 2" />
      </>
    ),
  },
  {
    title: 'Mutualised effort to grow your project',
    body: 'From idea to reference code to demo and trial, on shared effort.',
    icon: (
      <>
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
      </>
    ),
  },
  {
    title: 'Exposure at events, demos and trials',
    body: 'Build once, together, instead of funding the same work alone.',
    href: '/events',
    icon: (
      <>
        <path d="M3 4l18 0" />
        <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" />
        <path d="M12 16l0 4" />
        <path d="M9 20l6 0" />
        <path d="M8 12l3 -3l2 2l3 -3" />
      </>
    ),
  },
  {
    title: 'De-risk on deployments',
    body: 'Back technologies that actually get deployed, not specs that stall.',
    icon: (
      <>
        <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
        <path d="M15 19l2 2l4 -4" />
      </>
    ),
  },
];

const FEE_TIERS = [
  { tier: 'Large', revenue: '> €1 billion', fee: '€ 15,000' },
  { tier: 'Medium', revenue: '€100 million – €1 billion', fee: '€ 10,000' },
  { tier: 'Small', revenue: '€5 million – €100 million', fee: '€ 5,000' },
  { tier: 'Micro', revenue: '< €5 million', fee: '€ 2,000' },
];

const MEMBERS = [
  { name: '3Cat - Corporació Catalana de Mitjans Audiovisuals', href: 'https://www.3cat.cat', logo: '3cat.png' },
  { name: 'AnixeNet', href: 'https://www.anixe.net', logo: 'anixenet.png' },
  { name: 'Astrum Mobile', href: 'https://www.astrum-mobile.com', logo: 'astrum.png' },
  { name: 'Ateme', href: 'https://www.ateme.com', logo: 'ateme.png' },
  { name: 'BBC - British Broadcasting Corporation', href: 'https://www.bbc.co.uk', logo: 'bbc.png' },
  { name: 'Belgian Tower Company', href: 'https://www.btcy.be', logo: 'belgiantower.png' },
  { name: 'Big Blue Marble - ORF', href: 'https://www.bigbluemarble.com', logo: 'bigbluemarble.png' },
  { name: 'BNE - Broadcast Networks Europe', href: 'https://www.broadcast-networks.eu', logo: 'bne.png' },
  { name: 'Dolby Laboratories', href: 'https://www.dolby.com', logo: 'dolby.png' },
  { name: 'EBU - European Broadcasting Union', href: 'https://www.ebu.ch', logo: 'ebu.png' },
  { name: 'EI Towers', href: 'https://www.eitowers.it', logo: 'eitowers.jpg' },
  { name: 'Ericsson', href: 'https://www.ericsson.com', logo: 'ericsson.png' },
  { name: 'ESA - European Space Agency', href: 'https://www.esa.int', logo: 'esa.png' },
  { name: 'Eutelsat Group', href: 'https://www.eutelsat.com', logo: 'eutelsat.png' },
  { name: 'France Télévisions', href: 'https://www.francetelevisions.fr', logo: 'francetv.png' },
  { name: 'Fraunhofer FOKUS', href: 'https://www.fokus.fraunhofer.de', logo: 'fraunhofer.png' },
  { name: 'Haivision', href: 'https://www.haivision.com', logo: 'haivision.png' },
  { name: 'Huawei', href: 'https://www.huawei.com', logo: 'huawei.jpg' },
  { name: 'IEEE Broadcast Technology Society', href: 'https://bts.ieee.org', logo: 'ieeebts.png' },
  { name: 'InterDigital', href: 'https://www.interdigital.com', logo: 'interdigital.png' },
  { name: 'kronehit', href: 'https://www.kronehit.at', logo: 'kronehit.png' },
  { name: 'MBI Group', href: 'https://www.mbigroup.it', logo: 'mbigroup.png' },
  { name: 'MCC - State Key Laboratory of Media Convergence and Communication', href: 'https://en.cuc.edu.cn', logo: 'mcc.png' },
  { name: 'Media Broadcast', href: 'https://www.media-broadcast.com', logo: 'mediabroadcast.png' },
  { name: 'Nokia', href: 'https://www.nokia.com', logo: 'nokia.png' },
  { name: 'ONE Media Technologies', href: 'https://www.onemediallc.com', logo: 'onemedia.png' },
  { name: 'Philips', href: 'https://www.philips.com', logo: 'philips.png' },
  { name: 'Phine.Tech', href: 'https://www.phine.tech', logo: 'phinetech.png' },
  { name: 'Qualcomm', href: 'https://www.qualcomm.com', logo: 'qualcomm.png' },
  { name: 'Rai - Radiotelevisione Italiana', href: 'https://www.rai.it', logo: 'rai.png' },
  { name: 'RTI - Reti Televisive Italiane', href: 'https://www.rti.it', logo: 'rti.png' },
  { name: 'RTVE - Corporación de Radio y Televisión Española', href: 'https://www.rtve.es', logo: 'rtve.png' },
  { name: 'SES', href: 'https://www.ses.com', logo: 'ses.png' },
  { name: 'Smart Mobile Labs', href: 'https://www.smartmobilelabs.com', logo: 'smartmobilelabs.png' },
  { name: 'Swisscom', href: 'https://www.swisscom.ch', logo: 'swisscom.png' },
  { name: 'Swiss TXT', href: 'https://www.swisstxt.ch', logo: 'swisstxt.png' },
  { name: 'SWR - Südwestrundfunk', href: 'https://www.swr.de', logo: 'swr.png' },
  { name: 'Temix Communications', href: 'https://www.temix.it', logo: 'temix.png' },
  { name: 'TRedess', href: 'https://www.tredess.com', logo: 'tredess.png' },
  { name: 'UPV - Universitat Politècnica de València', href: 'https://www.upv.es', logo: 'upv.png' },
  { name: 'XGN - XGen Network', href: 'https://www.xgn.network', logo: 'xgn.png' },
  { name: 'Yotta Media', href: 'https://www.yotta.work', logo: 'yotta.png' },
];

const FACTS = [
  { value: '+40', label: 'Members and developers combined' },
  FACT_REPOSITORIES,
  FACT_CLONES,
  { value: '+15', label: 'Spec-compliant reference tools' },
  FACT_LARGE_EVENTS,
  FACT_YEARLY_CONFERENCE,
];

export default function Membership() {
  const { withBaseUrl } = useBaseUrlUtils();
  return (
    <Layout
      title="Membership"
      description="Join, collaborate and sponsor software development with 5G-MAG — scale your projects with the industry."
    >
      <HubHero
        title="Membership"
        icon={MEMBERSHIP_ICON_PATH}
        actions={[
          <a
            key="join"
            className="button button--primary button--lg"
            href="#request-membership"
          >
            Request information
          </a>,
          <a
            key="members"
            className="button button--outline button--primary button--lg"
            href="#our-members"
          >
            Our Members
          </a>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Join, collaborate, sponsor software development and scale your projects.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our work at a glance</h2>
            <p className={styles.sectionSubtitle}>Some numbers and examples of our work.</p>
            <div className="summary-container">
              {FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h3>{f.label}</h3>
                  <span className="summary-value">{f.value}</span>
                  {f.sub && <span className="stats-sub">{f.sub}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What you get that you won&apos;t get alone</h2>
            <p className={styles.sectionSubtitle}>
              We offer a neutral framework to collaborate within minimal bureaucracy, focused on
              results.
            </p>
            <div className="godeeper-grid">
              {BENEFITS.map((b) => (
                <GodeeperCard key={b.title} {...b} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Membership fees</h2>
            <p className={styles.sectionSubtitle}>
              Annual fee, based on your organisation&apos;s annual revenue.
            </p>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Membership fee category</th>
                    <th>Annual revenue</th>
                    <th>Annual membership fee</th>
                  </tr>
                </thead>
                <tbody>
                  {FEE_TIERS.map((t) => (
                    <tr key={t.tier}>
                      <td className={styles.feeTableTier}>
                        {t.tier}
                        {t.tier === 'Micro' && <sup>*</sup>}
                      </td>
                      <td>{t.revenue}</td>
                      <td className={styles.feeTableFee}>{t.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.feeTableNote}>
                * Micro also includes universities, regulators, public research bodies,
                institutions, NGOs, and non-profit organizations.
              </p>
            </div>
            <div className={styles.contactCallout}>
              <div className={styles.contactCalloutIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </div>
              <div className={styles.contactCalloutBody}>
                <p>
                  <strong>Membership information, sponsorship opportunities, partnerships,
                  questions on fees?</strong>
                  Contact Eva Markvoort — <a href="mailto:markvoort@5g-mag.com">markvoort@5g-mag.com</a>
                </p>
              </div>
            </div>

            <div
              id="request-membership"
              style={{
                maxWidth: '640px',
                margin: '2rem auto 0',
                scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)',
              }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Or request membership information now
              </h3>
              <ContactForm
                accessKey="ef3b8cf9-bbc3-413a-9983-b269b2495122"
                subject="Membership Enquiry — 5G-MAG website"
                submitLabel="Send enquiry"
              />
            </div>
          </div>
        </section>

        <section
          id="our-members"
          className={`${styles.section} ${styles.sectionAlt}`}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Members</h2>
            <p className={styles.sectionSubtitle}>
              Broadcasters, technology vendors, network operators and research institutions
              collaborating within 5G-MAG.
            </p>
            <div className={styles.membersGrid}>
              {MEMBERS.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  title={m.name}
                  style={{
                    background: '#fff',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <img
                    src={withBaseUrl(`/assets/images/members/${m.logo}`)}
                    alt={m.name}
                    loading="lazy"
                    style={{ width: '100%', maxWidth: '180px', height: '120px', objectFit: 'contain' }}
                  />
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#333',
                      textAlign: 'center',
                      lineHeight: 1.25,
                    }}
                  >
                    {m.name.split(' - ')[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
