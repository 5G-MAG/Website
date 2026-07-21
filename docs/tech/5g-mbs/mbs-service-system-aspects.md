---
title: MBS - Service & System
sidebar_position: 2
hide_title: true
description: Explains the 5G Core architecture for MBS defined in TS 23.247, covering communication services, MBS sessions and delivery methods.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Multicast Broadcast Services (MBS)</span>
<h1>MBS - Service & System</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## MBS Service and System Aspects

This page summarises the 5G Core system architecture for MBS defined in [TS 23.247](https://www.3gpp.org/dynareport/23247.htm): the two logical communication services (multicast and broadcast), the MBS sessions that carry them, and the two methods the core network uses to deliver MBS traffic towards the radio network. It sits below the user-service layer covered on the [Service Layer Aspects](./mbs-service-layer) page, and above the radio procedures on the [RAN Aspects](./ran-aspects) page. For acronyms used here, see the [Glossary](/tech/glossary).

## MBS communication services (TS 23.247)

TS 23.247 defines two new logical communication services:

- **Multicast communication service**: A 5GS communication service in which the same service and the same specific content data are provided simultaneously to a dedicated set of UEs i.e. not all UEs in the coverage of the MBS service area are authorised to receive the data.
- **Broadcast communication service**: A 5GS communication service in which the same service and the same specific content data are provided simultaneously to all UEs in a geographical area i.e. all compatible UEs in the coverage area are authorised to receive the data. The content provider and network may not be aware whether authorised UEs are actually receiving the data being delivered.

## MBS sessions (TS 23.247)

TS 23.247 defines MBS sessions as follows:

- **MBS session**: A multicast or broadcast session.
- **Broadcast MBS session**: An MBS session to deliver a broadcast communication service. A broadcast MBS session is characterised by the content to send and the geographical area over which to distribute it.
- **Multicast MBS session**: An MBS session to deliver a multicast communication service. A multicast MBS session is characterised by the content to send, the list of UEs that may receive the service and optionally by a geographical area over which to distribute it.
  Broadcast and multicast MBS sessions are time-bound. Their life-cycles are specified in clauses 4.2 and 4.3 of TS 23.247.
  The geographical areas for which the multicast and broadcast MBS sessions are available is determined by the coverage area of the sites/sectors from which the broadcast service is transmitted. Refer to TS 23.247 (5G MBS architecture) and [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) (NR overall description) for more detail.

## MBS traffic delivery methods (TS 23.247)

The two figures below show the MBS traffic delivery methods: the left figure illustrates multicast and the right figure broadcast.

<figure>
  <img loading="lazy" src="https://github.com/user-attachments/assets/25f15af6-49b1-4c75-b567-ce225fa3bc96" alt="MBS traffic delivery for a multicast session, showing shared and individual delivery from the MB-UPF towards the NG-RAN and UEs" />
  <figcaption><em>MBS traffic delivery methods (multicast), adapted from TS 23.247 Figure 4.1-1.</em></figcaption>
</figure>

<figure>
  <img loading="lazy" src="https://github.com/user-attachments/assets/5e09d1a7-cb89-4f81-9d31-fac6d01e9a73" alt="MBS traffic delivery for a broadcast session, showing a single shared copy delivered from the MB-UPF to each NG-RAN node" />
  <figcaption><em>MBS traffic delivery methods (broadcast), adapted from TS 23.247 Figure 4.1-1.</em></figcaption>
</figure>

Multicast–broadcast Protocol Data Units (PDUs), referred to as MBS packets, are supplied to the Multicast/Broadcast User Plane Function (MB-UPF) by upstream Network Functions and from there conveyed across the 5G Core Network (CN) using one of two different MBS traffic delivery methods. The table below summarises how the two methods differ; the bullets that follow give the detail.

| Property                      | 5GC shared                                      | 5GC individual                                                     |
| ----------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| Copies delivered by the core  | One copy to each relevant RAN node              | A separate copy per UE                                             |
| Transport towards the RAN     | Shared GTP tunnel at reference point N3mb       | Per-UE PDU session (via the UPF at N19mb, then N3)                 |
| Applies to broadcast sessions | Required                                        | Not used                                                           |
| Applies to multicast sessions | May be used                                     | May be used (e.g. for MBS-incapable base stations)                 |
| Typical use                   | Efficient delivery to MBS-capable base stations | Reaching legacy or MBS-incapable base stations, or per-UE handling |

Where the acronyms above mean: GTP (GPRS Tunnelling Protocol); NG-RAN (Next Generation Radio Access Network); MNO (Mobile Network Operator); gNodeB (5G base station); UPF (User Plane Function).

- **5GC shared MBS traffic delivery method**: 5G CN receives a single copy of MBS data packets and delivers a single copy of those MBS data packets to all relevant RAN nodes.
  - This method must be applied for broadcast MBS sessions.
  - This method may be applied to multicast MBS sessions.
  - MBS packet is forwarded by the MB-UPF directly to the relevant NG-RAN nodes at their N3mb reference point via a shared GTP tunnel.
  - Each MBS Session establishes its own separate set of shared tunnels as required – tunnels are not shared across different MBS sessions.

- **5GC individual MBS traffic delivery method**: the 5G CN receives a single copy of MBS data packets and delivers separate copies of those MBS data packets to relevant RAN nodes via per-UE Protocol Data Unit (PDU) sessions. For this traffic delivery method each UE associated with a multicast session requires its own, dedicated PDU session.
  - This method is only applied to multicast MBS sessions.
  - Because an MNO network may contain an arbitrary mix of MBS-capable and MBS-incapable gNodeBs, the same MBS packet (originating from a multicast MBS session) may be conveyed to MBS-capable gNodeBs using the shared MBS traffic delivery method, and to MBS-incapable gNodeBs via one or more PDU Sessions using the individual MBS traffic delivery method.
  - MBS packets are forwarded by the MB-UPF to the UPF at reference point N19mb where they are delivered to the NG-RAN in a conventional PDU Session in a GTP tunnel at existing reference point N3, and thence to the target UE at reference point Uu. In this scenario, a separate PDU Session is required for each subscribed UE and the MB-UPF is responsible for performing the necessary packet replication at this fan-out point.

## Core network functions and their MBS roles

TS 23.247 places the MBS work on two dedicated functions plus MBS extensions to existing ones:

- **MB-SMF (Multicast/Broadcast Session Management Function).** Manages the life-cycle of MBS sessions, allocates and deallocates the TMGI that identifies each session, and configures the MB-UPF over reference point N4mb using PFCP ([TS 29.244](https://www.3gpp.org/dynareport/29244.htm)). Its service-based API (Nmbsmf, defined in [TS 29.532](https://www.3gpp.org/dynareport/29532.htm)) is consumed by the MBSF or directly by an AF/AS.
- **MB-UPF (Multicast/Broadcast User Plane Function).** Receives one copy of the MBS packets and delivers them onward: directly to MBS-capable RAN nodes over shared N3mb tunnels, or to the UPF over N19mb for per-UE fan-out in the individual method. The MB-UPF is the replication point for the individual method.
- **AMF.** Coordinates broadcast session setup towards the NG-RAN and relays multicast session join and MBS-related signalling; broadcast context management uses the Namf service ([TS 29.518](https://www.3gpp.org/dynareport/29518.htm)) and the NGAP procedures ([TS 38.413](https://www.3gpp.org/dynareport/38413.htm)).
- **PCF and NRF.** The PCF provides multicast/broadcast policy ([TS 29.537](https://www.3gpp.org/dynareport/29537.htm)); the NRF is extended so consumers can discover the MB-SMF and, for broadcast, the AMF handling a session.
- **NEF.** Exposes MBS provisioning to an AF/AS residing outside the trusted domain, so that provisioning requests reach the MB-SMF (or the MBSF) without direct access to the core.

## Session life-cycle: broadcast and multicast

The two session types differ in how a UE becomes a receiver, which is why their life-cycles are specified separately (TS 23.247 clauses 4.2 and 4.3).

- A **broadcast session** is provisioned and activated by the network on the strength of a service definition and a service area. There is no per-UE signalling: once the session is active in a cell, any authorised UE in coverage may receive it, and the network need not know which UEs are actually listening. Setup runs from the AF/AS or MBSF through the MB-SMF and AMF out to the NG-RAN nodes in the area, always using the 5GC shared delivery method.
- A **multicast session** adds a membership step. A UE first establishes or reuses a PDU session and then **joins** the multicast MBS session (identified by its MBS Session ID / TMGI); the join is authorised and recorded so the network knows which UEs, and therefore which cells, need the data. Only cells with at least one joined UE transmit the session. A UE **leaves** when it no longer wants the service, and when the last joined UE in a gNB leaves, the core may release the shared resources towards that node. This membership is also what lets the network switch a given UE between shared and individual delivery, and a given cell between PTM and PTP, as conditions change.

Because multicast membership is per-UE, multicast can offer per-UE reliability and mobility handling (see [Mobility for MBS Multicast](./mobility-mbs-multicast)); broadcast trades that for zero per-UE state and wide-area reach.

:::warning[References to verify]
The following identifiers added above were not all confirmed against a primary source: the MB-SMF to MB-UPF reference point name (N4mb) and its use of PFCP; the assignment of broadcast context management to the Namf service in TS 29.518; and the placement of the broadcast and multicast session life-cycles in TS 23.247 clauses 4.2 and 4.3. Verify against the specific TS 23.247, TS 29.244, TS 29.518 and TS 29.532 versions you are targeting. The N3mb, N19mb, N3 and Uu reference points and the shared/individual delivery methods are as stated in the surrounding text.
:::

**Next:** [MBS RAN Aspects](./ran-aspects), which describes how the gNodeB delivers MBS packets over the radio interface once they arrive from the core.
