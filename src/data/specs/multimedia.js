// Specification catalogue for the Multimedia Delivery Protocols (FLUTE, ROUTE).
//
// `layer` carries the distinction this topic turns on: which IETF generation is
// normative for 3GPP use. FLUTE version 1 (RFC 3926 and its companions) is what
// TS 26.517 and TS 26.346 mandate; the revised generation (RFC 6726/5651/5775)
// is valid IETF text but is reference material for this purpose. Filtering on
// the layer makes that split visible rather than leaving it to prose.
export const MULTIMEDIA_SPECS = [
  // --- IETF, normative for 3GPP use -------------------------------------
  {
    id: 'RFC 3926',
    title: 'FLUTE - File Delivery over Unidirectional Transport',
    url: 'https://www.rfc-editor.org/rfc/rfc3926',
    layer: 'IETF (normative)',
    note: 'Core protocol, FDT, version 1',
  },
  {
    id: 'RFC 3450',
    title: 'Asynchronous Layered Coding (ALC) Protocol Instantiation',
    url: 'https://www.rfc-editor.org/rfc/rfc3450',
    layer: 'IETF (normative)',
    note: 'Transport building block',
  },
  {
    id: 'RFC 3451',
    title: 'Layered Coding Transport (LCT) Building Block',
    url: 'https://www.rfc-editor.org/rfc/rfc3451',
    layer: 'IETF (normative)',
    note: 'Header format, TSI/TOI, Close Session/Object flags',
  },
  {
    id: 'RFC 5052',
    title: 'Forward Error Correction (FEC) Building Block',
    url: 'https://www.rfc-editor.org/rfc/rfc5052',
    layer: 'IETF (normative)',
    note: 'FEC OTI, EXT_FTI, source block partitioning',
  },
  {
    id: 'RFC 3695',
    title: 'Compact No-Code FEC scheme',
    url: 'https://www.rfc-editor.org/rfc/rfc3695',
    layer: 'IETF (normative)',
    note: 'FEC Encoding ID 0',
  },
  {
    id: 'RFC 5053',
    title: 'Raptor FEC scheme',
    url: 'https://www.rfc-editor.org/rfc/rfc5053',
    layer: 'IETF (normative)',
    note: 'FEC Encoding ID 1; the MBMS FEC scheme per TS 26.346 clause 7.2.12 and Annex B',
  },
  {
    id: 'RFC 1952',
    title: 'GZIP file format',
    url: 'https://www.rfc-editor.org/rfc/rfc1952',
    layer: 'IETF (normative)',
    note: 'Content encoding of files for transport (TS 26.346 clause 7.2.5)',
  },
  {
    id: 'RFC 4607',
    title: 'Source-Specific Multicast (SSM)',
    url: 'https://www.rfc-editor.org/rfc/rfc4607',
    layer: 'IETF (normative)',
    note: 'Reception filtered on the announced source address',
  },
  {
    id: 'RFC 4570',
    title: 'SDP Source Filters',
    url: 'https://www.rfc-editor.org/rfc/rfc4570',
    layer: 'IETF (normative)',
    note: 'How SSM sources are announced (SDP handled by consuming applications)',
  },
  {
    id: 'RFC 5905',
    title: 'Network Time Protocol',
    url: 'https://www.rfc-editor.org/rfc/rfc5905',
    layer: 'IETF (normative)',
    note: 'Time base for FDT and Cache-Control expiry values',
  },

  // --- IETF, valid but not the 3GPP-mandated profile ---------------------
  {
    id: 'RFC 6726',
    title: 'FLUTE version 2',
    url: 'https://www.rfc-editor.org/rfc/rfc6726',
    layer: 'IETF (reference only)',
    note: 'Revises RFC 3926; not the 3GPP-mandated profile',
  },
  {
    id: 'RFC 5651',
    title: 'LCT (revised)',
    url: 'https://www.rfc-editor.org/rfc/rfc5651',
    layer: 'IETF (reference only)',
    note: 'Revises RFC 3451',
  },
  {
    id: 'RFC 5775',
    title: 'ALC (revised)',
    url: 'https://www.rfc-editor.org/rfc/rfc5775',
    layer: 'IETF (reference only)',
    note: 'Revises RFC 3450',
  },
  {
    id: 'RFC 6330',
    title: 'RaptorQ FEC scheme',
    url: 'https://www.rfc-editor.org/rfc/rfc6330',
    layer: 'IETF (reference only)',
    note: 'FEC Encoding ID 6; not part of the TS 26.346 FEC scheme set',
  },
  {
    id: 'RFC 9223',
    title: 'ROUTE - Real-time Object delivery over Unidirectional Transport',
    url: 'https://datatracker.ietf.org/doc/rfc9223/',
    layer: 'IETF (normative)',
    note: 'The real-time object transport, alongside FLUTE',
  },
  {
    id: 'RFC 6968',
    title: 'FCAST object delivery',
    url: 'https://datatracker.ietf.org/doc/rfc6968/',
    layer: 'IETF (reference only)',
    note: 'Transport building block',
  },
  {
    id: 'RFC 8216',
    title: 'HTTP Live Streaming (HLS)',
    url: 'https://datatracker.ietf.org/doc/rfc8216/',
    layer: 'IETF (normative)',
    note: 'Adaptive streaming format carried over these transports',
  },

  // --- 3GPP -------------------------------------------------------------
  {
    id: 'TS 26.346',
    title: 'MBMS; Protocols and codecs',
    url: 'https://www.3gpp.org/dynareport/26346.htm',
    layer: '3GPP',
    note: 'The central specification for FLUTE-based delivery. Clause 7.2 covers FLUTE usage for MBMS download (header specializations, FDT schema and 3GPP FDT extensions, FEC schemes, content encoding); clause 7.2.12 and Annex B the MBMS FEC scheme (Raptor, RFC 5053); clause 7.3 SDP for the download delivery method; clause 9 associated delivery procedures, file repair and reception reporting; Annex L the MBMS Download Profile and User Service profiles.',
  },
  {
    id: 'TS 26.347',
    title: 'MBMS URLs and APIs',
    url: 'https://www.3gpp.org/dynareport/26347.htm',
    layer: '3GPP',
    note: 'MBMS client interface towards applications (consumer scope)',
  },
  {
    id: 'TS 23.246',
    title: 'MBMS; Architecture and functional description',
    url: 'https://www.3gpp.org/dynareport/23246.htm',
    layer: '3GPP',
    note: 'Context',
  },
  {
    id: 'TS 26.517',
    title: '5G MBS; User Services and Protocols',
    url: 'https://www.3gpp.org/dynareport/26517.htm',
    layer: '3GPP',
    note: 'Clause 6.2 defines the Object Distribution Method over FLUTE and binds it to the MBMS Download Profile of TS 26.346',
  },
  {
    id: 'TS 26.502',
    title: '5G MBS; User service architecture',
    url: 'https://www.3gpp.org/dynareport/26502.htm',
    layer: '3GPP',
  },
  {
    id: 'TS 23.247',
    title: 'Architectural enhancements for 5G MBS',
    url: 'https://www.3gpp.org/dynareport/23247.htm',
    layer: '3GPP',
    note: "Defines the N3mb/GTP-U transport context served by rt-libflute's UDP tunnel mode",
  },
  {
    id: 'TS 29.581',
    title: '5G System; MBSTF services',
    url: 'https://www.3gpp.org/dynareport/29581.htm',
    layer: '3GPP',
    note: 'The service APIs of rt-mbs-transport-function, the main 5G MBS consumer of rt-libflute',
  },
  {
    id: 'TS 26.247',
    title: '3GP-DASH; Transparent end-to-end packet-switched streaming service',
    url: 'https://www.3gpp.org/dynareport/26247.htm',
    layer: '3GPP',
    note: 'The 3GPP DASH profile carried over these transports',
  },

  // --- ISO/IEC and ETSI media formats -----------------------------------
  {
    id: 'ISO/IEC 23009-1',
    title: 'Dynamic Adaptive Streaming over HTTP (DASH)',
    url: 'https://www.iso.org/standard/83314.html',
    layer: 'Media formats',
    note: 'Adaptive streaming format',
  },
  {
    id: 'ISO/IEC 23000-19',
    title: 'Common Media Application Format (CMAF)',
    url: 'https://www.iso.org/standard/85623.html',
    layer: 'Media formats',
    note: 'Segmented media container',
  },
  {
    id: 'ETSI TS 103 285',
    title: 'DVB-DASH',
    url: 'https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/',
    layer: 'Media formats',
    note: 'The DVB DASH profile',
  },
];

export const MULTIMEDIA_LAYER_ORDER = [
  'IETF (normative)',
  'IETF (reference only)',
  '3GPP',
  'Media formats',
];
