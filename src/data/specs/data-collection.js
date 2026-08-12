// Specification catalogue for UE Data Collection, Reporting and Event Exposure.
//
// Extracted from the "Related 3GPP Specifications" tables this page used to
// carry, so it can be searched and filtered instead of scrolled (see
// src/components/SpecIndex). `layer` is the 3GPP working group sub-heading each
// specification sat under.
//
// The "Specifications by role and release" section on the page is deliberately
// NOT part of this list: it is the narrative view of which group owns what and
// which release introduced it, and stays prose.
export const DATA_COLLECTION_SPECS = [
  {
    id: 'TS 23.288',
    title:
      'Architecture enhancements for 5G System (5GS) to support network data analytics services',
    url: 'https://www.3gpp.org/dynareport/23288.htm',
    layer: 'SA2',
  },
  {
    id: 'TS 26.531',
    title: 'Data Collection and Reporting; General Description and Architecture',
    url: 'https://www.3gpp.org/dynareport/26531.htm',
    layer: 'SA4',
  },
  {
    id: 'TS 26.532',
    title: 'Data Collection and Reporting; Protocols and Formats',
    url: 'https://www.3gpp.org/dynareport/26532.htm',
    layer: 'SA4',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: 'SA4',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: 'SA4',
  },
  {
    id: 'TS 29.517',
    title: '5G System; Application Function Event Exposure Service; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29517.htm',
    layer: 'CT3',
  },
  {
    id: 'TS 29.520',
    title: '5G System; Network Data Analytics Services; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29520.htm',
    layer: 'CT3',
  },
  {
    id: 'TS 29.522',
    title: '5G System; Network Exposure Function Northbound APIs; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29522.htm',
    layer: 'CT3',
  },
  {
    id: 'TS 29.591',
    title: '5G System; Network Exposure Function Southbound Services; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29591.htm',
    layer: 'CT3',
  },
];

// Order the filter chips the way the page reads down the stack: system
// architecture and analytics (SA2), the media data collection framework layered
// on it (SA4), then the stage-3 APIs that carry it (CT3).
export const DATA_COLLECTION_LAYER_ORDER = ['SA2', 'SA4', 'CT3'];
