import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { icon } from '@site/src/components/GodeeperCard';
import { FACT_SPEC_ISSUES, FACT_SDO_INPUTS } from '@site/src/data/facts';
import styles from '../tech/index.module.css';

const GITHUB_ICON_PATH = (
  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
);
const CALENDAR_ICON_PATH = (
  <>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M16 3v4" />
    <path d="M8 3v4" />
    <path d="M4 11h16" />
    <path d="M11 15h1" />
    <path d="M12 15v3" />
  </>
);
const DOC_ICON_PATH = (
  <>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
    <path d="M9 17l0 -5" />
    <path d="M12 17l0 -1" />
    <path d="M15 17l0 -3" />
  </>
);
const DIAGRAM_ICON_PATH = (
  <>
    <path d="M9 3l0 18" />
    <path d="M15 3l0 18" />
    <path d="M3 9l18 0" />
    <path d="M3 15l18 0" />
  </>
);
const FEEDBACK_ICON_PATH = <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />;

// Sourced from the grey "motivation" strip on the 5G-MAG Portfolio Slides
// (slide 7: "Feedback & Requirements to Standards Bodies"), not the dark-card
// row below it — that dark-card content ("Requirements towards Standards
// Bodies" / "Feedback, Requirements and Pain Points" / "Liaison Statements &
// Inputs to SDOs") is the real section content, not motivation framing.
const MOTIVATION = [
  {
    title: 'Active engagement with standards bodies',
    icon: (
      <>
        <path d="M8 9h8" />
        <path d="M8 13h6" />
        <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" />
      </>
    ),
  },
  {
    title: 'Requirements based on application needs',
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </>
    ),
  },
  {
    title: 'Identification of bugs and enhancements',
    icon: (
      <>
        <path d="M12 9v4" />
        <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
        <path d="M12 16h.01" />
      </>
    ),
  },
];

const FEEDBACK_AREAS = [
  {
    title: 'Feedback to 3GPP',
    desc: '3GPP media specifications (5G Media Streaming, Multicast-Broadcast Services, data collection and related work), discussed with 3GPP SA4.',
    topics: [
      {
        title: 'List of issues',
        desc: 'Open issues tracked on GitHub',
        href: 'https://github.com/5G-MAG/Standards/issues?q=is%3Aopen%20is%3Aissue%20project%3A5g-mag%2F33',
        icon: icon(GITHUB_ICON_PATH),
      },
      {
        title: 'Project board',
        desc: 'Status of 3GPP feedback issues',
        href: 'https://github.com/orgs/5G-MAG/projects/33',
        icon: icon(GITHUB_ICON_PATH),
      },
      {
        title: 'Meetings with 3GPP SA4',
        desc: 'Regular meetings, notes and CR status',
        href: '/standards/3gpp-issue-tracking',
        icon: icon(CALENDAR_ICON_PATH),
      },
    ],
  },
  {
    title: 'Feedback to MPEG',
    desc: 'MPEG (ISO/IEC JTC 1/SC 29) specifications, such as the immersive and scene-description formats used in XR and volumetric work.',
    topics: [
      {
        title: 'List of issues',
        desc: 'Open issues tracked on GitHub',
        href: 'https://github.com/5G-MAG/Standards/issues?q=is%3Aissue%20state%3Aopen%20project%3A5G-MAG%2F49',
        icon: icon(GITHUB_ICON_PATH),
      },
      {
        title: 'Project board',
        desc: 'Status of MPEG feedback issues',
        href: 'https://github.com/orgs/5G-MAG/projects/49',
        icon: icon(GITHUB_ICON_PATH),
      },
    ],
  },
  {
    title: 'Feedback to ETSI TS 103 720',
    desc: '5G Broadcast System for linear TV and radio services — the free-to-air LTE-based delivery system.',
    topics: [
      {
        title: 'List of issues',
        desc: 'Open issues tracked on GitHub',
        href: 'https://github.com/5G-MAG/Standards/issues?q=is%3Aopen+is%3Aissue+project%3A5g-mag%2F32',
        icon: icon(GITHUB_ICON_PATH),
      },
      {
        title: 'Project board',
        desc: 'Status of ETSI Broadcast feedback',
        href: 'https://github.com/orgs/5G-MAG/projects/32',
        icon: icon(GITHUB_ICON_PATH),
      },
    ],
  },
  {
    title: 'Feedback to ETSI TR 103 972',
    desc: 'Deployment Guidelines for DVB-I services over 5G Systems.',
    topics: [
      {
        title: 'List of issues',
        desc: 'Open issues tracked on GitHub',
        href: 'https://github.com/5G-MAG/Standards/issues?q=is%3Aopen+is%3Aissue+project%3A5g-mag%2F31',
        icon: icon(GITHUB_ICON_PATH),
      },
      {
        title: 'Project board',
        desc: 'Status of DVB-I feedback issues',
        href: 'https://github.com/orgs/5G-MAG/projects/31',
        icon: icon(GITHUB_ICON_PATH),
      },
    ],
  },
];

const STANDARDS_FACTS = [
  FACT_SPEC_ISSUES,
  { value: '3GPP', label: 'Engagement as Market Representation Partner' },
  FACT_SDO_INPUTS,
  { value: '6', label: 'Presentations at 3GPP requirements workshops' },
];

const WORKSHOP_INPUTS = [
  {
    title: '6G & Media: General views & priorities',
    desc: '2025 — 3GPP Workshop on 6G',
    href: 'https://www.3gpp.org/ftp/workshop/2025-03-10_3GPP_6G_WS/Docs/6GWS-250137.zip',
  },
  {
    title: 'Views from 5G-MAG towards IMT-2030',
    desc: '2024 — 3GPP SA1 IMT-2030',
    href: 'https://www.3gpp.org/ftp/workshop/2024-05-08_3GPP_Stage1_IMT2030_UC_WS/Docs/SWS-240007.zip',
  },
  {
    title: '5G-MAG views on Media related topics for Rel-19 (SA)',
    desc: '2023 — 3GPP SA Release 19',
    href: 'https://www.3gpp.org/ftp/tsg_sa/TSG_SA/Workshops/2023-06-13_Rel-19_WorkShop/Docs/SWS-230009.zip',
  },
  {
    title: '5G-MAG views on Media related topics for Rel-19 (RAN)',
    desc: '2023 — 3GPP RAN Release 19',
    href: 'https://www.3gpp.org/ftp/TSG_RAN/TSG_RAN/TSGR_AHs/2023_06_RAN_Rel19_WS/Docs/RWS-230367.zip',
  },
  {
    title: '5G-MAG Proposals for 3GPP SA and SA4 Rel-18 Workshops',
    desc: '2021 — 3GPP SA Release 18',
    href: 'https://www.3gpp.org/ftp/tsg_sa/TSG_SA/Workshops/2021-09-09_Rel-18_Workshop/Docs/SP-210617.zip',
  },
  {
    title: '5G-MAG Proposals for 3GPP RAN Rel-18 Workshop',
    desc: '2021 — 3GPP RAN Release 18',
    href: 'https://www.3gpp.org/ftp/TSG_RAN/TSG_RAN/TSGR_AHs/2021_06_RAN_Rel18_WS/Docs/RWS-210205.zip',
  },
];

function CategoryCard({ title, desc, topics }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
        <h3 className={styles.categoryTitle}>{title}</h3>
        <p className={styles.categoryDesc}>{desc}</p>
      </div>
      <div className={styles.categoryTopicGrid}>
        {topics.map((t) => (
          <a
            key={t.href}
            href={t.href}
            target={t.href.startsWith('http') ? '_blank' : undefined}
            rel={t.href.startsWith('http') ? 'noreferrer' : undefined}
            className={styles.categoryTopicCard}
          >
            {t.icon && <span className={styles.categoryTopicIcon}>{t.icon}</span>}
            <span className={styles.categoryTopicCardBody}>
              <span className={styles.categoryTopicName}>{t.title}</span>
              <span className={styles.categoryTopicDescText}>{t.desc}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ title, desc, href, icon: cardIcon }) {
  return (
    <a className={styles.activityCard} href={href} target="_blank" rel="noreferrer">
      <div className={styles.activityIconBand}>
        {cardIcon}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </div>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{desc}</p>
      </div>
      <div className={styles.activityArrow}>Download &rarr;</div>
    </a>
  );
}

export default function Standards() {
  return (
    <Layout
      title="Feedback & Requirements"
      description="How 5G-MAG submits feedback on 3GPP, MPEG and ETSI specifications as GitHub issues, and its position papers to SDO workshops."
    >
      <HubHero
        title="Feedback and Requirements to Standards Bodies"
        icon={FEEDBACK_ICON_PATH}
        actions={[
          <a
            key="issue"
            className="button button--primary button--lg"
            href="https://github.com/5G-MAG/Standards/issues/new/choose"
            target="_blank"
            rel="noreferrer"
          >
            New Issue
          </a>,
          <Link
            key="meetings"
            className="button button--outline button--primary button--lg"
            to="/standards/3gpp-issue-tracking"
          >
            Meetings with 3GPP SA4
          </Link>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Shaping standards through concrete requirements and experienced-based feedback — submitted to SDOs.</p>
      </div>

      <main>
        {/* Why this matters */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Feedback & Requirements</h2>
            <p className={styles.sectionSubtitle}>
              Advancing standardization with implementation and experience-based feedback.
            </p>
            <div className={styles.pillarGrid3}>
              {MOTIVATION.map((p) => (
                <div key={p.title} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{p.icon}</div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  {p.body && <p className={styles.pillarBody}>{p.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Feedback Areas</h2>
            <p className={styles.sectionSubtitle}>
              Feedback, requirements and pain points — deployment experience and requirements
              submitted to SDOs.
            </p>
            <div className={styles.categoryColumns}>
              {FEEDBACK_AREAS.map((c) => (
                <CategoryCard key={c.title} {...c} />
              ))}
            </div>
            <div className={styles.photoGrid1}>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src="/assets/images/gallery/github-feedback-board.png"
                  alt="GitHub project board tracking 3GPP specification feedback issues"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  The 3GPP Specifications Feedback board on GitHub — every issue tracked from
                  discussion to adoption.
                </p>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Requirements & Workshop Inputs</h2>
            <p className={styles.sectionSubtitle}>
              Requirements towards standards bodies — supported by industry inputs, targeted
              workshops or surveys.
            </p>
            <div className={styles.activityGrid}>
              {WORKSHOP_INPUTS.map((w) => (
                <ActivityCard key={w.href} {...w} icon={icon(DOC_ICON_PATH)} />
              ))}
            </div>
            <div className={styles.photoGrid1}>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src="/assets/images/gallery/3gpp-imt2030-contribution.jpg"
                  alt="Cover of 5G-MAG's contribution 'Views from 5G-MAG towards IMT-2030' to the 3GPP Stage 1 Workshop"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  &quot;Views from 5G-MAG towards IMT-2030&quot; — 5G-MAG&apos;s contribution to the
                  3GPP Stage 1 Workshop on IMT-2030 Use Cases, Rotterdam 2024.
                </p>
              </figure>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Methodology</h2>
            <p className={styles.sectionSubtitle}>
              Liaison statements and inputs to SDOs — engagement in standards bodies on behalf of
              5G-MAG members. How a GitHub issue is reviewed and carried through to a correction,
              new-feature proposal or liaison input.
            </p>
            <div className={styles.categoryColumns}>
              <CategoryCard
                title="How feedback is processed"
                desc="Two workflows: one for specifications 5G-MAG maintains, one for external SDOs (3GPP, ETSI)."
                topics={[
                  {
                    title: 'Methodology to Provide Feedback',
                    desc: 'Internal and external workflow diagrams',
                    href: '/standards/methodology',
                    icon: icon(DIAGRAM_ICON_PATH),
                  },
                ]}
              />
              <CategoryCard
                title="Resources"
                desc="Reference material for engaging with 3GPP, MPEG and ETSI standards work."
                topics={[
                  {
                    title: 'Liaison Statements & Inputs',
                    desc: 'Tables of LS sent to and received from SDOs',
                    href: '/standards/ls',
                    icon: icon(
                      <>
                        <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
                        <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v3.5" />
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our work at a glance</h2>
            <p className={styles.sectionSubtitle}>
              Some numbers and examples of our work.
            </p>
            <div className="summary-container">
              {STANDARDS_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h4>{f.label}</h4>
                  <span className="summary-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort />
      </main>
    </Layout>
  );
}
