// Specification catalogue for Towards 6G Media.
//
// Merges the "Key 3GPP Specifications" bullet list and the "Specifications by
// Role" table this page used to carry into one searchable table (see
// src/components/SpecIndex). `layer` reproduces the body and working group
// each document comes from, which is what the role table was distinguishing.
//
// Exported as SIXG_* rather than 6G_*: a JavaScript identifier cannot start
// with a digit.
export const SIXG_SPECS = [
  {
    id: 'ITU-R M.2160-0',
    title: 'Framework and overall objectives of the future development of IMT for 2030 and beyond',
    url: 'https://www.itu.int/dms_pubrec/itu-r/rec/m/R-REC-M.2160-0-202311-I!!PDF-E.pdf',
    layer: 'ITU-R framework',
    note: 'the vision and capability targets, published November 2023',
  },
  {
    id: 'TR 22.870',
    title: 'Study on 6G Use Cases and Service Requirements',
    url: 'https://www.3gpp.org/dynareport/22870.htm',
    layer: 'Use cases and requirements (SA1)',
    note: 'clusters use cases around the IMT-2030 usage scenarios and derives candidate system requirements',
  },
  {
    id: 'TR 26.870',
    title: 'Study on Media Aspects for 6G System',
    url: 'https://www.3gpp.org/dynareport/26870.htm',
    layer: 'Media aspects (SA4)',
    note: 'the track most relevant to 5G-MAG: media services, formats, traffic characteristics and delivery for a 6G system, building on the SA4 5G media work (5G Media Streaming and the Data Collection and Reporting framework)',
  },
  {
    id: 'TR 26.847',
    title: 'Evaluation of AI and ML in 5G media services',
    url: 'https://www.3gpp.org/dynareport/26847.htm',
    layer: 'AI/ML studies feeding 6G',
    release: '19',
    note: 'SA4, completed',
  },
  {
    id: 'TR 22.874',
    title:
      'Study on traffic characteristics and performance requirements for AI/ML model transfer in 5GS',
    url: 'https://www.3gpp.org/dynareport/22874.htm',
    layer: 'AI/ML studies feeding 6G',
    note: 'SA1',
  },
];

// The global framework first, then the 3GPP studies that implement it, then
// the 5G Advanced studies feeding into them.
export const SIXG_LAYER_ORDER = [
  'ITU-R framework',
  'Use cases and requirements (SA1)',
  'Media aspects (SA4)',
  'AI/ML studies feeding 6G',
];
