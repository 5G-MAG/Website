// The four things 5G-MAG does, in two wordings on purpose:
// - DISCOVER_WORK: /about's "Four pillars" cards, the fuller names
//   (Technology & Blueprints, ...), so /about adds detail rather than
//   repeating the homepage.
// - HOME_WORK: the homepage's cards under "At the intersection of Media and
//   Connectivity", wording chosen by the site owner (2026-09-30).
// Both follow the top navigation's order (Technology, Standardisation,
// Software Accelerator, Deploy) and link to the same section hubs.
import { MEDIA_SYMBOL_PATHS } from '@site/src/components/MediaConnectivityDiagram';

export const DISCOVER_WORK = [
  {
    title: 'Technology & Blueprints',
    body: 'Specification explainers and implementation blueprints, by topic area.',
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
    title: 'Standardisation Activities',
    body: 'Feedback and requirements to standards development organizations, from real deployments.',
    href: '/standards',
    icon: <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />,
  },
  {
    title: 'Software Accelerator',
    body: 'Open-source tools, validators and testbeds turning specs into working code.',
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
    title: 'Deploy',
    body: 'Demos, interoperability plugfests and trials that bring the technology into use.',
    href: '/deploy',
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z" />
        <path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z" />
        <path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0" />
        <path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5" />
      </>
    ),
  },
];

export const HOME_WORK = [
  {
    title: 'Media and Connectivity',
    body: 'Connectivity-driven technologies applied to real-world applications and services.',
    href: '/tech',
    cta: 'Technology areas',
    // The media symbol from the Media and Connectivity diagram.
    icon: (
      <>
        {MEDIA_SYMBOL_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </>
    ),
  },
  {
    title: 'Shaping Specifications',
    body: 'Requirements and implementation feedback to standards development organizations.',
    href: '/standards',
    cta: 'Standardisation',
    icon: <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />,
  },
  {
    title: 'Open Source Software',
    body: 'Reference tools, validators and testbeds that turn specifications into working code.',
    href: '/developer',
    cta: 'Software Accelerator',
    icon: (
      <>
        <path d="M7 8l-4 4l4 4" />
        <path d="M17 8l4 4l-4 4" />
        <path d="M14 4l-4 16" />
      </>
    ),
  },
  {
    title: 'Deploy',
    body: 'Technology into production through ready-to-use software, plugfests, demos and trials.',
    href: '/deploy',
    cta: 'Deploy',
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z" />
        <path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z" />
        <path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0" />
        <path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5" />
      </>
    ),
  },
];
