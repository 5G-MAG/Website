---
title: CAMARA Dedicated Networks
hide_title: true
description: Describes the CAMARA Dedicated Networks API's four-part workflow for reserving dedicated network connectivity and granting per-device access.
sidebar_label: "Dedicated Networks"
sidebar_position: 4
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs for Connectivity Quality</span>
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

This API overlaps with the [Network Slice Booking API](/tech/network-apis/features/network-slice-booking): both reserve network resources for an area and time. The main difference is that Dedicated Networks then grants access per device (via the Accesses API), whereas Network Slice Booking reserves a slice for an area and time window and assigns devices to the booked slice through the separate Network Slice Assignment API (CAMARA NetworkSliceBooking main@fc349ef network-slice-assignment.yaml info.description; CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description).

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
  - Dependency: the `qosProfiles` are named QoS profiles re-used from the QoS Profiles API, which an API provider may offer to resolve a name into the characteristics of a QoS profile ([**QoS Profiles API**](/tech/network-apis/features/qos-profiles)).
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

Dedicated Networks is a multi-part CAMARA API (OpenAPI 3.0.3), split across four YAML definitions in the repository (Areas, Profiles, Networks, Accesses) that together describe one workflow. Its subject matter is the dedicated use of public network connectivity resources: some of these resources are reserved, and to the devices and applications that use them they appear as their own virtual or logical network. The API expresses per-device QoS as QoS profile names (`qosProfiles`). The General Description names three options for realising a dedicated network (a 5G network slice, a Public Network Integrated NPN, or a separate 4G APN or 5G DNN), and the API abstracts the differences between network providers' realisations (CAMARA DedicatedNetworks main@81bcd9d documentation/API_documentation/DedicatedNetworks_GeneralDescription.md, Introduction).

### The four-part resource model

The API is designed to be walked in order, each step narrowing what the next can request:

| Part          | Operation(s)                                                 | Returns                                                        | Role                                                                                     |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Service Areas | `POST /retrieve-service-areas`, `GET /areas/{areaId}`        | area `id` + supported profiles                                 | Where coverage is offered, and which profiles apply there. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/retrieve-service-areas` POST, `/areas/{areaId}` GET; ServiceArea) |
| Profiles      | `GET /profiles`, `GET /profiles/{profileId}`                 | profile `id`, device limit, aggregate throughput, QoS profiles | The capability/QoS bundles available (QoS profile names can be resolved with [QoS Profiles](/tech/network-apis/features/qos-profiles)). |
| Networks      | `GET`/`POST /networks`, `GET`/`DELETE /networks/{networkId}` | network `id` + `status`                                        | Reserve a dedicated network for a `serviceTime` and `serviceAreaId`. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` GET, POST; `/networks/{networkId}` GET, DELETE) |
| Accesses      | `GET`/`POST /accesses`, `GET`/`DELETE /accesses/{accessId}`, device operations under `/accesses/{accessId}/devices`  | access `id`                                                    | Grant a specific device permission to use the reserved network. (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` GET, POST; `/accesses/{accessId}` GET, DELETE; `/accesses/{accessId}/devices*`) |

Only devices with an Accesses resource can use the reserved connectivity, and each access can tailor QoS within the bounds of the applicable network profile. A network request may enter a `REQUESTED` and then reserved state before it becomes active, depending on the requested start time; a `sink` can be supplied for status notifications (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description; DeviceStatus; CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml NetworkStatus).

### Relationship to Network Slice Booking

Dedicated Networks and [Network Slice Booking](/tech/network-apis/features/network-slice-booking) both reserve network resources for an area and a time window, and the two APIs overlap. Both let the API consumer choose which devices may use the reservation: Dedicated Networks through its Accesses part, which handles one device or up to 100 devices per operation, and Network Slice Booking through the separate Network Slice Assignment API, which assigns one device at a time to an existing slice, up to the `maxNumOfDevices` of the slice QoS profile (CAMARA DedicatedNetworks main@81bcd9d documentation/API_documentation/DedicatedNetworks_GeneralDescription.md, Bulk operations). The difference is in what is reserved and how it is described: a network chosen from a Network Profile with QoS profile names, here, and one slice QoS profile (`sliceQosProfile`) for an aggregation of devices, there. For a production where the on-site devices are known and should be individually authorised, either model can fit (CAMARA NetworkSliceBooking main@fc349ef network-slice-assignment.yaml info.description; CAMARA NetworkSliceBooking main@fc349ef network-slice-booking.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description).

---

## Workflow: Media application requesting a Dedicated Network

A user of a media application wants to reserve a dedicated network for a venue ahead of an event, then attach devices individually as they are confirmed. The following steps are executed:

### Step 0: Pre-conditions

- The API invoker has signed up with the API provider (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml info.description Authorization and authentication).
- Dedicated Network Service Areas and Network Profiles have already been defined and published by the network operator (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description; CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description).

### Step 1: Discover the service area and profile

- **POST /retrieve-service-areas** passing the desired location, returning an area `id` with the network and QoS profiles it supports (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/retrieve-service-areas` POST; RetrieveServiceAreasRequest atLocation; ServiceArea).
- **GET /profiles** to review the available network profiles and, optionally, the underlying QoS Profile detail via the [QoS Profiles API](/tech/network-apis/features/qos-profiles) (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml `/profiles` GET; info.description).

### Step 2: Reserve the dedicated network

- **POST /networks** passing a `networkProfileId` or `qosProfileName`, the `serviceTime` and the `serviceAreaId`. The response returns a network `id` and `status` (CAMARA DedicatedNetworks main@81bcd9d dedicated-network.yaml `/networks` POST; BaseNetworkInfo; NetworkInfo).

### Step 3: Grant device access

- **POST /accesses** passing the `networkId` and, optionally, a `devices` list of `device` objects and the subset of `qosProfiles` the devices may use. The response returns an access `id`. Devices can be added to and removed from the access during the reservation window with **POST /accesses/{accessId}/devices**, **POST /accesses/{accessId}/devices/add**, **POST /accesses/{accessId}/devices/remove** and **DELETE /accesses/{accessId}/devices/{accessDeviceId}** (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST; CreateAccessRequest; `/accesses/{accessId}/devices` POST).

---

## 5G-MAG's Self-Assessment

This section records 5G-MAG's practical reading of the API and the open points it raises for media use.

- Separating area discovery, reservation and device access lets the API consumer secure a venue's connectivity ahead of an event, then enrol devices individually as they are confirmed on site (for example cameras arriving one at a time), without needing to know the full device list at reservation time.
- Only devices included in an Access, and with status `GRANTED`, can use the Dedicated Network when it is `ACTIVATED` (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml DeviceStatus); the Network Profile's `maxNumberOfDevices` and aggregate throughput figures set the ceiling the operator dimensions the reservation for.
- This API overlaps with [Network Slice Booking](/tech/network-apis/features/network-slice-booking); the choice between them is mainly whether a network described by a Network Profile (Dedicated Networks) or a slice described by one slice QoS profile for the area and window (Network Slice Booking) fits the production; in both, the API consumer chooses the devices that may use the reservation.

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
  "byQosProfileName": "QCI_1_voice"
}
```

The other filters are `overlappingArea` and `coveringArea` (each a circle or polygon in the common `Area` format, with an `areaType`), `byName` and `byNetworkProfileId`. All the properties given in a request must match for a service area to be returned (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml info.description Querying one or more Areas; RetrieveServiceAreasRequest; CAMARA Commonalities main@b1a9f08 CAMARA_common.yaml schemas Area, Circle, Polygon).

Type of response: a page of areas in `items` (the list can be empty), each with an `id` (used later when requesting a network), the `area` and the network and QoS profiles it supports. The page also carries a `pagination` object, which the page schema requires; its four properties `page` (1-indexed), `perPage` (1 to 100, default 20), `totalCount` and `totalPages` are all optional, and `totalCount` and `totalPages` may be omitted where a full count is too costly. The response also carries `x-total-count`, `x-total-pages` and `Link` headers (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-areas.yaml `/retrieve-service-areas` POST 200; ServiceAreasPage; ServiceArea; CAMARA Commonalities main@b1a9f08 CAMARA_common.yaml schemas Pagination, Page, PerPage, TotalCount, TotalPages):

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "description": "string",
      "area": {
        "areaType": "CIRCLE",
        "center": {
          "latitude": 50.735851,
          "longitude": 7.10066
        },
        "radius": 100
      },
      "networkProfiles": ["string"],
      "qosProfiles": ["QCI_1_voice"]
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "totalCount": 1,
    "totalPages": 1
  }
}
```

## Dedicated Network - Network Profiles API Usage

This API allows for discovering available network profiles, which are offered by the network provider to be used in conjunction of the Dedicated Network API. Network profiles describe the capabilities and performance targets of a dedicated network (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml info.description Introduction and Network Profiles).

With **GET /profiles** a list of available network profiles can be retrieved. The profiles are returned in `items` of a page (with a `pagination` object, as above); each profile lists its device limit (at least 1), aggregate throughput targets and the QoS profiles it offers (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-profiles.yaml `/profiles` GET 200; NetworkProfilesPage; NetworkProfile):

```json
{
  "items": [
    {
      "id": "string",
      "maxNumberOfDevices": 5,
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
  ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "totalCount": 1,
    "totalPages": 1
  }
}
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
  "sinkCredential": {
    "credentialType": "ACCESSTOKEN",
    "accessToken": "<access_token>",
    "accessTokenExpiresUtc": "2025-12-31T23:59:59Z",
    "accessTokenType": "bearer"
  }
}
```

The `sink` must be an `https` URL, and a `sinkCredential`, if given, needs a `credentialType` of `ACCESSTOKEN` or `PRIVATE_KEY_JWT` (CAMARA Commonalities main@b1a9f08 CAMARA_event_common.yaml schemas Sink, SinkCredential, AccessTokenCredential).

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
  "sink": "https://endpoint.example.com/sink"
}
```

The response example leaves out `sinkCredential`, whose `accessToken` and `accessTokenType` properties are write-only (CAMARA Commonalities main@b1a9f08 CAMARA_event_common.yaml schema AccessTokenCredential).

## Dedicated Network - Accesses API Usage

This API allows for requesting network access for devices. A device is identified by the CAMARA device object, containing at least one of a phone number, an IPv4 address or an IPv6 address; the schema also lists a Network Access Identifier, but CAMARA does not currently allow its use (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description; CAMARA Commonalities main@b1a9f08 CAMARA_common.yaml schema Device; CAMARA Commonalities main@b1a9f08 Glossary.md Phone Number, IP v4 Address).

An Access represents the permission for its devices to use a Dedicated Network's reserved connectivity resources, and each device in it has its own status (`REQUESTED`, `GRANTED` or `DENIED`). Only devices that are in an Access with status `GRANTED` can use the connectivity resources allocated for that network, and only while the network is `ACTIVATED`. The usage of resources can be tailored by the Access within the constraints of the applicable Network Profile, and all devices of an Access share its properties (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description; DeviceStatus; documentation/API_documentation/DedicatedNetworks_GeneralDescription.md, States of device's access to the network, Bulk operations).

The operations that act on a list of devices (`POST /accesses`, `POST /accesses/{accessId}/devices/add` and `POST /accesses/{accessId}/devices/remove`) and `DELETE /accesses/{accessId}` are supported only with a two-legged access token; a three-legged token fails authorisation with `403 PERMISSION_DENIED`. The single-device operations (`POST /accesses/{accessId}/devices`, and `GET` or `DELETE /accesses/{accessId}/devices/{accessDeviceId}`) accept a two-legged or a three-legged token, and with a three-legged token the device is identified from the token (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml info.description Identifying the device from the access token; `/accesses/{accessId}` DELETE). The General Description's usage scenarios are business-to-business cases in which the owner of the devices also invokes the API, so a phone number can identify a device with a two-legged token, because no additional consent is needed (CAMARA DedicatedNetworks main@81bcd9d documentation/API_documentation/DedicatedNetworks_GeneralDescription.md, Introduction).

With **POST /accesses** an access to the dedicated network can be created, optionally including devices (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST; CreateAccessRequest)

```json
{
  "networkId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "devices": [
    {
      "phoneNumber": "+123456789"
    }
  ],
  "qosProfiles": ["string"],
  "defaultQosProfile": "string"
}
```

Type of response: The `id` of the access with its attributes and `stats` (`totalDevices`, `totalGranted`, `totalDenied`); when devices were sent in the request, `addedAccessDevices` lists them with the `deviceId` assigned by the API provider, the `status` (`REQUESTED`, `GRANTED` or `DENIED`) and `addedAt`. The values below are illustrative (CAMARA DedicatedNetworks main@81bcd9d dedicated-network-accesses.yaml `/accesses` POST responses 201, 207; AccessInfo; CreateAccessSuccess; AddedAccessDevices; AccessDevice; AccessStats; DeviceStatus).

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "networkId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "qosProfiles": ["string"],
  "defaultQosProfile": "string",
  "stats": {
    "totalDevices": 1,
    "totalGranted": 0,
    "totalDenied": 0
  },
  "addedAccessDevices": [
    {
      "deviceId": "7d1a3c52-0f1b-4e2c-9a53-4d1c8e0b2f61",
      "device": {
        "phoneNumber": "+123456789"
      },
      "status": "REQUESTED",
      "addedAt": "2025-10-27T15:00:00.000Z"
    }
  ]
}
```

## Device object

A device is defined by at least one of `phoneNumber`, `ipv4Address` and `ipv6Address` (`networkAccessIdentifier` is in the schema, but CAMARA does not currently allow its use). The operator may support only a subset of them; the API consumer can give several, and the API provider then uses one of them without checking that they match. An `ipv4Address` object needs a `publicAddress` and at least one of `privateAddress` and `publicPort` (CAMARA Commonalities main@b1a9f08 CAMARA_common.yaml schemas Device, DeviceIpv4Address). The example below combines identifiers for illustration:

```json
{
  "device": {
    "phoneNumber": "+123456789",
    "ipv4Address": {
      "publicAddress": "203.0.113.0",
      "publicPort": 59765
    },
    "ipv6Address": "2001:db8:85a3:8d3:1319:8a2e:370:7344"
  }
}
```