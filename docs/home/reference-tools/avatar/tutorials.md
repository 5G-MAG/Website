---
title: Tutorials
hide_title: true
sidebar_position: 2
description: Getting-started walkthrough for bringing up the avatar call demo end to end, from sample content through transport and Unity presentation to live tracking.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
<span class="topic-banner__kicker">Conversational Avatar Communication with MPEG ARF</span>
<h1>Tutorials, Tests and Examples</h1>
</div>
</div>

<div style={{margin: '8px 0'}}><a class="button button--outline button--primary" href="/reference-tools/avatar/scope" style={{margin: '2px 4px 2px 0'}}>Scope</a> <a class="button button--outline button--primary" href="/reference-tools/avatar/resources" style={{margin: '2px 4px 2px 0'}}>Resources</a> <a class="button button--outline button--primary" href="/reference-tools/avatar/tutorials" style={{margin: '2px 4px 2px 0'}}>Tutorials</a> <a class="button button--outline button--primary" href="/reference-tools/avatar/tutorials#developer-exchange" style={{margin: '2px 4px 2px 0'}}>Developer Exchange</a></div>

This page sequences a first, end-to-end run of the avatar call demo: two participants exchanging an MPEG ARF avatar over a call, built from the components and repositories described on the [Scope](./scope) and [Resources](./resources) pages.

ARF (ISO/IEC 23090-39) is still at Draft International Standard stage and the reference tooling is still maturing (see [Scope](./scope)), so treat this as a sequencing guide rather than a finished, copy-paste recipe. It tells you which repository covers which part of the pipeline and in what order to bring them up. Exact build commands, dependencies, and configuration flags are not documented on this project's Scope or Resources pages, so for those, follow the README in each repository (linked below and on [Resources](./resources)).

## What you'll end up with

A base avatar loaded and bound in the Unity presentation, animated either from the sample recorded animation or from a live tracking feed, with the animation exchanged over the call path built by the Avatar Call repository.

## Before you start

- Read [Scope](./scope) for the ARF split into the Base Avatar Format (the static asset: skeletons, meshes, blendshapes, skins, landmarks and nodes) and the Animation Stream Format (the Avatar Animation Units that drive it), and for how the tooling is organised into a tracking/animation producer, a transport/packaging path, sample content, and a Unity-based presentation.
- Check [Resources](./resources) for the current repository list and status; not all of them are public.

## 1. Start from the sample content

Repository: [Avatar Content](https://github.com/5G-MAG/rt-avatar-content) (`rt-avatar-content`)

Per Resources, this repository "holds reference MPEG ARF content for real time avatar communication": pre-built base avatars and recorded animation streams. Start here rather than with a live capture rig — it lets you validate the presentation and call path against known-good data before adding live tracking. This project's Scope and Resources pages do not document the exact file layout or how to load a sample asset, so check the repository's own README for that.

## 2. Bring up the call / transport path

Repository: [Avatar Call](https://github.com/5G-MAG/rt-avatar-call) (`rt-avatar-call`)

Per Resources, this repository "supports the development of a reference framework for avatar communication", with the stated goal of demonstrating "WebRTC communication using the MPEG ARF and related animation compression". This is the transport/packaging component from Scope: it exchanges Animation Stream Format data between the two ends of a call. As with the sample content, this project's own docs do not spell out the exact build steps, dependencies, or how to run it (standalone service, Docker setup, or a library integrated into the Unity presentation) — confirm all of that from the repository's README before proceeding.

## 3. Load and render the base avatar

Per Scope, the Unity-based presentation loads a base avatar from its container, places it in a scene using the MPEG-I Scene Description avatar node (the `MPEG_avatar` glTF extension), and applies the incoming animation stream to render it. Neither Scope nor Resources identifies a repository dedicated solely to this presentation role — check whether it ships as part of one of the repositories below (most likely [Avatar Unity Tracker](https://github.com/5G-MAG/rt-avatar-unity-tracker), since it is the only Unity-based repository listed) or is not yet published separately.

## 4. Add live tracking

Repository: [Avatar Unity Tracker](https://github.com/5G-MAG/rt-avatar-unity-tracker) (`rt-avatar-unity-tracker`)

Per Resources, this is a "Sample OpenXR tracker for ARF avatar animation in Unity". This is the tracking/animation producer component from Scope: it takes camera and tracking input, maps it onto the loaded avatar's landmarks and joints, and emits Animation Stream Format data. Once steps 1-3 work end to end with the sample content, swap this component in to drive the call from a live feed instead of a recording.

## Where rt-3gpp-swap fits

The [3GPP SWAP](https://github.com/5G-MAG/rt-3gpp-swap) (`rt-3gpp-swap`) repository is also listed on Resources for this project, but its Resources entry only says it "is related to Conversational Avatar Real-Time Communications", without stating which of the four components above it covers. We could not confirm its role from this project's own Scope or Resources pages, so it is not placed in the sequence above — check the repository directly if you need it.

## Putting it together

In order: get the sample content running through the Unity presentation and the call path first (steps 1-3), confirm the animation renders correctly end to end, then replace the recorded animation with the live tracker (step 4). Because ARF is not yet a final standard, pin every repository to a known, matching specification draft rather than mixing arbitrary branches, as noted on [Scope](./scope).

## What isn't documented here yet

This project's Scope and Resources pages do not currently give exact CLI commands, Docker or build instructions, network ports, or configuration files for any of the repositories above. For those, use the README in each repository linked above, or the [YouTube channel](https://www.youtube.com/@5GMAG), which hosts practical videos from developers on the use of the Reference Tools generally.

<div class="onair-kicker"><span class="onair-kicker__dot"></span>On Air</div>

## Developer Exchange

No Conversational Avatar-specific videos are curated here yet. Browse the full [5G-MAG YouTube channel](https://www.youtube.com/@5GMAG) in the meantime.

## Related

- [Scope](./scope) for the ARF data model and component breakdown.
- [Resources](./resources) for the current repository list and releases.
