---
title: Deployment Profiles
hide_title: true
description: Defines LTE-based 5G Broadcast receiver capability profiles, including ETSI TS 103 720 receiver categories and an example Profile A.
sidebar_label: "Deployment Profiles"
sidebar_position: 1
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Media delivery over 5G Broadcast</span>
<h1>Deployment Profiles</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Overview

A receiver profile is a named set of capabilities (radio features, protocols, codecs, and delivery methods) that a device is expected to support in order to receive LTE-based 5G Broadcast services in a given deployment (ETSI TS 103 720 V1.2.1 clause 10.1). This page sets out the capabilities such a profile groups together. For the parameter values observed in actual deployments, see [Operational Parameters in Use](/tech/5g-broadcast/more/parameters-in-use), which also defines receiver Profile A and Profile B. The "Profile A" example on this page and the receiver profiles on that page use similar names but are described from different angles: required capabilities here, observed values there. Read the two together.

:::warning
The profile below is a work-in-progress example, not a finalised conformance profile. It reflects capabilities discussed by 5G-MAG members and may change.
:::

## Standardised receiver categories (ETSI TS 103 720)

Alongside the deployment-oriented example profile below, ETSI TS 103 720 v1.2.1 (which profiles 3GPP Release 17) defines four receiver categories in clause 10; three of them (Base, Main and 5GMS) carry MBMS Feature Values (ETSI TS 103 720 V1.2.1 clause 4.3.2; ETSI TS 103 720 V1.2.1 clause 10.1; ETSI TS 103 720 V1.2.1 clause 10.5). The Base, Main and 5GMS categories are signalled through MBMS Feature Values in the User Service Description; the Base and Main categories set out which subcarrier spacings (SCS) a receiver must support (ETSI TS 103 720 V1.2.1 clause 5.5.3; ETSI TS 103 720 V1.2.1 clause 10.1; TS 26.346 V19.3.0 clause 11.9). They are the standardised reference points against which a deployment profile should be checked.

| Feature value | Category                                     | Mandatory SCS                            |
| ------------- | -------------------------------------------- | ---------------------------------------- |
| 27            | LTE-based 5G Broadcast **Base Receiver**     | 1.25 kHz mandatory; other SCS optional   |
| 28            | LTE-based 5G Broadcast **Main Receiver**     | All SCS: 15, 7.5, 2.5, 1.25 and 0.37 kHz |
| 30            | **5GMS** via LTE-based 5G Broadcast Receiver | All clause 7 receiver requirements plus the 5GMS requirements; no SCS set is stated (ETSI TS 103 720 V1.2.1 clause 10.4) |

- **Base Receiver** must support the reception of signals with 1.25 kHz subcarrier spacing; other subcarrier spacings from Table 6.4.4-1 may also be supported (ETSI TS 103 720 V1.2.1 clause 10.2).
- **Main Receiver** must support all five numerologies, that is all the subcarrier spacings defined in Table 6.4.4-1 (ETSI TS 103 720 V1.2.1 clause 10.3).
- **5GMS Receiver** must meet all clause 7 receiver requirements plus the 5G Media Streaming requirements (ETSI TS 103 720 V1.2.1 clause 10.4; ETSI TS 103 720 V1.2.1 clause 9.3.6).

The published v1.2.1 does not include specific frequency bands: its clause 8 (ETSI TS 103 720 V1.2.1 clause 8, Spectrum and Frequency Bands, informative) notes that 3GPP work on frequency bands was ongoing and expects details in a future revision (ETSI TS 103 720 V1.2.1 clause 8). The 3GPP Release 18 band additions (such as Band 108, 470 to 698 MHz) and the Release 19 PMCH enhancements are not part of it, because v1.2.1 profiles 3GPP Release 17 (ETSI TS 103 720 V1.2.1 clause 4.3.2). For the release-by-release mapping, see [Standards: Media delivery over 5G Broadcast](/standards/5g-broadcast).

## 5G Broadcast Receiver Profile A (example)

:::note
**Where "Profile A" comes from.** "Profile A" is a working name: in issue 135 of the 5G-MAG Standards repository the name was left open ("Name to come later - Profile A"). It stands for the European 5G Broadcast receiver profile prepared by the European 5G Broadcast handset taskforce (EBU and BNE members, supported by Qualcomm) and submitted to 5G-MAG as a pseudo change request to ETSI TS 103 720, titled "European handset profile for 5G Broadcast", which proposes a new clause 12.7 with "Minimum Requirements"; its "Optimum Requirements" are marked "for further study". It is not part of ETSI TS 103 720 V1.2.1. The requirements below follow the version of that proposal attached to the issue on 2 September 2024 ("profile text"). The references to TS 103 720, TS 26.346 and other specifications show where each capability is defined; where a capability is stated only in the proposal, the text says so. Later revisions are kept in the 5G-MAG member portal and have not been read for this page.
:::

### Bands and bandwidth

The supported bandwidths for LTE-based 5G Broadcast are 1.4, 3, 5, 6, 7, 8, 10, 15 and 20 MHz; Profile A uses 6, 7 and 8 MHz (ETSI TS 103 720 V1.2.1 clause 8).

The proposal limits the supported spectrum to a subset of operating band n108, 606 to 698 MHz (profile text). A contribution of 5 September 2024 from the source XGN ("US Handset Profile for 5G Broadcast", BROADCAST(24)000031) asks instead that the original proposal for the entire band 108, 470 to 698 MHz, is respected. The published ETSI TS 103 720 v1.2.1 does not define operating bands; its clause 8 (ETSI TS 103 720 V1.2.1 clause 8) defers specific band configurations to a future revision (TS 36.101 V20.1.0 table 5.5H-1; ETSI TS 103 720 V1.2.1 clause 8).

### Radio

Implementation of radio aspects in devices shall follow clause 7.3 (Access Stratum) of ETSI TS 103 720 V1.2.1 and support the following radio-layer capabilities: (ETSI TS 103 720 V1.2.1 clause 7.3)

- MBMS-dedicated cells for 100% MBMS allocation (ETSI TS 103 720 V1.2.1 clause 6.4.2; TS 36.300 V19.2.0 clause 15.2.1)
- Subcarrier spacings: 1.25 kHz, 2.5 kHz and 15 kHz.
- Service continuity for roaming/border situations (profile text; ETSI TS 103 720 V1.2.1 clause 7.3.4 describes service continuity in idle mode by cell reselection with MBMS prioritisation, and its clause 5.9 says that roaming does not apply; TS 36.304 V19.3.0 clause 5.2.4.1)
- Multiple services with different Modulation and Coding Scheme (MCS) within a carrier (TS 36.300 V19.2.0 clause 15.3.3; TS 36.331 V19.4.0 clause 6.3.7; ETSI TS 103 720 V1.2.1 clause 7.4)
- Support of MCS 1-26 (profile text, according to Table 7.1.7.1-1A of TS 36.213, V18.2.0 in the proposal; the table is in TS 36.213 V19.5.0). ETSI TS 103 720 V1.2.1 table 11.3.1-1, which is informative, gives capacity examples for MCS 0 to 26.
- Support for dual antenna reception (for numerologies other than 0.37 kHz) (ETSI TS 103 720 V1.2.1 clause 7.3.8)
- Support of diversity reception with multiple antennas
- Multi-threading of 5G Broadcast and unicast, i.e. using unicast at the same time when receiving on 5G Broadcast

### Interfaces and protocols

This subsection covers the delivery methods and transport protocols a Profile A receiver is expected to support. Devices' interfaces shall support the following delivery methods (according to 3GPP TS 26.346 V19.3.0 clauses 7 and 8B): (TS 26.346 V19.3.0 clause 6; ETSI TS 103 720 V1.2.1 clause 5.5.3)

- MBMS Transparent Delivery Method (TS 26.346 V19.3.0 clause 8B; ETSI TS 103 720 V1.2.1 clause 5.5.3)
- MBMS Download Delivery Method (TS 26.346 V19.3.0 clause 7; ETSI TS 103 720 V1.2.1 clause 5.5.3)

The proposal says that devices shall support the following protocols (profile text; TS 26.346 V19.3.0 clause 8B gives RTP and MPEG-2 TS as examples of application protocols over the transparent delivery method; clauses 5.6 and 7.2): (TS 26.346 V19.3.0 clause 5.6; TS 26.346 V19.3.0 clause 7.2; TS 26.346 V19.3.0 clause 8B)

- RTP (an example of an application protocol over the transparent delivery method; TS 26.346 V19.3.0 clause 8B)
- DASH (Dynamic Adaptive Streaming over HTTP) (TS 26.346 V19.3.0 clause 5.6; ETSI TS 103 720 V1.2.1 clause 5.3.2)
- TS over IP (MPEG-2 Transport Stream over IP, an example of an application protocol over the transparent delivery method; TS 26.346 V19.3.0 clause 8B)
- HLS (HTTP Live Streaming; over download delivery method) (ETSI TS 103 720 V1.2.1 clause 5.3.2; TS 26.346 V19.3.0 clause M.2.2).
- FLUTE (File Delivery over Unidirectional Transport) (TS 26.346 V19.3.0 clause 7.2)
- ROUTE (Real-time Object delivery over Unidirectional Transport; over the transparent delivery method) (profile text; ROUTE does not occur in TS 26.346 V19.3.0 or ETSI TS 103 720 V1.2.1)

The following functionalities shall be supported (the proposal refers to V18.0.0 of the specifications):

- Service announcement (according to 3GPP [23.246](https://www.3gpp.org/dynareport/23246.htm) V19.0.0) (TS 23.246 V19.0.0 clause 4.4.3.1; TS 26.346 V19.3.0 clause 5.2)
- Bootstrap.multipart file (according to 3GPP 26.346 V19.3.0) (TS 26.346 V19.3.0 clause 5.2.3.1; TS 26.346 V19.3.0 clause L.2.9)
- MBMS-URL (according to 3GPP [26.347](https://www.3gpp.org/dynareport/26347.htm) V19.0.0)

### Codec

The proposal says that devices shall support the following codecs (profile text); the notes give what the held specifications say (ETSI TS 103 720 V1.2.1 clause 7.5; TS 26.511 V19.0.0 clause 5.4):

- Audio: HE-AAC aacPlus, enhanced aacPlus, AC-3, AAC (profile text). In the held specifications: enhanced aacPlus (HE-AAC v2; should; TS 26.346 V19.3.0 clauses 10.3 and K.2.2.2); for the 5GMS Television profile, the eAAC+ stereo operation point (shall), the xHE-AAC stereo operation point (should) and the IVAS operation point (may) of TS 26.117 (TS 26.511 V19.0.0 clause 5.4.2)
- Video: H.264/AVC Progressive High Profile Level 3.1 (720p HD operation point; shall) (TS 26.346 V19.3.0 clause 10.5.1; TS 26.511 V19.0.0 clause 5.4.1.1)
- Video: H.265 (HEVC) Main Profile, Main Tier, Level 3.1 (should) (TS 26.346 V19.3.0 clause 10.5.1; TS 26.511 V19.0.0 clause 5.4.1.2)
- Video: H.266 VVC (profile text; TS 26.511 V19.0.0 clause 5.4.1 lists H.264 and H.265 only)
- CMAF, mp4, ISO BMFF (TS 26.346 V19.3.0 clause 5.6; TS 26.511 V19.0.0 clause 5.4.4.1)
- MPEG-2 TS

### Miscellaneous

This subsection covers the remaining operational modes and functions. Devices shall support:

- Free-to-air (FTA) mode (ETSI TS 103 720 V1.2.1 clause 4.3.2; TR 36.976 V19.0.0 clause 1)
- Receive-only-mode (ROM) (ETSI TS 103 720 V1.2.1 clause 7.2)
- Multi-frequency operation (service offered on different frequencies in different service areas, signalled in SIB15) (ETSI TS 103 720 V1.2.1 clause 5.5.3; ETSI TS 103 720 V1.2.1 clause 6.5)
- Single Frequency Network (SFN) support (ETSI TS 103 720 V1.2.1 clause 4.3.2; TS 36.300 V19.2.0 clause 15.3.3)
- Service discovery strategy: 1. MBMS-URL, 2. Bootstrap.multipart file, 3. Service announcement
- Public Warning System (PWS) support (according to clause 7.6 of ETSI TS 103 720 V1.2.1, where it is a "should") (ETSI TS 103 720 V1.2.1 clause 7.6)

Time interleaving and frequency interleaving for the PMCH are specified in Release 19 (TS 36.331 V19.4.0 clause 6.3.7, TS 36.213 V19.5.0 clause 11.1); they are not in ETSI TS 103 720 V1.2.1 (TS 36.331 V19.4.0 clause 6.3.7; TS 36.213 V19.5.0 clause 11.1). TFI interleaves a signal across time and frequency to improve robustness, and UHF co-existence lets 5G Broadcast share spectrum with legacy terrestrial broadcast. Time and frequency interleaving are specified in the Release 19 3GPP specifications; check ETSI TS 103 720 for a later revision, and treat co-existence as not covered by the specifications read (TS 36.331 V19.4.0 clause 6.3.7). The proposal states that, if Time-Frequency-Interleaving and the co-existence of legacy broadcast and 5G Broadcast in UHF are introduced in Release 19, both functionalities shall be supported (profile text). See [Operational Parameters in Use](/tech/5g-broadcast/more/parameters-in-use) for the values observed today.