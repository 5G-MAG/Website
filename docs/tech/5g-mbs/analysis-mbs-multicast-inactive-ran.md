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

The step sequence below (numbered 0 to 7) is the acquisition path for multicast reception in RRC_INACTIVE. The channels involved are the same as on the broadcast page (MIB, SIB, MCCH, MTCH, PDCCH, PDSCH), and G-RNTI is shared between the two cases, but the multicast-inactive case uses SIB24, the multicast MCCH carrying `MBSMulticastConfiguration`, and — importantly — its own **Multicast MCCH-RNTI (FFFB)**, a distinct value from the broadcast MCCH-RNTI (FFFD); see Step 4.

- 0. Acquiring PLMN and RAN Information
- 1. Obtain MIB
- 2. Obtain SIB1 (points to SIB24)
- 3. SIB24 contains configuration of MCCH
- 4. Demodulation of MCCH (PDSCH) via PDCCH (with Multicast MCCH-RNTI = FFFB)
- 5. MCCH contains MBSMulticastConfiguration
- 6. Obtain configuration of MTCH within MBSMulticastConfiguration
- 7. Demodulation of MTCH (PDSCH) with G-RNTI

Why this matters: in Release 17 a UE receiving multicast (delivery mode 1) has to stay in RRC_CONNECTED, which keeps the UE and the network in a higher-power, higher-signalling state even when the UE is only listening. The Release 18 extension lets a multicast UE drop to RRC_INACTIVE and keep receiving, saving UE battery and network resources for large, mostly-passive multicast audiences. The mechanism mirrors the broadcast acquisition chain (a SIB points to an MCCH that carries a configuration message listing sessions, G-RNTIs and MTCH scheduling), but it uses multicast-specific structures so that reception stays tied to session membership: a dedicated SIB (SIB24) points to a multicast MCCH carrying `MBSMulticastConfiguration`, and that configuration adds RSRP/RSRQ thresholds (`thresholdMBS-List`) that govern when an inactive UE should move back to connected mode, for example to receive over PTP when its channel degrades. The `MBSMulticastConfiguration` ASN.1 shown later on this page is the multicast-specific structure.

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

This step is identical to the broadcast case: the UE camps on the cell (cell search via the SSB) and decodes the MIB, scheduled once per SSB period as specified in **[3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm)**. The MIB is generic to NR, not multicast-specific; see [MBS Broadcast RAN procedures: Step 1](./analysis-mbs-broadcast-ran#step-1-obtain-mib) for the full ASN.1 and clause references (**Clause 6.2.2** for the message definition, **Clause 5.2.2.3.1**/**5.2.2.4.1** for the acquisition procedure and UE actions on reception). It is not repeated here.

### Step 2: Obtain SIB1 (points to SIB24)

Also identical in mechanism to the broadcast case, with one difference in the value used: SIB1's `si-SchedulingInfo` field points the UE to whichever SIBs the cell broadcasts, via a `SIB-TypeInfo-v1700` entry whose `type` field is one of an enumerated set of SIB types. For a cell offering MBS multicast reception in RRC_INACTIVE, that entry's value is `sibType24` rather than `sibType20`. See [MBS Broadcast RAN procedures: Step 2](./analysis-mbs-broadcast-ran#step-2-obtain-sib1-points-to-sib20) for the full `SI-SchedulingInfo`/`SIB-TypeInfo` ASN.1 (**[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.2**) and the SIB1 message definition (**Clause 6.2.2**) and acquisition procedure (**Clause 5.2.2.3.1**/**5.2.2.4.2**); it is not repeated here.

### Step 3: SIB24 - Acquisition MCCH/MTCH for MBS multicast reception in RRC_INACTIVE

SIB24 contains the information required to acquire the multicast MCCH/MTCH configuration for MBS multicast reception in RRC_INACTIVE.

```
-- ASN1START
-- TAG-SIB24-START
SIB24-r18 ::= SEQUENCE {
 multicastMCCH-Config-r18 MCCH-Config-r17 OPTIONAL, -- Need S
 cfr-ConfigMCCH-MTCH-r18 CFR-ConfigMCCH-MTCH-r17 OPTIONAL, -- Need S
 lateNonCriticalExtension OCTET STRING OPTIONAL,
 ...
}
-- TAG-SIB24-STOP
-- ASN1STOP
```

### Step 4: Demodulation of MCCH (PDSCH) via PDCCH (with Multicast MCCH-RNTI = FFFB)

Once SIB24 gives the multicast MCCH's scheduling (`multicastMCCH-Config-r18`) and physical-layer resource (`cfr-ConfigMCCH-MTCH-r18`), the UE monitors PDCCH to find and decode the multicast MCCH on the PDSCH. **This uses a different RNTI value from the broadcast case**: TS 38.321 defines a separate **Multicast MCCH-RNTI = FFFB**, distinct from the broadcast MCCH-RNTI (FFFD) — the two are not the same value, despite both addressing an MCCH. The MAC procedure text treats them as alternatives of the same rule: **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Clause 5.3.1** ("DL Assignment reception") states "When the MAC entity needs to read MCCH, the MAC entity may, based on the scheduling information from RRC: if a downlink assignment for this PDCCH occasion has been received on the PDCCH for the **MCCH-RNTI or Multicast MCCH-RNTI** [...]".

- RNTI value Multicast MCCH-RNTI = FFFB in **Table 7.1-1** ("RNTI values"), listed there as "Dynamically scheduled MCCH signalling and MCCH change notification for MBS multicast in RRC_INACTIVE" (Table 7.1-2, "RNTI usage") — separate from the broadcast entry (MCCH-RNTI = FFFD, "[...] for MBS broadcast")
- Value of LCID for the decoded MCCH in **Table 6.2.1-1c** ("Values of LCID for MBS multicast MCCH and MBS broadcast on DL-SCH"): LCID = 0 is shared, listed as "Broadcast MCCH or multicast MCCH" — once the PDCCH/RNTI has told the UE which MCCH it is, both broadcast and multicast MCCH use the same LCID on DL-SCH

### Step 5: RRC - MulticastMCCH-Message

The block below is multicast-specific: it defines the multicast MCCH message that carries the `MBSMulticastConfiguration` used for RRC_INACTIVE multicast reception (the broadcast page uses `MBSBroadcastConfiguration` instead). `MulticastMCCH-Message` is defined in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.1** (General message structure), alongside the other RRC message classes (BCCH, PCCH, CCCH, DCCH); `MBSMulticastConfiguration` itself is defined in **Clause 6.2.2** (Message definitions).

```
-- ASN1START
-- TAG-MULTICASTMCCH-MESSAGE-START
MulticastMCCH-Message-r18 ::= SEQUENCE {
 message MulticastMCCH-MessageType-r18
}
MulticastMCCH-MessageType-r18 ::= CHOICE {
 c1 CHOICE {
 mbsMulticastConfiguration-r18 MBSMulticastConfiguration-r18,
 spare1 NULL
 },
 messageClassExtension SEQUENCE {}
}
-- TAG-MULTICASTMCCH-MESSAGE-STOP
-- ASN1STOP
```

The `MBSMulticastConfiguration` block below is also multicast-specific. Compared with the broadcast configuration it adds `thresholdMBS-List` (RSRP/RSRQ thresholds used in the multicast-inactive case), while reusing several broadcast structures (for example `PDSCH-ConfigBroadcast` and the neighbour-cell list).

```
-- ASN1START
-- TAG-MBSMULTICASTCONFIGURATION-START
MBSMulticastConfiguration-r18 ::= SEQUENCE {
 criticalExtensions CHOICE {
 mbsMulticastConfiguration-r18 MBSMulticastConfiguration-r18-IEs,
 criticalExtensionsFuture SEQUENCE {}
 }
}
MBSMulticastConfiguration-r18-IEs ::= SEQUENCE {
 mbs-SessionInfoListMulticast-r18 MBS-SessionInfoListMulticast-r18 OPTIONAL, -- Need R
 mbs-NeighbourCellList-r18 MBS-NeighbourCellList-r17 OPTIONAL, -- Need S
 drx-ConfigPTM-List-r18 SEQUENCE (SIZE (1..maxNrofDRX-ConfigPTM-r17)) OF DRX-ConfigPTM-r17 OPTIONAL, -- Need R
 pdsch-ConfigMTCH-r18 PDSCH-ConfigBroadcast-r17 OPTIONAL, -- Need S
 mtch-SSB-MappingWindowList-r18 MTCH-SSB-MappingWindowList-r17 OPTIONAL, -- Need R
 thresholdMBS-List-r18 SEQUENCE (SIZE (1..maxNrofThresholdMBS-r18)) OF ThresholdMBS-r18 OPTIONAL, -- Need R
 lateNonCriticalExtension OCTET STRING OPTIONAL,
 nonCriticalExtension SEQUENCE {} OPTIONAL
}
ThresholdMBS-r18 ::= SEQUENCE {
 rsrp-r18 RSRP-Range OPTIONAL, -- Need R
 rsrq-r18 RSRQ-Range OPTIONAL -- Need R
}
-- TAG-MBSMULTICASTCONFIGURATION-STOP
-- ASN1STOP
```

### Step 6: MTCH configuration and G-RNTI via mbs-SessionInfoListMulticast

`mbs-SessionInfoListMulticast`, referenced above in `MBSMulticastConfiguration-r18-IEs`, is the per-session detail the UE needs to actually receive each multicast session: the session identity (TMGI), the G-RNTI used to address it on the physical layer, the MRB configuration, and the MTCH scheduling information. It is the multicast-inactive counterpart of the broadcast page's `MBS-SessionInfoList`, defined in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.6** (MBS information elements) — the same clause as the broadcast structure. Two differences from the broadcast case are worth noting: `thresholdIndex-r18` links each session to one of the RSRP/RSRQ thresholds in `thresholdMBS-List` (step 5's `MBSMulticastConfiguration`), and the RLC bearer config (`MRB-RLC-ConfigMulticast-r18`) uses its own `logicalChannelIdentitymulticast-r18` type rather than the broadcast MRB's plain `LogicalChannelIdentity`, so the MAC logical-channel assignment for multicast MTCH is not necessarily identical to broadcast MTCH.

```
-- ASN1START
-- TAG-MBS-SESSIONINFOLISTMULTICAST-START

MBS-SessionInfoListMulticast-r18 ::= SEQUENCE (SIZE (1..maxNrofMBS-Session-r17)) OF MBS-SessionInfoMulticast-r18

MBS-SessionInfoMulticast-r18 ::= SEQUENCE {
    mbs-SessionId-r18                  TMGI-r17,
    g-RNTI-r18                         RNTI-Value                                   OPTIONAL, -- Need R
    mrb-ListMulticast-r18              MRB-ListMulticast-r18                        OPTIONAL, -- Need R
    mtch-SchedulingInfo-r18            DRX-ConfigPTM-Index-r17                      OPTIONAL, -- Need S
    mtch-NeighbourCell-r18             BIT STRING (SIZE(maxNeighCellMBS-r17))       OPTIONAL, -- Need S
    pdsch-ConfigIndex-r18              PDSCH-ConfigIndex-r17                        OPTIONAL, -- Need S
    mtch-SSB-MappingWindowIndex-r18    MTCH-SSB-MappingWindowIndex-r17              OPTIONAL, -- Cond MTCH-Mapping
    thresholdIndex-r18                 INTEGER (0..maxNrofThresholdMBS-1-r18)       OPTIONAL, -- Need R
    pdcp-SyncIndicator-r18             ENUMERATED {true}                            OPTIONAL, -- Cond RRCRelease
    stopMonitoringRNTI-r18             ENUMERATED {true}                            OPTIONAL, -- Cond G-RNTI
    ...
}

MRB-ListMulticast-r18 ::= SEQUENCE (SIZE (1.. maxMRB-r17)) OF MRB-InfoMulticast-r18

MRB-InfoMulticast-r18 ::= SEQUENCE {
    pdcp-Config-r18    MRB-PDCP-ConfigMulticast-r18,
    rlc-Config-r18     MRB-RLC-ConfigMulticast-r18,
    ...
}

MRB-PDCP-ConfigMulticast-r18 ::= SEQUENCE {
    pdcp-SN-SizeDL-r18      ENUMERATED {len12bits, len18bits},
    headerCompression-r18   CHOICE {
        notUsed    NULL,
        rohc       SEQUENCE {
            maxCID-r18      INTEGER (1..16)    DEFAULT 15,
            profiles-r18    SEQUENCE {
                profile0x0000-r18    BOOLEAN,
                profile0x0001-r18    BOOLEAN,
                profile0x0002-r18    BOOLEAN
            }
        }
    },
    t-Reordering-r17    ENUMERATED {ms1, ms10, ms40, ms160, ms500, ms1000, ms1250, ms2750}    OPTIONAL -- Need R
}

MRB-RLC-ConfigMulticast-r18 ::= SEQUENCE {
    logicalChannelIdentity-r18    CHOICE {
        logicalChannelIdentitymulticast-r18    LogicalChannelIdentity,
        logicalChannelIdentityExt-r18          LogicalChannelIdentityExt-r17
    },
    sn-FieldLength-r18    ENUMERATED {size6, size12},
    t-Reassembly-r18      T-Reassembly    OPTIONAL  -- Need R
}

-- TAG-MBS-SESSIONINFOLISTMULTICAST-STOP
-- ASN1STOP
```

### Step 7: Demodulation of MTCH (PDSCH) with G-RNTI

The `g-RNTI-r18` field above is what the UE uses to address the physical-layer scheduling for this session's MTCH. Unlike MCCH, **G-RNTI is not split into separate broadcast/multicast values**: TS 38.321 Table 7.1-1 lists a single G-RNTI entry ("Dynamically scheduled MBS PTM transmission", DL-SCH, MTCH) that serves both cases, matching the mechanism on the broadcast page (`g-RNTI-r17` there, `g-RNTI-r18` here — same RNTI type, values assigned per session by the network either way). **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Clause 5.3.1** states the broadcast-specific reading rule explicitly ("[...] the PDCCH for the G-RNTI configured for broadcast MTCH"); the equivalent multicast wording is not separately called out in that clause, so the exact MAC-layer procedure text for multicast MTCH reception has not been located as a distinct rule and should be treated as inferred rather than a direct quote.

Where multicast MTCH **does** differ from broadcast at the MAC layer is its logical channel identity: **Table 6.2.1-1c** (the same table used for Step 4's MCCH) only covers *broadcast* MTCH (LCID 1–32, labelled "Identity of the logical channel of broadcast MTCH"); multicast MTCH's LCID instead comes from the generic **Table 6.2.1-1** ("Values of LCID for DL-SCH"), whose LCID 1–32 row is labelled "Identity of the logical channel of DCCH, DTCH **and multicast MTCH**" — the same range used for ordinary dedicated control/traffic channels. This matches the RRC-layer finding in Step 6: the multicast MRB's `logicalChannelIdentitymulticast-r18` is the plain `LogicalChannelIdentity` type, not a broadcast-MTCH-specific one.

The PDSCH configuration itself is carried by `pdsch-ConfigMTCH-r18` (of type `PDSCH-ConfigBroadcast-r17`, the same broadcast-defined structure shown on the [broadcast RAN procedures page](./analysis-mbs-broadcast-ran)) and selected per-session via `pdsch-ConfigIndex-r18`.

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

Identical to the broadcast case: PDCP procedures in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 5**, protocol data units/formats/parameters in **Clause 6**, state variables/constants/timers in **Clause 7**. Not repeated here — see the [broadcast RAN procedures page: PDCP](./analysis-mbs-broadcast-ran#pdcp-mbs-broadcast).

#### RLC: MBS Multicast Reception in RRC_INACTIVE

RLC does not distinguish broadcast from multicast at all: TS 38.322 mentions "multicast" exactly once in the whole specification (in the abbreviations list, for "MBS"), with no multicast-specific bearer, entity, or procedure text anywhere in the document. The broadcast page's RLC citations therefore apply identically and unconditionally to the multicast MRB, unlike MAC (Step 4) where a distinct RNTI exists:

- UM RLC entity in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 4.2.1.2**
- Variables, constants, and timers in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 7**

#### MAC: MBS Multicast Reception in RRC_INACTIVE (Steps 4 and 7)

See Step 4 and Step 7 above for the full detail (Multicast MCCH-RNTI = FFFB, shared MCCH LCID via Table 6.2.1-1c, and multicast MTCH's LCID via the generic Table 6.2.1-1 rather than Table 6.2.1-1c). In summary:

- RNTI values in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Table 7.1-1**: Multicast MCCH-RNTI = FFFB (distinct from broadcast's MCCH-RNTI = FFFD); G-RNTI shared with broadcast (no separate multicast value)
- MCCH LCID in **Table 6.2.1-1c** (LCID = 0, shared with broadcast MCCH); multicast MTCH LCID in the generic **Table 6.2.1-1** (LCID 1–32, shared with DCCH/DTCH — not Table 6.2.1-1c, which only covers broadcast MTCH)
- MCCH/MTCH reading procedure in **Clause 5.3.1** ("DL Assignment reception")

## User Plane Procedures

PDCP and SDAP handling of multicast-inactive traffic follow the same procedures as the broadcast case, documented in the [MBS Broadcast RAN procedures: User Plane Procedures](./analysis-mbs-broadcast-ran#user-plane-procedures) section (TS 38.323 for PDCP, TS 37.324 Clause 4.2/5.2.2/6.2.2.1 for SDAP); it is not repeated here.

:::note[Verified against primary sources]
Every step of the acquisition path (0–7) has now been checked directly against 3GPP specification documents: TS 38.331 and TS 37.324 (both V19.3.0/V19.0.0, the current published versions) for RRC/PDCP/SDAP, and TS 38.321/TS 38.322 (both V19.3.0) for MAC/RLC. One real error was found and corrected in the course of this check: the multicast-inactive case uses its own **Multicast MCCH-RNTI (FFFB)**, not the broadcast MCCH-RNTI (FFFD) as this page previously stated — TS 38.321 defines the two as separate values in Table 7.1-1, even though they share the same MCCH LCID (0) once decoded. RLC (TS 38.322) has no multicast-specific content at all and applies identically to broadcast. One remaining soft spot: TS 38.321 Clause 5.3.1 states the broadcast MTCH reading rule as an explicit quote ("PDCCH for the G-RNTI configured for broadcast MTCH"), but does not give an equally explicit quotable rule for multicast MTCH reading — the G-RNTI mechanism for multicast MTCH is inferred from the shared Table 7.1-1 entry and the RRC-layer procedure text (Step 6/Step 7 above), not from a directly quotable MAC-layer sentence.
:::
