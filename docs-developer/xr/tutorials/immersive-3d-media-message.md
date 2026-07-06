---
title: Immersive and 3D Media message
hide_title: true
sidebar_position: 2
description: Walks through use cases for sharing 3D/AR assets via MMS or messaging apps and rendering them in the XR player.
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
<h1>Immersive and 3D Media message</h1>
</div>
</div>

The goal of this tutorial is to show how 3D and AR assets can be shared like media attachments (for example through a Multimedia Messaging Service (MMS) message or a third-party messaging app) and then opened and rendered in the XR player. A "3GPP conforming container" here means the asset is packaged so that it can be carried by 3GPP messaging services.

Each use case below reuses the same reference assets from the `rt-xr-content` repository. To try any of them, build and configure the player once by following the [Android build instructions](./xr-player-android), then load the listed asset.

## VR/XR/3D Scene

### Use case 1: Sharing a 3D asset as a 3GPP conforming MMS message
Example: 3GPP shares the 3GPP Emmy Statue as 3GPP conforming messaging MMS to all members.

Reference asset:
* [Simple academy awards model without anchoring](https://github.com/5G-MAG/rt-xr-content/tree/development/awards/awards.gltf)

### Use case 2: Sharing a 3D asset through a third-party application using 3GPP conforming containers
Example: A house rental agency offers rooms whose assets you can walk through. They share the assets through WhatsApp using 3GPP conforming containers.

Reference asset (provided with the relevant glTF extensions):
* [Studio apartment](https://github.com/5G-MAG/rt-xr-content/blob/development/studio_apartment/studio_apartment.gltf)

### Use case 3: Extension of use case 2 to add images inside the 3D asset
Example: An extension of use case 2 provides the ability to add your family pictures to the wall.

**Status: not yet implemented.** This use case needs support for manipulating a 3D node (`MPEG_scene_interactivity`) together with anchoring constraints (`MPEG_anchor`), tracked in:
* 🚧 [rt-xr-unity-player issue 41](https://github.com/5G-MAG/rt-xr-unity-player/issues/41)


---

## AR Scenes

### Use case 4: Extension of use case 1 including information to anchor the model
Example: 3GPP shares the 3GPP Emmy Statue as 3GPP conforming messaging MMS to all members, including information to put it on your living desk.

Reference assets (provided with the relevant glTF extensions to signal AR anchoring):
* [academy awards model with explicit floor anchoring](https://github.com/5G-MAG/rt-xr-content/blob/development/awards/awards_floor_anchoring.gltf)
* [academy awards model with explicit horizontal plane anchoring](https://github.com/5G-MAG/rt-xr-content/blob/development/awards/awards_plane_anchoring.gltf)

### Use case 5: Extension of use case 2 including information to manipulate a model with anchoring constraints
Example: Ikea offers furniture on their webpage that you can request. They share the assets through Signal using 3GPP conforming containers. You can place the asset on your living room's floor and check how it fits.

**Status: not yet implemented.** Like use case 3, this needs combined interactivity and anchoring support; it differs in that the model is manipulated (placed and repositioned) under anchoring constraints rather than only having images added. Tracked in the same issue:
* 🚧 [rt-xr-unity-player issue 41](https://github.com/5G-MAG/rt-xr-unity-player/issues/41)

## Learn more

- [Requirements](./requirements): supported devices.
- [Android build tutorial](./xr-player-android): build and configure the player.
- [Tutorials index](.): all XR tutorials.

