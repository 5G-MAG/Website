---
hide_title: true
sidebar_label: Release history
title: 5G MBS - Standards Evolution
slug: /standards/5g-mbs/evolution
description: Release by release, the 3GPP work items and study items behind MBS User Services and MBS in the 5G System and NG-RAN, Release 17 to Release 20, with the specifications each changed.
pagination_prev: null
pagination_next: null
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>5G MBS - Standards Evolution</h1>
</div>
</div>

:::tip[At a glance]

- **MBS User Services, Release 17:** 5MBUSA creates TS 26.502 and 5MBP3 creates TS 26.517; the CT3 and CT4 aspects of 5MBS cover TS 29.580 and TS 29.581. The study FS_5GMS_Multicast produced TR 26.802.
- **MBS User Services, Releases 18 to 20:** CT3 aspects of 5MBS_Ph2 (TS 29.580). In Releases 19 and 20 the user-service specifications are changed by the Advanced Media Delivery work items.
- **MBS, Release 17:** 5MBS, with its stage 2 (TS 23.247), CT stage 3 and security parts, and NR_MBS for NG-RAN.
- **MBS, Release 18:** 5MBS_Ph2, NR_MBS_enh, UEConfig5MBS (TS 24.575) and 5MBS_CH (TS 32.279).
- **MBS, Releases 19 and 20:** TEI20_5MBS_Roam-ARC (TS 23.247).

:::

Work items and study items as listed in the 3GPP work plan of 28 September 2026. ID is the work plan's Unique_ID; Group is its responsible group (empty for a parent item); Specifications is its list of impacted specifications. Where that list is empty or does not name a document, a note gives what the work item description (WID) says. Items whose list names specifications of both sections appear in both, each showing its own specifications.

## Novelties by release

What each release added, as the 3GPP release descriptions (TR 21.917, TR 21.918, TR 21.919) and the change histories of the specifications state it. The tables below list the work items; this section says what they changed. TR 21.920 (Release 20) is not available, so every Release 20 entry rests on the specifications' change histories and the work plan only.

### Release 17

- **5MBS (SA2, TS 23.247):** architectural enhancements to the 5G System for multicast and broadcast communication services over NR: delivery from the 5GC ingress to NG-RAN (5GC Shared and 5GC Individual delivery), local and location dependent services, mobility, session activation and deactivation, QoS and policy control, and interworking with E-UTRAN and EPC eMBMS at the service layer (TR 21.917 clause 6.3.4.3.1). The first version under change control of TS 23.247 is V17.0.0 (TS 23.247 change history, September 2021).
- **NR_MBS (RAN2):** multicast delivery for UEs in RRC_CONNECTED (group scheduling with a G-RNTI, HARQ feedback, dynamic PTP/PTM switch, lossless handover) and broadcast delivery for UEs in all RRC states (broadcast configuration on the MCCH, MBS frequency prioritisation, MBS Interest Indication) (TR 21.917 clause 6.3.4.3.2).
- **5MBS security (SA3, TS 33.501):** control plane and user plane procedures for the security of multicast and broadcast traffic at the service layer, with the user plane security between UE and RAN deactivated for 5GC Shared delivery (TR 21.917 clause 6.3.4.3.1).
- **FS_5GMS_Multicast and 5MBUSA (SA4):** the study TR 26.802 recommended a generic MBS User Service architecture; 5MBUSA created TS 26.502 (MBS User Services architecture, reference points, the Object and Packet Distribution Methods, procedures, services of the MBSF and MBSTF) and added the use of eMBMS by 5GMS to TS 26.501 (TR 21.917 clauses 6.3.4.4 and 6.3.4.5).
- **5MBP3 (SA4):** the stage 3 of the user services: TS 26.517 for the User Service Announcement (M5) and for the Object and Packet distribution methods (M4), and extensions to TS 26.512, TS 26.346, TS 26.347 and TS 26.348 (TR 21.917 clause 6.3.4.3.3).
- **5MBS_eMC (SA1, TS 22.261) and FS_MC5MBS (SA6):** listed by TR 21.917 clause 6.3.4.6 without a description.

### Release 18

- **5MBS_Ph2, stage 2 (SA2, TS 23.247):** TR 21.918 clause 12.1 lists the work items but summarises only the charging part. The change history of TS 23.247 shows the additions: Group Message Delivery (CR 0143, V18.0.0); multicast reception by UEs in RRC_INACTIVE (CR 0149 and CR 0159, V18.1.0); MBS data reception for UEs using power saving functions (CR 0162, V18.1.0); resource sharing across broadcast MBS sessions in network sharing (CR 0176, V18.1.0); RedCap UEs in MBS Broadcast (CR 0341, V18.5.0); QoE measurement collection (CR 0358, V18.6.0). TS 23.247 V18.8.0 has clauses 6.15 to 6.20 for these, and V17.12.0 has none of them.
- **NR_MBS_enh (RAN2):** multicast reception by UEs in RRC_INACTIVE; shared processing for MBS broadcast and unicast reception, where a UE in RRC_CONNECTED reports with the MBS Interest Indication the parameters of a broadcast service in a non-serving cell; and resource efficiency of MBS broadcast in RAN sharing, where the 5GC provides an Associated Session ID to NG-RAN (TR 21.918 clause 12.2).
- **UEConfig5MBS (CT1, CT6):** UE pre-configuration for MBS: per PLMN, the PLMN identity, the NR-ARFCN of broadcast services, the TMGIs with their user service description, and a default DNN and S-NSSAI for joining multicast sessions. It is provided by the UE implementation, in the USIM (service no. 147, DF5MBSUECONFIG with EF5MBSUECONFIG, TS 31.102) or in a management object (TS 24.575) (TR 21.918 clause 12.3). TS 24.575 has V18.0.0 as its first version.
- **5MBS_CH (SA5):** charging for MBS: the N101 interface between the MB-SMF and the CHF in TS 32.240, the MB-SMF as a consumer of Nchf_ConvergedCharging in TS 32.290, PDU session charging of multicast in TS 32.255, the new TS 32.279, and changes to TS 32.291 and TS 32.298 (TR 21.918 clause 12.1). N101 appears in TS 23.247 V18.8.0 and not in V17.12.0.
- **MBS User Services specifications:** TS 26.502 V18.1.0 adds the Target UE classes for RedCap UEs and alignment with power saving (CR 0027 and CR 0029). TS 29.580 V18.8.0 lists the feature 5MBS2 (clause 6.2.8: Associated Session ID for MOCN network sharing, NR RedCap UE Information, active periods as a repetition rule), and also MBSEventsExt, MBSErrorHandling and MBSPatchEnh. TS 29.581 adds group message delivery (CR 0022, V18.0.0). TS 29.532 adds the Associated Session ID (CR 0054, V18.1.0), RedCap UE information (CR 0085, V18.4.0) and a feature for MOCN (CR 0086, V18.4.0).
- **TEI18_MBS4V2X (SA2, CT1, CT6):** MBS support for V2X services in TS 23.287: V2X messages sent from the V2X application server over broadcast or multicast MBS sessions, discovery of the V2X application server over a broadcast session, MBS announcement for V2X, 5QI 75 in TS 23.501, and support in SNPN (TR 21.918 clause 16.1). The work plan rows of this item were not read.

### Release 19

- **Advanced Media Delivery, AMD (SA4, CT4):** for MBS User Services, in-session unicast repair for MBS object distribution, time synchronisation (SIB9 and user-domain time services), and deployment guidelines for operating MBS User Services over eMBMS (TR 21.919 clause 11.6). The change histories show TS 26.502 V19.0.0 (CR 0033, CR 0034 and CR 0035), TS 26.517 V19.0.0 (CR 0030 on the target service area, CR 0031 consolidated additions) and TS 29.581 V19.0.0 (CR 0052, in-session unicast repair). The study FS_AMD, TR 26.802 clause 8.4, recommends these extensions.
- **DTT4MBS (SA1, TS 22.261):** a requirement that the 5G system supports interworking of 5G multicast/broadcast with non-3GPP digital terrestrial broadcast networks, with a note that any impact on those standards is out of scope (TS 22.261 V19.15.0 clause 6.13.2; CR 0639, SA#97, V19.0.0). V18.19.0 has no such requirement. TR 21.919 clause 25.5.1 gives no summary.
- **Broadcast over NR NTN (TS 23.247, TS 38.300):** see the note under Release 19 in the MBS section.

### Release 20

Unverified against a Release 20 TR 21.920, which is not available; each entry is read from a change history.

- **TEI20_5MBS_Roam-ARC (SA2):** TS 23.247 V20.0.0 adds clauses 6.22 and 6.23: a roaming UE joins a multicast MBS session of the VPLMN with a local breakout PDU session, and receives a broadcast session of the VPLMN from the service announcement (CR 0389 "MBS Roaming", SP-260751, SA#113).
- **MBSF APIs (CT3):** TS 29.580 V20.0.0 lists the feature 5MBS3, described as the Release 20 enhancements: retrieval and reporting of the MBS User Service Announcement bundle, an indication of whether transport security protection is required, the profiles to which the content conforms, and the expected MIME content types (clause 6.2.8; CR 0086 "Enhancements to the MBSF APIs", CP-262115). V19.6.0 has no such feature. The change history does not name a work item.
- **FS_AMD_Ph2 (SA4):** TR 26.802 V20.0.0 clause 8.5 recommends for stage 2 and stage 3 a combined multicast, broadcast and unicast delivery with selective unicast proxying and content steering, and explicit error signalling for permanently or temporarily unavailable resources. These are recommendations of a study.
- **MBS user data ingest (CT3):** TS 29.522 V20.1.0 (NEF northbound APIs) lists CR 1908 r2 "Enhancements to the MBSUserDataIngestSession API" (CT#113, CP-262181). The change history does not name a work item.

## MBS User Services

### Release 18

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990076) | 990076 | CT3 aspects for 5MBS_Ph2 | C3 | Normative | [TS 29.580](https://www.3gpp.org/dynareport/29580.htm) (note 4) | Complete, Mar 2024 | [CP-232031](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_101_Bangalore/Docs/CP-232031.zip) |

### Release 17

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [FS_5GMS_Multicast](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=870014) | 870014 | Study on Multicast Architecture Enhancements for 5G Media Streaming | S4 | Study | [TR 26.802](https://www.3gpp.org/dynareport/26802.htm) (note 1) | Complete, Jun 2021 | [SP-200238](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_87E_Electronic/Docs/SP-200238.zip) |
| [5MBUSA](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920010) | 920010 | 5G Multicast-Broadcast User Service Architecture and related 5GMS Extensions | S4 | Normative | [TS 26.501](https://www.3gpp.org/dynareport/26501.htm), [TS 26.502](https://www.3gpp.org/dynareport/26502.htm) | Complete, Mar 2022 | [SP-210376](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_92E_Electronic_2021_06/Docs/SP-210376.zip) |
| [5MBP3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940008) | 940008 | 5G Multicast-Broadcast Protocols | S4 | Normative | [TS 26.346](https://www.3gpp.org/dynareport/26346.htm), [TS 26.347](https://www.3gpp.org/dynareport/26347.htm), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm); [TS 26.517](https://www.3gpp.org/dynareport/26517.htm) (note 2) | Complete, Jun 2022 | [SP-211335](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_94E_Electronic_2021_12/Docs/SP-211335.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920044) | 920044 | CT3 aspects of 5MBS | C3 | Normative | [TS 29.580](https://www.3gpp.org/dynareport/29580.htm) (note 3) | Complete, Mar 2022 | [CP-220402](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220402.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910002) | 910002 | CT4 aspect of 5MBS | C4 | Normative | [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) (note 3) | Complete, Mar 2022 | [CP-220402](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220402.zip) |

The work plan has no MBS User Services work item in Release 19 or Release 20. The user-service specifications are changed in Releases 18 to 20 by the work items below.

### Other work items that changed MBS User Services specifications

These work items are not MBS work items, but the work plan lists MBS User Services specifications among the specifications they changed.

<details>
<summary>The nine work items, Release 18 to Release 20</summary>

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [AMD_ARCH_Ph2-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1120098) | 1120098 | Architectural Updates for Advanced Media Delivery Phase 2 | S4 | Normative | [TS 26.501](https://www.3gpp.org/dynareport/26501.htm), [TS 26.502](https://www.3gpp.org/dynareport/26502.htm) | 51%, due Dec 2026 | [SP-260973](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_113_Madrid_2026-09/Docs/SP-260973.zip) |
| [FS_AMD_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1090046) | 1090046 | Study on Advanced Media Delivery Phase 2 | S4 | Study | [TR 26.802](https://www.3gpp.org/dynareport/26802.htm), [TR 26.804](https://www.3gpp.org/dynareport/26804.htm), [TR 26.941](https://www.3gpp.org/dynareport/26941.htm) | Complete, Sep 2026 | [SP-251265](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_109_Beijing_2025-09/Docs/SP-251265.zip) |
| [AMD-ARCH-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060069) | 1060069 | Stage 2 for Advanced Media Delivery | S4 | Normative | [TS 26.501](https://www.3gpp.org/dynareport/26501.htm), [TS 26.502](https://www.3gpp.org/dynareport/26502.htm) | Complete, Mar 2025 | [SP-241963](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_106_Madrid_2024-12/Docs/SP-241963.zip) |
| [AMD_PRO-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1070057) | 1070057 | Stage 3 for Advanced Media Delivery | S4 | Normative | [TS 26.517](https://www.3gpp.org/dynareport/26517.htm) (with [TS 26.510](https://www.3gpp.org/dynareport/26510.htm), [TS 26.511](https://www.3gpp.org/dynareport/26511.htm), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm), [TS 26.532](https://www.3gpp.org/dynareport/26532.htm), [TS 26.247](https://www.3gpp.org/dynareport/26247.htm)) | Complete, Dec 2025 | [SP-250265](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_107_Incheon_2025-03/Docs/SP-250265.zip) |
| [FS_AMD](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1030006) | 1030006 | Study on Advanced Media Delivery | S4 | Study | [TR 26.802](https://www.3gpp.org/dynareport/26802.htm), [TR 26.804](https://www.3gpp.org/dynareport/26804.htm) | Complete, Dec 2024 | [SP-241011](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_104_Shanghai_2024-06/Docs/SP-241011.zip) |
| [AMD_PRO-MED-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1080004) | 1080004 | CT aspects of Advanced Media Delivery |  | Normative | [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) | Complete, Sep 2025 | [CP-252191](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_109_Beijing-2025-09/Docs/CP-252191.zip) |
| [AMD_PRO-MED-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1080034) | 1080034 | CT4 aspects of Advanced Media Delivery | C4 | Normative | [TS 29.580](https://www.3gpp.org/dynareport/29580.htm), [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) (note 3) | Complete, Sep 2025 | [CP-252191](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_109_Beijing-2025-09/Docs/CP-252191.zip) |
| [5GMS_Pro_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000018) | 1000018 | 5G Media Streaming Protocols Phase 2 | S4 | Normative | [TS 26.517](https://www.3gpp.org/dynareport/26517.htm) (with [TS 26.510](https://www.3gpp.org/dynareport/26510.htm), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm), [TS 26.532](https://www.3gpp.org/dynareport/26532.htm), [TS 26.247](https://www.3gpp.org/dynareport/26247.htm)) | Complete, Jun 2024 | [SP-230976](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_101_Bangalore_2023-09/Docs/SP-230976.zip) |
| [SBIProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960060) | 960060 | CT3 aspects of SBIProtoc18 | C3 | Normative | [TS 29.580](https://www.3gpp.org/dynareport/29580.htm) (note 3) | Complete, Dec 2023 | [CP-221083](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221083.zip) |

</details>

**Notes**

1. The work plan lists the output of FS_5GMS_Multicast as "new". Its study description, SP-200238, names one new TR titled "Multicast Architecture Enhancement for 5G Media Streaming", the title of TR 26.802.
2. The work plan row of 5MBP3 does not list TS 26.517. Its WID, SP-211335, names one new TS titled "5G Multicast-Broadcast User Services; Protocols and Formats", the title of TS 26.517.
3. This row also lists 5G System specifications; they are shown in the MBS section.
4. The work plan row lists no specifications. Its WID, CP-232031, lists TS 29.580 among the impacted specifications, with CT3 responsibility.

## MBS

### Release 20

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [TEI20_5MBS_Roam-ARC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110025) | 1110025 | 5MBS consumption by Roaming UEs | S2 | Normative | [TS 23.247](https://www.3gpp.org/dynareport/23247.htm), [TS 23.287](https://www.3gpp.org/dynareport/23287.htm) | Complete, Sep 2026 | [SP-260330](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260330.zip) |

### Release 19

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [DTT4MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970043) | 970043 | Interworking of Non-3GPP Digital Terrestrial Broadcast Networks with 5GS Multicast Broadcast Services | S1 | Normative | [TS 22.261](https://www.3gpp.org/dynareport/22261.htm) | Complete, Sep 2022 | [SP-220941](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_97E_Electronic_2022-09/Docs/SP-220941.zip) |

TS 23.247's change history lists two Release 19 change requests titled "MBS broadcast support for NTN" (CR 0372 in V19.1.0, CR 0388 in V19.3.0). It does not name their work item, and no Release 19 row of the work plan lists TS 23.247.

### Release 18

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=989999) | 989999 | 5G multicast-broadcast services Phase 2 |  | Feature | [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm), [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) | Complete, Mar 2024 | [SP-221131](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_98E_Electronic_2022-12/Docs/SP-221131.zip) |
| [FS_5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940067) | 940067 | Study on architectural enhancements for 5G multicast-broadcast services Phase 2 | S2 | Study | [TR 23.700-47](https://www.3gpp.org/dynareport/23700-47.htm) | Complete, Dec 2022 | [SP-220072](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_95E_Electronic_2022_03/Docs/SP-220072.zip) |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980013) | 980013 | (Stage 2 of 5MBS_Ph2) Architectural enhancements for 5G multicast-broadcast services Phase 2 | S2 | Normative | [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm), [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) | Complete, Jun 2023 | [SP-230099](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230099.zip) |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990001) | 990001 | CT1 aspects for 5MBS_Ph2 | C1 | Normative | None listed (note 2) | Complete, Mar 2024 | [CP-232031](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_101_Bangalore/Docs/CP-232031.zip) |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990076) | 990076 | CT3 aspects for 5MBS_Ph2 | C3 | Normative | None listed (note 2) | Complete, Mar 2024 | [CP-232031](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_101_Bangalore/Docs/CP-232031.zip) |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990077) | 990077 | CT4 aspects for 5MBS_Ph2 | C4 | Normative | None listed (note 2) | Complete, Mar 2024 | [CP-232031](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_101_Bangalore/Docs/CP-232031.zip) |
| [5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000005) | 1000005 | Security Enhancements for 5G Multicast-Broadcast Services Phase 2 | S3 | Normative | [TS 33.501](https://www.3gpp.org/dynareport/33501.htm) | Complete, Sep 2023 | [SP-230559](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_100_Taipei_2023-06/Docs/SP-230559.zip) |
| [FS_5MBS_SEC_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960041) | 960041 | Study on security enhancements for 5G multicast-broadcast services Phase 2 | S3 | Study | [TR 33.883](https://www.3gpp.org/dynareport/33883.htm) | Complete, Mar 2023 | [SP-220539](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220539.zip) |
| [NR_MBS_enh](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940099) | 940099 | Enhancements of NR Multicast and Broadcast Services |  | Feature | None listed (note 3) | Complete, Mar 2026 | [RP-232993](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_102/Docs/RP-232993.zip) |
| [NR_MBS_enh-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940199) | 940199 | Core part: Enhancements of NR Multicast and Broadcast Services | R2 | Normative | None listed (note 3) | Complete, Dec 2023 | [RP-232993](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_102/Docs/RP-232993.zip) |
| [NR_MBS_enh_5MBS_Ph2-UEConTest](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060077) | 1060077 | UE Conformance - Enhancements of NR Multicast and Broadcast Services including CT aspects | R5 | Testing | None listed | Complete, Mar 2026 | [RP-260689](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_111/Docs/RP-260689.zip) |
| [UEConfig5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990078) | 990078 | UE pre-configuration for 5MBS |  | Feature | [TS 31.102](https://www.3gpp.org/dynareport/31102.htm); [TS 24.575](https://www.3gpp.org/dynareport/24575.htm) (note 4) | Complete, Mar 2024 | [CP-230201](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_99_Rotterdam/Docs/CP-230201.zip) |
| [UEConfig5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990022) | 990022 | CT1 aspects of UEConfig5MBS | C1 | Normative | [TS 31.102](https://www.3gpp.org/dynareport/31102.htm) | Complete, Mar 2024 | [CP-230201](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_99_Rotterdam/Docs/CP-230201.zip) |
| [UEConfig5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990079) | 990079 | CT6 aspects of UEConfig5MBS | C6 | Normative | [TS 31.102](https://www.3gpp.org/dynareport/31102.htm) | Complete, Mar 2023 | [CP-230201](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_99_Rotterdam/Docs/CP-230201.zip) |
| [5MBS_CH](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000010) | 1000010 | Charging Aspects for SMF and MB-SMF to Support 5G Multicast-broadcast Services | S5 | Normative | [TS 32.240](https://www.3gpp.org/dynareport/32240.htm), [TS 32.255](https://www.3gpp.org/dynareport/32255.htm), [TS 32.298](https://www.3gpp.org/dynareport/32298.htm), [TS 32.291](https://www.3gpp.org/dynareport/32291.htm), "33.279", "33.290" (note 5) | Complete, Mar 2024 | [SP-231712](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_102_Edinburgh_2023-12/Docs/SP-231712.zip) |

### Release 17

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=900038) | 900038 | Multicast-broadcast services in 5G |  | Feature | None listed | Complete, Mar 2024 | [SP-201106](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_90E_Electronic/Docs/SP-201106.zip) |
| [FS_5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830030) | 830030 | Study on Architectural enhancements for 5MBS | S2 | Study | [TR 23.757](https://www.3gpp.org/dynareport/23757.htm) | Complete, Mar 2021 | [SP-200690](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_89E_Electronic/Docs/SP-200690.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=900009) | 900009 | Stage 2 for 5MBS | S2 | Normative | None listed; [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) (note 6) | Complete, Sep 2021 | [SP-201106](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_90E_Electronic/Docs/SP-201106.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920043) | 920043 | CT1 aspects of 5MBS | C1 | Normative | [TS 24.501](https://www.3gpp.org/dynareport/24501.htm), [TS 24.575](https://www.3gpp.org/dynareport/24575.htm) (note 4) | Complete, Mar 2022 | [CP-220402](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220402.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920044) | 920044 | CT3 aspects of 5MBS | C3 | Normative | [TS 29.508](https://www.3gpp.org/dynareport/29508.htm), [TS 29.512](https://www.3gpp.org/dynareport/29512.htm), [TS 29.513](https://www.3gpp.org/dynareport/29513.htm), [TS 29.514](https://www.3gpp.org/dynareport/29514.htm), [TS 29.519](https://www.3gpp.org/dynareport/29519.htm), [TS 29.520](https://www.3gpp.org/dynareport/29520.htm), [TS 29.521](https://www.3gpp.org/dynareport/29521.htm), [TS 29.522](https://www.3gpp.org/dynareport/29522.htm), [TS 29.525](https://www.3gpp.org/dynareport/29525.htm), [TS 29.561](https://www.3gpp.org/dynareport/29561.htm) (note 1) | Complete, Mar 2022 | [CP-220402](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220402.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910002) | 910002 | CT4 aspect of 5MBS | C4 | Normative | [TS 23.003](https://www.3gpp.org/dynareport/23003.htm), [TS 29.244](https://www.3gpp.org/dynareport/29244.htm), [TS 29.281](https://www.3gpp.org/dynareport/29281.htm), [TS 29.502](https://www.3gpp.org/dynareport/29502.htm), [TS 29.503](https://www.3gpp.org/dynareport/29503.htm), [TS 29.510](https://www.3gpp.org/dynareport/29510.htm), [TS 29.518](https://www.3gpp.org/dynareport/29518.htm), [TS 29.571](https://www.3gpp.org/dynareport/29571.htm), [TS 29.532](https://www.3gpp.org/dynareport/29532.htm), [TS 29.537](https://www.3gpp.org/dynareport/29537.htm) (note 1) | Complete, Mar 2022 | [CP-220402](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220402.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960067) | 960067 | CT6 aspects of 5MBS | C6 | Normative | None listed (note 7) | Complete, Mar 2022 | [CP-220402](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220402.zip) |
| [5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920023) | 920023 | Security Aspects of Enhancements for 5G Multicast-Broadcast Services | S3 | Normative | [TS 33.501](https://www.3gpp.org/dynareport/33501.htm) | Complete, Jun 2022 | [SP-210420](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_92E_Electronic_2021_06/Docs/SP-210420.zip) |
| [FS_5MBS_SEC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880006) | 880006 | Study on Security Aspects of Enhancements for 5G Multicast-Broadcast Services | S3 | Study | [TR 33.850](https://www.3gpp.org/dynareport/33850.htm) | Complete, Dec 2021 | [SP-200351](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_88E_Electronic/Docs/SP-200351.zip) |
| [5MBS_eMC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=850040) | 850040 | Broadcast / Multicast requirements supporting Mission Critical Services in 5G | S1 | Normative | [TS 22.261](https://www.3gpp.org/dynareport/22261.htm) | Complete, Dec 2019 | [SP-190942](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_85/Docs/SP-190942.zip) |
| [NR_MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=860048) | 860048 | NR multicast and broadcast services | R2 | Feature | None listed (note 3) | Complete, Dec 2023 | [RP-220428](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_95e/Docs/RP-220428.zip) |
| [NR_MBS-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=860148) | 860148 | Core part: NR multicast and broadcast services | R2 | Normative | None listed (note 3) | Complete, Mar 2022 | [RP-220428](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_95e/Docs/RP-220428.zip) |
| [NR_MBS_5MBS_5MBUSA-UEConTest](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=950061) | 950061 | UE Conformance - NR Multicast and Broadcast Services including CT and SA aspects | R5 | Testing | None listed | Complete, Dec 2023 | [RP-220423](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_95e/Docs/RP-220423.zip) |

### Other work items that changed MBS specifications

These work items are not MBS work items, but the work plan, or for NR_NTN_Ph3 its WID, relates them to MBS specifications.

<details>
<summary>The five work items, Release 18 and Release 19</summary>

| Work item | ID | Title | Group | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [AMD_PRO-MED-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1080034) | 1080034 | CT4 aspects of Advanced Media Delivery | C4 | Normative | [TS 29.522](https://www.3gpp.org/dynareport/29522.htm) (note 1) | Complete, Sep 2025 | [CP-252191](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_109_Beijing-2025-09/Docs/CP-252191.zip) |
| [NR_NTN_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020097) | 1020097 | Non-Terrestrial Networks (NTN) for NR Phase 3 |  | Feature | None listed (note 8) | 87%, due Mar 2025 | [RP-251954](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_109/Docs/RP-251954.zip) |
| [NR_NTN_Ph3-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1021097) | 1021097 | Core part: Non-Terrestrial Networks (NTN) for NR Phase 3 | R2 | Normative | None listed (note 8) | Complete, Sep 2025 | [RP-251954](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_109/Docs/RP-251954.zip) |
| [SBIProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960001) | 960001 | CT4 aspects of SBIProtoc18 | C4 | Normative | [TS 29.532](https://www.3gpp.org/dynareport/29532.htm) (with 31 other 29-series specifications) | Complete, Dec 2023 | [CP-221083](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221083.zip) |
| [SBIProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960060) | 960060 | CT3 aspects of SBIProtoc18 | C3 | Normative | [TS 29.537](https://www.3gpp.org/dynareport/29537.htm) (with 22 other 29-series specifications; note 1) | Complete, Dec 2023 | [CP-221083](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221083.zip) |

</details>

**Notes**

1. This row also lists MBS User Services specifications; they are shown in the MBS User Services section.
2. The three CT rows of 5MBS_Ph2 list no specifications. Their WID, CP-232031, lists TS 23.003, TS 29.503, TS 29.505, TS 29.518, TS 29.532 and TS 29.571 (CT4), TS 24.501 (CT1), and TS 29.522 and TS 29.561 (CT3).
3. The NR MBS rows list no specifications. The Release 17 WID, RP-220428, lists TS 38.300, TS 38.331, TS 38.321, TS 38.322, TS 38.323, TS 38.304, TS 38.306, TS 37.324, TS 38.420, TS 38.423, TS 38.410, TS 38.413, TS 38.401, TS 38.470, TS 38.473, TS 38.460, TS 38.463, TS 38.415, TS 38.425, TS 38.211, TS 38.212, TS 38.213 and TS 38.214 as impacted. The Release 18 WID, RP-232993, lists TS 38.300, TS 38.331, TS 38.304, TS 38.321, TS 38.306, TS 38.323, TS 38.423, TS 38.413, TS 38.473, TS 38.401, TS 37.483, TS 38.470, TS 38.410, TS 38.202, TS 38.211, TS 38.212, TS 38.213 and TS 38.214.
4. The Release 17 CT1 row of 5MBS lists TS 24.575, but the 3GPP archive has no Release 17 version of it. TS 24.575 was first presented in March 2023 (CP-230183) under the Release 18 work item UEConfig5MBS, and its first version under change control is V18.0.0.
5. The row of 5MBS_CH lists "33.279" and "33.290". Its WID, SP-231712, names TS 32.279 "Charging management; 5G Multicast-broadcast Services charging" as the new specification and TS 32.290 as impacted. In the work plan the row sits under the Release 17 5MBS parent (900038), with Release 18.
6. The row lists no specifications. Its WID, SP-201106, names one new TS titled "Architectural enhancements for 5G multicast-broadcast services", the title of TS 23.247, and lists TS 23.501, TS 23.502 and TS 23.503 as impacted.
7. The row lists no specifications. Its WID, CP-220402, lists TS 31.102 with CT6 responsibility.
8. The NR_NTN_Ph3 rows list no specifications. Their WID, RP-251954, has one MBS objective: to specify signaling of the intended service area of a broadcast service, for example MBS broadcast, via NR NTN. TS 38.300 V19.4.0 has a clause 16.14.12, "Support of ISA for MBS Broadcast in NTN", which V18.11.0 does not have.

## Related

- [Standards: 5G Multicast Broadcast Services (MBS)](/standards/5g-mbs)
- [Standards: 5G Media Streaming - Standards Evolution](/standards/5gms/evolution)
- [Standards: 5G Broadcast - Standards Evolution](/standards/5g-broadcast/evolution)

## Sources for this page

<details>
<summary>Documents, versions and clauses each section rests on</summary>

- **Novelties by release:** TR 21.917 clauses 6.3.4.3 to 6.3.4.6; TR 21.918 clauses 12.1 to 12.3 and 16.1; TR 21.919 clauses 11.6 and 25.5.1; change histories of TS 23.247 V20.0.0, TS 26.502 V19.6.0, TS 26.517 V19.3.0, TS 29.580 V20.0.0, TS 29.581 V20.0.0, TS 29.532 V20.0.0, TS 24.575 V19.0.0 and TS 22.261 V19.15.0; TS 29.580 clause 6.2.8; TS 23.247 V17.12.0 and V18.8.0 clause lists; TR 26.802 V20.0.0 clause 8.4 and 8.5.
- **Work plan:** 3GPP work plan of 28 September 2026 (Work_plan_3gpp_2026_09_28.xlsx), the rows listed above, read by Unique_ID: name, acronym, release, responsible group, completion, finish date, impacted specifications and WID.
- **MBS User Services WIDs:** SP-200238 and SP-211335, clause 5 (expected output); CP-220402, clause 5 (new specifications TS 29.580 and TS 29.581); CP-232031, clause 5; CP-252191, clause 5.
- **MBS WIDs:** SP-201106, clause 5; CP-220402, clause 5; CP-230201, clause 5; CP-230183 (presentation of TS 24.575); SP-231712, clause 5; RP-220428 and RP-232993, clause 5; RP-251954, clause 4; SP-260330, clause 5.
- **Specifications:** TS 23.247 V19.3.0, change history (CR 0372, CR 0388); TS 24.575 V19.0.0, change history; TS 38.300 V19.4.0 and V18.11.0, clause 16.14; 3GPP specification archive listing of TS 24.575 (no Release 17 version), read on 3 October 2026.

</details>
