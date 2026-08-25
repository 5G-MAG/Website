import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import { icon } from '@site/src/components/GodeeperCard';
import styles from './index.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';

// A handful of the most recent Technology Exchange sessions -- the full
// gallery (grouped by session, with intro text) lives at /tech/exchanges.
const TECHNOLOGY_EXCHANGES_FEATURED = (youtubePlaylists.technologyExchange?.videos || []).slice(0, 6);

const CATEGORIES = [
  {
    title: 'Media Streaming, Multicast & Real-Time Communications',
    desc: 'For service providers, streaming platforms and network operators delivering media at any scale — unicast, multicast, satellite or real-time — and measuring how well it performs.',
    topics: [
      {
        title: '5G Media Streaming (5GMS)',
        desc: 'Unicast on-demand and live content delivery over 5G, downlink and uplink camera-to-cloud contribution.',
        href: '/tech/5gms',
        standardsHref: '/standards/5gms',
        icon: icon(<path d="M7 4v16l13 -8l-13 -8" />),
      },
      {
        title: '5G Multicast Broadcast Services (MBS)',
        desc: '5G-native MBS for efficient one-to-many delivery.',
        href: '/tech/5g-mbs',
        standardsHref: '/standards/5g-mbs',
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
        desc: 'Broadcast service discovery and hybrid delivery integration.',
        href: '/tech/dvb-i/dvb-i-5g',
        standardsHref: '/standards/dvb-i',
        icon: icon(
          <>
            <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
            <path d="M16 3l-4 4l-4 -4" />
          </>
        ),
      },
      {
        title: 'Multimedia Delivery Protocols',
        desc: 'FLUTE and ROUTE transport for one-way delivery of DASH, HLS and CMAF content over broadcast and multicast.',
        href: '/tech/multimedia/multimedia-content-delivery',
        standardsHref: '/standards/multimedia',
        icon: icon(
          <>
            <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12v9" />
            <path d="M12 12l-8 -4.5" />
          </>
        ),
      },
      {
        title: 'Non-Terrestrial Networks',
        desc: 'MBS over satellite and NTN mobility analysis.',
        href: '/tech/ntn',
        standardsHref: '/standards/ntn',
        tag: 'Analysis only',
        icon: icon(
          <>
            <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z" />
            <path d="M6 10l-3 3l3 3l3 -3" />
            <path d="M10 6l3 -3l3 3l-3 3" />
            <path d="M14 17a3 3 0 0 0 3 -3" />
            <path d="M20 13a9 9 0 0 0 -9 9" />
          </>
        ),
      },
      {
        title: 'Real-Time Communications',
        desc: 'Low-latency two-way media over 5G.',
        href: '/tech/rtc',
        standardsHref: '/standards/rtc',
        tag: 'Analysis only',
        icon: icon(
          <>
            <path d="M7 21v-6" />
            <path d="M20 6l-3 -3l-3 3" />
            <path d="M10 18l-3 3l-3 -3" />
            <path d="M7 3v2" />
            <path d="M7 9v2" />
            <path d="M17 3v6" />
            <path d="M17 21v-2" />
            <path d="M17 15v-2" />
          </>
        ),
      },
      {
        title: 'UE Data Collection, Reporting and Event Exposure',
        desc: 'Device-side QoE feedback and analytics for delivery optimisation.',
        href: '/tech/data-collection/data-collection-event-exposure',
        standardsHref: '/standards/data-collection',
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
    title: '5G Broadcast for TV, Radio and Emergency Alerts',
    desc: 'LTE-based over-the-air broadcast reaching any device without a network subscription — for TV, radio and public warning services.',
    topics: [
      {
        title: '5G Broadcast - TV, Radio and Emergency Alerts',
        desc: 'Over-the-air broadcast for TV, radio and emergency services.',
        href: '/tech/5g-broadcast',
        standardsHref: '/standards/5g-broadcast',
        extraStandards: [
          { label: 'Standards Evolution →', href: '/standards/5g-broadcast-standards-evolution' },
          { label: 'Emergency Alerts →', href: '/standards/emergency-alerts' },
        ],
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
    ],
  },
  {
    title: 'Immersive Media Experiences',
    desc: 'For platforms and device vendors building next-generation viewing experiences — AR, VR, volumetric video and avatar-based communication — delivered over 5G networks.',
    topics: [
      {
        title: 'Avatar Communication with MPEG ARF',
        desc: 'Real-time conversational avatars over 5G using the MPEG Avatar Representation Format (ARF).',
        href: '/tech/avatar-communications',
        standardsHref: '/standards/avatar',
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
        title: 'Volumetric Video with MPEG V3C',
        desc: 'V3C point-cloud video and beyond-2D evaluation frameworks.',
        href: '/tech/volumetric',
        standardsHref: '/standards/v3c',
        extraStandards: [{ label: 'Beyond 2D Standards →', href: '/standards/beyond-2d' }],
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
        title: 'XR and MPEG-I Scene Description',
        desc: 'AR/VR content delivery and interactive 3D scene composition.',
        href: '/tech/xr',
        standardsHref: '/standards/xr',
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
    title: 'Connected Media Production and Contribution',
    desc: 'For production companies and network operators using 5G at studios, venues and remote locations where professional-grade reliability, timing accuracy and network quality are required.',
    topics: [
      {
        title: 'Connectivity Quality with Network APIs',
        desc: 'CAMARA and 3GPP APIs for QoS control and network event exposure.',
        href: '/tech/network-apis',
        standardsHref: '/standards/network-apis',
        icon: icon(
          <>
            <path d="M4 13h5" />
            <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
            <path d="M20 8v8" />
            <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" />
          </>
        ),
      },
      {
        title: 'Non-Public Networks',
        desc: 'Private 5G deployments for media production venues.',
        href: '/tech/npn',
        standardsHref: '/standards/npn',
        tag: 'Analysis only',
        icon: icon(
          <>
            <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4" />
            <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" />
          </>
        ),
      },
      {
        title: 'Time Sensitive Communications',
        desc: 'Deterministic low-latency transport for professional media equipment.',
        href: '/tech/tsc',
        standardsHref: '/standards/tsc',
        tag: 'Analysis only',
        icon: icon(
          <>
            <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M12 10l0 3l2 2" />
            <path d="M7 4l-2.75 2" />
            <path d="M17 4l2.75 2" />
          </>
        ),
      },
    ],
  },
  {
    title: 'Research Topics',
    desc: 'Currently AI/ML and 6G research — early-stage work that will shape future releases rather than deployable technology today. The underlying AI-traffic-characterisation testbed lives on the Testbeds portal, not below, since it has no Standards or Analysis page of its own.',
    topics: [
      {
        title: 'AI/ML in 5G Media',
        desc: 'NWDAF network-side analytics vs. UE-side data collection tracks for AI/ML in 3GPP.',
        href: '/tech/ai-ml',
        standardsHref: '/standards/ai-ml',
        icon: icon(
          <>
            <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
            <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
            <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
            <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
            <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
            <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
          </>
        ),
      },
      {
        title: 'Towards 6G Media',
        desc: 'Early 6G research and technical analysis for future media technologies.',
        href: '/tech/6g',
        standardsHref: '/standards/6g',
        tag: 'Study stage',
        icon: icon(
          <>
            <path d="M18 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
            <path d="M10 9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3" />
          </>
        ),
      },
    ],
  },
];

// "What You'll Find Here" -- one crystal-clear index of every real
// destination on this hub, shown right under "Why", before the deeper
// Categories & Topics grid further down the page.
const WHATS_HERE = [
  {
    title: 'Categories & Topics',
    desc: 'Every technology area, browsable by category and topic.',
    href: '/tech#categories-topics',
    icon: icon(
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
  },
  {
    title: 'Technology Exchanges',
    desc: 'Recorded workshop talks explaining specifications to industry.',
    href: '/tech/exchanges',
    icon: icon(<path d="M7 4v16l13 -8l-13 -8" />),
  },
  {
    title: 'Implementation Blueprints',
    desc: 'Step-by-step procedures mapping build steps to protocol layers and 3GPP clauses.',
    href: '/tech/blueprints',
    icon: icon(
      <>
        <path d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
      </>
    ),
  },
  {
    title: 'Glossary',
    desc: '3GPP process terms and acronyms used across the documentation.',
    href: '/tech/glossary',
    icon: icon(
      <>
        <path d="M19 4v16h-11a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h11z" />
        <path d="M19 16h-12a2 2 0 0 0 -2 2" />
        <path d="M9 8h6" />
      </>
    ),
  },
  {
    title: '3GPP Work Items per Release',
    desc: 'TR 21.9xx summary reports, Rel-15 to 19.',
    href: '/tech/3gpp-work-items',
    icon: icon(
      <>
        <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 12l2 2l4 -4" />
      </>
    ),
  },
];

// Sourced from the grey "motivation" strip on the 5G-MAG Portfolio Slides
// (slide 6: "Explainers and Profiles of Standards Specifications"), not the
// dark-card row below it — "Profiles and Blueprints" / "Tech Documentation
// and Explainers" is the real section content, not motivation framing.
const PILLARS = [
  {
    title: 'Specification analysis for real-world applications',
    body: 'Breaking down specification text into what it actually means for a working deployment.',
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
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    ),
  },
  {
    title: 'Making standards actionable',
    body: 'So implementers don’t each have to independently interpret dense specification text — one clear reading, reused across the industry, instead of duplicated effort and divergent interpretations.',
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
        <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
        <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
        <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
        <path d="M11 6l9 0" />
        <path d="M11 12l9 0" />
        <path d="M11 18l9 0" />
      </svg>
    ),
  },
  {
    title: 'Lowering the barrier to entry',
    body: 'So engineers outside the standards process can get up to speed on what a specification actually enables without reading the spec text itself.',
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
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 8l0 .01" />
        <path d="M11 12l1 0l0 4l1 0" />
      </svg>
    ),
  },
];

// How this hub relates to the other three portals. Not every step has a
// single index page to link to (there's no one page listing every
// Standards page — each is reached from its own topic), so linkLabel/
// linkHref are optional per step rather than making the whole card a Link.
const CONTENT_MODEL = [
  {
    label: 'Step 1',
    title: 'Standards',
    body: 'The specification list for a topic: 3GPP, MPEG, DVB, ETSI and CAMARA numbers and titles, nothing else.',
  },
  {
    label: 'Step 2',
    title: 'Analysis (this hub)',
    body: 'How it actually works, including step-by-step Implementation Blueprints for the procedures that have one.',
    linkLabel: 'Browse blueprints →',
    linkHref: '/tech/blueprints',
  },
  {
    label: 'Step 3',
    title: 'Reference Tools & Testbeds',
    body: 'Working code implementing the specification, where one exists — some topics are analysis-only for now.',
    linkLabel: 'Browse Reference Tools →',
    linkHref: '/reference-tools',
  },
  {
    label: 'Step 4',
    title: 'Applications',
    body: 'Real, assembled scenarios built from one or more Reference Tools, pointed at a concrete use case.',
    linkLabel: 'Browse Applications →',
    linkHref: '/applications',
  },
];

// A representative slice of /tech/blueprints, kept here so the flagship
// content type gets its own featured section (not just one line among
// five in "What You'll Find Here") -- mirrors the Technology Exchanges
// featured section further down. Full, current list always lives on
// /tech/blueprints itself; this is deliberately not the complete set.
const BLUEPRINT_PREVIEW = [
  {
    title: 'MBS Broadcast RAN acquisition',
    desc: 'MIB, SIB1, SIB20, MCCH, MTCH, up to decoding the broadcast MRB.',
    href: '/tech/5g-mbs/analysis-mbs-broadcast-ran#implementation-blueprint',
  },
  {
    title: '5GMS session establishment',
    desc: 'Service discovery to continuous playback, progressive download and DASH.',
    href: '/tech/5gms/overview-5gms#implementation-blueprint',
  },
  {
    title: 'DVB-I service discovery bootstrap',
    desc: 'Cold start to content-guide data, clause-cited against ETSI TS 103 770.',
    href: '/tech/dvb-i/dvb-i-5g#implementation-blueprint',
  },
  {
    title: 'MBS Multicast mobility',
    desc: 'The three handover cases for a multicast group in motion.',
    href: '/tech/5g-mbs/mobility-mbs-multicast#implementation-blueprint',
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
          // Two separate links, not one nested inside the other: the main
          // card area goes to the Analysis page, and (where one exists) a
          // second small link goes straight to that topic's Standards page
          // -- a direct, one-click path from the hub itself, on top of the
          // Standards Tracking card already on every Analysis page and the
          // Standards link on every sidebar category (see sidebars-tech.js).
          <div key={t.href} className={styles.categoryTopicCard}>
            <Link to={t.href} className={styles.categoryTopicMain}>
              {t.icon && <span className={styles.categoryTopicIcon}>{t.icon}</span>}
              <span className={styles.categoryTopicCardBody}>
                <span className={styles.categoryTopicName}>{t.title}</span>
                <span className={styles.categoryTopicDescText}>{t.desc}</span>
                {t.tag && <span className={styles.categoryTopicTag}>{t.tag}</span>}
              </span>
            </Link>
            {t.standardsHref && (
              <Link to={t.standardsHref} className={styles.categoryTopicStandardsLink}>
                Standards &rarr;
              </Link>
            )}
            {t.extraStandards?.map((s) => (
              <Link key={s.href} to={s.href} className={styles.categoryTopicStandardsLink}>
                {s.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ title, desc, href, icon }) {
  return <HubDestinationCard icon={icon} title={title} desc={desc} href={href} />;
}

export default function Home() {
  return (
    <Layout
      title="Technical Docs and Standards Work"
      description="Specification analysis, implementation explainers and standards feedback work from 5G-MAG members, organised by technology area."
    >
      <HubHero
        title="Technology"
        icon={
          <>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
            <path d="M9 17l0 -5" />
            <path d="M12 17l0 -1" />
            <path d="M15 17l0 -3" />
          </>
        }
        actions={[
          <a key="docs" className="button button--primary" href="#categories-topics">
            Documentation
          </a>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Explainers and profiles of standards specifications, with implementation blueprints — by the members, for the industry.</p>
      </div>

      <main>
        {/* What You'll Find Here -- first section on every hub page, a
            consistent directory of destinations before anything else
            (2026-08-26: raised directly, "what you will find here
            section goes first for each hub" -- this hub's version had
            drifted to 4th place during the previous reorder pass). */}
        <section className={styles.section}>
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

        {/* Categories & Topics -- the actual browsable content, moved
            ahead of the framing sections below (2026-08-26 findability
            pass) so a visitor reaches it without scrolling past
            "Motivation"/"How This Fits Together" first every time. */}
        <section id="categories-topics" className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Categories &amp; Topics</h2>
            <p className={styles.sectionSubtitle}>
              Profiles and blueprints that turn standards into implementation-ready analysis —
              organised by technology area.
            </p>
            <div className={styles.categoryColumns}>
              {CATEGORIES.map((c) => (
                <CategoryCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </section>

        {/* What's here */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Motivation</h2>
            <p className={styles.sectionSubtitle}>
              Understand it. Prove its value. Scale it. Resources produced by 5G-MAG members —
              covering the full cycle from reading a spec to shaping the next one.
            </p>
            <div className={styles.pillarGrid3}>
              {PILLARS.map((p) => (
                <div key={p.title} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>{p.icon}</div>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  {p.body && <p className={styles.pillarBody}>{p.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How this hub fits with Standards, Tools & Applications */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How This Fits Together</h2>
            <p className={styles.sectionSubtitle}>
              Four portals, one chain. A topic&apos;s specs, its analysis, the tools that implement it and the
              real scenarios built from those tools are deliberately kept separate and cross-linked, rather than
              repeated on every page.
            </p>
            <div className={styles.contentModelGrid}>
              {CONTENT_MODEL.map((s) => (
                <div key={s.title} className={styles.contentModelStep}>
                  <span className={styles.contentModelStepLabel}>{s.label}</span>
                  <h3 className={styles.contentModelStepTitle}>{s.title}</h3>
                  <p className={styles.contentModelStepBody}>{s.body}</p>
                  {s.linkHref && (
                    <Link to={s.linkHref} className={styles.contentModelStepLink}>
                      {s.linkLabel}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Blueprints, featured */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Implementation Blueprints</h2>
            <p className={styles.sectionSubtitle}>
              Step-by-step procedures that map a build step directly to a protocol layer and a clause
              reference — verified against a primary source, not asserted.
            </p>
            <div className={styles.blueprintPreviewGrid}>
              {BLUEPRINT_PREVIEW.map((b) => (
                <Link key={b.href} to={b.href} className={styles.linkCard}>
                  <h3 className={styles.linkCardTitle}>{b.title}</h3>
                  <p className={styles.linkCardBody}>{b.desc}</p>
                </Link>
              ))}
            </div>
            <div className={styles.onAirFeaturedMore}>
              <Link to="/tech/blueprints">See the full index &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Technology Exchanges, featured */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Technology Exchanges</h2>
            <p className={styles.sectionSubtitle}>
              Recorded workshop talks explaining 3GPP and MPEG media specifications to industry.
            </p>
            <VideoGrid videos={TECHNOLOGY_EXCHANGES_FEATURED} />
            <div className={styles.onAirFeaturedMore}>
              <Link to="/tech/exchanges">Browse the full library &rarr;</Link>
            </div>
          </div>
        </section>

        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}
