---
title: Network API Analysis
sidebar_position: -1
hide_title: true
description: Indexes the CAMARA APIs 5G-MAG analyses and how they map onto underlying 3GPP NEF and PCF service-based interfaces.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Technology</span>
<h1>Network API Analysis</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Network API Initiatives under analysis

5G-MAG analyses two complementary families of network APIs: the open-source [CAMARA](https://camaraproject.org/) APIs (which provide developer-friendly abstractions of network capabilities) and the underlying 3GPP service-based interfaces that those APIs map onto inside the 5G Core.

This section contains information on:

- [**CAMARA APIs for Communication Quality Management**](#camara-apis-for-communication-quality-management)
- [**Details on the DEVICE object**](#details-on-the-device-object)
- [**Details on the APPLICATION SERVER**](#details-on-the-application-server)
- [**Relevant QoS parameters**](#relevant-qos-parameters)
- [**3GPP APIs for Quality of Service**](#3gpp-apis-for-quality-of-service)

## CAMARA APIs for Communication Quality Management

The CAMARA APIs below are analysed on their own pages. They are not all independent: several depend on the QoS Profiles API (which lists the named QoS bundles an operator offers) or on the Application Profiles API (which declares an application's requirements once for reuse). The table gives each API's role and its main dependency at a glance; the sections that follow link to the analysis and to the CAMARA source (CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml info.description; CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml info.description; CAMARA ConnectivityInsights main@db9c0de connectivity-insights.yaml info.description).

| API                                                                                 | What it does                                                                             | Main dependency                          |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| [Application Profiles](./camara-application-profiles)                               | Declare an application's network and compute requirements once, for reuse by other APIs. | none (CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml info.description) |
| [Connectivity Insights](./camara-connectivity-insights)                             | One-shot check of whether the network can currently meet those requirements.             | Application Profiles (CAMARA ConnectivityInsights main@db9c0de connectivity-insights.yaml info.description) |
| [Connectivity Insights Subscriptions](./camara-connectivity-insights-subscriptions) | Continuous monitoring of the same, delivered as event notifications.                     | Application Profiles (CAMARA ConnectivityInsights main@db9c0de connectivity-insights-subscriptions.yaml info.description; schemas applicationProfileId; event type org.camaraproject.connectivity-insights-subscriptions.v0.network-quality) |
| [Dedicated Networks](./camara-dedicated-networks)                                   | Reserve a dedicated network for an area and time, then grant devices access.             | Dedicated Network Profiles or QoS Profiles |
| [Network Slice Booking](./camara-network-slice-booking)                             | Book network slice resources for an area and time window.                                | none (defines its own slice QoS profile) (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description; schemas SliceQosProfile) |
| [QoS Booking](./camara-qos-booking)                                                 | Reserve a QoS profile in advance for specific devices.                                   | QoS Profiles (CAMARA QoSBooking main@4de93f1 qos-booking.yaml info.description) |
| [QoS Booking and Assignment](./camara-qos-booking-assignment)                       | Reserve a QoS profile for a device count, then assign devices later.                     | QoS Profiles (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description; schemas bookingDeviceCount) |
| [QoS Profiles](./camara-qos-profiles)                                               | Discover the named QoS profiles an operator offers.                                      | none (consulted first by most QoS APIs) (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml info.description; CAMARA QoSBooking main@4de93f1 qos-booking.yaml info.description; CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description) |
| [QoS Provisioning](./camara-qos-provisioning)                                       | Assign a QoS profile to a device indefinitely.                                           | QoS Profiles (CAMARA QualityOnDemand main@471aa35 qos-provisioning.yaml info.description) |
| [Quality on Demand](./camara-quality-on-demand)                                     | Request a QoS session for the duration of a media flow.                                  | QoS Profiles (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description; `/sessions` POST) |

### Application Profiles API

Declares an application's network and compute requirements once, so other APIs can reference them (CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml info.description).

- Analysis of [**Application Profiles**](./camara-application-profiles) by 5G-MAG
- CAMARA Project: [Application Profiles project page](https://camaraproject.org/application-profiles/) and [GitHub repository](https://github.com/camaraproject/ApplicationProfiles) (CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml externalDocs url)

### Connectivity Insights API

One-shot check of whether the network can currently meet an application's requirements (CAMARA ConnectivityInsights main@db9c0de connectivity-insights.yaml info.description).

- Analysis of [**Connectivity Insights**](./camara-connectivity-insights) by 5G-MAG
- CAMARA Project: [Connectivity Insights project page](https://camaraproject.org/connectivity-insights/) and [GitHub repository](https://github.com/camaraproject/ConnectivityInsights) (CAMARA ConnectivityInsights main@db9c0de connectivity-insights.yaml externalDocs url)

### Connectivity Insights Subscriptions API

Continuous version of Connectivity Insights, delivering event notifications when network quality changes (CAMARA ConnectivityInsights main@db9c0de connectivity-insights-subscriptions.yaml info.description; schemas event network-quality; callback description).

- Analysis of [**Connectivity Insights Subscriptions**](./camara-connectivity-insights-subscriptions) by 5G-MAG
- CAMARA Project: [Connectivity Insights Subscriptions project page](https://camaraproject.org/connectivity-insights-subscriptions/) and [GitHub repository](https://github.com/camaraproject/ConnectivityInsights) (CAMARA ConnectivityInsights main@db9c0de connectivity-insights.yaml externalDocs url)

### Dedicated Networks API

Reserves a dedicated network for an area and time window, then grants specific devices access (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description).

- Analysis of [**Dedicated Networks**](./camara-dedicated-networks) by 5G-MAG
- CAMARA Project: [Dedicated Networks project page](https://camaraproject.org/dedicated-networks/) and [GitHub repository](https://github.com/camaraproject/DedicatedNetworks) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml externalDocs url)

### Network Slice Booking API

Books network slice resources for an area and time window ahead of an event (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description).

- Analysis of [**Network Slice Booking**](./camara-network-slice-booking) by 5G-MAG
- CAMARA Project: [Network Slice Booking project page](https://camaraproject.org/network-slice-booking/) and [GitHub repository](https://github.com/camaraproject/NetworkSliceBooking) (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml externalDocs url)

### QoS Booking APIs

Reserves a QoS profile in advance for specific devices (CAMARA QoSBooking main@4de93f1 qos-booking.yaml info.description).

- Analysis of [**QoS Booking**](./camara-qos-booking) by 5G-MAG
- CAMARA Project: [QoS Booking project page](https://camaraproject.org/qos-booking/) and [GitHub repository](https://github.com/camaraproject/QoSBooking) (CAMARA QoSBooking main@4de93f1 qos-booking.yaml externalDocs url)

### QoS Booking and Assignment APIs

Reserves a QoS profile for a number of devices, then assigns individual devices to the booking later (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description).

- Analysis of [**QoS Booking and Assignment**](./camara-qos-booking-assignment) by 5G-MAG
- CAMARA Project: [QoS Booking and Assignment project page](https://camaraproject.org/qos-booking-and-assignment/) and [GitHub repository](https://github.com/camaraproject/QoSBooking) (CAMARA QoSBooking main@4de93f1 qos-booking.yaml externalDocs url)

### QoS Profiles API

Lists the named QoS profiles an operator offers; consulted first by most of the QoS APIs above (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml info.description; CAMARA QoSBooking main@4de93f1 qos-booking.yaml info.description).

- Analysis of [**QoS Profiles**](./camara-qos-profiles) by 5G-MAG
- CAMARA Project: [QoS Profiles project page](https://camaraproject.org/qos-profiles/) and [GitHub repository](https://github.com/camaraproject/QoSProfiles) (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml externalDocs; CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description)

### QoS Provisioning API

Assigns a QoS profile to a device indefinitely, until the provisioning is deleted (CAMARA QualityOnDemand main@471aa35 qos-provisioning.yaml info.description).

- Analysis of [**QoS Provisioning**](./camara-qos-provisioning) by 5G-MAG
- CAMARA Project: [QoS Provisioning project page](https://camaraproject.org/qod-provisioning/) and [GitHub repository](https://github.com/camaraproject/QualityOnDemand) (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml externalDocs url)

### Quality On Demand API

Requests a QoS session (stable latency or prioritised throughput) for the duration of a media flow (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description; `/sessions` POST).

- Analysis of [**Quality On Demand**](./camara-quality-on-demand) by 5G-MAG
- CAMARA Project: [Quality on Demand project page](https://camaraproject.org/quality-on-demand/) and [GitHub repository](https://github.com/camaraproject/QualityOnDemand) (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml externalDocs url)

## Details on the `device` object

A device object in the sense of CAMARA APIs is defined as (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description, components/examples EXAMPLE_4_CREATION_BODY; CAMARA Commonalities main@b1a9f08 Glossary.md):

```json
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

- A single User Equipment (UE, the mobile termination that attaches to the network, for example a smartphone) equipped with a single Subscriber Identity Module (SIM) card (or embedded SIM, eSIM) connected to the mobile network.
- A single device (e.g. a smartphone) equipped with 2 UEs each with 1 SIM card (or eSIM) connected to a different carrier of the same mobile network or different mobile networks.
- A device with multiple UEs (e.g. a cellular bonding backpack) equipped with multiple SIM cards each one connected to a different carrier of the same mobile network or connected to different mobile networks.

Identifying such a device by a telephone number (Mobile Station International Subscriber Directory Number, MSISDN) may not be practical (or relevant) as the device is used exclusively for data.

## Details on the Application Server

A media application running in a device (as per the sense in the section above) may run different processes each one associated to a different Application Server (AS, the server endpoint the media flows to or from) IP:port address. For instance, an application for Mobile Journalism may be running uplink video towards an AS and receiving return video from a different IP:port. These two different media flows, though belonging to the same device, would require the allocation of different network resources and performance.

## Relevant QoS Parameters

Both the Application Profiles API and the QoS Profiles API reuse the same core network-quality parameters, defined once below. The QoS Profiles API adds a few extra fields; the Network Slice Booking API uses a separate set. (Note: the field for error loss rate appears as `packetErrorLossRate` in the CAMARA QoS Profiles definition; some API definitions spell it `packetLossErrorRate`. Confirm the exact name against the specific `.yaml` you integrate against.) (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas packetErrorLossRate and extra fields; CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml schemas PacketErrorLossRate; CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml schemas SliceQosProfile)

### Core network-quality parameters (Application Profiles and QoS Profiles)

- `packetDelayBudget`- the maximum allowable one-way latency between the customer's device and the gateway from the operator's network to other networks. The end-to-end or round trip latency will be about two times this value plus the latency not controlled by the operator (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas packetDelayBudget; CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml schemas PacketDelayBudget)
- `targetMinDownstreamRate` - the target minimum downstream rate (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas targetMinDownstreamRate; CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml schemas TargetMinDownstreamRate).
- `targetMinUpstreamRate` - the target minimum upstream rate (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas targetMinUpstreamRate; CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml schemas TargetMinUpstreamRate)
- `packetErrorLossRate` - the exponential power of the allowable error loss rate 10^(-N). For 5G network the 3GPP specification [TS 23.203](https://www.3gpp.org/dynareport/23203.htm) defines the packet error loss rate QCI attribute.
- `jitter` - this requirement aims to limit the maximum variation in round-trip packet delay for the 99th percentile of traffic, following ITU Y.1540 standards. It considers only acknowledged packets in a session, which are packets that receive a confirmation of receipt from the recipient (e.g., using TCP) (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas jitter; CAMARA ApplicationProfiles main@11066d6 application-profiles.yaml schemas Jitter).

### Additional QoS Profiles parameters

The QoS Profiles API adds further fields on top of the core parameters above, for example:

- `minDuration` (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas minDuration)
- `maxDuration` (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas maxDuration)
- `priority` (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas priority)
- `l4sQueueType` (CAMARA QoSProfiles main@8ce8f4d qos-profiles.yaml schemas l4sQueueType)

#### Network Slice QoS Profile

- `maxNumOfDevices`- is the maximum number of devices that can be connected to the slice (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml schemas SliceQosProfile.maxNumOfDevices)
- `downStreamRatePerDevice` - is the maximum downstream rate allowed for each device connected to the slice. It indicates the individual device capability required for the slice (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml schemas SliceQosProfile.downStreamRatePerDevice).
- `upStreamRatePerDevice` - is the maximum upstream rate allowed for each device connected to the slice. It indicates the individual device capability required for the slice (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml schemas SliceQosProfile.upStreamRatePerDevice).
- `downStreamDelayBudget` - is the maximum allowable downlink packet transmission latency (millisecond). By limiting the delay, the network can provide an acceptable level of performance for various services, such as voice calls, video streaming, and data (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml schemas SliceQosProfile.downStreamDelayBudget).
- `upStreamDelayBudget` - is the maximum allowable uplink packet transmission latency (millisecond). By limiting the delay, the network can provide an acceptable level of performance for various services, such as voice calls, video streaming, and data (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml schemas SliceQosProfile.upStreamDelayBudget).

## 3GPP APIs for Quality of Service

We collect here information about the following 3GPP service-based interfaces. These are the 3GPP-defined services that several CAMARA APIs (e.g. Quality on Demand) map onto when exposed through the Network Exposure Function (NEF).

### NEF (Network Exposure Function)

The NEF exposes network capabilities towards Application Functions (AFs). The northbound APIs are defined in [TS 29.522](https://www.3gpp.org/dynareport/29522.htm), while the underlying background data transfer (BDT) policy control service on the PCF is defined in [TS 29.554](https://www.3gpp.org/dynareport/29554.htm).

- [Nnef_AFsessionWithQoS](https://www.3gpp.org/dynareport/29522.htm): set up an AF session with required QoS (TS 29.522, NEF Northbound APIs).
- [Nnef_ChargeableParty](https://www.3gpp.org/dynareport/29522.htm): change the chargeable party at session set-up or during the session (TS 29.522, NEF Northbound APIs).
- [Nnef_BDTPNegotiation](https://www.3gpp.org/dynareport/29522.htm): negotiate a policy for future background data transfer (BDT) (TS 29.522, NEF Northbound APIs; the underlying BDT policies are handled by the PCF, TS 29.554).

### PCF (Policy Control Function)

The PCF authorises and controls policies for AF sessions. The relevant service-based interfaces are defined in [TS 29.514](https://www.3gpp.org/dynareport/29514.htm) and TS 29.554.

- [Npcf_PolicyAuthorization](https://www.3gpp.org/dynareport/29514.htm): authorise AF requests and provision policy for the Protocol Data Unit (PDU) session to which the AF session is bound (TS 29.514, Policy Authorization Service).
- [Npcf_BDTPolicyControl](https://www.3gpp.org/dynareport/29554.htm): create, update and notify background data transfer (BDT) policies (TS 29.554, BDT Policy Control Service).

### How a QoS request flows through these interfaces

For a QoS session the chain is:

1. The Application Function (in this context, the CAMARA API provider or an aggregator acting on its behalf) calls the NEF `AsSessionWithQoS` API (TS 29.522). The request identifies the traffic (UE address, application server address, port ranges) and the desired QoS, expressed as a reference to a pre-agreed QoS profile plus optional per-flow bit rates.
2. The NEF authenticates and authorises the caller (through CAPIF, [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) / [TS 29.222](https://www.3gpp.org/dynareport/29222.htm)) and forwards the request to the PCF using `Npcf_PolicyAuthorization` (TS 29.514).
3. The PCF derives PCC rules and provisions them towards the SMF, which programs the UPF to enforce the QoS on the PDU session. The 5G QoS is characterised by a 5G QoS Identifier (5QI); in 4G/LTE the corresponding label is the QoS Class Identifier (QCI); CAMARA examples include profile names such as `QCI_1_voice`.
4. Status changes (for example the network no longer being able to sustain the QoS) are reported back to the AF as NEF notification events, which a CAMARA provider surfaces to the consumer as CloudEvents (TS 29.522 V19.7.0 clause 4.4.9.2.2; CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml `/sessions` POST callbacks, schemas QosEventType).

The NEF also exposes monitoring and analytics events (used by Connectivity Insights) and, for network data analytics, may draw on the Network Data Analytics Function (NWDAF). Slice-oriented CAMARA APIs (Network Slice Booking, Dedicated Networks) map instead onto slice management provisioning and, for runtime slice influence, onto the SEAL Network Slice Capability Enablement (NSCE) service in [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with protocol aspects in TS 24.549). In TS 23.434 clause 14.3.10.2, the S-NSSAI and DNN influence on the UE Route Selection Policy (URSP) rules is carried out through the network resource management (NRM) server.

:::note
CAMARA does not mandate a southbound realisation. The mappings above are the common correspondence between a CAMARA operation and the 3GPP northbound service it most naturally uses; an operator may implement a given API differently (for example directly against a policy or slice-management system rather than through the NEF). Treat the mapping as analysis, not as a normative requirement of the CAMARA specifications.
:::

## Cross-cutting CAMARA rules (Commonalities)

The APIs analysed in this section share a set of conventions defined by the CAMARA Commonalities and Identity and Consent Management working groups, rather than being redefined per API (CAMARA Commonalities main@b1a9f08 CAMARA-API-Design-Guide.md section 6.1 and 6.2; CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description):

- **Device identification.** `phoneNumber` is an MSISDN; `networkAccessIdentifier` corresponds to a 3GPP GPSI expressed as an External Identifier; IP address identification is also allowed. When a three-legged token identifies the subscriber the `device` object must not be provided (`422 UNNECESSARY_IDENTIFIER` otherwise); when the subscriber cannot be identified from the token or the `device` object, `422 MISSING_IDENTIFIER` is returned (CAMARA Commonalities main@b1a9f08 CAMARA-API-Design-Guide.md Appendix A (when the subject is identified from the token, `device` MUST NOT be provided; 422 MISSING_IDENTIFIER / UNNECESSARY_IDENTIFIER); CAMARA Commonalities main@b1a9f08 Glossary.md).
- **Authorisation.** OAuth 2.0, with a three-legged token (end-user consent, OpenID Connect / CIBA) identifying the subscriber, or a two-legged (client-credentials) token with the device given explicitly; many of these APIs accept either.
- **Notifications.** [CloudEvents](https://cloudevents.io/) 1.0 JSON delivered to a `sink` callback URL, authenticated per `sinkCredential` (CAMARA Commonalities main@b1a9f08 CAMARA-API-Event-Subscription-and-Notification-Guide.md section 2.1, section 3.1).
- **Tracing and errors.** An optional `x-correlator` header is echoed back, and a common error model is used across APIs (CAMARA Commonalities main@b1a9f08 CAMARA-API-Design-Guide.md section 5.8.5, section 3.2).
- **Versioning and releases.** A `wip` version on `main` is not a release. Several APIs here still have `v0` event types, so field names and enumerations can change.

## How it works

A CAMARA API is deliberately thin: the media application sees a small REST resource, for example a QoD `session` or a slice `booking`. Behind that resource sit two further layers, so a single API call travels CAMARA API &rarr; NEF (3GPP northbound exposure) &rarr; PCF (policy decision) &rarr; SMF/UPF (enforcement on the device's PDU session, its active data connection to the network).

| API / specification | What it does for media |
|---|---|
| CAMARA Quality on Demand (QoD) API | Requests stable latency or prioritised throughput for a media flow on demand, for example a low-latency contribution link. (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description; `/sessions` POST) |
| CAMARA Connectivity Insights API | Checks whether the network can currently meet an application's quality requirements before or during a session. (CAMARA ConnectivityInsights main@db9c0de connectivity-insights.yaml info.description; CAMARA ConnectivityInsights main@db9c0de connectivity-insights-subscriptions.yaml info.description) |
| CAMARA Network Slice Booking API | Reserves network slice resources for a given area and time window ahead of an event. (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description) |
| 3GPP TS 23.434 (SEAL) | Provides common enabling services (group management, configuration, network resource management) that support vertical applications (TS 23.434 scope). |

**3GPP northbound exposure.** The Network Exposure Function (NEF) is the 5G Core function that exposes capabilities to an Application Function (AF). Its northbound APIs are specified in [TS 29.522](https://www.3gpp.org/dynareport/29522.htm). For QoS the relevant northbound API is `AsSessionWithQoS` (the RESTful form of the `Nnef_AFsessionWithQoS` service). In 4G/EPC the equivalent function is the Service Capability Exposure Function (SCEF); TS 23.501 clause 4.3.5.1 defines a combined SCEF+NEF node for interworking between the EPC and the 5G Core. Discovery, onboarding and authentication of these APIs are handled by the Common API Framework (CAPIF), [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) / [TS 29.222](https://www.3gpp.org/dynareport/29222.htm).

The application never sees the PCF, SMF or UPF. This is the value CAMARA adds: one operator-agnostic contract in place of per-operator 3GPP integration. It is also the source of most of the open questions 5G-MAG records on the analysis pages, because information that exists inside the core (measured latency, service-area availability) is not always surfaced back through the CAMARA abstraction.

**API families.** The CAMARA APIs 5G-MAG analyses fall into a few families: QoS for a flow or device ([Quality on Demand](/tech/network-apis/camara-quality-on-demand), [QoS Provisioning](/tech/network-apis/camara-qos-provisioning), [QoS Booking](/tech/network-apis/camara-qos-booking) and [QoS Booking and Assignment](/tech/network-apis/camara-qos-booking-assignment), all consuming a named profile from [QoS Profiles](/tech/network-apis/camara-qos-profiles)); area and time reservation for many devices ([Network Slice Booking](/tech/network-apis/camara-network-slice-booking) and [Dedicated Networks](/tech/network-apis/camara-dedicated-networks)); and requirements and monitoring ([Application Profiles](/tech/network-apis/camara-application-profiles) declares an application's needs once, and [Connectivity Insights](/tech/network-apis/camara-connectivity-insights) plus [Connectivity Insights Subscriptions](/tech/network-apis/camara-connectivity-insights-subscriptions) check whether the network can meet them). On `main`, all of these API definitions are work-in-progress (`wip`) versions and all event types except Quality on Demand's are `v0`, so field names and enumerations can change between releases (CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml schemas QosEventType; info.version; CAMARA QualityOnDemand main@471aa35 qos-provisioning.yaml QosProvisioningEventType).

Two further sets of pages apply this to real workflows: [Content Production & Contribution](/tech/network-apis/content-production/introduction) covers professional content production and contribution scenarios, and [Live Media Distribution](/tech/network-apis/live-media-distribution/introduction) covers the visibility gap between content providers and network operators for live distribution.

**Related:** [5G Media Streaming (5GMS)](/tech/5gms)

---
