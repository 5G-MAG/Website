---
title: Real-Time Media Communication (RTC)
sidebar_position: 7
hide_title: true
description: Overview of 3GPP's RTC architecture (TS 26.506), WebRTC transport stack, and its relation to 5GMSu and IMS communication.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4"/><path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z"/></svg>
</div>
<div class="topic-banner__text">
<h1>Real-Time Media Communication (RTC)</h1>
</div>
</div>

## Real-Time Media Communication - Tech Resources

## Overview

Real-Time Media Communication (RTC) covers the 3GPP work on interactive, low-latency media such as conversational audio and video, immersive calls and interactive streaming, where the round-trip delay must stay low enough for two-way interaction. It builds on the uplink side of 5G Media Streaming (5GMSu) and related delivery functions. 5G-MAG tracks how these capabilities support real-time media services over 5G, and this page collects the technical resources and standards pointers for that work. For acronyms used here, see the [Glossary](/tech/standards/glossary).

No dedicated reference tool exists for RTC yet. This area is tracked through the standards work and pointers below.

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/19)

## The RTC architecture (TS 26.506)

3GPP SA4 specified a dedicated 5G Real-time Media Communication Architecture (Stage 2) in [TS 26.506](https://www.3gpp.org/dynareport/26506.htm), with the stage-3 procedures, APIs and protocols in [TS 26.113](https://www.3gpp.org/dynareport/26113.htm). The design reuses 5G Media Streaming (5GMS) concepts wherever possible, so RTC functions and 5GMS functions can share media session handling and media delivery. At a high level the architecture places:

* An **RTC Application Provider** offering the service.
* An **RTC Application Function (AF)** and **RTC Application Server (AS)** on the network side, handling provisioning, session control and media functions.
* An **RTC-aware application** on the UE.

These are connected by named reference points, analogous to the M1..M8 model used in 5GMS. Because RTC was defined after 5GMS, the harmonised provisioning and session-handling functions are being pulled into a common media delivery specification, [TS 26.510](https://www.3gpp.org/dynareport/26510.htm), so that the same functions can serve both 5GMS and RTC; not all functions are shared yet.

## Collaboration scenarios

The architecture is defined for a range of collaboration scenarios that differ in how much of the service the mobile operator provides. At one end the operator provides only connectivity and QoS support for a third-party WebRTC service; at the other end the operator hosts the signalling and media functions (for example acting as a WebRTC gateway or media function). Intermediate scenarios have the operator provide some functions (such as TURN relays or a media gateway) while the application provider keeps the rest. This lets one architecture cover both operator-assisted third-party services and operator-run RTC services.

## WebRTC transport stack

RTC media transport uses the WebRTC protocol stack:

* **Media**: RTP with RTCP feedback, secured as DTLS-SRTP.
* **Connectivity / NAT traversal**: ICE, using STUN for server-reflexive candidates and TURN for relayed candidates.
* **Data**: WebRTC data channels, i.e. SCTP over DTLS, for reliable or partially-reliable messaging alongside the media.

Codec handling follows the WebRTC requirements (for example the IETF video codec requirements referenced on the standards page). QoS for the media flows is requested from the 5G system through the exposure interfaces (NEF, then PCF for policy) so that an RTC session can obtain better-than-best-effort treatment; for production use this is normally combined with a Non-Public Network so uplink capacity can be reserved.

## Signalling

WebRTC does not mandate a signalling protocol; the offer/answer exchange must be carried by some out-of-band channel. Within the 3GPP RTC work the signalling options are handled in the architecture and protocol specifications. One protocol developed in this context is RESPECT, a compact, extensible WebRTC-compatible session-control protocol. The precise normative status and naming should be confirmed against the current specification text rather than assumed.

## Relationship to 5GMSu and to IMS

* **5GMSu (uplink 5G Media Streaming)** is a one-way, device-to-network streaming path within the 5GMS framework ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm), and the harmonised TS 26.510). It suits contribution/ingest where interactivity is not required.
* **RTC (TS 26.506 / TS 26.113)** is the interactive, WebRTC-based path, suited to conversational and collaborative media and low-latency two-way contribution.
* **IMS-based real-time communication**, including IMS Multimedia Telephony ([TS 26.114](https://www.3gpp.org/dynareport/26114.htm)) and the more recent IMS Data Channel / NG-RTC work, is a separate, IMS-anchored path. NG-RTC adds a data channel, AI media processing and a service-based interface to IMS; its stage 3 was progressed in Release 18. Which path a service uses depends on whether it is anchored in IMS telephony or in the 5GMS/RTC media framework.

## Release timeline

* **Release 16 to 17**: 5GMS foundations (TS 26.501, TS 26.512) including the 5GMSu uplink path; IMS Multimedia Telephony (TS 26.114).
* **Release 18**: RTC architecture (TS 26.506) and protocols (TS 26.113); harmonised media delivery (TS 26.510); IMS Data Channel / NG-RTC stage 3.
* **Release 19 and later**: RTC enhancements, including immersive real-time communication over WebRTC. Confirm the specific study/work items and their identifiers against the 3GPP work plan.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the release placement of TS 26.506 / TS 26.113 / TS 26.510, the RTC reference-point naming, the NG-RTC stage 3 specification numbers, the RESPECT signalling protocol status, and the Release 19 immersive-RTC study identifier. Verify against the 3GPP work plan before publication.
:::



---

## Information related to Standards

[Standards: Real-Time Media Communication](/tech/standards/rtc)

---

