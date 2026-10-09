---
hide_title: true
title: Non-Public Networks - Standards Evolution
slug: /standards/npn/evolution
description: Release-by-release 3GPP work item and Change Request history behind Non-Public Networks.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6"/><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/><path d="M8 11v-4a4 4 0 1 1 8 0v4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Non-Public Networks - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Standards: Non-Public Networks](/standards/npn): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 20:** work items FS_PLMNNPN_Ph2, PLMNNPN_Ph2-SEC.
- **Release 19:** work items SecNPN, PLMNNPN_SEC, PLMNNPN, TEI19_ProSe_NPN, FS_ISN, ISN; 4 versions without a change request.
- **Release 18:** work items eNPN_Ph2, FS_eNPN_Ph2, FS_eNPN_Ph2_SEC, FS_eNPN_CH, eNPN_CH, eNPN_Ph2-NGRAN-Core, eNPN_Ph2-NGRAN_plus_CT1-UEConTest, FS_OAM_eNPN, OAM_NPN_Ph2; 14 change requests.
- **Release 17:** work items FS_eNPN, eNPN, FS_eNPN_SEC, FS_NPN4AVProd, NPN_PWS, IESNPN, OAM_NPN; 10 change requests.
- **Release 16:** work item FS_OAM_NPN.

:::

Sources: the 3GPP work plan of 28 September 2026, the 3GPP Change Request database of 25 September 2026, and the change history of TS 22.263 V19.0.0, TR 28.807 V17.0.0, TS 28.557 V19.0.0, TR 28.907 V19.0.0, TR 23.700-07 V17.0.0, TR 33.857 V17.1.0, TR 26.805 V17.0.1, TR 23.700-08 V18.0.0, TR 33.858 V18.1.0, TR 33.757 V19.0.0.

This page covers [TS 22.263](https://www.3gpp.org/dynareport/22263.htm), [TR 28.807](https://www.3gpp.org/dynareport/28807.htm), [TS 28.557](https://www.3gpp.org/dynareport/28557.htm), [TR 28.907](https://www.3gpp.org/dynareport/28907.htm), [TR 23.700-07](https://www.3gpp.org/dynareport/23700-07.htm), [TR 33.857](https://www.3gpp.org/dynareport/33857.htm), [TR 26.805](https://www.3gpp.org/dynareport/26805.htm), [TR 23.700-08](https://www.3gpp.org/dynareport/23700-08.htm), [TR 33.858](https://www.3gpp.org/dynareport/33858.htm), [TR 33.757](https://www.3gpp.org/dynareport/33757.htm). The work items are those that name these specifications in the 3GPP work plan, and those whose title contains "Non-Public", "NPN" or "SNPN". The change requests are those recorded in the 3GPP Change Request database as implemented in a version.

### Release 20

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_PLMNNPN_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1090017) | Study on security for PLMN hosting a NPN phase 2 | Study | TR 33.758 | Complete, Jun 2026 | [SP-251239](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_109_Beijing_2025-09/Docs/SP-251239.zip) |
| [PLMNNPN_Ph2-SEC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1120086) | Security for a PLMN Hosting a Non-Public Network (NPN) Phase 2 | Normative | TS 33.501 | Complete, Sep 2026 | [SP-260660](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_112_Singapore_2026-06/Docs/SP-260660.zip) |

### Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [SecNPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000027) | Non-Public Network (NPN) security considerations | Normative | TS 22.261 | Complete, Jun 2023 | [SP-230523](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_100_Taipei_2023-06/Docs/SP-230523.zip) |
| [PLMNNPN_SEC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020039) | Study on security for PLMN hosting a NPN | Study | [TR 33.757](https://www.3gpp.org/dynareport/33757.htm) | Complete, Sep 2024 | [SP-231786](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_102_Edinburgh_2023-12/Docs/SP-231786.zip) |
| [PLMNNPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060067) | Security for PLMN hosting a NPN | Normative | TS 33.501 | Complete, Jun 2025 | [SP-241782](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_106_Madrid_2024-12/Docs/SP-241782.zip) |
| [TEI19_ProSe_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050080) | ProSe support in NPN | Normative | TS 23.304, TS 23.501 | Complete, Sep 2025 | [SP-240122](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240122.zip) |
| [TEI19_ProSe_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1030016) | Stage 2 of ProSe support in NPN | Normative | TS 23.304, TS 23.501 | Complete, Jun 2024 | [SP-240122](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240122.zip) |
| [TEI19_ProSe_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050021) | CT aspects of ProSe support in NPN | Normative | TS 23.122, TS 24.501, TS 24.554, TS 24.555, TS 29.525, TS 23.003 | Complete, Sep 2025 | [CP-251224](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251224.zip) |
| [TEI19_ProSe_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050081) | CT1 aspects of ProSe support in NPN | Normative | not listed | Complete, Sep 2025 | [CP-251224](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251224.zip) |
| [TEI19_ProSe_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060042) | CT3 aspects of ProSe support in NPN | Normative | not listed | Complete, Sep 2025 | [CP-251224](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251224.zip) |
| [TEI19_ProSe_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050082) | CT4 aspects of ProSe support in NPN | Normative | not listed | Complete, Sep 2025 | [CP-251224](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_108_Prague-2025-06/Docs/CP-251224.zip) |
| [FS_ISN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990053) | Study on Interconnect of SNPN | Study | TR 22.848 | Complete, Jun 2024 | [SP-230236](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230236.zip) |
| [ISN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1030041) | Interconnect of SNPN | Normative | TS 22.261 | Complete, Mar 2024 | [SP-240194](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_103_Maastricht_2024-03/Docs/SP-240194.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.263 | 19.0.0 |  | Updated to Rel-19 by MCC |  |
| TS 28.557 | 19.0.0 |  | Update to Rel-19 version (MCC) |  |
| TR 28.907 | 19.0.0 |  | Update to Rel-19 version (MCC) |  |
| TR 33.757 | 19.0.0 |  | Upgrade to change control version |  |

### Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [eNPN_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980128) | Non-Public Networks Phase 2 | Normative | TS 23.501, TS 23.502, TS 23.402 | Complete, Jun 2026 | [SP-220805](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_97E_Electronic_2022-09/Docs/SP-220805.zip) |
| [FS_eNPN_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940075) | Study on enhanced support of Non-Public Networks phase 2 | Study | [TR 23.700-08](https://www.3gpp.org/dynareport/23700-08.htm) | Complete, Dec 2022 | [SP-220418](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220418.zip) |
| [eNPN_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970015) | Stage 2 of Non-Public Networks Phase 2 | Normative | TS 23.501, TS 23.502, TS 23.402 | Complete, Jun 2023 | [SP-230096](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230096.zip) |
| [FS_eNPN_Ph2_SEC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960033) | Study on security aspects of enhanced support of Non-Public Networks phase 2 | Study | [TR 33.858](https://www.3gpp.org/dynareport/33858.htm) | Complete, Mar 2023 | [SP-220531](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220531.zip) |
| [eNPN_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990043) | Security aspects of support of Non-Public Networks phase 2 | Normative | TS 33.501 | Complete, Sep 2023 | [SP-230156](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230156.zip) |
| [FS_eNPN_CH](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940043) | Study on Charging Aspects for Enhanced Support of Non-Public Networks | Study | TR 28.828 | Complete, Mar 2023 | [SP-211447](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_94E_Electronic_2021_12/Docs/SP-211447.zip) |
| [eNPN_CH](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990028) | Charging Aspects for Enhanced Support of Non-Public Networks | Normative | TS 32.255, TS 32.256, TS 28.203, TS 32.291, TS 32.298 | Complete, Mar 2024 | [SP-230177](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230177.zip) |
| [eNPN_Ph2-NGRAN-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=991138) | Core part: Non-Public Networks Phase 2: NG-RAN aspects | Normative | not listed | Complete, Dec 2023 | [RP-233569](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_102/Docs/RP-233569.zip) |
| [eNPN_Ph2-NGRAN_plus_CT1-UEConTest](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040106) | UE Conformance - Non-Public Networks Phase 2: NG-RAN aspects plus CT1 aspects | Normative | not listed | Complete, Jun 2026 | [RP-261135](https://www.3gpp.org/ftp/tsg_ran/TSG_RAN/TSGR_112/Docs/RP-261135.zip) |
| [FS_OAM_eNPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940035) | Study on enhancement of management of non-public networks | Study | [TR 28.907](https://www.3gpp.org/dynareport/28907.htm) | Complete, Mar 2023 | [SP-230185](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230185.zip) |
| [OAM_NPN_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990034) | Management of non-public networks phase 2 | Normative | [TS 28.557](https://www.3gpp.org/dynareport/28557.htm) (with TS 28.541, TS 28.531, TS 28.533, TS 28.552) | Complete, Mar 2024 | [SP-230184](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230184.zip) |

<details>
<summary>14 change requests and 7 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 23.700-08 | 18.0.0 |  | MCC Update for publication after TSG SA approval |  |
| TS 28.557 | 18.0.0 | 0002 | Add use case and requirements for NPN fault management | OAM_NPN_Ph2 |
| TS 28.557 | 18.0.0 | 0003 | Add use case and requirements for management of NPN service customer | OAM_NPN_Ph2 |
| TR 28.907 | 18.0.0 |  | Upgrade to change control version |  |
| TR 33.858 | 18.0.0 |  | Upgrade to change control version |  |
| TS 22.263 | 18.0.1 |  | Updated to Rel-18 by MCC (and issue with v.18.0.0 upload) |  |
| TR 28.907 | 18.0.1 |  | EditHelp review |  |
| TR 33.858 | 18.0.1 |  | EditHelp review |  |
| TS 28.557 | 18.1.0 | 0004 | Add solution for NPN fault management | OAM_NPN_Ph2 |
| TS 28.557 | 18.1.0 | 0005 | Add solution for management of NPN service customer | OAM_NPN_Ph2 |
| TR 33.858 | 18.1.0 | 0001 | Addressing comments from EditHelp | FS_eNPN_Ph2_SEC |
| TS 28.557 | 18.2.0 | 0007 | Rel-18 CR TS 28.557 Add use case and requirements for SLA monitoring and assurance | OAM_NPN_Ph2 |
| TS 28.557 | 18.2.0 | 0010 | Rel-18 CR TS 28.557 Correction on procedure figure for NPN provisioning by a network slice of a PLMN | OAM_NPN_Ph2 |
| TS 28.557 | 18.3.0 | 0011 | Rel-18 CR TS 28.557 Add solution for SLA monitoring and assurance in NPN | OAM_NPN_Ph2 |
| TS 28.557 | 18.3.0 | 0012 | Rel-18 CR TS 28.557 Add solution for shared and dedicated resources in NPN | OAM_NPN_Ph2 |
| TS 28.557 | 18.3.0 | 0013 | Rel-18 CR TS 28.557 Add use case and requirements for shared and dedicated resource demand for NPN service customers | OAM_NPN_Ph2 |
| TS 28.557 | 18.3.0 | 0014 | Rel-18 CR TS 28.557 Correction on procedure figure for SNPN provisioning with 3GPP segments only | OAM_NPN_Ph2 |
| TS 28.557 | 18.3.0 | 0015 | Rel-18 CR TS 28.557 Update use case and requirement for SLA monitoring and assurance | OAM_NPN_Ph2 |
| TS 28.557 | 18.4.0 | 0016 | Rel-18 CR TS 28.557 Update procedure of management of tenant to align with access control solution | OAM_NPN_Ph2 |
| TS 28.557 | 18.4.0 | 0017 | Rel-18 CR TS 28.557 Fix wrong references and correct solution for NPN-SC mgmt | OAM_NPN_Ph2 |
| TS 28.557 | 18.4.1 |  | MCC: Fix an editorial issue |  |

</details>

### Release 17

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_eNPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=840024) | Study on enhanced support of Non-Public Networks | Study | [TR 23.700-07](https://www.3gpp.org/dynareport/23700-07.htm) | Complete, Mar 2021 | [SP-200094](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_87E_Electronic/Docs/SP-200094.zip) |
| [eNPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910065) | Enhanced support of Non-Public Networks | Normative | TS 23.501, TS 23.502, TS 23.503, TS 23.228, TS 23.167 | Complete, Jun 2022 | [SP-200980](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_90E_Electronic/Docs/SP-200980.zip) |
| [FS_eNPN_SEC](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880008) | Study on enhanced security support for Non-Public Networks | Study | [TR 33.857](https://www.3gpp.org/dynareport/33857.htm) | Complete, Jun 2022 | [SP-200353](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_88E_Electronic/Docs/SP-200353.zip) |
| [FS_NPN4AVProd](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910001) | Study on Media Production over 5G NPN | Study | not listed | Complete, Jun 2022 | [SP-210241](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_91E_Electronic/Docs/SP-210241.zip) |
| [NPN_PWS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920060) | NPN support of PWS | Normative | TS 22.261 | Complete, Jun 2021 | [SP-210585](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_92E_Electronic_2021_06/Docs/SP-210585.zip) |
| [IESNPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=860008) | IMS emergency support for Stand-alone Non-Public Network (SNPN) | Normative | TS 22.101, TS 22.261, TS 22.228 | Complete, Dec 2019 | [SP-191038](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_86/Docs/SP-191038.zip) |
| [OAM_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=870023) | Management of non-public networks (NPN) | Normative | TS 28.541, TS 28.531, TS 28.533, TS 28.552, TS 28.554 | Complete, Mar 2022 | [SP-200189](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_87E_Electronic/Docs/SP-200189.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 22.263 | 17.0.0 |  | Approved by SA#86 |  |
| TR 23.700-07 | 17.0.0 |  | MCC editorial Update for publication after TSG SA approval |  |
| TR 26.805 | 17.0.0 |  | Brought under change control |  |
| TS 28.557 | 17.0.0 |  | Upgrade to change control version |  |
| TR 28.807 | 17.0.0 |  | Upgrade to change control version |  |
| TR 33.857 | 17.0.0 |  | EditHelp review and upgrade to change control version |  |
| TR 26.805 | 17.0.1 |  | Editorial Update |  |
| TS 22.263 | 17.1.0 | 0003 | On the generic 5G requirements for VIAPA | AVPROD |
| TS 22.263 | 17.1.0 | 0004 | Clarification on Definition of Media Clock and Uncompressed Video | AVPROD |
| TS 22.263 | 17.1.0 | 0005 | Clarification on packet error per hour | AVPROD |
| TS 22.263 | 17.1.0 | 0006 | Correction of CMED KPIs tables | CMED |
| TS 22.263 | 17.1.0 | 0007 | Update description for medical application in section 4.4 | CMED |
| TS 28.557 | 17.1.0 | 0001 | Rel-17 CR for TS28.557 Correct wrong abbreviation for Data Centre Service Provider | TEI17 |
| TR 33.857 | 17.1.0 | 0001 | Editorials suggested by Edithelp | FS_eNPN_SEC |
| TS 22.263 | 17.2.0 | 0010 | Clarification on Clock Synchronicity - Alt. 2 | AVPROD |
| TS 22.263 | 17.3.0 | 0012 | Update and clarification of UE reconnection time | AVPROD |
| TS 22.263 | 17.4.0 | 0014 | Updating the definition of communication service availability | AVPROD |

### Release 16

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_OAM_NPN](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830024) | Study on non-public networks management | Study | not listed | Complete, Jun 2020 | [SP-190137](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_83/Docs/SP-190137.zip) |

### TS 22.263 before change control

<details>
<summary>8 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2019 | SA1#87 | S1-192206 | Skeleton created | 0.1.0 |
| Aug 2019 | SA1#87 | S1-192747 | TS22.263_MainBody | 0.1.0 |
| Aug 2019 | SA1#87 | S1-192748 | TS22.263_ServiceRequirements | 0.1.0 |
| Aug 2019 | SA1#87 | S1-192749 | TS22.263_DualConnectivity | 0.1.0 |
| Aug 2019 | SA1#87 | S1-192750 | TS22.263_PerformanceRequirements | 0.1.0 |
| Sep 2019 | SA#85 | SP-190883 | Presentation for information to SA#85 | 1.0.0 |
| Nov 2019 | SA1#88 | S1-193219 | Changes from SA1#88 | 1.1.0 |
| Dec 2019 | SA#86 | SP-191021 | Presentation for approval to SA#86 | 2.0.0 |

</details>

### TR 28.807 before change control

<details>
<summary>1 version before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Dec 2020 | SA#90e | SP-201077 | Presented for approval | 2.0.0 |

</details>

### TS 28.557 before change control

<details>
<summary>1 version before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Mar 2022 | SA#95e | SP-220125 | Presented for approval | 2.0.0 |

</details>

### TR 28.907 before change control

<details>
<summary>8 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| 04-2022 | SA5#142e | S5-222266 S5-222267 S5-222268 S5-222667 S5-222668 S5-222272 | Update to implement the agreed pCRs in SA5#142e: 1)	S5‑222266 pCR 28.907 Skeleton proposal from Rapporteur 2)	S5‑222267 pCR 28.907 Scope proposal from Rapporteur 3)	S5‑222268 pCR 28.907 Overview proposal 4)	S5‑222667 pCR 28.907 Key Issue on Resource isolation demand for Smart Grid Utilities 5)	S5-222668 pCR 28.907 Key Issue on E2E fault management 6)	S5-222272 pCR 28.907 Key Issue on Management of NPN service customer | 0.1.0 |
| 05-2022 | SA5#143e | S5-223609 S5-223610 S5-223608 | Update to implement the agreed pCRs in SA5#143e: 1)	S5-223609 pCR 28.907 Key Issue on SLA monitoring and evaluation 2)	S5-223610 pCR 28.907 Potential solution for KI#1 3)	S5‑223608 pCR 28.907 Potential solution for KI#2 | 0.2.0 |
| 06-2022 | SA5#144e | S5-224080 S5-224078 S5-224079 | Update to implement the agreed pCRs in SA5#144e: 1)	S5-224080 pCR 28.907 Rapporteur proposal 2)	S5-224078 pCR 28.907 Update performance data collection procedure 3)	S5‑224079 pCR 28.907 Potential solution for SLA monitoring and evaluation | 0.3.0 |
| 08-2022 | SA5#145e | S5-225860 S5-225159 S5-225859 S5-225161 S5-225818 | Update to implement the agreed pCRs in SA5#145e based on MCC EditHelp version: S5-225860 pCR 28.907 Rapporteur proposal S5-225159 pCR 28.907 Add introduction of TR S5‑225859 pCR 28.907 Update clause 4.1 S5-225161 pCR 28.907 Add key issue for network capability exposure S5-225818 pCR 28.907 Potential solution for satisfying resource isolation demand for Smart Grid Utilities | 0.4.0 |
| Sep 2022 | SA#97e | SP-220951 | Presented for information | 1.0.0 |
| 11-2022 | SA5#146 | S5-227000 S5-227001 S5-227002 S5-227003 S5-227004 S5-227005 | Update to implement the agreed pCRs in SA5#146: 1)	S5‑227000 pCR 28.907 Potential solution for exposure of management capabilities and corresponding managed resources 2)	S5‑227001 pCR 28.907 Resolve Editor's note in clause 5.1.2.1.2 3)	S5‑227002 pCR 28.907 Resolve Editor's note in clause 5.4.1 4)	S5‑227003 pCR 28.907 Conclusion for E2E fault management 5)	S5‑227004 pCR 28.907 Conclusion for resource isolation demand for smart grid utilities 6)	S5‑227005 pCR 28.907 Resolve Editor's note in clause 5.2.2.1.2 | 1.1.0 |
| 03-2023 | SA5#147 | S5-232875 S5-232411 S5-232046 S5-232881 | Update to implement the agreed pCRs in SA5#147 based on MCC EditHelp version: 1)	S5‑232875 pCR 28.907 Update conclusion for KI resource isolation demand for Smart Grid Utilities 2)	S5‑232411 pCR 28.907 Rapporteur proposal 3)	S5‑232046 pCR 28.907 Conclusion for KI management of NPN service customer 4)	S5‑232881 pCR 28.907 Conclusion for KI SLA monitoring and evaluation | 1.2.0 |
| Mar 2023 | SA#99 | SP-230186 | Presented for approval | 2.0.0 |

</details>

### TR 23.700-07 before change control

<details>
<summary>11 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Oct 2019 | SA2#135 | S2-1910543 | Proposed skeleton agreed at S2#135 | 0.0.0 |
| Oct 2019 | SA2#135 |  | S2-1910543 (skeleton), S2-1909360, S2-1910395, S2-1910712, S2-1910714, S2-1910829 (S2-1910768rev7). Some alignment of "SP" to "separate entity" by rapporteur/editor. | 0.1.0 |
| Dec 2019 | SA2#136 |  | S2-1912714, S2-1912715, S2-1912718, S2-1912778, | 0.2.0 |
| Jan 2020 | SA2#136AH |  | S2-2001353, S2-2000783, S2-2001524, S2-2001526, S2-2001527, S2-2001528, S2-2001529, S2-2001530rev5, S2-2001671, S2-2001534, S2-2001535 | 0.3.0 |
| Jun 2020 | SA2#139e |  | S2-2004341, S2-2004342, S2-2004343, S2-2004344, S2-2004024, S2-2004345, S2-2004346, S2-2004347, S2-2004348, S2-2004349, S2-2004350, S2-2004351, S2-2004352, S2-2004353, S2-2004354, S2-2004355, S2-2004437, S2-2004356, S2-2004357, S2-2004358, S2-2004359, S2-2004360, S2-2004361, S2-2004362, S2-2004363, S2-2004364, S2-2003612, S2-2004365, S2-2004366, S2-2004367, S2-2004368, S2-2004369, S2-2004370, S2-2004371, S2-2004372, S2-2004373, S2-2004374, S2-2004375, S2-2004376, S2-2004377, S2-2004378, S2-2004379, S2-2004380, S2-2004220, S2-2004381, S2-2004382, S2-2004383, S2-2004384 Alignment of "default credentials" to "default UE credentials" by editor. | 0.4.0 |
| Sep 2020 | SA2#140e |  | S2-2005925, S2-2005926, S2-2005927, S2-2005095, S2-2005930, S2-2005533, S2-2005931, S2-2006031, S2-2005932, S2-2005933, S2-2005500, S2-2005934, S2-2005935, S2-2005936, S2-2005937, S2-2005938, S2-2005939, S2-2005940, S2-2005532, S2-2005941, S2-2005617, S2-2005721, S2-2005942, S2-2006032, S2-2005429, S2-2004886, S2-2005944, S2-2005099, S2-2005463, S2-2005945, S2-2005585, S2-2005946, S2-2005947, S2-2005948, S2-2005950, S2-2005333, S2-2005729, S2-2005951, S2-2005952, S2-2005953, S2-2005954, S2-2005955, S2-2005453, S2-2005530, S2-2005956, S2-2005540, S2-2005957, S2-2005958, S2-2005959, S2-2005730, S2-2005960, S2-2005961, S2-2005962 | 0.5.0 |
| Sep 2020 | SP#89-E | SP-200695 | MCC Editorial update for presentation to TSG SA for information | 1.0.0 |
| Oct 2020 | SA2#141e |  | S2-2007829, S2-2007830, S2-2007831, S2-2007349, S2-2007832, S2-2007833, S2-2007834, S2-2007919, S2-2007374, S2-2007835, S2-2007836, S2-2007837, S2-2007436, S2-2007838, S2-2007948, S2-2007839, S2-2007840, S2-2007841, S2-2007842, S2-2007949, S2-2007843, S2-2007920, S2-2007950, S2-2007844, S2-2007845, S2-2007847, S2-2007848, S2-2006992, S2-2007311, S2-2007430, S2-2007437, S2-2007850, S2-2007851, S2-2007706, S2-2007853, S2-2007852, S2-2007958, S2-2007854 | 1.1.0 |
| Nov 2020 | SA2#142e |  | S2-2008664, S2-2008397, S2-2009134, S2-2009135, S2-2009136, S2-2009137, S2-2009196, S2-2009197, S2-2009138, S2-2009139, S2-2009140, S2-2009141, S2-2009142, S2-2009143, S2-2009144, S2-2009145, S2-2009146, S2-2008663, S2-2008666, S2-2008809, S2-2008461, S2-2008462, S2-2009147, S2-2009148, S2-2009199, S2-2009149, S2-2009028, S2-2008399, S2-2008400, S2-2008401, S2-2009150, S2-2008812, S2-2009151, S2-2009152, S2-2008467, S2-2009153, S2-2009154, S2-2009198, S2-2009155, S2-2009156, S2-2009200, S2-2009157, | 1.2.0 |
| Mar 2021 | SA2#143e |  | S2-2100575, S2-2102066, S2-2101064, S2-2101065, S2-2101066, S2-2100280, S2-2101067, S2-2101068, S2-2101069, S2-2101070, S2-2101071, S2-2102067, S2-2101073, S2-2101074, S2-2100816, S2-2101075 Editorial changes by rapporteur. | 1.3.0 |
| Mar 2021 | SP#91-E | SP-210097 | MCC Editorial update for presentation to TSG SA for approval | 2.0.0 |

</details>

### TR 33.857 before change control

<details>
<summary>11 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2020 | SA3#100-e | S3-201582 | TR Skeleton | 0.0.0 |
| Aug 2020 | SA3#100-e | S3-202068 | Version after incorporating changes from S3-202089, S3-202091, S3-202092, S3-202093 and S3-201925 | 0.1.0 |
| Oct 2020 | SA3#100bis-e | S3-202716 | Version after incorporating changes from S3-202732, S3-202715, S3-202515, S3-202681, S3-202721, S3-202682, S3-202724, S3-202750 and S3-202783 | 0.2.0 |
| Nov 2020 | SA3#101-e | S3-203400 | Version after incorporating changes from S3-202885, S3-203265, S3-203398, S3-203469, S3-203468, S3-203438, S3-203439, S3-203397 and S3-203401 | 0.3.0 |
| Feb 2021 | SA3#102-e | S3-210780 | Version after incorporating changes from S3-210658, S3-210341, S3-210561, S3-210431, S3-210432, S3-210613, S3-210614, S3-210704, S3-210318, S3-210638, S3-210639, S3-210602, S3-210657, S3-210621, S3-210622, S3-210583, S3-210584, S3-210409, S3-210612, S3-210801, S3-210644, S3-210645 | 0.4.0 |
| Mar 2021 | SA3#102bis-e | S3-211347 | Version after incorporating changes from S3-211301, S3-211233, S3-211259, S3-211244, S3-211187, S3-211302, S3-211283, S3-211005, S3-211206, S3-211077, S3-211260, S3-211314 | 0.5.0 |
| May 2021 | SA3#103-e | S3-212220 | Version after incorporating changes from S3-212197, S3-212166, S3-212198, S3-211727, S3-211729, S3-211730, S3-211731, S3-211733, S3-212207, S3-212248, S3-212241 | 0.6.0 |
| Sep 2021 | SA3#104-e | S3-213208 | Version after incorporating changes from S3-213066, S3-213082, S3-212558, S3-213070, S3-212689, S3-212733, S3-213147, S3-213042, S3-212969, S3-213065 | 0.7.0 |
| Oct 2021 | SA3#104e ad-hoc | S3-213612 | Version after incorporating changes from S3-213608, S3-213625, S3-213611 | 0.8.0 |
| Nov 2021 | SA3#105-e | S3-214362 | Version after incorporating changes from S3-214380, S3-214160, S3-214359, S3-214351, S3-213963, S3-214335, S3-214341, S3-214338, S3-214282, S3-214286 | 0.9.0 |
| Dec 2021 | SA#94e | SP-211396 | Presented for information and approval | 1.0.0 |

</details>

### TR 26.805 before change control

<details>
<summary>14 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Apr 2021 | SA4#113 | S4-210519 | Initial version | 0.0.1 |
| Apr 2021 | SA4#113 | S4-210678 | S4-210527: Structure of the technical report S4-210641: Description of existing media protocols in media production | 0.1.0 |
| May 2021 | Post SA4#113 | S4-210726 | S4aI211164: Description of camera media flows in a Multi-Camera production S4aI211165: Overview of NMOS functionality | 0.1.1 |
| May 2021 | SA4#114 | S4-210939 | S4-210919: FS_NPN4AVProd: Utilizing Available Capacity in Multi-Camera Scenarios S4-210913: Addition of different production types and addition of more information about existing workflows. | 0.2.0 |
| Aug 2021 | SA4#115 | S4-211267 | S4-211241: [FS_NPN5AVProd] Clarification of Cloud vs Remote Production S4-211242: [FS_NPN5AVProd] Proposal of Media Protocol related Key Issues S4-211243: [FS_NPN5AVProd] Proposal of a Remote Camera Configuration Key Issue S4-211244: [FS_NPN5AVProd] Proposal of two bit rate adaptation related Key Issues S4-211245: [FS_NPN5AVProd] Proposal of a Key Issue around configurable audio channels S4-211246: [FS_NPN5AVProd] Proposal of a new NPN usage related Key Issue | 0.3.0 |
| Nov 2021 | SA4#116 | S4-211600 | S4aI211249: [FS_NPN4AVProd] Update of SRT and RIST description S4-211601: [FS_NPN4AVProd] QoS Separation | 0.4.0 |
| Dec 2021 | SP#94-e | SP-211341 | Presentation to SA plenary for information | 1.0.0 |
| Dec 2021 | Post SA4#116 | S4aI211275 | S4aI211265: Structure update for TR 26.805 | 1.0.1 |
| Feb 2022 | Post SA4#116 | S4-220136 | Editorial Corrections S4aI221294: [FS_NPN4AVProd] SMPTE audio metadata | 1.0.2 |
| Feb 2022 | Post SA4#117e | S4-220279 | S4-220029: [FS_NPN4AVProd] mmWAVE for Media Production S4-220059: Tunnelling RTP media sessions over QUIC S4-220142: [FS_NPN4AVProd]: Definition of Collaboration Scenarios S4-220143: [FS_NPN4AVProd]: Introduction to Candidate Solutions and updates to KI#2 | 1.1.0 |
| Apr 2022 | SA4#118e | S4-220548 | S4-220467: Description of KI#4 (Standby and Program Cameras), incl solutions S4-220561: KI6 Interfacing Audio Channels S4-220562: Device On Boarding | 1.2.0 |
| May 2022 | SA4#119e | S4-220687 | Editorial Corrections | 1.2.1 |
| May 2022 | SA4#119e | S4-220813 | Editorial Corrections S4-220872: [FS_NPN4AVProd]: Proposal of a study conclusion clause S4-220873: [FS_NPN4AVProd]: Solutions for KI#6 | 1.3.0 |
| Jun 2022 | SA#96 | SP-220606 | Version sent for SA plenary | 2.0.0 |

</details>

### TR 23.700-08 before change control

<details>
<summary>11 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Feb 2022 | SA2#149e | S2-2200487 | Proposed skeleton agreed at SA2#149e | 0.0.0 |
| Feb 2022 | SA2#149e | - | S2-2200488 (skeleton), S2-2200488, S2-2200489, S2-2201749, S2-2201750, S2-2201860, S2-2201752, S2-2201753, S2-2201850 Editorial changes by rapporteur. | 0.1.0 |
| Apr 2022 | SA2#150e | - | S2-2203442, S2-2203443, S2-2203444, S2-2203445, S2-2203446, S2-2203447, S2-2203448, S2-2203449, S2-2203450, S2-2203451, S2-2203452, S2-2203453, S2-2202258, S2-2203454, S2-2203455, S2-2202457, S2-2203456, S2-2203457, S2-2203458, S2-2203459, S2-2202526, S2-2203460, S2-2203461, S2-2202931 | 0.2.0 |
| May 2022 | SA2#151e |  | S2-2205129, S2-2205130, S2-2205131, S2-2205132, S2-2205133, S2-2205134, S2-2205135, S2-2205136, S2-2203728, S2-2205137, S2-2203729, S2-2205138, S2-2205139, S2-2205140, S2-2205141, S2-2205142, S2-2205143, S2-2205144, S2-2205145, S2-2205146, S2-2205147, S2-2205148, S2-2205149, S2-2205150, S2-2205151, S2-2205152, S2-2205153, S2-2205154, S2-2205155, S2-2203733, S2-2203966, S2-2205156, S2-2205157, S2-2205158, S2-2204521, S2-2204532 | 0.3.0 |
| May 2022 | SP#96 | SP-220421 | MCC Update for presentation to TSG SA#96 for Information | 1.0.0 |
| Aug 2022 | SA2#152e | - | S2-2207706, S2-2207707, S2-2207708, S2-2206281, S2-2207709, S2-2206838, S2-2207710, S2-2207711, S2-2206601, S2-2205801, S2-2205802, S2-2206698, S2-2207712, S2-2205803, S2-2207713, S2-2207714, S2-2207715, S2-2207716, S2-2206835, S2-2207717, S2-2206163, S2-2207718, S2-2207719, S2-2206555, S2-2207720, S2-2207721, S2-2207722 Editorial changes by rapporteur. | 1.1.0 |
| Sep 2022 | SA2#152e | - | S2-2206693 | 1.2.0 |
| Oct 2022 | SA2#153e | - | S2-2208770, S2-2208438, S2-2209861, S2-2209862, S2-2209863, S2-2209864, S2-2209865, S2-2208737, S2-2209168, S2-2209866, S2-2209867, S2-2209936, S2-2209868, S2-2209976 | 1.3.0 |
| Nov 2022 | SA2#154 | - | S2-2210809, S2-2211096, S2-2211432, S2-2211433. | 1.4.0 |
| Jan 2023 | SA2#154AHE | - | S2-2301434, S2-2301435, S2-2301436 | 1.5.0 |
| Mar 2023 | SP#99 | SP-230082 | MCC Update for presentation to TSG SA#99 for approval | 2.0.0 |

</details>

### TR 33.858 before change control

<details>
<summary>10 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| May 2022 | SA3#107-e | S3-220957 | Skeleton | 0.0.0 |
| Jul 2022 | SA3#107e AdHoc | S3-221674 | Version after incorporating changes from S3-221492 and S3-221681 | 0.1.0 |
| Oct 2022 | SA3#108Adhoc-e | S3-223120 | Version after incorporating changes from S3-222931, S3-222965, S3-222990, S3-222931, S3-223118 | 0.2.0 |
| Nov 2022 | SA3#109 | S3-224036 | Version after incorporating changes from S3-224034, S3-224035, S3-223804, S3-224037, S3-223669, S3-223668, S3-224043, S3-224044, S3-224045, S3-224046 | 0.3.0 |
| Jan 2023 | SA3#109Adhoc-e | S3-230483 | Version after incorporating changes from S3-230429, S3-230431, S3-230432, S3-230521, S3-230318, S3-230382, S3-230383, S3-230384, S3-230453, S3-230490, S3-230523, S3-230444, S3-230445, S3-230460, S3-230461 | 0.4.0 |
| Mar 2023 | SA3#110 | S3-231503 | Version after incorporating changes from S3-231501, S3-231502, S3-231533, S3-231534, S3-231535, S3-231504, S3-230995, S3-230991 | 0.5.0 |
| Mar 2023 | SA#99 | SP-230134 | Presented for information | 1.0.0 |
| Apr 2023 | SA3#110Adhoc-e | S3-232133 | Version after incorporating changes from S3-232170, S3-232143, S3-232223, S3-231757, S3-232136, S3-232137, S3-232109 | 1.1.0 |
| Jun 2023 | SA3#111 | S3-233237 | Version after incorporating changes from S3-233402, S3-233403, S3-232828, S3-233235, S3-232908, S3-233404, S3-233236 | 1.2.0 |
| Jun 2023 | SA#100 | SP-230574 | Presented for approval | 2.0.0 |

</details>

### TR 33.757 before change control

<details>
<summary>9 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Feb 2024 |  | S3-240411 | Skeleton | 0.0.0 |
| Mar 2024 | SA3#115 | S3-240977 | S3-240976, S3-240978, S3-240979, S3-240980, S3-240981, S3-241006, S3-241007 implemented | 0.1.0 |
| Apr 2024 | SA3#115 e ad-hoc | S3-241595 | S3-241550, S3-241596, S3-241597, S3-241598, S3-241560, S3-241579, S3-241561, S3-241571, S3-241157, S3-241610, S3-241640, S3-241613, S3-241617, S3-241641, S3-241642 implemented | 0.2.0 |
| May 2024 | SA3#116 | S3-242510 | S3-242469, S3-242470, S3-242471, S3-242472, S3-242167, S3-242473, S3-242474, S3-242178, S3-242475, S3-242476, S3-242242, S3-242477, S3-242478, S3-242479, S3-242480, S3-242481, S3-242482, S3-242483, S3-242635, S3-241911, S3-242484, S3-242554, S3-242555, S3-242556, S3-242557, S3-242558, S3-242051, S3-242667 implemented | 0.3.0 |
| Aug 2024 | SA3#117 | S3-243468 | S3-242910, S3-243467 S3-243386, S3-243469, S3-243473, S3-243474, S3-243475, S3-243476, S3-243200, S3-243477, S3-242841, S3-243478, S3-243479, S3-243480, S3-243481, S3-243482, S3-243483, S3-243485, S3-242754 implemented | 0.4.0 |
| Oct 2024 | SA3#118 | S3-242823 | S3-244152, S3-244149, S3-244153, S3-244204, S3-244338, S3-244492, S3-244493 implemented | 0.5.0 |
| Nov 2024 | SA3#119 | S3-245187 | S3-244625, S3-245200, S3-245206, S3-245207, S3-245208 implemented | 0.6.0 |
| Feb 2025 | SA3#120 | S3-250969 | S3-251067 implemented | 0.7.0 |
| Feb 2025 | SA#107 | SP-250084 | Presented for information and approval | 1.0.0 |

</details>
