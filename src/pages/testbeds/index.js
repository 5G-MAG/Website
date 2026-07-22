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

const TESTBEDS_ICON_PATH = (
  <>
    <path d="M9 3l6 0" />
    <path d="M10 9l4 0" />
    <path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6" />
  </>
);
const SIXG_ICON_PATH = (
  <>
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l3.111 3.111" />
    <path d="M14 4l-2.175 8.7" />
    <path d="M14 21v-4a2 2 0 1 1 4 0v4" />
    <path d="M14 19h4" />
    <path d="M21 15v6" />
  </>
);
const AIML_ICON_PATH = (
  <>
    <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
    <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
    <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
    <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
    <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
    <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
  </>
);
const BEYOND2D_ICON_PATH = (
  <path d="M4.338 5.53c5.106 1.932 10.211 1.932 15.317 0a1 1 0 0 1 1.345 .934v11c0 .692 -.692 1.2 -1.34 .962c-5.107 -1.932 -10.214 -1.932 -15.321 0c-.648 .246 -1.339 -.242 -1.339 -.935v-11.027a1 1 0 0 1 1.338 -.935l0 .001" />
);

const TESTBED_PROJECTS = [
  {
    title: 'AI Traffic Characterization',
    desc: 'AI traffic profiling and 5G-to-6G migration testbed.',
    href: '/testbeds/6g-testbed',
    icon: icon(SIXG_ICON_PATH),
    releasesHref: '/testbeds/6g-testbed/resources',
  },
  {
    title: 'AI/ML Evaluation Framework',
    desc: 'Framework for evaluating AI/ML solutions in mobile media services.',
    href: '/testbeds/ai-ml',
    icon: icon(AIML_ICON_PATH),
    releasesHref: '/testbeds/ai-ml/resources',
    roadmapHref: 'https://github.com/orgs/5G-MAG/projects/48/views/9',
  },
  {
    title: 'Beyond 2D Evaluation Framework',
    desc: 'Test and evaluation framework for immersive video quality assessment.',
    href: '/testbeds/beyond-2d',
    icon: icon(BEYOND2D_ICON_PATH),
    releasesHref: '/testbeds/beyond-2d/resources',
    roadmapHref: 'https://github.com/orgs/5G-MAG/projects/48/views/10',
  },
];

function ProjectCard({ title, desc, href, icon: cardIcon, releasesHref, roadmapHref }) {
  return (
    <div className={styles.activityCard}>
      <Link to={href} className={styles.activityIconBand}>
        {cardIcon}
        <h3 className={styles.activityIconBandTitle}>{title}</h3>
      </Link>
      <div className={styles.activityBody}>
        <p className={styles.activityDesc}>{desc}</p>
      </div>
      <div className={styles.activityArrow} style={{ display: 'flex', gap: '1rem' }}>
        <Link to={href}>Documentation &rarr;</Link>
        {roadmapHref && (
          <a href={roadmapHref} target="_blank" rel="noreferrer">
            Roadmap &rarr;
          </a>
        )}
        <Link to={releasesHref}>Releases &rarr;</Link>
      </div>
    </div>
  );
}

export default function Testbeds() {
  return (
    <Layout
      title="Testbeds"
      description="Overview of 5G-MAG testbeds and evaluation frameworks for 6G traffic characterization, AI/ML, and beyond-2D video quality assessment."
    >
      <HubHero
        title="Testbeds and Evaluation Tools"
        icon={TESTBEDS_ICON_PATH}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">
          Shared infrastructure and evaluation frameworks for testing technologies in realistic
          conditions — complementing Reference Tools and underpinning several application
          scenarios. A testbed is a reproducible test environment or benchmark framework, not the
          spec-implementing code itself and not the events where results get shown off.{' '}
          <Link to="/reference-tools">Reference Tools</Link> is the spec-implementing code these
          testbeds evaluate;{' '}
          <Link to="/testing">Interop &amp; Testing</Link> is the separate activity layer where
          these get shown off at real interoperability events, not something that owns or
          validates testbeds.
        </p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Testbeds & Evaluation Frameworks</h2>
            <p className={styles.sectionSubtitle}>
              Access arrangements differ per testbed (some are open, others are available on request
              or through the community channels) — see{' '}
              <Link to="/developer#community">Developer Community</Link> for how to get in touch.
            </p>
            <div className={styles.activityGrid}>
              {TESTBED_PROJECTS.map((p) => (
                <ProjectCard key={p.href} {...p} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
