---
title: Scope
hide_title: true
sidebar_position: 0
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4.338 5.53c5.106 1.932 10.211 1.932 15.317 0a1 1 0 0 1 1.345 .934v11c0 .692 -.692 1.2 -1.34 .962c-5.107 -1.932 -10.214 -1.932 -15.321 0c-.648 .246 -1.339 -.242 -1.339 -.935v-11.027a1 1 0 0 1 1.338 -.935l0 .001" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Beyond 2D Evaluation Framework</span>
<h1>Scope</h1>
<p>This page describes the specifications within the scope of the Beyond 2D tools and the context for how they are meant to be used.</p>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a></div>

This page describes the specifications within the scope of the Beyond 2D tools and the context for how they are meant to be used.

The Beyond 2D Evaluation Framework supports the systematic assessment of next-generation video formats that go past a single flat 2D image, such as multi-view video plus depth, point clouds, and other immersive representations. The emphasis is on evaluation and characterization: providing a repeatable way to compare encoding, delivery, and rendering pipelines for these formats so that results can feed into standardization. This aligns directly with 3GPP's feasibility study FS_Beyond2D and the resulting technical report TR 26.956, "Evaluation and Characterization of Beyond 2D Video Formats and Codecs," which this work tracks.

From an implementer's point of view, the value here is a common, transparent test setup rather than a shipping playback product: defined test content, processing steps, and metrics that let you benchmark candidate formats and codecs on a like-for-like basis. Where volumetric coding is in scope, the framework relates to Visual Volumetric Video-based Coding (V3C, ISO/IEC 23090-5); for delivery evaluation it touches common packaging such as the Common Media Application Format (CMAF). Because this is an evaluation-focused effort tied to an active 3GPP study, the set of dedicated reference tools is smaller than for 5G-MAG's product-oriented projects, and it overlaps with the volumetric tooling; this page states that scope plainly rather than over-claiming a large standalone toolset.

For the authoritative, current list of repositories and their status, see the [GitHub Repos](./repositories) page; roadmap items are tracked from the [Project Roadmap](./projects). For related encoding and rendering tools, see the [V3C Immersive Platform](../v3c) project.

## Standards being implemented

The Beyond 2D work relates to the following specifications and work items. For the full, maintained list, see the standards portal page linked below.

| Specification / work item | Title |
| -- | -- |
| [3GPP FS_Beyond2D](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240479.zip) | Feasibility Study on Beyond 2D Video |
| [3GPP TR 26.956](https://www.3gpp.org/dynareport/26956.htm) | Evaluation and Characterization of Beyond 2D Video Formats and Codecs |
| [ISO/IEC 23090-5](https://www.iso.org/standard/83535.html) | V3C (referenced where volumetric coding is evaluated) |

## What the framework implements

The Beyond 2D Evaluation Framework is a test setup, not a shipping player. It provides a repeatable way to run candidate formats and codecs through the same pipeline and compare the results. It is organised around the evaluation scenarios from the 3GPP study, which the reference repository lists as:

1. **UE-to-UE stereoscopic video live streaming** (stereoscopic format, live/device-to-device).
2. **Streaming of professionally produced volumetric video**, a single asset containing people (point-cloud format, on-demand).
3. **On-demand streaming of multi-view plus depth** (MV+D format, on-demand).

The repository separates the multi-view-plus-depth (`mvd`) and point-cloud content, reflecting the different processing chains each family needs.

### Formats, codecs, and metrics

| Format family | Coding approaches | V3C relation |
| -- | -- | -- |
| Stereoscopic | MV-HEVC; simulcast/frame-compatible anchor | Not V3C-based |
| Multi-view plus depth | MV-HEVC; MIV (ISO/IEC 23090-12) | MIV is a V3C profile |
| Dense point cloud | V-PCC (ISO/IEC 23090-5); G-PCC for comparison | V-PCC is part of ISO/IEC 23090-5 |

The pipeline runs encode, package, deliver (under a 5G Media Streaming / DASH assumption), decode, and render, then measures quality on both source views and rendered pose-trace views. Reported metrics include PSNR, IV-PSNR, and VMAF against bitrate. Because source sequences, coded bitstreams, and rendered pose-trace videos are large, the framework references content on external servers rather than bundling it.

### How the tools map to the standard

The framework tracks 3GPP FS_Beyond2D and TR 26.956. Where volumetric or MV+D content is evaluated, it reuses V3C tooling (V-PCC and MIV), which is why this project overlaps with, and is smaller than, the product-oriented [V3C Immersive Platform](../v3c). The set of dedicated repositories is therefore intentionally compact; for the authoritative, current list and status see the [GitHub Repos](./repositories) page.

## Getting started

1. Read the [Beyond 2D Video](/tech/volumetric/beyond2d) Tech page for the scenarios, formats, and metrics.
2. Check the [GitHub Repos](./repositories) page for the current repository (or repositories) and clone the evaluation framework.
3. Follow the repository README to obtain the referenced test content and run the per-scenario encode, deliver, decode, and metric steps.
4. Track open work on the [Project Roadmap](./projects).

## Go deeper

Technical documentation providing context to this project can be found in the link below.

[Tech: Volumetric & Beyond 2D Video Experiences](/tech/volumetric)

A list of relevant specifications can be found in the link below.

[Standards: Beyond 2D Video Experiences](/tech/standards/beyond-2d)

:::caution[References to verify]
These specifics on this page were not confirmed against the primary source (the 3GPP/ETSI portals block automated access, so the TR 26.956 text could not be machine-checked): the exact codec and anchor set per format family (MV-HEVC, V-PCC, G-PCC, MIV) and the exact metric set (PSNR, IV-PSNR, VMAF). The scenario names and the `mvd`/point-cloud repository structure are taken from the 5G-MAG reference-tools repository. Verify against TR 26.956, the SA4 work plan, and the repository READMEs before relying on it externally.
:::

