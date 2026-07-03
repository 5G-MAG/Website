import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const icon = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    {paths}
  </svg>
);

const PORTALS = [
  {
    title: 'Software Accelerator Portal',
    tagline: 'Open-source reference tools, testbeds and application prototypes for 5G media and broadcast — built and maintained by the 5G-MAG community.',
    href: '/developer',
    icon: icon(<><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></>),
    links: [
      { label: 'Reference Tools', href: '/developer/projects' },
      { label: 'Testbeds', href: '/developer/testbeds' },
      { label: 'Application Prototypes', href: '/developer/applications' },
    ],
  },
  {
    title: 'Technical Docs & Standards Work',
    tagline: 'Specification analysis, implementation explainers and SDO contributions — feedback, requirements and liaison statements produced by our members.',
    href: '/tech',
    icon: icon(<><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M9 17l0 -5" /><path d="M12 17l0 -1" /><path d="M15 17l0 -3" /></>),
    links: [
      { label: 'Technical Documentation', href: '/tech/intro' },
      { label: 'Standards Work', href: '/tech/standards/feedback' },
    ],
  },
];

function PortalCard({ title, tagline, href, icon, links }) {
  return (
    <div className={styles.portalCard}>
      <Link to={href} className={styles.portalCardBand}>
        <span className={styles.portalCardIcon}>{icon}</span>
        <h2 className={styles.portalCardTitle}>{title}</h2>
      </Link>
      <div className={styles.portalCardBody}>
        <p className={styles.portalCardTagline}>{tagline}</p>
        <ul className={styles.portalCardLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <Link to={l.href}>{l.label} &rarr;</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>

      {/* Hero */}
      <header style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.18) 100%), linear-gradient(to right, #003580 0%, #00A0D2 100%)',
        height: '490px',
        display: 'flex',
        alignItems: 'center',
        padding: '1.5rem 0 2.5rem',
      }}>
        <div className="container">
          <p style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ifm-color-primary-lightest)', marginBottom: '0.5rem' }}>
            5G-MAG — The Media Connectivity Association
          </p>
          <h1 className={styles.heroNowrap} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1.1rem' }}>
            Bridging Standards and Deployments
          </h1>
          <p className={styles.heroNowrap} style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Driving the next generation of media and connectivity experiences through global standards and open-source.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="button button--primary button--lg" to="/developer">
              Software Accelerator Portal
            </Link>
            <Link
              className="button button--outline button--lg"
              style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.75)' }}
              to="/tech"
            >
              Technical Docs &amp; Standards Work
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Two portals */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Two ways to work with 5G-MAG</h2>
            <p className={styles.sectionSubtitle}>
              Whether you're building on our software or tracking the specifications behind it, start here.
            </p>
            <div className={styles.portalGrid}>
              {PORTALS.map((p) => <PortalCard key={p.href} {...p} />)}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the Community</h2>
            <p className={styles.sectionSubtitle}>
              5G-MAG is an open industry association. Contributions to documentation and standards work are welcome.
            </p>
            <div className={styles.communityLinks}>
              <a className="button button--primary button--lg" href="https://github.com/5G-MAG" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="button button--outline button--primary button--lg" href="https://join.slack.com/t/5g-mag/shared_invite/zt-trtvsmw5-yYgcRidDgIS7x_u48sTuQA" target="_blank" rel="noreferrer">
                Slack
              </a>
              <a className="button button--outline button--primary button--lg" href="https://www.5g-mag.com" target="_blank" rel="noreferrer">
                5G-MAG Website
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
