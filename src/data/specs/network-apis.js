// Specification catalogue for Connectivity Quality with Network APIs.
//
// Extracted from the "Key 3GPP Specifications" bullet outline this page used to
// carry, so it can be searched and filtered instead of scrolled (see
// src/components/SpecIndex). `layer` is the sub-heading each specification sat
// under; `note` carries the scope qualifier that used to sit in a parenthetical.
//
// The CAMARA-to-3GPP mapping table on the page is deliberately NOT part of this
// list: it carries analytical columns (which northbound mechanism each CAMARA
// API maps onto) and stays a markdown table.
export const NETWORK_APIS_SPECS = [
  {
    id: 'TS 29.522',
    title: 'Network Exposure Function (NEF); Northbound APIs',
    url: 'https://www.3gpp.org/dynareport/29522.htm',
    layer: 'NEF',
    note: 'includes Nnef_AFsessionWithQoS and Nnef_ChargeableParty',
  },
  {
    id: 'TS 29.517',
    title: '5G System; Application Function Event Exposure Service; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29517.htm',
    layer: 'NEF',
  },
  {
    id: 'TS 23.501',
    title: 'System Architecture for 5GS',
    url: 'https://www.3gpp.org/dynareport/23501.htm',
    layer: 'NEF',
    note: 'NEF architecture',
  },
  {
    id: 'TS 29.514',
    title: '5G System; Policy Authorization Service; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29514.htm',
    layer: 'Policy and QoS',
    note: 'Npcf_PolicyAuthorization',
  },
  {
    id: 'TS 29.554',
    title: '5G System; Background Data Transfer (BDT) Policy Control Service; Stage 3',
    url: 'https://www.3gpp.org/dynareport/29554.htm',
    layer: 'Policy and QoS',
    note: 'Npcf_BDTPolicyControl, Nnef_BDTPNegotiation',
  },
  {
    id: 'TS 23.222',
    title: 'Procedures for the Common API Framework for 3GPP Northbound APIs',
    url: 'https://www.3gpp.org/dynareport/23222.htm',
    layer: 'CAPIF',
  },
  {
    id: 'TS 29.222',
    title: 'Common API Framework for 3GPP Northbound APIs (Stage 3)',
    url: 'https://www.3gpp.org/dynareport/29222.htm',
    layer: 'CAPIF',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: '5GMS APIs',
    note: 'M1-M8 reference point APIs',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: '5GMS APIs',
  },
  {
    id: 'TS 23.434',
    title:
      'Service Enabler Architecture Layer for Verticals (SEAL); Functional architecture and information flows',
    url: 'https://www.3gpp.org/dynareport/23434.htm',
    layer: 'SEAL',
  },
  {
    id: 'TS 24.549',
    title: 'SEAL; Network Slice Capability Enablement (NSCE); Stage 3',
    url: 'https://www.3gpp.org/dynareport/24549.htm',
    layer: 'SEAL',
    note: 'protocol aspects',
  },
];

// Order the filter chips by where each layer sits in the exposure stack:
// 3GPP northbound exposure first, then core policy control, then the media and
// enabler layers that sit on top of it.
export const NETWORK_APIS_LAYER_ORDER = ['NEF', 'Policy and QoS', 'CAPIF', '5GMS APIs', 'SEAL'];
