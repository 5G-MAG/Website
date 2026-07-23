---
title: Immersive Media Experiences
sidebar_position: 4
hide_title: true
description: 'Real, assembled immersive-media applications built on 5G-MAG’s XR and volumetric video reference tools: 3D/AR media messaging, volumetric video streaming to Android, and XR content authoring with Blender.'
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 17.6l-2 -1.1v-2.5"/><path d="M4 10v-2.5l2 -1.1"/><path d="M10 4.1l2 -1.1l2 1.1"/><path d="M18 6.4l2 1.1v2.5"/><path d="M20 14v2.5l-2 1.12"/><path d="M14 19.9l-2 1.1l-2 -1.1"/><path d="M12 12l2 -1.1"/><path d="M18 8.6l2 -1.1"/><path d="M12 12l0 2.5"/><path d="M12 18.5l0 2.5"/><path d="M12 12l-2 -1.12"/><path d="M6 8.6l-2 -1.1"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Applications</span>
<h1>Immersive Media Experiences</h1>
</div>
</div>

<div class="topic-lead">
Real applications built on 5G-MAG's XR and volumetric video reference tools: 3D/AR media messaging, volumetric streaming, and XR content authoring.
</div>

## Overview

An Application, on this site, is a real working scenario assembled from one or more Reference Tools, pointed at a concrete use case, rather than a single tool's own tutorial in isolation. This category covers media that goes beyond a flat single-camera picture: sharing 3D/AR assets as message attachments, volumetric video (a scene captured in three dimensions so a viewer can change viewpoint) streamed to a handheld device, and authoring XR content for playback in the XR player. It brings together 5G-MAG's XR and V3C (Visual Volumetric Video-based Coding) reference tools; this page previously covered volumetric video alone, and now covers the wider set of immersive scenarios built on both. For acronyms used here, see the [Glossary](/tech/glossary).

## Immersive 3D Media Messaging

Sharing 3D and AR assets the way you would share a photo: as an attachment to an MMS message or a third-party messaging app, packaged so a 3GPP messaging service can carry it, then opened and rendered in the XR player. Working examples include sharing a plain 3D model and sharing an AR-anchored model, for example a piece of furniture a viewer can place on their own floor before deciding whether it fits. A couple of further extensions, adding images inside a shared 3D asset and manipulating a placed AR model under anchoring constraints, are flagged in the tutorial as not yet implemented.

**Built from:** [XR/3D Scenes with MPEG-I Scene Description](/reference-tools/xr/).

Follow the [use-case walkthrough](/reference-tools/xr/tutorials/immersive-3d-media-message) to try the working scenarios with the provided sample assets.

## Volumetric Video Streaming to Android

A Unity-based V3C player running on an Android phone, decoding V3C-coded volumetric content and streaming it over DASH (Dynamic Adaptive Streaming over HTTP) from a server you run on your own machine: volumetric video played back on a handheld device rather than only in a fixed lab setup.

**Built from:** [MPEG V3C Immersive Platform](/reference-tools/v3c/).

Follow the [step-by-step guide](/reference-tools/v3c/tutorials/v3c-immersive-platform-in-android-streaming) to build the Android player, set up the DASH server, and stream sample V3C content to your device.

## XR Content Authoring with Blender

Authoring an XR scene from the content-creation side rather than the playback side: adding MPEG glTF extensions (anchoring, spatial audio, video textures) to a scene in Blender using a dedicated exporter add-on, then exporting it as glTF and loading it straight into the XR Unity Player to check how it looks.

**Built from:** [XR/3D Scenes with MPEG-I Scene Description](/reference-tools/xr/).

Follow the [video walkthrough](/reference-tools/xr/tutorials/blender-exporter-unity-player) for the exporter workflow; written per-extension authoring instructions are also linked from the XR tutorials index.

## Related

- [Testbeds and Evaluation Tools](/testbeds) for the Beyond 2D Evaluation Framework, used to assess quality of these richer-than-2D experiences.
- [Reference Tools](/reference-tools) for the individual specification implementations.
- [Applications](/applications/) for the other end-to-end service scenarios.
