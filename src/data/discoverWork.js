// Single source of truth for the "Discover 5G-MAG's work" / "What We Do"
// four-pillar cards, shown on both the homepage and /about — previously
// hand-duplicated with different wording in each file; edit here to update
// both places at once.
export const DISCOVER_WORK = [
  {
    title: 'Explainers and Profiles of Standards Specifications',
    body: 'Specification analysis, blueprints and explainers organised by topic area.',
    href: '/tech',
    icon: (
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
    title: 'Feedback & Requirements to Standards Bodies',
    body: 'Requirements and deployment experience submitted back to SDOs.',
    href: '/standards',
    icon: <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />,
  },
  {
    title: 'Software Accelerator',
    body: 'Open-source reference tools turning specs into working code.',
    href: '/developer',
    icon: (
      <>
        <path d="M7 8l-4 4l4 4" />
        <path d="M17 8l4 4l-4 4" />
        <path d="M14 4l-4 16" />
      </>
    ),
  },
  {
    title: 'Validation, Interop Plugfests, Demos and Apps',
    body: 'Plugfests and demonstrators to prove implementations and value.',
    href: '/testing',
    icon: (
      <>
        <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5" />
        <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5" />
        <path d="M3 21l2.5 -2.5" />
        <path d="M18.5 5.5l2.5 -2.5" />
        <path d="M10 11l-2 2" />
        <path d="M13 14l-2 2" />
      </>
    ),
  },
];
