---
title: Workflow
sidebar_position: 3
hide_title: true
description: Defines the phased workflow and QoS, monitoring and geofencing requirements for live media distribution over mobile networks.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Connectivity Quality with Network APIs</span>
<h1>Workflow</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Workflows and Requirements for Live Media Distribution

[Scenarios and Use Cases](./scenarios) describe the reference scenario. The workflows in relation to the booking and usage of network capabilities are described here with a focus on quality of service (QoS).

:::note
Live segmented audio is used here as the worked example, but the phases and requirements apply equally to segmented video distribution (for example MPEG-DASH video); only the media type and bit rates differ.
:::

This section contains information on:

- [**Pre-conditions and commonalities**](#pre-conditions-and-commonalities)
- [**Before consuming the audio streaming service**](#before-consuming-the-audio-streaming-service)
- [**While consuming the audio streaming service**](#while-consuming-the-audio-streaming-service)
- [**After having consumed the audio streaming service**](#after-having-consumed-the-audio-streaming-service)
- [**Requirements**](#requirements)

## Pre-conditions and commonalities

- A content provider wishes to stream live segmented audio over the internet, including mobile networks, to an application running on UEs (e.g. smartphones, connected cars, etc.).
- The content provider has set up an agreement with a network operator for usage of certain **network capabilities** made available via an API. The content provider has obtained key access tokens/keys/credentials/payment details in advance authorising their use (when available).
- The content provider has access to one or several **Network API Platforms**. These platforms are accessible through any device/connectivity (e.g. Internet-accessible website portal, command line tools, dedicated application, etc.).

## Before consuming the audio streaming service

### Phase A: Preparing the audio streaming application

- All devices are 3GPP UEs (e.g. smartphones, connected cars, etc.) with a content provider's client application (e.g. radio player app) installed.

### Phase B: Network capability pre-booking

<img loading="lazy" src="/img/tech/network-apis/live-media-distribution/Workflow_Step_1.png" alt="Workflow diagram of Phase B: network capability pre-booking steps between the content provider and the Network API Platform, from requesting network services to receiving network access IDs." width="60%">

1. Through the Network API Platform, the content provider requests network services for the population of client applications in one or more geographical areas. Possible services (network capabilities) are:
   a. _Quality-on-Demand_
   - Provision of reliably low-latency (e.g. latency and interruption-free audio playback similar to conventional broadcast radio).
   - Ability to set quality on demand requirements for a given location
     b. _Geofencing_
   - To verify and/or retrieve the location of a UE or to receive notifications from UEs entering or leaving certain locations/areas (e.g. for determining the content appropriate for the current editorial region).

Note: Booking is done based on:

- Geographical location
- Schedule

2. Through the Network API Platform the content provider receives a booking reference responding to the service request.
3. Through the Network API Platform the content provider accepts the service booking offer.
4. Through the Network API Platform the content provider receives **network access IDs** to be used by the UEs to access the network capabilities in the corresponding locations.

## While consuming the audio streaming service

<img loading="lazy" src="/img/tech/network-apis/live-media-distribution/Workflow_Step_2.png" alt="Workflow diagram of Phase C: setup, configuration, and monitoring steps while the audio streaming service is being consumed." width="60%">

### Phase C: Setup and configuration

- The content provider configures its client application with the network access IDs delivered in step B.4.

### Independent steps that can be triggered by the content provider

- The content provider can use the Network API Platform to monitor that the client applications are properly using the requested network capabilities.
- Notifications indicating potential issues (throughput, delay, etc.) reach the content provider through the Network API Platform.
- The content provider can also request, through the Network API Platform, a change to the current configuration. Note that the network access IDs are not expected to change when a reconfiguration occurs.

## After having consumed the audio streaming service

### Phase D: Teardown

1. Through the Network API Platform, the content provider releases the booked network capabilities.

## Requirements

### Quality of Service

The following requirements are defined:

- Ability to request different QoS profiles for individual data flows being distributed across a target service area
- Ability to provision QoS profiles for reliable and consistent media segment transfer time on individual data flows to support interruption-free presentation by the media player with minimal buffering.
- Ability to configure new or re-configure existing QoS profiles to be selected during runtime
- Ability to identify the set of application data flows that fall within the scope of a particular QoS profile treatment

### Information monitoring, logging and/or Network assistance

- Ability to receive information from the network
  - real-time for QoS profile re-configuration
  - during runtime for troubleshooting
  - after the session (logging information) for post-processing

### Geofencing

Geofencing matters for distribution because live media rights and editorial content are often region-specific: a service may only be licensed for, or editorially tailored to, a particular territory. Knowing whether a device is inside or outside a target area lets the content provider serve the correct regional content or restrict delivery accordingly.

- Ability to verify whether a given UE is currently located inside or outside the target service area.
- Ability to receive notifications when individual UEs enter or leave the target service area.

## How the phases map onto CAMARA APIs

The four phases above map onto candidate CAMARA APIs as follows; the detailed mapping and its caveats are on the [Using CAMARA APIs](./using-camara-apis) page.

| Phase                     | Requirement                                                 | Candidate CAMARA mechanism                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Prepare application    | Install and configure the client app on UEs                 | None (content-provider concern; no API interaction)                                                                                                                              |
| B. Pre-book capability    | Request QoS for the client population in an area and window | [Quality on Demand](../camara-quality-on-demand) `POST /sessions`, referencing a [QoS Profile](../camara-qos-profiles)                                                           |
| B. Pre-book capability    | Verify or subscribe to device location (geofencing)         | CAMARA Location Verification / Geofencing Subscriptions ([DeviceLocation](https://github.com/camaraproject/DeviceLocation) repo); not documented in this portal section          |
| C. Monitor during session | One-shot check that the network can meet thresholds         | [Application Profiles](../camara-application-profiles) `POST /application-profiles`, then [Connectivity Insights](../camara-connectivity-insights) `POST /check-network-quality` |
| C. Monitor during session | Recurring quality notifications                             | [Connectivity Insights Subscriptions](../camara-connectivity-insights-subscriptions)                                                                                             |
| D. Teardown               | Release booked capability                                   | [Quality on Demand](../camara-quality-on-demand) `DELETE /sessions/{sessionId}`, or operator teardown on expiry                                                                  |

## How distribution differs from contribution

These phases mirror the [Content Production and Contribution workflows](../content-production/workflows), and much of the QoS analysis is shared, but three differences shape the distribution case:

- **Scale and direction.** Contribution serves a few uplink devices; distribution serves a large downlink population of client apps across one or more service areas. The per-device QoS-session model of Quality on Demand does not obviously scale to a population, which is recorded as an open point.
- **Geofencing is first-class.** Because live media rights and editorial variants are region-specific, verifying whether a device is inside a target area (and being notified when it enters or leaves) is a genuine workflow requirement here, not an edge case. The relevant CAMARA APIs live in the DeviceLocation repository and are not part of this portal section.
- **Monitoring is the primary purpose, not a side channel.** For distribution the whole motivation is closing the visibility gap, so the Application Profiles plus Connectivity Insights path is central rather than auxiliary.

## Underlying 3GPP mechanisms

QoS for downlink segment delivery is realised the same way as for contribution: a Quality on Demand session drives the Network Exposure Function (NEF, [TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) `Nnef_AFSessionWithQoS` operation, which the Policy Control Function authorises (`Npcf_PolicyAuthorization`, [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)) to install a downlink QoS Flow on the client's PDU session, matched to a 5QI ([TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.7.4). The monitoring and information-sharing path relies on network capability exposure through the NEF and, at the application-enabling layer, the Service Enabler Architecture Layer for Verticals (SEAL), [TS 23.434](https://www.3gpp.org/dynareport/23434.htm), whose network resource management and location management enabling services are candidates for carrying the shared performance data. See [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the mapping of a downlink Quality on Demand session to `Nnef_AFSessionWithQoS` (TS 29.522) and `Npcf_PolicyAuthorization` (TS 29.514), and the applicability of the SEAL (TS 23.434) network-resource-management and location-management enabling services to media-distribution monitoring. Verify against the 3GPP work plan and the current CAMARA specifications before publication.
:::

## Related

- [Introduction](./introduction): the visibility gap and where network APIs fit.
- [Reference Scenarios](./scenarios): the distribution chain and observability boundaries.
- [Using CAMARA APIs](./using-camara-apis): the candidate-API mapping and open points.
- [Content Production workflows](../content-production/workflows): the shared QoS workflow, from the uplink side.
- [Network API Initiatives](../network-api-initiatives): the CAMARA APIs and the 3GPP interfaces.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
