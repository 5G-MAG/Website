// Specification catalogue for Real-Time Communications (RTC).
//
// Extracted from the per-heading bullet lists and the "Specifications by Role"
// table this page used to carry, so both views collapse into one searchable
// table (see src/components/SpecIndex). `layer` reproduces the role each
// specification played on the page; `note` carries the scope qualifier that
// used to sit in a trailing parenthetical.
export const RTC_SPECS = [
  {
    id: 'TS 26.506',
    title: '5G Real-time Media Communication Architecture',
    url: 'https://www.3gpp.org/dynareport/26506.htm',
    layer: 'RTC architecture',
    note: 'stage 2',
  },
  {
    id: 'TS 26.113',
    title: 'Real-Time Media Communication; Protocols and APIs',
    url: 'https://www.3gpp.org/dynareport/26113.htm',
    layer: 'RTC architecture',
    note: 'stage 3',
  },
  {
    id: 'TS 26.510',
    title: 'Media delivery; interactions and APIs for provisioning and media session handling',
    url: 'https://www.3gpp.org/dynareport/26510.htm',
    layer: 'RTC architecture',
    note: 'harmonised across 5GMS and RTC, so it applies to the 5GMS uplink path as well',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: '5GMS uplink',
    note: 'includes uplink reference points M6, M7',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: '5GMS uplink',
    note: 'covers both 5GMSd and 5GMSu',
  },
  {
    id: 'TS 26.114',
    title: 'IP Multimedia Subsystem (IMS); Multimedia telephony; Media handling and interaction',
    url: 'https://www.3gpp.org/dynareport/26114.htm',
    layer: 'IMS multimedia telephony',
  },
  {
    id: 'RFC 3550',
    title: 'RTP: A Transport Protocol for Real-Time Applications',
    url: 'https://datatracker.ietf.org/doc/html/rfc3550',
    layer: 'IETF',
  },
  {
    id: 'RFC 3551',
    title: 'RTP Profile for Audio and Video Conferences with Minimal Control',
    url: 'https://datatracker.ietf.org/doc/html/rfc3551',
    layer: 'IETF',
  },
  {
    id: 'RFC 7742',
    title: 'WebRTC Video Processing and Codec Requirements',
    url: 'https://datatracker.ietf.org/doc/html/rfc7742',
    layer: 'IETF',
  },
  {
    id: 'WebRTC 1.0',
    title: 'Real-Time Communication Between Browsers',
    url: 'https://www.w3.org/TR/webrtc/',
    layer: 'W3C',
  },
  {
    id: 'Media Capture and Streams',
    title: 'API for accessing user media',
    url: 'https://www.w3.org/TR/mediacapture-streams/',
    layer: 'W3C',
  },
  {
    id: 'TR 26.930',
    title: 'Study on the enhancement for Immersive Real-Time Communication for WebRTC',
    url: 'https://www.3gpp.org/dynareport/26930.htm',
    layer: 'Studies',
    note: 'Release 18, with an updated Release-19 version',
  },
];

// Order the layers as the page reads: the RTC architecture first, then the
// adjacent 5GMS uplink and IMS work, then the external transport standards,
// with studies last.
export const RTC_LAYER_ORDER = [
  'RTC architecture',
  '5GMS uplink',
  'IMS multimedia telephony',
  'IETF',
  'W3C',
  'Studies',
];
