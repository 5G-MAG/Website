---
title: UE Data Collection
sidebar_position: 4
hide_title: true
description: Describes the 3GPP DCAF architecture, its R1-R6 reference points, and how UE data is reported and exposed to consumers as events.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
</div>
<div class="topic-banner__text">
<h1>UE Data Collection</h1>
</div>
</div>

## UE Data Collection, Reporting & Event Exposure - Tech Resources

## Overview

User Equipment (UE) data collection covers the 3GPP mechanisms by which a device reports data, such as media consumption and quality of experience (QoE), to the network, and by which the network exposes events to consuming functions. For media services this feeds analytics and delivery optimisation. This page covers the reference tooling and technical resources for the Data Collection Application Function (DCAF) and event exposure framework. 5G-MAG tracks this work and maintains related reference implementations.

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/21)

The slide deck below introduces the UE data collection, reporting and event exposure framework; download the file for the full detail.

<iframe width="60%" height="520" src="/docs/Reference_Tools_UE_data_collection.pdf"></iframe>

[Download the slidedeck with more information](/docs/Reference_Tools_UE_data_collection.pdf)

---

## Framework and reference architecture

The data collection and reporting framework is specified by 3GPP SA4 in two documents: [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) (Data Collection and Reporting; General Description and Architecture, the stage-2 view) and [TS 26.532](https://www.3gpp.org/dynareport/26532.htm) (Data Collection and Reporting; Protocols and Formats, the stage-3 APIs and data models). The framework is deliberately abstract. TS 26.531 defines a generic architecture intended to be instantiated inside another data domain, so the same Data Collection Application Function (DCAF), the same reference points and the same provisioning model are reused whether the DCAF runs standalone or embedded in 5G Media Streaming ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm)).

The framework distinguishes a small set of functional entities:

* **Data Collection Application Function (DCAF)** - receives provisioning from the application, offers reporting configurations to clients, collects and buffers reported data, applies the configured processing, and exposes the resulting events.
* **Provisioning AF** - configures the DCAF: it creates provisioning sessions, defines reporting configurations (sampling, reporting conditions), and sets the Data Access Profiles that govern exposure.
* **Direct Data Collection Client** - a UE-side client that fetches its configuration from the DCAF and reports directly to it over an encrypted transfer protocol.
* **Indirect Data Collection Client** - a UE-side client that reports via an intermediary rather than directly.
* **Application Server (AS)** - a server-side source of reports for the same data set.
* **Event Consumer AF** - the function that subscribes to and receives exposed events; a typical consumer is the NWDAF ([TS 23.288](https://www.3gpp.org/dynareport/23288.htm)), the 5G core analytics function.

## Reference points R1 to R6

The reference points are the named interfaces between the DCAF and the surrounding entities. The framework groups them by role: provisioning (R1), data reporting (R2, R3, R4) and event exposure (R5, R6).

| Reference point | Endpoints | Service / API | What it does |
|-----------------|-----------|---------------|--------------|
| R1 | Provisioning AF ↔ DCAF | `Ndcaf_DataReportingProvisioning` (TS 26.532) | Create/modify provisioning sessions, data reporting configurations and Data Access Profiles. |
| R2 | Direct Data Collection Client (UE) ↔ DCAF | `Ndcaf_DataReporting` (TS 26.532) | Fetch reporting configuration and submit reports directly; encrypted transfer required. |
| R3 | Indirect Data Collection Client (UE) ↔ DCAF | `Ndcaf_DataReporting` (TS 26.532) | Fetch configuration and submit reports via an intermediary. |
| R4 | Application Server ↔ DCAF | `Ndcaf_DataReporting` (TS 26.532) | Fetch configuration and submit reports from the server side. |
| R5 | DCAF ↔ NWDAF | `Naf_EventExposure` / `Nnef_EventExposure` ([TS 29.517](https://www.3gpp.org/dynareport/29517.htm)) | Expose processed events to network analytics. |
| R6 | DCAF ↔ Event Consumer AF | `Naf_EventExposure` / `Nnef_EventExposure` (TS 29.517) | Expose processed events to a consuming Application Function. |

All clients that wish to report must first obtain a data collection and reporting configuration from the DCAF at R2, R3 or R4 as appropriate. The DCAF may expose events either directly as an Application Function (using the `Naf_EventExposure` operations) or through the Network Exposure Function (using the `Nnef_EventExposure` variants, with the NEF northbound/southbound APIs in [TS 29.522](https://www.3gpp.org/dynareport/29522.htm) and [TS 29.591](https://www.3gpp.org/dynareport/29591.htm)).

## Provisioning and the exposure controls (R1)

Provisioning at R1 uses the `Ndcaf_DataReportingProvisioning` service (TS 26.532). The flow has two parts: create a data reporting **provisioning session** (associating an Event ID and one or more data reporting configuration IDs with an Application Service Provider), then create one or more **data reporting configurations** that describe how data is sampled and reported and, critically, the **Data Access Profiles** that constrain exposure.

A Data Access Profile specifies the processing that the DCAF must perform on collected UE data before it is exposed. For example, a profile can require time-window aggregation over a fixed duration using an aggregation function such as SUM, and can restrict which consumer types (for example NWDAF or a generic Event Consumer AF) may receive the resulting event. This is the mechanism by which the framework enforces data minimisation and controlled exposure: consumers at R5/R6 receive synthesised event data, not raw per-report data. The provisioning request bodies for creating a session and a configuration are shown on the [developer scope page](/developer/data-collection).

## Data reporting (R2/R3/R4)

At R2 the Direct Data Collection Client first obtains its configuration, then opens a data reporting session (identifying the external application and the supported data domains, for example `COMMUNICATION`), and then submits reports. TS 26.532 defines the report formats and their `reportFormat` URIs, and defines event types for 5GMS features whose corresponding data types are added to TS 29.517 for exposure. An encrypted transfer protocol is mandated at R2 to protect the secrecy and integrity of collected UE data in transit. R3 (indirect client) and R4 (Application Server) use the same `Ndcaf_DataReporting` service, differing only in the reporting source.

## Event subscription and exposure (R5/R6)

At R6, an Event Consumer AF creates an individual event exposure subscription on the DCAF using `Naf_EventExposure_Subscribe` (TS 29.517), naming the events of interest, optional event filters, a reporting method (for example periodic with a report period), and a notification URI. The DCAF then delivers matching events with `Naf_EventExposure_Notify`. R5 provides the same exposure toward the NWDAF. Because exposure is governed by the Data Access Profiles set at R1, a subscriber only receives the processed events that the provisioning permits for its consumer type.

## Deployment shapes

The DCAF can be deployed standalone or integrated with 5G Downlink Media Streaming (5GMSd). In the standalone deployment the DCAF collects and exposes UE-side data on its own. In the integrated deployment it is combined with the 5GMSd data reporting framework, so media-specific reporting (such as QoE and consumption reporting) uses the DCAF as its collection endpoint. Docker-Compose setups are provided to bring up the standalone DCAF quickly for testing. The developer-facing detail, request/response examples and tutorials are on the [developer scope page](/developer/data-collection).

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact R1 to R6 reference-point mapping and per-reference-point endpoints, the assignment of the `Ndcaf_DataReportingProvisioning`, `Ndcaf_DataReporting`, `Naf_EventExposure` and `Nnef_EventExposure` service operations to specific reference points, and the statement that TS 26.532 event types have corresponding data types added to TS 29.517. Verify against the 3GPP/ETSI work plan before publication.
:::

## Information related to Standards

[Standards](/tech/standards/data-collection)

## Information related to Reference Tools Projects

[Project: UE data collection, reporting and event exposure](/developer/data-collection)

---

## Technical Documentation

The following resources are available:

### General information about UE Data Collection, Reporting and Event Exposure

#### Recorded talk

* [**UE Data Collection and Reporting framework for Event Exposure (3GPP Release 17)**](../videos#ue-data-collection-and-reporting-framework-for-event-exposure-3gpp-release-17)
