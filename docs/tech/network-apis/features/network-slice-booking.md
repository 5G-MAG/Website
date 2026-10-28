---
title: CAMARA Network Slice Booking
hide_title: true
description: Describes the CAMARA Network Slice Booking API for reserving network slice resources for an area, time window, and QoS profile.
sidebar_label: "Network Slice Booking"
sidebar_position: 10
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs for Connectivity Quality</span>
<h1>CAMARA Network Slice Booking</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Description

The "Network Slice Booking" API gives developers a programmable interface to reserve a network slice for a selected area and period, specifying the service time, the service area (a circle or a polygon) and a slice QoS profile (maximum number of devices, rate per device and delay budgets). The Network Slice Assignment API of the same project manages the assignment of devices to a booked slice.

A network slice is a logical network that provides specific network capabilities and network characteristics (for example a slice reserved for a live event). Booking a slice differs from the [Quality on Demand API](/tech/network-apis/features/quality-on-demand): QoD requests QoS for a single device's session on demand, whereas a slice reserves shared resources for an area and time window covering many devices. This API also overlaps with the [Dedicated Networks API](/tech/network-apis/features/dedicated-networks); see the Self-Assessment below.

Information: [Network Slice Booking project page](https://camaraproject.org/network-slice-booking/) and [GitHub repository](https://github.com/camaraproject/NetworkSliceBooking)

The API definitions can be obtained here: [NetworkSliceBooking API_definitions folder](https://github.com/camaraproject/NetworkSliceBooking/tree/main/code/API_definitions)

The Network Slice Booking API definition (YAML) is available at: [network-slice-booking.yaml](https://github.com/camaraproject/NetworkSliceBooking/blob/main/code/API_definitions/network-slice-booking.yaml)

## Operations and dependencies

### Network Slice Booking API

- **POST /slices** with a request body including `serviceTime`, `serviceArea`, `sliceQosProfile`, it is used to create a new network slice booking with the expected service time, service area, and QoS profile. The response contains a `sliceId`. If expected network slice resources are not available, the API consumer will receive an error response (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml `/slices` POST (createSlice; 422 NETWORK_SLICE_BOOKING.RESOURCES_INSUFFICIENT); SliceAttributes).
- **GET /slices/{sliceId}** - query slice resource information details (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml `/slices/{sliceId}` GET).
- **DELETE /slices/{sliceId}** - delete a Network Slice Booking (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml `/slices/{sliceId}` DELETE).

#### Parameters describing a Network Slice QoS Profile

| Parameter                 | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| `maxNumOfDevices`         | Is the maximum number of devices that can be connected to the slice. (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile maxNumOfDevices) |
| `downStreamRatePerDevice` | Is the maximum downstream rate allowed for each device connected to the slice. (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile downStreamRatePerDevice) |
| `upStreamRatePerDevice`   | Is the maximum upstream rate allowed for each device connected to the slice. (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile upStreamRatePerDevice) |
| `downStreamDelayBudget`   | Is the maximum allowable downlink packet transmission latency (millisecond). (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile downStreamDelayBudget) |
| `upStreamDelayBudget`     | Is the maximum allowable uplink packet transmission latency (millisecond). (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile upStreamDelayBudget) |

Both rate parameters (`downStreamRatePerDevice`, `upStreamRatePerDevice`) indicate the individual device capability required for the slice. Both delay-budget parameters (`downStreamDelayBudget`, `upStreamDelayBudget`) share the same rationale: by limiting the delay, the network can provide an acceptable level of performance for various services, such as voice calls, video streaming, and data (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile downStreamRatePerDevice, upStreamRatePerDevice, downStreamDelayBudget, upStreamDelayBudget).

## Standardisation context

Network Slice Booking is a CAMARA API (OpenAPI 3.0.3) that exposes slice booking at application level: a service time, a circular or polygonal service area and a `sliceQosProfile` (`maxNumOfDevices`, per-device rates and delay budgets).

The `sliceQosProfile` is separate from the [QoS Profiles API](/tech/network-apis/features/qos-profiles): per-device maxima applied across an aggregate can over-provision the slice. The booking is bound to an area and a time, not to devices, which is the main difference from the device-oriented QoS APIs.

---

## Workflow: Media application using the QoS Network Slice Booking API

A user of a media application would like to book the availability of a network slice for a given time area and QoS Profile. The following steps are executed:

### Step 0: Pre-conditions

- In principle none. Only after invoking the API the API consumer will receive a response whether the network slice booking can be successfully created (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml `/slices` POST).

### Step 1: Create a Network Slice Booking

- **POST /slices** passing the `serviceTime`, `serviceArea` and `sliceQosProfile` parameters (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml `/slices` POST; SliceAttributes required serviceTime, serviceArea, sliceQosProfile).

---

## 5G-MAG's Self-Assessment

The Network Slice Booking API would be used prior to the start of the event to book resources for a given time, area and QoS profile. The booking applies to a service time and area, but it is not associated with a device. The QoS Profile is defined for an aggregation of devices, each of which is allowed a maximum downstream/upstream rate; this may assume a design of the resources for the peak values per device, which may result in overdimensioning resources. This API may also be redundant compared with the Dedicated Networks API (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceQosProfile downStreamRatePerDevice, upStreamRatePerDevice, maxNumOfDevices).

Potential improvements:

- For consistency, the definition of the QoS profile could leverage the `qosProfile` defined for other QoS-related APIs.
- The booking could be applied per device rather than to an aggregate of devices
- Devices are associated with a booked slice through the separate Network Slice Assignment API (`network-slice-assignment.yaml`), which assigns a device to an existing slice by `sliceId` and keeps the number of devices within `maxNumOfDevices` (CAMARA NetworkSliceBooking main@fc349ef network-slice-assignment.yaml info.description; `/slices/{sliceId}/devices`).

---

## Network Slice Booking API Usage

With **POST /slices** and one of the two service-area shapes below (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceAttributes serviceArea; examples CREATE_CIRCLE, CREATE_POLYGON).

A location described as a circle (a `center` point and a `radius` in metres, at least 1; CAMARA Commonalities main@b1a9f08 CAMARA_common.yaml schemas Area, Circle, Point; the Network Slice Booking definition declares `x-camara-commonalities: 0.8.0`, whereas the held common file is Commonalities 0.9.0):

```json
{
  "serviceTime": {
    "startDate": "2024-06-01T12:00:00Z",
    "endDate": "2024-06-01T12:00:00Z"
  },
  "serviceArea": {
    "areaType": "CIRCLE",
    "center": {
      "latitude": 45.754114,
      "longitude": 4.860374
    },
    "radius": 800
  },
  "sliceQosProfile": {
    "maxNumOfDevices": 5,
    "downStreamRatePerDevice": {
      "value": 10,
      "unit": "bps"
    },
    "upStreamRatePerDevice": {
      "value": 10,
      "unit": "bps"
    },
    "downStreamDelayBudget": {
      "value": 12,
      "unit": "Milliseconds"
    },
    "upStreamDelayBudget": {
      "value": 12,
      "unit": "Milliseconds"
    }
  }
}
```

or described as a polygon (a `boundary` list of 3 to 15 points, forming a simple polygon that should not intersect itself; CAMARA Commonalities main@b1a9f08 CAMARA_common.yaml schemas Polygon, PointList):

```json
  "serviceArea": {
    "areaType": "POLYGON",
    "boundary": [
      {
        "latitude": 45.754114,
        "longitude": 4.860374
      },
      {
        "latitude": 45.753845,
        "longitude": 4.863185
      },
      {
        "latitude": 45.753916,
        "longitude": 4.866531
      },
      {
        "latitude": 45.754116,
        "longitude": 4.876353
      }
    ]
  },
```

Type of response: the booking attributes (`serviceTime`, `serviceArea`, `sliceQosProfile`) plus a **sliceId** identifying the booking. The example below is the CAMARA example `RESPONSE_CIRCLE` (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml `/slices` POST response 201; SliceInfo; examples RESPONSE_CIRCLE):

```json
{
  "serviceTime": {
    "startDate": "2024-06-01T12:00:00Z",
    "endDate": "2024-06-02T12:00:00Z"
  },
  "serviceArea": {
    "areaType": "CIRCLE",
    "center": {
      "latitude": 45.754114,
      "longitude": 4.860374
    },
    "radius": 800
  },
  "sliceQosProfile": {
    "maxNumOfDevices": 5,
    "downStreamRatePerDevice": {
      "value": 10,
      "unit": "bps"
    },
    "upStreamRatePerDevice": {
      "value": 10,
      "unit": "bps"
    },
    "downStreamDelayBudget": {
      "value": 12,
      "unit": "Milliseconds"
    },
    "upStreamDelayBudget": {
      "value": 12,
      "unit": "Milliseconds"
    }
  },
  "sliceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

The request can also carry an optional `sink` (a callback URL) and a `sinkCredential`; a slice event is then notified as a CloudEvent of type `org.camaraproject.network-slice-booking.v0.status-changed`, whose `data` has the slice attributes (CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml SliceAttributes sink, sinkCredential; ApiEventType; SliceCreatedEvent; examples SLICE_CREATED_EVENT_CIRCLE).
