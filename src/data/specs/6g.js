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
    note: 'the framework and overall objectives of IMT-2030, with its usage scenarios and capabilities; approved November 2023, in force',
  },
  {
    id: 'TR 38.914',
    title: 'Study on 6G Scenarios and requirements',
    url: 'https://www.3gpp.org/dynareport/38914.htm',
    layer: 'Radio studies (RAN)',
    release: '20',
    note: 'RAN (work item FS_6G_RAN_Scen_Req); scenarios and requirements for 6G Radio, as guidance for the RAN working groups and as input for ITU-R when developing the IMT-2030 technical performance requirements',
  },
  {
    id: 'TR 22.870',
    title: 'Study on 6G Use Cases and Service Requirements',
    url: 'https://www.3gpp.org/dynareport/22870.htm',
    layer: 'Use cases and requirements (SA1)',
    release: '20',
    note: 'use cases and potential requirements for the 6G system, based on, but not limited to, the IMT-2030 usage scenarios; V20.0.0 approved March 2026 (SA#111), under change control',
  },
  {
    id: 'TS 22.270',
    title: '6G System Requirements',
    url: 'https://www.3gpp.org/dynareport/22270.htm',
    layer: 'Use cases and requirements (SA1)',
    note: 'where the 6G system requirements developed in TR 22.870 are captured (TR 26.870 V0.6.1, clause 1); a draft (V0.3.0)',
  },
  {
    id: 'TR 23.801-01',
    title: 'Study on Architecture for 6G System Stage 2',
    url: 'https://www.3gpp.org/dynareport/23801-01.htm',
    layer: 'Architecture (SA2)',
    note: 'the architecture study the SA4 media study aligns with (TR 26.870 V0.6.1, clause 1)',
  },
  {
    id: 'TR 26.870',
    title: 'Study on Media Aspects for 6G System',
    url: 'https://www.3gpp.org/dynareport/26870.htm',
    layer: 'Media aspects (SA4)',
    release: '20',
    note: 'the track most relevant to 5G-MAG: media-related opportunities and gaps for 6G; its media delivery work starts from the generalized Media Delivery architecture of TS 26.501 (5G Media Streaming) and TS 26.506 (Real-Time media Communication); a draft (V0.6.1)',
  },
  {
    id: 'TR 26.925',
    title: 'Typical traffic characteristics of media services on 3GPP networks',
    url: 'https://www.3gpp.org/dynareport/26925.htm',
    layer: 'Media aspects (SA4)',
    release: '19',
    note: 'typical traffic patterns of media services delivered over 3GPP networks, with versions in Releases 16 to 19; TR 26.870 complements it with the traffic of AI media services',
  },
];

// The global framework first, then the RAN, SA1 and SA2 work that implements it,
// then the media track most relevant to 5G-MAG.
export const SIXG_LAYER_ORDER = [
  'ITU-R framework',
  'Radio studies (RAN)',
  'Use cases and requirements (SA1)',
  'Architecture (SA2)',
  'Media aspects (SA4)',
];
