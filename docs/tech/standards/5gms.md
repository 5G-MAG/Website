---
hide_title: true
title: 5G Media Streaming (5GMS)
sidebar_position: 4
description: Describes the 5G Media Streaming architecture, M1-M8 reference points, related 3GPP specifications and Release-19 Advanced Media Delivery work.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>5G Media Streaming (5GMS)</h1>
</div>
</div>

<div class="topic-lead">
The 5GMS architecture, M1-M8 reference points, related 3GPP specifications and Release-19 Advanced Media Delivery work.
</div>

## Overview

5G Media Streaming (5GMS) is the 3GPP framework for delivering streaming media over 5G networks, in downlink (5GMSd) and uplink (5GMSu) directions. This page lists the specifications in scope and 5G-MAG's tracking focus; for the technical analysis of how the architecture works, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The implementer-facing analysis of the 5GMS architecture and its entities.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/5gms">Technical Documentation: Streaming &amp; Media Delivery</a></li>
</ul>
</div>
</div>

</div>

## Architecture and key concepts

5GMS is a functional extension of the 5G System, defined in [TS 26.501](https://www.3gpp.org/dynareport/26501.htm). Its main functional entities are the 5GMS Application Provider, Application Function (AF), Application Server (AS), and Client (split into Media Session Handler and Media Player for downlink, or Media Streamer for uplink). For the entity roles and sub-functions, see the [5GMS Overview](/tech/5gms/overview-5gms).

The entities are joined by reference points M1 to M8 (downlink variants carry a "d" suffix, uplink a "u" suffix):

| Reference point | Between                                                                     | Purpose                                                        |
| :--------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| M1               | Application Provider to AF                                                  | Provisioning                                                   |
| M2               | Application Provider to AS                                                  | Content ingest (downlink) / egest (uplink)                     |
| M3               | AF to AS                                                                     | Internal AF-to-AS configuration (not standardised)              |
| M4               | AS to Media Player, or Media Streamer to AS                                 | Media delivery (downlink) / ingest (uplink)                     |
| M5               | Media Session Handler to AF                                                 | Session handling and reporting                                  |
| M6               | Media Session Handler to Media Player/Streamer and to the Aware Application | UE-internal APIs                                                |
| M7               | Media Player/Streamer to Media Session Handler                              | UE-internal APIs                                                |
| M8               | Application Provider to 5GMS-Aware Application                              | Service-level exchange, outside the 3GPP scope                  |

For the deeper architecture (entity sub-functions, the M1 to M8 interfaces per direction, and the downlink feature-to-API mapping), see the technical documentation on the [5GMS Overview](/tech/5gms/overview-5gms) and [5GMSd Features](/tech/5gms/features-5gmsd) pages.

These M1-M8 reference points are specific to 5G Media Streaming and are distinct from the similarly-named M1/M2/M3 MBMS network interfaces used by [Standards: 5G Broadcast](/tech/standards/5g-broadcast).

## 5G Core service consumers used by the AF

The 5GMS AF is a consumer of two 5G Core service-based APIs for the unicast media path:

- **Binding Support Function (BSF), [TS 29.521](https://www.3gpp.org/dynareport/29521.htm)**: `Nbsf_Management` service.
- **Policy Control Function (PCF), [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)**: `Npcf_PolicyAuthorization` service, at reference point N5.

For the equivalent multicast/broadcast service consumer (the MB-SMF, TS 29.532), see [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs).

## Related 3GPP Specifications

The 5G Media Streaming architecture is defined in TS 26.501. Protocols and APIs are specified in TS 26.512, which references the generalized Media Session Handling defined in TS 26.510. Profiles, codecs and formats are provided in TS 26.511.

- **[TS 26.501](https://www.3gpp.org/dynareport/26501.htm) - 5G Media Streaming (5GMS); General description and architecture**
- **[TS 26.512](https://www.3gpp.org/dynareport/26512.htm) - 5G Media Streaming (5GMS); Protocols**
- **[TS 26.510](https://www.3gpp.org/dynareport/26510.htm) - Media delivery; interactions and APIs for provisioning and media session handling**
- **[TS 26.511](https://www.3gpp.org/dynareport/26511.htm) - 5G Media Streaming (5GMS); Profiles, codecs and formats**

Two companion specifications define the generic UE data collection framework that 5GMS reporting can feed into:

- **[TS 26.531](https://www.3gpp.org/dynareport/26531.htm) - Data Collection and Reporting; General Description and Architecture**
- **[TS 26.532](https://www.3gpp.org/dynareport/26532.htm) - Data Collection and Reporting; Protocols and Formats**

The 5GMS AF is a consumer, not a producer, of two further 5G Core service-based APIs that the unicast (5GMSd/5GMSu) path relies on:

- **[TS 29.521](https://www.3gpp.org/dynareport/29521.htm) - 5G System; Binding Support Management Service; Stage 3**
- **[TS 29.514](https://www.3gpp.org/dynareport/29514.htm) - 5G System; Policy Authorization Service; Stage 3**

## Specifications by Role

| Role                                    | Specification(s)                                     |
| ---------------------------------------- | ------------------------------------------------------ |
| Architecture and features                | TS 26.501                                             |
| Provisioning and session-handling APIs   | TS 26.510 (from Release 18), TS 26.512 (Release 17)   |
| Media-plane protocols                    | TS 26.512                                             |
| Profiles, codecs and formats             | TS 26.511                                             |
| Data collection and reporting            | TS 26.531, TS 26.532                                  |
| Core service consumers used by the AF    | TS 29.521, TS 29.514                                  |

## Specifications by release

- **Release 15/16**: TS 26.501, TS 26.511, TS 26.512 (downlink and uplink architecture, first feature set: content hosting, dynamic policies, network assistance, consumption and QoE metrics reporting).
- **Release 17**: adds edge media processing and 5GMS delivery over eMBMS. The reference tools baseline maps to this release, where the provisioning and session-handling APIs are still in TS 26.512.
- **Release 18**: TS 26.510 is created and the media session handling APIs move out of TS 26.512 into it, generalised across the 5GMS and RTC systems. Data collection, reporting and event exposure is aligned with TS 26.531 and TS 26.532.
- **Release 19**: Advanced Media Delivery (see below), studied in TR 26.804.

Check the version of each specification you are targeting for the exact release content.

## Release-19 Advanced Media Delivery

Advanced Media Delivery (AMD) is the Release-19 line of work extending 5G Media Streaming, for example multicast delivery and client-data reporting. See [Advanced Media Delivery](/tech/5gms/overview-amd) for the technical detail. Release 19 studies these extensions in the following Technical Reports (study phase, informative); the reports and external specifications below feed that work.

Technical Reports:

- **[TR 26.804](https://www.3gpp.org/dynareport/26804.htm) - Study on 5G media streaming extensions**

### Related Technical Report (release unconfirmed)

- **[TR 26.802](https://www.3gpp.org/dynareport/26802.htm) - Multicast Architecture Enhancement for 5G Media Streaming**

:::warning[Needs verification]
TR 26.802 relates to 5GMS multicast architecture but its release is unconfirmed (possibly Release 17 rather than Release 19). It is listed here separately from the Release-19 Advanced Media Delivery reports above until its release and section placement is confirmed against the [3GPP specification record](https://www.3gpp.org/dynareport/26802.htm).
:::

### Common Media Client Data (CMCD)

Common Media Client Data (CMCD) is a CTA standard (CTA-5004) for client-side playback and quality reporting. See [Advanced Media Delivery](/tech/5gms/overview-amd) for how 3GPP integrates it into the 5GMS reporting framework.

- **Specification: [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf) - Web Application Video Ecosystem - Common Media Client Data**
  - Complementary information: [DASH-IF Special Sessions on CMCD (2022)](https://dashif.org/events/special-sessions/#special-sessions-2022)
- Stage 3 support summarized in the following CRs: [S4-251463](https://www.3gpp.org/ftp/tsg_sa/WG4_CODEC/TSGS4_133-e/Docs/S4-251463.zip) (26.510) and [S4aI250146](https://www.3gpp.org/ftp/TSG_SA/WG4_CODEC/3GPP_SA4_AHOC_MTGs/SA4_MBS/Docs/S4aI250146.zip) (26.512)

### Coded Multisource Media Format (CMMF)

Coded Multisource Media Format (CMMF) is an ETSI format for retrieving a single piece of content in coded chunks from multiple sources. See [Advanced Media Delivery](/tech/5gms/overview-amd) for the technical detail.

- **Specification: [ETSI TS 103 973](https://www.etsi.org/deliver/etsi_ts/103900_103999/103973/01.01.01_60/ts_103973v010101p.pdf) - Coded Multisource Media Format (CMMF) for Content Distribution and Delivery**

## 5G-MAG tracking and contribution focus

5G-MAG tracks the 5GMS specifications in 3GPP SA4. The current focus areas are:

- **Release 18 API migration:** tracking the move of the media session handling APIs from TS 26.512 into TS 26.510 and the generalisation across the 5GMS and RTC systems.
- **Advanced Media Delivery (Release 19):** following the TR 26.804 study and the stage-3 work that brings CMCD reporting and CMMF multi-source delivery into the media delivery specifications.
- **Data collection and event exposure:** the generic UE data collection framework (TS 26.531 and TS 26.532), tracked so that 5GMS consumption and QoE metrics can be exposed to consuming functions.

For implementation analysis, see [Streaming & Media Delivery](/tech/5gms).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the Release 17 placement of edge media processing and eMBMS delivery in TS 26.501, the Release 18 placement of TS 26.510 and of the TS 26.531 / TS 26.532 alignment, and the Release 19 placement of the Advanced Media Delivery work. Verify against the 3GPP work plan before publication.
:::

## Related Standards Work

- [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs)
- [Standards: UE Data Collection](/tech/standards/data-collection)
- [Standards: Real-Time Communications (RTC)](/tech/standards/rtc)
- [Technical Documentation: Streaming & Media Delivery](/tech/5gms)
- [Meetings with 3GPP SA4](/standards/3gpp-issue-tracking): the live tracker for 3GPP feedback issues on this specification

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
