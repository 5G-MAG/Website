---
title: Using CAMARA APIs
sidebar_position: 4
hide_title: true
description: Maps candidate CAMARA APIs, Quality on Demand and Connectivity Insights, onto the live media distribution workflow phases.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>Using CAMARA APIs</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Using CAMARA APIs (and Network Services) for Live Segmented Media Distribution

:::note
This page is an early skeleton. The mapping below is drafted from the [Workflows and Requirements](./workflows) for Live Media Distribution and from the CAMARA API reference pages. Endpoint and parameter details should be confirmed against the current CAMARA specifications before being relied upon.
:::

This section maps CAMARA APIs to the Live Segmented Media Distribution context. The candidate APIs are drawn from the list of [**Network API Initiatives under analysis**](../network-api-initiatives), and the mapping follows the phases identified in [**Workflows and Requirements**](./workflows).

This analysis reuses the more detailed CAMARA API analysis from [Content Production and Contribution](../content-production/using-camara-apis) and is at an earlier, less mature stage; the differences specific to distribution (large device populations, geofencing) are highlighted where relevant.

Unlike Content Production and Contribution (where the focus is on contributing content from a small number of devices), Live Media Distribution concerns delivery of segmented media (for example MPEG-DASH) to a potentially large population of client applications running on end-user devices across one or more service areas. Two needs dominate the workflow:

* **Quality of Service** for reliable, interruption-free segment delivery (see the QoS requirements in [Workflows](./workflows#requirements)).
* **Information monitoring, logging and network assistance**, both in real time (for runtime decisions) and after the session (for troubleshooting and post-processing).

The [Workflows](./workflows) also identify a **Geofencing** need (verifying whether a UE is inside a target service area, and notifications when UEs enter or leave it). The APIs covering Geofencing are not part of the CAMARA APIs documented in this portal section; they are noted here as a requirement only and are not detailed below.

## Candidate CAMARA APIs

The following APIs from the Content Production analysis are the most relevant to Live Media Distribution. Each links to its reference page in this portal.

<table>
  <tr>
    <td markdown="span" align="left"><b>API</b></td>
    <td markdown="span" align="left"><b>Role in Live Media Distribution</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="../camara-quality-on-demand">Quality on Demand</a></td>
    <td markdown="span" align="left">Requests stable latency or prioritised throughput for the connection used to deliver media segments to a device.</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="../camara-qos-profiles">QoS Profiles</a></td>
    <td markdown="span" align="left">Provides the predefined network performance profiles referenced by the other APIs.</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="../camara-application-profiles">Application Profiles</a></td>
    <td markdown="span" align="left">Defines the application's network quality thresholds, referenced by Connectivity Insights for monitoring.</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="../camara-connectivity-insights">Connectivity Insights</a></td>
    <td markdown="span" align="left">On-demand check of whether the network can currently meet an application profile's thresholds for a connected device.</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="../camara-connectivity-insights-subscriptions">Connectivity Insights Subscriptions</a></td>
    <td markdown="span" align="left">Event-subscription variant of Connectivity Insights, for regular network-quality notifications during a session.</td>
  </tr>
</table>

## Mapping to the workflow phases

The [Workflows](./workflows) describe four phases. The candidate APIs map to them as follows.

### Phase A: Preparing the streaming application

Phase A (installing and preparing the client application on user devices) involves no CAMARA API interaction; it is a content-provider and application concern. It is included for completeness only.

### Phase B: Network capability pre-booking

The content provider requests network services (for example Quality-on-Demand) for client applications in one or more geographical areas, on a given schedule.

* The [**Quality on Demand API**](../camara-quality-on-demand) can request a QoS session for a device-to-application-server connection. The QoS session is created with **POST /sessions**, referencing a `qosProfile` from the [**QoS Profiles API**](../camara-qos-profiles).

:::note
The Quality on Demand API does not let the service area be specified in advance; it is created at the location of use. This limitation is discussed for Content Production in the corresponding [Using CAMARA APIs](../content-production/using-camara-apis) page and applies here as well. Whether a reservation-style API is needed for the distribution case is open.
:::

### Phase C: Setup and configuration, and monitoring during the session

The content provider configures its client applications and then monitors that they are using the requested network capabilities, receiving notifications about potential issues (throughput, delay, and so on).

* **One-shot check.** Create an Application Profile with the [**Application Profiles API**](../camara-application-profiles) (**POST /application-profiles**) carrying the network quality thresholds, then call the [**Connectivity Insights API**](../camara-connectivity-insights) (**POST /check-network-quality**) to obtain a qualitative confidence assessment for a connected device.
* **Regular notifications.** Using the same Application Profile, the [**Connectivity Insights Subscriptions API**](../camara-connectivity-insights-subscriptions) can be used to subscribe to recurring network-quality notifications during runtime.

### Phase D: Teardown

* The content provider releases the booked network capabilities. For a Quality on Demand session this is **DELETE /sessions/&#123;sessionId&#125;**, or the session is torn down by the operator when its duration expires.

---

## The monitoring path in detail

Monitoring is the centre of gravity for distribution, because the whole work area exists to close the visibility gap described in the [Introduction](./introduction). The CAMARA path has two steps and two flavours:

1. **Declare the requirement once.** The content provider creates an Application Profile with the [Application Profiles API](../camara-application-profiles) (`POST /application-profiles`), carrying the network-quality thresholds the streaming app needs (for example a target packet delay budget and minimum downstream rate consistent with interruption-free segment playback). The profile is declared once and reused.
2. **Ask whether the network meets it.**
   - *One-shot*: the [Connectivity Insights API](../camara-connectivity-insights) (`POST /check-network-quality`) returns a qualitative assessment of the network's confidence in meeting the profile's thresholds for a connected device, at that moment.
   - *Recurring*: the [Connectivity Insights Subscriptions API](../camara-connectivity-insights-subscriptions) delivers the same assessment as periodic notifications during a session.

This gives the content provider a network-side view it otherwise lacks. Combined with the app-side measurements it already has (time to last byte per segment, radio indicators, error events), it lets the provider attribute a degraded experience to the network rather than lumping it into "The Cloud". The exchange is inherently two-way: the provider contributes app-side data (via the Application Profile thresholds and, potentially, richer measurement feedback), and the operator contributes its confidence assessment back. Standardising this feedback is what would make the collaboration practical at scale.

## Why the fit is imperfect at population scale

Connectivity Insights checks a single connected device against a profile. Distribution concerns a population of clients across service areas, so applying the per-device model to every client does not obviously scale, and the API gives no aggregate, area-level view. Whether distribution needs an aggregate or sampled variant, and whether a reservation-style API (rather than the point-of-use Quality on Demand) is appropriate for a population, are open questions. The QoS side inherits every limitation noted for [Content Production](../content-production/using-camara-apis): no pre-booking availability lookup, no service area in Quality on Demand, and monitoring against a separate Application Profile rather than the booked QoS Profile.

## Geofencing: identified but out of scope here

The [Workflows](./workflows#geofencing) require verifying whether a UE is inside a target service area and being notified when UEs enter or leave it, because live media rights and editorial variants are region-specific. CAMARA does address this, in the [DeviceLocation](https://github.com/camaraproject/DeviceLocation) repository (Location Verification, Location Retrieval and Geofencing Subscriptions APIs, with scope limited to 4G and 5G networks), but those APIs are not among the CAMARA APIs documented in this portal section. They are therefore recorded as a requirement and an open point rather than mapped in detail. Any use of location data also carries privacy and consent obligations: under the CAMARA security model, location APIs process personal data, so they require an end-user-consent flow (CIBA) rather than a two-legged client-credentials token.

## Underlying 3GPP mechanisms

The QoS requests map to network capability exposure through the Network Exposure Function (NEF, [TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) and Policy Control Function ([TS 29.514](https://www.3gpp.org/dynareport/29514.htm)), exactly as on the contribution side. The monitoring and information-sharing capability corresponds to network capability exposure through the NEF and, at the application-enabling layer, to the Service Enabler Architecture Layer for Verticals (SEAL), 3GPP [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (also published as ETSI TS 123 434), whose enabling services (including network resource management and location management) are candidates for carrying the shared data. See [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service).

## Open points

* Geofencing (UE location verification and enter/leave notifications) is required by the workflow but is not covered by the CAMARA APIs documented here. The relevant API needs to be identified.
* The distribution case targets a large population of devices rather than a single contributing device; the per-device session model of Quality on Demand may not map cleanly to this scale. This needs further analysis.
* As with Content Production, monitoring relies on a separate Application Profile rather than the QoS Profile used to request resources. Harmonising the two would be more coherent.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the applicability of the SEAL (TS 23.434) network-resource-management and location-management enabling services to media-distribution monitoring, and the mapping of the QoS requests to the NEF (TS 29.522) and PCF (TS 29.514) service operations. Verify against the 3GPP work plan and the current CAMARA specifications before publication.
:::

## Related

* [Introduction](./introduction): the visibility gap and where network APIs fit.
* [Reference Scenarios](./scenarios): the distribution chain and observability boundaries.
* [Workflows and Requirements](./workflows): the phases mapped here.
* [Content Production: Using CAMARA APIs](../content-production/using-camara-apis): the fuller QoS API analysis reused here.
* [Network API Initiatives](../network-api-initiatives): the CAMARA APIs and the 3GPP interfaces.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
