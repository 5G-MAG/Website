// Specification catalogue for Beyond 2D Video.
//
// Merges the "Related 3GPP Work Items" and "Related 3GPP Technical Reports and
// Specifications" tables this page used to carry, plus the 5G Media Streaming
// specifications the study evaluates against, into one searchable table (see
// src/components/SpecIndex).
export const BEYOND_2D_SPECS = [
  {
    id: 'FS_Beyond2D',
    title: 'Feasibility Study on Beyond 2D Video (FS_Beyond2D)',
    url: 'https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240479.zip',
    layer: 'Work item',
    note: 'the work item that drove the study; the link downloads a .zip contribution package',
  },
  {
    id: 'TR 26.956',
    title: 'Evaluation and Characterization of Beyond 2D Video Formats and Codecs',
    url: 'https://www.3gpp.org/dynareport/26956.htm',
    layer: 'Technical report',
    note: 'the output of FS_Beyond2D, giving the evaluation and characterisation of the formats and codecs in scope',
  },
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: 'Delivery framework',
    note: 'the framework the formats are assessed against',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols and APIs',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: 'Delivery framework',
    note: 'the framework the formats are assessed against',
  },
  {
    // Added 2026-08-25: docs/home/testbeds/beyond-2d/index.mdx names this as
    // one of the specifications referenced by the testbed ("for delivery
    // evaluation"), but it was missing from this index even though
    // testbeds/beyond-2d/scope.mdx's own Related section calls the Standards
    // page "the full, maintained list" (findability audit).
    id: 'ISO/IEC 23000-19',
    title: 'Multimedia application format (MPEG-A) - Part 19: Common media application format (CMAF) for segmented media',
    url: 'https://www.iso.org/standard/85623.html',
    layer: 'Delivery framework',
    note: 'used for delivery evaluation alongside the 5GMS framework above',
  },
  {
    // Added 2026-08-25: the "Dynamic meshes" format family (docs/tech/
    // volumetric/beyond-2d.mdx and docs/home/testbeds/beyond-2d/scope.mdx,
    // both fixed in the same pass) names V-DMC, which was already on this
    // Standards page's own table (per its "Codecs and how they map to the
    // formats" table) but missing from this searchable index.
    id: 'ISO/IEC 23090-29',
    title: 'Coded representation of immersive media - Part 29: Video-based dynamic mesh coding (V-DMC)',
    url: 'https://www.iso.org/standard/85254.html',
    layer: 'Format',
    note: 'V3C-related; Edition 1 reached Final Draft International Standard (FDIS) stage and was in ISO\'s final publication steps as of mid-2026 -- confirm current status on the ISO catalogue page before relying on it',
  },
];

// Work item first, then the report it produced, the format spec it names,
// then the delivery framework the study evaluates the formats against.
export const BEYOND_2D_LAYER_ORDER = [
  'Work item',
  'Technical report',
  'Format',
  'Delivery framework',
];
