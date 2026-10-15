import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import {
  ALL_PROJECTS,
  isReferenceTool,
  isValidationTool,
  isTestbed,
  isPlatform,
  isCommonTools,
} from '@site/src/data/baskets';
import useAnchors from '@site/src/utils/useAnchors';
import styles from '../tech/index.module.css';

// The Software Factory: everything 5G-MAG builds as software and tooling from the specifications, kind by kind.
// The Software Accelerator Programme is how it is built (community, licences, early access); this page is what
// comes out. The counts come from the `type` of each entry in taxonomy.json.
const FACTORY_ICON_PATH = (
  <>
    <path d="M3 21h18" />
    <path d="M5 21v-12l5 4v-4l5 4h4a2 2 0 0 1 2 2v6" />
    <path d="M19 13v-6a1 1 0 0 1 1 -1h-2a1 1 0 0 1 -1 1v6" />
  </>
);

const svg = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths.map((d) => <path key={d} d={d} />)}
  </svg>
);

const count = (filter, noun) => {
  const n = ALL_PROJECTS.filter(filter).length;
  return `${n} ${n === 1 ? noun : `${noun}s`}`;
};

const KINDS = [
  {
    id: 'tools',
    title: 'Reference Tools',
    desc: `Open-source reference implementations of the specifications, project by project. ${count(isReferenceTool, 'project')}.`,
    href: '/reference-tools',
    icon: svg(['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16']),
  },
  {
    id: 'validation',
    title: 'Validation Tools',
    desc: `Tools that check conformance to a specification, and nothing else. ${count(isValidationTool, 'tool')}.`,
    href: '/validation-tools',
    icon: svg(['M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8', 'M14 19l2 2l4 -4', 'M9 8h4', 'M9 12h2']),
  },
  {
    id: 'testbeds',
    title: 'Testbeds and Evaluation Frameworks',
    desc: `Environments and frameworks to measure or evaluate something. ${count(isTestbed, 'entry').replace('entrys', 'entries')}.`,
    href: '/testbeds',
    icon: svg(['M9 3l6 0', 'M10 9l4 0', 'M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6']),
  },
  {
    id: 'playgrounds',
    title: 'Playgrounds',
    desc: 'Try a technology with nothing to install.',
    disabled: true,
    icon: svg(['M7 4v16l13 -8l-13 -8']),
  },
  {
    id: 'kits',
    title: 'Deployment Kits',
    desc: 'Packages, images and apps to put into a product.',
    disabled: true,
    icon: svg(['M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5', 'M12 12l8 -4.5', 'M12 12l0 9', 'M12 12l-8 -4.5']),
  },
  {
    id: 'platforms',
    title: 'Platforms',
    desc: `The 3GPP RAN and Core Platforms the tools run on, with the 5G Core Service Consumers; and Common Tools, whose repositories are moving into the projects. ${ALL_PROJECTS.filter((p) => (isPlatform(p) && !p.partOf) || isCommonTools(p)).length} entries.`,
    href: '/reference-tools/3gpp-platforms',
    icon: svg(['M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5']),
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    desc: 'Step-by-step guides to run the Reference Tools.',
    href: '/tutorials',
    icon: svg(['M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z', 'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z']),
  },
];

export default function SoftwareFactory() {
  // Registers the kind anchors with the broken-link checker, as the other custom pages do.
  useAnchors(...KINDS.map((k) => k.id));
  return (
    <Layout
      title="Software Factory"
      description="The open-source software and tools 5G-MAG builds from the specifications: Reference Tools, Validation Tools, Testbeds and Evaluation Frameworks, and more."
    >
      <HubHero
        title="Software Factory"
        icon={FACTORY_ICON_PATH}
        actions={[
          <Link key="tools" className="button button--primary" to="/reference-tools">
            Reference Tools
          </Link>,
          <Link key="programme" className="button button--outline button--primary" to="/developer">
            Software Accelerator
          </Link>,
          <Link key="early" className="button button--outline button--primary" to="/early-access">
            Early Access
          </Link>,
        ]}
      />
      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What 5G-MAG builds</h2>
            <p className={styles.sectionSubtitle}>
              Open-source software and tools built from the specifications, kind by kind. The{' '}
              <Link to="/developer">Software Accelerator Programme</Link> is how they are built: the community, the
              licences and early access.
            </p>
            <div className={styles.activityGrid}>
              {KINDS.map((k) => (
                <div key={k.id} id={k.id} style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}>
                  <HubDestinationCard icon={k.icon} title={k.title} desc={k.desc} href={k.href} disabled={k.disabled} />
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
