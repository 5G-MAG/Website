---
hide_title: true
title: Non-Terrestrial Networks
description: 3GPP Non-Terrestrial Network standards for satellite and HAPS media distribution, covering NR adaptations, architecture and MBS delivery.
sidebar_position: 13
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Non-Terrestrial Networks</h1>
</div>
</div>

<div class="topic-lead">
3GPP Non-Terrestrial Network standards for satellite and HAPS media distribution, covering NR adaptations, architecture and MBS delivery.
</div>

## Overview

5G-MAG tracks 3GPP Non-Terrestrial Network (NTN) standards for satellite and HAPS media distribution. For the technical analysis of NTN deployment models, mobility and media delivery, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

:::tip
New to the service layers that NTN carries? Multicast Broadcast Services (MBS) and 5G Broadcast are the delivery mechanisms most often deployed over satellite paths. See [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs) and [Standards: 5G Broadcast](/tech/standards/5g-broadcast) for background before reading this page.
:::

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The detailed analysis documents behind lossless handover and multicast delivery over satellite.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/ntn">Technical Documentation: Non-Terrestrial Networks</a></li>
</ul>
</div>
</div>

</div>

## Key 3GPP Specifications

### NR for NTN

- [TR 38.811](https://www.3gpp.org/dynareport/38811.htm) - Study on New Radio (NR) to support Non-Terrestrial Networks (Rel-15)
- [TR 38.821](https://www.3gpp.org/dynareport/38821.htm) - Solutions for NR to support Non-Terrestrial Networks (NTN) (Rel-16)
- [TS 38.331](https://www.3gpp.org/dynareport/38331.htm) - NR; Radio Resource Control (RRC) protocol specification (carries the NTN system information, including SIB19)
- [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) - NR; NR and NG-RAN Overall description; Stage 2
- [TR 38.863](https://www.3gpp.org/dynareport/38863.htm) - Non-terrestrial networks (NTN) related RF and co-existence aspects (Rel-17)

### System Architecture for NTN

- [TR 22.822](https://www.3gpp.org/dynareport/22822.htm) - Study on using Satellite Access in 5G (Stage 1)
- [TR 23.737](https://www.3gpp.org/dynareport/23737.htm) - Study on architecture aspects for using satellite access in 5G (Stage 2, Rel-16/17)
- [TS 23.501](https://www.3gpp.org/dynareport/23501.htm) - System architecture for the 5G System (5GS)
- [TS 23.502](https://www.3gpp.org/dynareport/23502.htm) - Procedures for the 5G System (5GS)

:::warning[Verify spec number]
This entry was changed by automated review from TR 22.837 to TR 22.822 and is not yet confirmed against the 3GPP portal. TR 22.837 was identified as the Integrated Sensing and Communication study (unrelated to satellite access). Confirm TR 22.822 is the intended satellite-access study before publication.
:::

### Multicast Broadcast Services over NTN

- [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) - Architectural enhancements for 5G multicast-broadcast services
- [TS 26.502](https://www.3gpp.org/dynareport/26502.htm) - 5G multicast-broadcast user services; Protocols and formats
- [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) - 5G Media Streaming (5GMS); General description and architecture

Applying MBS over NTN is the subject of active work in Release 19 and beyond; treat orbit-by-orbit and mode-by-mode feature placement as provisional. One confirmed item: Release 19 adds **SIB27** to TS 38.331 for MBS broadcast over NTN. See [MBS Broadcast NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn) for the technical detail.

## Specifications by Role

The table groups the key specifications by the part of the system they govern.

| Role                           | Specifications                                        |
| ------------------------------ | ------------------------------------------------------ |
| Radio access (NR NTN)          | TR 38.811, TR 38.821, TR 38.863, TS 38.300, TS 38.331 |
| System architecture            | TR 22.822, TR 23.737, TS 23.501, TS 23.502            |
| MBS transport                  | TS 23.247                                             |
| Media service layer            | TS 26.501, TS 26.502                                  |
| Alternative broadcast waveform | ETSI TS 103 720                                       |

## 5G-MAG tracking and contribution focus

5G-MAG tracks MBS broadcast delivery over NTN, multicast session management and delivery-mode switching under NTN mobility, and lossless handover for multicast groups across the terrestrial/non-terrestrial boundary. See the [Technical Documentation: Non-Terrestrial Networks](/tech/ntn) page for the detailed analysis.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 26.502 title, TR 38.863 release placement. Verify against the 3GPP/ETSI work plan before publication. (SIB27, the one Release 19 MBS-over-NTN feature identified so far, has been confirmed directly against TS 38.331 V19.3.0 — see [MBS Broadcast NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn) for the verification. Other Release 18/19 NTN and MBS-over-NTN feature placements remain unconfirmed and should still be treated as provisional.)
:::

## Related Standards Work

- [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs): MBS Multicast and Broadcast are the primary service layers deployed over NTN
- [Standards: 5G Broadcast](/tech/standards/5g-broadcast): ETSI TS 103 720 defines the 5G Broadcast system (FeMBMS) that can operate over satellite NTN delivery paths
- [ETSI TS 103 720](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/): 5G Broadcast System for Linear TV and Radio Services; relevant for GEO satellite broadcast delivery scenarios
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
