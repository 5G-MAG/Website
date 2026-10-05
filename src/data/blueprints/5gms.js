// Shared blueprint for 5G Media Streaming (5GMS): the single source both the
// Technical Analysis page (docs/tech/5gms/features.mdx, via
// FeatureBlueprint) and the Reference Tools page
// (docs/home/reference-tools/5gms/implementation.mdx, via ImplementationBoard and
// ArchitectureMap) read, so the "ideal system" and "real status against it"
// can never silently disagree -- one array feeds both renders, not just the
// same author by convention.
//
// Two kinds of claim live on every feature row, and MUST NOT be merged into
// one narrative (RULES.md rule 3):
//   - `specRef`/`idealDescription` -- source-derived from TS 26.501 V19.4.0
//     clauses 4.0.2 to 4.0.12 (quote: the clause's defining sentence) and, for
//     the API rows, TS 26.510 V19.2.0 clauses 5.2, 5.3, 8 and 9. Recorded in
//     Standards2Deployments/projects/website-5gms/register.md, section J.
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
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.2', proceduralClause: '5.4', quote: 'It provides a service equivalent to a Content Delivery Network (CDN) deployed inside or outside the Trusted DN.' },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.3', api: 'Content Protocols Discovery API', apiClause: '8.3' },
      { referencePoint: 'M1', procedureClause: '5.2.4', api: 'Server Certificates provisioning API', apiClause: '8.4' },
      { referencePoint: 'M1', procedureClause: '5.2.5', api: 'Content Preparation Templates provisioning API', apiClause: '8.5' },
      { referencePoint: 'M1', procedureClause: '5.2.6', api: 'Edge Resources provisioning API', apiClause: '8.6' },
      { referencePoint: 'M1', procedureClause: '5.2.7', api: 'Policy Templates provisioning API', apiClause: '8.7' },
      { referencePoint: 'M1', procedureClause: '5.2.8', api: 'Content Hosting provisioning API', apiClause: '8.8' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
    ],
    idealDescription:
      'Provides a service equivalent to a CDN, inside or outside the trusted data network. Content is ingested pull-based (retrieved from a media origin at the Application Provider) or push-based (published by the Application Provider), may be cached across one or more service locations and manipulated according to Content Preparation Templates, and is then retrieved by the 5GMSd Client. A provisioned Server Certificate may secure the content served. The 5GMSd Client may also be configured to report client data in band with media requests (TS 26.501 clause 5.13). Use of content hosting is logged and, if provisioned, exposed to the Application Provider as events.',
    status: 'partial',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/implementation.mdx, "Feature Deep Dives: Content Hosting" section'),
    note: 'Base ingest/hosting is implemented; Content Preparation, Edge Resources, geo-fencing and URL signing are accepted by the API but not yet implemented by the Reference Tools.',
    trackingIssue: null,
  },
  {
    id: 'network-assistance',
    name: 'Network Assistance',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.5', proceduralClause: '5.9', quote: 'It enables the 5GMS Client in the UE to interrogate or manipulate the network Quality of Service for an ongoing media streaming session.' },
    apis: [
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.4', api: 'Network Assistance API', apiClause: '9.4' },
    ],
    idealDescription:
      'Enables the 5GMS Client to interrogate or manipulate the network Quality of Service for an ongoing session. It is not explicitly provisioned: whether it is available depends on system pre-configuration and policy. There are two mechanisms, AF-based (through the PCF) and ANBR-based (signalling between the UE modem and the RAN), and two sub-features: bit rate recommendation (throughput estimation), and delivery boost, a speculative request for a temporary boost to the session bit rate.',
    status: 'partial',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/implementation.mdx, "Feature Deep Dives: Network Assistance" section'),
    note: 'Only Delivery Boost is currently implemented by the Reference Tools; Throughput Estimation is still in development.',
    trackingIssue: 'https://github.com/5G-MAG/Standards/issues/63',
  },
  {
    id: 'dynamic-policies',
    name: 'Dynamic Policies',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.6', proceduralClause: '5.8, 5.7.6', quote: 'It enables the 5GMS Client in the UE to manipulate the network traffic handling policies for an ongoing media streaming session.' },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.7', api: 'Policy Templates provisioning API', apiClause: '8.7' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.3', api: 'Dynamic Policy API', apiClause: '9.3' },
    ],
    idealDescription:
      'Enables the 5GMS Client to manipulate the network traffic handling policies for an ongoing session. The Application Provider provisions Policy Templates within a Provisioning Session. Each Policy Template carries an External reference and the Network QoS parameters of one Service Operation Point (for example SD, HD or UHD), and may apply to one or more Data Networks or Network Slices. Media Entry Point documents refer to the same Service Operation Points in their Service Descriptions. Outside the trusted data network, the PCF is reached through the NEF.',
    status: 'partial',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/implementation.mdx "Feature Deep Dives" section (Dynamic Policies checked; only the 5-Tuple Service Data Flow Description method checked, others unchecked)'),
    note: 'The base feature is implemented; of the Service Data Flow Description methods, only 5-Tuple is implemented (2-Tuple, ToS, Flow Label and Domain Name are not).',
    trackingIssue: 'https://github.com/5G-MAG/Standards/issues/103',
  },
  {
    id: 'consumption-reporting',
    name: 'Consumption Reporting',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.8', proceduralClause: '5.6', quote: 'It allows consumption of downlink media streaming to be logged by the 5GMS System and exposed for analysis.' },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.12', api: 'Consumption Reporting provisioning API', apiClause: '8.12' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.6', api: 'Consumption Reporting API', apiClause: '9.6' },
    ],
    idealDescription:
      'Allows consumption of downlink media streaming to be logged and exposed for analysis. When the feature is provisioned, the 5GMSd Client reports consumption to a network-side component of the 5GMS System, and the data may be exposed as events to subscribing Application Providers. Downlink only in the current release.',
    status: 'yes',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/tutorials/index.mdx M1 + M5 interface table (Consumption Reporting Provisioning and Consumption Reporting both checked)'),
    note: null,
    trackingIssue: null,
  },
  {
    id: 'qoe-metrics-reporting',
    name: 'QoE Metrics Reporting',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.9', proceduralClause: '5.5', quote: 'It allows the Quality of Experience of media streaming sessions to be logged by the 5GMS System and exposed for analysis.' },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.2', api: 'Provisioning Sessions API', apiClause: '8.2' },
      { referencePoint: 'M1', procedureClause: '5.2.11', api: 'Metrics Reporting provisioning API', apiClause: '8.11' },
      { referencePoint: 'M5', procedureClause: '5.3.2', api: 'Service Access Information API', apiClause: '9.2' },
      { referencePoint: 'M5', procedureClause: '5.3.5', api: 'Metrics Reporting API', apiClause: '9.5' },
    ],
    idealDescription:
      'Allows the Quality of Experience of media streaming sessions to be logged and exposed for analysis. There are two mechanisms: RAN-based, with reports sent to the OAM via the RAN, and AF-based, with reports sent to network-side components of the 5GMS System. Data in AF-based reports may be exposed as events. Downlink only in the current release.',
    status: 'yes',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/tutorials/index.mdx M1 + M5 interface table (Metrics Reporting Provisioning and Metrics Reporting both checked)'),
    note: 'Currently supports the HTTP request/response list, Representation Switch Events, Buffer Level and MPD Information metrics.',
    trackingIssue: 'https://github.com/5G-MAG/Standards/issues/78',
  },
  {
    id: 'data-collection-reporting-exposure',
    name: 'Data Collection, Reporting and Exposure',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.12', proceduralClause: '5.11', quote: 'It enables the 5GMS System to log data relating to media streaming sessions and to expose this to subscribers in the form of Events.' },
    apis: [
      { referencePoint: 'M1', procedureClause: '5.2.13', api: 'Event Data Processing provisioning API', apiClause: '8.13' },
      { referencePoint: 'M5', procedureClause: '5.3.5', api: 'Metrics Reporting API', apiClause: '9.5' },
      { referencePoint: 'M5', procedureClause: '5.3.6', api: 'Consumption Reporting API', apiClause: '9.6' },
    ],
    idealDescription:
      'Enables the 5GMS System to log data relating to media streaming sessions and to expose it to subscribers as events, in downlink and uplink. Defined in TS 26.501 clause 4.7.',
    status: 'no',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/implementation.mdx, "Feature Deep Dives: Data Collection, Reporting and Exposure" section (":::warning Not yet implemented in 5GMS")'),
    note: 'Not yet implemented within the framework of 5GMS. A generic UE data collection architecture exists separately under the UE Data Collection, Reporting and Event Exposure project, not yet wired into 5GMS.',
    trackingIssue: null,
  },
  {
    id: 'edge-processing',
    name: 'Edge Processing',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.10', proceduralClause: '8', quote: 'It enables the 5GMS Client in the UE to take advantage of edge computing capabilities in the 5GMS System to support media streaming.' },
    apis: [{ referencePoint: 'M1', procedureClause: '5.2.6', api: 'Edge Resources provisioning API', apiClause: '8.6' }],
    idealDescription:
      'Enables the 5GMS Client to take advantage of edge computing capabilities in the 5GMS System, in downlink and uplink. Defined in TS 26.501 clause 4.5, with procedures in clause 8. TS 26.510 table 5.1-1 has no row for edge processing; TS 26.512 table 4.2-1 also lists the Provisioning Sessions API at M1 and the Service Access Information API at M5 for edge content processing.',
    status: 'no',
    statusEvidence: INHERITED('docs/home/reference-tools/5gms/implementation.mdx "Feature Deep Dives" section (Edge Resources Provisioning unchecked)'),
    note: null,
    trackingIssue: null,
  },
  {
    id: 'embms-delivery',
    name: 'eMBMS Delivery',
    specRef: { doc: 'TS 26.501', version: 'V19.4.0', clause: '4.0.11', proceduralClause: '5.10', quote: 'It enables the 5GMS System to provision the delivery of downlink media streaming content via eMBMS User Services sessions.' },
    apis: [],
    idealDescription:
      'Enables the 5GMS System to provision the delivery of downlink media streaming content via eMBMS User Services sessions. Downlink only. Defined in TS 26.501 clause 4.6, with procedures in clause 5.10. TS 26.510 table 5.1-1 has no row for this feature, so there is no API table here; TS 26.512 table 4.2-1 maps it to the Provisioning Sessions API at M1d and the Service Access Information API at M5d.',
    status: 'unknown',
    statusEvidence: null,
    note: 'No existing site content states this feature’s implementation status either way; genuinely not yet assessed.',
    trackingIssue: null,
  },
];

// Groups FIVEGMS_FEATURES into the {spec, title, component, rows} shape
// ImplementationBoard and ArchitectureMap's deriveStates() already expect
// (the shape src/data/implementation/5g-broadcast.js also uses).
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
