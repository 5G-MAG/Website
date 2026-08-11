---
hide_title: true
title: Beyond 2D Video
slug: /standards/beyond-2d
description: Summarises 3GPP's FS_Beyond2D study evaluating stereoscopic, multiview and volumetric video formats and codecs for delivery over 5G.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4.338 5.53c5.106 1.932 10.211 1.932 15.317 0a1 1 0 0 1 1.345 .934v11c0 .692 -.692 1.2 -1.34 .962c-5.107 -1.932 -10.214 -1.932 -15.321 0c-.648 .246 -1.339 -.242 -1.339 -.935v-11.027a1 1 0 0 1 1.338 -.935l0 .001"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Beyond 2D Video</h1>
</div>
</div>

<div class="topic-lead">
Evaluating stereoscopic, multiview and volumetric video formats and codecs delivered over 5G.
</div>

## Overview

Beyond 2D Video covers media formats that go past a flat single-camera picture, such as stereoscopic 3D, multiview, depth-enhanced and volumetric video. 3GPP studied how these formats and their codecs perform over 5G in the feasibility study FS_Beyond2D, captured in TR 26.956. 5G-MAG tracks this work because it sets the evaluation baseline for delivering richer-than-2D experiences. This page lists the related 3GPP work item and technical report, and is for anyone assessing how immersive and 3D video will be carried over 5G. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The Beyond 2D scenarios (stereoscopic, multiview plus depth, volumetric) and how they map to codecs.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/volumetric/beyond-2d">Tech: Beyond 2D Video</a></li>
</ul>
</div>
</div>

</div>

## What the study covers

FS_Beyond2D is a feasibility and characterisation study, not a normative specification. It covers four format families:

- **Stereoscopic video**, a left and right view giving a fixed 3D effect without free viewpoint, with extensions for depth and alpha metadata;
- **Multiview and multi-view plus depth (MV+D)**, several camera views (with depth) that support a limited change of viewpoint;
- **Dense dynamic point clouds**, a volumetric representation of an object or person captured in 3D;
- **Dynamic meshes**, a volumetric representation using time-varying textured 3D meshes.

The report also surveys formats under research (neural radiance fields, light fields, 3D Gaussian splatting) without evaluating them.

See the [Beyond 2D Video](/tech/volumetric/beyond-2d) Tech page for the per-family and per-scenario detail.

## Codecs and how they map to the formats

The study evaluates each format with the codecs that are practical for it today; for stereoscopic video, simulcast HEVC serves as the baseline:

| Format family             | Coding approaches evaluated                                                          | Relation to V3C                                    |
| ------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Stereoscopic              | Simulcast HEVC (baseline) and MV-HEVC                                                | Not V3C-based                                       |
| Multi-view plus depth     | The MIV profile of V3C; the report also notes MV-HEVC as a coding option             | MIV is ISO/IEC 23090-12 (a V3C profile)             |
| Dense dynamic point cloud | V-PCC; no anchor codec exists for the format, G-PCC is noted as a related technology | V-PCC is part of ISO/IEC 23090-5                    |
| Dynamic mesh              | V-DMC, described alongside V-PCC for the volumetric scenario                         | V-DMC is ISO/IEC 23090-29 (video-based, V3C-related) |

This connects to the [Volumetric Video with MPEG V3C](/standards/v3c) topic: the volumetric and multi-view-plus-depth scenarios are the cases where V3C (V-PCC and MIV) is one of the coding approaches under evaluation.

## Relationship to 5G Media Streaming

The study assesses these formats against the existing 5G Media Streaming delivery framework ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm) architecture, [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) protocols and APIs). See the [Beyond 2D Video](/tech/volumetric/beyond-2d) Tech page for the detailed analysis.

## Related 3GPP Work Items

The work item below drove the Beyond 2D Video feasibility study; it produced the technical report listed in the next section. The work-item link downloads a .zip contribution package.

| Name                                                                                                 | Title                                              |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [FS_Beyond2D](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240479.zip) | Feasibility Study on Beyond 2D Video (FS_Beyond2D) |

## Related 3GPP Technical Reports and Specifications

The technical report below is the output of the FS_Beyond2D study, giving the evaluation and characterisation of the formats and codecs in scope.

| Number                                                 | Title                                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| [TR 26.956](https://www.3gpp.org/dynareport/26956.htm) | Evaluation and Characterization of Beyond 2D Video Formats and Codecs |

## 5G-MAG tracking and contribution focus

5G-MAG tracks FS_Beyond2D as it establishes the evidence base for carrying richer-than-2D formats over 5G Media Streaming, ahead of any later normative SA4 work. The technical detail is on the [Beyond 2D Video](/tech/volumetric/beyond-2d) Tech page.

## Related Standards Work

- [Standards: Volumetric Video with MPEG V3C](/standards/v3c)
- [Standards: XR and MPEG-I Scene Description](/standards/xr)
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
