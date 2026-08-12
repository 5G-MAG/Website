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
    id: 'IEEE 802.1AS',
    title: 'Timing and Synchronisation (gPTP)',
    layer: 'IEEE TSN',
  },
  {
    id: 'IEEE 802.1Qbv',
    title: 'Enhancements for Scheduled Traffic',
    layer: 'IEEE TSN',
  },
  {
    id: 'IEEE 802.1Qcc',
    title: 'Stream Reservation Protocol (SRP) Enhancements and Performance Improvements',
    layer: 'IEEE TSN',
  },
  {
    id: 'SMPTE ST 2110',
    title: 'Professional Media Over Managed IP Networks',
    layer: 'SMPTE',
    note: 'video, audio and metadata essences',
  },
  {
    id: 'SMPTE ST 2059',
    title: 'Synchronisation of Video Signals in IP Environments',
    layer: 'SMPTE',
  },
];

// 3GPP requirements and architecture first, then the IEEE standards 5G TSC
// interworks with, then the SMPTE production standards it carries.
export const TSC_LAYER_ORDER = ['Service requirements', 'System architecture', 'IEEE TSN', 'SMPTE'];
