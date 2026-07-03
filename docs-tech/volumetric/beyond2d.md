---
title: Beyond 2D Video
sidebar_position: 14
hide_title: true
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2"/><path d="M4 16v2a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M16 20h2a2 2 0 0 0 2 -2v-2"/><path d="M12 12.5l4 -2.5"/><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5"/><path d="M8 10v4.5l4 2.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Volumetric Video</span>
<h1>Beyond 2D Video</h1>
</div>
</div>

This page covers 5G-MAG's Beyond 2D Video work. It is part of the [Volumetric Video](../volumetric) area: Beyond 2D looks at how to evaluate the formats that sit alongside and lead into V3C volumetric video, so the two topics are closely related.

Beyond 2D Video covers the evaluation and characterisation of next-generation visual formats that go beyond traditional flat-screen video, including:

* stereoscopic video;
* multi-view video;
* video plus depth;
* point clouds.

The 5G-MAG work provides an evaluation framework for benchmarking encoding, streaming, and rendering pipelines for these formats. It relates to the 3GPP study captured in [TR 26.956](https://www.3gpp.org/dynareport/26956.htm) (Evaluation and Characterization of Beyond 2D Video Formats and Codecs).

:::caution[Verify study status]
TR 26.956 is a 3GPP study (Technical Report). Confirm its current stage (ongoing or completed) against the SA4 work plan before relying on it.
:::

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/15)

The slide deck below introduces the Beyond 2D Video evaluation framework and its scope.

<iframe width="60%" height="520" src="/docs/Reference_Tools_Beyond2D_Video_Evaluation.pdf" title="Slide deck: Beyond 2D Video evaluation framework"></iframe>

*Slide deck: Beyond 2D Video evaluation framework.*

[Download the slidedeck with more information](/docs/Reference_Tools_Beyond2D_Video_Evaluation.pdf)

---

## Information related to Standards

[Standards](/tech/standards/beyond-2d)

## Information related to Reference Tools Projects

[Project: Beyond 2D Evaluation Framework](/developer/beyond-2d)

## Technical Documentation

### Preliminary work

This work was conducted in 5G-MAG prior to the Beyond 2D Study Item in 3GPP, so it may not map directly onto the current study.

:::note
Detailed technical documentation for this area is not yet published here. For the latest material, see the slide deck above, the [Beyond 2D Evaluation Framework project](/developer/beyond-2d), and the [Standards: Beyond 2D Video Experiences](/tech/standards/beyond-2d) page.
:::

## Formats under evaluation

Beyond 2D groups the content it studies into representation families, each of which needs a different coding and rendering path:

* **Stereoscopic video**: a left and right view giving a fixed 3D effect but no free viewpoint. Coded with MV-HEVC or, as an anchor, frame-compatible or simulcast HEVC/AVC.
* **Multi-view plus depth (MV+D)**: several texture views with associated depth, supporting a limited change of viewpoint. Coded with MV-HEVC or with the MIV profile of V3C.
* **Video plus depth**: a single texture view augmented with a depth map. The depth is carried alongside a conventional HEVC/VVC texture stream.
* **Dense point cloud**: a volumetric capture of an object or person. Coded with V-PCC (the video-based point cloud profile of V3C) and, for comparison, G-PCC (geometry-based).

The volumetric and MV+D families are where this work overlaps with V3C: V-PCC and MIV are the V3C-based coding approaches evaluated for those cases. See the [Volumetric Video](../volumetric) parent page for how V3C, V-PCC, and MIV work.

## Evaluation scenarios

The evaluation is organised around concrete end-to-end scenarios rather than abstract format comparisons. The 5G-MAG reference-tools repository lists the scenarios as:

1. **UE-to-UE stereoscopic video live streaming**: a conversational or live case using stereoscopic video between devices.
2. **Streaming of professionally produced volumetric video** (a single asset containing people): a produced volumetric-video-on-demand case, exercising the point-cloud path.
3. **On-demand streaming of multi-view plus depth**: an on-demand case exercising the MV+D path.

The repository is organised with separate areas for the multi-view-plus-depth (`mvd`) and point-cloud content, reflecting the different processing chains each family needs. Each scenario ties a representation family to a delivery mode (live or on-demand, device-to-device or streamed) so that both the codec and the delivery behaviour are characterised together.

## Evaluation pipeline and metrics

The framework provides a repeatable, transparent pipeline so results are comparable across formats and contributors:

1. **Test content**: defined source sequences per format family (raw point clouds, multi-view-plus-depth sequences, stereoscopic pairs).
2. **Encoding**: the source is coded with the codec(s) under test at several operating points (bitrates).
3. **Packaging and delivery**: the coded content is packaged (ISOBMFF/CMAF) and delivered under a 5G Media Streaming assumption (DASH-based adaptive streaming).
4. **Decoding and rendering**: the content is decoded and rendered, including synthesis of viewports along a predefined camera path (a pose trace) for the formats that reconstruct or synthesise views.
5. **Metrics**: quality is measured on both source views and rendered pose-trace views. Reported measures include conventional PSNR, immersive-video measures such as IV-PSNR, and perceptual measures such as VMAF, plotted against bitrate.

Because source sequences, coded bitstreams, and rendered pose-trace videos are large, the framework references content hosted on external servers rather than bundling it. The value of the framework is the defined method and scripts, not a shipping playback product.

## Relationship to 5G Media Streaming

Beyond 2D does not define a new transport. It evaluates the formats against the existing 5G media delivery stack: ISOBMFF/CMAF packaging and DASH (ISO/IEC 23009-1) adaptive streaming carried by 5G Media Streaming ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm) architecture, [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) protocols and APIs). Framing the evaluation this way keeps the comparison grounded in how the content would actually be delivered, and it lets the study identify which formats and codecs are ready for that pipeline and where gaps remain for future 3GPP normative work.

:::caution[References to verify]
These specifics on this page were not confirmed against the primary source (the 3GPP/ETSI portals block automated access, so the TR 26.956 text could not be machine-checked): the exact codec and anchor set per format family (MV-HEVC, V-PCC, G-PCC, MIV), and the exact metric set attributed to the study (PSNR, IV-PSNR, VMAF). The scenario names and the `mvd`/point-cloud repository structure are taken from the 5G-MAG reference-tools repository. Verify against TR 26.956 and the SA4 work plan before publication.
:::

## Related

* [Volumetric Video](../volumetric): the parent area, covering MPEG V3C volumetric coding.
* [Standards: Beyond 2D Video Experiences](/tech/standards/beyond-2d): the standards-tracking view of this topic.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::

