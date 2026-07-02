---
title: Multimedia Delivery Protocols
sidebar_position: 16
---


## Multimedia Delivery Protocols - Tech Resources

## Overview

Multimedia content delivery over broadcast and multicast networks relies on transport protocols that can deliver files and media objects one-way, without a return channel from each receiver. This page covers the reference tooling and technical resources for those protocols, in particular File Delivery over Unidirectional Transport (FLUTE) and Real-time Object delivery over Unidirectional Transport (ROUTE), which underpin 5G-MAG's broadcast and multicast work. 5G-MAG maintains open-source implementations such as the FLUTE library used in the 5G Broadcast tools.

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/22)

The slide deck below introduces the multimedia delivery protocols in scope; download the file for the full detail.

<iframe width="60%" height="520" src="/docs/Reference_Tools_Multimedia_delivery_protocols.pdf"></iframe>

[Download the slidedeck with more information](/docs/Reference_Tools_Multimedia_delivery_protocols.pdf)

---

## Two layers: format and transport

A broadcast/multicast media chain has two separable concerns. The **format** layer packages and addresses media as segments and manifests (DASH, HLS, CMAF). The **transport** layer moves those objects to receivers over a one-way path with no per-receiver return channel (FLUTE, ROUTE). On unicast, a DASH or HLS client pulls segments over HTTP and can retransmit on loss. On a broadcast or multicast bearer there is no acknowledgement path, so the transport layers reliability on top of UDP/IP multicast using Forward Error Correction (FEC) rather than retransmission. 5G-MAG's reference tooling works mainly at the transport layer, delivering DASH-, HLS- or CMAF-packaged content over 5G Broadcast (LTE-based) and 5G Multicast-Broadcast Services (MBS).

## Transport building blocks (LCT, ALC, FEC)

FLUTE and ROUTE are both built on the IETF Reliable Multicast Transport (RMT) building blocks:

* **LCT** (Layered Coding Transport, RFC 5651) defines the common packet header, session and transport-object identification, and congestion-control signalling used by both protocols. Each packet carries a Transport Session Identifier (TSI) and a Transport Object Identifier (TOI).
* **ALC** (Asynchronous Layered Coding, RFC 5775) is the protocol instantiation that combines LCT with an FEC building block and, optionally, layered congestion control. It gives massively scalable one-way delivery: any number of receivers can join without the sender knowing about them.
* **FEC** allows a receiver to recover lost packets from redundancy carried in the stream, which is essential when there is no feedback channel to request retransmission. Both FLUTE and ROUTE carry FEC Object Transmission Information so a receiver knows how to reconstruct each object.

## FLUTE (RFC 6726)

FLUTE (File Delivery over Unidirectional Transport) delivers complete files. Its defining addition on top of ALC is the **File Delivery Table (FDT)**, an in-band XML description that maps each transport object (by TOI) to file metadata: a Content-Location (the URI the file will be known by), Content-Type, length, and FEC parameters. A receiver reads the FDT Instances, learns which objects are being carried, collects the packets for the objects it wants, applies FEC, and reconstructs the files. FLUTE is the file-delivery method of 3GPP MBMS ([TS 26.346](https://www.3gpp.org/dynareport/26346.htm)). When DASH content is delivered over MBMS download delivery, each DASH segment is a FLUTE object and the FDT Content-Location matches the Segment URL in the MPD, so the receiver can reassemble a playable DASH presentation from the one-way stream.

## ROUTE (RFC 9223)

ROUTE (Real-Time Transport Object Delivery over Unidirectional Transport) targets timed media rather than bulk files. It is aligned with FLUTE but adds real-time behaviour: objects are delivered so they can be used as they arrive, which matters for low-latency streaming. ROUTE organises delivery into **Source Flows** (carrying the media objects, per RFC 5775 source data) and optional **Repair Flows** (carrying FEC repair data), and it reuses FCAST (RFC 6968) principles so that object metadata and content can be sent together as a compound object. Timed segments (typically CMAF/DASH segments) are delivered as ROUTE objects with enough signalling for the receiver to hand each segment to the player promptly. ROUTE is the transport used by ATSC 3.0 (ROUTE/DASH) and is supported alongside FLUTE in 5G broadcast/multicast systems.

### FLUTE compared with ROUTE

| Aspect | FLUTE (RFC 6726) | ROUTE (RFC 9223) |
|--------|------------------|------------------|
| Intent | Reliable file download | Real-time timed-object delivery |
| Object model | Files described by an FDT | Timed objects in Source/Repair Flows |
| Latency vs completeness | Completeness first | Timeliness first |
| Metadata carriage | FDT Instances | Compound objects (FCAST-style) plus signalling metadata |
| Typical use | MBMS file/download delivery (TS 26.346) | ATSC 3.0 ROUTE/DASH; low-latency broadcast segments |

Both run over UDP/IP (including multicast IP), both use LCT/ALC and FEC, and both are one-way.

## Formats delivered over these transports

* **DASH** (ISO/IEC 23009-1): a Media Presentation Description (MPD) describes Representations at different bitrates as time-addressable segments. 3GP-DASH ([TS 26.247](https://www.3gpp.org/dynareport/26247.htm)) is the 3GPP profile; DVB-DASH (ETSI TS 103 285) is the DVB profile with additional interoperability constraints (for example excluding multiplexed representations and `SegmentList` addressing). When DASH is broadcast, the MPD itself is delivered as one of the transport objects.
* **HLS** (RFC 8216): M3U8 playlists reference media segments; a receiver that has recovered the playlist and segments from the transport plays them as if fetched over HTTP.
* **CMAF** (ISO/IEC 23000-19): a segmented container derived from the ISO Base Media File Format. A single set of CMAF segments can be referenced by both a DASH MPD and an HLS playlist, so a broadcaster packages once and can deliver over FLUTE or ROUTE and consume with either client. CMAF chunks are also what enable low-latency delivery, which pairs naturally with ROUTE.

## End-to-end flow

Content is encoded, packaged as CMAF segments and described by a DASH MPD or HLS playlist. For a download model the segments and manifest are carried as FLUTE objects (as in MBMS), with FDT Content-Locations matching the manifest URLs. For a real-time model the same segments are carried as ROUTE objects in Source Flows with FEC in Repair Flows (as in ATSC 3.0). At the receiver, FEC recovers any lost packets, the objects are reassembled, the manifest is reconstructed, and the player renders the presentation exactly as if the segments had been pulled over HTTP. This is why the format and transport layers can be developed and reasoned about separately, and why 5G-MAG's FLUTE and ROUTE tooling is format-agnostic above the segment level.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the ISO/ETSI/3GPP portals block automated access): the specific ISO catalogue editions for ISO/IEC 23009-1 (DASH) and ISO/IEC 23000-19 (CMAF), the current ETSI TS 103 285 (DVB-DASH) version, and the specific 3GP-DASH clause structure in TS 26.247. The IETF mappings (FLUTE = RFC 6726, ROUTE = RFC 9223, HLS = RFC 8216, LCT = RFC 5651, ALC = RFC 5775, FCAST = RFC 6968) and the use of FLUTE by MBMS (TS 26.346) were confirmed. Verify remaining edition/version numbers against the ISO and ETSI catalogues before publication.
:::

## Information related to Standards

[Standards](/tech/standards/multimedia)

## Information related to Reference Tools Projects

[Project: Multimedia Content Delivery Protocols](https://hub.5g-mag.com/Getting-Started/pages/multimedia-content-delivery/)
