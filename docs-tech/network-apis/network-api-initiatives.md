---
title: Network API Analysis
sidebar_position: 3
hide_title: true
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>Network API Analysis</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Network API Initiatives under analysis

5G-MAG analyses two complementary families of network APIs: the open-source [CAMARA](https://camaraproject.org/) APIs (which provide developer-friendly abstractions of network capabilities) and the underlying 3GPP service-based interfaces that those APIs map onto inside the 5G Core.

This section contains information on:
* [**CAMARA APIs for Communication Quality Management**](#camara-apis-for-communication-quality-management)
* [**Details on the DEVICE object**](#details-on-the-device-object)
* [**Details on the APPLICATION SERVER**](#details-on-the-application-server)
* [**Relevant QoS parameters**](#relevant-qos-parameters)
* [**3GPP APIs for Quality of Service**](#3gpp-apis-for-quality-of-service)

## CAMARA APIs for Communication Quality Management

The CAMARA APIs below are analysed on their own pages. They are not all independent: several depend on the QoS Profiles API (which lists the named QoS bundles an operator offers) or on the Application Profiles API (which declares an application's requirements once for reuse). The table gives each API's role and its main dependency at a glance; the sections that follow link to the analysis and to the CAMARA source.

| API | What it does | Main dependency |
| --- | --- | --- |
| [Application Profiles](./camara-application-profiles) | Declare an application's network and compute requirements once, for reuse by other APIs. | none |
| [Connectivity Insights](./camara-connectivity-insights) | One-shot check of whether the network can currently meet those requirements. | Application Profiles |
| [Connectivity Insights Subscriptions](./camara-connectivity-insights-subscriptions) | Continuous monitoring of the same, delivered as event notifications. | Application Profiles |
| [Dedicated Networks](./camara-dedicated-networks) | Reserve a dedicated network for an area and time, then grant devices access. | QoS Profiles |
| [Network Slice Booking](./camara-network-slice-booking) | Book network slice resources for an area and time window. | none (defines its own slice QoS profile) |
| [QoS Booking](./camara-qos-booking) | Reserve a QoS profile in advance for specific devices. | QoS Profiles |
| [QoS Booking and Assignment](./camara-qos-booking-assignment) | Reserve a QoS profile for a device count, then assign devices later. | QoS Profiles |
| [QoS Profiles](./camara-qos-profiles) | Discover the named QoS profiles an operator offers. | none (consulted first by most QoS APIs) |
| [QoS Provisioning](./camara-qos-provisioning) | Assign a QoS profile to a device indefinitely. | QoS Profiles |
| [Quality on Demand](./camara-quality-on-demand) | Request a QoS session for the duration of a media flow. | QoS Profiles |

### Application Profiles API
Declares an application's network and compute requirements once, so other APIs can reference them.
* Analysis of [**Application Profiles**](./camara-application-profiles) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/application-profiles/](https://camaraproject.org/application-profiles/) and [https://github.com/camaraproject/ApplicationProfiles](https://github.com/camaraproject/ApplicationProfiles)

### Connectivity Insights API
One-shot check of whether the network can currently meet an application's requirements.
* Analysis of [**Connectivity Insights**](./camara-connectivity-insights) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/connectivity-insights/](https://camaraproject.org/connectivity-insights/) and [https://github.com/camaraproject/ConnectivityInsights](https://github.com/camaraproject/ConnectivityInsights)

### Connectivity Insights Subscriptions API
Continuous version of Connectivity Insights, delivering event notifications when network quality changes.
* Analysis of [**Connectivity Insights Subscriptions**](./camara-connectivity-insights-subscriptions) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/connectivity-insights-subscriptions/](https://camaraproject.org/connectivity-insights-subscriptions/) and [https://github.com/camaraproject/ConnectivityInsights](https://github.com/camaraproject/ConnectivityInsights)

### Dedicated Networks API
Reserves a dedicated network for an area and time window, then grants specific devices access.
* Analysis of [**Dedicated Networks**](./camara-dedicated-networks) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/dedicated-networks/](https://camaraproject.org/dedicated-networks/) and [https://github.com/camaraproject/DedicatedNetworks](https://github.com/camaraproject/DedicatedNetworks)

### Network Slice Booking API
Books network slice resources for an area and time window ahead of an event.
* Analysis of [**Network Slice Booking**](./camara-network-slice-booking) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/network-slice-booking/](https://camaraproject.org/network-slice-booking/) and [https://github.com/camaraproject/NetworkSliceBooking](https://github.com/camaraproject/NetworkSliceBooking)

### QoS Booking APIs
Reserves a QoS profile in advance for specific devices.
* Analysis of [**QoS Booking**](./camara-qos-booking) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/qos-booking/](https://camaraproject.org/qos-booking/) and [https://github.com/camaraproject/QoSBooking](https://github.com/camaraproject/QoSBooking)

### QoS Booking and Assignment APIs
Reserves a QoS profile for a number of devices, then assigns individual devices to the booking later.
* Analysis of [**QoS Booking and Assignment**](./camara-qos-booking-assignment) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/qos-booking-and-assignment/](https://camaraproject.org/qos-booking-and-assignment/) and [https://github.com/camaraproject/QoSBooking](https://github.com/camaraproject/QoSBooking)

### QoS Profiles API
Lists the named QoS profiles an operator offers; consulted first by most of the QoS APIs above.
* Analysis of [**QoS Profiles**](./camara-qos-profiles) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/qos-profiles/](https://camaraproject.org/qos-profiles/) and [https://github.com/camaraproject/QualityOnDemand](https://github.com/camaraproject/QualityOnDemand)

### QoS Provisioning API
Assigns a QoS profile to a device indefinitely, until the provisioning is deleted.
* Analysis of [**QoS Provisioning**](./camara-qos-provisioning) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/qod-provisioning/](https://camaraproject.org/qod-provisioning/) and [https://github.com/camaraproject/QualityOnDemand](https://github.com/camaraproject/QualityOnDemand)

### Quality On Demand API
Requests a QoS session (stable latency or prioritised throughput) for the duration of a media flow.
* Analysis of [**Quality On Demand**](./camara-quality-on-demand) by 5G-MAG
* CAMARA Project: [https://camaraproject.org/quality-on-demand/](https://camaraproject.org/quality-on-demand/) and [https://github.com/camaraproject/QualityOnDemand](https://github.com/camaraproject/QualityOnDemand)

## Details on the `device` object
A device object in the sense of CAMARA APIs is defined as:

```
"device": {
    "phoneNumber": "+123456789",
    "networkAccessIdentifier": "123456789@domain.com",
    "ipv4Address": {
      "publicAddress": "203.0.113.0",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  },
```

However, as indicated in the [Production and Contribution Scenarios](/tech/network-apis/content-production/scenarios#single-device-connectivity-single-camera-live-video-production-mobile-journalism-mojo-newsgathering-uplink-video), a device in the context of a Mobile Journalism or Media Production scenario may be:

* A single User Equipment (UE, the mobile termination that attaches to the network, for example a smartphone) equipped with a single Subscriber Identity Module (SIM) card (or embedded SIM, eSIM) connected to the mobile network.
* A single device (e.g. a smartphone) equipped with 2 UEs each with 1 SIM card (or eSIM) connected to a different carrier of the same mobile network or different mobile networks.
* A device with multiple UEs (e.g. a cellular bonding backpack) equipped with multiple SIM cards each one connected to a different carrier of the same mobile network or connected to different mobile networks.

Identifying such a device by a telephone number (Mobile Station International Subscriber Directory Number, MSISDN) may not be practical (or relevant) as the device is used exclusively for data.

## Details on the Application Server
A media application running in a device (as per the sense in the section above) may run different processes each one associated to a different Application Server (AS, the server endpoint the media flows to or from) IP:port address. For instance, an application for Mobile Journalism may be running uplink video towards an AS and receiving return video from a different IP:port. These two different media flows, though belonging to the same device, would require the allocation of different network resources and performance.

## Relevant QoS Parameters

Both the Application Profiles API and the QoS Profiles API reuse the same core network-quality parameters, defined once below. The QoS Profiles API adds a few extra fields; the Network Slice Booking API uses a separate set. (Note: the field for error loss rate appears as `packetErrorLossRate` in the CAMARA QoS Profiles definition; some API definitions spell it `packetLossErrorRate`. Confirm the exact name against the specific `.yaml` you integrate against.)

### Core network-quality parameters (Application Profiles and QoS Profiles)
* `packetDelayBudget`- the maximum allowable one-way latency between the customer's device and the gateway from the operator's network to other networks. The end-to-end or round trip latency will be about two times this value plus the latency not controlled by the operator
* `targetMinDownstreamRate` - the target minimum downstream rate.
* `targetMinUpstreamRate` - the target minimum upstream rate
* `packetErrorLossRate` - the exponential power of the allowable error loss rate 10^(-N). For 5G network the 3GPP specification [TS 23.203](https://www.3gpp.org/dynareport/23203.htm) defines the packet error loss rate QCI attribute.
* `jitter`  - this requirement aims to limit the maximum variation in round-trip packet delay for the 99th percentile of traffic, following ITU Y.1540 standards. It considers only acknowledged packets in a session, which are packets that receive a confirmation of receipt from the recipient (e.g., using TCP).

### Additional QoS Profiles parameters
The QoS Profiles API adds the following fields on top of the core parameters above:
* `minDuration`
* `maxDuration`
* `priority`
* `l4sQueueType`

#### Network Slice QoS Profile
* `maxNumOfDevices`- is the maximum number of devices that can be connected to the slice
* `downStreamRatePerDevice` - is the maximum downstream rate allowed for each device connected to the slice. It indicates the individual device capability required for the slice.
* `upStreamRatePerDevice` - is the maximum upstream rate allowed for each device connected to the slice. It indicates the individual device capability required for the slice.
* `downStreamDelayBudget` - is the maximum allowable downlink packet transmission latency (millisecond). By limiting the delay, the network can provide an acceptable level of performance for various services, such as voice calls, video streaming, and data.
* `upStreamDelayBudget`  - is the maximum allowable uplink packet transmission latency (millisecond). By limiting the delay, the network can provide an acceptable level of performance for various services, such as voice calls, video streaming, and data.

## 3GPP APIs for Quality of Service

We collect here information about the following 3GPP service-based interfaces. These are the 3GPP-defined services that several CAMARA APIs (e.g. Quality on Demand, Network Slice Booking) map onto when exposed through the Network Exposure Function (NEF).

### NEF (Network Exposure Function)

The NEF exposes network capabilities towards Application Functions (AFs). The northbound APIs are defined in [TS 29.522](https://www.3gpp.org/dynareport/29522.htm), while the underlying background data transfer negotiation is defined in [TS 29.554](https://www.3gpp.org/dynareport/29554.htm).

- [Nnef_AFSessionWithQoS](https://www.3gpp.org/dynareport/29522.htm): set up an AF session with required QoS (TS 29.522, NEF Northbound APIs).
- [Nnef_ChargeableParty](https://www.3gpp.org/dynareport/29522.htm): change the chargeable party at session set-up or during the session (TS 29.522, NEF Northbound APIs).
- [Nnef_BDTPNegotiation](https://www.3gpp.org/dynareport/29554.htm): negotiate a policy for future background data transfer (BDT) (TS 29.554, BDT Policy Control Service, exposed via the NEF).

### PCF (Policy Control Function)

The PCF authorises and controls policies for AF sessions. The relevant service-based interfaces are defined in [TS 29.514](https://www.3gpp.org/dynareport/29514.htm) and TS 29.554.

- [Npcf_PolicyAuthorization](https://www.3gpp.org/dynareport/29514.htm): authorise AF requests and provision policy for the Protocol Data Unit (PDU) session to which the AF session is bound (TS 29.514, Policy Authorization Service).
- [Npcf_BDTPolicyControl](https://www.3gpp.org/dynareport/29554.htm): retrieve and update background data transfer (BDT) policies (TS 29.554, BDT Policy Control Service).

### How a QoS request flows through these interfaces

For a QoS session the chain is:

1. The Application Function (in this context, the CAMARA API provider or an aggregator acting on its behalf) calls the NEF `AsSessionWithQoS` API (TS 29.522). The request identifies the traffic (UE address, application server address, port ranges) and the desired QoS, expressed as a reference to a pre-agreed QoS profile plus optional per-flow bit rates.
2. The NEF authenticates and authorises the caller (through CAPIF, [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) / [TS 29.222](https://www.3gpp.org/dynareport/29222.htm)) and forwards the request to the PCF using `Npcf_PolicyAuthorization` (TS 29.514).
3. The PCF derives PCC rules and provisions them towards the SMF, which programs the UPF to enforce the QoS on the PDU session. The 5G QoS is characterised by a 5G QoS Identifier (5QI); in 4G/LTE the corresponding label is the QoS Class Identifier (QCI), which is why some operator profile names still carry `QCI_` prefixes.
4. Status changes (for example the network no longer being able to sustain the QoS) are reported back to the AF as NEF notification events, which a CAMARA provider surfaces to the consumer as CloudEvents.

The NEF also exposes monitoring and analytics events (used by Connectivity Insights) and, for network data analytics, may draw on the Network Data Analytics Function (NWDAF). Slice-oriented CAMARA APIs (Network Slice Booking, Dedicated Networks) map instead onto slice management provisioning and, for runtime slice influence, onto the SEAL Network Slice Capability Enablement (NSCE) service in [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with protocol aspects in TS 24.549). The NSCE server acts as an AF, updating the S-NSSAI and DNN carried in the UE Route Selection Policy (URSP) rules so that a vertical's traffic is steered onto the intended slice.

:::note
CAMARA does not mandate a southbound realisation. The mappings above are the common correspondence between a CAMARA operation and the 3GPP northbound service it most naturally uses; an operator may implement a given API differently (for example directly against a policy or slice-management system rather than through the NEF). Treat the mapping as analysis, not as a normative requirement of the CAMARA specifications.
:::

## Cross-cutting CAMARA rules (Commonalities)

The APIs analysed in this section share a set of conventions defined by the CAMARA Commonalities and Identity and Consent Management working groups, rather than being redefined per API:

* **Device identification.** `phoneNumber` is an MSISDN; `networkAccessIdentifier` corresponds to a 3GPP GPSI expressed as an External Identifier; IP address identification is also allowed. When a three-legged token already identifies the subscriber the device object can be omitted, and a `422 MISSING_IDENTIFIER` error is returned if the device still cannot be resolved.
* **Authorisation.** OAuth 2.0, with a three-legged (end-user consent, OpenID Connect / CIBA) token for operations on a specific subscriber and a two-legged (client-credentials) token for others.
* **Notifications.** CloudEvents 1.0 JSON delivered to a `sink` callback URL, authenticated per `sinkCredential`.
* **Tracing and errors.** An optional `x-correlator` header is echoed back, and a common error model is used across APIs.
* **Versioning and releases.** APIs are shipped in twice-yearly meta-releases; a `wip` version on `main` is not a release. Several APIs here are still `v0`, so field names and enumerations can change.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 24.549 (SEAL NSCE Stage 3). The specification titles/numbers already carrying links above (TS 29.522, TS 29.514, TS 29.554, TS 23.222, TS 29.222, TS 23.434, TS 23.203) are widely established and are not flagged here. Verify any specific clause references against the 3GPP work plan before publication.
:::

---

## Related

* [Network APIs (this portal)](/tech/network-apis). The parent landing page for all Network API analysis.
* [Standards: Network APIs](/tech/standards/network-apis). 5G-MAG's standards tracking and contributions.
* [Developer portal: Network APIs](https://developer.5g-mag.com/network-apis). The 5G-MAG reference tools.

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
