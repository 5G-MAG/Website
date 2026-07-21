---
title: QoS Profiles
sidebar_position: 8
hide_title: true
description: Explains the CAMARA QoS Profiles API and how its named, operator-defined performance profiles map onto 3GPP 5QI/QCI values.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Connectivity Quality with Network APIs</span>
<h1>QoS Profiles</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Using CAMARA APIs: QoS Profiles for Content Production & Contribution

Find more information about [**QoS Profiles API**](../camara-qos-profiles).

## Purpose

A QoS Profile is a named, operator-defined bundle of network performance targets (throughput, latency, jitter, packet loss and so on). The media application does not create these profiles; it selects one that the network operator has already published to match a given application or use case, then references it by name when booking or requesting resources through the other CAMARA APIs.

## Workflow and Architecture

A QoS Profile is referenced by name in the request body of the other CAMARA QoS-related APIs, including:

- [Quality on Demand](./using-quality-on-demand)
- [QoS Booking](./using-qos-booking)
- [QoS Booking and Assignment](./using-qos-booking-assignment)
- [Dedicated Networks](./using-dedicated-networks)

The profile parameters themselves are retrieved with the [QoS Profiles API](../camara-qos-profiles). This page documents the profile structure using example values.

### Example of a QoS Profile

An example of the QoS Profile, including status (provided in the response from the Network API platform), is shown below. The values are illustrative; a production profile would carry the throughput, latency and reliability targets required by the media flow.

Key fields to note:

- `name` and `description`: the identifier the other APIs reference, and a human-readable label.
- `status`: whether the profile is currently `ACTIVE`.
- `targetMinUpstreamRate` / `maxUpstreamRate` (and the downstream equivalents): the guaranteed and maximum bit rates. For contribution feeds the upstream (uplink) rates matter most.
- `minDuration` / `maxDuration`: the allowed booking duration bounds.
- `priority`: relative scheduling priority between profiles.
- `packetDelayBudget`, `jitter`, `packetErrorLossRate`: the latency, timing-variation and loss targets.
- `l4sQueueType`: whether Low Latency, Low Loss, Scalable throughput (L4S) queuing applies.
- `serviceClass`: the traffic category, for example `real_time_interactive`.

:::note
CAMARA QoS Profiles are an abstraction over the 3GPP QoS model. In 3GPP, a standardised QoS behaviour is identified by a 5G QoS Identifier (5QI); in earlier systems the equivalent was the QoS Class Identifier (QCI). The operator maps each named CAMARA profile onto an appropriate 5QI/QCI. A profile name such as `QCI_1_voice` seen elsewhere in these pages is illustrative only.
:::

For a media contribution example, a profile intended for a single uplink camera feed would set a high guaranteed upstream rate (for example several Mbps), a low `packetDelayBudget` and `jitter`, and a low `packetErrorLossRate`, with a `serviceClass` such as `real_time_interactive`.

```json
// Example values — replace with actual network requirements
[
  {
    "name": "voice",
    "description": "QoS profile for voice calls",
    "status": "ACTIVE",
    "targetMinUpstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxUpstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxUpstreamBurstRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "targetMinDownstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxDownstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxDownstreamBurstRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "minDuration": {
      "value": 60,
      "unit": "Seconds"
    },
    "maxDuration": {
      "value": 60,
      "unit": "Seconds"
    },
    "priority": 20,
    "packetDelayBudget": {
      "value": 100,
      "unit": "Milliseconds"
    },
    "jitter": {
      "value": 30,
      "unit": "Milliseconds"
    },
    "packetErrorLossRate": 3,
    "l4sQueueType": "non-l4s-queue",
    "serviceClass": "real_time_interactive"
  }
]
```

## The QoS Profile as the shared vocabulary

The QoS Profile is the pivot of the whole CAMARA QoS analysis: every other QoS-related API references a profile by name rather than carrying raw performance numbers. This keeps the operator in control of what treatments are offered (each profile is one the operator has provisioned and can police) and keeps the media application's requests portable (the same profile name can be requested through Quality on Demand at the point of use, booked in advance through QoS Booking, or bundled into a Dedicated Network). The application discovers the available profiles and their parameters through the [QoS Profiles API](../camara-qos-profiles) (`GET /qos-profiles` and `GET /qos-profiles/{name}`); the profile name must be known beforehand, and operators are expected to publish the names through the Network API Platform.

## Relationship to the 3GPP QoS model

A CAMARA QoS Profile is an abstraction over the 3GPP QoS model, not a new one. In 5G a QoS Flow is characterised by a 5G QoS Identifier (5QI); the standardised 5QI values and their characteristics (resource type GBR / Delay-Critical GBR / non-GBR, priority level, packet delay budget, packet error rate) are tabulated in 3GPP [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.7.4, Table 5.7.4-1. In earlier systems the equivalent identifier was the QoS Class Identifier (QCI), with the packet error loss rate attribute defined in [TS 23.203](https://www.3gpp.org/dynareport/23203.htm). The operator maps each named CAMARA profile onto an appropriate 5QI (standardised or operator-specific) and enforces it through the Policy Control Function. This is why a profile name such as `QCI_1_voice` is illustrative only: the CAMARA layer hides whether the underlying identifier is a 5QI or a legacy QCI.

The individual profile fields relate to 3GPP concepts as follows:

| CAMARA field                                        | 3GPP concept                                                                     |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `targetMinUpstreamRate` / `targetMinDownstreamRate` | Guaranteed Bit Rate (GBR) targets for a GBR QoS Flow                             |
| `maxUpstreamRate` / `maxDownstreamRate`             | Maximum Bit Rate (MBR) / per-flow ceiling                                        |
| `packetDelayBudget`                                 | Packet Delay Budget (PDB) of the 5QI                                             |
| `packetErrorLossRate`                               | Packet Error Rate (PER) of the 5QI (expressed as the exponent N in 10^-N)        |
| `priority`                                          | Priority Level of the 5QI                                                        |
| `jitter`                                            | Delay-variation target (not a standalone 5QI attribute; policed by the operator) |
| `l4sQueueType`                                      | Low Latency, Low Loss, Scalable throughput (L4S) marking, where supported        |
| `serviceClass`                                      | The service category the operator maps to a resource type / 5QI                  |

For a contribution feed the upstream (uplink) fields dominate, because the media flows from the device to the production centre. A profile intended for a single uplink camera would set a high guaranteed upstream rate (several Mbps or more), a low packet delay budget and jitter, and a low packet error loss rate, typically as a GBR treatment. The downlink fields matter mainly for return video, intercom and control.

:::note
The field for error loss rate appears as `packetErrorLossRate` in the CAMARA QoS Profiles definition; some API definitions spell it `packetLossErrorRate`. Confirm the exact name against the specific `.yaml` you integrate against, as noted in [Relevant QoS Parameters](../network-api-initiatives#relevant-qos-parameters).
:::

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 23.501 clause 5.7.4 / Table 5.7.4-1 as the exact location of the standardised 5QI table, and TS 23.203 as the QCI packet-error-loss-rate reference. Verify against the 3GPP work plan before publication.
:::

## Related

- [Using CAMARA APIs](./using-camara-apis): the APIs that reference profiles by name.
- [Quality on Demand](./using-quality-on-demand), [QoS Booking](./using-qos-booking), [QoS Booking and Assignment](./using-qos-booking-assignment), [Dedicated Networks](./using-dedicated-networks): the APIs that consume a profile.
- [Network API Initiatives: Relevant QoS Parameters](../network-api-initiatives#relevant-qos-parameters): the shared parameter definitions.
- [QoS Profiles API](../camara-qos-profiles): the API reference and CAMARA source.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
