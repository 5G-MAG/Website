---
title: MBS Broadcast - RAN Procedures
sidebar_position: 3
hide_title: true
description: How a UE acquires and receives an MBS broadcast service in NR, from the MIB and SIB20 to the MCCH and the MTCH, based on TS 38.331, TS 38.321, TS 38.213, TS 38.214 and TS 38.300 Release 18.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Multicast Broadcast Services (MBS)</span>
<h1>MBS Broadcast - RAN Procedures</h1>
</div>
</div>

:::tip[At a glance]

- **The chain:** MIB, then SIB1, which schedules SIB20; SIB20 configures the MCCH; the MCCH carries the MBSBroadcastConfiguration message, which lists the sessions with their G-RNTI and MTCH scheduling; the UE then receives the MTCH.
- **States:** a UE can acquire the MCCH and receive broadcast in RRC_IDLE, RRC_INACTIVE and RRC_CONNECTED.
- **Identifiers:** MCCH-RNTI (FFFD) for the MCCH, a G-RNTI per session for the MTCH; both scheduled with DCI format 4_0.
- **No feedback:** broadcast has no HARQ-ACK feedback and uses dynamic scheduling only; slot-level repetition is supported for MTCH.

:::

This page follows a UE from the cell's system information to the reception of broadcast data, in Release 18. Field names are those of the TS 38.331 ASN.1; the clause given for each is where the full definition is.

The steps:

- 0. Pre-configuration (optional)
- 1. Obtain the MIB
- 2. Obtain SIB1, which schedules SIB20
- 3. SIB20 configures the MCCH
- 4. Receive the MCCH, scheduled with MCCH-RNTI
- 5. The MCCH carries MBSBroadcastConfiguration
- 6. The session list gives each session's G-RNTI and MTCH configuration
- 7. Receive the MTCH, scheduled with the G-RNTI

## Implementation blueprint

| Step | Layer | What happens | Clause |
| --- | --- | --- | --- |
| 0. Pre-configuration | NAS configuration | The UE may hold, per PLMN, the frequencies and TMGIs of broadcast services | TS 24.575 cl. 4 |
| 1. MIB | RRC, physical layer | The MIB gives the PDCCH configuration for SIB1 (`pdcch-ConfigSIB1`) | TS 38.331 cl. 5.2.2.3.1, 5.2.2.4.1, 6.2.2 |
| 2. SIB1 | RRC | SIB1 schedules the SI message that carries SIB20 | TS 38.331 cl. 5.2.2.4.2, 6.2.2, 6.3.2 |
| 3. SIB20 | RRC | MCCH scheduling and the common frequency resource for MCCH and MTCH | TS 38.331 cl. 5.9.1, 6.3.1, 6.3.6 |
| 4. MCCH | MAC, physical layer | PDCCH addressed to MCCH-RNTI, DCI format 4_0, PDSCH configured by `pdsch-ConfigMCCH`, LCID 0 | TS 38.331 cl. 5.9.1.2, 5.9.2; TS 38.321 cl. 5.3.1, tables 6.2.1-1c and 7.1-1; TS 38.212 cl. 7.3.1.5.1; TS 38.213 cl. 10.1; TS 38.214 cl. 5.1 |
| 5. MBSBroadcastConfiguration | RRC | Sessions, neighbour cells, DRX and PDSCH configurations | TS 38.331 cl. 6.2.2 |
| 6. Session list | RRC | Per session: TMGI, G-RNTI, broadcast MRBs, MTCH scheduling | TS 38.331 cl. 6.3.6 |
| 7. MTCH | RRC, MAC, physical layer | Broadcast MRB establishment; PDCCH addressed to the G-RNTI, DCI format 4_0, PDSCH configured by `pdsch-ConfigMTCH`, LCID 1 to 32 | TS 38.331 cl. 5.9.3.3; TS 38.321 cl. 5.3.1, table 6.2.1-1c; TS 38.214 cl. 5.1 |
| User plane | SDAP, PDCP, RLC | SDAP maps MBS QoS flows to the MRB, without an SDAP header; PDCP may use header compression; one DL-only RLC-UM entity | TS 37.324 cl. 4.2; TS 38.323 cl. 4.2.2; TS 38.300 cl. 16.10.3 |

## Step 0: Pre-configuration

A UE may be pre-configured with information for MBS services. It then discovers and receives the services with that configuration. The pre-configuration lists PLMNs, and for each PLMN gives:

- the PLMN ID;
- the NR-ARFCN on which the broadcast communication service is available;
- the TMGIs on which the broadcast service is available, each with its User Service Description (USD) information;
- the TMGIs on which the service announcement is available, with their USD information;
- a default DNN and S-NSSAI pair for the PDU sessions used to join multicast sessions.

## Steps 1 and 2: MIB and SIB1

The MIB is not specific to MBS. Its field `pdcch-ConfigSIB1` gives the PDCCH configuration the UE uses to receive SIB1. On receiving the MIB, the UE stores it.

In SIB1, the field `si-SchedulingInfo-v1700` holds a list of `SchedulingInfo2-r17` entries. Each gives the periodicity and window position of one SI message, and a `sib-MappingInfo-r17` list of `SIB-TypeInfo-v1700` entries, whose `type1-r17` values include `sibType20`. This is how the UE finds the SI message that carries SIB20.

## Step 3: SIB20

SIB20 contains the information required to acquire the MCCH/MTCH configuration for MBS broadcast. Its fields are `mcch-Config-r17` and `cfr-ConfigMCCH-MTCH-r17`, and, in a Release 18 extension, `cfr-ConfigMCCH-MTCH-RedCap-r18` and `mcch-ConfigRedCap-r18`. `MCCH-Config-r17` holds the MCCH repetition period and offset, the window start slot, the window duration and the modification period. The common frequency resource (`CFR-ConfigMCCH-MTCH`, TS 38.331 clause 6.3.6) is used for MCCH, multicast MCCH and MTCH reception.

TS 38.331 clause 5.9.1.1 states that the configuration the UE needs to receive the MCCH is provided in SIB1 and SIB20. A UE may acquire MBS broadcast only if it can do so without disrupting unicast, SDT or MBS multicast reception.

### SIB21: service continuity

SIB21 contains the mapping between the current and neighbouring carrier frequencies and the MBS Frequency Selection Area Identities (FSAI). Its fields are `mbs-FSAI-IntraFreq-r17` and `mbs-FSAI-InterFreqList-r17`.

## Step 4: Receiving the MCCH

The MCCH is transmitted periodically, with a configurable repetition period, within a configured transmission window. Its transmissions are indicated by a PDCCH addressed to the MCCH-RNTI. If `searchSpaceMCCH` is zero, the PDCCH monitoring occasions for the MCCH are those of SIB1.

| Layer | What applies | Clause |
| --- | --- | --- |
| MAC | When it needs to read the MCCH, the MAC entity acts on a downlink assignment received for the MCCH-RNTI or the Multicast MCCH-RNTI. MCCH-RNTI is FFFD | TS 38.321 cl. 5.3.1, table 7.1-1 |
| MAC | LCID 0 is "Broadcast MCCH or multicast MCCH" on DL-SCH | TS 38.321 table 6.2.1-1c |
| Physical layer | The PDCCH uses DCI format 4_0 with CRC scrambled by the MCCH-RNTI, in a Type0 or Type0B PDCCH common search space set (`searchSpaceMCCH`) | TS 38.212 cl. 7.3.1.5.1; TS 38.213 cl. 10.1 |
| Physical layer | The time-domain allocation, MCS table, overhead and rate matching of the PDSCH come from `pdsch-ConfigMCCH` | TS 38.214 cl. 5.1 |

MCCH information changes only at the boundary of a modification period. The network notifies the change with a 2-bit bitmap: its most significant bit indicates the start of new MBS services, its least significant bit other modifications. A UE acquires the MCCH when it becomes interested in MBS broadcast, on entering a cell that provides SIB20, and on these notifications. Each acquisition overwrites the stored MCCH information: delta configuration does not apply.

## Steps 5 and 6: MBSBroadcastConfiguration and the session list

The MBSBroadcastConfiguration message contains the control information applicable for MBS broadcast services transmitted via broadcast MRB. Its fields are `mbs-SessionInfoList-r17`, `mbs-NeighbourCellList-r17`, `drx-ConfigPTM-List-r17`, `pdsch-ConfigMTCH-r17` and `mtch-SSB-MappingWindowList-r17` (TS 38.331 clause 6.2.2).

`MBS-SessionInfoList` gives the ongoing broadcast sessions and, for each, its G-RNTI and scheduling information. Each `MBS-SessionInfo-r17` holds `mbs-SessionId-r17` (a TMGI), `g-RNTI-r17`, `mrb-ListBroadcast-r17` and optional MTCH scheduling, neighbour cell, PDSCH index and SSB mapping fields. Each `MRB-InfoBroadcast-r17` holds a PDCP and an RLC configuration (TS 38.331 clause 6.3.6).

The MCCH may also list neighbour cells that provide the same broadcast services.

## Step 7: Receiving the MTCH

On establishing a broadcast MRB (TS 38.331 clause 5.9.3.3), the UE establishes a PDCP and an RLC entity from `MRB-InfoBroadcast`, configures MAC with `mtch-SchedulingInfo` and the physical layer with `mbs-SessionInfoList`, `searchSpaceMTCH` and `pdsch-ConfigMTCH`. If no SDAP entity exists for the `mbs-SessionId`, it establishes one (TS 37.324 clause 5.1.1). It then receives DL-SCH on that cell with the `g-RNTI` and `mtch-SchedulingInfo`. On release (clause 5.9.3.4) it releases the PDCP and RLC entities and the related MAC and physical layer configuration.

| Layer | What applies | Clause |
| --- | --- | --- |
| MAC | When it needs to read broadcast MTCH, the MAC entity acts on a downlink assignment received for the G-RNTI configured for broadcast MTCH. The allocation of these transport blocks to a HARQ process is left to the UE | TS 38.321 cl. 5.3.1, 5.3.2.1 |
| MAC | LCID 1 to 32 identify the logical channel of broadcast MTCH | TS 38.321 table 6.2.1-1c |
| MAC | G-RNTI usage: dynamically scheduled MBS PTM transmission, on DL-SCH, MTCH | TS 38.321 table 7.1-2 |
| Physical layer | DCI format 4_0 with CRC scrambled by the G-RNTI for broadcast (`searchSpaceMTCH`) | TS 38.212 cl. 7.3.1.5.1; TS 38.213 cl. 10.1 |
| Physical layer | PDSCH parameters from `pdsch-ConfigMTCH` if configured, otherwise from `pdsch-ConfigMCCH` | TS 38.214 cl. 5.1 |

At the physical layer, TS 38.300 clause 16.10.6.6 states that broadcast uses at most one MIMO layer, has no HARQ-ACK feedback, uses dynamic scheduling only, and supports slot-level repetition of MTCH.

## User plane

| Sublayer | What applies | Clause |
| --- | --- | --- |
| SDAP | Configured for MRBs by RRC; maps MBS QoS flows to MRBs. There is no SDAP header for an MRB | TS 37.324 cl. 4.2.1, 4.2.2 |
| PDCP | A PDCP entity for an MRB can be configured to use header compression | TS 38.323 cl. 4.2.2 |
| RLC | One DL-only RLC-UM entity per broadcast MRB | TS 38.300 cl. 16.10.3 |

<details>
<summary>Sources for this page</summary>

- **Pre-configuration:** TS 24.575 V18.3.0, clause 4.
- **MIB, SIB1, SIB20, SIB21, MCCH and MRB procedures:** TS 38.331 V18.11.0, clauses 5.2.2.3.1, 5.2.2.4.1, 5.9.1 to 5.9.3, 6.2.2, 6.3.1, 6.3.2 and 6.3.6.
- **MAC:** TS 38.321 V18.10.0, clauses 5.3.1 and 5.3.2.1, tables 6.2.1-1c, 7.1-1 and 7.1-2.
- **Physical layer:** TS 38.212 V18.8.0, clause 7.3.1.5.1; TS 38.213 V18.9.0, clause 10.1; TS 38.214 V18.11.0, clause 5.1; TS 38.300 V18.11.0, clause 16.10.6.6.
- **User plane:** TS 37.324 V18.0.0, clauses 4.2.1, 4.2.2 and 5.1.1; TS 38.323 V18.5.0, clause 4.2.2; TS 38.300 V18.11.0, clause 16.10.3.
- **Neighbour cells:** TS 38.300 V18.11.0, clause 16.10.6.5.1.

</details>
