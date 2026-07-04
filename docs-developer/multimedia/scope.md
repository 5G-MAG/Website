---
title: Scope
hide_title: true
sidebar_position: 0
description: Specifications and architecture diagrams for delivering DASH, HLS, and CMAF content over FLUTE and ROUTE in 5G Broadcast and 5G MBS.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
  <path d="M9 15l3 -3l3 3" />
  <path d="M12 12l0 9" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Multimedia Content Delivery</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This page contains information such as the specifications within the scope of the tools and high-level architectures that bring context to their applicability.

## Overview

Multimedia content delivery protocols carry media files and segments to receivers over broadcast and multicast networks, where there is no per-receiver return channel. 5G-MAG provides reference tools for these application-layer protocols (including FLUTE and ROUTE for file and object delivery) so that content packaged as DASH, HLS or CMAF can be delivered efficiently over both 5G Broadcast and 5G Multicast Broadcast Services (MBS). This page lists the specifications in scope and shows how the tools fit into the broader broadcast and multicast architectures. It is aimed at developers integrating these delivery protocols into a 5G media chain.

## Specifications and technical context

Technical documentation providing context to this project can be found in the link below.

[Tech: 5G Broadcast: TV, Radio and Emergency Alerts](/tech/5g-broadcast)

[Tech: Multicast and Broadcast Services in 5G Networks](/tech/5g-mbs)

A list of relevant specifications can be found in the link below.

[Standards: Multimedia Delivery Protocols](/tech/standards/multimedia)

## High-level architectures

### 5G Broadcast with Multimedia delivery protocols

The diagram below shows the multimedia delivery protocol tools used with the LTE-based 5G Broadcast system, with links to the contributing component repositories.

<img loading="lazy" src="/assets/images/projects/5gbc_diagram.png" alt="Architecture combining the multimedia content delivery protocol tools with the 5G Broadcast system" style="width: 80%">

[5G Broadcast: Repositories](../5g-broadcast/repositories)
[Multimedia content delivery protocols: Repositories](../multimedia/repositories)
[Common Tools: Repositories](../common-tools/)

### 5G Multicast Broadcast Services (MBS) with Multimedia delivery protocols

The diagram below shows the same delivery protocol tools used with 5G Multicast Broadcast Services (MBS), with links to the contributing component repositories.

<img loading="lazy" src="/assets/images/projects/mbs_diagram.png" alt="Architecture combining the multimedia content delivery protocol tools with 5G Multicast Broadcast Services (MBS)" style="width: 80%">

[5G Multicast Broadcast Services: Repositories](../5g-mbs/repositories)
[Multimedia content delivery protocols: Repositories](../multimedia/repositories)
[3GPP RAN and Core Platforms: Repositories](../3gpp-platforms/repositories)
[Common Tools: Repositories](../common-tools/)

## What the tools implement

The multimedia delivery reference tools implement two of these application-layer transports:

* **FLUTE** (File Delivery over Unidirectional Transport) - the file-delivery transport, including the File Delivery Table (FDT) handling and FEC-based recovery. 5G-MAG maintains an open-source FLUTE library used in the 5G Broadcast tools.
* **ROUTE** (Real-Time Transport Object Delivery over Unidirectional Transport) - the real-time object transport, with Source and Repair Flows for low-latency segment delivery.

The tools sit above the media format: they carry DASH/HLS/CMAF segments and manifests as transport objects and are largely agnostic to the codec inside each segment.

## Specifications and releases covered

| Layer | Protocol / format | Defining specification |
|-------|-------------------|------------------------|
| Unidirectional transport (files) | FLUTE | IETF [RFC 6726](https://datatracker.ietf.org/doc/rfc6726/) |
| Unidirectional transport (real-time objects) | ROUTE | IETF [RFC 9223](https://datatracker.ietf.org/doc/rfc9223/) |
| Transport building blocks | LCT / ALC / FCAST | IETF [RFC 5651](https://datatracker.ietf.org/doc/rfc5651/), [RFC 5775](https://datatracker.ietf.org/doc/rfc5775/), [RFC 6968](https://datatracker.ietf.org/doc/rfc6968/) |
| Adaptive streaming format | DASH | ISO/IEC 23009-1 |
| Adaptive streaming format | HLS | IETF [RFC 8216](https://datatracker.ietf.org/doc/rfc8216/) |
| Segmented container | CMAF | ISO/IEC 23000-19 |
| 3GPP broadcast delivery (uses FLUTE) | MBMS | [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) |

The transports are stable IETF RFCs, so there is no 3GPP-style release cadence at the transport layer; the tools track the current RFCs and the ways 5G Broadcast and 5G MBS reference them.

## How the tools map to the standard

FLUTE and ROUTE are both built on the LCT (RFC 5651) and ALC (RFC 5775) building blocks. The FLUTE library implements the FDT-driven file model of RFC 6726: it maps each transport object (by Transport Object Identifier) to a Content-Location that matches the segment or manifest URL, applies FEC, and reconstructs the objects at the receiver. For DASH over MBMS this means the DASH MPD and each segment are delivered as FLUTE objects and reassembled into a playable presentation. The same tools plug into the 5G Broadcast (LTE-based) and 5G MBS architectures shown in the diagrams above.

## Getting started

1. Choose a transport for your delivery model: FLUTE for a file/download model (as in MBMS), ROUTE for a real-time segment model.
2. Package your content as DASH or HLS using CMAF segments so a single set of segments can serve both.
3. Feed the segments and manifest through the delivery tool for your target system (5G Broadcast or 5G MBS), following the architectures above.
4. Build from the [multimedia delivery repositories](../multimedia/repositories); the [Tutorials](./tutorials) page has a demo video and repository pointers.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the ISO/ETSI portals block automated access): the specific ISO catalogue editions for ISO/IEC 23009-1 (DASH) and ISO/IEC 23000-19 (CMAF). The IETF mappings (FLUTE = RFC 6726, ROUTE = RFC 9223, HLS = RFC 8216, LCT = RFC 5651, ALC = RFC 5775, FCAST = RFC 6968) and the use of FLUTE by MBMS (TS 26.346) were confirmed. Verify the ISO editions against the ISO catalogue before publication.
:::

## Related

* [Project Roadmap](./projects) - planned work
* [Software Repositories](./repositories) - the source repositories for these tools
* [Tutorials](./tutorials) - demo video and repository pointers

:::note
Refer to the [multimedia delivery repositories](https://github.com/5G-MAG) on GitHub to use or contribute to these Reference Tools.
:::
