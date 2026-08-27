// Single source of truth for /membership's "What you get that you won't
// get alone" benefits list -- moved out of membership/index.js so the
// homepage's own "why join" teaser can quote the same real, established
// copy instead of inventing new wording (2026-08-27 feedback: homepage
// copy should be "fetched from our original about and membership pages",
// not freshly drafted).
export const BENEFITS = [
  {
    title: 'Shape standards early',
    body: 'Shape the standards and technologies before others set them without you.',
    href: '/standards',
    icon: (
      <>
        <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      </>
    ),
  },
  {
    title: 'Early access to pre-public code',
    body: 'Access implementations before publication and be faster to market.',
    href: '/early-access',
    icon: (
      <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
    ),
  },
  {
    title: 'Prepare for plugfests & interop',
    body: 'Test your implementation in advance and build reference vector traces.',
    href: '/action',
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
  {
    title: 'Mutualised effort to grow your project',
    body: 'From idea to reference code to demo and trial, on shared effort.',
    icon: (
      <>
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
      </>
    ),
  },
  {
    title: 'Exposure at events, demos and trials',
    body: 'Build once, together, instead of funding the same work alone.',
    href: '/events',
    icon: (
      <>
        <path d="M3 4l18 0" />
        <path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" />
        <path d="M12 16l0 4" />
        <path d="M9 20l6 0" />
        <path d="M8 12l3 -3l2 2l3 -3" />
      </>
    ),
  },
  {
    title: 'De-risk on deployments',
    body: 'Back technologies that actually get deployed, not specs that stall.',
    icon: (
      <>
        <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
        <path d="M15 19l2 2l4 -4" />
      </>
    ),
  },
];
