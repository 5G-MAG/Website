---
title: Reference Scenarios
sidebar_position: 1
hide_title: true
description: Describes the single-device and multi-device reference scenarios for content production and contribution over mobile networks.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Network APIs</span>
<h1>Reference Scenarios</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Scenarios & Use Cases: Content Production and Contribution over Mobile Networks

This section contains information on:
* **Reference Scenarios**, including:
  * [**Single-device Connectivity**](#single-device-connectivity-single-camera-live-video-production-mobile-journalism-mojo-newsgathering-uplink-video)
  * [**Multi-device Connectivity**](#multi-device-connectivity-outside-broadcast-small-scale-video-production-remote-production)

The two scenarios differ mainly in scale. Single-device connectivity covers one camera or contribution feed set up at short notice, so the emphasis is on immediacy and simplicity. Multi-device connectivity covers a coordinated production with many concurrent devices and data flows, each potentially needing a different quality of service (QoS), so the emphasis shifts to reserving and managing resources for the whole set.

:::note[Key terms]
- **UE (User Equipment):** a device with a mobile subscription (SIM/eSIM) that connects to the network, for example a smartphone or a modem inside a camera backpack.
- **RAN (Radio Access Network):** the radio part of the mobile network that connects devices to the core.
- **SNPN (Stand-alone Non-Public Network):** a private mobile network that operates independently of any public operator.
- **PNI-NPN (Public Network Integrated Non-Public Network):** a private network hosted with the help of a public operator's network.
- **DSDA / DSDS:** Dual-SIM Dual-Active and Dual-SIM Dual-Standby, two ways a device can use two SIM cards (see below).
- **QoS (Quality of Service):** the network performance targets (throughput, latency, jitter) requested for a flow.
:::

## Single-device Connectivity (Single Camera Live Video Production, Mobile Journalism (MoJo), Newsgathering, Uplink Video)

A media producer (e.g. a journalist in the field or at a venue) needs connectivity for capturing and contributing (uplinking) content to an application server located in the cloud or at remote premises. This is a small-scale live video production, where practical equipment for immediacy is used, for example mobile devices (smartphones) or a camera connected to a backpack solution (specialized equipment).

Connectivity with a certain quality is required on short notice for a single camera (uplink video and audio), intercom or remote audio (speech from the TV studio), return video (video from the TV studio), and control signals (for example a tally light).

The following figure represents a scenario where the device is a smartphone.

<img loading="lazy" src="/img/tech/network-apis/content-production/figure_newsgathering.png" alt="Diagram of the single-device connectivity scenario showing a smartphone as the production device used for newsgathering/mobile journalism, connecting via the network to the studio production hub." width="60%">

The following figure represents a scenario where the device is a backpack.

<img loading="lazy" src="/img/tech/network-apis/content-production/figure_cellularbonding.png" alt="Diagram of the single-device connectivity scenario showing a cellular bonding backpack as the production device, connecting via the network to the studio production hub." width="60%">

### Actors

The actors involved are:
  - **Streamer/Creator**, uses the content acquisition equipment to capture media, uses the network and sends data to the server.
  -	a **Studio Production Manager**, located e.g. within the production centre.
  -	**Network Operator**, provides the network used for the production. A set of network capabilities can be configured through APIs (referred to as Network APIs in the following).
  -	**Aggregator (optional)**, provides access to the network capabilities of different Network Operators. See [GSMA Open Gateway](https://www.gsma.com/solutions-and-impact/gsma-open-gateway/) and [GSMA Operator Platform](https://www.gsma.com/solutions-and-impact/technologies/networks/operator-platform-hp/) as examples.

### Network functions

The network functions and applications involved are:
  -	**Production Device** (such as a smartphone or a camera attached which is connected to a modem or a backpack), used by the streamer/creator. The device contains at least one UE with a Subscription (SIM) and can host one or more client applications. A client application can be a video capturing and encoding application, which generates and sends a continuous video stream to a receiving Media Server.
  -	**Network API Platform**, used by the Network Operator for exposing network Capabilities. The Network API Platform offers a collection of functions e.g. for Authentication and Authorization of the API Invoker (the Authorization, or AuthZ, Function) and different API Provider functions for different network capabilities. Beside this, there may be more functions, e.g. for API usage metering, API usage throttling, etc.
  -	**Aggregator API Platform (optional)**, located in the path between the Network API Platforms and the API Invoker. It grants access to Network API Platforms from different Network Providers.
  -	**API Consumer / Invoker**, used by the Production equipment (functions) to interact with the Network API Platform of a Network Provider.
  -	**Media Servers**, typically located in the Studio Production Hub (operated by the Production Manager) and interact with the production devices, e.g. receiving video or audio streams.

## Multi-device connectivity (Outside Broadcast, Small-Scale Video Production, Remote Production)

A media producer (e.g. production crew deployed in the field or at a venue) is interested in connectivity for covering an event using multiple devices including cameras, audio equipment, intercom, etc. Multiple devices are concurrently used during the production. Not all data flows have the same priority and quality requirements. Therefore, each device and data flow should get the requested connectivity performance (e.g. throughput, latency, jitter,...) and with the desired QoS, which may change for each device and data flow during the production.

Connectivity with certain quality is reserved before the event for the equipment involved.

Two options are considered when it comes to network deployment:

- A network deployed in the field or at a venue that is used to connect devices and manage the production locally. Devices capturing and contributing (uplinking) content deliver it to an application server located in the cloud or in the field location. The final program output may be generated locally and delivered to the production centre using one of the options described in the "newsgathering and mobile journalism" scenario, for instance, by means of a device connected to a mobile network. The scenario may involve the deployment of different networks:
    - An SNPN, deployed locally. Remote connectivity can be provided by means of a fiber connection or a public network (PNI-NPN) to which the SNPN is connected to. However, the networks are detached and traffic from devices is not directly contributed but only the program output.
    - A PNI-NPN which provides dedicated connectivity locally and for the production devices.

- A public network to which devices are connected to. Devices are managed remotely and are contributing data to the production centre. In this case, a PNI-NPN may be used to guarantee QoS for the different flows carried across the mobile network.

The following figure represents a scenario involving multiple devices.

<img loading="lazy" src="/img/tech/network-apis/content-production/figure_outdoorbroadcast.png" alt="Diagram of the multi-device connectivity scenario for outside broadcast, showing multiple production devices connected to the network for a coordinated production." width="60%">

### Actors

The actors involved are:
  -	A **Production Manager**, deals with the configuration of the production equipment and the access network and has the authority to use the application that interacts with the network operator. It is either:
    -	a Location Production Manager, who is together with the Production Crew in the field, or
    -	a Studio Production Manager, who is located e.g. within the production centre.

  - **Streamer/Creator/Crew**, uses the content acquisition equipment to capture media and the network to send data to the server.
  -	**Network Operator**, provides the network used for the production. A set of network capabilities can be configured through APIs (referred to as Network APIs in the following).
  -	**Aggregator (optional)**, provides access to the network capabilities of different Network Operators. See [GSMA Open Gateway](https://www.gsma.com/solutions-and-impact/gsma-open-gateway/) and [GSMA Operator Platform](https://www.gsma.com/solutions-and-impact/technologies/networks/operator-platform-hp/) as examples.

### Network functions

The network functions and applications involved are:
  -	**Production Devices** (such as a Camera), used by the crew during a production. Each device contains at least one UE with a Subscription (SIM) and can host one or more client applications. A client application can be a video capturing and encoding application, which generates and sends a continuous video stream to a receiving Media Server.
  -	**Network API Platform**, used by the Network Operator for exposing network Capabilities. The Network API Platform offers a collection of functions e.g. for Authentication and Authorization of the API Invoker (the Authorization, or AuthZ, Function) and different API Provider functions for different network capabilities. Beside this, there may be more functions, e.g. for API usage metering, API usage throttling, etc.
  -	**Aggregator API Platform (optional)**, located in the path between the Network API Platforms and the API Invoker. It grants access to Network API Platforms from different Network Providers.
  -	**API Consumer / Invoker**, used by the Production equipment (functions) to interact with the Network API Platform of a Network Provider.
  -	**Media Servers**, typically located in the Studio Production Hub (operated by the Production Manager) and interact with the production devices, e.g. receiving video or audio streams.

## Considerations on Devices

The devices in these scenarios may involve the following:

  - A **single UE (e.g. a smartphone or any piece of equipment with a single UE)** equipped with a single SIM card (or eSIM) connected to the mobile network.

  - A **single device (e.g. a smartphone) equipped with 2 UEs**, each with 1 SIM card (or eSIM), connected to a different carrier of the same mobile network or to different mobile networks. Multi-SIM devices let users utilize multiple cellular connections simultaneously: Dual-SIM Dual-Active (DSDA) does this with two SIM cards, using both connections at once, either picking the best of them or aggregating both for higher throughput. This differs from Dual-SIM Dual-Standby (DSDS), which allows only one SIM to stay connected with active data at a time.

  - A **device with multiple UEs (e.g. a cellular bonding backpack)** equipped with multiple SIM cards each one connected to a different carrier of the same mobile network or connected to different mobile networks.

### Why device identity matters for the APIs

The CAMARA APIs identify a target device through a `device` object that may carry a phone number (MSISDN), a network access identifier, or an IPv4/IPv6 address (see [Details on the device object](../network-api-initiatives#details-on-the-device-object)). In these production scenarios the practical identifier is rarely a phone number: contribution UEs are data-only, and a bonding backpack contains several UEs each with its own subscription. A booking or assignment therefore has to be expressed per UE (per SIM), not per physical device. This has two consequences for the workflows:

- For a single smartphone with one SIM, one `device` object suffices.
- For a bonding backpack with N SIMs, the aggregate feed uses N separate UEs. Each SIM is a distinct `device` to the network, so QoS is requested N times (or once for N devices where the API supports a device count). The application layer bonds the N links; the network sees N independent flows.

## Deployment options for the multi-device scenario

The multi-device scenario admits several network deployments, each with a different trust and traffic model. The choice determines which network exposes APIs and where the contribution traffic actually flows.

<table>
  <tr>
    <td markdown="span" align="left"><b>Deployment</b></td>
    <td markdown="span" align="left"><b>What it is</b></td>
    <td markdown="span" align="left"><b>Contribution path</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">Public network + QoS</td>
    <td markdown="span" align="left">Production UEs attach to a commercial public network; QoS is requested per flow through the operator's Network APIs.</td>
    <td markdown="span" align="left">Each device contributes directly to the production centre or cloud over the public network.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">PNI-NPN (Public Network Integrated NPN)</td>
    <td markdown="span" align="left">A non-public network hosted with the help of a public operator, typically realised as a dedicated network slice or dedicated cells. See 3GPP [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), clause 5.30, for the NPN definitions.</td>
    <td markdown="span" align="left">Devices contribute directly; dedicated resources are guaranteed locally and across the mobile network.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">SNPN (Stand-alone NPN)</td>
    <td markdown="span" align="left">A private network operating independently of any public operator, deployed at the venue.</td>
    <td markdown="span" align="left">Devices are managed locally; the SNPN and any public network are detached, so typically only the finished programme output is contributed onward (over fibre or a public-network uplink).</td>
  </tr>
</table>

The distinction between NPN types (SNPN and PNI-NPN) is defined by 3GPP in TS 23.501, clause 5.30. In an SNPN the local network is self-contained, so devices attached to it do not directly reach the production centre; the local programme output is uplinked separately, which reuses the single-device contribution pattern. A PNI-NPN keeps the devices integrated with the public operator, so per-device contribution and per-flow QoS remain available end to end. These options are analysed further, from the API angle, on the [Using Dedicated Networks](./using-dedicated-networks) page.

## From scenarios to APIs

The two scenarios differ in how much is known in advance and how many devices participate, and that difference drives the API choice:

- **Single-device**, set up at short notice, tends to book QoS at the point of use for one known device. The [Quality on Demand](./using-quality-on-demand) and [QoS Booking](./using-qos-booking) APIs fit this pattern.
- **Multi-device**, planned ahead for a venue and a time window, needs advance reservation for a set of devices, with the ability to attach and detach devices during the event (for example to switch a camera between "on air" and "standby" quality). The [Dedicated Networks](./using-dedicated-networks) and [QoS Booking and Assignment](./using-qos-booking-assignment) APIs, which separate reservation from assignment, fit this pattern.

The [Workflows](./workflows) page turns these scenarios into phased procedures and requirement categories; the [Using CAMARA APIs](./using-camara-apis) page maps those onto concrete APIs.

## Related

* [Introduction](./introduction): why network APIs for contribution, and how CAMARA maps to 3GPP.
* [Workflows and Requirements](./workflows): the phased procedures and the 5G-MAG requirement categories.
* [Using CAMARA APIs](./using-camara-apis): the API-by-phase mapping.
* [Using Dedicated Networks](./using-dedicated-networks): the API most suited to the multi-device, venue-based deployment.
* [Network API Initiatives](../network-api-initiatives): the device object, the QoS parameters and the 3GPP interfaces.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
