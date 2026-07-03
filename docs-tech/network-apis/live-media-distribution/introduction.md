---
title: Live Media Distribution
sidebar_position: 1
hide_title: true
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>Live Media Distribution</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Introduction: Live Media Distribution

## Overview

This work area looks at delivering live media (TV and radio) to large audiences over mobile networks and how to diagnose delivery problems when they occur. The core problem it addresses is a visibility gap: when content is delivered "over the top" (OTT), neither the content provider nor the network operator can see the whole delivery chain, so degraded experiences are hard to attribute. 5G-MAG investigates whether Network APIs, standard interfaces that let an application share data with and request treatment from the mobile network, can close that gap. It is aimed at content providers and network engineers working on live streaming quality.

For many people the internet is becoming their primary means of accessing TV and radio content, while for some the internet is already the only method they use.

As a result, content providers are increasingly interested in understanding how well their content is being delivered online, particularly when it is offered "over the top" (OTT), therefore with no ability to influence how networks would treat content to meet particular quality of service (QoS) requirements. Similarly, network operators want insight into how well their networks are meeting consumers’ needs and expectations.

## Monitoring QoS
When it comes to monitoring QoS, content providers typically have sight of the two ends of the distribution chain: the source (often a content delivery network, or CDN, in this context) and the application running on a user device, such as a smartphone. If poor performance is detected, the content provider can often rule out the CDN as a cause by inspecting the CDN logs. Content providers can also record radio access network (RAN) performance indicators such as cell ID, signal strength and quality, but have no direct visibility of the underlying network; any issues not attributable to the CDN or insufficient signal are effectively lumped into "the network", which appears to them as "The Cloud". The next section sets out this observability gap, and the metrics used to probe it, in more detail.

:::note
Figure to be added: a diagram of the distribution chain, showing the CDN (source), the network ("The Cloud" from the content provider's perspective) and the client application on the consumer device.
:::

## What we are doing

At 5G-MAG we’re investigating the possibility of logging relevant performance data through the client application and sharing it with the network operator. Standard ways of feeding back and sharing data would make the process easier and encourage such collaboration.

This work connects to the network capability exposure APIs analysed elsewhere in this documentation. In particular, the [CAMARA Connectivity Insights](../network-api-initiatives#connectivity-insights-api) API offers a candidate mechanism for sharing application-side performance information with operators, and 3GPP [TS 23.434](https://www.3gpp.org/dynareport/23434.htm), the Service Enabler Architecture Layer (SEAL) for verticals, provides the underlying network capability exposure framework. The aim is to close the visibility gap so that both content providers and operators can see the full distribution chain.

The related [Content Production and Contribution](../content-production/introduction) work area analyses the same CAMARA APIs from the uplink (contribution) side.

Read the sections in order:
1. [Reference Scenarios](./scenarios): the reference distribution scenario and its actors.
2. [Workflows](./workflows): the requirements and the phases for booking and using network capabilities.
3. [Using CAMARA APIs](./using-camara-apis): how specific CAMARA APIs map onto those phases.

## The visibility gap in concrete terms

Segmented media distribution over HTTP (for example MPEG-DASH, standardised as ISO/IEC 23009-1, or Apple HLS) works by splitting a stream into short segments that the client requests one after another. The client's experience depends on each segment arriving in full before it is needed for playback; when segments arrive late the player rebuffers. A practical proxy for delivery quality is therefore the time to last byte (TTLB) of each segment request, which the client app can measure directly by timing from request to full receipt. TTLB stands in for the underlying network performance that neither party can see end to end.

The two vantage points do not overlap:

- The **content provider** sees the two ends of the chain: the CDN source (through CDN logs) and the client app (through in-app instrumentation such as TTLB and radio indicators like cell ID, signal strength and quality). Everything in between is opaque to it and appears as "The Cloud".
- The **network operator** sees inside its own network but, for a third-party OTT service, has no access to the client app. Some failures are invisible to it entirely: if uplink interference stops a segment request from reaching the network, the operator never records a request, so from its side the event simply did not happen.

Closing the gap means giving each party a standard way to share what only it can observe. The content provider can contribute app-side measurements (TTLB, radio indicators, error events) to the operator; the operator can contribute network-side context back. A Network API is the candidate carrier for that exchange.

## Where the network APIs fit

Two families of network capability are relevant to distribution, and they are analysed separately:

- **Quality of Service** for reliable, interruption-free segment delivery. This reuses the same CAMARA QoS APIs analysed for contribution (Quality on Demand, referencing a named QoS Profile), applied on the downlink to a large population of client devices rather than to a few contributing cameras. The [Content Production and Contribution](../content-production/introduction) work area covers those APIs in depth; the distribution-specific differences (scale, geofencing) are highlighted in [Using CAMARA APIs](./using-camara-apis).
- **Information sharing and network assistance** for diagnosing the visibility gap. The candidate mechanism is the [CAMARA Connectivity Insights](../network-api-initiatives#connectivity-insights-api) API (and its subscription variant), which lets an application declare quality thresholds (an Application Profile) and receive the network's assessment of whether it can meet them, one-shot or as recurring notifications.

Underneath, 3GPP capability exposure is provided by the Network Exposure Function (NEF, northbound APIs in [TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) and, for the application-enabling and analytics layer, the Service Enabler Architecture Layer for Verticals (SEAL), 3GPP TS 23.434 (also published as ETSI TS 123 434). SEAL specifies reusable enabling services (including network resource management and location management) that vertical applications such as media distribution can build on.

## Geofencing and regional rights

Distribution differs from contribution in one further respect: it is often region-bound. Live media rights and editorial variants are frequently licensed for, or tailored to, a specific territory, so the provider needs to know whether a device is inside or outside a target area to serve the correct regional content or to restrict delivery. CAMARA addresses this through the Location Verification, Location Retrieval and Geofencing Subscriptions APIs in the [DeviceLocation](https://github.com/camaraproject/DeviceLocation) repository (scope limited to 4G and 5G networks). These are noted as a requirement in the [Workflows](./workflows#geofencing) but are not among the CAMARA APIs documented in this portal section, so they are flagged as an open point rather than detailed here.

## Scope and neutrality

This work reflects analysis in progress by 5G-MAG members. It does not assert that any operator or content provider has deployed such data-sharing today, and it treats the visibility gap as a shared problem for both content providers and operators rather than attributing fault to either. The CAMARA APIs referenced are at differing maturity levels and the mapping to large-scale distribution surfaces open questions (notably whether the per-device QoS-session model scales to a population of clients) that are recorded as open points rather than resolved.

## Related

* [Reference Scenarios](./scenarios): the distribution chain and who observes each part.
* [Workflows and Requirements](./workflows): the phases and the QoS, monitoring and geofencing requirements.
* [Using CAMARA APIs](./using-camara-apis): the candidate APIs mapped to the phases.
* [Content Production and Contribution](../content-production/introduction): the same QoS APIs analysed from the uplink side.
* [Network API Initiatives](../network-api-initiatives): the CAMARA APIs and the 3GPP interfaces they map onto.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
