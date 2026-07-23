import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectIcon from '@site/src/components/ProjectIcon';
import GodeeperCard, { icon } from '@site/src/components/GodeeperCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import styles from './index.module.css';
import releasesData from '@site/static/data/releases.json';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import { mergeDeveloperVideos } from '@site/src/data/developerVideos';
import { daysSince, formatAge } from '@site/src/utils/releases';
import { FACT_REPOSITORIES, FACT_CLONES } from '@site/src/data/facts';

const DEV_HERO_ICON_PATH = (
  <>
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l4 4l-4 4" />
    <path d="M14 4l-4 16" />
  </>
);

// Labels and descriptions sourced from the 5G-MAG Portfolio Slides (slide 9:
// "The Media Connectivity Software Accelerator") rather than written from
// scratch.
const PRODUCT_TYPES = [
  {
    icon: 'Reference Tools',
    label: 'Reference Tools',
    description: 'Turn standards into open, implementation-ready code anyone can build on.',
    href: '/reference-tools',
  },
  {
    icon: 'Testbeds',
    label: 'Testbeds & Evaluation Tools',
    description: 'Reproducible test environments and benchmark frameworks.',
    href: '/testbeds',
  },
  {
    icon: 'Applications',
    label: 'Application Prototypes',
    description: 'Use-case driven implementations towards real-world applications.',
    href: '/applications',
  },
];

// Deliberately NOT shared with the near-identical arrays in
// applications/index.js and reference-tools/index.js: each page's topic
// titles were set independently by a 2026-07-19 per-slot naming review
// (every hero/hub-card/sidebar label reviewed and decided on its own), not
// by a blanket short-label-vs-full-name rule. Some topics ended up sharing
// one canonical name across all three pages (e.g. "Avatar Communication
// with MPEG ARF"); others still carry a shorter label here or in
// applications/index.js while reference-tools/index.js keeps a fuller
// canonical project name (e.g. "Apps with Network APIs" here vs "Network
// APIs" there). Don't assume the two hub pages agree on a given topic —
// check both before editing, and change only the file(s) the current
// naming decision actually covers.
const CATEGORIES = [
  {
    title: '5G Media Streaming (5GMS)',
    desc: 'End-to-end 5G media streaming from network to client, including data collection and reporting.',
    topics: [
      {
        title: '5G Media Streaming (5GMS)',
        desc: 'Streaming AF/AS — 3GPP TS 26.5xx',
        href: '/reference-tools/5gms',
        icon: <ProjectIcon name="5G Media Streaming" />,
      },
      {
        title: 'UE Data Collection, Reporting and Event Exposure',
        desc: 'Reporting and event exposure',
        href: '/reference-tools/data-collection',
        icon: <ProjectIcon name="UE Data Collection" />,
      },
      {
        title: 'Multimedia Delivery Protocols',
        desc: 'FLUTE and ROUTE reference tooling',
        href: '/reference-tools/multimedia',
        icon: <ProjectIcon name="Multimedia Delivery Protocols" />,
      },
      {
        title: 'DVB-I Services over 5G Systems',
        desc: 'DVB-I service delivery over 5G',
        href: '/reference-tools/dvb-i',
        icon: <ProjectIcon name="DVB-I over 5G" />,
      },
    ],
  },
  {
    title: '5G Broadcast - TV, Radio and Emergency Alerts',
    desc: 'LTE-based 5G broadcast for TV and radio services, plus standardised emergency alert delivery.',
    topics: [
      {
        title: '5G Broadcast - TV and Radio Services',
        desc: 'LTE-based TV & radio broadcast',
        href: '/reference-tools/5g-broadcast',
        icon: <ProjectIcon name="5G Broadcast TV Radio" />,
      },
      {
        title: '5G Broadcast - Emergency Alerts',
        desc: 'Broadcast-based public warning system',
        href: '/reference-tools/emergency-alerts',
        icon: <ProjectIcon name="5G Broadcast Emergency Alerts" />,
      },
    ],
  },
  {
    title: '5G Multicast Broadcast Services (MBS)',
    desc: 'Full 5G-native multicast and broadcast services, including 5G MBS and related network functions.',
    topics: [
      {
        title: '5G Multicast Broadcast Services (MBS)',
        desc: '5G MBS architecture and tooling',
        href: '/reference-tools/5g-mbs',
        icon: <ProjectIcon name="5G Multicast Broadcast" />,
      },
      {
        title: '5G Core Service Consumers',
        desc: '5GC consumer reference tools',
        href: '/reference-tools/5g-core',
        icon: <ProjectIcon name="5GC Service Consumers" />,
      },
    ],
  },
  {
    title: 'XR and MPEG-I Scene Description',
    desc: 'MPEG-I scene description and avatar communications for immersive 5G experiences.',
    topics: [
      {
        title: 'XR and MPEG-I Scene Description',
        desc: 'XR and scene description over 5G',
        href: '/reference-tools/xr',
        icon: <ProjectIcon name="XR Media" />,
      },
      {
        title: 'Avatar Communication with MPEG ARF',
        desc: 'MPEG ARF avatar communication',
        href: '/reference-tools/avatar',
        icon: <ProjectIcon name="Conversational Avatar" />,
      },
    ],
  },
  {
    title: 'Volumetric Video & Beyond 2D',
    desc: 'V3C immersive platform and beyond-2D video evaluation frameworks.',
    topics: [
      {
        title: 'MPEG V3C Immersive Platform',
        desc: 'Volumetric 3D content platform',
        href: '/reference-tools/v3c',
        icon: <ProjectIcon name="V3C Immersive" />,
      },
      {
        title: 'Beyond 2D Evaluation Framework',
        desc: 'Video quality evaluation tools',
        href: '/testbeds/beyond-2d',
        icon: <ProjectIcon name="Beyond 2D Video Experiences" />,
      },
    ],
  },
  {
    title: 'Network APIs & Advanced Services',
    desc: 'CAMARA-compliant network API integration, RAN/Core lab platforms, and next-generation testbeds.',
    topics: [
      {
        title: 'Connectivity Quality with Network APIs',
        desc: 'CAMARA QoS and device-aware apps',
        href: '/reference-tools/network-apis',
        icon: <ProjectIcon name="Network APIs" />,
      },
      {
        title: '3GPP RAN and Core Platforms',
        desc: 'Lab 5G RAN & Core on Open5GS/srsRAN',
        href: '/reference-tools/3gpp-platforms',
        icon: <ProjectIcon name="3GPP RAN and Core Platforms" />,
      },
      {
        title: 'AI Traffic Characterization',
        desc: 'Next-gen network testbed',
        href: '/testbeds/6g-testbed',
        icon: <ProjectIcon name="6G Testbed and AI Traffic" />,
      },
      {
        title: 'AI/ML Evaluation Framework',
        desc: 'AI/ML framework for media',
        href: '/testbeds/ai-ml',
        icon: <ProjectIcon name="AI ML" />,
      },
    ],
  },
  {
    title: 'Shared Tools & Utilities',
    desc: 'Common helper repositories and third-party tools that complement the Reference Tools.',
    topics: [
      {
        title: 'Common Tools',
        desc: 'Shared scripts, configs & build utilities',
        href: '/reference-tools/common-tools',
        icon: <ProjectIcon name="Common Tools" />,
      },
      {
        title: 'External Tools',
        desc: 'Third-party tools, e.g. DVB NIP Analyzer',
        href: '/reference-tools/external-tools',
        icon: <ProjectIcon name="External Tools" />,
      },
    ],
  },
  {
    // Kept in sync by hand with the 10 applications on src/pages/applications/index.js
    // (flattened here into one list rather than that page's 4 categories, since this
    // is meant as a lighter preview of the full Applications hub, not a duplicate of it).
    title: 'Application Prototypes',
    desc: 'End-to-end demonstrations that combine Reference Tools into complete, running scenarios.',
    topics: [
      {
        title: 'Live Streaming Over a Real 5G Network',
        desc: '5GMSd deployed over a real 5G network (Open5GS, srsRAN) with a commercial off-the-shelf device.',
        href: '/reference-tools/5gms/tutorials/end-to-end-with-5g',
        icon: icon(<path d="M7 4v16l13 -8l-13 -8" />),
      },
      {
        title: 'MBS End-to-End Delivery Demo',
        desc: 'Operating MBS user services end-to-end across the 5G Core, MB-SMF, MBSF, MBSTF, NG-RAN and UE.',
        href: '/reference-tools/5g-mbs/tutorials/mbs-end-to-end',
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
        title: 'QoE Analytics Dashboard',
        desc: 'CMCD, consumption and QoE metrics reporting from the 5GMS client into a live Grafana dashboard.',
        href: '/reference-tools/5gms/tutorials/CMCD-reporting',
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
      {
        title: 'Broadcast Stream Playback (RTP/HLS)',
        desc: 'Receiving and playing back a broadcast stream over 5G Broadcast, via RTP or HLS.',
        href: '/reference-tools/5g-broadcast/tutorials/hls-playback-5gbc',
        icon: icon(
          <>
            <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4" />
            <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z" />
          </>
        ),
      },
      {
        title: 'Emergency Alert Broadcast Demo',
        desc: 'Broadcasting a Cell Broadcast Service (CBS) emergency alert via SDR and receiving it on a device.',
        href: '/reference-tools/emergency-alerts/tutorials/end-to-end',
        icon: icon(
          <>
            <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
            <path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
            <path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
          </>
        ),
      },
      {
        title: 'Seamless Unicast/Broadcast Switching',
        desc: 'Android middleware seamlessly switching a client between unicast 5GMS and 5G Broadcast reception.',
        href: '/reference-tools/5g-broadcast/tutorials/android-mw-seamless-switching',
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
        title: 'Immersive 3D Media Messaging',
        desc: 'Sharing 3D and AR assets as media message attachments, opened and rendered in the XR player.',
        href: '/reference-tools/xr/tutorials/immersive-3d-media-message',
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
      {
        title: 'Volumetric Video Streaming to Android',
        desc: 'The V3C Unity player streaming volumetric 3D content to Android from a DASH server.',
        href: '/reference-tools/v3c/tutorials/v3c-immersive-platform-in-android-streaming',
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
        title: 'XR Content Authoring with Blender',
        desc: 'Authoring an XR scene with the Blender glTF exporter and loading it into the XR player.',
        href: '/reference-tools/xr/tutorials/blender-exporter-unity-player',
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
      {
        title: 'Dedicated Network APIs for Connected Media Production',
        desc: 'CAMARA Quality on Demand, Connectivity Insights and Network Slice Booking APIs for live contribution and remote production.',
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
];

const DEV_FACTS = [
  { value: '~15', label: 'Project areas across media and connectivity' },
  FACT_REPOSITORIES,
  FACT_CLONES,
  { value: 'Weekly', label: 'Developer calls and rolling releases' },
];

const PILLARS = [
  {
    title: 'Early feedback and validation',
    body: 'Implementation evidence that informs specification development before standards are finalised.',
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Software projects & Dev community',
    body: 'A community of standards experts, developers and implementers, building software projects together.',
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
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'No duplication and fast deployment',
    body: 'Shared reference implementations mean no one builds the same thing twice — ready for real-world adoption and scale.',
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
        <path d="M3 5v14l8 -7z" />
        <path d="M13 5v14l8 -7z" />
      </svg>
    ),
  },
  {
    title: 'Open by design and IPR-friendly',
    body: 'IPR-friendly licensing designed for broad industry participation.',
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Evaluation is expensive',
    body: 'Each organisation builds its own prototype to evaluate a draft spec — duplicated effort, inconsistent results, slow feedback into the standard.',
    href: '/testbeds',
    icon: (
      <>
        <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
        <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
      </>
    ),
  },
  {
    title: 'Interop is delayed',
    body: 'Without shared code, interoperability testing starts from scratch at every plugfest. Bugs found late are expensive to fix — including specification errors.',
    href: '/testing',
    icon: (
      <>
        <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
        <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
        <path d="M3 13l4 0" />
        <path d="M17 13l4 0" />
        <path d="M12 20l0 -6" />
        <path d="M4 19l3.35 -2" />
        <path d="M20 19l-3.35 -2" />
        <path d="M4 7l3.75 2.4" />
        <path d="M20 7l-3.75 2.4" />
      </>
    ),
  },
  {
    title: 'Deployment is delayed',
    body: 'The gap between a frozen spec and a production-ready implementation can be years. Early adopters carry the full cost alone.',
    href: '/reference-tools',
    icon: (
      <>
        <path d="M6.5 7h11" />
        <path d="M6.5 17h11" />
        <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1" />
        <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1" />
      </>
    ),
  },
];

function ReleaseCard({ project }) {
  const rows = project.releases
    .filter((r) => r.tag !== 'No Release' && r.date !== '-')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <div className={styles.releaseCard}>
      <div className={styles.releaseCardHeader}>
        <ProjectIcon name={project.name} className={styles.releaseCardIcon} />
        <h3 className={styles.releaseCardTitle}>{project.name}</h3>
      </div>
      <div className={styles.releaseCardBody}>
        {rows.map((r) => {
          const days = daysSince(r.date);
          return (
            <div key={r.repo} className={styles.releaseRow}>
              <a
                href={`https://github.com/5G-MAG/${r.repo}`}
                className={styles.releaseRepo}
                target="_blank"
                rel="noreferrer"
                title={r.repo}
              >
                {r.repo}
              </a>
              <div className={styles.releaseMeta}>
                {days <= 30 && <span className={styles.badgeNew}>New</span>}
                <a href={r.url} className={styles.releaseTag} target="_blank" rel="noreferrer">
                  {r.tag}
                </a>
                <span className={styles.releaseDate}>{formatAge(days)}</span>
              </div>
            </div>
          );
        })}
      </div>
      {project.doc_url && (
        <div className={styles.releaseCardFooter}>
          <Link className={styles.releaseDocLink} to={project.doc_url}>
            Documentation &rarr;
          </Link>
          <Link className={styles.releaseRelLink} to={`${project.doc_url}${project.releases_slug || 'resources'}`}>
            Releases &rarr;
          </Link>
        </div>
      )}
    </div>
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

function ProductTypeCard({ icon, label, description, href }) {
  return (
    <Link className={styles.productCard} to={href}>
      <div className={styles.productCardIconBand}>
        <ProjectIcon name={icon} className={styles.productCardBandIcon} />
        <h3 className={styles.productCardBandTitle}>{label}</h3>
      </div>
      <div className={styles.productCardBody}>
        <p className={styles.productCardDesc}>{description}</p>
      </div>
      <div className={styles.productCardFooter}>Explore {label} &rarr;</div>
    </Link>
  );
}

function VideoCard({ video }) {
  return (
    <a
      className={styles.videoCard}
      href={video.url}
      target="_blank"
      rel="noreferrer"
      title={video.title}
    >
      <div className={styles.videoThumb}>
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
        <div className={styles.videoPlay}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className={styles.videoInfo}>
        <p className={styles.videoTitle}>{video.title}</p>
        <span className={styles.videoDate}>{video.by || video.published}</span>
      </div>
    </a>
  );
}

function VideoSection({ alt }) {
  const videos = mergeDeveloperVideos(youtubePlaylists.developer?.videos);
  return (
    <section className={clsx(styles.section, alt && styles.sectionAlt)}>
      <div className="container">
        <div className={styles.videoHeader}>
          <div>
            <h2
              className={styles.sectionTitle}
              style={{ textAlign: 'left', marginBottom: '0.2rem' }}
            >
              See it in action
            </h2>
            <p className={styles.sectionSubtitle} style={{ textAlign: 'left', margin: 0 }}>
              Recent Reference Tools &amp; Testbeds demos and tutorials
            </p>
          </div>
          <a
            className={styles.videoViewAll}
            href={youtubePlaylists.developer?.playlistUrl}
            target="_blank"
            rel="noreferrer"
          >
            See all videos &rarr;
          </a>
        </div>
        <div className={styles.videoGrid}>
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ title, body, icon }) {
  return (
    <div className={styles.pillarCard}>
      {icon && <div className={styles.pillarIcon}>{icon}</div>}
      <h3 className={styles.pillarTitle}>{title}</h3>
      <p className={styles.pillarBody}>{body}</p>
    </div>
  );
}

export default function Home() {
  const demoRigImg = useBaseUrl('/assets/images/gallery/reference-tools-demo-rig.jpg');
  const camaraDemoImg = useBaseUrl('/assets/images/gallery/camara-dedicated-networks-demo.png');
  return (
    <Layout
      title="Software Accelerator"
      description="Open-source reference implementations — from specifications to working code"
    >
      <HubHero
        title="Media Connectivity Software Accelerator"
        icon={DEV_HERO_ICON_PATH}
        actions={[
          <Link key="community" className="button button--primary" to="/community">
            Developer Community
          </Link>,
          <Link
            key="reftools"
            className="button button--outline button--primary"
            to="/reference-tools"
          >
            Explore All Projects
          </Link>,
          <Link
            key="early-access"
            className="button button--outline button--primary"
            to="/early-access"
          >
            Request Early Access
          </Link>,
          <a
            key="overview"
            className="button button--outline button--primary"
            href="pathname:///docs/Reference_Tools_Overview.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Overview &#8595;
          </a>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Open-source developer community. Reference tools, testbeds and applications for connected media experiences.</p>
      </div>

      <main>
        {/* Pillars */}
        {/* Motivation: merged "what this gets you" + "why open source" under one banner */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why the Media Connectivity Software Accelerator</h2>
            <p className={styles.sectionSubtitle}>
              Media and network technologies move fast, and open source usually arrives only
              after a standard is frozen — with additional cost at every stage along the way. The
              Accelerator closes both gaps.
            </p>

            <h3 className={styles.pillarGroupTitle}>What this gets you</h3>
            <div className={styles.pillarGrid}>
              {PILLARS.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
            <div className={styles.pillarActions}>
              <Link className="button button--primary button--lg" to="/community">
                Developer Community
              </Link>
              <Link
                className="button button--outline button--primary button--lg"
                to="/community#community-stats"
              >
                Community Stats
              </Link>
              <Link className="button button--outline button--primary button--lg" to="/tech/videos">
                Watch On Air
              </Link>
            </div>

            <h3 className={styles.pillarGroupTitle}>Why open source, and why now</h3>
            <div className="godeeper-grid">
              {PROBLEM_POINTS.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Where to start</h2>
            <p className={styles.sectionSubtitle}>
              Reference Tools, Testbeds and Evaluation Tools, and Application Prototypes — under
              one open developer community.
            </p>
            <div className={styles.productGrid}>
              {PRODUCT_TYPES.map((item) => (
                <ProductTypeCard key={item.href} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What do you want to build?</h2>
            <p className={styles.sectionSubtitle}>
              Select a capability area to find the right reference tools and documentation.
            </p>
            <div className={styles.categoryColumns}>
              {CATEGORIES.map((c) => (
                <CategoryCard key={c.title} {...c} />
              ))}
            </div>
          </div>
        </section>

        {/* Photos */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Real tools, real demos</h2>
            <p className={styles.sectionSubtitle}>
              Reference Tools running on real hardware, at real events.
            </p>
            <div className={styles.photoGrid}>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src={demoRigImg}
                  alt="5G-MAG Reference Tools demo rig with SDR hardware and phones running 5GMS and volumetric demos"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  A Reference Tools demo rig — SDR hardware and phones running live 5GMS and
                  volumetric video demos.
                </p>
              </figure>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src={camaraDemoImg}
                  alt="CAMARA Dedicated Networks reference tool demo interface"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  The CAMARA Dedicated Networks reference tool, reserving a network area on a live
                  map.
                </p>
              </figure>
            </div>
          </div>
        </section>

        {/* Videos */}
        <VideoSection alt />

        {/* Facts */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our work at a glance</h2>
            <p className={styles.sectionSubtitle}>
              Some numbers and examples of our work — a thriving developer community of standards
              experts, developers and implementers.
            </p>
            <div className="summary-container">
              {DEV_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h3>{f.label}</h3>
                  <span className="summary-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Releases */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className={styles.releasesHeader}>
              <div>
                <h2
                  className={styles.sectionTitle}
                  style={{ marginBottom: '0.2rem', textAlign: 'left' }}
                >
                  Latest Releases
                </h2>
                <p className={styles.releasesUpdated}>Updated: {releasesData.updated_at}</p>
              </div>
              <Link className={styles.releasesViewAll} to="/community#releases">
                View all releases &rarr;
              </Link>
            </div>
            <div className={styles.releasesGrid}>
              {releasesData.projects.slice(0, 6).map((project) => (
                <ReleaseCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort id="community" alt />
      </main>
    </Layout>
  );
}
