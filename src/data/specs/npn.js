// Specification catalogue for Non-Public Networks (NPN).
//
// Extracted from the per-heading bullet list this page used to carry, so it can
// be searched and filtered instead of scrolled (see src/components/SpecIndex).
// `layer` is the heading each specification sat under; `note` carries the NPN
// scope qualifier that followed the title.
export const NPN_SPECS = [
  {
    id: 'TS 22.263',
    title:
      'Service requirements for Video, Imaging and Audio for Professional Applications (VIAPA)',
    url: 'https://www.3gpp.org/dynareport/22263.htm',
    layer: 'Service requirements',
    note: 'the stage 1 requirements anchor most often cited when NPNs are discussed for broadcast use',
  },
  {
    id: 'TS 23.501',
    title: 'System Architecture for the 5G System',
    url: 'https://www.3gpp.org/dynareport/23501.htm',
    layer: 'System architecture',
    note: 'Non-Public Network aspects, clause 5.30',
  },
  {
    id: 'TS 23.502',
    title: 'Procedures for the 5G System',
    url: 'https://www.3gpp.org/dynareport/23502.htm',
    layer: 'System architecture',
    note: 'NPN procedures',
  },
  {
    id: 'TS 24.501',
    title: 'Non-Access-Stratum (NAS) protocol for 5GS; Stage 3',
    url: 'https://www.3gpp.org/dynareport/24501.htm',
    layer: 'Access and authentication',
    note: 'carries the SNPN-specific registration and authentication procedures (credential-owner vs. separate credential-holder models, SUCI handling)',
  },
  {
    id: 'TS 24.502',
    title: 'Access to the 3GPP 5G Core Network (5GCN) via non-3GPP access networks; Stage 3',
    url: 'https://www.3gpp.org/dynareport/24502.htm',
    layer: 'Access and authentication',
  },
  {
    id: 'TS 33.501',
    title: 'Security architecture for 5GS',
    url: 'https://www.3gpp.org/dynareport/33501.htm',
    layer: 'Access and authentication',
    note: 'NPN security aspects',
  },
  {
    id: 'TR 23.700-07',
    title: 'Study on enhanced support of Non-Public Networks',
    url: 'https://www.3gpp.org/dynareport/23700-07.htm',
    layer: 'Studies',
    release: '17',
  },
];

// Requirements first, then the architecture they drive, then the stage 3 access
// procedures, with the study that fed them last.
export const NPN_LAYER_ORDER = [
  'Service requirements',
  'System architecture',
  'Access and authentication',
  'Studies',
];
