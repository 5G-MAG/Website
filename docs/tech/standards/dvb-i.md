---
hide_title: true
title: DVB-I Services over 5G Systems
sidebar_position: 9
description: Covers DVB-I service discovery and its deployment over 5G via unicast 5GMS, LTE-based 5G Broadcast, and hybrid delivery modes.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg>
</div>
<div class="topic-banner__text">
<h1>DVB-I Services over 5G Systems</h1>
</div>
</div>

<div class="topic-lead">
Discovering and delivering linear TV services over 5G, combining broadband, broadcast and hybrid modes.
</div>

## Overview

5G-MAG monitors and contributes to work on DVB-I service delivery over 5G systems. DVB-I (Digital Video Broadcasting - Internet) defines mechanisms for internet-connected devices to discover and access sets of linear TV services delivered over broadband or broadcast networks, together with the associated programme metadata. For acronyms used here, see the [Glossary](/tech/glossary).

Delivery of DVB-I services over 5G can use several modes: unicast-based 5G Media Streaming (5GMS), LTE-based 5G Broadcast, and concurrent or hybrid combinations of the two. The DVB / 5G-MAG Joint Task Force documented deployment guidelines for these scenarios in DVB A178, published as ETSI TR 103 972.

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>How DVB-I service discovery works alongside 5G delivery, and the deployment modes in detail.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/dvb-i/dvb-i-5g">Tech: DVB-I Services over 5G Systems</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference implementation for DVB-I service discovery and delivery over 5G.</p>
<ul class="godeeper-card__links">
<li><a href="/reference-tools/dvb-i">DVB-I Services over 5G Systems</a></li>
</ul>
</div>
</div>

</div>

## What this work area covers

DVB-I is a service layer, not a delivery technology. It defines how a client discovers a curated set of linear services and their programme metadata, then leaves the actual media transport to whatever bearer the service references. That separation is what makes DVB-I relevant to 5G-MAG: the same DVB-I service list can point to a DASH manifest fetched over unicast, to a stream delivered by multicast, or to content carried on a broadcast bearer, without the client needing bespoke logic for each network.

The work area has two distinct pieces:

- The DVB-I service discovery and metadata specification itself (DVB A177 / ETSI TS 103 770), which is delivery-agnostic and predates the 5G work.
- The deployment guidance for carrying DVB-I over 5G (DVB A178 / ETSI TR 103 972), produced by the DVB / 5G-MAG Joint Task Force, which explains how DVB-I discovery, DVB delivery formats, and 3GPP transport combine in practice.

5G-MAG's interest is the second piece and its dependencies: mapping DVB-I service parameters onto 3GPP 5G Media Streaming and LTE-based 5G Broadcast, aligning DVB-I service discovery with 3GPP service announcement, and feeding the gaps found during that mapping back into DVB, 3GPP and ETSI.

## Architecture and key concepts

### The DVB-I data model

DVB A177 (ETSI TS 103 770) defines an XML-based data model for describing services and their metadata. The main constructs a standards reader should recognise are:

- **Service List**: an XML document listing the services a provider offers. Each service entry carries identity, logos, and one or more **service instances**.
- **Service Instance**: a specific way to obtain a given service, bound to a delivery parameter set (for example a DASH source, a multicast source, or a broadcast source). A single service can carry several instances, which is the mechanism DVB-I uses to describe the same channel over unicast, multicast, and broadcast at once.
- **Service List Registry (SLR)**: a discovery service that lets a client find service lists (for example by country or by provider) so it can bootstrap without a hard-coded URL. The registry query API is part of TS 103 770.
- **Content Guide / Programme Metadata**: schedule and on-demand programme information, expressed using the DVB metadata schemas (aligned with the TV-Anytime data model), retrievable per service.

The delivery parameters inside a service instance are the extension point that the 5G work builds on, and the client selects among the available instances based on availability and capability.

### DVB delivery formats referenced by the 5G work

- **DVB-DASH** (ETSI TS 103 285): the DVB profile of MPEG-DASH (ISO/IEC 23009-1), constraining segment formats, codecs, and manifest features for interoperable adaptive streaming. This is the primary media format on the unicast path.
- **DVB-MABR** (ETSI TS 103 769): DVB Multicast Adaptive Bit Rate, a functional architecture that delivers adaptive-streaming media over IP multicast in parallel with unicast, so that the client still consumes what looks like a DASH presentation. This is the natural fit for multicast/broadcast bearers.
- **DVB Native IP (DVB-NIP)** (DVB A180): an end-to-end native-IP broadcast system that itself builds on DVB-I for discovery and on DVB-DASH/DVB-MABR for media, referenced as context for IP-based broadcast delivery.

### The two 5G delivery paths

DVB-I over 5G maps onto two 3GPP transport families:

- **5G Media Streaming (5GMS)**, the unicast downlink path, defined primarily by 3GPP TS 26.501 (architecture) and its companion protocol and format specifications. A DVB-I DASH service instance is served through the 5GMS Media Application Server and consumed by a 5GMS-aware client.
- **LTE-based 5G Broadcast**, specified by ETSI TS 103 720 (which profiles the 3GPP LTE terrestrial broadcast / evolved MBMS work), the one-way wide-area path. Here DVB-MABR-style delivery is carried on the broadcast bearer and the DVB-I service instance references the broadcast source.

The concurrent/hybrid case combines both, letting a client fall back between broadcast and unicast, or consume a hybrid service that spans the two.

## Key Specifications

### DVB / ETSI

DVB publishes a specification as a numbered "BlueBook" (for example DVB A177), which is then published in identical technical form by ETSI under an ETSI number. The pairs relevant here are:

| DVB BlueBook | ETSI publication | Topic                                                         |
| ------------ | ---------------- | ------------------------------------------------------------- |
| DVB A177     | ETSI TS 103 770  | Service Discovery and Programme Metadata for DVB-I            |
| DVB A178     | ETSI TR 103 972  | DVB-I service delivery over 5G Systems; Deployment Guidelines |

- [ETSI TS 103 720](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/): 5G Broadcast System for linear TV and radio services
- [DVB A177](https://dvb.org/?standard=service-discovery-and-programme-metadata-for-dvb-i): Service Discovery and Programme Metadata for DVB-I (the main DVB-I specification; published as ETSI TS 103 770)
- [ETSI TS 103 770](https://www.etsi.org/deliver/etsi_ts/103700_103799/103770/): Digital Video Broadcasting (DVB); Service Discovery and Programme Metadata for DVB-I (ETSI-published form of DVB A177)
- [DVB A178](https://dvb.org/?standard=dvb-i-service-delivery-over-5g-systems-deployment-guidelines): DVB-I service delivery over 5G Systems; Deployment Guidelines (broader 5G delivery guidance for DVB-I, not limited to 5G Broadcast; published as ETSI TR 103 972)
- [ETSI TR 103 972](https://www.etsi.org/deliver/etsi_tr/103900_103999/103972/): DVB-I service delivery over 5G Systems; Deployment Guidelines (ETSI-published form of DVB A178; produced by the DVB / 5G-MAG Joint Task Force)

### DVB delivery formats

- [ETSI TS 103 285](https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/): Digital Video Broadcasting (DVB); MPEG-DASH Profile for Transport of ISO BMFF Based DVB Services over IP Based Networks (DVB-DASH; the DVB profile of MPEG-DASH, ISO/IEC 23009-1)
- [ETSI TS 103 769](https://www.etsi.org/deliver/etsi_ts/103700_103799/103769/): Digital Video Broadcasting (DVB); Adaptive media streaming over IP multicast (DVB-MABR)
- [DVB A180](https://dvb.org/?standard=native-ip-broadcasting): Native IP Broadcasting (DVB-NIP), the DVB end-to-end native-IP broadcast system that reuses DVB-I, DVB-DASH and DVB-MABR

### 3GPP

The 5G transport specifications that DVB-I over 5G relies on sit in the 3GPP 26-series (SA4 media codecs and formats). The unicast path is 5G Media Streaming:

- [TS 26.501](https://www.3gpp.org/dynareport/26501.htm): 5G Media Streaming (5GMS); General description and architecture
- [TS 26.512](https://www.3gpp.org/dynareport/26512.htm): 5G Media Streaming (5GMS); Protocols
- [TS 26.511](https://www.3gpp.org/dynareport/26511.htm): 5G Media Streaming (5GMS); Profiles, codecs and formats

For multicast/broadcast transport, the relevant 3GPP work is the 5G Multicast Broadcast Services (MBS) user-service architecture, alongside the LTE-based broadcast profile published by ETSI:

- [TS 26.502](https://www.3gpp.org/dynareport/26502.htm): 5G Multicast-Broadcast User Service Architecture (MBS)
- [TS 23.247](https://www.3gpp.org/dynareport/23247.htm): Architectural enhancements for 5G multicast-broadcast services

## Specifications by role

| Role in DVB-I over 5G                    | Specification(s)                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| Service discovery and programme metadata | DVB A177 / ETSI TS 103 770                                                |
| Deployment guidance for 5G               | DVB A178 / ETSI TR 103 972                                                |
| Commercial requirements input            | DVB C100 (Commercial Requirements for DVB-I over 5G)                      |
| Unicast media format                     | DVB-DASH (ETSI TS 103 285), profiling MPEG-DASH (ISO/IEC 23009-1)         |
| Multicast media delivery                 | DVB-MABR (ETSI TS 103 769)                                                |
| Unicast 5G transport                     | 3GPP 5GMS (TS 26.501, TS 26.512, TS 26.511)                               |
| Broadcast 5G transport                   | ETSI TS 103 720 (LTE-based 5G Broadcast); 3GPP MBS (TS 26.502, TS 23.247) |

## Release and organisation view

DVB-I over 5G spans three standards bodies, so there is no single release line. The dependencies track as follows:

- **DVB**: A177 (published in successive revisions as ETSI TS 103 770) is the stable service-discovery base; A178 (ETSI TR 103 972 V1.1.1, 2023) is a technical report rather than a normative specification, so it records guidance and gaps rather than mandating behaviour. The commercial input came from DVB C100 (2021).
- **3GPP SA4**: the 5GMS architecture (TS 26.501) was introduced in Release 16 and has been extended in later releases; the MBS user-service work (TS 26.502) and the underlying system architecture (TS 23.247) were introduced in Release 17 and continue to evolve.
- **ETSI JTC Broadcast**: the LTE-based 5G Broadcast profile (TS 103 720) has been aligned to successive 3GPP releases, with work items updating it toward Release 18 and Release 19.

Because A178 is a technical report, its main output is a set of recommended changes to specifications owned by DVB, 3GPP and ETSI; the follow-up happens in those bodies rather than in a single DVB-I-over-5G specification.

## Delivery over 5G

DVB A178 (ETSI TR 103 972) maps the commercial requirements for DVB-I over 5G (captured in DVB BlueBook C100, the DVB commercial-requirements document) into a reference architecture and deployment guidance. It addresses three service scenarios:

| Mode                | Bearer                     | Typical use                                                                 |
| ------------------- | -------------------------- | --------------------------------------------------------------------------- |
| Unicast             | 5G Media Streaming (5GMS)  | On-demand and linear services delivered per device over broadband 5G        |
| Broadcast           | LTE-based 5G Broadcast     | One-way, wide-area linear TV and radio to many devices                      |
| Concurrent / hybrid | Both 5GMS and 5G Broadcast | The same service over both bearers, or hybrid DVB-I services combining them |

Across these scenarios the guidelines cover DVB-I service discovery referencing the relevant delivery mode, alignment of DVB-I metadata with 3GPP service announcements, and the use of DVB delivery formats such as DVB-DASH (the DVB profile of MPEG-DASH adaptive streaming) and DVB-MABR (DVB Multicast Adaptive Bit Rate delivery). The report also records gaps identified in existing specifications under the control of DVB, 3GPP and ETSI.

### How discovery meets transport

The consistent pattern across all three scenarios is that DVB-I stays the discovery and selection layer, and the 3GPP/ETSI systems stay the transport layer. In outline:

1. The client bootstraps a DVB-I service list, optionally via a Service List Registry, and parses the service instances.
2. For a unicast (5GMS) instance, the client resolves the referenced DASH presentation and streams it through the 5GMS downlink; 5GMS provides the session handling, edge/AS behaviour, and reporting.
3. For a broadcast instance, the client uses the LTE-based 5G Broadcast bearer (ETSI TS 103 720) to receive a DVB-MABR-style multicast carrying the same DASH content, so the media pipeline above the bearer is the same as for unicast.
4. In the concurrent/hybrid case, both instances are present and the client selects or switches between them based on coverage and capability.

A key alignment point that A178 examines is the relationship between DVB-I service discovery and 3GPP service announcement: on the broadcast path, 3GPP defines its own service announcement mechanism, and the report considers how a DVB-I service list can reference or coexist with that announcement rather than duplicating it.

## 5G-MAG tracking and contribution focus

5G-MAG follows the DVB / 5G-MAG Joint Task Force output and the downstream work in 3GPP and ETSI, and maintains reference tooling that demonstrates DVB-I discovery driving both the 5GMS unicast path and the 5G Broadcast path. The practical focus areas are:

- Keeping the reference client's DVB-I service-instance handling aligned with the delivery parameters used by the 5GMS and 5G Broadcast reference tools.
- Tracking the recommended specification changes from A178 as they are taken up in DVB, 3GPP SA4, and ETSI JTC Broadcast.
- Interoperability between DVB-I discovery and 3GPP service announcement on the broadcast path.

For the implementer-facing view of the reference architecture and procedures, see the [Tech: DVB-I Services over 5G](/tech/dvb-i/dvb-i-5g) page.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): 3GPP TS 26.512 (5GMS Protocols), 3GPP TS 26.502 (5G Multicast-Broadcast User Service Architecture), 3GPP TS 23.247, and the Release placements stated for TS 26.501, TS 26.502 and TS 23.247. The DVB and ETSI document numbers/titles (A177/TS 103 770, A178/TR 103 972, C100, TS 103 720, TS 103 285, TS 103 769, A180) were confirmed against DVB/ETSI sources. Verify all against the 3GPP/ETSI work plan before publication.
:::

## Related Standards Work

- [Standards: 5G Media Streaming](/tech/standards/5gms)
- [Standards: 5G Broadcast](/tech/standards/5g-broadcast)
- [Standards: Multimedia Delivery Protocols](/tech/standards/multimedia)
- [Feedback and Requirements](/standards): how 5G-MAG processes feedback on the specifications it tracks

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
