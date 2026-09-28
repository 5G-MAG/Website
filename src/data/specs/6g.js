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
    id: 'TR 38.914',
    title: 'Study on 6G Scenarios and requirements',
    url: 'https://www.3gpp.org/dynareport/38914.htm',
    layer: 'Radio studies (RAN)',
    release: '20',
    note: 'RAN (work item FS_6G_RAN_Scen_Req); high-level 6G radio scenarios and requirements, feeding the ITU-R IMT-2030 technical performance requirements process',
  },
  {
    id: 'TR 22.870',
    title: 'Study on 6G Use Cases and Service Requirements',
    url: 'https://www.3gpp.org/dynareport/22870.htm',
    layer: 'Use cases and requirements (SA1)',
    release: '20',
    note: 'clusters use cases around the IMT-2030 usage scenarios and derives candidate system requirements; completed, frozen ~March 2026',
  },
  {
    id: 'TR 26.870',
    title: 'Study on Media Aspects for 6G System',
    url: 'https://www.3gpp.org/dynareport/26870.htm',
    layer: 'Media aspects (SA4)',
    note: 'the track most relevant to 5G-MAG: media services, formats, traffic characteristics and delivery for a 6G system, building on the SA4 5G media work (5G Media Streaming and the Data Collection and Reporting framework)',
  },
  {
    id: 'TR 26.925',
    title: 'Typical traffic characteristics of media services on 3GPP networks',
    url: 'https://www.3gpp.org/dynareport/26925.htm',
    layer: 'Media aspects (SA4)',
    release: '19',
    note: 'SA4 traffic-modelling baseline, actively maintained release over release; its radio-technology scope now includes 6G alongside 2G/3G/LTE/5G',
  },
  {
    id: 'TR 26.847',
    title: 'Evaluation of AI and ML in 5G media services',
    url: 'https://www.3gpp.org/dynareport/26847.htm',
    layer: 'AI/ML studies feeding 6G',
    release: '19',
    note: 'SA4, completed June 2025',
  },
  {
    id: 'TR 22.874',
    title:
      'Study on traffic characteristics and performance requirements for AI/ML model transfer in 5GS',
    url: 'https://www.3gpp.org/dynareport/22874.htm',
    layer: 'AI/ML studies feeding 6G',
    release: '18',
    note: 'SA1; an earlier, already-closed study (Dec 2021) compared to the Release-19 items above',
  },
];

// The global framework first, then the RAN and SA1 studies that implement it,
// then the media track most relevant to 5G-MAG, then the 5G Advanced studies
// feeding into it.
export const SIXG_LAYER_ORDER = [
  'ITU-R framework',
  'Radio studies (RAN)',
  'Use cases and requirements (SA1)',
  'Media aspects (SA4)',
  'AI/ML studies feeding 6G',
];
