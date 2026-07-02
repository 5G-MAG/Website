---
hide_title: true
title: Network APIs
sidebar_position: 8
---


<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
<h1>Network APIs - Docs</h1>
</div>

Mobile networks can expose selected capabilities (for example the ability to request a given quality of service, reserve a network slice, or check current connectivity) to outside applications through standardised, portable interfaces, instead of each operator offering its own proprietary interface. Network APIs are those interfaces, applied here to media use cases: they let a media application programmatically request the network conditions it needs, whether that is guaranteed bandwidth for a live production feed, a low-latency path for a real-time contribution link, or priority routing for a breaking news stream.

5G-MAG's work centres on the CAMARA project (a Linux Foundation initiative with GSMA support) and its mapping to 3GPP-defined APIs, applied specifically to media production and live distribution use cases.

**Key specifications:** the four CAMARA APIs below map onto 3GPP-defined network capabilities. Each is described in more detail on its own analysis page (see Technical Documentation).

| API / specification | What it does for media |
| --- | --- |
| CAMARA Quality on Demand (QoD) API | Requests stable latency or prioritised throughput for a media flow on demand, for example a low-latency contribution link. |
| CAMARA Connectivity Insights API | Checks whether the network can currently meet an application's quality requirements before or during a session. |
| CAMARA Network Slice Booking API | Reserves network slice resources for a given area and time window ahead of an event. |
| 3GPP [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (Service Enabler Architecture Layer, SEAL) | Provides common enabling services (group management, configuration, network resource management) that support network capability exposure. |

GSMA Open Gateway (OGW) API profiles align these CAMARA APIs across operators.

**Reference tools:** the 5G-MAG software implementation is on the developer portal under [Network APIs](https://developer.5g-mag.com/network-apis).

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/12)

## Architecture: from a CAMARA call to a 5G Core decision

A CAMARA API is deliberately thin. The media application (the API consumer) sees a small REST resource, for example a QoD `session` or a slice `booking`. Behind that resource sit two further layers, so a single API call travels: **CAMARA API &rarr; NEF (3GPP northbound exposure) &rarr; PCF (policy decision) &rarr; SMF/UPF (enforcement on the device's PDU session, its active data connection to the network)**.

1. **3GPP northbound exposure.** The Network Exposure Function (NEF) is the 5G Core function that exposes capabilities to an Application Function (AF). Its northbound APIs are specified in [TS 29.522](https://www.3gpp.org/dynareport/29522.htm). For QoS the relevant northbound API is `AsSessionWithQoS` (the RESTful form of the `Nnef_AFSessionWithQoS` service). In 4G/EPC the equivalent function is the Service Capability Exposure Function (SCEF); operators commonly deploy a combined SCEF+NEF. Discovery, onboarding and authentication of these APIs are handled by the Common API Framework (CAPIF), [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) / [TS 29.222](https://www.3gpp.org/dynareport/29222.htm).
2. **5G Core policy and control.** The NEF forwards the request to the Policy Control Function (PCF) via `Npcf_PolicyAuthorization` ([TS 29.514](https://www.3gpp.org/dynareport/29514.htm)). The PCF authorises the AF request and installs policy on the subscriber's PDU session (the device's active data connection to the network), which the Session Management Function (SMF) and User Plane Function (UPF) enforce. Slice-related requests instead touch slice management (provisioning) and, at runtime, the SEAL Network Slice Capability Enablement (NSCE) service in [TS 23.434](https://www.3gpp.org/dynareport/23434.htm).

The application never sees the PCF, SMF or UPF. This is the value CAMARA adds: one operator-agnostic contract in place of per-operator 3GPP integration. It is also the source of most of the open questions 5G-MAG records on the analysis pages, because information that exists inside the core (measured latency, service-area availability) is not always surfaced back through the CAMARA abstraction.

## Common building blocks across the CAMARA APIs

Cross-cutting behaviour is defined once in the CAMARA Commonalities working group and reused by every API on the analysis pages. The main pieces:

* **Device object.** A subscriber/device is identified by any one of `phoneNumber` (an MSISDN in E.164 form), `networkAccessIdentifier` (in 3GPP terms a GPSI expressed as an External Identifier, `{local}@{domain}`), or an IP address (`ipv4Address` / `ipv6Address`). When a three-legged access token already identifies the end user, the device object may be omitted; if neither is present the provider returns `422 MISSING_IDENTIFIER`.
* **Application server and ports.** Media flows are scoped by the application server address plus `applicationServerPorts` / `devicePorts` (individual ports and ranges), so QoS is applied to the specific flow rather than all of a device's traffic.
* **Authorisation.** APIs use OAuth 2.0. Operations acting on a specific end user typically require a three-legged token obtained with end-user consent (OpenID Connect / CIBA); back-office operations can use a two-legged (client-credentials) token.
* **Notifications.** Asynchronous events are delivered to a consumer-supplied `sink` (a callback URL) as [CloudEvents](https://cloudevents.io/) 1.0 JSON documents, with `sinkCredential` describing how the provider authenticates to that endpoint.
* **Correlation and errors.** An optional `x-correlator` request header is echoed in the response for tracing, and errors follow a common model (`INVALID_ARGUMENT`, `NOT_FOUND`, `MISSING_IDENTIFIER`, and so on).

## API families and how they relate

The CAMARA APIs 5G-MAG analyses fall into a few families:

* **QoS for a flow or device:** [Quality on Demand](./network-apis/camara-quality-on-demand) (per session), [QoS Provisioning](./network-apis/camara-qos-provisioning) (persistent), [QoS Booking](./network-apis/camara-qos-booking) and [QoS Booking and Assignment](./network-apis/camara-qos-booking-assignment) (reserved in advance). All consume a named profile from [QoS Profiles](./network-apis/camara-qos-profiles).
* **Area and time reservation for many devices:** [Network Slice Booking](./network-apis/camara-network-slice-booking) and [Dedicated Networks](./network-apis/camara-dedicated-networks). These overlap; the analysis pages compare them.
* **Requirements and monitoring:** [Application Profiles](./network-apis/camara-application-profiles) declares an application's needs once, and [Connectivity Insights](./network-apis/camara-connectivity-insights) plus [Connectivity Insights Subscriptions](./network-apis/camara-connectivity-insights-subscriptions) check whether the network can meet them.

All of these APIs are still pre-1.0 (`v0`/`wip`) at the time of writing, delivered through CAMARA's twice-yearly meta-releases. Field names and enumerations can change between releases, so the per-API pages note where an integrator should confirm values against the specific `.yaml`.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 24.549 (referenced from the analysis pages as the SEAL NSCE Stage 3 protocol specification). The northbound and policy specifications cited here (TS 29.522, TS 29.514, TS 23.222, TS 29.222, TS 23.434) are widely established. Verify any specific clause references against the 3GPP work plan before publication.
:::

---

## Information related to Standards

[Standards](/tech/standards/network-apis)

---

## Technical Documentation

The following resources are available:

### Analysis of Network APIs: Industry Initiatives

* [**Network API: CAMARA Project and 3GPP APIs**](./network-apis/network-api-initiatives). Index page for the CAMARA and 3GPP analysis, including the device object, application server and QoS parameters.

  The individual CAMARA API analyses are:
  * [Application Profiles](./network-apis/camara-application-profiles). Declare an application's network and compute requirements once, for reuse by other APIs.
  * [Connectivity Insights](./network-apis/camara-connectivity-insights). One-shot check of whether the network can meet those requirements.
  * [Connectivity Insights Subscriptions](./network-apis/camara-connectivity-insights-subscriptions). Continuous monitoring of the same, delivered as event notifications.
  * [Dedicated Networks](./network-apis/camara-dedicated-networks). Reserve a dedicated network for an area and time, then grant devices access.
  * [Network Slice Booking](./network-apis/camara-network-slice-booking). Book network slice resources for an area and time window.
  * [QoS Booking](./network-apis/camara-qos-booking). Reserve a QoS profile in advance for specific devices.
  * [QoS Booking and Assignment](./network-apis/camara-qos-booking-assignment). Reserve a QoS profile for a device count, then assign devices to it later.
  * [QoS Profiles](./network-apis/camara-qos-profiles). Discover the named QoS profiles an operator offers (consulted first by most QoS APIs).
  * [QoS Provisioning](./network-apis/camara-qos-provisioning). Assign a QoS profile to a device indefinitely.
  * [Quality on Demand](./network-apis/camara-quality-on-demand). Request a QoS session for the duration of a media flow.

### Network Capability Exposure for Content Production and Contribution Scenarios

* [**Introduction**](./network-apis/content-production/introduction). Introduction to the work on Network APIs for Media Production.
* [**Scenarios & Use Cases**](./network-apis/content-production/scenarios). This is a selection of scenarios and use cases that may benefit from the use of network services (exposed via APIs).
* [**Workflows and Requirements to exploit network capabilities**](./network-apis/content-production/workflows). This describes generic workflows and interactions to exploit network capabilities and provides insight into devices and requirements.
* [**Using CAMARA APIs**](./network-apis/content-production/using-camara-apis). This contains several examples of instantiations of the workflows and scenarios above when using CAMARA APIs.

### Network Capability Exposure for Live Media Distribution

* [**Introduction**](./network-apis/live-media-distribution/introduction). Introduction to the work on Network APIs for live media distribution and the visibility gap between content providers and network operators.
* [**Scenarios & Use Cases**](./network-apis/live-media-distribution/scenarios). Scenarios and use cases for live media distribution that may benefit from network capability exposure via APIs.
* [**Workflows**](./network-apis/live-media-distribution/workflows). Required interactions to exploit network capabilities.

---

## Related

* [Standards: Network APIs](/tech/standards/network-apis). 5G-MAG's standards tracking and contributions on network capability exposure.
* [Developer portal: Network APIs](https://developer.5g-mag.com/network-apis). The 5G-MAG reference tools implementing CAMARA-compliant clients.
* [Streaming & Media Delivery](/tech/5gms). Related media delivery analysis on this portal.

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
