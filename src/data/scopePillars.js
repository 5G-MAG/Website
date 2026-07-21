// Single source of truth for the "Scope: Media and Connectivity" / "At the
// intersection of Media and Connectivity" four-pillar cards, shown on both
// the homepage and /about — previously hand-duplicated verbatim in both
// files; edit here to update both places at once.
export const SCOPE_PILLARS = [
  {
    title: 'Fast tech evolution',
    body: 'Connectivity and media technologies move fast, and together even faster — our scope keeps pace with both.',
    icon: (
      <>
        <path d="M3 17l6 -6l4 4l8 -8" />
        <path d="M14 7l7 0l0 7" />
      </>
    ),
  },
  {
    title: 'Global ecosystem',
    body: 'Members and partners spanning the full value chain, working from the same global standards baseline.',
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h16.8" />
        <path d="M11.5 3a17 17 0 0 0 0 18" />
        <path d="M12.5 3a17 17 0 0 1 0 18" />
      </>
    ),
  },
  {
    title: 'Built better together',
    body: 'Concrete, tangible actions — run jointly instead of duplicated org-by-org across the industry.',
    icon: (
      <>
        <path d="M9 15l6 -6" />
        <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
        <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
      </>
    ),
  },
  {
    title: 'Solution to pain-points',
    body: 'Turning real deployment and operational pain points into concrete requirements and working fixes.',
    icon: (
      <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
    ),
  },
];
