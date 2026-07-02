---
hide_title: true
title: 5G Media Streaming
sidebar_position: 2
---

<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8"/></svg>
<h1>5G Media Streaming - Specs</h1>
</div>

## Overview

5G Media Streaming (5GMS) is the 3GPP framework for delivering streaming media over 5G networks, covering provisioning, media session handling and reporting between content providers, the network and the device. It has two directions: downlink (5GMSd), streaming from the network to the device, and uplink (5GMSu), streaming from the device to the network. This page lists the specifications in scope and recent Release-19 work; 5G-MAG's tracking and contribution focus is described further down. For the 5G-MAG software, see the reference tools on the developer portal at https://developer.5g-mag.com/5gms; for implementation analysis, see [Streaming & Media Delivery](/tech/5gms). For acronyms used here, see the [Glossary](/tech/standards/glossary).

## Architecture and key concepts

5G Media Streaming is not a separate network. It is a functional extension of the 5G System that adds media-specific control, hosting and reporting on top of the 5G Core. The architecture is defined in [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) and is functionally divided so that operators and content providers can deploy it with different degrees of integration.

The main functional entities are the same in both directions:

* **5GMS Application Provider**: the external content provider that uses the 5G network to deliver (downlink) or ingest (uplink) media, and supplies the 5GMS-Aware Application on the device.
* **5GMS Application Function (AF)**: the control-plane entity that provisions and manages media sessions and acts as the bridge to the 5G Core (for example the Policy Control Function (PCF), the Network Exposure Function (NEF) or the Binding Support Function (BSF)).
* **5GMS Application Server (AS)**: the media-plane entity that hosts, caches and delivers media (downlink) or receives and ingests it (uplink); it can be a single server or a Content Delivery Network (CDN).
* **5GMS Client** on the User Equipment (UE), split into a **Media Session Handler** (the control-plane component that talks to the AF) and a **Media Player** for downlink or **Media Streamer** for uplink (the media-plane component that talks to the AS).

The entities are joined by named reference points M1 to M8. The downlink variants carry a "d" suffix and the uplink variants a "u" suffix:

| Reference point | Between | Role |
| :--- | :--- | :--- |
| M1 | Application Provider to AF | Provisioning (content hosting, certificates, policies, reporting configurations) |
| M2 | Application Provider to AS | Content ingest (downlink) or content egest (uplink) |
| M3 | AF to AS | Internal configuration of the AS by the AF (not standardised) |
| M4 | AS to Media Player, or Media Streamer to AS | Media delivery (downlink) or media ingest (uplink) on the data plane |
| M5 | Media Session Handler to AF | Media session handling and reporting (Service Access Information, consumption, metrics, network assistance, dynamic policies) |
| M6 | Media Session Handler to Media Player/Streamer and to the Aware Application | UE-internal APIs |
| M7 | Media Player/Streamer to Media Session Handler | UE-internal APIs |
| M8 | Application Provider to 5GMS-Aware Application | Service-level exchange, outside the 3GPP scope |

For the deeper architecture (entity sub-functions, the M1 to M8 interfaces per direction, and the downlink feature-to-API mapping), see the technical documentation on the [5GMS Overview](/tech/5gms/overview-5gms) and [5GMSd Features](/tech/5gms/features-5gmsd) pages.

## 5G Core service consumers used by the AF

In the 5G Core, network functions expose service-based APIs (HTTP/2 RESTful APIs described by an OpenAPI schema) that other functions call: the function offering the API is the *producer*, the function calling it is the *consumer*. The 5GMS AF is a consumer of two such APIs for the unicast media path:

* **Binding Support Function (BSF), TS 29.521.** The BSF maps a UE's PDU session (by IP address) to the PCF that is serving it. The AF uses the `Nbsf_Management` service to find the right PCF before it can request policy; this is a lookup step rather than an action on the traffic.
* **Policy Control Function (PCF), TS 29.514.** The PCF applies QoS and charging policy. The AF uses the `Npcf_PolicyAuthorization` service at reference point N5 to request specific network treatment (bandwidth, priority) for the media flows inside a UE's PDU session, by creating and updating an Application Session Context. This is how a unicast streaming session asks the network for the QoS it needs.

The developer-side view of the reusable libraries that implement these consumer roles (libscbsf, libscpcf) is on the [developer portal](https://developer.5g-mag.com). For the equivalent multicast/broadcast service consumer (the MB-SMF, TS 29.532), see [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs).

## Related 3GPP Specifications

The 5G Media Streaming architecture is defined in TS 26.501. Protocols and APIs are specified in TS 26.512, which references the generalized Media Session Handling defined in TS 26.510. Profiles, codecs and formats are provided in TS 26.511.

* **[3GPP TS 26.501](https://www.3gpp.org/dynareport/26501.htm) - 5G Media Streaming (5GMS); General description and architecture**
* **[3GPP TS 26.512](https://www.3gpp.org/dynareport/26512.htm) - 5G Media Streaming (5GMS); Protocols**
* **[3GPP TS 26.510](https://www.3gpp.org/dynareport/26510.htm) - Media delivery; interactions and APIs for provisioning and media session handling**
* **[3GPP TS 26.511](https://www.3gpp.org/dynareport/26511.htm) - 5G Media Streaming (5GMS); Profiles, codecs and formats**

Two companion specifications define the generic UE data collection framework that 5GMS reporting can feed into:

* **[3GPP TS 26.531](https://www.3gpp.org/dynareport/26531.htm) - Data Collection and Reporting; General Description and Architecture**
* **[3GPP TS 26.532](https://www.3gpp.org/dynareport/26532.htm) - Data Collection and Reporting; Protocols and Formats**

The 5GMS AF is a consumer, not a producer, of two further 5G Core service-based APIs that the unicast (5GMSd/5GMSu) path relies on:

* **[3GPP TS 29.521](https://www.3gpp.org/dynareport/29521.htm) - 5G System; Binding Support Management Service; Stage 3**
* **[3GPP TS 29.514](https://www.3gpp.org/dynareport/29514.htm) - 5G System; Policy Authorization Service; Stage 3**

### Reading the specification set by role

* **Architecture and features:** TS 26.501 is the anchor. It defines the functional entities, the M1 to M8 reference points, the downlink (5GMSd) and uplink (5GMSu) directions, and each feature (content hosting, dynamic policies, network assistance, consumption and QoE metrics reporting, edge processing, eMBMS delivery, data collection).
* **Provisioning and session-handling APIs:** from Release 18 these live in TS 26.510, which generalises the media session handling so that both the 5GMS System and the Real-Time media Communication (RTC) System share it. In Release 17 the same APIs were carried in TS 26.512.
* **Media-plane protocols:** TS 26.512 specifies the on-the-wire protocols and the AS configuration, and continues to carry the ingest, media delivery and reporting protocol details.
* **Profiles, codecs and formats:** TS 26.511 constrains the media formats (for example DASH per ISO/IEC 23009-1 and CMAF per ISO/IEC 23000-19) and codec profiles a compliant service uses.

### Reading the specification set by 3GPP release

* **Release 15/16:** 5GMS is introduced. TS 26.501, TS 26.511 and TS 26.512 establish the downlink and uplink architecture, the reference points and the first feature set (content hosting, dynamic policies, network assistance, consumption and QoE metrics reporting).
* **Release 17:** adds edge media processing and 5GMS delivery over eMBMS. The reference tools baseline maps to this release, where the provisioning and session-handling APIs are still in TS 26.512.
* **Release 18:** TS 26.510 is created and the media session handling APIs move out of TS 26.512 into it, generalised across the 5GMS and RTC systems. Data collection, reporting and event exposure is aligned with TS 26.531 and TS 26.532.
* **Release 19:** Advanced Media Delivery (see below), studied in TR 26.804, extending reporting, multi-source and multi-access delivery, and quality of service.

The versions in force differ per release. Confirm the exact version and clause against the [3GPP specification record](https://www.3gpp.org/dynareport/26501.htm) for the release you are targeting.

## Release-19 Advanced Media Delivery

Advanced Media Delivery (AMD) is the Release-19 line of work extending 5G Media Streaming, for example multicast delivery and client-data reporting. Release 19 studies these extensions in the following Technical Reports (study phase, informative); the reports and external specifications below feed that work.

Technical Reports:
* **[3GPP TR 26.804](https://www.3gpp.org/dynareport/26804.htm) - Study on 5G media streaming extensions**
* **[3GPP TR 26.802](https://www.3gpp.org/dynareport/26802.htm) - Multicast Architecture Enhancement for 5G Media Streaming**

:::caution[Needs verification]
TR 26.802 is listed here under "Release-19 Advanced Media Delivery", but it appears to belong to an earlier release (flagged as possibly Release 17). Its release and section placement should be confirmed against the [3GPP specification record](https://www.3gpp.org/dynareport/26802.htm) and corrected if needed.
:::

### Common Media Client Data (CMCD)

Common Media Client Data (CMCD) is a CTA standard that lets a media player report playback and quality data to delivery servers, used for diagnostics and delivery optimisation. Stage-3 support for CMCD is being introduced into the 3GPP media delivery specifications through the change requests listed below.

* **Specification: [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/tech/standards/pdfs/cta-5004-final.pdf) - Web Application Video Ecosystem - Common Media Client Data**
  * Complementary information: [https://dashif.org/events/special-sessions/#special-sessions-2022](https://dashif.org/events/special-sessions/#special-sessions-2022)
* Stage 3 support summarized in the following CRs: [S4-251463](https://www.3gpp.org/ftp/tsg_sa/WG4_CODEC/TSGS4_133-e/Docs/S4-251463.zip) (26.510) and [S4aI250146](https://www.3gpp.org/ftp/TSG_SA/WG4_CODEC/3GPP_SA4_AHOC_MTGs/SA4_MBS/Docs/S4aI250146.zip) (26.512)

### Coded Multisource Media Format (CMMF)

Coded Multisource Media Format (CMMF) is an ETSI format that lets a client fetch a single piece of content in coded chunks from multiple sources (for example several content delivery networks or peers) to improve resilience and delivery efficiency.

* **Specification: [ETSI TS 103 973](https://www.etsi.org/deliver/etsi_ts/103900_103999/103973/01.01.01_60/ts_103973v010101p.pdf) - Coded Multisource Media Format (CMMF) for Content Distribution and Delivery**

## 5G-MAG tracking and contribution focus

5G-MAG tracks the 5GMS specifications in 3GPP SA4 and maintains open-source reference implementations of the architecture. The current focus areas are:

* **Downlink unicast (5GMSd):** the reference tools implement the 5GMSd AF, the 5GMSd AS, the Media Session Handler and the Media Player, plus a sample Application Provider and Aware Application, against the Release 17 normative baseline. This gives an end-to-end path to validate provisioning (M1) and session handling (M5) interoperably.
* **Release 18 API migration:** tracking the move of the media session handling APIs from TS 26.512 into TS 26.510 and the generalisation across the 5GMS and RTC systems.
* **Advanced Media Delivery (Release 19):** following the TR 26.804 study and the stage-3 work that brings CMCD reporting and CMMF multi-source delivery into the media delivery specifications.
* **Data collection and event exposure:** the generic UE data collection framework (TS 26.531 and TS 26.532), tracked so that 5GMS consumption and QoE metrics can be exposed to consuming functions.

For the reference-tool scope and how the software maps to these specifications, see the developer portal at [https://developer.5g-mag.com/5gms](https://developer.5g-mag.com/5gms). For implementation analysis, see [Streaming & Media Delivery](/tech/5gms).

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the Release 17 placement of edge media processing and eMBMS delivery in TS 26.501, the Release 18 placement of TS 26.510 and of the TS 26.531 / TS 26.532 alignment, and the Release 19 placement of the Advanced Media Delivery work. Verify against the 3GPP work plan before publication.
:::

## Related Standards Work

* [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs)
* [Standards: UE Data Collection & Exposure](/tech/standards/data-collection)
* [Standards: Real-Time Media Communication (RTC)](/tech/standards/rtc)
* [Developer portal: 5G Media Streaming reference tools](https://developer.5g-mag.com/5gms)
* [Technical Documentation: Streaming & Media Delivery](/tech/5gms)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
