// Specification catalogue for the VOPS Conformance Validator. Only the specification the validator is built against;
// see src/components/SpecIndex.
export const VOPS_SPECS = [
  {
    id: 'TS 26.265',
    title: 'Media Delivery: Video Capabilities and Operation Points',
    url: 'https://www.3gpp.org/dynareport/26265.htm',
    layer: 'Specification',
    release: '19',
    note: 'defines the video operation points the validator checks bitstreams against; the validator is built against V19.2.0 (March 2026); V19.3.0 (September 2026) is the latest version',
  },
];

export const VOPS_LAYER_ORDER = ['Specification'];
