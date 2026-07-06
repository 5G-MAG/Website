---
title: Scope
hide_title: true
sidebar_position: 0
description: Details which MPEG-I Scene Description (ISO/IEC 23090-14) features and glTF extensions the XR reference tools implement, with support matrices.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
  <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
  <path d="M3 17v2a2 2 0 0 0 2 2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">XR and MPEG-I Scene Description</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This page contains information such as the specifications within the scope of the tools, high-level architectures that bring context to their applicability, features under implementation,...

Technical documentation providing context to this project can be found in the link below.

[Tech: XR: 3D Scenes and Avatar Communications](/tech/xr)

A list of relevant specifications can be found in the link below.

[Standards: XR Media with MPEG-I Scene Description](/tech/standards/xr)

## Specifications and releases covered

The XR reference tools implement the scene-description parts of the XR stack. In scope:

* **MPEG-I Scene Description (ISO/IEC 23090-14).** The tools implement the standard's runtime model, the Presentation Engine (here, a Unity player), the Media Access Function (MAF) API, and the buffer interface, plus the MPEG glTF 2.0 extensions listed in the tables below. glTF 2.0 is the base format (Khronos glTF 2.0, also published as ISO/IEC 12113); the MPEG extensions add timed and immersive media on top of it.
* **glTF extension coverage.** The support matrices below show, per extension, what is implemented today in the Unity player and Unity editor, and for anchoring, interactivity and trackables, what works on each device family. Support reflects features introduced across the first edition, its amendments and the second edition of ISO/IEC 23090-14, so the matrix is a subset and is expected to grow.

Out of scope for these tools (tracked in the Standards and Tech views, not implemented here): the 3GPP delivery and device specifications (5G Media Streaming, MeCAR/TS 26.119, split rendering/TS 26.565) and the immersive audio codecs. The tools focus on parsing, composing and rendering MPEG-I scenes on device; media is fetched by the MAF from a URL and is transport-agnostic.

Device families are the two listed on the [Requirements page](./tutorials/requirements): **XR Phone** (Android handheld, using Google ARCore for AR features) and **XR HMD** (head-mounted displays such as Meta Quest 3). Both use Unity's ARFoundation for anchoring.

## Features

In the tables below, the &#x2611; symbol means the feature is supported, &#x2610; means it is not yet supported, and the 🚧 construction icon marks work in progress (with a link to the tracking issue). The **XR Phone** and **XR HMD** columns correspond to the two supported device families listed on the [Requirements page](./tutorials/requirements): XR Phone covers Android handheld devices, and XR HMD (head-mounted display) covers headsets such as Meta Quest 3.

* [**Features implemented in the XR Unity Player**](#features-implemented-in-the-xr-unity-player)
* [**Features implemented in the XR Unity Editor**](#mpeg-extensions-to-gltf-implemented-in-unity-player-and-unity-editor)

### Features implemented in the XR Unity Player

The XR Player takes 3D scenes in glTF format, supporting extensions that enable extended reality use cases. 
These extensions enable features such as XR anchoring, interactivity behaviors, and media pipelines.

- [View Changelog](https://github.com/5G-MAG/rt-xr-unity-player/releases)

#### Media pipelines

Support for media sources (eg. mp4, dash, rtp,...) exposing media buffers to the presentation engine through the <span style="color:#00B050; font-weight:bold;">MPEG_media</span>, <span style="color:#00B050; font-weight:bold;">MPEG_accessor_timed</span>, <span style="color:#00B050; font-weight:bold;">MPEG_buffer_circular</span> glTF extensions.

The media pipelines APIs are designed to fetch and decode timed media such as video textures, audio sources, geometry streams,...

| Reference scene       | XR Phone | XR HMD | Test content |
|:--------------------- |:-|:-|:-|
| Sample scene with media pipelines | &#x2611; | &#x2611; | [studio_apartment/studio_apartment.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/studio_apartment/studio_apartment.gltf)|

#### Video texture

Supports video textures buffers through the <span style="color:#0070C0; font-weight:bold;">MPEG_texture_video</span> glTF video extension. Video decoding is implemented by media pipelines.

| Reference scene       | XR Phone | XR HMD | Test content |
|:--------------------- |:-|:-|:-|
| Sample scene with video texture | &#x2611; | &#x2611; | [studio_apartment/studio_apartment.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/studio_apartment/studio_apartment.gltf)|


#### Spatial audio

Supports audio sources positioned in 3D through the <span style="color:#0070C0; font-weight:bold;">MPEG_audio_spatial</span>.

For each audio source the extension specifies attenuation parameters controlling the audio source loudness as a function of the viewer's distance.

| Reference scene       | XR Phone | XR HMD | Test content |
|:--------------------- |:-|:-|:-|
| Sample scene with spatial audio source | &#x2611; | &#x2611; | [studio_apartment/studio_apartment.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/studio_apartment/studio_apartment.gltf)|

#### Anchoring

The XR Player supports XR anchoring using the <span style="color:#7030A0; font-weight:bold;">MPEG_anchor</span> glTF extension which enables anchoring nodes and scenes to features (**Trackable**) tracked by the XR device. In augmented reality applications, anchored nodes are composited with the XR device's environment. 

The XR player leverages Unity's ARFoundation to support both handheld mobile devices such as smartphones and head-mounted displays (HMDs).

| Trackable type | XR Phone | XR HMD | Test content |
|:---------------|:---------|:-------------|:-------------|
| TRACKABLE_VIEWER | &#x2611; | &#x2611; | [anchoring/anchorTest_viewer_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |
| TRACKABLE_FLOOR  | &#x2611; | &#x2610; | [awards/scene_floor_anchoring.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/awards/) |
| TRACKABLE_PLANE  | &#x2611; | &#x2611; | [awards/scene_plane_anchoring.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/awards/) |
| TRACKABLE_CONTROLLER | &#x2610; | &#x2611; | [anchoring/anchorTest_ctrl_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |
| TRACKABLE_MARKER_2D | &#x2611; | &#x2610; | [anchoring/anchorTest_m2D_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |
| TRACKABLE_MARKER_3D | &#x2610; | &#x2610; | [anchoring/anchorTest_m3D_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |
| TRACKABLE_MARKER_GEO | &#x2611; | &#x2610; | [anchoring/anchorTest_geoSpatial_n_cs.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |
| TRACKABLE_APPLICATION | &#x2611; | &#x2611; | [anchoring/anchorTest_app_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |


#### Interactivity

The XR Player supports specifying interactive **behaviors** in a 3D scene through the <span style="color:#7030A0; font-weight:bold;">MPEG_scene_interactivity</span> and <span style="color:#7030A0; font-weight:bold;">MPEG_node_interactivity</span> glTF extensions. 

An interactivity behavior combines one or more **triggers** that condition the execution of one or more **actions**.

The table below provides an overview of the supported triggers and actions:

| Trigger type | XR Phone | XR HMD | Test content |
|:----------------------|:-|:-|:-|
| TRIGGER_COLLISION     | &#x2611; | &#x2611; | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)|
| TRIGGER_PROXIMITY      | &#x2611; | &#x2611; |[gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity), [geometry/UseCase_03-variant1-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry)|
| TRIGGER_USER_INPUT     | &#x2611; | &#x2611; |[gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity), [geometry/UseCase_03-variant3-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry)|
| TRIGGER_VISIBILITY    | &#x2611; | &#x2611; |[geometry/UseCase_03-variant3-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry)|

| Action type           | XR Phone | XR HMD | Test content |
|:--------------------- |:-|:-|:-|
| ACTION_ACTIVATE       | &#x2611; | &#x2611; | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)|
| ACTION_TRANSFORM      | &#x2611; | &#x2611; | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)|
| ACTION_BLOCK          | &#x2611; | &#x2611; | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)|
| ACTION_ANIMATION      | &#x2611; | &#x2611; | [geometry/UseCase_03-variant1-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry)|
| ACTION_SET_MATERIAL   | &#x2611; | &#x2611; | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)|
| ACTION_MANIPULATE     | &#x2610; | &#x2610; |  |
| ACTION_MEDIA          | &#x2610; | &#x2610; | 🚧 [issues/19](https://github.com/5G-MAG/rt-xr-unity-player/issues/19) |
| ACTION_HAPTIC         | &#x2610; | &#x2610; |  |
| ACTION_SET_AVATAR     | &#x2610; | &#x2610; | [issues/203](https://github.com/5G-MAG/Getting-Started/issues/203) |

### MPEG extensions to glTF implemented in Unity Player and Unity Editor

Note that "Unity player" refers to the compiled application, while "Unity editor" refers to the development environment which also allows running the app without actually compiling it for the target platform.

The extension names are colour-grouped by function: green marks the media-pipeline extensions (MPEG_media, MPEG_buffer_circular, MPEG_accessor_timed); blue marks the media-object extensions (audio, video texture, V3C and related sampling and timing); and purple marks the scene-behaviour extensions (interactivity, anchoring, avatar, lighting and haptics). As the table shows, the extensions currently supported are all in the compiled Unity player, while the Unity editor entries are not yet supported.

| glTF extension                                                                     | Unity player   | Unity editor v1.1.0 |
|:-----------------------------------------------------------------------------------|:---------------|:--------------------|
| <span style="color:#00B050; font-weight:bold;">MPEG_media</span>                   | &#x2611;       | &#x2610;            |
| <span style="color:#00B050; font-weight:bold;">MPEG_buffer_circular</span>         | &#x2611;       | &#x2610;            |
| <span style="color:#00B050; font-weight:bold;">MPEG_accessor_timed</span>          | &#x2611;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_audio_spatial</span>           | &#x2611;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_texture_video</span>           | &#x2611;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_scene_interactivity</span>     | &#x2611;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_node_interactivity</span>      | &#x2611;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_node_interactivity.type</span> | &#x2611;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_anchor</span>                  | &#x2611;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_sampler_YCbCr</span>           | &#x2610;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_primitive_V3C</span>           | &#x2610;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_avatar</span>                  | &#x2610;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_lights_texture_based</span>    | &#x2610;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_light_punctual</span>          | &#x2610;       | &#x2610;            |
| <span style="color:#7030A0; font-weight:bold;">MPEG_haptic</span>                  | &#x2610;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_mesh_linking</span>            | &#x2610;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_scene_dynamic</span>           | &#x2610;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_viewport_recommended</span>    | &#x2610;       | &#x2610;            |
| <span style="color:#0070C0; font-weight:bold;">MPEG_animation_timing</span>        | &#x2610;       | &#x2610;            |

## High-level architectures

### XR Media Integration in 5G

<img loading="lazy" src="/assets/images/projects/xr_diagram.png" alt="High-level architecture showing XR media flowing from a scene server through the 5G Media Streaming framework to the XR player on a device" style="width: 80%">

*Figure: high-level view of how XR media is delivered over 5G, from the content and scene server through 5G Media Streaming to the XR player.*

The diagrams and code in this project are split across two repository groups:

- [XR Media with MPEG-I SD: Repositories](../xr/repositories) for the XR player, server, MAF and content repositories.
- [Common Tools: Repositories](../common-tools/) for the shared libraries reused across projects.

## XR Unity Player: Project overview

### Scene description format

The Scene Description format standardized by [ISO/IEC JTC 1/SC29/WG03](https://www.iso.org/committee/45316) MPEG Systems in [ISO/IEC 23090-14](https://www.iso.org/standard/86439) specifies a framework for composing 3D scenes for immersive experiences. It supports anchoring 3D assets in the real world, rich interactivity, and real-time media delivery.

It establishes interfaces like the Media Access Function (MAF) API for cross-platform interoperability, decoupling the Presentation Engine from the media pipeline for efficient retrieval and processing of media data. The Presentation Engine is the component that renders the scene (here, the Unity player); the MAF API is the interface it uses to fetch and read media without depending on any specific transport or codec.

### XR Player implementation

<img loading="lazy" src="/assets/images/xr/rt-xr-overview.jpg" alt="Overview of the XR player showing the Unity player, glTFast parser and MAF native library" style="width: 80%">

*Figure: overview of the XR player and its main building blocks.*

The XR Player is implemented as a Unity3D project: [rt-xr-unity-player](https://github.com/5G-MAG/rt-xr-unity-player).

The unity project builds on the following dependencies:
* [rt-xr-glTFast](https://github.com/5G-MAG/rt-xr-glTFast): parsing and instantiating of 3D scenes in Unity.
* [rt-xr-maf-native](https://github.com/5G-MAG/rt-xr-maf-native): a C++ Media Access Functions (MAF) API implementation, extensible with custom media pipeline plugins. 

#### Test content

* [rt-xr-content](https://github.com/5G-MAG/rt-xr-content): test content implementing the scene description format.

See the [repositories page](./repositories) for implementation status of the scene description format.

### MAF API & Media pipelines

The Media Access Functions (MAF) API is specified in ISO/IEC 23090-14:2023.

Its purpose is to decouple the presentation engine from media pipeline management; it allows the Presentation Engine to:
- pass View information to the media pipelines (e.g., to optimise fetching media)
- read media buffers updated by the media pipelines

The MAF API is protocol and codec agnostic; media can be fetched from a remote URL.

#### Media player implementation

##### MediaPlayer component 

The MediaPlayer component is part of the Presentation Engine layer:

<img loading="lazy" src="/assets/images/xr/rt-xr-presentation-engine.jpg" alt="Diagram placing the MediaPlayer component within the Presentation Engine layer" style="width: 80%">

*Figure: the MediaPlayer component inside the Presentation Engine layer.*

The MediaPlayer component uses the MAF API implemented by Media Pipelines:

<img loading="lazy" src="/assets/images/xr/rt-xr-maf-implementation.jpg" alt="Diagram showing the MediaPlayer component calling the MAF API implemented by media pipelines" style="width: 80%">

*Figure: the MediaPlayer component calling the MAF API implemented by the media pipelines.*

The XR Player uses a C++ implementation of the MAF API. It uses a factory / plugin pattern to allow development of media pipelines.

The mechanism by which a media pipeline is instantiated and buffers are initialized is out of the scope of ISO/IEC 23090-14.

For more on the MAF API implementation, review the [rt-xr-maf-native](https://github.com/5G-MAG/rt-xr-maf-native) repository.

## How the tools map to the standard

The reference tools split along the same boundary as ISO/IEC 23090-14:

| Standard concept (ISO/IEC 23090-14) | Reference tool | Repository |
|:--|:--|:--|
| Scene document (glTF 2.0 + MPEG extensions) | Test content | [rt-xr-content](https://github.com/5G-MAG/rt-xr-content) |
| Parsing and instantiating the scene | glTFast fork with MPEG extensions | [rt-xr-glTFast](https://github.com/5G-MAG/rt-xr-glTFast) |
| Presentation Engine (renders the scene) | Unity player | [rt-xr-unity-player](https://github.com/5G-MAG/rt-xr-unity-player) |
| Media Access Function (MAF) API and media pipelines | C++ MAF implementation with a factory/plugin pattern | [rt-xr-maf-native](https://github.com/5G-MAG/rt-xr-maf-native) |
| Buffer interface between MAF and Presentation Engine | MediaPlayer component reading MAF-filled buffers | (in the player) |

Anchoring and pose handling on the two device families are provided through Unity's ARFoundation (ARCore on Android handhelds, the HMD's own tracking on head-mounted displays), so the `MPEG_anchor` trackable types in the feature table map onto the trackables ARFoundation exposes on each platform.

## Getting started

1. **Read the model first.** The [Tech overview of MPEG-I Scene Description](/tech/xr/mpeg-i-scene-description) explains the Presentation Engine, MAF API, buffers and the glTF extensions the tools implement.
2. **Check device support.** The [Requirements page](./tutorials/requirements) lists the supported XR Phone (Android/ARCore) and XR HMD devices and their prerequisites.
3. **Build the player.** Clone [rt-xr-unity-player](https://github.com/5G-MAG/rt-xr-unity-player) (it pulls in [rt-xr-glTFast](https://github.com/5G-MAG/rt-xr-glTFast) as a submodule) and compile [rt-xr-maf-native](https://github.com/5G-MAG/rt-xr-maf-native) for the target platform; the MAF native library is built separately.
4. **Load a scene.** Use the reference scenes in [rt-xr-content](https://github.com/5G-MAG/rt-xr-content) (for example `studio_apartment/studio_apartment.gltf` for media pipelines, video texture and spatial audio, or the `anchoring/` and `gravity/` scenes for anchoring and interactivity) and deploy them to the device.
5. **Follow the changelogs.** The player [releases](https://github.com/5G-MAG/rt-xr-unity-player/releases) and the [repositories page](./repositories) track which parts of the scene-description format are implemented and what is in progress.

:::warning[References to verify]
The glTF extension support shown in the tables reflects the state of the reference tools and can change between releases; check the linked repositories and release notes for the current status. The out-of-scope 3GPP identifiers referenced above (TS 26.119, TS 26.565, and the 5G Media Streaming specifications) are tracked on the Standards and Tech views and were not confirmed here against a primary source; verify those against the 3GPP/ETSI work plan before relying on them.
:::
