---
title: MBS - RAN Aspects
sidebar_position: 3
hide_title: true
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Multicast & Broadcast in 5G</span>
<h1>MBS - RAN Aspects</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## MBS RAN Aspects

This page describes what happens on the radio side once MBS packets reach the base station (gNodeB). It follows on from the core-network delivery covered in [Service and System Aspects](./mbs-service-system-aspects); that page explains how packets are carried across the 5G Core to the gNodeB using the 5GC shared or 5GC individual traffic delivery methods.

Two similar terms are used throughout and should not be confused:

* A **RAN delivery method** is *how* the gNodeB sends packets over the air: Point-to-Multipoint (PTM), one transmission for many UEs, or Point-to-Point (PTP), a separate transmission per UE.
* A **RAN delivery mode** is the *Layer 2 configuration* used to carry that transmission: delivery mode 1 (multicast), delivery mode 2 (broadcast), or the unicast delivery mode.

The mapping between them is:

| RAN delivery method | RAN delivery mode used | Applies to |
|---|---|---|
| PTM | Delivery mode 1 (multicast) | Multicast MBS Session delivered point-to-multipoint |
| PTM | Delivery mode 2 (broadcast) | Broadcast MBS Session (always) |
| PTP | Unicast delivery mode | Multicast MBS Session delivered point-to-point, and unicast PDU sessions |

Radio acronyms used below: HARQ (Hybrid Automatic Repeat reQuest, a feedback-and-retransmission scheme); RNTI (Radio Network Temporary Identifier), including C-RNTI (Cell RNTI, UE-specific) and G-RNTI (Group RNTI, shared by a group); PDCCH (Physical Downlink Control Channel); PDSCH (Physical Downlink Shared Channel); MCCH (Multicast Control Channel); MTCH (Multicast Traffic Channel); MCS (Modulation and Coding Scheme). The RRC (Radio Resource Control) states referenced are RRC_Connected, RRC_Idle and RRC_Inactive.

## RAN traffic delivery methods (TS 38.300/331 when complete)
On receiving an MBS packet from the 5GC via the shared MBS traffic delivery method, the gNodeB can choose between two different RAN delivery methods, as described below.

### Point-to-Multipoint (PTM) RAN delivery method
PTM is used only for MBS packets arriving at the gNodeB via the 5GC shared MBS traffic delivery method: gNodeBs then deliver a single copy of the MBS data packets over the radio interface to multiple UEs, using either delivery mode 1 (multicast) or delivery mode 2 (broadcast).
It is always used to deliver the MBS packets of a Broadcast MBS Session, and it may be used for a Multicast MBS Session, though in some cases the gNodeB may opt to use PTP instead (see below).

### Point-to-Point (PTP) RAN delivery method
PTP may be used for MBS packets arriving at the gNodeB via either the 5GC shared or the 5GC individual MBS traffic delivery method; gNodeBs then deliver separate copies of the MBS data packets over the radio interface to individual UEs. It is always used for conventional PDU Sessions carrying packets from a unicast session, and always used in combination with the 5GC individual MBS traffic delivery method.
PTP may also be used in combination with the 5GC shared MBS traffic delivery method, for example when specific UEs require more robust Modulation Coding Schemes (MCS) to achieve reliable reception, or when the number of UEs within a given gNodeB subscribing to the Multicast MBS Session is below a certain threshold; in such cases, the gNodeB replicates MBS packets into UE-specific Radio Resource Blocks. PTP is not used for broadcast MBS sessions.

## RAN delivery modes
5G-NR MBS compatible gNodeBs support three different delivery modes at Layer 2: delivery mode 1 (multicast), delivery mode 2 (broadcast), and the unicast delivery mode, where the latter is italicised as it does not reflect a defined 3GPP term but is used in this document to describe the ‘default unicast’ delivery mode, absent 5G-NR MBS.

### Unicast delivery mode

gNodeBs always use the unicast delivery mode for the point-to-point RAN delivery method. This includes the delivery of:
*	Unicast packets arriving at reference point N3 from a PDU Session.
*	MBS packets from a Multicast MBS Session arriving at reference point N3 in a PDU Session corresponding to 5GC individual MBS traffic delivery.
*	MBS packets from a Multicast MBS Session arriving at reference point N3mb using the 5GC shared MBS traffic delivery method when the gNodeB has chosen to use the point-to-point RAN delivery method.

It cannot be used for broadcast communication services. Because its payloads are intended for specific UEs and are not meant to be decoded by more than one UE, they are scrambled using a key known only to the gNodeB and the target UE: the NG-RAN uses a UE-specific PDCCH with a CRC scrambled with a UE-specific RNTI (e.g., C-RNTI) to schedule a UE-specific PDSCH which is scrambled with the same UE-specific RNTI. Unicast can only be received by UEs in RRC_Connected state.

### Delivery mode 1 (Multicast)
A gNodeB uses delivery mode 1 for a Multicast MBS Session when it has chosen to use the PTM RAN delivery method. It supports HARQ feedback, retransmissions, and basic mobility with service continuity; these features let multicast offer a QoS similar to unicast and can therefore be considered to give high reliability and low latency.
Its payloads are intended for multiple UEs served by a particular gNodeB. The payload is scrambled using a shared key known to the gNodeB and the UEs that have subscribed to the Multicast Session, shared with each UE as part of its control plane interaction with the gNodeB when it subscribes to the MBS Session. Delivery mode 1 can only be received by compatible UEs in RRC_Connected state, and is not used for a broadcast MBS session.

### Delivery mode 2 (Broadcast)
gNodeBs always use this transmission mode for a Broadcast MBS Session (which always uses the point-to-multipoint RAN delivery method). It does not support HARQ feedback nor retransmissions. Service continuity, as a UE moves from one cell to another, is supported (the UE can read the MCCH/MTCH from neighbour cells), but lossless handover is not, so service breaks may occur as the UE moves between cells; broadcast can therefore be considered to offer a lower quality of service than delivery mode 1 (Multicast).
Its payloads are intended for any UE served by a particular gNodeB. The payload is scrambled using a shared key known to the gNodeB, broadcast in the MCCH (Multicast Control Channel) to all listening UEs. Delivery mode 2 can be received by UEs in all RRC states (RRC_Connected, RRC_Idle and RRC_Inactive).

## How the gNB decides PTM or PTP

For a multicast session the gNB, not the core, chooses per UE whether to use PTM (delivery mode 1) or PTP (unicast delivery mode), and it may switch dynamically as conditions change. The specifications leave the exact algorithm to implementation, but the decision balances two effects. PTM is efficient when several UEs in the cell want the same content, because one transmission serves all of them; it uses a modulation and coding scheme (MCS) robust enough for the group, so a weak UE can drag the shared MCS down. PTP sends a tailored copy per UE with link adaptation and HARQ, which is more robust for that UE but costs one transmission each. So a gNB tends towards PTM when the number of joined UEs in the cell is high and their channels are comparable, and towards PTP when there are few joined UEs, or when a specific UE needs a more robust MCS than the group. A single multicast session can therefore be served by PTM to most UEs in a cell and by PTP to a few, at the same time.

Switching between PTM and PTP is a reconfiguration of the UE's multicast radio bearer (MRB) and is transparent to the application: the MBS Session ID and the received content are unchanged.

## How MBS is addressed and scheduled on the radio

The radio channels and identifiers referenced in the delivery modes above fit together as follows, which is also the basis for the acquisition steps on the [Broadcast RAN procedures](./analysis-mbs-broadcast-ran) page:

* **Configuration** for broadcast (delivery mode 2) is carried on the **MCCH** (Multicast Control Channel), which the UE finds via **SIB20**. The MCCH lists the available sessions, their **G-RNTIs** and the MTCH scheduling. For multicast reception in RRC_INACTIVE (Release 18), a separate SIB (SIB24) points to a dedicated multicast MCCH; see the [Multicast Inactive RAN procedures](./analysis-mbs-multicast-inactive-ran) page.
* **Traffic** is carried on the **MTCH** (Multicast Traffic Channel), mapped onto the DL-SCH and physically on the PDSCH.
* **Addressing.** A PTM transmission (either delivery mode) is addressed by a **G-RNTI** (Group RNTI) shared by the receiving group: the PDCCH CRC is scrambled with the G-RNTI to schedule a PDSCH scrambled with the same value, so any UE holding that G-RNTI can decode it. A PTP transmission is addressed exactly like unicast, by a UE-specific RNTI such as the C-RNTI. This is the radio-level reason the delivery modes differ in which RRC states can receive them: reading a G-RNTI-scheduled PTM transmission for multicast (delivery mode 1) requires the connected-state configuration the network gives a joined UE, whereas the broadcast MCCH/MTCH can be read from system information alone.

The scrambling keys follow the same split described in the delivery modes above: a UE-specific key for unicast/PTP, a group key (shared at join) for delivery mode 1, and a key broadcast on the MCCH for delivery mode 2.

## Related analyses

* [Analysis of Mobility aspects for MBS Multicast Services](./mobility-mbs-multicast): how multicast reception continues across handover.
* [Analysis of RAN Procedures for MBS Broadcast](./analysis-mbs-broadcast-ran): the step-by-step radio acquisition of a broadcast service.
* [Analysis of RAN Procedures for MBS Multicast Inactive](./analysis-mbs-multicast-inactive-ran): the Release 18 extension for multicast reception in RRC_INACTIVE.
