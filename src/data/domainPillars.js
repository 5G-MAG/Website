// "What we work on" — the domain pillar on /about, grouped by delivery
// mechanism/use case rather than by which 3GPP/DVB working group owns the
// spec. Grouping and naming worked through with the user directly (not
// derived from a single source document): Content Delivery (unicast,
// 5GMS-based) and Multicast (MBS/NTN/transport protocols) are split apart
// because they are different delivery mechanisms, and RTC and 5G Broadcast
// are each their own pillar for the same reason (two-way vs. one-way,
// connected vs. connectionless). DVB-I over 5G Systems is deliberately not
// listed under any single pillar below -- it is a cross-cutting topic tied
// to both Content Delivery and 5G Broadcast, called out separately in
// about/index.js instead.
export const DOMAIN_PILLARS = [
  {
    title: 'Content Delivery',
    chips: ['5G Media Streaming (5GMS)', 'Data Collection & Analytics'],
  },
  {
    title: 'Real-Time Communications (RTC)',
    chips: [],
  },
  {
    title: '5G Broadcast',
    chips: ['TV & Radio', 'Emergency Alerts'],
  },
  {
    title: 'Multicast',
    chips: ['5G Multicast Broadcast Services (MBS)', 'Non-Terrestrial Networks (NTN)', 'Content Delivery Protocols'],
  },
  {
    title: 'Immersive Media',
    chips: ['Avatar Communication', 'Volumetric Video', 'XR'],
  },
  {
    title: 'Connected Media Production',
    chips: ['Network APIs', 'Non-Public Networks', 'Time-Sensitive Communications'],
  },
  {
    title: 'Research Topics',
    chips: ['AI/ML in Media', '6G Media'],
  },
];
