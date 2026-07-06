---
title: CAMARA Network Slice Booking
sidebar_position: 10
hide_title: true
description: Describes the CAMARA Network Slice Booking API for reserving network slice resources for an area, time window, and QoS profile.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>CAMARA Network Slice Booking</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## CAMARA: Network Slice Booking API

## Description

The "Network Slice Booking" API gives developers a programmable interface through which industry customers can reserve and manage network slice resources within designated areas and time periods, and offer network guarantee services to end users. Developers can customize service areas (e.g., circular or polygonal regions) and time periods, set Quality of Service (QoS) parameters (e.g., throughput, latency, and terminal limits), apply for network slice resources from operators, and bind slice resources to end users, all to achieve network guarantee functions.

A network slice is a logically isolated, end-to-end portion of the operator's network, dimensioned for a particular purpose (for example a slice reserved for a live event). Booking a slice differs from the [Quality on Demand API](./camara-quality-on-demand): QoD requests QoS for a single device's session on demand, whereas a slice reserves shared resources for an area and time window covering many devices. This API also overlaps with the [Dedicated Networks API](./camara-dedicated-networks); see the Self-Assessment below.

Information: [https://camaraproject.org/network-slice-booking/](https://camaraproject.org/network-slice-booking/) and [https://github.com/camaraproject/NetworkSliceBooking](https://github.com/camaraproject/NetworkSliceBooking)

The API definitions can be obtained here: [https://github.com/camaraproject/NetworkSliceBooking/tree/main/code/API_definitions](https://github.com/camaraproject/NetworkSliceBooking/tree/main/code/API_definitions)

The Network Slice Booking API definition (YAML) is available at: [https://github.com/camaraproject/NetworkSliceBooking/blob/main/code/API_definitions/network-slice-booking.yaml](https://github.com/camaraproject/NetworkSliceBooking/blob/main/code/API_definitions/network-slice-booking.yaml)

## Operations and dependencies

### Network Slice Booking API
  * **POST /slices** with a request body including `serviceTime`, `serviceArea`, `sliceQosProfile`, it is used to create a new network slice booking with the expected service time, service area, and QoS profile. The response contains a `sliceId`. If expected network slice resources are not available, the API consumer will receive an error response.
  * **GET /slices/{sliceId}** - query slice resource information details.
  * **DELETE /slices/{sliceId}** - delete a Network Slice Booking.

#### Parameters describing a Network Slice QoS Profile

| Parameter | Description |
| --- | --- |
| `maxNumOfDevices` | Is the maximum number of devices that can be connected to the slice. |
| `downStreamRatePerDevice` | Is the maximum downstream rate allowed for each device connected to the slice. |
| `upStreamRatePerDevice` | Is the maximum upstream rate allowed for each device connected to the slice. |
| `downStreamDelayBudget` | Is the maximum allowable downlink packet transmission latency (millisecond). |
| `upStreamDelayBudget` | Is the maximum allowable uplink packet transmission latency (millisecond). |

Both rate parameters (`downStreamRatePerDevice`, `upStreamRatePerDevice`) indicate the individual device capability required for the slice. Both delay-budget parameters (`downStreamDelayBudget`, `upStreamDelayBudget`) share the same rationale: by limiting the delay, the network can provide an acceptable level of performance for various services, such as voice calls, video streaming, and data.

## Standardisation context

Network Slice Booking is a CAMARA sandbox/incubating API (OpenAPI 3.0.3, Commonalities-conformant). It exposes, at a booking-request level, what 3GPP defines as network slicing. In the 5G System a slice is identified by a Single Network Slice Selection Assistance Information value (S-NSSAI) and is characterised, at management level, by a Network Slice Template. The management of slices (creation, allocation, deallocation) is covered by 3GPP slice management specifications, and the industry parameter template is the GSMA Generic Network Slice Template (GST). At runtime, steering a vertical's traffic onto a slice is what the SEAL Network Slice Capability Enablement (NSCE) service addresses ([TS 23.434](https://www.3gpp.org/dynareport/23434.htm)): the NSCE server acts as an Application Function and updates the S-NSSAI and DNN in the UE Route Selection Policy (URSP) rules.

The CAMARA `network-slice-booking.yaml` deliberately does not adopt this 3GPP nomenclature. It exposes independent, application-facing concepts (service time, a circular or polygonal service area, and a `sliceQosProfile` of per-device rates, delay budgets and a device count) rather than S-NSSAI, GST or URSP. The 3GPP terms above are therefore background, not a normative part of the API; the correspondence is 5G-MAG analysis and an operator may implement the booking differently.

The `sliceQosProfile` here is a separate parameter set from the operator-catalogue [QoS Profiles API](./camara-qos-profiles). It expresses aggregate slice dimensioning: a `maxNumOfDevices` and per-device upstream/downstream rate and delay budgets. Note that these are per-device maxima applied across an aggregate: as 5G-MAG's Self-Assessment observes, dimensioning for the peak per-device value across all devices can over-provision the slice. The booking is bound to an area and time, not to specific devices, which is the main structural difference from the device-oriented QoS APIs and the source of the open questions below.

---

## Workflow: Media application using the QoS Network Slice Booking API

A user of a media application would like to book the availability of a network slice for a given time area and QoS Profile. The following steps are executed:

:::note
Workflow figure to be added. It should show a single interaction: the API consumer sending **POST /slices** with a `serviceTime`, `serviceArea` and `sliceQosProfile`, and the operator returning a `sliceId` and booking `status` (there are no pre-conditions).
:::

### Step 0: Pre-conditions
* In principle none. Only after invoking the API the API consumer will receive a response whether the network slice booking can be successfully created.

### Step 1: Create a Network Slice Booking
* **POST /slices** passing the `serviceTime`, `serviceArea` and `sliceQosProfile` parameters.

---

## 5G-MAG's Self-Assessment

The Network Slice Booking API would be used prior to the start of the event to book resources for a given time, area and QoS profile. The booking applies to a service time and area, but it is not associated with a device. The QoS Profile is defined for an aggregation of devices, each of which gets a pro-rated downstream/upstream rate value; this may assume a design of the resources for the peak values per device, which may result in overdimensioning resources. This API may also be redundant compared with the Dedicated Networks API.

Potential improvements:
- For consistency, the definition of the QoS profile could leverage the `qosProfile` defined for other QoS-related APIs.
- The booking could be applied per device rather than to an aggregate of devices
- It is unclear how to associate devices to make use of the resources. As it stands, this process assumes that all devices connected to the network in such area and time window will be covered by such network slice booking.

---

## Network Slice Booking API Usage
With **POST /slices** and one of the two service-area shapes below.

A location described as a circle (a centre point plus a radius in metres):
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

or described as a polygon (an ordered list of boundary coordinates):

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

Type of response: A **sliceId** identifying the booking, plus its current `status`:

```json
{
  "sliceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "REQUESTED"
}
```
