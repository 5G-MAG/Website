// Specification catalogue for Volumetric Video with MPEG V3C.
//
// Merges the "Specifications by role" bullet list and the "MPEG-I Standards"
// table this page used to carry into one searchable table (see
// src/components/SpecIndex). `layer` is the role each part plays in the V3C
// chain. The conformance and reference-software parts have no ISO catalogue
// link on the page, so they carry no `url` and render as plain identifiers.
export const V3C_SPECS = [
  {
    id: 'ISO/IEC 23090-5',
    title:
      'Information technology: Coded representation of immersive media - Part 5: Visual volumetric video-based coding (V3C) and video-based point cloud compression (V-PCC)',
    url: 'https://www.iso.org/standard/83535.html',
    layer: 'Coding',
    note: 'the V3C base bitstream and the V-PCC profile',
  },
  {
    id: 'ISO/IEC 23090-12',
    title:
      'Information technology - Coded representation of immersive media - Part 12: MPEG immersive video',
    url: 'https://www.iso.org/standard/79113.html',
    layer: 'Coding',
    note: 'the MIV profile, an extension of the V3C base',
  },
  {
    id: 'ISO/IEC 23090-10',
    title:
      'Information technology - Coded representation of immersive media - Part 10: Carriage of visual volumetric video-based coding data',
    url: 'https://www.iso.org/standard/78991.html',
    layer: 'Storage and carriage',
    note: 'ISOBMFF storage and DASH-based streaming',
  },
  {
    id: 'ISO/IEC 14496-12',
    title: 'ISO base media file format (ISOBMFF)',
    layer: 'Storage and carriage',
    note: 'the container ISO/IEC 23090-10 builds on',
  },
  {
    id: 'ISO/IEC 23090-20',
    title: 'Conformance testing for V3C with V-PCC',
    layer: 'Conformance and reference software',
  },
  {
    id: 'ISO/IEC 23090-25',
    title: 'Conformance and reference software for carriage',
    layer: 'Conformance and reference software',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: 'Delivery over 5G',
    note: 'used to transport V3C DASH presentations',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols and APIs',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: 'Delivery over 5G',
    note: 'used to transport V3C DASH presentations',
  },
];

// Follow the pipeline: code the volumetric data, store and carry it, test it,
// then deliver it over 5G.
export const V3C_LAYER_ORDER = [
  'Coding',
  'Storage and carriage',
  'Conformance and reference software',
  'Delivery over 5G',
];
