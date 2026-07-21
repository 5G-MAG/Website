---
title: QoS Booking
sidebar_position: 5
hide_title: true
description: Analyses the CAMARA QoS Booking API, which reserves a QoS profile for a known device and server ahead of use.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Connectivity Quality with Network APIs</span>
<h1>QoS Booking</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Using CAMARA APIs: QoS Booking for Content Production & Contribution

Find more information about [**QoS Booking API**](../camara-qos-booking).

## Purpose

This API lets a media application reserve a QoS Profile for a specific device, for a given period of time and service area.

:::note[How this differs from QoS Booking and Assignment]
This API ties the booking to a device (and application server) at creation time, so it suits a setup where the exact device is known in advance, such as a single contribution feed. If you need to book resources for a number of devices and attach or detach specific devices later, use the [QoS Booking and Assignment](./using-qos-booking-assignment) API instead.
:::

## Workflow and Architecture

This is a high-level figure with the entities involving APIs and the devices involved:

:::note[Diagram forthcoming]
An architecture diagram showing the media application (ASP) invoking the Network API Platform to create a device-bound QoS booking will be added here.
:::

### General Workflow

In the procedure flow below, each step is tagged with the actor that performs it: **ASP** (Application Service Provider, the media application side) or **CSP** (Communication Service Provider, the network operator side). Coloured bands group the steps into the phases Pre-conditions, Before using the network, During operation, and Dismantling.

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

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">1.1. <u>Request</u> of <u>Creation</u> of QoS Booking</div>
  </div>

  <div class="p-header" style="background-color: #74b85c;">
    <div class="p-circle" style="color: #74b85c;">2</div> During operation
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content">2.1. Device establishes connection and uses the QoS Booking</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">2.2. Usage of API capabilities</div>
  </div>

  <div class="p-header" style="background-color: #cc0000;">
    <div class="p-circle" style="color: #cc0000;">3</div> Dismantling
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">3.1a. <u>Deletion</u> of QoS Booking</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">3.1b. Or the CSP simply tears the QoS Booking down</div>
  </div>

</div>

### Step 0: Pre-conditions

- The API invoker needs to have signed up with the API provider.
- qosProfiles have already been defined and made available by the network operator.
- Names of such qosProfiles have been disclosed to the user so they can be used when invoking APIs.

### Step 1: Before using the network

Details of the already arranged QoS Profile can be retrieved with **GET /qos-profiles/{name}**, using the [QoS Profiles API](../camara-qos-profiles).

#### 1.1 Requests creation of QoS Booking

With **POST /device-qos-bookings** passing the `qosProfile`, `applicationServer`, `applicationServerPorts`, `device` object, `devicePorts`, `startTime`, `duration`, `serviceArea`.

### Step 2: During operation

#### 2.1 Device establishes connection

The booked device connects to the network within the reserved service area and time window and starts using the QoS Booking.

#### 2.2 Usage of API capabilities

A series of operations to delete the QoS session or extending its duration are available:

**POST /retrieve-device-qos-bookings** - Retrieve device QoS Bookings

**GET /device-qos-bookings/{bookingId}** - Obtain device QoS Booking details

### Step 3: Dismantling

When reaching the duration the QoS Booking may be torn down. A graceful way of tearing down will delete the QoS Booking by `id`.

**DELETE /device-qos-bookings/{bookingId}** deletes the QoS Booking

---

## 5G-MAG's Self-Assessment

- The QoS Booking APIs can be invoked before the actual usage of the network starts to ensure that the requested capabilities are "reserved" for the specific area, time window and device.
- During the event a device will have access to the QoS Booking.
- This API may be suitable for a setup where a single device requires access to network resources (e.g. MoJo), but it is impractical for a media production setup with multiple devices, since not all of them may be running at the same time: making a separate QoS booking for each device when they do not all need network resources concurrently can result in inefficiencies.

Potential improvements:

- It is unclear how to associate devices to make use of the resources. As it stands, the device is granted the booking as soon as connected to the network under the service area and for the specified duration.
- It is unclear how to update the booking. In the event that a device would need to be exchanged, deleting and creating a new booking may lead to losing the ability to reserve resources during operation.

## When to use this API

This API fits a setup where the device and the application server are both known when the booking is made, and are not expected to change: a single contribution feed such as a MoJo uplink from one smartphone or one bonding SIM to a known ingest server. The booking carries everything needed to describe the flow (`qosProfile`, `applicationServer`, `applicationServerPorts`, `device`, `devicePorts`, `startTime`, `duration`, `serviceArea`), so no separate assignment step is required; the reserved treatment applies as soon as the booked device connects within the area and window.

Because the booking is bound to a device at creation, it does not suit productions where devices are interchangeable or may fail and be replaced. Swapping a device means deleting the booking and creating a new one, with no guarantee the resources remain available in between. For those cases use the [QoS Booking and Assignment](./using-qos-booking-assignment) API (which reserves for a device count and assigns devices later) or [Dedicated Networks](./using-dedicated-networks) (which adds area discovery). The trade-off is summarised in the comparison table on the [QoS Booking and Assignment](./using-qos-booking-assignment#contrast-with-the-device-bound-qos-booking-api) page.

## Application server and flow granularity

Unlike QoS Booking and Assignment, this API carries the application server endpoint and ports. That matters for media contribution because a single device may run several flows to different endpoints (for example uplink video to one ingest server and return video from another). Each such flow needs its own QoS treatment, so a device with multiple flows implies multiple bookings, one per flow, each with its own `applicationServer` / ports. See [Details on the Application Server](../network-api-initiatives#details-on-the-application-server).

## How this maps to 3GPP

A device-bound QoS booking is realised, once the booked device connects, as a QoS Flow on that device's PDU session matched to the specified application-server and device ports. The request drives the Network Exposure Function (NEF) northbound APIs ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)), typically `Nnef_AFSessionWithQoS`; advance reservation of a future window uses background data transfer negotiation (`Nnef_BDTPNegotiation`, [TS 29.554](https://www.3gpp.org/dynareport/29554.htm)); the QoS is authorised by the Policy Control Function (`Npcf_PolicyAuthorization`, [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)). The referenced QoS profile maps to a 5QI whose characteristics are tabulated in [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.7.4. See [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact NEF/PCF operations a device-bound QoS booking maps to (`Nnef_AFSessionWithQoS` / `Nnef_BDTPNegotiation` in TS 29.522 / TS 29.554, `Npcf_PolicyAuthorization` in TS 29.514). Verify against the 3GPP work plan and the current CAMARA QoSBooking specification before publication.
:::

## Related

- [Using CAMARA APIs: QoS Booking and Assignment](./using-qos-booking-assignment): the assignment-decoupled counterpart, with a side-by-side comparison.
- [Using CAMARA APIs: Quality on Demand](./using-quality-on-demand): the point-of-use alternative with no advance reservation.
- [Workflows and Requirements](./workflows): the reservation phase this API covers.
- [Using CAMARA APIs](./using-camara-apis): where this API sits among the alternatives.
- [QoS Booking API](../camara-qos-booking): the API reference and CAMARA source.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
