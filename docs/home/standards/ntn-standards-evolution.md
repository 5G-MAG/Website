---
hide_title: true
title: Non-Terrestrial Networks in 5G Systems - Standards Evolution
slug: /standards/ntn/evolution
description: Release-by-release 3GPP work item and Change Request history behind Non-Terrestrial Networks in 5G Systems.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z"/><path d="M6 10l-3 3l3 3l3 -3"/><path d="M10 6l3 -3l3 3l-3 3"/><path d="M14 17a3 3 0 0 0 3 -3"/><path d="M20 13a9 9 0 0 0 -9 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Non-Terrestrial Networks in 5G Systems - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Standards: Non-Terrestrial Networks in 5G Systems](/standards/ntn): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 20:** 1 change request.
- **Release 19:** 26 change requests.
- **Release 18:** 14 change requests.
- **Release 17:** work item NR_NTN_solutions-Core; 22 change requests.
- **Release 16:** work items FS_NR_NTN_solutions, FS_5GSAT; 1 change request.
- **Release 15:** work item FS_NR_nonterr_nw; 8 change requests.

:::

Work items as listed in the 3GPP work plan of 28 September 2026. Change requests are the ones implemented in a version, as recorded in the 3GPP Change Request database of 25 September 2026; versions without a change request are from the change history of TR 38.811 V15.4.0, TR 38.821 V16.2.0, TR 38.863 V20.0.0, TR 22.822 V16.0.0, TR 23.737 V17.2.0.

**Scope of this page**

- Specifications covered: [TR 38.811](https://www.3gpp.org/dynareport/38811.htm), [TR 38.821](https://www.3gpp.org/dynareport/38821.htm), [TR 38.863](https://www.3gpp.org/dynareport/38863.htm), [TR 22.822](https://www.3gpp.org/dynareport/22822.htm), [TR 23.737](https://www.3gpp.org/dynareport/23737.htm).
- Shared specifications whose change histories cover every feature of the 5G system and are not reproduced (see the specifications themselves): [TS 38.331](https://www.3gpp.org/dynareport/38331.htm), [TS 38.300](https://www.3gpp.org/dynareport/38300.htm), [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm), [TS 23.247](https://www.3gpp.org/dynareport/23247.htm), [TS 26.502](https://www.3gpp.org/dynareport/26502.htm), [TS 26.501](https://www.3gpp.org/dynareport/26501.htm).
- Work items: those that name one of the specifications covered as impacted in the work plan.
- Type: Study where the acronym starts with FS_ or the title starts with "Study", Normative otherwise.
- The Change Request database lists implemented change requests that the change history of the specification does not: TR 38.863 (8 more). The tables use the database.
- The change history of TR 38.811, TR 38.821 is a Word 97 table that the tools used could not read in full; its listed draft versions may be incomplete.
- TS 23.247, TS 26.502 and TS 26.501 are covered by the 5G MBS and 5G Media Streaming pages. The work plan lists more than a hundred work items that mention satellite or NTN in their title, most of them RAN core and performance parts and band introductions; they are not reproduced here.

### Release 20

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 38.863 | 20.0.0 | 0076 | : Introduction of the 3MHz channel bandwidth and PC2/PC1 for n250, n251, n252, n253 | NTN_bands_Features_R20-Core |

### Release 19

<details>
<summary>26 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 38.863 | 19.0.0 | 0028 | CR to TR 38.863: Introduction of NR-NTN band n252 | NR_NTN_Sband-Core |
| TR 38.863 | 19.0.1 |  | Minor editorial update |  |
| TR 38.863 | 19.1.0 | 0029 | CR to TR 38.863 on SAN RF requirements for less than 5MHz | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.1.0 | 0032 | (NR_NTN_solutions-Core) Correction of the NR NTN band n256 REFSENS values | NR_NTN_solutions-Core |
| TR 38.863 | 19.1.0 | 0035 | (NR_NTN_solutions-Core) Clarification of the NR NTN band n256 out-of-band blocking requirements | NR_NTN_solutions-Core |
| TR 38.863 | 19.1.0 | 0036 | Addition of the 3MHz channel to TR 38.863 | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.1.0 | 0037 | Formal BigCR to TR 38.863 for NTN HPUE | NR_IoT_NTN_req_test_enh |
| TR 38.863 | 19.1.0 | 0039 | CR to TR 38.863: Introduction of combined L-bands n253, n251, n250 | NR_NTN_combinedLband-Core |
| TR 38.863 | 19.1.0 | 0042 | Big CR for TR 38.863 Introduction of Ku Bands | NR_NTN_Ku_bands-Core |
| TR 38.863 | 19.2.0 | 0043 | Addition of power back-off simulation results for the NTN L-bands | NR_NTN_combinedLband-Core |
| TR 38.863 | 19.2.0 | 0044 | Clarification for the simulation assumptions for NTN L-band and S-band power back-off results | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.2.0 | 0045 | (NR_NTN_Ku_bands-Core) CR to TR 38.863 - Regulatory context for the NTN Ku-bands | NR_NTN_Ku_bands-Core |
| TR 38.863 | 19.3.0 | 0049 | Corrections for the NTN NR L-band NS flag references | IoT_NTN_FDD_S_band-Core |
| TR 38.863 | 19.3.0 | 0050 | Corrections for the NTN NR L-band NS flag references | NR_NTN_combinedLband-Core |
| TR 38.863 | 19.3.0 | 0051 | Corrections for the NS_02N and NS_24N flag references | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.4.0 | 0053 | Corrections for the NTN band n255 NS_02N flag references | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.4.0 | 0054 | Corrections of the NTN band n256 NS_24N A-MPR values | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.4.0 | 0055 | Corrections of the NTN band n252 A-MPR values | NR_NTN_Sband-Core |
| TR 38.863 | 19.5.0 | 0058 | 3 MHz channel BW related updates to non-band specific SAN clauses | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.5.0 | 0060 | CR to TR 38.863 on editorial corrections | NR_IoT_NTN_req_test_enh |
| TR 38.863 | 19.5.0 | 0064 | Addition of ETSI requirements for the MSS L- and S-band | NR_NTN_solutions-Core |
| TR 38.863 | 19.5.0 | 0065 | Corrections to the NTN band n255 NS_02N A-MPR definitions | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.5.0 | 0066 | Corrections to the NTN band n256 NS_24N A-MPR definitions | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.5.0 | 0067 | Corrections to the NTN band n256 NS_24N 3MHz A-MPR definitions | NR_IoT_NTN_req_test_enh-Core |
| TR 38.863 | 19.5.0 | 0070 | Correcting x-axis labels in Delay and Doppler variation examples | NR_IoT_NTN_req_test_enh-Perf |
| TR 38.863 | 19.5.0 | 0074 | CR to TR 38.863, on correction of Asymmetric channel bandwidth | NR_NTN_Sband-Core |
| TR 38.863 | 19.5.0 | 0075 | Editorial corrections to the definitions of A-MPR regions | NR_IoT_NTN_req_test_enh-Core, NR_NTN_Sband-Core |

</details>

### Release 18

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 38.863 | 18.0.0 | 0010 | NTN enhancement: CR to TR 38.863 NTN Ka-band Regulatory aspects | NR_NTN_enh-Core |
| TR 38.863 | 18.1.0 | 0012 | CR on TR38.863 Addition of simulation assumptions in above 10GHz | NR_NTN_enh-Core |
| TR 38.863 | 18.1.0 | 0013 | CR proposal to add Doppler and Delay variation examples as a function of time for NGSO and GSO in a new Annex | NR_NTN_enh-Core |
| TR 38.863 | 18.2.0 | 0015 | CR on TR 38.863 Addition of simulation results in above 10GHz | NR_NTN_enh-Core |
| TR 38.863 | 18.2.0 | 0016 | CR on TR38.863 Summary of coeixstence results in above 10GHz | NR_NTN_enh-Core |
| TR 38.863 | 18.2.0 | 0017 | CR for TR 38.863 to introduce some technical background for R18 NTN VSAT UE Tx requirements | NR_NTN_enh-Core |
| TR 38.863 | 18.2.0 | 0018 | CR for TR 38.863 to introduce some technical background for R18 NTN VSAT UE Rx requirements | NR_NTN_enh-Core |
| TR 38.863 | 18.3.0 | 0020 | Maintenance CR for Ka-band coexistence results to TR 38.863 | NR_NTN_enh-Core |
| TR 38.863 | 18.4.0 | 0021 | (NR_NTN_enh-Core) CR for TR 38.863, On NTN system parameters for Ka-band co-existence | NR_NTN_enh-Core |
| TR 38.863 | 18.5.0 | 0023 | (NR_NTN_solutions-Core) Corrections to TR 38.863 to align with TS 38.101-5 | NR_NTN_solutions-Core |
| TR 38.863 | 18.6.0 | 0025 | CR for TR 38.863, Correction on tolerance for UE Transmission characteristics for satellite access | NR_NTN_solutions-Core |
| TR 38.863 | 18.7.0 | 0031 | (NR_NTN_solutions-Core) Correction of the NR NTN band n256 REFSENS values | NR_NTN_solutions-Core |
| TR 38.863 | 18.7.0 | 0034 | (NR_NTN_solutions-Core) Clarification of the NR NTN band n256 out-of-band blocking requirements | NR_NTN_solutions-Core |
| TR 38.863 | 18.8.0 | 0063 | Addition of ETSI requirements for the MSS L- and S-band | NR_NTN_solutions-Core |

### Release 17

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [NR_NTN_solutions-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=860146) | Core part: Solutions for NR for NTN | Normative | [TR 38.863](https://www.3gpp.org/dynareport/38863.htm) (with TS 38.101-5) | Complete, Jun 2022 | [RP-221169](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_96/Docs/RP-221169.zip) |

<details>
<summary>22 change requests and 2 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 23.737 | 17.0.0 |  | MCC update for publication after TSG SA#86 approval |  |
| TR 38.863 | 17.0.0 |  | Approved by plenary – Rel-17 spec under change control |  |
| TR 23.737 | 17.1.0 | 0002 | KI #1 solutions evaluation | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0003 | KI #1 conclusions | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0004 | Sol#13: Additional description and evaluation of Solution #13 | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0005 | Sol#12: Handling of Cell ID in Solution #12 | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0006 | Sol#1: Updates to Solution#1 | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0007 | Conclusion on KI#1 and KI#2 | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0008 | Conclusion update on KI #5 | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0009 | Update the conclusion for KI#4 | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0011 | Key Issue 10 solution evaluation | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0012 | Key Issue 10 conclusions | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0017 | KI #X, #1, #2, #10, New Sol: Solution for Key Issue for Minimization of 5GCN Impacts | FS_5GSAT_ARCH |
| TR 23.737 | 17.1.0 | 0018 | KI #13, #x, #y, New Sol: Solution for Key Issue for accessing PLMNs in the same country | FS_5GSAT_ARCH |
| TR 38.863 | 17.1.0 | 0001 | CR for 38.863 to maintain UE RF parts | NR_NTN_solutions-Core |
| TR 38.863 | 17.1.0 | 0002 | Correction to TR 38.863 on Regulatory aspects for HAPS | NR_NTN_solutions-Core |
| TR 23.737 | 17.2.0 | 0019 | Using inclusive language in TR 23.737 | FS_5GSAT_ARCH, TEI17 |
| TR 38.863 | 17.2.0 | 0005 | CR for TR 38.863 to maintain SAN parts | NR_NTN_solutions-Core |
| TR 38.863 | 17.3.0 | 0009 | CR for TR 38.863, Correction on Satellite and UE Antenna and beam forming pattern modelling | NR_NTN_solutions-Core |
| TR 38.863 | 17.4.0 | 0022 | (NR_NTN_solutions-Core) Corrections to TR 38.863 to align with TS 38.101-5 | NR_NTN_solutions-Core |
| TR 38.863 | 17.5.0 | 0027 | CR for TR 38.863, Correction on tolerance for UE Transmission characteristics for satellite access | NR_NTN_solutions-Core |
| TR 38.863 | 17.6.0 | 0030 | (NR_NTN_solutions-Core) Correction of the NR NTN band n256 REFSENS values | NR_NTN_solutions-Core |
| TR 38.863 | 17.6.0 | 0033 | (NR_NTN_solutions-Core) Clarification of the NR NTN band n256 out-of-band blocking requirements | NR_NTN_solutions-Core |
| TR 38.863 | 17.7.0 | 0062 | Addition of ETSI requirements for the MSS L- and S-band | NR_NTN_solutions-Core |

</details>

### Release 16

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_NR_NTN_solutions](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=800099) | Study on solutions for NR to support non-terrestrial networks (NTN) | Study | [TR 38.821](https://www.3gpp.org/dynareport/38821.htm) | Complete, Dec 2019 | [RP-190710](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_83/Docs/RP-190710.zip) |
| [FS_5GSAT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=770002) | Study on using Satellite Access in 5G | Study | [TR 22.822](https://www.3gpp.org/dynareport/22822.htm) | Complete, Jun 2018 | [SP-170702](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_77/Docs/SP-170702.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 22.822 | 16.0.0 |  | Raised to v.16.0.0 following one-step-approval at SA |  |
| TR 38.821 | 16.2.0 | 0002 | Corrections to abbreviations, figures and table header | FS_NR_NTN_solutions |

### Release 15

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_NR_nonterr_nw](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=750040) | Study on NR to support non-terrestrial networks | Study | [TR 38.811](https://www.3gpp.org/dynareport/38811.htm) | Complete, Jun 2018 | [RP-171450](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_76/Docs/RP-171450.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 38.811 | 15.0.0 |  |  |  |
| TR 38.811 | 15.1.0 | 0001 | Corrections for TR38.811 Chapter 6 Non-Terrestrial Networks channel models | FS_NR_nonterr_nw |
| TR 38.811 | 15.2.0 | 0002 | Correction to NTN channel models | FS_NR_NTN_solutions |
| TR 38.811 | 15.2.0 | 0003 | Corrections for TR38.811 Section 6.8.2 Non-Terrestrial Networks channel models | FS_NR_nonterr_nw |
| TR 38.811 | 15.2.0 | 0004 | Correction to NTN channel models (Ionospheric scintillations) | FS_NR_NTN_solutions |
| TR 38.811 | 15.2.0 | 0005 | CR TR 38.811 Section 6.9.2 and 5.3.4 | FS_NR_nonterr_nw, FS_NR_NTN_solutions |
| TR 38.811 | 15.3.0 | 0006 | Correction for inconsistent shadow fading parameters in NTN rural scenario | FS_NR_nonterr_nw |
| TR 38.811 | 15.4.0 | 0007 | Corrected implementation for inconsistent shadow fading parameters in NTN rural scenario | FS_NR_nonterr_nw |
| TR 38.811 | 15.4.0 | 0008 | Correction to NTN channel model | FS_NR_nonterr_nw |

### TR 38.811 before change control

<details>
<summary>7 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Jun 2017 | RP-76 | RP-170983 | Skeleton report provided as input to RAN #76 | 0.0.0 |
| Jun 2017 | RP-76 | RP-171453 | Agreed version as output of RAN #76 including pCRs of RP-170917, RP-170918, RP-171447, RP-171448. | 0.1.0 |
| Sep 2017 | RP-77 | RP-172074 | Agreed version as output of RAN #77 including pCRs of RP-171578, RP-171579, RP-171580, RP-172075. | 0.2.0 |
| Nov 2017 | RP-78 | RP-172179 | Cleanup of v0.2.0 to align with 3GPP drafting rules | 0.2.1 |
| Dec 2017 | RP-78 | RP-172794 | Agreed version as output of RAN #78 including pCRs of RP-172274, RP-172768, RP-172769 | 0.3.0 |
| Mar 2018 | RP-79 | RP-180545 | Agreed version as output of RAN #79 including pCRs of RP-180036, RP-180135, RP-180180, RP-180543 | 0.4.0 |
| Jun 2018 | RP-80 | RP-181393 | Agreed version as output of RAN #80 including pCRs of RP-180661, RP-181381, RP-181382, RP-181383, RP-181392, RP-181394 | 1.0.0 |

</details>

### TR 38.821 before change control

<details>
<summary>2 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2018 | RAN3#101 | R3-185304 | Skeleton TR | 0.0.0 |
| Aug 2018 | RAN3#101 | R3-185333 | Agreed version including pCRs of R3-184522, R3-185235, R3-185310 | 0.1.0 |

</details>

### TR 38.863 before change control

<details>
<summary>4 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Nov 2021 | RAN4# 101-e | R4-2120776 | Added approved TPs in RAN4#101-e including: R4-2120759, draft TP to TR 38.863: Operating bands and channel arrangements R4-2120760, TP for 38.863 on system parameters on satellite bands R4-2120761,TP to TR 38.863 – Regulatory aspects R4-2120762, TP to TR 38.863: node class, RF RX (6.2) R4-2120763, TP for 38.863 on NTN UE transmission characteristics R4-2120772, Draft text proposal to update TR 38.863 NTN related RF and co-existence aspects | 0.1.0 |
| Jan 2022 | RAN4#101-bis-e |  | Added approved TPs in RAN4#101-bis-e including: R4-2201257, TP for 38.863 on system parameters to clarify “NTN satellite bands” R4-2201838, Draft proposal to update TR 38.863 NTN related RF and co-existence aspects R4-2202988, Draft Text Proposal for TR 38.863 R4-2203037, TP for 38.863 on UE transmission characteristics for satellite access R4-2203038, TP for 38.863 on maximum input level for NTN UE R4-2203039, TP for 38.863 on UE Receiver characteristics for satellite access R4-2203040, TP to TR 38.863 on transmitter characteristics for satellite access node R4-2203081, Draft text proposal to update TR 38.863 Chapter 3 R4-2203082, TP to TR 38.863 on channel raster and sync raster R4-2203084, TP to TR 38.863 Regulatory aspects for HAPS R4-2203085, TP to TR 38.863 on general aspects R4-2203129, TP to TR 38.863 – Regulatory aspects | 0.2.0 |
| Mar 2022 | RAN4#102-e |  | Added approved TPs in RAN4#102--e including: R4-2205557, R4-2207330, TP TR 38.863 7.4.1 NTN UE Requirement (General) R4-2207333, TP to TR 38.863 on Section 5.2 NTN Satellite band R4-2207338, TP for TR 38.863: Regulatory aspects for NTN satellite access nodes and Ues operating in UL1626.5-1660.5 MHz and DL 1525-1559 MHz frequencies ranges R4-2207339, TP to TR 38.863 Regulatory aspects for HAPS R4-2207345, Draft text proposal for Clauses 7, 7.1, 7.2, 7.3 in TR 38.863 R4-2207351, Draft text proposal to update TR 38.863 Chapter 6 R4-2207353, Draft text proposal for Clauses 6.4 and 6.5 in TR 38.863 to include simulation results based on Non-AAS antenna assumption R4-2207360, Draft text proposal for Clause 7.3.4.7.3 OTA ACLR in TR 38.863 R4-2207367, Draft text proposal for Clause 7.3.5.6 OTA Out-of-band blocking in TR 38.863 R4-2207379, Draft text proposal for Clause 7.3.3.2.4 Out-of-band blocking in TR 38.863 R4-2207381, Draft text proposal for Clauses 7.3.3.2.3.1 Adjacent Channel Selectivity (ACS) and 7.3.3.2.3.2 In-band blocking in TR 38.863 R4-2207397, TP on TR 38.863 for NTN UE Tx requirements R4-2207398, Draft TP to update TR 38.863 clause 7.4.3.2 on NTN UE ACS R4-2207399, Draft TP to update TR 38.863 clause 7.4.3.2 on Blocking characteristics R4-2207401, TP for TR38.863 on Intermodulation characteristics for NTN UE R4-2207402, TP for 38.863 on spurious response for NTN UE R4-2207403, TP for TR 38.863: Unwanted emissions for NTN satellite Ues transmitting in 1626.5 to 1660.5 MHz R4-2207406, TP for TR 38.863: Updates to UE Maximum Output Power for n255 R4-2207414, TP for 38.863 on UE Receiver characteristics for satellite access R4-2207460, Draft text proposal for Clause 7.3.2.2.4.1 ACLR in TR 38.863 | 0.3.0 |
| May 2022 | RAN4#103-e |  | Added approved TPs in RAN4#103e including: R4-2209089, TP for 38.863 on general part for NTN UE conducted receiver characteristics R4-2209364, TP for 38.863 on UE Rx spurious emission requirements for satellite access R4-2209365, TP for 38.863 on UE antenna characteristics for satellite access R4-2210228, Draft text proposal for Clauses 6.4 and 6.5 Corrections Typos - TR 38.863 R4-2210636, TP to TR 38.863: coexistence issues between NTN and TN from Rel-17 RAN4 study. R4-2210847, TP to TR 38.863 - Updates R4-2210848, Draft text proposal for Clause 6.1 Coexistence Figures - TR 38.863 R4-2210853, TP for 38.863: clause 7.3.2 Conducted transmission characteristics R4-2210858, TP to TR 38.863: Conducted reference sensitivity R4-2210859, TP to TR 38.863: Conducted Rx dynamic range R4-2210860, Draft text proposal for Clause 7.3.2.2.5 Transmitter spurious emissions - TR38.863 R4-2210865, Tentative draft pCR for Clause 7.3.2.2.4.2 Operating band unwanted emissions - TR 38.863 R4-2210866, Draft text proposal for Clause 7.3.2.2.1 SAN output power - TR 38.863 R4-2210867, Draft text proposal for Clause 7.3.3.3.1 OTA sensitivity - TR 38.863 R4-2210868, Draft text proposal for Clause 7.3.3.3.2 OTA reference sensitivity - TR 38.863 R4-2210869, Draft text proposal for Clause 7.3.3.3.3 OTA dynamic range - TR 38.863 R4-2210870, Draft text proposal for Clause 7.3.3.3.7 OTA receiver intermodulation - TR 38.863 R4-2210871, Draft text proposal for Clause 7.3.3.3.8 OTA in-channel selectivity - TR 38.863 R4-2210872, Draft text proposal for Clause 7.3.3.3.4 OTA in-band selectivity and blocking - TR 38.863 R4-2210875, TP for TR 38.863: Updates to n255 A-MPR Clause R4-2211133, Draft Text Proposal to Update TR 38.863 Chapter 3,6 and 8 R4-2211134, Draft Text Proposal to Update TR 38.863 structure R4-2211146, Draft text proposal for Clause 7.3.3.3.2 OTA reference sensitivity - TR 38.863 | 0.4.0 |

</details>

### TR 22.822 before change control

<details>
<summary>5 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Dec 2017 | SA1#80 | S1-174439 | Skeleton created | 0.0.0 |
| Dec 2017 | SA1#80 | S1-174283 | Addition of scope, 6 use cases, Annex A | 0.1.0 |
| Feb 2018 | SA1#81 | S1-180248 | Addition of definitions in Section 3 Existing text edited and clarified. 5 use cases added (5.7, 5,8, 5.9, 5.10, 5.11) 3 sections added (6, 7,8) Annex A modified | 0.2.0 |
| May 2018 | SA1#82 | S1-181289 | Edition of Section 2 Addition of Abbreviations in Section 3. Update of location of titles of Table (above, instead of below). 1 use case on Off-Shore Wind Farms (5.12) added. Removal of Editor’s notes and update of fewer Potential Requirements. Some potential requirements edited in Section 5 consistently with PR adopted in Section 8. Text added for Section 7 (Considerations),8 (Potential Requirements) and 9 (Conclusion and Recommendations) | 0.3.0 |
| May 2018 | SA#80 | SP-180335 | MCC Clean-up for one-step approval to SA | 1.0.0 |

</details>

### TR 23.737 before change control

<details>
<summary>2 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2019 | SP#85 | SP-190632 | MCC editorial update for presentation to TSG SA#85 | 1.0.0 |
| Dec 2019 | SP#86 | SP-191095 | MCC editorial update for presentation to TSG SA#86 for approval (updated to Release 17) | 2.0.0 |

</details>
