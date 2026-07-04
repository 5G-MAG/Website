---
hide_title: true
title: Avatar Communication with MPEG ARF
sidebar_position: 7
description: Explains the MPEG ARF avatar data model and how avatar animation is streamed over 5G for real-time conversational calls.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4"/><path d="M12 2v2"/><path d="M9 12v9"/><path d="M15 12v9"/><path d="M5 16l4 -2"/><path d="M15 14l4 2"/><path d="M9 18h6"/><path d="M10 8v.01"/><path d="M14 8v.01"/></svg>
</div>
<div class="topic-banner__text">
<h1>Avatar Communication with MPEG ARF</h1>
</div>
</div>

<div class="topic-lead">
Real-time conversational avatars, animated from audio and video, for immersive calls over 5G.
</div>

Avatar Communications covers real-time conversational avatar systems in 5G contexts, targeting the MPEG Avatar Representation Format (ARF) and its use for avatar-based communications. Avatars are synthesised digital representations of participants, animated in real time from audio and video input, enabling immersive video calls and virtual presence experiences. 5G-MAG's work looks at the tools needed to encode, render, and stream avatars over 5G networks: the avatar representation itself, its animation, and the media transport that carries it. For acronyms used here, see the [Glossary](/tech/standards/glossary).

The avatar representation reuses the MPEG-I Scene Description model: the `MPEG_avatar` glTF extension, described on the [MPEG-I Scene Description](./xr/mpeg-i-scene-description) page, is how a 3D avatar is placed and animated within a scene.

**Key specifications:** ISO/IEC 23090-39 (MPEG Avatar Representation Format, ARF), 3GPP [TR 26.813](https://www.3gpp.org/dynareport/26813.htm) (Study of Avatars in Real-Time Communication Services, the FS_AVATAR study item, completed in Release 19).

**Reference tools:** The 5G-MAG software implementation is on the Developer Portal under [Avatar Communications](/developer/avatar).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The ARF data model, end-to-end procedure, and how avatars are placed in a scene via MPEG-I Scene Description.</p>
<ul class="godeeper-card__links">
<li><a href="./xr/mpeg-i-scene-description">MPEG-I Scene Description</a></li>
<li><a href="./xr">XR and Immersive Media</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>The normative specifications (ARF, IVAS) and 5G-MAG's contributions on avatar communications standardisation.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/avatar">Standards: Avatar Communications</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference implementation for real-time conversational avatars over 5G.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/avatar">Avatar Communications</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44)

The slide deck below introduces the Avatar Communications reference tools and their role in 5G real-time communication.

<iframe width="60%" height="520" src="/docs/Reference_Tools_Avatar.pdf" title="Slide deck: Avatar Communications reference tools"></iframe>

*Slide deck: Avatar Communications reference tools.*

[Download the Slidedeck](/docs/Reference_Tools_Avatar.pdf)

---

## Information related to Standards

[Standards: XR and Avatar Communications](/tech/standards/xr)

---

## Technical Documentation

### General information about Avatar Communications

An avatar communication system combines three pieces: a representation of the avatar (its 3D model and how it is described), an animation stream that drives it in real time from a participant's audio and video, and a media transport that carries these over the network so remote participants see and hear the avatar. 5G-MAG's work looks at how these pieces map onto 5G media delivery. The introductory material below gives a first orientation.

* [**Teaser on Avatar Communications**](./videos#avatar-communications-in-ar-calls)

### The ARF data model

The Avatar Representation Format (ISO/IEC 23090-39) is built from two complementary specifications:

* A **Base Avatar Format** that stores the avatar asset. Its data model is composed of skeletons, meshes, blendshapes, skins, landmarks, and nodes (joints). The skeleton and joints give the avatar its articulation; meshes and skins give it surface geometry and how that geometry deforms with the skeleton; blendshapes provide expression and fine facial deformation; landmarks give named reference points used to map tracking data onto the model.
* An **Animation Stream Format** that carries the time-varying data used to animate a base avatar. The stream is a sequence of Avatar Animation Units (AAUs). Each AAU is a self-contained packetisation unit, similar in role to a NAL unit in video coding, and consists of an AAU header followed by zero or more AAU packets. Each AAU references an Avatar ID so that, in a multi-party session, animation data can be routed to the correct avatar.

The base avatar can be stored and exchanged in two container types: an ISOBMFF container (ISO/IEC 14496-12) or a Zip-based container (ISO/IEC 21320-1). Because the base avatar and the animation are separate, a client can fetch and load the model once (or reuse one it already holds) and then receive only the compact animation stream during the call.

### Scene placement via MPEG-I Scene Description

ARF does not, by itself, position an avatar in a room; that is the job of MPEG-I Scene Description (ISO/IEC 23090-14), a set of extensions to Khronos glTF 2.0. Avatar support was added to Scene Description through an amendment (ISO/IEC 23090-14:2023 Amendment 2), which defines a glTF node extension that marks a particular node as the root/skeleton node of a humanoid avatar. In the 5G-MAG documentation this is referred to as the `MPEG_avatar` glTF extension, described on the [MPEG-I Scene Description](./xr/mpeg-i-scene-description) page. The Presentation Engine reads the scene, resolves the avatar node, binds the ARF base avatar to it, and then applies the incoming animation stream frame by frame. This is the same Presentation Engine / Media Access Function decoupling used across the other MPEG-I Scene Description tooling.

### End-to-end procedure

At a high level, a conversational avatar session proceeds as follows:

1. **Provisioning.** Both endpoints obtain the base avatar (either a stored ARF asset or one generated for the user). Because the avatar model is shared, only animation and audio need to flow during the call.
2. **Session setup.** The endpoints negotiate a real-time session. In a 5G context this uses the IMS-based conversational path (MTSI, [TS 26.114](https://www.3gpp.org/dynareport/26114.htm)) or the RTC framework ([TS 26.506](https://www.3gpp.org/dynareport/26506.htm)); the immersive audio codec (IVAS) and any avatar animation stream are negotiated through SDP.
3. **Capture and tracking.** The sender tracks the participant from camera and microphone input and derives animation parameters (skeletal pose, facial blendshape weights, and similar) mapped onto the ARF landmarks and joints.
4. **Encode and packetise.** Animation parameters are formatted as ARF AAUs; audio is encoded with IVAS.
5. **Transport.** AAUs are carried over RTP. The IETF is defining an RTP payload format for ARF animations (draft-ietf-avtcore-rtp-avatar) with single-unit, fragmentation, and aggregation packet modes; IVAS audio uses its own RTP payload format. The IMS data channel is one candidate carrier for the animation data.
6. **Render.** The receiver's Presentation Engine applies the animation stream to the bound base avatar within the scene, and IVAS renders the spatial audio so the avatar is heard from its scene position.

### Interfaces and interoperability

An implementer has to respect four interoperability boundaries: the ARF base-avatar asset (so any conforming client can load the same avatar), the ARF animation stream and AAU structure (so animation produced by one endpoint can drive an avatar at another), the scene-description document that anchors the avatar, and the session-level negotiation (SDP media descriptions for IVAS audio and for the avatar animation payload). Keeping animation production separate from rendering means the tracking/animation component and the Unity-based presentation can evolve independently, provided both sides agree on the ARF stream format.

:::note
ARF (ISO/IEC 23090-39) was still at the Draft International Standard stage as of 2025, so the base-avatar and animation-stream details above can change before final publication. Confirm the current stage on the [ISO catalogue page](https://www.iso.org/standard/91745.html) and treat reference tooling as tracking a moving target.
:::

:::caution[References to verify]
The following points on this page were not confirmed against a primary source and should be checked before publication:

* **TS 26.114** (MTSI) and **TS 26.506** (RTC over 5G) as the delivery path for avatar animation, and the exact title of TS 26.506; confirm placement and titles against the 3GPP SA4 work plan.
* **ISO/IEC 21320-1** as the Zip-based container profile and the specific **ISO/IEC 14496-12** edition referenced by ARF.
* The claim that the avatar animation stream is negotiated at session level via SDP alongside IVAS, and that the IMS data channel carries the animation. These describe candidate mechanisms and should be checked against the current ARF, IETF, and 3GPP drafts.

The avatar study number (TR 26.813, "Study of Avatars in Real-Time Communication Services") was confirmed via independent web search cross-checking two sources. Established citations (ISO/IEC 23090-39, ISO/IEC 23090-14 and Amendment 2, glTF 2.0, and the IETF ARF RTP payload draft) are not part of this caution.
:::

## Related

* [XR and MPEG-I Scene Description](./xr): the wider XR area, including the scene-description model that positions and animates avatars.
* [MPEG-I Scene Description](./xr/mpeg-i-scene-description): the `MPEG_avatar` glTF extension used for 3D avatar representation.
* [Standards: XR and Avatar Communications](/tech/standards/xr): the standards-tracking view of this topic.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
