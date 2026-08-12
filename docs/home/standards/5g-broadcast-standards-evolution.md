---
hide_title: true
title: 5G Broadcast - Standards Evolution
slug: /standards/5g-broadcast-standards-evolution
description: Release-by-release detail on 3GPP work items, Change Requests and RAN meetings behind LTE-based 5G Broadcast, Releases 14 to 19.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>5G Broadcast - Standards Evolution</h1>
</div>
</div>

<div class="topic-lead">
Release-by-release detail on the 3GPP work items, Change Requests and RAN meetings behind LTE-based 5G Broadcast.
</div>

This page is the detailed, release-by-release companion to [Standards: 5G Broadcast](/standards/5g-broadcast): the work items, Change Requests and RAN meetings behind each release. See that page for the ETSI TS 103 720 overview, the full specification list and current capabilities. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The deeper technical treatment of 5G Broadcast delivery and receiver behaviour.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/5g-broadcast">Tech: 5G Broadcast</a></li>
</ul>
</div>
</div>

</div>

LTE-based 5G Broadcast is not a single 3GPP work item but the accumulation of several, each adding capability to the same LTE physical layer (the TS 36.xxx series). The normative 3GPP work item **LTE_terr_bcast** was approved at RAN#83 (March 2019); the Release 14 features it builds on predate it. See [Standards: 5G Broadcast](/standards/5g-broadcast#about-etsi-ts-103-720---5g-broadcast-system-for-linear-tv-and-radio-services) for how each 3GPP release maps to an ETSI TS 103 720 version.

## Release-by-release summary



| 3GPP Release | Key additions |
| ------------ | ------------- |
| Rel-14 | 1.25 kHz and 7.5 kHz subcarrier spacing (SCS); Cell Acquisition Subframe (CAS); MBMS-dedicated cell; 256-QAM for PMCH; MIB-MBMS; SIB1-MBMS |
| Rel-16 | 2.5 kHz and 0.37 kHz SCS; new reference-signal patterns; PDCCH Format 4 (aggregation level 16); MBSFN-AreaInfo-r16; Receive-Only Mode (ROM) |
| Rel-17 | 6/7/8 MHz PMCH channel bandwidths (30/35/40 PRB); Band 107 (612 to 652 MHz, downlink-only) named here, but its TS 36.101 band-table entry and receiver requirements were not written until Release 18 (see below). |
| Rel-18 | Band 108 (470 to 698 MHz, receive-only) and Band 107's TS 36.101/36.104 entries and receiver requirements, both introduced and completed here (CR 6016 to CR 6067, September 2023 to December 2024; see below). |
| Rel-19 | PMCH time interleaving and frequency interleaving; cyclic shift; PMCH MCS tables 11.1-1 / 11.1-2; TBS scaling; extended SI periods; RRC v1900 extension chain |
| Rel-19 | CAS muting for PSS / SSS / PBCH; SIB1-MBMS v1900; new UE capability |
| Rel-19 | Bands 112 (470 to 608 MHz) and 113 (606 to 698 MHz); RF specifications in TS 36.101; release-independent from Rel-17. A companion CR separately makes Bands 107/108 release-independent from Rel-17. |

### Work items behind each release

The work item records above are listed separately so the summary stays readable; each release section below explains what its work item delivered.

| 3GPP Release | Work item (parent, then children) |
| ------------ | --------------------------------- |
| Rel-14 | **Parent:** [700032 EnTV](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=700032)<br/>**Children:** [670010 Study](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=670010), [720015 Architecture](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=720015), [730052 Mobile Network Interface](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=730052), [740049 Stage 3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=740049), [740060 Codec](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=740060) |
| Rel-16 | **Parent:** [830076 LTE_terr_bcast](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830076)<br/>**Children:** [800091 Study](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=800091), [830176 Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830176), [830276 Perf.](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830276) |
| Rel-17 | **Parent:** [911020 LTE_terr_bcast_bands_part1](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=911020)<br/>**Child:** [911120 Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=911120) |
| Rel-18 | **Parent:** [920071 LTE_terr_bcast_bands_part2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920071)<br/>**Children:** [920171 Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920171), [1050131 UE Conformance](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050131) |
| Rel-19 | **Parent:** [1060081 LTE_terr_bcast_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060081)<br/>**Children:** [1061081 Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1061081), [1062081 Perf.](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1062081) |
| Rel-19 | 5GB_CASMuting: no dedicated WI; carried as a topic under the generic **TEI19** work item code |
| Rel-19 | **Parent:** [1060080 LTE_terr_bcast_bands_sub_108](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060080)<br/>**Child:** [1061080 Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1061080) |

## Release 14: the FeMBMS baseline

Release 14 introduced Further enhanced MBMS (FeMBMS) under the [**EnTV**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=700032) work item (WI 700032; approved RAN#73, September 2016; completed RAN#76, June 2017). It is the foundation on which every later release builds. The defining change is the **MBMS-dedicated cell**, in which almost the whole carrier is given over to broadcast (up to about 97.5% of resources). See [Standards: 5G Broadcast](/standards/5g-broadcast) and its linked Tech page for the receiver-behaviour detail.

Physical layer (TS 36.211):

- Two new PMCH numerologies with extended cyclic prefix for large-area SFN (Single Frequency Network) deployment: **1.25 kHz SCS** (about 200 microseconds CP, for high-power high-tower very large single-frequency networks) and **7.5 kHz SCS** (about 33 microseconds CP).
- The **Cell Acquisition Subframe (CAS)**: one radio frame per 40 ms (SFN mod 4 == 0) uses 15 kHz SCS with the standard LTE cyclic prefix and carries PSS, SSS, PBCH, PCFICH, PDCCH and PDSCH. The remaining three frames per 40 ms period are fully allocated to PMCH. The CAS always occupies 15 or 25 PRB (3 or 5 MHz) regardless of the PMCH bandwidth.
- **MBSFN reference-signal patterns** (TS 36.211 clause 6.10.2.2) for 1.25 kHz and 7.5 kHz.

Physical layer procedures, scheduler and link adaptation (TS 36.213):

- **256-QAM for PMCH**, extending the MCS index range and the PMCH transport-block-size (TBS) table for higher spectral efficiency in good channel conditions.

RRC (TS 36.331):

- **MIB-MBMS** (`MasterInformationBlock-MBMS-r14`) replaces the legacy MIB and is carried on PBCH in CAS frames.
- **SIB1-MBMS** (`SIB1-MBMS-r14`) replaces the legacy SIB1 broadcast channel for MBMS-dedicated cells, carrying cell-access and MBMS scheduling information.
- Shorter MCCH repetition and modification periods (down to one radio frame) via a v1430 extension to `MBSFN-AreaInfo`, enabling faster system-information update cycles for broadcast.

Architecture (TS 36.300):

- The **MBMS-dedicated cell** mode allocates up to about 97.5% of carrier resources to broadcast (39 PMCH subframes plus 1 CAS subframe per 40 ms).

## Release 16: LTE-based 5G Terrestrial Broadcast (normative)

The normative [**LTE_terr_bcast-Core**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830176) work item (WI 830176; approved RAN#83, March 2019; completed RAN#88-e, June 2020) is the point at which "LTE-based 5G Terrestrial Broadcast" becomes a defined 3GPP feature rather than a set of TV enhancements. The core CRs are TS 36.211 CR 0504 (R1-1913622, RAN#86, introduction), TS 36.213 CR 1294 (R1-1913624), TS 36.331 CR 4190 (R2-2001740) and TS 36.300 CR 1322 (R2-2010758). TS 36.211 then received seven further correction CRs under the same work item: CR 0512 (RAN#87-e), CR 0521 (RAN#87-e, later merged into another CR), CR 0534 rev1 (RAN#88-e), CR 0539 (R1-2007190, RAN#89-e, PBCH repetition correction), CR 0540 (R1-2007191, RAN#89-e, MBSFN region correction), CR 0547 (R1-2009422, RAN#90-e) and CR 0548 (R1-2009423, RAN#90-e, corrected the 0.37 kHz useful-symbol length, 41472 to 82944 samples) and, later still, CR 0557 (R1-2106355, RAN#92-e, editorial MBSFN naming cleanup).

Physical layer (TS 36.211):

- Two further PMCH numerologies: **2.5 kHz SCS** (about 100 microseconds CP, for mobile reception up to around 250 km/h) and **0.37 kHz SCS** (about 300 microseconds CP, for very large high-power high-tower SFN areas with inter-site distances up to around 100 km). The 0.37 kHz numerology uses a 3 ms slot structure with two `timeSeparation` reference-signal variants (`sl2` and `sl4`).
- New **MBSFN reference-signal patterns** for the 2.5 kHz and 0.37 kHz numerologies (TS 36.211 clause 6.10.2.2).
- **PDCCH Format 4** (aggregation level 16, 16 CCEs) for more robust control-channel reception in broadcast-only cells.
- **PBCH repetition**: the PBCH carrying MIB-MBMS is transmitted in every CAS subframe rather than only in subframe 0.

RRC (TS 36.331):

- A new **`MBSFN-AreaInfo-r16`** structure carrying `subcarrierSpacingMBMS-r16` (now including the 2.5 kHz and 0.37 kHz values) and `timeSeparation-r16`.
- **Receive-Only Mode (ROM)** information in SIB13 (`MBMS-ROM-Info-r16`).
- A semi-static CFI field in MIB-MBMS (`semiStaticCFI-MBMS-r16`).

## Release 17: new channel bandwidths and Band 107

The work item ([**LTE_terr_bcast_bands_part1-Core**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=911120), WI 911120) was approved at RAN#91-e (March 2021), adding channel bandwidths that match the UHF broadcast channel rasters used across ITU Regions 1, 2 and 3. The introducing CRs themselves were approved later, at RAN#94-e (December 2021) and RAN#95-e (March 2022): TS 36.211 CR 0564 (R1-2112926, RAN#94-e) and TS 36.213 CR 1406 (R1-2112905, RAN#94-e); then TS 36.300 CR 1360 (RAN#95-e), TS 36.306 CR 1836 rev1 (UE capabilities, RAN#95-e), TS 36.331 CR 4750 rev2 (RAN#95-e) and CR 4780 (UE capabilities, RAN#95-e), TS 36.443 CR 0131 rev1 (RAN3, RAN#95-e) and TR 36.976 CR 0001 (Release 17 enhancements to the informative summary, RAN#95-e). A much later clarification CR, TS 36.300 CR 1406 rev1 ("Clarification on UE/BS requirements for LTE based 5G terrestrial broadcast"), was approved at RAN#105 (September 2024) — three years after the feature's introduction.

- Three new PMCH channel bandwidths: **6 MHz (30 PRB), 7 MHz (35 PRB) and 8 MHz (40 PRB)**, signalled by the new `pmch-Bandwidth-r17` field carried in SIB13. Its absence means the legacy LTE bandwidth applies.
- New LTE **Band 107**: frequency range **612 to 652 MHz** (UHF, downlink only), for terrestrial broadcast.
- TBS and PMCH resource-allocation tables updated for 30, 35 and 40 PRB.

Band 107's own receiver RF performance requirements (reference sensitivity, adjacent-channel selectivity, decoder BLER/SNR) were not finalised within Release 17 itself: as described below, they were completed later, together with Band 108's, under the Release 18 work item.

## Release 18: Band 108 (UHF, receive-only)

**Band 108** is formally standardised by the [**LTE_terr_bcast_bands_part2**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920071) work item (WI 920071; approved RAN#101, September 2023). This is a spectrum-layer change only, with no new PMCH numerologies and no MAC or RRC changes.

- **Band 108**: frequency range **470 to 698 MHz** (UHF, downlink only, receive-only), covering the full UHF broadcast band across ITU regions.
- Channelised operation within 470 to 698 MHz was addressed later through two subset bands, Bands 112 and 113, defined by a separate Release 19 work item whose work item description (RP-243268) was approved at RAN#106 (December 2024); see Release 19 below.

TS 36.101 support for this work item was built up across seven approved CRs, all under WI 920071, from September 2023 to June 2025:

| CR                     | Title                                                                    | Meeting | Date          | Target version |
| ---------------------- | ------------------------------------------------------------------------ | ------- | ------------- | -------------- |
| 6016 rev1 (R4-2314756) | Introduction of 5G broadcast UHF bands                                   | RAN#101 | September 2023 | 18.3.0         |
| 6031 rev1 (R4-2403850) | Bracket removal (5G Broadcast)                                           | RAN#103 | March 2024    | 18.5.0         |
| 6039                   | Correction of EARFCN for bands 107 and 108                               | RAN#103 | March 2024    | 18.5.0         |
| 6044                   | Feature-agnostic approach implementation, Rel-18                         | RAN#103 | March 2024    | 18.5.0         |
| 6067 rev1 (R4-2419893) | Adding missing performance requirements for 6/7/8 MHz channel bandwidths | RAN#106 | December 2024 | 18.8.0         |
| 6106                   | Terminology alignment for LTE-based 5G terrestrial broadcast             | RAN#108 | June 2025     | 18.10.0        |
| 6107                   | Terminology alignment for the LTE based 5G terrestrial broadcast feature | RAN#108 | June 2025     | 19.2.0         |

TS 36.104's counterpart CR is CR 4979 rev1 (R4-2313909), approved alongside CR 6016.

The CR 6016 and 6039 titles ("Introduction of 5G broadcast UHF **bands**", plural, and "Correction of EARFCN for **bands 107 and 108**") indicate Band 107 and Band 108 share the same TS 36.101 band-table entries and were introduced and corrected together under this Release 18 work item, not under Release 17's. The substantive technical work was complete by CR 6067 (RAN#106, December 2024); the two remaining CRs (6106, 6107, RAN#108, June 2025) are terminology-only, with no functional change.

## Release 19: PMCH Phase 2, CAS muting and new bands

Release 19 comprises four broadcast work items:

**PMCH Phase 2 ([`LTE_terr_bcast_Ph2`](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060081), WI 1060081, completed December 2025)** adds diversity and higher-order modulation to the PMCH. This is the broadest work item on this page: it introduced CRs across eight specifications (RAN1, RAN2 and RAN3), and several of those specifications received one or more follow-up correction CRs after the introducing CR, extending into 2026.

| Spec                                     | Introducing CR            | Meeting / date           | Follow-up CRs                                                                                         | Latest meeting / date   |
| ---------------------------------------- | ------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- | ----------------------- |
| TS 36.211 (PHY channels)                 | CR 0576 (R1-2505059)      | RAN#108, June 2025       | CR 0580 (corrections), CR 0584 (corrections, "-Core"), CR 0586 (parameter-name alignment)             | RAN#111, March 2026    |
| TS 36.212 (multiplexing/coding)          | CR 0376 (R1-2504965)      | RAN#108, June 2025       | CR 0379 (corrections), CR 0381 (RRC parameter-name alignment)                                         | RAN#111, March 2026    |
| TS 36.213 (scheduler/link adaptation)    | CR 1448 (R1-2504967)      | RAN#108, June 2025       | CR 1459 (RRC parameter-name alignment)                                                                | RAN#111, March 2026    |
| TS 36.300 (overall description)          | CR 1428 rev1 (R2-2506347) | RAN#109, September 2025 | -                                                                                                     | -                       |
| TS 36.306 (UE radio access capabilities) | CR 1920 rev1 (R2-2506346) | RAN#109, September 2025 | CR 1934 rev2 (correction on the capability)                                                           | RAN#110, December 2025 |
| TS 36.321 (MAC)                          | CR 1593 rev2 (R2-2506348) | RAN#109, September 2025 | -                                                                                                     | -                       |
| TS 36.331 (RRC)                          | CR 5143 rev1 (R2-2506344) | RAN#109, September 2025 | CR 5168 rev3 (post-ASN.1-review corrections), CR 5186 rev3 (notification-configuration clarification) | RAN#110, December 2025 |
| TS 36.443 (M2AP, eNB-MCE interface)      | CR 0133 rev2 (R3-256051)  | RAN#109, September 2025 | CR 0135 rev2 (time-interleaving parameter correction), CR 0137 rev2 (general correction)              | RAN#110, December 2025 |

A companion RAN4 work item, **`LTE_terr_bcast_Ph2_demod`**, adds the receiver conformance-test side at TS 36.101: reference measurement channels and demodulation test cases for time-frequency interleaving (endorsed at RAN4#117 as CR 6129 and CR 6130), and a multi-path fading channel model with 50 Hz Doppler for the 1.25 kHz numerology (CR 6128). These were consolidated and approved as CR 6132 ("Big CR for LTE_terr_bcast_Ph2_demod", R4-2522723) at RAN#110, targeting v19.4.0.

The RAN#111 CRs (parameter-name alignment across TS 36.211/36.212/36.213) show the feature was still receiving corrections into 2026, after the work item's own December 2025 completion date; this is normal 3GPP maintenance behaviour, not a sign the feature is unstable.

- **PMCH time interleaving** (TS 36.211 clause 6.5.3): a transport block is spread across N consecutive MBSFN subframes, with a "depth" N and a scheduling "window" M (N less than or equal to M). See [Standards: 5G Broadcast](/standards/5g-broadcast) and its Tech page for the design background (NR TBoMS reuse, HARQ soft-combining).
- **PMCH cyclic shift** (TS 36.211 clause 6.5.1): a per-subframe phase rotation, with different cells in an SFN using different values to reduce correlated interference at cell boundaries.
- **PMCH frequency interleaving** (TS 36.211 clause 6.5.2): block interleaving of PMCH resource elements in frequency for extra diversity.
- **PMCH-specific MCS tables** (TS 36.213 clause 11.1, Tables 11.1-1 and 11.1-2): a normal table (QPSK, 16-QAM, 64-QAM) and a higher-order table extending to 256-QAM, replacing the standard PDSCH MCS table for broadcast, with TBS scaling when time interleaving is active.
- **Extended SI scheduling periods** (`si-Periodicity-r19`) that reduce CAS overhead for infrequently changing system information.
- The Rel-19 PMCH parameters are carried in a new v1900 RRC extension group of `MBSFNAreaConfiguration`.
- **MAC and M2AP impacts** (TS 36.321, TS 36.443): the work item also touches the MAC layer and the M2 interface between the eNB and the Multi-cell/multicast Coordination Entity (MCE), which is how time-interleaving parameters reach the MCE-side scheduling function; these are not covered in the physical-layer bullets above.

**CAS muting (`5GB_CASMuting`)** reduces the transmission rate of synchronisation and broadcast channels in MBMS-dedicated cells: only the first frames of each period carry PSS, SSS and PBCH, and the rest are freed for PMCH. It is carried under the generic **TEI19** (Technical Enhancements and Improvements for Release 19) work item code, a shared code 3GPP uses for a batch of unrelated small Release 19 additions, so 5GB_CASMuting itself has no dedicated work-item number. It is introduced by TS 36.211 CR 0577 (R1-2506644, RAN1#122, restricting PBCH/PSS/SSS transmission to the active CAS period) and TS 36.331 CR 5139 (a new `SystemInformationBlockType1-MBMS-v1900` carrying `cas-MutingConfig-r19`), with a companion UE capability `cas-Muting-5GB-r19` added to TS 36.306 clause 4.3.37 (CR 1916 rev1, R2-2506343, RAN WG2 Meeting #131, Bengaluru, 25-29 August 2025). A rapporteur-correction CR, TS 36.331 CR 5162 (R2-2508281, RAN2#132), later added a missing TS 36.211 clause 6.11.2.2 (SSS) reference and fixed an ASN.1 class-0 issue in the same IE. The muting window is defined by parameters K_CAS (4 to 63) and N_CAS (2, 4, 8 or 16): the first 4·K_CAS frames of every 16·N_CAS-frame period carry PSS/SSS/PBCH, arranged so that PBCH accumulation frames always fall in the active period and MIB decodability is preserved.

The [**LTE_terr_bcast_bands_sub_108-Core**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1061080) work item (WI 1061080, parent feature WI 1060080), active 2024-09-14 to 2025-06-06 and completed at **RAN#108 (June 2025, final status report RP-251141)**, defines two further receive-only UHF broadcast bands for early national and regional deployment: **Band 112 (470 to 608 MHz)** and **Band 113 (606 to 698 MHz)**, both downlink only and using the Release 17 6/7/8 MHz PMCH bandwidths (no new numerologies). Core CRs include TS 36.101 CR 6105 rev2 (R4-2508786) and TS 36.104 (R4-2508787). Bands 112 and 113 are release-independent from Release 17 onwards via CR R4-2507471: a Release 17 or later receiver needs no Release 19 feature support to operate on them. A companion CR, R4-2508063, separately makes **Bands 107 and 108** release-independent from Release 17 in the same way.

The fourth work item is unrelated to the terrestrial bands above: [**LTE_band_5G_bcast_GSO**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1070064) (WI 1070064, parent; children WI 1071064 "Core" and WI 1072064 "Perf.", active 3 March 2025 to 3 March 2026) defines a new LTE band, **Band 246** (1467 to 1492 MHz, downlink only), for 5G broadcast delivered over a **geosynchronous satellite**, for ITU Region 3 (Asia-Pacific). Unlike the terrestrial bands, this feature ("Broadcast Over GSO", BOG, per the CR titles) touches a distinct, satellite-specific set of specifications: TS 36.102 (UE radio transmission and reception for satellite access), TS 36.108 (Satellite Access Node radio transmission and reception), TS 36.181 (Satellite Access Node conformance testing) and TS 36.307 (requirements for UEs supporting a release-independent frequency band). The band was introduced by CR 0078 to TS 36.102 and CR 0036 to TS 36.108 (both RAN#109), with performance and conformance-test CRs following at RAN#111 and RAN#112 (TS 36.102 CR 0122/0134/0135, TS 36.108 CR 0046/0052/0054, TS 36.181 CR 0034/0042, TS 36.307 CR 4514/4517).

---

<details>
<summary>References to verify</summary>

The individual 3GPP Change Request numbers, revisions, TDoc numbers and clause references on this page (across TS 36.211, 36.212, 36.213, 36.300, 36.306, 36.321, 36.331, 36.443, TR 36.976, TS 36.101, 36.104, 36.102, 36.108, 36.181 and 36.307) come from an internal 5G-MAG standards-tracking document and from 3GPP CR-portal exports made in earlier passes; record-level CR detail on the 3GPP portal requires a delegate login, so these cannot be independently re-verified from public sources. Two inferences to treat with particular care: CR 6016 and CR 6039 are described as covering Bands 107 and 108 together on the strength of their titles alone (their full text was not read); and the Release 19 release-independence CR numbers (R4-2508063 for Bands 107/108, R4-2507471 for Bands 112/113) come from the internal roadmap, although the release-independent design itself ("in a Release independent manner from Rel-17") is confirmed by the work item description RP-243268.

Everything else previously flagged here has been verified against primary sources: all work item identifiers against the 3GPP work item portal; every RAN plenary meeting date cited on this page against the 3GPP meetings register, which corrected three dates (RAN#91-e is March 2021, RAN#94-e is December 2021 and RAN#101 is September 2023, all fixed above); the Band 107 (612 to 652 MHz), Band 108 (470 to 698 MHz), Band 112 (470 to 608 MHz) and Band 113 (606 to 698 MHz) ranges against TS 36.101 V19.5.0 Table 5.5H-1; the satellite Band 246 (1467 to 1492 MHz, GSO, ITU Region 3) against TS 36.102 V19.3.0; and TS 36.443's identity as the M2AP (MCE to eNB) specification against the 3GPP portal. The former note asking to reconcile the Release 18 "sub-band definitions at RAN#106" citation with the Release 19 sub_108 work item is resolved: RP-243268 is the work item description creating Bands 112/113 as subsets of Band 108, so both citations described the same meeting outcome; the Release 18 section now points to the Release 19 work item instead.

Individual 3GPP Change Requests (CRs) are not linked directly: the CR search portal (portal.3gpp.org/ChangeRequests.aspx) requires a 3GPP delegate login for record-level detail.

</details>

## Related Standards Work

- [Standards: 5G Broadcast](/standards/5g-broadcast)
- [Standards: Non-Terrestrial Networks (NTN)](/standards/ntn)
- [Feedback and Requirements](/standards): how 5G-MAG processes feedback on the specifications it maintains and tracks

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
