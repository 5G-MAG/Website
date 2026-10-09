---
hide_title: true
title: Time-Sensitive Communications (TSC) - Standards Evolution
slug: /standards/tsc/evolution
description: Release-by-release 3GPP work item and Change Request history behind Time-Sensitive Communications (TSC).
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 10l0 3l2 2"/><path d="M7 4l-2.75 2"/><path d="M17 4l2.75 2"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Time-Sensitive Communications (TSC) - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Standards: Time-Sensitive Communications (TSC)](/standards/tsc): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 20:** 5 change requests.
- **Release 19:** work items TEI19_QME, EDGINDUS; 34 change requests.
- **Release 18:** work items LPHAP, SEI, FS_DetNet, DetNet, 5TRS, FS_5TRS_URLLC, TRS_URLLC, TRS_URLLC-NR, TRS_URLLC-NR-Core, FS_TSNCH, TSN_CH, SBIProtoc18; 113 change requests.
- **Release 17:** work items eCAV, CMED, IIoT; 79 change requests.
- **Release 16:** work items FS_CAV, cyberCAV; 28 change requests.
- **Release 14:** 1 change request.

:::

Work items as listed in the 3GPP work plan of 28 September 2026. Change requests are the ones implemented in a version, as recorded in the 3GPP Change Request database of 25 September 2026; versions without a change request are from the change history of TS 22.104 V19.2.0, TR 22.804 V16.3.0, TS 29.565 V20.1.0, TR 23.700-25 V18.1.0.

**Scope of this page**

- Specifications covered: [TS 22.104](https://www.3gpp.org/dynareport/22104.htm), [TR 22.804](https://www.3gpp.org/dynareport/22804.htm), [TS 29.565](https://www.3gpp.org/dynareport/29565.htm), [TR 23.700-25](https://www.3gpp.org/dynareport/23700-25.htm).
- Shared specifications whose change histories cover every feature of the 5G system and are not reproduced (see the specifications themselves): [TS 23.501](https://www.3gpp.org/dynareport/23501.htm), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm), [TS 29.522](https://www.3gpp.org/dynareport/29522.htm).
- Work items: those that name one of the specifications covered as impacted in the work plan, and those whose title matches "Time Sensitive", "TSN", "Timing Resiliency" or "Deterministic Network", which may change only the shared specifications.
- Type: Study where the acronym starts with FS_ or the title starts with "Study", Normative otherwise.
- The Change Request database lists implemented change requests that the change history of the specification does not: TS 22.104 (21 more), TS 29.565 (30 more). The tables use the database.
- The IEEE and SMPTE specifications on the Standards page are not 3GPP documents and have no work items or change histories here.

### Release 20

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 29.565 | 20.0.0 | 0192 | Correction of referenced services used | SBIProtoc20-CT |
| TS 29.565 | 20.0.0 | 0195 | Update of info and externalDocs fields | TEI20 |
| TS 29.565 | 20.1.0 | 0196 | Support direction-specific QNC notifications in TSCTSF | SMPC20-CT |
| TS 29.565 | 20.1.0 | 0197 | Miscellaneous corrections to the TSC QoSandTSCAssistance API | TEI20, IIoT, TRS_URLLC, SBIProtoc20-CT |
| TS 29.565 | 20.1.0 | 0198 | Update of info and externalDocs fields | TEI20 |

### Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [TEI19_QME](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050012) | CT aspects of QoS monitoring enhancement | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 29.122, TS 29.502, TS 29.512, TS 29.514, TS 29.522) | Complete, Jun 2025 | [CP-243312](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_106_Madrid/Docs/CP-243312.zip) |
| [EDGINDUS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990050) | Edge Computing for Industrial Scenarios | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) | Complete, Mar 2023 | [SP-230229](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230229.zip) |

<details>
<summary>34 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.104 | 19.0.0 | 0093 | Additional clarification on security, privacy for mobile robots using edge cloud | EDGINDUS |
| TS 22.104 | 19.0.0 | 0094 | An additional usecase for Industrial edge cloud regarding digital twin usage | EDGINDUS |
| TS 29.565 | 19.0.0 | 0140 | Correction on notification URI used for termination Notification | SBIProtoc19 |
| TS 29.565 | 19.0.0 | 0145 | Corrections on Qos Reference | SBIProtoc19 |
| TS 29.565 | 19.0.0 | 0146 | Corrections on the capability for BAT adaptation and time domain | TEI19, TRS_URLLC, GMEC |
| TS 29.565 | 19.0.0 | 0148 | QoS Monitoring enhancement on capability report | TEI19_QME |
| TS 29.565 | 19.0.0 | 0151 | Update of info and externalDocs fields | TEI19 |
| TS 29.565 | 19.0.1 |  | Corrections on externalDocs field of Ntsctsf_TimeSynchronization API |  |
| TS 22.104 | 19.1.0 | 0097 | Smaller 5GS time sync budget | eCAV, TEI19 |
| TS 29.565 | 19.1.0 | 0152 | TscEvent description addition | SBIProtoc19 |
| TS 29.565 | 19.1.0 | 0153 | Features Update | TEI19_QME |
| TS 29.565 | 19.1.0 | 0154 | Correction of attribute and data type | SBIProtoc19 |
| TS 29.565 | 19.1.0 | 0156 | Wrong attribute name | TEI18, IIoT |
| TS 29.565 | 19.1.0 | 0159 | Corrections on the N6 termination indication | IIoT |
| TS 29.565 | 19.1.0 | 0161 | Updating the IETF HTTP RFC for DetNet | DetNet |
| TS 29.565 | 19.1.0 | 0164 | Update of info and externalDocs fields | TEI19 |
| TS 22.104 | 19.2.0 | 0100 | Correction of reference to IEEE Std 1588-2019 | SEI |
| TS 29.565 | 19.2.0 | 0166 | Correct the RFC reference for the Yang Module | DetNet |
| TS 29.565 | 19.2.0 | 0167 | Indicating the acceptable QoS to the AF | IIoT, TEI19 |
| TS 29.565 | 19.2.0 | 0168 | Correction on TemporalInvalidity data type | SBIProtoc19 |
| TS 29.565 | 19.2.0 | 0169 | Completion of QoS Monitoring Capability Report | TEI19_QME |
| TS 29.565 | 19.2.0 | 0171 | Update of info and externalDocs fields | TEI19 |
| TS 29.565 | 19.3.0 | 0172 | Support of QoS Monitoring Capability report type | TEI19_QME |
| TS 29.565 | 19.3.0 | 0173 | Correction to the incorrect description of the boolean type for the mandatory attribute | SBIProtoc19 |
| TS 29.565 | 19.3.0 | 0175 | Update of info and externalDocs fields | TEI19 |
| TS 29.565 | 19.4.0 | 0179 | Correct the attribute name | IIoT |
| TS 29.565 | 19.4.0 | 0180 | Update of info and externalDocs fields | TEI19 |
| TS 29.565 | 19.5.0 | 0181 | Corrections to Supported Features | SBIProtoc19 |
| TS 29.565 | 19.5.0 | 0182 | Support of all possible data burst sizes | TEI19, IIoT |
| TS 29.565 | 19.5.0 | 0183 | Corrections to the data type TimeSyncExposureSubsNotif and TemporalInValidity | SBIProtoc19 |
| TS 29.565 | 19.5.0 | 0184 | Update of info and externalDocs fields | TEI19 |
| TS 29.565 | 19.6.0 | 0185 | Remove editor’s note for frozen specification | TEI19_QME |
| TS 29.565 | 19.6.0 | 0187 | Update of info and externalDocs fields | TEI19 |
| TS 29.565 | 19.7.0 | 0191 | Correcting resource URI names | IIoT |
| TS 29.565 | 19.7.0 | 0194 | Update of info and externalDocs fields | TEI19 |

</details>

### Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [LPHAP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910036) | Low Power High Accuracy Positioning for industrial IoT scenarios | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Jun 2021 | [SP-210216](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_91E_Electronic/Docs/SP-210216.zip) |
| [SEI](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920039) | Smart Energy and Infrastructure | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Dec 2021 | [SP-210523](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_92E_Electronic_2021_06/Docs/SP-210523.zip) |
| [SEI](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920032) | Stage 1 of Smart Energy and Infrastructure | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Dec 2021 | [SP-210523](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_92E_Electronic_2021_06/Docs/SP-210523.zip) |
| [FS_DetNet](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940054) | Study on Extensions to the TSC Framework to support Deterministic Networking (DetNet) | Study | TR 23.700-46 | Complete, Dec 2022 | [SP-211633](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_94E_Electronic_2021_12/Docs/SP-211633.zip) |
| [DetNet](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020064) | (IETF) CT3 part of DetNet (draft-ietf-detnet-yang) | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 29.513) | Complete, Mar 2024 | [CP-231195](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_100_Taipei/Docs/CP-231195.zip) |
| [5TRS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910039) | 5G Timing Resiliency System | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Mar 2024 | [SP-210211](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_91E_Electronic/Docs/SP-210211.zip) |
| [FS_5TRS_URLLC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940055) | Study on 5G Timing Resiliency and TSC&URLLC enhancements | Study | [TR 23.700-25](https://www.3gpp.org/dynareport/23700-25.htm) | Complete, Dec 2022 | [SP-211634](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_94E_Electronic_2021_12/Docs/SP-211634.zip) |
| [5TRS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910033) | Stage 1 for 5TRS | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Sep 2021 | [SP-210211](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_91E_Electronic/Docs/SP-210211.zip) |
| [TRS_URLLC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970024) | Stage 2 of Timing Resiliency and URLLC enhancements | Normative | TS 23.501, TS 23.502, TS 23.503 | Complete, Mar 2023 | [SP-230107](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230107.zip) |
| [TRS_URLLC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980102) | CT1 aspects of TRS_URLLC | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 24.501, TS 29.122, TS 29.507, TS 29.512, TS 29.513, TS 29.514, TS 29.522, TS 29.534, TS 29.503, TS 29.504, TS 29.505, TS 29.518, TS 29.571, 29.244.24.539) | Complete, Mar 2024 | [CP-231360](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_100_Taipei/Docs/CP-231360.zip) |
| [TRS_URLLC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980103) | CT3 aspects of TRS_URLLC | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 24.501, TS 29.122, TS 29.507, TS 29.512, TS 29.513, TS 29.514, TS 29.522, TS 29.534, TS 29.503, TS 29.504, TS 29.505, TS 29.518, TS 29.571, 29.244.24.539) | Complete, Mar 2024 | [CP-231360](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_100_Taipei/Docs/CP-231360.zip) |
| [TRS_URLLC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980104) | CT4 aspects of TRS_URLLC | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 24.501, TS 29.122, TS 29.507, TS 29.512, TS 29.513, TS 29.514, TS 29.522, TS 29.534, TS 29.503, TS 29.504, TS 29.505, TS 29.518, TS 29.571, TS 29.244, TS 29.585) | Complete, Dec 2023 | [CP-231360](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_100_Taipei/Docs/CP-231360.zip) |
| [TRS_URLLC-NR](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=991036) | NR Timing Resiliency and URLLC enhancements | Normative | not listed | Complete, Dec 2023 | [RP-232863](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_102/Docs/RP-232863.zip) |
| [TRS_URLLC-NR-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=991136) | Core part: NR Timing Resiliency and URLLC enhancements | Normative | not listed | Complete, Dec 2023 | [RP-232863](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_102/Docs/RP-232863.zip) |
| [FS_TSNCH](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970032) | Study on Time Sensitive Networking (TSN) Charging | Study | TR 28.839 | Complete, Dec 2023 | [SP-220979](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_97E_Electronic_2022-09/Docs/SP-220979.zip) |
| [TSN_CH](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1010014) | Charging Aspects of TSN | Normative | TS 32.240, TS 32.254, TS 32.255, TS 32.291, TS 32.298, TS 32.297, TS 32.282 | Complete, Mar 2024 | [SP-240268](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240268.zip) |
| [SBIProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960052) | Service Based Interface Protocol Improvements Release 18 | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 29.507, TS 29.508, TS 29.512, TS 29.514, TS 29.517, TS 29.519, TS 29.520, TS 29.521, TS 29.523, TS 29.525, TS 29.534, TS 29.535, TS 29.537, TS 29.551, TS 29.554, TS 29.557, TS 29.574, TS 29.575, TS 29.576, TS 29.580, TS 29.591, TS 29.594, TS 29.675) | Complete, Dec 2023 | [CP-221083](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221083.zip) |
| [SBIProtoc18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960060) | CT3 aspects of SBIProtoc18 | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) (with TS 29.507, TS 29.508, TS 29.512, TS 29.514, TS 29.517, TS 29.519, TS 29.520, TS 29.521, TS 29.523, TS 29.525, TS 29.534, TS 29.535, TS 29.537, TS 29.551, TS 29.554, TS 29.557, TS 29.574, TS 29.575, TS 29.576, TS 29.580, TS 29.591, TS 29.594, TS 29.675) | Complete, Dec 2023 | [CP-221083](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_96_Budapest/Docs/CP-221083.zip) |

<details>
<summary>113 change requests and 3 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.104 | 18.0.0 | 0064 | Adding energy efficiency use cases for positioning to the ANNEX A | REFEC |
| TR 23.700-25 | 18.0.0 |  | MCC editorial update for publication after approval at TSG SA#98-e (Release 18) |  |
| TS 29.565 | 18.0.0 | 0031 | Adding the mandatory error code 502 Bad Gateway | SBIProtoc18 |
| TS 29.565 | 18.0.0 | 0032 | TscEvent enumeration definition in the OpenAPI file | SBIProtoc18 |
| TS 29.565 | 18.0.0 | 0035 | Update of info and externalDocs fields | TEI18 |
| TS 22.104 | 18.1.0 |  | 0073 D Alignment of positioning power consumption aspects between 22.261 and 22.104 |  |
| TS 22.104 | 18.1.0 | 0065 | 5G timing resiliency | 5TRS |
| TS 22.104 | 18.1.0 | 0066 | Quality improvement - addition of new annex (relationship between reliability and communication service availability) | eCAV |
| TS 22.104 | 18.1.0 | 0068 | 22.104 - V18.0.0 - quality improvement - update of mobile-robots use case description | eCAV |
| TS 22.104 | 18.1.0 | 0069 | Correction of mobile-robot use cases (UE number) | eCAV |
| TS 22.104 | 18.1.0 | 0070 | Quality improvement - service duration | eCAV |
| TS 22.104 | 18.1.0 | 0072 | Adding LPHAP requirements for Industrial IoT | LPHAP |
| TS 22.104 | 18.1.0 | 0073 | Alignment of positioning power consumption aspects between 22.261 and 22.104 | LPHAP |
| TS 22.104 | 18.1.0 | 0075 | Quality improvement - update of definition of communication service availability | eCAV |
| TR 23.700-25 | 18.1.0 | 0002 | TR 23.700 KI#1 conclusion update | FS_5TRS_URLLC |
| TR 23.700-25 | 18.1.0 | 0003 | TR 23.700 KI#6 conclusion update | FS_5TRS_URLLC |
| TS 29.565 | 18.1.0 | 0036 | Adding PER to TSC QoS inputs | TRS_URLLC |
| TS 29.565 | 18.1.0 | 0038 | Correction to Ntsctsf_TimeSynchronization Service | IIoT |
| TS 29.565 | 18.1.0 | 0040 | Correction to Ntsctsf_TSCQoSandAssistance Service | IIoT |
| TS 29.565 | 18.1.0 | 0042 | Correction to Ntsctsf_ASTI Service | IIoT |
| TS 29.565 | 18.1.0 | 0043 | Generalization of QoS monitoring control description | TEI18, 5G_URLLC |
| TS 29.565 | 18.1.0 | 0044 | Service description – support of network timing synchronization status and reporting | TRS_URLLC |
| TS 29.565 | 18.1.0 | 0045 | Provisioning of coverage area filters for ASTI service | TRS_URLLC |
| TS 29.565 | 18.1.0 | 0046 | Notification of 5G Access Stratum Time Distribution enabled/disabled | TRS_URLLC |
| TS 29.565 | 18.1.0 | 0047 | Provisioning of coverage area and notification of changes of capabilities configuration | TRS_URLLC |
| TS 29.565 | 18.1.0 | 0048 | Specification of application errors for TSC QoS requests | IIoT, TEI18 |
| TS 29.565 | 18.1.0 | 0049 | Indication of Alternative Service Requirements not supported | IIoT, TEI18 |
| TS 29.565 | 18.1.0 | 0051 | Correction to QoS notification control | IIoT |
| TS 29.565 | 18.1.0 | 0053 | Support of BAT window and capability for BAT adaptation | TRS_URLLC |
| TS 29.565 | 18.1.0 | 0055 | Update of info and externalDocs fields | TEI18 |
| TS 22.104 | 18.2.0 | 0077 | Quality improvement: update of reference to IEEE 802.1AS | eCAV |
| TS 22.104 | 18.2.0 | 0078 | Introduction of Smart Energy Infrastructure Requirements | SEI |
| TS 22.104 | 18.2.0 | 0080 | Annex for smart grid | SEI |
| TS 22.104 | 18.2.0 | 0082 | Introduction of SEI KPIs | SEI |
| TS 22.104 | 18.2.0 | 0083 | Adjusting scope clause in TS 22.104 to the specification s content | SEI |
| TS 22.104 | 18.2.0 | 0084 | Clarification of requirements for clock synchronization with direct device connection and indirect network connection communication | TEI18, eCAV |
| TS 22.104 | 18.2.0 | 0087 | Inclusion of Smart Energy Infrastructure Requirements | SEI |
| TS 29.565 | 18.2.0 | 0057 | Adding PER to QoS service operation description | TRS_URLLC |
| TS 29.565 | 18.2.0 | 0058 | Network determined BAT offset and periodicity adaption | TRS_URLLC |
| TS 29.565 | 18.2.0 | 0059 | The correction on the BAT window and BAT adaptation capability | TRS_URLLC |
| TS 29.565 | 18.2.0 | 0060 | Support for network timing synchronization status and reporting | TRS_URLLC |
| TS 29.565 | 18.2.0 | 0061 | Adding missing presence conditions | SBIProtoc18 |
| TS 29.565 | 18.2.0 | 0062 | Support of traffic characteristics and monitoring of performance characteristics | GMEC |
| TS 29.565 | 18.2.0 | 0065 | Adding description for controlling time synchronization service | TRS_URLLC |
| TS 29.565 | 18.2.0 | 0068 | Correction on setting Packet Delay Failure report Threshold | 5G_URLLC, TEI17 |
| TS 29.565 | 18.2.0 | 0071 | Adding the time domain to procedures for provisioning TSC information | TEI18, IIoT |
| TS 29.565 | 18.2.0 | 0072 | Corrections to the redirection mechanism description | SBIProtoc18 |
| TS 29.565 | 18.2.0 | 0073 | 3GPP extensions to DetNet YANG model to support 5GS specifics | DetNet |
| TS 29.565 | 18.2.0 | 0074 | Definition of 3gpp-5gs-detnet-node YANG file | DetNet |
| TS 29.565 | 18.2.0 | 0075 | Update of info and externalDocs fields | TEI18 |
| TS 22.104 | 18.3.0 |  | 0090 D Remove editor note for Figure A.4.4.3-1 |  |
| TS 22.104 | 18.3.0 | 0089 | Correction of references for clause 2 | SEI |
| TS 22.104 | 18.3.0 | 0090 | Remove editor note for Figure A.4.4.3-1 | SEI |
| TS 22.104 | 18.3.0 | 0091 | Update to Smart Grid normative requirements | SEI |
| TS 29.565 | 18.3.0 | 0077 | TSCTSF handling when it receives the time sync request from AF and subscription from UDM and the data model definition | TRS_URLLC |
| TS 29.565 | 18.3.0 | 0078 | Remove the trailing slash in the relative path after API URI | SBIProtoc18 |
| TS 29.565 | 18.3.0 | 0079 | Corrections to the definition of AF requested QoS for a UE or group of UEs | GMEC |
| TS 29.565 | 18.3.0 | 0080 | Corrections to the redirection mechanism description | SBIProtoc18 |
| TS 29.565 | 18.3.0 | 0081 | Update the apiVersion in the QoSandTSCAssistance Service API | SBIProtoc18 |
| TS 29.565 | 18.3.0 | 0082 | Resource and data model for the Ntsctsf_ASTI API | TRS_URLLC |
| TS 29.565 | 18.3.0 | 0083 | Service description for the Ntsctsf_ASTI service | TRS_URLLC |
| TS 29.565 | 18.3.0 | 0084 | Update of info and externalDocs fields | TEI18 |
| TS 22.104 | 18.4.0 | 0098 | Alignment for Smart Energy Infrastructure | SEI |
| TS 22.104 | 18.4.0 | 0099 | Correction of reference to IEEE Std 1588-2019 | SEI |
| TS 29.565 | 18.4.0 | 0086 | Reslove the EN about AF requested QoS for a UE or group of UE(s) | GMEC |
| TS 29.565 | 18.4.0 | 0087 | HTTP RFCs obsoleted by IETF RFC 9113 | SBIProtoc18 |
| TS 29.565 | 18.4.0 | 0088 | Support the status information on ASTI service | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0089 | Clarification on time synchronization service | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0091 | Solving remaining Editor's Note(s) for DetNet | DetNet |
| TS 29.565 | 18.4.0 | 0092 | Correction to clock quality information | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0094 | Update to the time synchronization status and the report | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0095 | Removal of Editor’s Note | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0096 | ProblemDetails RFC 7807 obsoleted by RFC 9457 | SBIProtoc18 |
| TS 29.565 | 18.4.0 | 0097 | Update the time synchronization status parameters | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0098 | Completion of YANG module for 3GPP extensions to IETF DetNet | DetNet |
| TS 29.565 | 18.4.0 | 0099 | Miscellaneous Corrections | IIoT |
| TS 29.565 | 18.4.0 | 0100 | Notification of Access Stratum Time Distribution configuration changes | TRS_URLLC |
| TS 29.565 | 18.4.0 | 0101 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.5.0 | 0103 | Notifying the clock quality acceptance criteria result for NW TT | TRS_URLLC |
| TS 29.565 | 18.5.0 | 0105 | Update the procedure for subscription to the notification for the changes in ASTI status | TRS_URLLC |
| TS 29.565 | 18.5.0 | 0107 | Correction on state of configuration | IIoT |
| TS 29.565 | 18.5.0 | 0108 | Corrections to DetNet data model | DetNet |
| TS 29.565 | 18.5.0 | 0109 | Corrections and alignments of TimeSyncExposure service data model | TRS_URLLC |
| TS 29.565 | 18.5.0 | 0110 | Corrections and alignments to ASTI service data model | TRS_URLLC |
| TS 29.565 | 18.5.0 | 0111 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.6.0 | 0113 | Correction to the definition of Ntsctsf_QoSandTSCAssistance API | TRS_URLLC |
| TS 29.565 | 18.6.0 | 0114 | Clarification about 200/201 response for time synchronization service | TRS_URLLC |
| TS 29.565 | 18.6.0 | 0117 | Corrections on QoS monitoring reports | IIoT |
| TS 29.565 | 18.6.0 | 0119 | Essential corrections to Ntsctsf_QoSandTSCAssistance Service | IIoT |
| TS 29.565 | 18.6.0 | 0120 | Support of pre-configured thresholds and CQRCI check issues | TRS_URLLC |
| TS 29.565 | 18.6.0 | 0121 | Clean up of subscription control and time synchronization services status monitoring | TRS_URLLC |
| TS 29.565 | 18.6.0 | 0122 | Clean up of subscription control and ASTI status monitoring | TRS_URLLC |
| TS 29.565 | 18.6.0 | 0123 | Various GMEC related corrections | GMEC |
| TS 29.565 | 18.6.0 | 0124 | Correction of the presence condition for qosReference | IIoT |
| TS 29.565 | 18.6.0 | 0128 | Corrections on Ntsctsf_TimeSynchronization and Annex number | IIoT |
| TS 29.565 | 18.6.0 | 0129 | Corrections on the apiVersion | SBIProtoc18 |
| TS 29.565 | 18.6.0 | 0130 | Additional GMEC related corrections | GMEC |
| TS 29.565 | 18.6.0 | 0131 | Corrections to the 3xx based 3GPP SBI redirection mechanism | SBIProtoc18 |
| TS 29.565 | 18.6.0 | 0132 | Correction to Individual QoS parameters | GMEC |
| TS 29.565 | 18.6.0 | 0133 | Correction of the description of the attribute periodicityRange | TRS_URLLC |
| TS 29.565 | 18.6.0 | 0135 | Correct the Cardinality of the TscAppSessionContextUpdateData | IIoT |
| TS 29.565 | 18.6.0 | 0137 | Corrections for the Ntsctsf_TimeSynchronization | IIoT |
| TS 29.565 | 18.6.0 | 0139 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.7.0 | 0142 | Wrong scope name | IIoT |
| TS 29.565 | 18.7.0 | 0144 | Corrections on the TimeSyncExposureSubsc | IIoT |
| TS 29.565 | 18.7.0 | 0147 | Miscellaneous Correction to the ASTI API | TRS_URLLC |
| TS 29.565 | 18.7.0 | 0150 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.8.0 | 0155 | Wrong attribute name | TEI18, IIoT |
| TS 29.565 | 18.8.0 | 0158 | Corrections on the N6 termination indication | IIoT |
| TS 29.565 | 18.8.0 | 0160 | Updating the IETF HTTP RFC for DetNet | DetNet |
| TS 29.565 | 18.8.0 | 0163 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.9.0 | 0165 | Correct the RFC reference for the Yang Module | DetNet |
| TS 29.565 | 18.10.0 | 0174 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.11.0 | 0178 | Correct the attribute name | IIoT |
| TS 29.565 | 18.12.0 | 0186 | Update of info and externalDocs fields | TEI18 |
| TS 29.565 | 18.13.0 | 0190 | Correcting resource URI names | IIoT |

</details>

### Release 17

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [eCAV](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=840050) | Enhancements for cyber-physical control applications in vertical domains | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Dec 2019 | [SP-190310](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_84/Docs/SP-190310.zip) |
| [eCAV](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=840041) | Stage 1 of eCAV | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Dec 2019 | [SP-191043](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_86/Docs/SP-191043.zip) |
| [CMED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=840047) | Communication Service Requirements for Critical Medical Applications | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Dec 2019 | [SP-190306](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_84/Docs/SP-190306.zip) |
| [CMED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=840033) | Stage 1 of CMED | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Dec 2019 | [SP-190306](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_84/Docs/SP-190306.zip) |
| [IIoT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910061) | CT3 aspects of support of enhanced Industrial IoT | Normative | [TS 29.565](https://www.3gpp.org/dynareport/29565.htm) | Complete, Mar 2022 | [CP-212100](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_93e/Docs/CP-212100.zip) |

<details>
<summary>79 change requests and 7 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.104 | 17.0.0 | 0009 | Adding vertical positioning requirements to TS 22.104 v16.1.0 | 5G_HYPOS, 5G_HYPOS |
| TS 29.565 | 17.0.0 |  | Approved by TSG CT |  |
| TS 22.104 | 17.1.0 |  | 0010 B Add one more case for control-to-control communication |  |
| TS 22.104 | 17.1.0 | 0010 | Add one more case for control-to-control communication | eCAV |
| TS 22.104 | 17.1.0 | 0011 | Addition of robotic aided surgery and diagnosis performance requirements | CMED |
| TS 22.104 | 17.1.0 | 0012 | Addition of a new synchronisation performance requirement | CMED |
| TS 22.104 | 17.1.0 | 0013 | Network operation requirements | eCAV |
| TS 22.104 | 17.1.0 | 0015 | eCAV – Further 5G service requirements for Positioning | eCAV |
| TS 22.104 | 17.1.0 | 0016 | eCAV – further 5G service requirements for wired to wireless link replacement for smart manufacturing / Industry 4.0 | eCAV |
| TS 22.104 | 17.1.0 | 0018 | eCAV – Service performance requirements for Industrial Wireless Sensors | eCAV |
| TS 22.104 | 17.1.0 | 0019 | ECAV - further 5G service requirements for industrial Ethernet integration (clock synchronization, time-sensitive communication) | eCAV |
| TS 22.104 | 17.1.0 | 0020 | eCAV – further 5G service requirements for network performance | eCAV |
| TS 22.104 | 17.1.0 | 0021 | ECAV - further 5G service requirements for ProSe communication for CAV | eCAV |
| TS 22.104 | 17.1.0 | 0023 | Correction of a figure number in Annex D.2 | cyberCAV |
| TS 29.565 | 17.1.0 | 0001 | Add PUT method in table 6.1.3.1-1 | IIoT |
| TS 29.565 | 17.1.0 | 0002 | Correction to 5G access time distribution | IIoT |
| TS 29.565 | 17.1.0 | 0003 | Correction to initial provisioning of TSC related service information | IIoT |
| TS 29.565 | 17.1.0 | 0004 | Correction to notification about TSC application session context event | IIoT |
| TS 29.565 | 17.1.0 | 0005 | Correction to notification about TSC application session context termination | IIoT |
| TS 29.565 | 17.1.0 | 0006 | Correction to subscription to events for the existing TSC application session context | IIoT |
| TS 29.565 | 17.1.0 | 0007 | Correction to the procedure of creating a new subscription | IIoT |
| TS 29.565 | 17.1.0 | 0009 | Corrections to the methods of Ntsctsf_ASTI Service API | IIoT |
| TS 29.565 | 17.1.0 | 0010 | Corrections to the methods of Ntsctsf_QoSandTSCAssistance API | IIoT |
| TS 29.565 | 17.1.0 | 0011 | Corrections to the methods of Ntsctsf_TimeSynchronization API | IIoT |
| TS 29.565 | 17.1.0 | 0013 | Handling of temporal validity condition | IIoT |
| TS 29.565 | 17.1.0 | 0018 | Support of sponsored connectivity | IIoT |
| TS 29.565 | 17.1.0 | 0019 | Correction to the references | IIoT |
| TS 29.565 | 17.1.0 | 0020 | Correction to time synchronization capabilities subscription | IIoT |
| TS 29.565 | 17.1.0 | 0021 | Data Model corrections | IIoT |
| TS 29.565 | 17.1.0 | 0022 | Correction of the association of Time Sync Exposure subscriptions to AF sessions | IIoT |
| TS 29.565 | 17.1.0 | 0023 | Correction of the handling of AM policies upon Time Sync configuration | IIoT |
| TS 29.565 | 17.1.0 | 0024 | TSCTSF API corrections | IIoT |
| TS 29.565 | 17.1.0 | 0025 | Mapping of GPSIs and Group Identifiers to a SUPI list | IIoT |
| TS 29.565 | 17.1.0 | 0026 | Definitions of HTTP "403 Forbidden" response | IIoT |
| TS 29.565 | 17.1.0 | 0027 | Initial provisioning of TSC related service information | IIoT |
| TS 29.565 | 17.1.0 | 0028 | Update of info and externalDocs fields | TEI17 |
| TS 22.104 | 17.2.0 |  | 0028 F Addition of transmission directions and movement characteristics |  |
| TS 22.104 | 17.2.0 | 0026 | Correction of CMED KPIs tables | CMED |
| TS 22.104 | 17.2.0 | 0027 | Addition of informative annex for AV Prod | AVPROD |
| TS 22.104 | 17.2.0 | 0028 | Addition of transmission directions and movement characteristics | eCAV |
| TS 22.104 | 17.2.0 | 0030 | Clarification on communication service reliability | eCAV |
| TS 22.104 | 17.2.0 | 0032 | Network performance requirements for mobile operation panel | eCAV |
| TS 22.104 | 17.2.0 | 0034 | Clarification of clock synchronicity requirements | cyberCAV |
| TS 22.104 | 17.2.0 | 0035 | Derivation of communication service availability and reliability from network performance metrics | eCAV |
| TS 22.104 | 17.2.0 | 0037 | Editorial and minor corrections to TR 22.104 | eCAV |
| TS 22.104 | 17.2.0 | 0038 | TS 22104 - Annex A for cooperative carrying | eCAV |
| TS 29.565 | 17.2.0 | 0029 | Corrections in the error budget calculation | IIoT |
| TS 29.565 | 17.2.0 | 0030 | Miscellaneous corrections in the Time Synchronization API | IIoT |
| TS 29.565 | 17.2.0 | 0033 | Correction to Ethernet flows | IIoT |
| TS 29.565 | 17.2.0 | 0034 | Update of info and externalDocs fields | TEI17 |
| TS 22.104 | 17.3.0 |  | 0050 F Correction of service performance requirements in tables of annex A.6 |  |
| TS 22.104 | 17.3.0 |  | 0049 D 22.104 Miscellaneous editorial corrections |  |
| TS 22.104 | 17.3.0 | 0041 | Clarifications to communication service performance requirements | cyberCAV |
| TS 22.104 | 17.3.0 | 0045 | Correcting description of communication service status in Clause C.3 | cyberCAV |
| TS 22.104 | 17.3.0 | 0047 | Clock synchronicity budget for the 5G system | cyberCAV |
| TS 22.104 | 17.3.0 | 0048 | Miscellaneous values for further study | eCAV |
| TS 22.104 | 17.3.0 | 0049 | 22.104 Miscellaneous editorial corrections | eCAV |
| TS 22.104 | 17.3.0 | 0050 | Correction of service performance requirements in tables of annex A.6 | CMED |
| TS 29.565 | 17.3.0 | 0037 | Correction to Ntsctsf_TimeSynchronization Service | IIoT |
| TS 29.565 | 17.3.0 | 0039 | Correction to Ntsctsf_TSCQoSandAssistance Service | IIoT |
| TS 29.565 | 17.3.0 | 0041 | Correction to Ntsctsf_ASTI Service | IIoT |
| TS 29.565 | 17.3.0 | 0050 | Correction to QoS notification control | IIoT |
| TS 22.104 | 17.4.0 |  | 0055 F Quality improvement – burst definition |  |
| TS 22.104 | 17.4.0 | 0055 | Quality improvement – burst definition | eCAV |
| TS 22.104 | 17.4.0 | 0058 | CR 22.104 R17 - Editorial Improvements – Decimal Separator | eCAV |
| TS 29.565 | 17.4.0 | 0067 | Correction on setting Packet Delay Failure report Threshold | 5G_URLLC, TEI17 |
| TS 22.104 | 17.5.0 |  | 0063 D Non-inclusive language replacement 22.104 |  |
| TS 22.104 | 17.5.0 | 0063 | Non-inclusive language replacement 22.104 | TEI17 |
| TS 29.565 | 17.5.0 | 0102 | Miscellaneous Corrections | IIoT |
| TS 22.104 | 17.6.0 | 0067 | Quality improvement - update of definition of communication service availability | eCAV |
| TS 29.565 | 17.6.0 | 0106 | Correction on state of configuration | IIoT |
| TS 22.104 | 17.7.0 | 0076 | Quality improvement: update of reference to IEEE 802.1AS | eCAV |
| TS 29.565 | 17.7.0 | 0112 | Correction of the presence condition for qosReference | IIoT |
| TS 29.565 | 17.7.0 | 0116 | Corrections on QoS monitoring reports | IIoT |
| TS 29.565 | 17.7.0 | 0118 | Essential corrections to Ntsctsf_QoSandTSCAssistance Service | IIoT |
| TS 29.565 | 17.7.0 | 0127 | Corrections on Ntsctsf_TimeSynchronization and Annex number | IIoT |
| TS 29.565 | 17.7.0 | 0134 | Correction of the TscAppSessionContextUpdateData | IIoT |
| TS 29.565 | 17.7.0 | 0136 | Corrections for the Ntsctsf_TimeSynchronization | IIoT |
| TS 29.565 | 17.7.0 | 0138 | Update of info and externalDocs fields | TEI17 |
| TS 29.565 | 17.8.0 | 0141 | Wrong scope name | IIoT |
| TS 29.565 | 17.8.0 | 0143 | Corrections on the TimeSyncExposureSubsc | IIoT |
| TS 29.565 | 17.8.0 | 0149 | Update of info and externalDocs fields | TEI17 |
| TS 29.565 | 17.9.0 | 0157 | Corrections on the N6 termination indication | IIoT |
| TS 29.565 | 17.9.0 | 0162 | Update of info and externalDocs fields | TEI17 |
| TS 29.565 | 17.10.0 | 0177 | Correct the attribute name | IIoT |
| TS 29.565 | 17.11.0 | 0189 | Correcting resource URI names | IIoT |

</details>

### Release 16

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_CAV](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=750004) | Study on Communication for Automation in Vertical Domains | Study | [TR 22.804](https://www.3gpp.org/dynareport/22804.htm) | Complete, Mar 2018 | [SP-170169](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_75/Docs/SP-170169.zip) |
| [cyberCAV](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=800007) | Service requirements for cyber-physical control applications in vertical domains | Normative | [TS 22.104](https://www.3gpp.org/dynareport/22104.htm) (with TS 22.261) | Complete, Sep 2018 | [SP-180321](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_80/Docs/SP-180321.zip) |

<details>
<summary>28 change requests and 3 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.104 | 16.0.0 |  | Raised to v.16.0.0 following SA approval |  |
| TR 22.804 | 16.0.0 |  | Raised to V.16.0.0 following SA's approval |  |
| TS 22.104 | 16.1.0 | 0001 | Clean-up and corrections of TS 22.104 cyberCAV | cyberCAV |
| TS 22.104 | 16.1.0 | 0002 | Moving rail-bound mass transit requirements – shift from cyberCAV | TEI16, cyberCAV |
| TS 22.104 | 16.1.0 | 0003 | Clarifying UE-to-UE versus UE-to-network | cyberCAV |
| TR 22.804 | 16.1.0 | 0002 | TR 22.804 - adding CRC and FIFO to list of abbreviations | FS_CAV |
| TR 22.804 | 16.1.0 | 0003 | TR 22.804 - attending orphaned annexes | FS_CAV |
| TR 22.804 | 16.1.0 | 0004 | TR 22.804 - editorial cleanup of annexe B | FS_CAV |
| TR 22.804 | 16.1.0 | 0005 | TR 22.804 - annexe F - correction of entries for use cases 5.6.2 and 5.6.3 | FS_CAV |
| TR 22.804 | 16.1.0 | 0006 | Correction of positioning service performance requirements | FS_CAV |
| TR 22.804 | 16.1.0 | 0007 | Editorial cleanup of 'private' | FS_CAV |
| TR 22.804 | 16.1.0 | 0008 | TR 22.804 - service continuity for wind farms | FS_CAV |
| TR 22.804 | 16.1.0 | 0009 | Add the post-conditions of Millisecond-Level Precise Load Control | FS_CAV |
| TS 22.104 | 16.2.0 |  | 0008 F Corrections to TS 22.104 v16.1.0 |  |
| TS 22.104 | 16.2.0 | 0005 | Adding edge computing aspect | cyberCAV |
| TS 22.104 | 16.2.0 | 0006 | Add missing abbreviations to TS 22.104 | cyberCAV |
| TS 22.104 | 16.2.0 | 0008 | Corrections to TS 22.104 v16.1.0 | cyberCAV |
| TR 22.804 | 16.2.0 | 0010 | Clean-up of clause 4.3 and batch processing | FS_CAV |
| TR 22.804 | 16.2.0 | 0011 | Update to TR 22.804 clause 5.6 | FS_CAV |
| TR 22.804 | 16.2.0 | 0012 | TR 22.804 - General editorial corrections | FS_CAV |
| TR 22.804 | 16.2.0 | 0013 | Resolution of editor’s notes in TR 22.804 | FS_CAV |
| TR 22.804 | 16.2.0 | 0014 | cyberCAV – TS 22.104 – Considerations on communication service interface | FS_CAV |
| TS 22.104 | 16.3.0 | 0014 | Clarification for CSA requirements | cyberCAV |
| TS 22.104 | 16.3.0 | 0022 | Correction of a figure number in Annex D.2 | cyberCAV |
| TR 22.804 | 16.3.0 | 0015 | Urgent correction of message size in use case modular, flexible production area | FS_CAV |
| TS 22.104 | 16.4.0 | 0029 | Clarification on communication service reliability | eCAV |
| TS 22.104 | 16.4.0 | 0033 | Clarification of clock synchronicity requirements | cyberCAV |
| TS 22.104 | 16.5.0 | 0040 | Clarifications to communication service performance requirements | cyberCAV |
| TS 22.104 | 16.5.0 | 0044 | Correcting description of communication service status in Clause C.3 | cyberCAV |
| TS 22.104 | 16.5.0 | 0046 | Clock synchronicity budget for the 5G system | cyberCAV |
| TS 22.104 | 16.5.0 | 0051 | Miscellaneous values for further study | cyberCAV |

</details>

### Release 14

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 22.804 | 14.1.0 | 0001 | Remove requirement in MCData TS 22.282 that has been added to MCCoRe TS 22.280. |  |

### TS 22.104 before change control

<details>
<summary>5 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| May 2018 | SA1#82 | S1-181551 | – – – Skeleton for TS 22.104 ("Service requirements for cyber-physical control applications in vertical domains") | 0.0.0 |
| May 2018 | SA1#82 | S1-181552 | – – – Includes agreements at SA1#82, Dubrovnik, Croatia | 0.1.0 |
| Aug 2018 | SA1#83 | S1-182344 | – – – Includes agreements at SA1#83, West Palm Beach, Florida | 0.2.0 |
| Nov 2018 | SA1#84 | S1-183276 | – – – Includes agreements at SA1#83, Spokane, WA, USA, rapporteur’s clean-up | 0.3.0 |
| Dec 2018 | SA#82 | SP-181006 | Presentation to SA for one-step approval | 1.0.0 |

</details>

### TR 22.804 before change control

<details>
<summary>8 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| May 2017 | SA1#78 | S1-172349 | Skeleton for TR 22.804 ("Study on Communication for Automation in Vertical domains") | 0.0.0 |
| May 2017 | SA1#78 | S1-172159 | Includes agreements at SA1#78, May 2017, Oporto, Portugal | 0.1.0 |
| Sep 2017 | SA1#79 | S1-173236 | Includes agreements at SA1#79, August 2017, Guilin, China | 0.2.0 |
| Dec 2017 | SA1#80 | S1-174273 | Includes agreements at SA1#80, November-December 2017, Reno, Nevada | 0.3.0 |
| Dec 2017 | SA#78 | SP-170992 | MCC clean-up for presentation to SA#78 | 1.0.0 |
| Feb 2018 | SA1#81 | S1-180243 | Includes agreements at SA1#81, February 2018, Fukuoka, Japan | 1.1.0 |
| May 2018 | SA1#82 | S1-181284 | Includes agreements at SA1#82, May 2018, Dubrovnik, Croatia | 1.2.0 |
| May 2018 | SA#80 | SP-180332 | Cleaned-up for presentation for approval at SA#80 | 2.0.0 |

</details>

### TS 29.565 before change control

<details>
<summary>10 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2021 |  |  | TS skeleton | 0.0.0 |
| Aug 2021 | CT3#117e | C3-214576 | Inclusion of documents agreed in CT3#117e: C3-214145, C3-214149, C3-214154, C3-214466, C3-214467, C3-214468, C3-214469, C3-214505, C3-214506, C3-214507, C3-214508, C3-214509, C3-214510 | 0.1.0 |
| Oct 2021 | CT3#118e | C3-215473 | Inclusion of documents agreed in CT3#118e: C3-215347, C3-215348, C3-215349, C3-215350, C3-215351, C3-215352, C3-215353, C3-215354, C3-215356, C3-215357, C3-215358, C3-215470 | 0.2.0 |
| Nov 2021 | CT3#119e | C3-216517 | Inclusion of documents agreed in CT3#119e: C3-216114, C3-216115, C3-216116, C3-216121, C3-216397, C3-216398, C3-216399, C3-216400, C3-216401, C3-216402, C3-216426, C3-216594, C3-215357, C3-216595 | 0.3.0 |
| Dec 2021 | CT#94-e | CP-213208 | Presentation for information | 1.0.0 |
| Jan 2022 | CT3#119bis-e | C3-220449 | Inclusion of documents agreed in CT3#119bis-e: C3-220424, C3-220165, C3-220166, C3-220167, C3-220425, C3-220423, C3-220415, C3-220359, C3-220172 | 1.1.0 |
| Feb 2022 | CT3#120e | C3-221512 | Inclusion of documents agreed in CT3#120e: C3-221181, C3-221184, C3-221185, C3-221186, C3-221187, C3-221189, C3-221190, C3-221191, C3-221192, C3-221237, C3-221445, C3-221446, C3-221469, C3-221552, C3-221606, C3-221650 | 1.2.0 |
| Apr 2022 | CT3#121e | C3-222482 | Inclusion of documents agreed in CT3#121e: C3-222176, C3-222177, C3-222178, C3-222179, C3-222181, C3-222182, C3-222183, C3-222295, C3-222420, C3-222424, C3-222435, C3-222489, C3-222503, C3-222507, C3-222555, C3-222556, C3-222564, | 1.3.0 |
| May 2022 | CT3#122e | C3-223505 | Inclusion of documents agreed in CT3#122e: C3-223121, C3-223122, C3-223124, C3-223126, C3-223229, C3-223230, C3-223131, C3-223132, C3-223283, C3-223286, C3-223469, C3-223471, C3-223472, C3-223490, C3-223494, C3-223495, C3-223660, C3-223661, C3-223693, C3-223739, C3-223744, C3-223749, | 1.4.0 |
| Jun 2022 | CT#96 | CP-221099 | Presentation to TSG CT for approval | 2.0.0 |

</details>

### TR 23.700-25 before change control

<details>
<summary>3 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Feb 2022 | SA2#149E | S2-2201055 | Proposed skeleton agreed at S2#149E | 0.0.0 |
| Sep 2022 | SA#97-e | SP-220818 | MCC editorial update for presentation to TSG SA for information` | 1.0.0 |
| Nov 2022 | SA#98-e | SP-221101 | MCC editorial update for presentation to TSG SA for approval` | 2.0.0 |

</details>
