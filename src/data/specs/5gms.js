// Specification catalogue for 5G Media Streaming (5GMS).
//
// Extracted from the "Related 3GPP Specifications" bullet list this page used to
// carry, so it can be searched and filtered instead of scrolled (see
// src/components/SpecIndex). `layer` is the grouping the bullets sat under on
// the page: the 5GMS specifications proper, the generic UE data collection
// companions, and the 5G Core services the 5GMS AF consumes.
//
// Two other views on the page are deliberately NOT part of this list and stay
// markdown: "Specifications by Role" (analytical, which spec plays which role)
// and "Specifications by release" (the release-by-release narrative). The
// Release-19 Advanced Media Delivery section also keeps its own study reports
// and external specifications, since each carries surrounding commentary and
// change-request links that a table row cannot hold.
export const FIVEGMS_SPECS = [
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: '5GMS',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: '5GMS',
  },
  {
    id: 'TS 26.510',
    title: 'Media delivery; interactions and APIs for provisioning and media session handling',
    url: 'https://www.3gpp.org/dynareport/26510.htm',
    layer: '5GMS',
    note: 'the generalized Media Session Handling referenced by TS 26.512',
  },
  {
    id: 'TS 26.511',
    title: '5G Media Streaming (5GMS); Profiles, codecs and formats',
    url: 'https://www.3gpp.org/dynareport/26511.htm',
    layer: '5GMS',
  },
  {
    id: 'TS 26.117',
    title: '5G Media Streaming (5GMS); Speech and audio profiles',
    url: 'https://www.3gpp.org/dynareport/26117.htm',
    layer: '5GMS',
    note: 'companion to TS 26.511 for speech/audio-specific profiles; shares work item 5GMS3 with TS 26.511 and TS 26.512',
  },
  {
    id: 'TS 26.531',
    title: 'Data Collection and Reporting; General Description and Architecture',
    url: 'https://www.3gpp.org/dynareport/26531.htm',
    layer: 'Data collection',
  },
  {
    id: 'TS 26.532',
    title: 'Data Collection and Reporting; Protocols and Formats',
    url: 'https://www.3gpp.org/dynareport/26532.htm',
    layer: 'Data collection',
  },
  {
    id: 'TS 29.521',
    title: '5G System; Binding Support Management Service; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29521.htm',
    layer: 'Core services consumed',
    note: 'the 5GMS AF is a consumer, not a producer, of this service',
  },
  {
    id: 'TS 29.514',
    title: '5G System; Policy Authorization Service; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29514.htm',
    layer: 'Core services consumed',
    note: 'the 5GMS AF is a consumer, not a producer, of this service',
  },
  {
    id: 'CTA-5004-B',
    title: 'Web Application Video Ecosystem - Common Media Client Data (CMCD)',
    url: 'https://www.cta.tech/standards/cta-5004/',
    layer: 'Related SDO specifications',
    note: 'v2 (April 2026), adds Request/Response/Event transmission modes; one of the two features (with CMMF) this page\'s Technical Analysis deep-dive is built around',
  },
  {
    id: 'ETSI TS 103 973',
    title: 'Coded Multisource Media Format (CMMF) for Content Distribution and Delivery',
    url: 'https://www.etsi.org/deliver/etsi_ts/103900_103999/103973/01.01.01_60/ts_103973v010101p.pdf',
    layer: 'Related SDO specifications',
    note: 'V1.1.1 (2024-10); this page\'s other core feature (with CMCD); already catalogued under Multisource delivery in src/data/specs/content-delivery.js',
  },
  {
    id: 'ETSI TS 103 998',
    title: 'DASH-IF: Content Steering for DASH',
    url: 'https://www.etsi.org/deliver/etsi_ts/103900_103999/103998/01.01.01_60/ts_103998v010101p.pdf',
    layer: 'Related SDO specifications',
    note: 'V1.1.1 (2024-01); multi-CDN source-switching; published via the ETSI PAS route, EBU is a co-rightsholder',
  },
  {
    id: 'DASH-IF IOP-1',
    title: 'DASH-IF Interoperability Points; Part 1: Overview, Architecture and Interfaces',
    url: 'https://dashif.org/docs/IOP-Guidelines/DASH-IF-IOP-Part1-v5.0.0.pdf',
    layer: 'Related SDO specifications',
    note: 'V5.0.0 (2022-06); constrained to CMAF-formatted media',
  },
  {
    id: 'CTA-5006',
    title: 'Web Application Video Ecosystem - Common Media Server Data (CMSD)',
    url: 'https://shop.cta.tech/products/web-application-video-ecosystem-common-media-server-data-cta-5006',
    layer: 'Related SDO specifications',
    note: 'published November 2022; server/CDN-side counterpart to CMCD',
  },
  {
    id: 'CTA-5001-F',
    title: 'Web Application Video Ecosystem - Content Specification',
    url: 'https://shop.cta.tech/products/cta-5001-f',
    layer: 'Related SDO specifications',
    note: 'published May 2025; CMAF-based WAVE content/program requirements',
  },
  {
    id: 'CTA-5003-C',
    title: 'Web Application Video Ecosystem - Device Playback Capabilities',
    url: 'https://shop.cta.tech/products/cta-5003',
    layer: 'Related SDO specifications',
    note: 'published June 2026; device/platform requirements for playing back WAVE-compliant content',
  },
];

// Order the filter chips from the 5GMS specifications outwards: the framework
// itself, then the reporting framework it feeds, then the 5G Core services the
// AF relies on underneath, then the non-3GPP SDO specifications it profiles.
export const FIVEGMS_LAYER_ORDER = [
  '5GMS',
  'Data collection',
  'Core services consumed',
  'Related SDO specifications',
];
