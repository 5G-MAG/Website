---
title: Operational Parameters in Use
hide_title: true
description: 'Operational parameter values seen in live and trial LTE-based 5G Broadcast deployments: subframes, bandwidth, modulation, bands.'
sidebar_label: "Operational Parameters in Use"
sidebar_position: 2
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Media delivery over 5G Broadcast</span>
<h1>Operational Parameters in Use</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## 5G Broadcast - Operational Parameters in Use

This page documents the operational parameters observed in live and trial 5G Broadcast (LTE-based evolved Multimedia Broadcast Multicast Service, eMBMS) deployments and as configured in 5G-MAG reference tool implementations. Where [Deployment Profiles](/tech/5g-broadcast/more/deployment-profiles) lists the capabilities a receiver is required to support, this page records the concrete values seen in practice; read the two together.

Terms used in the tables below: MBSFN (Multicast-Broadcast Single Frequency Network); MCCH (Multicast Control Channel); MTCH (Multicast Traffic Channel); Extended CP (Extended Cyclic Prefix, a longer guard interval used to tolerate the larger signal delays of single-frequency-network operation); SFN (Single Frequency Network); MCS (Modulation and Coding Scheme) (ETSI TS 103 720 V1.2.1 clause 3.3; TS 36.300 V19.2.0 clause 3.2).

## Key Parameters

### Subframe Configuration

| Parameter                 | Typical Value               | Notes                                                          |
| ------------------------- | --------------------------- | -------------------------------------------------------------- |
| MBSFN Subframe Ratio      | 6 out of 8                  | Example value from member deployments and reference tool configurations, not from the specifications. In an MBMS-dedicated cell the MBSFN subframes can be fully allocated to MBMS, with a 2.5 % capacity loss for the Cell Acquisition Subframe (ETSI TS 103 720 V1.2.1 clauses 6.4.2 and 11.3.1) |
| Cyclic Prefix             | Extended CP                 | Required for SFN deployments. PMCH cyclic prefix is 16.6 microseconds (15 kHz) to 300 microseconds (0.37 kHz), by numerology (ETSI TS 103 720 V1.2.1 table 6.4.4-1; TS 36.211 V19.3.0 table 6.12-1) |
| Subcarrier Spacing (CAS)  | 15 kHz                      | Standard LTE numerology; used in the Cell Acquisition Subframe (ETSI TS 103 720 V1.2.1 clause 6.4.2) |
| Subcarrier Spacing (PMCH) | 1.25 / 2.5 / 7.5 / 0.37 kHz (15 kHz also defined) | FeMBMS numerology chosen per inter-site distance, coverage and mobility target (ETSI TS 103 720 V1.2.1 table 6.4.4-1; ETSI TS 103 720 V1.2.1 clause 5.13) |

The Cell Acquisition Subframe (CAS) always uses 15 kHz SCS with a normal or extended cyclic prefix; for 6, 7 and 8 MHz PMCH bandwidths it occupies a narrow 15 or 25 PRB (3 or 5 MHz), a receiver acquires on the narrowband CAS and the SIBs then signal the wider PMCH bandwidth (ETSI TS 103 720 V1.2.1 clause 6.4.2; ETSI TS 103 720 V1.2.1 clause 7.3.2; ETSI TS 103 720 V1.2.1 clause 5.5.4). The CAS is transmitted with a 40 ms periodicity (MIB-MBMS in subframe 0 of radio frames with SFN mod 4 == 0) (ETSI TS 103 720 V1.2.1 clause 6.4.2; TS 36.331 V19.4.0 clause 5.2.1.2). The PMCH numerology is at the discretion of the service provider: 1.25 kHz for larger-than-cellular inter-site distances at low-to-moderate mobility, 2.5 kHz for mobile reception (up to around 250 km/h), and 0.37 kHz for the largest SFN areas (inter-site distance up to 125 km) (ETSI TS 103 720 V1.2.1 clause 5.13; TR 36.976 V19.0.0 clause 4.2).

### Channel Bandwidth

| Parameter            | Typical Value                    | Notes                                                                                     |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| PMCH bandwidth       (TR 36.976 V19.0.0 clause 4.3; TS 36.331 V19.4.0 clause 6.3.7; TS 36.331 V19.4.0 clause 6.3.1; ETSI TS 103 720 V1.2.1 clause 7.3.2) | 6 / 7 / 8 MHz (30 / 35 / 40 PRB) | UHF broadcast bandwidths added in 3GPP Rel-17, signalled by `pmch-Bandwidth-r17` in SIB13 |
| Legacy LTE bandwidth (ETSI TS 103 720 V1.2.1 clause 8; TS 36.331 V19.4.0 clause 6.2.2; TS 36.213 V19.5.0 clause 11.1) | up to 20 MHz                     | Applies when `pmch-Bandwidth-r17` is absent                                               |

The 6/7/8 MHz PMCH bandwidths correspond to the channels of 6, 7 or 8 MHz, depending on the region, in which broadcast UHF spectrum is typically channelized (TR 21.917 V17.0.0 clause 14.2.1). When `pmch-Bandwidth-r17` is not present, the legacy LTE bandwidth carried in MIB-MBMS applies (TS 36.213 V19.5.0 clause 11.1; TS 36.331 V19.4.0 clause 6.2.2).

### Modulation and Coding

| Parameter                 | Value                | Notes                                                                     |
| ------------------------- | -------------------- | ------------------------------------------------------------------------- |
| Modulation                (TS 36.211 V19.3.0 table 6.3.2-1; ETSI TS 103 720 V1.2.1 clause 11.3.1) | QPSK, 16-QAM, 64-QAM | Depends on coverage target                                                |
| Modulation (higher-order) | up to 256-QAM        | Available on PMCH since Rel-12, selected via TS 36.213 V19.5.0 clause 11.1 (Table 7.1.7.1-1A, or Table 11.1-2 when `timeSeparation` is 4) (TS 36.213 V19.5.0 table 7.1.7.1-1A; TS 36.213 V19.5.0 clause 11.1; TS 36.211 V19.3.0 annex A) |
| Code Rate                 | Variable             | Configured per PMCH (`dataMCS`), which carries one or more MTCHs (TS 36.331 V19.4.0 clause 6.3.7; TS 36.300 V19.2.0 clause 15.3.3) |
| MCCH Period               | 80 ms                | Example value observed in member deployments. 80 ms is 8 radio frames (rf8); the MCCH repetition period can be rf1 to rf256 and the modification period rf1 to rf1024 radio frames (TS 36.331 V19.4.0 clause 6.3.7) |

MCS values are configured per PMCH (`dataMCS`), so a single carrier can carry several services at different robustness/throughput points (TS 36.331 V19.4.0 clause 6.3.7; TS 36.300 V19.2.0 clause 15.3.3). The MCCH is re-read at each modification-period boundary so the receiver picks up any TX-side configuration change (TS 36.331 V19.4.0 clause 5.8.1.3).

### SFN Synchronisation

| Parameter               | Value                      |
| ----------------------- | -------------------------- |
| Maximum inter-site distance | up to 125 km (0.37 kHz numerology) (ETSI TS 103 720 V1.2.1 clause 5.13; TR 36.976 V19.0.0 clause 4.2) |
| Radio-frame timing synchronisation | Synchronised radio-frame timing across all eNBs of an MBSFN Synchronization Area, with the SYNC protocol; the clause does not name GPS (TS 36.300 V19.2.0 clause 15.3.3) |

### Frequency Bands

Bands defined for LTE-based 5G Broadcast (TS 36.104 V19.2.0 clause 5.5; TS 36.101 V20.1.0 clause 5.5H):

- **Band 107** (UHF, 612 to 652 MHz): Receive-only broadcast band, first defined in the Release 18 version of 3GPP TS 36.101 and made release-independent from Release 17 via TS 36.307
- **Band 108** (UHF, 470 to 698 MHz): Receive-only broadcast band added alongside Band 107 in 3GPP Release 18 (TS 36.101 V20.1.0 table 5.5H-1; TS 36.101 V20.1.0 annex J)
- **Bands 112 and 113** (UHF, 470 to 608 MHz and 606 to 698 MHz): Receive-only broadcast bands added in 3GPP Release 19, release-independent from Release 17 (TS 36.101 V20.1.0 table 5.5H-1; TS 36.101 V20.1.0 annex J; TS 36.307 V20.0.0 clause 3A)

All four bands are defined as standalone downlink-only (SDO) bands in Table 5.5H-1 of 3GPP TS 36.101. The published ETSI TS 103 720 v1.2.1 does not yet include specific frequency bands; its clause 8 (ETSI TS 103 720 V1.2.1 clause 8) expects band details in a future revision (TS 36.101 V20.1.0 table 5.5H-1; ETSI TS 103 720 V1.2.1 clause 8).

Bands observed in member deployments and reference tool configurations (not taken from the specifications):

- **Band 8** (900 MHz): Used for wide-area rural coverage
- **Band 28** (700 MHz): Primary band for broadcast in several markets

## Receiver Profiles

ETSI TS 103 720 defines receiver categories (Base, Main, 5GMS and Emergency Alerts; see Deployment Profiles for the Feature Value table) (ETSI TS 103 720 V1.2.1 clause 10). In 5G-MAG's deployment work the following two kinds of receiver are distinguished (they are not the "Profile A" of the [deployment profiles](/tech/5g-broadcast/more/deployment-profiles) page, which is a proposal for European handsets):

- **RAN-only receiver**: Receive-Only Mode using FeMBMS physical layer only. Typical of a dedicated broadcast receiver with no cellular return path, for example a TV set, a set-top box, or an in-car broadcast tuner.
- **Full receiver**: Full LTE UE supporting both unicast and broadcast modes. Typical of a smartphone or connected tablet that can both stream over cellular and receive broadcast.

## References

- [ETSI TS 103 720](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/): 5G Broadcast System for linear TV and radio services
- [5G Broadcast Deployment Profiles](/tech/5g-broadcast/more/deployment-profiles)
- [Standards: Media delivery over 5G Broadcast](/standards/5g-broadcast)

<details>
<summary>Sources</summary>

The band frequency ranges and release attributions above are from 3GPP TS 36.101 (Table 5.5H-1), TS 36.307 and ETSI TS 103 720 v1.2.1. The subframe, bandwidth, modulation and SFN parameter values are those observed in member deployments and reference tool configurations.

</details>