---
hide_title: true
title: UE Data Collection, Reporting and Event Exposure
slug: /standards/data-collection
sidebar_position: 16
description: Explains the Data Collection Application Function (DCAF) framework letting UEs report media consumption and QoE data for network analytics.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>UE Data Collection, Reporting and Event Exposure</h1>
</div>
</div>

<div class="topic-lead">
How devices report media consumption and quality-of-experience data back to the network for analytics.
</div>

## Overview

UE data collection covers the 3GPP mechanisms by which a device (user equipment, UE) reports data, such as media consumption and quality of experience, to the network, and by which the network exposes events to consuming functions. The specifications below are grouped by the 3GPP working group responsible for them: SA2 (system architecture and analytics), SA4 (media data collection and reporting, reusing the 5G Media Streaming framework), and CT3 (stage-3 APIs for event exposure and network data analytics). For the technical analysis of the DCAF architecture and its reference points, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The Data Collection Application Function (DCAF) architecture and event-exposure analysis.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/data-collection/data-collection-event-exposure">Tech: UE Data Collection</a></li>
</ul>
</div>
</div>

</div>

## Specifications by role and release

- **System architecture and analytics (SA2):** TS 23.288 defines the NWDAF and the network data analytics architecture into which exposed UE data feeds.
- **Media data collection and reporting (SA4):** TS 26.531 and TS 26.532 define the DCAF framework. TS 26.501 and TS 26.512 define the 5GMS framework into which the DCAF is embedded for media data reporting.
- **Stage-3 core network APIs (CT3):** TS 29.517 (AF event exposure), TS 29.520 (NWDAF services), TS 29.522 (NEF northbound) and TS 29.591 (NEF southbound) provide the REST APIs used for event exposure and analytics.

The DCAF framework (TS 26.531 / TS 26.532) was introduced in 3GPP Release 17 and continued in Release 18. The analytics architecture (TS 23.288, NWDAF) originates in Release 16 and has been extended in subsequent releases. Check the version of each specification you are targeting for the exact release content.

## Related 3GPP Specifications

This is a list of specifications in the scope of UE data collection, reporting and event exposure.

### SA2 (System architecture and analytics)

| Number                                                 | Title                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [TS 23.288](https://www.3gpp.org/dynareport/23288.htm) | Architecture enhancements for 5G System (5GS) to support network data analytics services |

### SA4 (Media data collection and reporting)

| Number                                                 | Title                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------- |
| [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) | Data Collection and Reporting; General Description and Architecture |
| [TS 26.532](https://www.3gpp.org/dynareport/26532.htm) | Data Collection and Reporting; Protocols and Formats                |
| [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) | 5G Media Streaming (5GMS); General description and architecture     |
| [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) | 5G Media Streaming (5GMS); Protocols                                |

### CT3 (Stage-3 core network APIs)

These are the stage-3 API specifications for exposing events, including the Network Exposure Function (NEF) northbound and southbound APIs.

| Number                                                 | Title                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------- |
| [TS 29.517](https://www.3gpp.org/dynareport/29517.htm) | 5G System; Application Function Event Exposure Service; Stage 3   |
| [TS 29.520](https://www.3gpp.org/dynareport/29520.htm) | 5G System; Network Data Analytics Services; Stage 3               |
| [TS 29.522](https://www.3gpp.org/dynareport/29522.htm) | 5G System; Network Exposure Function Northbound APIs; Stage 3     |
| [TS 29.591](https://www.3gpp.org/dynareport/29591.htm) | 5G System; Network Exposure Function Southbound Services; Stage 3 |

:::warning[References to verify]
The Release-17/Release-18 placement of TS 26.531 and TS 26.532 was not confirmed against a primary source (the 3GPP/ETSI portals block automated access). Verify against the 3GPP/ETSI work plan before publication. For the verification status of the R1 to R6 reference-point mapping and stage-3 API assignments, see [Tech: UE Data Collection](/tech/data-collection/data-collection-event-exposure).
:::

## 5G-MAG tracking and contribution focus

5G-MAG tracks the SA4 data collection and reporting framework. The organisation's tracking issues against TS 26.531 and TS 26.532 (for example clarifications on report scope and on `reportFormat` URIs) are raised in the public [5G-MAG Standards repository](https://github.com/5G-MAG/Standards/). The deeper technical view of the interfaces and procedures is on the [Tech portal](/tech/data-collection/data-collection-event-exposure).

## Related Standards Work

- [Standards: 5G Media Streaming](/standards/5gms)
- [Standards: Network APIs](/standards/network-apis)
- [Standards: AI & ML in 5G Media](/standards/ai-ml)
- [Technical Documentation: UE Data Collection](/tech/data-collection/data-collection-event-exposure)
- [Meetings with 3GPP SA4](/standards/3gpp-issue-tracking): the live tracker for 3GPP feedback issues on this specification

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
