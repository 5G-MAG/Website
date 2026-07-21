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
<span class="topic-banner__kicker">Connectivity Quality with Network APIs</span>
<h1>CAMARA Dedicated Networks</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## CAMARA: Dedicated Networks API

## Description

The "Dedicated Networks" APIs cover reserving network connectivity resources, selecting network capabilities, and controlling device access.

The Dedicated Networks API has four parts, normally used in this order:

1. **Service Areas** - find where coverage is offered.
2. **Profiles** - find the available capability / Quality of Service (QoS) bundles.
3. **Networks** - request a dedicated network for a time and area.
4. **Accesses** - grant specific devices permission to use it.

Each step returns an `id` used by the next.

This API overlaps with the [Network Slice Booking API](./camara-network-slice-booking): both reserve network resources for an area and time. The main difference is that Dedicated Networks then grants access per device (via the Accesses API), whereas Network Slice Booking applies to all devices in the area for the booked window.

Information: [Dedicated Networks project page](https://camaraproject.org/dedicated-networks/) and [GitHub repository](https://github.com/camaraproject/DedicatedNetworks)

The API definitions can be obtained here: [DedicatedNetworks API_definitions folder](https://github.com/camaraproject/DedicatedNetworks/tree/main/code/API_definitions)

The Dedicated Networks repository contains several API definitions (YAML):

- Networks: [dedicated-network.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network.yaml)
- Accesses: [dedicated-network-accesses.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network-accesses.yaml)
- Areas: [dedicated-network-areas.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network-areas.yaml)
- Profiles: [dedicated-network-profiles.yaml](https://github.com/camaraproject/DedicatedNetworks/blob/main/code/API_definitions/dedicated-network-profiles.yaml)

## Operations and dependencies

### Dedicated Network - Network Service Areas API

- **POST /retrieve-service-areas** - Retrieve dedicated network service areas, filtered by additional search criteria. The response includes an `id` with the supported network profiles and QoS profiles
- **GET /areas/{areaId}** - Read a dedicated network service area

### Dedicated Network - Network Profiles API

- **GET /profiles** - List of available network profiles. The response includes an `id`, alongside the `maxNumberOfDevices`, `aggregatedUlThroughput`, `aggregatedDlThroughput`, `qosProfiles`,...
  - Dependency: Requires `qosProfiles` which can be retrieved from a previous call to the [**QoS Profiles API**](./camara-qos-profiles).
- **GET /profiles/{profileId}** - Read a dedicated network profile

### Dedicated Network - Networks API

- **GET /networks** - List of dedicated networks (the list can be empty)
- **POST /networks** with the request body including either a `networkProfileId` (chosen Network Profile) or a `qosProfileName`, plus `serviceTime` (start and end) and a `serviceAreaId`, is used to request the creation of a dedicated network. The response includes an `id` and the `status` of the request. A `sink` for notifications can be optionally indicated.
- **GET /networks/{networkId}** - get the current information about a dedicated network
- **DELETE /networks/{networkId}** - delete a dedicated network

### Dedicated Network - Accesses API

- **GET /accesses** - List of existing device accesses to dedicated networks, optionally filtered for a given device and/or for a dedicated network (the list can be empty)
- **POST /accesses** with the request body including the `networkId` received after invoking the Dedicated Network API (`id`), a `device` object, `qosProfiles`, this request will create a device access to a dedicated network with a given configuration. The response includes an `id`.
- **GET /accesses/{accessId}** - get a device access to the dedicated network and its configuration
- **DELETE /accesses/{accessId}** - delete a device access to the dedicated network

## Standardisation context

Dedicated Networks is a multi-part CAMARA API (OpenAPI 3.0.3, Commonalities-conformant), split across four YAML definitions in the repository (Areas, Profiles, Networks, Accesses) that together describe one workflow. Its subject matter is what 3GPP frames as private or campus connectivity: a Non-Public Network (NPN) or a dedicated slice reserved for one customer within an operator's network. NPN concepts are defined in the 5G System architecture ([TS 23.501](https://www.3gpp.org/dynareport/23501.htm)); the per-device QoS applied to accesses reuses the same NEF QoS machinery ([TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) as the other QoS APIs. The CAMARA YAML itself does not cite these 3GPP specifications; the correspondence is analysis, and an operator may realise a dedicated network through a slice, an isolated deployment, or a combination.

### The four-part resource model

The API is designed to be walked in order, each step narrowing what the next can request:

| Part          | Operation(s)                                                 | Returns                                                        | Role                                                                                     |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Service Areas | `POST /retrieve-service-areas`, `GET /areas/{areaId}`        | area `id` + supported profiles                                 | Where coverage is offered, and which profiles apply there.                               |
| Profiles      | `GET /profiles`, `GET /profiles/{profileId}`                 | profile `id`, device limit, aggregate throughput, QoS profiles | The capability/QoS bundles available (depends on [QoS Profiles](./camara-qos-profiles)). |
| Networks      | `GET`/`POST`/`DELETE /networks`, `GET /networks/{networkId}` | network `id` + `status`                                        | Reserve a dedicated network for a `serviceTime` and `serviceAreaId`.                     |
| Accesses      | `GET`/`POST`/`DELETE /accesses`, `GET /accesses/{accessId}`  | access `id`                                                    | Grant a specific device permission to use the reserved network.                          |

Only devices with an Accesses resource can use the reserved connectivity, and each access can tailor QoS within the bounds of the applicable network profile. A network request may enter a `REQUESTED` and then reserved state before it becomes active, depending on the requested start time; a `sink` can be supplied for status notifications.

### Relationship to Network Slice Booking

Dedicated Networks and [Network Slice Booking](./camara-network-slice-booking) both reserve network resources for an area and a time window, and the two APIs overlap. The practical difference is granularity of admission: Dedicated Networks grants access per device (through the Accesses part), so only enrolled devices consume the reservation, whereas Network Slice Booking reserves aggregate slice capacity for an area and window without an explicit per-device access step. For a production where the on-site devices are known and should be individually authorised, the per-device model fits well; for a broad "cover everyone in this area" reservation, slice booking is closer.

---

## Dedicated Network - Network Service Areas API Usage

This API allows for discovering available network service areas, which are the geographical areas offered by the network provider where consistent coverage according to indicated network profile(s) and QoS profiles is provided, and which is to be used in conjunction with the Dedicated Network API.

With **POST /retrieve-service-areas** a list of dedicated network service areas can be retrieved, filtered by additional search criteria. In the examples on this page, `QCI_1_voice` is an illustrative, operator-defined profile name (QoS Class Identifier, QCI, is the 4G/LTE QoS label that some operators reuse in profile names); the actual names come from the operator.

The request below filters service areas by location and by an optional profile name:

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

Type of response: the list of areas, each with an `id` (used later when requesting a network) and the network and QoS profiles it supports:

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

This API allows for discovering available network profiles, which are offered by the network provider to be used in conjunction of the Dedicated Network API. Network profiles describe the capabilities and performance targets of a dedicated network.

With **GET /profiles** a list of available network profiles can be retrieved. Each profile lists its device limit, aggregate throughput targets and the QoS profiles it offers:

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

This API allows for requesting a Dedicated Network, which provides a set of capabilities and connectivity performance targets. The Dedicated Network may be requested for a particular geographical location and at a particular time window. Depending on the requested start time for the dedicated network, the network may first enter a reserved state.

### Request the creation of a dedicated network

With **POST /networks**, passing either a **networkProfileId** or a **qosProfileName**, plus **serviceTime** and a **serviceAreaId**, among others.

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

Type of response: Information about the **status** of the request.

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

This API allows for requesting network access for devices. A device is identified by the CAMARA device object, containing either an MSISDN or a Network Access Identifier.
A Device Access represents the permission for a specific device to use a Dedicated Network's reserved connectivity resources. Only devices for which a Device Access resource has been created can use the connectivity resources allocated for that network. The usage of resources can be tailored to each device within the constraints of the applicable Network Profile.

With **POST /accesses** a device access can be created

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

Type of response: An **id** for the requested device access.

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
