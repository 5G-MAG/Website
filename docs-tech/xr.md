---
hide_title: true
title: XR and MPEG-I Scene Description
sidebar_position: 5
description: "Overview of 5G-MAG's XR work: MPEG-I Scene Description, its 5G delivery, device capabilities (MeCAR), and split rendering for AR/MR."
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"/><path d="M3 7v-2a2 2 0 0 1 2 -2h2"/><path d="M3 17v2a2 2 0 0 0 2 2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 21h2a2 2 0 0 0 2 -2v-2"/></svg>
</div>
<div class="topic-banner__text">
<h1>XR and MPEG-I Scene Description</h1>
</div>
</div>

<div class="topic-lead">
Interactive, spatially-aware 3D scenes and immersive media delivered over 5G Media Streaming.
</div>

Extended Reality (XR) and 3D scene delivery bring interactive, spatially-aware content to 5G devices, from augmented reality overlays to full virtual environments. 5G-MAG's work centres on MPEG-I Scene Description (ISO/IEC 23090-14), a standard format for describing dynamic 3D scenes composed of glTF (GL Transmission Format) 3D objects, audio, and haptic elements. Scene Description content can be transported using the 5G Media Streaming (5GMS) framework (3GPP [TS 26.512](https://www.3gpp.org/dynareport/26512.htm)), enabling adaptive and policy-driven delivery of immersive media. 5G-MAG also covers [Avatar Communications](./avatar-communications), addressing real-time avatar representation and interaction in 5G contexts. For acronyms used here, see the [Glossary](/tech/standards/glossary).

:::tip[Start here]
New to this area? Read the [Overview on MPEG-I Scene Description](./xr/mpeg-i-scene-description) first for the scene-description model, then see [Avatar Communications](./avatar-communications) for real-time avatar work.
:::

**Key specifications:** ISO/IEC 23090-14 (MPEG-I Scene Description), 3GPP [TR 26.928](https://www.3gpp.org/dynareport/26928.htm) (Extended Reality (XR) in 5G), TS 26.512 (5GMS transport), ISO/IEC 23090-2 (OMAFv2, the second edition of the Omnidirectional Media Format for omnidirectional/360-degree media).

**Reference tools:** The 5G-MAG software implementation is on the Developer Portal under [XR Media Integration in 5G](/developer/xr).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The scene-description model, runtime, and device architecture. Closely related to Avatar and Volumetric Video.</p>
<ul class="godeeper-card__links">
<li><a href="./xr/mpeg-i-scene-description">Overview on MPEG-I Scene Description</a></li>
<li><a href="./avatar-communications">Avatar Communications</a></li>
<li><a href="./volumetric">Volumetric Video</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>The normative specifications and 5G-MAG's contributions.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/xr">Standards: XR Media with MPEG-I Scene Description</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference implementation for MPEG-I Scene Description delivery.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/xr">XR Media Integration in 5G</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/9)

The slide deck below introduces the XR Media reference tools and how MPEG-I Scene Description is used in 5G delivery.

<iframe width="60%" height="520" src="/docs/Reference_Tools_XR_Media_MPEG_I_SD.pdf" title="Slide deck: XR Media and MPEG-I Scene Description reference tools"></iframe>

*Slide deck: XR Media and MPEG-I Scene Description reference tools.*

[Download the Slidedeck](/docs/Reference_Tools_XR_Media_MPEG_I_SD.pdf)

---

## Information related to Standards

[Standards: XR Media with MPEG-I Scene Description](/tech/standards/xr)

---

## Technical Documentation

The following resources are available:

### General information about XR and MPEG-I Scene Description

* [**Overview on MPEG-I Scene Description**](./xr/mpeg-i-scene-description)
* **VideoTech:** [Teaser on 5G and XR (3GPP Release 16/17/18)](./videos)

## Technical foundations

XR delivery combines a scene format, a runtime that plays it, a delivery layer over 5G, and a device capability model. This section explains how they connect; the child page goes deeper on the scene format and its extensions.

### The scene format and its runtime model

MPEG-I Scene Description (ISO/IEC 23090-14) extends Khronos glTF 2.0 (also published as ISO/IEC 12113). glTF describes the static scene: node hierarchy, meshes, materials, textures, cameras and animations. The MPEG extensions add what glTF alone cannot express: references to external and timed media, circular buffers for streaming, spatial audio, real-world anchoring, interactivity, avatars, lighting and haptics.

At runtime, ISO/IEC 23090-14 defines a processing model with two roles:

* The **Presentation Engine** parses the scene, renders each frame, and drives playback. It knows the viewer's pose and object poses and can pass that information downstream so delivery can be optimised (for example, fetching only the parts of a scene that are visible).
* The **Media Access Function (MAF)** is asked, through the **MAF API**, to make a media object available in a given format. It builds a pipeline (access, demux, decode, format conversion) appropriate to the object's MIME type and codec parameters, and writes the result into **buffers** that the Presentation Engine reads. The MAF is deliberately transport- and codec-agnostic: the same scene can be served over MPEG-DASH, RTP/SRTP or local files without changing the scene document.

This decoupling is the core interoperability contract of the standard. The [MPEG-I Scene Description and glTF 2.0 extensions](./xr/mpeg-i-scene-description) page details the extensions and the buffer/MAF interfaces.

### Delivery over 5G

3GPP profiles these formats for delivery. For streamed and on-demand immersive media, the 5G Media Streaming (5GMS) framework applies: [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) defines the architecture (Media Session Handler, Media AF/AS, provisioning and reporting) and TS 26.512 defines the protocols and APIs. Scene-description content and its referenced media objects are treated as media that 5GMS can provision, deliver adaptively and report on. For conversational and low-latency AR (for example AR calls), the Real-Time Communication work (the [TS 26.506](https://www.3gpp.org/dynareport/26506.htm)/RTC family) applies, and split rendering (below) uses WebRTC transport.

### Device architecture and capabilities

TR 26.928 (Rel-16) and [TR 26.998](https://www.3gpp.org/dynareport/26998.htm) (Rel-17) established the reference architectures for XR and for glass-type AR/MR devices, and the STAR (stand-alone) and EDGAR (edge-dependent) device classes. [TS 26.119](https://www.3gpp.org/dynareport/26119.htm) (MeCAR) turns these into a concrete capability model: device categories (thin AR glasses, AR glasses, XR phone, XR HMD) and the audio, video, scene and XR-system capabilities each supports. MeCAR aligns the on-device XR client with the Khronos **OpenXR** runtime API, so an AR application can query poses, spaces and inputs in a portable way. It also references MPEG-I Scene Description (and optionally V3C, ISO/IEC 23090-5) as the media it must be able to consume.

### Split rendering

A STAR device can render a complex scene locally. An EDGAR device cannot, so rendering is split: the device sends its pose (and inputs) to a network renderer (edge or cloud), which produces the matching view and streams it back with low latency. Because a network round trip is visible as latency, the device applies pose-correction (for example asynchronous time-warp) to the received frame using the latest local pose.

The Split Rendering Media Service Enabler ([TS 26.565](https://www.3gpp.org/dynareport/26565.htm), Rel-18) specifies this for non-IMS services. A Split Rendering Client (SRC) and a Split Rendering Server (SRS) establish a session using the SWAP control protocol: a configuration message carries the client's split-rendering configuration to the server, and a rendering-description message carries the description of the split-rendered media back to the client. The rendered media itself is carried over WebRTC. Immersive audio for split-rendering scenarios is handled by a separate set of SA4 deliverables (see the Standards view).

## Related Technical Papers and Documents
* [MPEG-I Scene Description: A dynamic scene description framework for immersive media](https://www.ibc.org/download?ac=24724), by T. Stockhammer (Qualcomm), I. Bouazizi (Qualcomm), M.-L. Champel (Xiaomi), E. Potetsianakis (Nokia), E. Thomas (Xiaomi), L. Kondrad (Nokia), E. Alexiou (TNO), G. Martin-Cocher (InterDigital), G. Bhullar (InterDigital), Q. Avril (InterDigital), Q. Galvane (InterDigital), J. Regateiro (InterDigital), P. Hirtzlin (InterDigital)
* glTF 2.0 extension in MPEG and 3GPP ([link](https://www.khronos.org/assets/uploads/developers/presentations/glTF_2.0_Extensions_in_MPEG_and_3GPP_.pdf))

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 26.506 as the RTC general specification; and the current release placement and status of TS 26.119 (MeCAR) and TS 26.565 (Split Rendering Media Service Enabler). Verify against the 3GPP/ETSI work plan before publication.
:::

## Related

* [Avatar Communication with MPEG ARF](./avatar-communications): real-time conversational avatars, which reuse the MPEG-I Scene Description avatar extensions covered here.
* [Volumetric Video](./volumetric): 3D point-cloud and immersive video content that can be composed into MPEG-I scenes.
* [Standards: XR Media with MPEG-I Scene Description](/tech/standards/xr): the standards-tracking view of this topic.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
