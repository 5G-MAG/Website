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

const APPS_ICON_PATH = (
  <>
    <path d="M4 4h6v6h-6z" />
    <path d="M14 4h6v6h-6z" />
    <path d="M4 14h6v6h-6z" />
    <path d="M17 14v6" />
    <path d="M14 17h6" />
  </>
);

// Grouped into 4 application categories, each with its own dedicated page
// under docs/home/applications/: streaming.md, 5g-broadcast.md, volumetric.md
// (retitled to cover all Immersive Media Experiences, not just volumetric
// video) and network-apis.md. Each topic below links to the H2 subsection on
// its category's page (e.g. '/applications/streaming#live-streaming-over-a-
// real-5g-network') where the application is explained in real-world terms,
// the Reference Tool(s) it combines are linked, and the underlying tutorial
// is linked for hands-on setup steps. multicast-broadcast.md and xr.md were
// retired (2026-07-22): their content now lives on streaming.md and
// volumetric.md respectively (see the docusaurus.config.js redirects). Only
// tutorials that build or use a working experience count as an application;
// tutorials that just exercise an API/CLI (Postman, curl, Insomnia,
// Wireshark) or cover setup/measurement stay reference-tool-only and aren't
// listed here.
const CATEGORIES = [
  {
    title: 'Media Streaming, Multicast & Real-Time Communications',
    desc: 'Applications built on 5G-MAG’s streaming and multicast reference tools.',
    topics: [
      {
        title: 'Live Streaming Over a Real 5G Network',
        desc: '5GMSd deployed over a real 5G network (Open5GS, srsRAN) with a commercial off-the-shelf device.',
        href: '/applications/streaming#live-streaming-over-a-real-5g-network',
        icon: icon(<path d="M7 4v16l13 -8l-13 -8" />),
      },
      {
        title: 'MBS End-to-End Delivery Demo',
        desc: 'Operating MBS user services end-to-end across the 5G Core, MB-SMF, MBSF, MBSTF, NG-RAN and UE.',
        href: '/applications/streaming#mbs-end-to-end-delivery-demo',
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
        href: '/applications/streaming#qoe-analytics-dashboard',
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
    desc: 'Applications built on 5G-MAG’s 5G Broadcast reference tools.',
    topics: [
      {
        title: 'Broadcast Stream Playback (RTP/HLS)',
        desc: 'Receiving and playing back a broadcast stream over 5G Broadcast, via RTP or HLS.',
        href: '/applications/5g-broadcast#broadcast-stream-playback-rtphls',
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
        href: '/applications/5g-broadcast#emergency-alert-broadcast-demo',
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
        href: '/applications/5g-broadcast#seamless-unicastbroadcast-switching',
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
    desc: 'Applications built on 5G-MAG’s XR, avatar and volumetric video reference tools.',
    topics: [
      {
        title: 'Immersive 3D Media Messaging',
        desc: 'Sharing 3D and AR assets as media message attachments, opened and rendered in the XR player.',
        href: '/applications/volumetric#immersive-3d-media-messaging',
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
        href: '/applications/volumetric#volumetric-video-streaming-to-android',
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
        href: '/applications/volumetric#xr-content-authoring-with-blender',
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
    desc: 'Applications built on 5G-MAG’s network API reference tools.',
    topics: [
      {
        title: 'Dedicated Network APIs for Connected Media Production',
        desc: 'CAMARA Quality on Demand, Connectivity Insights and Network Slice Booking APIs for live contribution and remote production.',
        href: '/applications/network-apis#dedicated-network-apis-for-connected-media-production',
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

export default function Applications() {
  return (
    <Layout
      title="Applications"
      description="Overview of 5G-MAG's application areas: streaming, broadcast, multicast, XR, volumetric video, and network APIs."
    >
      <HubHero
        title="Application Prototypes"
        icon={APPS_ICON_PATH}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">Curated combinations of Reference Tools assembled into a working service to show value when applied to a use case.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Application Scenarios</h2>
            <p className={styles.sectionSubtitle}>
              Start here if you want to understand what you can build and which tools to use. If
              you&apos;re looking for an individual specification implementation, see{' '}
              <Link to="/reference-tools">Reference Tools</Link> instead.
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
