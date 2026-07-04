---
title: Dedicated Networks
sidebar_position: 7
hide_title: true
description: Describes how the CAMARA Dedicated Networks API reserves a network profile and service area, then attaches devices for multi-device productions.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>Dedicated Networks</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Using CAMARA APIs: Dedicated Networks for Content Production & Contribution

Find more information about [**Dedicated Networks API**](../camara-dedicated-networks).

## Purpose

A user of a media application requests from the mobile network a set of capabilities and connectivity performance targets for a particular geographical location and time window.

## Workflow and Architecture

The entities, devices and interaction within the scope of this API are illustrated in the high-level figure below.

<figure>
  <img loading="lazy" src="/img/tech/network-apis/content-production/figure_dedicatednetworks.png" alt="High-level diagram showing the entities, devices, and interactions involved in the Dedicated Networks API workflow and architecture." width="80%">
</figure>

### General Workflow

The lifecycle of a Dedicated Network, from the preconditions that must be met before a request can be made, all the way through to establishing the Dedicated Network itself, its use, and then the dismantling of the service is shown below.

In the procedure flow below, each step is tagged with the actor that performs it: **ASP** (Application Service Provider, the media application side that invokes the API) or **CSP** (Communication Service Provider, the network operator side that fulfils the request). Coloured bands group the steps into the phases Pre-conditions, Before using the network, During operation, and Dismantling.

<div class="proc-wrapper">

  <div class="p-header" style="background-color: #7c52e4;">
    <div class="p-circle" style="color: #7c52e4;">0</div> Pre-conditions
  </div>

  <div class="p-entry">
    <div class="p-actors">
      <span class="p-pill p-pill-asp">ASP</span>
      <div class="p-plus-sign">+</div>
      <span class="p-pill p-pill-csp">CSP</span>
    </div>
    <div class="p-content">
      On-boarding of the ASP and Negotiation<br>
      - &nbsp;Sign up and access credentials<br>
      - &nbsp;Selection / Request for Network Profiles and Network Service Areas
    </div>
  </div>

  <div class="p-header" style="background-color: #f38d3c;">
    <div class="p-circle" style="color: #f38d3c;">1</div> Before using the network
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-m">1.0a. Discovery of available and eligible Network Profiles (optional)</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-m">1.0b. Discovery of available and eligible Network Service Areas (optional)</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">1.1. <u>Request</u> Reservation of Dedicated Network</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">1.2. Assessment of Dedicated Network reservation request and change of status</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">1.3. <u>Request</u> Device Access for the Dedicated Network</div>
  </div>

  <div class="p-header" style="background-color: #74b85c;">
    <div class="p-circle" style="color: #74b85c;">2</div> During operation
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">2.1. <u>Request</u> Device Access for the Dedicated Network</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">2.2. Dedicated Network is active and available</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content">2.3. Device establishes connection and makes use of the Dedicated Network</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">2.4. Usage of various API capabilities</div>
  </div>

  <div class="p-header" style="background-color: #cc0000;">
    <div class="p-circle" style="color: #cc0000;">3</div> Dismantling
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">3.1a. <u>Deletion</u> of Device Access and <u>Deletion</u> of Dedicated Network</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">3.1b. Or the CSP simply tears the Dedicated Network down</div>
  </div>

</div>

### Step 0: Pre-conditions

* The user (API invoker) must have registered (signed up) with the API provider.
* qosProfiles have already been defined and made available by the network operator. This is related to the [**QoS Profiles API**](../camara-qos-profiles).
* Dedicated Network Service Areas are created by the operator and made available. Each area is associated with one or more Network Profiles.
* Network Profiles set out the maximum number of devices that can be concurrently served within the area, as well as the aggregate UL and DL throughput that the network operator can offer.

### Step 1: Before using the network

#### 1.0a. Discovery of available and eligible Network Profiles

**GET /profiles** to obtain a list of dedicated network profiles with the corresponding **"id": "string"**.

The response below shows one network profile: note the `id` (used in later calls), the device cap (`maxNumberOfDevices`), the aggregate uplink/downlink throughput, and the QoS profiles it bundles.

```
[
  {
    "id": "string",
    "maxNumberOfDevices": 0,
    "aggregatedUlThroughput": {
      "value": 10,
      "unit": "bps"
    },
    "aggregatedDlThroughput": {
      "value": 10,
      "unit": "bps"
    },
    "qosProfiles": [
      "QCI_1_voice"
    ],
    "defaultQosProfile": "QCI_1_voice"
  }
]
```

**GET /qos-profiles/{name}**, using the [QoS Profiles API](../camara-qos-profiles), to obtain details of the already arranged QoS Profile.

An example of the QoS Profile, including status:

```
// Example values — replace with actual network requirements
[
  {
    "name": "voice",
    "description": "QoS profile for voice calls",
    "status": "ACTIVE",
    "targetMinUpstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxUpstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxUpstreamBurstRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "targetMinDownstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxDownstreamRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "maxDownstreamBurstRate": {
      "value": 128,
      "unit": "Kbps"
    },
    "minDuration": {
      "value": 60,
      "unit": "Seconds"
    },
    "maxDuration": {
      "value": 60,
      "unit": "Seconds"
    },
    "priority": 20,
    "packetDelayBudget": {
      "value": 100,
      "unit": "Milliseconds"
    },
    "jitter": {
      "value": 30,
      "unit": "Milliseconds"
    },
    "packetErrorLossRate": 3,
    "l4sQueueType": "non-l4s-queue",
    "serviceClass": "real_time_interactive"
  }
]
```

#### 1.0b. Discovery of available and eligible Network Service Areas

The ASP should create an object with the desired location by means of one of the following parameters:

```
{
  "atLocation": {
    "latitude": 50.735851,
    "longitude": 7.10066
  },
  "overlappingArea": {},
  "coveringArea": {},
  "byName": "string",
  "byNetworkProfileId": "string",
  "byQosProfileName": "QCI_1_voice"
}
```

**POST /retrieve-service-areas** passing this object as body.

This operation should return an **"id": "string"**, in this form:

```
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "area": {},
    "networkProfiles": [
      "string"
    ],
    "qosProfiles": [
      "QCI_1_voice"
    ]
  }
]
```

#### 1.1 Request for Dedicated Network reservation

**POST /networks** passing a `profileId`, `serviceTime`, `serviceArea`, among others, in the following form. Note that `profileId` here is the `id` returned by **GET /profiles** in step 1.0a:

```
{
  "profileId": "string",
  "serviceTime": {
    "start": "2025-11-05T14:14:35.390Z",
    "end": "2025-11-05T14:14:35.390Z"
  },
  "serviceArea": {},
  "sink": "https://endpoint.example.com/sink",
  "sinkCredential": {}
}
```

The response should contain a **"status": "REQUESTED"**.

#### 1.2 Assessment of Dedicated Network reservation and change of status

During this phase, **GET /networks** may be used to list the information on the dedicated networks and their status.

#### 1.3 Assignment of Device Access to the Dedicated Network

**POST /accesses** should be used to attach devices to a dedicated network. The body identifies the target network (`networkId`, the `id` returned by **POST /networks**), the device (by phone number, network access identifier or IP address), and the QoS profiles the device may use:

```
{
  "networkId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "device": {
    "phoneNumber": "+123456789",
    "networkAccessIdentifier": "123456789@domain.com",
    "ipv4Address": {
      "publicAddress": "84.125.93.10",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  },
  "qosProfiles": [
    "string"
  ],
  "defaultQosProfile": "string"
}
```

### Step 2: During operation

The step numbers here follow the procedure flow above.

#### 2.1 Request Device Access for the Dedicated Network

Device access requests can also be made during operation, not only in step 1.3, so that devices are attached to the Dedicated Network when they are needed. See step 2.4 for the endpoints used.

#### 2.2 Dedicated Network is active and available

**GET /networks** may be used to list the information on the dedicated networks and their status; the network is available for use once its status reflects activation.

#### 2.3 Device establishes connection

An assigned device connects to the network and starts using the reserved capabilities of the Dedicated Network.

#### 2.4 Usage of API capabilities

A series of operations to assign new devices and de-assign existing ones can be performed while the Dedicated Network is active via:

**POST /accesses** with the request body including the networkId received after invoking the Dedicated Network API (id), a device object, qosProfiles, this request will create a device access to a dedicated network with a given configuration. The response includes an id.

**DELETE /accesses/{accessId}** to delete a device access to the dedicated network.

### Step 3: Dismantling

When reaching the duration the Dedicated Network may be torn down. A graceful way of tearing down will delete device accesses and dedicated networks by `id`.

**DELETE /accesses/{accessId}** deletes a device access to the dedicated network

**DELETE /networks/{networkId}** deletes a dedicated network

## 5G-MAG's Self-Assessment

* The Profiles and Networks APIs are to be invoked before the actual usage of the network to ensure that the requested capabilities are "reserved" for the specific area and time window.
* During the event devices will have access to the Dedicated Network and should be allocated or de-allocated depending on the actual requirements.
* This API is certainly adequate for a simple use case of 1 device requesting connectivity (MoJo) or multiple devices taking part in a Media Production setup.
* One of the most interesting features in this API is the ability to define and create the network profile and later on attach/detach a device. This adds flexibility and avoids losing the dedicated resources when revoking a device.

Potential improvements:
- Possibility to extend/update the Dedicated Network (e.g. extending duration).

## Why this API suits multi-device productions

The Dedicated Networks API is the most complete fit for the [multi-device production scenario](./scenarios#multi-device-connectivity-outside-broadcast-small-scale-video-production-remote-production) because it separates three concerns that the QoS-session APIs conflate:

- **Area discovery** (`POST /retrieve-service-areas`) is distinct from reservation, so the ASP can find the operator-defined service area covering a venue before committing to a booking. This is the only CAMARA API that offers this separation.
- **Reservation** (`POST /networks`) books a Network Profile (a QoS profile plus a device cap and aggregate uplink/downlink throughput) for a service area and time window, independent of any specific device.
- **Device access** (`POST /accesses`, `DELETE /accesses/{accessId}`) attaches and detaches individual devices to the reserved network at any time during operation.

This decoupling is what enables the operational patterns a production needs: attaching cameras only when they come online, swapping in a back-up camera without losing the reservation, and the on-air / preview / standby prioritisation described in the [Workflows](./workflows#dynamic-prioritization-of-qos-for-different-media-flows) page (where a Network Profile is booked for the worst-case aggregate throughput, but only a subset of devices holds the high-quality profile at any instant). A single-device MoJo contribution is a degenerate case of the same model, with one Network Profile and one device access.

## Relationship to Network Profiles and QoS Profiles

A Network Profile bundles one or more QoS Profiles with a `maxNumberOfDevices` cap and `aggregatedUlThroughput` / `aggregatedDlThroughput` figures. The QoS Profile carries the per-flow targets (throughput, packet delay budget, jitter, packet error loss rate); the Network Profile adds the capacity dimension (how many devices, at what aggregate rate) that a multi-device booking needs. The `defaultQosProfile` on both the Network Profile and the device access sets the treatment a device receives unless it requests a different eligible profile. For the QoS Profile field semantics see [Using CAMARA APIs: QoS Profiles](./using-qos-profiles).

## How this maps to 3GPP

A Dedicated Network is realised in the 5G Core as reserved connectivity for a set of devices over an area and window. Depending on the operator's implementation this maps to a network slice (identified by an S-NSSAI) and/or a set of QoS Flows provisioned through policy. The reservation and device-access requests drive the Network Exposure Function (NEF) northbound APIs ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)); advance reservation of a future window uses background data transfer negotiation (`Nnef_BDTPNegotiation`, [TS 29.554](https://www.3gpp.org/dynareport/29554.htm)), and per-device QoS is authorised by the Policy Control Function (`Npcf_PolicyAuthorization`, [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)). Non-public network realisations (PNI-NPN via a slice, or a dedicated deployment) are defined in [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.30. See [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service).

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the specific realisation of a CAMARA Dedicated Network as an S-NSSAI-identified slice versus policy-provisioned QoS Flows, and the exact NEF/PCF operations invoked (`Nnef_BDTPNegotiation` in TS 29.554, `Npcf_PolicyAuthorization` in TS 29.514, NEF northbound in TS 29.522). Verify against the 3GPP work plan and the current CAMARA DedicatedNetworks specification before publication.
:::

## Related

* [Reference Scenarios](./scenarios): the multi-device production this API serves.
* [Workflows and Requirements](./workflows): the reservation, assignment and usage phases.
* [Using CAMARA APIs](./using-camara-apis): where Dedicated Networks sits among the alternatives.
* [Using CAMARA APIs: QoS Profiles](./using-qos-profiles): the profile fields a Network Profile bundles.
* [Dedicated Networks API](../camara-dedicated-networks): the API reference and CAMARA source.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
