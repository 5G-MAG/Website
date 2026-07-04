---
hide_title: true
title: Beyond 2D Video
sidebar_position: 7
description: Summarises 3GPP's FS_Beyond2D study evaluating stereoscopic, multiview and volumetric video formats and codecs for delivery over 5G.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4.338 5.53c5.106 1.932 10.211 1.932 15.317 0a1 1 0 0 1 1.345 .934v11c0 .692 -.692 1.2 -1.34 .962c-5.107 -1.932 -10.214 -1.932 -15.321 0c-.648 .246 -1.339 -.242 -1.339 -.935v-11.027a1 1 0 0 1 1.338 -.935l0 .001"/></svg>
</div>
<div class="topic-banner__text">
<h1>Beyond 2D Video</h1>
</div>
</div>

<div class="topic-lead">
Evaluating stereoscopic, multiview and volumetric video formats and codecs delivered over 5G.
</div>

## Overview

Beyond 2D Video covers media formats that go past a flat single-camera picture, such as stereoscopic 3D, multiview, depth-enhanced and volumetric video. 3GPP studied how these formats and their codecs perform over 5G in the feasibility study FS_Beyond2D, captured in TR 26.956. 5G-MAG tracks this work because it sets the evaluation baseline for delivering richer-than-2D experiences. This page lists the related 3GPP work item and technical report, and is for anyone assessing how immersive and 3D video will be carried over 5G.

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The Beyond 2D scenarios (stereoscopic, multiview plus depth, volumetric) and how they map to codecs.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/volumetric/beyond2d">Tech: Beyond 2D Video</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>An evaluation framework for characterising beyond-2D formats and codecs against this study.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/beyond-2d">Beyond 2D Evaluation Framework</a></li>
</ul>
</div>
</div>

</div>

## What the study covers

FS_Beyond2D is a feasibility and characterisation study, not a normative specification. Its purpose is to establish, on a like-for-like basis, how well candidate formats and codecs can represent richer-than-2D content and how they behave when delivered over 5G, so that later normative work in 3GPP SA4 has a documented evidence base.

The study groups the content into families of representation formats:

* **Stereoscopic video**, a left and right view giving a fixed 3D effect without free viewpoint;
* **Multiview and multi-view plus depth (MV+D)**, several camera views (with depth) that support a limited change of viewpoint;
* **Video plus depth**, a single texture view augmented with a depth map;
* **Dense point clouds**, a volumetric representation of an object or person captured in 3D.

Each family is exercised through concrete end-to-end scenarios rather than in the abstract. The reference-tools work implements these scenarios, and its repository lists them as: UE-to-UE stereoscopic video live streaming; streaming of professionally produced volumetric video (a single asset containing people); and on-demand streaming of multi-view plus depth. See the [Beyond 2D Video](/tech/volumetric/beyond2d) Tech page for the per-scenario detail.

## Codecs and how they map to the formats

The study evaluates each format with the codecs that are practical for it today, and where relevant against a 2D or simulcast anchor:

| Format family | Coding approaches evaluated | Relation to V3C |
| -- | -- | -- |
| Stereoscopic | MV-HEVC and frame-compatible or simulcast HEVC/AVC | Not V3C-based |
| Multi-view plus depth | MV-HEVC, and the MIV profile of V3C | MIV is ISO/IEC 23090-12 (a V3C profile) |
| Video plus depth | HEVC/VVC with an associated depth video | Not V3C-based (depth carried alongside) |
| Dense point cloud | V-PCC (video-based) and, for comparison, G-PCC (geometry-based) | V-PCC is part of ISO/IEC 23090-5 |

This is where the Beyond 2D work connects to the [Volumetric Video with V3C](/tech/standards/v3c) topic: the volumetric and multi-view-plus-depth scenarios are precisely the cases where V3C (V-PCC and MIV) is one of the coding approaches under evaluation.

## Evaluation method

The study defines a repeatable pipeline so that results are comparable across formats and contributors: a set of test sequences, a fixed processing chain (encode, package, deliver, decode, render), and defined quality metrics. Because several of the formats reconstruct or synthesise a viewport rather than replaying a fixed picture, quality is assessed both on source views and on rendered pose-trace views (a predefined camera path through the reconstructed content). Reported metrics include conventional PSNR alongside immersive-video measures such as IV-PSNR, and perceptual measures such as VMAF, together with bitrate. Delivery is considered in the context of 5G Media Streaming, so that the format comparison is grounded in how the content would actually be carried.

## Relationship to 5G Media Streaming

The study does not create a new delivery mechanism. It assesses these formats against the existing 5G media delivery framework: ISOBMFF/CMAF packaging and DASH-based adaptive streaming carried by 5G Media Streaming ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm) architecture, [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) protocols and APIs). The question the study helps answer is which formats and codecs are ready to be carried over that pipeline at acceptable quality and bitrate, and where gaps remain for future 3GPP work.

## 5G-MAG tracking and contribution focus

5G-MAG maintains an evaluation framework aligned to this study so that the test setup, sequences, and metrics can be reproduced independently. The framework is evaluation-oriented rather than a shipping player, and it overlaps with the volumetric tooling because the volumetric and MV+D scenarios reuse V3C encoding and rendering. The developer-facing scope and repositories are on the 5G-MAG Developer Portal; the technical detail is on the [Beyond 2D Video](/tech/volumetric/beyond2d) Tech page.

## Related 3GPP Work Items

The work item below drove the Beyond 2D Video feasibility study; it produced the technical report listed in the next section. The work-item link downloads a .zip contribution package.

 Name | Title
 -- | --
[FS_Beyond2D](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240479.zip) | Feasibility Study on Beyond 2D Video (FS_Beyond2D)

## Related 3GPP Technical Reports and Specifications

The technical report below is the output of the FS_Beyond2D study, giving the evaluation and characterisation of the formats and codecs in scope.

 Number | Title
 -- | --
[TR 26.956](https://www.3gpp.org/dynareport/26956.htm) | Evaluation and Characterization of Beyond 2D Video Formats and Codecs

:::caution[References to verify]
These specifics on this page were not confirmed against the primary source (the 3GPP/ETSI portals block automated access, so the TR 26.956 text and clause numbers could not be machine-checked): the exact codec and anchor set attributed to each format family (MV-HEVC, V-PCC, G-PCC, MIV), the exact set and numbering of the evaluation scenarios, and the exact metric set attributed to the TR (PSNR, IV-PSNR, VMAF). The scenario names are taken from the 5G-MAG reference-tools repository. Verify against TR 26.956 and the SA4 work plan before publication.
:::

## Related Standards Work

* [Standards: Volumetric Video with V3C](/tech/standards/v3c)
* [Standards: XR with MPEG-I SD](/tech/standards/xr)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
