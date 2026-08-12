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
];

// Order the filter chips from the 5GMS specifications outwards: the framework
// itself, then the reporting framework it feeds, then the 5G Core services the
// AF relies on underneath.
export const FIVEGMS_LAYER_ORDER = ['5GMS', 'Data collection', 'Core services consumed'];
