// Short, recognizable names for the Home page's "Technology Areas" strip --
// deliberately not techTopics.js's own labels (those are the fuller
// canonical names used in the Tech sidebar/menu; this needs names a
// first-time visitor recognizes at a glance, e.g. "5G Broadcast" rather
// than "5G Broadcast - TV, Radio and Emergency Alerts"). Same convention
// developer/index.js's PRODUCT_TYPES already uses for the same reason.
// hrefs are the same techHref values as techTopics.js's TECH_GROUPS; if a
// topic moves there, update it here too.
export const TECH_AREAS = [
  { label: '5G Media Streaming', href: '/tech/5gms' },
  { label: '5G Broadcast', href: '/tech/5g-broadcast' },
  { label: '5G Multicast Broadcast', href: '/tech/5g-mbs' },
  { label: 'XR & Immersive Media', href: '/tech/xr' },
  { label: 'Volumetric Video', href: '/tech/volumetric' },
  { label: 'Avatar Communication', href: '/tech/avatar-communications' },
  { label: 'Network APIs', href: '/tech/network-apis' },
  { label: 'Non-Terrestrial Networks', href: '/tech/ntn' },
  { label: 'Real-Time Communications', href: '/tech/rtc' },
  { label: 'DVB-I', href: '/tech/dvb-i/dvb-i-5g' },
  { label: 'Multimedia Delivery', href: '/tech/multimedia/multimedia-content-delivery' },
  { label: 'Data Collection', href: '/tech/data-collection/data-collection-event-exposure' },
  { label: 'Non-Public Networks', href: '/tech/npn' },
  { label: 'Time-Sensitive Communications', href: '/tech/tsc' },
  { label: 'AI/ML in Media', href: '/tech/ai-ml' },
  { label: '6G Media', href: '/tech/6g' },
];
