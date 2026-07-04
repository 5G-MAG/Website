---
hide_title: true
title: Network APIs
description: How CAMARA network APIs map to 3GPP's NEF, CAPIF and PCF exposure mechanisms for media QoS, slicing and connectivity insights.
sidebar_position: 11
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Network APIs</h1>
</div>
</div>

## Overview

Network capability exposure means letting an application ask the mobile network for the conditions it needs (for example guaranteed bandwidth or low latency for a live feed) through a documented interface, instead of taking whatever best-effort service the network happens to provide. 5G-MAG analyses and contributes to the standards for this, focusing on APIs that let media applications request and manage network resources. The relevant pieces are 3GPP's Network Exposure Function (NEF), the Common API Framework (CAPIF), and the CAMARA open-source project (a Linux Foundation initiative developed with GSMA support).

## How the pieces fit

Network capability exposure has three layers, and the specifications below sit at different layers:

* **Developer-facing APIs (CAMARA).** Simple, RESTful, operator-agnostic APIs that a media application calls directly. A CAMARA API hides the 3GPP machinery behind a small set of resources (for example a QoD "session").
* **3GPP northbound exposure (NEF/CAPIF).** The Network Exposure Function (NEF) is the controlled gateway through which an application function reaches the 5G Core. The Common API Framework (CAPIF) provides discovery, onboarding, authentication and logging so that many northbound APIs can be published and consumed consistently.
* **5G Core control (PCF and related functions).** Inside the core, the request is turned into policy and QoS decisions on the subscriber's PDU session.

A CAMARA call therefore typically maps to a 3GPP northbound operation on the NEF, which in turn drives a service-based operation inside the core. For example, a CAMARA Quality on Demand session maps to the NEF `AsSessionWithQoS` API in TS 29.522, which drives `Npcf_PolicyAuthorization` on the PCF (TS 29.514). The mapping tables that record these correspondences are maintained by CAMARA and by GSMA; the [technical analysis pages](/tech/network-apis) work through them API by API.

## Key 3GPP Specifications

### Network Exposure Function (NEF)

The NEF is the 5G core function that exposes network capabilities to outside applications through northbound APIs. It acts as the controlled gateway an application function (AF, an application-side component that talks to the network) calls to request features such as a quality-of-service (QoS) session. In the 4G/EPC world the equivalent function is the Service Capability Exposure Function (SCEF); NEF and SCEF are often deployed together (an "SCEF+NEF") so the same northbound API can front both core generations.

* [TS 29.522](https://www.3gpp.org/dynareport/29522.htm): Network Exposure Function (NEF); Northbound APIs (includes Nnef_AFSessionWithQoS and Nnef_ChargeableParty)
* [TS 29.517](https://www.3gpp.org/dynareport/29517.htm): 5G System; Application Function Event Exposure Service; Stage 3
* [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for 5GS (NEF architecture)

### Policy and QoS Control

These specifications define how an application function (AF) requests policy and quality-of-service (QoS) treatment for a session, and how the Policy Control Function (PCF) authorises it. They also cover scheduling bulk transfers into off-peak windows through Background Data Transfer (BDT).

* [TS 29.514](https://www.3gpp.org/dynareport/29514.htm): 5G System; Policy Authorization Service; Stage 3 (Npcf_PolicyAuthorization)
* [TS 29.554](https://www.3gpp.org/dynareport/29554.htm): 5G System; Background Data Transfer (BDT) Policy Control Service; Stage 3 (Npcf_BDTPolicyControl, Nnef_BDTPNegotiation)

### Common API Framework (CAPIF)

CAPIF is the shared framework for discovering, authenticating and managing access to 3GPP northbound APIs, so that different exposed APIs (such as those above) can be published and consumed through one consistent mechanism.

* [TS 23.222](https://www.3gpp.org/dynareport/23222.htm): Procedures for the Common API Framework for 3GPP Northbound APIs
* [TS 29.222](https://www.3gpp.org/dynareport/29222.htm): Common API Framework for 3GPP Northbound APIs (Stage 3)

### 5G Media Streaming APIs
* [TS 26.512](https://www.3gpp.org/dynareport/26512.htm): 5G Media Streaming (5GMS); Protocols (M1-M8 reference point APIs)
* [TS 26.501](https://www.3gpp.org/dynareport/26501.htm): 5G Media Streaming (5GMS); General description and architecture

### Service Enabler Architecture Layer (SEAL)

SEAL provides common enabler services (such as group management, configuration and network resource management) that vertical applications can reuse, and is drawn on by the reference implementation for network capability exposure. Two SEAL services are particularly relevant here: Network Resource Management (which requests QoS and multicast/broadcast resources on behalf of a vertical application) and Network Slice Capability Enablement (NSCE), which lets a vertical application influence slice selection and adaptation. The NSCE server acts as an AF towards the 5G Core, updating the S-NSSAI and DNN in the UE Route Selection Policy (URSP) rules for a vertical's traffic.

* [TS 23.434](https://www.3gpp.org/dynareport/23434.htm): Service Enabler Architecture Layer for Verticals (SEAL); Functional architecture and information flows
* [TS 24.549](https://www.3gpp.org/dynareport/24549.htm): SEAL; Network Slice Capability Enablement (NSCE); Stage 3 (protocol aspects)

## CAMARA

[CAMARA](https://camaraproject.org/) is an open-source initiative under the Linux Foundation with GSMA support to define, develop and test network APIs. 5G-MAG contributes CAMARA API analysis for media use cases, focusing on the following APIs:

| CAMARA API | What it does for media |
| --- | --- |
| Quality on Demand (QoD) | Lets an application request a defined QoS profile (bandwidth, latency) for a session, for example a live contribution feed |
| Network Slice Booking | Reserves a dedicated network slice in advance for a planned event or production |
| Connectivity Insights | Reports on likely network conditions so a workflow can adapt encoding or scheduling |
| Dedicated Networks | Provisions and manages an on-site dedicated network for a production |

See the [Technical Documentation: Network APIs](/tech/network-apis) page for detailed CAMARA API profiles.

### How CAMARA is organised

CAMARA is hosted by the Linux Foundation and works with the GSMA Operator Platform Group, which contributes operator requirements; GSMA Open Gateway is the commercial programme through which operators expose CAMARA-defined APIs. Technical direction sits with a Technical Steering Committee, and individual APIs are developed in per-API sub-projects and sandbox repositories on GitHub. Cross-cutting rules (the device object, error model, security, versioning) are set by the Commonalities and Identity and Consent Management working groups and are applied to every API.

APIs are shipped in twice-yearly meta-releases (spring and fall), each bundling a consistent set of API versions so that operators can plan implementations. An API version tagged `wip` on the `main` branch is work in progress; a released meta-release version (for example `r`-tagged releases) is the one to integrate against. Several of the APIs 5G-MAG analyses are still pre-1.0 (`v0`/`wip`), so field names and enumerations can change between releases; the technical pages flag where this matters.

### CAMARA APIs to 3GPP mapping (summary)

| CAMARA API | Primary 3GPP northbound mapping | Core specification |
| --- | --- | --- |
| Quality on Demand / QoS Provisioning / QoS Booking | NEF `AsSessionWithQoS` (AF session with required QoS) | TS 29.522; PCF `Npcf_PolicyAuthorization` in TS 29.514 |
| Network Slice Booking | Slice provisioning and, at runtime, SEAL NSCE acting as an AF | [TS 28.531](https://www.3gpp.org/dynareport/28531.htm) / [TS 28.541](https://www.3gpp.org/dynareport/28541.htm) (slice management); TS 23.434 / TS 24.549 (NSCE) |
| Dedicated Networks | Non-public network / slice provisioning plus per-device QoS | TS 23.501 (NPN); TS 29.522 for QoS |
| Connectivity Insights | Network analytics and monitoring exposure | NEF analytics/monitoring events (TS 29.522); NWDAF where used ([TS 29.520](https://www.3gpp.org/dynareport/29520.htm)) |

The mappings above are the general correspondence; CAMARA does not mandate a specific southbound implementation, and an operator may realise a given API differently. The detailed, per-field analysis is on the [technical pages](/tech/network-apis/network-api-initiatives).

## 5G-MAG tracking and contribution focus

5G-MAG's interest is media-specific: contribution and live production uplinks, and live distribution downlinks, where an application benefits from asking the network for a defined quality rather than accepting best effort. The work centres on:

* analysing each CAMARA QoS and slicing API against media production and live distribution scenarios, and recording gaps (for example the lack of quantitative feedback from Connectivity Insights, or the absence of a service-area dimension in QoS Provisioning);
* checking that the CAMARA parameter set (delay budget, upstream/downstream rates, jitter, loss) is expressive enough for professional media, and that the several QoS-related APIs stay mutually consistent;
* tracking the 3GPP northbound specifications (TS 29.522, TS 29.514) and SEAL (TS 23.434) that the CAMARA APIs map onto, so the reference tools follow the same releases.

## Reference Tools

For the reference implementation (CAMARA QoD, Connectivity Insights and Network Slice Booking APIs, plus 3GPP TS 23.434 SEAL), see [Network APIs on the developer portal](/developer/network-apis).

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 24.549 (SEAL NSCE Stage 3), TS 28.531 and TS 28.541 (network slice management), TS 29.520 (NWDAF services). Verify against the 3GPP work plan before publication.
:::

## Related Standards Work

* [Standards: 5G Media Streaming](/tech/standards/5gms)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
