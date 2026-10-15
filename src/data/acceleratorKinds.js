import {
  ALL_PROJECTS,
  isReferenceTool,
  isValidationTool,
  isTestbed,
  isPlatform,
  isCommonTools,
} from './baskets';

// The kinds of software the Software Accelerator offers, as cards for its hub page. The counts come from the `type`
// of each entry in taxonomy.json.
const svg = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths.map((d) => <path key={d} d={d} />)}
  </svg>
);

const count = (filter, noun) => {
  const n = ALL_PROJECTS.filter(filter).length;
  return `${n} ${n === 1 ? noun : `${noun}s`}`;
};

export const KINDS = [
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
    href: '/validation',
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
    desc: 'Packages, images and apps to put into a product. Coming soon.',
    href: '/kits',
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
    id: 'devtools',
    title: 'Developer Tools',
    desc: 'Tools for 5G-MAG members that support the transition of standards into deployments. Not a platform, and not part of a project.',
    href: '/developer-tools',
    icon: svg(['M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0', 'M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4', 'M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5']),
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    desc: 'Step-by-step guides to run the Reference Tools.',
    href: '/tutorials',
    icon: svg(['M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z', 'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z']),
  },
];
