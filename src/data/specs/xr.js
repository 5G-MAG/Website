// Specification catalogue for XR and MPEG-I Scene Description.
//
// Extracted from the seven separate MPEG/3GPP tables this page used to carry, so
// the whole set can be searched and filtered in one place instead of scrolled
// (see src/components/SpecIndex). `layer` is the sub-heading each deliverable
// used to sit under; `note` carries the status and working group that used to
// occupy their own table columns, plus any scope qualifier.
export const XR_SPECS = [
  {
    id: 'ISO/IEC 23090-14:2023',
    title:
      'Information technology - Coded representation of immersive media - Part 14: Scene description',
    url: 'https://www.iso.org/standard/80900.html',
    layer: 'MPEG',
    note: 'extended by Amendment 1, which is consolidated into a second edition (ISO/IEC 23090-14:2025); Amendment 2 (avatar support) is still a separate, not-yet-published Draft Amendment, not part of that edition -- see src/data/specs/avatar.js for that citation',
  },
  {
    // Added 2026-08-25: docs/tech/xr.mdx's own "Key specifications" line names
    // this as OMAFv2 alongside 23090-14, but it was missing from this index
    // even though standards/xr.mdx calls this page "the full, maintained
    // specification list" (findability audit).
    id: 'ISO/IEC 23090-2:2023',
    title:
      'Information technology - Coded representation of immersive media - Part 2: Omnidirectional media format',
    url: 'https://www.iso.org/standard/84636.html',
    layer: 'MPEG',
    note: 'third edition; the multi-viewpoint/overlay/tiling feature set this site calls OMAFv2 was introduced in the second edition (2021) and carried into this one',
  },
  {
    // Added 2026-08-25: docs/tech/xr.mdx names this alongside 23090-14 as a
    // "Key specification" for the scene's own media content, and
    // standards/xr.mdx's own "Scene and media formats (MPEG)" table row
    // already names it -- same completeness gap as ISO/IEC 23090-2 above.
    id: 'ISO/IEC 23090-5',
    title:
      'Information technology: Coded representation of immersive media - Part 5: Visual volumetric video-based coding (V3C) and video-based point cloud compression (V-PCC)',
    url: 'https://www.iso.org/standard/83535.html',
    layer: 'MPEG',
    note: 'shared with the MPEG V3C Immersive Platform reference tools; see src/data/specs/v3c.js for the same citation',
  },
  {
    // Added 2026-08-25: standards/xr.mdx's own "Delivery (3GPP SA4)" table
    // row and prose both name these three (5GMS architecture/protocols,
    // RTC) as relevant to XR delivery, but none were in this index --
    // same completeness gap as the two MPEG entries above.
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: 'Delivery',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: 'Delivery',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.506',
    title: '5G Real-time Media Communication Architecture (Stage 2)',
    url: 'https://www.3gpp.org/dynareport/26506.htm',
    layer: 'Delivery',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 23.700-23',
    title: 'Study on Application enabler for XR Services',
    url: 'https://www.3gpp.org/dynareport/23700-23.htm',
    layer: 'Use cases',
    note: 'Draft; WG S6',
  },
  {
    id: 'TR 23.700-60',
    title: 'Study on XR (Extended Reality) and media services',
    url: 'https://www.3gpp.org/dynareport/23700-60.htm',
    layer: 'Use cases',
    note: 'Under change control; WG S2',
  },
  {
    id: 'TR 23.700-70',
    title:
      'Study on architecture enhancement for Extended Reality and Media service (XRM); Phase 2',
    url: 'https://www.3gpp.org/dynareport/23700-70.htm',
    layer: 'Use cases',
    note: 'Draft; WG S2',
  },
  {
    id: 'TR 26.862',
    title:
      'Immersive Teleconferencing and Telepresence for Remote Terminals (ITT4RT) Use Cases, Requirements and Potential Solutions',
    url: 'https://www.3gpp.org/dynareport/26862.htm',
    layer: 'Use cases',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 26.928',
    title: 'Extended Reality (XR) in 5G',
    url: 'https://www.3gpp.org/dynareport/26928.htm',
    layer: 'Use cases',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 26.930',
    title: 'Study on the enhancement for Immersive Real-Time communication for WebRTC',
    url: 'https://www.3gpp.org/dynareport/26930.htm',
    layer: 'Use cases',
    note: 'Draft; WG S4',
  },
  {
    id: 'TR 26.998',
    title: 'Support of 5G glass-type Augmented Reality / Mixed Reality (AR/MR) devices',
    url: 'https://www.3gpp.org/dynareport/26998.htm',
    layer: 'Use cases',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 38.835',
    title: 'Study on XR enhancements for NR',
    url: 'https://www.3gpp.org/dynareport/38835.htm',
    layer: 'Radio',
    note: 'Under change control; WG R2',
  },
  {
    id: 'TR 38.838',
    title: 'Study on XR (Extended Reality) evaluations for NR',
    url: 'https://www.3gpp.org/dynareport/38838.htm',
    layer: 'Radio',
    note: 'Under change control; WG R1',
  },
  {
    id: 'TS 26.249',
    title:
      'Immersive Audio for Split Rendering Scenarios; Detailed Algorithmic Description of Split Rendering Functions',
    url: 'https://www.3gpp.org/dynareport/26249.htm',
    layer: 'Split rendering',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 26.865',
    title: 'Immersive Audio for Split Rendering Scenarios; Requirements',
    url: 'https://www.3gpp.org/dynareport/26865.htm',
    layer: 'Split rendering',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.119',
    title: 'Media Capabilities for Augmented Reality',
    url: 'https://www.3gpp.org/dynareport/26119.htm',
    layer: 'Media capabilities',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.143',
    title: 'Messaging Media profiles',
    url: 'https://www.3gpp.org/dynareport/26143.htm',
    layer: 'Media capabilities',
    note: 'Draft; WG S4',
  },
  {
    id: 'TS 26.565',
    title: 'Split Rendering Media Service Enabler',
    url: 'https://www.3gpp.org/dynareport/26565.htm',
    layer: 'Media capabilities',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.250',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); General overview',
    url: 'https://www.3gpp.org/dynareport/26250.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.251',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); C code (fixed-point)',
    url: 'https://www.3gpp.org/dynareport/26251.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.252',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Test sequences',
    url: 'https://www.3gpp.org/dynareport/26252.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.253',
    title:
      'Codec for Immersive Voice and Audio Services (IVAS); Detailed Algorithmic Description including RTP payload format and SDP parameter definitions',
    url: 'https://www.3gpp.org/dynareport/26253.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.254',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Rendering',
    url: 'https://www.3gpp.org/dynareport/26254.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.255',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Error concealment of lost packets',
    url: 'https://www.3gpp.org/dynareport/26255.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.256',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Jitter Buffer Management',
    url: 'https://www.3gpp.org/dynareport/26256.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.258',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); C code (floating-point)',
    url: 'https://www.3gpp.org/dynareport/26258.htm',
    layer: 'Codecs',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.259',
    title: 'Subjective test methodologies for the evaluation of immersive audio systems',
    url: 'https://www.3gpp.org/dynareport/26259.htm',
    layer: 'Testing',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.260',
    title: 'Objective test methodologies for the evaluation of immersive audio systems',
    url: 'https://www.3gpp.org/dynareport/26260.htm',
    layer: 'Testing',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TS 26.261',
    title: 'Terminal audio quality performance requirements for immersive audio services',
    url: 'https://www.3gpp.org/dynareport/26261.htm',
    layer: 'Testing',
    note: 'Draft; WG S4',
  },
  {
    id: 'TS 26.566',
    title: 'Immersive Audio for Split Rendering Scenarios',
    url: 'https://www.3gpp.org/dynareport/26566.htm',
    layer: 'Testing',
    note: 'Draft; WG S4',
  },
  {
    id: 'TR 26.861',
    title: 'Investigations on test methodologies for immersive audio systems',
    url: 'https://www.3gpp.org/dynareport/26861.htm',
    layer: 'Testing',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 26.866',
    title: 'Immersive Audio for Split Rendering Scenarios; Performance characterization',
    url: 'https://www.3gpp.org/dynareport/26866.htm',
    layer: 'Testing',
    note: 'Draft; WG S4',
  },
  {
    id: 'TR 26.926',
    title: 'Traffic Models and Quality Evaluation Methods for Media and XR Services in 5G Systems',
    url: 'https://www.3gpp.org/dynareport/26926.htm',
    layer: 'Testing',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 26.996',
    title: 'Immersive Audio for Split Rendering Scenarios; Performance characterization',
    url: 'https://www.3gpp.org/dynareport/26996.htm',
    layer: 'Testing',
    note: 'Under change control; WG S4',
  },
  {
    id: 'TR 26.997',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Performance characterization',
    url: 'https://www.3gpp.org/dynareport/26997.htm',
    layer: 'Testing',
    note: 'Under change control; WG S4',
  },
];

// Order the filter chips by where each group sits in the XR stack, rather than
// alphabetically or by how many deliverables happen to be in each.
export const XR_LAYER_ORDER = [
  'MPEG',
  'Delivery',
  'Use cases',
  'Radio',
  'Split rendering',
  'Media capabilities',
  'Codecs',
  'Testing',
];
