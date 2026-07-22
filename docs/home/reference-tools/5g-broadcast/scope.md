---
title: Scope
hide_title: true
sidebar_position: 0
description: Feature support matrix for rt-mbms-tx and rt-mbms-modem across 3GPP Rel-14 to Rel-19, plus architecture diagrams and NTN context.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
  <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
  <path d="M9 21l3 -9l3 9" />
  <path d="M10 19h4" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Broadcast - TV and Radio Services</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/reference-tools/5g-broadcast/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/reference-tools/5g-broadcast/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/reference-tools/5g-broadcast/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="/reference-tools/5g-broadcast/tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This page sets out what is in scope for the 5G Broadcast Reference Tools: the transmitter (rt-mbms-tx) and receiver (rt-mbms-modem), the LTE-based 5G Broadcast radio mode (FeMBMS), and the per-release features they support. It also shows the high-level architectures in which they are used. Use it to check which capabilities are implemented before planning a test. For step-by-step setups, see [Tutorials](./tutorials).

Technical documentation providing context to this project can be found in the link below.

[Tech: 5G Broadcast](/tech/5g-broadcast)

Relevant specifications are listed below.

[Standards: 5G Broadcast](/tech/standards/5g-broadcast)

[Standards: Multimedia Delivery Protocols](/tech/standards/multimedia)

## Features under implementation

### Implementation status (high level)

At the release/feature level, the reference tools rt-mbms-tx (transmitter) and rt-mbms-modem (receiver) implement the LTE-based 5G Broadcast features from 3GPP Release 14 through Release 19:

| 3GPP Release            | Key features                                                                                                    | rt-mbms-tx               | rt-mbms-modem            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------ |
| Rel-14 (EnTV)           | 1.25 / 7.5 kHz SCS; CAS; MBMS-dedicated cell; 256-QAM; MIB-MBMS; SIB1-MBMS                                      | Implemented              | Implemented              |
| Rel-16 (LTE_terr_bcast) | 2.5 / 0.37 kHz SCS; new RS patterns; PDCCH Format 4; MBSFN-AreaInfo-r16; ROM                                    | Implemented              | Implemented              |
| Rel-17 (bands part 1)   | 6/7/8 MHz PMCH bandwidths (30/35/40 PRB); `pmch-Bandwidth-r17`; Band 107                                        | Implemented              | Implemented              |
| Rel-18 (bands part 2)   | Band 108 (470 to 698 MHz, receive-only); RF specs                                                               | Implemented (band table) | Implemented (band table) |
| Rel-19 (PMCH Phase 2)   | Time / frequency interleaving; cyclic shift; PMCH MCS tables; TBS scaling; extended SI periods; RRC v1900 chain | Implemented              | Implemented              |
| Rel-19 (CAS muting)     | CAS muting for PSS / SSS / PBCH; SIB1-MBMS v1900; UE capability                                                 | Implemented              | Implemented              |
| Rel-19 (new bands)      | Bands 112 (470 to 608 MHz) and 113 (606 to 698 MHz)                                                             | Implemented              | Implemented              |

This is a high-level, release-level view. Some items are receive-only or transmit-only by nature (for example UE capability signalling applies on the modem side), and some Release 18/19 band support is at the frequency-lookup and configuration level. For the full standards background, see [Standards: LTE-based 5G Broadcast](/tech/standards/5g-broadcast). The per-feature tables below give a finer breakdown.

### Support of features in rt-mbms-tx and rt-mbms-modem

Status legend: ✅ supported; ❌ not supported; "To check" means the status has not yet been confirmed.

The tables use these recurring 3GPP terms: MBSFN (Multicast-Broadcast Single-Frequency Network, where several cells transmit the same signal in sync); SCS (subcarrier spacing, the frequency gap between subcarriers, in kHz); PRB (Physical Resource Block, the basic unit of radio bandwidth allocation); MIB/SIB (Master/System Information Block, broadcast control information); PDCCH/PBCH/PMCH/PCFICH (Physical Downlink Control / Broadcast / Multicast / Control Format Indicator Channels); CFI (Control Format Indicator); RRC (Radio Resource Control signalling).

#### Release 14 features

| Feature                                         | rt-mbms-tx | rt-mbms-modem |
| ----------------------------------------------- | ---------- | ------------- |
| MBSFN subframes using SCS = 1.25 kHz            | ✅         | ✅            |
| MIB-MBMS                                        | ✅         | ✅            |
| SIB1-MBMS                                       | ✅         | ✅            |
| MBMSInterestIndication RRC signalling procedure | To check   | To check      |

#### Release 16 features

| Feature                                                                      | rt-mbms-tx | rt-mbms-modem |
| ---------------------------------------------------------------------------- | ---------- | ------------- |
| MBSFN subframes using SCS = 0.37 kHz                                         | ✅         | ✅            |
| MBSFN subframes using SCS = 2.5 kHz                                          | ✅         | ✅            |
| PDCCH enhancements: CFI indication in MIB to avoid the need to decode PCFICH | ✅         | ✅            |
| PDCCH enhancements: New aggregation level 16 (PDCCH Format 4)                | ✅         | ✅            |
| Repetition of PBCH                                                           | ✅         | ✅            |
| MBSFN-AreaInfo-r16 (subcarrierSpacing, timeSeparation)                       | ✅         | ✅            |
| Receive-Only Mode (ROM) redirect                                             | ✅         | ✅            |

#### Release 17 features

| Feature                                                          | rt-mbms-tx | rt-mbms-modem |
| ---------------------------------------------------------------- | ---------- | ------------- |
| PMCH bandwidth of 30, 35 and 40 PRBs (corresponding to 6/7/8MHz) | ✅         | ✅            |
| Band 107 (UHF)                                                   | ✅         | ✅            |

#### Release 18 features

| Feature                                 | rt-mbms-tx | rt-mbms-modem |
| --------------------------------------- | ---------- | ------------- |
| Band 108 (470 to 698 MHz, receive-only) | ✅         | ✅            |

#### Release 19 features

| Feature                               | rt-mbms-tx | rt-mbms-modem |
| ------------------------------------- | ---------- | ------------- |
| PMCH time interleaving (N subframes)  | ✅         | ✅            |
| PMCH frequency interleaving           | ✅         | ✅            |
| PMCH cyclic shift                     | ✅         | ✅            |
| PMCH MCS tables 11.1-1 / 11.1-2       | ✅         | ✅            |
| Extended SI scheduling periods        | ✅         | ✅            |
| CAS muting (PSS / SSS / PBCH)         | ✅         | ✅            |
| Bands 112 and 113 (UHF, receive-only) | ✅         | ✅            |

### Support of features for rt-mbms-tx-for-qrd-and-crd

Note that the 5G Broadcast Transmitter for QRD (Qualcomm Reference Design) and CRD (Commercial Reference Design) is an extension of an MBMS-enabled eNodeB tailored to operate as
a 5G Broadcast transmitter. Only MBMS/Unicast-mixed cell is supported alongside pre-Rel-14 features.

## High-level architectures

### 5G Broadcast with Multimedia delivery protocols

The diagram below shows the 5G Broadcast tools combined with the multimedia delivery protocols (FLUTE-based file delivery), from transmitter through to receiver.

<img loading="lazy" src="/assets/images/projects/5gbc_diagram.png" alt="Architecture combining the 5G Broadcast transmitter and modem with FLUTE-based multimedia delivery protocols" style="width: 80%">

Repositories used in this architecture:

- [5G Broadcast: Resources](../5g-broadcast/resources)
- [Multimedia content delivery protocols: Resources](../multimedia/resources)
- [Common Tools: Repositories](../common-tools/)

### 5G Downlink Media Streaming (5GMSd) over eMBMS

This second diagram shows 5G Downlink Media Streaming (5GMSd) delivered over eMBMS (enhanced Multimedia Broadcast Multicast Service), combining the 5G Media Streaming tools with the broadcast chain.

<img loading="lazy" src="/assets/images/projects/5gms_5gbc_diagram.png" alt="Architecture delivering 5G Downlink Media Streaming (5GMSd) over the eMBMS broadcast bearer" style="width: 80%">

Repositories used in this architecture:

- [5G Media Streaming: Resources](../5gms/resources)
- [5G Broadcast: Resources](../5g-broadcast/resources)
- [Multimedia content delivery protocols: Resources](../multimedia/resources)
- [3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)
- [Common Tools: Repositories](../common-tools/)

## NTN deployment context

The 5G Broadcast waveform (FeMBMS, defined in ETSI TS 103 720) is relevant to **Non-Terrestrial Network (NTN)** delivery scenarios, in particular GEO (Geostationary Earth Orbit) satellite broadcast of linear TV and radio content to large coverage areas. Because 5G Broadcast needs no return channel from the receiver, it fits the one-way, wide-area reach of a GEO satellite well. The NTN access layer sits beneath the broadcast service layer; the rt-mbms-tx and rt-mbms-modem tools remain the applicable reference implementations.

- [Tech: MBS Broadcast over NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn)
- [Tech: Non-Terrestrial Networks (overview)](/tech/ntn)
- [Standards: Non-Terrestrial Networks](/tech/standards/ntn)

## Getting started

A practical route into the tools:

1. Start with [SDR - HLS Playback over 5G Broadcast](./tutorials/hls-playback-5gbc) in the [Tutorials](./tutorials) index, the simplest receiver-only setup; the other tutorials there build on the same components (transmitter, Docker, Android seamless switching).
2. Check the [Resources](./resources) page for tagged versions of rt-mbms-tx and rt-mbms-modem.
