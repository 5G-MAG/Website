---
title: MBS Multicast - Mobility
sidebar_position: 4
---


:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Aspects on Mobility for MBS Multicast Services

Multicast reception is tied to an active radio connection, so when a UE moves between cells the network must hand the session over without dropping it. This matters because multicast is meant to offer unicast-like reliability: a viewer moving through a coverage area (for example along a road or through a stadium) should keep receiving the same live stream. The behaviour depends on whether the source and target cells both support MBS multicast, so the three cases below are treated separately.

Across all three cases, the mobility procedures described in 3GPP [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) for multicast reception allow the UE to continue receiving multicast service(s) via PTM or PTP in a new cell after handover. Two handover types are referenced: an **Xn handover** is coordinated directly between the source and target gNBs over the Xn interface, while an **NG handover** is coordinated through the core network (the AMF) when no direct Xn interface is available.

Acronyms used below: MRB (Multicast Radio Bearer); DRB (Data Radio Bearer, the unicast equivalent); RLC AM (Radio Link Control Acknowledged Mode, which adds reliable, in-order delivery); NGAP (NG Application Protocol, the control-plane protocol between the gNB and the AMF); PDCP (Packet Data Convergence Protocol); SMF (Session Management Function).

## Why multicast mobility is a distinct problem

Multicast reception depends on the UE holding an active, per-UE radio configuration for the session (the MRB), which is why Release 17 multicast requires RRC_CONNECTED. At handover the UE moves to a target cell that may or may not have that session running, so the network has to reconstruct the reception context in the target and, ideally, avoid losing any packets in the gap. Two mechanisms make lossless handover possible when both cells support multicast:

* **PTP RLC AM in the target.** If the target configures the UE's MRB with a point-to-point RLC entity in Acknowledged Mode, retransmission can recover any packets missed during the switch, exactly as for a unicast bearer. Lossless handover for multicast is only guaranteed in this configuration; a UE handed straight into a PTM/UM bearer has no per-UE retransmission and may see a brief gap.
* **PDCP COUNT continuity.** The source and target must keep the downlink PDCP COUNT synchronised and continuous across the handover so the receiving PDCP entity treats the two cells' packets as one ordered stream. This is why the source may forward buffered PDCP data and exchange sequence-number state during handover preparation.

A second, orthogonal concern is the **core-side delivery method**. As the UE moves between MBS-capable and MBS-incapable cells, the core must switch that UE's session between the 5GC shared and 5GC individual delivery methods so the target can actually receive the packets. The SMF drives this switch, and it is triggered by whether the target gNB signals MBS support (see the per-case procedures below). Radio-side (PTM/PTP) and core-side (shared/individual) switching are decided separately.

## Mobility between two cells both supporting Multicast
### Procedure
* Source gNB transfers to target gNB information about the MBS multicast sessions the UE has joined (UE context information).

* Source gNB may propose data forwarding for some MRBs to minimize data loss and may exchange the corresponding MRB PDCP Sequence Number with the target gNB during the handover preparation:
  * Lossless handover for multicast service is supported for the handover between MBS supporting cells if the UE is configured with PTP RLC AM entity in target cell MRB of a UE.
  * The network has to ensure DL PDCP COUNT value synchronization and continuity between the source cell and the target cell.

* During handover execution, the MBS configuration decided at target gNB is sent to the UE via the source gNB within an RRC container (3GPP [TS 38.331](https://www.3gpp.org/dynareport/38331.htm)).
When the UE connects to the target gNB, the target gNB sends an indication that it is an MBS-supporting node to the SMF in the Path Switch Request message (Xn handover) or Handover Request Acknowledge message (NG handover).

* Upon successful handover completion, the source gNB may trigger the release of the MBS user plane resources towards the 5GC using the NGAP Distribution Release procedure for any multicast session for which there is no remaining
joined UE in the gNB.

## Mobility from a Multicast-supporting cell to a non-supporting cell
### Procedure
* Target gNB sets up PDU Session Resources mapped to the MBS multicast session.
* The 5GC infers from the absence of an "MBS-support" indication from gNB in the Path Switch Request message (Xn handover) or Handover Request Acknowledge message (NG handover) that MBS multicast data packets delivery has to be switched to 5GC individual MBS traffic delivery (3GPP [TS 23.247](https://www.3gpp.org/dynareport/23247.htm)).
* For mobility from MBS non-supporting cell to MBS-supporting cell, the existing Xn/NG handover procedures apply:
  * 5GC detects that MBS multicast data packets delivery can be switched from 5GC Individual MBS traffic delivery to 5GC Shared MBS traffic delivery.
  * After Xn handover, the SMF triggers switching MBS multicast data packets delivery from 5GC Individual to 5GC Shared MBS traffic delivery by providing MBS Session IDs joined by the UE to the target gNB by means of the PDU Session Resource Modification procedure.
  * For NG handover, the SMF provides the MBS Session IDs joined by the UE to the target gNB by means of NGAP Handover Request.

## Mobility involving a non-supporting cell and a supporting cell

:::caution
The heading and body of this section describe opposite directions of travel: the heading refers to moving into a Multicast-supporting cell, while the procedure below describes moving from a supporting cell to a non-supporting cell (by switching the MRB to a DRB before handover). This mismatch has not been resolved. Verify the intended direction against 3GPP TS 38.300 and correct either the heading or the procedure before relying on this section.
:::

### Procedure
* Mobility from a multicast-supporting cell to a multicast non-supporting cell can be achieved by switching the MRB to a DRB in the source gNB before a handover.
