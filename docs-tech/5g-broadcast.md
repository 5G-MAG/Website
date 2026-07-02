---
hide_title: true
title: 5G Broadcast
sidebar_position: 3
---

<div class="topic-banner" style="--topic-accent: #f97316; --topic-accent-dark: #9a3412;">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<h1>5G Broadcast</h1>
<p>One-to-many delivery of TV, radio and emergency alerts over dedicated LTE-based broadcast carriers.</p>
</div>
</div>

## Overview

This page is the technical entry point for 5G-MAG's work on LTE-based 5G Broadcast: the reference implementations, deployment profiles, operational parameters, and the specifications they build on. It is aimed at engineers and integrators working on the transmitter or receiver side of a broadcast chain. For the standards-tracking view of the same topic, see [Standards: LTE-based 5G Broadcast](/tech/standards/5g-broadcast).

## Introduction

LTE-based 5G Broadcast is a profile of existing 3GPP Long Term Evolution (LTE) specifications that enables one-to-many delivery of TV, radio, and emergency alerts over dedicated broadcast carriers, without requiring a return channel or SIM card on the receiver. It builds on Further evolved Multimedia Broadcast Multicast Service (FeMBMS), itself an evolution of evolved Multimedia Broadcast Multicast Service (eMBMS); the three names refer to the same LTE-based broadcast lineage. ETSI standardises it as TS 103 720, which 5G-MAG actively maintains and extends to cover 3GPP Release 18 and 19 enhancements. The reference tools implement both the transmitter (rt-mbms-tx) and modem/receiver (rt-mbms-modem) sides of the broadcast chain, supporting live deployments and conformance testing.

**Key specifications:** ETSI TS 103 720 (5G Broadcast System for linear TV and radio), 3GPP [TR 36.976](https://www.3gpp.org/dynareport/36976.htm) (LTE-based 5G broadcast overview), 3GPP [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) (MBMS protocols and codecs), 3GPP [TS 26.347](https://www.3gpp.org/dynareport/26347.htm) (MBMS application programming interface).

**Reference tools:** The 5G-MAG software implementation is on the developer portal under [LTE-based 5G Broadcast](/developer/5g-broadcast) and [Emergency Alerts](/developer/emergency-alerts).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The broadcast chain, numerologies and channel bandwidths, plus real-world deployment values.</p>
<ul class="godeeper-card__links">
<li><a href="./5g-broadcast/deployment-profiles">Deployment Profiles</a></li>
<li><a href="./5g-broadcast/parameters-in-use">Operational Parameters in Use</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>Normative 3GPP work items, Change Request history and the release-by-release evolution (Rel-14 to Rel-19).</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/5g-broadcast">Standards: LTE-based 5G Broadcast</a></li>
<li><a href="/tech/standards/5g-broadcast-standards-evolution">Standards Evolution</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference transmitter (rt-mbms-tx) and receiver/modem (rt-mbms-modem) on the Developer Portal.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/5g-broadcast">LTE-based 5G Broadcast</a></li>
<li><a href="/developer/emergency-alerts">Emergency Alerts</a></li>
</ul>
</div>
</div>

</div>

The slide deck below summarises the 5G-MAG reference tools for LTE-based 5G Broadcast (transmitter and receiver chain).

<iframe width="60%" height="520" src="/docs/Reference_Tools_5G_Broadcast.pdf"></iframe>

[Download the Slidedeck](/docs/Reference_Tools_5G_Broadcast.pdf)

## Execution Plan

[Go to the Execution Plan Kanban Board](https://github.com/orgs/5G-MAG/projects/44/views/7)

---

## How the broadcast chain works

A 5G Broadcast receiver has to bootstrap itself from nothing: there's no SIM, no return channel, and no prior connection to the network. The order in which it reads the control channels below is what determines how fast a device can start showing a channel after power-on or after tuning in — the same problem digital TV/radio tuners have always had to solve, just over an LTE-derived physical layer. LTE-based 5G Broadcast is a one-way physical layer built on the LTE TS 36.xxx series. A receiver acquires the cell, reads the broadcast control information, then decodes the multicast traffic channel. There is no uplink and no per-user state.

* **PMCH (Physical Multicast Channel)** carries the broadcast payload. In an MBMS-dedicated cell it occupies almost the whole carrier.
* **CAS (Cell Acquisition Subframe)** is the entry point. One radio frame per 40 ms period (SFN mod 4 == 0) uses 15 kHz SCS with the standard cyclic prefix and carries PSS, SSS, PBCH, PCFICH, PDCCH and PDSCH. The receiver synchronises and decodes MIB-MBMS (on PBCH) and SIB1-MBMS here, without a USIM. The CAS occupies a narrow 15 or 25 PRB (3 or 5 MHz) regardless of the PMCH bandwidth, so the receiver bootstraps narrow and the SIBs then point it at the wider PMCH.
* **MCCH (Multicast Control Channel)** carries the MBSFN (Multicast-Broadcast Single-Frequency Network — multiple cells transmitting the exact same signal in sync, so a receiver combines them as one strong signal instead of seeing interference) area configuration: which services map to which PMCH, MCS, scheduling. It is re-read at each modification-period boundary so the receiver can pick up TX-side changes.
* **MTCH (Multicast Traffic Channel)** is the logical channel that maps the user-service data onto PMCH.

Acquisition order on the receiver, step by step:

1. Synchronise on PSS/SSS in the CAS.
2. Decode PBCH to get MIB-MBMS (bandwidth, SFN, semi-static CFI).
3. Decode SIB1-MBMS (cell access, SI scheduling).
4. Decode SIB13 (MBSFN area info, ROM info, extended bandwidth).
5. Decode MCCH.
6. Decode PMCH/MTCH — the receiver is now showing the channel.

### Numerologies (subcarrier spacings)

The choice of subcarrier spacing (SCS) trades cyclic-prefix length (and therefore maximum SFN reach and mobility tolerance) against overhead. The full set profiled by ETSI TS 103 720 is:

| SCS | 3GPP release | Cyclic prefix (approx.) | Primary use case |
|---|---|---|---|
| 15 kHz | (LTE baseline) | standard | CAS; mixed-mode operation |
| 7.5 kHz | Rel-14 | ~33 microseconds | standard-area broadcast |
| 1.25 kHz | Rel-14 | ~200 microseconds | high-power high-tower, very large SFN |
| 2.5 kHz | Rel-16 | ~100 microseconds | mobile reception (up to ~250 km/h) |
| 0.37 kHz | Rel-16 | ~300 microseconds | very large SFN (inter-site distance up to ~100 km) |

The 0.37 kHz numerology uses a 3 ms slot structure and defines two reference-signal placement variants selected by `timeSeparation` (`sl2` and `sl4`); this is signalled per MBSFN area in `MBSFN-AreaInfo-r16` ([TS 36.331](https://www.3gpp.org/dynareport/36331.htm)). The MBSFN reference-signal patterns for each numerology are defined in [TS 36.211](https://www.3gpp.org/dynareport/36211.htm) clause 6.10.2.2.

### Channel bandwidths

The PMCH can use the standard LTE bandwidths (up to 20 MHz) carried in MIB-MBMS, or the UHF broadcast bandwidths added in Release 17 and signalled by `pmch-Bandwidth-r17` in SIB13:

| `pmch-Bandwidth-r17` | Bandwidth | PRB |
|---|---|---|
| `n30` | 6 MHz | 30 |
| `n35` | 7 MHz | 35 |
| `n40` | 8 MHz | 40 |

When present, `pmch-Bandwidth-r17` overrides the narrowband CAS bandwidth for the PMCH region. Its absence means the legacy LTE bandwidth applies. See [Operational Parameters in Use](./5g-broadcast/parameters-in-use) for the values observed in practice.

## Specifications by 3GPP release

The features below are profiled by ETSI TS 103 720. For the standards-tracking narrative with the version-to-release mapping and the release-by-release table, see [Standards: LTE-based 5G Broadcast](/tech/standards/5g-broadcast). The clause and CR identifiers here come from an internal 5G-MAG standards-tracking document and are consolidated in the "References to verify" note before the Related sections below.

### Release 14 (FeMBMS baseline)

The foundation: the MBMS-dedicated cell (almost 100% of the carrier for broadcast), the 1.25 kHz and 7.5 kHz numerologies with extended cyclic prefix, the CAS frame structure, 256-QAM on PMCH (with the extended TBS table), and the broadcast control blocks MIB-MBMS (`MasterInformationBlock-MBMS-r14`, on PBCH) and SIB1-MBMS (`SIB1-MBMS-r14`). Shorter MCCH repetition and modification periods (down to one radio frame) support faster system-information updates.

### Release 16 (LTE-based 5G Terrestrial Broadcast, normative)

The normative work item adds the 2.5 kHz and 0.37 kHz numerologies and their reference-signal patterns, PDCCH Format 4 (aggregation level 16) for robust control-channel reception, PBCH repetition across CAS subframes for faster MIB acquisition, the `MBSFN-AreaInfo-r16` structure (carrying `subcarrierSpacingMBMS-r16` and `timeSeparation-r16`), the semi-static CFI in MIB-MBMS (`semiStaticCFI-MBMS-r16`), and Receive-Only Mode (ROM) information in SIB13 (`MBMS-ROM-Info-r16`), which lets a receiver be redirected to MBMS content on another carrier without a return channel.

### Release 17 (channel bandwidths, Band 107)

Adds the 6/7/8 MHz PMCH bandwidths (30/35/40 PRB) via `pmch-Bandwidth-r17`, and LTE Band 107 in UHF spectrum, with updated TBS and PMCH resource-allocation tables. This is the release profiled by the published ETSI TS 103 720 v1.2.1 (June 2023), which also defines the Base, Main and 5GMS receiver categories.

### Release 18 (Band 108, receive-only)

A spectrum-layer change only: **Band 108, 470 to 698 MHz** (UHF, downlink only, receive-only), with RF requirements in [TS 36.101](https://www.3gpp.org/dynareport/36101.htm) and [TS 36.104](https://www.3gpp.org/dynareport/36104.htm). There are no new numerologies and no MAC or RRC changes. Band 108 aligns with ETSI TS 103 720 v1.3.1 (in development), not with v1.2.1.

### Release 19 (PMCH Phase 2, CAS muting, new bands)

PMCH Phase 2 adds time interleaving (spreading a transport block across N consecutive subframes for time diversity, with a scheduling window M), frequency interleaving, a per-subframe cyclic shift (different values per cell in an SFN reduce boundary interference), PMCH-specific MCS tables ([TS 36.213](https://www.3gpp.org/dynareport/36213.htm) clause 11.1, Tables 11.1-1 and 11.1-2, the latter extending to 256-QAM), TBS scaling, and extended SI scheduling periods, all carried in a new RRC v1900 extension chain. CAS muting frees synchronisation-channel airtime for PMCH by transmitting PSS/SSS/PBCH only in the active part of each period (`cas-MutingConfig-r19` in a new SIB1-MBMS v1900). Two further receive-only UHF bands, Band 112 (470 to 608 MHz) and Band 113 (606 to 698 MHz), are defined and are release-independent from Release 17. These features align with ETSI TS 103 720 v1.3.1 (in development).

:::caution[References to verify]
The 3GPP TS 36.xxx clause references, Change Request numbers, work-item identifiers and band frequency ranges in the "Specifications by 3GPP release" section come from an internal 5G-MAG standards-tracking document and were not all confirmed against the primary 3GPP or ETSI record. A maintainer should verify these against the official 3GPP record before relying on them (in particular the CR numbers and clause references, and the Band 107 / 108 / 112 / 113 frequency ranges and release placement). The [Standards page](/tech/standards/5g-broadcast) carries the full list of identifiers to check. Well-established references (DASH = ISO/IEC 23009-1; 5GMS = [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) / [TS 26.512](https://www.3gpp.org/dynareport/26512.htm)) do not need re-checking.
:::

---

## Information related to Standards

[Standards: LTE-based 5G Broadcast](/tech/standards/5g-broadcast)

[Standards: Multimedia Delivery Protocols](/tech/standards/multimedia)

[Standards: DVB-I Services over 5G Systems](/tech/standards/dvb-i)

---

## Technical Documentation

The following resources are available:

### General information about 5G Broadcast

#### VideoTech

* [**5G Media Streaming over eMBMS (3GPP Release 17)**](./videos#5g-media-streaming-over-embms-3gpp-release-17)

### Deployment Profiles and Operational Parameters
* [**5G Broadcast Deployment Profiles**](./5g-broadcast/deployment-profiles): the receiver-capability profiles a device is expected to support.
* [**5G Broadcast Operational Parameters in Use**](./5g-broadcast/parameters-in-use): the parameter values observed in live and trial deployments.

:::note
Refer to the [rt-mbms-tx](https://github.com/5G-MAG/rt-mbms-tx) and [rt-mbms-modem](https://github.com/5G-MAG/rt-mbms-modem) repositories to contribute to this documentation.
:::
