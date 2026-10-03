---
title: MBS Multicast - Mobility
sidebar_position: 5
hide_title: true
description: How multicast reception continues at handover, between cells that support MBS and between a cell that supports it and one that does not, based on TS 38.300 clause 16.10.5.3 and TS 23.247 clause 7.2.3 Release 18.
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

:::tip[At a glance]

- **Goal:** the UE continues receiving its multicast services via PTM or PTP in the new cell after handover.
- **Lossless handover** between cells that support MBS requires a PTP RLC AM entity in the target cell MRB, and DL PDCP COUNT synchronisation and continuity between the cells.
- **Delivery switching:** the target gNB's MBS support indication, in the Path Switch Request (Xn) or Handover Request Acknowledge (NG), tells the 5G Core whether to use 5GC Shared or 5GC Individual delivery.
- **Resources:** the target gNB sets up shared resources with the NGAP Distribution Setup procedure; the source gNB may release them with Distribution Release when no joined UE remains.

:::

TS 23.247 supports multicast mobility in two cases: between NG-RAN nodes that both support MBS, and between a node that supports MBS and one that does not, in either direction. In both, minimisation of data loss should be supported. The procedures add to the Xn and N2 handover procedures of TS 23.502.

## Implementation blueprint

| Case | Step | What happens | Clause |
| --- | --- | --- | --- |
| Both cells support multicast | 1 | In handover preparation, the source gNB gives the target gNB the multicast sessions the UE joined, in the UE context information | TS 38.300 cl. 16.10.5.3.2 |
| | 2 | The source gNB may propose data forwarding for some MRBs and exchange their PDCP sequence numbers with the target | TS 38.300 cl. 16.10.5.3.2 |
| | 3 | For each active session without MBS Session Resources at the target, the target gNB sets them up with NGAP Distribution Setup | TS 38.300 cl. 16.10.5.3.2; TS 38.413 cl. 8.18.1; TS 23.247 cl. 7.2.1.4 |
| | 4 | The MBS configuration decided by the target is sent to the UE through the source gNB in an RRC container | TS 38.300 cl. 16.10.5.3.2 |
| | 5 | The target gNB indicates to the SMF that it supports MBS, in the Path Switch Request (Xn) or Handover Request Acknowledge (NG) | TS 38.300 cl. 16.10.5.3.2; TS 23.247 cl. 7.2.3.2, 7.2.3.3 |
| | 6 | The source gNB may release the resources with NGAP Distribution Release for any session without a remaining joined UE | TS 38.300 cl. 16.10.5.3.2; TS 38.413 cl. 8.18.2 |
| To a cell without multicast | 1 | Optionally, before the handover, the source gNB switches the MRB to a DRB | TS 38.300 cl. 16.10.5.3.3 |
| | 2 | The target gNB sets up PDU Session Resources mapped to the multicast session | TS 38.300 cl. 16.10.5.3.3 |
| | 3 | From the absence of the MBS support indication, the 5G Core switches to 5GC Individual delivery | TS 38.300 cl. 16.10.5.3.3; TS 23.247 cl. 6.3.1 |
| From a cell without multicast | 1 | The existing Xn or NG handover applies; the PDU Sessions are handed over | TS 38.300 cl. 16.10.5.3.3; TS 23.247 cl. 7.2.3.4 |
| | 2 (Xn) | After the handover, the SMF gives the target gNB the joined MBS Session IDs with the PDU Session Resource Modification procedure | TS 38.300 cl. 16.10.5.3.3 |
| | 2 (NG) | The SMF gives the joined MBS Session IDs in the NGAP Handover Request | TS 38.300 cl. 16.10.5.3.3 |
| | 3 | The SMF changes the delivery from 5GC Individual to 5GC Shared | TS 23.247 cl. 6.3.1, 7.2.3.4 |

## Between two cells that support multicast

Mobility procedures for multicast reception let the UE continue receiving its multicast services via PTM or PTP in the new cell after handover.

During handover preparation, the source gNB tells the target gNB, in the UE context information, which multicast sessions the UE has joined. For a local multicast service with location dependent content, service area information per Area Session ID may be provided for each active session.

The source gNB may propose data forwarding for some MRBs to minimise data loss, and may exchange their PDCP sequence numbers with the target gNB:

- Lossless handover is supported between cells that support MBS if the UE is configured with a PTP RLC AM entity in the target cell MRB, whether or not it had one in the source cell.
- For lossless handover, the network has to ensure DL PDCP COUNT value synchronisation and continuity between the source and the target cell. Data forwarding and a PDCP status report from the UE can also be used.

For each session with ongoing data and no MBS Session Resources at the target gNB, the target sets up the MBS user plane resources towards the 5G Core with the NGAP Distribution Setup procedure. With unicast transport, the target gives the MB-SMF its tunnel endpoint; with multicast transport, it receives the IP multicast address from the MB-SMF.

During handover execution, the MBS configuration decided by the target gNB is sent to the UE through the source gNB, in an RRC container. The PDCP entities of the multicast MRBs in the UE can be re-established or kept. When the UE connects, the target gNB indicates to the SMF that it supports MBS. After the handover, the source gNB may release the MBS user plane resources with the NGAP Distribution Release procedure for any session without a remaining joined UE.

## Between a cell that supports multicast and one that does not

### Towards a cell without multicast

At mobility to a cell that does not support MBS, the target gNB sets up PDU Session Resources mapped to the multicast session. The 5G Core infers from the absence of the "MBS-support" indication, in the Path Switch Request (Xn handover) or Handover Request Acknowledge (NG handover), that delivery has to switch to 5GC Individual MBS traffic delivery. In TS 23.247, the N3 tunnel of the PDU Session used for 5GC Individual delivery is then established towards the target node. If data forwarding is applied, the source gNB changes the QFIs of the forwarded packets to those of the associated PDU Session, when the mapping is available.

The source gNB can switch the MRB to a DRB before the handover. TS 38.300 notes that without that prior reconfiguration, the target gNB may not understand the AS configuration, causing full configuration.

### Towards a cell with multicast

From a cell that does not support MBS, the existing Xn or NG handover procedures apply. The 5G Core infers from the presence of the "MBS-support" indicator that delivery can switch from 5GC Individual to 5GC Shared:

- After an Xn handover, the SMF triggers the switch by giving the target gNB the MBS Session IDs the UE joined, with the PDU Session Resource Modification procedure.
- For an NG handover, the SMF gives those MBS Session IDs in the NGAP Handover Request.

Data loss can be minimised and duplicates avoided by comparing the MBS QFI sequence numbers received over the shared NG-U tunnel with those received over the unicast or forwarding tunnels.

## Minimisation of data loss

| Mechanism | In the specifications |
| --- | --- |
| **Sequence numbers** | The MB-UPF adds a sequence number per MBS QoS flow to each packet it sends to NG-RAN nodes and UPFs; a UPF that forwards the packet does not change it (TS 23.247 clause 7.2.3.5) |
| **PDCP COUNT from the sequence number** | With one QoS flow mapped to an MRB, the gNB sets the PDCP COUNT to the DL MBS QFI sequence number received over NG-U (TS 38.300 clause 16.10.5.1) |
| **Shared NG-U termination** | NG-RAN nodes that share a common user plane entity can allocate identical PDCP numbers in cells of different nodes (TS 23.247 clause 7.2.3.5; TS 38.300 clause 16.10.5.1) |
| **MRB reconfiguration** | When the MRB type changes, the gNB may ask the UE for a PDCP status report (TS 38.300 clause 16.10.5.3.4) |

For a session in the Inactive state, the target NG-RAN node establishes the shared tunnel if needed, but does not allocate radio resources (TS 23.247 clause 7.2.3.6).

<details>
<summary>Sources for this page</summary>

- **NG-RAN procedures:** TS 38.300 V18.11.0, clauses 16.10.5.1 and 16.10.5.3.1 to 16.10.5.3.4.
- **5G Core procedures:** TS 23.247 V18.8.0, clauses 6.3.1, 7.2.1.4, 7.2.3.1 to 7.2.3.6.
- **NGAP procedures:** TS 38.413 V18.11.0, clauses 8.18.1 and 8.18.2.

</details>
