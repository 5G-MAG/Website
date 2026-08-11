---
hide_title: true
title: XR and MPEG-I Scene Description
slug: /standards/xr
description: 'Standards tracking for XR: MPEG-I Scene Description, 3GPP AR/XR specs, split rendering, IVAS audio, and work items by release.'
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"/><path d="M3 7v-2a2 2 0 0 1 2 -2h2"/><path d="M3 17v2a2 2 0 0 0 2 2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 21h2a2 2 0 0 0 2 -2v-2"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>XR and MPEG-I Scene Description</h1>
</div>
</div>

<div class="topic-lead">
MPEG-I Scene Description, 3GPP AR/XR specifications, split rendering, IVAS audio, and work items by release.
</div>

## Overview

eXtended Reality (XR) covers virtual, augmented and mixed reality media delivered over 5G. This page groups the relevant MPEG and 3GPP deliverables (scene description, AR/XR device and delivery specifications, split rendering, IVAS immersive audio), then lists the associated 3GPP work items by release. For the technical analysis of how these pieces fit together, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The extension-by-extension model and the MAF/Presentation Engine architecture.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/xr/mpeg-i-scene-description">Tech: MPEG-I Scene Description and glTF 2.0 extensions</a></li>
</ul>
</div>
</div>

</div>

## Specifications by layer

XR delivery over 5G is built from four layers of standardisation. For the technical analysis of how they fit together, see [MPEG-I Scene Description and glTF 2.0 extensions](/tech/xr/mpeg-i-scene-description) and the [XR Tech page](/tech/xr).

| Layer                                        | Specifications                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Scene and media formats (MPEG)               | ISO/IEC 23090-14 (Scene Description); ISO/IEC 23090-5 (V3C/MIV)       |
| Delivery (3GPP SA4)                          | TS 26.501, TS 26.512 (5GMS); TS 26.506 (RTC)                          |
| Device and media capabilities (3GPP SA4)     | TR 26.928, TR 26.998; TS 26.119 (MeCAR); TS 26.565 (split rendering)  |
| Radio and system (3GPP RAN and SA2)          | TR 38.835, TR 38.838; 23.700-series                                    |

## Scene description: ISO/IEC 23090-14

ISO/IEC 23090-14 is Part 14 of the MPEG-I suite (ISO/IEC 23090, Coded representation of immersive media). It extends the Khronos glTF 2.0 format (itself published as ISO/IEC 12113) with a set of MPEG extensions that add external and timed media, buffering, spatial audio, anchoring, interactivity, avatars, lighting and haptics.

The first edition (ISO/IEC 23090-14:2023) has been extended by amendments and consolidated into a second edition:

- Amendment 1 added support for MPEG-I immersive audio, scene understanding and related extensions.
- Amendment 2 (in development at the time of writing) adds support for haptics, augmented reality, avatars, interactivity, MPEG-I audio and lighting.
- A second edition (published as ISO/IEC 23090-14:2025) consolidates the base text and amendments.

For the extension-by-extension model and the MAF/Presentation Engine architecture, see the Tech view: [MPEG-I Scene Description and glTF 2.0 extensions](/tech/xr/mpeg-i-scene-description).

## Related MPEG Specifications

MPEG defines the immersive media and scene-description formats used in XR.

### MPEG-I Scene Description

| Number                                                           | Title                                                                                         |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [ISO/IEC 23090-14:2023](https://www.iso.org/standard/80900.html) | Information technology - Coded representation of immersive media - Part 14: Scene description |

## Related 3GPP Specifications

These 3GPP deliverables cover how XR media is carried, delivered and rendered over 5G, plus device and radio requirements.

TR 26.928 (Extended Reality (XR) in 5G, Release 16) and TR 26.998 (Release 17, glass-type AR/MR devices) are the studies that anchor the 3GPP work; TR 26.998 defined the **STAR** (Stand-alone AR) and **EDGAR** (Edge-Dependent AR) device classes referenced throughout the later specifications. TS 26.119 (MeCAR, Media Capabilities for Augmented Reality) turns these into concrete, testable device capabilities. See the [Tech page](/tech/xr) for the architecture analysis.

### Use Cases, Scenarios, Requirements, Devices

| Number                                                    | Type | Title                                                                                                                     | Status               | WG  |
| --------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- | --- |
| [23.700-23](https://www.3gpp.org/dynareport/23700-23.htm) | TR   | Study on Application enabler for XR Services                                                                              | Draft                | S6  |
| [23.700-60](https://www.3gpp.org/dynareport/23700-60.htm) | TR   | Study on XR (Extended Reality) and media services                                                                         | Under change control | S2  |
| [23.700-70](https://www.3gpp.org/dynareport/23700-70.htm) | TR   | Study on architecture enhancement for Extended Reality and Media service (XRM); Phase 2                                   | Draft                | S2  |
| [26.862](https://www.3gpp.org/dynareport/26862.htm)       | TR   | Immersive Teleconferencing and Telepresence for Remote Terminals (ITT4RT) Use Cases, Requirements and Potential Solutions | Under change control | S4  |
| [26.928](https://www.3gpp.org/dynareport/26928.htm)       | TR   | Extended Reality (XR) in 5G                                                                                               | Under change control | S4  |
| [26.930](https://www.3gpp.org/dynareport/26930.htm)       | TR   | Study on the enhancement for Immersive Real-Time communication for WebRTC                                                 | Draft                | S4  |
| [26.998](https://www.3gpp.org/dynareport/26998.htm)       | TR   | Support of 5G glass-type Augmented Reality / Mixed Reality (AR/MR) devices                                                | Under change control | S4  |

#### New Radio enhancements for XR

| Number                                              | Type | Title                                             | Status               | WG  |
| --------------------------------------------------- | ---- | ------------------------------------------------- | -------------------- | --- |
| [38.835](https://www.3gpp.org/dynareport/38835.htm) | TR   | Study on XR enhancements for NR                   | Under change control | R2  |
| [38.838](https://www.3gpp.org/dynareport/38838.htm) | TR   | Study on XR (Extended Reality) evaluations for NR | Under change control | R1  |

#### Split rendering

The Split Rendering Media Service Enabler (TS 26.565, Release 18) specifies split rendering — dividing the rendering workload between an EDGAR-class device and a network renderer — for non-IMS media services. See the [Tech page](/tech/xr) for the mechanism (SRC/SRS roles, the SWAP control protocol, WebRTC transport). The following deliverables specify the media service and the immersive audio handling for these scenarios.

| Number                                              | Type | Title                                                       | Status | WG  |
| --------------------------------------------------- | ---- | ----------------------------------------------------------- | ------ | --- |
| [26.249](https://www.3gpp.org/dynareport/26249.htm) | TS   | Immersive Audio for Split Rendering Scenarios               | Draft  | S4  |
| [26.865](https://www.3gpp.org/dynareport/26865.htm) | TR   | Immersive Audio for Split Rendering Scenarios; Requirements | Draft  | S4  |

### Media capabilities and services

| Number                                              | Type | Title                                    | Status | WG  |
| --------------------------------------------------- | ---- | ---------------------------------------- | ------ | --- |
| [26.119](https://www.3gpp.org/dynareport/26119.htm) | TS   | Media Capabilities for Augmented Reality | Draft  | S4  |
| [26.143](https://www.3gpp.org/dynareport/26143.htm) | TS   | Messaging Media profiles                 | Draft  | S4  |
| [26.565](https://www.3gpp.org/dynareport/26565.htm) | TS   | Split Rendering Media Service Enabler    | Draft  | S4  |

### Codecs

#### IVAS (Immersive Voice and Audio Services)

| Number                                              | Type | Title                                                                                                                                  | Status               | WG  |
| --------------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --- |
| [26.250](https://www.3gpp.org/dynareport/26250.htm) | TS   | Codec for Immersive Voice and Audio Services - General overview                                                                        | Draft                | S4  |
| [26.251](https://www.3gpp.org/dynareport/26251.htm) | TS   | Codec for Immersive Voice and Audio Services - C code (fixed-point)                                                                    | Draft                | S4  |
| [26.252](https://www.3gpp.org/dynareport/26252.htm) | TS   | Codec for Immersive Voice and Audio Services - Test sequences                                                                          | Draft                | S4  |
| [26.253](https://www.3gpp.org/dynareport/26253.htm) | TS   | Codec for Immersive Voice and Audio Services - Detailed Algorithmic Description incl. RTP payload format and SDP parameter definitions | Draft                | S4  |
| [26.254](https://www.3gpp.org/dynareport/26254.htm) | TS   | Codec for Immersive Voice and Audio Services - Rendering                                                                               | Draft                | S4  |
| [26.255](https://www.3gpp.org/dynareport/26255.htm) | TS   | Codec for Immersive Voice and Audio Services - Error concealment of lost packets                                                       | Draft                | S4  |
| [26.256](https://www.3gpp.org/dynareport/26256.htm) | TS   | Codec for Immersive Voice and Audio Services - Jitter Buffer Management                                                                | Draft                | S4  |
| [26.258](https://www.3gpp.org/dynareport/26258.htm) | TS   | Codec for Immersive Voice and Audio Services - C code (floating-point)                                                                 | Under change control | S4  |

:::warning[Verify IVAS titles]
These IVAS deliverable titles are not yet confirmed against the 3GPP portal (automated access is blocked). Note that TS 26.255 is listed here as "Error concealment of lost packets" but as "Floating-point computational description" on the [Avatar specifications page](/standards/avatar); since the floating-point C code is listed separately above as TS 26.258, the two pages should be reconciled. Confirm the full IVAS list (TS 26.250 to TS 26.258) against the 3GPP work plan.
:::

:::warning[Verify apparent duplicate titles]
Several entries on this page carry titles that look duplicated and may be data errors: TS 26.249 and TS 26.566 both read "Immersive Audio for Split Rendering Scenarios", and TR 26.866 and TR 26.996 both read "Immersive Audio for Split Rendering Scenarios; Performance characterization". Confirm each against the 3GPP work plan before relying on the titles.
:::

### Testing methodologies and performance requirements

| Number                                              | Type | Title                                                                                 | Status               | WG  |
| --------------------------------------------------- | ---- | ------------------------------------------------------------------------------------- | -------------------- | --- |
| [26.259](https://www.3gpp.org/dynareport/26259.htm) | TS   | Subjective test methodologies for the evaluation of immersive audio systems           | Under change control | S4  |
| [26.260](https://www.3gpp.org/dynareport/26260.htm) | TS   | Objective test methodologies for the evaluation of immersive audio systems            | Under change control | S4  |
| [26.261](https://www.3gpp.org/dynareport/26261.htm) | TS   | Terminal audio quality performance requirements for immersive audio services          | Draft                | S4  |
| [26.566](https://www.3gpp.org/dynareport/26566.htm) | TS   | Immersive Audio for Split Rendering Scenarios                                         | Draft                | S4  |
| [26.861](https://www.3gpp.org/dynareport/26861.htm) | TR   | Investigations on test methodologies for immersive audio systems                      | Under change control | S4  |
| [26.866](https://www.3gpp.org/dynareport/26866.htm) | TR   | Immersive Audio for Split Rendering Scenarios; Performance characterization           | Draft                | S4  |
| [26.926](https://www.3gpp.org/dynareport/26926.htm) | TR   | Traffic Models and Quality Evaluation Methods for Media and XR Services in 5G Systems | Under change control | S4  |
| [26.996](https://www.3gpp.org/dynareport/26996.htm) | TR   | Immersive Audio for Split Rendering Scenarios; Performance characterization           | Draft                | S4  |
| [26.997](https://www.3gpp.org/dynareport/26997.htm) | TR   | IVAS codec performance characterization                                               | Draft                | S4  |

## Related 3GPP Work Items

Work items are the activities that produce the technical reports (TR) and specifications (TS) listed above. The tables below group the XR work items by 3GPP Release, newest first.

### Release 19

| Work Item | Acronym      | Title                                      | Rel    | WG  |
| --------- | ------------ | ------------------------------------------ | ------ | --- |
| 1040022   | FS_ARSpatial | Study on Spatial Computing for AR Services | Rel‑19 | S4  |

### Release 18

| Work Item | Acronym         | Title                                                         | Rel    | WG  |
| --------- | --------------- | ------------------------------------------------------------- | ------ | --- |
| 940068    | FS_XRM          | Study on architecture enhancement for XR and media services   | Rel‑18 | S2  |
| 940087    | FS_NR_XR_enh    | Study on XR (eXtended Reality) enhancements for NR            | Rel‑18 | R2  |
| 950012    | FS_eiRTCW       | Study on immersive Real-time Communication for WebRTC Phase 2 | Rel‑18 | S4  |
| 950014    | iRTCW           | Immersive Real-time Communication for WebRTC                  | Rel‑18 | S4  |
| 950013    | FS_SmarTAR      | Study on Smartly Tethering AR Glasses                         | Rel‑18 | S4  |
| 950015    | MeCAR           | Media Capabilities for Augmented Reality                      | Rel‑18 | S4  |
| 960042    | IBACS           | IMS-based AR Conversational Services                          | Rel‑18 | S4  |
| 960044    | GA4RTAR         | Generic architecture for RT and AR/MR                         | Rel‑18 | S4  |
| 960045    | SR_MSE          | Split Rendering Media Service Enabler                         | Rel‑18 | S4  |
| 960046    | 5G_RTP          | Real-time Transport Protocol Configurations                   | Rel‑18 | S4  |
| 960049    | FS_ARMRQoE      | Study on AR and MR QoE Metrics                                | Rel‑18 | S4  |
| 960050    | FS_Audio_5GSTAR | Study on Audio Aspects for Glasses-type AR/MR Devices         | Rel‑18 | S4  |

### Release 17

| Work Item | Acronym       | Title                                                                                 | Rel    | WG  |
| --------- | ------------- | ------------------------------------------------------------------------------------- | ------ | --- |
| 870013    | FS_XRTraffic  | Traffic Models and Quality Evaluation Methods for Media and XR Services in 5G Systems | Rel‑17 | S4  |
| 860062    | FS_NR_XR_eval | Study on XR (Extended Reality) evaluations for NR                                     | Rel‑17 | R1  |

### Release 16

| Work Item | Acronym | Title                                | Rel    | WG  |
| --------- | ------- | ------------------------------------ | ------ | --- |
| 810006    | FS_5GXR | Study on eXtended Reality (XR) in 5G | Rel‑16 | S4  |

## 5G-MAG tracking and contribution focus

5G-MAG tracks this work area as it moves from study to normative specification:

- MPEG-I Scene Description: ISO/IEC 23090-14 and the MPEG glTF 2.0 extensions. See [MPEG-I Scene Description and glTF 2.0 extensions](/tech/xr/mpeg-i-scene-description).
- Delivery over 5G Media Streaming: TS 26.501, TS 26.512.
- Device capabilities and split rendering: TS 26.119 (MeCAR), TS 26.565 (Split Rendering Media Service Enabler).
- Immersive audio: the IVAS codec deliverables and related split-rendering work.

This page is a tracking view; confirm against primary sources before relying on a specific status.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 26.506 as the RTC general specification; the split-rendering handling of immersive audio in TS 26.249 and its related TRs; and the exact release placement and current status of TS 26.119 (MeCAR) and TS 26.565 (Split Rendering Media Service Enabler). Verify against the 3GPP/ETSI work plan before publication.
:::

## Related Standards Work

- [Standards: Avatar Communications](/standards/avatar)
- [Standards: Volumetric Video with MPEG V3C](/standards/v3c)
- [Standards: Beyond 2D Video](/standards/beyond-2d)
- [Standards: Real-Time Communications (RTC)](/standards/rtc)
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
