---
title: QoS Profiles
sidebar_position: 8
hide_title: true
description: Explains the CAMARA QoS Profiles API and its named, operator-defined performance profiles.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs for Connectivity Quality</span>
<h1>QoS Profiles</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Using CAMARA APIs: QoS Profiles for Content Production & Contribution

Find more information about [**QoS Profiles API**](/tech/network-apis/features/qos-profiles).

## Purpose

A QoS Profile is a named, operator-defined bundle of network performance targets (throughput, latency, jitter, packet loss and so on). The media application does not create these profiles; it selects one that the network operator has already published to match a given application or use case, then references it by name when booking or requesting resources through the other CAMARA APIs.

## Workflow and Architecture

A QoS Profile is referenced by name in the request body of the other CAMARA QoS-related APIs, including:

- [Quality on Demand](./using-quality-on-demand)
- [QoS Booking](./using-qos-booking)
- [QoS Booking and Assignment](./using-qos-booking-assignment)
- [Dedicated Networks](./using-dedicated-networks)

The profile parameters themselves are retrieved with the [QoS Profiles API](/tech/network-apis/features/qos-profiles). This page documents the profile structure using example values.

### Example of a QoS Profile

An example of the QoS Profile, including status (provided in the response from the Network API platform), is shown below. The values are illustrative; a production profile would carry the throughput, latency and reliability targets required by the media flow.

Key fields to note:

- `name` and `description`: the identifier the other APIs reference, and a human-readable label.
- `status`: whether the profile is currently `ACTIVE`.
- `targetMinUpstreamRate` / `maxUpstreamRate` (and the downstream equivalents): the target minimum rate and the maximum (best effort) rate. For contribution feeds the upstream (uplink) rates matter most.
- `minDuration` / `maxDuration`: the allowed booking duration bounds.
- `priority`: relative scheduling priority between profiles.
- `packetDelayBudget`, `jitter`, `packetErrorLossRate`: the latency, timing-variation and loss targets.
- `l4sQueueType`: whether Low Latency, Low Loss, Scalable throughput (L4S) queuing applies.
- `serviceClass`: the traffic category, for example `real_time_interactive`.

:::note
A CAMARA QoS Profile is a name the operator has published for a bundle of network characteristics. What a name delivers in the network is agreed between the operator and the API consumer. A profile name such as `QCI_1_voice` seen elsewhere in these pages is illustrative only.
:::

For a media contribution example, a profile intended for a single uplink camera feed would set a high target minimum upstream rate (for example several Mbps), a low `packetDelayBudget` and `jitter`, and a low `packetErrorLossRate`, with a `serviceClass` such as `real_time_interactive`. The values in the example below are examples only; they stand for the actual network requirements.

```json
[
  {
    "name": "voice",
    "description": "QoS profile for voice calls",
    "status": "ACTIVE",
    "targetMinUpstreamRate": {
      "value": 128,
      "unit": "kbps"
    },
    "maxUpstreamRate": {
      "value": 128,
      "unit": "kbps"
    },
    "maxUpstreamBurstRate": {
      "value": 128,
      "unit": "kbps"
    },
    "targetMinDownstreamRate": {
      "value": 128,
      "unit": "kbps"
    },
    "maxDownstreamRate": {
      "value": 128,
      "unit": "kbps"
    },
    "maxDownstreamBurstRate": {
      "value": 128,
      "unit": "kbps"
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

---

## 5G-MAG's Self-Assessment

- Centralising the performance targets in a single, named QoS Profile keeps the other CAMARA QoS-family APIs simple: they only reference a profile by name rather than repeating throughput, latency and loss parameters in every booking or session request.
- Because a profile is entirely operator-defined and published in advance, a media application cannot request arbitrary custom values; it can only pick from whatever profiles and names the operator has chosen to provision. Portability of application logic across operators therefore depends on profile names and content being comparable, which the API itself does not guarantee.
- What a named profile delivers in the network is deliberately hidden from the application. This keeps the application portable, but it also means the application cannot verify which network treatment it is actually receiving.

Potential improvements:

- A degree of naming or content convergence across operators (or a small set of well-known reference profiles) would make the same media application logic portable between networks without hardcoding operator-specific profile names.
- The field-name ambiguity noted above (`packetErrorLossRate` vs `packetLossErrorRate`) should be resolved so integrators do not need to check the specific API version they are targeting.

## The QoS Profile as the shared vocabulary

The QoS Profile is the pivot of the whole CAMARA QoS analysis: every other QoS-related API references a profile by name rather than carrying raw performance numbers. This keeps the operator in control of what treatments are offered (each profile is one the operator has provisioned and can police) and keeps the media application's requests portable (the same profile name can be requested through Quality on Demand at the point of use, booked in advance through QoS Booking, or bundled into a Dedicated Network). The application discovers the available profiles and their parameters through the [QoS Profiles API](/tech/network-apis/features/qos-profiles) (`POST /retrieve-qos-profiles` and `GET /qos-profiles/{name}`); the names of the profiles on offer can be listed with `POST /retrieve-qos-profiles`.

## Profile fields

The individual profile fields mean the following:

| CAMARA field | Meaning |
| --- | --- |
| `targetMinUpstreamRate` / `targetMinDownstreamRate` | Target minimum rate |
| `maxUpstreamRate` / `maxDownstreamRate` | Per-flow rate ceiling |
| `packetDelayBudget` | Delay budget for a packet |
| `packetErrorLossRate` | Allowed packet error loss rate (the exponent N in 10^-N) |
| `priority` | Priority of the flow |
| `jitter` | Delay-variation target, policed by the operator |
| `l4sQueueType` | Low Latency, Low Loss, Scalable throughput (L4S) marking, where supported |
| `serviceClass` | The service category the operator associates with the profile |

For a contribution feed the upstream (uplink) fields dominate, because the media flows from the device to the production centre. A profile intended for a single uplink camera would set a high target minimum upstream rate (several Mbps or more), a low packet delay budget and jitter, and a low packet error loss rate; the minimum rate is a target value, which the network might not always be able to provide. The downlink fields matter mainly for return video, intercom and control.

:::note
The field for error loss rate appears as `packetErrorLossRate` in the CAMARA QoS Profiles definition; some API definitions spell it `packetLossErrorRate`. Confirm the exact name against the specific `.yaml` you integrate against, as noted in [Relevant QoS Parameters](/tech/network-apis/overview#relevant-qos-parameters).
:::

## Related

- [Network API Initiatives: Relevant QoS Parameters](/tech/network-apis/overview#relevant-qos-parameters): the shared parameter definitions.
- [QoS Profiles API](/tech/network-apis/features/qos-profiles): the API reference and CAMARA source.
