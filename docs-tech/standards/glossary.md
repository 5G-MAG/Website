---
title: Glossary
sidebar_position: 99
---

# Glossary

This glossary collects the acronyms and terms that recur across the standards portal. Definitions are short and plain-language; consult the linked topic pages or the referenced specifications for full detail.

## A

**AF (Application Function)**
A network function that interacts with the 5G Core to influence traffic handling and to request services on behalf of an application.

**ARF (Avatar Representation Format)**
An MPEG format for describing and exchanging avatars so that they can be rendered consistently across systems.

**AS (Application Server)**
A server that hosts application logic or content and communicates with clients, often sitting behind or alongside 5G media functions.

## C

**CAMARA**
An open-source project community that defines common, portable network APIs so applications can use operator capabilities across networks.

**CMAF (Common Media Application Format)**
A container format for segmented media that lets the same media segments be delivered over different streaming protocols.

## D

**DASH (Dynamic Adaptive Streaming over HTTP)**
An adaptive streaming method that splits media into segments at multiple bitrates so a client can switch quality based on conditions.

**DCAF (Data Collection Application Function)**
A function that collects, buffers and reports application and device data for analytics and exposure to consumers.

## E

**eMBMS (evolved Multimedia Broadcast Multicast Service)**
The LTE-era broadcast and multicast delivery system, predecessor to 5G multicast and broadcast services.

## F

**FLUTE (File Delivery over Unidirectional Transport)**
A protocol for reliably delivering files over one-way (broadcast or multicast) transport.

## G

**glTF (GL Transmission Format)**
An open format for efficient transmission and loading of 3D scenes and models.

## H

**HLS (HTTP Live Streaming)**
An adaptive streaming method that delivers media as segments over HTTP, widely used on Apple platforms.

## M

**MBMS (Multimedia Broadcast Multicast Service)**
A 3GPP framework for delivering the same content to many devices at once over broadcast or multicast bearers.

**MBS (Multicast/Broadcast Services)**
The 5G system feature set for delivering content to groups of devices using multicast or broadcast, rather than one stream per device.

**MIV (MPEG Immersive Video)**
An MPEG coding approach for immersive video that supports viewing from multiple positions and directions.

## N

**NEF (Network Exposure Function)**
A 5G Core function that securely exposes network capabilities and events to authorised external applications.

**NPN (Non-Public Network)**
A 5G network deployed for the needs of a specific organisation or site rather than for the general public.

**NTN (Non-Terrestrial Network)**
A network that uses satellites or other airborne or spaceborne platforms to provide connectivity.

## P

**PCF (Policy Control Function)**
A 5G Core function that provides policy rules for how traffic and sessions are treated.

**PTM (Point-to-Multipoint)**
Delivery of the same content from one source to many receivers at the same time.

**PTP (Point-to-Point)**
Delivery of content from one source to a single receiver, one stream per device.

## Q

**QoD (Quality on Demand)**
A network capability that lets an application request a specific quality of service for a session when needed.

**QoS (Quality of Service)**
The set of network characteristics (such as bitrate, latency and reliability) applied to a data flow.

## R

**RAN (Radio Access Network)**
The part of the mobile network that connects devices to the core over the radio interface.

**ROUTE (Real-time Object delivery over Unidirectional Transport)**
A protocol for delivering media objects and files over one-way transport, used in broadcast and multicast delivery.

**RTC (Real-Time Communication)**
Low-latency, interactive media communication such as live conversational audio and video.

## S

**SA1 / SA2 / SA4**
3GPP working groups: SA1 handles service requirements, SA2 handles system architecture, and SA4 handles media codecs, formats and delivery.

## T

**TMGI (Temporary Mobile Group Identity)**
An identifier used to address a particular multicast or broadcast service so devices know what to receive.

**TSC (Time-Sensitive Communication)**
Communication with strict timing and reliability guarantees, used for applications that need deterministic delivery.

## U

**UE (User Equipment)**
The end-user device (for example a phone, tablet or module) that connects to the mobile network.

## V

**V3C (Visual Volumetric Video-based Coding)**
An MPEG family of coding tools for compressing volumetric (3D) visual content.

**V-PCC (Video-based Point Cloud Compression)**
A method within V3C that compresses point-cloud data by mapping it onto video and coding it with video codecs.

## Numbers and reference points

**5GMS (5G Media Streaming)**
The 5G system framework for delivering media streaming services, covering both downlink and uplink directions.

**5GMSd (5G Media Streaming, downlink)**
The downlink part of 5G Media Streaming, delivering media from the network to devices.

**5GMSu (5G Media Streaming, uplink)**
The uplink part of 5G Media Streaming, delivering media from devices to the network.

### 5GMS reference points

Reference points are the defined interfaces between 5G Media Streaming functions. The general points are M1 to M8; the `d` and `u` suffixes indicate the downlink and uplink variants.

**M1 (M1d / M1u)**
Provisioning interface, used to configure media streaming sessions and resources.

**M2 (M2d / M2u)**
Ingest interface between the content source and the media streaming functions.

**M3**
Internal interface between media streaming functions within the network.

**M4 (M4d / M4u)**
Media delivery interface between the network media functions and the client.

**M5 (M5d / M5u)**
Media session handling interface between the client and the network for session control.

**M6 (M6d / M6u)**
Interface between the media client and the application on the device.

**M7 (M7d / M7u)**
Interface between the media client and the media player or access functions on the device.

**M8 (M8d / M8u)**
Application-level interface between the application on the device and the application provider.
