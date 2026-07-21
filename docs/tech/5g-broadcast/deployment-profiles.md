---
title: Deployment Profiles
sidebar_position: 0
hide_title: true
description: Defines LTE-based 5G Broadcast receiver capability profiles, including ETSI TS 103 720 receiver categories and an example Profile A.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Broadcast - TV, Radio and Emergency Alerts</span>
<h1>Deployment Profiles</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Overview

A receiver profile is a named set of capabilities (radio features, protocols, codecs, and delivery methods) that a device is expected to support in order to receive LTE-based 5G Broadcast services in a given deployment. This page sets out the capabilities such a profile groups together. For the parameter values observed in actual deployments, see [Operational Parameters in Use](./parameters-in-use), which also defines receiver Profile A and Profile B. The "Profile A" example on this page and the receiver profiles on that page use similar names but are described from different angles: required capabilities here, observed values there. Read the two together.

:::warning
The profile below is a work-in-progress example, not a finalised conformance profile. It reflects capabilities discussed by 5G-MAG members and may change.
:::

## Standardised receiver categories (ETSI TS 103 720)

Alongside the deployment-oriented example profile below, ETSI TS 103 720 v1.2.1 (which profiles 3GPP Release 17) defines three normative receiver categories. These are signalled through MBMS Feature Values in the User Service Description and set out which subcarrier spacings (SCS) a receiver must support. They are the standardised reference points against which a deployment profile should be checked.

| Feature value | Category                                     | Mandatory SCS                            |
| ------------- | -------------------------------------------- | ---------------------------------------- |
| 27            | LTE-based 5G Broadcast **Base Receiver**     | 1.25 kHz mandatory; other SCS optional   |
| 28            | LTE-based 5G Broadcast **Main Receiver**     | All SCS: 15, 7.5, 2.5, 1.25 and 0.37 kHz |
| 30            | **5GMS** via LTE-based 5G Broadcast Receiver | Main Receiver plus 5GMS requirements     |

- **Base Receiver** is the minimum profile, aimed at fixed indoor reception using the 1.25 kHz numerology.
- **Main Receiver** must support all five numerologies and is the target for mobile and portable devices.
- **5GMS Receiver** adds the 5G Media Streaming requirements on top of the Main Receiver.

Later ETSI TS 103 720 versions extend the underlying feature set: v1.3.1 (in development) adds Band 108 (470 to 698 MHz) from 3GPP Release 18 and the Release 19 PMCH enhancements. For the release-by-release mapping, see [Standards: LTE-based 5G Broadcast](/tech/standards/5g-broadcast).

## 5G Broadcast Receiver Profile A (example)

### Bands and bandwidth

The supported bandwidths for LTE-based 5G Broadcast are 6, 7 and 8 MHz.

The supported spectrum is a subset of operating band 108 (the UHF band 470 to 698 MHz for LTE-based 5G terrestrial broadcast), as defined in the radio characteristics of ETSI TS 103 720 (clause 7).

:::warning
The exact sub-clause/table of ETSI TS 103 720 that defines operating band 108 (and the specific version in force) has not been confirmed. Clause 7 (radio characteristics) is cited here because the same profile references clause 7.3 for radio aspects and the source spec could not be opened directly to read the precise band-definition table; the underlying band 108 parameters originate in 3GPP TS 36.101. Verify against the published spec before relying on this reference.
:::

### Radio

Implementation of radio aspects in devices shall follow clause 7.3 of ETSI TS 103 720 and support the following radio-layer capabilities:

- MBMS-dedicated cells for 100% MBMS allocation
- Subcarrier spacings: 1.25 kHz, 2.5 kHz and 15 kHz.
- Service continuity for roaming/border situations
- Multiple services with different Modulation and Coding Scheme (MCS) within a carrier
- Support of MCS 1-26 (according to Table 7.1.7.1-1A. in 3GPP [36.213](https://www.3gpp.org/dynareport/36213.htm) 18.2.0)
- Support for dual antenna reception
- Support of diversity reception with multiple antennas
- Multi-threading of 5G Broadcast and unicast, i.e. using unicast at the same time when receiving on 5G Broadcast

### Interfaces and protocols

This subsection covers the delivery methods and transport protocols a Profile A receiver is expected to support. Devices' interfaces shall support the following delivery methods (according to 3GPP [26.346](https://www.3gpp.org/dynareport/26346.htm) 18.0.0):

- MBMS Transparent Delivery Method
- MBMS Download Delivery Method

Devices shall support the following protocols (according to 3GPP 26.346 18.0.0):

- RTP (over transparent delivery method)
- DASH (Dynamic Adaptive Streaming over HTTP)
- TS over IP (MPEG-2 Transport Stream over IP; over transparent delivery method)
- HLS (HTTP Live Streaming; over transparent delivery method)
- FLUTE (File Delivery over Unidirectional Transport)
- ROUTE (Real-time Object delivery over Unidirectional Transport; over transparent delivery method)

The following functionalities shall be supported:

- Service announcement (according to 3GPP [23.246](https://www.3gpp.org/dynareport/23246.htm) 18.0.0)
- Bootstrap.multipart file (according to 3GPP 23.246 18.0.0)
- MBMS-URL (according to 3GPP [26.347](https://www.3gpp.org/dynareport/26347.htm) 18.0.0)

### Codec

A Profile A receiver is expected to decode the following audio, video, and container formats:

- Audio: HE-AAC aacPlus, enhanced aacPlus, AC-3, AAC
- Video: H.264 High profile
- Video: H.265 (HEVC)
- Video: H.266 VVC
- CMAF, mp4, ISO BMFF
- MPEG-2 TS

### Miscellaneous

This subsection covers the remaining operational modes and functions. Devices shall support:

- Free-to-air (FTA) mode
- Receive-only-mode (ROM)
- Multi-Frequency Network (MFN) support
- Single Frequency Network (SFN) support
- Service discovery strategy: 1. MBMS-URL, 2. Bootstrap.multipart file, 3. Service announcement
- Public Warning System (PWS) support (according to clause 7.6)

In case Time-Frequency-Interleaving (TFI) and co-existence of legacy broadcast and 5G Broadcast in the Ultra High Frequency (UHF) band are introduced in Release 19, both functionalities shall be supported. TFI interleaves a signal across time and frequency to improve robustness, and UHF co-existence lets 5G Broadcast share spectrum with legacy terrestrial broadcast. Both items are conditional on Release 19 outcomes and are not yet finalised; check the current status against the 5G-MAG work and ETSI TS 103 720 before relying on them. See [Operational Parameters in Use](./parameters-in-use) for the values observed today.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the ETSI/3GPP portals block automated access): the ETSI TS 103 720 clauses (7, 7.3, 7.6), the operating Band 108 definition (the underlying Band 108 parameters originate in 3GPP TS 36.101), the MCS table reference in 3GPP TS 36.213, and the TS 26.346 / TS 26.347 / TS 23.246 clause and version citations. The Band 108 frequency range (470 to 698 MHz) is now stated consistently here and on the [Operational Parameters in Use](./parameters-in-use) page; confirm it and the version in force against the published ETSI TS 103 720 (and 3GPP TS 36.101) before relying on it. Band 108 is a 3GPP Release 18 addition profiled by ETSI TS 103 720 v1.3.1 (in development), not by the published v1.2.1.
:::
