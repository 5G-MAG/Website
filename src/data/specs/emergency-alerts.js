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
    id: 'TS 22.268',
    title: 'Public Warning System (PWS) requirements',
    url: 'https://www.3gpp.org/dynareport/22268.htm',
    layer: 'Service requirements',
    release: '9',
    note: 'Stage-1 PWS service requirements this whole page implements; SA1',
  },
  {
    id: 'TS 23.041',
    title: 'Technical realization of Cell Broadcast Service (CBS)',
    url: 'https://www.3gpp.org/dynareport/23041.htm',
    layer: 'Warning message realisation',
    note: 'CBS message structure, message identifiers, serial numbers and data coding for ETWS and CMAS. Message identifier 0x1102 is the ETWS combined earthquake-and-tsunami identifier used by the reference transmitter.',
  },
  {
    id: 'TS 29.168',
    title: 'Cell Broadcast Centre interfaces with the Evolved Packet Core; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29168.htm',
    layer: 'Warning message realisation',
    release: '8',
    note: 'the CBC-to-EPC delivery path for the warning message before it reaches the radio interface',
  },
  {
    id: 'ETSI TS 102 900',
    title: 'Emergency Communications (EMTEL); European Public Warning System (EU-ALERT) using the Cell Broadcast Service',
    url: 'https://www.etsi.org/deliver/etsi_ts/102900_102999/102900/01.04.01_60/ts_102900v010401p.pdf',
    layer: 'Warning message realisation',
    note: 'V1.4.1 (2023-06); profiles Cell Broadcast Service for EU-ALERT and national variants (e.g. NL-ALERT, UK-ALERT)',
  },
  {
    id: 'OASIS CAP v1.2',
    title: 'Common Alerting Protocol',
    url: 'https://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.pdf',
    layer: 'Warning message realisation',
    note: 'the alert message payload format carried inside the Cell Broadcast Service message; confirmed still current, no newer version published',
  },
  {
    id: 'TS 36.331',
    title: 'Evolved Universal Terrestrial Radio Access (E-UTRA); Radio Resource Control (RRC); Protocol specification',
    url: 'https://www.3gpp.org/dynareport/36331.htm',
    layer: 'Radio interface',
    note: 'Defines SystemInformationBlockType12 and the UE actions on receiving a warning-message SIB.',
  },
  {
    id: 'TS 36.523-1',
    title: 'Evolved Universal Terrestrial Radio Access (E-UTRA) and Evolved Packet Core (EPC); User Equipment (UE) conformance specification; Part 1: Protocol conformance specification',
    url: 'https://www.3gpp.org/dynareport/36523-1.htm',
    layer: 'Conformance testing',
    release: '8',
    note: 'UE protocol conformance test cases; whether its ETWS/CMAS/SIB12-specific test-case content has been independently confirmed against the spec text itself is not established here',
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
  'Service requirements',
  'Warning message realisation',
  'Radio interface',
  'Conformance testing',
  'Overview',
];
