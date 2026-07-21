---
title: 5GMSd Features
sidebar_position: 1
hide_title: true
description: Details 5G Media Streaming Downlink (5GMSd) features defined in TS 26.501/26.512, mapping each feature to its reference points and APIs.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>5GMSd Features</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Key Features for 5G Media Streaming - Downlink

This page details the downlink (5GMSd) features and, for each one, the reference points and APIs that implement it. For the overall architecture and how the functional entities fit together, see the [5GMS Overview](./overview-5gms) first.

The 5G Media Streaming Downlink (5GMSd) system is defined in 3GPP [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) (system architecture and feature overview) and 3GPP [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (Application Function APIs). The features below are those implemented in the current reference tools, covering the Release 17 normative baseline.

:::info
Documentation for Release 18 and Release 19 features (including Real-Time Communication (RTC) support and M6/M7 background data transfer) is planned and will be added as implementation progresses.
:::

:::note
The 5G-MAG software implementing these features is available in the [5G Media Streaming Project](/reference-tools/5gms) on the developer portal. For the data-collection feature, see also the [UE Data Collection, Reporting and Event Exposure Project](/reference-tools/data-collection). (Confirm the exact developer-portal paths with the maintainers before publishing.)
:::

| Feature                                 | Defined in (TS 26.501 clause) | Procedure (TS 26.501 clause) | APIs                                                                 |
| --------------------------------------- | ----------------------------- | ---------------------------- | -------------------------------------------------------------------- |
| Content hosting                         | 3GPP TS 26.501 4.0.2          | 3GPP TS 26.501 5.4           | 3GPP [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) + 26.512 |
| Network assistance                      | 3GPP TS 26.501 4.0.5          | 3GPP TS 26.501 5.9           | 3GPP TS 26.510 + 26.512                                              |
| Dynamic policies                        | 3GPP TS 26.501 4.0.6          | 3GPP TS 26.501 5.8           | 3GPP TS 26.510 + 26.512                                              |
| Consumption reporting                   | 3GPP TS 26.501 4.0.8          | 3GPP TS 26.501 5.6           | 3GPP TS 26.510 + 26.512                                              |
| QoE metrics reporting                   | 3GPP TS 26.501 4.0.9          | 3GPP TS 26.501 5.5           | 3GPP TS 26.510 + 26.512                                              |
| Edge processing                         | 3GPP TS 26.501 4.0.10         | 3GPP TS 26.501 8             | 3GPP TS 26.510 + 26.512                                              |
| eMBMS delivery                          | 3GPP TS 26.501 4.0.11         | 3GPP TS 26.501 5.10          | 3GPP TS 26.510 + 26.512                                              |
| Data collection, reporting and exposure | 3GPP TS 26.501 4.0.12         | 3GPP TS 26.501 5.11          | 3GPP TS 26.510 + 26.512                                              |

## How to read the per-feature tables

Each feature below is presented with a table of the reference points and APIs that implement it. The columns are consistent across features:

- **Reference Point** is the named interface the interaction crosses, using the generalised TS 26.510 labels M1 and M5 (which correspond to the downlink-specific M1d and M5d used in the [Overview](./overview-5gms)). M1 is the provisioning interface between the Application Provider and the AF; M5 is the session-handling interface between the Media Session Handler and the AF.
- **Procedure clause (TS 26.510)** points to the procedure that governs the interaction.
- **API** links to the OpenAPI definition, and **API clause (TS 26.512)** points to where that API is specified.

Two structural patterns recur. First, most features touch both M1 and M5: the Application Provider provisions the feature over M1, and the Media Session Handler then uses it over M5. Second, almost every feature depends on the **Provisioning Sessions API** (to create the session that other configurations attach to) and the **Service Access Information API** (so the client can discover how to use the feature). These two appear repeatedly and are the backbone of the runtime flow described in the [Overview](./overview-5gms#session-lifecycle-at-a-glance).

One point on releases and API location: the tables reference the procedures in TS 26.510, which from Release 18 carries the provisioning and session-handling procedures generalised across the 5GMS and RTC systems. In the Release 17 layout on which the reference tools are based, the equivalent APIs are carried in TS 26.512 and TS 26.510 does not exist. The OpenAPI files linked below use the TS 26.512 Release 17 names; the [Scope page](/reference-tools/5gms) on the developer portal maps the Release 17 and Release 18 API filenames side by side.

## Feature: Content Hosting

### Description

The content hosting feature provides a service equivalent to a Content Delivery Network (CDN) deployed inside or outside the Trusted Data Network (DN).

<img loading="lazy" src="/img/tech/5gms/5GMS_ContentHosting.png" alt="Diagram of the 5GMS content hosting feature, showing content delivery hosted inside or outside the trusted data network, equivalent to a CDN" width="60%">

### Reference points and interactions (according to 3GPP TS 26.510)

| Reference Point | Procedure clause (TS 26.510) | API                                                                                                                                                 | API clause (TS 26.512) |
| --------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| M1              | 5.2.2                        | [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)                                         | 8.2                    |
| M1              | 5.2.3                        | [Content protocols discovery API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ContentProtocolsDiscovery.yaml)                              | 8.3                    |
| M1              | 5.2.4                        | [Server Certificates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ServerCertificatesProvisioning.yaml)                    | 8.4                    |
| M1              | 5.2.5                        | [Content Preparation Templates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ContentPreparationTemplatesProvisioning.yaml) | 8.5                    |
| M1              | 5.2.6                        | [Edge Resources provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_EdgeResourcesProvisioning.yaml)                              | 8.6                    |
| M1              | 5.2.7                        | [Policy Templates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_PolicyTemplatesProvisioning.yaml)                          | 8.7                    |
| M1              | 5.2.8                        | [Content Hosting provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ContentHostingProvisioning.yaml)                            | 8.8                    |
| M5              | 5.3.2                        | [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)                                | 9.2                    |

## Feature: Network Assistance

### Description

The network assistance feature enables the 5GMS Client in the UE to interrogate or manipulate the network Quality of Service (QoS) for an ongoing media streaming session. It defines two mechanisms for obtaining network assistance via interactions with the Policy Control Function (PCF) (AF-based network assistance) or via Access Network Bitrate Recommendation (ANBR) signalling interactions between the UE modem and the Radio Access Network (RAN) (ANBR-based network assistance).

<img loading="lazy" src="/img/tech/5gms/5GMS_NetworkAssistance.png" alt="Diagram of the 5GMS network assistance feature, showing AF-based network assistance via the PCF and ANBR-based network assistance between the UE modem and RAN" width="60%">

Both mechanisms make it possible to obtain:

- Bit Rate Recommendation (Throughput Estimation), which allows the 5GMS Client to stay synchronized with the network's current capabilities.
  - The Process: The client asks the 5GMS System for a bit rate estimate. The system then queries the Policy Control Function (PCF) to determine the available throughput for that specific session.
  - The Action: The client uses this data to proactively adjust its streaming speed (for example, by switching media quality levels for downlink).
  - The Benefit: It prevents stuttering and lag, ensuring a stable and consistent Quality of Experience (QoE) by staying within the network's "QoS envelope."

- Delivery Boost, which is a reactive feature used to request extra network performance when needed.
  - The Process: The client requests a temporary increase in bit rate. The 5GMS System asks the PCF to modify the session parameters to grant this extra capacity.
  - The Action: If the network has spare capacity, the boost is granted. The client uses this "boost" of speed to quickly refill a depleted buffer or finish a large file transfer faster.
  - The Benefit: It helps the user recover from potential playback interruptions or speeds up time-sensitive data tasks.

### Reference points and interactions (according to 3GPP TS 26.510)

| Reference Point | Procedure clause (TS 26.510) | API                                                                                                                  | API clause (TS 26.512) |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| M5              | 5.3.2                        | [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml) | 9.2                    |
| M5              | 5.3.4                        | [Network Assistance API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_NetworkAssistance.yaml)                | 9.4                    |

## Feature: Dynamic Policies

### Description

The dynamic policies feature enables the 5GMS Client in the UE to manipulate the network traffic handling policies for an ongoing media streaming session.

<img loading="lazy" src="/img/tech/5gms/5GMS_DynamicPolicies.png" alt="Diagram of the 5GMS dynamic policies feature, showing the 5GMS Client manipulating network traffic handling policies for an ongoing media streaming session" width="60%">

### Reference points and interactions (according to 3GPP TS 26.510)

| Reference Point | Procedure clause (TS 26.510) | API                                                                                                                        | API clause (TS 26.512) |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| M1              | 5.2.2                        | [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)                | 8.3                    |
| M1              | 5.2.7                        | [Policy Templates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_PolicyTemplatesProvisioning.yaml) | 8.7                    |
| M5              | 5.3.2                        | [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)       | 9.2                    |
| M5              | 5.3.3                        | [Dynamic Policies API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_DynamicPolicies.yaml)                          | 9.3                    |

## Feature: Consumption Reporting

### Description

The consumption reporting feature allows consumption of downlink media streaming to be logged by the 5GMS System and exposed for analysis.

<img loading="lazy" src="/img/tech/5gms/5GMS_ConsumptionReporting.png" alt="Diagram of the 5GMS consumption reporting feature, showing downlink media streaming consumption being logged by the 5GMS System and exposed for analysis" width="60%">

### Reference points and interactions (according to 3GPP TS 26.510)

| Reference Point | Procedure clause (TS 26.510) | API                                                                                                                                  | API clause (TS 26.512) |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| M1              | 5.2.2                        | [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)                          | 8.3                    |
| M1              | 5.2.12                       | [Consumption Reporting provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ConsumptionReportingProvisioning.yaml) | 8.12                   |
| M5              | 5.3.2                        | [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)                 | 9.2                    |
| M5              | 5.3.6                        | [Consumption Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ConsumptionReporting.yaml)                          | 9.6                    |

## Feature: QoE Metrics Reporting

### Description

The Quality of Experience (QoE) metrics reporting feature enables the 5GMS System to log and expose streaming performance data for further analysis.

<img loading="lazy" src="/img/tech/5gms/5GMS_MetricsReporting.png" alt="Diagram of the 5GMS QoE metrics reporting feature, showing RAN-based reporting to the OAM system and AF-based reporting to the network-side 5GMS System" width="60%">

The framework defines two distinct reporting paths:

- RAN-based Reporting: Metrics are sent to the Operations, Administration, and Maintenance (OAM) system via the Radio Access Network.

- AF-based Reporting: Metrics are sent directly to the network-side components (AF) of the 5GMS System.

### Reference points and interactions (according to 3GPP TS 26.510)

| Reference Point | Procedure clause (TS 26.510) | API                                                                                                                          | API clause (TS 26.512) |
| --------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| M1              | 5.2.2                        | [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)                  | 8.3                    |
| M1              | 5.2.11                       | [Metrics Reporting provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_MetricsReportingProvisioning.yaml) | 8.10                   |
| M5              | 5.3.2                        | [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)         | 9.2                    |
| M5              | 5.3.5                        | [Metrics Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_MetricsReporting.yaml)                          | 9.5                    |

## Feature: Data collection, reporting and exposure (TS 26.510)

### Description

The data collection, reporting and exposure feature enables the 5GMS System to log data relating to media streaming sessions and to expose this to
subscribers in the form of Events.

### Reference points and interactions (according to 3GPP TS 26.510)

| Reference Point | Procedure clause (TS 26.510) | API                                                                                                                                 | API clause (TS 26.512) |
| --------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| M1              | 5.2.13                       | [Event Data Processing provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_EventDataProcessingProvisioning.yaml) | 8.13                   |
| M5              | 5.3.5                        | [Metrics Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_MetricsReporting.yaml)                                 | 9.5                    |
| M5              | 5.3.6                        | [Consumption Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ConsumptionReporting.yaml)                         | 9.6                    |

The event exposure that this feature enables is defined in the generic UE data collection framework, with the architecture in [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) and the protocols and formats in [TS 26.532](https://www.3gpp.org/dynareport/26532.htm). See the [UE Data Collection, Reporting and Event Exposure](/reference-tools/data-collection) project for the reference implementation.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the TS 26.501 feature and procedure clauses in the overview table (4.0.2, 5.4, 4.0.5, 5.9, 4.0.6, 5.8, 4.0.8, 5.6, 4.0.9, 5.5, 4.0.10, clause 8, 4.0.11, 5.10, 4.0.12, 5.11); the TS 26.510 procedure clauses in the per-feature tables (5.2.2 to 5.2.13 and 5.3.2 to 5.3.6); and the TS 26.512 API clauses (8.2 to 8.13 and 9.2 to 9.6). Verify against the specific TS 26.501, TS 26.510 and TS 26.512 versions you are targeting.
:::
