// "What we work on" — the domain pillar on /about, grouped by delivery
// mechanism/use case rather than by which 3GPP/DVB working group owns the
// spec. Grouping and naming worked through with the user directly (not
// derived from a single source document): Content Delivery (unicast,
// 5GMS-based) and Multicast (MBS) are split apart because they are
// different delivery mechanisms, and RTC and 5G Broadcast are each their
// own pillar for the same reason (two-way vs. one-way, connected vs.
// connectionless). NTN is its own pillar too, not folded into Multicast --
// its only documented use case is "MBS over satellite," but NTN itself is
// a network-coverage technology, not a delivery mode, so it doesn't belong
// under Multicast any more than under Content Delivery. Two topics are
// deliberately not listed under any single pillar below, because each
// serves two of these pillars at once: DVB-I over 5G Systems (Content
// Delivery and 5G Broadcast) and Content Delivery Protocols/FLUTE+ROUTE
// (Multicast and 5G Broadcast, per its own real description: "for one-way
// delivery ... over broadcast and multicast").
//
// Icons and hrefs are copied from the matching topic entries in
// src/pages/tech/index.js's CATEGORIES, not invented, so a pillar card
// links to the same real /tech pages the Technology hub already
// uses for that technology. Connected Media Production's icon is Non-Public
// Networks' own icon specifically (a padlock, taxonomy.json's "lock" --
// private 5G deployments) rather than Network APIs' or Time-Sensitive
// Communications' -- the same choice MediaConnectivityDiagram makes for
// its own "M18 Non-Public Networks" halo icon (see that component's own
// top-of-file comment).
//
// A pillar with exactly one real topic (RTC, NTN) gets a top-level `href`
// and an empty `chips` array, so the whole card is the link -- a single
// chip repeating the card's own title as its only content read as
// redundant (raised in review).
export const DOMAIN_PILLARS = [
  {
    title: 'Content Delivery',
    icon: <path d="M7 4v16l13 -8l-13 -8" />,
    chips: [
      { label: '5G Media Streaming (5GMS)', href: '/tech/5gms' },
      { label: 'Data Collection & Analytics', href: '/tech/data-collection' },
    ],
  },
  {
    title: 'Real-time Media Communication (RTC) Architecture',
    href: '/tech/rtc',
    icon: (
      <>
        <path d="M7 21v-6" />
        <path d="M20 6l-3 -3l-3 3" />
        <path d="M10 18l-3 3l-3 -3" />
        <path d="M7 3v2" />
        <path d="M7 9v2" />
        <path d="M17 3v6" />
        <path d="M17 21v-2" />
        <path d="M17 15v-2" />
      </>
    ),
    chips: [],
  },
  {
    title: '5G Broadcast',
    icon: (
      <>
        <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
        <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
        <path d="M9 21l3 -9l3 9" />
        <path d="M10 19h4" />
      </>
    ),
    chips: [
      { label: 'TV & Radio', href: '/tech/5g-broadcast' },
      { label: 'Emergency Alerts', href: '/tech/emergency-alerts' },
    ],
  },
  {
    title: 'Multicast',
    icon: (
      <>
        <path d="M12 12l0 .01" />
        <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
        <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
        <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
        <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" />
      </>
    ),
    chips: [{ label: '5G Multicast Broadcast Services (MBS)', href: '/tech/5g-mbs' }],
  },
  {
    title: 'Non-Terrestrial Networks (NTN)',
    href: '/tech/ntn',
    icon: (
      <>
        <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z" />
        <path d="M6 10l-3 3l3 3l3 -3" />
        <path d="M10 6l3 -3l3 3l-3 3" />
        <path d="M14 17a3 3 0 0 0 3 -3" />
        <path d="M20 13a9 9 0 0 0 -9 9" />
      </>
    ),
    chips: [],
  },
  {
    title: 'Immersive Media',
    icon: (
      <>
        <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
        <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
        <path d="M3 17v2a2 2 0 0 0 2 2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M17 21h2a2 2 0 0 0 2 -2v-2" />
      </>
    ),
    chips: [
      { label: 'Avatar Communication', href: '/tech/avatar' },
      { label: 'Volumetric Video', href: '/tech/v3c' },
      { label: 'XR', href: '/tech/xr' },
    ],
  },
  {
    title: 'Connected Media Production',
    icon: (
      <>
        <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
      </>
    ),
    chips: [
      { label: 'Network APIs', href: '/tech/network-apis' },
      { label: 'Non-Public Networks', href: '/tech/npn' },
      { label: 'Time-Sensitive Communications', href: '/tech/tsc' },
    ],
  },
  {
    title: 'Research Topics',
    icon: (
      <>
        <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
        <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
        <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
        <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
        <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
        <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
      </>
    ),
    chips: [
      { label: 'AI/ML in Media', href: '/tech/ai-ml' },
      { label: 'Towards 6G Media', href: '/tech/6g' },
    ],
  },
];
