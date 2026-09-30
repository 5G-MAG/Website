// Specification catalogue for 5G Media Streaming (5GMS), rendered by
// src/components/SpecIndex on /standards/5gms.
//
// Titles are each document's cover title. `release` is the release of the
// document's first version under change control, from its own change history.
// Notes paraphrase clause 1 (Scope). Baseline: the latest Rel-19 version of
// each document (TS 26.501 V19.4.0, TS 26.510 V19.2.0, TS 26.511 V19.0.0,
// TS 26.512 V19.3.0, TS 26.531 V19.0.0, TS 26.532 V19.1.0, TS 26.117 V19.2.0,
// TR 26.804 V19.1.0, TR 26.802 V19.2.0, TR 26.941 V19.0.1).
export const FIVEGMS_SPECS = [
  {
    id: 'TS 26.501',
    title: '5G Media Streaming (5GMS); General description and architecture',
    url: 'https://www.3gpp.org/dynareport/26501.htm',
    layer: '5GMS',
    release: '16',
    note: 'the 5GMS architecture, with its network and UE functions and APIs, for downlink and uplink',
  },
  {
    id: 'TS 26.512',
    title: '5G Media Streaming (5GMS); Protocols',
    url: 'https://www.3gpp.org/dynareport/26512.htm',
    layer: '5GMS',
    release: '16',
    note: 'the protocols and APIs for 5GMS services',
  },
  {
    id: 'TS 26.510',
    title: 'Media delivery; interactions and APIs for provisioning and media session handling',
    url: 'https://www.3gpp.org/dynareport/26510.htm',
    layer: '5GMS',
    release: '18',
    note: 'provisioning and media session handling APIs, shared by 5GMS and RTC',
  },
  {
    id: 'TS 26.511',
    title: '5G Media Streaming (5GMS); Profiles, Codecs and Formats',
    url: 'https://www.3gpp.org/dynareport/26511.htm',
    layer: '5GMS',
    release: '16',
    note: 'profiles, codecs and formats for downlink and uplink, based on CMAF',
  },
  {
    id: 'TS 26.117',
    title: '5G Media Streaming (5GMS); Speech and audio profiles',
    url: 'https://www.3gpp.org/dynareport/26117.htm',
    layer: '5GMS',
    release: '16',
    note: 'speech and audio capabilities, operation points and profiles',
  },
  {
    id: 'TS 26.531',
    title: 'Data Collection and Reporting; General Description and Architecture',
    url: 'https://www.3gpp.org/dynareport/26531.htm',
    layer: 'Data collection',
    release: '17',
    note: 'a generic architecture for collecting and reporting data in the 5G System',
  },
  {
    id: 'TS 26.532',
    title: 'Data Collection and Reporting; Protocols and Formats',
    url: 'https://www.3gpp.org/dynareport/26532.htm',
    layer: 'Data collection',
    release: '17',
    note: 'the APIs and data models for collecting and reporting UE data',
  },
  {
    id: 'TR 26.804',
    title: 'Study on 5G media streaming extensions',
    url: 'https://www.3gpp.org/dynareport/26804.htm',
    layer: 'Studies',
    release: '17',
    note: 'key topics for extending 5GMS; many TS 26.501 features come from its conclusions',
  },
  {
    id: 'TR 26.802',
    title: 'Multicast Architecture Enhancement for 5G Media Streaming',
    url: 'https://www.3gpp.org/dynareport/26802.htm',
    layer: 'Studies',
    release: '17',
    note: 'enhancements to 5GMS for multicast-broadcast media streaming',
  },
  {
    id: 'TR 26.941',
    title: 'Network Slicing Extensions for 5G media services',
    url: 'https://www.3gpp.org/dynareport/26941.htm',
    layer: 'Studies',
    release: '18',
    note: 'standards gaps for media streaming over 5G network slicing',
  },
];

// Filter chips, from the specifications outwards: 5GMS itself, the data
// collection framework it reports into, then the studies behind it.
export const FIVEGMS_LAYER_ORDER = ['5GMS', 'Data collection', 'Studies'];
