---
title: MPEG-I SD Test Assets
hide_title: true
sidebar_position: 4
description: Lists ready-made MPEG-I Scene Description test assets and explains how to author your own using the Blender glTF exporter add-on.
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
<span class="topic-banner__kicker">XR/3D Scenes with MPEG-I Scene Description</span>
<h1>MPEG-I Scene Description Test Asset Creation</h1>
</div>
</div>

This page has two halves. The first, [List of available assets](#list-of-available-assets), points you to ready-made test assets you can download and play directly. The second, [Generation of MPEG-I SD compliant glTF2.0 assets](#generation-of-mpeg-i-sd-compliant-gltf20-assets), explains how to author your own assets in Blender using the exporter add-on.

## Content repositories

5G-MAG is hosting a repository with test assets implementing some of the core extensions defined in MPEG-I Scene Description (ISO/IEC 23090-14): [rt-xr-content](https://github.com/5G-MAG/rt-xr-content).

Note the assets produced by the MPEG-I SD group are typically available for download at the [ISO/IEC 23090-14 standards page](https://standards.iso.org/iso-iec/23090/-14/).
Khronos hosts sample glTF2.0 assets on GitHub: [glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets).

## Blender add-on to generate MPEG-I SD compliant glTF2.0 assets

The Reference Tools also provides a Blender add-on to support [MPEG_* glTF extensions](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor) and export glTF files.

The repository is available here: [rt-xr-blender-exporter](https://github.com/5G-MAG/rt-xr-blender-exporter)
A tutorial is available here: [Blender glTF Exporter and Unity Player](./blender-exporter-unity-player)

## List of available assets

These ready-made assets in the `rt-xr-content` repository exercise the core MPEG glTF extensions, so you can download and play them without authoring anything yourself.

### MPEG_anchor (test content)

The `MPEG_anchor` glTF extension enables anchoring nodes and scenes to features (_Trackable_) tracked by the XR device.

|  Trackable type       | Test content                                                                                                     |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------- |
| TRACKABLE_VIEWER      | [anchoring/anchorTest_viewer_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/)        |
| TRACKABLE_FLOOR       | [awards/scene_floor_anchoring.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/awards/)            |
| TRACKABLE_PLANE       | [awards/scene_plane_anchoring.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/awards/)            |
| TRACKABLE_CONTROLLER  | [anchoring/anchorTest_ctrl_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/)          |
| TRACKABLE_MARKER_2D   | [anchoring/anchorTest_m2D_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/)           |
| TRACKABLE_MARKER_3D   | [anchoring/anchorTest_m3D_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/)           |
| TRACKABLE_MARKER_GEO  | [anchoring/anchorTest_geoSpatial_n_cs.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/) |
| TRACKABLE_APPLICATION | [anchoring/anchorTest_app_n.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/anchoring/)           |

### MPEG_scene_interactivity and MPEG_node_interactivity

**Behaviors** in a 3D scene can be defined through the `MPEG_scene_interactivity` and `MPEG_node_interactivity` glTF extensions. An interactivity behavior combines one or more **triggers** that condition the execution of one or more **actions**.

| Trigger type       | Test content                                                                                                                                                                                              |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TRIGGER_COLLISION  | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)                                                                                                                  |
| TRIGGER_PROXIMITY  | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity), [geometry/UseCase_03-variant1-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry) |
| TRIGGER_USER_INPUT | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity), [geometry/UseCase_03-variant3-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry) |
| TRIGGER_VISIBILITY | [geometry/UseCase_03-variant3-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry)                                                                                           |

| Action type         | Test content                                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------------------------------- |
| ACTION_ACTIVATE     | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)                        |
| ACTION_TRANSFORM    | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)                        |
| ACTION_BLOCK        | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)                        |
| ACTION_ANIMATION    | [geometry/UseCase_03-variant1-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry) |
| ACTION_SET_MATERIAL | [gravity/gravity.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/gravity)                        |
| ACTION_MANIPULATE   |                                                                                                                 |
| ACTION_MEDIA        | 🚧 not yet supported in the Unity player ([issues/19](https://github.com/5G-MAG/rt-xr-unity-player/issues/19)); test asset: [geometry/UseCase_02-variant3-geometry.gltf](https://github.com/5G-MAG/rt-xr-content/tree/main/geometry) |
| ACTION_HAPTIC       |                                                                                                                 |
| ACTION_SET_AVATAR   |                                                                                                                 |

### MPEG_media, MPEG_accessor_timed, MPEG_buffer_circular

Support for media sources (eg. mp4, dash, rtp, ...) exposing media buffers to the presentation engine through the `MPEG_media`, `MPEG_accessor_timed`, `MPEG_buffer_circular` glTF extensions.

[Sample scene with media pipelines](https://github.com/5G-MAG/rt-xr-content/tree/main/studio_apartment)

### MPEG_texture_video (test content)

Supports video textures buffers through the `MPEG_texture_video` glTF video extension. Video decoding is implemented by media pipelines.

[Sample scene with video texture](https://github.com/5G-MAG/rt-xr-content/tree/main/studio_apartment)

### MPEG_audio_spatial (test content)

Supports audio sources positioned in 3D through the `MPEG_audio_spatial`. For each audio source the extension specifies attenuation parameters controlling the audio source loudness as a function of the viewer's distance.

[Sample scene with spatial audio source](https://github.com/5G-MAG/rt-xr-content/tree/main/studio_apartment)

## Generation of MPEG-I SD compliant glTF2.0 assets

This half explains how to author your own MPEG-I Scene Description assets in Blender using the [exporter add-on](https://github.com/5G-MAG/rt-xr-blender-exporter). The extension definitions are the same as in the list above; the steps below focus on how to configure each extension in Blender.

### MPEG_anchor (Blender configuration)

#### Configure anchoring of a node

<img loading="lazy" src="/assets/images/xr/anchoring-configrure-anchor.png" alt="Blender XR Anchoring panel in object properties, with an anchor type selected" style="width:80%;">

1. select the node to be anchored
2. locate the XR Anchoring panel in object properties, select an anchor type and configure the anchor

The following anchor types can be configured in the exporter:

- TRACKABLE_FLOOR
- TRACKABLE_VIEWER
- TRACKABLE_CONTROLLER
- TRACKABLE_PLANE
- TRACKABLE_MARKER_2D
- TRACKABLE_MARKER_GEO
- TRACKABLE_APPLICATION

:::warning
This authoring list omits TRACKABLE_MARKER_3D, which does appear in the player feature tables. It is not clear whether this is intentional (not yet supported by the exporter) or an omission. Confirm with the maintainers before relying on it.
:::

#### Creating a 2D marker node

<img loading="lazy" src="/assets/images/xr/anchoring-create-marker-2d.png" alt="Blender XR Anchoring panel used to create a 2D marker node from an image" style="width:80%;">

_Figure: creating a 2D marker node from an image in the XR Anchoring panel._

1. locate the XR Anchoring panel (press N while the UI is focused on the 3D view)
2. select an image and hit 'create marker node', the marker 2D node is added to the scene and can now be used to configure an anchor

### MPEG_texture_video (Blender configuration)

To add a video and export it as MPEG_texture_video, first make sure that the blender's [scene output format](https://docs.blender.org/manual/en/latest/render/output/properties/format.html) matches the framerate of the videos used as texture.

1. Create or select a material
2. Select the shader slot which will be using the video, and make it an 'Image texture'
3. Open or Select the video to use

All Image textures with a movie source are exported as MPEG_texture_video extensions:

<img loading="lazy" src="/assets/images/xr/image-texture.jpg" alt="Blender material shader slot set to an Image texture with a movie source" style="width:80%;">

_Figure: a Blender image texture with a movie source, exported as an MPEG_texture_video extension._

### MPEG_audio_spatial (Blender configuration)

#### Audio sources

To add an audio source to the scene:

1. Add a _[Speaker](https://docs.blender.org/manual/en/latest/render/output/audio/speaker.html)_ node to the scene: _3D Viewport > Add > Speaker_
2. Add a file source to the speaker's _Sound_. The file is assumed to contain a single channel of audio (MONO).
3. Configure speaker's _Distance_ parameters:
   - Max Distance
   - Attenuation (roll-off factor)
   - Distance Reference
     All other parameters are ignored.

The **audio attenuation model** is configured as [a scene property](https://docs.blender.org/manual/en/latest/scene_layout/scene/properties.html#data-scenes-audio) in Blender.

<img loading="lazy" src="/assets/images/xr/audio-source.jpg" alt="Blender Speaker node with a mono sound file and distance parameters configured" style="width:80%;">

_Figure: configuring a Speaker node as a spatial audio source in Blender._

<img loading="lazy" src="/assets/images/xr/audio-attenuation-model.jpg" alt="Blender scene audio properties showing the attenuation model setting" style="width:80%;">

_Figure: the audio attenuation model set as a scene property in Blender._

## Next steps

- Build and run the player to view your assets: [Android](./xr-player-android) or [Meta Quest 3](./xr-player-metaquest3).
- Watch the [Blender glTF exporter walkthrough](./blender-exporter-unity-player).
