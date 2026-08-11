---
hide_title: true
title: Connectivity Quality with Network APIs
slug: /standards/network-apis
description: How CAMARA network APIs map to 3GPP's NEF, CAPIF and PCF exposure mechanisms for media QoS, slicing and connectivity insights.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Connectivity Quality with Network APIs</h1>
</div>
</div>

<div class="topic-lead">
How CAMARA network APIs map to 3GPP's NEF, CAPIF and PCF exposure mechanisms for media QoS, slicing and connectivity insights.
</div>

## Overview

5G-MAG tracks and contributes to standards for network capability exposure: APIs that let media applications request and manage network resources. The relevant pieces are 3GPP's Network Exposure Function (NEF), the Common API Framework (CAPIF), and the CAMARA open-source project (a Linux Foundation initiative developed with GSMA support). For the technical analysis of how these map together, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The detailed, per-field CAMARA-to-3GPP API mapping analysis.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/network-apis">Tech: Network APIs</a></li>
</ul>
</div>
</div>

</div>

## Key 3GPP Specifications

The specifications below are grouped by the layer of network capability exposure they define: 3GPP northbound exposure (NEF, CAPIF), 5G Core policy control, 5G Media Streaming APIs, and the Service Enabler Architecture Layer (SEAL). See [Tech: Network APIs](/tech/network-apis) for the architecture that ties these layers together.

### Network Exposure Function (NEF)

- [TS 29.522](https://www.3gpp.org/dynareport/29522.htm): Network Exposure Function (NEF); Northbound APIs (includes Nnef_AFSessionWithQoS and Nnef_ChargeableParty)
- [TS 29.517](https://www.3gpp.org/dynareport/29517.htm): 5G System; Application Function Event Exposure Service; Stage 3
- [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for 5GS (NEF architecture)

### Policy and QoS Control

- [TS 29.514](https://www.3gpp.org/dynareport/29514.htm): 5G System; Policy Authorization Service; Stage 3 (Npcf_PolicyAuthorization)
- [TS 29.554](https://www.3gpp.org/dynareport/29554.htm): 5G System; Background Data Transfer (BDT) Policy Control Service; Stage 3 (Npcf_BDTPolicyControl, Nnef_BDTPNegotiation)

### Common API Framework (CAPIF)

- [TS 23.222](https://www.3gpp.org/dynareport/23222.htm): Procedures for the Common API Framework for 3GPP Northbound APIs
- [TS 29.222](https://www.3gpp.org/dynareport/29222.htm): Common API Framework for 3GPP Northbound APIs (Stage 3)

### 5G Media Streaming APIs

- [TS 26.512](https://www.3gpp.org/dynareport/26512.htm): 5G Media Streaming (5GMS); Protocols (M1-M8 reference point APIs)
- [TS 26.501](https://www.3gpp.org/dynareport/26501.htm): 5G Media Streaming (5GMS); General description and architecture

### Service Enabler Architecture Layer (SEAL)

- [TS 23.434](https://www.3gpp.org/dynareport/23434.htm): Service Enabler Architecture Layer for Verticals (SEAL); Functional architecture and information flows
- [TS 24.549](https://www.3gpp.org/dynareport/24549.htm): SEAL; Network Slice Capability Enablement (NSCE); Stage 3 (protocol aspects)

## CAMARA

[CAMARA](https://camaraproject.org/) is an open-source initiative under the Linux Foundation with GSMA support to define, develop and test network APIs. 5G-MAG contributes CAMARA API analysis for media use cases, focusing on the following APIs:

| CAMARA API              | What it does for media                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Quality on Demand (QoD) | Lets an application request a defined QoS profile (bandwidth, latency) for a session, for example a live contribution feed |
| Network Slice Booking   | Reserves a dedicated network slice in advance for a planned event or production                                            |
| Connectivity Insights   | Reports on likely network conditions so a workflow can adapt encoding or scheduling                                        |
| Dedicated Networks      | Provisions and manages an on-site dedicated network for a production                                                       |

See the [Tech: Network APIs](/tech/network-apis) page for detailed CAMARA API profiles.

### How CAMARA is organised

CAMARA is hosted by the Linux Foundation and works with the GSMA Operator Platform Group; GSMA Open Gateway is the commercial programme through which operators expose CAMARA-defined APIs. APIs are shipped in twice-yearly meta-releases (spring and fall): a `wip` version on the `main` branch is work in progress, a released meta-release version (`r`-tagged) is the one to integrate against. Several of the APIs 5G-MAG analyses are still pre-1.0 (`v0`/`wip`).

### CAMARA APIs to 3GPP mapping (summary)

| CAMARA API                                         | Primary 3GPP northbound mapping                               | Core specification                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quality on Demand / QoS Provisioning / QoS Booking | NEF `AsSessionWithQoS` (AF session with required QoS)         | TS 29.522; PCF `Npcf_PolicyAuthorization` in TS 29.514                                                                                                           |
| Network Slice Booking                              | Slice provisioning and, at runtime, SEAL NSCE acting as an AF | [TS 28.531](https://www.3gpp.org/dynareport/28531.htm) / [TS 28.541](https://www.3gpp.org/dynareport/28541.htm) (slice management); TS 23.434 / TS 24.549 (NSCE) |
| Dedicated Networks                                 | Non-public network / slice provisioning plus per-device QoS   | TS 23.501 (NPN); TS 29.522 for QoS                                                                                                                               |
| Connectivity Insights                              | Network analytics and monitoring exposure                     | NEF analytics/monitoring events (TS 29.522); NWDAF where used ([TS 29.520](https://www.3gpp.org/dynareport/29520.htm))                                           |

The mappings above are the general correspondence. See the [technical pages](/tech/network-apis/network-api-initiatives) for the detailed, per-field analysis.

## 5G-MAG tracking and contribution focus

5G-MAG's interest is media-specific: contribution and live production uplinks, and live distribution downlinks. The work centres on the CAMARA QoS and slicing APIs and the 3GPP northbound specifications (TS 29.522, TS 29.514) and SEAL (TS 23.434) they map onto. See [Tech: Network APIs](/tech/network-apis) for the detailed gap analysis.

## Related Standards Work

- [Standards: 5G Media Streaming](/standards/5gms)
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
