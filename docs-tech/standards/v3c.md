---
hide_title: true
title: Volumetric Video with V3C
sidebar_position: 17
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2"/><path d="M4 16v2a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M16 20h2a2 2 0 0 0 2 -2v-2"/><path d="M12 12.5l4 -2.5"/><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5"/><path d="M8 10v4.5l4 2.5"/></svg>
</div>
<div class="topic-banner__text">
<h1>Volumetric Video with V3C</h1>
<p>Volumetric video captures a scene in three dimensions so a viewer can change viewpoint, rather than watching a fixed 2D frame.</p>
</div>
</div>

## Overview

Volumetric video captures a scene in three dimensions so a viewer can change viewpoint, rather than watching a fixed 2D frame. Visual Volumetric Video-based Coding (V3C, ISO/IEC 23090-5) is the MPEG framework for compressing this content; it underpins Video-based Point Cloud Compression (V-PCC) and MPEG Immersive Video (MIV). 5G-MAG tracks these formats and their carriage so that volumetric and immersive content can be delivered efficiently over 5G. This page lists the relevant MPEG-I parts and is for anyone working on 3D and immersive media delivery.

## What V3C is and why it exists

Traditional video codecs (AVC, HEVC, VVC) compress a rectangular array of samples per frame. Volumetric content is different: the source is a 3D representation, either a set of points in space (a point cloud) or a set of camera views with per-pixel depth. Coding that representation directly with a new 3D codec would fragment the ecosystem and lose the maturity of existing 2D video hardware.

V3C takes a different route. It projects the 3D data onto 2D planes, packs those projections into conventional video pictures, and codes them with an existing 2D video codec (typically HEVC, and in later editions VVC). The 3D-specific information that a decoder needs to reconstruct the scene (patch positions, projection parameters, view geometry) is carried in a separate, compact metadata stream. This is the core idea of V3C: reuse hardware 2D video decoders for the heavy lifting, and add a thin volumetric layer on top.

Because the projection-and-pack approach is common to both point clouds and multi-view immersive video, MPEG factored the shared machinery into a single base specification, ISO/IEC 23090-5, and defined the two application profiles on top of it:

* **V-PCC (Video-based Point Cloud Compression)** targets a dynamic point cloud, for example a captured performer or object. It is specified within ISO/IEC 23090-5.
* **MIV (MPEG Immersive Video)** targets a scene captured by multiple cameras with depth, giving a limited range of free viewpoint. It is specified in ISO/IEC 23090-12 as an extension of the V3C base.

A separate but related MPEG approach, Geometry-based Point Cloud Compression (G-PCC, ISO/IEC 23090-9), codes point geometry directly in 3D rather than via 2D projection. G-PCC does not use the V3C bitstream structure; it is mentioned here only to place V-PCC in context, and it is outside the V3C scope tracked on this page.

## Bitstream and component structure

A V3C bitstream is organised as a sequence of V3C units. The key components are:

* **The atlas sub-bitstream**, which carries the volumetric metadata: patch data units, tile and frame structure, and the parameter sets that describe how 2D patches map back into 3D. In MIV this also includes a common atlas sub-bitstream carrying the camera (view) parameters shared across the scene.
* **The occupancy video sub-bitstream**, a 2D video that signals which samples in the packed pictures are valid.
* **The geometry video sub-bitstream**, a 2D video carrying depth or point-position information.
* **One or more attribute video sub-bitstreams**, 2D videos carrying texture (colour) and, optionally, other attributes such as reflectance or transparency.

Each video sub-bitstream is an ordinary coded video stream, so it can be decoded by a standard hardware or software video decoder. The V3C-aware layer is the atlas: a receiver parses the atlas metadata, decodes the associated video sub-bitstreams, and reconstructs the point cloud or renders the requested viewport.

## How the pieces fit

The parts listed below divide the work along clear lines:

* **Coding.** ISO/IEC 23090-5 defines the V3C base bitstream and the V-PCC profile; ISO/IEC 23090-12 defines the MIV profile as an extension. Both rely on an underlying 2D video codec for the geometry, occupancy, and attribute sub-bitstreams.
* **Storage and carriage.** ISO/IEC 23090-10 specifies how a V3C bitstream is stored in the ISO Base Media File Format (ISOBMFF, ISO/IEC 14496-12) and how the atlas and video sub-bitstreams are multiplexed, including support for DASH-based streaming so that V3C assets can be delivered adaptively over HTTP.
* **Conformance and reference software.** MPEG maintains conformance and reference-software parts for this family (for example ISO/IEC 23090-20 for V3C with V-PCC and ISO/IEC 23090-25 for carriage), which implementers use to validate encoders, decoders, and packagers.

For delivery over mobile networks, the coded V3C data and its ISOBMFF/DASH packaging are transported using the same 5G Media Streaming pipeline used for other on-demand and live media. The core 5G Media Streaming specifications are [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) (architecture) and [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (protocols and APIs); they treat a V3C DASH presentation as media content to be ingested, packaged, and delivered, without needing to understand the volumetric semantics themselves.

## MIV and V-PCC profiles

The two profiles serve different capture and consumption models:

| Profile | Typical source | Reconstruction at the client | Specified in |
| -- | -- | -- | -- |
| V-PCC | Dynamic point cloud (captured object or performer) | A reconstructed 3D point cloud the application can place and view from any angle | ISO/IEC 23090-5 |
| MIV | Multiple camera views with per-view depth | A synthesised viewport for the requested head position, within a limited viewing region (6 degrees of freedom over a bounded volume) | ISO/IEC 23090-12 |

MIV defines several profiles that trade decoder complexity against flexibility, including a Main profile (geometry coded with embedded occupancy), an Extended profile, a Restricted Geometry profile, and a Geometry Absent profile in which the client derives geometry rather than decoding it. The MIV profiles all produce a V3C bitstream, so they share the carriage and packaging machinery described above.

## Editions and status

ISO/IEC 23090-5 has progressed through successive editions (2021, 2023, and 2025); the entry in the table below links to the edition currently referenced by 5G-MAG. Later editions of the V3C base added common atlas and packed-video support that MIV depends on. ISO/IEC 23090-10 (carriage) was first published in 2022 with a subsequent amendment (support of packed video data) and a technical corrigendum. MIV (ISO/IEC 23090-12) was published in 2023, with a second edition under development in MPEG. Implementers should confirm the exact edition and any amendments against the ISO catalogue for the feature set they rely on.

## 5G-MAG tracking and contribution focus

5G-MAG follows this MPEG family so that volumetric and immersive assets can be produced, packaged, and delivered on the same 5G media pipelines as conventional video. The practical work sits in two places:

* the **V3C Immersive Platform** reference tools, which target an end-to-end encode, package, deliver, decode, and render path (including a Unity-based player using a V3C decoder plugin); and
* the **Beyond 2D Video** evaluation work, which characterises how these and adjacent formats perform, aligned to the 3GPP study on the [Beyond 2D Video](/tech/standards/beyond-2d) page.

The developer-facing scope, repositories, and getting-started material are on the 5G-MAG Developer Portal; the deeper technical treatment is on the [Volumetric Video](/tech/volumetric) Tech page.

## Related MPEG Specifications

This is a list of specifications in the scope of Volumetric Video (V3C). Part 5 (V3C and V-PCC) is the core coding framework; Part 10 specifies carriage and storage of the coded data; Part 12 (MIV) applies the framework to multi-view immersive video.

### MPEG-I Standards

 Number | Title
 -- | --
[ISO/IEC 23090-5](https://www.iso.org/standard/83535.html) | Information technology: Coded representation of immersive media - Part 5: Visual volumetric video-based coding (V3C) and video-based point cloud compression (V-PCC)
[ISO/IEC 23090-10](https://www.iso.org/standard/78991.html) | Information technology - Coded representation of immersive media - Part 10: Carriage of visual volumetric video-based coding data
[ISO/IEC 23090-12](https://www.iso.org/standard/79113.html) | Information technology - Coded representation of immersive media - Part 12: MPEG immersive video

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the ISO catalogue entries were checked, but part numbers for adjacent MPEG-I deliverables were not fully verified): ISO/IEC 23090-9 (G-PCC), ISO/IEC 23090-20 (V3C/V-PCC conformance), ISO/IEC 23090-25 (carriage conformance and reference software). Verify against the ISO/IEC JTC 1/SC 29 catalogue before publication.
:::

## Related Standards Work

* [Standards: XR with MPEG-I SD](/tech/standards/xr)
* [Standards: Beyond 2D Video](/tech/standards/beyond-2d)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
