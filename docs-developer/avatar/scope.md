---
title: Scope
hide_title: true
sidebar_position: 0
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" />
  <path d="M12 2v2" />
  <path d="M9 12v9" />
  <path d="M15 12v9" />
  <path d="M5 16l4 -2" />
  <path d="M15 14l4 2" />
  <path d="M9 18h6" />
  <path d="M10 8v.01" />
  <path d="M14 8v.01" /></svg>
</div>
<div class="topic-banner__text">
<h1>Scope</h1>
<p>This page describes the specification within the scope of the Avatar Communication reference tools, what that specification covers, and how the tools are organised.</p>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a></div>

This page describes the specification within the scope of the Avatar Communication reference tools, what that specification covers, and how the tools are organised.

The reference tools target MPEG Avatar Representation Format (ARF), specified as Part 39 of the MPEG-I suite in ISO/IEC 23090-39. ARF is a format for representing 3D avatars (synthesised digital representations of a person) so they can be stored, carried between systems, and animated consistently across different implementations. It defines the avatar's geometry, appearance, and the data needed to drive its animation. It is also designed to work alongside MPEG-I Scene Description (ISO/IEC 23090-14), so an avatar can be placed and anchored within a wider 3D scene in a real-world context. The goal is real-time conversational use: an avatar that stands in for a participant in an immersive call or virtual-presence session, driven from live audio and video input.

ISO/IEC 23090-39 was, as of 2025, still at the Draft International Standard (DIS) stage rather than published as a final International Standard. This matters for implementers because the format can still change before publication, so reference tooling built against it should be treated as tracking a moving target. Confirm the current status of the specification on the [ISO catalogue page](https://www.iso.org/standard/91745.html) before relying on it, and check the [standards portal](/tech/standards/avatar) for the maintained view of the related work.

On the implementation side, the work covers the pieces needed to capture, carry, and present an ARF avatar over a 5G delivery path. Broadly, that means tooling to track a participant and produce animation data, a path to package and exchange that data as part of a real-time call, sample content for testing, and integration with a Unity-based presentation so the avatar can be rendered in an interactive application. The separation between the component that produces the avatar animation and the engine that renders it follows the same decoupling pattern used across 5G-MAG's other immersive media tools, including the XR player.

The reference tooling in this area is still maturing, and the exact set of public repositories changes as the project develops. For the authoritative, current list of repositories and their implementation status, see the [GitHub Repos](./repositories) page rather than relying on a hard-coded list here. Roadmap and implementation-status details are tracked on the [5G-MAG project board](https://github.com/orgs/5G-MAG/projects/44).

## What the reference tools implement

ARF (ISO/IEC 23090-39) is defined in two halves, and the reference tooling is organised around the same split:

* **The base avatar.** ARF's Base Avatar Format describes the static asset using skeletons, meshes, blendshapes, skins, landmarks, and nodes (joints). The tools need to load such an asset, from either an ISOBMFF container (ISO/IEC 14496-12) or a Zip-based container (ISO/IEC 21320-1), and bind it into a scene.
* **The animation stream.** ARF's Animation Stream Format carries time-varying data as a sequence of Avatar Animation Units (AAUs), each with an AAU header and zero or more AAU packets and tagged with an Avatar ID. The tools produce this stream from live tracking on the sender side and consume it on the receiver side to drive the bound avatar.

In practice the implementation splits into a small number of cooperating components:

* A **tracking / animation producer** that takes camera and microphone input, tracks the participant, and emits ARF animation data mapped onto the avatar's landmarks and joints.
* A **transport / packaging path** that packages the animation as part of a real-time call and exchanges it with the far end.
* **Sample content** (base avatars and recorded animation) for testing without a live capture rig.
* A **Unity-based presentation** that loads the base avatar, places it in a scene using the MPEG-I Scene Description avatar node (the `MPEG_avatar` glTF extension, see the tech documentation), and applies the animation stream for rendering.

This mirrors the decoupling used elsewhere in 5G-MAG's immersive tooling: the component that produces avatar animation is kept separate from the engine that renders it, so the two can be developed and swapped independently as long as they agree on the ARF stream format. Because ARF is not yet final, expect the animation-stream and base-avatar details to change, and pin the tools to a known specification draft when building.

## Getting started

The runnable software and setup instructions live on the Developer Portal, not in this scope page. To begin:

* Read the [Tech: Avatar Communications](/tech/avatar-communications) documentation for the ARF data model, the scene-description integration, and the end-to-end procedure, so the component boundaries are clear before you build.
* Follow the reference-tools entry on the [Developer Portal Avatar Communications page](/developer/avatar) for build and run instructions.
* Use the [GitHub Repos](./repositories) page for the current list of repositories and their status, and the [Releases](./releases) page for tagged versions.
* Track roadmap and open work on the [5G-MAG project board](https://github.com/orgs/5G-MAG/projects/44).

If you only need to render and inspect avatars, start from the Unity presentation with the provided sample content. If you are working on capture and animation, start from the tracking/animation producer and validate its output against the sample animation streams before wiring it into a live call.

## Standard being implemented

The Avatar Communication reference tools relate to the specification below. For the full, maintained list of related MPEG and 3GPP specifications, see the standards portal page linked under "Go deeper".

| Specification | Title |
| -- | -- |
| [ISO/IEC 23090-39](https://www.iso.org/standard/91745.html) | Coded representation of immersive media, Part 39: Avatar representation format (ARF), DIS as of 2025 |

:::caution[References to verify]
The container designations cited above for ARF assets were not confirmed against a primary source: **ISO/IEC 21320-1** as the Zip-based container profile, and the specific edition of **ISO/IEC 14496-12** (ISO base media file format) intended by ARF. Check both against the ARF text before relying on them. ISO/IEC 23090-39 itself and ISO/IEC 23090-14 are established citations and are not part of this caution.
:::

## Go deeper

Technical documentation providing context to this project can be found in the link below.

[Tech: Avatar Communications](/tech/avatar-communications)

A list of relevant specifications can be found in the link below.

[Standards: Avatar Communications](/tech/standards/avatar)

Related immersive media work, including the scene framework that ARF is designed to plug into, is documented under [XR Media Integration in 5G](../xr).
