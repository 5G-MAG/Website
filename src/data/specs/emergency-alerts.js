// Specification catalogue for 5G Broadcast public warning (Emergency Alerts).
//
// This project had no /standards page of its own, so its specification list sat
// on the Scope page instead, which is the one place it does not belong. These
// four are the specifications that actually define warning delivery over 5G
// Broadcast: the ETSI system specification that profiles it, the 3GPP Cell
// Broadcast Service realisation, the RRC encoding that carries it over the air,
// and the overview report.
export const EMERGENCY_ALERTS_SPECS = [
  {
    id: 'ETSI TS 103 720',
    title: '5G Broadcast System for linear TV and radio services',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/01.02.01_60/ts_103720v010201p.pdf',
    layer: 'System specification',
    note: 'Maintained by 5G-MAG. PWS support, the delivery of warning messages via SIB broadcast on the E-UTRAN Uu downlink, is defined in v1.2.1 clause 5.15.3.3. Work towards v1.3.1 (aligning with 3GPP Release 18) adds further PWS-related improvements.',
  },
  {
    id: 'TS 23.041',
    title: 'Technical realization of Cell Broadcast Service (CBS)',
    url: 'https://www.3gpp.org/dynareport/23041.htm',
    layer: 'Warning message realisation',
    note: 'CBS message structure, message identifiers, serial numbers and data coding for ETWS and CMAS. Message identifier 0x1102 is the ETWS combined earthquake-and-tsunami identifier used by the reference transmitter.',
  },
  {
    id: 'TS 36.331',
    title: 'E-UTRA; Radio Resource Control (RRC); Protocol specification',
    url: 'https://www.3gpp.org/dynareport/36331.htm',
    layer: 'Radio interface',
    note: 'Defines SystemInformationBlockType12 and the UE actions on receiving a warning-message SIB.',
  },
  {
    id: 'TR 36.976',
    title: 'Overall description of LTE-based 5G broadcast',
    url: 'https://www.3gpp.org/dynareport/36976.htm',
    layer: 'Overview',
  },
];

export const EMERGENCY_ALERTS_LAYER_ORDER = [
  'System specification',
  'Warning message realisation',
  'Radio interface',
  'Overview',
];
