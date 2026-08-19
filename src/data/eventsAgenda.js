// Events 5G-MAG participates in, presents at, or is invited to attend --
// as opposed to News (releases/press). Each entry's `href` points to its
// full write-up in the separate "events" blog instance (routeBasePath
// 'events/agenda', configured in docusaurus.config.js), kept out of the
// main /news feed on purpose. Add new entries here AND as a post under
// events-blog/ to keep the agenda and the write-up in sync.
//
// `flagship: true` marks the 3 recurring trade shows with their own
// evergreen page (MWC, IBC, FMT -- see EVENT_PAGES in
// src/pages/events/index.js). HeroSlideshow uses this to decide how far
// ahead of the date to start surfacing the event as a homepage slide: 45
// days for flagship events, 14 days for everything else.
//
// `image` matches each event's own cover image -- the same file used as
// the `image:` frontmatter on its events-blog/*.mdx post (or, for the 3
// flagship pages, the same banner used on /mwc, /ibc, /fmt) -- so the
// HeroSlideshow event card isn't text-only.
export const EVENTS_AGENDA = [
  {
    date: '2025-11-25',
    endDate: null,
    title: 'MSF Volumetric Video Town Hall',
    type: 'Conference',
    location: 'Online',
    href: '/events/agenda/msf-volumetric-video-town-hall',
    image: '/assets/images/events/msf-volumetric-town-hall.png',
  },
  {
    date: '2026-02-27',
    endDate: null,
    title: 'New Project: 6G Testbed & AI Traffic Characterization',
    type: 'Public Call',
    location: 'Online',
    href: '/events/agenda/6g-testbed-ai-traffic-characterization',
    image: '/assets/images/events/6g-testbed-ai-traffic.png',
  },
  {
    date: '2026-03-02',
    endDate: '2026-03-05',
    title: '5G-MAG at MWC 2026',
    type: 'Conference',
    location: 'Barcelona',
    href: '/events/agenda/mwc-2026',
    flagship: true,
    image: '/assets/images/events/mwc-2026.png',
  },
  {
    date: '2026-03-19',
    endDate: null,
    title: 'Workshop on Media Energy Consumption Measurement and Exposure',
    type: 'Workshop',
    location: 'Online',
    href: '/events/agenda/media-energy-consumption-workshop-2026',
    image: '/assets/images/events/media-energy-workshop.png',
  },
  {
    date: '2026-03-25',
    endDate: null,
    title: 'Tech Talk - Streaming over LEO: Insights from Netflix on QoE',
    type: 'Public Call',
    location: 'Online',
    href: '/events/agenda/tech-talk-leo-netflix',
    image: '/assets/images/events/tech-talk-leo-netflix.png',
  },
  {
    date: '2026-04-14',
    endDate: null,
    title: 'Webinar - NTN & Content Delivery: From Specs to Software',
    type: 'Webinar',
    location: 'Online',
    href: '/events/agenda/webinar-ntn-content-delivery',
    image: '/assets/images/events/webinar-ntn-content-delivery.png',
  },
  {
    date: '2026-06-09',
    endDate: '2026-06-11',
    title: '5G Broadcast PlugFest in Berlin',
    type: 'Workshop',
    location: 'Berlin, Fraunhofer FOKUS',
    href: '/events/agenda/plugfest-berlin-2026-announcement',
    image: '/assets/images/events/plugfest-announcement.png',
  },
  {
    date: '2026-06-16',
    endDate: '2026-06-17',
    title: '5G-MAG at FOKUS Media Web Symposium',
    type: 'Conference',
    location: 'Berlin',
    href: '/events/agenda/fokus-media-web-symposium-2026',
    image: '/assets/images/events/fokus-media-web-symposium.png',
  },
  {
    date: '2026-06-24',
    endDate: '2026-06-26',
    title: '5G-MAG Reference Tools at MWC Shanghai',
    type: 'Conference',
    location: 'Shanghai',
    href: '/events/agenda/mwc-shanghai-2026',
    image: '/assets/images/events/mwc-shanghai.png',
  },
  {
    date: '2026-06-26',
    endDate: null,
    title: 'Friday Call: From Specifications to Software using AI',
    type: 'Public Call',
    location: 'Online',
    href: '/events/agenda/friday-call-specs-to-software-ai',
    image: '/assets/images/events/friday-call-ai-software.png',
  },
  {
    date: '2026-08-31',
    endDate: '2026-09-02',
    title: '5G-MAG at NTN Forum 2026',
    type: 'Conference',
    location: 'Noordwijk, ESA/ESTEC',
    href: '/events/agenda/ntn-forum-2026',
    image: '/assets/images/events/ntn-forum-2026.png',
  },
  {
    date: '2026-09-11',
    endDate: '2026-09-14',
    title: '5G-MAG at IBC 2026',
    type: 'Conference',
    location: 'Amsterdam, RAI',
    href: '/ibc',
    flagship: true,
    image: '/assets/images/events/ibc-2026.png',
  },
  {
    date: '2026-09-12',
    endDate: null,
    title: 'Future Media Townhall 2026',
    type: 'Conference',
    location: 'Amsterdam, RAI - Room E.102',
    href: '/fmt',
    flagship: true,
    image: '/assets/images/fmt/fmt-2026-banner.png',
  },
];
