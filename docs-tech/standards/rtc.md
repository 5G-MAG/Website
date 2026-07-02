---
hide_title: true
title: Real-Time Media Communication (RTC)
sidebar_position: 14
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4"/><path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z"/></svg>
</div>
<div class="topic-banner__text">
<h1>Real-Time Media Communication (RTC)</h1>
<p>WebRTC-based interactive media, uplink contribution and 5GMSu standardisation over 5G.</p>
</div>
</div>

## Overview

5G-MAG follows and contributes to standardisation of real-time media communication over 5G, including uplink media delivery, WebRTC integration, and the specifications for 5G Uplink Media Streaming (5GMSu). These technologies are relevant for live production contribution, video conferencing and interactive media services.

5GMSu is the uplink (device-to-network) part of the wider 5G Media Streaming (5GMS) framework. It shares its architecture and much of its specification base with the downlink part (5GMSd); the specifications below cover the 5GMS framework as a whole and call out the uplink-specific aspects. For the full downlink view, see [Standards: 5G Media Streaming](/tech/standards/5gms).

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The RTC architecture, its WebRTC transport, and how it relates to IMS and to 5GMS uplink.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/rtc">Tech: Real-Time Media Communication</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>This is a standards-tracking area; there is no dedicated 5G-MAG reference implementation for RTC yet.</p>
</div>
</div>

</div>

## Key 3GPP Specifications

### 5G Media Streaming: Uplink
* [TS 26.510](https://www.3gpp.org/dynareport/26510.htm): Media delivery; interactions and APIs for provisioning and media session handling
* [TS 26.512](https://www.3gpp.org/dynareport/26512.htm): 5G Media Streaming (5GMS); Protocols (includes uplink reference points M6, M7)
* [TS 26.501](https://www.3gpp.org/dynareport/26501.htm): 5G Media Streaming (5GMS); General description and architecture (covers both 5GMSd and 5GMSu)

:::note
M6 and M7 are two of the 5GMS reference points (the named interfaces between the functional entities of the architecture). For the full set of reference points (M1 to M8) and what each one connects, see [Standards: 5G Media Streaming](/tech/standards/5gms).
:::

### IMS Multimedia Telephony

The IP Multimedia Subsystem (IMS) is the 3GPP framework for delivering real-time voice and multimedia sessions. It is relevant here because IMS Multimedia Telephony provides an established, interoperable path for conversational audio and video over 5G that real-time media services can build on or interwork with.

* [TS 26.114](https://www.3gpp.org/dynareport/26114.htm): IP Multimedia Subsystem (IMS); Multimedia telephony; Media handling and interaction

### Study Items
* [TR 26.925](https://www.3gpp.org/dynareport/26925.htm): Study on real-time communications in 5G

## IETF Standards

* [RFC 3550](https://datatracker.ietf.org/doc/html/rfc3550): RTP: A Transport Protocol for Real-Time Applications
* [RFC 3551](https://datatracker.ietf.org/doc/html/rfc3551): RTP Profile for Audio and Video Conferences with Minimal Control
* [RFC 7742](https://datatracker.ietf.org/doc/html/rfc7742): WebRTC Video Processing and Codec Requirements

## W3C WebRTC

* [WebRTC 1.0](https://www.w3.org/TR/webrtc/): Real-Time Communication Between Browsers
* [Media Capture and Streams](https://www.w3.org/TR/mediacapture-streams/): API for accessing user media

## The RTC Architecture (SA4)

Alongside the uplink streaming path above, 3GPP SA4 defined a dedicated architecture for Real-Time media Communication built around WebRTC. This is the part of the work most specific to interactive, conversational and collaborative media, as distinct from one-way uplink streaming.

* [TS 26.506](https://www.3gpp.org/dynareport/26506.htm): 5G Real-time Media Communication Architecture (stage 2). Defines the RTC functions, reference points and collaboration scenarios. Because it was designed after 5G Media Streaming, the RTC architecture deliberately reuses 5GMS concepts where it can, so RTC and 5GMS functions can share common media session handling and media delivery functionality.
* [TS 26.113](https://www.3gpp.org/dynareport/26113.htm): Real-Time Media Communication; Protocols and APIs (stage 3). Specifies the procedures, APIs and protocols for the reference points defined in the RTC architecture.
* [TS 26.510](https://www.3gpp.org/dynareport/26510.htm): Media delivery; interactions and APIs for provisioning and media session handling. Introduced to harmonise media delivery across the 5GMS and RTC systems, so that common provisioning and session-handling functions can serve both. Note that not all functions are yet shared between the two, and further harmonisation is being studied.

The RTC architecture supports different collaboration scenarios, ranging from an operator providing only transport and QoS support for a third-party WebRTC service, through to the operator hosting the signalling and media functions itself. This lets the same architecture cover both "the network helps a WebRTC app" and "the network operates the RTC service".

## WebRTC and Transport Protocols

RTC media transport is WebRTC-based. In practice that means the well-established WebRTC protocol stack:

* Media over the Real-Time Transport Protocol (RTP) with RTCP feedback, secured as DTLS-SRTP.
* Connectivity established with ICE, using STUN and TURN for NAT traversal.
* Generic data over WebRTC data channels (SCTP over DTLS).

Session establishment (signalling) is not fixed by WebRTC itself. Within the 3GPP RTC work, signalling protocol options are addressed as part of the architecture and protocol specifications; one proposal developed in this context is RESPECT, a WebRTC-compatible session-control signalling protocol. Confirm the exact normative status and naming of any signalling protocol against the current specification text.

## RTC and IMS: two real-time paths

There are two real-time media paths in 5G, and it is worth keeping them distinct:

* **The SA4 RTC architecture** (TS 26.506 / TS 26.113), a WebRTC-based media delivery framework aligned with 5G Media Streaming. This is the path most relevant to browser-based and app-based interactive media and to media production contribution.
* **IMS-based real-time communication**, including IMS Multimedia Telephony (TS 26.114, above) and the more recent IMS Data Channel / NG-RTC work. NG-RTC extends the IMS architecture with a data channel, AI media processing and a service-based interface; its stage 3 was progressed in Release 18. The two paths address overlapping needs from different architectural starting points, and which is used depends on whether the service is anchored in IMS telephony or in the 5GMS/RTC media framework.

## Specifications by Release

* **Release 16 to 17**: 5G Media Streaming foundations (TS 26.501, TS 26.512) including the uplink 5GMSu path; IMS Multimedia Telephony media handling (TS 26.114).
* **Release 18**: RTC architecture (TS 26.506) and protocols (TS 26.113); harmonised media delivery (TS 26.510); IMS Data Channel / NG-RTC.
* **Release 19 and later**: Enhancements to RTC, including immersive real-time communication over WebRTC. Confirm the specific study/work items and their identifiers against the 3GPP work plan.

## RTC over NPN and with TSC

For media production, RTC is typically the interactive/contribution path, and it commonly runs over a Non-Public Network so that the production can reserve uplink capacity and control QoS. Where the same production also needs deterministic essence transport, that is handled by Time-Sensitive Communications rather than by RTC. See [Standards: Non-Public Networks](/tech/standards/npn) and [Standards: Time-Sensitive Communications](/tech/standards/tsc).

## 5G-MAG Focus

5G-MAG follows the SA4 RTC architecture (TS 26.506 / TS 26.113), its harmonisation with 5G Media Streaming (TS 26.510), and the WebRTC transport it builds on, with attention to live contribution and remote production over 5G. This is a standards-tracking area; any reference implementation status should be checked in the 5G-MAG project rather than assumed here.

## Use Cases

* Live video contribution from the field over 5G uplink
* Low-latency interactive streaming for remote production
* WebRTC-based conferencing using 5G network resources
* Uplink media sessions with quality-of-service (QoS) guarantees requested through the Network Exposure Function (NEF) and enforced by the Policy Control Function (PCF); see [Standards: Network APIs](/tech/standards/network-apis) for how these interfaces are used

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TR 26.925, the release placement of TS 26.506 / TS 26.113 / TS 26.510, the NG-RTC stage 3 specification numbers, the RESPECT signalling protocol status, and the Release 19 immersive-RTC study identifier. Verify against the 3GPP work plan before publication.
:::

## Related Standards Work

* [Standards: 5G Media Streaming](/tech/standards/5gms)
* [Standards: Network APIs](/tech/standards/network-apis)
* [Technical Documentation: Real-Time Media Communication](/tech/rtc): analysis documents and reference material on the developer/technical side

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository for 5G-MAG contributions on real-time communications.
:::
