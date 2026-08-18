---
title: MBS Broadcast NTN
sidebar_position: 3
hide_title: true
description: MBS Broadcast over NTN reuses terrestrial delivery-mode-2 procedures, adding SIB19 assistance data and SIB27 service-area signalling.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Non-Terrestrial Networks</span>
<h1>MBS Broadcast NTN</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Analysis - MBS Delivery Mode 2 (Broadcast) over NTN

MBS Broadcast over an NTN reuses the terrestrial MBS Broadcast procedures almost unchanged. The NTN-specific parts are the two System Information Blocks (SIBs) that a device reads from the broadcast signal: SIB19, which carries NTN assistance information, and SIB27, which conveys the service area for MBS in an NTN cell. Everything else is the same as the terrestrial case.

Procedures for MBS Broadcast over NTN are those defined for MBS Broadcast in [Analysis MBS Broadcast - RAN Procedures](../5g-mbs/analysis-mbs-broadcast-ran)

## Standards background

MBS Broadcast — this site's "delivery mode 2" (see [MBS RAN Aspects](/tech/5g-mbs/ran-aspects)) — is the "Broadcast MBS session" of [TS 23.247](https://www.3gpp.org/dynareport/23247.htm): a one-to-many session that a device can receive in RRC_IDLE and RRC_INACTIVE as well as RRC_CONNECTED, with no per-device signalling and no uplink required to receive. That property is exactly what makes it reusable over NTN almost unchanged. The device tunes to the broadcast, reads the system information and receives; the satellite path does not alter the broadcast procedure itself.

The NTN-specific parts live in NR system information, defined in [TS 38.331](https://www.3gpp.org/dynareport/38331.htm):

- The terrestrial MBS Broadcast SIBs (SIB20 and SIB21) apply as on the ground.
- SIB19 adds the NTN assistance information the device needs to acquire and track the satellite cell.
- SIB27, in the Release 19 analysis on this page, carries the Intended Service Area for MBS in an NTN cell.

Because a device does not need to be in RRC_CONNECTED, delivery mode 2 over a wide GEO beam is a natural fit for wide-area linear TV and radio. The alternative broadcast waveform for GEO linear services, ETSI TS 103 720 (LTE-based 5G Broadcast), is discussed on the [standards page](/standards/ntn); the two are different systems and should not be conflated.

:::note
In theory SIB19 is designed for mobility and cell reselection, therefore the delivery of SIB19 would not be required for MBS Broadcast.
:::

Concretely, SIB19 carries satellite ephemeris (position and velocity) and the timing/frequency pre-compensation parameters a device needs to acquire and track the cell. SIB27 conveys the Intended Service Area (ISA), telling the device the geographic area over which a given broadcast service is intended to apply.

### SIB 27 - Intended Service Area (ISA) for MBS Broadcast in NTN Cell

SIB27 carries a list of Intended Service Areas (`intendedServiceAreaList-r19`), each entry giving an MBS area identifier (`intendedServiceAreaId-r19`) and its coverage shape (`areaCoordinates-r19`) as either a **polygon** (an opaque octet string encoding an arbitrary boundary) or a **circle** (a centre reference location plus a radius). Full ASN.1 in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1** ("System information blocks").

:::note[About the field summary above]
This describes SIB27 by field name and purpose rather than reproducing its ASN.1 definition in full — the structure, field types and encoding are 3GPP's copyrighted text. Consult TS 38.331 Clause 6.3.1 directly for anything you need to implement against.
:::

### Why the Intended Service Area matters over NTN

On the ground, a broadcast cell covers a well-defined, small area, so where a service applies is largely a matter of which cells carry it. Over NTN a single beam can illuminate a very large footprint that spans many rights territories, languages and regulatory regimes, and, for NGSO, that footprint moves. The ISA lets the network tell the device the geographic area a given broadcast service is intended for, independently of the beam's raw coverage. A device that knows its own position (it has GNSS for NTN in any case) can then determine whether it is inside the intended area for a service and behave accordingly. This is the mechanism that keeps content within its intended geography even when the physical coverage is far larger, which is a distinctly non-terrestrial requirement.

The circle form (a reference centre plus a radius) is compact and cheap to broadcast; the polygon form is carried as an opaque octet string so that an arbitrary boundary can be described when a circle is too coarse. Both are keyed by an MBS area identifier so that several services can each carry their own area in the same cell.

## Standards mapping

| Aspect on this page                         | Where it is specified                                                                                                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Broadcast MBS session (this site's "delivery mode 2") | TS 23.247 (MBS architectural enhancements)                                                                                                                                        |
| Broadcast SIBs (SIB20, SIB21) and NTN SIB19 | TS 38.331 Clause 6.3.1 (all four SIBs are defined in the same clause)                                                                                                              |
| Intended Service Area in SIB27 (Release 19) | TS 38.331 Clause 6.3.1                                                                                                                                                            |
| Broadcast RAN procedures reused unchanged   | [Analysis MBS Broadcast - RAN Procedures](../5g-mbs/analysis-mbs-broadcast-ran)                                                                                                   |
| NTN radio access and assistance information | [TS 38.300](https://www.3gpp.org/dynareport/38300.htm), TS 38.331; [TR 38.811](https://www.3gpp.org/dynareport/38811.htm), [TR 38.821](https://www.3gpp.org/dynareport/38821.htm) |

:::note[Verified against primary sources]
Checked directly against TS 38.331 V19.3.0 (the current published version). SIB27's Release 19 tag, ASN.1 structure and clause placement are all confirmed as described above. SIB19 is also confirmed at Clause 6.3.1, described in the spec as containing "satellite assistance information for NTN access" — matching this page's description of ephemeris and timing/frequency pre-compensation data; note that SIB19 itself is tagged `r17` (introduced in Release 17 for NTN generally, not new in Release 19 — it is SIB27 that is the new Release 19 addition, layered on top of the pre-existing SIB19). SIB20/SIB21's assignment to MBS broadcast was already verified on the [Broadcast RAN procedures page](../5g-mbs/analysis-mbs-broadcast-ran). The TS 23.247 delivery-mode-2 citation was not re-checked on this page specifically but is consistent with the verified Standards page ([5g-mbs.md](/standards/5g-mbs)).
:::

## Related

- [Non-Terrestrial Networks](/tech/ntn): the parent topic page
- [Analysis of MBS Multicast over NTN](./analysis-mbs-multicast-over-ntn): the multicast counterpart of this analysis
- [Analysis of RAN Procedures for MBS Broadcast](../5g-mbs/analysis-mbs-broadcast-ran): the terrestrial broadcast procedures reused here
- [Standards: Non-Terrestrial Networks](/standards/ntn): the specification list for this topic
