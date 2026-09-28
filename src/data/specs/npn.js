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
    id: 'TS 22.261',
    title: 'Service requirements for the 5G system',
    url: 'https://www.3gpp.org/dynareport/22261.htm',
    layer: 'Service requirements',
    note: 'general stage 1 NPN requirements (SNPN/PNI-NPN service continuity, access to subscribed PLMN services via the NPN) that TS 22.263 builds its VIAPA-specific case on top of',
  },
  {
    id: 'TS 23.501',
    title: 'System architecture for the 5G System (5GS)',
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
    title: 'Security architecture and procedures for 5G System',
    url: 'https://www.3gpp.org/dynareport/33501.htm',
    layer: 'Access and authentication',
    note: 'NPN security aspects',
  },
  {
    id: 'TR 28.807',
    title: 'Study on management of Non-Public Networks (NPN)',
    url: 'https://www.3gpp.org/dynareport/28807.htm',
    layer: 'Management',
    release: '17',
    note: 'SA5, work item FS_OAM_NPN; fed TS 28.557',
  },
  {
    id: 'TS 28.557',
    title: 'Management and orchestration; Management of Non-Public Networks (NPN); Stage 1 and stage 2',
    url: 'https://www.3gpp.org/dynareport/28557.htm',
    layer: 'Management',
    note: 'SA5, rolling since Release 16, now being extended by TR 28.907',
  },
  {
    id: 'TR 28.907',
    title: 'Study on enhancement of management of non-public networks',
    url: 'https://www.3gpp.org/dynareport/28907.htm',
    layer: 'Management',
    note: 'SA5 with SA2 involvement, active across Release 18 and 19',
  },
  {
    id: 'TR 23.700-07',
    title: 'Study on enhanced support of Non-Public Networks (NPN)',
    url: 'https://www.3gpp.org/dynareport/23700-07.htm',
    layer: 'Studies',
    release: '17',
  },
  {
    id: 'TR 33.857',
    title: 'Study on enhanced security support for Non-Public Networks (NPN)',
    url: 'https://www.3gpp.org/dynareport/33857.htm',
    layer: 'Studies',
    release: '17',
    note: 'SA3; behind the Rel-17 UE onboarding, remote provisioning and Credentials Holder support features',
  },
  {
    id: 'TR 26.805',
    title: 'Study on Media Production over 5G NPN Systems',
    url: 'https://www.3gpp.org/dynareport/26805.htm',
    layer: 'Studies',
    release: '17',
    note: 'SA4; directly on-theme for 5G-MAG media/broadcast tracking',
  },
  {
    id: 'TR 23.700-08',
    title: 'Study on enhanced support of Non-Public Networks; Phase 2',
    url: 'https://www.3gpp.org/dynareport/23700-08.htm',
    layer: 'Studies',
    release: '18',
    note: 'SA2 phase 2 successor to TR 23.700-07',
  },
  {
    id: 'TR 33.858',
    title: 'Study on security aspects of enhanced support of Non-Public Networks (NPN) phase 2',
    url: 'https://www.3gpp.org/dynareport/33858.htm',
    layer: 'Studies',
    release: '18',
    note: 'SA3 companion to TR 23.700-08',
  },
  {
    id: 'TR 33.757',
    title: 'Study on security for a PLMN hosting a Non-Public Network (NPN)',
    url: 'https://www.3gpp.org/dynareport/33757.htm',
    layer: 'Studies',
    release: '19',
    note: 'SA3 (SA1 secondary); the confirmed Release-19 NPN-specific study, securing the boundary where a PLMN hosts a PNI-NPN',
  },
];

// Requirements first, then the architecture they drive, then the stage 3 access
// procedures, then the SA5 management track, with the studies that fed them last.
export const NPN_LAYER_ORDER = [
  'Service requirements',
  'System architecture',
  'Access and authentication',
  'Management',
  'Studies',
];
