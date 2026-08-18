---
title: MBS Multicast - Mobility
sidebar_position: 4
hide_title: true
description: Analyzes how multicast reception continues across handover between cells, covering PTP RLC AM, PDCP COUNT continuity and delivery-method switching.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Multicast Broadcast Services (MBS)</span>
<h1>MBS Multicast - Mobility</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Aspects on Mobility for MBS Multicast Services

Multicast reception is tied to an active radio connection, so when a UE moves between cells the network must hand the session over without dropping it. This matters because multicast is meant to offer unicast-like reliability: a viewer moving through a coverage area (for example along a road or through a stadium) should keep receiving the same live stream. The behaviour depends on whether the source and target cells both support MBS multicast, so the three cases below are treated separately.

Across all three cases, the mobility procedures described in 3GPP [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) for multicast reception allow the UE to continue receiving multicast service(s) via PTM or PTP in a new cell after handover. Two handover types are referenced: an **Xn handover** is coordinated directly between the source and target gNBs over the Xn interface, while an **NG handover** is coordinated through the core network (the AMF) when no direct Xn interface is available.

Acronyms used below: MRB (Multicast Radio Bearer); DRB (Data Radio Bearer, the unicast equivalent); RLC AM (Radio Link Control Acknowledged Mode, which adds reliable, in-order delivery); NGAP (NG Application Protocol, the control-plane protocol between the gNB and the AMF); PDCP (Packet Data Convergence Protocol); SMF (Session Management Function).

## Why multicast mobility is a distinct problem

Multicast reception depends on the UE holding an active, per-UE radio configuration for the session (the MRB), which is why Release 17 multicast requires RRC_CONNECTED. At handover the UE moves to a target cell that may or may not have that session running, so the network has to reconstruct the reception context in the target and, ideally, avoid losing any packets in the gap. Two mechanisms make lossless handover possible when both cells support multicast:

- **PTP RLC AM in the target.** If the target configures the UE's MRB with a point-to-point RLC entity in Acknowledged Mode, retransmission can recover any packets missed during the switch, exactly as for a unicast bearer. Lossless handover for multicast is only guaranteed in this configuration; a UE handed straight into a PTM/UM bearer has no per-UE retransmission and may see a brief gap.
- **PDCP COUNT continuity.** The source and target must keep the downlink PDCP COUNT synchronised and continuous across the handover so the receiving PDCP entity treats the two cells' packets as one ordered stream. This is why the source may forward buffered PDCP data and exchange sequence-number state during handover preparation.

A second, orthogonal concern is the **core-side delivery method**. As the UE moves between MBS-capable and MBS-incapable cells, the core must switch that UE's session between the 5GC shared and 5GC individual delivery methods so the target can actually receive the packets. The SMF drives this switch, and it is triggered by whether the target gNB signals MBS support (see the per-case procedures below). Radio-side (PTM/PTP) and core-side (shared/individual) switching are decided separately.

## Mobility between two cells both supporting Multicast

### Procedure

- Source gNB transfers to target gNB information about the MBS multicast sessions the UE has joined (UE context information).

- Source gNB may propose data forwarding for some MRBs to minimize data loss and may exchange the corresponding MRB PDCP Sequence Number with the target gNB during the handover preparation:
  - Lossless handover for multicast service is supported for the handover between MBS supporting cells if the UE is configured with PTP RLC AM entity in target cell MRB of a UE.
  - The network has to ensure DL PDCP COUNT value synchronization and continuity between the source cell and the target cell.

- During handover execution, the MBS configuration decided at target gNB is sent to the UE via the source gNB within an RRC container (3GPP [TS 38.331](https://www.3gpp.org/dynareport/38331.htm)).
  When the UE connects to the target gNB, the target gNB sends an indication that it is an MBS-supporting node to the SMF in the Path Switch Request message (Xn handover) or Handover Request Acknowledge message (NG handover).

- Upon successful handover completion, the source gNB may trigger the release of the MBS user plane resources towards the 5GC using the NGAP Distribution Release procedure for any multicast session for which there is no remaining
  joined UE in the gNB.

## Mobility between a Multicast-supporting cell and a non-supporting cell

This case splits into two sub-cases depending on direction of travel: leaving MBS coverage (supporting → non-supporting) and entering it (non-supporting → supporting). The delivery-method switch (5GC Shared vs. Individual MBS traffic delivery) runs in both directions but is triggered by opposite conditions, so they are treated separately below.

### Leaving Multicast-supporting coverage (supporting cell → non-supporting cell)

- Target gNB sets up PDU Session Resources mapped to the MBS multicast session.
- The 5GC infers from the absence of an "MBS-support" indication from gNB in the Path Switch Request message (Xn handover) or Handover Request Acknowledge message (NG handover) that MBS multicast data packets delivery has to be switched to 5GC individual MBS traffic delivery (3GPP [TS 23.247](https://www.3gpp.org/dynareport/23247.htm)).

### Entering Multicast-supporting coverage (non-supporting cell → supporting cell)

- 5GC detects that MBS multicast data packets delivery can be switched from 5GC Individual MBS traffic delivery to 5GC Shared MBS traffic delivery.
- After Xn handover, the SMF triggers switching MBS multicast data packets delivery from 5GC Individual to 5GC Shared MBS traffic delivery by providing MBS Session IDs joined by the UE to the target gNB by means of the PDU Session Resource Modification procedure.
- For NG handover, the SMF provides the MBS Session IDs joined by the UE to the target gNB by means of NGAP Handover Request.

## Bearer-type switch when leaving Multicast-supporting coverage

:::note[Resolved against TS 38.300]
Checked against TS 38.300 V19.3.0 Clause 16.10.5.3.3 ("Handover between Multicast-supporting cell and Multicast non-supporting cell"): the MRB-to-DRB bearer switch is an **additional, optional preparatory step** within the same procedure as the PDU-session/delivery-method switch described above, not an alternate mechanism for a different scenario. The spec's own note on this is the reason it matters: "A UE may be handed over to a target gNB not supporting MBS **without** prior reconfiguration from MRB to the DRB in the source gNB. In this case, the AS configuration may not be comprehended by the target gNB causing full configuration." In other words, switching MRB→DRB beforehand is what avoids falling back to a full (slower) reconfiguration at the target.
:::

### Procedure

- Mobility from a multicast-supporting cell to a multicast non-supporting cell can be achieved by switching the MRB to a DRB in the source gNB before a handover.

:::note[Verified against primary sources]
This entire page has now been checked directly against TS 38.413 V17.5.0 (NGAP), TS 38.300 V19.3.0 (NR overall description — this document is not part of this project's pinned baseline, so no earlier version is mandated; V19.3.0 was the version held and checked) and TS 23.247 V18.8.0 (this project's pinned Release 18 baseline) (5G Core MBS architecture). Every NGAP message and procedure name is genuine and correctly used: Distribution Setup and Distribution Release (TS 38.413 Clause 8.18, "Multicast Session Management Procedures") are explicitly **multicast**-specific. TS 38.300 Clause 16.10.5.3.2 confirms the RRC-container mechanism and the PTP RLC AM / PDCP COUNT continuity requirement almost word-for-word against this page's text, and TS 23.247 independently confirms the shared/individual delivery-method switch during handover.
:::

## Implementation blueprint

The three procedures above, condensed into a single step-by-step reference. See the [Implementation Blueprints index](/tech/blueprints) for the other blueprints on this portal.

| Scenario | Step | What happens | Clause |
| --- | --- | --- | --- |
| Both cells support multicast | 1 | Source gNB transfers the UE's joined-session context to the target gNB | TS 38.300 Clause 16.10.5.3.2 |
| | 2 | Source gNB proposes data forwarding and exchanges the MRB PDCP sequence number with the target, so the target can configure PTP RLC AM and keep the downlink PDCP COUNT synchronised — the two conditions lossless handover depends on | TS 38.300 Clause 16.10.5.3.2 |
| | 3 | The target's MBS configuration for the UE is delivered via an RRC container relayed through the source gNB; on connecting to the target, the target signals its MBS support to the SMF via Path Switch Request (Xn handover) or Handover Request Acknowledge (NG handover) | TS 38.331; TS 38.300 Clause 16.10.5.3.2 |
| | 4 | Once no joined UE remains at the source gNB for a session, the source may release the MBS user-plane resources via the NGAP Distribution Release procedure | TS 38.413 Clause 8.18 |
| Leaving multicast-supporting coverage | 1 | Target gNB sets up PDU Session Resources mapped to the multicast session | TS 23.247 |
| | 2 | 5GC infers, from the absence of an MBS-support indication in the Path Switch Request / Handover Request Acknowledge, that delivery must switch to the 5GC individual method | TS 23.247 |
| | *(optional, before handover)* | Source gNB may switch the UE's MRB to a DRB in advance, avoiding a full reconfiguration at a target that doesn't support MBS | TS 38.300 Clause 16.10.5.3.3 |
| Entering multicast-supporting coverage | 1 | 5GC detects that delivery can switch from the individual to the shared method | TS 23.247 |
| | 2 | *(Xn)* SMF triggers the switch to shared delivery via the PDU Session Resource Modification procedure, providing the target gNB the joined MBS Session IDs | TS 23.247 |
| | 2′ | *(NG)* SMF provides the joined MBS Session IDs to the target gNB via NGAP Handover Request instead | TS 23.247; TS 38.413 |

## Related

- [5G Multicast Broadcast Services (MBS)](/tech/5g-mbs): the parent topic page
- [Standards: 5G Multicast Broadcast Services (MBS)](/standards/5g-mbs): the specification list for this topic
- [5G Multicast Broadcast Services (MBS) Reference Tools](/reference-tools/5g-mbs): the software implementation
