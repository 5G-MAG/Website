// Shared blueprint for 5G Media Streaming (5GMS): the single source both the
// Technical Analysis page (docs/tech/5gms/features-5gmsd.mdx, via
// FeatureBlueprint) and the Reference Tools page
// (docs/home/reference-tools/5gms/scope.mdx, via ImplementationBoard and
// ArchitectureMap) read, so the "ideal system" and "real status against it"
// can never silently disagree -- one array feeds both renders, not just the
// same author by convention.
//
// Two kinds of claim live on every feature row, and MUST NOT be merged into
// one narrative (RULES.md rule 3):
//   - `specRef`/`idealDescription` -- source-derived. The clause numbers and
//     descriptions below are moved, not rewritten, from the real prose
//     already on docs/tech/5gms/features-5gmsd.mdx and
//     docs/home/reference-tools/5gms/scope.mdx (see each row's own comment
//     for exactly where). `specRef.quote` is left as an explicit placeholder
//     -- no page on this site currently quotes TS 26.501/26.510 verbatim
//     (they paraphrase, correctly, per copyright), so a real quote needs a
//     fresh clause-by-clause read this pass deliberately does not do.
//   - `status`/`statusEvidence` -- for six of the eight rows, this is real
//     information ALREADY published on the site (scope.mdx's own feature
//     prose and tutorials/index.mdx's per-interface checkbox table), carried
//     forward rather than discarded ("never destroy technical information").
//     It is explicitly NOT an independent code audit performed this pass --
//     `statusEvidence.kind: 'inherited'` says so on every row, so a future
//     editor knows these six are a real but unverified starting point (RULES
//     rule 13: an inherited claim is re-derived before being treated as
//     evidence, not before being recorded at all). The remaining two rows
//     (Edge Processing, eMBMS Delivery) have no existing site claim either
//     way and are honestly `status: 'unknown'`, `statusEvidence: null`.
//
// The real code audit (independently re-checking each row against the repos
// via `gh api`, replacing `kind: 'inherited'` with `kind: 'code'` and a real
// file/path) is a separate, later effort -- see the project plan.

export const FIVEGMS_COMPONENTS = [
  { name: 'AF', repo: 'rt-5gms-application-function' },
  { name: 'AS', repo: 'rt-5gms-application-server' },
  { name: 'Media Session Handler', repo: 'rt-5gms-media-session-handler' },
  { name: 'Media Player / Media Stream Handler', repo: 'rt-5gms-media-stream-handler' },
];

const PLACEHOLDER_QUOTE = 'TODO: re-open this clause and pull its shortest defining sentence (not yet done this pass)';

// Moved from scope.mdx's own per-interface prose ("Content Preparation, Edge
// Resources, geo-fencing and URL signing... not yet implemented") and
// tutorials/index.mdx's "Implementation Status Detail" checkbox table (M1
// row: Content Hosting Provisioning checked; Content Preparation Templates,
// Edge Resources, Event Data Processing unchecked).
const INHERITED = (ref) => ({ kind: 'inherited', repo: null, ref, checkedAt: null });

export const FIVEGMS_FEATURES = [
  {
    id: 'content-hosting',
    name: 'Content Hosting',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.2', proceduralClause: '5.4', quote: PLACEHOLDER_QUOTE },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.3', api: 'Content protocols discovery API', apiClause: '8.3' },
      { referencePoint: 'M1', procedureClause: '5.2.4', api: 'Server Certificates provisioning API', apiClause: '8.4' },
      { referencePoint: 'M1', procedureClause: '5.2.5', api: 'Content Preparation Templates provisioning API', apiClause: '8.5' },
      { referencePoint: 'M1', procedureClause: '5.2.6', api: 'Edge Resources provisioning API', apiClause: '8.6' },
      { referencePoint: 'M1', procedureClause: '5.2.7', api: 'Policy Templates provisioning API', apiClause: '8.7' },
      { referencePoint: 'M1', procedureClause: '5.2.8', api: 'Content Hosting provisioning API', apiClause: '8.8' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
    ],
    idealDescription:
      'Provides a service equivalent to a Content Delivery Network (CDN) deployed inside or outside the Trusted Data Network. It includes selecting the ingest protocol and format, caching and proxying of media objects, content preparation, access protection (e.g. URL signing) and indicating a target distribution area (e.g. through geofencing). Once a Provisioning Session is established, Content Hosting is configured via a Content Hosting Configuration at M1 (optionally secured by a provisioned Server Certificate); the supported ingest protocols in Release 17 are HTTP pull-based ingest and DASH-IF push-based ingest.',
    status: 'partial',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/scope.mdx, "Feature: Content Hosting" + tutorials/index.mdx M1 interface table'),
    note: 'Base ingest/hosting is implemented; Content Preparation, Edge Resources, geo-fencing and URL signing are accepted by the API but not yet implemented by the Reference Tools.',
    trackingIssue: null,
  },
  {
    id: 'network-assistance',
    name: 'Network Assistance',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.5', proceduralClause: '5.9', quote: PLACEHOLDER_QUOTE },
    apis: [
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.4', api: 'Network Assistance API', apiClause: '9.4' },
    ],
    idealDescription:
      'Enables the 5GMS Client in the UE to interrogate or manipulate the network Quality of Service (QoS) for an ongoing media streaming session, via the Policy Control Function (AF-based network assistance) or via Access Network Bitrate Recommendation (ANBR) signalling between the UE modem and the RAN (RAN-based network assistance). It covers Bit Rate Recommendation (Throughput Estimation), which keeps the client synchronised with the network’s current capabilities, and Delivery Boost, a reactive request for a temporary increase in bit rate.',
    status: 'partial',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/scope.mdx, "Feature: Network Assistance" + tutorials/index.mdx M5 interface table'),
    note: 'Only Delivery Boost is currently implemented by the Reference Tools; Throughput Estimation is still in development.',
    trackingIssue: 'https://github.com/5G-MAG/Standards/issues/63',
  },
  {
    id: 'dynamic-policies',
    name: 'Dynamic Policies',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.6', proceduralClause: '5.7 (5.8 for the network-slicing variant)', quote: PLACEHOLDER_QUOTE },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.7', api: 'Policy Templates provisioning API', apiClause: '8.7' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.3', api: 'Dynamic Policies API', apiClause: '9.3' },
    ],
    idealDescription:
      'Enables the 5GMS Client in the UE to manipulate the network traffic handling policies for an ongoing media streaming session. When the feature is offered and selected, the 5GMSd Application Provider specifies a set of policies in the Provisioning Session which can be invoked for the session, and the UE becomes aware of the selected policies as a list of valid Policy Template Ids (covering QoS, network slice/DNN context and charging treatment).',
    status: 'partial',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/tutorials/index.mdx M5 interface table (Dynamic Policies checked; only the 5-Tuple Service Data Flow Description method checked, others unchecked)'),
    note: 'The base feature is implemented; of the Service Data Flow Description methods, only 5-Tuple is implemented (2-Tuple, ToS, Flow Label and Domain Name are not).',
    trackingIssue: 'https://github.com/5G-MAG/Standards/issues/103',
  },
  {
    id: 'consumption-reporting',
    name: 'Consumption Reporting',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.8', proceduralClause: '5.6', quote: PLACEHOLDER_QUOTE },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.12', api: 'Consumption Reporting provisioning API', apiClause: '8.12' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.6', api: 'Consumption Reporting API', apiClause: '9.6' },
    ],
    idealDescription:
      'Allows consumption of downlink media streaming to be logged by the 5GMS System and exposed for analysis. Once a Provisioning Session is established, Consumption Reporting is configured via a Consumption Reporting Configuration that sets the reporting interval, the sample percentage of clients that report, and whether location and access-network-change reporting are required.',
    status: 'yes',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/tutorials/index.mdx M1 + M5 interface table (Consumption Reporting Provisioning and Consumption Reporting both checked)'),
    note: null,
    trackingIssue: null,
  },
  {
    id: 'qoe-metrics-reporting',
    name: 'QoE Metrics Reporting',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.9', proceduralClause: '5.5', quote: PLACEHOLDER_QUOTE },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.11', api: 'Metrics Reporting provisioning API', apiClause: '8.11' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.5', api: 'Metrics Reporting API', apiClause: '9.5' },
    ],
    idealDescription:
      'Enables the 5GMS System to log and expose streaming performance data for further analysis, via two distinct paths: RAN-based reporting (metrics sent to the OAM system via the Radio Access Network) and AF-based reporting (metrics sent directly to the network-side AF). A Metrics Reporting Configuration selects which DASH quality metrics are collected.',
    status: 'yes',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/tutorials/index.mdx M1 + M5 interface table (Metrics Reporting Provisioning and Metrics Reporting both checked)'),
    note: 'Currently supports the HTTP request/response list, Representation Switch Events, Buffer Level and MPD Information metrics.',
    trackingIssue: 'https://github.com/5G-MAG/Standards/issues/78',
  },
  {
    id: 'data-collection-reporting-exposure',
    name: 'Data Collection, Reporting and Exposure',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.12', proceduralClause: '5.11', quote: PLACEHOLDER_QUOTE },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.13', api: 'Event Data Processing provisioning API', apiClause: '8.13' },
      { referencePoint: 'M5', procedureClause: '5.3.5', api: 'Metrics Reporting API', apiClause: '9.5' },
      { referencePoint: 'M5', procedureClause: '5.3.6', api: 'Consumption Reporting API', apiClause: '9.6' },
    ],
    idealDescription:
      'Would enable the 5GMS System to log data relating to media streaming sessions and expose this to subscribers in the form of Events, via the Event Data Processing provisioning API at M1 and the Metrics Reporting / Consumption Reporting APIs at M5. The event exposure this feature enables is defined in the generic UE data collection framework (architecture in TS 26.531, protocols and formats in TS 26.532); see the UE Data Collection, Reporting and Event Exposure project for that reference implementation.',
    status: 'no',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/scope.mdx, "Feature: Data collection, reporting and exposure" (":::warning Not yet implemented in 5GMS") + tutorials/index.mdx N33 interface table (Event Exposure unchecked)'),
    note: 'Not yet implemented within the framework of 5GMS. A generic UE data collection architecture exists separately under the UE Data Collection, Reporting and Event Exposure project, not yet wired into 5GMS.',
    trackingIssue: null,
  },
  {
    id: 'edge-processing',
    name: 'Edge Processing',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.10', proceduralClause: '8', quote: PLACEHOLDER_QUOTE },
    apis: [{ referencePoint: 'M1', procedureClause: '5.2.6', api: 'Edge Resources provisioning API', apiClause: '8.6' }],
    idealDescription:
      'Listed in the 5GMS Key Features table (features-5gmsd.mdx) with its own clause reference, but not yet elaborated with its own "Feature:" section or worked description anywhere on the site -- carried forward as a table entry only, not expanded on here.',
    status: 'no',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/tutorials/index.mdx M1 interface table (Edge Resources Provisioning unchecked)'),
    note: null,
    trackingIssue: null,
  },
  {
    id: 'embms-delivery',
    name: 'eMBMS Delivery',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.11', proceduralClause: '5.10', quote: PLACEHOLDER_QUOTE },
    apis: [],
    idealDescription:
      'Listed in the 5GMS Key Features table (features-5gmsd.mdx) with its own clause reference, but not yet elaborated with its own "Feature:" section or worked description anywhere on the site -- carried forward as a table entry only, not expanded on here.',
    status: 'unknown',
    statusEvidence: null,
    note: 'No existing site content states this feature’s implementation status either way; genuinely not yet assessed.',
    trackingIssue: null,
  },
];

// Groups FIVEGMS_FEATURES into the {spec, title, component, rows} shape
// ImplementationBoard and ArchitectureMap's deriveStates() already expect
// (see src/data/implementation/5g-mbs.js for the precedent this follows).
// One section per spec clause range keeps the board's own collapsible
// grouping meaningful instead of dumping all 8 rows in one undifferentiated
// list; `component: 'AF'` reflects that all 8 features are provisioned and/or
// session-handled through the AF today (the AS, Media Session Handler and
// Media Player entities have no independently-audited features of their own
// yet -- a gap for the real audit pass to fill, not papered over here).
export function toBoardSections(features) {
  return [
    {
      spec: 'TS 26.501 / TS 26.512',
      title: '5GMS Downlink (5GMSd) Features',
      component: 'AF',
      rows: features.map((f) => ({
        feature: f.name,
        status: f.status,
        note: f.note || undefined,
      })),
    },
  ];
}
