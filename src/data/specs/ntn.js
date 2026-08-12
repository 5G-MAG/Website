// Specification catalogue for Non-Terrestrial Networks (NTN).
//
// Extracted from the "Key 3GPP Specifications" bullet outline this page used to
// carry, so it can be searched and filtered instead of scrolled (see
// src/components/SpecIndex). `layer` is the sub-heading each specification sat
// under; `note` carries the scope qualifier that used to sit in a parenthetical.
// `release` is set only where the page stated a single release explicitly.
//
// The "Specifications by Role" table on the page is deliberately NOT part of
// this list: it is an analytical grouping (which part of the system each spec
// governs, including the non-3GPP ETSI TS 103 720) and stays a markdown table.
export const NTN_SPECS = [
  {
    id: 'TR 38.811',
    title: 'Study on New Radio (NR) to support Non-Terrestrial Networks',
    url: 'https://www.3gpp.org/dynareport/38811.htm',
    layer: 'NR for NTN',
    release: '15',
  },
  {
    id: 'TR 38.821',
    title: 'Solutions for NR to support Non-Terrestrial Networks (NTN)',
    url: 'https://www.3gpp.org/dynareport/38821.htm',
    layer: 'NR for NTN',
    release: '16',
  },
  {
    id: 'TS 38.331',
    title: 'NR; Radio Resource Control (RRC) protocol specification',
    url: 'https://www.3gpp.org/dynareport/38331.htm',
    layer: 'NR for NTN',
    note: 'carries the NTN system information, including SIB19',
  },
  {
    id: 'TS 38.300',
    title: 'NR; NR and NG-RAN Overall description; Stage 2',
    url: 'https://www.3gpp.org/dynareport/38300.htm',
    layer: 'NR for NTN',
  },
  {
    id: 'TR 38.863',
    title: 'Non-terrestrial networks (NTN) related RF and co-existence aspects',
    url: 'https://www.3gpp.org/dynareport/38863.htm',
    layer: 'NR for NTN',
    release: '17',
  },
  {
    id: 'TR 22.822',
    title: 'Study on using Satellite Access in 5G',
    url: 'https://www.3gpp.org/dynareport/22822.htm',
    layer: 'System architecture',
    note: 'Stage 1',
  },
  {
    id: 'TR 23.737',
    title: 'Study on architecture aspects for using satellite access in 5G',
    url: 'https://www.3gpp.org/dynareport/23737.htm',
    layer: 'System architecture',
    note: 'Stage 2, Rel-16/17',
  },
  {
    id: 'TS 23.501',
    title: 'System architecture for the 5G System (5GS)',
    url: 'https://www.3gpp.org/dynareport/23501.htm',
    layer: 'System architecture',
  },
  {
    id: 'TS 23.502',
    title: 'Procedures for the 5G System (5GS)',
    url: 'https://www.3gpp.org/dynareport/23502.htm',
    layer: 'System architecture',
  },
  {
    id: 'TS 23.247',
    title: 'Architectural enhancements for 5G multicast-broadcast services',
    url: 'https://www.3gpp.org/dynareport/23247.htm',
    layer: 'MBS over NTN',
  },
  {
    id: 'TS 26.502',
    title: '5G multicast-broadcast services; User service architecture',
    url: 'https://www.3gpp.org/dynareport/26502.htm',
    layer: 'MBS over NTN',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: 'MBS over NTN',
  },
];

// Order the filter chips bottom-up through the stack: the NR radio adaptations
// first, then the system architecture they plug into, then the multicast
// service layer carried over the resulting satellite path.
export const NTN_LAYER_ORDER = ['NR for NTN', 'System architecture', 'MBS over NTN'];
