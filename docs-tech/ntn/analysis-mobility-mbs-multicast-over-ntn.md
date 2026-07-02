---
title: MBS Multicast NTN - Mobility
sidebar_position: 2
---


:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Analysis - Mobility for MBS Multicast over NTN

This page looks at the point where two moving parts meet: the mobility introduced by a Non-Terrestrial Network (NTN), where satellites move relative to the ground, and the mobility handling of an MBS Multicast Service, where a group of devices receives the same content. The challenge is keeping a multicast group's service continuous (ideally lossless) as satellite coverage changes.

Before reading this page it helps to be familiar with:
* [Analysis of Mobility aspects for NTN](./analysis-mobility-ntn): the NTN deployment and handover models
* [Analysis of Mobility aspects for MBS Multicast Services](../5g-mbs/mobility-mbs-multicast): how multicast mobility works in the terrestrial case
* [Analysis of MBS Multicast over NTN](./analysis-mbs-multicast-over-ntn): the base MBS Multicast over NTN scenario

The scenarios under study are the following:
* **Scenario 1**: Support of Lossless Handover for MBS Multicast Service for a group of users under the coverage of a satellite when mobility is triggered by the satellite moving.
* **Scenario 2**: Support of Lossless Handover for MBS Multicast Service for a group of users under the coverage of a satellite when mobility is triggered by at least one user within the group of users or the entire group of users.

## Standards background

This page sits at the intersection of two existing capabilities:

* **Multicast mobility (PTP/PTM), from MBS.** MBS delivery mode 1, defined in [TS 23.247](https://www.3gpp.org/dynareport/23247.htm), lets the RAN switch a device between point-to-point and point-to-multipoint and supports PTM-to-PTM mobility for a moving device; see [Analysis of Mobility aspects for MBS Multicast Services](../5g-mbs/mobility-mbs-multicast).
* **NTN mobility, from the radio layer.** Conditional Handover (CHO), satellite ephemeris in SIB19 and the timing/frequency adaptations are defined in [TS 38.331](https://www.3gpp.org/dynareport/38331.htm) and [TS 38.300](https://www.3gpp.org/dynareport/38300.htm); the deployment and beam-handover models are described on [Analysis of Mobility aspects for NTN](./analysis-mobility-ntn).

The new problem here is the combination: keeping a whole multicast *group* continuous when the trigger is the network geometry (Scenario 1) rather than a single device moving (the classic MBS case), or when it is one or more devices in the group (Scenario 2).

## Scenario 1
A group of users is consuming content provided via an MBS Multicast Service within the coverage area of a satellite (a beam). Due to satellite motion, coverage of the existing satellite/beam will be lost and the group of users will be illuminated by another satellite/beam. During this process handover delays should be minimized while the entire group of users is transferred to another satellite.

### Discussion
Although point-to-multipoint (PTM) to point-to-multipoint mobility is supported by MBS Multicast Services, as explained in [Aspects on Mobility for MBS Multicast Services](../5g-mbs/mobility-mbs-multicast), mobility in this case is triggered by the satellite motion, not by the user, and the PTM traffic delivery on the entire cell has to be transferred to another cell. The next section sets out why a naive fix for this is inefficient, and what the network can do instead.

:::caution
Scenario 1 is still being analysed; the discussion above is a work in progress and further detail is to be added.
:::

### Why the PTP-then-PTM detour is the fallback, not the goal

The straightforward way to keep each device lossless would be to move every member of the group to PTP, run the NTN handover per device, and put everyone back on PTM in the target beam. It works, but it defeats the point of multicast: for the duration of the handover the network carries one dedicated flow per device instead of one shared flow, which is exactly the load that a wide satellite beam cannot afford. Hence it is described as not resource-efficient.

The preferred approach exploits the one advantage NTN mobility has over terrestrial mobility: it is predictable. Because OAM can compute from the ephemeris when the source beam will fade and the target beam will illuminate the same ground area, the network can:

1. prepare the target beam or satellite in advance and configure Conditional Handover for the group, with execution conditions tied to the geometry rather than to a late radio measurement;
2. switch only where reliability demands it to PTP during the preparation and execution window, so that in-sequence, lossless delivery is protected while the radio is weakest (near the minimum elevation angle);
3. return the group to PTM on the target beam once synchronisation is established.

For a quasi-Earth-fixed beam the whole group tends to hand over together (a single scheduled event), whereas for an earth-moving beam only the edge devices hand over at a time, so the switch to PTP can be limited to those devices. This is where the gNodeB needs to know each multicast session's packet-loss tolerance, so it can decide which members genuinely need the PTP protection and which can ride out the switch on PTM. The two beam models and their interruption ranges are set out on [Analysis of Mobility aspects for NTN](./analysis-mobility-ntn).

## Scenario 2

Scenario 2 covers lossless handover for an MBS Multicast Service when mobility is triggered by one or more users within the group, rather than by satellite motion.

Conceptually this is closer to the terrestrial multicast-mobility case, because the trigger is the device, but the NTN setting still changes it. The moving device (or the subset of devices moving together, for example passengers on the same train or aircraft) may cross a beam or satellite boundary while the rest of the group stays put, so the group must not be disrupted for the sake of the few that move. As in Scenario 1, the tools are PTP/PTM switching for the moving members and conditional handover, but the geometry is no longer the sole predictor of when the handover happens, so radio measurements re-enter the decision. The detailed treatment is still to be developed.

:::caution
This scenario has not yet been documented. It will be added as the analysis progresses.
:::

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact TS 38.331 clauses for Conditional Handover and SIB19, and the TS 23.247 clauses for PTP/PTM switching and multicast mobility. Verify against the 3GPP work plan before publication.
:::
