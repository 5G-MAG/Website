---
title: 5GMS Overview
sidebar_position: 0
hide_title: true
description: Explains the 5GMS architecture, its functional entities, downlink (5GMSd) and uplink (5GMSu) reference points, features and the session lifecycle.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>5GMS Overview</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## 5G Media Streaming - Overview

This page explains the 5G Media Streaming (5GMS) architecture: its functional entities, its interfaces (reference points), and the downlink features it defines. For the list of specifications, see the [Standards page](/tech/standards/5gms); for the detailed feature-to-API mapping, see the [5GMSd Features page](./features-5gmsd).

5GMS is a 3GPP framework for high-quality, efficient delivery of media, supporting services from mobile network operators and third parties in both Downlink (5GMSd) and Uplink (5GMSu) directions. It is not a separate network but a functional extension of the standard 5G System Architecture, adding media-specific control, hosting and reporting functions on top of the existing 5G System so that media delivery can be provisioned, managed and measured in a standardised way. The architecture is functionally divided into independent components, enabling deployments with different degrees of integration between operators and content providers.

The diagram below shows the general 5GMS architecture, with the functional entities and the reference points that connect them.

<img loading="lazy" src="/img/tech/5gms/5GMS_General.png" width="60%" alt="General 5G Media Streaming architecture showing the Application Provider, 5GMS AF, 5GMS AS, 5GMS Client and 5GMS-Aware Application connected by the M1 to M8 reference points." />

_Figure: General 5GMS architecture and its reference points._

The main functional entities are:

- **5GMS Application Provider**: The entity that uses the 5G network to deliver content. It provides a 5GMS Aware-Application on the UE to make use of 5GMS Client and network functions via 5GMS interfaces and APIs.

- **5GMS Application Function (5GMS AF)**: A specialized application function dedicated to the management and optimization of media streaming sessions.

- **5GMS Application Server (5GMS AS)**: A specialized application server whose primary job is to store, cache, and deliver media content to the User Equipment (UE) or to receive and ingest media from the UE.

- **5GMS Client**: The functional part of the user's device (UE) that handles the media session and the player/streamer logic.

A list of relevant specifications can be found in the link below.

[Specifications](/tech/standards/5gms)

The same architecture is mirrored for the uplink direction (5GMSu); see [Uplink Media Streaming](#uplink-media-streaming-5gmsu) below for how it differs. The remainder of this overview focuses on downlink (5GMSd), which is the direction covered by the 5G-MAG reference tools.

## 5G Unicast Downlink Media Streaming (5GMSd)

To deliver downlink streaming services, the network is the origin of the media and the UE acts as the consumption device. The downlink entities below are the same general roles introduced above, specialised for the downlink direction and carrying a "d" suffix; the summary here focuses on what is specific to downlink.

The diagram below shows the downlink (5GMSd) architecture, with the media flowing from the network to the device.

<img loading="lazy" src="/img/tech/5gms/5GMS_Downlink.png" width="60%" alt="Downlink 5G Media Streaming architecture showing the 5GMSd Application Provider, 5GMSd AF, 5GMSd AS and the 5GMSd Client (Media Session Handler and Media Player) on the device, connected by the M1d to M8d reference points." />

_Figure: Downlink (5GMSd) architecture, media flowing from network to device._

The main functional entities are:

- **5GMSd Application Provider**: The external entity responsible for the "source" side of the media, including creating, encoding, and formatting the content. It utilizes 5GMSd interfaces to deliver this media to the user's application.

- **5GMSd AS**: The hosting environment for media content. It can be a single server or a distributed network, such as a Content Delivery Network (CDN), to optimize delivery.

- **5GMSd AF**: The control-plane entity providing management functions to the device’s Media Session Handler and the Application Provider. It also acts as the bridge to the 5G Core, interacting with the PCF or NEF.

- **5GMSd Client**: The primary receiver on the device for downlink streaming services. It consists of two sub-components, which communicate through the UE-internal APIs at reference points M6d and M7d; these APIs may be exposed to the 5GMSd-Aware Application, or kept private when the Client is implemented as a single self-contained (monolithic) block:

  - **Media Session Handler**: The "control brain" on the device. It coordinates with the 5GMSd AF to set up and manage sessions while gathering data like Quality of Experience (QoE) and consumption metrics.

  - **Media Player**: The "data engine" on the device. It communicates with the 5GMSd AS to fetch and play the actual media stream. It provides playback controls to the app and session status to the Session Handler.

- **5GMSd-Aware Application**: An external app (e.g., a streaming service) that holds the provider's specific logic. Uses standardized APIs to initiate and manage media sessions.

The 5GMSd Client may include several subfunctions which are depicted below:

<div style="display:flex; flex-wrap:wrap; gap:24px; justify-content:center">
  <figure style="text-align:center; width:40%">
    <img loading="lazy" src="/img/tech/5gms/5GMS_MediaPlayer.png" alt="Diagram of the Media Player's subfunctions: Media Presentation and Rendering, Media Decoders, Media Decryption, Consumption Measurement &amp; Logging Client, Metrics Measurement &amp; Logging Client, DRM Client, Media Decapsulation and Media Access Client, connected to the Media Session Handler and the 5GMSd-Aware Application over M7d" width="100%">
    <figcaption>Subfunctions of the Media Player</figcaption>
  </figure>
  <figure style="text-align:center; width:40%">
    <img loading="lazy" src="/img/tech/5gms/5GMS_MediaSessionHandler.png" alt="Diagram of the Media Session Handler's subfunctions: Media Session Core Functions, Metrics Collection &amp; Reporting, Consumption Collection &amp; Reporting, Network Assistance and QoS, and Service URL Handling" width="100%">
    <figcaption>Subfunctions of the Media Session Handler</figcaption>
  </figure>
</div>

## Interfaces for 5GMSd

In 3GPP terminology a reference point is a named interface between two functional entities, defining the interactions that cross it (it may or may not be exposed as a public API). The reference points below map to the M6d and M7d interfaces mentioned above for the on-device sub-components. Note that M3d is an internal, unspecified interface between the 5GMSd AF and AS, and M8d is a service-level interface between the application and the provider that is not specified by 3GPP.

The interfaces are:

| Interface | Name                               | Description                                                                                                                                              |
| :-------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **M1d**   | **5GMSd Provisioning API**         | External API exposed by the **5GMSd AF**; allows the Application Provider to configure the system for downlink streaming and receive feedback.           |
| **M2d**   | **5GMSd Ingest API**               | Optional external API exposed by the **5GMSd AS**; used for uploading content when the AS is hosted within a trusted Data Network.                       |
| **M3d**   | Internal Interface                 | An **unspecified internal API** used for information exchange between the 5GMSd AF and AS regarding content hosting.                                     |
| **M4d**   | **Media Streaming APIs**           | The primary data-plane APIs exposed by the **5GMSd AS** to the **Media Player** for streaming media content.                                             |
| **M5d**   | **Media Session Handling API**     | Control-plane APIs between the **5GMSd AF** and **Media Session Handler** for session control, QoE reporting, and security (auth/auth).                  |
| **M6d**   | **UE Media Session Handling APIs** | Internal UE APIs that allow the **5GMSd-Aware App** and the **Media Player** to access 5GMS session functions.                                           |
| **M7d**   | **UE Media Player APIs**           | Internal UE APIs used by the **5GMSd-Aware App** and **Session Handler** to control playback and media engine functions.                                 |
| **M8d**   | **Application API**                | An external interface for "service-level" exchange (like metadata or login) between the **App** and the **Provider**. This is **not specified** by 3GPP. |

## Key Features for 5GMSd and APIs

The following features are defined for 5GMSd. The clause references below point into the specifications; for the detailed reference-point and API breakdown of each feature, see the [5GMSd Features page](./features-5gmsd).

| Feature                                     | Defined in ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm) clause) | Procedure (TS 26.501 clause) | APIs                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------- |
| **Content hosting**                         | 3GPP TS 26.501 4.0.2                                                       | 3GPP TS 26.501 5.4           | 3GPP [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) + 26.512 |
| **Network assistance**                      | 3GPP TS 26.501 4.0.5                                                       | 3GPP TS 26.501 5.9           | 3GPP TS 26.510 + 26.512                                              |
| **Dynamic policies**                        | 3GPP TS 26.501 4.0.6                                                       | 3GPP TS 26.501 5.8           | 3GPP TS 26.510 + 26.512                                              |
| **Consumption reporting**                   | 3GPP TS 26.501 4.0.8                                                       | 3GPP TS 26.501 5.6           | 3GPP TS 26.510 + 26.512                                              |
| **QoE metrics reporting**                   | 3GPP TS 26.501 4.0.9                                                       | 3GPP TS 26.501 5.5           | 3GPP TS 26.510 + 26.512                                              |
| **Edge processing**                         | 3GPP TS 26.501 4.0.10                                                      | 3GPP TS 26.501 8             | 3GPP TS 26.510 + 26.512                                              |
| **eMBMS delivery**                          | 3GPP TS 26.501 4.0.11                                                      | 3GPP TS 26.501 5.10          | 3GPP TS 26.510 + 26.512                                              |
| **Data collection, reporting and exposure** | 3GPP TS 26.501 4.0.12                                                      | 3GPP TS 26.501 5.11          | 3GPP TS 26.510 + 26.512                                              |

At runtime the features are used in two stages: first the Application Provider provisions the service (below), then the Client retrieves the information it needs to start a session (Service Access Information, below).

## Creation of Provisioning Session

Before 5GMS Clients can use the features of the 5GMS System, a 5GMS Application Provider must provision them by creating one or more _Provisioning Sessions_. The 5GMSd Application Provider can then specify one or more 5GMSd features in the Provisioning Session.

The Provisioning Session information may include Content Hosting Configurations, Content Preparation Templates, Server Certificates, Policy Templates, a Consumption Reporting Configuration, Metrics Reporting Configurations, Edge Resources Configurations and Event Data Processing Configurations.

## Retrieval of Service Access Information

The Service Access Information is the set of parameters and addresses which are needed by the 5GMSd Client to activate and control the reception of a downlink streaming session, and to report service/content consumption and/or QoE metrics.
The Service Access Information may be provided together with other service announcement information using M8d. Alternatively, the 5GMSd Client fetches the Service Access Information from the 5GMSd AF.

## Session lifecycle at a glance

At runtime the reference points are exercised in a repeatable order. This is a schematic view of the downlink case; the exact procedures are specified in TS 26.501 (clause 5) and the APIs in TS 26.510 and [TS 26.512](https://www.3gpp.org/dynareport/26512.htm).

1. **Provisioning (M1d).** The 5GMSd Application Provider creates a Provisioning Session on the 5GMSd AF and attaches the configurations it needs (Content Hosting Configuration, Server Certificates, Policy Templates, Consumption Reporting Configuration, Metrics Reporting Configurations, and where used Content Preparation Templates, Edge Resources Configurations and Event Data Processing Configurations).
2. **AS configuration (M3d).** The AF configures the AS internally for the provisioned service. M3d is not standardised, so the AF-to-AS exchange is implementation-specific.
3. **Ingest (M2d).** Content is ingested into the AS, either pulled by the AS or pushed to it, depending on the ingest protocol chosen in the Content Hosting Configuration.
4. **Service announcement (M8d) and Service Access Information (M5d).** The Aware Application learns of the service (over the out-of-scope M8d interface) and the Media Session Handler obtains the Service Access Information, either embedded in the M8d announcement or fetched from the AF over M5d.
5. **Media session (M4d).** The Media Player fetches and plays the media from the AS over M4d, typically DASH or HLS over HTTP, coordinating with the Media Session Handler over the UE-internal M6d and M7d APIs.
6. **In-session control and reporting (M5d).** During playback the Media Session Handler can invoke dynamic policies and network assistance, and report consumption and QoE metrics, all over M5d.

## Uplink Media Streaming (5GMSu)

The same architecture is mirrored for the uplink direction, where the UE is the source of the media and the network ingests it. The functional entities and reference points carry a "u" suffix in place of "d".

The main differences from downlink are:

- The **5GMSu Application Provider** consumes or further distributes the media that the UE sends, rather than sourcing it.
- The **5GMSu AS** receives and ingests media from the UE instead of hosting and delivering it.
- The **5GMSu Client** contains a **Media Streamer** in place of the Media Player. The Media Streamer captures, encodes and transmits the media on the uplink; the Media Session Handler role is unchanged.
- On **M4u** the media flows from the UE to the AS (media egest), the reverse of the downlink M4d.
- **M2u** carries content egest from the AS towards the Application Provider, the counterpart of the downlink M2d ingest.

M1u (provisioning) and M5u (media session handling) play the same control-plane roles as in downlink. The 5G-MAG reference tools implement the downlink direction (5GMSd); the uplink direction is defined by the same specifications but is not covered by the reference tools today. Low-latency and interactive uplink use cases relate to the Real-Time Communications (RTC) system; see [Real-Time Communications](/tech/rtc) where documented.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the TS 26.501 clause references in the feature table (4.0.2, 5.4, 4.0.5, 5.9, 4.0.6, 5.8, 4.0.8, 5.6, 4.0.9, 5.5, 4.0.10, clause 8, 4.0.11, 5.10, 4.0.12, 5.11) and the clause-5 grouping of the runtime procedures. Verify against the specific TS 26.501 version you are targeting.
:::

**Next:** see the [5GMSd Features page](./features-5gmsd) for how each downlink feature maps to reference points and APIs, and [Advanced Media Delivery](./overview-amd) for the Release-19 extensions.
