// Specification catalogue for DVB-I Services over 5G Systems.
//
// Extracted from the "Key Specifications" bullet outline this page used to
// carry, so it can be searched and filtered instead of scrolled (see
// src/components/SpecIndex). `layer` is the sub-heading each specification sat
// under, with the 3GPP heading split by the transport path its intro sentence
// described (unicast vs multicast/broadcast). `note` carries the scope
// qualifier that used to sit in a parenthetical.
//
// Three other views on the page are deliberately NOT part of this list and stay
// markdown tables: the DVB BlueBook to ETSI publication pairing (it explains
// the dual-numbering convention rather than cataloguing specs),
// "Specifications by role", and the delivery-mode table, all of which carry
// analytical columns a spec row cannot hold.
export const DVBI_SPECS = [
  {
    id: 'ETSI TS 103 720',
    title: '5G Broadcast System for linear TV and radio services; LTE-based 5G terrestrial broadcast system',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/',
    layer: 'DVB / ETSI',
    note: 'V1.2.1 (June 2023) is the latest version checked; a V1.3.1 is in progress (unverified)',
  },
  {
    id: 'DVB A177',
    title: 'Service Discovery and Programme Metadata for DVB-I',
    url: 'https://dvb.org/?standard=service-discovery-and-programme-metadata-for-dvb-i',
    layer: 'DVB / ETSI',
    note: 'the main DVB-I specification; published as ETSI TS 103 770; A177r8 (30 June 2026) is a draft of V1.3.1',
  },
  {
    id: 'ETSI TS 103 770',
    title: 'Digital Video Broadcasting (DVB); Service Discovery and Programme Metadata for DVB-I',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103770/',
    layer: 'DVB / ETSI',
    note: 'ETSI-published form of DVB A177; latest published V1.2.1 (September 2024); V1.3.1 is a draft (A177r8), ETSI publication unverified',
  },
  {
    id: 'ETSI TR 103 972',
    title: 'DVB-I service delivery over 5G Systems; Deployment Guidelines',
    url: 'https://www.etsi.org/deliver/etsi_tr/103900_103999/103972/',
    layer: 'DVB / ETSI',
    note: 'informative report by the DVB / 5G-MAG Joint Task Force; V1.1.1 (July 2023) is the only version; listed on dvb.org without a BlueBook number',
  },
  {
    id: 'ETSI TS 103 285',
    title:
      'Digital Video Broadcasting (DVB); MPEG-DASH Profile for Transport of ISO BMFF Based DVB Services over IP Based Networks',
    url: 'https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/',
    layer: 'DVB delivery formats',
    note: 'DVB-DASH; the DVB profile of MPEG-DASH, ISO/IEC 23009-1; latest published V1.4.1 (September 2023); A168r10 is an interim draft of V1.5.1 (June 2026)',
  },
  {
    id: 'ETSI TS 103 769',
    title: 'Digital Video Broadcasting (DVB); Adaptive media streaming over IP multicast',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103769/',
    layer: 'DVB delivery formats',
    note: 'DVB-MABR; latest published V1.2.1 (November 2024); A176r7 is an interim draft of V1.3.1 (March 2025)',
  },
  {
    id: 'DVB A180',
    title: 'Native IP Broadcasting',
    url: 'https://dvb.org/?standard=native-ip-broadcasting',
    layer: 'DVB delivery formats',
    note: 'DVB-NIP, the DVB end-to-end native-IP broadcast system that reuses DVB-I, DVB-DASH and DVB-MABR; published as ETSI TS 103 876 V1.1.1 (September 2024); A180r4 is an interim draft of V1.2.1 (March 2025)',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    release: '16',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: '3GPP unicast',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    release: '16',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: '3GPP unicast',
  },
  {
    id: 'TS 26.511',
    title: '5G Media Streaming (5GMS); Profiles, Codecs and Formats',
    release: '16',
    url: 'https://www.3gpp.org/dynareport/26511.htm',
    layer: '3GPP unicast',
  },
  {
    id: 'TS 26.510',
    title: 'Media delivery; interactions and APIs for provisioning and media session handling',
    release: '18',
    url: 'https://www.3gpp.org/dynareport/26510.htm',
    layer: '3GPP unicast',
    note: 'closes 3 of the 9 DVB-I-over-5GMS scenario gaps this page tracks (clauses 11.4, 11.6.2), and TS 26.512 partially addresses a 4th (clause 13.2.3.3, attachMPD())',
  },
  {
    id: 'TS 29.116',
    title: 'Representational state transfer over xMB reference point between Content Provider and BM-SC',
    url: 'https://www.3gpp.org/dynareport/29116.htm',
    layer: '3GPP unicast',
    note: 'the provisioning-layer spec behind 2 of the 5 open gaps this page tracks; already listed under Content delivery in the 5G Broadcast catalogue',
  },
  {
    id: 'TS 26.502',
    title: '5G multicast-broadcast services; User service architecture',
    release: '17',
    url: 'https://www.3gpp.org/dynareport/26502.htm',
    layer: '3GPP broadcast',
    note: 'MBS',
  },
  {
    id: 'TS 23.247',
    title: 'Architectural enhancements for 5G multicast-broadcast services; Stage 2',
    release: '17',
    url: 'https://www.3gpp.org/dynareport/23247.htm',
    layer: '3GPP broadcast',
  },
];

// Order the filter chips from the DVB-I service layer down to the 3GPP
// transport it rides on: discovery and deployment guidance first, then the DVB
// delivery formats, then the unicast and broadcast 5G bearers.
export const DVBI_LAYER_ORDER = [
  'DVB / ETSI',
  'DVB delivery formats',
  '3GPP unicast',
  '3GPP broadcast',
];
