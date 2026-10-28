---
hide_title: true
title: Video Operation Points - Standards Evolution
slug: /standards/vops/evolution
description: Release-by-release 3GPP work item and Change Request history behind Video Operation Points.
sidebar_label: Release history
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
  <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
  <path d="M6 9l12 0" />
  <path d="M6 12l3 0" />
  <path d="M6 15l2 0" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Video Operation Points - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Video Operation Points: Specifications](/standards/vops): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 19:** work item VOPS; 5 change requests.
- **Release 20:** no work item in the work plan lists TS 26.265; the study FS_AVFOPS_MED on advanced video formats and operation points (TR 26.966) is listed.
- **Release 15 to 18:** earlier video operation points in TS 26.116, TS 26.118 and TS 26.511, which the VOPS work item consolidates.

:::

Sources: the 3GPP release descriptions TR 21.915, TR 21.917, TR 21.918 and TR 21.919, the 3GPP work plan of 28 September 2026, the 3GPP Change Request database of 25 September 2026, and the change history of TS 26.265 V19.3.0.

This page covers [TS 26.265](https://www.3gpp.org/dynareport/26265.htm). The work items are those that name these specifications in the 3GPP work plan. The change requests are those recorded in the 3GPP Change Request database as implemented in a version.

## Release 20

Release 20 (work plan of 28 September 2026): no work item lists TS 26.265. The work plan lists the study FS_AVFOPS_MED (UID 1090042, Study of Advanced Video Formats and Operation Points, S4, TR 26.966, SP-251202, 100%, finish 9 September 2026). The work plan does not state its relation to TS 26.265, and no change history of TR 26.966 was available.

## Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [VOPS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1030002) | Video Operating Points - Harmonization and Stereo MV-HEVC | Normative | [TS 26.265](https://www.3gpp.org/dynareport/26265.htm) (with TS 26.116, TS 26.118, TS 26.119, TS 26.143, TS 26.511) | Complete, Dec 2025 | [SP-250818](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_108_Prague_2025-06/Docs/SP-250818.zip) |

What the release description adds (TR 21.919 clause 11.5):

- The work item consolidates video operation points and capabilities that were scattered across several SA4 specifications into the new TS 26.265, and adds stereoscopic encoding and decoding capabilities and operation points based on the Multiview Extensions of HEVC (MV-HEVC), with a conformance framework including tools and test vectors.
- TS 26.265 defines three video representation formats (3GPP High-Definition, 3GPP High Dynamic Range and 3GPP Stereoscopic), common bitstream constraints such as progressive scan and limits on HEVC VUI syntax, and decoding capabilities for AVC and HEVC by codec, profile, tier and level. They combine into the operation points of TS 26.265 V19.3.0 clause 6.1, table 6.1-1: 3GPP-AVC-HD, 3GPP-HEVC-HD, 3GPP-HEVC-HD-HDR, 3GPP-HEVC-UHD-HDR, 3GPP-HEVC-Stereo, 3GPP-MV-HEVC-Main-Stereo and 3GPP-MV-HEVC-Ext-Stereo.
- Annex B of TS 26.265 provides the conformance assets: video test material, reference encoder configurations, a conformance validator and conformance bitstreams (TR 21.919 clause 11.5; TS 26.265 V19.3.0 clause B.1).

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 26.265 | 19.0.0 |  | Version 19.0.0 created by MCC to be published upon approval at TSG SA#109 |  |
| TS 26.265 | 19.1.0 | 0001 | [VOPS] Conformance | VOPS |
| TS 26.265 | 19.1.0 | 0002 | [VOPS] Essential Corrections | VOPS |
| TS 26.265 | 19.1.0 | 0003 | [VOPS] Essential corrections | VOPS |
| TS 26.265 | 19.2.0 | 0004 | [VOPS] Conformance Updates | VOPS |
| TS 26.265 | 19.3.0 | 0006 | [VOPS] MV-HEVC profile and OLS handling | VOPS |

## Release 15 to Release 18: earlier video operation points

TS 26.265 is created in Release 19 (version 19.0.0, see the Release 19 section above). The release descriptions list earlier work on video operation points and profiles in other specifications. TR 21.919 clause 11.5 states that VOPS consolidates such definitions; the work plan lists TS 26.116, TS 26.118, TS 26.119, TS 26.143 and TS 26.511 with the VOPS work item. This page does not state which clauses of those specifications were moved.

| Release | Work item | What it adds | Source |
| --- | --- | --- | --- |
| 15 | HDR | High Dynamic Range in the TV Video Profiles of TS 26.116: an HDR video profile based on the Perceptual Quantizer, following ITU-R BT.2100, with H.265 (HEVC) compression, transfer functions, colour primaries and metadata | TR 21.915 clause 12.4.2 |
| 15 | VRStream | Virtual Reality profiles in TS 26.118; for video, three operation points (Basic Video on H.264/AVC High Profile Level 5.1, Main Video and Advanced Video on H.265/HEVC High Profile Level 5.1) | TR 21.915 clause 12.4.3 |
| 16 | HLG_HDR | Addition of HLG HDR to TV Video Profiles; listed without a description | TR 21.916 annex A |
| 17 | 8K_TV_5G | An HEVC-based 8K TV operation point (H.265/HEVC Main-10 Profile Main Tier) in TS 26.116, and the corresponding decoding capabilities for 5G Media Streaming in TS 26.511 | TR 21.917 clause 15.2 |
| 18 | FS_HEVC_Profiles | Study on new HEVC profiles and operating points; listed without a description | TR 21.918 clause 17.13 |
| 18 | MeCAR | TS 26.119, media capabilities of AR devices, including video codecs (AVC and HEVC) per device type | TR 21.918 clause 14.2 |
| 18 | PROMISE | TS 26.143 messaging media profiles; video requirements upgraded with Full HD and HDR in alignment with TS 26.511 | TR 21.918 clause 17.2 |

## TS 26.265 before change control

<details>
<summary>15 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Apr 2024 | SA4#127bis-e | S4-240616 | Initial version | 0.0.0 |
| Apr 2024 | SA4#127bis-e | S4-240758 | Version agreed at SA4#127bis-e | 0.1.0 |
| May 2024 | SA4#128 | S4-241369 | Version agreed at SA4#128 including S4-240911, S4-241296, S4-241298 | 0.2.2 |
| Aug 2024 | SA4#129-e | S4-241669 | Version agreed at SA4#129-e including S4-241479, S4-241705 | 0.3.0 |
| Oct 2024 | Post SA4#129-e Video SWG AHG | S4aV240073 | Version agreed during Post SA4#129-e Video SWG AHG October 29, 2024 adding S4aV240060 | 0.3.1 |
| Nov 2024 | SA4#130 | S4-241892 | Version submitted for SA4#130 adding agreed S4aV240073 | 0.3.2 |
| Nov 2024 | SA4#130 | S4-242064 | Version agreed at SA4#130 including S4-241894, S4-242174, S4-242209, S4-242211 | 0.5.0 |
| Feb 2025 | SA4#131 | S4-250031 | Version submitted for SA4#131 | 0.5.1 |
| Feb 2025 | SA4#131 | S4-250369 | Version agreed at SA4#131 including S4-250031, S4-250116, S4-250117, S4-250367, S4-2500368, S4-250369, S4-250370 | 0.6.0 |
| Mar 2025 | SA#107 | SP-250281 | Version 1.0.0 created by MCC for sending to TSG SA for information | 1.0.0 |
| Apr 2025 | SA4#131-bis-e | S4-250710 | Version agreed at SA4#131-bis-e including S4-250640, S4-250679, S4-250704, S4-250706, S4-250707, S4-250741 | 1.1.0 |
| May 2025 | SA4#132 | S4-251137 | Version agreed at SA4#132 including S4-251136 which is a merge of S4-250775, S4-250797, S4-250798, S4-250799, S4-250830, S4-250832, S4-250833, S4-250861, S4-250940 | 1.2.0 |
| Jul 2025 | SA4#133-e | S4-251522 | Version agreed at SA4#133-e including S4-251380, S4-251399, S4-251514, S4-251515, S4-251516 S4-251519, S4-251520 | 1.3.0 |
| Sep 2025 | Post SA4#133-e Video SWG AHG | S4aI25 SP-2509720065 | Version agreed during Post SA4#133-e Video SWG AHG September 2, 2025 adding online revisions S4aV240063 and prepared for submission to SA#107 for approval | 1.4.0 |
| Sep 2025 | SA#109 | SP-250972 | Version 2.0.0 created by MCC to be sent to TSG SA for approval | 2.0.0 |

</details>

## Related

- [Video Operation Points: Specifications](/standards/vops)
- [Video Operation Points: Technical Analysis](/tech/vops)
