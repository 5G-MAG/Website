---
title: NTN - Mobility
sidebar_position: 0
hide_title: true
description: NTN mobility deployment models (single-operator, shared-core, cross-operator) and quasi-Earth-fixed vs earth-moving beam handover.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Non-Terrestrial Networks</span>
<h1>NTN - Mobility</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Analysis - Mobility for NTN

Non-Terrestrial Networks (NTNs) may use satellites, for example, to provide connectivity over large geographical areas. In particular, NTNs may deliver Internet and media content to poorly served areas as well as to moving platforms (e.g. cars, trains, aeroplanes) beyond the reach of terrestrial infrastructure.
The following describes some of the different ways in which NTNs can be deployed so as to support service continuity when both User Equipment (UE) and satellites are moving relative to one another. It then goes on to describe handover procedures that can be used with such NTN deployments to minimise service interruption time under these dynamic conditions.

This page covers three deployment models, described in order below:

1. **Single NTN operator**: one operator manages the satellite infrastructure; handovers are between satellites/beams of that operator.
2. **Common NTN and Terrestrial Network (TN) operator**: one operator owns both the terrestrial and non-terrestrial infrastructure and shares a single 5G Core.
3. **Independent NTN and TN operators**: two operators own the terrestrial and non-terrestrial infrastructure separately, each with its own 5G Core.

A few recurring terms: point-to-multipoint (PTM) delivers the same packets to many devices over a shared channel, while point-to-point (PTP) delivers to one device over a dedicated channel; NGSO means non-geostationary orbit (satellites that move relative to the ground); RTT is the network round-trip time. In a Transparent Payload deployment the satellite relays the signal to a ground-based base station (gNodeB), whereas in a Regenerative Payload deployment the base station function is carried on board the spacecraft.

## Standards background

NTN mobility builds on the general NR mobility framework and the NTN radio adaptations, applied to coverage that moves relative to the ground.

* The NTN deployment scenarios, orbits (GEO, MEO, LEO), HAPS and the transparent/regenerative payload split come from the study reports [TR 38.811](https://www.3gpp.org/dynareport/38811.htm) and [TR 38.821](https://www.3gpp.org/dynareport/38821.htm), and are described at architecture level in [TS 38.300](https://www.3gpp.org/dynareport/38300.htm).
* The assistance information a device uses to acquire and track a moving cell (satellite ephemeris, common timing advance, k-offset, epoch time and validity window) is broadcast in SIB19, defined in [TS 38.331](https://www.3gpp.org/dynareport/38331.htm). A device that knows the ephemeris and its own GNSS position can anticipate when a serving beam will leave and prepare the next one.
* Handover, conditional handover (CHO) and the RRC procedures reused here are defined in TS 38.331, with the stage 2 mobility framework in TS 38.300. System-level mobility and session continuity for satellite access were studied in [TR 23.737](https://www.3gpp.org/dynareport/23737.htm).
* The multicast-specific behaviour (PTP/PTM and delivery-mode switching) that these models rely on comes from MBS, defined in [TS 23.247](https://www.3gpp.org/dynareport/23247.htm); see [Analysis of Mobility aspects for MBS Multicast Services](../5g-mbs/mobility-mbs-multicast).

Two properties of NTN mobility make it different from the terrestrial case. First, mobility can be triggered by the network geometry (the satellite or beam moving) and not only by the device moving, so handovers are predictable from ephemeris and can be scheduled in advance. Second, in a wide beam a whole multicast group may need to move at roughly the same time, so group handover, not just per-device handover, has to be efficient.

## Single NTN operator
In this deployment model the satellite infrastructure is managed by a single NTN operator. Satellite-to-satellite handovers for NGSO systems are considered for two beam scenarios: quasi-Earth fixed beam and Earth-moving beam. In both cases frequent handovers are expected due to satellite motion.

The two beam models differ in what triggers the handover, how much of the multicast group moves at once, where the complexity sits, the switch mechanics and resulting service interruption, and how radio resources and PTM/PTP delivery are handled during the switch:

| Aspect | Quasi-Earth fixed beam | Earth-moving beam |
| --- | --- | --- |
| Handover trigger | Time-based (fixed beam re-pointed periodically) | Location-based: the UE begins handover once at distance d from the Beam Reference Centre, where D1 ≤ d ≤ D2 |
| Group handover | Whole multicast group handed over together | Only edge UEs hand over; handover is gradual |
| Handover frequency | Frequent | More frequent |
| Onboard satellite complexity | Higher (steerable beamforming) | Lower |
| End-to-end network complexity (mobility handling and beam/frequency-plan allocation) | Lower | Higher |
| Service interruption | Soft switch: negligible, on the order of milliseconds; hard switch: can exceed hundreds of ms in the worst case, to allow beam layout configuration, radio baseband resource association to beam, and UE downlink synchronization | Hundreds of ms in the best case |
| Switch types | a) Soft switch: Mapped Cell served by two overlapping beams on different carrier frequencies during the switching phase; b) hard switch: Mapped Cell served by only one beam at any point in time | Single handover procedure (no soft/hard switch distinction) |
| Radio resource use | Soft switch needs additional margin resources (extra feeder-link and service-link carrier frequencies) to support the overlapping beam; hard switch reuses the same resources between the switching beams | N/A |
| IP continuity | Preserved | Preserved |
| PTM/PTP behaviour under poor radio conditions | Whole multicast group is affected at once (source satellite close to the minimum elevation angle for all UEs); PTM UEs are switched to PTP at a chosen instant (T1 + ΔT) during the switching phase to guarantee reliable, in-sequence delivery. Suited to applications intolerant of packet loss; congestion-avoidance mechanisms should also be implemented | Only the edge UE(s) are affected (source satellite close to the minimum elevation angle for that UE); edge UEs switch to PTP while the rest of the group stays in PTM. Requires the gNodeB to know each multicast PDU session's packet-loss tolerance. Suited to applications intolerant of packet loss |

In both models, the deployment type determines whether the handover needs dedicated signalling (a different gNodeB, in Regenerative Payload) or can rely on common signalling (the same gNodeB, in Transparent Payload or for intra-satellite beam handover within the same satellite); common signalling reduces both the service interruption time and the signalling overhead, since it involves only the Physical and MAC layers for uplink synchronization and time alignment.

## Common NTN & TN operator
In this deployment model, the same operator owns the TN and NTN infrastructure. The same 5G Core is shared with both TN and NTN Access Network infrastructure. The handover between them does not involve a logical interface.
### TN-NTN or NTN-TN handover for PTM
In terms of service interruption, i.e., the time taken to switch from one access network to another, this is suitable for real-time multicast applications that are sensitive to non-availability of the access network and that need to receive packets reliably (i.e., without any loss) and in the correct order. The network Round-Trip Time (RTT) between a Terrestrial Radio Access base station and a Non-Terrestrial Radio Access base station needs to be assessed. Dual connectivity UEs may also be considered.

Because the two access networks share a common 5G Core, the handover is an intra-system Xn or NG based handover rather than a change of operator, and the PDU session and its IP address are preserved. That keeps a reliable multicast transport (for example FLUTE over ROUTE/LCT) intact across the transition, so an application that needs in-sequence, lossless delivery does not have to re-establish its logical channel. The main quantity to assess is the difference in RTT between the terrestrial and non-terrestrial legs: a device moving from a low-latency TN cell to a GEO NTN cell sees the round trip grow by hundreds of milliseconds, which affects buffering, HARQ and any acknowledgement-based behaviour. For a device with dual connectivity, the terrestrial and non-terrestrial legs can overlap during the transition, allowing a make-before-break style switch that reduces or removes the interruption. As in the single-operator case, the delivery mode can be switched to PTP for the device being handed over to protect reliability, then returned to PTM on the target access.

## Independent NTN and TN operators
In this deployment model, two different operators own the TN and NTN infrastructure respectively, so the two different systems, each with its own 5G Core, are separate.
### Roaming between different Network Operators for TN and NTN
In this model, mobility always crosses an operator boundary, which is the main difference from the common-operator model above; the roaming and interconnect arrangements are a business as well as a technical matter and should be confirmed against the applicable system architecture and roaming specifications. Two options are envisaged for roaming:

| Aspect | a) Core Network roaming interface | b) RAN sharing agreement |
| --- | --- | --- |
| Trigger | An interface between the Core Networks of the two systems | Both Core Networks have direct interfaces with both TN and NTN radio infrastructure, enabling a roaming agreement |
| Behaviour | UE mobility requires registration and authentication with the target core. Applications needing end-to-end delivery of in-sequence, loss-free data with session continuity (e.g. reliable multicast protocols where a logical channel is established between peers before exchanging data, such as FLUTE over ALC/LCT) may require a home-routed roaming architecture to maintain IP continuity | The UE does not need to register and authenticate again and IP continuity is preserved; suitable for applications that require in-sequence data delivery for application session continuity. The network RTT between the Terrestrial and Non-Terrestrial Radio Access base stations needs to be assessed |
| Complexity | Loosely coupled systems (only a Core Network interface) | More tightly coupled systems (Core Networks directly interfaced with both radio access networks) |
| Latency | Additional latency from UE registration and authentication at each mobility procedure | Lower latency for mobility between the two access networks, since no re-registration/re-authentication is needed |

The trade-off between the two options is essentially latency against coupling: option a) stays loosely coupled at the cost of a registration/authentication delay (mitigated, for reliable multicast, by a home-routed architecture), while option b) couples the systems more tightly to avoid that delay and any break in IP continuity.

## Summary of deployment models

| Deployment model | Core network | Mobility procedure | IP / session continuity | Best suited to |
| --- | --- | --- | --- | --- |
| Single NTN operator | One 5G Core | Intra-system beam/satellite handover, predictable from ephemeris | IP preserved | Continuous NTN coverage with frequent, schedulable handovers |
| Common NTN & TN operator | One shared 5G Core | Intra-system TN-NTN handover, no operator boundary | IP preserved (PDU session kept) | Seamless satellite/terrestrial coverage for reliable multicast |
| Independent NTN and TN operators | Two separate 5G Cores | Roaming (core interface) or RAN sharing | Preserved only with home-routing or RAN sharing | Cross-operator coverage where a roaming or sharing agreement exists |

The recurring design pattern across all three models is the same: use the predictability of satellite motion to prepare the target beam or cell in advance (conditional handover), and protect the reliability of a multicast session during the transition by temporarily switching the affected devices to PTP where lossless delivery is required.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact clauses in TS 38.331 for SIB19 and conditional handover, and the specific [TS 23.501](https://www.3gpp.org/dynareport/23501.htm)/[TS 23.502](https://www.3gpp.org/dynareport/23502.htm) clauses covering NTN roaming and home-routed session continuity. Verify against the 3GPP work plan before publication.
:::

## Related analysis

* [Analysis of MBS Multicast over NTN](./analysis-mbs-multicast-over-ntn): deploying MBS Multicast on top of an NTN
* [Analysis of Mobility aspects for MBS Multicast over NTN](./analysis-mobility-mbs-multicast-over-ntn): how these mobility models apply to MBS Multicast
* [Analysis of MBS Broadcast over NTN](./analysis-mbs-broadcast-over-ntn): deploying MBS Broadcast on top of an NTN
