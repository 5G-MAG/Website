// Specification catalogue for AI/ML in 5G Media.
//
// Merges the "Study reports" and "Key 3GPP Specifications" bullet lists this
// page used to carry into one searchable table (see src/components/SpecIndex).
// `layer` keeps the two 3GPP tracks the page is built around (network-side
// analytics in SA2, UE-side data collection in SA4) apart from the studies.
export const AI_ML_SPECS = [
  {
    id: 'TS 23.288',
    title: 'Architecture enhancements for 5GS to support Network Data Analytics Services (NWDAF)',
    url: 'https://www.3gpp.org/dynareport/23288.htm',
    layer: 'Network analytics (SA2)',
  },
  {
    id: 'TS 23.501',
    title: 'System Architecture for the 5G System',
    url: 'https://www.3gpp.org/dynareport/23501.htm',
    layer: 'Network analytics (SA2)',
    note: 'NWDAF integration',
  },
  {
    id: 'TS 26.531',
    title: 'Data Collection and Reporting; General Description and Architecture',
    url: 'https://www.3gpp.org/dynareport/26531.htm',
    layer: 'UE data collection (SA4)',
  },
  {
    id: 'TS 26.532',
    title: 'Data Collection and Reporting; Protocols and Formats',
    url: 'https://www.3gpp.org/dynareport/26532.htm',
    layer: 'UE data collection (SA4)',
  },
  {
    id: 'TR 26.847',
    title: 'Evaluation of AI and ML in 5G media services',
    url: 'https://www.3gpp.org/dynareport/26847.htm',
    layer: 'Studies',
    release: '19',
    note: 'SA4, completed June 2025',
  },
  {
    id: 'TR 22.874',
    title:
      'Study on traffic characteristics and performance requirements for AI/ML model transfer in 5GS',
    url: 'https://www.3gpp.org/dynareport/22874.htm',
    layer: 'Studies',
    note: 'SA1',
  },
];

// Network-side track first, then the UE-side track, then the studies behind
// both, matching the order the page introduces them in.
export const AI_ML_LAYER_ORDER = ['Network analytics (SA2)', 'UE data collection (SA4)', 'Studies'];
