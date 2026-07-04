---
title: Scope
hide_title: true
sidebar_position: 0
description: Describes the ISO/IEC 23090 V3C, V-PCC, and MIV specifications, architecture, and pipeline implemented by the V3C reference tools.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
  <path d="M12 12.5l4 -2.5" />
  <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" />
  <path d="M8 10v4.5l4 2.5" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">V3C Immersive Platform</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This page describes the specifications within the scope of the V3C reference tools, the codec profiles they cover, and the high-level architecture that brings context to their applicability.

The V3C Immersive Platform provides reference tools for volumetric video, content that captures 3D objects and scenes so a viewer can move freely around them rather than watching from a fixed camera. The implementation is built around MPEG Visual Volumetric Video-based Coding (V3C, ISO/IEC 23090-5), which defines a common container and bitstream structure for two related coding approaches: V-PCC (video-based point cloud compression) for volumetric objects, and MIV (MPEG Immersive Video, ISO/IEC 23090-12) for multi-view scenes with depth. The platform aims to cover an end-to-end path: encoding source content into a V3C bitstream, packaging and delivering it, then decoding and rendering it in real time.

On the rendering side, the work targets a Unity-based player so volumetric assets can be integrated into interactive applications, using the same separation-of-concerns pattern used across 5G-MAG's immersive media tools (see "What the reference tools implement" below for how the decoder plugin and the engine split the work). According to 5G-MAG, a significant part of the initial contribution came from InterDigital and Philips; treat any specific partner attribution as something to confirm against 5G-MAG's own announcements before relying on it externally.

The reference tooling in this area is still maturing, and the exact set of public repositories changes as the project develops. For the authoritative, current list of repositories and their implementation status, see the [GitHub Repos](./repositories) page rather than relying on a hard-coded list here. Implementation-status and roadmap details are tracked on the [V3C Kanban board](https://github.com/orgs/5G-MAG/projects/38) linked from the [Project Roadmap](./projects).

## Standards being implemented

The V3C reference tools relate to the following specifications. For the full, maintained list, see the standards portal page linked below.

| Specification | Title |
| -- | -- |
| [ISO/IEC 23090-5](https://www.iso.org/standard/83535.html) | Visual volumetric video-based coding (V3C) and video-based point cloud compression (V-PCC) |
| [ISO/IEC 23090-12](https://www.iso.org/standard/79113.html) | MPEG immersive video (MIV) |
| [ISO/IEC 23090-10](https://www.iso.org/standard/78991.html) | Carriage of visual volumetric video-based coding data |

## What the reference tools implement

The V3C Immersive Platform aims to cover the full path for volumetric content:

* **Encode**: turn source content (a point cloud for V-PCC, or multi-view-plus-depth for MIV) into a V3C bitstream. V3C projects the 3D data onto 2D planes, packs them, and codes the resulting geometry, occupancy, and attribute videos with a conventional 2D video codec, while the 3D structure is carried in a compact atlas metadata stream.
* **Package and deliver**: store the V3C bitstream in ISOBMFF per ISO/IEC 23090-10 and describe it as a DASH presentation so it can be delivered adaptively over HTTP, on the same 5G Media Streaming path used for other media.
* **Decode and render**: decode the atlas and the component videos and reconstruct the 3D representation for real-time display.

On the client, the platform targets a Unity-based player. A V3C decoder is exposed to the engine as a plugin: the plugin owns the V3C-specific work (parsing the atlas, decoding the geometry, occupancy, and attribute video sub-bitstreams, and reconstructing the 3D representation), while the Unity engine owns presentation and interaction. This separation lets the same decoder serve different front ends and keeps the volumetric decode path independent of the rendering engine.

### How the tools map to the standard

| Standard | What it defines | Where it appears in the tools |
| -- | -- | -- |
| ISO/IEC 23090-5 | V3C base bitstream and the V-PCC profile | Encoder output and decoder input; point-cloud reconstruction |
| ISO/IEC 23090-12 | MIV profile (multi-view plus depth) | Encoder output and decoder input; viewport synthesis for multi-view scenes |
| ISO/IEC 23090-10 | Carriage of V3C data in ISOBMFF, with DASH support | Packaging and delivery stage |

The two coding profiles produce the same V3C bitstream structure, so the carriage, delivery, and decoder-plugin machinery is shared between the point-cloud (V-PCC) and multi-view (MIV) cases.

### Release and edition coverage

ISO/IEC 23090-5 has been published in successive editions (2021, 2023, 2025). Because the reference tooling is still maturing, the exact edition and feature subset each component targets changes as the project develops; treat the edition support as tracked in the repositories rather than fixed here. For the authoritative, current list of repositories and their implementation status, see the [GitHub Repos](./repositories) page and the [V3C Kanban board](https://github.com/orgs/5G-MAG/projects/38) linked from the [Project Roadmap](./projects).

## Getting started

1. Read the [Volumetric Video](/tech/volumetric) Tech page for how V3C, V-PCC, and MIV work end to end.
2. Check the [GitHub Repos](./repositories) page for the current set of repositories and pick the component you need (encoder, decoder plugin, or player).
3. Follow the build and run instructions in each repository's README; the [Tutorials](./tutorials) page and the [Video Library](./tutorials#video-library) collect walkthroughs and demos.
4. Track open work and status on the [Project Roadmap](./projects) and the linked Kanban board.

## Go deeper

Technical documentation providing context to this project can be found in the link below.

[Tech: Volumetric & Beyond 2D Video Experiences](/tech/volumetric)

A list of relevant specifications can be found in the link below.

[Standards: Volumetric Video Experiences with MPEG V3C](/tech/standards/v3c)

## High-level architecture

### V3C Immersive Platform

The diagram below shows the end-to-end V3C pipeline, from encoding source content into a V3C bitstream, through packaging and delivery, to decoding and rendering in the Unity player via the decoder plugin.

<img loading="lazy" src="/assets/images/projects/v3c_diagram.png" style="width: 80%" alt="Block diagram of the V3C Immersive Platform pipeline: encoder producing a V3C bitstream, delivery, and a Unity player using the V3C decoder plugin for real-time rendering." />

*Figure: high-level architecture of the V3C Immersive Platform, showing the encode, deliver, decode, and render stages.*

The blocks in the diagram map to the repositories listed on the pages below.

* [V3C Immersive Platform: Repositories](./repositories)
* [Common Tools: Repositories](../common-tools/)

:::caution[References to verify]
These specifics on this page were not confirmed against a primary source: the exact ISO/IEC 23090-5 edition and the V3C/MIV feature subset each reference-tool component targets (this changes as the project develops and is tracked in the repositories). The ISO part numbers themselves (23090-5, 23090-10, 23090-12) are taken from the ISO catalogue. Verify the edition and feature coverage against the repository READMEs and the Kanban board before relying on it externally.
:::
