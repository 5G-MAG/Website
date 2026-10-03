---
title: MBS Multicast Inactive - RAN Procedures
sidebar_position: 4
hide_title: true
description: How a UE that joined a multicast session keeps receiving it in RRC_INACTIVE, added in Release 18, through SIB24, the multicast MCCH and the MBSMulticastConfiguration message, based on TS 38.331, TS 38.321, TS 38.300 and TS 23.247.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Multicast Broadcast Services (MBS)</span>
<h1>MBS Multicast Inactive - RAN Procedures</h1>
</div>
</div>

:::tip[At a glance]

- **Added in Release 18:** TS 38.331 V17.17.0 has no SIB24 and no clause 5.10, and TS 38.321 V17.15.0 keeps the value FFFB reserved.
- **Purpose, as TS 23.247 states it:** to provide a multicast service to more UEs in a cell, NG-RAN may move UEs that can receive in RRC_INACTIVE out of RRC_CONNECTED. The gNB decides the state.
- **Configuration:** in the RRCRelease message and on the multicast MCCH, scheduled by SIB24 and addressed with the Multicast MCCH-RNTI (FFFB).
- **Limits:** PTM only, no PTP, no HARQ feedback and no SPS in RRC_INACTIVE; the UE resumes the connection when the serving cell falls below a configured RSRP or RSRQ threshold.

:::

A UE that has joined a Multicast MBS session can receive it in RRC_INACTIVE if the gNB configures it to. The gNB moves the UE to RRC_INACTIVE with the RRCRelease message, and may give the PTM configuration there, with the multicast services that can continue in RRC_INACTIVE. The UE does not suspend the multicast MRBs of those services. The multicast MCCH is used when a cell updates the PTM configuration or provides it to UEs that arrive in RRC_INACTIVE from other cells.

On the core side, the joined UEs can be in CM-CONNECTED with RRC_INACTIVE while the Multicast MBS session is active (TS 23.247 clause 4.3). The NG-RAN node tells the 5G Core, when a UE joins and during Xn handover, that it supports multicast reception in RRC_INACTIVE.

The steps:

- 0. Join the multicast session and be configured for RRC_INACTIVE (in RRC_CONNECTED)
- 1. Obtain the MIB
- 2. Obtain SIB1, which schedules SIB24
- 3. SIB24 configures the multicast MCCH
- 4. Receive the multicast MCCH, scheduled with Multicast MCCH-RNTI
- 5. The multicast MCCH carries MBSMulticastConfiguration
- 6. The session list gives each session's G-RNTI and MTCH configuration
- 7. Receive the MTCH, scheduled with the G-RNTI

## Implementation blueprint

| Step | Layer | What happens | Clause |
| --- | --- | --- | --- |
| 0. Join and release to RRC_INACTIVE | NAS, RRC | The UE joins the session; the gNB sends RRCRelease, possibly with the PTM configuration | TS 23.247 cl. 7.2.1.3; TS 38.300 cl. 16.10.5.2 |
| 1, 2. MIB and SIB1 | RRC | As for broadcast, with `sibType24-v1800` in the SIB mapping | TS 38.331 cl. 5.2.2, 6.3.2 |
| 3. SIB24 | RRC | Multicast MCCH scheduling (`multicastMCCH-Config-r18`) and common frequency resource (`cfr-ConfigMCCH-MTCH-r18`) | TS 38.331 cl. 5.10.1, 6.3.1 |
| 4. Multicast MCCH | MAC, physical layer | PDCCH addressed to Multicast MCCH-RNTI, DCI format 4_0, PDSCH from `pdsch-ConfigMCCH` for MBS multicast, LCID 0 | TS 38.331 cl. 5.10.1.2, 5.10.2; TS 38.321 cl. 5.3.1, tables 6.2.1-1c and 7.1-1; TS 38.213 cl. 10.1; TS 38.214 cl. 5.1 |
| 5. MBSMulticastConfiguration | RRC | Sessions, neighbour cells, DRX and PDSCH configurations, thresholds | TS 38.331 cl. 6.2.1, 6.2.2 |
| 6. Session list | RRC | Per session: TMGI, G-RNTI, multicast MRBs, MTCH scheduling, threshold index | TS 38.331 cl. 6.3.6 |
| 7. MTCH | RRC, MAC, physical layer | Multicast MRB establishment; G-RNTI for multicast MTCH, DCI format 4_1, LCID from table 6.2.1-1 | TS 38.331 cl. 5.10.3.2; TS 38.321 cl. 5.3.1, table 6.2.1-1; TS 38.212 cl. 7.3.1.5.2; TS 38.213 cl. 10.1 |
| User plane | SDAP, PDCP, RLC | One DL-only RLC-UM entity for PTM; PDCP state variables from `initialRX-DELIV` when provided | TS 38.300 cl. 16.10.3; TS 38.323 cl. 7.1; TS 37.324 cl. 4.2 |

## Steps 1 to 3: SIB24

SIB1 schedules SIB24 in the same way as SIB20, through a `SIB-TypeInfo-v1700` entry whose value is `sibType24-v1800`. SIB24 contains the information required to acquire the multicast MCCH/MTCH configuration for MBS multicast reception in RRC_INACTIVE. Its fields are `multicastMCCH-Config-r18`, of the type `MCCH-Config-r17` used for broadcast, and `cfr-ConfigMCCH-MTCH-r18`, of the type `CFR-ConfigMCCH-MTCH-r17`.

## Step 4: Receiving the multicast MCCH

The multicast MCCH is transmitted periodically within a configured transmission window. Its transmissions are indicated by a PDCCH addressed to the Multicast MCCH-RNTI. If `searchSpaceMulticastMCCH` is zero, the monitoring occasions are those of SIB1.

| Layer | What applies | Clause |
| --- | --- | --- |
| MAC | The MAC entity reads the MCCH on a downlink assignment for the MCCH-RNTI or the Multicast MCCH-RNTI. Multicast MCCH-RNTI is FFFB, distinct from the broadcast MCCH-RNTI (FFFD) | TS 38.321 cl. 5.3.1, table 7.1-1 |
| MAC | LCID 0 is shared: "Broadcast MCCH or multicast MCCH" | TS 38.321 table 6.2.1-1c |
| Physical layer | DCI format 4_0 with CRC scrambled by the Multicast MCCH-RNTI (`searchSpaceMulticastMCCH`) | TS 38.212 cl. 7.3.1.5.1; TS 38.213 cl. 10.1 |
| Physical layer | PDSCH parameters from `pdsch-ConfigMCCH` for MBS multicast | TS 38.214 cl. 5.1 |

Multicast MCCH information changes only at the boundary of a modification period. In the 2-bit change notification, the most significant bit is reserved; the least significant bit indicates a modification, for example of an ongoing session's configuration or of G-RNTI monitoring. The UE acquires the multicast MCCH on a change notification, on selecting or reselecting a cell that provides SIB24, after group paging, or when RRCRelease lacks the PTM configuration of a session it still monitors.

## Steps 5 and 6: MBSMulticastConfiguration and the session list

The `MulticastMCCH-Message` class is the set of RRC messages sent on the multicast MCCH (TS 38.331 clause 6.2.1). Its message, MBSMulticastConfiguration, contains the control information for multicast services transmitted via multicast MRBs to UEs in RRC_INACTIVE (clause 6.2.2). Its fields are `mbs-SessionInfoListMulticast-r18`, `mbs-NeighbourCellList-r18`, `drx-ConfigPTM-List-r18`, `pdsch-ConfigMTCH-r18`, `mtch-SSB-MappingWindowList-r18` and `thresholdMBS-List-r18`, the list of reception quality thresholds for RRC connection resume.

`MBS-SessionInfoListMulticast` gives the multicast sessions and, for each, its G-RNTI and scheduling information (clause 6.3.6). Compared with the broadcast entry, `MBS-SessionInfoMulticast-r18` adds `thresholdIndex-r18`, `pdcp-SyncIndicator-r18` and `stopMonitoringRNTI-r18`. In `MRB-RLC-ConfigMulticast-r18`, the logical channel identity is a choice of `logicalChannelIdentitymulticast-r18` and `logicalChannelIdentityExt-r18`.

When there is temporarily no data for an active multicast session, or when it is deactivated, the network tells the UE to stop monitoring the G-RNTI through MBSMulticastConfiguration.

## Step 7: Receiving the MTCH

On establishing a multicast MRB (TS 38.331 clause 5.10.3.2), the UE establishes a PDCP and an RLC entity from `mrb-ListMulticast`, configures MAC with `mtch-SchedulingInfo` and the physical layer with `mbs-SessionInfoListMulticast`, `searchSpaceMulticastMTCH` and `pdsch-ConfigMTCH`, establishes an SDAP entity if needed, and receives DL-SCH with the G-RNTI unless told to stop monitoring it. Release (clause 5.10.3.3) mirrors the broadcast case.

| Layer | What applies | Clause |
| --- | --- | --- |
| MAC | Downlink assignment reception names the G-RNTI configured for multicast MTCH | TS 38.321 cl. 5.3.1 |
| MAC | The multicast MTCH logical channel uses LCID 1 to 32 of table 6.2.1-1, "DCCH, DTCH and multicast MTCH"; table 6.2.1-1c covers only broadcast MTCH | TS 38.321 tables 6.2.1-1 and 6.2.1-1c |
| Physical layer | DCI format 4_1 with CRC scrambled by the G-RNTI, for PDCCH receptions in RRC_INACTIVE (`searchSpaceMulticastMTCH`). DCI format 4_1 is used to schedule PDSCH for multicast | TS 38.212 cl. 7.3.1.5.2; TS 38.213 cl. 10.1 |

TS 38.300 also states for RRC_INACTIVE: PTP transmission, SPS and HARQ feedback are not supported; slot-level repetition of the multicast MTCH is optional; the maximum is one MIMO layer; multicast DRX is configured per G-RNTI.

## Moving between cells in RRC_INACTIVE

- A UE in RRC_INACTIVE continues receiving without resuming the RRC connection if it can acquire the PTM configuration of the new cell from its multicast MCCH. Otherwise, during an active session, it resumes the connection.
- The gNB may indicate that the cells of the RAN Notification Area (RNA) are synchronised in PDCP COUNT for a session. On reselecting such a cell, the UE does not initialise the PDCP state variables. In TS 38.323, the initial value of RX_DELIV of a multicast MRB is set by `initialRX-DELIV` if provided.
- The UE resets MAC on cell selection or reselection. On a transition from RRC_CONNECTED to RRC_INACTIVE in the same cell, it can keep the multicast MRBs it used, with the same LCIDs.
- The UE resumes the RRC connection when the latest measured RSRP or RSRQ of the serving cell falls below the threshold configured by the network, per session, in RRCRelease or on the multicast MCCH.

<details>
<summary>Sources for this page</summary>

- **Release 18 addition:** TS 38.331 V18.11.0 compared with TS 38.331 V17.17.0 (SIB24, clause 5.10); TS 38.321 V18.10.0 compared with V17.15.0 (table 7.1-1).
- **Configuration and continuity:** TS 38.300 V18.11.0, clauses 16.10.3, 16.10.5.2, 16.10.5.3.5, 16.10.5.4, 16.10.5.6 and 16.10.5.7.
- **Core side:** TS 23.247 V18.8.0, clauses 4.3, 6.17 and 7.2.1.3.
- **RRC procedures and messages:** TS 38.331 V18.11.0, clauses 5.10.1 to 5.10.3, 6.2.1, 6.2.2, 6.3.1, 6.3.2 and 6.3.6.
- **MAC:** TS 38.321 V18.10.0, clause 5.3.1, tables 6.2.1-1, 6.2.1-1c and 7.1-1.
- **Physical layer:** TS 38.212 V18.8.0, clauses 7.3.1.5.1 and 7.3.1.5.2; TS 38.213 V18.9.0, clause 10.1; TS 38.214 V18.11.0, clause 5.1.
- **User plane:** TS 38.323 V18.5.0, clause 7.1; TS 37.324 V18.0.0, clause 4.2.

</details>
