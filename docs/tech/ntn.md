---
hide_title: true
title: Non-Terrestrial Networks
sidebar_position: 10
description: Overview of NTN as a satellite/HAPS delivery layer for MBS multicast and broadcast, linking analysis, standards and tools pages.
---

<header class="topic-hero">
<div class="topic-hero__icon">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div>
<h1 class="topic-hero__title">Non-Terrestrial Networks</h1>
</div>
</header>

<div class="topic-lead">
Extending 5G coverage via satellite and HAPS as a delivery layer for MBS multicast and broadcast.
</div>

Non-Terrestrial Networks (NTN) extend 5G coverage via satellite (geostationary GEO and low Earth orbit LEO) and high-altitude platform stations (HAPS), standardised in 3GPP Release 17. For media distribution, NTN is not a standalone system: it is a delivery infrastructure layer on top of which existing 5G services such as MBS Multicast and MBS Broadcast can be deployed. 5G-MAG's work in this area focuses on the specific challenges NTN introduces: propagation delay, Doppler effects, handover between satellite beams, and device mobility across terrestrial and non-terrestrial segments. For acronyms used here, see the [Glossary](/tech/glossary).

**Key specifications:** 3GPP [TR 38.811](https://www.3gpp.org/dynareport/38811.htm) (Study on NR access to non-terrestrial networks: the foundational NTN study item), [TR 38.821](https://www.3gpp.org/dynareport/38821.htm) (Solutions for NR to support NTN), TS 38.300 (NR overall description, NTN aspects), [TR 38.863](https://www.3gpp.org/dynareport/38863.htm) (NTN related RF and co-existence aspects). For satellite broadcast delivery, see also ETSI TS 103 720 (5G Broadcast system for linear TV and radio), which is relevant to GEO-based NTN broadcast scenarios.

**No dedicated reference tool exists for NTN.** The 5G-MAG MBS reference tools (for Multicast and Broadcast) are the relevant software for NTN deployment scenarios: see [5G Multicast Broadcast Services](./5g-mbs). For satellite broadcast delivery using the FeMBMS (5G Broadcast) waveform, see [5G Broadcast](./5g-broadcast).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>Terminology, radio-layer adaptations, and how MBS Multicast and Broadcast are carried over NTN.</p>
<ul class="godeeper-card__links">
<li><a href="./ntn/analysis-mobility-ntn">Mobility Aspects for NTN</a></li>
<li><a href="./ntn/analysis-mbs-broadcast-over-ntn">MBS Broadcast over NTN</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>Normative 3GPP specs (TR 38.811, TR 38.821) and 5G-MAG's contributions on NTN.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/ntn">Standards: Non-Terrestrial Networks</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>No dedicated NTN reference tool exists yet; the MBS reference tools are the relevant software for NTN scenarios.</p>
<ul class="godeeper-card__links">
<li><a href="/reference-tools/5g-mbs">5G Multicast Broadcast Services</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/13)

## NTN system model and terminology

NTN reuses the 5G system and the NR protocol stack; the differences are concentrated in the radio and in a small number of architecture roles. The vocabulary below is used consistently across the analysis pages.

- **Feeder link / service link.** The feeder link connects the satellite to the ground gateway; the service link connects the satellite to the device (UE). One-way propagation delay accumulates over both, which is why GEO round trips are large.
- **Transparent vs regenerative payload.** In a transparent (bent-pipe) payload the gNB, in NTN terms the _Satellite Access Node (SAN)_, is on the ground and the satellite only relays and frequency-translates. In a regenerative payload the gNB (or its lower layers) is on board the spacecraft. Release 17 standardised the transparent case; regenerative deployments are addressed in later releases (confirm exact release placement against the 3GPP work plan). See [TS 38.300](https://www.3gpp.org/dynareport/38300.htm).
- **Beam / cell / mapped cell.** A satellite radiates one or more beams. A beam maps to an NR cell on the ground. As NGSO satellites move, the beam either stays pointed at a fixed ground area for a while (quasi-Earth-fixed beam) or sweeps across the ground (earth-moving beam). This distinction drives the handover models on the [mobility page](./ntn/analysis-mobility-ntn).
- **GNSS at the UE.** NTN assumes the device has GNSS so it can compute its own timing advance and Doppler pre-compensation from its position and the satellite ephemeris.

## Radio-layer adaptations for NTN

The long, variable delay and the large Doppler shift on fast NGSO links are handled mainly at the physical and MAC layers, with assistance signalled in system information.

- **Timing advance and epoch.** The device applies a large, UE-specific timing advance computed from its GNSS position and the satellite ephemeris, plus a common (cell-wide) component broadcast by the network. Synchronisation is anchored to an _epoch time_ with an associated validity window.
- **Doppler pre-compensation.** On the service link the device pre-compensates the Doppler it can compute from geometry; the network handles the feeder-link contribution in the transparent case.
- **k-offset.** A scheduling offset (k-offset) is introduced so that uplink grants and other timing relationships remain valid despite the long round trip.
- **HARQ and timers.** HARQ operation and RRC/MAC timers are adapted for round trips that can far exceed terrestrial values; some HARQ processes may be disabled and reliability moved to higher layers.

These are carried in NR RRC via NTN system information; see the SIB descriptions below and on the [MBS Broadcast over NTN](./ntn/analysis-mbs-broadcast-over-ntn) page.

## NTN system information for media delivery

Two system information blocks are central to media over NTN:

- **SIB19** carries the NTN assistance information a device needs to acquire and track a satellite cell: serving-cell (and optionally neighbour-cell) ephemeris, common timing advance parameters, the k-offset, the epoch time and its validity duration, and the cell reference location. SIB19 was introduced with the Release 17 NTN work in [TS 38.331](https://www.3gpp.org/dynareport/38331.htm).
- **SIB27** is used, in the analysis on these pages, to convey the Intended Service Area (ISA) for MBS in an NTN cell, describing where a broadcast service applies as a polygon or a circle. The precise Release 19 semantics of SIB27 for MBS ISA should be confirmed against TS 38.331; see the ASN.1 walkthrough on the [MBS Broadcast over NTN](./ntn/analysis-mbs-broadcast-over-ntn) page.

For MBS Broadcast, the terrestrial broadcast SIBs (SIB20 and SIB21 in TS 38.331) apply as on the ground; the NTN-specific additions are SIB19 and the ISA signalling.

## Carrying MBS over NTN

Media over NTN is delivered with the same MBS service layers used on the ground, applied over a satellite or HAPS access:

- **Delivery mode 1 (multicast)**, per [TS 23.247](https://www.3gpp.org/dynareport/23247.htm), targets higher QoS and RRC_CONNECTED devices, and the RAN can switch a device between point-to-point (PTP) and point-to-multipoint (PTM) delivery. Over NTN this switching is a key tool for reliability during handover.
- **Delivery mode 2 (broadcast)**, also per TS 23.247, is receivable in RRC_IDLE and RRC_INACTIVE as well as RRC_CONNECTED, which suits wide-area linear content to many devices.
- **User-service and streaming layers.** The SA4 MBS user-service layer ([TS 26.502](https://www.3gpp.org/dynareport/26502.htm)) and 5G Media Streaming ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm)) sit above MBS transport and are, in principle, agnostic to whether the access is terrestrial or non-terrestrial. Application-layer FEC and object delivery (for example FLUTE over ROUTE/LCT) matter more over NTN because retransmission over long paths is expensive.

The application of MBS over NTN is being defined in Release 19 and later, with broadcast over GSO and NGSO, then multicast, discussed as separable steps. Treat orbit-by-orbit and mode-by-mode placement as provisional.

## What each analysis page adds

The analysis pages below develop the specific problems NTN introduces for media:

- **[Mobility aspects for NTN](./ntn/analysis-mobility-ntn)** sets out three deployment models (single NTN operator; common NTN/TN operator; independent operators) and the beam handover models (quasi-Earth-fixed vs earth-moving), with soft-switch and hard-switch handover and their service-interruption ranges.
- **[MBS Multicast over NTN](./ntn/analysis-mbs-multicast-over-ntn)** covers the base multicast scenario, including autonomous RAN switching between PTP and PTM and the roles of the Application Service Provider and NTN operator.
- **[Mobility for MBS Multicast over NTN](./ntn/analysis-mobility-mbs-multicast-over-ntn)** treats lossless handover for a whole multicast group, distinguishing satellite-triggered from user-triggered mobility.
- **[MBS Broadcast over NTN](./ntn/analysis-mbs-broadcast-over-ntn)** shows that broadcast reuses the terrestrial procedures almost unchanged, the NTN-specific parts being SIB19 and the ISA carried in SIB27.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 26.502 title, SIB27 Release 19 semantics for MBS Intended Service Area, TR 38.863 release placement, and the release placement of individual Release 18/19 NTN and MBS-over-NTN features. Verify against the 3GPP/ETSI work plan before publication.
:::

---

## Technical Documentation

The following analysis pages are available. If you are new to this area, start with **Analysis of Mobility aspects for NTN**, which sets out the deployment models and handover behaviour that the other pages build on, then read the MBS Multicast and MBS Broadcast pages.

### Mobility aspects in relation to NTN

- [**Analysis of Mobility aspects for NTN**](./ntn/analysis-mobility-ntn)

### Deployment of MBS Multicast over NTN

- [**Analysis of MBS Multicast over NTN**](./ntn/analysis-mbs-multicast-over-ntn)
- [**Analysis of Mobility aspects for MBS Multicast over NTN**](./ntn/analysis-mobility-mbs-multicast-over-ntn)

### Deployment of MBS Broadcast over NTN

- [**Analysis of MBS Broadcast over NTN**](./ntn/analysis-mbs-broadcast-over-ntn)

## Related

- [Standards: Non-Terrestrial Networks](/tech/standards/ntn): normative 3GPP specs and 5G-MAG contributions on NTN, including TR 38.811, TR 38.821, and [TR 23.737](https://www.3gpp.org/dynareport/23737.htm).
- [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs): MBS is the primary service layer for NTN media delivery.
- [Standards: 5G Broadcast](/tech/standards/5g-broadcast): ETSI TS 103 720; relevant for satellite-based linear TV/radio broadcast over NTN.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
