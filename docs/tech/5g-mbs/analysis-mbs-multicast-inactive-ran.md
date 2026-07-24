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

The step sequence below (numbered 0 to 7) is the acquisition path for multicast reception in RRC_INACTIVE. The channels and identifiers are the same as on the broadcast page (MIB, SIB, MCCH, MTCH, PDCCH, PDSCH, MCCH-RNTI, G-RNTI), but the multicast-inactive case uses SIB24 and the multicast MCCH carrying `MBSMulticastConfiguration`.

- 0. Acquiring PLMN and RAN Information
- 1. Obtain MIB
- 2. Obtain SIB1 (points to SIB24)
- 3. SIB24 contains configuration of MCCH
- 4. Demodulation of MCCH (PDSCH) via PDCCH (with MCCH-RNTI = FFFD)
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

For definitions refer to **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**

### SIB 24 - Acquisition MCCH/MTCH for MBS multicast reception in RRC_INACTIVE

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

### RRC - MulticastMCCH-Message

The block below is multicast-specific: it defines the multicast MCCH message that carries the `MBSMulticastConfiguration` used for RRC_INACTIVE multicast reception (the broadcast page uses `MBSBroadcastConfiguration` instead).

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

## Control Plane and User Plane Procedures

The per-layer control-plane (RRC, PDCP, RLC, MAC) and user-plane (SDAP, PDCP) procedures specific to the multicast-inactive case are not yet written up on this page. The equivalent broadcast-case procedures are analysed on the [MBS Broadcast RAN procedures](./analysis-mbs-broadcast-ran) page; the RRC/PDCP/RLC/MAC/SDAP layers involved are the same, but the multicast-inactive clause numbers and configuration structures differ (SIB24 vs SIB20, `MBSMulticastConfiguration` vs `MBSBroadcastConfiguration`, as shown above) and have not been verified against 3GPP TS 38.331 for this page. This section is tracked for a future update.
