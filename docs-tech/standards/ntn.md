---
hide_title: true
title: Non-Terrestrial Networks
sidebar_position: 13
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Non-Terrestrial Networks</h1>
<p>5G-MAG investigates media distribution over Non-Terrestrial Networks (NTN), including satellite and high-altitude platform stations (HAPS).</p>
</div>
</div>

## Overview

5G-MAG investigates media distribution over Non-Terrestrial Networks (NTN), including satellite and high-altitude platform stations (HAPS). NTN extends 5G coverage to underserved areas and supports large-scale broadcast distribution to fixed and mobile devices.

:::tip
New to the service layers that NTN carries? Multicast-Broadcast Services (MBS) and 5G Broadcast are the delivery mechanisms most often deployed over satellite paths. See [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs) and [Standards: 5G Broadcast](/tech/standards/5g-broadcast) for background before reading this page.
:::

## Key 3GPP Specifications

### NR for NTN

These specifications adapt the New Radio (NR) air interface so that it can cope with the long propagation delays, Doppler shift and moving cells that satellite and HAPS links introduce.

* [TR 38.811](https://www.3gpp.org/dynareport/38811.htm): Study on New Radio (NR) to support Non-Terrestrial Networks. The foundational Release 15 study item that defined NTN deployment scenarios (GEO, MEO, LEO, HAPS), channel models and the impairments the air interface has to handle.
* [TR 38.821](https://www.3gpp.org/dynareport/38821.htm): Solutions for NR to support Non-Terrestrial Networks (NTN). The Release 16 study that worked out the physical-layer, protocol and architecture solutions (timing advance, Doppler pre-compensation, HARQ, feeder/service link handling) later carried into normative work.
* [TS 38.331](https://www.3gpp.org/dynareport/38331.htm): NR; Radio Resource Control (RRC); Protocol specification. Carries the NTN system information blocks, notably SIB19 (NTN assistance information: satellite ephemeris, common timing advance, the k-offset and the epoch time and validity window used for uplink synchronisation).
* [TS 38.300](https://www.3gpp.org/dynareport/38300.htm): NR; NR and NG-RAN Overall description; Stage 2. Describes NTN at architecture level, including the transparent payload deployment and the Satellite Access Node (SAN) concept.
* [TR 38.863](https://www.3gpp.org/dynareport/38863.htm): Non-terrestrial networks (NTN) related RF and co-existence aspects. The Release 17 study underpinning the RF and coexistence requirements for NTN UE and satellite access nodes in FR1.

3GPP added transparent-payload NR NTN as normative work in Release 17, supporting GEO, MEO and LEO orbits and HAPS, with GNSS assumed at the UE so it can pre-compensate the large timing advance and Doppler on the service link. Release 18 (5G-Advanced) and Release 19 continued the work, adding items such as coverage and mobility enhancements and, in later releases, regenerative-payload (on-board gNB) scenarios. Confirm the exact release placement of individual features against the 3GPP work plan.

### System Architecture for NTN

These studies define how satellite access is integrated into the 5G system architecture, covering registration, mobility and the interfaces between the satellite segment and the 5G core.

* [TR 22.822](https://www.3gpp.org/dynareport/22822.htm): Study on using Satellite Access in 5G. The stage 1 study that captured use cases and service requirements for satellite integration.
* [TR 23.737](https://www.3gpp.org/dynareport/23737.htm): Study on architecture aspects for using satellite access in 5G. The stage 2 study spanning Release 16 and 17 that identified the key issues and candidate solutions for integrating satellite access into the 5G system.
* [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System architecture for the 5G System (5GS). Carries the NTN-related additions to the reference architecture (for example satellite backhaul and NTN access as an access type).
* [TS 23.502](https://www.3gpp.org/dynareport/23502.htm): Procedures for the 5G System (5GS). Carries the registration, mobility and session-management procedures that NTN access reuses and extends.

:::caution[Verify spec number]
This entry was changed by automated review from TR 22.837 to TR 22.822 and is not yet confirmed against the 3GPP portal. TR 22.837 was identified as the Integrated Sensing and Communication study (unrelated to satellite access). Confirm TR 22.822 is the intended satellite-access study before publication.
:::

### Media Distribution over NTN

This study looks specifically at how media services behave over NTN paths and what the service layers need to account for on satellite delivery.

* [TR 26.968](https://www.3gpp.org/dynareport/26968.htm): Study on media distribution over NTN

:::caution[Needs verification]
The existence of TR 26.968 in the 3GPP 26-series could not be confirmed. Verify against the current SA4 work plan before relying on this reference.
:::

### Multicast-Broadcast Services over NTN

NTN does not define its own media service layer. Media is carried over NTN using the same 5G service layers used on the ground, principally MBS (Multicast-Broadcast Services). The relevant specifications are therefore the MBS ones, applied over a satellite or HAPS access.

* [TS 23.247](https://www.3gpp.org/dynareport/23247.htm): Architectural enhancements for 5G multicast-broadcast services. Defines MBS delivery mode 1 (multicast, higher QoS, RRC_CONNECTED devices) and delivery mode 2 (broadcast, receivable in RRC_IDLE and RRC_INACTIVE as well as RRC_CONNECTED).
* [TS 26.502](https://www.3gpp.org/dynareport/26502.htm): 5G multicast-broadcast user services; Protocols and formats. The SA4 user-service layer above the MBS transport.
* [TS 26.501](https://www.3gpp.org/dynareport/26501.htm): 5G Media Streaming (5GMS); General description and architecture. The media delivery architecture that MBS user services extend for multicast and broadcast.

Applying MBS over NTN is the subject of active work in Release 19 and beyond. Broadcast over geostationary (GSO) and non-geostationary (NGSO) orbits, then multicast over the same, have been discussed as separable steps. Because this work is still being defined, treat orbit-by-orbit and mode-by-mode feature placement as provisional and verify against the current work plan.

## How NTN Fits the 5G System

NTN is an access option for the 5G system, not a parallel network. The core network, the service layers and, as far as possible, the NR protocol stack are reused; the differences are concentrated at the radio and in a few architecture roles.

**Payload types.** In a *transparent* (bent-pipe) payload the base station (gNB, referred to in NTN terms as a Satellite Access Node) sits on the ground; the satellite only relays and frequency-translates the signal between the *feeder link* (satellite to ground station) and the *service link* (satellite to device). In a *regenerative* payload the gNB function, or part of it, is carried on board the spacecraft. Release 17 standardised the transparent case; regenerative scenarios are addressed in later releases. Confirm exact release placement against the work plan.

**Orbits.** GEO satellites sit at a fixed point relative to the ground (about 35,786 km up), cover a wide area and add a one-way propagation delay of roughly 120 to 140 ms on the service-plus-feeder path. LEO satellites (hundreds to ~2,000 km) give much lower delay but move quickly overhead, so cells (beams) sweep across the ground and handovers are frequent. MEO sits between the two. HAPS operate in the stratosphere and behave more like a very high tower. These differences drive the media design choices below.

**What the radio has to solve.** The long, variable propagation delay, the large Doppler shift on fast NGSO links, and the moving coverage all have to be handled. The main mechanisms are: satellite ephemeris and timing/frequency pre-compensation signalled to the device (via SIB19), a GNSS-capable device that computes its own timing advance and Doppler correction, HARQ and timer adaptations for the long round trip, and mobility handling for beams that move relative to the ground.

## Media Delivery Considerations over NTN

For media services, the orbit and payload choices translate into concrete service-layer considerations:

* **One-to-many efficiency.** A single wide beam can cover a large population, which suits broadcast (MBS delivery mode 2) and shared multicast (delivery mode 1 over point-to-multipoint). Spectrum is the scarce resource on satellite, so serving many devices from one transmission is attractive.
* **Latency and interactivity.** GEO's round trip makes tightly interactive services and chatty acknowledgement-based protocols harder; it favours linear, one-directional and delay-tolerant media. LEO's lower latency is friendlier to interactive and adaptive streaming, at the cost of frequent handovers.
* **Reliability without a fast return path.** Application-layer forward error correction and object-based delivery (for example FLUTE over ROUTE/LCT for file and DASH-segment delivery) reduce reliance on retransmission, which is expensive over long satellite paths.
* **Mobility and session continuity.** Media sessions must survive beam-to-beam, satellite-to-satellite and satellite-to-terrestrial transitions. The 5G-MAG analysis (see the technical pages) treats lossless handover for multicast groups as a distinct problem from unicast handover, because the whole group, or its edge devices, may move at once.

## NTN Deployment Scenarios for Media

The three scenarios below differ mainly in orbit type, delivery mode and the media use they best support. Geostationary Earth Orbit (GEO) satellites sit at a fixed point relative to the ground and cover a wide area; Low Earth Orbit (LEO) satellites move quickly overhead and give lower latency at the cost of more frequent handovers.

| Scenario | Orbit | Delivery mode | Typical media use |
| --- | --- | --- | --- |
| GEO satellite broadcast | Geostationary | Broadcast (one-to-many) | Wide-area linear content to many fixed and mobile 5G devices |
| LEO satellite unicast | Low Earth Orbit | Unicast | Mobile broadband streaming to individual devices |
| Hybrid NTN/Terrestrial | Mixed | Either, with handover | Continuous coverage as devices move between satellite and ground-based 5G cells |

## Specifications by Role

The table groups the key specifications by the part of the system they govern, which is often more useful than grouping by number.

| Role | Specifications | What they cover for NTN |
| --- | --- | --- |
| Radio access (NR NTN) | TR 38.811, TR 38.821, TR 38.863, TS 38.300, TS 38.331 | Air-interface adaptations, timing/Doppler pre-compensation, SIB19 assistance, RF and coexistence |
| System architecture | TR 22.822, TR 23.737, TS 23.501, TS 23.502 | Integrating satellite access into the 5G system, registration, mobility, session management |
| MBS transport | TS 23.247 | Delivery mode 1 (multicast) and mode 2 (broadcast) reused over NTN |
| Media service layer | TS 26.501, TS 26.502 | 5G Media Streaming and MBS user services carried over NTN paths |
| Alternative broadcast waveform | ETSI TS 103 720 | LTE-based 5G Broadcast for GEO linear TV and radio |

## 5G-MAG Tracking and Contribution Focus

5G-MAG treats NTN as a delivery infrastructure for existing media service layers rather than a separate system, and its analysis concentrates on the parts that NTN genuinely changes:

* Multicast-Broadcast Services (MBS) broadcast delivery over NTN (GEO and LEO)
* Multicast session management and delivery-mode switching (PTP/PTM) under NTN mobility
* Delay-tolerant, application-layer FEC based media delivery over long satellite paths
* Lossless handover and session continuity for multicast groups across beams, satellites and the terrestrial/non-terrestrial boundary

See the [Technical Documentation: Non-Terrestrial Networks](/tech/ntn) page for the detailed analysis documents that develop these topics.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 26.502 title, TR 38.863 release placement, the release placement of individual Release 18/19 NTN and MBS-over-NTN features, GEO one-way propagation delay figures. Verify against the 3GPP/ETSI work plan before publication.
:::

## Related Standards Work

* [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs): MBS Multicast and Broadcast are the primary service layers deployed over NTN
* [Standards: 5G Broadcast](/tech/standards/5g-broadcast): ETSI TS 103 720 defines the 5G Broadcast system (FeMBMS) that can operate over satellite NTN delivery paths
* [ETSI TS 103 720](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/): 5G Broadcast System for Linear TV and Radio Services; relevant for GEO satellite broadcast delivery scenarios

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository for 5G-MAG contributions on NTN.
:::
