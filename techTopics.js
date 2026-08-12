// One definition of the Tech hub's topic tree, rendered by BOTH sidebars.
//
// The per-topic Standards pages belong to the Tech hub: they list the
// specifications a topic's analysis and reference tools are built against. They
// are only served under /standards/<topic> URLs. So they must appear inside the
// Tech topic menu, nested under their own topic, rather than in a separate menu
// of their own.
//
// That cannot be expressed in one sidebar file, because a Docusaurus sidebar can
// only contain docs from its own plugin instance, and the Tech analysis pages
// (docs/tech, routeBasePath 'tech') and the Standards pages (docs/home,
// routeBasePath '') live in different ones. Each side therefore renders the tree
// from here, holding its own docs as real entries and the other side's as links:
//
//   sidebars-tech.js  -> analysis pages are docs, Standards pages are links
//   sidebars-home.js  -> Standards pages are docs, analysis pages are links
//
// Both render the same groups, the same topics and the same order, so a reader
// sees one Tech menu either way and the current page highlights correctly.
// Adding a topic or a Standards page means editing this file only.
export const TECH_GROUPS = [
  {
    label: 'Media Streaming, Multicast &amp; Real-Time Communications',
    topics: [
      {
        label: '5G Media Streaming (5GMS)',
        techDoc: '5gms',
        techHref: '/tech/5gms',
        autogen: '5gms',
        standards: [{ doc: 'standards/5gms', label: 'Standards: 5G Media Streaming (5GMS)' }],
      },
      {
        label: '5G Multicast Broadcast Services (MBS)',
        techDoc: '5g-mbs',
        techHref: '/tech/5g-mbs',
        autogen: '5g-mbs',
        standards: [
          { doc: 'standards/5g-mbs', label: 'Standards: 5G Multicast Broadcast Services (MBS)' },
        ],
      },
      {
        label: 'DVB-I Services over 5G Systems',
        techDoc: 'dvb-i/dvb-i-5g',
        techHref: '/tech/dvb-i/dvb-i-5g',
        standards: [{ doc: 'standards/dvb-i', label: 'Standards: DVB-I Services over 5G Systems' }],
      },
      {
        label: 'Multimedia Delivery Protocols',
        techDoc: 'multimedia/multimedia-content-delivery',
        techHref: '/tech/multimedia/multimedia-content-delivery',
        standards: [
          { doc: 'standards/multimedia', label: 'Standards: Multimedia Delivery Protocols' },
        ],
      },
      {
        label: 'Non-Terrestrial Networks',
        techDoc: 'ntn',
        techHref: '/tech/ntn',
        autogen: 'ntn',
        standards: [{ doc: 'standards/ntn', label: 'Standards: Non-Terrestrial Networks' }],
      },
      {
        label: 'Real-Time Communications',
        techDoc: 'rtc/rtc',
        techHref: '/tech/rtc',
        standards: [{ doc: 'standards/rtc', label: 'Standards: Real-Time Communications' }],
      },
      {
        label: 'UE Data Collection, Reporting and Event Exposure',
        techDoc: 'data-collection/data-collection-event-exposure',
        techHref: '/tech/data-collection/data-collection-event-exposure',
        standards: [
          {
            doc: 'standards/data-collection',
            label: 'Standards: UE Data Collection, Reporting and Event Exposure',
          },
        ],
      },
    ],
  },
  {
    label: '5G Broadcast for TV, Radio and Emergency Alerts',
    topics: [
      {
        label: '5G Broadcast - TV, Radio and Emergency Alerts',
        techDoc: '5g-broadcast',
        techHref: '/tech/5g-broadcast',
        autogen: '5g-broadcast',
        standards: [
          {
            doc: 'standards/5g-broadcast',
            label: 'Standards: 5G Broadcast - TV, Radio and Emergency Alerts',
          },
          {
            doc: 'standards/5g-broadcast-standards-evolution',
            label: 'Standards: 5G Broadcast - Standards Evolution',
          },
          {
            doc: 'standards/emergency-alerts',
            label: 'Standards: 5G Broadcast - Emergency Alerts',
          },
        ],
      },
    ],
  },
  {
    label: 'Immersive Media Experiences',
    topics: [
      {
        label: 'Avatar Communication with MPEG ARF',
        techDoc: 'avatar-communications',
        techHref: '/tech/avatar-communications',
        standards: [
          { doc: 'standards/avatar', label: 'Standards: Avatar Communication with MPEG ARF' },
        ],
      },
      {
        label: 'Volumetric Video with MPEG V3C',
        techDoc: 'volumetric',
        techHref: '/tech/volumetric',
        autogen: 'volumetric',
        standards: [
          { doc: 'standards/v3c', label: 'Standards: Volumetric Video with MPEG V3C' },
          { doc: 'standards/beyond-2d', label: 'Standards: Beyond 2D Video' },
        ],
      },
      {
        label: 'XR and MPEG-I Scene Description',
        techDoc: 'xr',
        techHref: '/tech/xr',
        autogen: 'xr',
        standards: [{ doc: 'standards/xr', label: 'Standards: XR and MPEG-I Scene Description' }],
      },
    ],
  },
  {
    label: 'Connected Media Production and Contribution',
    topics: [
      {
        label: 'Connectivity Quality with Network APIs',
        techDoc: 'network-apis',
        techHref: '/tech/network-apis',
        autogen: 'network-apis',
        standards: [
          {
            doc: 'standards/network-apis',
            label: 'Standards: Connectivity Quality with Network APIs',
          },
        ],
      },
      {
        label: 'Non-Public Networks',
        techDoc: 'npn',
        techHref: '/tech/npn',
        standards: [{ doc: 'standards/npn', label: 'Standards: Non-Public Networks' }],
      },
      {
        label: 'Time Sensitive Communications',
        techDoc: 'tsc/tsc',
        techHref: '/tech/tsc',
        standards: [{ doc: 'standards/tsc', label: 'Standards: Time Sensitive Communications' }],
      },
    ],
  },
  {
    label: 'Research Topics',
    topics: [
      {
        label: 'AI/ML in 5G Media',
        techDoc: 'ai-ml',
        techHref: '/tech/ai-ml',
        standards: [{ doc: 'standards/ai-ml', label: 'Standards: AI/ML in 5G Media' }],
      },
      {
        label: 'Towards 6G Media',
        techDoc: '6g',
        techHref: '/tech/6g',
        standards: [{ doc: 'standards/6g', label: 'Standards: Towards 6G Media' }],
      },
    ],
  },
];

// Reachable from the Tech menu but not a Tech doc: the testbed has no Standards
// or Analysis page of its own, so it is a plain link in both renderings.
export const RESEARCH_EXTRA_LINKS = [
  { label: 'AI Traffic Characterization', href: '/testbeds/6g-testbed' },
];
