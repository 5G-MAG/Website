---
title: Operational Parameters in Use
sidebar_position: 1
hide_title: true
description: 'Operational parameter values seen in live and trial LTE-based 5G Broadcast deployments: subframes, bandwidth, modulation, bands.'
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Broadcast - TV, Radio and Emergency Alerts</span>
<h1>Operational Parameters in Use</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## 5G Broadcast - Operational Parameters in Use

This page documents the operational parameters observed in live and trial 5G Broadcast (LTE-based evolved Multimedia Broadcast Multicast Service, eMBMS) deployments and as configured in 5G-MAG reference tool implementations. Where [Deployment Profiles](./deployment-profiles) lists the capabilities a receiver is required to support, this page records the concrete values seen in practice; read the two together.

Terms used in the tables below: MBSFN (Multicast-Broadcast Single Frequency Network); MCCH (Multicast Control Channel); MTCH (Multicast Traffic Channel); Extended CP (Extended Cyclic Prefix, a longer guard interval used to tolerate the larger signal delays of single-frequency-network operation); SFN (Single Frequency Network); MCS (Modulation and Coding Scheme).

## Key Parameters

### Subframe Configuration

| Parameter                 | Typical Value               | Notes                                                          |
| ------------------------- | --------------------------- | -------------------------------------------------------------- |
| MBSFN Subframe Ratio      | 6 out of 8                  | Used in dedicated broadcast mode                               |
| Cyclic Prefix             | Extended CP                 | Required for SFN deployments                                   |
| Subcarrier Spacing (CAS)  | 15 kHz                      | Standard LTE numerology; used in the Cell Acquisition Subframe |
| Subcarrier Spacing (PMCH) | 1.25 / 2.5 / 7.5 / 0.37 kHz | FeMBMS numerology chosen per coverage and mobility target      |

The Cell Acquisition Subframe (CAS) always uses 15 kHz SCS and the standard cyclic prefix, occupying a narrow 15 or 25 PRB (3 or 5 MHz) regardless of the PMCH bandwidth; a receiver acquires on the narrowband CAS and the SIBs then signal the wider PMCH region. One radio frame per 40 ms period (SFN mod 4 == 0) carries the CAS. The PMCH numerology is a deployment choice: 1.25 kHz for high-power high-tower large single-frequency networks, 7.5 kHz for standard-area broadcast, 2.5 kHz for mobile reception (up to around 250 km/h), and 0.37 kHz for the largest SFN areas.

### Channel Bandwidth

| Parameter            | Typical Value                    | Notes                                                                                     |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| PMCH bandwidth       | 6 / 7 / 8 MHz (30 / 35 / 40 PRB) | UHF broadcast bandwidths added in 3GPP Rel-17, signalled by `pmch-Bandwidth-r17` in SIB13 |
| Legacy LTE bandwidth | up to 20 MHz                     | Applies when `pmch-Bandwidth-r17` is absent                                               |

The 6/7/8 MHz PMCH bandwidths align with the UHF broadcast channel rasters used across ITU Regions 1, 2 and 3. When `pmch-Bandwidth-r17` is not present, the legacy LTE bandwidth carried in MIB-MBMS applies.

### Modulation and Coding

| Parameter                 | Value                | Notes                                                                     |
| ------------------------- | -------------------- | ------------------------------------------------------------------------- |
| Modulation                | QPSK, 16-QAM, 64-QAM | Depends on coverage target                                                |
| Modulation (higher-order) | up to 256-QAM        | 256-QAM available on PMCH since Rel-14; Rel-19 adds PMCH MCS Table 11.1-2 |
| Code Rate                 | Variable             | Configured per MTCH                                                       |
| MCCH Period               | 80 ms                | Typical MBSFN area                                                        |

MCS values are configured per MTCH, so a single carrier can carry several services at different robustness/throughput points. The MCCH is re-read at each modification-period boundary so the receiver picks up any TX-side configuration change.

### SFN Synchronisation

| Parameter               | Value                      |
| ----------------------- | -------------------------- |
| Timing Advance Guard    | Depends on SFN radius      |
| Maximum SFN Area Radius | ~100 km (with extended CP) |
| GPS Synchronisation     | Required for SFN alignment |

### Frequency Bands

Bands in active use for LTE-based 5G Broadcast deployments:

- **Band 8** (900 MHz): Used for wide-area rural coverage
- **Band 28** (700 MHz): Primary band for broadcast in several markets
- **Band 107** (UHF): Terrestrial broadcast band added in 3GPP Release 17; profiled by ETSI TS 103 720 v1.2.1
- **Band 108** (UHF, 470 to 698 MHz): Receive-only broadcast band added in 3GPP Release 18; profiled by ETSI TS 103 720 v1.3.1 (in development), for co-existence with digital terrestrial television (DTT)
- **Bands 112 and 113** (UHF, 470 to 608 MHz and 606 to 698 MHz): Receive-only broadcast bands added in 3GPP Release 19, release-independent from Rel-17

## Receiver Profiles

As defined in ETSI TS 103 720, the following receiver profiles are relevant:

- **Profile A (RAN-only)**: Receive-Only Mode using FeMBMS physical layer only. Typical of a dedicated broadcast receiver with no cellular return path, for example a TV set, a set-top box, or an in-car broadcast tuner.
- **Profile B (Full)**: Full LTE UE supporting both unicast and broadcast modes. Typical of a smartphone or connected tablet that can both stream over cellular and receive broadcast.

## References

- [ETSI TS 103 720](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/): 5G Broadcast System for linear TV and radio services
- [5G Broadcast Deployment Profiles](./deployment-profiles)
- [Standards: LTE-based 5G Broadcast](/tech/standards/5g-broadcast)

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the ETSI portal blocks automated access): the Band 107 / 108 / 112 / 113 frequency ranges and their ETSI TS 103 720 version and 3GPP release attributions, and the observed subframe, bandwidth, modulation and SFN parameter values. The Band 108 frequency range (470 to 698 MHz) is now stated consistently here and on the [Deployment Profiles](./deployment-profiles) page; confirm it against the published ETSI TS 103 720 (and 3GPP TS 36.101) before relying on it.
:::
