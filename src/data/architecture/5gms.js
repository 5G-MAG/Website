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
