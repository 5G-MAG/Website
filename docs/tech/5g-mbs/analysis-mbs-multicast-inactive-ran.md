---
title: MBS Multicast Inactive - RAN Procedures
sidebar_position: 6
hide_title: true
description: Analyses the Release 18 RAN procedure letting a UE receive MBS multicast in RRC_INACTIVE via SIB24 and MBSMulticastConfiguration.
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

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Analysis of RAN procedures for MBS Multicast Inactive

This page analyses the 3GPP Release 18 extension that lets a UE receive MBS multicast while in the RRC_INACTIVE state. In Release 17, multicast reception (delivery mode 1) required RRC_Connected, as summarised on the [RAN Aspects](./ran-aspects) page; the Release 18 work adds a way to receive multicast in RRC_INACTIVE, using dedicated signalling (SIB24 and the multicast MCCH) rather than the broadcast signalling used for delivery mode 2. When reading the RAN Aspects page alongside this one, note that this is the Release 18 extension to the RRC-state rules stated there.

:::note[About the field summaries on this page]
This page describes 3GPP-defined information elements by field name and purpose rather than reproducing their ASN.1 definitions in full — the structures themselves, exact field types, optionality conditions and encoding are 3GPP's copyrighted text. Every summary below is cited to the exact TS 38.331 clause that carries the authoritative definition; consult that clause directly for anything you need to implement against.
:::

The step sequence below (numbered 0 to 7) is the acquisition path for multicast reception in RRC_INACTIVE. The channels involved are the same as on the broadcast page (MIB, SIB, MCCH, MTCH, PDCCH, PDSCH), and G-RNTI is shared between the two cases, but the multicast-inactive case uses SIB24, the multicast MCCH carrying `MBSMulticastConfiguration`, and — importantly — its own **Multicast MCCH-RNTI (FFFB)**, a distinct value from the broadcast MCCH-RNTI (FFFD); see Step 4.

- 0. Acquiring PLMN and RAN Information
- 1. Obtain MIB
- 2. Obtain SIB1 (points to SIB24)
- 3. SIB24 contains configuration of MCCH
- 4. Demodulation of MCCH (PDSCH) via PDCCH (with Multicast MCCH-RNTI = FFFB)
- 5. MCCH contains MBSMulticastConfiguration
- 6. Obtain configuration of MTCH within MBSMulticastConfiguration
- 7. Demodulation of MTCH (PDSCH) with G-RNTI

Why this matters: in Release 17 a UE receiving multicast (delivery mode 1) has to stay in RRC_CONNECTED, which keeps the UE and the network in a higher-power, higher-signalling state even when the UE is only listening. The Release 18 extension lets a multicast UE drop to RRC_INACTIVE and keep receiving, saving UE battery and network resources for large, mostly-passive multicast audiences. The mechanism mirrors the broadcast acquisition chain (a SIB points to an MCCH that carries a configuration message listing sessions, G-RNTIs and MTCH scheduling), but it uses multicast-specific structures so that reception stays tied to session membership: a dedicated SIB (SIB24) points to a multicast MCCH carrying `MBSMulticastConfiguration`, and that configuration adds RSRP/RSRQ thresholds (`thresholdMBS-List`) that govern when an inactive UE should move back to connected mode, for example to receive over PTP when its channel degrades.

This page covers the RAN side (TS 38.331 Clause 5.10). The 5G Core side of the same feature is defined in **[3GPP TS 23.247](https://www.3gpp.org/dynareport/23247.htm) Clause 6.17** ("Support of Multicast MBS session data reception in UE with RRC_INACTIVE state"), which confirms a joined UE may be "in CM-CONNECTED with RRC_INACTIVE state" while the Multicast MBS session is in its Active state (TS 23.247 Clause 4.3, Multicast session state model) — see [Service and System Aspects](./mbs-service-system-aspects) for the Core-side session states.

## Implementation blueprint

This page is a verified map of the acquisition path, not a self-contained implementation spec: it gives correct clause/table/RNTI/LCID pointers and field-level summaries, but a conformant implementation needs the full primary-source text (including the exact ASN.1) behind each pointer. Fetch these before implementing a given step. See the [Implementation Blueprints index](/tech/blueprints) for the other blueprints published on this portal.

| Step | Layer(s) | This page provides | Fetch in full before implementing |
| --- | --- | --- | --- |
| 0. PLMN/RAN info | NAS / configuration | Pre-configuration field list (DNN/S-NSSAI pair) | **TS 24.575** (full MO definition), **TS 23.247** (MBS architecture), **TS 24.501** (DNN/S-NSSAI usage) |
| 1. Obtain MIB | RRC (Layer 3), PHY | Identical to broadcast — not repeated | [Broadcast page: Step 1 blueprint row](./analysis-mbs-broadcast-ran#implementation-blueprint) |
| 2. Obtain SIB1 | RRC (Layer 3), PHY | `si-SchedulingInfo` pointer mechanism, `sibType24` value only | [Broadcast page: Step 2 blueprint row](./analysis-mbs-broadcast-ran#implementation-blueprint) for the shared mechanism; **TS 38.331** Clause 6.2.2 for the complete SIB1 message |
| 3. SIB24 → MCCH config | RRC | SIB24/`MCCH-Config`/`CFR-ConfigMCCH-MTCH` field summary | **TS 38.331** Clause 6.3.1 for the full ASN.1 and any further-referenced IEs not expanded here |
| 4. Demodulate MCCH via PDCCH | MAC, PHY | **Distinct** RNTI value (Multicast MCCH-RNTI = FFFB, Table 7.1-1), shared LCID (Table 6.2.1-1c), search space and **DCI format 4_0** — same format as broadcast MCCH (TS 38.213 Clause 10.1, verified) | **TS 38.213** Clause 10.1 in full for the complete CORESET/Search Space Set configuration beyond the MCCH-specific summary on this page |
| 5. MCCH → `MBSMulticastConfiguration` | RRC | Field summary of the message | **TS 38.331** Clause 5.10.1 and 5.10.2 for the complete UE procedure text, and Clause 6.2.2 for the full ASN.1 (this page summarises the MRB establishment/release actions only) |
| 6. MTCH config + G-RNTI via `MBS-SessionInfoListMulticast` | RRC | Field summary of the IE | Same as step 5, plus Clause 6.3.6 for the full ASN.1 |
| 7. Demodulate MTCH via PDSCH | MAC, PHY | Shared G-RNTI table entry; **distinct** LCID source (generic Table 6.2.1-1); **distinct DCI format 4_1** — unlike Step 4, this genuinely differs from broadcast's 4_0 (TS 38.213/38.214, verified) | **TS 38.321** Clause 5.3.1/5.3.2 in full (Clause 5.3.1 names "G-RNTI configured for multicast MTCH" directly — a citable sentence, not an inference); **TS 38.214** Clause 5.1.2 in full |
| PDCP (all steps) | PDCP | Cross-referenced to broadcast page, identical | **TS 38.323** Clause 5, 6 and 7 in full |
| RLC (all steps) | RLC | Confirmed identical to broadcast (verified: no multicast-specific RLC content exists) | **TS 38.322** Clause 4.2.1.2 and 7 in full |
| SDAP (user plane) | SDAP | Cross-referenced to broadcast page, identical | **TS 37.324** Clause 4.2, 5.1.1, 5.1.2, 5.2.2, 6.2.2.1 in full |
| ASN.1 grammar (all steps) | — | Field names and purposes only, not full type definitions | **TS 38.331** Clause 6.2 (RRC messages) and Clause 6.3 (RRC information elements) in full, for the authoritative ASN.1 of every message/IE named on this page, encoded per Clause 8 (Unaligned Packed Encoding Rules) |

See the [MBS Broadcast RAN procedures](./analysis-mbs-broadcast-ran) page for the delivery-mode-2 equivalent — the two diverge at Step 4 (a distinct Multicast MCCH-RNTI) and Step 7 (a different LCID table for MTCH).

## Acquiring PLMN and RAN Information

For information on the MBS Broadcast Pre-Configuration Management Object (MO) refer to **[3GPP TS 24.575](https://www.3gpp.org/dynareport/24575.htm)**.

A UE can support MBS to deliver content from a single source entity to users in a multicast group (MBS
multicast communication), as defined in 3GPP [TS 23.247](https://www.3gpp.org/dynareport/23247.htm). The UE may support pre-configuration of information for MBS services, containing a list of PLMNs; if pre-configured this way, the UE can discover and receive service data using the provisioned configuration.
For each PLMN, the following information is included:

- PLMN ID of the PLMN for which the configuration applies;
- default DNN and S-NSSAI pair for PDU sessions that can be used to join MBS multicast sessions (as specified
  in 3GPP [TS 24.501](https://www.3gpp.org/dynareport/24501.htm)) for which no other information is available.

## Obtention of MIB/SIB signaling

For definitions refer to **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1** (System information blocks)

### Step 1: Obtain MIB

This step is identical to the broadcast case: the UE camps on the cell (cell search via the SSB) and decodes the MIB, scheduled once per SSB period as specified in **[3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm)**. The MIB is generic to NR, not multicast-specific; see [MBS Broadcast RAN procedures: Step 1](./analysis-mbs-broadcast-ran#step-1-obtain-mib) for the field summary and clause references (**Clause 6.2.2** for the message definition, **Clause 5.2.2.3.1**/**5.2.2.4.1** for the acquisition procedure and UE actions on reception). It is not repeated here.

### Step 2: Obtain SIB1 (points to SIB24)

Also identical in mechanism to the broadcast case, with one difference in the value used: SIB1's `si-SchedulingInfo` field points the UE to whichever SIBs the cell broadcasts, via a `SIB-TypeInfo-v1700` entry whose `sibType-r17` field is a CHOICE, one branch of which (`type1-r17`) is an enumerated set of SIB types. For a cell offering MBS multicast reception in RRC_INACTIVE, that entry's value is `sibType24-v1800` rather than the plain `sibType20`. See [MBS Broadcast RAN procedures: Step 2](./analysis-mbs-broadcast-ran#step-2-obtain-sib1-points-to-sib20) for the full `SI-SchedulingInfo`/`SIB-TypeInfo` field summary (**[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.2**) and the SIB1 message definition (**Clause 6.2.2**) and acquisition procedure (**Clause 5.2.2.3.1**/**5.2.2.4.2**); it is not repeated here.

### Step 3: SIB24 - Acquisition MCCH/MTCH for MBS multicast reception in RRC_INACTIVE

SIB24 contains the information required to acquire the multicast MCCH/MTCH configuration for MBS multicast reception in RRC_INACTIVE. Its structure mirrors SIB20 from the broadcast page: a scheduling field (`multicastMCCH-Config-r18`, of the same `MCCH-Config-r17` type used for broadcast) and a common frequency resource field (`cfr-ConfigMCCH-MTCH-r18`, of the same `CFR-ConfigMCCH-MTCH-r17` type). Full ASN.1 for `SIB24-r18` is in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.1**.

### Step 4: Demodulation of MCCH (PDSCH) via PDCCH (with Multicast MCCH-RNTI = FFFB)

Once SIB24 gives the multicast MCCH's scheduling (`multicastMCCH-Config-r18`) and physical-layer resource (`cfr-ConfigMCCH-MTCH-r18`), the UE monitors PDCCH to find and decode the multicast MCCH on the PDSCH. **This uses a different RNTI value from the broadcast case**: TS 38.321 defines a separate **Multicast MCCH-RNTI = FFFB**, distinct from the broadcast MCCH-RNTI (FFFD) — the two are not the same value, despite both addressing an MCCH. **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Clause 5.3.1** ("DL Assignment reception") treats the two RNTIs as alternative triggers of the same MCCH-reading rule.

- RNTI value Multicast MCCH-RNTI = FFFB in **Table 7.1-1** ("RNTI values"), listed there as "Dynamically scheduled MCCH signalling and MCCH change notification for MBS multicast in RRC_INACTIVE" (Table 7.1-2, "RNTI usage") — separate from the broadcast entry (MCCH-RNTI = FFFD, "[...] for MBS broadcast")
- Value of LCID for the decoded MCCH in **Table 6.2.1-1c** ("Values of LCID for MBS multicast MCCH and MBS broadcast on DL-SCH"): LCID = 0 is shared, listed as "Broadcast MCCH or multicast MCCH" — once the PDCCH/RNTI has told the UE which MCCH it is, both broadcast and multicast MCCH use the same LCID on DL-SCH

### Step 5: RRC - MulticastMCCH-Message

`MulticastMCCH-Message` is the multicast-specific RRC message class that carries the `MBSMulticastConfiguration` used for RRC_INACTIVE multicast reception (the broadcast page uses `MBSBroadcastConfiguration` instead). It follows the standard `c1`/`messageClassExtension` CHOICE pattern shared by every RRC message class (BCCH, PCCH, CCCH, DCCH), with `mbsMulticastConfiguration-r18` as its one payload option. `MulticastMCCH-Message` is defined in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.1** (General message structure); `MBSMulticastConfiguration` itself is defined in **Clause 6.2.2** (Message definitions).

`MBSMulticastConfiguration` (in its `MBSMulticastConfiguration-r18-IEs` branch) carries: the per-session list (`mbs-SessionInfoListMulticast-r18`, detailed under Step 6), a neighbour-cell list, DRX and PDSCH configuration lists for MTCH, an MTCH-to-SSB mapping window list, and — the one field genuinely new relative to the broadcast configuration — `thresholdMBS-List-r18`, a list of RSRP/RSRQ threshold pairs used to decide when an inactive UE should move back to connected mode. Full ASN.1 for `MulticastMCCH-Message-r18` and `MBSMulticastConfiguration-r18` is in **TS 38.331 Clause 6.2.1 and 6.2.2**.

### Step 6: MTCH configuration and G-RNTI via mbs-SessionInfoListMulticast

`mbs-SessionInfoListMulticast`, referenced above in `MBSMulticastConfiguration-r18-IEs`, is the per-session detail the UE needs to actually receive each multicast session: the session identity (TMGI), the G-RNTI used to address it on the physical layer, the MRB configuration, and the MTCH scheduling information. It is the multicast-inactive counterpart of the broadcast page's `MBS-SessionInfoList`, defined in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.6** (MBS information elements) — the same clause as the broadcast structure. Two differences from the broadcast case are worth noting: `thresholdIndex-r18` links each session to one of the RSRP/RSRQ thresholds in `thresholdMBS-List` (Step 5's `MBSMulticastConfiguration`), and the RLC bearer config (`MRB-RLC-ConfigMulticast-r18`) carries its logical channel identity as a CHOICE between `logicalChannelIdentitymulticast-r18` and `logicalChannelIdentityExt-r18` (typed `LogicalChannelIdentityExt-r17`) — the multicast branch itself is still the plain `LogicalChannelIdentity` type broadcast uses, so what differs from broadcast is not this field's type but which LCID table governs it (Step 6 below). Each MRB entry (`MRB-InfoMulticast-r18`) otherwise carries the same kind of PDCP config (SN size, header compression, reordering timer) and RLC config (sequence-number field length, reassembly timer) as the broadcast structure. Full ASN.1 for `MBS-SessionInfoListMulticast-r18`, `MBS-SessionInfoMulticast-r18`, `MRB-InfoMulticast-r18` and its PDCP/RLC config sub-types is in **TS 38.331 Clause 6.3.6**.

### Step 7: Demodulation of MTCH (PDSCH) with G-RNTI

The session's `g-RNTI` field is what the UE uses to address the physical-layer scheduling for this session's MTCH. Unlike MCCH, **G-RNTI is not split into separate broadcast/multicast values**: TS 38.321 Table 7.1-1 lists a single G-RNTI entry ("Dynamically scheduled MBS PTM transmission", DL-SCH, MTCH) that serves both cases, matching the mechanism on the broadcast page (same RNTI type, values assigned per session by the network either way). **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Clause 5.3.1** states both cases explicitly: alongside "the G-RNTI configured for broadcast MTCH", the same clause's downlink-assignment-reception and HARQ NDI-toggling text names "G-RNTI configured for multicast MTCH" directly — a directly citable MAC-layer sentence, not an inference from the shared Table 7.1-1 G-RNTI entry.

Where multicast MTCH **does** differ from broadcast at the MAC layer is its logical channel identity: **Table 6.2.1-1c** (the same table used for Step 4's MCCH) only covers *broadcast* MTCH (LCID 1–32, labelled "Identity of the logical channel of broadcast MTCH"); multicast MTCH's LCID instead comes from the generic **Table 6.2.1-1** ("Values of LCID for DL-SCH"), whose LCID 1–32 row is labelled "Identity of the logical channel of DCCH, DTCH **and multicast MTCH**" — the same range used for ordinary dedicated control/traffic channels. This matches the RRC-layer finding in Step 6: the multicast MRB's `logicalChannelIdentitymulticast-r18` is the plain `LogicalChannelIdentity` type, not a broadcast-MTCH-specific one.

The PDSCH configuration itself is carried by `pdsch-ConfigMTCH-r18` (of the same `PDSCH-ConfigBroadcast-r17` type shown on the [broadcast RAN procedures page](./analysis-mbs-broadcast-ran)) and selected per-session via `pdsch-ConfigIndex-r18`.

## Control Plane Procedures

### RRC: MBS Multicast Reception in RRC_INACTIVE

The whole multicast-inactive procedure is grouped under a single clause in TS 38.331, **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.10** ("MBS multicast reception in RRC_INACTIVE"), split into three sub-clauses:

- **Clause 5.10.1** (Introduction): general behaviour, multicast MCCH scheduling, and how the UE is notified of MCCH information changes.
- **Clause 5.10.2** (Multicast MCCH information acquisition): initiation of acquisition, the acquisition procedure itself, and the UE actions on receiving the `MBSMulticastConfiguration` message.
- **Clause 5.10.3** (MRB configuration): multicast MRB establishment and release, given below.

#### Multicast MRB configuration

- Multicast MRB establishment in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.10.3.2**
  - Upon multicast MRB establishment, the UE shall:
    - establish a PDCP entity and an RLC entity in accordance with `mrb-ListMulticast` for this multicast MRB included in the `MBSMulticastConfiguration` message;
    - configure the MAC layer in accordance with the `mtch-SchedulingInfo` (if included);
    - configure the physical layer in accordance with the `mbs-SessionInfoListMulticast`, `searchSpaceMulticastMTCH`, and `pdsch-ConfigMTCH`, applicable for the multicast MRB;
    - if an SDAP entity with the received `mbs-SessionId` does not exist:
      - establish an SDAP entity as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 5.1.1**;
      - indicate the establishment of the user plane resources for the `mbs-SessionId` to upper layers;
    - receive DL-SCH for the established multicast MRB using G-RNTI (if not indicated to stop monitoring this G-RNTI) and `mtch-SchedulingInfo` (if included) in this message for this MBS multicast service.

- Multicast MRB release in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.10.3.3**
  - Upon multicast MRB release, the UE shall:
    - release the PDCP entity, RLC entity as well as the related MAC and physical layer configuration;
    - if the SDAP entity associated with the corresponding `mbs-SessionId` has no associated MRB:
      - release the SDAP entity, as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 5.1.2**;
      - indicate the release of the user plane resources for the `mbs-SessionId` to upper layers.

This is structurally identical to broadcast MRB establishment/release on the [MBS Broadcast RAN procedures](./analysis-mbs-broadcast-ran) page (same actions, same TS 37.324 SDAP clauses); only the configuration IE names differ (`mrb-ListMulticast` vs the broadcast MRB list, `MBSMulticastConfiguration` vs `MBSBroadcastConfiguration`).

#### PDCP: MBS Multicast Reception in RRC_INACTIVE

Mostly identical to the broadcast case: PDCP procedures in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 5**, protocol data units/formats/parameters in **Clause 6**. Not repeated here — see the [broadcast RAN procedures page: PDCP](./analysis-mbs-broadcast-ran#pdcp-mbs-broadcast). One exception in **Clause 7** (state variables): a multicast MRB whose PDCP COUNT is *not* synchronized within the RNA bootstraps `RX_NEXT`/`RX_DELIV` from the first received PDU's SN, same as broadcast — but once the UE has a multicast MRB whose COUNT *is* RNA-synchronized (the mobility concept in TS 38.331 Clause 5.10.3.1), `RX_DELIV` instead comes from an RRC-signalled `initialRX-DELIV` value with no broadcast counterpart, since broadcast MRBs are cell-specific rather than per-UE/RNA-tracked.

#### RLC: MBS Multicast Reception in RRC_INACTIVE

RLC does not distinguish broadcast from multicast at all: TS 38.322 mentions "multicast" exactly once in the whole specification (in the abbreviations list, for "MBS"), with no multicast-specific bearer, entity, or procedure text anywhere in the document. The broadcast page's RLC citations therefore apply identically and unconditionally to the multicast MRB, unlike MAC (Step 4) where a distinct RNTI exists:

- UM RLC entity in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 4.2.1.2**
- Variables, constants, and timers in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 7**

#### MAC: MBS Multicast Reception in RRC_INACTIVE (Steps 4 and 7)

See Step 4 and Step 7 above for the full detail (Multicast MCCH-RNTI = FFFB, shared MCCH LCID via Table 6.2.1-1c, and multicast MTCH's LCID via the generic Table 6.2.1-1 rather than Table 6.2.1-1c). In summary:

- RNTI values in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Table 7.1-1**: Multicast MCCH-RNTI = FFFB (distinct from broadcast's MCCH-RNTI = FFFD); G-RNTI shared with broadcast (no separate multicast value)
- MCCH LCID in **Table 6.2.1-1c** (LCID = 0, shared with broadcast MCCH); multicast MTCH LCID in the generic **Table 6.2.1-1** (LCID 1–32, shared with DCCH/DTCH — not Table 6.2.1-1c, which only covers broadcast MTCH)
- MCCH/MTCH reading procedure in **Clause 5.3.1** ("DL Assignment reception")

#### PHY: MBS Multicast Reception in RRC_INACTIVE (Steps 4 and 7)

Checked against TS 38.213/TS 38.214 (both V19.4.0): the physical layer distinguishes the multicast-inactive case from broadcast not just by RNTI (Step 4) but by **DCI format** — and the split is different between MCCH and MTCH, which is easy to get wrong.

- **MCCH (Step 4):** uses the same **DCI format 4_0** as broadcast MCCH, just with the CRC scrambled by Multicast MCCH-RNTI instead of MCCH-RNTI. Search space in **[3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm) Clause 10.1**: `searchspaceMulticastMCCH` (Type0/Type0B-PDCCH CSS set), DCI format 4_0, CRC scrambled by Multicast MCCH-RNTI.
- **MTCH (Step 7):** uses a **different DCI format from broadcast** — **DCI format 4_1** (not 4_0), CRC scrambled by G-RNTI for multicast in RRC_INACTIVE, via `searchSpaceMulticastMTCH` (same clause). This is a genuine divergence from the broadcast page, where both MCCH and MTCH share DCI format 4_0.
- **PDSCH resource allocation** in **[3GPP TS 38.214](https://www.3gpp.org/dynareport/38214.htm) Clause 5.1.2**: for the MCCH case (DCI format 4_0, CRC scrambled by Multicast MCCH-RNTI), the resource-allocation parameters are provided by `pdsch-ConfigMCCH`; the MTCH/DCI-4_1 case instead uses `pdsch-ConfigMTCH-r18` if configured, falling back to `pdsch-ConfigMCCH` otherwise (Clause 5.1). `pdsch-ConfigMulticast` is a separate field governing the Release 17 RRC_CONNECTED multicast case, not this RRC_INACTIVE one.
- **DCI format 4_1 vs. 4_2, resolved:** TS 38.214 also mentions **DCI format 4_2** alongside 4_1 for G-RNTI-scheduled multicast — the split follows the HARQ-ACK feedback path, not the delivery mode directly. TS 38.213 ties DCI format 4_2 specifically to `pucch-ConfigMulticast1` — PUCCH-based HARQ-ACK feedback, which only exists in RRC_CONNECTED. DCI format 4_1, by contrast, is the format explicitly named for `searchSpaceMulticastMTCH` in RRC_INACTIVE state (Clause 10.1, already cited above), and is also the format used generally for multicast SPS PDSCH release regardless of RRC state. So: **DCI format 4_1** is this page's format (no PUCCH feedback exists in RRC_INACTIVE); **DCI format 4_2** belongs to the Release 17 RRC_CONNECTED multicast case, not this one. TS 38.212 (V18.8.0), which formally defines DCI field contents, confirms this from the format-definition side: Clause 7.3.1.5.2 states format 4_1 "is used for the scheduling of PDSCH for multicast in DL cell", and Clause 7.3.1.5.3 ties format 4_2 to `pucch-ConfigMulticast1`/`pucch-ConfigMulticast2` — matching the procedural-text conclusion above.

## User Plane Procedures

PDCP and SDAP handling of multicast-inactive traffic follow the same procedures as the broadcast case, documented in the [MBS Broadcast RAN procedures: User Plane Procedures](./analysis-mbs-broadcast-ran#user-plane-procedures) section (TS 38.323 for PDCP, TS 37.324 Clause 4.2/5.2.2/6.2.2.1 for SDAP); it is not repeated here.

:::note[Verified against primary sources]
Every step of the acquisition path (0–7) has now been checked directly against 3GPP specification documents: TS 38.331 (V19.3.0) for RRC, TS 37.324 (V19.0.0) for SDAP, TS 38.321/TS 38.322 (both V19.3.0) for MAC/RLC, TS 38.213/TS 38.214 (both V19.4.0) for the PHY layer, and TS 38.323 (V19.1.0) for PDCP — every layer on this page is now checked against its current published version. The multicast-inactive case uses its own **Multicast MCCH-RNTI (FFFB)**, distinct from the broadcast MCCH-RNTI (FFFD) — TS 38.321 defines the two as separate values in Table 7.1-1, even though they share the same MCCH LCID (0) once decoded. At the PHY layer: multicast-inactive **MCCH** shares broadcast's DCI format 4_0 (only the RNTI differs), but multicast-inactive **MTCH** uses a genuinely different DCI format, 4_1, not shared with broadcast MTCH's 4_0. RLC (TS 38.322) has no multicast-specific content at all and applies identically to broadcast. TS 38.321 Clause 5.3.1 names both cases explicitly at the MAC layer: alongside the broadcast MTCH reading rule ("the G-RNTI configured for broadcast MTCH"), the same clause's downlink-assignment-reception and HARQ NDI-toggling text names "G-RNTI configured for multicast MTCH" directly — so this is a directly citable MAC-layer sentence, not an inference from the shared Table 7.1-1 G-RNTI entry. TS 38.212 Clause 7.3.1.5.2/7.3.1.5.3 (V18.8.0) independently confirms the DCI format 4_1/4_2 split from the format-definition side: format 4_1 is used "for the scheduling of PDSCH for multicast" generally, including RRC_INACTIVE, while format 4_2 is tied to `pucch-ConfigMulticast1`/`pucch-ConfigMulticast2` — the RRC_CONNECTED PUCCH-feedback case — matching the procedural-text conclusion already reached from TS 38.213.
:::

## Related

- [5G Multicast Broadcast Services (MBS)](/tech/5g-mbs): the parent topic page
- [Standards: 5G Multicast Broadcast Services (MBS)](/standards/5g-mbs): the specification list for this topic
- [5G Multicast Broadcast Services (MBS) Reference Tools](/reference-tools/5g-mbs): the software implementation
