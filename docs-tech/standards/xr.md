---
hide_title: true
title: XR with MPEG-I SD
sidebar_position: 18
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"/><path d="M3 7v-2a2 2 0 0 1 2 -2h2"/><path d="M3 17v2a2 2 0 0 0 2 2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 21h2a2 2 0 0 0 2 -2v-2"/></svg>
</div>
<div class="topic-banner__text">
<h1>XR with MPEG-I SD</h1>
<p>eXtended Reality (XR) covers virtual, augmented and mixed reality media delivered over 5G.</p>
</div>
</div>

## Overview

eXtended Reality (XR) covers virtual, augmented and mixed reality media delivered over 5G. 5G-MAG tracks how scenes are described and delivered (MPEG-I Scene Description), how rendering can be split between a device and the network, the immersive audio codec (Immersive Voice and Audio Services, IVAS), and the radio and device capabilities needed to support glasses-type augmented and mixed reality (AR/MR). This page groups the relevant MPEG and 3GPP deliverables, then lists the associated 3GPP work items by release. It is for anyone tracking how immersive experiences are produced, delivered and rendered over 5G.

On this page: MPEG-I Scene Description; 3GPP use cases and requirements; New Radio (NR) enhancements; split rendering; media capabilities; IVAS audio codecs; test methodologies; and work items for Releases 16 to 19.

## How the pieces fit

XR delivery over 5G is built from four layers of standardisation that reference each other:

* **Scene and media formats (MPEG).** MPEG-I Scene Description (ISO/IEC 23090-14) provides the format that describes what a 3D scene contains, where each asset sits, and how timed media (video, audio, geometry, haptics) is fetched into the scene. The immersive assets it references are defined by other MPEG-I parts, for example V3C/V-PCC and MIV (ISO/IEC 23090-5) for volumetric video and MPEG-I Immersive Audio for the audio scene.
* **Delivery (3GPP SA4).** 3GPP profiles these formats and specifies how they are carried over 5G, principally using the 5G Media Streaming (5GMS) framework ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm) architecture, [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) protocols and APIs) for streamed content and Real-Time Communication (RTC, [TS 26.506](https://www.3gpp.org/dynareport/26506.htm) and related work) for conversational and low-latency cases.
* **Device and media capabilities (3GPP SA4).** TR 26.928 and TR 26.998 established the reference architectures and device classes; TS 26.119 (MeCAR) then defines the concrete media capabilities an AR device must expose, and the split-rendering specifications (TS 26.565, TS 26.565-family) define how rendering work is divided between the device and an edge or cloud renderer.
* **Radio and system (3GPP RAN and SA2).** NR studies (TR 38.835, TR 38.838) evaluate how the radio schedules the periodic, latency-bound traffic that XR generates, while SA2 architecture studies (the 23.700-series) address how the 5G system supports XR and media (XRM) sessions.

The remainder of this page lists the deliverables in each layer, then groups the underlying 3GPP work items by release.

## Scene description: ISO/IEC 23090-14

ISO/IEC 23090-14 is Part 14 of the MPEG-I suite (ISO/IEC 23090, Coded representation of immersive media). It does not define a new file format from scratch; it extends the Khronos glTF 2.0 format (itself published as ISO/IEC 12113) with a set of MPEG extensions that add external and timed media, buffering, spatial audio, anchoring, interactivity, avatars, lighting and haptics. The standard also defines a runtime processing model split between a **Presentation Engine** (which renders the scene) and a **Media Access Function (MAF)** (which fetches and decodes media), connected through the MAF API and a buffer interface.

The first edition (ISO/IEC 23090-14:2023) has been extended by amendments and consolidated into a second edition:

* Amendment 1 added support for MPEG-I immersive audio, scene understanding and related extensions.
* Amendment 2 (in development at the time of writing) adds support for haptics, augmented reality, avatars, interactivity, MPEG-I audio and lighting.
* A second edition (published as ISO/IEC 23090-14:2025) consolidates the base text and amendments.

For the extension-by-extension model and the MAF/Presentation Engine architecture, see the Tech view: [MPEG-I Scene Description and glTF 2.0 extensions](/tech/xr/mpeg-i-scene-description).

## Related MPEG Specifications

MPEG defines the immersive media and scene-description formats used in XR.

### MPEG-I Scene Description

 Number | Title
 -- | --
[ISO/IEC 23090-14:2023](https://www.iso.org/standard/80900.html) | Information technology - Coded representation of immersive media - Part 14: Scene description

## Related 3GPP Specifications

These 3GPP deliverables cover how XR media is carried, delivered and rendered over 5G, plus device and radio requirements.

Two studies anchor the 3GPP work. TR 26.928 (Extended Reality (XR) in 5G, Release 16) introduced XR definitions, core technology enablers, device form factors, use cases, candidate client and network architectures, media formats and Quality-of-Experience factors, and drew conclusions on what 3GPP should standardise. TR 26.998 (Release 17) focused on glass-type AR/MR devices and defined two device classes that recur throughout the later specifications:

* **STAR (Stand-alone AR):** a device with enough compute, memory and power to decode and render complex AR/MR content locally.
* **EDGAR (Edge-Dependent AR):** a smaller, lighter device that depends on an edge server, the network or the cloud to perform the heavy rendering, receiving a simplified stream (typically a rendered 2D view or a lightweight scene) in return.

TS 26.119 (MeCAR, Media Capabilities for Augmented Reality) turns these into concrete, testable capabilities. It defines device categories (thin AR glasses, AR glasses, XR phone, XR HMD) and the audio, video, scene and XR-system capabilities each must support, aligned with the Khronos OpenXR runtime API and referencing MPEG-I Scene Description (and optionally V3C, ISO/IEC 23090-5) for the media it consumes.

### Use Cases, Scenarios, Requirements, Devices

 Number | Type | Title | Status | WG
 -- | -- | -- | -- | --
[23.700-23](https://www.3gpp.org/dynareport/23700-23.htm) | TR | Study on Application enabler for XR Services | Draft | S6
[23.700-60](https://www.3gpp.org/dynareport/23700-60.htm) | TR | Study on XR (Extended Reality) and media services | Under change control | S2
[23.700-70](https://www.3gpp.org/dynareport/23700-70.htm) | TR | Study on architecture enhancement for Extended Reality and Media service (XRM); Phase 2 | Draft | S2
[26.862](https://www.3gpp.org/dynareport/26862.htm) | TR | Immersive Teleconferencing and Telepresence for Remote Terminals (ITT4RT) Use Cases, Requirements and Potential Solutions | Under change control | S4
[26.928](https://www.3gpp.org/dynareport/26928.htm) | TR | Extended Reality (XR) in 5G | Under change control | S4
[26.930](https://www.3gpp.org/dynareport/26930.htm) | TR | Study on the enhancement for Immersive Real-Time communication for WebRTC | Draft | S4
[26.998](https://www.3gpp.org/dynareport/26998.htm) | TR | Support of 5G glass-type Augmented Reality / Mixed Reality (AR/MR) devices | Under change control | S4

#### New Radio enhancements for XR

 Number | Type | Title | Status | WG
 -- | -- | -- | -- | --
[38.835](https://www.3gpp.org/dynareport/38835.htm) | TR | Study on XR enhancements for NR | Under change control | R2
[38.838](https://www.3gpp.org/dynareport/38838.htm) | TR | Study on XR (Extended Reality) evaluations for NR | Under change control | R1

#### Split rendering

Split rendering divides the rendering workload between the device and the network (for example an edge or cloud renderer), so that lightweight AR/MR devices (the EDGAR class above) can present complex scenes. The device sends its pose (and optionally other inputs) upstream; a network renderer produces the corresponding view and streams it back with low latency, applying pose-correction techniques on the device to hide the round-trip delay. The Split Rendering Media Service Enabler (TS 26.565, Release 18) specifies this for non-IMS media services: a Split Rendering Client (SRC) and Split Rendering Server (SRS) exchange a configuration message and a rendering-description message over a control protocol (SWAP), with the rendered media carried over WebRTC. The following deliverables specify the media service and the immersive audio handling for these scenarios.

 Number | Type | Title | Status | WG
 -- | -- | -- | -- | --
[26.249](https://www.3gpp.org/dynareport/26249.htm) | TS | Immersive Audio for Split Rendering Scenarios | Draft | S4
[26.865](https://www.3gpp.org/dynareport/26865.htm) | TR | Immersive Audio for Split Rendering Scenarios; Requirements | Draft | S4

### Media capabilities and services

 Number | Type | Title | Status | WG
 -- | -- | -- | -- | --
[26.119](https://www.3gpp.org/dynareport/26119.htm) | TS | Media Capabilities for Augmented Reality | Draft | S4
[26.143](https://www.3gpp.org/dynareport/26143.htm) | TS | Messaging Media profiles | Draft | S4
[26.565](https://www.3gpp.org/dynareport/26565.htm) | TS | Split Rendering Media Service Enabler | Draft | S4

### Codecs
#### IVAS (Immersive Voice and Audio Services)

 Number | Type | Title | Status | WG
 -- | -- | -- | -- | --
[26.250](https://www.3gpp.org/dynareport/26250.htm) | TS | Codec for Immersive Voice and Audio Services - General overview | Draft | S4
[26.251](https://www.3gpp.org/dynareport/26251.htm) | TS | Codec for Immersive Voice and Audio Services - C code (fixed-point) | Draft | S4
[26.252](https://www.3gpp.org/dynareport/26252.htm) | TS | Codec for Immersive Voice and Audio Services - Test sequences | Draft | S4
[26.253](https://www.3gpp.org/dynareport/26253.htm) | TS | Codec for Immersive Voice and Audio Services - Detailed Algorithmic Description incl. RTP payload format and SDP parameter definitions | Draft | S4
[26.254](https://www.3gpp.org/dynareport/26254.htm) | TS | Codec for Immersive Voice and Audio Services - Rendering | Draft | S4
[26.255](https://www.3gpp.org/dynareport/26255.htm) | TS | Codec for Immersive Voice and Audio Services - Error concealment of lost packets | Draft | S4
[26.256](https://www.3gpp.org/dynareport/26256.htm) | TS | Codec for Immersive Voice and Audio Services - Jitter Buffer Management | Draft | S4
[26.258](https://www.3gpp.org/dynareport/26258.htm) | TS | Codec for Immersive Voice and Audio Services - C code (floating-point) | Under change control | S4

:::caution[Verify IVAS titles]
These IVAS deliverable titles are not yet confirmed against the 3GPP portal (automated access is blocked). Note that TS 26.255 is listed here as "Error concealment of lost packets" but as "Floating-point computational description" on the [Avatar specifications page](/tech/standards/avatar); since the floating-point C code is listed separately above as TS 26.258, the two pages should be reconciled. Confirm the full IVAS list (TS 26.250 to TS 26.258) against the 3GPP work plan.
:::

:::caution[Verify apparent duplicate titles]
Several entries on this page carry titles that look duplicated and may be data errors: TS 26.249 and TS 26.566 both read "Immersive Audio for Split Rendering Scenarios", and TR 26.866 and TR 26.996 both read "Immersive Audio for Split Rendering Scenarios; Performance characterization". Confirm each against the 3GPP work plan before relying on the titles.
:::

### Testing methodologies and performance requirements

 Number | Type | Title | Status | WG
 -- | -- | -- | -- | --
[26.259](https://www.3gpp.org/dynareport/26259.htm) | TS | Subjective test methodologies for the evaluation of immersive audio systems | Under change control | S4
[26.260](https://www.3gpp.org/dynareport/26260.htm) | TS | Objective test methodologies for the evaluation of immersive audio systems | Under change control | S4
[26.261](https://www.3gpp.org/dynareport/26261.htm) | TS | Terminal audio quality performance requirements for immersive audio services | Draft | S4
[26.566](https://www.3gpp.org/dynareport/26566.htm) | TS | Immersive Audio for Split Rendering Scenarios | Draft | S4
[26.861](https://www.3gpp.org/dynareport/26861.htm) | TR | Investigations on test methodologies for immersive audio systems | Under change control | S4
[26.866](https://www.3gpp.org/dynareport/26866.htm) | TR | Immersive Audio for Split Rendering Scenarios; Performance characterization | Draft | S4
[26.926](https://www.3gpp.org/dynareport/26926.htm) | TR | Traffic Models and Quality Evaluation Methods for Media and XR Services in 5G Systems | Under change control | S4
[26.996](https://www.3gpp.org/dynareport/26996.htm) | TR | Immersive Audio for Split Rendering Scenarios; Performance characterization | Draft | S4
[26.997](https://www.3gpp.org/dynareport/26997.htm) | TR | IVAS codec performance characterization | Draft | S4

## Related 3GPP Work Items

Work items are the activities that produce the technical reports (TR) and specifications (TS) listed above. The tables below group the XR work items by 3GPP Release, newest first.

### Release 19

Work Item | Acronym | Title | Rel | WG
-- | -- | -- | -- | --
1040022 | FS_ARSpatial | Study on Spatial Computing for AR Services | Rel‑19 | S4

### Release 18

Work Item | Acronym | Title | Rel | WG
-- | -- | -- | -- | --
940068 | FS_XRM | Study on architecture enhancement for XR and media services | Rel‑18 | S2
940087 | FS_NR_XR_enh | Study on XR (eXtended Reality) enhancements for NR | Rel‑18 | R2
950012 | FS_eiRTCW | Study on immersive Real-time Communication for WebRTC Phase 2 | Rel‑18 | S4
950014 | iRTCW | Immersive Real-time Communication for WebRTC | Rel‑18 | S4
950013 | FS_SmarTAR | Study on Smartly Tethering AR Glasses | Rel‑18 | S4
950015 | MeCAR | Media Capabilities for Augmented Reality | Rel‑18 | S4
960042 | IBACS | IMS-based AR Conversational Services | Rel‑18 | S4
960044 | GA4RTAR | Generic architecture for RT and AR/MR | Rel‑18 | S4
960045 | SR_MSE | Split Rendering Media Service Enabler | Rel‑18 | S4
960046 | 5G_RTP | Real-time Transport Protocol Configurations | Rel‑18 | S4
960049 | FS_ARMRQoE | Study on AR and MR QoE Metrics | Rel‑18 | S4
960050 | FS_Audio_5GSTAR | Study on Audio Aspects for Glasses-type AR/MR Devices | Rel‑18 | S4

### Release 17

Work Item | Acronym | Title | Rel | WG
-- | -- | -- | -- | --
870013 | FS_XRTraffic | Traffic Models and Quality Evaluation Methods for Media and XR Services in 5G Systems | Rel‑17 | S4
860062 | FS_NR_XR_eval | Study on XR (Extended Reality) evaluations for NR | Rel‑17 | R1

### Release 16

Work Item | Acronym | Title | Rel | WG
-- | -- | -- | -- | --
810006 | FS_5GXR | Study on eXtended Reality (XR) in 5G | Rel‑16 | S4

## 5G-MAG tracking and contribution focus

5G-MAG follows this work area as it moves from study to normative specification, and maintains reference tools that implement the scene-description parts of it. The practical focus is:

* **MPEG-I Scene Description playback.** Reference tools implement the ISO/IEC 23090-14 processing model (Presentation Engine, MAF API, buffers) and the MPEG glTF 2.0 extensions, targeting handheld AR (XR phone) and head-mounted displays (XR HMD). See the developer view under [XR Media Integration in 5G](/tech/xr) and the Tech page [MPEG-I Scene Description and glTF 2.0 extensions](/tech/xr/mpeg-i-scene-description).
* **Delivery over 5G Media Streaming.** How scene-description content and its referenced media are carried using the 5GMS framework (TS 26.501, TS 26.512), so that immersive media can be delivered adaptively and under network/operator policy.
* **Device capabilities and split rendering.** Tracking MeCAR (TS 26.119) and the Split Rendering Media Service Enabler (TS 26.565) as they stabilise, since these define how EDGAR-class devices interoperate with network renderers.
* **Immersive audio.** Tracking the IVAS codec deliverables and the immersive-audio split-rendering work listed above; note the verification cautions on the IVAS titles.

This page is a tracking view. Statuses and working-group assignments follow the 3GPP work plan and can change between meetings; confirm against the primary sources before relying on a specific status.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 26.506 as the RTC general specification; the split-rendering handling of immersive audio in TS 26.249 and its related TRs; and the exact release placement and current status of TS 26.119 (MeCAR) and TS 26.565 (Split Rendering Media Service Enabler). Verify against the 3GPP/ETSI work plan before publication.
:::

## Related Standards Work

* [Standards: Avatar Communications](/tech/standards/avatar)
* [Standards: Volumetric Video with V3C](/tech/standards/v3c)
* [Standards: Beyond 2D Video](/tech/standards/beyond-2d)
* [Standards: Real-Time Communications](/tech/standards/rtc)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
