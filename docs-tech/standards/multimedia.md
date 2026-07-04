---
hide_title: true
title: Multimedia Delivery Protocols
description: Overview of FLUTE and ROUTE, the one-way transports carrying DASH, HLS and CMAF media over broadcast and multicast networks.
sidebar_position: 10
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12l0 9"/></svg>
</div>
<div class="topic-banner__text">
<h1>Multimedia Delivery Protocols</h1>
</div>
</div>

<div class="topic-lead">
FLUTE and ROUTE, the one-way transports behind broadcast and multicast media delivery.
</div>

## Overview

Multimedia content delivery over broadcast and multicast networks relies on transport protocols that can deliver files and media objects one-way, without a return channel from each receiver. This page tracks the two main such transports: FLUTE, used for file delivery in MBMS-based systems, and ROUTE, used for real-time object delivery in ROUTE/DASH broadcast (and referenced by ATSC 3.0 and 5G Broadcast). 5G-MAG tracks these specifications and their use in its broadcast and multicast work. For acronyms used here, see the [Glossary](/tech/standards/glossary).

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>Session structure, the File Delivery Table (FDT), and FEC/object recovery for FLUTE and ROUTE.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/multimedia/multimedia-content-delivery">Tech: Multimedia Delivery Protocols</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>A FLUTE library and multimedia content delivery tooling used across 5G-MAG's broadcast projects.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/multimedia">Multimedia Content Delivery</a></li>
</ul>
</div>
</div>

</div>

## The work area

Two layers matter when media is delivered over broadcast or multicast. The **object/segment format** describes how media is packaged and addressed (for example DASH, HLS and CMAF), and the **unidirectional transport** describes how those objects reach receivers when there is no per-receiver return path (FLUTE and ROUTE). On a bidirectional (unicast) network, DASH and HLS clients simply pull segments over HTTP. On a broadcast or multicast bearer there is no per-receiver acknowledgement, so the same segments are carried by a one-way transport that layers reliability on top of UDP/IP multicast. 5G-MAG's work sits mainly at this transport layer, delivering DASH-, HLS- or CMAF-packaged content over 5G Broadcast (LTE-based) and 5G Multicast Broadcast Services (MBS).

### Unidirectional transports

FLUTE and ROUTE both build on the IETF Reliable Multicast Transport (RMT) building blocks: the Layered Coding Transport (LCT) building block (RFC 5651) and Asynchronous Layered Coding (ALC, RFC 5775). FLUTE (File Delivery over Unidirectional Transport, RFC 6726) delivers complete files described by a File Delivery Table (FDT); it is the file-delivery method used by 3GPP MBMS (TS 26.346). ROUTE (Real-Time Transport Object Delivery over Unidirectional Transport, RFC 9223) delivers timed media objects and is designed for low-latency, real-time delivery of DASH or CMAF segments; it is the transport used by ATSC 3.0 (ROUTE/DASH) and is supported alongside FLUTE in 5G broadcast/multicast systems. ROUTE reuses several FLUTE and FCAST (RFC 6968) principles, for example carrying object metadata and content together as a compound object.

FLUTE and ROUTE differ mainly in intent: FLUTE targets reliable file download where completeness matters and latency is secondary, while ROUTE targets streaming where a media object must be usable as it arrives and lateness is worse than loss. Both are one-way and both can be protected by Forward Error Correction (FEC) rather than retransmission.

### Object and segment formats

* **DASH** (Dynamic Adaptive Streaming over HTTP) is defined by ISO/IEC 23009-1. A Media Presentation Description (MPD) manifest describes Representations at different bitrates, and the client selects segments adaptively. 3GPP's own DASH profile, 3GP-DASH, is in TS 26.247; the DVB profile of MPEG-DASH is in ETSI TS 103 285.
* **HLS** (HTTP Live Streaming) is described by the informational IETF RFC 8216 (edited by Apple) and uses M3U8 playlists with media segments; a second edition is in progress at the IETF.
* **CMAF** (Common Media Application Format) is defined by ISO/IEC 23000-19 (MPEG-A Part 19). It defines a segmented media container derived from the ISO Base Media File Format so that a single set of encoded segments can be addressed by both DASH and HLS, reducing storage and packaging duplication. CMAF segments are the natural payload for ROUTE-based real-time delivery.

## Specifications by role

| Role | Protocol / format | Defining specification |
|------|-------------------|------------------------|
| Unidirectional transport (files) | FLUTE | IETF [RFC 6726](https://datatracker.ietf.org/doc/rfc6726/) |
| Unidirectional transport (real-time objects) | ROUTE | IETF [RFC 9223](https://datatracker.ietf.org/doc/rfc9223/) |
| Transport building blocks | LCT, ALC, FCAST | IETF [RFC 5651](https://datatracker.ietf.org/doc/rfc5651/), [RFC 5775](https://datatracker.ietf.org/doc/rfc5775/), [RFC 6968](https://datatracker.ietf.org/doc/rfc6968/) |
| Adaptive streaming format | DASH | [ISO/IEC 23009-1](https://www.iso.org/standard/83314.html) |
| Adaptive streaming format | HLS | IETF [RFC 8216](https://datatracker.ietf.org/doc/rfc8216/) |
| Segmented media container | CMAF | [ISO/IEC 23000-19](https://www.iso.org/standard/85623.html) |
| 3GPP DASH profile | 3GP-DASH | [TS 26.247](https://www.3gpp.org/dynareport/26247.htm) |
| DVB DASH profile | DVB-DASH | [ETSI TS 103 285](https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/) |
| 3GPP broadcast delivery (uses FLUTE) | MBMS | [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) |

## How the pieces fit

A typical broadcast/multicast media chain packages content as DASH or HLS using CMAF segments, then carries those segments to receivers over a unidirectional transport: FLUTE for a file-based download model (as in MBMS), or ROUTE for a real-time streaming model (as in ATSC 3.0 ROUTE/DASH). Because CMAF lets DASH and HLS share the same segments, a broadcaster can package once and deliver over either transport and consume with either streaming client. The DASH MPD or HLS playlist is delivered as one of the objects in the FLUTE FDT or ROUTE session, so a receiver reconstructs the manifest and the media from the one-way stream and then plays it exactly as if it had pulled the segments over HTTP.

## 5G-MAG tracking and contribution focus

5G-MAG tracks these transport and format specifications and maintains open-source implementations, notably a FLUTE library used in its 5G Broadcast tools, so that DASH/HLS/CMAF content can be delivered over both 5G Broadcast and 5G MBS. The deeper technical view (session structure, FDT, FEC and object recovery) is on the [Tech portal](/tech/multimedia/multimedia-content-delivery); the reference tooling is described on the [Developer portal](/developer/multimedia). Contributions to this documentation are made through the [5G-MAG Standards repository](https://github.com/5G-MAG/Standards/).

## Related IETF Specifications

This is a list of specifications in the scope of Multimedia Content Delivery Protocols: FLUTE is defined in [IETF RFC 6726](https://datatracker.ietf.org/doc/rfc6726/) and ROUTE in [IETF RFC 9223](https://datatracker.ietf.org/doc/rfc9223/). The table below summarises each transport.

| Protocol | Full name | RFC | Typical use |
|----------|-----------|-----|-------------|
| FLUTE | File Delivery over Unidirectional Transport | RFC 6726 | File delivery in MBMS-based systems |
| ROUTE | Real-time Object delivery over Unidirectional Transport | RFC 9223 | Real-time object delivery in ROUTE/DASH broadcast |

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the ISO/ETSI/3GPP portals block automated access): the specific ISO catalogue editions linked for ISO/IEC 23009-1 (DASH) and ISO/IEC 23000-19 (CMAF), and the current published version of ETSI TS 103 285 (DVB-DASH). The protocol-to-RFC mappings (FLUTE = RFC 6726, ROUTE = RFC 9223, HLS = RFC 8216, and the LCT/ALC/FCAST building blocks) were confirmed. Verify the edition and version numbers against the ISO and ETSI catalogues before publication.
:::

## Related Standards Work

* [Standards: 5G Broadcast](/tech/standards/5g-broadcast)
* [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs)
* [Standards: DVB-I over 5G](/tech/standards/dvb-i)
* [Developer portal: Reference Tools](/developer/multimedia)
* [Technical Documentation: Multimedia Delivery Protocols](/tech/multimedia/multimedia-content-delivery)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
