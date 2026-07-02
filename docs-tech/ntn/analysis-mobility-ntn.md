---
title: NTN - Mobility
sidebar_position: 0
---


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
In this deployment model the satellite infrastructure is managed by a single NTN operator. Satellite-to-satellite handovers are considered for two types of scenarios: quasi-earth fixed beam and earth moving beams. In both cases frequent handovers are expected due to motion.

The two beam models differ mainly in what triggers the handover, how much of the multicast group moves at once, and where the complexity sits:

| Aspect | Quasi-Earth fixed beam | Earth-moving beam |
| --- | --- | --- |
| Handover trigger | Time-based (fixed beam re-pointed periodically) | Location-based (UE reaches the beam edge) |
| Group handover | Whole multicast group handed over together | Only edge UEs hand over; handover is gradual |
| Handover frequency | Frequent | More frequent |
| Onboard satellite complexity | Higher (steerable beamforming) | Lower |
| End-to-end network complexity | Lower | Higher |
| Service interruption | Milliseconds (soft switch) to hundreds of ms (hard switch) | Hundreds of ms in the best case |

The two subsections below describe each model in detail.

### Satellite-to-satellite handover with Quasi-Earth fixed beam for NGSO
The target mapped cell will be served by a single beam and a frequent handover (time-based) is expected due to the satellite motion. Two different types of handover are considered:
* a) Soft switch handover, where the Mapped Cell is served by two overlapping beams in different carrier frequencies during the switching phase.
* b) Hard switch handover, where the Mapped Cell is served by only one beam at any point in time.

Case a) has the advantage of a negligible service interruption time (in the order of milliseconds); case b) can see the service interruption time exceed hundreds of milliseconds in the worst case, to allow beam layout configuration, radio baseband resource association to beam and UE downlink synchronization. On the other hand, a) requires additional margin resources (feeder link carrier frequency, service link carrier frequency) to support the overlapping beam, whereas for b) the same resources are reused between the switching beams.
Note that the IP address of the UE is preserved in this scenario.
When using point-to-multipoint communication, all the UEs of the multicast group may start experiencing poor radio conditions during the switching phase, since the source satellite is close to the minimum elevation angle for the UEs. For this reason, an appropriate mode of transmission should be considered during the switching phase to enable reliability and in-sequence delivery of IP packets. As an example, the UEs served by point-to-multipoint are switched to point-to-point at a chosen instant during the switching phase (denoted T1 + ΔT) to guarantee reliability and in-sequence data reception.
This behaviour should be suitable for applications that cannot tolerate packet loss, and some mechanisms should be implemented to avoid congestion during handover. One gNodeB could handle both satellites in the case of a Transparent Payload deployment, whereas Regenerative Payload would involve a different gNodeB and therefore dedicated signalling. Put another way, the deployment type determines whether the handover needs dedicated signalling (different gNodeB, in Regenerative Payload) or can rely on common signalling (same gNodeB, in Transparent Payload or for inter-beam handover within the same satellite). The common-signalling case reduces both the service interruption time and the signalling overhead, because it involves only the lower layers (Physical and MAC layer) for uplink synchronization and time alignment.
The quasi-Earth fixed beam deployment model involves some onboard complexity of the satellite to support steerable beamforming techniques, but it reduces the complexity of the network in handling mobility and allocating resources (beam, frequency plan, etc.). This scenario can apply to intra-satellite beam handover, similar to Transparent Payload (two satellites managed by the same gNodeB).

### Satellite-to-satellite handover with Earth-Moving beam for NGSO
A frequent (location-driven) handover is expected due to the satellite motion. The UE at the edge of the beam starts the handover procedure: when it is located at a distance d from the Beam Reference Centre, where D1 ≤ d ≤ D2, the UE can begin the handover to the next beam. In the best case, the resulting service interruption is in the range of hundreds of milliseconds. The IP address of the UE is preserved across handover in this scenario.
When using point-to-multipoint communication, only the UE at the edge of the beam starts to experience poor radio link conditions, since the source satellite is close to the minimum elevation angle with respect to that UE; the rest of the multicast group is unaffected. An appropriate mode of transmission should therefore be considered during the handover phase to support service continuity. For example, switching the edge UEs to PTP transmission mode, while the other members of the same multicast group remain in PTM mode, should suit applications that are intolerant of packet loss. This implies a new requirement: the gNodeB needs to know each multicast PDU session's packet loss tolerance in order to make this decision appropriately.
The handover is performed gradually by the UEs that are members of the multicast group: compared to the quasi-Earth fixed beam deployment model, not all of them hand over at the same time, though handovers occur more frequently overall with an Earth-moving beam. As with the quasi-Earth-fixed case, the deployment determines whether more dedicated signalling is needed (different gNodeB, in Regenerative Payload) or common signalling suffices (same gNodeB, in Transparent Payload or for inter-beam handover within the same satellite); the common-signalling case again reduces both service interruption time and signalling overhead, since only the lower layers (Physical and MAC layer) are involved for uplink synchronization and time alignment.
The Earth-moving beam deployment model involves lower onboard complexity of the satellite for beamforming techniques, but it increases the complexity of the end-to-end system in handling mobility and allocating resources (beam, frequency plan, etc.). This scenario can also apply to intra-satellite beam handover, similar to Transparent Payload (two satellites managed by the same gNodeB).

## Common NTN & TN operator
In this deployment model, the same operator owns the TN and NTN infrastructure. The same 5G Core is shared with both TN and NTN Access Network infrastructure. The handover between them does not involve a logical interface.
### TN-NTN or NTN-TN handover for PTM
In terms of service interruption, i.e., the time taken to switch from one access network to another, this is suitable for real-time multicast applications that are sensitive to non-availability of the access network and that need to receive packets reliably (i.e., without any loss) and in the correct order. The network Round-Trip Time (RTT) between a Terrestrial Radio Access base station and a Non-Terrestrial Radio Access base station needs to be assessed. Dual connectivity UEs may also be considered.

Because the two access networks share a common 5G Core, the handover is an intra-system Xn or NG based handover rather than a change of operator, and the PDU session and its IP address are preserved. That keeps a reliable multicast transport (for example FLUTE over ROUTE/LCT) intact across the transition, so an application that needs in-sequence, lossless delivery does not have to re-establish its logical channel. The main quantity to assess is the difference in RTT between the terrestrial and non-terrestrial legs: a device moving from a low-latency TN cell to a GEO NTN cell sees the round trip grow by hundreds of milliseconds, which affects buffering, HARQ and any acknowledgement-based behaviour. For a device with dual connectivity, the terrestrial and non-terrestrial legs can overlap during the transition, allowing a make-before-break style switch that reduces or removes the interruption. As in the single-operator case, the delivery mode can be switched to PTP for the device being handed over to protect reliability, then returned to PTM on the target access.

## Independent NTN and TN operators
In this deployment model, two different operators own the TN and NTN infrastructure respectively, so the two different systems, each with its own 5G Core, are separate.
### Roaming between different Network Operators for TN and NTN
Two options are envisaged for roaming:
* a) Roaming interface at Core Network level: This assumes an interface between the Core Networks of the two systems. The mobility between both networks would require UE registration and authentication, which may involve additional latency for the mobility procedure. For applications needing to ensure end-to-end delivery of in-sequence data packets without packet loss by maintaining session continuity, a home-routed roaming architecture may be required to maintain IP continuity. This may be required by reliable multicast application protocols where a logical channel is established between the peers before exchanging data, for example FLUTE running on top of ALC/LCT.
* b) RAN sharing agreement between both systems: This assumes both Core Networks have direct interfaces with both TN and NTN radio infrastructure to enable a roaming agreement. A RAN sharing deployment can offer lower latency for mobility between both access networks, since the UE does not need to register and authenticate again and can preserve IP continuity. This is therefore suitable for applications that require in-sequence data delivery for application session continuity. The network RTT between the Terrestrial Radio Access base station and the Non-Terrestrial Radio Access base station needs to be assessed.

The trade-off between the two options is essentially latency against coupling. A core-network roaming interface (option a) keeps the two systems loosely coupled but pays a registration and authentication cost at each transition, and a home-routed architecture may be needed to keep the IP anchor stable so that a reliable multicast session survives. A RAN sharing agreement (option b) couples the systems more tightly but avoids re-registration, so it is better suited to applications that cannot tolerate the extra latency or a break in IP continuity. In both options the mobility procedure crosses an operator boundary, which is the main difference from the common-operator model above; the roaming and interconnect arrangements are a business as well as a technical matter and should be confirmed against the applicable system architecture and roaming specifications.

## Summary of deployment models

| Deployment model | Core network | Mobility procedure | IP / session continuity | Best suited to |
| --- | --- | --- | --- | --- |
| Single NTN operator | One 5G Core | Intra-system beam/satellite handover, predictable from ephemeris | IP preserved | Continuous NTN coverage with frequent, schedulable handovers |
| Common NTN & TN operator | One shared 5G Core | Intra-system TN-NTN handover, no operator boundary | IP preserved (PDU session kept) | Seamless satellite/terrestrial coverage for reliable multicast |
| Independent NTN and TN operators | Two separate 5G Cores | Roaming (core interface) or RAN sharing | Preserved only with home-routing or RAN sharing | Cross-operator coverage where a roaming or sharing agreement exists |

The recurring design pattern across all three models is the same: use the predictability of satellite motion to prepare the target beam or cell in advance (conditional handover), and protect the reliability of a multicast session during the transition by temporarily switching the affected devices to PTP where lossless delivery is required.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the exact clauses in TS 38.331 for SIB19 and conditional handover, and the specific [TS 23.501](https://www.3gpp.org/dynareport/23501.htm)/[TS 23.502](https://www.3gpp.org/dynareport/23502.htm) clauses covering NTN roaming and home-routed session continuity. Verify against the 3GPP work plan before publication.
:::

## Related analysis

* [Analysis of MBS Multicast over NTN](./analysis-mbs-multicast-over-ntn): deploying MBS Multicast on top of an NTN
* [Analysis of Mobility aspects for MBS Multicast over NTN](./analysis-mobility-mbs-multicast-over-ntn): how these mobility models apply to MBS Multicast
* [Analysis of MBS Broadcast over NTN](./analysis-mbs-broadcast-over-ntn): deploying MBS Broadcast on top of an NTN
