---
title: Scope
hide_title: true
sidebar_position: 0
description: Details the DCAF architecture, the R1, R2 and R6 interfaces, and the 3GPP specs (TS 26.531/532) it implements.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
  <path d="M9 17l0 -5" />
  <path d="M12 17l0 -1" />
  <path d="M15 17l0 -3" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">UE Data Collection, Reporting and Event Exposure</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/reference-tools/data-collection/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/reference-tools/data-collection/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/reference-tools/data-collection/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="/reference-tools/data-collection/tutorials#developer-exchange" style="margin: 2px 4px 2px 0">Developer Exchange</a></div>

The UE (User Equipment) Data Collection, Reporting and Event Exposure framework is defined in 3GPP Release 18 (Rel-18) to enable on-device collection and structured reporting of media performance data. It specifies the Data Collection Application Function (DCAF) and the associated provisioning, reporting and event exposure interfaces (R1 to R6), allowing application service providers to receive UE-side metrics and trigger analytics or policy decisions. R1 to R6 are named 3GPP reference points: the interfaces between the DCAF and the surrounding entities. The deliverable here is a reusable Rel-18 DCAF service-provider library together with a runnable Application Function that exercises these interfaces.

The interface sections below are presented in usage order (provision, then subscribe, then report): R1 (provisioning), R6 (event subscription and exposure) and R2 (direct data reporting). The remaining reference points R3 to R5 also exist in the framework but are not covered on this page.

Technical documentation providing context to this project can be found in the link below.

[Streaming & Media Delivery](/tech/5gms)

A list of relevant specifications can be found in the link below.

[Standards: UE Data Collection, Reporting and Event Exposure](/tech/standards/data-collection)

## What is being implemented?

:::tip[In short]
A reusable Rel-18 DCAF Service Provider library for data reporting and event exposure. These functional entities could later on be integrated within the data reporting framework of 5G Media Streaming (5GMS).
:::

### Generic UE Data Collection, Reporting and Event Exposure

A functional Data Collection Application Function (DCAF) implementation is available. In the diagram below, the building blocks marked with a green tick are the ones already implemented.

<img loading="lazy" src="/assets/images/dcaf/UEDC_RT.png" alt="DCAF functional blocks, with implemented blocks marked by a green tick" />

_Figure: DCAF functional blocks; a green tick marks each implemented building block._

The implementation covers the generic handling of provisioning, the receipt and queueing of data reports, and event subscription management and exposure. It provides service endpoints for provisioning (R1), data reporting (R2/R3/R4) and event subscription/exposure (R5/R6).

An illustrative usage sequence flow is shown below, tracing the actors (Application Service Provider, DCAF, UE) through the provisioning, subscription and reporting phases:

<img loading="lazy" src="/assets/images/dcaf/usage-sequence-diagram.png" alt="Sequence diagram of the DCAF usage flow across provisioning, subscription and reporting phases" />

The following tutorial covers the setup of a Data Collection Application Function and usage of APIs.

[Go to the Tutorial: Data Collection Application Function with Docker and Insomnia REST client](./tutorials/docker-with-insomnia)

## R1 (Provisioning API) - Ndcaf_DataReportingProvisioning

R1 supports interactions between a Provisioning AF (in the Application Service Provider) and the Data Collection AF to:

- Provision data collection and reporting in a Data Collection AF (by means of the [Ndcaf_DataReportingProvisioning](https://jdegre.github.io/loader.html?yaml=TS26532_Ndcaf_DataReportingProvisioning.yaml) service).

### Creating a Data Reporting Provisioning Session

A Data Reporting Provisioning Session ties an Application Service Provider (`aspId`) and an event (`eventId`) to one or more Data Reporting Configurations. The shape of the request body:

```json
{
  "aspId": "string",
  "eventId": "UE_COMM",
  "dataReportingConfigurationIds": ["string"]
}
```

`UE_COMM` is the example eventId that has been implemented (UE communication information). See the [Docker + Insomnia tutorial](./tutorials/docker-with-insomnia) for the full request body and a working walkthrough.

### Creating a Data Reporting Configuration

A Data Reporting Configuration defines how a client samples and reports data, and which access profiles may consume it. The shape of the request body:

```json
{
  "dataCollectionClientType": "DIRECT",
  "dataSamplingRules": [{ "samplingPeriod": 10.0 }],
  "dataReportingConditions": [{ "type": "INTERVAL", "period": 60 }],
  "dataAccessProfiles": [
    {
      "dataAccessProfileId": "per_min_totals",
      "targetEventConsumerTypes": ["NWDAF", "EVENT_CONSUMER_AF"]
    }
  ]
}
```

See the [Docker + Insomnia tutorial](./tutorials/docker-with-insomnia) for the full request body and a working walkthrough.

## R6 (Event Exposure API) - Naf_EventExposure

R6 supports interactions between the Event Consumer AF and the Data Collection AF. The Event Consumer AF is the Application Function that subscribes to and receives the exposed events; a typical consumer is the Network Data Analytics Function (NWDAF), the 5G core function that produces network analytics. It works as follows:

- Subscribe to data reporting events exposed by the Data Collection AF (by means of [Naf_EventExposure_Subscribe](https://jdegre.github.io/editor/?url=https://raw.githubusercontent.com/jdegre/5GC_APIs/Rel-17/TS29517_Naf_EventExposure.yaml) or Nnef_EventExposure_Subscribe services) - when used by an Event Consumer AF.
- Expose data reporting events to the Event Consumer AF (by means of [Naf_EventExposure_Notify](https://jdegre.github.io/editor/?url=https://raw.githubusercontent.com/jdegre/5GC_APIs/Rel-17/TS29517_Naf_EventExposure.yaml) or Nnef_EventExposure_Notify services) - when subsequently used by the Data Collection AF.

### Subscribing for Events

An Individual Application Event Exposure Subscription names the event to subscribe to and where to send notifications. The shape of the request body:

```json
{
  "eventsSubs": [{ "event": "UE_COMM", "eventFilter": { "anyUeInd": true } }],
  "eventsRepInfo": { "notifMethod": "PERIODIC", "repPeriod": 10 },
  "notifUri": "http://h2-server:8888/dcaf/notification/handler"
}
```

See the [Docker + Insomnia tutorial](./tutorials/docker-with-insomnia) for the full request body and a working walkthrough.

## R2 (Direct Data Reporting API) - Ndcaf_DataReporting

R2 supports interactions between the Direct Data Collection Client in the UE and the Data Collection AF to:

- Obtain data collection and reporting configuration from the corresponding Data Collection AF instance (by means of Ndcaf_DataReporting service) - when used by a Direct Data Collection Client instance.
- Send reports to a Data Collection AF instance (by means of Ndcaf_DataReporting service) - when subsequently used by the Direct Data Collection Client.

The shape of the request body when creating a new Data Reporting Session:

```json
{
  "externalApplicationId": "{{ _.external_application_id }}",
  "supportedDomains": ["COMMUNICATION"]
}
```

See the [Docker + Insomnia tutorial](./tutorials/docker-with-insomnia) for the full request body and a working walkthrough.

## High-level architectures

Two deployment shapes are shown below: the DCAF running on its own (standalone), and the DCAF integrated alongside 5G Downlink Media Streaming.

### Standalone UE Data Collection, Reporting and Event Exposure

This is the standalone DCAF deployment, where the Data Collection AF is used on its own to collect and expose UE-side data.

<img loading="lazy" src="/assets/images/projects/uedc_diagram.png" style="width: 80%" alt="Standalone DCAF architecture, with the Data Collection AF connected to a UE and a consuming Application Service Provider" />

_Figure: standalone DCAF deployment._

[UE Data Collection, Reporting and Event Exposure: Resources](../data-collection/resources)
[3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)

### 5G Downlink Media Streaming (5GMSd) with UE Data Collection Reporting and Event Exposure

This is the integrated deployment, where the DCAF is combined with the 5G Downlink Media Streaming (5GMSd) data reporting framework.

<img loading="lazy" src="/assets/images/projects/5gms_uedc_diagram.png" style="width: 80%" alt="DCAF integrated with the 5G Downlink Media Streaming data reporting framework" />

_Figure: DCAF integrated with 5GMSd data reporting._

[5G Media Streaming: Resources](../5gms/resources)
[UE Data Collection, Reporting and Event Exposure: Resources](../data-collection/resources)
[3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)
[Common Tools](../common-tools/)

## Docker deployment support

Docker-Compose setups are provided to run the Data Collection AF in Docker container environments, so the standalone DCAF can be brought up quickly for testing.

<img loading="lazy" src="/assets/images/dcaf/uedc_docker_1.png" style="width: 80%" alt="Docker-Compose deployment of the Data Collection AF and supporting containers" />

_Figure: Docker-Compose deployment of the Data Collection AF._

[UE Data Collection, Reporting and Event Exposure: Resources](../data-collection/resources)

## Specifications and releases covered

The reference tooling implements the 3GPP SA4 data collection and reporting framework:

- **[TS 26.531](https://www.3gpp.org/dynareport/26531.htm)** - Data Collection and Reporting; General Description and Architecture (the stage-2 architecture: functional entities and the R1 to R6 reference points).
- **[TS 26.532](https://www.3gpp.org/dynareport/26532.htm)** - Data Collection and Reporting; Protocols and Formats (the stage-3 APIs and data models, including `Ndcaf_DataReportingProvisioning` and `Ndcaf_DataReporting`).
- **[TS 29.517](https://www.3gpp.org/dynareport/29517.htm)** - Application Function Event Exposure Service; Stage 3 (the `Naf_EventExposure` API used for event exposure at R6, with the `Nnef_EventExposure` variant when exposing through the NEF).
- **[TS 23.288](https://www.3gpp.org/dynareport/23288.htm)** - Architecture enhancements for network data analytics services (the NWDAF, a typical Event Consumer at R5).

The library targets a 3GPP Release 18 profile of the framework. The event exposure API links in the interface sections above resolve to the Rel-17 and Rel-18 `5GC_APIs` OpenAPI definitions; use the Rel-18 definitions when a matching version is available.

## How the tools map to the standard

The implementation provides a reusable DCAF Service Provider library plus a runnable Application Function. It implements the generic handling described in TS 26.531/26.532, covering provisioning, the receipt and queueing of data reports, and event subscription management, together with the service endpoints for the reference points. The interface coverage exercised on this page is:

- **R1 (provisioning)** via `Ndcaf_DataReportingProvisioning` - create provisioning sessions and data reporting configurations, including Data Access Profiles.
- **R2 (direct data reporting)** via `Ndcaf_DataReporting` - obtain a reporting configuration and submit reports from a Direct Data Collection Client.
- **R6 (event exposure)** via `Naf_EventExposure` - an Event Consumer AF subscribes and receives notifications.

The other reference points in the framework (R3 for the Indirect Data Collection Client, R4 for Application Server reporting, and R5 for NWDAF exposure) exist in the standard but are not exercised by the examples on this page. The green ticks in the DCAF functional-block diagram above indicate which building blocks are implemented.

## Getting started

Bring up the standalone DCAF (see [Docker deployment support](#docker-deployment-support) above), provision it over R1, subscribe an Event Consumer AF over R6, then open a data reporting session and submit reports over R2. The [Docker + Insomnia tutorial](./tutorials/docker-with-insomnia) walks through these steps end to end. The source lives in the [UE Data Collection repositories](../data-collection/resources).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact R1 to R6 reference-point mapping (in particular R3=Indirect Data Collection Client, R4=Application Server, R5=NWDAF exposure), the assignment of `Ndcaf_DataReportingProvisioning`, `Ndcaf_DataReporting` and `Naf_EventExposure` to specific reference points, and the Release-18 placement of TS 26.531/TS 26.532. Verify against the 3GPP work plan before publication.
:::

## Related

- [Resources](./resources)
- [Tutorials](./tutorials)
- Standards: [UE Data Collection, Reporting and Event Exposure](/tech/standards/data-collection)
- Technical documentation: [UE Data Collection on the Tech portal](/tech/data-collection/data-collection-event-exposure)
