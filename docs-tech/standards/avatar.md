---
hide_title: true
title: Avatar Communications
sidebar_position: 8
description: "Tracks avatar communications standardisation: the MPEG Avatar Representation Format, Scene Description integration and the 3GPP IVAS audio codec."
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4"/><path d="M12 2v2"/><path d="M9 12v9"/><path d="M15 12v9"/><path d="M5 16l4 -2"/><path d="M15 14l4 2"/><path d="M9 18h6"/><path d="M10 8v.01"/><path d="M14 8v.01"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Avatar Communications</h1>
</div>
</div>

## Overview

5G-MAG follows standardisation work on avatar communications and the associated immersive voice and audio in 5G systems. Two linked threads are in scope: the Avatar Representation Format (ARF), an MPEG format for interoperable 3D avatars, and Immersive Voice and Audio Services (IVAS), the 3GPP immersive audio codec used alongside them. Together these support next-generation real-time communication experiences over 5G. This page is for anyone tracking conversational avatar and immersive audio work.

## Why avatar communications

A conversational avatar is a synthesised 3D representation of a participant, animated in real time from that participant's live audio and video. Instead of sending a coded video image of the person, the sender transmits a compact stream of animation data (skeletal pose, facial expression, and similar) that drives a shared 3D avatar model at the receiver. This can reduce the bitrate needed for a "face-to-face" experience, decouple appearance from raw camera capture, and fit naturally into augmented and mixed reality calls where the remote participant is placed into the viewer's real environment.

For this to work across vendors, three things need to be interoperable: how the avatar itself is described (its geometry, appearance, and rig), how the animation data is formatted and streamed, and how both are carried over a real-time media path. MPEG addresses the first two through the Avatar Representation Format and MPEG-I Scene Description; 3GPP addresses the delivery and the immersive audio through its real-time communication and IVAS work. The standardisation is active and, for the avatar format, not yet final, so this page tracks a moving target.

## Architecture at a glance

A standards-aligned avatar communication path has four layers:

* **Avatar representation.** A base 3D avatar model plus its rig, described in an interoperable format so any conforming client can load and animate the same avatar. ARF (ISO/IEC 23090-39) defines this base representation and the associated animation stream.
* **Scene placement.** The avatar is positioned, anchored, and animated inside a 3D scene using MPEG-I Scene Description (ISO/IEC 23090-14), which extends Khronos glTF 2.0. The avatar-specific hook is a glTF node extension that marks a node as the root of a humanoid avatar (see below).
* **Real-time media transport.** Animation data, together with audio and any supporting media, is carried over a real-time path. In a 5G context this maps onto IMS-based multimedia telephony (MTSI) and the 3GPP real-time communication framework, typically using RTP and, for avatar animation specifically, an RTP payload format under development at the IETF.
* **Immersive audio.** Spatial, immersive voice and audio is provided by the IVAS codec so that a talking avatar can be heard with correct spatial cues.

## Key MPEG Specifications

### Avatar Representation Format (ARF)
* [ISO/IEC 23090-39](https://www.iso.org/standard/91745.html): Coded representation of immersive media; Part 39: Avatar representation format (ARF). Defines interoperable storage, carriage, and animation of 3D avatars, designed to work with MPEG-I Scene Description (ISO/IEC 23090-14; see the [XR page](/tech/standards/xr)).

ARF has two complementary halves. A **Base Avatar Format** describes the static avatar asset: its data model includes skeletons, meshes, blendshapes, skins, landmarks, and nodes (joints), so a receiver can reconstruct the same avatar an author intended. An **Animation Stream Format** carries the time-varying data that drives the avatar, organised as a sequence of Avatar Animation Units (AAUs). Each AAU is a self-contained packetisation unit (comparable in role to a NAL unit in video coding) carrying an AAU header and zero or more AAU packets, and it references an Avatar ID that identifies which avatar the animation applies to. This split lets a client load a base avatar once and then receive a lightweight animation stream during a call.

For storage and interchange, ARF supports two container types: ISOBMFF containers based on ISO/IEC 14496-12 (the ISO base media file format), and Zip-based containers formatted according to ISO/IEC 21320-1. The base avatar is designed to be referenced from a scene, so the same asset can be reused across applications and "metaverse" environments.

### MPEG-I Scene Description (avatar integration)
* [ISO/IEC 23090-14](https://www.iso.org/standard/80900.html): Coded representation of immersive media; Part 14: Scene description. Published in 2023 as a set of extensions to Khronos glTF 2.0. Avatar support is added through a later amendment (ISO/IEC 23090-14:2023 [Amendment 2](https://www.iso.org/standard/86439.html), "Support for haptics, augmented reality, avatars, interactivity, MPEG-I audio, and lighting"), which introduces a glTF node extension marking a node as the root/skeleton node of a humanoid avatar. This is the mechanism by which an ARF avatar is placed, anchored, and animated inside a wider 3D scene. See the [XR page](/tech/standards/xr) for the full Scene Description treatment.

## Key 3GPP Specifications

### Immersive Voice and Audio Services (IVAS)
IVAS is the 3GPP immersive voice and audio codec developed by working group SA4. It extends the earlier EVS codec to spatial audio, supporting mono, stereo, multichannel, scene-based (Ambisonics), and object-based audio, with metadata-assisted spatial rendering. In an avatar call, IVAS provides the spatialised voice that accompanies the animated avatar, so a remote talker can be placed at a consistent position in the listener's space. The deliverable set below spans the general description, the fixed- and floating-point reference software, test material, the detailed algorithmic description (including the RTP payload format and SDP parameters used to negotiate the codec in a session), rendering, and jitter buffer management.

* [TS 26.250](https://www.3gpp.org/dynareport/26250.htm): Immersive Voice and Audio Services (IVAS); General description and architecture
* [TS 26.251](https://www.3gpp.org/dynareport/26251.htm): Codec for Immersive Voice and Audio Services (IVAS); C code (fixed-point)
* [TS 26.252](https://www.3gpp.org/dynareport/26252.htm): Codec for Immersive Voice and Audio Services (IVAS); Test sequences
* [TS 26.253](https://www.3gpp.org/dynareport/26253.htm): Codec for Immersive Voice and Audio Services (IVAS); Detailed Algorithmic Description including RTP payload format and SDP parameter definitions
* [TS 26.254](https://www.3gpp.org/dynareport/26254.htm): Codec for Immersive Voice and Audio Services (IVAS); Rendering
* [TS 26.255](https://www.3gpp.org/dynareport/26255.htm): IVAS Codec; Floating-point computational description
* [TS 26.256](https://www.3gpp.org/dynareport/26256.htm): Codec for Immersive Voice and Audio Services (IVAS); Jitter Buffer Management

### Real-time communication delivery
Avatar communication in 5G is a conversational, low-latency service, so it maps onto the 3GPP real-time media path rather than onto streaming delivery. Two building blocks are relevant:

* [TS 26.114](https://www.3gpp.org/dynareport/26114.htm): IP Multimedia Subsystem (IMS); Multimedia Telephony; Media handling and interaction (MTSI). MTSI defines the media handling for IMS-based conversational services, including the IMS data channel that can carry non-audio-video payloads such as avatar data.
* [TS 26.506](https://www.3gpp.org/dynareport/26506.htm): Real-Time media Communication (RTC) over 5G, the stage-2 architecture for RTC. It covers delay-sensitive peer-to-peer media, with AR conversational service as a driving use case. Options for enabling an AR/avatar conversational service include reusing parts of MTSI (for example the IMS data channel) or 5G Media Streaming components.

The transport of ARF animation itself is being addressed at the IETF: [draft-ietf-avtcore-rtp-avatar](https://datatracker.ietf.org/doc/draft-ietf-avtcore-rtp-avatar/) defines an RTP payload format for ARF (ISO/IEC 23090-39) avatar animations. It packetises AAUs using single-unit, fragmentation, and aggregation packet modes, mirroring the approach used by common video RTP payload formats. This is work in progress at the IETF and not a 3GPP or MPEG deliverable.

### Study Items on Avatar Communications
* [TR 26.813](https://www.3gpp.org/dynareport/26813.htm): Study of Avatars in Real-Time Communication Services

### XR and Immersive Media Context
* [TR 26.928](https://www.3gpp.org/dynareport/26928.htm): Extended reality (XR) in 5G (includes avatar and presence use cases)

:::caution[Verify 3GPP citations against the portal]
The IVAS deliverable titles (TS 26.250 to TS 26.256) and the avatar study item number (TR 26.813) were set or revised by automated review and are not yet confirmed against a primary source, because the 3GPP portal blocks automated access. In particular, TS 26.255 is described here as "Floating-point computational description" but as "Error concealment of lost packets" on the [XR specifications page](/tech/standards/xr), where the floating-point C code is listed separately as TS 26.258; at most one description can be correct. Check all IVAS titles and the avatar study number (TR 26.813, previously cited as TS 26.118 and then TR 26.955) against the 3GPP work plan before relying on this list.
:::

## Use Cases

* Real-time avatar-based video conferencing over 5G
* Immersive spatial audio for remote collaboration
* Presence and telepresence services using 3D avatars
* Integration with XR and immersive media services (see the [XR page](/tech/standards/xr))

:::caution[References to verify]
The following identifiers introduced on this page were not confirmed against a primary source and should be checked before publication:

* **TS 26.506** exact document title and its precise scope for AR/avatar conversational service. It is cited here as "Real-Time media Communication (RTC) over 5G"; confirm the official title (some sources give a stage-2 architecture subtitle) and release against the SA4 work plan.
* **ISO/IEC 21320-1** as the Zip-based container profile referenced by ARF, and the exact ISOBMFF edition of **ISO/IEC 14496-12** intended by the ARF text.

Established citations on this page (ISO/IEC 23090-39, ISO/IEC 23090-14 and its Amendment 2, TS 26.114, and the IETF ARF RTP payload draft) are not part of this caution. The IVAS deliverable titles and the avatar study number (TR 26.813) are covered by the separate caution above and are not repeated here.
:::

## 5G-MAG tracking and contribution focus

5G-MAG follows the standardisation of avatar communications and the associated immersive voice and audio work (ARF, MPEG-I Scene Description, IVAS, and the related 3GPP/IETF transport work) as it develops. This page does not document a specific 5G-MAG contribution or reference-implementation activity for avatar communications; check the [Standards](https://github.com/5G-MAG/Standards/) repository for the current status.

## Related Standards Work

* [Standards: XR Media Integration](/tech/standards/xr)
* [Standards: Real-Time Communications](/tech/standards/rtc)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
