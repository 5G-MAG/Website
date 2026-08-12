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
    title: '5G Broadcast System for linear TV and radio services',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/',
    layer: 'DVB / ETSI',
  },
  {
    id: 'DVB A177',
    title: 'Service Discovery and Programme Metadata for DVB-I',
    url: 'https://dvb.org/?standard=service-discovery-and-programme-metadata-for-dvb-i',
    layer: 'DVB / ETSI',
    note: 'the main DVB-I specification; published as ETSI TS 103 770',
  },
  {
    id: 'ETSI TS 103 770',
    title: 'Digital Video Broadcasting (DVB); Service Discovery and Programme Metadata for DVB-I',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103770/',
    layer: 'DVB / ETSI',
    note: 'ETSI-published form of DVB A177',
  },
  {
    id: 'DVB A178',
    title: 'DVB-I service delivery over 5G Systems; Deployment Guidelines',
    url: 'https://dvb.org/?standard=dvb-i-service-delivery-over-5g-systems-deployment-guidelines',
    layer: 'DVB / ETSI',
    note: 'broader 5G delivery guidance for DVB-I, not limited to 5G Broadcast; published as ETSI TR 103 972',
  },
  {
    id: 'ETSI TR 103 972',
    title: 'DVB-I service delivery over 5G Systems; Deployment Guidelines',
    url: 'https://www.etsi.org/deliver/etsi_tr/103900_103999/103972/',
    layer: 'DVB / ETSI',
    note: 'ETSI-published form of DVB A178; produced by the DVB / 5G-MAG Joint Task Force',
  },
  {
    id: 'ETSI TS 103 285',
    title:
      'Digital Video Broadcasting (DVB); MPEG-DASH Profile for Transport of ISO BMFF Based DVB Services over IP Based Networks',
    url: 'https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/',
    layer: 'DVB delivery formats',
    note: 'DVB-DASH; the DVB profile of MPEG-DASH, ISO/IEC 23009-1',
  },
  {
    id: 'ETSI TS 103 769',
    title: 'Digital Video Broadcasting (DVB); Adaptive media streaming over IP multicast',
    url: 'https://www.etsi.org/deliver/etsi_ts/103700_103799/103769/',
    layer: 'DVB delivery formats',
    note: 'DVB-MABR',
  },
  {
    id: 'DVB A180',
    title: 'Native IP Broadcasting',
    url: 'https://dvb.org/?standard=native-ip-broadcasting',
    layer: 'DVB delivery formats',
    note: 'DVB-NIP, the DVB end-to-end native-IP broadcast system that reuses DVB-I, DVB-DASH and DVB-MABR',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: '3GPP unicast',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: '3GPP unicast',
  },
  {
    id: 'TS 26.511',
    title: '5G Media Streaming (5GMS); Profiles, codecs and formats',
    url: 'https://www.3gpp.org/dynareport/26511.htm',
    layer: '3GPP unicast',
  },
  {
    id: 'TS 26.502',
    title: '5G multicast-broadcast services; User service architecture',
    url: 'https://www.3gpp.org/dynareport/26502.htm',
    layer: '3GPP broadcast',
    note: 'MBS',
  },
  {
    id: 'TS 23.247',
    title: 'Architectural enhancements for 5G multicast-broadcast services',
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
