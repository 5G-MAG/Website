---
hide_title: true
title: Conversational Avatar Communication - Standards Evolution
slug: /standards/avatar/evolution
description: Release-by-release 3GPP work item and Change Request history behind Conversational Avatar Communication with MPEG ARF.
sidebar_label: Release history
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4"/><path d="M12 2v2"/><path d="M9 12v9"/><path d="M15 12v9"/><path d="M5 16l4 -2"/><path d="M15 14l4 2"/><path d="M9 18h6"/><path d="M10 8v.01"/><path d="M14 8v.01"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Conversational Avatar Communication - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Standards: Conversational Avatar Communication with MPEG ARF](/standards/avatar): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 20:** study FS_Avatar_Ph2_MED on TR 26.813; work item AvCall_Ph2-MED on TS 26.264.
- **Release 19:** AvCall-MED adds avatar calls to TS 26.264 (ARF base avatars, 2D and 3D avatars, data channel animation, the Base Avatar Repository); FS_AVATAR produces TR 26.813; IVAS_Codec_Ph2 adds the fixed-point IVAS code.
- **Release 18:** IBACS creates TS 26.264 (AR-MTSI client); IVAS_Codec creates the IVAS specifications; ISAR adds split rendering formats to the IVAS specifications.

:::

Sources: the 3GPP work plan of 28 September 2026, the 3GPP Change Request database of 25 September 2026, and the change history of TR 26.813 V20.0.0.

This page covers [TR 26.813](https://www.3gpp.org/dynareport/26813.htm), [TS 26.264](https://www.3gpp.org/dynareport/26264.htm) and the IVAS specifications (TS 26.250 to TS 26.258). The work items are those that name these specifications in the 3GPP work plan, or that the release descriptions TR 21.918 and TR 21.919 describe for them. The change requests are those recorded in the 3GPP Change Request database as implemented in a version.

## Release 20

Release 20 (work plan of 28 September 2026); completion percentages and dates are those of the work plan.

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_Avatar_Ph2_MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1100009) | Study on Avatar communication Phase 2 | Study | [TR 26.813](https://www.3gpp.org/dynareport/26813.htm) | Complete, Sep 2026 | [SP-251663](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_110_Baltimore_2025-12/Docs/SP-251663.zip) |
| [AvCall_Ph2-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1130007) | Avatar Communications phase 2 | Normative | [TS 26.264](https://www.3gpp.org/dynareport/26264.htm) | 0% complete, planned 8 Sep 2026 to 3 Mar 2027 | SP-260910 |
| [AIML_IMS-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1080049) | Media aspects for AI/ML in IMS services | Normative | [TS 26.264](https://www.3gpp.org/dynareport/26264.htm) (with TS 26.114) | 100% complete, 6 Jun 2026 | SP-250878 |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 26.813 | 20.0.0 | 0002 | [FS_avatar_ph2_MED] Consolidated CR | FS_Avatar_Ph2_MED |

## Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [AvCall-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1070056) | Avatar Communications in AR Calls | Normative | [TS 26.264](https://www.3gpp.org/dynareport/26264.htm) | Listed in TR 21.919 clause 12.4 | SP-250264 |
| [IVAS_Codec_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040021) | EVS Codec Extension for Immersive Voice and Audio Services, Phase 2 | Normative | TS 26.250, TS 26.251, TS 26.252, TS 26.258, TR 26.997 | Listed in TR 21.919 clause 11.3 | SP-250262 |
| [FS_AVATAR](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000019) | Study of Avatars in Real-Time Communication Services | Study | [TR 26.813](https://www.3gpp.org/dynareport/26813.htm) | Complete, Mar 2025 | [SP-230544](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_100_Taipei_2023-06/Docs/SP-230544.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 26.813 | 19.0.0 |  | Version 19.0.0 created by MCC upon approval in TSG SA#107 |  |
| TR 26.813 | 19.1.0 | 0001 | Editorial corrections and increasing readability of text in Figures | FS_AVATAR |
| TR 26.813 | 19.2.0 | 0003 | Corrective CR for 26.813 | FS_AVATAR |

AvCall-MED (TR 21.919 clause 12.4) specifies avatar calls as an extension to IMS-based AR Real-Time Communication in TS 26.264. It adopts ISO/IEC 23090-39 (ARF) for base avatars; supports both 3D and 2D avatars; defines data channel based animation messages for facial, joint and landmark animation; introduces SDP and data channel based avatar negotiation, which allows the animation and avatar rendering to be activated on the sender side, in the network or on the receiver side; and defines the Mbar_Management service of the Base Avatar Repository (BAR) for creating and managing the user's base avatar and for selecting and sharing a subset of its assets in a call. TR 21.919 clause 12.1 (Localized Mobile Metaverse Services) also states that the capture of pose, gestures and expressions as input for a conversational mobile metaverse service, used to animate a 3D avatar, is captured in TS 26.264.

IVAS_Codec_Ph2 (TR 21.919 clause 11.3) delivers the fixed-point reference code (TS 26.251), the characterization of the codec (TR 26.997), and updated conformance testing in TS 26.252 with new fixed-point test sequences and a non-bit-exact conformance method for floating-point implementations. ATIAS_Ph2 (TR 21.919 clause 11.2) updates the test methods and requirements for immersive audio terminals that support the IVAS codec in TS 26.260 and TS 26.261.

TR 21.918 clause 17.13 also lists FS_AVATAR (SP-230544) among the other user plane studies, with no summary.

| Specification | Version | CR | Subject |
| --- | --- | --- | --- |
| TS 26.264 | 19.0.0 | 0006 | CR for Avatar calls in IMS |
| TS 26.264 | 19.1.0 | 0007 | OpenAPI specification for Base Avatar Management Interface |
| TS 26.264 | 19.1.0 | 0009 | Corrections and examples |
| TS 26.264 | 19.1.0 | 0011 | Consistent use of terminology: base avatar model, avatar representation, and related modifications |
| TS 26.264 | 19.2.0 | 0017 | CR on correction to animation samples transport |
| TS 26.264 | 19.3.0 | 0018 | CR on correction to high level call flows for AR communication |
| TS 26.264 | 19.3.0 | 0023 | CR on Corrections to Profile Signalling in Avatar Negotiation |
| TS 26.264 | 19.4.0 | 0020 | CR on corrections to Associated Information |
| TS 26.264 | 19.4.0 | 0024 | CR for Avatar calls in IMS |

Source for the TS 26.264 table: the change history of TS 26.264 V19.4.1.

## Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [IBACS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960042) | IMS-based AR Conversational Services | Normative | [TS 26.264](https://www.3gpp.org/dynareport/26264.htm) | TS 26.264 V18.0.0 created in Jun 2024 (change history) | SP-230165 |
| [IVAS_Codec](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=770024) | EVS Codec Extension for Immersive Voice and Audio Services | Normative | TS 26.250, TS 26.252 to TS 26.256, TS 26.258, TR 26.997 | Listed in TR 21.918 clause 17.10 | SP-220608 |
| [ISAR](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990025) | Immersive Audio for Split Rendering Scenarios | Normative | TS 26.249; CRs to TS 26.253 and TS 26.258 | Listed in TR 21.918 clause 14.4 | SP-231291 |

IBACS (TR 21.918 clause 14.6) defines the AR-MTSI client, an extension of the DCMTSI client of TS 26.114, in TS 26.264. Its features are: immersive AR media (no new codecs; AR media positioned through AR metadata); AR metadata for spatial descriptions (visualization space, user position and trackable poses signalled to an AR MF/MRF, as defined in TS 26.119) and for scene descriptions (the capability requirements of TS 26.119 clause 10); network media rendering and configuration, using the metadata formats of TS 26.565 clause 8.3 and the split rendering negotiation of TS 26.565 clause 8.4.2; AR data transport, adding the RTP header extensions for PDU Set marking, XR pose and the timing information for QoE measurements of TS 26.522; and QoE extensions, which are left for further study.

IVAS_Codec (TR 21.918 clause 17.10) selected the IVAS codec and produced TS 26.250 (general overview), TS 26.252 (test sequences), TS 26.253 (detailed algorithmic description including the RTP payload format and SDP parameters), TS 26.254 (rendering), TS 26.255 (error concealment), TS 26.256 (jitter buffer management), TS 26.258 (floating-point C code) and TR 26.997. ISAR (TR 21.918 clause 14.4) specifies an intermediate split rendering representation for immersive binaural audio on head-tracked devices (TS 26.249), added to the IVAS specifications through TS 26.253 CR 0003 and TS 26.258 CR 0002.

| Specification | Version | CR | Subject |
| --- | --- | --- | --- |
| TS 26.264 | 18.1.0 | 0001 | Editorial Corrections to TS 26.264 |
| TS 26.264 | 18.2.0 | 0002 | Remove MRF from IMS data channel architecture |

## TR 26.813 before change control

<details>
<summary>Versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| 25/8/2023 | 125 |  | Initial draft of the TR | 0.1.0 |
| 24/10/2023 | post 125 | S4aV230059 | Added Use Case 5 | 0.1.5 |
| 24/10/2023 | post 125 | S4aV230060 | Updated Use Case 4 | 0.1.5 |
| 17/11/2023 | 126 | S4-231877 | MPEG reference avatar | 0.2.0 |
| 17/11/2023 | 126 | S4-232033 | Avatar reference model | 0.2.0 |
| 17/11/2023 | 126 | S4-231838 | Updates after adhoc calls | 0.2.0 |
| 17/11/2023 | 126 | S4-232024 | Updates to use cases | 0.2.0 |
| 17/11/2023 | 126 | S4-232034 | Updates to use cases | 0.2.0 |
| 17/11/2023 | 126 | S4-231650 | Updates to use cases | 0.2.0 |
| 01/02/2024 | 127 | S4-240079 | Updates on Reference Architecture | 0.3.0 |
| 01/02/2024 | 127 | S4-240433 | Avatar reference architecture details | 0.3.1 |
| 12/04/2024 | 127-e | S4aV230124 | Additional sets of facial landmarks | 0.4.0 |
| 23/05/2024 | 128 | S4-240928 | AVATAR-related features in glTF 2.0 and MPEG-I Scene Description | 0.5.0 |
| 23/05/2024 | 128 | S4-241108 | Morph Target Animation | 0.5.0 |
| 23/05/2024 | 128 | S4-241313 | Definitions and reference architecture updates | 0.5.0 |
| 23/08/2024 | 129-e | S4-241686 | Reference Architecture Mapping to Non-IMS Services | 0.6.0 |
| 23/08/2024 | 129-e | S4-241687 | MPEG Avatar Representation Format | 0.6.0 |
| 23/08/2024 | 129-e | S4-241743 | Mesh-based avatar protection | 0.6.0 |
| 22/11/2024 | 130 | S4-242194 | pCR on Avatar Representation of Avatar Properties | 0.8.0 |
| 03/12/2024 | SA#106 | SP-241755 | Version created by MCC to present to TSG SA for information | 1.0.0 |
| 21/02/2025 | 131 | S4-250096 | [FS_AVATAR] Updated TR 26.813 | 1.1.0 |
| 21/02/2025 | 131 | S4-250362 | [FS_AVATAR] Proposed conclusions for the Avatar TR | 1.1.0 |
| 21/02/2025 | 131 | S4-250287 | [FS_AVATAR] Avatar Management | 1.1.0 |
| 21/02/2025 | 131 | S4-250288 | [FS_AVATAR] Joint and Blend shape Animation | 1.1.0 |
| 21/02/2025 | 131 | S4-250358 | [FS_AVATAR] pCR on IMS architecture mapping | 1.1.0 |
| 21/02/2025 | 131 | S4-250359 | [FS_AVATAR] pCR on IMS call flow | 1.1.0 |
| 21/02/2025 | 131 | S4-250360 | [FS_AVATAR] pCR on reference architecture and procedures | 1.1.0 |
| 21/02/2025 | 131 | S4-250195 | [FS_AVATAR] Pseudo-CR on MPEG Avatar Representation Format | 1.1.0 |
| 21/02/2025 | 131 | S4-250227 | pCR Metahuman representation format | 1.1.0 |
| 21/02/2025 | 131 | S4-250228 | pCR VRM representation format | 1.1.0 |
| 03-2025 | SA#107 | SP-250288 | Version 2.0.0 created by MCC for presentation to TSG SA#107 | 2.0.0 |

</details>
