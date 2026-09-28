// Specification catalogue for Time Sensitive Communications (TSC).
//
// Extracted from the per-heading bullet lists this page used to carry, so the
// 3GPP, IEEE and SMPTE sides sit in one searchable table (see
// src/components/SpecIndex). `layer` is the heading each entry sat under. The
// IEEE and SMPTE standards had no links on the page, so they carry no `url`
// and render as plain identifiers.
export const TSC_SPECS = [
  {
    id: 'TS 22.104',
    title: 'Service requirements for cyber-physical control applications in vertical domains',
    url: 'https://www.3gpp.org/dynareport/22104.htm',
    layer: 'Service requirements',
    note: 'includes TSC',
  },
  {
    id: 'TR 22.804',
    title: 'Study on Communication for Automation in Vertical Domains',
    url: 'https://www.3gpp.org/dynareport/22804.htm',
    layer: 'Service requirements',
  },
  {
    id: 'TS 23.501',
    title: 'System Architecture for the 5G System',
    url: 'https://www.3gpp.org/dynareport/23501.htm',
    layer: 'System architecture',
    note: 'TSN integration aspects',
  },
  {
    id: 'TS 23.502',
    title: 'Procedures for the 5G System',
    url: 'https://www.3gpp.org/dynareport/23502.htm',
    layer: 'System architecture',
    note: 'TSC bridge procedures',
  },
  {
    id: 'TS 29.565',
    title: '5G System; Time Sensitive Communication and Time Synchronization Function Services; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29565.htm',
    layer: 'Network exposure (stage 3)',
    release: '17',
    note: 'Ntsctsf services; CT3 stage 3 for the TSCTSF',
  },
  {
    id: 'TS 29.522',
    title: '5G System; Network Exposure Function Northbound APIs; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29522.htm',
    layer: 'Network exposure (stage 3)',
    note: 'stage-3 NEF API family carrying the TSC/time-sync exposure the page describes',
  },
  {
    id: 'TR 23.700-25',
    title: 'Study on timing resiliency and TSC and URLLC enhancements',
    url: 'https://www.3gpp.org/dynareport/23700-25.htm',
    layer: 'System architecture',
    release: '18',
    note: 'SA2 study (FS_5TRS_URLLC) behind the TSCTSF/NEF exposure work; results folded into TS 23.501/502/29.565',
  },
  {
    id: 'IEEE 802.1AS-2025',
    title: 'Timing and Synchronisation (gPTP)',
    url: 'https://standards.ieee.org/ieee/802.1AS/11968/',
    layer: 'IEEE TSN',
    note: 'supersedes IEEE 802.1AS-2020',
  },
  {
    id: 'IEEE 802.1Q-2022',
    title: 'Bridges and Bridged Networks',
    url: 'https://standards.ieee.org/ieee/802.1Q/10323/',
    layer: 'IEEE TSN',
    note: 'consolidated base standard; folds in the former standalone amendments 802.1Qbv (Scheduled Traffic) and 802.1Qcc (SRP Enhancements)',
  },
  {
    id: 'IEEE 802.1BA-2021',
    title: 'Audio Video Bridging (AVB) Systems',
    url: 'https://standards.ieee.org/ieee/802.1BA/10547/',
    layer: 'IEEE TSN',
    note: 'profile combining 802.1AS timing and 802.1Q traffic shaping/SRP for interoperable AV bridging',
  },
  {
    id: 'IEEE 802.1CB-2017',
    title: 'Frame Replication and Elimination for Reliability',
    url: 'https://standards.ieee.org/ieee/802.1CB/5703/',
    layer: 'IEEE TSN',
    note: 'seamless redundancy, the TSN analogue to SMPTE 2022-7 hitless switching',
  },
  {
    id: 'SMPTE ST 2110-10',
    title: 'System Timing and Definitions',
    url: 'https://www.smpte.org/standards/st2110',
    layer: 'SMPTE',
    note: 'part of the ST 2110 suite',
  },
  {
    id: 'SMPTE ST 2110-20',
    title: 'Uncompressed Active Video',
    url: 'https://www.smpte.org/standards/st2110',
    layer: 'SMPTE',
  },
  {
    id: 'SMPTE ST 2110-21',
    title: 'Traffic Shaping and Delivery Timing for Video',
    url: 'https://www.smpte.org/standards/st2110',
    layer: 'SMPTE',
  },
  {
    id: 'SMPTE ST 2110-30',
    title: 'PCM Digital Audio',
    url: 'https://www.smpte.org/standards/st2110',
    layer: 'SMPTE',
  },
  {
    id: 'SMPTE ST 2110-40',
    title: 'Ancillary Data (SMPTE ST 291-1)',
    url: 'https://www.smpte.org/standards/st2110',
    layer: 'SMPTE',
  },
];

// 3GPP requirements and architecture first, then the CT3 stage-3 exposure work,
// then the IEEE standards 5G TSC interworks with, then the SMPTE production
// standards it carries.
export const TSC_LAYER_ORDER = [
  'Service requirements',
  'System architecture',
  'Network exposure (stage 3)',
  'IEEE TSN',
  'SMPTE',
];
