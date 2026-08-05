---
hide_title: true
title: Real-Time Communications
description: 3GPP's SA4 Real-Time Communications architecture, WebRTC transport, and 5GMS uplink standards for interactive media contribution.
sidebar_position: 14
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4"/><path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Real-Time Communications</h1>
</div>
</div>

<div class="topic-lead">
WebRTC-based interactive media, uplink contribution and 5GMSu standardisation over 5G.
</div>

## Overview

5G-MAG tracks 3GPP standardisation of real-time media communication over 5G: the WebRTC-based RTC architecture, and 5G Uplink Media Streaming (5GMSu). For the technical analysis of how these fit together, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

5GMSu is the uplink (device-to-network) part of the wider 5G Media Streaming (5GMS) framework. It shares its architecture and much of its specification base with the downlink part (5GMSd); the specifications below cover the 5GMS framework as a whole and call out the uplink-specific aspects. For the full downlink view, see [Standards: 5G Media Streaming](/tech/standards/5gms).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The RTC architecture, its WebRTC transport, and how it relates to IMS and to 5GMS uplink.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/rtc">Tech: Real-Time Communications (RTC)</a></li>
</ul>
</div>
</div>

</div>

## Specifications by Release

- **Release 16 to 17**: 5G Media Streaming foundations (TS 26.501, TS 26.512) including the uplink 5GMSu path; IMS Multimedia Telephony media handling (TS 26.114).
- **Release 18**: RTC architecture (TS 26.506) and protocols (TS 26.113); harmonised media delivery (TS 26.510); IMS Data Channel / NG-RTC.
- **Release 19 and later**: Enhancements to RTC, including immersive real-time communication over WebRTC. Confirm the specific study/work items and their identifiers against the 3GPP work plan.

## Key 3GPP Specifications

### RTC Architecture (SA4)

- [TS 26.506](https://www.3gpp.org/dynareport/26506.htm): 5G Real-time Media Communication Architecture (stage 2)
- [TS 26.113](https://www.3gpp.org/dynareport/26113.htm): Real-Time Media Communication; Protocols and APIs (stage 3)
- [TS 26.510](https://www.3gpp.org/dynareport/26510.htm): Media delivery; interactions and APIs for provisioning and media session handling (harmonised across 5GMS and RTC)

### WebRTC Transport

- Media over RTP with RTCP feedback, secured as DTLS-SRTP.
- Connectivity via ICE, using STUN and TURN for NAT traversal.
- Data over WebRTC data channels (SCTP over DTLS).

See the IETF and W3C listings below for the underlying protocol specifications.

### 5G Media Streaming: Uplink

- [TS 26.510](https://www.3gpp.org/dynareport/26510.htm): Media delivery; interactions and APIs for provisioning and media session handling
- [TS 26.512](https://www.3gpp.org/dynareport/26512.htm): 5G Media Streaming (5GMS); Protocols (includes uplink reference points M6, M7)
- [TS 26.501](https://www.3gpp.org/dynareport/26501.htm): 5G Media Streaming (5GMS); General description and architecture (covers both 5GMSd and 5GMSu)

:::note
M6 and M7 are two of the 5GMS reference points (the named interfaces between the functional entities of the architecture). For the full set of reference points (M1 to M8) and what each one connects, see [Standards: 5G Media Streaming](/tech/standards/5gms).
:::

### IMS Multimedia Telephony

- [TS 26.114](https://www.3gpp.org/dynareport/26114.htm): IP Multimedia Subsystem (IMS); Multimedia telephony; Media handling and interaction

### Study Items

- [TR 26.925](https://www.3gpp.org/dynareport/26925.htm): Study on real-time communications in 5G

## IETF Standards

- [RFC 3550](https://datatracker.ietf.org/doc/html/rfc3550): RTP: A Transport Protocol for Real-Time Applications
- [RFC 3551](https://datatracker.ietf.org/doc/html/rfc3551): RTP Profile for Audio and Video Conferences with Minimal Control
- [RFC 7742](https://datatracker.ietf.org/doc/html/rfc7742): WebRTC Video Processing and Codec Requirements

## W3C WebRTC

- [WebRTC 1.0](https://www.w3.org/TR/webrtc/): Real-Time Communication Between Browsers
- [Media Capture and Streams](https://www.w3.org/TR/mediacapture-streams/): API for accessing user media

## Specifications by Role

| Role                          | Specifications                          |
| ------------------------------ | ---------------------------------------- |
| RTC architecture (stage 2)     | TS 26.506                               |
| RTC protocols and APIs (stage 3) | TS 26.113                              |
| Harmonised media delivery       | TS 26.510                              |
| 5GMS uplink (5GMSu)            | TS 26.501, TS 26.512                    |
| IMS multimedia telephony        | TS 26.114                              |
| WebRTC media transport (IETF)   | RFC 3550, RFC 3551, RFC 7742            |
| WebRTC browser APIs (W3C)       | WebRTC 1.0, Media Capture and Streams   |

## 5G-MAG tracking and contribution focus

5G-MAG follows the SA4 RTC architecture (TS 26.506 / TS 26.113), its harmonisation with 5G Media Streaming (TS 26.510), and the WebRTC transport it builds on.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TR 26.925, the release placement of TS 26.506 / TS 26.113 / TS 26.510, the NG-RTC stage 3 specification numbers, the RESPECT signalling protocol status, and the Release 19 immersive-RTC study identifier. Verify against the 3GPP work plan before publication.
:::

## Related Standards Work

- [Standards: 5G Media Streaming](/tech/standards/5gms)
- [Standards: Network APIs](/tech/standards/network-apis)
- [Standards: Non-Public Networks](/tech/standards/npn): RTC contribution commonly runs over an NPN
- [Standards: Time Sensitive Communications](/tech/standards/tsc): the deterministic-transport counterpart to RTC for essence flows
- [Technical Documentation: Real-Time Communications (RTC)](/tech/rtc): analysis documents and reference material on the developer/technical side
- [Meetings with 3GPP SA4](/standards/3gpp-issue-tracking): the live tracker for 3GPP feedback issues on this specification

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
