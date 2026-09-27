// 5G Media Streaming (5GMS) architecture: the entities and M1-M8 reference
// points TS 26.501 defines, with the repository implementing each one.
// Modeled on src/data/architecture/5g-mbs.js's own shape.
//
// `component` deliberately is NOT set on any entity here, unlike 5g-mbs.js's
// entities. That field is what lets <ArchitectureMap status={...}> derive an
// entity's colour from an ImplementationBoard `sections` array -- and doing
// that here today, with every FIVEGMS_FEATURES row at `status: 'unknown'` or
// an `inherited` (not independently re-audited) status, would make
// ArchitectureMap's deriveStates() render every entity "Not implemented"
// (its yes/partial/no rollup has no distinct bucket for "not yet audited").
// That would be a plausible-looking but false signal for entities that
// obviously exist and are substantially built. So: this file renders via
// `<ArchitectureMap architecture={FIVEGMS_ARCHITECTURE} />` with NO `status`
// prop for this pass (entities and repos only, no colour) -- wire `status`
// once the real code audit replaces the inherited/unknown placeholders in
// src/data/blueprints/5gms.js.
export const FIVEGMS_ARCHITECTURE = {
  spec: '3GPP TS 26.501 (5G Media Streaming; general description and architecture)',
  layers: [
    {
      id: 'provider',
      label: '5GMS Application Provider',
      spec: 'TS 26.501',
      interfaces: ['M1 / M1d', 'M2d', 'M8'],
    },
    {
      id: 'network',
      label: '5GMS Application Function and Server',
      spec: 'TS 26.501, TS 26.510/TS 26.512',
      interfaces: ['M3 / M3d', 'M5 / M5d'],
    },
    {
      id: 'ue',
      label: 'UE (5GMS Client)',
      spec: 'TS 26.501',
      interfaces: ['M4d', 'M6d', 'M7d'],
    },
  ],
  entities: [
    {
      id: 'application-provider',
      label: '5GMS Application Provider',
      layer: 'provider',
      spec: 'TS 26.501',
      repo: 'rt-5gms-application-provider',
      repoUrl: 'https://github.com/5G-MAG/rt-5gms-application-provider',
    },
    {
      id: 'af',
      label: '5GMS Application Function (AF)',
      layer: 'network',
      spec: 'TS 26.501, M1/M5 per TS 26.510 / TS 26.512',
      repo: 'rt-5gms-application-function',
      repoUrl: 'https://github.com/5G-MAG/rt-5gms-application-function',
    },
    {
      id: 'as',
      label: '5GMS Application Server (AS)',
      layer: 'network',
      spec: 'TS 26.501, M3/M4 per TS 26.510 / TS 26.512',
      repo: 'rt-5gms-application-server',
      repoUrl: 'https://github.com/5G-MAG/rt-5gms-application-server',
    },
    {
      id: 'media-session-handler',
      label: 'Media Session Handler',
      layer: 'ue',
      spec: 'TS 26.501, M5d/M6d',
      repo: 'rt-5gms-media-session-handler',
      repoUrl: 'https://github.com/5G-MAG/rt-5gms-media-session-handler',
    },
    {
      id: 'media-player',
      label: 'Media Player (Media Stream Handler)',
      layer: 'ue',
      spec: 'TS 26.501, M4d/M7d',
      repo: 'rt-5gms-media-stream-handler',
      repoUrl: 'https://github.com/5G-MAG/rt-5gms-media-stream-handler',
    },
    {
      id: 'aware-application',
      label: '5GMSd-Aware Application',
      layer: 'ue',
      spec: 'TS 26.501, M8 (out of 3GPP scope)',
      repo: 'rt-5gms-application',
      repoUrl: 'https://github.com/5G-MAG/rt-5gms-application',
    },
  ],
  note: 'This is the downlink (5GMSd) configuration the Reference Tools implement. The uplink direction (5GMSu), where the UE is the media source, is defined by the same specification but is not implemented by these tools.',
};

// Node positions, containers and reference-point edges for the SVG
// architecture diagram (src/components/ArchitectureDiagram) -- laid out to
// match the real 3GPP figure this site already publishes as a static image
// (static/img/tech/5gms/5GMS_Downlink.png, itself already referenced from
// docs/tech/5gms/overview.mdx), traced directly against that image rather
// than invented (2026-09-27, direct correction: "this SVG has nothing to do
// with the 3GPP figure"). Same entity nesting (Aware Application outside
// 5GMSd Client; Media Session Handler + Media Player inside it, inside UE;
// AF above AS inside the network side; Application Provider spanning the DN
// column), same reference points, same line styles as that figure's own
// legend (solid = 5GMSd Scope, dashed = 5GS Scope, dotted = Out of scope),
// same "Exposed API" markers at the same junctions. NEF and PCF (present in
// the real figure, connected to the AF via N33/N5) are deliberately left out
// of the drawn boxes -- they are generic 5G Core functions with no 5G-MAG
// reference-tools repo of their own, out of this inventory's scope by
// definition, not a structural difference from the real figure; noted in
// the page text rather than drawn as an empty box.
export const FIVEGMS_DIAGRAM_CONTAINERS = [
  { id: 'ue', label: 'UE', x: 10, y: 10, w: 220, h: 430, tone: 'system' },
  { id: 'client', label: '5GMSd Client', x: 25, y: 110, w: 190, h: 320, tone: 'scope' },
  { id: 'network', label: '5G System', x: 310, y: 10, w: 190, h: 430, tone: 'system' },
  { id: 'dn', label: 'DN', x: 580, y: 10, w: 170, h: 430, tone: 'external' },
];

export const FIVEGMS_DIAGRAM_NODES = {
  'aware-application': { x: 25, y: 25, w: 190, h: 55 },
  'media-session-handler': { x: 60, y: 130, w: 145, h: 95 },
  'media-player': { x: 35, y: 300, w: 170, h: 85 },
  // Vertically centred on Media Session Handler / Media Player respectively
  // (not just "roughly the same area") so M5d/M4d draw as clean horizontal
  // connectors, matching the real figure -- diagonal connectors were the
  // reported inaccuracy (2026-09-27: "the connections between blocks are
  // not accurate").
  af: { x: 335, y: 128, w: 140, h: 100 },
  as: { x: 335, y: 293, w: 140, h: 100 },
  'application-provider': { x: 600, y: 40, w: 130, h: 370 },
};

export const FIVEGMS_DIAGRAM_EDGES = [
  // M8d is routed above every container, exactly as the real figure draws
  // it -- a dedicated top route, not the generic nearest-side connector
  // every other edge below uses.
  { from: 'aware-application', to: 'application-provider', label: 'M8d', style: 'dotted', route: 'top' },
  { from: 'aware-application', to: 'media-session-handler', label: 'M6d', style: 'solid', exposedApi: true },
  { from: 'aware-application', to: 'media-player', label: 'M7d', style: 'solid', route: 'left' },
  { from: 'media-session-handler', to: 'media-player', label: 'M6d/M7d', style: 'solid', exposedApi: true },
  { from: 'media-session-handler', to: 'af', label: 'M5d', style: 'solid' },
  { from: 'media-player', to: 'as', label: 'M4d', style: 'solid' },
  { from: 'af', to: 'as', label: 'M3d', style: 'solid' },
  { from: 'af', to: 'application-provider', label: 'M1d', style: 'solid', exposedApi: true },
  { from: 'as', to: 'application-provider', label: 'M2d', style: 'solid', exposedApi: true },
];
