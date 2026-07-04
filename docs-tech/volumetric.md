---
hide_title: true
title: Volumetric Video
sidebar_position: 6
description: "Overview of 5G-MAG's MPEG V3C volumetric video work: V-PCC and MIV coding, bitstream structure, delivery over 5G, and reference tools."
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2"/><path d="M4 16v2a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M16 20h2a2 2 0 0 0 2 -2v-2"/><path d="M12 12.5l4 -2.5"/><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5"/><path d="M8 10v4.5l4 2.5"/></svg>
</div>
<div class="topic-banner__text">
<h1>Volumetric Video</h1>
</div>
</div>

<div class="topic-lead">
3D point-cloud and mesh video that lets viewers move freely around a scene, built on MPEG V3C.
</div>

Volumetric video represents 3D objects and scenes as point clouds or mesh-based data, so viewers can move freely around the content rather than watching from a fixed camera angle. For acronyms used here, see the [Glossary](/tech/standards/glossary).

5G-MAG's work is built on MPEG V3C (Visual Volumetric Video-based Coding, ISO/IEC 23090-5), the framework that defines the container and compression for volumetric content. Two profiles build on it: V-PCC (Video-based Point Cloud Compression) and MIV (MPEG Immersive Video).

The V3C Immersive Platform reference tools provide an end-to-end pipeline for encoding, streaming, and rendering V3C content over 5G networks. The [Beyond-2D initiative](./volumetric/beyond2d) extends this to evaluation frameworks for next-generation visual experiences.

:::tip[Start here]
New to volumetric video? Start with the [V3C standards tracking page](/tech/standards/v3c) for the specifications in scope, or the [Beyond 2D Video](./volumetric/beyond2d) tech page for the evaluation work. Implementers can find the reference software on the Developer Portal (linked under Reference tools below).
:::

**Key specifications:** ISO/IEC 23090-5 (V3C and V-PCC, Video-based Point Cloud Compression), ISO/IEC 23090-12 (MIV, MPEG Immersive Video), ISO/IEC 23090-10 (carriage of V3C data, that is how the coded data is stored in and transported by file and streaming formats), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (5G Media Streaming (5GMS) transport for volumetric content delivery).

**Reference tools:** The 5G-MAG software implementation is on the Developer Portal under [V3C Immersive Platform](/developer/v3c) and [Beyond-2D Evaluation Framework](/developer/beyond-2d).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>How V3C works (projection, patches, bitstream components), V-PCC vs MIV, and the Beyond-2D evaluation work.</p>
<ul class="godeeper-card__links">
<li><a href="./volumetric/beyond2d">Beyond 2D Video</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>The MPEG V3C specifications in scope, and the related Beyond-2D standards tracking.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/v3c">Standards: Volumetric Video with MPEG V3C</a></li>
<li><a href="/tech/standards/beyond-2d">Standards: Beyond 2D Video</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>End-to-end encoding, streaming and rendering pipelines for volumetric content.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/v3c">V3C Immersive Platform</a></li>
<li><a href="/developer/beyond-2d">Beyond-2D Evaluation Framework</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/10)

The slide deck below introduces the V3C Immersive Platform reference tools and the volumetric delivery pipeline.

<iframe width="60%" height="520" src="/docs/Reference_Tools_V3C_Immersive_Platform.pdf" title="Slide deck: V3C Immersive Platform reference tools"></iframe>

*Slide deck: V3C Immersive Platform reference tools.*

[Download the Slidedeck](/docs/Reference_Tools_V3C_Immersive_Platform.pdf)

---

## Information related to Standards

[Standards: Volumetric Video Experiences with MPEG V3C](/tech/standards/v3c)

[Standards: Beyond 2D Video Experiences](/tech/standards/beyond-2d)

---

## Technical Documentation

The following resources are available:

### General information about MPEG V3C

* [Beyond 2D Video](./volumetric/beyond2d): the 5G-MAG evaluation and characterisation work for next-generation visual formats, related to 3GPP [TR 26.956](https://www.3gpp.org/dynareport/26956.htm).

#### VideoTech

The talk below, "AWE EU 2022 Day 1 XR Enablement Track: Video Based Immersive Codecs", introduces video-based immersive codecs (V3C, V-PCC and MIV).

<iframe width="560" height="315" src="https://www.youtube.com/embed/woNCWjx_S2s?si=XhQ8XOjvlQCXRXz1" title="AWE EU 2022 Day 1 XR Enablement Track: Video Based Immersive Codecs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Technical Papers
* [Efficient delivery and rendering on client devices via MPEG-I standards for emerging volumetric video experiences](https://www.interdigital.com/research_papers/efficient-delivery-and-rendering-on-client-devices-via-mpeg-i-standards-for-emerging-volumetric-video-experiences), by C. Guede (InterDigital), P. Fontaine (InterDigital), J. Mulard (InterDigital), B. Leroy (InterDigital), C. Quinquis (InterDigital), R. Gendrot (InterDigital), S. Gudumasu (InterDigital), V. Allié (InterDigital), B. Kroon (Philips), B. Sonneveldt (Philips), R. Schimanofsky (Philips)

## How V3C works, in detail

V3C (ISO/IEC 23090-5) does not define a new low-level video codec. It defines a way to represent 3D content so that conventional 2D video codecs (HEVC, and in later editions VVC) do the compression, with a compact metadata layer carrying the 3D structure. The pipeline is projection based:

1. **Projection.** The 3D source (a point cloud for V-PCC, or a set of camera views with depth for MIV) is projected onto 2D planes. For V-PCC, connected regions of the point cloud are projected onto the plane whose normal best matches the surface; for MIV, the input is already a set of views, and redundant content between views is pruned.
2. **Patch generation and packing.** Each projected region becomes a patch. Patches are packed into 2D atlas frames, and the placement is recorded in the atlas metadata so the decoder can invert the process.
3. **Component video generation.** The packing produces parallel 2D videos: a geometry video (depth or point position), an occupancy video (which samples are valid), and one or more attribute videos (texture, and optionally reflectance or transparency).
4. **Video coding.** Each component video is coded with a standard 2D video codec. This is what lets V3C reuse hardware video decoders.
5. **Multiplexing.** The coded component videos plus the atlas sub-bitstream are assembled into a V3C bitstream as a sequence of V3C units.

At the client the process runs in reverse: parse the atlas, decode the component videos, then reconstruct the point cloud (V-PCC) or synthesise the requested viewport (MIV).

### Bitstream components

A V3C bitstream carries a small number of clearly separated components:

| Component | Carries | Notes |
| -- | -- | -- |
| Atlas sub-bitstream | Patch data, tile/frame structure, parameter sets | The V3C-specific layer; not an ordinary video stream |
| Common atlas sub-bitstream (MIV) | Camera/view parameters shared across the scene | Present for MIV; lets the renderer place views in space |
| Occupancy video | Validity mask for packed samples | Ordinary 2D video |
| Geometry video | Depth (MIV) or point geometry (V-PCC) | Ordinary 2D video |
| Attribute video(s) | Texture and optional attributes | One or more ordinary 2D videos |

Because the component videos are ordinary coded video, a decoder can offload them to a hardware video decoder and reserve CPU/GPU work for the atlas parsing and 3D reconstruction. That separation is the reason V3C is practical on mobile-class hardware.

## V-PCC versus MIV

The two profiles address different capture models and reconstruct different things at the client.

**V-PCC (part of ISO/IEC 23090-5)** targets a dynamic point cloud, typically a single captured object or performer. The client reconstructs the point cloud itself, which the application can then place in a scene and view from any angle. The main coding tools are the projection of point regions onto per-normal planes, the packing of those projections, and the coding of geometry, occupancy, and attribute videos.

**MIV (ISO/IEC 23090-12, an extension of V3C)** targets a scene captured by several cameras with depth, and gives the viewer six degrees of freedom over a limited viewing volume (translation within a bounded region plus free rotation). Rather than reconstruct a full 3D model, the client synthesises the specific viewport requested by the current head pose, using the decoded texture and geometry views plus the view parameters in the common atlas. MIV defines profiles that trade decoder complexity against flexibility:

* **Main**: geometry coded with embedded occupancy.
* **Extended**: separable occupancy and additional flexibility.
* **Restricted Geometry**: constrained geometry, supporting cases such as transparency.
* **Geometry Absent**: no geometry is coded; the client derives geometry (for example by depth estimation), reducing the transmitted data at the cost of client-side processing.

Both profiles emit a V3C bitstream, so they share the same carriage and packaging, described next.

## Carriage, packaging, and delivery

ISO/IEC 23090-10 specifies how a V3C bitstream is stored in the ISO Base Media File Format (ISOBMFF, ISO/IEC 14496-12) and how the atlas and component videos are organised into tracks and multiplexed with other media. It includes support for DASH (ISO/IEC 23009-1) so a V3C presentation can be described as an adaptive streaming presentation and delivered over HTTP. An amendment adds support for packed video data, and MPEG maintains conformance and reference-software parts for carriage.

For delivery over mobile networks, the V3C DASH presentation is treated as ordinary media by the 5G Media Streaming pipeline: it is ingested, packaged, and delivered under [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) (architecture) and TS 26.512 (protocols and APIs). The 5G Media Streaming functions do not need to understand the volumetric semantics; they see DASH segments referencing coded video and metadata tracks. This is what allows volumetric assets to reuse the same CDN, packaging, and player-provisioning machinery as conventional streaming.

## Reference-tools architecture

The 5G-MAG V3C Immersive Platform reference tools implement the end-to-end path described above: encode source content into a V3C bitstream, package and deliver it, then decode and render it in real time. On the client side the work targets a Unity-based player: a V3C decoder is exposed to the engine as a plugin that decodes the atlas and the associated video sub-bitstreams (geometry, occupancy, attributes) and reconstructs the 3D representation for display. Decoupling the volumetric decoder from the presentation engine is the same separation-of-concerns pattern 5G-MAG uses across its immersive-media tools, and it mirrors the bitstream structure: the plugin owns the V3C-specific work, the engine owns presentation. For the current, authoritative repository list and status, see the Developer Portal scope and repositories pages linked below rather than any hard-coded list here.

:::caution[References to verify]
These specifics on this page were not confirmed against the primary source (the ISO catalogue entries were checked, but detailed clauses and amendment scope were not): the exact MIV profile names and their defining constraints (Main, Extended, Restricted Geometry, Geometry Absent), and the ISO/IEC 23090-10 amendment (support of packed video data) and its carriage conformance/reference-software parts. Verify against ISO/IEC 23090-5, 23090-10, and 23090-12 before publication.
:::

## Related



* [Beyond 2D Video](./volumetric/beyond2d): evaluation of formats (stereoscopic, multi-view, depth and point clouds) that sit alongside V3C volumetric video.
* [XR and MPEG-I Scene Description](./xr): scene description that can compose volumetric objects into immersive experiences.
* [Standards: Volumetric Video Experiences with MPEG V3C](/tech/standards/v3c): the standards-tracking view of this topic.
* [Standards: Beyond 2D Video Experiences](/tech/standards/beyond-2d): the standards-tracking view of the Beyond 2D evaluation work.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::

