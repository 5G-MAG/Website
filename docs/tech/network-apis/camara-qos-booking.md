---
title: CAMARA QoS Booking
sidebar_position: 5
hide_title: true
description: Describes the CAMARA QoS Booking API, which reserves a QoS profile in advance for specific devices known at booking time.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Connectivity Quality with Network APIs</span>
<h1>CAMARA QoS Booking</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## CAMARA: QoS Booking API

## Description

Developers and other capabilities consumers use the "QoS Booking" (Quality of Service Booking) API to request specific network conditions from telco networks in advance, without needing in-depth knowledge of the underlying network complexity (e.g. the 4G/5G system in the case of a mobile network).

**How this differs from QoS Booking and Assignment:** this API books a QoS profile for a set of devices supplied at booking time (each booking targets specific devices). The related [QoS Booking and Assignment API](./camara-qos-booking-assignment) instead books for a device count and lets you assign and release individual devices to the booking afterwards. Use QoS Booking when the devices are known up front; use Booking and Assignment when devices join later.

Information: [QoS Booking project page](https://camaraproject.org/qos-booking/) and [GitHub repository](https://github.com/camaraproject/QoSBooking)

The API definitions can be obtained here: [QoSBooking API_definitions folder](https://github.com/camaraproject/QoSBooking/tree/main/code/API_definitions)

The QoS Booking API definition (YAML) is available at: [qos-booking.yaml](https://github.com/camaraproject/QoSBooking/blob/main/code/API_definitions/qos-booking.yaml)

## Operations and dependencies

### QoS Booking API

- **POST /device-qos-bookings** with a request body containing `qosProfile`, `applicationServer`, `applicationServerPorts`, `device` object, `devicePorts`, `startTime`, `duration`, `serviceArea`, it creates a time-bounded booking of a QoS profile for the specified devices. The response includes a `bookingId`.
  - Dependency: Requires `qosProfile` which can be retrieved from a previous call to the [**QoS Profiles API**](./camara-qos-profiles).
- **GET /device-qos-bookings/{bookingId}** - Get QoS Booking information.
- **DELETE /device-qos-bookings/{bookingId}** - Deletes a QoS Booking.
- **POST /retrieve-device-qos-bookings** with a request body containing a `device` object, queries for QoS Booking resource information details for a device.

## Standardisation context

QoS Booking is part of the CAMARA QoSBooking repository (OpenAPI 3.0.3, Commonalities-conformant) and belongs to the QoS family that consumes a named profile from the [QoS Profiles API](./camara-qos-profiles). Like the other QoS APIs, an active booking is realised, inside the 5G Core, through the NEF `AsSessionWithQoS` operation ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) driving `Npcf_PolicyAuthorization` on the PCF ([TS 29.514](https://www.3gpp.org/dynareport/29514.htm)). The addition on top of Quality on Demand is the advance reservation: a booking is created ahead of time (`startTime`, `duration`, `serviceArea`) so that resources are held for a scheduled event rather than requested at the moment of use.

### Device-bound bookings

This API binds the reservation to specific devices supplied at booking time. `POST /device-qos-bookings` takes a `device` object (or objects), the `qosProfile`, the `applicationServer` and `applicationServerPorts` / `devicePorts` that scope the flow, and the booking window, and returns a `bookingId` with a `bookingStatus` (for example `REQUESTED`, then `SCHEDULED`). `POST /retrieve-device-qos-bookings` looks up the bookings held for a given device (a device may hold several, for different times or locations), and `GET`/`DELETE /device-qos-bookings/{bookingId}` read and cancel a booking.

This is the "devices known up front" variant. Where the exact devices are not known until later, the related [QoS Booking and Assignment API](./camara-qos-booking-assignment) reserves for a device count and lets devices be assigned and released afterwards. Where no reservation is wanted at all and the boost is requested at the moment of use, [Quality on Demand](./camara-quality-on-demand) is the direct session API, and [QoS Provisioning](./camara-qos-provisioning) applies a profile persistently. All four share the same QoS Profiles catalogue and, at activation, the same 3GPP northbound mapping.

---

## Workflow: Media application booking QoS for a device

A user of a media application wants to reserve a QoS profile for one or more known devices ahead of an event. The following steps are executed:

### Step 0: Pre-conditions

- The API invoker has signed up with the API provider.
- A `qosProfile` name has been obtained via the [QoS Profiles API](./camara-qos-profiles).

### Step 1: Create the booking

- **POST /device-qos-bookings** passing the `qosProfile`, the `device` object(s), the `serviceArea`, `startTime` and `duration`. The response returns a `bookingId` used to query or cancel the booking.

---

## 5G-MAG's Self-Assessment

This section records 5G-MAG's practical reading of the API and the open points it raises for media use.

- Booking directly against known devices keeps the model simple for a single-device contribution feed (for example a MoJo uplink) or a small crew where the devices are fixed in advance.
- Because the reservation is bound to specific devices at booking time, substituting a device mid-event (for example replacing a failed camera) requires a new booking rather than reassigning the existing one. Where the exact devices are not known up front, or may change, [QoS Booking and Assignment](./camara-qos-booking-assignment) is the better fit.
- Like the other QoS-family APIs, there is no separate discovery step: availability is only confirmed once the booking is created.

Potential improvements:

- A lightweight way to substitute one device for another within an existing booking, without deleting and recreating it, would help productions where a device may need to be replaced mid-event.

---

## Note on profile names

The profile-name values in the examples below (`QCI_1_voice`, `QOS_L`) are illustrative and operator-defined; the actual names come from the [QoS Profiles API](./camara-qos-profiles). Different examples on this page use different names for the same reason.

---

## QoS Booking API Usage

### Request booking of QoS for a device

With **POST /device-qos-bookings**, and device parameters. The request specifies the device(s), the QoS profile, the application server and ports, and the booking window:

```json
{
  "device": {
    "phoneNumber": "+123456789",
    "networkAccessIdentifier": "123456789@domain.com",
    "ipv4Address": {
      "publicAddress": "203.0.113.0",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  },
  "qosProfile": "QCI_1_voice",
  "applicationServer": {
    "ipv4Address": "198.51.100.0/24",
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  },
  "devicePorts": {
    "ranges": [
      {
        "from": 5010,
        "to": 5020
      }
    ],
    "ports": [5060, 5070]
  },
  "applicationServerPorts": {
    "ranges": [
      {
        "from": 5010,
        "to": 5020
      }
    ],
    "ports": [5060, 5070]
  },
  "sink": "https://endpoint.example.com/sink",
  "sinkCredential": {},
  "startTime": "2024-06-01T12:00:00Z",
  "duration": 3600,
  "serviceArea": {}
}
```

Type of response: A **bookingId**

```json
{
  "device": {
    "phoneNumber": "+123456789",
    "networkAccessIdentifier": "123456789@domain.com",
    "ipv4Address": {
      "publicAddress": "203.0.113.0",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  },
  "qosProfile": "QCI_1_voice",
  "applicationServer": {
    "ipv4Address": "198.51.100.0/24",
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  },
  "devicePorts": {
    "ranges": [
      {
        "from": 5010,
        "to": 5020
      }
    ],
    "ports": [5060, 5070]
  },
  "applicationServerPorts": {
    "ranges": [
      {
        "from": 5010,
        "to": 5020
      }
    ],
    "ports": [5060, 5070]
  },
  "sink": "https://endpoint.example.com/sink",
  "sinkCredential": {},
  "startTime": "2024-06-01T12:00:00Z",
  "duration": 3600,
  "serviceArea": {},
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "startedAt": "2024-06-01T12:00:00Z",
  "bookingStatus": "REQUESTED"
}
```

### Obtains the existing QoS booking for a device

With **POST /retrieve-device-qos-bookings**, and device parameters. The request identifies the device whose bookings are queried:

```json
{
  "device": {
    "phoneNumber": "+123456789",
    "networkAccessIdentifier": "123456789@domain.com",
    "ipv4Address": {
      "publicAddress": "203.0.113.0",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  }
}
```

### Obtains the QoS booking information

With **GET /device-qos-bookings/{bookingId}**. The response returns the booking's profile, window, status and service area:

```json
{
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "duration": 3600,
  "device": {
    "ipv4Address": {
      "publicAddress": "203.0.113.0",
      "publicPort": 59765
    }
  },
  "qosProfile": "QOS_L",
  "sink": "https://application-server.com/notifications",
  "startTime": "2024-06-01T12:00:00Z",
  "startedAt": "2024-06-01T12:00:00Z",
  "bookingStatus": "SCHEDULED",
  "serviceArea": {
    "areaType": "CIRCLE",
    "center": {
      "latitude": 50.735851,
      "longitude": 7.10066
    },
    "radius": 100
  }
}
```
