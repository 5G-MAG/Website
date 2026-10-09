---
hide_title: true
title: Public Warning Systems - Standards Evolution
slug: /standards/emergency-alerts/evolution
description: Release-by-release 3GPP work item and Change Request history behind Public Warning Systems.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
  <path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
  <path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Public Warning Systems - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Standards: Public Warning Systems](/standards/emergency-alerts): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 21:** 1 change request.
- **Release 20:** work items MLT-REQ, CPAS-CT; 12 change requests.
- **Release 19:** work items VMR_Ph2, PWS_NTN; 16 change requests.
- **Release 18:** work items 5GProtoc18, 5GProtoc18-non3GPP; 20 change requests.
- **Release 17:** work items NPN_PWS, 5GProtoc17, 5GProtoc17-non3GPP; 17 change requests.
- **Release 16:** work items ePWS, FS_ePWS, 5GProtoc16, 5GProtoc16-non3GPP; 26 change requests.
- **Release 15:** work items 5GS_Ph1-CT; 30 change requests.
- **Release 14:** work item FS_MBSP; 6 change requests.
- **Release 13:** 16 change requests.
- **Release 12:** work items PWS_Sec, PWS_Sec-SA1, PWS_Sec-SA3TR, REP_WMD-CT1, REP_WMD-CT4, REP_WMD-RFR_PWS, REP_WMD-RFR_PWS-Core; 45 change requests.
- **Release 11:** 43 change requests.
- **Release 10:** 20 change requests.
- **Release 9:** work items PWS, PWS-St3, PWS-RAN, PWS-RAN_UEConTest, CEBRO; 43 change requests.
- **Release 8:** work items ETWS, FS_PWS; 31 change requests.
- **Release 7:** 1 change request.
- **Release 6:** 3 change requests.
- **Release 5:** 2 change requests.
- **Release 4:** work item LCS4-CBS; 4 change requests.
- **Release 99:** work item CBS; 7 change requests.

:::

Sources: the 3GPP work plan of 28 September 2026, the 3GPP Change Request database of 25 September 2026, and the change history of TS 22.268 V21.0.0, TS 23.041 V20.0.0, TS 29.168 V19.0.0, TR 36.976 V19.0.0.

This page covers [TS 22.268](https://www.3gpp.org/dynareport/22268.htm), [TS 23.041](https://www.3gpp.org/dynareport/23041.htm), [TS 29.168](https://www.3gpp.org/dynareport/29168.htm), [TR 36.976](https://www.3gpp.org/dynareport/36976.htm). The work items are those that name these specifications in the 3GPP work plan, and those whose title contains "Public Warning", "PWS" or "Cell Broadcast". The change requests are those recorded in the 3GPP Change Request database as implemented in a version.

### Release 21

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 21.0.0 | 0101 | Update PWS specification for 6G (admin rev of S1-263380) | 6G-REQ |

### Release 20

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [MLT-REQ](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1130012) | Stage 1 for Multilingual Template-based alerts | Normative | [TS 22.268](https://www.3gpp.org/dynareport/22268.htm) | 0% complete, planned Sep 2026 | [SP-261004](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_113_Madrid_2026-09/Docs/SP-261004.zip) |
| [CPAS-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110012) | CT aspects of CPAS | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | 90% complete, planned Dec 2026 | [CP-260046](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260046.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 20.0.0 | 0090 | Add new specific service requirements for CPAS | AIML_Ph2_APP-CT |
| TS 23.041 | 20.0.0 | 0273 | Message ID definition for CPAS | CPAS-CT |
| TS 23.041 | 20.0.0 | 0277 | CMAS silent alerts | TEI20 |
| TS 23.041 | 20.0.0 | 0278 | Clarification of the CPAS capable UE | CPAS-CT |
| TS 23.041 | 20.0.0 | 0279 | The requirement of UE behavior for CPAS | CPAS-CT |
| TS 23.041 | 20.0.0 | 0280 | Clarification of NG-RAN warning message format | TEI20 |
| TS 23.041 | 20.0.0 | 0281 | Abbreviations update with CPAS | CPAS-CT |
| TS 23.041 | 20.0.0 | 0285 | The requirement of CPAS capable UE | CPAS-CT |
| TS 22.268 | 20.1.0 | 0092 | CR on PWS clarifications_R20 mirror | TEI19 |
| TS 22.268 | 20.2.0 | 0096 | PWS support for eMTC NTN_R20-mirror | TEI19, 5GSAT |
| TS 22.268 | 20.2.1 |  | Saved as docx |  |
| TS 22.268 | 20.3.0 | 0098 | Support of template-based multilingual CMAS alerts | DUMMY |
| TS 22.268 | 20.3.0 | 0100 | Support CMAS silent alerts | TEI20 |

### Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [VMR_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050026) | CT aspects of Vehicle Mounted Relays Phase 2 | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 24.501, TS 29.515) | Complete, Jun 2025 | [CP-251221](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251221.zip) |
| [PWS_NTN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1070009) | Support for PWS in Satellite E-UTRAN and Satellite NG-RAN | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Sep 2025 | [CP-251222](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251222.zip) |
| [PWS_NTN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1070049) | CT1 aspects of Support for PWS in Satellite E-UTRAN and Satellite NG-RAN | Normative | not listed | Complete, Sep 2025 | [CP-251222](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251222.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 19.0.0 | 0084 | Warning notification with geofencing for ETWS over satellite access | TEI19 |
| TS 22.268 | 19.0.0 | 0085 | PWS for IoT NTN | TEI19 |
| TS 23.041 | 19.0.0 | 0249 | Introduction of support for PWS over satellite E-UTRAN and satellite NG-RAN | PWS_NTN |
| TS 23.041 | 19.0.0 | 0258 | Adding satellite E-UTRAN and satellite NG-RAN support for PWS | PWS_NTN |
| TR 36.976 | 19.0.0 |  | Update to Rel-19 version (MCC) |  |
| TS 22.268 | 19.1.0 | 0089 | Add back figure that was removed by mistake in v18.3.0 | 5GSAT_Ph3 |
| TS 23.041 | 19.1.0 | 0256 | PWS enhancements for MWAB and MBSR | VMR, VMR_Ph2 |
| TS 23.041 | 19.1.0 | 0257 | Adding support for geofencing to ETWS primary notification | PWS_NTN |
| TS 23.041 | 19.1.0 | 0259 | Duplicate detection over satellite access | PWS_NTN, TEI19 |
| TS 23.041 | 19.1.0 | 0263 | UE handling of ETWS geofencing | PWS_NTN |
| TS 22.268 | 19.2.0 | 0091 | CR on PWS clarifications_R19 | TEI19 |
| TS 23.041 | 19.2.0 | 0264 | Abnormal case for ETWS | PWS_NTN |
| TS 23.041 | 19.2.0 | 0266 | Clean up for PWS enhancements for MWAB and MBSR | VMR_Ph2, VMR |
| TS 22.268 | 19.3.0 | 0095 | PWS support for eMTC NTN_R19 | TEI19, 5GSAT |
| TS 23.041 | 19.3.0 | 0270 | Support for PWS in terrestrial NB-IoT | TEI19, PWS_NTN |
| TS 23.041 | 19.3.0 | 0271 | Correcting numbering and references to tables and figures in TS 23.041 | TEI19 |
| TS 23.041 | 19.4.0 | 0287 | PWS over LTE-M in E-UTRAN | TEI19 |

### Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [5GProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960055) | Stage-3 5GS NAS protocol development 18 | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.173, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.341, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Dec 2023 | [CP-221268](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221268.zip) |
| [5GProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960007) | Stage-3 5GS NAS protocol development 18 general aspects | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.173, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.341, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Dec 2023 | [CP-221268](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221268.zip) |
| [5GProtoc18-non3GPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960056) | Stage-3 5GS NAS protocol development 18 non 3GPP aspects | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.173, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.341, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Dec 2023 | [CP-221268](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221268.zip) |

<details>
<summary>20 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 18.0.0 | 0068 | Device based geo-fencing for EU-alert | TEI18 |
| TS 23.041 | 18.0.0 | 0231 | Device based geo-fencing for EU-alert | TEI18 |
| TR 36.976 | 18.0.0 |  | Update to Rel-18 version (MCC) |  |
| TS 22.268 | 18.1.0 | 0072 | Alignment of KPAS requirements | TEI18 |
| TS 22.268 | 18.1.0 | 0074 | Re-introducing relay requirements for public warning services | ePWS |
| TS 23.041 | 18.1.0 | 0233 | CBS Message Identifiers for additional KPAS services | TEI18 |
| TS 22.268 | 18.2.0 | 0077 | Corrections of message length and coding for KPAS services | TEI18 |
| TS 23.041 | 18.2.0 | 0237 | Additional message Id for KPAS geo-fencing trigger messages | TEI18 |
| TS 22.268 | 18.3.0 | 0078 | Corrections of scope and reference including editorial fixes | TEI18 |
| TS 22.268 | 18.3.0 | 0079 | UE based geo-fencing requirements for KPAS | TEI18 |
| TS 23.041 | 18.3.0 | 0239 | Reference to obsoleted HTTP/2 RFC | TEI18, 5GS_Ph1-CT |
| TS 22.268 | 18.4.0 | 0082 | PWS corrections | 5GSAT |
| TS 23.041 | 18.4.0 | 0238 | Duplicate detection for PWS messages received over different PLMNs | TEI18 |
| TS 22.268 | 18.5.0 | 0094 | PWS support for eMTC NTN_R18 | TEI18, 5GSAT |
| TS 23.041 | 18.5.0 | 0241 | Completing a reference | TEI18 |
| TS 23.041 | 18.5.0 | 0245 | Architecture in shared RAN | TEI18, 5GS_Ph1-CT |
| TS 23.041 | 18.5.0 | 0246 | Re-introduction of "CBC" in figure 1 | TEI18 |
| TS 23.041 | 18.5.0 | 0247 | Message Identifier value range "A000hex-AFFFhex" in an SNPN that is equivalent to the subscribed SNPN | eNPN_Ph2 |
| TS 23.041 | 18.6.0 | 0248 | 5G procedure mentions wrong entity | TEI18 |
| TS 23.041 | 18.7.0 | 0269 | Introduction of support for PWS over satellite NG-RAN | 5GSAT_ARCH-CT |
| TS 23.041 | 18.8.0 | 0275 | Support for PWS for eMTC NTN | TEI17 |

</details>

### Release 17

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [NPN_PWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920060) | NPN support of PWS | Normative | TS 22.261 | Complete, Jun 2021 | [SP-210585](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_92E_Electronic_2021_06/Docs/SP-210585.zip) |
| [5GProtoc17](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880019) | Stage-3 5GS NAS protocol development 17 | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.173, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.341, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Mar 2022 | [CP-201163](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_88e/Docs/CP-201163.zip) |
| [5GProtoc17-non3GPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880045) | Stage-3 5GS NAS protocol development 17 non-IETF aspects | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.173, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.341, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Sep 2021 | [CP-201163](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_88e/Docs/CP-201163.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 17.0.0 |  | Identical to v.16.4.0 Creation of v.7.0.0 as to be able to implement CR 0068r2 (SP-220355) that goes from v.16.4.0 to v.18.0.0 |  |
| TS 23.041 | 17.0.0 | 0220 | Geo-fencing check for no stored "warning message" matched | TEI17 |
| TS 29.168 | 17.0.0 | 0075 | Broadcast Empty Area List for Write-Replace-Warning Request | TEI17 |
| TR 36.976 | 17.0.0 | 0001 | Introduction of Rel-17 enhancements | LTE_terr_bcast_bands_part1-Core |
| TS 22.268 | 17.1.0 | 0081 | PWS corrections | 5GSAT |
| TS 23.041 | 17.1.0 | 0221 | Broadcast Empty Area List for Write-Replace-Warning Request | TEI17 |
| TS 23.041 | 17.1.0 | 0222 | Geo-fencing check for none of stored "warning message" matched to geo-fencing trigger | TEI17 |
| TS 29.168 | 17.1.0 | 0076 | Resolving Editor's Note | TEI17 |
| TS 29.168 | 17.1.0 | 0077 | Addition of Test Flag | TEI17 |
| TS 22.268 | 17.2.0 | 0093 | PWS support for eMTC NTN_R17 | TEI17, 5GSAT |
| TS 23.041 | 17.2.0 | 0215 | Addition of Test Flag | 5GProtoc17 |
| TS 23.041 | 17.2.0 | 0224 | Assign MI values for EU-Alert Level 4 | TEI17 |
| TS 23.041 | 17.2.0 | 0225 | Adding support for PWS in SNPNs | eNPN |
| TS 23.041 | 17.2.0 | 0226 | Correction on PWS 5GS architecture depiction | 5GProtoc17 |
| TS 23.041 | 17.3.0 | 0228 | UE configuration for warning message reception in SNPNs | eNPN |
| TS 23.041 | 17.4.0 | 0232 | Removal of Editor’s note on USIM data file for configuration of warning message reception when the UE accesses an SNPN using the PLMN subscription | eNPN |
| TS 23.041 | 17.5.0 | 0268 | Introduction of support for PWS over satellite NG-RAN | 5GSAT_ARCH-CT |
| TS 23.041 | 17.6.0 | 0274 | Support for PWS for eMTC NTN | TEI17 |

### Release 16

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [ePWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=780003) | Enhancements of Public Warning System | Normative | not listed | Complete, Mar 2020 | [SP-170998](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_78/Docs/SP-170998.zip) |
| [FS_ePWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=730005) | Study on enhancements of Public Warning System | Study | TR 22.869 | Complete, Sep 2017 | [SP-160733](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_73/Docs/SP-160733.zip) |
| [ePWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=810012) | CT aspects of enhancements of Public Warning System | Normative | not listed | Complete, Mar 2020 | [CP-191155](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_84_Newport_Beach/Docs/CP-191155.zip) |
| [ePWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=810047) | CT1 aspects of ePWS | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Mar 2020 | [CP-191155](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_84_Newport_Beach/Docs/CP-191155.zip) |
| [5GProtoc16](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=870078) | (IETF) Location Source Parameter for the SIP Geolocation Header Field (draft-ietf-sipcore-locparam) | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Mar 2020 | [CP-200146](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_87e/Docs/CP-200146.zip) |
| [5GProtoc16](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=820041) | Stage-3 5GS NAS protocol development | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Mar 2020 | [CP-200146](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_87e/Docs/CP-200146.zip) |
| [5GProtoc16](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=820049) | Stage-3 5GS NAS protocol development general aspects | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Mar 2020 | [CP-200146](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_87e/Docs/CP-200146.zip) |
| [5GProtoc16-non3GPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=820050) | Stage-3 5GS NAS protocol development for support for non-3GPP accesses | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.040, TS 23.122, TS 24.007, TS 24.008, TS 24.011, TS 24.229, TS 24.301, TS 24.302, TS 24.305, TS 24.368, TS 24.501, TS 24.502, TS 24.526, TS 27.007) | Complete, Mar 2020 | [CP-200146](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_87e/Docs/CP-200146.zip) |

<details>
<summary>26 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 16.0.0 | 0049 | Definition of ePWS-UE and abbreviation of ePWS | ePWS |
| TS 22.268 | 16.0.0 | 0051 | Background of ePWS-UE requirements | ePWS |
| TS 22.268 | 16.0.0 | 0052 | Requirements for 3GPP system supporting ePWS-UEs | ePWS |
| TS 22.268 | 16.0.0 | 0053 | Requirements for ePWS-UE with different or no user interface or with different roles | ePWS |
| TS 22.268 | 16.0.0 | 0054 | Requirements for the improvement of understanding the PWS message | ePWS |
| TS 22.268 | 16.0.0 | 0055 | Addition of NOTE in legacy requirements for the improvement of understanding the PWS message | ePWS |
| TS 23.041 | 16.0.0 | 0200 | Incorrect reference | TEI16 |
| TS 29.168 | 16.0.0 | 0074 | Essential Corrections on PWS Procedures for 5GC | TEI16 |
| TR 36.976 | 16.0.0 |  | TR under change control – MCC clean-up |  |
| TS 22.268 | 16.1.0 | 0059 | Alignment of 3GPP PWS specifications to recent FCC WEA regulation changes | TEI15 |
| TS 23.041 | 16.1.0 | 0201 | Missing references and some editorial cleanup | TEI16 |
| TS 22.268 | 16.2.0 | 0061 | Additional requirements in KPAS | TEI15 |
| TS 22.268 | 16.2.0 | 0062 | EU-alert applicability for 5G | TEI16 |
| TS 23.041 | 16.2.0 | 0202 | Addition of the support of ePWS functionality via E-UTRAN and NG-RAN | ePWS |
| TS 23.041 | 16.2.0 | 0203 | Support of language-independent content mapped to a disaster in a warning message | ePWS |
| TS 22.268 | 16.3.0 | 0063 | CR 22.268-0063 Roaming requirements and security requirements for ePWS-UEs | ePWS |
| TS 23.041 | 16.3.0 | 0204 | Correction for misalignment of 23.041 with 23.007 and 23.527 | TEI16 |
| TS 23.041 | 16.3.0 | 0205 | Procedures for an ETWS/CMAS-capable UE in NG-RAN | 5GProtoc16 |
| TS 23.041 | 16.3.0 | 0208 | CR 23.041#0208 Addition of message identifiers for UEs with no user interface | ePWS |
| TS 23.041 | 16.3.0 | 0209 | CR 23.041#0209 Support of a stored language-independent content referenced by a warning message | ePWS |
| TS 22.268 | 16.4.0 | 0064 | R16 CR to TS22.268 for Requirement alignment for Relay | TEI |
| TS 23.041 | 16.4.0 | 0207 | Removal of Duplicate Service Operation Details | 5GProtoc16 |
| TS 23.041 | 16.4.0 | 0212 | Correction to figure | 5GProtoc16 |
| TS 23.041 | 16.4.0 | 0213 | Corrections to references | 5GProtoc16 |
| TS 23.041 | 16.4.0 | 0214 | Subscription management in PWS-IWF | 5GProtoc16 |
| TS 23.041 | 16.4.0 | 0217 | Handling of Concurrent Warning Message Indicator | TEI16 |
| TS 23.041 | 16.4.0 | 0218 | CR 23.041#0218 Deletion of Editor’s note in the clause 9.3.24 Warning-Type for ETWS | ePWS |

</details>

### Release 15

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [5GS_Ph1-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=750026) | Studies on CT1 aspects of 5G System - Phase 1 | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.122, TS 23.040, TS 24.007, TS 24.301, TS 24.008, TS 24.302, TS 24.011, TS 24.312, TS 24.305, TS 24.368, TS 27.007) | Complete, Dec 2017 | [CP-183243](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_82_Sorrento/Docs/CP-183243.zip) |
| [5GS_Ph1-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=780008) | CT1 aspects of 5G System - Phase 1 (normative work) | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) (with TS 23.122, TS 23.040, TS 24.007, TS 24.301, TS 24.008, TS 24.302, TS 24.011, TS 24.312, TS 24.305, TS 24.368, TS 27.007) | Complete, Jun 2018 | [CP-183243](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_82_Sorrento/Docs/CP-183243.zip) |

<details>
<summary>30 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 15.0.0 |  | Creation of v.15.0.0 identical to v.14.1.0 because of the CRs approved at SP#79 raising the spec from v.14 to v.16 |  |
| TS 23.041 | 15.0.0 | 0166 | Support PWS in 5GS | 5GS_Ph1-CT |
| TS 29.168 | 15.0.0 | 0070 | Support for PWS-IWF | 5GS_Ph1-CT |
| TS 22.268 | 15.1.0 | 0058 | Alignment of 3GPP PWS specifications to recent FCC WEA regulation changes | TEI15 |
| TS 23.041 | 15.1.0 | 0167 | PWS message format for NG-RAN in 5G | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0168 | AMF to CBC inter-connectivity solution option with and without IWF | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0169 | PWS in NR - clause 9.1.3.5 | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0170 | PWS in NR - clause 9.2.0 | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0171 | PWS in NR - clause 9.2.x | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0172 | PWS in NR - clause 9.3.x | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0173 | AMF, CBC and CBCF functionalities for PWS in 5G | 5GS_Ph1-CT |
| TS 23.041 | 15.1.0 | 0174 | Service Based Interface for 5G System | 5GS_Ph1-CT |
| TS 29.168 | 15.1.0 | 0071 | New field Warning Area Coordinates in WRITE-REPLACE WARNING REQUEST | TEI15 |
| TS 22.268 | 15.2.0 | 0060 | Additional requirements in KPAS | TEI15 |
| TS 23.041 | 15.2.0 | 0175 | Corrections to table 6 and consistent use of terminology | 5GS_Ph1-CT, TEI15 |
| TS 23.041 | 15.2.0 | 0176 | Addition of reference to TS 23.502 | 5GS_Ph1-CT |
| TS 23.041 | 15.2.0 | 0177 | Addition of entity functionality subclauses in annex B | 5GS_Ph1-CT |
| TS 23.041 | 15.2.0 | 0178 | Correction for the use of NG-RAN node and other general corrections | 5GS_Ph1-CT |
| TS 23.041 | 15.2.0 | 0180 | Addition of reference point between AMF and CBCF | 5GS_Ph1-CT |
| TS 23.041 | 15.2.0 | 0181 | Removal of Extended Repetition-Period IE for NG-RAN | 5GS_Ph1-CT |
| TS 23.041 | 15.2.0 | 0182 | Correction to note 2 and removal of editor's note in 9.2.26 | 5GS_Ph1-CT |
| TS 23.041 | 15.2.0 | 0183 | Removing the use of N2 Container for PWS | 5GS_Ph1-CT |
| TS 23.041 | 15.3.0 | 0184 | Modifications needed to address NG-RAN over SBc | 5GS_Ph1-CT |
| TS 23.041 | 15.3.0 | 0185 | Corrections to IE names for NG-RAN | 5GS_Ph1-CT |
| TS 23.041 | 15.3.0 | 0186 | Solving Editor's notes for PWS | 5GS_Ph1-CT |
| TS 23.041 | 15.3.0 | 0189 | Warning Area Coordinates in WRITE-REPLACE WARNING REQUEST | TEI15, 5GS_Ph1-CT |
| TS 23.041 | 15.4.0 | 0192 | Duplicate detection for EUTRAN connected to both EPC and 5GCN | 5GS_Ph1-CT |
| TS 23.041 | 15.4.0 | 0193 | Resolving the EN for the PWS restoration procedure for NG-RAN | 5GS_Ph1-CT |
| TS 23.041 | 15.5.0 | 0194 | Additional Message Identifier to direct UEs to perform geo-fencing of CMAS messages | TEI15 |
| TS 23.041 | 15.5.0 | 0195 | Correction on Warning Area List and TAIs for NG-RAN | 5GS_Ph1-CT, TEI15 |
| TS 23.041 | 15.5.0 | 0198 | Correction on applicability of List of TAIs | 5GS_Ph1-CT |

</details>

### Release 14

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_MBSP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=620071) | Study on Multimedia Broadcast Supplement for Public Warning System | Study | TR 22.815 | Complete, Dec 2014 | [SP-130599](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_62/Docs/SP-130599.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 14.0.0 |  | Updated to Rel-14 by MCC |  |
| TS 23.041 | 14.0.0 | 0160 | RESET COMPLETE and RESET FAILURE Response messages missing | TEI14 |
| TS 22.268 | 14.1.0 | 0048 | Alignment of 3GPP PWS specifications to recent FCC WEA/CMAS regulation changes | TEI14 |
| TS 23.041 | 14.1.0 | 0161 | Addition of new Message Identifiers for FCC mandated Wireless Emergency Alert (WEA, aka CMAS) enhancements | PWS-St3, TEI14 |
| TS 29.168 | 14.1.0 | 0068 | Restarted Cell List in PWS RESTART INDICATION | TEI12, REP_WMD |
| TS 23.041 | 14.2.0 | 0165 | Correction to the Data Coding Scheme clause in support of NA regulatory requirement | TEI14 |
| TS 29.168 | 14.2.0 | 0069 | Introduction of New types of eNB ID | TEI14, LTE_FNBID-Core |

### Release 13

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 13.0.0 | 0047 | A bandwidth reduced low complexity UE or a UE supporting eDRX may not support PWS | TEI13 |
| TS 23.041 | 13.0.0 | 0147 | Missing Broadcast Message Content Validity Indicator IE | TEI13 |
| TS 29.168 | 13.0.0 | 0056 | Criticality of the Cause IE in Write-Replace Warning Response and Stop Warning Response | TEI13 |
| TS 23.041 | 13.1.0 | 0149 | Correction for List of TAIs | TEI12 |
| TS 23.041 | 13.1.0 | 0151 | Clarification on CBC Geo-redundancy support in LTE | TEI12, REP_WMD |
| TS 23.041 | 13.1.0 | 0152 | Serial Number handling for WRITE-REPLACE Request/Indication primitive | TEI13 |
| TS 23.041 | 13.1.0 | 0154 | Warning message indication delivery for PWS reporting enhancement | TEI12, REP_WMD |
| TS 23.041 | 13.1.0 | 0155 | ETWS Primary Notification message at E-UTRAN interface | TEI13 |
| TS 23.041 | 13.1.0 | 0156 | Reference corrections and editorial updates | TEI13 |
| TS 29.168 | 13.1.0 | 0057 | Inconsistent Criticality information | TEI13 |
| TS 29.168 | 13.1.0 | 0058 | Failure Indication | WSR_EPS |
| TS 29.168 | 13.1.0 | 0059 | Style fix and resolution of editor's note | TEI13 |
| TS 29.168 | 13.1.0 | 0065 | ASN.1 Corrections | ETWS, TEI9 |
| TS 23.041 | 13.2.0 | 0157 | Failure Indication | WSR_EPS |
| TS 23.041 | 13.3.0 | 0159 | Failed cell list parameter content correction | WSR_EPS |
| TS 29.168 | 13.3.0 | 0067 | Restarted Cell List in PWS RESTART INDICATION | TEI12, REP_WMD |

### Release 12

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [PWS_Sec](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=510054) | Security aspects of Public Warning System | Normative | not listed | Complete, Sep 2014 | [SP-140299](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_64/Docs/SP-140299.zip) |
| [PWS_Sec-SA1](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=560029) | Stage 1 for Protection against false PWS Warning Notifications | Normative | [TS 22.268](https://www.3gpp.org/dynareport/22268.htm) | Complete, Sep 2012 | [SP-120433](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_56/Docs/SP-120433.zip) |
| [PWS_Sec-SA3TR](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=510354) | TR on SA3 part for Security aspects of Public Warning System | Normative | not listed | Complete, Sep 2014 | [SP-140299](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_64/Docs/SP-140299.zip) |
| [REP_WMD-CT1](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=580010) | CT1 part of Reporting Enhancements in Warning Message Delivery (Stage 2) | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Mar 2014 | [CP-130480](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_61_Porto/Docs/CP-130480.zip) |
| [REP_WMD-CT4](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=580011) | CT4 part of Reporting Enhancements in Warning Message Delivery (Stage 2/3) | Normative | [TS 29.168](https://www.3gpp.org/dynareport/29168.htm) (with TS 23.007) | Complete, Jun 2014 | [CP-130480](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_61_Porto/Docs/CP-130480.zip) |
| [REP_WMD-RFR_PWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=590021) | Public Warning System - Reset/Failure/Restart in Warning Message Delivery in LTE | Normative | not listed | Complete, Jun 2014 | [RP-130398](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_59/Docs/RP-130398.zip) |
| [REP_WMD-RFR_PWS-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=590121) | Core part: PWS - Reset/Failure/Restart in Warning Message Delivery in LTE | Normative | TS 36.413 | Complete, Jun 2014 | [RP-130398](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_59/Docs/RP-130398.zip) |

<details>
<summary>45 change requests and 0 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 12.0.0 | 0037 | Introduction of PWS Security requirements | PWS_Sec |
| TS 23.041 | 12.0.0 | 0097 | Report from MME on Warning Message Delivery |  |
| TS 23.041 | 12.0.0 | 0099 | Failure List in WRITE-REPLACE-WARNING-CONFIRM and STOP-WARNING-CONFIRM |  |
| TS 29.168 | 12.0.0 | 0029 | Report to CBC on Warning Message Delivery |  |
| TS 29.168 | 12.0.0 | 0030 | Failure List in WRITE-REPLACE RESPONSE and STOP WARNING RESONSE |  |
| TS 22.268 | 12.1.0 | 0040 | Clarification of conditions of PWS Security requirements | PWS_Sec |
| TS 23.041 | 12.1.0 | 0120 | Correction for Warning Area List | TEI11 |
| TS 23.041 | 12.1.0 | 0123 | Clause 9.4.3 for E-UTRAN | TEI12, PWS-St3 |
| TS 23.041 | 12.1.0 | 0124 | Warning message reception in Limited Service | TEI11, ETWS, PWS-St3 |
| TS 29.168 | 12.1.0 | 0034 | Correction to ASN1 encoding | TEI12 |
| TS 22.268 | 12.2.0 | 0045 | Rel-11 alignment regarding disabling and enabling of PWS Notifications | TEI12 |
| TS 22.268 | 12.2.0 | 0046 | PWS integrity protection when roaming internationally | TEI12 |
| TS 23.041 | 12.2.0 | 0125 | CB Message parameter format on the eUTRAN Radio Network - UE interface | TEI12 |
| TS 23.041 | 12.2.0 | 0127 | CBS message parameter references correction | TEI12 |
| TS 23.041 | 12.2.0 | 0128 | Failure Indication and Restart Indication handling | TEI12 |
| TS 23.041 | 12.2.0 | 0129 | Clarification to data coding scheme usage for primary vs secondary notification | TEI12 |
| TS 29.168 | 12.2.0 | 0036 | Editorial Corrections | TEI12 |
| TS 23.041 | 12.3.0 | 0118 | Stop-all broadcasting of warning messages and report from MME on Stop Warning Messages in E-UTRAN | REP_WMD |
| TS 23.041 | 12.3.0 | 0132 | CellID in E-UTRAN | TEI12 |
| TS 23.041 | 12.3.0 | 0133 | Clarification on Duplication Detection | TEI12 |
| TS 23.041 | 12.3.0 | 0134 | Clarification on PWS CB Data for the eUTRAN Radio interface | TEI12 |
| TS 29.168 | 12.3.0 | 0033 | Report to CBC on Warning Message Delivery |  |
| TS 29.168 | 12.3.0 | 0038 | Stop-all Warning Messages |  |
| TS 23.041 | 12.4.0 | 0137 | eNodeB ID in Stop-Warning Indication | REP_WMD |
| TS 23.041 | 12.4.0 | 0139 | Removal of cells=all feature from RNC | TEI12 |
| TS 23.041 | 12.4.0 | 0140 | Stop all indicator clarification | REP_WMD |
| TS 29.168 | 12.4.0 | 0044 | eNodeB Response Indication | REP_WMD |
| TS 29.168 | 12.4.0 | 0045 | Correction of references to clauses | REP_WMD |
| TS 29.168 | 12.4.0 | 0048 | Unsuccessful Outcome | REP_WMD |
| TS 23.041 | 12.5.0 | 0135 | Restart Indication | REP_WMD |
| TS 23.041 | 12.5.0 | 0141 | Capacity Indication Request not implemented | TEI12 |
| TS 29.168 | 12.5.0 | 0042 | PWS Restart Indication | REP_WMD |
| TS 23.041 | 12.6.0 | 0142 | Available-Capacity not implemented | TEI12 |
| TS 23.041 | 12.6.0 | 0143 | Support of category indication for prioritization of emergency alerts | REP_WMD |
| TS 29.168 | 12.6.0 | 0050 | Routing of PWS messages to HeNBs | REP_WMD |
| TS 23.041 | 12.7.0 | 0146 | Removal of CAPACITY-INDICATION reference | TEI12 |
| TS 29.168 | 12.7.0 | 0051 | Warning Area List in Write-Replace Warning Request during PWS restoration | REP_WMD |
| TS 29.168 | 12.7.0 | 0052 | Serial Number in Write-Replace Warning Request during PWS restoration | REP_WMD |
| TS 29.168 | 12.7.0 | 0054 | Message Type for PWS Restart Indication | REP_WMD |
| TS 23.041 | 12.8.0 | 0148 | Correction for List of TAIs | TEI12 |
| TS 23.041 | 12.8.0 | 0150 | Clarification on CBC Geo-redundancy support in LTE | TEI12, REP_WMD |
| TS 23.041 | 12.8.0 | 0153 | Warning message indication delivery for PWS reporting enhancement | TEI12, REP_WMD |
| TS 29.168 | 12.8.0 | 0055 | Incorrect reference in STOP WARNING REQUEST | TEI13 |
| TS 29.168 | 12.9.0 | 0064 | ASN.1 Corrections | ETWS, TEI9 |
| TS 29.168 | 12.10.0 | 0066 | Restarted Cell List in PWS RESTART INDICATION | TEI12, REP_WMD |

</details>

### Release 11

<details>
<summary>43 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 11.0.0 | 0009 | EU-ALERT specific requirements | TEI11 |
| TS 23.041 | 11.0.0 | 0056 | Message Identifiers for EU-Alert | TEI11 |
| TS 23.041 | 11.0.0 | 0057 | Message Identifiers for EU-Info | TEI11 |
| TS 29.168 | 11.0.0 | 0016 | Error Indication procedure | TEI11 |
| TS 22.268 | 11.0.1 |  | LTE logo changed into LTE Advanced logo |  |
| TS 22.268 | 11.1.0 | 0010 | RAT support for EU-Alert | TEI11 |
| TS 23.041 | 11.1.0 | 0065 | Correction on Message Identifier for Korean Public Alert System | TEI10 |
| TS 23.041 | 11.1.0 | 0066 | Coding of Geographical Scope parameter for E-UTRAN/LTE operation. | TEI11 |
| TS 23.041 | 11.1.0 | 0070 | Correction to UE warning message indication with regards to “digital signature” and “timestamp” | ETWS |
| TS 23.041 | 11.1.0 | 0071 | Additional Message Identifiers for CMAS/EU-Alerts | TEI11 |
| TS 23.041 | 11.1.0 | 0072 | Update Number Processing | TEI11 |
| TS 23.041 | 11.1.0 | 0073 | Multiple languages used in CBS | TEI11 |
| TS 29.168 | 11.1.0 | 0018 | Error Indication | TEI10 |
| TS 29.168 | 11.1.0 | 0020 | Extended Repetition Period | TEI9 |
| TS 22.268 | 11.2.0 | 0017 | Korean Public Alert System specific requirements | TEI10 |
| TS 23.041 | 11.2.0 | 0077 | Redocumentation and alignment of the public warning system | ETWS, PWS-St3, TEI11 |
| TS 23.041 | 11.2.0 | 0083 | Sorting out inconsistency problem in ETWS/PWS specification | TEI11 |
| TS 23.041 | 11.2.0 | 0084 | Correction of binary coding in clause 9.4.1.2.2 | TEI11 |
| TS 29.168 | 11.2.0 | 0024 | Correction to Assigned Criticality | TEI9 |
| TS 22.268 | 11.3.0 | 0019 | Updates on Korean Public Alert System specific requirements | TEI10 |
| TS 22.268 | 11.3.0 | 0020 | CMAS messages in Multiple Languages | TEI11 |
| TS 23.041 | 11.3.0 | 0081 | Alignment of clause 9 for PWS | TEI11 |
| TS 23.041 | 11.3.0 | 0088 | Alignment and correction of aspects for public warning system for GERAN | ETWS, PWS-St3 |
| TS 23.041 | 11.3.0 | 0091 | Correction to the duplication detection mechanism | TEI11 |
| TS 23.041 | 11.3.0 | 0092 | Removal of security for ETWS/PWS over E-UTRAN | ETWS, PWS-St3, TEI11 |
| TS 29.168 | 11.3.0 | 0025 | Corrections to ASN.1 code | ETWS |
| TS 22.268 | 11.4.0 | 0024 | Disabling receipt of PWS messages | TEI11 |
| TS 22.268 | 11.4.0 | 0027 | PWS Security requirement correction | PWS |
| TS 23.041 | 11.4.0 | 0094 | Correction to Figure 3.3-1 | TEI8 |
| TS 23.041 | 11.4.0 | 0098 | Correction of reference to GSMA document Coding of Cell Broadcast Functions | TEI11 |
| TS 23.041 | 11.4.0 | 0103 | Correction of Warning Message Delivery Procedure in GSM | ETWS, PWS-St3 |
| TS 29.168 | 11.4.0 | 0026 | Correction to ASN1 syntax | TEI11 |
| TS 29.168 | 11.4.0 | 0027 | Editorial updates of references | TEI11 |
| TS 29.168 | 11.4.0 | 0031 | ETWS Secondary Notification | TEI11 |
| TS 22.268 | 11.5.0 | 0039 | Disabling receipt of PWS Warning Notifications | TEI11 |
| TS 22.268 | 11.5.0 | 0044 | clarification on enabling PWS messages in limited state | TEI9 |
| TS 23.041 | 11.5.0 | 0095 | Correction for Repetition Rates | TEI11 |
| TS 23.041 | 11.5.0 | 0107 | Correction of reference in Restart Indication Request | TEI11 |
| TS 23.041 | 11.5.0 | 0111 | Correcting handling of unused security parameters for warning messages | ETWS |
| TS 23.041 | 11.5.0 | 0116 | Message IDs for operator specific services | TEI11 |
| TS 23.041 | 11.5.0 | 0117 | USIM file usage for PWS message reception | TEI11 |
| TS 29.168 | 11.5.0 | 0063 | ASN.1 Corrections | ETWS, TEI9 |
| TS 23.041 | 11.6.0 | 0115 | Warning message reception in Limited Service | TEI11, ETWS, PWS-St3 |
| TS 23.041 | 11.6.0 | 0119 | Correction for Warning Area List | TEI11 |

</details>

### Release 10

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 10.0.0 | 0054 | Clarification of Scope for CB in LTE | TEI10 |
| TS 29.168 | 10.0.0 | 0015 | SBC-AP Error Indication Procedure | TEI10 |
| TS 22.268 | 10.1.0 | 0016 | Korean Public Alert System specific requirements | TEI10 |
| TS 23.041 | 10.1.0 | 0058 | Correction to CMAS Alert levels | PWS-St3 |
| TS 29.168 | 10.1.0 | 0017 | Error Indication | TEI10 |
| TS 29.168 | 10.1.0 | 0019 | Extended Repetition Period | TEI9 |
| TS 22.268 | 10.2.0 | 0018 | Updates on Korean Public Alert System specific requirements | TEI10 |
| TS 22.268 | 10.2.0 | 0022 | CMAS Support in E-UTRAN | PWS |
| TS 23.041 | 10.2.0 | 0064 | Correction on Message Identifier for Korean Public Alert System | TEI10 |
| TS 23.041 | 10.2.0 | 0069 | Correction to UE warning message indication with regards to ôdigital signatureö and ôtimestampö | ETWS |
| TS 29.168 | 10.2.0 | 0023 | Correction to Assigned Criticality | TEI9 |
| TS 22.268 | 10.3.0 | 0026 | PWS Security requirement correction | PWS |
| TS 23.041 | 10.3.0 | 0076 | Redocumentation and alignment of the public warning system | ETWS, PWS-St3 |
| TS 29.168 | 10.3.0 | 0062 | ASN.1 Corrections | ETWS, TEI9 |
| TS 22.268 | 10.4.0 | 0043 | clarification on enabling PWS messages in limited state | TEI9 |
| TS 23.041 | 10.4.0 | 0087 | Alignment and correction of aspects for public warning system for GERAN | ETWS, PWS-St3 |
| TS 23.041 | 10.5.0 | 0102 | Correction of Warning Message Delivery Procedure in GSM | ETWS, PWS-St3 |
| TS 23.041 | 10.5.0 | 0106 | Correction to Figure 3.3-1 | TEI8 |
| TS 23.041 | 10.6.0 | 0110 | Correcting handling of unused security parameters for warning messages | ETWS |
| TS 23.041 | 10.6.0 | 0114 | Correction of reference to GSMA document Coding of Cell Broadcast Functions | TEI8 |

### Release 9

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [PWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=380057) | Public Warning System | Normative | not listed | Complete, Dec 2012 | [SP-070876](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_38/Docs/SP-070876.zip) |
| [PWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=380058) | Stage 1 for Public Warning System | Normative | [TS 22.268](https://www.3gpp.org/dynareport/22268.htm) | Complete, Dec 2008 | [SP-070876](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_38/Docs/SP-070876.zip) |
| [PWS-St3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440029) | Stage 3 for Public Warning System | Normative | not listed | Complete, Dec 2009 | [CP-090437](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_44_Aruba/Docs/CP-090437.zip) |
| [PWS-St3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440030) | CT1 aspects of Stage 3 for Public Warning System | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Dec 2009 | [CP-090437](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_44_Aruba/Docs/CP-090437.zip) |
| [PWS-St3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440031) | CT4 aspects of Stage 3 for Public Warning System | Normative | [TS 29.168](https://www.3gpp.org/dynareport/29168.htm) | Complete, Dec 2009 | [CP-090437](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_44_Aruba/Docs/CP-090437.zip) |
| [PWS-RAN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440005) | Public Warning System (PWS) – RAN aspects | Normative | TS 36.302, TS 36.331, TS 36.413 | Complete, Dec 2009 | [RP-090649](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_44/Docs/RP-090649.zip) |
| [PWS-RAN_UEConTest](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=540005) | Conformance Test Aspects – Public Warning System (PWS) – RAN aspects for LTE | Normative | TS 36.508, TS 36.523-1, TS 36.523-2, TS 36.523-3 | Complete, Dec 2012 | [RP-111564](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_54/Docs/RP-111564.zip) |
| [CEBRO](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440002) | Cell Broadcast protocol Base Station Controller – Cell Broadcast Centre (BSC-CBC) | Normative | not listed | Complete, Mar 2010 | GP-091022 |
| [CEBRO](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440102) | GERAN part of Cell Broadcast protocol Base Station Controller – Cell Broadcast Centre | Normative | not listed | Complete, Mar 2010 | GP-091022 |
| [CEBRO](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=440202) | CT1 part of Cell Broadcast protocol Base Station Controller – Cell Broadcast Centre | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Mar 2010 | GP-091022 |

<details>
<summary>43 change requests and 3 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.268 | 9.0.0 |  | One-step-approved by SA#42 |  |
| TS 23.041 | 9.0.0 | 0028 | Message IDs for Commercial Mobile Alert System (CMAS) | PWS-St3 |
| TS 29.168 | 9.0.0 | 0007 | Enhancements to Warnig Notifications to support PWS/CMAS Requirements |  |
| TS 22.268 | 9.1.0 |  | ETSI clean-up: apply correct style and layout |  |
| TS 22.268 | 9.1.0 | 0001 | Fix for a note that is floating out of context | PWS |
| TS 22.268 | 9.1.0 | 0002 | Proposal to solve conflicting requirements | PWS |
| TS 22.268 | 9.1.0 | 0004 | Regulatory Requirements Pertaining to Roaming | PWS |
| TS 22.268 | 9.1.0 | 0005 | Removal of ôsubject to regulatory requirementsö from PWS-UE requirements | PWS |
| TS 23.041 | 9.1.0 | 0029 | Message identifiers for PWS | PWS-St3 |
| TS 23.041 | 9.1.0 | 0031 | Modification of Length Indicator Usage | ETWS |
| TS 23.041 | 9.1.0 | 0032 | Cell wide Geographical Scope (GS) code 00 | TEI9 |
| TS 23.041 | 9.1.0 | 0033 | Updates on references | TEI9 |
| TS 23.041 | 9.1.0 | 0034 | Resolution of editor’s note | TEI9 |
| TS 23.041 | 9.1.0 | 0035 | Editorial fixes | TEI9 |
| TS 23.041 | 9.1.0 | 0036 | Clarification on duplicate use of “immediate display” | TEI9 |
| TS 23.041 | 9.1.0 | 0037 | Updating references to stage 1 document | PWS-St3 |
| TS 29.168 | 9.1.0 | 0011 | Number of Broadcasts | PWS-St3 |
| TS 22.268 | 9.2.0 | 0006 | Update Reference [4] | PWS |
| TS 22.268 | 9.2.0 | 0007 | 22.268 Clarify Requirements for Handling of Concurrent PWS Warning Notifications | PWS |
| TS 23.041 | 9.2.0 | 0039 | Additional ETWS requirements for the BSC - CBC Cell Broadcast protocol | ETWS |
| TS 23.041 | 9.2.0 | 0041 | Clarification on ETWS secondary notification | ETWS |
| TS 23.041 | 9.2.0 | 0043 | Correction of duplicate detection in the UE | ETWS |
| TS 29.168 | 9.2.0 | 0013 | Correction of the SCTP Payload Protocol value for the SBc-AP | TEI8 |
| TS 22.268 | 9.2.1 |  | Re-introduction of the figure in 6.1 which disappeared for some obscure reason |  |
| TS 22.268 | 9.3.0 | 0021 | CMAS Support in E-UTRAN | PWS |
| TS 23.041 | 9.3.0 | 0044 | Corrections to the Cell Broadcast Service (CBS) for ETWS | CEBRO |
| TS 23.041 | 9.3.0 | 0045 | Correction of figure 4b | TEI9 |
| TS 23.041 | 9.3.0 | 0046 | Addition of Broadcast Message Type | CEBRO |
| TS 29.168 | 9.3.0 | 0014 | Correct WRITE-REPLACE-WARNING-REQUEST misalignment between S1-AP and SBc-AP | TEI9 |
| TS 22.268 | 9.4.0 | 0025 | PWS Security requirement correction | PWS |
| TS 23.041 | 9.4.0 | 0050 | PLMN handling for ETWS duplicate detection | ETWS |
| TS 23.041 | 9.4.0 | 0052 | Removal of editor's note for ETWS | ETWS |
| TS 29.168 | 9.4.0 | 0021 | Extended Repetition Period | TEI9 |
| TS 22.268 | 9.5.0 | 0042 | clarification on enabling PWS messages in limited service state | TEI9 |
| TS 23.041 | 9.5.0 | 0053 | Clarification of precedence for immediate display | TEI9 |
| TS 23.041 | 9.5.0 | 0055 | Removal of CMAS reference to a ETWS capability | PWS-St3 |
| TS 29.168 | 9.5.0 | 0022 | Correction to Assigned Criticality | TEI9 |
| TS 23.041 | 9.6.0 | 0059 | Correction to CMAS Alert levels | PWS-St3 |
| TS 29.168 | 9.6.0 | 0061 | ASN.1 Corrections | ETWS, TEI9 |
| TS 23.041 | 9.7.0 | 0068 | Correction to UE warning message indication with regards to ôdigital signatureö and ôtimestampö | ETWS |
| TS 23.041 | 9.8.0 | 0075 | Redocumentation and alignment of the public warning system | ETWS, PWS-St3 |
| TS 23.041 | 9.9.0 | 0086 | Alignment and correction of aspects for public warning system for GERAN | ETWS, PWS-St3 |
| TS 23.041 | 9.10.0 | 0101 | Correction of Warning Message Delivery Procedure in GSM | ETWS, PWS-St3 |
| TS 23.041 | 9.10.0 | 0105 | Correction to Figure 3.3-1 | TEI8 |
| TS 23.041 | 9.11.0 | 0109 | Correcting handling of unused security parameters for warning messages | ETWS |
| TS 23.041 | 9.11.0 | 0113 | Correction of reference to GSMA document Coding of Cell Broadcast Functions | TEI8 |

</details>

### Release 8

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [ETWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=400015) | CT1 aspects of ETWS | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Dec 2008 | [CP-080951](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_42_Athens/Docs/CP-080951.zip) |
| [ETWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=410021) | CT4 aspects of ETWS | Normative | [TS 29.168](https://www.3gpp.org/dynareport/29168.htm) | Complete, Dec 2008 | [CP-080951](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_42_Athens/Docs/CP-080951.zip) |
| [FS_PWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=320025) | Study on support of a Public Warning System | Study | TR 22.968 | Complete, Mar 2008 | [SP-080054](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_39/Docs/SP-080054.zip) |

<details>
<summary>31 change requests and 0 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 8.0.0 | 0018 | Chages to CBS for the realisation of ETWS. | ETWS |
| TS 23.041 | 8.0.0 | 0019 | Additions to the protocol aspects of CBS for the realisation of ETWS | ETWS |
| TS 23.041 | 8.0.0 | 0020 | Changes to the radio message format aspect of CBS for the realisation of ETWS | ETWS |
| TS 23.041 | 8.1.0 | 0021 | Clarification on EPS architecture and ETWS Instruction to terminal | ETWS |
| TS 23.041 | 8.1.0 | 0022 | Addition of Warning Security Information | ETWS |
| TS 23.041 | 8.1.0 | 0023 | CBS Message ID table | TEI8 |
| TS 29.168 | 8.1.0 | 0001 | General clean-up to make an alignment with RAN specifications | ETWS |
| TS 29.168 | 8.1.0 | 0002 | General clean-up to align with RAN specifications | ETWS |
| TS 23.041 | 8.2.0 | 0025 | Clarification of non settable Message ID’s through MMI | TEI8 |
| TS 23.041 | 8.2.0 | 0026 | ETWS Duplication Detection | ETWS |
| TS 29.168 | 8.2.0 | 0003 | Correct ASN.1 misalignment between S1AP and SB-AP | ETWS |
| TS 29.168 | 8.2.0 | 0004 | Fix the ASN.1 Object Identifiers (OID) descriptions for SBc-AP | ETWS |
| TS 29.168 | 8.2.0 | 0005 | Update port number and payload protocol identifier for SBc-AP | ETWS |
| TS 29.168 | 8.2.0 | 0006 | Fix incorrect IETF reference | ETWS |
| TS 23.041 | 8.3.0 | 0027 | Definition of ETWS Primary Notification message format | ETWS |
| TS 29.168 | 8.3.0 | 0008 | Missing OMC-ID & other corrections | ETWS |
| TS 29.168 | 8.3.0 | 0009 | Correction of Warning MesSge Transmission procedure | ETWS |
| TS 23.041 | 8.4.0 | 0030 | Modification of Length Indicator Usage | ETWS |
| TS 29.168 | 8.4.0 | 0012 | Correction of the SCTP Payload Protocol value for the SBc-AP | TEI8 |
| TS 23.041 | 8.5.0 | 0038 | Additional ETWS requirements for the BSC - CBC Cell Broadcast protocol | ETWS |
| TS 23.041 | 8.5.0 | 0040 | Clarification on ETWS secondary notification | ETWS |
| TS 23.041 | 8.5.0 | 0042 | Correction of duplicate detection in the UE | ETWS |
| TS 23.041 | 8.6.0 | 0049 | PLMN handling for ETWS duplicate detection | ETWS |
| TS 23.041 | 8.6.0 | 0051 | Removal of editor's note for ETWS | ETWS |
| TS 23.041 | 8.7.0 | 0067 | Correction to UE warning message indication with regards to ôdigital signatureö and ôtimestampö | ETWS |
| TS 23.041 | 8.8.0 | 0074 | Redocumentation and alignment of the public warning system | ETWS |
| TS 23.041 | 8.9.0 | 0085 | Alignment and correction of aspects for public warning system for GERAN | ETWS |
| TS 23.041 | 8.10.0 | 0100 | Correction of Warning Message Delivery Procedure in GSM | ETWS |
| TS 23.041 | 8.10.0 | 0104 | Correction to Figure 3.3-1 | TEI8 |
| TS 23.041 | 8.11.0 | 0108 | Correcting handling of unused security parameters for warning messages | ETWS |
| TS 23.041 | 8.11.0 | 0112 | Correction of reference to GSMA document Coding of Cell Broadcast Functions | TEI8 |

</details>

### Release 7

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 7.0.0 | 0017 | CBS - Reference correction | TEI7 |

### Release 6

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 6.0.0 | 0011 | Identification of a directory number in a CBS-Message-Information-Page | TEI6 |
| TS 23.041 | 6.1.0 | 0014 | CB Data length | TEI6 |
| TS 23.041 | 6.2.0 | 0016 | CB Data structure | TEI5 |

### Release 5

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 5.1.0 | 0013 | CB Data length | TEI5 |
| TS 23.041 | 5.2.0 | 0015 | CB Data structure | TEI5 |

### Release 4

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [LCS4-CBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=2229) | CBS interactions | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Dec 2001 | - |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 4.1.0 | 0007 | Clarification of Geographical Scope | TEI4 |
| TS 23.041 | 4.2.0 | 0008 | Clarification on the use of Message IDs in multi-technology networks | TEI4 |
| TS 23.041 | 4.3.0 | 0010 | Update of references | TEI4 |
| TS 23.041 | 4.4.0 | 0012 | CB Data length | TEI4 |

### Release 99

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [CBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=60187) | Cell Broadcast Service | Normative | [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) | Complete, Dec 1999 | TP-000022 |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.041 | 3.1.0 | 0001 | Adaptation of the scope of TS 23.041 from “GSM only” to “GSM and UMTS” | CBS |
| TS 23.041 | 3.1.0 | 0002 | LCS Utilization of CBS | LCS |
| TS 23.041 | 3.2.0 | 0003 | Addition of LCS message identifier to support GPS Navigation message | LCS |
| TS 23.041 | 3.2.0 | 0004 | Adaptation of the scope of TS 23.041 from “GSM only” to “GSM and UMTS” part II | CBS |
| TS 23.041 | 3.3.0 | 0005 | Defining Assisted GPS Broadcast Identifiers | TEI |
| TS 23.041 | 3.4.0 | 0006 | Clarification of Geographical Scope | TEI |
| TS 23.041 | 3.5.0 | 0009 | Update of references | TEI |

### TR 36.976 before change control

<details>
<summary>7 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2019 | RAN1#97 | R1- 1908844 | Skeleton TR | 0.0.1 |
| Nov 2019 | RAN1#99 | R1-1913483 | Added technical content to all clauses. Incorporated technical and editorial the comments received in the meeting | 0.1.0 |
| Nov 2019 | RAN1#99 | R1-1913542 | Endorsed with minor changes agreed in RAN1#99 | 0.2.0 |
| Dec 2019 | RAN#86 | RP-192688 | Clean version as v1.0.0 for presentation to plenary | 1.0.0 |
| Feb 2020 | RAN1#100-e | R1-2000713 | Incorporated additional technical and editorial changes | 1.1.0 |
| Feb 2020 | RAN1#100-e | R1-2001230 | Incorporated comments during email discussion | 2.0.0 |
| Mar 2020 | RAN#87e | RP-200167 | Clean version based on 2.0.0 for RAN approval. | 2.1.0 |

</details>
