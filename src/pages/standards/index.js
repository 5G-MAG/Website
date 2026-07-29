import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
    body: 'Direct participation in the standards process, not just commentary from the outside.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 9h8" />
        <path d="M8 13h6" />
        <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" />
      </svg>
    ),
  },
  {
    title: 'Requirements based on application needs',
    body: 'Requirements drawn from real deployment experience, not theoretical scenarios.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    ),
  },
  {
    title: 'Identification of bugs and enhancements',
    body: 'Implementation work surfaces specification gaps early, before they become costly to fix once a standard is frozen.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 9v4" />
        <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
        <path d="M12 16h.01" />
      </svg>
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

const REQUIREMENTS_ICON_PATH = (
  <>
    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="2" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </>
);
const LS_ICON_PATH = (
  <>
    <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
    <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v3.5" />
  </>
);
const WORKSHOPS_ICON_PATH = (
  <>
    <path d="M8 19h-3a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v11a1 1 0 0 1 -1 1" />
    <path d="M11 17a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -1" />
  </>
);
const SURVEY_ICON_PATH = (
  <>
    <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="2" />
    <path d="M9 14l2 2l4 -4" />
  </>
);

// "What You'll Find Here" -- one crystal-clear index of every real
// destination on this hub, shown right under "Why". Ordered so related
// things sit together: Requirements and Surveys (ways to feed input in),
// then Feedback (how issues get tracked and processed), then Liaison
// Statements (the formal output), then Workshops.
const WHATS_HERE = [
  {
    title: 'Requirements towards SDOs',
    desc: 'Requirements towards standards bodies, backed by industry inputs and surveys.',
    href: '/standards/requirements',
    icon: icon(REQUIREMENTS_ICON_PATH),
  },
  {
    title: 'Industry Surveys',
    desc: 'Share your input to help shape the requirements 5G-MAG brings to standards bodies.',
    href: '/surveys',
    icon: icon(SURVEY_ICON_PATH),
  },
  {
    title: 'Feedback to SDOs',
    desc: 'Per-SDO feedback tracked on GitHub, and how an issue is carried through to a correction or liaison input.',
    href: '/standards/#feedback',
    icon: icon(DIAGRAM_ICON_PATH),
  },
  {
    title: 'Liaison Statements & Inputs',
    desc: 'Tables of LS sent to and received from SDOs.',
    href: '/standards/ls',
    icon: icon(LS_ICON_PATH),
  },
  {
    title: 'Workshops for Standards',
    desc: 'The workshops that fed directly into 3GPP study and work items.',
    href: '/standards/#standards-workshops',
    icon: icon(WORKSHOPS_ICON_PATH),
  },
];

// Curated subset of the full /workshops archive (21 sessions) -- only the
// ones that directly fed a named 3GPP study/work item or pre-aligned
// member positions ahead of a plenary decision. The rest of the archive is
// general community/orientation content and stays under /workshops only.
const STANDARDS_WORKSHOPS = [
  {
    title: 'Media Energy Consumption Measurement and Exposure',
    why: 'Co-organized with 3GPP SA4 around its Media Energy Consumption Study Item.',
    href: '/workshops/media-energy-consumption',
  },
  {
    title: '3GPP Release 19, from Specification to Implementation',
    why: 'Spec-to-implementation workshop for a named, just-frozen 3GPP release.',
    href: '/workshops/3gpp-release-19',
  },
  {
    title: '5G-MAG Workshop with 3GPP SA4: Advanced Media Delivery',
    why: 'Kickoff of the 3GPP SA4 Advanced Media Delivery Feasibility Study.',
    href: '/workshops/workshop-3gpp-sa4-advanced-media-delivery',
  },
  {
    title: 'Towards 3GPP Rel-19 — NTN & Content Delivery',
    why: 'Pre-aligned member positions ahead of the 3GPP TSG plenary that decided Rel-19.',
    href: '/workshops/towards-rel-19-ntn-content-delivery',
  },
  {
    title: '5G Media towards 3GPP Release 19',
    why: 'Early planning input toward the Release 19 package.',
    href: '/workshops/5g-media-towards-release-19',
  },
  {
    title: '5G Advanced — Media Distribution in 3GPP Release 18',
    why: 'Discussed new 5G Advanced work areas under Release 18.',
    href: '/workshops/amd-3gpp-release-18',
  },
  {
    title: 'Media Production over 5G Non-Public Networks',
    why: 'Gathered industry input for the new 3GPP SA4 NPN4AVProd study item.',
    href: '/workshops/media-production-over-5g-npn',
  },
  {
    title: 'Follow-up Workshop: Media Production over 5G NPN — Deep Dive into Protocols',
    why: 'Protocol deep-dive continuing the NPN4AVProd study item input.',
    href: '/workshops/media-production-5g-npn-deep-dive-follow-up',
  },
];

function ActivityCard({ title, desc, href, icon: cardIcon }) {
  return (
    <Link className={styles.activityCard} to={href}>
      <div className={styles.activityIconBand}>
        {cardIcon}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </div>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{desc}</p>
      </div>
      <div className={styles.activityArrow}>View &rarr;</div>
    </Link>
  );
}

function WorkshopCard({ title, why, href }) {
  return (
    <Link to={href} className={styles.linkCard}>
      <h3 className={styles.linkCardTitle}>{title}</h3>
      <p className={styles.linkCardBody}>{why}</p>
    </Link>
  );
}

function CategoryCard({ title, desc, topics }) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryHeader}>
        <h3 className={styles.categoryTitle}>{title}</h3>
        <p className={styles.categoryDesc}>{desc}</p>
      </div>
      <div className={styles.categoryTopicGrid}>
        {topics.map((t) => (
          <Link
            key={t.href}
            to={t.href}
            target={t.href.startsWith('http') ? '_blank' : undefined}
            rel={t.href.startsWith('http') ? 'noreferrer' : undefined}
            className={styles.categoryTopicCard}
          >
            {t.icon && <span className={styles.categoryTopicIcon}>{t.icon}</span>}
            <span className={styles.categoryTopicCardBody}>
              <span className={styles.categoryTopicName}>{t.title}</span>
              <span className={styles.categoryTopicDescText}>{t.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Standards() {
  const githubFeedbackImg = useBaseUrl('/assets/images/gallery/github-feedback-board.png');
  const methodologyInternalImg = useBaseUrl('/assets/images/Feedback_1.png');
  const methodologyExternalImg = useBaseUrl('/assets/images/Feedback_2.png');
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
            className="button button--primary"
            href="https://github.com/5G-MAG/Standards/issues/new/choose"
            target="_blank"
            rel="noreferrer"
          >
            New Issue
          </a>,
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

        {/* What You'll Find Here */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What You&apos;ll Find Here</h2>
            <p className={styles.sectionSubtitle}>
              Every destination on this hub, in one place.
            </p>
            <div className={styles.activityGrid}>
              {WHATS_HERE.map((r) => (
                <ActivityCard key={r.href} {...r} />
              ))}
            </div>
          </div>
        </section>

        {/* Feedback & Methodology -- per-SDO tracking and how it's processed,
            kept on one page since they're two views of the same activity. */}
        <section id="feedback" className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Feedback to SDOs</h2>
            <p className={styles.sectionSubtitle}>
              Feedback, requirements and pain points — deployment experience submitted to SDOs, and
              how each GitHub issue is carried through to a correction, new-feature proposal or
              liaison input.
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
                  src={githubFeedbackImg}
                  alt="GitHub project board tracking 3GPP specification feedback issues"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  The 3GPP Specifications Feedback board on GitHub — every issue tracked from
                  discussion to adoption.
                </p>
              </figure>
            </div>

            <h3 style={{ marginTop: '2.5rem', textAlign: 'center' }}>How Feedback Is Processed</h3>
            <p className={styles.sectionSubtitle}>
              Two workflows: one for specifications 5G-MAG maintains, one for external SDOs (3GPP,
              ETSI).
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                marginTop: '1.5rem',
                alignItems: 'start',
              }}
            >
              <figure style={{ margin: 0 }}>
                <img
                  loading="lazy"
                  src={methodologyInternalImg}
                  alt="Workflow for feedback on specifications maintained by 5G-MAG: a community issue is raised on GitHub, reviewed by 5G-MAG, and progressed to a correction or new-feature proposal."
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                  }}
                />
                <figcaption className={styles.diagramCaption}>
                  Feedback on specifications 5G-MAG maintains: from a GitHub issue to a correction
                  or new-feature proposal.
                </figcaption>
              </figure>
              <figure style={{ margin: 0 }}>
                <img
                  loading="lazy"
                  src={methodologyExternalImg}
                  alt="Workflow for feedback on specifications maintained by external SDOs: a community issue is raised on GitHub, reviewed by 5G-MAG, and forwarded to the responsible standards body as a change request or liaison input."
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                  }}
                />
                <figcaption className={styles.diagramCaption}>
                  Feedback on specifications owned by an external SDO (e.g. 3GPP, ETSI): carried in
                  as a change request or liaison input.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Workshops for Standards */}
        <section id="standards-workshops" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Workshops for Standards</h2>
            <p className={styles.sectionSubtitle}>
              Of the full workshop &amp; session archive, these fed directly into named 3GPP study
              or work items.
            </p>
            <div className={styles.pillarGrid3}>
              {STANDARDS_WORKSHOPS.map((w) => (
                <WorkshopCard key={w.href} {...w} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
              <Link to="/workshops">Browse the full workshop &amp; session archive &rarr;</Link>
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
                  <h3>{f.label}</h3>
                  <span className="summary-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
