---
title: MBS Broadcast - RAN Procedures
sidebar_position: 5
hide_title: true
description: Traces the RAN acquisition steps and ASN.1 signalling (SIB20, MCCH, MTCH) for receiving a 5G MBS broadcast service.
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

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Analysis of RAN procedures for MBS Broadcast

This page traces, step by step, how a UE finds and starts receiving an MBS broadcast service on the radio, and then lists the per-layer procedures involved. It is a detailed radio-side companion to the [RAN Aspects](./ran-aspects) summary.

:::note[About the field summaries on this page]
This page describes 3GPP-defined information elements by field name and purpose rather than reproducing their ASN.1 definitions in full — the structures themselves, exact field types, optionality conditions and encoding are 3GPP's copyrighted text. Every summary below is cited to the exact TS 38.331 clause that carries the authoritative definition; consult that clause directly for anything you need to implement against.
:::

The step sequence below (numbered 0 to 7) is the acquisition path, from reading the base station's system information down to decoding the broadcast traffic. The channels it refers to are: MIB (Master Information Block); SIB (System Information Block, here SIB20 and SIB21); MCCH (Multicast Control Channel), which carries the broadcast configuration; MTCH (Multicast Traffic Channel), which carries the broadcast data; PDCCH (Physical Downlink Control Channel) and PDSCH (Physical Downlink Shared Channel), the physical channels that schedule and carry the data; and the identifiers MCCH-RNTI and G-RNTI (Group Radio Network Temporary Identifier) used to address them.

- 0. Acquiring PLMN and RAN Information
- 1. Obtain MIB
- 2. Obtain SIB1 (points to SIB20)
- 3. SIB20 contains configuration of MCCH
- 4. Demodulation of MCCH (PDSCH) via PDCCH (with MCCH-RNTI = FFFD)
- 5. MCCH contains MBSBroadcastConfiguration
- 6. Obtain configuration of MTCH within MBSBroadcastConfiguration and G-RNTIs via mbs-SessionInfoList within MBSBroadcastConfiguration
- 7. Demodulation of MTCH (PDSCH) with G-RNTI

The chain is a series of pointers, each layer telling the UE where to find the next. System information (SIB1) advertises SIB20; SIB20 gives the MCCH configuration; the MCCH (scheduled on the PDSCH via a PDCCH scrambled with the fixed MCCH-RNTI, FFFD) carries the `MBSBroadcastConfiguration`; and that configuration lists the sessions, their G-RNTIs and the MTCH scheduling needed to decode the traffic. The important property is that every step is derivable from broadcast system information with no uplink and no per-UE state, which is exactly why a broadcast service (delivery mode 2) can be received in any RRC state, including RRC_IDLE and RRC_INACTIVE. The per-layer procedure sections further down are reference pointers into TS 38.331 and the related Layer-2 specifications for each of these steps.

## Implementation blueprint

This page is a verified map of the acquisition path, not a self-contained implementation spec: it gives correct clause/table/RNTI/LCID pointers and field-level summaries, but a conformant implementation needs the full primary-source text (including the exact ASN.1) behind each pointer. Fetch these before implementing a given step:

| Step | Layer(s) | This page provides | Fetch in full before implementing |
| --- | --- | --- | --- |
| 0. PLMN/RAN info | NAS / configuration | Pre-configuration MO field list | **TS 24.575** (full MO definition), **TS 23.247** (MBS architecture, for how this config is used) |
| 1. Obtain MIB | RRC (Layer 3), PHY | MIB field summary, acquisition/reception clause numbers | **TS 38.331** Clause 6.2.2 (full ASN.1), Clause 5.2.2.3.1 and 5.2.2.4.1 in full; **TS 38.213** for SSB/PBCH scheduling of the MIB (not covered here at all) |
| 2. Obtain SIB1 | RRC (Layer 3), PHY | `si-SchedulingInfo`/`SIB-TypeInfo` pointer mechanism only | **TS 38.331** Clause 6.2.2 for the complete SIB1 message and its full ASN.1 (this page describes one field of a much larger structure) and Clause 5.2.2.3.1/5.2.2.4.2 in full; **TS 38.213** for PDCCH-ConfigSIB1-based monitoring |
| 3. SIB20 → MCCH config | RRC | SIB20/`MCCH-Config`/`CFR-ConfigMCCH-MTCH` field summary | **TS 38.331** Clause 6.3.1 for the full ASN.1 and any further-referenced IEs (e.g. `ControlResourceSet`) not expanded here |
| 4. Demodulate MCCH via PDCCH | MAC, PHY | RNTI value (Table 7.1-1), LCID (Table 6.2.1-1c), search space and **DCI format 4_0** (TS 38.213 Clause 10.1, verified) | **TS 38.213** Clause 10.1 in full for the complete CORESET/Search Space Set configuration and PDCCH candidate blind decoding rules beyond the MCCH-specific summary on this page |
| 5. MCCH → `MBSBroadcastConfiguration` | RRC | Field summary of the message | **TS 38.331** Clause 5.9 for the complete UE procedure text and Clause 6.2.2 for the full ASN.1 (this page summarises the establishment/release actions only) |
| 6. MTCH config + G-RNTI via `MBS-SessionInfoList` | RRC | Field summary of the IE | Same as step 5, plus Clause 6.3.6 for the full ASN.1 |
| 7. Demodulate MTCH via PDSCH | MAC, PHY | G-RNTI table entry, **DCI format 4_0**, `pdsch-ConfigMTCH` resource-allocation source (TS 38.213/38.214, verified) | **TS 38.321** Clause 5.3.2 in full (HARQ soft-combining — this is *not* "no HARQ"; a dedicated, feedback-less HARQ process applies); **TS 38.214** Clause 5.1.2 in full for the complete PDSCH resource-allocation and decoding rules beyond the MCCH/MTCH-specific summaries on this page |
| PDCP (all steps) | PDCP | Clause pointers only | **TS 38.323** Clause 5, 6 and 7 in full |
| RLC (all steps) | RLC | Clause pointers only | **TS 38.322** Clause 4.2.1.2 and 7 in full |
| SDAP (user plane) | SDAP | Clause pointers, procedures paraphrased | **TS 37.324** Clause 4.2, 5.1.1, 5.1.2, 5.2.2, 6.2.2.1 in full |
| ASN.1 grammar (all steps) | — | Field names and purposes only, not full type definitions | **TS 38.331** Clause 6.2 (RRC messages) and Clause 6.3 (RRC information elements) in full, for the authoritative ASN.1 of every message/IE named on this page, encoded per Clause 8 (Unaligned Packed Encoding Rules) |

The [MBS Multicast Inactive RAN procedures](./analysis-mbs-multicast-inactive-ran) page has the equivalent blueprint for delivery mode 1 (RRC_INACTIVE reception) — the two diverge at Step 4 (a distinct Multicast MCCH-RNTI) and Step 7 (a different LCID table for MTCH).

## Acquiring PLMN and RAN Information

For information on the MBS Broadcast Pre-Configuration Management Object (MO) refer to **[3GPP TS 24.575](https://www.3gpp.org/dynareport/24575.htm)**.

A UE can support MBS to deliver content from a single source entity to all users in a broadcast service area (MBS
broadcast communication), as defined in 3GPP [TS 23.247](https://www.3gpp.org/dynareport/23247.htm). The UE may support pre-configuration of information for MBS services, containing a list of PLMNs; if pre-configured this way, the UE can discover and receive service data using the provisioned configuration.
For each PLMN, the following information is included:

- PLMN ID of the PLMN for which the configuration applies;
- RAN information based on NR-ARFCN on which the broadcast communication service is available;
- list of TMGI, on which the broadcast communication service is available, each associated with user service
  description (USD) information (3GPP [TS 26.517](https://www.3gpp.org/dynareport/26517.htm)) for the MBS broadcast service.
- list of TMGI, on which the service announcement for broadcast communication service is available along with
  the associated USD information (see 3GPP TS 26.517) for the MBS user service announcement service

## Obtention of MIB/SIB signaling

For definitions refer to **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1** (System information blocks)

### Step 1: Obtain MIB

Before any system information can be read, the UE first camps on a cell (cell search, using the SSB) and decodes the Master Information Block (MIB), broadcast on the BCH and scheduled once per SSB period as specified in **[3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm)**. The MIB itself is generic to NR and carries nothing MBS-specific, but it is the first link in the chain: it provides the `pdcch-ConfigSIB1` field, which gives the UE the PDCCH configuration it needs to find and decode SIB1 next.

- MIB definition and procedures in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2** (Message definitions) and **Clause 5.2.2.3.1** (Acquisition of MIB and SIB1)
- Actions upon reception of the MIB in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.2.2.4.1**: on receiving the MIB, the UE stores it and applies `pdcch-ConfigSIB1` (among other fields) to configure PDCCH monitoring for SIB1

The MIB carries, alongside `pdcch-ConfigSIB1`: `systemFrameNumber`, `subCarrierSpacingCommon`, `ssb-SubcarrierOffset`, `dmrs-TypeA-Position`, `cellBarred`, `intraFreqReselection`, and a spare bit — none of these other fields are MBS-specific. Full ASN.1 definition in **TS 38.331 Clause 6.2.2**.

### Step 2: Obtain SIB1 (points to SIB20)

Using the PDCCH configuration from the MIB, the UE next decodes SIB1, the first system information block and (like the MIB) a generic NR message rather than an MBS-specific one. The field that matters for this chain is `si-SchedulingInfo`, which lists every other SIB the cell broadcasts, when, and how — including, for a cell offering MBS broadcast, an entry pointing to SIB20.

- SIB1 definition in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2** (Message definitions); acquisition procedure in **Clause 5.2.2.3.1**, scheduled as specified in **[3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm)**
- Actions upon reception of SIB1 in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.2.2.4.2**
- The pointer mechanism: SIB1's `si-SchedulingInfo` field (type `SI-SchedulingInfo`, **Clause 6.3.2**) contains a `schedulingInfoList`, each entry (`SchedulingInfo2-r17`) giving the periodicity/window of one SI message and a `sib-MappingInfo-r17` list of the SIB types it carries. Each `SIB-TypeInfo-v1700` entry's `type` field is an enumeration that includes `sibType20` (and, for the RRC_INACTIVE multicast case on the companion page, `sibType24`) among the other SIB types — this is the concrete field that tells the UE "SIB20 is broadcast in this SI message, at this periodicity". Full ASN.1 for `SIB1`, `SI-SchedulingInfo`, `SchedulingInfo2-r17` and `SIB-TypeInfo-v1700` is in **TS 38.331 Clause 6.2.2 and 6.3.2**.

### Step 3: SIB20 - Acquisition MCCH/MTCH

SIB20 contains the information required to acquire the MCCH/MTCH configuration for MBS broadcast. Its top-level fields are `mcch-Config-r17` (MCCH scheduling, see below) and `cfr-ConfigMCCH-MTCH-r17` (the common frequency resource used to carry MCCH and MTCH, see "Other RRC Messages" below), plus RedCap variants of both introduced in Release 18. `MCCH-Config-r17` in turn carries the MCCH's repetition period/offset, window start slot and duration, and modification period — all scheduling parameters, no MBS-specific semantics beyond timing. Full ASN.1 for `SIB20-r17` and `MCCH-Config-r17` is in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1**.

### SIB 21 - Service continuity

SIB21 supports service continuity: it lists the MBS Frequency Selection Area Identities (FSAIs), for the current frequency and for neighbouring frequencies, that let a UE find the same broadcast service on other cells or carriers. Its fields are an intra-frequency FSAI list (`mbs-FSAI-IntraFreq-r17`) and a list of per-frequency FSAI lists for neighbouring carriers (`mbs-FSAI-InterFreqList-r17`, each entry pairing a carrier frequency with its own FSAI list). Full ASN.1 in **TS 38.331 Clause 6.3.1**.

## Control Plane Procedures

The control-plane sections below summarise, per protocol layer (RRC, PDCP, RLC, MAC), the TS 38.331 and related procedures a UE follows to acquire and maintain a broadcast MRB. They are reference pointers into the specifications rather than standalone descriptions.

### RRC: MBS Broadcast

#### Acquisition of MBS Broadcast information via MCCH

- Procedures in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9**
  - Acquisition of MCCH: via SIB20, included in SIBTypeInfo in SIB1. MCCH transmission indicated via PDCCH (MCCH-RNTI)
  - Configuration information in MCCH via _MBSBroadcastConfiguration_
- _SIB20_ in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1**: SIB20 contains the information required to acquire the MCCH/MTCH configuration for MBS broadcast. ASN.1 definition in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1**.
- _MBSBroadcastConfiguration_ in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**: The MBSBroadcastConfiguration message contains the control information applicable for MBS broadcast services transmitted via broadcast MRB. ASN.1 definition in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**.
- MBS information elements in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.6**

#### Broadcast MRB configuration

- Procedures in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9.3**
- Broadcast MRB establishment in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9.3.3**
  - Upon a broadcast MRB establishment, the UE shall:
    - establish a PDCP entity and an RLC entity in accordance with MRB-InfoBroadcast for this broadcast MRB included in the MBSBroadcastConfiguration message and the configuration specified in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 9.1.1.7**;
    - configure the MAC layer in accordance with the mtch-SchedulingInfo (if included);
    - configure the physical layer in accordance with the mbs-SessionInfoList, searchSpaceMTCH, and pdsch-ConfigMTCH, applicable for the broadcast MRB;
    - receive DL-SCH on the cell where the MBSBroadcastConfiguration message was received for the established broadcast MRB using g-RNTI and mtch-SchedulingInfo (if included) in this message for this MBS broadcast service;
    - if an SDAP entity with the received mbs-SessionId does not exist:
      - establish an SDAP entity as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) clause 5.1.1**.
      - indicate the establishment of the user plane resources for the mbs-SessionId to upper layers.

- Broadcast MRB release in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9.3.4**
  - Upon broadcast MRB release for MBS broadcast service, the UE shall:
    - release the PDCP entity, RLC entity as well as the related MAC and physical layer configuration;
    - if the SDAP entity associated with the corresponding mbs-SessionId has no associated MRB:
      - release the SDAP entity, as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) clause 5.1.2**;
      - indicate the release of the user plane resources for the mbs-SessionId to upper layers.

#### PDCP: MBS Broadcast

- Procedures in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 5**
  - A PDCP entity associated with MRB can be configured by upper layers **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm)** to use header compression.
  - Protocol data units, formats, and parameters in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 6**
  - State variables, constants, and timers in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 7**

#### RLC: MBS Broadcast

- Procedures in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm)**
  - UM RLC entity in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 4.2.1.2**
  - Variables, constants, and timers in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 7**

#### MAC: MBS Broadcast (Steps 4 and 7)

- **Step 4 (Demodulation of MCCH via PDCCH):** MCCH reading procedure in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Clause 5.3.1** ("DL Assignment reception"): the MAC entity monitors PDCCH occasions carrying a downlink assignment addressed to the MCCH-RNTI (or, on the RRC_INACTIVE multicast case, the Multicast MCCH-RNTI). RNTI value MCCH-RNTI = FFFD in **Table 7.1-1** ("RNTI values"), used specifically for MBS broadcast; the value FFFB (Multicast MCCH-RNTI) in the same table is a separate value used for the RRC_INACTIVE multicast case on the [companion page](./analysis-mbs-multicast-inactive-ran#step-4-demodulation-of-mcch-pdsch-via-pdcch-with-multicast-mcch-rnti--fffb), not this one.
- **Step 7 (Demodulation of MTCH via PDSCH):** same Clause 5.3.1, the broadcast MTCH reading rule: the MAC entity monitors PDCCH occasions carrying a downlink assignment addressed to the G-RNTI configured for broadcast MTCH. G-RNTI's entry ("Dynamically scheduled MBS PTM transmission", DL-SCH, MTCH) in **Table 7.1-1**/**Table 7.1-2**; unlike MCCH-RNTI, G-RNTI is not split into separate broadcast/multicast values.
- Value of LCID for MCCH and broadcast MTCH on DL-SCH in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Table 6.2.1-1c** ("Values of LCID for MBS multicast MCCH and MBS broadcast on DL-SCH" — despite the title, this table's LCID=0 row is shared with multicast MCCH; only LCID 1–32, broadcast MTCH, is broadcast-specific; multicast MTCH's LCID instead comes from the generic Table 6.2.1-1, see the companion page)

#### PHY: MBS Broadcast (Steps 4 and 7)

The MAC-layer rules above rest on a specific physical-layer channel: PDCCH search space sets and a DCI format dedicated to MBS group scheduling, distinct from the DCI formats used for ordinary unicast (1_0/1_1) or uplink grants.

- **PDCCH search space configuration** in **[3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm) Clause 10.1** ("UE procedure for determining physical downlink control channel assignment"): both MCCH and broadcast MTCH are monitored via `searchSpaceMCCH`/`searchSpaceMTCH` (Type0-PDCCH or Type0B-PDCCH CSS sets, `searchSpaceID=0` for the Type0 case), scheduled by a DCI format 4_0 whose CRC is scrambled by MCCH-RNTI or G-RNTI for broadcast.
- **DCI format:** both broadcast MCCH and broadcast MTCH are scheduled with **DCI format 4_0** — not the unicast formats 1_0/1_1. The CRC is scrambled with MCCH-RNTI (for MCCH) or G-RNTI (for MTCH), per the RNTI/LCID split already described above.
- **PDSCH resource allocation** in **[3GPP TS 38.214](https://www.3gpp.org/dynareport/38214.htm) Clause 5.1.2** ("Resource allocation"): for PDSCH scheduled by DCI format 4_0 with CRC scrambled by MCCH-RNTI, the resource-allocation parameters (time-domain allocation, MCS table, overhead, rate-matching) are provided by `pdsch-ConfigMCCH`; for the MTCH case, by `pdsch-ConfigMTCH` — the same fields already named in the `PDSCH-ConfigBroadcast` summary further down this page.

## User Plane Procedures

The user-plane sections below summarise, per protocol layer (SDAP, PDCP), how received broadcast data is handled. As above, they point into the specifications rather than restating them.

### SDAP: MBS Broadcast

- SDAP architecture in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 4.2**
  - The SDAP sublayer is configured for MRBs by RRC, and maps MBS QoS flows to MRBs for DL.
- Data transfer DL in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 5.2.2**
  - At the reception of an SDAP data PDU from lower layers for a QoS flow, the receiving SDAP entity shall:
    - if this SDAP data PDU is received from an MRB, retrieve the SDAP SDU from the DL SDAP data PDU as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 6.2.2.1**
- Data PDU without SDAP header in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 6.2.2.1**

User-plane PDCP handling for MBS Broadcast follows the same procedures as the control-plane PDCP subsection above (**[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm)**); it is not repeated here.

:::note[Verified against primary sources]
Every step of the acquisition path (0–7) has been checked directly against 3GPP specification documents: TS 38.331 (V19.3.0) for RRC and MIB/SIB1, TS 37.324 (V19.0.0) for SDAP, TS 38.321/TS 38.322 (both V19.3.0) for MAC/RLC, TS 38.213/TS 38.214 (both V19.4.0) for the PHY layer (search space configuration, DCI format 4_0, PDSCH resource allocation), and TS 38.323 (V19.1.0) for PDCP, whose Clause 5/6/7 structure (Procedures / PDU formats / state variables) matches exactly what this page cites — every layer on this page is now checked against its current published version. Two corrections were made in the course of this check: SIB20's definition sits in TS 38.331 Clause 6.3.1 ("System information blocks"), not Clause 6.2.2 ("Message definitions") as this page previously stated (Clause 6.2.2 is correct for the MBSBroadcastConfiguration message itself, a distinct RRC message); and Clause 5.3 was refined to the more precise Clause 5.3.1 ("DL Assignment reception") for the MAC-layer MCCH/MTCH reading rules. Table 6.2.1-1c's title is "Values of LCID for MBS multicast MCCH and MBS broadcast on DL-SCH" — it is shared with the multicast-inactive case for the MCCH row (LCID 0) but broadcast-only for MTCH (LCID 1–32); see the [multicast-inactive page](./analysis-mbs-multicast-inactive-ran) for the important related finding that multicast uses its own Multicast MCCH-RNTI (FFFB), distinct from this page's MCCH-RNTI (FFFD).
:::

---

### Other RRC Messages

The structures below are the supporting configuration IEs referenced above. `CFR-ConfigMCCH-MTCH` defines the common frequency resource (location and bandwidth) used to carry MCCH and MTCH: a location/bandwidth field (either "same as SIB1" or an explicit resource-block range), the PDSCH configuration for MCCH, and an optional CORESET extension. Full ASN.1 in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1**.

`PDSCH-ConfigBroadcast` defines the physical downlink shared channel configuration used for the broadcast (PTM) transmission: a list of per-transmission PDSCH configs (each carrying scrambling identities and an aggregation factor), plus shared fields for time-domain allocation, rate-matching patterns, MCS table selection and PDSCH overhead. Full ASN.1 in **TS 38.331 Clause 6.3.1**.

## MBSBroadcastConfiguration

The `MBSBroadcastConfiguration` message is the broadcast configuration carried on the MCCH. Its content (in the `MBSBroadcastConfiguration-r17-IEs` branch) lists the sessions available (`mbs-SessionInfoList-r17`), neighbour-cell information, MTCH DRX and PDSCH configuration lists, and MTCH-to-SSB mapping windows. Full ASN.1 in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**.

The `MBS-SessionInfoList` referenced above is the per-session detail: for each broadcast session it gives the session identity (`mbs-SessionId-r17`, a TMGI), the G-RNTI used to address it (`g-RNTI-r17`), the radio bearer configuration (`mrb-ListBroadcast-r17`), and optional MTCH scheduling/neighbour-cell/PDSCH-index/SSB-mapping fields. Each entry in the MRB list (`MRB-InfoBroadcast-r17`) in turn carries a PDCP config (SN size, header compression, reordering timer) and an RLC config (logical channel identity, sequence-number field length, reassembly timer). Full ASN.1 for `MBS-SessionInfoList-r17`, `MBS-SessionInfo-r17`, `MRB-InfoBroadcast-r17` and its PDCP/RLC config sub-types is in **TS 38.331 Clause 6.3.6**.
