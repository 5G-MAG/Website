---
title: QoS Booking and Assignment
sidebar_position: 6
---


:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Using CAMARA APIs: QoS Booking and Assignment for Content Production & Contribution

Find more information about [**QoS Booking and Assignment API**](../camara-qos-booking-assignment).

## Purpose

A media application can reserve a QoS Profile for a given period of time and service area, then assign it to devices as they become available.

:::note[How this differs from QoS Booking]
This API separates the booking of resources from the device assignment: you create a booking for a number of devices first, then attach or detach specific devices to it later. This adds flexibility when the exact devices are not known at booking time or may change during operation. The plain [QoS Booking](./using-qos-booking) API instead ties the booking to a device (and application server) at creation time. See that page for the contrast.
:::

## Workflow and Architecture

This is a high-level figure with the entities involving APIs and the devices involved:

<figure>
  <img src="./images/figure_qosbookingassignment.png" width="80%" alt="High-level architecture for QoS Booking and Assignment, showing the media application (ASP) invoking the Network API Platform to create a booking and assign devices." />
  <figcaption>Entities and interactions for QoS Booking and Assignment.</figcaption>
</figure>

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
    <div class="p-content-m">1.0. Discovery of available and eligible QoS Profiles (optional)</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">1.1. <u>Request</u> of <u>Creation</u> of QoS Booking</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">1.2. Assessment of QoS Booking reservation and change of status</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-asp">ASP</span></div>
    <div class="p-content-a">1.3. <u>Request</u> of Device <u>Assignment</u> for the QoS Booking</div>
  </div>

  <div class="p-header" style="background-color: #74b85c;">
    <div class="p-circle" style="color: #74b85c;">2</div> During operation
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">2.1. QoS Booking is activated</div>
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
    <div class="p-content-a">3.1a. <u>Release</u> of Device Assignment and <u>Deletion</u> of QoS Booking</div>
  </div>

  <div class="p-entry">
    <div class="p-actors"><span class="p-pill p-pill-csp">CSP</span></div>
    <div class="p-content">3.1b. Or the CSP simply tears the QoS Booking down</div>
  </div>

</div>

### Step 0: Pre-conditions
* The API invoker needs to have signed up with the API provider.
* qosProfiles have already been defined and made available by the network operator.
* Names of such qosProfiles have been disclosed to the user so they can be used when invoking APIs.

### Step 1: Before using the network
The step numbers here follow the procedure flow above.

Details of the already arranged QoS Profile can be retrieved with **GET /qos-profiles/{name}**, using the [QoS Profiles API](../camara-qos-profiles).

#### 1.1 Requests creation of QoS Booking for a given number of devices

With **POST /qos-bookings** passing the `numDevices`, `qosProfile`, `startTime`, `duration`, `serviceArea`.

#### 1.3 Assign the QoS Booking to a specific Device

**POST /qos-bookings/{bookingId}/devices/assign** passing the BookingId from the previous step and a `device` object to assign the QoS Booking to a specific device.

### Step 2: During operation

#### 2.1 QoS Booking is activated

The booking becomes active for the assigned devices over the reserved area and time window.

#### 2.2 Device establishes connection

An assigned device connects to the network and starts using the reserved resources.

#### 2.3 Usage of API capabilities

A series of operations to manage assignments and delete the QoS Booking are available at runtime; the full endpoint list is given in the reference below.

### Endpoint reference

#### QoS Booking and Assignment - QoS Booking API
  * **POST /qos-bookings** with a request body containing `numDevices`, `qosProfile`, `startTime`, `duration`, `serviceArea`, it triggers a new booking in advance and assign this reserved booking profile to one or more devices when the devices are ready. The response includes a `bookingId`.
    * Dependency: Requires `qosProfile` which can be retrieved from a previous call to the [**QoS Profiles API**](../camara-qos-profiles).
  * **GET /qos-bookings/{bookingId}** - gets booking information for the given bookingId
  * **DELETE /qos-bookings/{bookingId}** - Cancel an existing booking and release resources related to that booking.

#### QoS Booking and Assignment - Device Assignment API
  * **POST /qos-bookings/{bookingId}/devices/assign** with a request body containing `device` object, allows the end user to assign one or more devices to the existing QoS Booking.
  * **GET /qos-bookings/{bookingId}/devices** - allows the end user to retrieve the list of devices assigned to the existing QoS Booking.
  * **POST /qos-bookings/{bookingId}/devices/release** with a request body containing `device` object - Release one or more already assigned devices. This is a synchronous call.
  * **POST /qos-bookings/retrieve** with a request body containing `device` object - Querying for QoS Booking resource information details for a device. Returns the QoS booking information for a given device. A device may have multiple bookings (for several times and locations), thus the response is an array

### Step 3: Dismantling

When reaching the duration the QoS Booking may be torn down. A graceful way of tearing down will delete the QoS Booking by `id`.

**DELETE /qos-bookings/{bookingId}** deletes the QoS Booking

---

## 5G-MAG's Self-Assessment
* QoS Booking can be invoked before the actual usage of the network starts to ensure that the requested capabilities are "reserved" for the specific area, time window and a given number of devices.
* Before or during the event a device will be assigned access to the QoS booking.

Potential improvements:
- Unlike other similar APIs there is no information about the application server. It is unclear what would be the endpoint to which throughput, jitter, latency and other parameters would apply.
- The procedure is very similar to Dedicated Networks. There seems to be redundancy with QoS Booking
- This API's internal name, "QoS Booking", is easily confused with the separate, similarly-named [QoS Booking API](./using-qos-booking).

## When to use this API

This API is the right choice when resources must be reserved before the exact devices are known, or when devices may change during operation. That describes most planned multi-device productions:

- A crew books capacity for N cameras for a venue and a time window (`POST /qos-bookings` with `numDevices`), before knowing which physical units will be deployed.
- On site, each camera's SIM is attached to the booking (`POST /qos-bookings/{bookingId}/devices/assign`) as it comes online.
- If a camera fails, its device is released (`POST /qos-bookings/{bookingId}/devices/release`) and a back-up is assigned, all against the same booking, so the reservation is never lost.
- The on-air / preview / standby prioritisation in the [Workflows](./workflows#dynamic-prioritization-of-qos-for-different-media-flows) page is realised by assigning and releasing devices across bookings that carry different QoS profiles, without re-reserving.

For a single, known contribution feed where the device and application server are fixed at booking time, the device-bound [QoS Booking](./using-qos-booking) API is simpler; for a full venue deployment with area discovery, [Dedicated Networks](./using-dedicated-networks) is more complete. This API sits between the two.

## Contrast with the device-bound QoS Booking API

The overlap between this API and the [QoS Booking](./using-qos-booking) API is real and is noted in the self-assessment above. The essential difference is the point at which a device is bound:

| | QoS Booking | QoS Booking and Assignment |
| --- | --- | --- |
| Device bound at | creation (`POST /device-qos-bookings`) | assignment, after creation (`POST /qos-bookings/{id}/devices/assign`) |
| Application server in request | yes (`applicationServer`, ports) | no (a noted gap) |
| Device swap | delete and re-create the booking | release and assign against the same booking |
| Suits | one known feed | a set of devices, some interchangeable |

## How this maps to 3GPP

A QoS booking reserves per-device QoS treatment that, on assignment and connection, is realised as a QoS Flow on the device's PDU session. The reservation and assignment requests drive the Network Exposure Function (NEF) northbound APIs ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)); advance reservation of a future window uses background data transfer negotiation (`Nnef_BDTPNegotiation`, [TS 29.554](https://www.3gpp.org/dynareport/29554.htm)), and the per-device QoS is authorised by the Policy Control Function (`Npcf_PolicyAuthorization`, [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)). The QoS profile referenced maps to a 5QI whose characteristics are tabulated in [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.7.4. See [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service).

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact NEF/PCF operations a QoS booking maps to (`Nnef_BDTPNegotiation` in TS 29.554, `Npcf_PolicyAuthorization` in TS 29.514, NEF northbound in TS 29.522). Verify against the 3GPP work plan and the current CAMARA QoSBooking specification before publication.
:::

## Related

* [Using CAMARA APIs: QoS Booking](./using-qos-booking): the device-bound counterpart.
* [Using Dedicated Networks](./using-dedicated-networks): the more complete reservation/assignment alternative.
* [Workflows and Requirements](./workflows): the reservation and assignment phases this API covers.
* [Using CAMARA APIs](./using-camara-apis): where this API sits among the alternatives.
* [QoS Booking and Assignment API](../camara-qos-booking-assignment): the API reference and CAMARA source.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
