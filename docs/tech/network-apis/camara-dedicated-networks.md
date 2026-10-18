---
title: CAMARA Dedicated Networks
sidebar_position: 4
hide_title: true
description: Describes the CAMARA Dedicated Networks API's four-part workflow for reserving dedicated network connectivity and granting per-device access.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">CAMARA Connectivity Quality Management APIs</span>
<h1>CAMARA Dedicated Networks</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Description

The "Dedicated Networks" APIs cover reserving network connectivity resources, selecting network capabilities, and controlling device access (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description).

The Dedicated Networks API has four parts, normally used in this order (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST):

1. **Service Areas** - find where coverage is offered (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description Network Service Areas).
2. **Profiles** - find the available capability / Quality of Service (QoS) bundles (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description Network Profiles).
3. **Networks** - request a dedicated network for a time and area (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST).
4. **Accesses** - grant specific devices permission to use it (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description).

Each step returns an `id` used by the next (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml ServiceArea id; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml NetworkProfile id; CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml NetworkInfo id).

This API overlaps with the [Network Slice Booking API](./camara-network-slice-booking): both reserve network resources for an area and time. The main difference is that Dedicated Networks then grants access per device (via the Accesses API), whereas Network Slice Booking reserves a slice for an area and time window and assigns devices to the booked slice through the separate Network Slice Assignment API (CAMARA NetworkSliceBooking main@fc349ef network-slice-assignment.yaml info.description; CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description).

Information: [Dedicated Networks project page](https://camaraproject.org/dedicated-networks/) and [GitHub repository](https://github.com/camaraproject/DedicatedNetworks)

The API definitions can be obtained here: [DedicatedNetworks API_definitions folder](https://github.com/camaraproject/DedicatedNetworks/tree/main/code/API_definitions)

The Dedicated Networks repository contains several API definitions (YAML) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml):

- Networks: [dedicated-network.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network.yaml) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml info.title)
- Accesses: [dedicated-network-accesses.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network-accesses.yaml) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.title)
- Areas: [dedicated-network-areas.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network-areas.yaml) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.title)
- Profiles: [dedicated-network-profiles.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network-profiles.yaml) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.title)

## Operations and dependencies

### Dedicated Network - Network Service Areas API

- **POST /retrieve-service-areas** - Retrieve dedicated network service areas, filtered by additional search criteria. The response includes an `id` with the supported network profiles and QoS profiles (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/retrieve-service-areas` POST; ServiceArea id, networkProfiles, qosProfiles)
- **GET /areas/{areaId}** - Read a dedicated network service area (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/areas/{areaId}` GET)

### Dedicated Network - Network Profiles API

- **GET /profiles** - List of available network profiles. The response includes an `id`, alongside the `maxNumberOfDevices`, `aggregatedUlThroughput`, `aggregatedDlThroughput`, `qosProfiles`,.. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml `/profiles` GET; NetworkProfile id, maxNumberOfDevices, aggregatedUlThroughput, aggregatedDlThroughput, qosProfiles).
  - Dependency: the `qosProfiles` are named QoS profiles re-used from the QoS Profiles API, which an API provider may offer to resolve a name into the characteristics of a QoS profile ([**QoS Profiles API**](./camara-qos-profiles)).
- **GET /profiles/{profileId}** - Read a dedicated network profile (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml `/profiles/{profileId}` GET)

### Dedicated Network - Networks API

- **GET /networks** - List of dedicated networks (the list can be empty) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` GET)
- **POST /networks** with the request body including either a `networkProfileId` (chosen Network Profile) or a `qosProfileName`, plus `serviceTime` (start and end) and a `serviceAreaId`, is used to request the creation of a dedicated network. The response includes an `id` and the `status` of the request. A `sink` for notifications can be optionally indicated (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST; BaseNetworkInfo (oneOf networkProfileId / qosProfileName; required serviceTime, serviceAreaId).
- **GET /networks/{networkId}** - get the current information about a dedicated network (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks/{networkId}` GET)
- **DELETE /networks/{networkId}** - delete a dedicated network (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks/{networkId}` DELETE)

### Dedicated Network - Accesses API

- **GET /accesses** - List of existing device accesses to dedicated networks, optionally filtered for a given device and/or for a dedicated network (the list can be empty) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` GET)
- **POST /accesses** with the request body including the `networkId` received after invoking the Dedicated Network API (`id`) and, optionally, a `devices` list of `device` objects, a `name`, `qosProfiles` and a `defaultQosProfile`, this request will create an access to a dedicated network with a given configuration. The response includes an `id` (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST; CreateAccessRequest; AccessInfo).
- **GET /accesses/{accessId}** - get a device access to the dedicated network and its configuration (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses/{accessId}` GET)
- **DELETE /accesses/{accessId}** - delete a device access to the dedicated network (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses/{accessId}` DELETE)

## Standardisation context

Dedicated Networks is a multi-part CAMARA API (OpenAPI 3.0.3), split across four YAML definitions in the repository (Areas, Profiles, Networks, Accesses) that together describe one workflow. Its subject matter is what 3GPP frames as private or campus connectivity: a Non-Public Network (NPN) or a dedicated slice reserved for one customer within an operator's network. NPN concepts (SNPN and PNI-NPN) are defined in the 5G System architecture ([TS 23.501](https://www.3gpp.org/dynareport/23501.htm) V20.3.0 clause 5.30.1); the CAMARA API expresses per-device QoS as QoS profile names (`qosProfiles`). The CAMARA YAML itself does not cite these 3GPP specifications; the correspondence is analysis, and an operator may realise a dedicated network through a slice, an isolated deployment, or a combination.

### The four-part resource model

The API is designed to be walked in order, each step narrowing what the next can request:

| Part          | Operation(s)                                                 | Returns                                                        | Role                                                                                     |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Service Areas | `POST /retrieve-service-areas`, `GET /areas/{areaId}`        | area `id` + supported profiles                                 | Where coverage is offered, and which profiles apply there. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/retrieve-service-areas` POST, `/areas/{areaId}` GET; ServiceArea) |
| Profiles      | `GET /profiles`, `GET /profiles/{profileId}`                 | profile `id`, device limit, aggregate throughput, QoS profiles | The capability/QoS bundles available (QoS profile names can be resolved with [QoS Profiles](./camara-qos-profiles)). |
| Networks      | `GET`/`POST /networks`, `GET`/`DELETE /networks/{networkId}` | network `id` + `status`                                        | Reserve a dedicated network for a `serviceTime` and `serviceAreaId`. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` GET, POST; `/networks/{networkId}` GET, DELETE) |
| Accesses      | `GET`/`POST /accesses`, `GET`/`DELETE /accesses/{accessId}`, device operations under `/accesses/{accessId}/devices`  | access `id`                                                    | Grant a specific device permission to use the reserved network. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` GET, POST; `/accesses/{accessId}` GET, DELETE; `/accesses/{accessId}/devices*`) |

Only devices with an Accesses resource can use the reserved connectivity, and each access can tailor QoS within the bounds of the applicable network profile. A network request may enter a `REQUESTED` and then reserved state before it becomes active, depending on the requested start time; a `sink` can be supplied for status notifications (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description; DeviceStatus; CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml NetworkStatus).

### Relationship to Network Slice Booking

Dedicated Networks and [Network Slice Booking](./camara-network-slice-booking) both reserve network resources for an area and a time window, and the two APIs overlap. The practical difference is granularity of admission: Dedicated Networks grants access per device (through the Accesses part), so only devices granted access can use the reservation, whereas Network Slice Booking reserves slice capacity for an area and window, and devices are assigned to the booked slice through the separate Network Slice Assignment API. For a production where the on-site devices are known and should be individually authorised, the per-device model fits well (CAMARA NetworkSliceBooking main@fc349ef network-slice-assignment.yaml info.description; CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description).

---

## Workflow: Media application requesting a Dedicated Network

A user of a media application wants to reserve a dedicated network for a venue ahead of an event, then attach devices individually as they are confirmed. The following steps are executed:

### Step 0: Pre-conditions

- The API invoker has signed up with the API provider (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml info.description Authorization and authentication).
- Dedicated Network Service Areas and Network Profiles have already been defined and published by the network operator (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description).

### Step 1: Discover the service area and profile

- **POST /retrieve-service-areas** passing the desired location, returning an area `id` with the network and QoS profiles it supports (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/retrieve-service-areas` POST; RetrieveServiceAreasRequest atLocation; ServiceArea).
- **GET /profiles** to review the available network profiles and, optionally, the underlying QoS Profile detail via the [QoS Profiles API](./camara-qos-profiles) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml `/profiles` GET; info.description).

### Step 2: Reserve the dedicated network

- **POST /networks** passing a `networkProfileId` or `qosProfileName`, the `serviceTime` and the `serviceAreaId`. The response returns a network `id` and `status` (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST; BaseNetworkInfo; NetworkInfo).

### Step 3: Grant device access

- **POST /accesses** passing the `networkId` and, optionally, a `devices` list of `device` objects and the subset of `qosProfiles` the devices may use. The response returns an access `id`. Devices can be added to and removed from the access during the reservation window with **POST /accesses/{accessId}/devices**, **POST /accesses/{accessId}/devices/add**, **POST /accesses/{accessId}/devices/remove** and **DELETE /accesses/{accessId}/devices/{accessDeviceId}** (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST; CreateAccessRequest; `/accesses/{accessId}/devices` POST).

---

## 5G-MAG's Self-Assessment

This section records 5G-MAG's practical reading of the API and the open points it raises for media use.

- Separating area discovery, reservation and device access lets the API consumer secure a venue's connectivity ahead of an event, then enrol devices individually as they are confirmed on site (for example cameras arriving one at a time), without needing to know the full device list at reservation time.
- Because each device requires an explicit Access, only enrolled devices consume the reservation; the Network Profile's `maxNumberOfDevices` and aggregate throughput figures set the ceiling the operator dimensions the reservation for.
- This API overlaps with [Network Slice Booking](./camara-network-slice-booking); the choice between them is mainly whether per-device authorisation (Dedicated Networks) or a single aggregate reservation for the area and window (Network Slice Booking) fits the production.

Potential improvements:

- Creating an Access against a Network in an incompatible state (for example `TERMINATED`) returns `409 INCOMPATIBLE_STATE`, and a device with `GRANTED` access can use the network only while it is `ACTIVATED`.

---

## Dedicated Network - Network Service Areas API Usage

This API allows for discovering available network service areas, which are the geographical areas offered by the network provider where consistent coverage according to indicated network profile(s) and QoS profiles is provided, and which is to be used in conjunction with the Dedicated Network API (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description Introduction).

With **POST /retrieve-service-areas** a list of dedicated network service areas can be retrieved, filtered by additional search criteria. In the examples on this page, `QCI_1_voice` is an illustrative, operator-defined profile name (QoS Class Identifier, QCI, is the 4G/LTE QoS label that some operators reuse in profile names); the actual names come from the operator.

The request below filters service areas by location and by an optional profile name (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml RetrieveServiceAreasRequest):

```json
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

Type of response: the list of areas, each with an `id` (used later when requesting a network) and the network and QoS profiles it supports (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml ServiceAreasPage; ServiceArea):

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "area": {},
    "networkProfiles": ["string"],
    "qosProfiles": ["QCI_1_voice"]
  }
]
```

## Dedicated Network - Network Profiles API Usage

This API allows for discovering available network profiles, which are offered by the network provider to be used in conjunction of the Dedicated Network API. Network profiles describe the capabilities and performance targets of a dedicated network (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description Introduction and Network Profiles).

With **GET /profiles** a list of available network profiles can be retrieved. Each profile lists its device limit, aggregate throughput targets and the QoS profiles it offers (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml `/profiles` GET; NetworkProfilesPage; NetworkProfile):

```json
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
    "qosProfiles": ["QCI_1_voice"],
    "defaultQosProfile": "QCI_1_voice"
  }
]
```

## Dedicated Network - Networks API Usage

This API allows for requesting a Dedicated Network, which provides a set of capabilities and connectivity performance targets. The Dedicated Network may be requested for a particular geographical location and at a particular time window. Depending on the requested start time for the dedicated network, the network may first enter a reserved state (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml info.description).

### Request the creation of a dedicated network

With **POST /networks**, passing either a **networkProfileId** or a **qosProfileName**, plus **serviceTime** and a **serviceAreaId**, among others (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST; BaseNetworkInfo).

```json
{
  "name": "string",
  "networkProfileId": "string",
  "serviceTime": {
    "start": "2025-11-05T14:14:35.390Z",
    "end": "2025-11-05T14:14:35.390Z"
  },
  "serviceAreaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "sink": "https://endpoint.example.com/sink",
  "sinkCredential": {}
}
```

Type of response: Information about the **status** of the request (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST response 201; NetworkInfo id, status).

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "REQUESTED",
  "name": "string",
  "networkProfileId": "string",
  "serviceTime": {
    "start": "2025-11-05T14:14:35.392Z",
    "end": "2025-11-05T14:14:35.392Z"
  },
  "serviceAreaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "sink": "https://endpoint.example.com/sink",
  "sinkCredential": {}
}
```

## Dedicated Network - Accesses API Usage

This API allows for requesting network access for devices. A device is identified by the CAMARA device object, containing at least one of a phone number, a Network Access Identifier, an IPv4 address or an IPv6 address (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description; CAMARA QualityOnDemand main@471aa35 quality-on-demand.yaml info.description Identifier for the device; CAMARA Commonalities main@b1a9f08 Glossary.md Phone Number, Network Access Identifier, IP v4 Address).
A Device Access represents the permission for a specific device to use a Dedicated Network's reserved connectivity resources. Only devices for which a Device Access resource has been created can use the connectivity resources allocated for that network. The usage of resources can be tailored to each device within the constraints of the applicable Network Profile (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description; DeviceStatus GRANTED).

With **POST /accesses** an access to the dedicated network can be created, optionally including devices (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST; CreateAccessRequest)

```json
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
  "qosProfiles": ["string"],
  "defaultQosProfile": "string"
}
```

Type of response: An **id** for the requested device access (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST responses 201, 207; AccessInfo id; CreateAccessSuccess).

```json
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
  "qosProfiles": ["string"],
  "defaultQosProfile": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

## Device object

This is how a device is defined:

```json
{
  "device": {
    "phoneNumber": "123456789",
    "networkAccessIdentifier": "123456789@domain.com",
    "ipv4Address": {
      "publicAddress": "84.125.93.10",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  }
}
```