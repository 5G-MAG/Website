import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import EarlyAccessCallout from '@site/src/components/EarlyAccessCallout';
import ProjectIcon from '@site/src/components/ProjectIcon';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import ReleaseCard from '@site/src/components/ReleaseCard';
import styles from './index.module.css';
import releasesData from '@site/static/data/releases.json';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import { mergeDeveloperVideos } from '@site/src/data/developerVideos';
import { FACT_REPOSITORIES, FACT_CLONES } from '@site/src/data/facts';
import { CONTRIBUTORS } from '@site/src/data/contributors';
import { sortByLatestRelease } from '@site/src/utils/releases';

const LATEST_RELEASE_PROJECTS = sortByLatestRelease(releasesData.projects);

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

function PillarCard({ title, body, icon }) {
  return (
    <div className={styles.pillarCard}>
      {icon && <div className={styles.pillarIcon}>{icon}</div>}
      <h3 className={styles.pillarTitle}>{title}</h3>
      <p className={styles.pillarBody}>{body}</p>
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

            <div className={styles.pillarGrid}>
              {PILLARS.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
            <div className={styles.pillarActions}>
              <Link className="button button--primary button--lg" to="/community">
                Learn about the Developer Community
              </Link>
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What You&apos;ll Find Here</h2>
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

        {/* Early Access */}
        <section className={styles.section}>
          <div className="container">
            <EarlyAccessCallout />
          </div>
        </section>

        {/* Contributors */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Contributors</h2>
            <p className={styles.sectionSubtitle}>
              Organizations contributing to the Media Connectivity Software Accelerator.
            </p>
            <div className={styles.membersGrid}>
              {CONTRIBUTORS.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  title={c.name}
                  className={styles.memberCard}
                >
                  <img
                    src={useBaseUrl(`/assets/images/contributors/${c.logo}`)}
                    alt=""
                    loading="lazy"
                  />
                  <span className={styles.memberCardName}>{c.name.split(' - ')[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
            <Link to="/community/contributing">Become a contributor &rarr;</Link>
          </div>
        </section>

        {/* Our Work In Action: photos + videos together */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Work In Action</h2>
            <p className={styles.sectionSubtitle}>
              Reference Tools running on real hardware, at real events — and recent demos and
              tutorials from the developer community.
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

            <div style={{ marginTop: '2.5rem' }}>
              <VideoGrid videos={mergeDeveloperVideos(youtubePlaylists.developer?.videos, 4)} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
              <Link to="/developer/exchanges">Browse the Developer Exchanges video gallery &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Latest Releases + Facts */}
        <section className={styles.section}>
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
              {LATEST_RELEASE_PROJECTS.slice(0, 6).map((project) => (
                <ReleaseCard key={project.name} project={project} />
              ))}
            </div>

            <div className="summary-container" style={{ marginTop: '2.5rem' }}>
              {DEV_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h3>{f.label}</h3>
                  <span className="summary-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort id="community" alt />
      </main>
    </Layout>
  );
}
