---
title: Quality on Demand
sidebar_position: 4
hide_title: true
description: Analyses the CAMARA Quality on Demand API, which creates a point-of-use QoS session for a device with no advance reservation.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>Quality on Demand</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Using CAMARA APIs: Quality on Demand for Content Production & Contribution

Find more information about [**Quality on Demand API**](../camara-quality-on-demand).

## Purpose

This API lets a media application request a QoS session for the connection between a device and an application server.

## Workflow and Architecture

This is a high-level figure with the entities involving APIs and the devices involved:

<figure>
  <img loading="lazy" src="/img/tech/network-apis/content-production/figure_qualityondemand.png" width="80%" alt="High-level architecture for Quality on Demand, showing the media application (ASP) invoking the Network API Platform to create a QoS session between a device and an application server." />
  <figcaption>Entities and interactions for Quality on Demand.</figcaption>
</figure>

### General Workflow

In the procedure flow below, each step is tagged with the actor that performs it: **ASP** (Application Service Provider, the media application side) or **CSP** (Communication Service Provider, the network operator side). Coloured bands group the steps into the phases Pre-conditions, Before using the network, During operation, and Dismantling.

:::note
Quality on Demand has no separate reservation phase. Unlike the booking-based APIs, the QoS session is created at the point of use (see step 2.1 under "During operation"), at the device's current location; resources cannot be reserved in advance for a future time or area.
:::

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
      - &nbsp;Selection / Request for QoS Profiles
    </div>
  </div>

  <div class="p-header" style="background-color: #f38d3c;">
    <div class="p-circle" style="color: #f38d3c;">1</div> Before using the network
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-m">1.0a. Discovery of available and eligible QoS Profiles (optional)</div>
  </div>

  <div class="p-header" style="background-color: #74b85c;">
    <div class="p-circle" style="color: #74b85c;">2</div> During operation
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">2.1. <u>Request</u> Creation of QoS Session</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content">2.2. Device establishes connection</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">2.3. Usage of API capabilities</div>
  </div>

  <div class="p-header" style="background-color: #cc0000;">
    <div class="p-circle" style="color: #cc0000;">3</div> Dismantling
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">3.1a. <u>Deletion</u> of QoS Session</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">3.1b. Or the CSP simply tears the QoS session down</div>
  </div>

</div>

### Step 0: Pre-conditions
* The API invoker needs to have signed up with the API provider.
* qosProfiles have already been defined and made available by the network operator.
* Names of such qosProfiles have been disclosed to the user so they can be used when invoking APIs.

### Step 1: Before using the network
Details of the already arranged QoS Profile can be retrieved with **GET /qos-profiles/{name}**, using the [QoS Profiles API](../camara-qos-profiles). For the profile structure and an explanation of the fields, see [Using CAMARA APIs: QoS Profiles](./using-qos-profiles).

### Step 2: During operation

#### 2.1 Requests creation of QoS session

With **POST /sessions** passing the `device` object, `applicationServer` IP, `applicationServerPorts`, `devicePorts`, `qosProfile` and `duration`.

#### 2.2 Device establishes connection

#### 2.3 Usage of API capabilities

A series of operations to delete the QoS session or extending its duration are available:

**GET /sessions/{sessionId}** - Get QoS session information

**DELETE /sessions/{sessionId}** - Delete a QoS session

**POST /sessions/{sessionId}/extend** - Extend the duration of an active session

**POST /retrieve-sessions** - Get QoS session information for a device

### Step 3: Dismantling

When reaching the duration the QoS session may be torn down. A graceful way of tearing down will delete the QoS session by `id`.

**DELETE /sessions/{sessionId}** deletes a QoS session

---

## 5G-MAG's Self-Assessment
* A session may be created by establishing a level of QoS between the device and the application server for a given duration.
* It is assumed that the QoD API is invoked with the complete knowledge of device, application server, and at the given location.
* No information is given to the user on the availability of resources in an area.
* It is not possible to ensure availability of the QoS session before invoking it at the location, since a service area cannot be defined or requested in advance: whether the request succeeds remains unclear until then.
* On device failure, the QoS session needs to be deleted with no guarantee that a new one can be created.

Potential improvements:
- There is no information about the location or service area.
- Understanding opportunities to book QoS sessions in terms of duration and location/area would be useful as the user may be able to move and find a better coverage spot rather than being denied the establishment of QoS at the time and location in which it is requested.

## When to use this API

Quality on Demand is the point-of-use API: it creates a QoS session at the device's current location, for a device and application server both known at request time, with no advance reservation and no service-area parameter. That makes it the natural fit for short-notice single-device contribution (a journalist arriving at a breaking-news location and starting an uplink there and then), and the counterpart to it, for a device with no fixed session end, is the indefinite [QoS Provisioning](../camara-qos-provisioning) API.

Because there is no reservation phase, availability is discovered only when `POST /sessions` is attempted. If the network cannot honour the request at that location, the session is refused; the API gives no prior indication and no alternative area. For a planned event where success needs to be assured ahead of time, an advance, area-scoped reservation API is more appropriate: [QoS Booking](./using-qos-booking) (device-bound), [QoS Booking and Assignment](./using-qos-booking-assignment) (device count, assign later) or [Dedicated Networks](./using-dedicated-networks) (with area discovery). The trade-off between point-of-use and advance reservation is set out on the [Using CAMARA APIs](./using-camara-apis#choosing-an-api-for-a-production-scenario) page.

## Session lifecycle

A Quality on Demand session has a simple lifecycle that maps onto the "During operation" phase only:

- **Create** with `POST /sessions`, passing the `device`, `applicationServer`, `applicationServerPorts`, `devicePorts`, `qosProfile` and `duration`.
- **Inspect** with `GET /sessions/{sessionId}`, or find sessions for a device with `POST /retrieve-sessions`.
- **Extend** an active session with `POST /sessions/{sessionId}/extend`, which avoids the gap that deleting and re-creating would introduce.
- **Delete** with `DELETE /sessions/{sessionId}`, or let the operator tear the session down when the `duration` expires.

The ability to extend a session is a useful feature that the booking APIs do not all offer: an overrunning contribution can keep its QoS without a re-request.

## How this maps to 3GPP

Creating a QoS session drives the Network Exposure Function (NEF) northbound `Nnef_AFSessionWithQoS` operation ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)); the NEF requests the Policy Control Function to authorise and install the corresponding QoS Flow on the device's PDU session (`Npcf_PolicyAuthorization`, [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)). Because the session is created at the point of use, no background data transfer negotiation is involved, unlike the advance-reservation APIs. The referenced QoS profile maps to a 5QI whose characteristics are tabulated in [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.7.4. See [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the mapping of a Quality on Demand session to `Nnef_AFSessionWithQoS` (TS 29.522) and `Npcf_PolicyAuthorization` (TS 29.514). Verify against the 3GPP work plan and the current CAMARA QualityOnDemand specification before publication.
:::

## Related

* [Using CAMARA APIs: QoS Booking](./using-qos-booking): the device-bound advance-reservation alternative.
* [Using CAMARA APIs: QoS Booking and Assignment](./using-qos-booking-assignment): reserve for a device count, assign later.
* [Using Dedicated Networks](./using-dedicated-networks): advance reservation with area discovery.
* [Using CAMARA APIs](./using-camara-apis): where Quality on Demand sits among the alternatives.
* [Quality on Demand API](../camara-quality-on-demand): the API reference and CAMARA source.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
