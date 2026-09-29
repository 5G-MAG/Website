import BalancedLogo from '@site/src/components/BalancedLogo';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ContactForm from '@site/src/components/ContactForm';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import GodeeperCard from '@site/src/components/GodeeperCard';
import {
  FACT_REPOSITORIES,
  FACT_CLONES,
  FACT_LARGE_EVENTS,
  FACT_YEARLY_CONFERENCE,
  FACT_SDO_INPUTS,
  FACT_REFERENCE_TOOLS,
  FACT_TESTBEDS,
} from '@site/src/data/facts';
import { MEMBERS } from '@site/src/data/members';
import { BENEFITS } from '@site/src/data/membershipBenefits';
import styles from '../tech/index.module.css';
import useAnchors from '@site/src/utils/useAnchors';

const MEMBERSHIP_ICON_PATH = (
  <>
    <path d="M17 21v-2a4 4 0 0 0 -4 -4h-6a4 4 0 0 0 -4 4v2" />
    <path d="M7 11a4 4 0 1 0 0 -8a4 4 0 0 0 0 8z" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

const FEE_TIERS = [
  { tier: 'Large', revenue: '> €1 billion', fee: '€ 15,000' },
  { tier: 'Medium', revenue: '€100 million – €1 billion', fee: '€ 10,000' },
  { tier: 'Small', revenue: '€5 million – €100 million', fee: '€ 5,000' },
  { tier: 'Micro', revenue: '< €5 million', fee: '€ 2,000' },
];

const FACTS = [
  FACT_REPOSITORIES,
  FACT_CLONES,
  FACT_REFERENCE_TOOLS,
  FACT_TESTBEDS,
  FACT_LARGE_EVENTS,
  FACT_YEARLY_CONFERENCE,
  FACT_SDO_INPUTS,
];

export default function Membership() {
  useAnchors('request-membership', 'our-members');
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
            className="button button--primary"
            href="#request-membership"
          >
            Request Information
          </a>,
          <a
            key="members"
            className="button button--outline button--primary"
            href="#our-members"
          >
            Our Members
          </a>,
        ]}
      />

      <main>
        {/* What You Get -- first thing after the hero (raised directly:
            "I think what you get should be the first thing to show"),
            ahead of the stats block: the value proposition leads, then
            the proof. */}
        <section className={styles.section}>
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

        <section className={`${styles.section} ${styles.sectionAlt}`}>
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

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Membership fees</h2>
            <p className={styles.sectionSubtitle}>
              For a decision-maker, this comes down to three things: shared effort, faster time to
              market, and less risk on technology that hasn&apos;t shipped yet. The fee below is
              based on your organisation&apos;s annual revenue.
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
              <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                Or request membership information now
              </h3>
              <p
                style={{
                  textAlign: 'center',
                  color: 'var(--ifm-color-emphasis-700)',
                  marginBottom: '1rem',
                }}
              >
                After you get in touch, we will follow up directly and share the Articles of
                Association and the Internal Rules as the next step.
              </p>
              <ContactForm
                web3formsKey="ef3b8cf9-bbc3-413a-9983-b269b2495122"
                subject="Membership Enquiry — 5G-MAG website"
                submitLabel="Send enquiry"
                successNote="Next, we will follow up directly and share the Articles of Association and the Internal Rules with you."
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
              A thriving, open community — membership is open to any organization willing to join
              the efforts.
            </p>
            <div className={styles.membersGrid}>
              {MEMBERS.map((m) => (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  title={m.name}
                  className={styles.memberCard}
                >
                  <BalancedLogo src={withBaseUrl(`/assets/images/members/${m.logo}`)} />
                  <span className={styles.memberCardName}>{m.name.split(' - ')[0]}</span>
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
