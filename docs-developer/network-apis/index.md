---
hide_title: true
sidebar_class_name: project-index-link
title: Network APIs
sidebar_position: 9
description: Overview of the CAMARA network API reference implementation, with a table of covered QoS, slicing, and connectivity insight APIs.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5" />
  <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
  <path d="M20 8v8" />
  <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" /></svg>
</div>
<div class="topic-banner__text">
<h1>Network APIs</h1>
</div>
</div>

<div class="topic-lead">
Reference implementation for accessing 5G Core network capabilities through standardised Application Programming Interfaces (APIs), demonstrating how media applications can programmatically request Quality of Service (QoS) guarantees, network slice allocation, and connectivity insights.
</div>
<div style="margin: 8px 0"> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a></div>


Reference implementation for accessing 5G Core network capabilities through standardised Application Programming Interfaces (APIs), demonstrating how media applications can programmatically request Quality of Service (QoS) guarantees, network slice allocation, and connectivity insights. The tools cover key CAMARA project APIs and their application to media production (live contribution, remote production) and live distribution scenarios. Targeted at developers and network engineers integrating 5G network intelligence into media workflows.

CAMARA is an open-source project (Linux Foundation, in collaboration with GSMA) that standardises portable network APIs, so a media application can request network behaviour (for example a QoS boost for a live stream) through common interfaces rather than operator-specific ones. On the network side these interfaces build on 3GPP capability-exposure work such as the Service Enabler Architecture Layer (SEAL, [TS 23.434](https://www.3gpp.org/dynareport/23434.htm)).

:::tip[Where to start]
New here? Skim the CAMARA API table below to see which capability you need, then read [Tech: Network APIs](/tech/network-apis) for how a CAMARA call maps onto the 5G Core (NEF, PCF, SMF/UPF). Use the [GitHub Repos](./repositories) page for the current repository list.
:::

**Implemented specifications:** [CAMARA QoD (Quality on Demand) API](https://github.com/camaraproject/QualityOnDemand), [CAMARA Connectivity Insights API](https://github.com/camaraproject/ConnectivityInsights), [CAMARA Network Slice Booking API](https://github.com/camaraproject/NetworkSliceBooking), 3GPP TS 23.434 (SEAL for network capability exposure to applications).

## CAMARA APIs covered

The following CAMARA APIs are covered by the reference implementation and technical documentation:

| API | Purpose | CAMARA repo |
|---|---|---|
| **Quality on Demand (QoD)** | Create a QoS session for a device, specifying QoS profile and duration. The device and application server must be known at session creation time. | [QualityOnDemand](https://github.com/camaraproject/QualityOnDemand) |
| **QoS Profiles** | Retrieve the list of QoS profiles (and their parameters) available in the network. Used as a discovery step before booking. | [QualityOnDemand](https://github.com/camaraproject/QualityOnDemand) |
| **QoS Provisioning** | Assign a QoS profile to a specific device indefinitely (no fixed duration or area). The assignment is active until explicitly deleted. | [QoSProvisioning](https://github.com/camaraproject/QualityOnDemand) |
| **QoS Booking** | Book QoS resources for a specific device and application server for a defined area and time window. | [QoSBookingAndAssignment](https://github.com/camaraproject/QoSBooking) |
| **QoS Booking & Assignment** | Separate the booking of QoS resources (area, time, number of devices) from the assignment of specific devices to that booking. Enables flexible device swap during production. | [QoSBookingAndAssignment](https://github.com/camaraproject/QoSBooking) |
| **Dedicated Networks** | Reserve network resources (dedicated network) for a defined service area and time window using a network profile, then assign specific devices. Includes sub-APIs for service area discovery and network profile listing. | [DedicatedNetworks](https://github.com/camaraproject/DedicatedNetworks) |
| **Network Slice Booking** | Book a network slice for a given area and time window with a QoS profile. All devices connecting to the network in that area and window are covered. | [NetworkSliceBooking](https://github.com/camaraproject/NetworkSliceBooking) |
| **Application Profiles** | Define an application's network quality thresholds (latency, jitter, throughput, packet loss). Used as input to Connectivity Insights APIs. | [ApplicationProfiles](https://github.com/camaraproject/ApplicationProfiles) |
| **Connectivity Insights** | One-shot check of the network's confidence that it can meet an application profile's thresholds for a given device at its current location. | [ConnectivityInsights](https://github.com/camaraproject/ConnectivityInsights) |
| **Connectivity Insights Subscriptions** | Subscribe to receive periodic notifications about the network's ability to meet an application profile's thresholds for a device. | [ConnectivityInsights](https://github.com/camaraproject/ConnectivityInsights) |

## Go deeper

| Area | Details |
|---|---|
| **Technical documentation** | CAMARA API analysis and media production scenarios: [Network APIs on the Tech portal](/tech/network-apis) |
| **Standards** | CAMARA and 3GPP API standardisation: [Network APIs on the Standards portal](/tech/standards/network-apis) |

## Related

* [Software Repositories](./repositories) - the source repositories for these tools
* [Releases](./releases) - published versions
* [Network APIs on the Tech portal](/tech/network-apis) - CAMARA API analysis and media production scenarios
* [Network APIs on the Standards portal](/tech/standards/network-apis) - CAMARA and 3GPP API standardisation

:::note
Refer to the [Network APIs repositories](https://github.com/5G-MAG) on GitHub to use or contribute to these Reference Tools.
:::

## Community Stats
<!-- STATS-TABLE-START:Network APIs -->
> **Last Synced:** -

<table class="health-table">
  <thead>
    <tr>
      <th style="width: 25%;">Repository</th>
      <th style="width: 10%;">Stars</th>
      <th style="width: 10%;">Forks</th>
      <th style="width: 15%;">Views (Total)</th>
      <th style="width: 20%;">Clones (Total)</th>
      <th style="width: 20%;">Activity</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="6"><em>Sync pending &mdash; run the update-data workflow.</em></td></tr>
  </tbody>
</table>
<!-- STATS-TABLE-END:Network APIs -->
