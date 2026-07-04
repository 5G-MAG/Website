---
title: CAMARA QoS Booking and Assignment
sidebar_position: 6
hide_title: true
description: Describes the CAMARA QoS Booking and Assignment API, which books capacity for a device count, then assigns devices to it.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>CAMARA QoS Booking and Assignment</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## CAMARA: QoS Booking and Assignment API

## Description

Application developers and service providers use the "QoS Booking and Assignment" API to reserve specific network conditions in advance for one or more devices. These conditions are based on a defined Quality of Service (QoS) profile, and also include parameters such as location, start time, and duration.

Once a booking is confirmed, devices can be assigned to it. Assigned devices then get predictable and consistent network performance, without end users needing to understand the complexities of the underlying network (e.g., 4G/5G infrastructure).

**How this differs from QoS Booking:** this API books capacity for a number of devices (`numDevices`) first, then lets you assign and release individual devices afterwards via the Device Assignment operations. The related [QoS Booking API](./camara-qos-booking) instead books directly for specific devices supplied at booking time. Use this API when the devices that will join are not all known up front.

Information: [https://camaraproject.org/qos-booking-and-assignment/](https://camaraproject.org/qos-booking-and-assignment/) and [https://github.com/camaraproject/QoSBooking](https://github.com/camaraproject/QoSBooking)

The API definitions can be obtained here: [https://github.com/camaraproject/QoSBooking/tree/main/code/API_definitions](https://github.com/camaraproject/QoSBooking/tree/main/code/API_definitions)

The QoS Booking and Assignment API definition (YAML) is available at: [https://github.com/camaraproject/QoSBooking/blob/main/code/API_definitions/qos-booking-and-assignment.yaml](https://github.com/camaraproject/QoSBooking/blob/main/code/API_definitions/qos-booking-and-assignment.yaml)

## Operations and dependencies
### QoS Booking and Assignment - QoS Booking API
  * **POST /qos-bookings** with a request body containing `numDevices`, `qosProfile`, `startTime`, `duration`, `serviceArea`, it triggers a new booking in advance and assign this reserved booking profile to one or more devices when the devices are ready. The response includes a `bookingId`.
    * Dependency: Requires `qosProfile` which can be retrieved from a previous call to the [**QoS Profiles API**](./camara-qos-profiles).
  * **GET /qos-bookings/{bookingId}** - gets booking information for the given bookingId
  * **DELETE /qos-bookings/{bookingId}** - Cancel an existing booking and release resources related to that booking.

### QoS Booking and Assignment - Device Assignment API
  * **POST /qos-bookings/{bookingId}/devices/assign** with a request body containing `device` object, allows the end user to assign one or more devices to the existing QoS Booking.
  * **GET /qos-bookings/{bookingId}/devices** - allows the end user to retrieve the list of devices assigned to the existing QoS Booking.
  * **POST /qos-bookings/{bookingId}/devices/release** with a request body containing `device` object - Release one or more already assigned devices. This is a synchronous call.
  * **POST /qos-bookings/retrieve** with a request body containing `device` object - Querying for QoS Booking resource information details for a device. Returns the QoS booking information for a given device. A device may have multiple bookings (for several times and locations), thus the response is an array

## Standardisation context

QoS Booking and Assignment is part of the CAMARA QoSBooking repository (OpenAPI 3.0.3, Commonalities-conformant) and belongs to the QoS family that consumes a named profile from the [QoS Profiles API](./camara-qos-profiles). It shares the QoS-family mapping: when a booking becomes active the underlying request is the same NEF `AsSessionWithQoS` operation ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) that drives `Npcf_PolicyAuthorization` on the PCF ([TS 29.514](https://www.3gpp.org/dynareport/29514.htm)) that [Quality on Demand](./camara-quality-on-demand) uses. What is distinctive here is the two-phase model, which lives entirely in the CAMARA layer and has no direct 3GPP counterpart: capacity is reserved for a device count, then individual devices are attached and detached against that reservation.

### Two resources: booking and assignment

The API separates the reservation from the membership:

* **Booking** (`POST /qos-bookings`): reserves capacity for `numDevices` under a `qosProfile`, for a `serviceArea`, `startTime` and `duration`. The response carries a `bookingId`, `totalDevices` and `remainingDevices`, and a `status` / `statusInfo`.
* **Assignment** (`POST /qos-bookings/{bookingId}/devices/assign` and `.../release`): attaches or detaches specific devices against the booking. `remainingDevices` tracks the free slots, so the consumer can manage a pool over the booking window.

This fits productions where capacity must be secured ahead of time but the exact devices are only known later (for example accredited crew arriving on site). The related [QoS Booking API](./camara-qos-booking) instead binds specific devices at booking time; choose that when the devices are known up front. Both differ from Quality on Demand, which has no reservation phase and only discovers availability at request time.

Because booking and assignment are separate resources, they have separate statuses, and the interaction between them (for example whether a device may be assigned before the booking's `startTime`) should be confirmed against the API definition. Status changes on either resource are delivered asynchronously as CloudEvents; see Event notifications below.

---

## Workflow: Media application booking and assigning QoS

A user of a media application wants to reserve QoS capacity for an event, then attach devices as they join. The following steps are executed:

### Step 0: Pre-conditions
* The API invoker has signed up with the API provider.
* A `qosProfile` name has been obtained via the [QoS Profiles API](./camara-qos-profiles).

### Step 1: Create the booking
* **POST /qos-bookings** passing `numDevices`, `qosProfile`, `serviceArea`, `startTime` and `duration`. The response returns a `bookingId`.

### Step 2: Assign devices to the booking
* **POST /qos-bookings/{bookingId}/devices/assign** passing the device object(s) to attach to the booking. Devices can later be released with **POST /qos-bookings/{bookingId}/devices/release**.

---

## QoS Booking and Assignment API Usage

### Request booking of QoS
With **POST /qos-bookings**. The request reserves capacity for a device count, a QoS profile, a service area and a time window:

```
{
  "numDevices": 15,
  "qosProfile": "QOS_MEDIA_BROADCAST",
  "startTime": "2025-10-27T15:00:00.000Z",
  "duration": 3600,
  "serviceArea": {
    "areaType": "CIRCLE",
    "center": {
      "latitude": 37.735851,
      "longitude": -127.10066
    },
    "radius": 100
  },
  "sink": "https://application-server.com/notifications",
  "sinkCredential": {
    "credentialType": "ACCESSTOKEN",
    "accessToken": "<access_token>",
    "accessTokenExpiresUtc": "2025-12-31T23:59:59Z",
    "accessTokenType": "bearer"
  }
}
```

Type of response: A **bookingId**, plus the reserved and remaining device counts and the booking status:

```
{
  "bookingId": "8e2f6f30-0a1c-4c6b-92e1-1bd05aef1c58",
  "totalDevices": 15,
  "remainingDevices": 15,
  "qosProfile": "QOS_MEDIA_BROADCAST",
  "startTime": "2025-10-27T15:00:00.000Z",
  "duration": 3600,
  "serviceArea": {
    "areaType": "CIRCLE",
    "center": {
      "latitude": 37.735851,
      "longitude": -127.10066
    },
    "radius": 100
  },
  "status": "SUCCESSFUL",
  "statusInfo": "BOOKING_ACCEPTED"
}
```

### Assign a device
With **POST /qos-bookings/{bookingId}/devices/assign**, and device parameters. The request lists the devices to attach (each identified by any one of phone number, network access identifier, or IP address) and a `sink` for assignment notifications:

```
{
  "devices": [
    {
      "phoneNumber": "+14145550101"
    },
    {
      "networkAccessIdentifier": "123456789@domain.com"
    },
    {
      "ipv4Address": {
        "publicAddress": "203.0.113.0",
        "publicPort": 59765
      }
    },
    {
      "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
    }
  ],
  "sink": "https://application-server.com/notifications",
  "sinkCredential": {
    "credentialType": "ACCESSTOKEN",
    "accessToken": "<access_token>",
    "accessTokenExpiresUtc": "2025-12-31T23:59:59Z",
    "accessTokenType": "bearer"
  }
}
```

---

## 5G-MAG's Self-Assessment

This section records 5G-MAG's practical reading of the API and the open points it raises for media use.

- Separating booking from assignment fits events where capacity must be reserved ahead of time but the exact devices are only known later (for example accredited crew arriving on site).
- Because assignment and release are explicit per-device operations, the consumer can manage a pool of `numDevices` slots over the booking window. The `remainingDevices` field in the response indicates how many slots are still free.
- Open question: how booking status and per-device assignment status interact (for example whether a device can be assigned before the booking's `startTime`) should be confirmed against the API definition.

---

## Event notifications

The QoS Booking and Assignment API can notify the API consumer asynchronously when the status of a booking or of a device assignment changes, rather than requiring the consumer to poll for updates.

### Mechanism

Notifications are delivered to the callback URL supplied as the `sink` parameter in the relevant request (for example **POST /qos-bookings** for booking events, and **POST /qos-bookings/{bookingId}/devices/assign** for assignment events, as shown above). Where present, `sinkCredential` describes the credential the API provider uses to authenticate against that endpoint. The consumer's `sink` must accept HTTP POST requests carrying the notification payload.

The payload follows the [CloudEvents](https://cloudevents.io/) 1.0 specification (JSON format).

### Event types

| Event type | Meaning |
| --- | --- |
| `org.camaraproject.qos-booking-and-assignment.v0.status-changed` | The status of a QoS booking changed. |
| `org.camaraproject.qos-booking-and-assignment.v0.assignment-status-changed` | The status of a device assignment changed. |

The `data` object carries a `status` field whose documented values are `PENDING`, `SUCCESSFUL`, `PARTIAL_SUCCESS` and `FAILURE`, together with `statusInfo` giving further detail. Booking events include the booking details (such as `bookingId`, `qosProfile`, `totalDevices` and `remainingDevices`); assignment events include the affected device details.

### Example notification payload

The CAMARA definition specifies the notification structure but does not provide a fully populated example. The following is an illustrative booking status-changed CloudEvent built from that structure:

```
{
  "id": "83a0d986-0866-4f38-b8c0-fc65bfcda452",
  "source": "https://api.example.com/qos-booking-and-assignment/v0/qos-bookings/8e2f6f30-0a1c-4c6b-92e1-1bd05aef1c58",
  "specversion": "1.0",
  "type": "org.camaraproject.qos-booking-and-assignment.v0.status-changed",
  "time": "2025-10-27T15:00:00.000Z",
  "data": {
    "bookingId": "8e2f6f30-0a1c-4c6b-92e1-1bd05aef1c58",
    "status": "SUCCESSFUL",
    "statusInfo": "BOOKING_ACCEPTED"
  }
}
```

:::note
The event types and `status` values above are taken from the CAMARA QoS Booking and Assignment API definition; note the `v0` segment in the event type, indicating the API is at an early version. The example payload is illustrative (the spec does not ship a populated example) and the `data` field contents in particular should be confirmed against the [`qos-booking-and-assignment.yaml`](https://github.com/camaraproject/QoSBooking/blob/main/code/API_definitions/qos-booking-and-assignment.yaml) for the version you are integrating against.
:::
