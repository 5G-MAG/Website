---
hide_title: true
title: UE Data Collection
sidebar_position: 16
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
</div>
<div class="topic-banner__text">
<h1>UE Data Collection</h1>
<p>How devices report media consumption and quality-of-experience data back to the network for analytics.</p>
</div>
</div>

## Overview

UE data collection covers the 3GPP mechanisms by which a device (user equipment, UE) reports data, such as media consumption and quality of experience, to the network, and by which the network exposes events to consuming functions. For media services this feeds analytics (through the Network Data Analytics Function, NWDAF) and delivery optimisation. The specifications below are grouped by the 3GPP working group responsible for them: SA2 (system architecture and analytics), SA4 (media data collection and reporting, reusing the 5G Media Streaming framework), and CT3 (stage-3 APIs for event exposure and network data analytics). 5G-MAG tracks and contributes to this work. For acronyms used here, see the [Glossary](/tech/standards/glossary).

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The Data Collection Application Function (DCAF) architecture and event-exposure analysis.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/data-collection/data-collection-event-exposure">Tech: UE Data Collection and Event Exposure</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference implementation for UE data collection, reporting and event exposure.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/data-collection">UE Data Collection</a></li>
</ul>
</div>
</div>

</div>

## The work area

Historically, UE-side quality of experience (QoE) data in 3GPP media services was collected through mechanisms specific to a single service, for example the QoE metrics defined for progressive download and DASH in [TS 26.247](https://www.3gpp.org/dynareport/26247.htm), or the reception reporting and consumption reporting of MBMS in [TS 26.346](https://www.3gpp.org/dynareport/26346.htm). Each service defined its own configuration, reporting format and collection endpoint. As more media features moved into the 5G Media Streaming (5GMS) framework (TS 26.501, TS 26.512), 3GPP SA4 defined a single, reusable data collection and reporting framework that any data domain can instantiate, rather than repeating a bespoke pipeline per feature.

That framework is specified in two SA4 documents: TS 26.531 (general description and architecture, the stage-2 view) and TS 26.532 (protocols, formats and the stage-3 APIs). It introduces one central network function, the Data Collection Application Function (DCAF, formally the Data Collection AF), and a small set of named reference points, R1 to R6, that connect the DCAF to the entities around it. The framework is deliberately abstract: TS 26.531 defines it so that it can be embedded inside the architecture of another data domain (for example inside 5GMS downlink media streaming), reusing the same provisioning, reporting and exposure interfaces.

The collected UE data is not exposed raw. The Provisioning AF configures Data Access Profiles that constrain what may be exposed and require the DCAF to aggregate or otherwise process the data before it leaves the function, which is how the framework supports data-minimisation and access control by design.

## Architecture and key concepts

The framework is organised around the following functional entities:

* **Data Collection Application Function (DCAF)** - the central function. It receives provisioning from the application, offers reporting configurations to clients in the UE and to Application Servers, collects and buffers the reported data, and exposes processed events to consumers.
* **Provisioning AF** - a function in the Application Service Provider (ASP) domain that configures what data is to be collected, how it is sampled and reported, and which Data Access Profiles govern exposure.
* **Direct Data Collection Client** - a client in the UE that obtains a reporting configuration from the DCAF and sends reports to it directly.
* **Indirect Data Collection Client** - a client in the UE that reports via an intermediary rather than directly to the DCAF.
* **Application Server (AS)** - a server-side source of data reports for the same collected data set.
* **Event Consumer AF** - an Application Function that subscribes to and receives exposed events. A typical consumer is the NWDAF, the 5G core function that produces network analytics.

### Reference points R1 to R6

The reference points are named interfaces between the DCAF and the surrounding entities. Grouped by function:

| Reference point | Between | Purpose |
|-----------------|---------|---------|
| R1 | Provisioning AF and DCAF | Provision data collection and reporting (sessions, reporting configurations, Data Access Profiles). |
| R2 | Direct Data Collection Client (UE) and DCAF | Fetch reporting configuration and submit reports directly; carried over an encrypted transfer protocol. |
| R3 | Indirect Data Collection Client (UE) and DCAF | Fetch reporting configuration and submit reports via an intermediary. |
| R4 | Application Server and DCAF | Fetch reporting configuration and submit reports from the server side. |
| R5 | DCAF and NWDAF | Expose processed event data to network analytics. |
| R6 | DCAF and Event Consumer AF | Expose processed event data to a consuming Application Function. |

Provisioning at R1 defines, per Event ID, a set of Data Access Profiles. A Data Access Profile specifies the processing operations (for example time-window aggregation with a function such as SUM) that the DCAF applies to collected data before exposing the resulting event over R5 or R6. This is the mechanism that restricts exposure and enforces aggregation.

The stage-3 APIs that realise these reference points are: `Ndcaf_DataReportingProvisioning` and `Ndcaf_DataReporting` (TS 26.532) for R1 to R4, and `Naf_EventExposure` / `Nnef_EventExposure` (TS 29.517) for exposure at R5 and R6. The DCAF may expose either directly as an AF (`Naf_...`) or via the Network Exposure Function using the `Nnef_...` variants.

## Specifications by role and release

The framework reuses the wider 5G core analytics and exposure machinery rather than duplicating it. The specifications fall into three roles, tracked in the tables below.

* **System architecture and analytics (SA2):** TS 23.288 defines the NWDAF and the network data analytics architecture into which exposed UE data feeds. This is the consumer side of the framework.
* **Media data collection and reporting (SA4):** TS 26.531 and TS 26.532 define the DCAF framework itself. TS 26.501 and TS 26.512 define the 5GMS framework into which the DCAF is embedded for media data reporting (5GMS defines media-specific reporting such as QoE and consumption reporting that can use the DCAF as the collection endpoint).
* **Stage-3 core network APIs (CT3):** TS 29.517 (AF event exposure), TS 29.520 (NWDAF services), TS 29.522 (NEF northbound) and TS 29.591 (NEF southbound) provide the REST APIs used for event exposure and analytics.

The reusable DCAF framework (TS 26.531 / TS 26.532) was introduced in 3GPP Release 17 and continued in Release 18; 5G-MAG's reference implementation targets a Release 18 profile of the framework. The underlying analytics architecture (TS 23.288, NWDAF) originates in Release 16 and has been extended in subsequent releases. Because these documents are still maintained across releases, the release placement of individual features should be checked against the current 3GPP work plan before it is relied upon.

## 5G-MAG tracking and contribution focus

5G-MAG tracks the SA4 data collection and reporting framework and maintains a reference implementation of the DCAF (a reusable service-provider library plus a runnable Application Function that exercises R1, R2 and R6). The organisation's tracking issues against TS 26.531 and TS 26.532 (for example clarifications on report scope and on `reportFormat` URIs) are raised in the public [5G-MAG Standards repository](https://github.com/5G-MAG/Standards/). The deeper technical view of the interfaces and procedures is on the [Tech portal](/tech/data-collection/data-collection-event-exposure), and the reference tooling is described on the [Developer portal](https://developer.5g-mag.com).

## Related 3GPP Specifications

This is a list of specifications in the scope of UE data collection, reporting and event exposure.

### SA2 (System architecture and analytics)

 Number | Title
 -- | --
[TS 23.288](https://www.3gpp.org/dynareport/23288.htm) | Architecture enhancements for 5G System (5GS) to support network data analytics services

### SA4 (Media data collection and reporting)

 Number | Title
 -- | --
[TS 26.531](https://www.3gpp.org/dynareport/26531.htm) | Data Collection and Reporting; General Description and Architecture
[TS 26.532](https://www.3gpp.org/dynareport/26532.htm) | Data Collection and Reporting; Protocols and Formats
[TS 26.501](https://www.3gpp.org/dynareport/26501.htm) | 5G Media Streaming (5GMS); General description and architecture
[TS 26.512](https://www.3gpp.org/dynareport/26512.htm) | 5G Media Streaming (5GMS); Protocols

### CT3 (Stage-3 core network APIs)

These are the stage-3 API specifications for exposing events, including the Network Exposure Function (NEF) northbound and southbound APIs.

 Number | Title
 -- | --
[TS 29.517](https://www.3gpp.org/dynareport/29517.htm) | 5G System; Application Function Event Exposure Service; Stage 3
[TS 29.520](https://www.3gpp.org/dynareport/29520.htm) | 5G System; Network Data Analytics Services; Stage 3
[TS 29.522](https://www.3gpp.org/dynareport/29522.htm) | 5G System; Network Exposure Function Northbound APIs; Stage 3
[TS 29.591](https://www.3gpp.org/dynareport/29591.htm) | 5G System; Network Exposure Function Southbound Services; Stage 3

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the R1 to R6 reference-point mapping and per-reference-point purpose, the assignment of the `Ndcaf_DataReportingProvisioning`, `Ndcaf_DataReporting`, `Naf_EventExposure` and `Nnef_EventExposure` service operations to specific reference points, and the Release-17/Release-18 placement of TS 26.531 and TS 26.532. Verify against the 3GPP/ETSI work plan before publication.
:::

## Related Standards Work

* [Standards: 5G Media Streaming](/tech/standards/5gms)
* [Standards: Network APIs](/tech/standards/network-apis)
* [Standards: AI/ML in 5G Media](/tech/standards/ai-ml)
* [Developer portal: UE Data Collection reference tools](https://developer.5g-mag.com)
* [Technical Documentation: UE Data Collection, Reporting & Event Exposure](/tech/data-collection/data-collection-event-exposure)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
