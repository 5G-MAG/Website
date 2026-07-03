---
title: MBS Multicast Inactive - RAN Procedures
sidebar_position: 6
hide_title: true
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Multicast & Broadcast in 5G</span>
<h1>MBS Multicast Inactive - RAN Procedures</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](https://www.5g-mag.com/contact)
:::

## Analysis of RAN procedures for MBS Multicast Inactive

This page analyses the 3GPP Release 18 extension that lets a UE receive MBS multicast while in the RRC_INACTIVE state. In Release 17, multicast reception (delivery mode 1) required RRC_Connected, as summarised on the [RAN Aspects](./ran-aspects) page; the Release 18 work adds a way to receive multicast in RRC_INACTIVE, using dedicated signalling (SIB24 and the multicast MCCH) rather than the broadcast signalling used for delivery mode 2. When reading the RAN Aspects page alongside this one, note that this is the Release 18 extension to the RRC-state rules stated there.

:::caution
The lower half of this page (the "Control Plane Procedures" and "User Plane Procedures" sections, and some of the ASN.1 appendices) is currently copied from the [MBS Broadcast RAN procedures](./analysis-mbs-broadcast-ran) page and still carries broadcast-specific labels (for example "MBS Broadcast" headings, SIB20, and clause references such as 5.9 / 5.9.3). It has not yet been reconciled to the multicast-inactive case (SIB24, MBSMulticastConfiguration, and the corresponding multicast clauses). Treat that content as provisional and verify it against 3GPP TS 38.331 before relying on it. This is flagged for maintainers.
:::

The step sequence below (numbered 0 to 7) is the acquisition path for multicast reception in RRC_INACTIVE. The channels and identifiers are the same as on the broadcast page (MIB, SIB, MCCH, MTCH, PDCCH, PDSCH, MCCH-RNTI, G-RNTI), but the multicast-inactive case uses SIB24 and the multicast MCCH carrying `MBSMulticastConfiguration`.

* 0. Acquiring PLMN and RAN Information
* 1. Obtain MIB
* 2. Obtain SIB1 (points to SIB24)
* 3. SIB24 contains configuration of MCCH
* 4. Demodulation of MCCH (PDSCH) via PDCCH (with MCCH-RNTI = FFFD)
* 5. MCCH contains MBSMulticastConfiguration
* 6. Obtain configuration of MTCH within MBSMulticastConfiguration
* 7. Demodulation of MTCH (PDSCH) with G-RNTI

Why this matters: in Release 17 a UE receiving multicast (delivery mode 1) has to stay in RRC_CONNECTED, which keeps the UE and the network in a higher-power, higher-signalling state even when the UE is only listening. The Release 18 extension lets a multicast UE drop to RRC_INACTIVE and keep receiving, saving UE battery and network resources for large, mostly-passive multicast audiences. The mechanism mirrors the broadcast acquisition chain (a SIB points to an MCCH that carries a configuration message listing sessions, G-RNTIs and MTCH scheduling), but it uses multicast-specific structures so that reception stays tied to session membership: a dedicated SIB (SIB24) points to a multicast MCCH carrying `MBSMulticastConfiguration`, and that configuration adds RSRP/RSRQ thresholds (`thresholdMBS-List`) that govern when an inactive UE should move back to connected mode, for example to receive over PTP when its channel degrades. The `MBSMulticastConfiguration` ASN.1 shown later on this page is the multicast-specific structure; the broadcast structures reproduced below it are, as the cautions note, retained for reference and not yet reconciled.

## Acquiring PLMN and RAN Information

For information on the MBS Broadcast Pre-Configuration Management Object (MO) refer to **[3GPP TS 24.575](https://www.3gpp.org/dynareport/24575.htm)**.

A UE can support MBS to deliver content from a single source entity to users in a multicast group (MBS
multicast communication), as defined in 3GPP [TS 23.247](https://www.3gpp.org/dynareport/23247.htm). The UE may support pre-configuration of information for MBS services, containing a list of PLMNs; if pre-configured this way, the UE can discover and receive service data using the provisioned configuration.
For each PLMN, the following information is included:
* PLMN ID of the PLMN for which the configuration applies;
* default DNN and S-NSSAI pair for PDU sessions that can be used to join MBS multicast sessions (as specified
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

## Control Plane Procedures

Note: the per-layer procedures below are currently reused from the broadcast page and still use broadcast labels and clause references; see the caution at the top of this page.

### RRC: MBS Multicast
#### Acquisition of MBS Broadcast information via MCCH
* Procedures in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.10**
  * Acquisition of MCCH: via SIB20, included in SIBTypeInfo in SIB1. MCCH transmission indicated via PDCCH (MCCH-RNTI)
  * Configuration information in MCCH via _MBSBroadcastConfiguration_
* _SIB20_ in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**: SIB20 contains the information required to acquire the MCCH/MTCH configuration for MBS broadcast. ASN.1 definition in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**.
* _MBSBroadcastConfiguration_ in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**: The MBSBroadcastConfiguration message contains the control information applicable for MBS broadcast services transmitted via broadcast MRB. ASN.1 definition in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.2.2**.
 * MBS information elements in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 6.3.6**

#### Broadcast MRB configuration
* Procedures in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9.3**
* Broadcast MRB establishment in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9.3.3**
  * Upon a broadcast MRB establishment, the UE shall:
    * establish a PDCP entity and an RLC entity in accordance with MRB-InfoBroadcast for this broadcast MRB included in the MBSBroadcastConfiguration message and the configuration specified in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 9.1.1.7**;
    * configure the MAC layer in accordance with the mtch-SchedulingInfo (if included);
    * configure the physical layer in accordance with the mbs-SessionInfoList, searchSpaceMTCH, and pdsch-ConfigMTCH, applicable for the broadcast MRB;
    * receive DL-SCH on the cell where the MBSBroadcastConfiguration message was received for the established broadcast MRB using g-RNTI and mtch-SchedulingInfo (if included) in this message for this MBS broadcast service;
    * if an SDAP entity with the received mbs-SessionId does not exist:
      * establish an SDAP entity as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) clause 5.1.1**.
      * indicate the establishment of the user plane resources for the mbs-SessionId to upper layers.

* Broadcast MRB release in **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) Clause 5.9.3.4**
  * Upon broadcast MRB release for MBS broadcast service, the UE shall:
    * release the PDCP entity, RLC entity as well as the related MAC and physical layer configuration;
    * if the SDAP entity associated with the corresponding mbs-SessionId has no associated MRB:
      * release the SDAP entity, as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) clause 5.1.2**;
      * indicate the release of the user plane resources for the mbs-SessionId to upper layers.

#### PDCP: MBS Broadcast
* Procedures in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 5**
  * A PDCP entity associated with MRB can be configured by upper layers **[3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm)** to use header compression.
  * Protocol data units, formats, and parameters in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 6**
  * State variables, constants, and timers in **[3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) Clause 7**

#### RLC: MBS Broadcast
* Procedures in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm)**
  * UM RLC entity in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 4.2.1.2**
  * Variables, constants, and timers in **[3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) Clause 7**

#### MAC: MBS Broadcast
* MCCH within DL-SCH in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Clause 5.3**
* Value of LCID for MBS broadcast on DL-SCH in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Table 6.2.1-1c**
* RNTI values MCCH-RNTI = FFFD in **[3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) Table 7.1-1**

## User Plane Procedures
### SDAP: MBS Broadcast
* SDAP architecture in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 4.2**
  * The SDAP sublayer is configured for MRBs by RRC. The SDAP sublayer maps MBS QoS flows to MRBs (mapping between an MBS QoS flow and an MRB for DL).
* Data transfer DL in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 5.2.2**
  * At the reception of an SDAP data PDU from lower layers for a QoS flow, the receiving SDAP entity shall:
    * if this SDAP data PDU is received from an MRB, retrieve the SDAP SDU from the DL SDAP data PDU as specified in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 6.2.2.1**
* Data PDU without SDAP header in **[3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) Clause 6.2.2.1**

### PDCP: MBS Broadcast (user plane)

:::caution
This user-plane PDCP heading is empty and duplicates the earlier PDCP subsection; like the rest of the lower half it is copied from the broadcast page. Flagged for maintainers.
:::

---

### Other RRC Messages

The ASN.1 blocks below are reused from the broadcast page and are not multicast-inactive-specific; they are common structures (`CFR-ConfigMCCH-MTCH`, `PDSCH-ConfigBroadcast`) referenced by the multicast configuration above. They are retained here for reference and should be reviewed for relevance to the multicast-inactive case.

```
-- ASN1START
-- TAG-CFR-CONFIGMCCH-MTCH-START

CFR-ConfigMCCH-MTCH-r17 ::= SEQUENCE {
    locationAndBandwidthBroadcast-r17          LocationAndBandwidthBroadcast-r17  OPTIONAL,  -- Need S
    pdsch-ConfigMCCH-r17                       PDSCH-ConfigBroadcast-r17          OPTIONAL,  -- Need S
    commonControlResourceSetExt-r17            ControlResourceSet                 OPTIONAL   -- Cond NotSIB1CommonControlResource
}

LocationAndBandwidthBroadcast-r17 ::= CHOICE {
    sameAsSib1ConfiguredLocationAndBW          NULL,
    locationAndBandwidth                       INTEGER (0..37949)
}

-- TAG-CFR-CONFIGMCCH-MTCH-STOP
-- ASN1STOP
```

```
-- ASN1START
-- TAG-PDSCH-CONFIGBROADCAST-START

PDSCH-ConfigBroadcast-r17 ::= SEQUENCE {
    pdschConfigList-r17                    SEQUENCE (SIZE (1..maxNrofPDSCH-ConfigPTM-r17) ) OF PDSCH-ConfigPTM-r17,
    pdsch-TimeDomainAllocationList-r17     PDSCH-TimeDomainResourceAllocationList-r16                          OPTIONAL,   -- Need R
    rateMatchPatternToAddModList-r17       SEQUENCE (SIZE (1..maxNrofRateMatchPatterns)) OF RateMatchPattern   OPTIONAL,   -- Need R
    lte-CRS-ToMatchAround-r17              RateMatchPatternLTE-CRS                                             OPTIONAL,   -- Need R
    mcs-Table-r17                          ENUMERATED {qam256, qam64LowSE}                                     OPTIONAL,   -- Need S
    xOverhead-r17                          ENUMERATED {xOh6, xOh12, xOh18}                                     OPTIONAL    -- Need S
}

PDSCH-ConfigPTM-r17 ::= SEQUENCE {
    dataScramblingIdentityPDSCH-r17        INTEGER (0..1023)         OPTIONAL,   -- Need S
    dmrs-ScramblingID0-r17                 INTEGER (0..65535)        OPTIONAL,   -- Need S
    pdsch-AggregationFactor-r17            ENUMERATED {n2, n4, n8}   OPTIONAL    -- Need S
}

-- TAG-PDSCH-CONFIGBROADCAST-STOP
-- ASN1STOP
```

### MBSBroadcastConfiguration (reused from broadcast)

This `MBSBroadcastConfiguration` block is the broadcast structure copied from the broadcast page. For the multicast-inactive case the equivalent is `MBSMulticastConfiguration` (shown earlier on this page); this block is retained for reference and should be reviewed by maintainers.

```
-- ASN1START
-- TAG-MBSBROADCASTCONFIGURATION-START

MBSBroadcastConfiguration-r17 ::= SEQUENCE {
    criticalExtensions                CHOICE {
        mbsBroadcastConfiguration-r17     MBSBroadcastConfiguration-r17-IEs,
        criticalExtensionsFuture          SEQUENCE {}
    }
}

MBSBroadcastConfiguration-r17-IEs ::= SEQUENCE {
    mbs-SessionInfoList-r17               MBS-SessionInfoList-r17                                              OPTIONAL,   -- Need R
    mbs-NeighbourCellList-r17             MBS-NeighbourCellList-r17                                            OPTIONAL,   -- Need S
    drx-ConfigPTM-List-r17                SEQUENCE (SIZE (1..maxNrofDRX-ConfigPTM-r17)) OF DRX-ConfigPTM-r17   OPTIONAL,   -- Need R
    pdsch-ConfigMTCH-r17                  PDSCH-ConfigBroadcast-r17                                            OPTIONAL,   -- Need S
    mtch-SSB-MappingWindowList-r17        MTCH-SSB-MappingWindowList-r17                                       OPTIONAL,   -- Need R
    lateNonCriticalExtension              OCTET STRING                                                         OPTIONAL,
    nonCriticalExtension                  SEQUENCE {}                                                          OPTIONAL
}

-- TAG-MBSBROADCASTCONFIGURATION-STOP
-- ASN1STOP
```
```
-- ASN1START
-- TAG-MBS-SESSIONINFOLIST-START

MBS-SessionInfoList-r17 ::=      SEQUENCE (SIZE (1..maxNrofMBS-Session-r17)) OF MBS-SessionInfo-r17

MBS-SessionInfo-r17 ::=          SEQUENCE {
    mbs-SessionId-r17                TMGI-r17,
    g-RNTI-r17                       RNTI-Value,
    mrb-ListBroadcast-r17            MRB-ListBroadcast-r17,
    mtch-SchedulingInfo-r17          DRX-ConfigPTM-Index-r17                      OPTIONAL, -- Need S
    mtch-NeighbourCell-r17           BIT STRING (SIZE(maxNeighCellMBS-r17))       OPTIONAL, -- Need S
    pdsch-ConfigIndex-r17            PDSCH-ConfigIndex-r17                        OPTIONAL, -- Need S
    mtch-SSB-MappingWindowIndex-r17  MTCH-SSB-MappingWindowIndex-r17              OPTIONAL  -- Cond MTCH-Mapping
}

DRX-ConfigPTM-Index-r17 ::=          INTEGER (0..maxNrofDRX-ConfigPTM-1-r17)

PDSCH-ConfigIndex-r17  ::=           INTEGER (0..maxNrofPDSCH-ConfigPTM-1-r17)

MTCH-SSB-MappingWindowIndex-r17  ::= INTEGER (0..maxNrofMTCH-SSB-MappingWindow-1-r17)

MRB-ListBroadcast-r17 ::=            SEQUENCE (SIZE (1..maxNrofMRB-Broadcast-r17)) OF MRB-InfoBroadcast-r17

MRB-InfoBroadcast-r17 ::=            SEQUENCE {
    pdcp-Config-r17                      MRB-PDCP-ConfigBroadcast-r17,
    rlc-Config-r17                       MRB-RLC-ConfigBroadcast-r17,
    ...
}

MRB-PDCP-ConfigBroadcast-r17 ::=     SEQUENCE {
    pdcp-SN-SizeDL-r17                   ENUMERATED {len12bits}                   OPTIONAL, -- Need S
    headerCompression-r17                CHOICE {
        notUsed                              NULL,
        rohc                                 SEQUENCE {
            maxCID-r17                           INTEGER (1..16)               DEFAULT 15,
            profiles-r17                         SEQUENCE {
                profile0x0000-r17                    BOOLEAN,
                profile0x0001-r17                    BOOLEAN,
                profile0x0002-r17                    BOOLEAN
           }
        }
    },
    t-Reordering-r17                     ENUMERATED {ms1, ms10, ms40, ms160, ms500, ms1000, ms1250, ms2750}    OPTIONAL -- Need S
}

MRB-RLC-ConfigBroadcast-r17 ::=      SEQUENCE {
    logicalChannelIdentity-r17           LogicalChannelIdentity,
    sn-FieldLength-r17                   ENUMERATED {size6}                       OPTIONAL, -- Need S
    t-Reassembly-r17                     T-Reassembly                             OPTIONAL  -- Need S
}

-- TAG-MBS-SESSIONINFOLIST-STOP
-- ASN1STOP
```

