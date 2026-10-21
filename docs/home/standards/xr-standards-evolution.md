---
hide_title: true
title: XR Media & 3D Scenes - Standards Evolution
slug: /standards/xr/evolution
description: Editions and amendments of ISO/IEC 23090-14, MPEG-I Scene Description, and the 3GPP SA4 work items behind XR, release by release.
sidebar_label: Release history
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"/><path d="M3 7v-2a2 2 0 0 1 2 -2h2"/><path d="M3 17v2a2 2 0 0 0 2 2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 21h2a2 2 0 0 0 2 -2v-2"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>XR Media &amp; 3D Scenes - Standards Evolution</h1>
</div>
</div>

This page is the companion to [Standards: XR/3D Scenes with MPEG-I Scene Description](/standards/xr). It lists the editions and amendments of ISO/IEC 23090-14, MPEG-I Scene Description, and then the 3GPP SA4 work items behind XR, release by release.

| Document | Date | Content |
| --- | --- | --- |
| ISO/IEC 23090-14:2023 | 2023 | First edition. Cancelled and replaced by the second edition. |
| ISO/IEC 23090-14/Amd 1:2023 | 2023 | Incorporated in the second edition. |
| ISO/IEC 23090-14:2025 | 2025-11 | Second edition. |
| ISO/IEC 23090-14:2025/FDAM 1 | 2026-05-01 | Amendment 1, "Support of MPEG-I audio, scene understanding and other extensions". Final draft. |

ISO/IEC 23090-14:2025, foreword: "This second edition cancels and replaces the first edition (ISO/IEC 23090-14:2023), which has been technically revised." and "It also incorporates the Amendment ISO/IEC 23090-14/Amd 1:2023." The main changes are listed as "addition of the support of MPEG-I immersive media codecs, AR anchoring, interactivity, avatar, lighting and MPEG-I haptics" and "various minor improvements and corrections".

Amendment 1 to the second edition changes, among others, clause 7.3.2 (the carriage of glTF items) and clause 8.1 (AR anchoring), where it adds a recommendedSpatialComputingConfig object to the MPEG_anchor extension.

## 3GPP work by release

Sources: the 3GPP release descriptions TR 21.915 (Release 15), TR 21.916 (Release 16), TR 21.917 (Release 17), TR 21.918 (Release 18) and TR 21.919 (Release 19), and the change histories of the specifications named. Work items of other working groups that the release descriptions group under XR are listed last in each release. Release 20 work is not covered here: the Release 20 work items that touch XR have not been verified against a primary source.

### Release 19

| Work item | Title | Specifications | What it adds (release description) |
| --- | --- | --- | --- |
| AvCall-MED | Avatar Communications in AR Calls | TS 26.264 | Avatar calls as an extension of IMS-based AR Real-Time Communication: ARF base avatars, 3D and 2D avatars, data channel animation messages, SDP and data channel avatar negotiation, and the Base Avatar Repository management service (TR 21.919 clause 12.4) |
| SR_IMS | Split rendering over IMS | TS 26.567 | Functional entities, reference points, protocols, media codecs, metadata, split rendering metrics and session procedures for IMS-based split rendering (clause 12.5) |
| 5G_RTP_Ph2 | 5G Real-time Transport Protocol Configurations, Phase 2 | TS 26.522, TS 26.510, TS 26.113 | RTP and RTCP support for real-time XR media: PDU Set Size inaccuracy, lone PDUs, multiplexed RTP streams, burst size, time to next burst, expedited transfer indication (clause 11.7) |
| IVAS_Codec_Ph2 | EVS Codec Extension for Immersive Voice and Audio Services, Phase 2 | TS 26.250, TS 26.251, TS 26.252, TS 26.258, TR 26.997 | Fixed-point reference code, characterization, updated conformance (clause 11.3) |
| ATIAS_Ph2 | Terminal Audio quality performance and Test methods for Immersive Audio Services, Phase 2 | TS 26.260, TS 26.261 | Test methods and requirements for immersive audio terminals supporting IVAS, including head tracking and acoustic echo control (clause 11.2) |
| FS_HapticsMedia | Study on Haptics in 5G Media Services | Study | Listed in clause 11.3 without a summary |
| XRM_Ph2 | Extended Reality and Media service (XRM) Phase 2 | TS 23.501, TS 23.502, TS 23.503 and others (SA2, SA3, SA5, CT) | PDU Set handling in Alternative QoS Profiles and notification control, QoS control for end-to-end encrypted XR traffic, PDU Set based DSCP marking, dynamic change of traffic characteristics, AF-triggered data boosting, L4S and PDU Set QoS in untrusted, trusted and wireline access (clause 12.2) |
| NR_XR_Ph3 | XR (eXtended Reality) for NR Phase 3 | RAN specifications | Continuation of the Release 18 RAN work on capacity, QoS and device power consumption (clause 12.3) |
| Metaverse, XRMobility, XRM_Ph2_App | Localized Mobile Metaverse Services; Supporting UE Mobility for XR Services; Application enablement for XRM Services Phase 2 | S1, S6 work | Listed in clauses 12.1 and 12.2 |

TS 26.119 (MeCAR) CR 0003 "Assignment of IVAS levels to device types" is in V19.1.0, and TS 26.565 CR 0003 "[SR_MSE] Enhancements to SR_MSE" is in V19.0.0 (change histories). The work item FS_ARSpatial (Study on Spatial Computing for AR Services) is listed on the [XR page](/standards/xr); the release description TR 21.919 does not describe it.

### Release 18

| Work item | Title | Specifications | What it adds (release description) |
| --- | --- | --- | --- |
| MeCAR | Media Capabilities for Augmented Reality | TS 26.119 | Audio, video, scene description and XR system capabilities for four device types (thin AR glasses, AR glasses, XR phone, XR head-mounted display); common metadata (pose, action, available visualization space); QoE metrics (TR 21.918 clause 14.2) |
| 5G_RTP | Real-time Transport Protocol Configurations | TS 26.522 | RTP header extensions for PDU Set marking, XR pose and end-to-end delay measurement; RTCP feedback for timing information (clause 14.3) |
| ISAR | Immersive Audio for Split Rendering Scenarios | TS 26.249, TS 26.253, TS 26.258, TR 26.865, TR 26.996 | Intermediate split rendering representation for binaural audio on head-tracked devices (clause 14.4) |
| iRTCW | Immersive Real-time Communication for WebRTC | TS 26.113 | RTC APIs, the SWAP signalling protocol, QoE metric reporting and packet loss handling for WebRTC over 5G (clause 14.5) |
| IBACS | IMS-based AR Conversational Services | TS 26.264 | The AR-MTSI client, with AR metadata, network media rendering and AR data transport (clause 14.6) |
| SR_MSE | Split Rendering Media Service Enabler | TS 26.565 | Split rendering media service enabler, with media and metadata formats and several split rendering profiles (clause 14.7) |
| GA4RTAR | Generic architecture for RT and AR/MR | TS 26.506 | Listed in clause 14.9 without a summary; see [RTC](/standards/rtc/evolution) |
| XRM | Architecture Enhancements for XR (Extended Reality) and media service | TS 23.501, TS 23.502, TS 23.503 and others (SA2, CT) | PDU Set based QoS handling, PDU Set information marking in the UPF, ECN marking for L4S, exposure of QoS flow information, assistance information to the NG-RAN for power saving (clause 14.8) |
| NR_XR_enh | XR (eXtended Reality) enhancements for NR | RAN specifications | XR awareness, power saving and capacity in NG-RAN, including a Delay Status Report MAC CE and uplink assistance information from the UE (clause 14.1) |
| FS_eiRTCW, FS_SmarTAR, FS_ARMRQoE, FS_Audio_5GSTAR | Studies on WebRTC Phase 2, tethering AR glasses, AR and MR QoE metrics, and audio for glasses-type AR/MR devices | Studies | Listed in clauses 14.8 and 14.9 without a summary |
| FS_XRTraffic | Traffic Models and Quality Evaluation Methods for Media and XR Services in 5G Systems | TR 26.926 | Listed in clause 17.13 ("Summary not expected") |

TS 26.119 V18.0.0 and TS 26.522 V18.0.0 were created in March 2024, TS 26.565 V18.0.0 and TS 26.264 V18.0.0 in June 2024 (change histories).

### Release 17

| Work item | Title | Specifications | What it adds (release description) |
| --- | --- | --- | --- |
| ITT4RT | Support of Immersive Teleconferencing and Telepresence for Remote Terminals | TS 26.114, TR 26.862, TR 26.962 | Unidirectional 360-degree video in MTSI: still images and 360-degree backgrounds, H.265 360-degree video, overlays, multiple projection formats, fisheye video, viewport dependent processing and improved feedback (TR 21.917 clause 15.1) |
| IVAS_Codec | EVS Codec Extension for Immersive Voice and Audio Services | TS 26.250 and related | Listed in clause 15.1; the description of its results is in TR 21.918 clause 17.10 |

### Release 16

| Work item | Title | Specifications | What it adds (release description) |
| --- | --- | --- | --- |
| VRQoE | VR QoE metrics | TS 26.118 | VR metrics observation points, device characteristics, interaction delay, and the metrics comparable quality viewport switching latency, rendered viewports and VR device information (TR 21.916 clause 13.1.6) |

### Release 15

| Work item | Title | Specifications | What it adds (release description) |
| --- | --- | --- | --- |
| VRStream | Virtual Reality Profiles for Streaming Media | TS 26.118 | Three video media profiles (Basic, Main and Advanced), MPEG-H 3D Audio Baseline profile, and system metadata for rendering 360 experiences on 2D screens (TR 21.915 clause 12.4.3) |

The Release 16 study FS_5GXR (TR 26.928) is listed on the [XR page](/standards/xr); the release description TR 21.916 has no summary for it.

<details>
<summary>Sources for this page</summary>

- ISO/IEC 23090-14:2025, Foreword.
- ISO/IEC 23090-14:2025/FDAM 1:2025, title page (date 2026-05-01) and the changes to clauses 7.3.2 and 8.1.

</details>
