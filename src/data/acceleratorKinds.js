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
    prominent: true,
    title: 'Reference Tools',
    desc: `Open-source implementations of the specifications. ${count(isReferenceTool, 'project')}.`,
    href: '/reference-tools',
    icon: svg(['M7 8l-4 4l4 4', 'M17 8l4 4l-4 4', 'M14 4l-4 16']),
  },
  {
    id: 'testbeds',
    prominent: true,
    title: 'Testbeds and Evaluation Frameworks',
    desc: `Environments to measure or evaluate something. ${count(isTestbed, 'entry').replace('entrys', 'entries')}.`,
    href: '/testbeds',
    icon: svg(['M9 3l6 0', 'M10 9l4 0', 'M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6']),
  },
  {
    id: 'kits',
    prominent: true,
    title: 'Deployment Kits',
    desc: 'Packages, images and apps to put into a product. Coming soon.',
    href: '/kits',
    icon: svg(['M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z', 'M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z', 'M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0', 'M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5']),
  },
  {
    id: 'validation',
    title: 'Validation Tools',
    desc: `Tools that check conformance to a specification. ${count(isValidationTool, 'tool')}.`,
    href: '/validation',
    icon: svg(['M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8', 'M14 19l2 2l4 -4', 'M9 8h4', 'M9 12h2']),
  },
  {
    id: 'playgrounds',
    title: 'Playgrounds',
    desc: 'Try a technology with nothing to install. Coming soon.',
    href: '/playgrounds',
    icon: svg(['M7 4v16l13 -8l-13 -8']),
  },
  {
    id: 'platforms',
    title: 'Platforms',
    desc: `The 3GPP RAN and Core Platforms the tools run on. ${ALL_PROJECTS.filter((p) => (isPlatform(p) && !p.partOf) || isCommonTools(p)).length} entries.`,
    href: '/reference-tools/3gpp-platforms',
    icon: svg(['M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5']),
  },
  {
    id: 'devtools',
    title: 'Developer Tools',
    desc: 'Tools that help members move standards into deployments.',
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
