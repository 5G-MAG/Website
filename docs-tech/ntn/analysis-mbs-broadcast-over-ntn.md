---
title: MBS Broadcast NTN
sidebar_position: 3
hide_title: true
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Non-Terrestrial Networks</span>
<h1>MBS Broadcast NTN</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Analysis - MBS Delivery Mode 2 (Broadcast) over NTN

MBS Broadcast over an NTN reuses the terrestrial MBS Broadcast procedures almost unchanged. The NTN-specific parts are the two System Information Blocks (SIBs) that a device reads from the broadcast signal: SIB19, which carries NTN assistance information, and SIB27, which conveys the service area for MBS in an NTN cell. Everything else is the same as the terrestrial case.

Procedures for MBS Broadcast over NTN are those defined for MBS Broadcast in [Analysis MBS Broadcast - RAN Procedures](../5g-mbs/analysis-mbs-broadcast-ran)

## Standards background

MBS Broadcast is delivery mode 2 in [TS 23.247](https://www.3gpp.org/dynareport/23247.htm): a one-to-many session that a device can receive in RRC_IDLE and RRC_INACTIVE as well as RRC_CONNECTED, with no per-device signalling and no uplink required to receive. That property is exactly what makes it reusable over NTN almost unchanged. The device tunes to the broadcast, reads the system information and receives; the satellite path does not alter the broadcast procedure itself.

The NTN-specific parts live in NR system information, defined in [TS 38.331](https://www.3gpp.org/dynareport/38331.htm):

* The terrestrial MBS Broadcast SIBs (SIB20 and SIB21) apply as on the ground.
* SIB19 adds the NTN assistance information the device needs to acquire and track the satellite cell.
* SIB27, in the Release 19 analysis on this page, carries the Intended Service Area for MBS in an NTN cell.

Because a device does not need to be in RRC_CONNECTED, delivery mode 2 over a wide GEO beam is a natural fit for wide-area linear TV and radio. The alternative broadcast waveform for GEO linear services, ETSI TS 103 720 (LTE-based 5G Broadcast), is discussed on the [standards page](/tech/standards/ntn); the two are different systems and should not be conflated.

:::note
In theory SIB19 is designed for mobility and cell reselection, therefore the delivery of SIB19 would not be required for MBS Broadcast.
:::

Concretely, SIB19 carries satellite ephemeris (position and velocity) and the timing/frequency pre-compensation parameters a device needs to acquire and track the cell. SIB27 conveys the Intended Service Area (ISA), telling the device the geographic area over which a given broadcast service is intended to apply.

### SIB 27 - Intended Service Area (ISA) for MBS Broadcast in NTN Cell

The ASN.1 definition below shows the structure of SIB27: a list of intended service areas, each identified by an area ID and described by a coverage shape.

```
SIB27-r19 ::= SEQUENCE {
 intendedServiceAreaList-r19 IntendedServiceAreaList-r19 OPTIONAL, -- Need R
 lateNonCriticalExtension OCTET STRING OPTIONAL,
 ...
}
IntendedServiceAreaList-r19 ::= SEQUENCE (SIZE (1..maxNrofMBS-Area-r19)) OF IntendedServiceAreaInfo-r19
IntendedServiceAreaInfo-r19 ::= SEQUENCE {
 intendedServiceAreaId-r19 MBS-IntendedAreaID-r19,
 areaCoordinates-r19 CHOICE {
 polygonArea-r19 OCTET STRING,
 circleArea-r19 SEQUENCE {
 center-r19 ReferenceLocation-r17,
 radius-r19 INTEGER(0..65535)
 }
 }
}
MBS-IntendedAreaID-r19 ::= INTEGER (1..maxNrofMBS-Area-r19)
```

In short, each entry gives an MBS area identifier and defines its coverage either as a polygon or as a circle (a centre reference location plus a radius). This lets the NTN cell signal exactly where a broadcast service applies.

### Why the Intended Service Area matters over NTN

On the ground, a broadcast cell covers a well-defined, small area, so where a service applies is largely a matter of which cells carry it. Over NTN a single beam can illuminate a very large footprint that spans many rights territories, languages and regulatory regimes, and, for NGSO, that footprint moves. The ISA lets the network tell the device the geographic area a given broadcast service is intended for, independently of the beam's raw coverage. A device that knows its own position (it has GNSS for NTN in any case) can then determine whether it is inside the intended area for a service and behave accordingly. This is the mechanism that keeps content within its intended geography even when the physical coverage is far larger, which is a distinctly non-terrestrial requirement.

The circle form (a reference centre plus a radius) is compact and cheap to broadcast; the polygon form is carried as an opaque octet string so that an arbitrary boundary can be described when a circle is too coarse. Both are keyed by an MBS area identifier so that several services can each carry their own area in the same cell.

## Standards mapping

| Aspect on this page | Where it is specified |
| --- | --- |
| Broadcast session, delivery mode 2 | TS 23.247 (MBS architectural enhancements) |
| Broadcast SIBs (SIB20, SIB21) and NTN SIB19 | TS 38.331 |
| Intended Service Area in SIB27 (Release 19) | TS 38.331 (confirm the SIB27 semantics against the current specification) |
| Broadcast RAN procedures reused unchanged | [Analysis MBS Broadcast - RAN Procedures](../5g-mbs/analysis-mbs-broadcast-ran) |
| NTN radio access and assistance information | [TS 38.300](https://www.3gpp.org/dynareport/38300.htm), TS 38.331; [TR 38.811](https://www.3gpp.org/dynareport/38811.htm), [TR 38.821](https://www.3gpp.org/dynareport/38821.htm) |

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the SIB27 Release 19 semantics and ASN.1 for the MBS Intended Service Area, the SIB20/SIB21 assignment for MBS Broadcast, and the SIB19 clause in TS 38.331. Verify against the 3GPP work plan before publication.
:::
