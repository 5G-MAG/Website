---
hide_title: true
title: Avatar Communication with MPEG ARF
slug: /standards/avatar
description: 'Tracks avatar communications standardisation: the MPEG Avatar Representation Format, Scene Description integration and the 3GPP IVAS audio codec.'
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4"/><path d="M12 2v2"/><path d="M9 12v9"/><path d="M15 12v9"/><path d="M5 16l4 -2"/><path d="M15 14l4 2"/><path d="M9 18h6"/><path d="M10 8v.01"/><path d="M14 8v.01"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Avatar Communication with MPEG ARF</h1>
</div>
</div>

<div class="topic-lead">
The MPEG Avatar Representation Format, Scene Description integration and the 3GPP IVAS immersive audio codec.
</div>

## Overview

5G-MAG tracks standardisation of avatar communications and the associated immersive voice and audio in 5G systems: the Avatar Representation Format (ARF), an MPEG format for interoperable 3D avatars, MPEG-I Scene Description integration, and Immersive Voice and Audio Services (IVAS), the 3GPP immersive audio codec used alongside them. For the technical analysis of how avatar communication works, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The implementer-facing analysis of the MPEG Avatar Representation Format.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/avatar-communications">Tech: Avatar Communication with MPEG ARF</a></li>
</ul>
</div>
</div>

</div>

## Specifications by Role

The standardisation spans MPEG (avatar representation and scene placement) and 3GPP/IETF (real-time transport and immersive audio). The table groups the key specifications by the part of the system they govern; see [Avatar Communication with MPEG ARF](/tech/avatar-communications) for the technical analysis of how these pieces fit together.

| Role                       | Specifications                                                    |
| -------------------------- | ------------------------------------------------------------------ |
| Avatar representation      | ISO/IEC 23090-39 (ARF)                                             |
| Scene placement            | ISO/IEC 23090-14 and Amendment 2 (MPEG-I Scene Description)        |
| Real-time media transport  | TS 26.114, TS 26.506, draft-ietf-avtcore-rtp-avatar                |
| Immersive audio            | TS 26.250 to TS 26.258 (IVAS)                                      |

## Key MPEG Specifications

### Avatar Representation Format (ARF)

- [ISO/IEC 23090-39](https://www.iso.org/standard/91745.html): Coded representation of immersive media; Part 39: Avatar representation format (ARF). Defines interoperable storage, carriage, and animation of 3D avatars, designed to work with MPEG-I Scene Description (ISO/IEC 23090-14; see the [XR page](/standards/xr)). Storage containers: ISOBMFF (ISO/IEC 14496-12) and Zip-based (ISO/IEC 21320-1). See [Avatar Communication with MPEG ARF](/tech/avatar-communications) for the ARF data model and end-to-end procedure.

### MPEG-I Scene Description (avatar integration)

- [ISO/IEC 23090-14](https://www.iso.org/standard/80900.html): Coded representation of immersive media; Part 14: Scene description. Published in 2023 as a set of extensions to Khronos glTF 2.0. Avatar support is added through a later amendment (ISO/IEC 23090-14:2023 [Amendment 2](https://www.iso.org/standard/86439.html), "Support for haptics, augmented reality, avatars, interactivity, MPEG-I audio, and lighting"). See the [XR page](/standards/xr) for the full Scene Description treatment.

## Key 3GPP Specifications

### Immersive Voice and Audio Services (IVAS)

IVAS is the 3GPP immersive voice and audio codec developed by working group SA4. The deliverable set below spans the general description, the fixed- and floating-point reference software, test material, the detailed algorithmic description (including the RTP payload format and SDP parameters used to negotiate the codec in a session), rendering, and jitter buffer management.

- [TS 26.250](https://www.3gpp.org/dynareport/26250.htm): Immersive Voice and Audio Services (IVAS); General description and architecture
- [TS 26.251](https://www.3gpp.org/dynareport/26251.htm): Codec for Immersive Voice and Audio Services (IVAS); C code (fixed-point)
- [TS 26.252](https://www.3gpp.org/dynareport/26252.htm): Codec for Immersive Voice and Audio Services (IVAS); Test sequences
- [TS 26.253](https://www.3gpp.org/dynareport/26253.htm): Codec for Immersive Voice and Audio Services (IVAS); Detailed Algorithmic Description including RTP payload format and SDP parameter definitions
- [TS 26.254](https://www.3gpp.org/dynareport/26254.htm): Codec for Immersive Voice and Audio Services (IVAS); Rendering
- [TS 26.255](https://www.3gpp.org/dynareport/26255.htm): IVAS Codec; Floating-point computational description
- [TS 26.256](https://www.3gpp.org/dynareport/26256.htm): Codec for Immersive Voice and Audio Services (IVAS); Jitter Buffer Management

### Real-time communication delivery

- [TS 26.114](https://www.3gpp.org/dynareport/26114.htm): IP Multimedia Subsystem (IMS); Multimedia Telephony; Media handling and interaction (MTSI).
- [TS 26.506](https://www.3gpp.org/dynareport/26506.htm): Real-Time media Communication (RTC) over 5G, the stage-2 architecture for RTC.

The transport of ARF animation itself is being addressed at the IETF: [draft-ietf-avtcore-rtp-avatar](https://datatracker.ietf.org/doc/draft-ietf-avtcore-rtp-avatar/) defines an RTP payload format for ARF (ISO/IEC 23090-39) avatar animations. This is work in progress at the IETF and not a 3GPP or MPEG deliverable.

### Study Items on Avatar Communications

- [TR 26.813](https://www.3gpp.org/dynareport/26813.htm): Study of Avatars in Real-Time Communication Services

### XR and Immersive Media Context

- [TR 26.928](https://www.3gpp.org/dynareport/26928.htm): Extended reality (XR) in 5G (includes avatar and presence use cases)

<details>
<summary>Verify 3GPP citations against the portal</summary>

The IVAS deliverable titles (TS 26.250 to TS 26.256) and the avatar study item number (TR 26.813) were set or revised by automated review and are not yet confirmed against a primary source, because the 3GPP portal blocks automated access. In particular, TS 26.255 is described here as "Floating-point computational description" but as "Error concealment of lost packets" on the [XR specifications page](/standards/xr), where the floating-point C code is listed separately as TS 26.258; at most one description can be correct. Check all IVAS titles and the avatar study number (TR 26.813, previously cited as TS 26.118 and then TR 26.955) against the 3GPP work plan before relying on this list.

</details>

<details>
<summary>References to verify</summary>

The following identifiers introduced on this page were not confirmed against a primary source and should be checked before publication:

- **TS 26.506** exact document title and its precise scope for AR/avatar conversational service. It is cited here as "Real-Time media Communication (RTC) over 5G"; confirm the official title (some sources give a stage-2 architecture subtitle) and release against the SA4 work plan.
- **ISO/IEC 21320-1** as the Zip-based container profile referenced by ARF, and the exact ISOBMFF edition of **ISO/IEC 14496-12** intended by the ARF text.

Established citations on this page (ISO/IEC 23090-39, ISO/IEC 23090-14 and its Amendment 2, TS 26.114, and the IETF ARF RTP payload draft) are not part of this caution. The IVAS deliverable titles and the avatar study number (TR 26.813) are covered by the separate caution above and are not repeated here.

</details>

## 5G-MAG tracking and contribution focus

5G-MAG follows the standardisation of avatar communications and the associated immersive voice and audio work (ARF, MPEG-I Scene Description, IVAS, and the related 3GPP/IETF transport work) as it develops; check the [Standards](https://github.com/5G-MAG/Standards/) repository for the current status.

## Related Standards Work

- [Standards: XR and MPEG-I Scene Description](/standards/xr)
- [Standards: Real-Time Communications (RTC)](/standards/rtc)
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
