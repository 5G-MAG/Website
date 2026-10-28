---
title: CAMARA QoS Booking and Assignment
hide_title: true
description: Describes the CAMARA QoS Booking and Assignment API, which books capacity for a device count, then assigns devices to it.
sidebar_label: "QoS Booking and Assignment"
sidebar_position: 6
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs for Connectivity Quality</span>
<h1>CAMARA QoS Booking and Assignment</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Description

Application developers and service providers use the "QoS Booking and Assignment" API to reserve specific network conditions in advance for one or more devices. These conditions are based on a defined Quality of Service (QoS) profile, and also include parameters such as location, start time, and duration (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description).

Once a booking is confirmed, devices can be assigned to it. Assigned devices then get predictable and consistent network performance, without end users needing to understand the complexities of the underlying network (e.g., 4G/5G infrastructure) (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description; `/qos-bookings` POST description).

**How this differs from QoS Booking:** this API books capacity for a number of devices (`bookingDeviceCount`) first, then lets you assign and release individual devices afterwards via the Device Assignment operations. The related [QoS Booking API](/tech/network-apis/features/qos-booking) instead books directly for specific devices supplied at booking time. Use this API when the devices that will join are not all known up front (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings` POST BookingInput bookingDeviceCount; `/qos-bookings/{bookingId}/devices/assign`).

Information: [QoS Booking and Assignment project page](https://camaraproject.org/qos-booking-and-assignment/) and [GitHub repository](https://github.com/camaraproject/QoSBooking)

The API definitions can be obtained here: [QoSBooking API_definitions folder](https://github.com/camaraproject/QoSBooking/tree/main/code/API_definitions)

The QoS Booking and Assignment API definition (YAML) is available at: [qos-booking-and-assignment.yaml](https://github.com/camaraproject/QoSBooking/blob/main/code/API_definitions/qos-booking-and-assignment.yaml)

## Operations and dependencies

### QoS Booking and Assignment - QoS Booking API

- **POST /qos-bookings** with a request body containing `bookingDeviceCount`, `qosProfile`, `startTime`, `duration`, `serviceArea`, it reserves QoS in advance for up to that number of devices; the devices are attached with a subsequent assign operation. The response includes a `bookingId` (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings` POST BookingInput).
  - Dependency: Requires `qosProfile` which can be retrieved from a previous call to the [**QoS Profiles API**](/tech/network-apis/features/qos-profiles) (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description QoS profiles term; QosProfileName schema).
- **GET /qos-bookings/{bookingId}** - gets booking information for the given bookingId (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}` GET getBookingById)
- **DELETE /qos-bookings/{bookingId}** - Cancel an existing booking and release resources related to that booking (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}` DELETE deleteBooking).

### QoS Booking and Assignment - Device Assignment API

- **POST /qos-bookings/{bookingId}/devices/assign** with a request body containing a `devices` array, allows the end user to assign one or more devices to the existing QoS Booking (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}/devices/assign` POST DeviceAssignmentInput).
- **GET /qos-bookings/{bookingId}/devices** - allows the end user to retrieve the list of devices assigned to the existing QoS Booking (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}/devices` GET getDevicesByBookingId).
- **POST /qos-bookings/{bookingId}/devices/release** with a request body containing a `devices` array - Release one or more already assigned devices. The call can complete synchronously or asynchronously (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}/devices/release` POST releaseDevices).
- **POST /qos-bookings/retrieve** with a request body containing `device` object - Querying for QoS Booking resource information details for a device. Returns the QoS booking information for a given device. A device may have multiple bookings (for several times and locations), thus the response is an array (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/retrieve` POST retrieveBookingByDevice, 200 response)

## Standardisation context

QoS Booking and Assignment is part of the CAMARA QoSBooking repository (OpenAPI 3.0.3, Commonalities-conformant) and belongs to the QoS family that consumes a named profile from the [QoS Profiles API](/tech/network-apis/features/qos-profiles). In the 3GPP northbound model, QoS requests from an application function correspond to the NEF `AsSessionWithQoS` operation ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) that drives `Npcf_PolicyAuthorization` on the PCF ([TS 29.514](https://www.3gpp.org/dynareport/29514.htm)); the CAMARA definition does not specify how a booking maps to it. What is distinctive here is the two-phase model: capacity is reserved for a device count, then individual devices are attached and detached against that reservation.

### Two resources: booking and assignment

The API separates the reservation from the membership:

- **Booking** (`POST /qos-bookings`): reserves capacity for `bookingDeviceCount` devices under a `qosProfile`, for a `serviceArea`, `startTime` and `duration`. The response carries a `bookingId`, `bookingDeviceCount` and `remainingDevices`, and a `bookingStatus` / `statusInfo` (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings` POST BookingInput, BookingOutput).
- **Assignment** (`POST /qos-bookings/{bookingId}/devices/assign` and `.../release`): attaches or detaches specific devices against the booking. `remainingDevices` tracks the free slots, so the consumer can manage a pool over the booking window (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}/devices/assign` and `/release` POST; BookingOutput description).

This fits productions where capacity must be secured ahead of time but the exact devices are only known later (for example accredited crew arriving on site). The related [QoS Booking API](/tech/network-apis/features/qos-booking) instead binds specific devices at booking time; choose that when the devices are known up front. Both differ from Quality on Demand, which has no reservation phase and only discovers availability at request time.

Because booking and assignment are separate resources, they have separate statuses (`bookingStatus` and `assignmentStatus`). A booking must be `SCHEDULED` or `ACTIVATED` before devices can be assigned, so devices can be assigned before the booking's `startTime`. Status changes on either resource are delivered asynchronously as CloudEvents when a `sink` was registered at booking creation; see Event notifications below.

---

## Workflow: Media application booking and assigning QoS

A user of a media application wants to reserve QoS capacity for an event, then attach devices as they join. The following steps are executed:

### Step 0: Pre-conditions

- The API invoker has signed up with the API provider (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description Authorization and authentication).
- A `qosProfile` name has been obtained via the [QoS Profiles API](/tech/network-apis/features/qos-profiles) (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description QoS profiles term).

### Step 1: Create the booking

- **POST /qos-bookings** passing `bookingDeviceCount`, `qosProfile`, `serviceArea`, `startTime` and `duration`. The response returns a `bookingId` (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings` POST BookingInput).

### Step 2: Assign devices to the booking

- **POST /qos-bookings/{bookingId}/devices/assign** passing the `devices` array to attach to the booking. Devices can later be released with **POST /qos-bookings/{bookingId}/devices/release** (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings/{bookingId}/devices/assign` and `/release` POST DeviceAssignmentInput).

---

## QoS Booking and Assignment API Usage

### Request booking of QoS

With **POST /qos-bookings**. The request reserves capacity for a device count, a QoS profile, a service area and a time window (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings` POST BookingInput):

```json
{
  "bookingDeviceCount": 15,
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

Type of response: A **bookingId**, plus the booked and remaining device counts and the booking status. The example below is the CAMARA example `BOOKING_SUCCESSFUL`, where the start time is in the future and the status is `SCHEDULED` (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml `/qos-bookings` POST BookingOutput; examples BOOKING_SUCCESSFUL):

```json
{
  "bookingId": "8e2f6f30-0a1c-4c6b-92e1-1bd05aef1c58",
  "bookingDeviceCount": 15,
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
  "bookingStatus": "SCHEDULED",
  "statusInfo": "BOOKING_SCHEDULED"
}
```

### Assign a device

With **POST /qos-bookings/{bookingId}/devices/assign**, and device parameters. The request lists the devices to attach (each identified by a phone number, an IPv4 address or an IPv6 address; the Network Access Identifier is "defined for future use and is not currently supported" in the API description) (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description Identifier for the device; Devices schema; DeviceAssignmentInput):

```json
{
  "devices": [
    {
      "phoneNumber": "+14145550101"
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
- Because assignment and release are explicit per-device operations, the consumer can manage a pool of `bookingDeviceCount` slots over the booking window. The `remainingDevices` field in the response indicates how many slots are still free (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml BookingOutput description; BookingInput bookingDeviceCount).
- Booking status and per-device assignment status are separate: a booking must be `SCHEDULED` or `ACTIVATED` before devices can be assigned, so devices can be assigned before the booking's `startTime`.

---

## Event notifications

The QoS Booking and Assignment API can notify the API consumer asynchronously when the status of a booking or of a device assignment changes, rather than requiring the consumer to poll for updates (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description Notifications; QosBookingNotificationEvent).

### Mechanism

Notifications are delivered to the callback URL supplied as the `sink` parameter in **POST /qos-bookings**, for both booking and assignment events. Where present, `sinkCredential` describes the credential the API provider uses to authenticate against that endpoint. The consumer's `sink` must accept HTTP POST requests carrying the notification payload (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml info.description Notifications; `/qos-bookings` POST callbacks; EventBookingStatusChanged).

The payload follows the [CloudEvents](https://cloudevents.io/) 1.0 specification (JSON format) (CAMARA Commonalities main@b1a9f08 CAMARA-API-Event-Subscription-and-Notification-Guide.md section 3.1; CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml callbacks application/cloudevents+json).

### Event types

| Event type                                                                  | Meaning                                    |
| --------------------------------------------------------------------------- | ------------------------------------------ |
| `org.camaraproject.qos-booking-and-assignment.v0.booking-status-changed` | The status of a QoS booking changed. (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml QosBookingEventType enum; QosBookingNotificationEvent) |
| `org.camaraproject.qos-booking-and-assignment.v0.assignment-status-changed` | The status of a device assignment changed. (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml QosBookingEventType enum; EventAssignmentStatusChanged) |

The booking event `data` carries `bookingDetails`, `bookingStatus` (`SCHEDULED`, `ACTIVATED` or `TERMINATED`) and `statusInfo`; the assignment event `data` carries `deviceDetails` (including the affected devices), `assignmentStatus` (`ASSIGNED`, `PARTIAL_SUCCESS`, `RELEASED` or `FAILURE`) and `statusInfo` (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml EventBookingStatusChanged; EventAssignmentStatusChanged; BookingStatusChanged).

### Example notification payload

The following booking status-changed CloudEvent is built from the CAMARA structure: `data` carries `bookingDetails` (the CAMARA example `BOOKING_CANCELLED`), `bookingStatus` and `statusInfo`. The values of `id`, `source` and `time` are made up for illustration (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml EventBookingStatusChanged; BookingStatusChanged; examples BOOKING_CANCELLED):

```json
{
  "id": "83a0d986-0866-4f38-b8c0-fc65bfcda452",
  "source": "https://api.example.com/qos-booking-and-assignment/v0/qos-bookings/8e2f6f30-0a1c-4c6b-92e1-1bd05aef1c58",
  "specversion": "1.0",
  "type": "org.camaraproject.qos-booking-and-assignment.v0.booking-status-changed",
  "time": "2025-10-27T15:00:00.000Z",
  "data": {
    "bookingDetails": {
      "bookingId": "8e2f6f30-0a1c-4c6b-92e1-1bd05aef1c58",
      "bookingDeviceCount": 15,
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
      "bookingStatus": "TERMINATED",
      "statusInfo": "BOOKING_CANCELLED"
    },
    "bookingStatus": "TERMINATED",
    "statusInfo": "BOOKING_CANCELLED"
  }
}
```

:::note
The `v0` segment in the event type shows that the API is at an early version. The event types and the `data` structure above are those of the CAMARA QoS Booking and Assignment API definition (`version: wip` in the held copy); check them against the [`qos-booking-and-assignment.yaml`](https://github.com/camaraproject/QoSBooking/blob/main/code/API_definitions/qos-booking-and-assignment.yaml) of the version you integrate against (CAMARA QoSBooking main@4de93f1 qos-booking-and-assignment.yaml QosBookingEventType; EventBookingStatusChanged).
:::
