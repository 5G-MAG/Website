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
];

// Work item first, then the report it produced, then the delivery framework
// the study evaluates the formats against.
export const BEYOND_2D_LAYER_ORDER = ['Work item', 'Technical report', 'Delivery framework'];
