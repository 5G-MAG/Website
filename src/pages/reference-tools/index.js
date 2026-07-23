import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import styles from '../tech/index.module.css';

const icon = (paths) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    {paths}
  </svg>
);

const REFTOOLS_ICON_PATH = (
  <>
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l4 4l-4 4" />
    <path d="M14 4l-4 16" />
  </>
);

// Deliberately NOT shared with developer/index.js or applications/index.js's
// near-identical arrays: topic titles here intentionally use each project's
// fuller canonical name (matching its own _category_.json label in
// sidebars-home.js), not the shorter discovery-grid labels used on those two
// pages. See the longer note in developer/index.js's own CATEGORIES.
// Categorised by standards body rather than use case: a Reference Tool's
// defining property is which specification it implements, not which
// scenario it eventually gets used in (that mapping lives on the
// Applications page instead, against the same categories Tech uses).
const CATEGORIES = [
  {
    title: '3GPP Implementations',
    desc: 'Reference implementations of 3GPP-defined media streaming, broadcast, multicast, core-network and data-collection specifications.',
    topics: [
      {
        title: '3GPP RAN and Core Platforms',
        desc: 'Open5GS-based 5G core and srsRAN-based RAN for lab and field testing.',
        href: '/reference-tools/3gpp-platforms',
        icon: icon(
          <>
            <path d="M6 18l0 -2" />
            <path d="M10 18l0 -4" />
            <path d="M14 18l0 -6" />
            <path d="M18 18l0 -8" />
          </>
        ),
      },
      {
        title: '5G Broadcast - Emergency Alerts',
        desc: 'Broadcast-based public warning system using 5G Broadcast infrastructure.',
        href: '/reference-tools/emergency-alerts',
        icon: icon(
          <>
            <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
            <path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
            <path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
          </>
        ),
      },
      {
        title: '5G Broadcast - TV and Radio Services',
        desc: 'LTE-based transmitter, middleware and modem for TV & radio broadcast over 5G.',
        href: '/reference-tools/5g-broadcast',
        icon: icon(
          <>
            <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
            <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
            <path d="M9 21l3 -9l3 9" />
            <path d="M10 19h4" />
          </>
        ),
      },
      {
        title: '5G Core Service Consumers',
        desc: 'Reference consumer implementations for 5G Core (5GC) capability exposure APIs.',
        href: '/reference-tools/5g-core',
        icon: icon(
          <>
            <path d="M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
            <path d="M6 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3v-4h4" />
          </>
        ),
      },
      {
        title: '5G Media Streaming (5GMS)',
        desc: '3GPP AF/AS implementation for adaptive media delivery over 5G.',
        href: '/reference-tools/5gms',
        icon: icon(<path d="M7 4v16l13 -8l-13 -8" />),
      },
      {
        title: '5G Multicast Broadcast Services (MBS)',
        desc: '5G MBS client and network functions for native multicast delivery.',
        href: '/reference-tools/5g-mbs',
        icon: icon(
          <>
            <path d="M12 12l0 .01" />
            <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
            <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
            <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
            <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
          </>
        ),
      },
      {
        title: 'DVB-I Services over 5G Systems',
        desc: 'DVB-I service discovery and delivery adapted for 5G hybrid networks.',
        href: '/reference-tools/dvb-i',
        icon: icon(
          <>
            <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
            <path d="M16 3l-4 4l-4 -4" />
          </>
        ),
      },
      {
        title: 'UE Data Collection, Reporting and Event Exposure',
        desc: 'On-device (UE) data collection and reporting per 3GPP TS 26.531.',
        href: '/reference-tools/data-collection',
        icon: icon(
          <>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
            <path d="M9 17l0 -5" />
            <path d="M12 17l0 -1" />
            <path d="M15 17l0 -3" />
          </>
        ),
      },
    ],
  },
  {
    title: 'MPEG Implementation',
    desc: 'Reference implementations of MPEG scene-description, avatar and volumetric-video standards.',
    topics: [
      {
        title: 'Conversational Avatar Communication with MPEG ARF',
        desc: 'Real-time avatar streaming using the MPEG Avatar Representation Format (ARF) standard.',
        href: '/reference-tools/avatar',
        icon: icon(
          <>
            <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" />
            <path d="M12 2v2" />
            <path d="M9 12v9" />
            <path d="M15 12v9" />
            <path d="M5 16l4 -2" />
            <path d="M15 14l4 2" />
            <path d="M9 18h6" />
            <path d="M10 8v.01" />
            <path d="M14 8v.01" />
          </>
        ),
      },
      {
        title: 'MPEG V3C Immersive Platform',
        desc: 'End-to-end pipeline for volumetric 3D content production and delivery.',
        href: '/reference-tools/v3c',
        icon: icon(
          <>
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            <path d="M12 12.5l4 -2.5" />
            <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" />
            <path d="M8 10v4.5l4 2.5" />
          </>
        ),
      },
      {
        title: 'XR/3D Scenes with MPEG-I Scene Description',
        desc: 'Unity player for MPEG-I Scene Description with 5G media integration.',
        href: '/reference-tools/xr',
        icon: icon(
          <>
            <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
            <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
            <path d="M3 17v2a2 2 0 0 0 2 2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M17 21h2a2 2 0 0 0 2 -2v-2" />
          </>
        ),
      },
    ],
  },
  {
    title: 'IETF Implementations',
    desc: 'Reference implementations of IETF-specified transport protocols.',
    topics: [
      {
        title: 'Multimedia Delivery Protocols',
        desc: 'Multi-CDN tooling and protocol implementations for media delivery.',
        href: '/reference-tools/multimedia',
        icon: icon(
          <>
            <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12v9" />
            <path d="M12 12l-8 -4.5" />
          </>
        ),
      },
    ],
  },
  {
    title: 'CAMARA Project Implementations',
    desc: 'Reference implementations of CAMARA telco network API specifications.',
    topics: [
      {
        title: 'CAMARA Connectivity Quality Management APIs',
        desc: 'CAMARA-compliant API clients for QoS-aware media applications.',
        href: '/reference-tools/network-apis',
        icon: icon(
          <>
            <path d="M4 13h5" />
            <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
            <path d="M20 8v8" />
            <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" />
          </>
        ),
      },
    ],
  },
  {
    title: 'Shared Tools',
    desc: 'Common helper repositories and third-party tools that complement the Reference Tools above.',
    topics: [
      {
        title: 'Common Tools',
        desc: 'Shared scripts, example configurations and build utilities used across several Reference Tools.',
        href: '/reference-tools/common-tools',
        icon: icon(
          <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
        ),
      },
      {
        title: 'External Tools',
        desc: 'Third-party tools, currently the DVB NIP Analyzer for DVB-NIP/FLUTE streams.',
        href: '/reference-tools/external-tools',
        icon: icon(
          <>
            <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
            <path d="M11 13l9 -9" />
            <path d="M15 4h5v5" />
          </>
        ),
      },
    ],
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
          <Link key={t.href} to={t.href} className={styles.categoryTopicCard}>
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

export default function ReferenceTools() {
  return (
    <Layout
      title="Reference Tools"
      description="Directory of 5G-MAG Reference Tools projects, each card linking to its documentation, roadmap, and releases pages."
    >
      <HubHero
        title="Reference Tools"
        icon={REFTOOLS_ICON_PATH}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Open-source software implementations corresponding to industry specifications to accelerate testing and deployment.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Tools by Capability Area</h2>
            <p className={styles.sectionSubtitle}>
              Start here if you know which specification or tool you want. For a complete end-to-end
              service scenario built from several tools, see{' '}
              <Link to="/applications">Applications</Link>. For shared test infrastructure, see{' '}
              <Link to="/testbeds">Testbeds</Link>.
            </p>
            <div className={styles.categoryColumns}>
              {CATEGORIES.map((c) => (
                <CategoryCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
