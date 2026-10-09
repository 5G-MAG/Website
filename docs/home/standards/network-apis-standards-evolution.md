---
hide_title: true
title: Network APIs for Connectivity Quality - Standards Evolution
slug: /standards/network-apis/evolution
description: Release-by-release 3GPP work item and Change Request history behind Network APIs for Connectivity Quality.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Network APIs for Connectivity Quality - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [Standards: Network APIs for Connectivity Quality](/standards/network-apis): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 20:** work items AmbientIoT_Ph2-APP, AIML_Ph2-APP, EnergySys_Ph2-APP, Sensing-APP, SEAL_Ph4-APP, SEAL_Ph4-CT, CAPIF_Ph4-APP, APCOT, NBI20-CT, SBIProtoc20-CT; 45 change requests.
- **Release 19:** work items AIML_App, 5GSAT_Ph3_App, Metaverse_App, CAPIF_Ph3, NBI19, UASAPP_Ph3, FS_eMMTelAPP, eLSAPP, FS_eLSAPP; 287 change requests.
- **Release 18:** work items 5GFLS, FFAPP, SEAL_Ph3, SEALDD, SNAAPP, NBI18, NSCALE, V2XAPP_Ph3, EDGEAPP_Ph2, ADAES, 5GMARCH_Ph2; 288 change requests.
- **Release 17:** work items UASAPP, eV2XAPP, EDGEAPP, NBI17, 5GMARCH, eCryptPr, eSEAL, SBIProtoc17; 166 change requests.
- **Release 16:** work items 5G_CIoT, eNAPIs, eCAPIF; 161 change requests.
- **Release 15:** work items CAPIF, CAPIF-CT; 137 change requests.

:::

Sources: the 3GPP work plan of 28 September 2026, the 3GPP Change Request database of 25 September 2026, and the change history of TS 23.222 V20.1.0, TS 29.222 V20.1.0, TS 23.434 V20.1.0, TS 24.549 V19.2.0.

This page covers [TS 23.222](https://www.3gpp.org/dynareport/23222.htm), [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 23.434](https://www.3gpp.org/dynareport/23434.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm). The work items are those that name these specifications in the 3GPP work plan. The change requests are those recorded in the 3GPP Change Request database as implemented in a version. The CAMARA APIs are not 3GPP documents. Their release history is in the CAMARA releases section above.

## CAMARA releases

Release history of the CAMARA repositories behind the APIs, from the GitHub releases of each repository. The APIs listed for a release are the ones its release notes say it contains. A pre-release is a release candidate or a release that GitHub marks as a pre-release.

### Quality on Demand, QoS Profiles and QoS Provisioning

Repository: [camaraproject/QualityOnDemand](https://github.com/camaraproject/QualityOnDemand/releases).

| Release | Date | Status | APIs in the release |
| --- | --- | --- | --- |
| [r4.1](https://github.com/camaraproject/QualityOnDemand/releases/tag/r4.1) | 2026-08-20 | Pre-release | qos-profiles 1.2.0-rc.3; qos-provisioning 0.4.0-rc.1; quality-on-demand 1.2.0-rc.3 |
| [r3.2](https://github.com/camaraproject/QualityOnDemand/releases/tag/r3.2) | 2025-09-16 | Public release | quality-on-demand v1.1.0; qos-profiles v1.1.0; qos-provisioning v0.3.0 |
| [r3.1](https://github.com/camaraproject/QualityOnDemand/releases/tag/r3.1) | 2025-07-17 | Pre-release | quality-on-demand v1.1.0-rc.2; qos-profiles v1.1.0-rc.2; qos-provisioning v0.3.0-rc.1 |
| [r2.2](https://github.com/camaraproject/QualityOnDemand/releases/tag/r2.2) | 2025-03-11 | Public release | quality-on-demand v1.0.0; qos-profiles v1.0.0; qod-provisioning v0.2.0 |
| [r2.1](https://github.com/camaraproject/QualityOnDemand/releases/tag/r2.1) | 2025-02-10 | Pre-release | quality-on-demand v1.0.0-rc.1; qos-profiles v1.0.0-rc.1; qod-provisioning v0.2.0-rc.1 |
| [r1.3](https://github.com/camaraproject/QualityOnDemand/releases/tag/r1.3) | 2024-12-18 | Public release | quality-on-demand v0.11.1; qos-profiles v0.11.1; qod-provisioning v0.1.1 |
| [r1.2](https://github.com/camaraproject/QualityOnDemand/releases/tag/r1.2) | 2024-09-06 | Public release | quality-on-demand v0.11.0; qos-profiles v0.11.0; qod-provisioning v0.1.0 |
| [r1.1](https://github.com/camaraproject/QualityOnDemand/releases/tag/r1.1) | 2024-08-09 | Pre-release | quality-on-demand v0.11.0-rc.1; qos-profiles v0.11.0-rc.1; qod-provisioning v0.1.0-rc.1 |
| [v0.10.1](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.10.1) | 2024-04-10 | Public release | not stated in the release notes |
| [v0.10.0](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.10.0) | 2024-02-09 | Public release | not stated in the release notes |
| [v0.10.0-rc2](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.10.0-rc2) | 2024-02-02 | Pre-release | not stated in the release notes |
| [v0.10.0-rc](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.10.0-rc) | 2023-12-01 | Pre-release | not stated in the release notes |
| [v0.9.0](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.9.0) | 2023-07-21 | Public release | not stated in the release notes |
| [v0.9.0-rc](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.9.0-rc) | 2023-06-23 | Pre-release | not stated in the release notes |
| [v0.8.1](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.8.1) | 2023-01-27 | Public release | not stated in the release notes |
| [v0.8.0](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.8.0) | 2023-01-18 | Public release | not stated in the release notes |
| [v0.1.0](https://github.com/camaraproject/QualityOnDemand/releases/tag/v0.1.0) | 2023-01-18 | Public release | not stated in the release notes |

### QoS Booking and QoS Booking and Assignment

Repository: [camaraproject/QoSBooking](https://github.com/camaraproject/QoSBooking/releases).

| Release | Date | Status | APIs in the release |
| --- | --- | --- | --- |
| [r2.1](https://github.com/camaraproject/QoSBooking/releases/tag/r2.1) | 2026-08-28 | Pre-release | qos-booking-and-assignment 0.2.0-rc.1; qos-booking 0.2.0-rc.1 |
| [r1.2](https://github.com/camaraproject/QoSBooking/releases/tag/r1.2) | 2025-09-12 | Public release | qos-booking v0.1.0; qos-booking-and-assignment v0.1.0 |
| [r1.1](https://github.com/camaraproject/QoSBooking/releases/tag/r1.1) | 2025-07-17 | Pre-release | qos-booking v0.1.0-rc.1; qos-booking-and-assignment v0.1.0-rc.1 |

### Dedicated Networks

Repository: [camaraproject/DedicatedNetworks](https://github.com/camaraproject/DedicatedNetworks/releases).

| Release | Date | Status | APIs in the release |
| --- | --- | --- | --- |
| [r2.2](https://github.com/camaraproject/DedicatedNetworks/releases/tag/r2.2) | 2026-09-16 | Pre-release | dedicated-network-accesses 0.2.0-rc.1; dedicated-network-profiles 0.2.0-rc.1; dedicated-network 0.2.0-rc.1; dedicated-network-areas 0.1.0-rc.1 |
| [r2.1](https://github.com/camaraproject/DedicatedNetworks/releases/tag/r2.1) | 2026-05-26 | Pre-release | dedicated-network-accesses 0.2.0-alpha.1; dedicated-network-profiles 0.2.0-alpha.1; dedicated-network 0.2.0-alpha.1; dedicated-network-areas 0.1.0-alpha.1 |
| [r1.2](https://github.com/camaraproject/DedicatedNetworks/releases/tag/r1.2) | 2025-09-18 | Public release | dedicated-network v0.1.0; dedicated-network-accesses v0.1.0; dedicated-network-profiles v0.1.0 |
| [r1.1](https://github.com/camaraproject/DedicatedNetworks/releases/tag/r1.1) | 2025-07-21 | Pre-release | dedicated-network v0.1.0-rc.1; dedicated-network-accesses v0.1.0-rc.1; dedicated-network-profiles v0.1.0-rc.1 |

## 3GPP work items and change requests

### Release 20

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [AmbientIoT_Ph2-APP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110048) | Application enablement for Ambient IoT services Phase 2 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436) | Complete, Sep 2026 | [SP-260315](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260315.zip) |
| [AIML_Ph2-APP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1100022) | Stage 2 for AI/ML service Phase 2 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.482, TS 23.436) | Complete, Jun 2026 | [SP-260175](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260175.zip) |
| [EnergySys_Ph2-APP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110052) | Stage 2 for Application Enablement to support Energy Saving Phase 2 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.435, TS 23.436, TS 23.482, TS 23.558) | Complete, Sep 2026 | [SP-260318](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260318.zip) |
| [Sensing-APP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110051) | Use of Sensing results for Vertical Applications | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.255, TS 23.437, TS 23.286, TS 23.436) | 65% complete, planned Sep 2026 | [SP-260317](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260317.zip) |
| [SEAL_Ph4-APP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1090038) | SA6 aspects of Service Enabler Architecture Layer (SEAL) Phase 4 | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm), [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.433, TS 23.435, TS 23.436, TS 23.437, TS 23.438, TR 23.949) | Complete, Jun 2026 | [SP-251215](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_109_Beijing_2025-09/Docs/SP-251215.zip) |
| [SEAL_Ph4-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110016) | CT Aspects for Service Enabler Architecture Layer (SEAL) Phase 4 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.559, TS 24.560, TS 29.435, TS 29.437, TS 29.482, TS 29.548, TS 29.549) | 63% complete, planned Mar 2027 | [CP-262194](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_113_Madrid-2026-09/Docs/CP-262194.zip) |
| [SEAL_Ph4-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110072) | CT1 Aspects for Service Enabler Architecture Layer (SEAL) Phase 4 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.559, TS 24.560, TS 29.435, TS 29.437, TS 29.482, TS 29.548, TS 29.549) | 40% complete, planned Mar 2027 | [CP-262194](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_113_Madrid-2026-09/Docs/CP-262194.zip) |
| [SEAL_Ph4-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110073) | CT3 Aspects for Service Enabler Architecture Layer (SEAL) Phase 4 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.559, TS 24.560, TS 29.435, TS 29.437, TS 29.482, TS 29.548, TS 29.549) | 85% complete, planned Mar 2027 | [CP-262194](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_113_Madrid-2026-09/Docs/CP-262194.zip) |
| [CAPIF_Ph4-APP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110053) | Common API Framework phase 4 | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) (with TS 23.436, TR 23.947, TR 23.946) | Complete, Sep 2026 | [SP-260343](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260343.zip) |
| [APCOT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110049) | Stopped - Application user consent | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) (with TS 23.558) | Complete, Sep 2026 | [SP-260178](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_111_Fukuoka_2026-03/Docs/SP-260178.zip) |
| [NBI20-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110015) | Rel-20 Enhancements of the 3GPP Northbound Interfaces and Application Layer APIs | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.558, TS 24.559, TS 24.560, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.392, TS 29.435, TS 29.437, TS 29.482, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | 38% complete, planned Mar 2027 | [CP-260169](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260169.zip) |
| [NBI20-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110060) | CT1 aspects of NBI20 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.558, TS 24.559, TS 24.560, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.392, TS 29.435, TS 29.437, TS 29.482, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | 20% complete, planned Mar 2027 | [CP-260169](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260169.zip) |
| [NBI20-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110061) | CT3 aspects of NBI20 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.558, TS 24.559, TS 24.560, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.392, TS 29.435, TS 29.437, TS 29.482, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | 55% complete, planned Mar 2027 | [CP-260169](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260169.zip) |
| [SBIProtoc20-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110002) | Service Based Interface Protocol Improvements for Release 20 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.558, TS 24.559, TS 24.560, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.392, TS 29.435, TS 29.437, TS 29.482, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | 45% complete, planned Mar 2027 | [CP-260164](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260164.zip) |
| [SBIProtoc20-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110062) | CT3 aspects of SBIProtoc20 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.558, TS 24.559, TS 24.560, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.392, TS 29.435, TS 29.437, TS 29.482, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | 50% complete, planned Mar 2027 | [CP-260164](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260164.zip) |
| [SBIProtoc20-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1110063) | CT4 aspects of SBIProtoc20 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.542, TS 24.543, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.550, TS 24.558, TS 24.559, TS 24.560, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.392, TS 29.435, TS 29.437, TS 29.482, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | 40% complete, planned Mar 2027 | [CP-260164](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_111_Fukuoka-2026-03/Docs/CP-260164.zip) |

<details>
<summary>45 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.222 | 20.0.0 | 0340 | Service API dissemination control for Open Discovery | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0341 | Control of Service API requirements about RO authorization | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.0.0 | 0342 | API invoker deployed in an application server accessing UEs’ resources of a group of UEs | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.0.0 | 0343 | Deployment implementation of API publish function | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.0.0 | 0345 | Solution#3 - AMF providing list of service APIs to remove from enrollment | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0346 | API invoker error reporting | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0347 | Requirements, Procedure and APIs for API analytics | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0348 | Permission to usage of service API information | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0350 | Security considerations for Group Authorization | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0351 | Clarification of purpose information | CAPIF_Ph4-APP |
| TS 23.222 | 20.0.0 | 0355 | CCF control of API invoker reporting | CAPIF_Ph4-APP |
| TS 23.434 | 20.0.0 | 0401 | CR for 23.434 for UE ID usage correction | TEI20 |
| TS 23.434 | 20.0.0 | 0402 | API consumer clarification | SEAL_Ph4-APP |
| TS 23.434 | 20.0.0 | 0403 | Include power saving configuration within the NRM services for IoT devices | SEAL_Ph4-APP |
| TS 23.434 | 20.0.0 | 0408 | The deployment options of SEAL client | SEAL_Ph4-APP |
| TS 23.434 | 20.0.0 | 0409 | The business relationship involving SEAL client provider | SEAL_Ph4-APP |
| TS 29.222 | 20.0.0 | 0472 | Correction on CAPIF events adding notification based on number of event detection | TEI20, CAPIF_Ph3 |
| TS 29.222 | 20.0.0 | 0473 | Update to Open Discovery API for Service API Dissemination | CAPIF_Ph4 |
| TS 29.222 | 20.0.0 | 0474 | Support for permission to use service API information | CAPIF_Ph4 |
| TS 29.222 | 20.0.0 | 0480 | New Disenroll_Service_APIs service operation in CAPIF_API_Provider_Management_API | CAPIF_Ph4-APP |
| TS 29.222 | 20.0.0 | 0481 | OpenAPI update for defining new Disenroll_Service_APIs service operation in CAPIF_API_Provider_Management_API | CAPIF_Ph4-APP |
| TS 29.222 | 20.0.0 | 0482 | New cause in authorization revoked notification due to removed enrolled service APIs by CCF | CAPIF_Ph4-APP |
| TS 29.222 | 20.0.0 | 0484 | Update of info and externalDocs fields | TEI20 |
| TS 29.222 | 20.0.1 |  | Reverts C3-262596 changes to align with OpenAPI YAML file |  |
| TS 23.222 | 20.1.0 | 0349 | ADAES enhancements for Providing API analytics for API administration (part#2) | CAPIF_Ph4-APP |
| TS 23.222 | 20.1.0 | 0356 | New Integrated deployment of the SCEF and the NEF with the CAPIF | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.1.0 | 0358 | Clarifications on CAPIF event | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.1.0 | 0359 | Definition of roles of AEF in CAPIF | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.1.0 | 0361 | API invoker error reporting | CAPIF_Ph4-APP |
| TS 23.222 | 20.1.0 | 0363 | Handling of roaming policies | CAPIF_Ph4-APP |
| TS 23.222 | 20.1.0 | 0364 | Configuration of roaming policies | CAPIF_Ph4-APP |
| TS 23.222 | 20.1.0 | 0365 | Publishing of RO authorization applicability | TEI20, CAPIF_Ph3 |
| TS 23.222 | 20.1.0 | 0366 | API invoker information for a Group of UEs | TEI20, CAPIF_Ph3 |
| TS 23.434 | 20.1.0 | 0414 | Creation of new API to support power saving configuration within the NRM services for IoT devices | SEAL_Ph4-APP |
| TS 23.434 | 20.1.0 | 0415 | Location reporting considering the energy information analytics | EnergySys_Ph2-APP |
| TS 23.434 | 20.1.0 | 0416 | Update on the figure in clause 15 | TEI20 |
| TS 23.434 | 20.1.0 | 0418 | Add new NRM service | SEAL_Ph4-APP |
| TS 23.434 | 20.1.0 | 0419 | Standard alignment on the usage of CN APIs | SEAL_Ph4-APP |
| TS 23.434 | 20.1.0 | 0420 | Enhancements to Location Reporting for Support Energy Saving | EnergySys_Ph2-APP |
| TS 23.434 | 20.1.0 | 0421 | Fix for notification management when UE is behind the NAT | TEI20 |
| TS 23.434 | 20.1.0 | 0422 | Support of SEAL services over Satellite Access | 5GSAT_Ph4-APP |
| TS 23.434 | 20.1.0 | 0423 | Deployment of SEAL location enabler on-board satellite | 5GSAT_Ph4-APP |
| TS 29.222 | 20.1.0 | 0485 | OpenAPI update for defining new Disenroll_Service_APIs service operation in CAPIF_API_Provider_Management_API | CAPIF_Ph4_APP-CT |
| TS 29.222 | 20.1.0 | 0486 | Corrections to Disenroll_Service_APIs | CAPIF_Ph4_APP-CT |
| TS 29.222 | 20.1.0 | 0488 | CAPIF Open Discover API – Service Description | CAPIF_Ph3 |
| TS 29.222 | 20.1.0 | 0489 | Update of info and externalDocs fields | TEI20 |

</details>

### Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [AIML_App](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050044) | Application enablement for AI/ML services | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436, TS 23.558) | Complete, Sep 2025 | [SP-241008](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_104_Shanghai_2024-06/Docs/SP-241008.zip) |
| [AIML_App](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040075) | Stage 2 of Application enablement for AI/ML services | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436, TS 23.558, TS 23.482) | Complete, Dec 2024 | [SP-241008](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_104_Shanghai_2024-06/Docs/SP-241008.zip) |
| [5GSAT_Ph3_App](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040077) | Application enablement for satellite access Phase 3 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.558, TS 23.289) | Complete, Oct 2024 | [SP-241690](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_106_Madrid_2024-12/Docs/SP-241690.zip) |
| [Metaverse_App](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040076) | Application enablement for mobile metaverse services | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.542, TS 23.558, TS 23.436, TS 23.437, TS 23.438) | Complete, Oct 2024 | [SP-241390](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_105_Melbourne_2024-09/Docs/SP-241390.zip) |
| [CAPIF_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060040) | Common API Framework (CAPIF) Phase 3 | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) | 91% complete, planned Jan 2026 | [SP-241381](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_105_Melbourne_2024-09/Docs/SP-241381.zip) |
| [CAPIF_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050035) | Stage 2 of Common API Framework (CAPIF) Phase 3 | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) | Complete, Dec 2024 | [SP-241694](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_106_Madrid_2024-12/Docs/SP-241694.zip) |
| [CAPIF_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060026) | CT aspects of Common API Framework (CAPIF) Phase 3 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) | Complete, Sep 2025 | [CP-252059](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_109_Beijing-2025-09/Docs/CP-252059.zip) |
| [CAPIF_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060041) | CT3 aspects of Common API Framework (CAPIF) Phase 3 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) | Complete, Sep 2025 | [CP-252059](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_109_Beijing-2025-09/Docs/CP-252059.zip) |
| [NBI19](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040009) | Rel-19 Enhancements of 3GPP Northbound and Application Layer Interfaces and APIs | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm), [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.558, TS 24.559, TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.435, TS 29.486, TS 29.522, TS 29.538, TS 29.548, TS 29.549, TS 29.558, TS 29.583) | Complete, Sep 2025 | [CP-243079](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/CT_106_Madrid/Docs/CP-243079.zip) |
| [UASAPP_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1010008) | Application Architecture for UAS applications Phase 3 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.255) | Complete, Dec 2024 | [SP-240741](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_104_Shanghai_2024-06/Docs/SP-240741.zip) |
| [FS_eMMTelAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000034) | Study on Service aspects for supporting the eMMTel service | Study | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) (with TR 23.700-92) | Complete, Dec 2024 | [SP-230779](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_100_Taipei_2023-06/Docs/SP-230779.zip) |
| [eLSAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1050053) | Enhanced application layer support for location services | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436) | Complete, Sep 2025 | [SP-241005](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_104_Shanghai_2024-06/Docs/SP-241005.zip) |
| [FS_eLSAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000035) | Study on enhanced application layer support for location services | Study | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TR 23.700-72) | Complete, Sep 2024 | [SP-230778](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_100_Taipei_2023-06/Docs/SP-230778.zip) |
| [eLSAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1040072) | Stage 2 of Enhanced application layer support for location services | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436) | Complete, Dec 2024 | [SP-241005](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_104_Shanghai_2024-06/Docs/SP-241005.zip) |

<details>
<summary>287 change requests and 3 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.222 | 19.0.0 | 0131 | Slice-based service API exposure | TEI19, NSCALE, eCAPIF |
| TS 23.222 | 19.0.0 | 0144 | Service API unpublish for CAPIF interconnection | TEI19, eCAPIF |
| TS 23.222 | 19.0.0 | 0145 | Service API retrieval for CAPIF interconnection | TEI19, eCAPIF |
| TS 23.222 | 19.0.0 | 0146 | Service API update for CAPIF interconnection | TEI19, eCAPIF |
| TS 23.434 | 19.0.0 | 0245 | NRM device triggering | SEAL_Ph3, TEI19 |
| TS 23.434 | 19.0.0 | 0269 | RRC inactive support | TEI19, SEAL_Ph3 |
| TS 24.549 | 19.0.0 | 0047 | Corrections on the ETC_Configuration API | NBI19 |
| TS 24.549 | 19.0.0 | 0049 | Update of info and externalDocs fields | TEI19 |
| TS 29.222 | 19.0.0 | 0354 | Network Slice Information in the CAPIF APIs | TEI19, NSCALE, CAPIF |
| TS 29.222 | 19.0.0 | 0355 | Updates and corrections to the CAPIF_API_Invoker_Management_API | NBI19 |
| TS 29.222 | 19.0.0 | 0356 | Update of info and externalDocs fields | TEI19 |
| TS 23.222 | 19.1.0 | 0151 | Align cross-references to the appropriate subclauses of TS 33.122 | TEI19 |
| TS 23.222 | 19.1.0 | 0152 | Responsibilities of CAPIF API provider domain functions | TEI19, CAPIF |
| TS 23.222 | 19.1.0 | 0154 | Consistent use of term "resource owner" | SNAAPP |
| TS 23.222 | 19.1.0 | 0157 | Editoral correction for topology hiding | TEI19 |
| TS 23.222 | 19.1.0 | 0158 | Correction cardinality IE service API unpublish for CAPIF interconnection | TEI19, eCAPIF |
| TS 23.434 | 19.1.0 | 0285 | UE identifiers correction in the SS_LocationAreaInfoRetrieval API | eSEAL |
| TS 23.434 | 19.1.0 | 0286 | Termination indication in the SS_NetworkResourceMonitoring API | TEI19, eSEAL |
| TS 23.434 | 19.1.0 | 0291 | Correct IE presence condition | eSEAL |
| TS 23.434 | 19.1.0 | 0292 | NRM Network resource adaptation enhancement for BDT | SEALDD_Ph2 |
| TS 24.549 | 19.1.0 | 0050 | Corrections on the slice information delivery | NBI19 |
| TS 24.549 | 19.1.0 | 0051 | Update of info and externalDocs fields | TEI19 |
| TS 29.222 | 19.1.0 | 0357 | Correction of the descriptions in Log data type | NBI19 |
| TS 29.222 | 19.1.0 | 0359 | Editor’s note resolution for the network slice identifier | TEI19, NSCALE |
| TS 29.222 | 19.1.0 | 0362 | RNAA OAuth grant types provisioning in the CAPIF_Publish_Service_API | SNAAPP |
| TS 29.222 | 19.1.0 | 0363 | Correction of the SecurityInformation data type in the CAPIF_Security_API | SNAAPP |
| TS 29.222 | 19.1.0 | 0364 | Redirection for the CAPIF_Events_API | NBI19 |
| TS 29.222 | 19.1.0 | 0366 | Incorrect Data type in CAPIF_Logging_API | NBI19 |
| TS 29.222 | 19.1.0 | 0367 | Corrections to the definition of notifications within the CAPIF_API_Invoker_Management_API | NBI19 |
| TS 29.222 | 19.1.0 | 0371 | Corrections to feature negotiation support for the CAPIF_Discover_Service_API | eCAPIF |
| TS 29.222 | 19.1.0 | 0373 | Service API category update | NBI18 |
| TS 29.222 | 19.1.0 | 0377 | Correction for Provider management API | eCAPIF |
| TS 29.222 | 19.1.0 | 0379 | Support service API discovery based on the supported OAuth grant types for RNAA | SNAAPP |
| TS 29.222 | 19.1.0 | 0380 | CAPIF – Correcting structured data types in query parameters | NBI19 |
| TS 29.222 | 19.1.0 | 0381 | CAPIF – IANA registration for JWT claims | NBI19 |
| TS 29.222 | 19.1.0 | 0384 | Update of info and externalDocs fields | TEI19 |
| TS 24.549 | 19.1.1 |  | Corrected yaml files coding: to be encoded as UTF-8 without BOM |  |
| TS 23.222 | 19.2.0 | 0162 | Corrections to Deregister_API_Provider operation | TEI18, CAPIF |
| TS 23.222 | 19.2.0 | 0167 | Correction for Discover service APIs | TEI18, CAPIF |
| TS 23.222 | 19.2.0 | 0169 | Add missing function to resource owner function | TEI19 |
| TS 23.222 | 19.2.0 | 0174 | Alignment of "API type" with "API category" terminology | EDGEAPP_Ph2 |
| TS 23.222 | 19.2.0 | 0180 | Correction for Service API discovery involving multiple CCFs | CAPIF, TEI18 |
| TS 23.222 | 19.2.0 | 0181 | Reducing authorization information inquiry in a nested API invocation | SNAAPP |
| TS 23.222 | 19.2.0 | 0185 | Correction to clause 6.2.3 | SNAAPP |
| TS 23.434 | 19.2.0 | 0287 | Monitoring profiles in the SS_NetworkResourceMonitoring API | TEI19, eSEAL |
| TS 23.434 | 19.2.0 | 0296 | Solve EN in location info request | eSEAL |
| TS 23.434 | 19.2.0 | 0298 | Correct location triggering criteria in update request | SEAL_Ph3 |
| TS 23.434 | 19.2.0 | 0300 | Solve EN in NM related to CAPIF | SEAL_Ph3 |
| TS 23.434 | 19.2.0 | 0302 | Solve EN in SEAL clause 14.3.12 | SEAL_Ph3 |
| TS 24.549 | 19.2.0 | 0052 | Update of info and externalDocs fields | TEI19_NetShare |
| TS 29.222 | 19.2.0 | 0386 | Finer granularity for the service APIs | CAPIF_Ph3 |
| TS 29.222 | 19.2.0 | 0387 | Correction of update API invoker API list status | TEI19, SNAAPP |
| TS 29.222 | 19.2.0 | 0388 | Enhancement the API invoker onboarding with onboard criteria | CAPIF_Ph3 |
| TS 29.222 | 19.2.0 | 0389 | Enhancement the CAPIF event with onboard criteria | CAPIF_Ph3 |
| TS 29.222 | 19.2.0 | 0390 | Updates and corrections to the CAPIF_Events_API | NBI19 |
| TS 29.222 | 19.2.0 | 0391 | Updates to the API discovery procedures to support different types of API invocations | TEI19, eCAPIF |
| TS 29.222 | 19.2.0 | 0392 | Corrections on the API status | NBI19 |
| TS 29.222 | 19.2.0 | 0393 | Update of info and externalDocs fields | TEI19 |
| TS 23.222 | 19.3.0 | 0188 | Correction to clause 8.3.2.1 | CAPIF, TEI18 |
| TS 23.222 | 19.3.0 | 0190 | Correction to Interconnection API publish | CAPIF, TEI18 |
| TS 23.222 | 19.3.0 | 0192 | Correction to Interconnection service API discover | CAPIF, TEI18 |
| TS 23.222 | 19.3.0 | 0194 | Rel-19 Add to Definitions and Abbreviations | SNAAPP |
| TS 23.222 | 19.3.0 | 0196 | Rel-19 Correction on Resouce owner | SNAAPP |
| TS 23.222 | 19.3.0 | 0197 | Update the CAPIF business relationships | TEI19 |
| TS 23.434 | 19.3.0 | 0261 | Clarification on the callback URL usage | TEI19 |
| TS 23.434 | 19.3.0 | 0304 | Support for adaptive location configuration and reporting | eLSAPP |
| TS 23.434 | 19.3.0 | 0305 | Alignment, correction and clarification of the location-based group creation procedure | TEI19, SEAL_Ph3 |
| TS 23.434 | 19.3.0 | 0306 | Add Geofencing subscription/unsubscribe procedure | eLSAPP |
| TS 23.434 | 19.3.0 | 0307 | Add procedure of Geofencing UE(s) Information request/response | eLSAPP |
| TS 23.434 | 19.3.0 | 0309 | Add procedure of querying for history location | eLSAPP |
| TS 23.434 | 19.3.0 | 0310 | LMS reuse the stored UE location information | eLSAPP |
| TS 23.434 | 19.3.0 | 0311 | Exposure of value-added UE location information | eLSAPP |
| TS 23.434 | 19.3.0 | 0312 | General description of application enablement of AIML services | AIML_App |
| TS 23.434 | 19.3.0 | 0313 | Dynamic geofencing | eLSAPP |
| TS 23.434 | 19.3.0 | 0314 | Target UE location provided by surrounding UEs | eLSAPP |
| TS 23.434 | 19.3.0 | 0315 | Editorial change for location information subscription update | TEI19, SEAL_Ph3 |
| TS 23.434 | 19.3.0 | 0316 | Update clause 14.3.9.2.1 | TEI19, SEAL_Ph3 |
| TS 29.222 | 19.3.0 | 0396 | Correction to the incorrect description of the boolean type for the mandatory attribute | NBI19 |
| TS 29.222 | 19.3.0 | 0397 | Define the content of the apis attribute in the onboarding criteria information | CAPIF_Ph3 |
| TS 29.222 | 19.3.0 | 0398 | Correct cardinality in CAPIF_API_Invoker_Management_API | CAPIF_Ph3 |
| TS 29.222 | 19.3.0 | 0399 | Correcting the representation of the apiName placeholder | NBI19 |
| TS 29.222 | 19.3.0 | 0404 | Correction to the expiration time in JWT access token claim | NBI19 |
| TS 29.222 | 19.3.0 | 0405 | Implement failure reason in CAPIF_API_Invoker_Management_API | CAPIF_Ph3 |
| TS 29.222 | 19.3.0 | 0407 | Correction to event name | CAPIF_Ph3 |
| TS 29.222 | 19.3.0 | 0408 | Correction to the ProblemDetails data type | NBI19 |
| TS 29.222 | 19.3.0 | 0409 | Corrections of presence conditions and common data types of CAPIF_Publish_Service_API | NBI19 |
| TS 29.222 | 19.3.0 | 0410 | CAPIF Open Discovery – API definition | CAPIF_Ph3 |
| TS 29.222 | 19.3.0 | 0411 | Support API Invoker onboarding related error handling | CAPIF_Ph3 |
| TS 29.222 | 19.3.0 | 0412 | Update of info and externalDocs fields | TEI19 |
| TS 23.222 | 19.4.0 | 0198 | Rel-19 Correction on Getting Service APIs for CAPIF Interconnection | TEI19, CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0200 | Correction for service API information | SNAAPP |
| TS 23.222 | 19.4.0 | 0201 | CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0202 | Update to API invoker Roles in CAPIF | TEI19, CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0203 | Update business relationship for Rel-19 | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0205 | Requesting of bulk resource owner authorization | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0206 | Finer granularity of access control for service API | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0207 | API discovery update and clarification | eCAPIF, TEI19 |
| TS 23.222 | 19.4.0 | 0208 | Align CAPIF API publish and discover with SA3 SNAAPP enhancement | TEI19, SNAAPP |
| TS 23.222 | 19.4.0 | 0209 | Correction of the service API category | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0211 | Resolving ENs without action | SNAAPP |
| TS 23.222 | 19.4.0 | 0213 | Resolving ENs adding SA3 references | SNAAPP |
| TS 23.222 | 19.4.0 | 0214 | API invoker onboarding | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0216 | Adding invocation latency | SNAAPP |
| TS 23.222 | 19.4.0 | 0218 | API invoker obtaining authorization from resource owner | SNAAPP |
| TS 23.222 | 19.4.0 | 0220 | Terminology alignment: authorization vs consent | SNAAPP |
| TS 23.222 | 19.4.0 | 0221 | API invoker split into frontend and backend components | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0225 | R19_Correction of Update API invoker’s API list | SNAAPP |
| TS 23.222 | 19.4.0 | 0226 | Enhancement to API invoker Authorization with the Purpose of Data Processing | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0227 | Enhancing the Description of Authorization Function Capabilities | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0228 | Exposure of User Sensitive Information | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0230 | UE-deployed API invoker accessing other UEs’ resources of a group | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0231 | Additional CAPIF Interconnection-related requirements | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0232 | Additional RNAA-related requirements | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0233 | Resource owner consent upon service API invocation | CAPIF_Ph3 |
| TS 23.222 | 19.4.0 | 0235 | Clarify user consent storage | SNAAPP |
| TS 23.434 | 19.4.0 | 0318 | Remove reference for 23.545 in SEAL | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0320 | Solve EN in SEAL clause 9.5.1 | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0322 | TS 23.434 Rel-19 - Handling Editors Notes | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0323 | Editorial changes for Geofencing subscription/unsubscribe procedure | eLSAPP |
| TS 23.434 | 19.4.0 | 0324 | Add new architectural requirements for SEAL LMS | eLSAPP |
| TS 23.434 | 19.4.0 | 0325 | APIs for location history request procedure | eLSAPP |
| TS 23.434 | 19.4.0 | 0326 | Add valued location services functions for SEAL LMS | eLSAPP |
| TS 23.434 | 19.4.0 | 0327 | Remove the overlap information | eLSAPP |
| TS 23.434 | 19.4.0 | 0328 | LMS reuse the stored UE location information considering the location validity | eLSAPP |
| TS 23.434 | 19.4.0 | 0329 | Location services for multiple UEs that sharing the same location | eLSAPP |
| TS 23.434 | 19.4.0 | 0330 | Satellite access with discontinuous coverage | 5GSAT_Ph3_App |
| TS 23.434 | 19.4.0 | 0331 | Add SEAL functional requirements for satellite connectivity | 5GSAT_Ph3_App |
| TS 23.434 | 19.4.0 | 0332 | Support the satellite S&F operation | 5GSAT_Ph3_App |
| TS 23.434 | 19.4.0 | 0333 | SEAL updates for metaverser services | Metaverse_App |
| TS 23.434 | 19.4.0 | 0335 | Enhancements to location reporting procedure | eLSAPP |
| TS 23.434 | 19.4.0 | 0336 | Application QoS coordination for Mobile Metaverse Services | XRM_Ph2_App |
| TS 23.434 | 19.4.0 | 0337 | Support for sidelink positioning management | eLSAPP |
| TS 23.434 | 19.4.0 | 0338 | Add procedure for exposing Sidelink ranging information | eLSAPP |
| TS 23.434 | 19.4.0 | 0339 | Correction of misalignments of Background Data Transfer information | SEALDD_Ph2 |
| TS 23.434 | 19.4.0 | 0340 | Resolve the 2nd EN in 9.3.11.2 | eLSAPP |
| TS 23.434 | 19.4.0 | 0341 | eLSAPP Resolve the 1st EN in 9.3.11.2 | eLSAPP |
| TS 23.434 | 19.4.0 | 0342 | Verify UE location | eLSAPP |
| TS 23.434 | 19.4.0 | 0343 | EN resolution on Geofencing monitoring events | eLSAPP |
| TS 23.434 | 19.4.0 | 0344 | Add the velocity in location reporting related procedures | eLSAPP |
| TS 23.434 | 19.4.0 | 0345 | Keep consistent with the event triggers for reusing the stored UE location | eLSAPP |
| TS 23.434 | 19.4.0 | 0347 | Resolve the EN for using SL/Ranging positioning method | eLSAPP |
| TS 23.434 | 19.4.0 | 0349 | Void MBMS bearer event notification procedure in clause 14.3.4.8 | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0351 | Resolve the 2nd EN in clause 15.2 | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0353 | Resolve the EN in clause 14.3.4.5.2 | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0354 | MBS service area handling at NRM | SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0355 | Upcase correction of location management client and location management server | TEI19, SEAL_Ph3 |
| TS 23.434 | 19.4.0 | 0357 | Digital asset service description | Metaverse_App |
| TS 29.222 | 19.4.0 | 0394 | EN resolution on Resources and Service operation provisioning | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0414 | Correcting data type for aefIds attribute | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0415 | Incorrect feature name | TEI19, NSCALE, CAPIF |
| TS 29.222 | 19.4.0 | 0416 | Correction of errors in operation names and inaccurate service descriptions | NBI19 |
| TS 29.222 | 19.4.0 | 0418 | Network Slice Information in the CAPIF_Access_Control_Policy_API | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0421 | Identify the RNAA-related revoked token | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0423 | Create events related to CAPIF-1 interaction for service APIs | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0425 | CAPIF interconnection | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0426 | CAPIF_Open_Discover_Service_API – OpenAPI | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0427 | Voiding clauses 7.2.2 and 7.2.3 | NBI19 |
| TS 29.222 | 19.4.0 | 0428 | Updates and corrections to the new CAPIF_Open_Discover_Service_API | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0429 | Finer granularity API access control | CAPIF_Ph3 |
| TS 29.222 | 19.4.0 | 0430 | Update of info and externalDocs fields | TEI19 |
| TS 23.434 | 19.4.1 |  | Due to conflict between the digital asset service proposal in CR0333R2 and CR0357, only the latter was implemented. |  |
| TS 23.434 | 19.4.2 |  | Re-application of CR0332R5 “Support the satellite S&F operation” |  |
| TS 23.222 | 19.5.0 | 0236 | Updates to RNAA deployments | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0241 | Addition of response elements in the CAPIF procedure in TS23.222 | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0243 | Procedure for Revoking Resource Owner Authorization | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0244 | Procedure for CCF Obtaining Resource Owner Authorization | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0248 | Solving ENs on CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0249 | UE accessing resources not owned by that UE | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0251 | Correction to Procedure for API invoker obtaining authorization from resource owner | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0252 | Corrections to UE-access of other UEs’ resources of a group | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0253 | Service API category as discovery policy information | eCAPIF, TEI19 |
| TS 23.222 | 19.5.0 | 0254 | Solving ENs on finer granularity of access control for service API | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0255 | Correction on Revocation on CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0256 | Clarification of the ROF and Authorization Function responsibilities | CAPIF |
| TS 23.222 | 19.5.0 | 0257 | Clarification on resource owner consent upon service API invocation | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0259 | Discover service APIs without onboarding | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0260 | Clarification of the ROF and Authorization Function responsibilities | CAPIF |
| TS 23.222 | 19.5.0 | 0261 | Proposal for AEF instantiation support in CAPIF | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0264 | On mapping of active-inactive API states to SA5 solutions and aligning Service API Information descriptions | CAPIF_Ph3 |
| TS 23.222 | 19.5.0 | 0265 | Group Information Provisioning in CAPIF to support RNAA | CAPIF_Ph3 |
| TS 23.434 | 19.5.0 | 0363 | Add the business relationship for SEAL deployment with satellite connectivity | 5GSAT_Ph3_App |
| TS 23.434 | 19.5.0 | 0364 | Handling of Editors Notes in TS 23.434 | SEAL_Ph3 |
| TS 23.434 | 19.5.0 | 0366 | Resvole the EN about the security and privacy aspects for location management | SEAL_Ph3 |
| TS 23.434 | 19.5.0 | 0367 | Resolve the EN for handling the “loss of connectivity” in LM server | eLSAPP |
| TS 23.434 | 19.5.0 | 0368 | Uniform the IE description for the velocity | eLSAPP |
| TS 23.434 | 19.5.0 | 0371 | Correction on reference UE usage | eLSAPP |
| TS 29.222 | 19.5.0 | 0431 | Updates and corrections to the Initiate_Authentication service operation of the AEF_Security_API | NBI19 |
| TS 29.222 | 19.5.0 | 0432 | Complete the definition of the API definition clauses of the CAPIF_Open_Discover_Service_API | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0433 | Complete the definition of the OpenAPI description of the CAPIF_Open_Discover_Service_API | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0434 | Clarification on aefId and apiName fields in the token scope | NBI19 |
| TS 29.222 | 19.5.0 | 0435 | Correction of OpenAPI add missing properties and remove incorrect description | NBI19, CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0436 | Correction of examples for finer granularity scopes | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0437 | Correction of missing failReason attribute in OpenAPI definition | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0438 | Removal of EN and Correction of OpenAPI Definition | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0439 | Corrections to discoveryCount attribute and related definitions | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0440 | Correction to Open API Discovery Service | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0442 | Correction of ProblemDetails data type reference | NBI19 |
| TS 29.222 | 19.5.0 | 0443 | Update clause 5.1 with CAPIF_Open_Discover_Service_API details | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0447 | Removal of unused references in TS 29.222 | TEI19 |
| TS 29.222 | 19.5.0 | 0448 | Corrections to Supported Features | NBI19, CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0449 | General corrections of CAPIF specification. | NBI19 |
| TS 29.222 | 19.5.0 | 0450 | Correction of CAPIF_Security_API | NBI19 |
| TS 29.222 | 19.5.0 | 0451 | Complete CAPIF list of services | NBI19, CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0453 | Additional corrections to the definition of the CAPIF_Open_Discover_Service_API | CAPIF_Ph3, NBI19 |
| TS 29.222 | 19.5.0 | 0455 | Update count attribute in ApiInvokerCount to Uinteger | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0456 | Correction to include missing data type information in Re-used Data types tables | CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0457 | Correction to wrong stage-2 clause reference and typo | NBI19, CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0458 | Correction to the functional description of PUT and PATCH method | NBI19 |
| TS 29.222 | 19.5.0 | 0459 | Clarification of iss attribute description in Access Token and correction of example | NBI19, CAPIF_Ph3 |
| TS 29.222 | 19.5.0 | 0460 | Update of info and externalDocs fields | TEI19 |
| TS 23.222 | 19.6.0 | 0266 | 23.222 CAPIF_ph3 Correction on AEF type | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0267 | Enhanced AEF Capabilities Description | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0269 | Enhanced the CCF's functional description for service API information | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0271 | Remove the Note in Functional model description to support RNAA | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0272 | Remove the limitation in the introduction section of the RNAA architectural requirements | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0277 | Correction to update API invoker’s API list | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0278 | Corrections to RNAA deployments | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0280 | Correction to Preconditions of nested API authorization | SNAAPP |
| TS 23.222 | 19.6.0 | 0281 | Correction to access control policy | CAPIF, TEI19 |
| TS 23.222 | 19.6.0 | 0282 | CCF obtaining RO authorization information | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0283 | Correction on Revocation on CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0284 | AEF1 interaction with CCF for token exchange | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0285 | Solving ENs on UE accessing resources not owned by that UE | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0286 | Solving ENs on UE-accessing other UEs’ resources of a group | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0287 | Correction on Obtain service API authorization for RNAA | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0288 | Correction on Obtain service API authorization (without RNAA) | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0290 | Group context information | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0291 | Open Discover API name and service operation | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0292 | CAPIF_Ph3 onboarding clarification | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0294 | Correction to clause 8.35 | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0303 | Enhanced API invoker obtaining authorization for service API access in CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0304 | Enhanced obtaining security information in CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0305 | Enhanced Open Service API discover Procedure | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0306 | Enhanced retrieve service APIs for CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0307 | Revocation of authorization | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0308 | API invoker identity | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0309 | Completion of RNAA functional model | CAPIF_Ph3 |
| TS 23.222 | 19.6.0 | 0310 | Obtaining collective authorization | CAPIF_Ph3 |
| TS 23.434 | 19.6.0 | 0361 | Addition of response elements in the 5GSAT procedure in TS23.434 | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0362 | Correction of the description of the procedures for UE requesting satellite coverage availability information in TS23.434 | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0369 | Add the APIs for VAL server obtaning the SCAI | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0373 | Consolidation of Reserve Network Resource and Request Unicast Resource | TEI19, SEAL |
| TS 23.434 | 19.6.0 | 0375 | Group management fix | SEAL_Ph3 |
| TS 23.434 | 19.6.0 | 0377 | Correction in Configure VAL service area identifier procedure | 5GFLS |
| TS 23.434 | 19.6.0 | 0378 | Correction to the reference and clause numbering of location management procedure | eLSAPP |
| TS 23.434 | 19.6.0 | 0379 | Update the information flow of location reuse procedure | eLSAPP |
| TS 23.434 | 19.6.0 | 0380 | Update the procedure of verify UE locations and APIs | eLSAPP |
| TS 23.434 | 19.6.0 | 0381 | Update the procedure of SCAI provisioning | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0382 | Correction to NRM enabled S&F transmission | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0383 | Resolve limitation introduced in a NOTE related to reference UE selection by the LMS. | eLSAPP |
| TS 23.434 | 19.6.0 | 0384 | Update satellite coverage availability information by also considering UE's mobility. | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0385 | Establishing communication with MM service requirements | XRM_Ph2_App |
| TS 23.434 | 19.6.0 | 0387 | Correction to 9.4.1 SEAL APIs for location management | eLSAPP |
| TS 23.434 | 19.6.0 | 0388 | Clarification on Maximum S&F data retention IE | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0389 | Correction related to cell identifier information in the Confirm location request and response messages | eLSAPP |
| TS 23.434 | 19.6.0 | 0390 | Essential corrections to various eLSAPP procedures | eLSAPP |
| TS 23.434 | 19.6.0 | 0392 | Correct the procedure and IEs for SL positioning management service | eLSAPP |
| TS 23.434 | 19.6.0 | 0393 | Correct the procedure and IEs for Short-Range based positioning information | eLSAPP |
| TS 23.434 | 19.6.0 | 0394 | Correct the reference of Satellite coverage availability information | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0395 | Correct the S&F events to align with SA2 exposure | 5GSAT_Ph3_App |
| TS 23.434 | 19.6.0 | 0396 | Corrections of clause 9.3.11.2 | eLSAPP |
| TS 29.222 | 19.6.0 | 0461 | Corrections to API definitions | CAPIF_Ph3, NBI19 |
| TS 29.222 | 19.6.0 | 0466 | Correction of outputParameters attribute in Log data type | CAPIF-CT |
| TS 29.222 | 19.6.0 | 0467 | CAPIF correction | NBI19 |
| TS 29.222 | 19.6.0 | 0468 | Correction of missing CAPIF event API_INVOKER_AUTHORIZATION_REVOKED details | NBI19 |
| TS 29.222 | 19.6.0 | 0469 | Correction of missing CAPIF event ACCESS_CONTROL_POLICY_UNAVAILABLE details | NBI19 |
| TS 23.222 | 19.7.0 | 0314 | Proposal for AEF instantiation support in CAPIF | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0315 | Corrections to Revocation of authorization | TEI19, CAPIF |
| TS 23.222 | 19.7.0 | 0316 | Solving ENs on granularity of service authorization | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0317 | Charging the invocation of service APIs | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0318 | Solving Editor’s Note on Open Discovery | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0319 | Solving Editor’s Notes on CAPIF interconnection | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0320 | Solving Editor’s Notes on Resource Owner authorization | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0321 | Solving ENs in authorization related to network slice | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0322 | Completion of authorization revocation | CAPIF_Ph3 |
| TS 23.222 | 19.7.0 | 0323 | Solving ENs on client-side service authorization and API invoker roles | CAPIF_Ph3 |
| TS 23.434 | 19.7.0 | 0399 | Correct the term of Satellite coverage availability information | 5GSAT_Ph3_App |
| TS 23.434 | 19.7.0 | 0400 | Clarification on the relative location in clause 9.3.11.2 | eLSAPP |
| TS 29.222 | 19.7.0 | 0479 | Wrong service operation name in CAPIF_Auditing_API | CAPIF-CT |
| TS 23.222 | 19.8.0 | 0325 | Correction to Functional model description to support 3RD party API providers | CAPIF_Ph3 |
| TS 23.222 | 19.8.0 | 0326 | Correction to CAPIF-7/7e interfaces | CAPIF_Ph3 |
| TS 23.222 | 19.8.0 | 0327 | Completion of Open Discovery | CAPIF_Ph3 |
| TS 23.222 | 19.8.0 | 0328 | Completion of Update API invoker's API list | CAPIF_Ph3 |
| TS 23.222 | 19.8.0 | 0336 | Correction to Obtain API Invoker Information | CAPIF, TEI19 |
| TS 23.434 | 19.8.0 | 0404 | Corrections to SS_LocationReporting Service | eLSAPP |
| TS 23.434 | 19.8.0 | 0407 | SEAL references | SEAL_Ph3 |
| TS 29.222 | 19.8.0 | 0487 | CAPIF Open Discover API – Service Description | CAPIF_Ph3 |
| TS 23.222 | 19.9.0 | 0337 | Correction of the Event Reporting Information | CAPIF_Ph3 |
| TS 23.222 | 19.9.0 | 0339 | EN resolution in clause 8.35.2 | CAPIF_Ph3 |
| TS 23.222 | 19.10.0 | 0352 | Corrections to RNAA | SNAAPP |

</details>

### Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [5GFLS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990108) | 5G-enabled fused location service capability exposure | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Mar 2024 | [SP-221234](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_98E_Electronic_2022-12/Docs/SP-221234.zip) |
| [5GFLS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980109) | Stage 2 of 5GFLS | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Jun 2023 | [SP-221234](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_98E_Electronic_2022-12/Docs/SP-221234.zip) |
| [FFAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=930015) | Application layer support for Factories of the Future (FF) | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.545) | Complete, Mar 2023 | [SP-230751](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_100_Taipei_2023-06/Docs/SP-230751.zip) |
| [SEAL_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980131) | Service Enabler Architecture Layer for Verticals Phase 3 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Sep 2023 | [SP-211518](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_94E_Electronic_2021_12/Docs/SP-211518.zip) |
| [SEAL_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940024) | Stage 2 of SEAL_Ph3 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Jun 2023 | [SP-230276](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230276.zip) |
| [SEAL_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980064) | CT1 aspects of SEAL_Ph3 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 29.549) | Complete, Dec 2022 | [CP-233219](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233219.zip) |
| [SEAL_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980065) | CT3 aspects of SEAL_Ph3 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 29.549) | Complete, Dec 2022 | [CP-233219](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233219.zip) |
| [SEALDD](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980124) | SEAL data delivery enabler for vertical applications | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.433) | Complete, Mar 2024 | [SP-220914](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_97E_Electronic_2022-09/Docs/SP-220914.zip) |
| [SEALDD](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970037) | (Stage 2 of Seal DD) SEAL data delivery enabler for vertical applications | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.433, TS 23.558) | Complete, Jun 2023 | [SP-221232](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_98E_Electronic_2022-12/Docs/SP-221232.zip) |
| [SEALDD](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980066) | CT1 aspects of SEALDD | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.538, TS 29.549, TS 29.538, TS 29.558) | Complete, Mar 2024 | [CP-240272](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_103_Maastricht/Docs/CP-240272.zip) |
| [SEALDD](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980067) | CT3 aspects of SEALDD | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 24.538, TS 29.549, TS 29.538, TS 29.558, TS 29.548) | Complete, Mar 2024 | [CP-240272](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_103_Maastricht/Docs/CP-240272.zip) |
| [SNAAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990117) | Application enablement aspects for subscriber-aware northbound API access | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm), [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Sep 2023 | [SP-220469](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220469.zip) |
| [SNAAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960012) | Stage 2 of SNAAPP | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm), [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Mar 2023 | [SP-220469](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220469.zip) |
| [SNAAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1010002) | CT3 aspects of SNAAPP | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) | Complete, Sep 2023 | [CP-232128](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_101_Bangalore/Docs/CP-232128.zip) |
| [NBI18](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960054) | CT3 aspects of NBI18 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.116, TS 29.122, TS 29.255, TS 29.257, TS 29.343, TS 29.486, TS 29.522, TS 29.538, TS 29.549, TS 29.558) | Complete, Mar 2024 | [CP-231190](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_100_Taipei/Docs/CP-231190.zip) |
| [NSCALE](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020049) | Network Slice Capability Exposure for Application Layer Enablement | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.435) | Complete, Mar 2024 | [SP-220470](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220470.zip) |
| [NSCALE](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960013) | (Stage 2 of NSCALE) Network Slice Capability Exposure for Application Layer Enablement | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.435) | Complete, Mar 2023 | [SP-220470](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220470.zip) |
| [NSCALE](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020050) | CT1 aspects of NSCALE | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) | Complete, Mar 2024 | [CP-233310](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233310.zip) |
| [NSCALE](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020006) | CT3 aspects of NSCALE | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.520, TS 29.522, TS 29.549) | Complete, Mar 2024 | [CP-233310](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233310.zip) |
| [V2XAPP_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980125) | Application layer support for V2X services; Phase 3 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.286) | Complete, Mar 2024 | [SP-220916](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_97E_Electronic_2022-09/Docs/SP-220916.zip) |
| [V2XAPP_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970039) | Stage 2 of V2XAPP_Ph3 | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.286) | Complete, Jun 2023 | [SP-221229](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_98E_Electronic_2022-12/Docs/SP-221229.zip) |
| [V2XAPP_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980072) | CT1 aspects of V2XAPP_Ph3 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.486, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 29.549, TS 29.486, TS 29.558) | Complete, Mar 2024 | [CP-233214](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233214.zip) |
| [V2XAPP_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980073) | CT3 aspects of V2XAPP_Ph3 | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 24.486, TS 24.544, TS 24.545, TS 24.546, TS 24.547, TS 24.548, TS 29.549, TS 29.486, TS 29.558) | Complete, Mar 2024 | [CP-233214](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233214.zip) |
| [EDGEAPP_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980074) | CT1 aspects of EDGEAPP_Ph2 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 24.558, TS 29.558) | Complete, Dec 2023 | [CP-233114](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233114.zip) |
| [EDGEAPP_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980075) | CT3 aspects of EDGEAPP_Ph2 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 24.558, TS 29.558) | Complete, Dec 2023 | [CP-233114](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_102_Edinburgh/Docs/CP-233114.zip) |
| [ADAES](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990115) | Application Data Analytics Enablement Service | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436) | Complete, Mar 2024 | [SP-220913](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_97E_Electronic_2022-09/Docs/SP-220913.zip) |
| [ADAES](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=970036) | Stage 2 of ADAES | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.436) | Complete, Jun 2023 | [SP-230275](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_99_Rotterdam_2023-03/Docs/SP-230275.zip) |
| [5GMARCH_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990019) | CT1 aspects of 5GMARCH_Ph2 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 24.538, TS 24.544, TS 24.546, TS 29.538) | Complete, Dec 2023 | [CP-230198](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_99_Rotterdam/Docs/CP-230198.zip) |
| [5GMARCH_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990099) | CT3 aspects of 5GMARCH_Ph2 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 24.538, TS 24.544, TS 24.546, TS 29.538) | Complete, Dec 2023 | [CP-230198](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_99_Rotterdam/Docs/CP-230198.zip) |

<details>
<summary>288 change requests and 2 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.222 | 18.0.0 | 0090 | Additional CAPIF architectural requirements for SNA | SNAAPP |
| TS 23.222 | 18.0.0 | 0091 | CAPIF business relationship updates for SNA | SNAAPP |
| TS 23.222 | 18.0.0 | 0092 | CAPIF functional model updates for SNA | SNAAPP |
| TS 23.222 | 18.0.0 | 0093 | API invoker obtaining authorization from resource owner | SNAAPP |
| TS 23.222 | 18.0.0 | 0094 | Discover a proper AEF with owner information | SNAAPP |
| TS 23.222 | 18.0.0 | 0095 | Reducing resource owner consent inquiry in a nested API invocation | SNAAPP |
| TS 23.222 | 18.0.0 | 0096 | CAPIF extensibility as requested by ETSI ISG MEC | TEI18 |
| TS 23.434 | 18.0.0 | 0091 | Complete location retrieval in an area | SEAL_Ph3 |
| TS 24.549 | 18.0.0 | 0015 | Update to the obsoleted IETF HTTP RFCs | eSEAL, TEI18 |
| TS 29.222 | 18.0.0 | 0253 | Completing the interface descriptions | NBI18 |
| TS 29.222 | 18.0.0 | 0254 | Custom Operations modelling | NBI18 |
| TS 29.222 | 18.0.0 | 0256 | Correction of the tables for the re-used, API-specific data structures in CAPIF APIs | NBI18 |
| TS 29.222 | 18.0.0 | 0257 | Correction of the OpenAPI file formating and descriptions in the CAPIF APIs | NBI18 |
| TS 29.222 | 18.0.0 | 0258 | "Error handling" clause: alignment with other NBI and 5GS APIs | NBI18 |
| TS 29.222 | 18.0.0 | 0259 | Corrections on CAPIF_API_Provider_Management_API | NBI18 |
| TS 29.222 | 18.0.0 | 0285 | Update of info and externalDocs fields | TEI18 |
| TS 23.222 | 18.1.0 | 0098 | Discover proper AEF in interconnection | SNAAPP |
| TS 23.222 | 18.1.0 | 0099 | Solve CAPIF extensibility EN | TEI18 |
| TS 23.222 | 18.1.0 | 0100 | API invoker clarification | SNAAPP |
| TS 23.222 | 18.1.0 | 0101 | Modify a terminology for SNA | SNAAPP |
| TS 23.222 | 18.1.0 | 0102 | New IE(Service KPI) in Service API publish request | EDGEAPP_Ph2 |
| TS 23.222 | 18.1.0 | 0103 | Discover proper AEF with IP information | SNAAPP |
| TS 23.222 | 18.1.0 | 0104 | Support onboarding expiration | NSCALE |
| TS 23.222 | 18.1.0 | 0105 | Resolving editor’s notes about TS reference | TEI18 |
| TS 23.222 | 18.1.0 | 0106 | Adding descriptions of new functional entities and reference points | SNAAPP |
| TS 23.434 | 18.1.0 | 0097 | Minor essential corrections to TS 23.434 | eSEAL |
| TS 23.434 | 18.1.0 | 0101 | Minor corrections on network resource management for 5G TSC | eSEAL |
| TS 23.434 | 18.1.0 | 0103 | QoS monitoring clarification | eSEAL |
| TS 24.549 | 18.1.0 | 0016 | Update the general description | NSCALE |
| TS 24.549 | 18.1.0 | 0017 | Add parameters to network slice adaptation trigger | NSCALE |
| TS 24.549 | 18.1.0 | 0018 | Update APIs for event triggered network slice configuration | NSCALE |
| TS 24.549 | 18.1.0 | 0019 | Retrieve data and information from NSCE client | NSCALE |
| TS 24.549 | 18.1.0 | 0020 | Notify slice modification in Inter-PLMN based slice service continuity | NSCALE |
| TS 29.222 | 18.1.0 | 0286 | Correction of the description fields in enumerations | NBI18 |
| TS 29.222 | 18.1.0 | 0287 | Vendor specific extensions | NBI18 |
| TS 29.222 | 18.1.0 | 0290 | Support of CAPIF extensibility requirements | NBI18 |
| TS 29.222 | 18.1.0 | 0294 | Update for CAPIF_Auditing_API to support carrying multiple invocation logs and feature negotiation | NBI18 |
| TS 29.222 | 18.1.0 | 0295 | Update the description field of CAPIF_Publish_Service API | NBI18 |
| TS 29.222 | 18.1.0 | 0296 | Update of info and externalDocs fields | TEI18 |
| TS 23.222 | 18.2.0 | 0109 | Support CAPIF in SNPN | TEI18 |
| TS 23.222 | 18.2.0 | 0111 | Service API status monitoring | SEAL_Ph3 |
| TS 23.222 | 18.2.0 | 0112 | Clarification that RNAA is for both 4G and 5G | SNAAPP |
| TS 23.222 | 18.2.0 | 0113 | SNAAPP alignment with SA3 | SNAAPP |
| TS 23.222 | 18.2.0 | 0114 | Overview of CAPIF operations for RNAA scenarios | SNAAPP |
| TS 23.222 | 18.2.0 | 0115 | CAPIF add service procedure for update of subscriptions | TEI18 |
| TS 23.222 | 18.2.0 | 0116 | Alignment among CAPIF provider (trust) domains | TEI18 |
| TS 23.434 | 18.2.0 | 0104 | SEAL Notification Management service – Functional Model | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0105 | SEAL Notification Management Service - Information Flows and Procedures | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0108 | EN resolution for network slice adaptation request | eSEAL |
| TS 23.434 | 18.2.0 | 0110 | Establishing communication with service requirements | FFAPP, SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0111 | Information flows and procedures to maintain notification channel | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0112 | Update Unicast QoS Monitoring Subscription operation in the SS_NetworkResourceMonitoring API | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0115 | Correction to location management information flow | eSEAL |
| TS 23.434 | 18.2.0 | 0116 | Update the scope and reference to support 5MBS | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0117 | Update the requirement to support 5MBS | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0118 | Update the NRM functional model to support 5MBS | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0119 | MBS session creation and MBS session announcement | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0120 | Updating MBS resources for group communications | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0121 | MBS session deletion | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0122 | Activate or de-activate multicast MBS sessions | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0123 | Group media transmissions over 5G MBS sessions | SEAL_Ph3 |
| TS 23.434 | 18.2.0 | 0124 | Application level control signalling over 5G MBS sessions | SEAL_Ph3 |
| TS 24.549 | 18.2.0 | 0021 | Network slice capability enablement services | NSCALE |
| TS 24.549 | 18.2.0 | 0022 | HTTP resource representation and encoding for network slice configuration | NSCALE |
| TS 24.549 | 18.2.0 | 0023 | CoAP resource representation and encoding for network slice configuration | NSCALE |
| TS 24.549 | 18.2.0 | 0024 | ETC_Configuration API | NSCALE |
| TS 24.549 | 18.2.0 | 0025 | Notify slice modification in edge based NSCE deployments |  |
| TS 24.549 | 18.2.0 | 0026 | Network slice information delivery after network slice allocation in NSaaS model | NSCALE |
| TS 24.549 | 18.2.0 | 0028 | Update APIs for slice modification in Inter-PLMN based slice service continuity | NSCALE |
| TS 24.549 | 18.2.0 | 0029 | EDN based service continuity service | NSCALE |
| TS 24.549 | 18.2.0 | 0030 | EDN based service continuity APIs definition | NSCALE |
| TS 24.549 | 18.2.0 | 0031 | NSCE_EdnSliceInfo API (YAML) | NSCALE |
| TS 24.549 | 18.2.0 | 0035 | Scope and General description | NSCALE |
| TS 29.222 | 18.2.0 | 0297 | Completing the support of CAPIF protocol and data formats extensibility requirements | NBI18 |
| TS 29.222 | 18.2.0 | 0298 | Corrections on presence of the attributes in CAPIF APIs | NBI18 |
| TS 29.222 | 18.2.0 | 0299 | Support CAPIF model in SNPN | NBI18 |
| TS 29.222 | 18.2.0 | 0305 | Update of info and externalDocs fields | TEI18 |
| TS 24.549 | 18.2.1 |  | Missing attaching YAML file in previous version |  |
| TS 23.222 | 18.3.0 | 0122 | Editoral corrections | eCAPIF, TEI17 |
| TS 23.222 | 18.3.0 | 0125 | Solve EN related to SA3 | SNAAPP |
| TS 23.222 | 18.3.0 | 0126 | Add response to RNAA procedural flows and correct cross-references | SNAAPP |
| TS 23.222 | 18.3.0 | 0128 | Clarify how to monitor service API status when the APF is unable to update service API status | SNAAPP |
| TS 23.222 | 18.3.0 | 0129 | Add CAPIF words to Abbreviations | SNAAPP |
| TS 23.222 | 18.3.0 | 0133 | CAPIF Architecture alignment with SA3 RNAA aspects | SNAAPP |
| TS 23.222 | 18.3.0 | 0136 | API Description Correction | eCAPIF |
| TS 23.222 | 18.3.0 | 0137 | API invoker authorization corrections | SNAAPP |
| TS 23.222 | 18.3.0 | 0141 | Security API corrections | CAPIF |
| TS 23.222 | 18.3.0 | 0147 | Editorial corrections regarding RNAA | SNAAPP |
| TS 23.222 | 18.3.0 | 0149 | Corrections for CAPIF revocation of API Invoker's authorization based on RNAA | SNAAPP |
| TS 23.222 | 18.3.0 | 0150 | Corrections for CAPIF deployment models supporting RNAA | SNAAPP |
| TS 23.434 | 18.3.0 | 0106 | SEAL Registrar service | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0126 | update the NSCE functional | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0127 | TS 23.434 Enhance the APIs of the network slice adaptation | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0129 | Update to SEAL architecture to include SEALDD | SEALDD |
| TS 23.434 | 18.3.0 | 0130 | Definition of MBS session announcement | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0131 | Information flows for MBS procedures | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0133 | Updating MBS with dynamic PCC | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0134 | NRM coordination for redundant PDU Session establishment | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0136 | VAL service area identifier usage | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0137 | add Cause IE to NSCE information flows | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0138 | ADAE functional model in SEAL architecture | SEAL_Ph3, ADAES |
| TS 23.434 | 18.3.0 | 0139 | Service continuity between 5G MBS delivery and unicast delivery | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0140 | VAL service inter-system switching between 5G and LTE | SEAL_Ph3 |
| TS 23.434 | 18.3.0 | 0141 | VAL service over 5GS supporting EPS interworking | SEAL_Ph3 |
| TS 24.549 | 18.3.0 | 0039 | Remove UE IP address preservation indicator | NSCALE |
| TS 24.549 | 18.3.0 | 0040 | Update of info and externalDocs fields | TEI18 |
| TS 29.222 | 18.3.0 | 0306 | CAPIF security method clarification | NBI18 |
| TS 29.222 | 18.3.0 | 0307 | Update definitions of CAPIF provider domain and SNPN trust domain | NBI18 |
| TS 29.222 | 18.3.0 | 0308 | Clarify CCF role in service publish | NBI18 |
| TS 29.222 | 18.3.0 | 0309 | CAPIF Events API update subscription | TEI18, CAPIF-CT |
| TS 29.222 | 18.3.0 | 0310 | Various corrections | NBI18 |
| TS 29.222 | 18.3.0 | 0311 | Update of info and externalDocs fields | TEI18 |
| TS 23.222 | 18.4.0 | 0153 | Consistent use of term "resource owner" | SNAAPP |
| TS 23.434 | 18.4.0 | 0142 | Update the on-network functional model and reference points for location management | 5GFLS |
| TS 23.434 | 18.4.0 | 0147 | Location profiling for supporting fused location service enablement | 5GFLS |
| TS 23.434 | 18.4.0 | 0148 | Add information flow for location reporting configuration update | 5GFLS |
| TS 23.434 | 18.4.0 | 0149 | Location service registration and initialization | 5GFLS |
| TS 23.434 | 18.4.0 | 0152 | Improved location monitoring procedure | 5GFLS, SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0153 | Service based interface representation of Location Management service | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0154 | Service based interface representation of Group Management Service | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0155 | Service based interface representation of Network resource management service | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0156 | Update Annex with the details of new SEAL services | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0158 | Updates to service based interface represeentation of functional model | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0159 | Information flow for VAL server provisioning to the Identity Management Server | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0162 | Alignment between TS 23.434 and TS 23.436 | ADAES |
| TS 23.434 | 18.4.0 | 0163 | Alignment between TS 23.434 and TS 23.435 | NSCALE |
| TS 23.434 | 18.4.0 | 0164 | Update to the SEALDD description | SEALDD |
| TS 23.434 | 18.4.0 | 0168 | Add “supplementary location information source” parameter in related information flows | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0169 | Update the Procedure and information flow to add location QoS | 5GFLS |
| TS 23.434 | 18.4.0 | 0170 | Add the information flow for “Location reporting configuration cancel request response”. | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0172 | Add third party location management server in existing procedure | 5GFLS |
| TS 23.434 | 18.4.0 | 0174 | Adding missing SEAL services | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0179 | Resolving ENs related to functions enabled over SEAL-E reference point | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0182 | RAT change report via the LMS | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0183 | Clarification on MBS service area in pre-conditions | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0184 | Clarification on UE session join notification | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0185 | Clarification on the unicast deliver stop after multicast MBS delivery | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0186 | Adding MBS listening status report | SEAL_Ph3 |
| TS 23.434 | 18.4.0 | 0189 | Mirror correction on get VAL service | SEAL_Ph3 |
| TS 24.549 | 18.4.0 | 0041 | Correction to the ETC_Configuration API | NSCALE |
| TS 24.549 | 18.4.0 | 0043 | Correction on NS Info Delivery | NSCALE |
| TS 24.549 | 18.4.0 | 0044 | Update of info and externalDocs fields | TEI18 |
| TS 29.222 | 18.4.0 | 0300 | Supporting query parameters extensionsibility for the CAPIF_Discover_Service_API | NBI18 |
| TS 29.222 | 18.4.0 | 0312 | Authorization code flow for resource owner-aware northbound api access | SNAAPP |
| TS 29.222 | 18.4.0 | 0313 | Update authorization obtaining part to support resource owner-aware northbound API access | SNAAPP |
| TS 29.222 | 18.4.0 | 0314 | Update securitymethod data type for Resource owner-aware northbound API access | SNAAPP |
| TS 29.222 | 18.4.0 | 0316 | Service API status monitoring in the CAPIF APIs | SEAL_Ph3 |
| TS 29.222 | 18.4.0 | 0317 | Error handling in the CAPIF layer | NBI18 |
| TS 29.222 | 18.4.0 | 0318 | Update of the CAPIF layer architecture description | NBI18 |
| TS 29.222 | 18.4.0 | 0319 | Discovering of APIs based on the API provider name in the CAPIF_Discover_Service_API | SNAAPP |
| TS 29.222 | 18.4.0 | 0320 | HTTP RFC uplifting | NBI18 |
| TS 29.222 | 18.4.0 | 0321 | Correction of the InterfaceDescription data structure | NBI18 |
| TS 29.222 | 18.4.0 | 0322 | Discovering of APIs based on the IP address of UE in the CAPIF_Discover_Service_API | SNAAPP |
| TS 29.222 | 18.4.0 | 0325 | Corrections to boolean type definitions | NBI18 |
| TS 29.222 | 18.4.0 | 0326 | Corrections on the CAPIF service | NBI18 |
| TS 29.222 | 18.4.0 | 0327 | CAPIFEventDetail data type clarification | NBI18 |
| TS 29.222 | 18.4.0 | 0328 | Correcting an incorrect clause number | NBI18 |
| TS 29.222 | 18.4.0 | 0331 | New IE(Service KPI) in Service API publish request | EDGEAPP_Ph2 |
| TS 29.222 | 18.4.0 | 0332 | CAPIF_Publish_Service_API – Publish the Public IP ranges information | SNAAPP |
| TS 29.222 | 18.4.0 | 0333 | Update of info and externalDocs fields | TEI18 |
| TS 23.434 | 18.4.1 |  | Correction of the step 8 style in clause 9.3.14.2 |  |
| TS 23.222 | 18.5.0 | 0161 | Corrections to Deregister_API_Provider operation | TEI18, CAPIF |
| TS 23.222 | 18.5.0 | 0166 | Correction for Discover service APIs | TEI18, CAPIF |
| TS 23.222 | 18.5.0 | 0168 | Add missing function to resource owner function | SNAAPP |
| TS 23.222 | 18.5.0 | 0173 | Alignment of "API type" with "API category" terminology | EDGEAPP_Ph2 |
| TS 23.222 | 18.5.0 | 0179 | Correction for Service API discovery involving multiple CCFs | CAPIF, TEI18 |
| TS 23.222 | 18.5.0 | 0184 | Correction to clause 6.2.3 | SNAAPP |
| TS 23.222 | 18.5.0 | 0186 | Reducing authorization information inquiry in a nested API invocation | SNAAPP |
| TS 23.434 | 18.5.0 | 0143 | Service operations for the SS_VALServiceAreaConfiguration API | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0160 | VAL server provisioning for Key Management Server | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0190 | Update Location service registration request | 5GFLS |
| TS 23.434 | 18.5.0 | 0191 | Update Location information request IE | 5GFLS |
| TS 23.434 | 18.5.0 | 0192 | Add “location information unsubscribe” and “Monitor location unsubscribe” information flow, procedure and APIs | 5GFLS |
| TS 23.434 | 18.5.0 | 0193 | Add “Location service update” procedure and information flow | 5GFLS |
| TS 23.434 | 18.5.0 | 0194 | Add “Location service deregistration” procedure and information flow | 5GFLS |
| TS 23.434 | 18.5.0 | 0195 | Add location reporting configuration notification | 5GFLS |
| TS 23.434 | 18.5.0 | 0197 | Notification channel expiry handling | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0202 | Create_Group service operation in the SS_GroupManagement API | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0205 | QoS management for network-assisted UE-to-UE communications update | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0206 | Location report considering non-3GPP positioning technology | FFAPP |
| TS 23.434 | 18.5.0 | 0207 | Minor fixes | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0208 | Abbreviation for Uu | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0209 | Correction to table 17.3.2.2-1 | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0212 | Unified Traffic Pattern and Monitoring management | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0213 | NRM BDT configuration | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0215 | Coordinated application-level direct UE-to-UE communications | SEAL_Ph3 |
| TS 23.434 | 18.5.0 | 0216 | Update reference for location access type | 5GFLS |
| TS 23.434 | 18.5.0 | 0217 | Update Annex D | 5GFLS |
| TS 23.434 | 18.5.0 | 0218 | Add SEAL-3P reference point | 5GFLS |
| TS 23.434 | 18.5.0 | 0219 | Editorial change for Location area monitoring unsubscribe response | 5GFLS |
| TS 23.434 | 18.5.0 | 0221 | Clarify non-3GPP access |  |
| TS 23.434 | 18.5.0 | 0222 | Clarify non-3GPP access | 5GFLS |
| TS 23.434 | 18.5.0 | 0223 | SEAL NRM determines time synchronization activation for TSC stream | SEAL_Ph3 |
| TS 24.549 | 18.5.0 | 0048 | Corrections on the wrong API names | NBI18 |
| TS 29.222 | 18.5.0 | 0301 | CAPIF Security Methods usage for vendor extensions | NBI18 |
| TS 29.222 | 18.5.0 | 0335 | CAPIF Security Methods presence condition update | NBI18 |
| TS 29.222 | 18.5.0 | 0336 | Support onboarding expiration in the CAPIF_API_Invoker_Management_API | NSCALE |
| TS 29.222 | 18.5.0 | 0338 | Correction to CAPIF_Publish_Service_API | EDGEAPP_Ph2 |
| TS 29.222 | 18.5.0 | 0339 | Correction to CAPIF_Security_API | SNAAPP |
| TS 29.222 | 18.5.0 | 0341 | Update CAPIF_Publish_Service_API and CAPIF_API_Provider_Management_API to support RNAA | SNAAPP |
| TS 29.222 | 18.5.0 | 0342 | CAPIF Security Method handling | NBI18 |
| TS 29.222 | 18.5.0 | 0344 | Corrections and updates to the RNAA Oauth related provisions | SNAAPP |
| TS 29.222 | 18.5.0 | 0345 | Update of info and externalDocs fields | TEI18 |
| TS 23.222 | 18.6.0 | 0187 | Correction to clause 8.3.2.1 | CAPIF, TEI18 |
| TS 23.222 | 18.6.0 | 0189 | Correction to Interconnection API publish | CAPIF, TEI18 |
| TS 23.222 | 18.6.0 | 0191 | Correction to Interconnection service API discover | CAPIF, TEI18 |
| TS 23.222 | 18.6.0 | 0193 | Rel-18 Add to Definitions and Abbreviations | SNAAPP |
| TS 23.222 | 18.6.0 | 0195 | Rel-18 Correction on Resouce owner | SNAAPP |
| TS 23.434 | 18.6.0 | 0225 | Correct location monitoring verification | SEAL_Ph3 |
| TS 23.434 | 18.6.0 | 0226 | Correct NRM reference point in TSC | SEAL_Ph3 |
| TS 23.434 | 18.6.0 | 0227 | VAL service area triggering criteria in the SS_LocationReporting API | SEAL_Ph3 |
| TS 23.434 | 18.6.0 | 0228 | EN resolution for the subscribe-notify service operations for the SS_VALServiceAreaConfiguration API | SEAL_Ph3 |
| TS 23.434 | 18.6.0 | 0229 | Add reason IE to Group deletion | SEAL_Ph3 |
| TS 23.434 | 18.6.0 | 0231 | NRM BDT configuration API | eSEAL |
| TS 23.434 | 18.6.0 | 0232 | NRM united traffic pattern and monitoring management API | eSEAL |
| TS 29.222 | 18.6.0 | 0346 | Subscribed events editors note handling | TEI18, CAPIF-CT |
| TS 29.222 | 18.6.0 | 0347 | Several OpenAPI Corrections | NBI18 |
| TS 29.222 | 18.6.0 | 0348 | Service API category update | NBI18 |
| TS 29.222 | 18.6.0 | 0349 | Service API information update | EDGEAPP_Ph2 |
| TS 29.222 | 18.6.0 | 0350 | API Invoker authorization | SNAAPP |
| TS 29.222 | 18.6.0 | 0351 | Various essential corrections | NBI18 |
| TS 29.222 | 18.6.0 | 0352 | Various essential corrections to the common design aspects for all CAPIF APIs | NBI18 |
| TS 29.222 | 18.6.0 | 0353 | Update of info and externalDocs fields | TEI18 |
| TS 23.222 | 18.7.0 | 0210 | Resolving ENs without action | SNAAPP |
| TS 23.222 | 18.7.0 | 0212 | Resolving ENs adding SA3 references | SNAAPP |
| TS 23.222 | 18.7.0 | 0215 | Adding invocation latency | SNAAPP |
| TS 23.222 | 18.7.0 | 0217 | API invoker obtaining authorization from resource owner | SNAAPP |
| TS 23.222 | 18.7.0 | 0219 | Terminology alignment: authorization vs consent | SNAAPP |
| TS 23.222 | 18.7.0 | 0223 | Recover Service API category in Interconnection API publish request | SNAAPP |
| TS 23.222 | 18.7.0 | 0224 | R18_Correction of Update API invoker’s API list | SNAAPP |
| TS 23.222 | 18.7.0 | 0234 | Clarify user consent storage | SNAAPP |
| TS 23.434 | 18.7.0 | 0233 | Complete functional description of VAL-UDB reference point | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0235 | Missing Notification Target URI in Location area monitoring subscription operations | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0237 | Update subscription service operation for SS_LocationInfoEvent | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0238 | Update subscription service operation for SS_LocationMonitoring | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0241 | Notification service operation in the SS_LocationReporting API | SEAL |
| TS 23.434 | 18.7.0 | 0243 | Correction of the TSC stream creation request | eSEAL |
| TS 23.434 | 18.7.0 | 0244 | Subscription update service operation for the SS_VALServiceAreaConfiguration API | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0246 | SS_IdmParameterProvisioning API service operations | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0248 | Removal of KMS service provisioning procedure | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0250 | Corrections to Location-based group creation request Information flow | eSEAL |
| TS 23.434 | 18.7.0 | 0253 | Corrections to the Information flows and APIs for Group Management | SEAL |
| TS 23.434 | 18.7.0 | 0256 | Corrections to the information flows related to CM | SEAL |
| TS 23.434 | 18.7.0 | 0259 | Subscription procedure for group membership changes is missing | SEAL |
| TS 23.434 | 18.7.0 | 0262 | Clarification on Location reporting trigger | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0264 | Correction steps in VAL service area identifier procedure | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0265 | Missing request expiration time in BDT configuration request | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0266 | Group configuration data unsubscribe | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0267 | Group configuration data subscription update | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0270 | Correction duplicated numbering clause 14.3.2.57 | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0271 | Adding the information flow and API for reliable transmission procedure | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0272 | Corrections for BDT configuration | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0273 | Corrections for BDT configuration information flows | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0274 | Correction to add missing get operation for BDT configuration | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0275 | Correction to add missing update operation for BDT configuration | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0276 | Correction to add missing delete operation for BDT configuration | SEAL_Ph3 |
| TS 23.434 | 18.7.0 | 0277 | Correction to add missing API operations for BDT configuration | SEAL_Ph3 |
| TS 29.222 | 18.7.0 | 0360 | RNAA OAuth grant types provisioning in the CAPIF_Publish_Service_API | SNAAPP |
| TS 29.222 | 18.7.0 | 0361 | Correction of the SecurityInformation data type in the CAPIF_Security_API | SNAAPP |
| TS 29.222 | 18.7.0 | 0370 | Corrections to feature negotiation support for the CAPIF_Discover_Service_API | eCAPIF |
| TS 29.222 | 18.7.0 | 0372 | Service API category update | NBI18 |
| TS 29.222 | 18.7.0 | 0376 | Correction for Provider management API | eCAPIF |
| TS 29.222 | 18.7.0 | 0378 | Support service API discovery based on the supported OAuth grant types for RNAA | SNAAPP |
| TS 29.222 | 18.7.0 | 0383 | Update of info and externalDocs fields | TEI18 |
| TS 23.222 | 18.8.0 | 0279 | Correction to Preconditions of nested API authorization | SNAAPP |
| TS 23.434 | 18.8.0 | 0284 | UE identifiers correction in the SS_LocationAreaInfoRetrieval API | eSEAL |
| TS 23.434 | 18.8.0 | 0290 | Correct IE presence condition | eSEAL |
| TS 29.222 | 18.8.0 | 0465 | Correction of outputParameters attribute in Log data type | CAPIF-CT |
| TS 23.222 | 18.9.0 | 0329 | Resolving SA3 related EN | eCAPIF |
| TS 23.222 | 18.9.0 | 0330 | Resolving SA5 related EN | eCAPIF |
| TS 23.434 | 18.9.0 | 0295 | Solve EN in location info request | eSEAL |
| TS 23.434 | 18.9.0 | 0297 | Correct location triggering criteria in update request | SEAL_Ph3 |
| TS 23.434 | 18.9.0 | 0299 | Solve EN in NM related to CAPIF | SEAL_Ph3 |
| TS 23.434 | 18.9.0 | 0301 | Solve EN in SEAL clause 14.3.12 | SEAL_Ph3 |
| TS 29.222 | 18.9.0 | 0478 | Wrong service operation name in CAPIF_Auditing_API | CAPIF-CT |
| TS 23.222 | 18.10.0 | 0353 | Corrections to RNAA | SNAAPP |
| TS 23.434 | 18.10.0 | 0317 | Remove reference for 23.545 in SEAL | SEAL_Ph3 |
| TS 23.434 | 18.10.0 | 0319 | Solve EN in SEAL clause 9.5.1 | SEAL_Ph3 |
| TS 23.434 | 18.10.0 | 0321 | TS 23.434 Rel-18 - Handling Editors Notes | SEAL_Ph3 |
| TS 23.434 | 18.10.0 | 0348 | Void MBMS bearer event notification procedure in clause 14.3.4.8 | SEAL_Ph3 |
| TS 23.434 | 18.10.0 | 0350 | Resolve the 2nd EN in clause 15.2 | SEAL_Ph3 |
| TS 23.434 | 18.10.0 | 0352 | Resolve the EN in clause 14.3.4.5.2 | SEAL_Ph3 |
| TS 23.434 | 18.10.0 | 0359 | MBS service area handling at NRM | SEAL_Ph3 |
| TS 23.434 | 18.11.0 | 0365 | Resvole the EN about the security and privacy aspects for location management | SEAL_Ph3 |
| TS 23.434 | 18.12.0 | 0374 | Group management fix | SEAL_Ph3 |
| TS 23.434 | 18.12.0 | 0376 | Correction in Configure VAL service area identifier procedure | 5GFLS |
| TS 23.434 | 18.13.0 | 0406 | SEAL references | SEAL_Ph3 |
| TS 23.434 | 18.13.0 | 0410 | EN resolution – hold and forward buffering | SEAL_Ph3 |
| TS 23.434 | 18.13.0 | 0411 | EN resolution – incompatible configurations notification IE | SEAL_Ph3 |
| TS 23.434 | 18.13.0 | 0412 | EN resolution – VAL server and IDM interaction | SEAL_Ph3 |

</details>

### Release 17

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [UASAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=900025) | Stage 2 of Application layer support for Uncrewed Aerial System (UAS) | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) | Complete, Jun 2021 | [SP-200988](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_90E_Electronic/Docs/SP-200988.zip) |
| [eV2XAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910075) | Enhanced application layer support for V2X services | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.286) | Complete, Mar 2022 | [SP-200831](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_89E_Electronic/Docs/SP-200831.zip) |
| [eV2XAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=890036) | Stage 2 of eV2XAPP | Normative | [TS 23.434](https://www.3gpp.org/dynareport/23434.htm) (with TS 23.286) | Complete, Jun 2021 | [SP-200831](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_89E_Electronic/Docs/SP-200831.zip) |
| [EDGEAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880042) | Architecture for enabling Edge Applications | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) (with TS 23.558) | Complete, Jun 2022 | [SP-200109](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_87E_Electronic/Docs/SP-200109.zip) |
| [EDGEAPP](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=860006) | Architecture for enabling Edge Applications | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) (with TS 23.558) | Complete, Jun 2021 | [SP-200886](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGs_89E_Electronic/Docs/SP-200886.zip) |
| [NBI17](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920053) | CT3 aspects of NBI17 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.558, TS 29.549, TS 29.522, TS 29.486, TS 29.343, TS 29.122, TS 29.116) | Complete, Mar 2022 | [CP-220058](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_95e/Docs/CP-220058.zip) |
| [5GMARCH](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=930004) | CT aspects for enabling MSGin5G Service | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) | Complete, Mar 2022 | [CP-212106](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_93e/Docs/CP-212106.zip) |
| [eCryptPr](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940049) | Stage 3 CT3 for eCryptPr | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.079, TS 29.116, TS 29.122, TS 29.155, TS 29.201, TS 29.486, TS 29.517, TS 29.522, TS 29.549) | Complete, Mar 2022 | [CP-213083](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_94e/Docs/CP-213083.zip) |
| [eSEAL](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920006) | CT1 aspects of eSEAL | Normative | [TS 24.549](https://www.3gpp.org/dynareport/24549.htm) (with TS 29.549, TS 24.548, TS 24.547, TS 24.546, TS 24.545) | Complete, Mar 2022 | [CP-212098](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_93e/Docs/CP-212098.zip) |
| [SBIProtoc17](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880053) | CT3 aspects of SBIProtoc17 | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.507, TS 29.508, TS 29.512, TS 29.514, TS 29.519, TS 29.520, TS 29.521, TS 29.522, TS 29.523, TS 29.525, TS 29.551, TS 29.554, TS 29.554, TS 29.591, TS 29.594, TS 29.122, TS 29.486, TS 29.517, TS 29.549, TS 29.675) | Complete, Mar 2022 | [CP-211088](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_92e/Docs/CP-211088.zip) |

<details>
<summary>166 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.222 | 17.0.0 | 0067 | Serving area information for service APIs to support edge applications | EDGEAPP |
| TS 23.434 | 17.0.0 | 0027 | Tracking UE and obtaining dynamic UE information | eV2XAPP |
| TS 23.434 | 17.0.0 | 0031 | support local MBMS | eV2XAPP |
| TS 23.434 | 17.0.0 | 0032 | Network slice adaptation for VAL applications | eSEAL |
| TS 23.434 | 17.0.0 | 0034 | CR on clarifications for T8 interface | eSEAL |
| TS 23.434 | 17.0.0 | 0035 | Temporary Groups formation | eV2XAPP, eSEAL |
| TS 24.549 | 17.0.0 |  | TS 24.549 v17.0.0 created after CT#95e by MCC |  |
| TS 29.222 | 17.0.0 | 0165 | Corrections to HTTP custom headers handling for Northbound APIs | SBIProtoc17 |
| TS 29.222 | 17.0.0 | 0166 | OpenAPI reference | SBIProtoc17 |
| TS 23.222 | 17.1.0 | 0069 | Add consumer for discover and publish service APIs | eCAPIF |
| TS 23.222 | 17.1.0 | 0071 | Add obtaining routing info service API | eCAPIF |
| TS 23.222 | 17.1.0 | 0073 | Correct API topology hiding | eCAPIF |
| TS 23.222 | 17.1.0 | 0075 | Correction for CAPIF interconnection Ies | eCAPIF |
| TS 23.434 | 17.1.0 | 0038 | Service identification in location management procedures | eSEAL |
| TS 23.434 | 17.1.0 | 0039 | Group Management support for 5G-VN | eSEAL |
| TS 23.434 | 17.1.0 | 0040 | Add location criteria to group creation request | eSEAL |
| TS 23.434 | 17.1.0 | 0042 | Update to LMS server APIs | eSEAL, eV2XAPP |
| TS 23.434 | 17.1.0 | 0044 | Enhancement of information flows to add VAL service specific information | eSEAL |
| TS 23.434 | 17.1.0 | 0045 | Service identification in location management procedures | eSEAL |
| TS 24.549 | 17.1.0 | 0001 | Authenticate of SNSCE-C identity | eSEAL |
| TS 24.549 | 17.1.0 | 0002 | CoAP encoding | eSEAL |
| TS 24.549 | 17.1.0 | 0003 | CoAP requirements for SNSCE-C | eSEAL |
| TS 24.549 | 17.1.0 | 0004 | CoAP requirements for SNSCE-S | eSEAL |
| TS 24.549 | 17.1.0 | 0005 | Re-order the reference | eSEAL |
| TS 24.549 | 17.1.0 | 0006 | SNSCE client procedure | eSEAL |
| TS 24.549 | 17.1.0 | 0007 | SNSCE server CoAP procedure | eSEAL |
| TS 24.549 | 17.1.0 | 0008 | HTTP parameters | eSEAL |
| TS 24.549 | 17.1.0 | 0009 | Modification of general descriptions | eSEAL |
| TS 24.549 | 17.1.0 | 0010 | SNSCE client HTTP procedure | eSEAL |
| TS 24.549 | 17.1.0 | 0011 | SNSCE server HTTP procedure | eSEAL |
| TS 29.222 | 17.1.0 | 0177 | Missing data type in the CAPIF_API_Provider_Management_API Data Types tables | NBI17 |
| TS 29.222 | 17.1.0 | 0178 | Missing data type in the CAPIF_Routing_Info_API Data Types tables | NBI17 |
| TS 29.222 | 17.1.0 | 0179 | Missing data type in the CAPIF_Security_API Data Types tables | TEI17 |
| TS 29.222 | 17.1.0 | 0180 | Missing data types in the CAPIF_Access_Control_Policy_API Data Types tables | NBI17 |
| TS 29.222 | 17.1.0 | 0181 | Missing data types in the CAPIF_Publish_Service_API Data Types tables | TEI17 |
| TS 29.222 | 17.1.0 | 0185 | SecurityMethod data type incorrectly written some parts of the CAPIF_Publish_Service_API description clause | CAPIF-CT |
| TS 29.222 | 17.1.0 | 0186 | DiscoverService API: Unbreakable spaces and missing "description" field | NBI17 |
| TS 29.222 | 17.1.0 | 0187 | PublishService API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0188 | Events API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0189 | InvokerManagement API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0190 | Security API: Unbreakable space and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0191 | AccessControlPolicy API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0192 | LoggingAPIInvocation API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0193 | Auditing API: Unbreakable spaces | NBI17 |
| TS 29.222 | 17.1.0 | 0194 | AEFSecurity API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0195 | API_Provider_Management API: Missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0196 | RoutingInfo API: Unbreakable spaces and missing "description" fields | NBI17 |
| TS 29.222 | 17.1.0 | 0197 | Correction of the clause subclause terminology | NBI17 |
| TS 29.222 | 17.1.0 | 0198 | Corrections to the CAPIF_API_Invoker_Management_API Data Model clause | NBI17 |
| TS 29.222 | 17.1.0 | 0199 | Corrections to the CAPIF_Auditing_API Data Model clause | NBI17 |
| TS 29.222 | 17.1.0 | 0200 | Corrections to the CAPIF_Events_API Data Model clause | NBI17 |
| TS 29.222 | 17.1.0 | 0201 | Corrections to the CAPIF_Logging_API_Invocation_API Data Model clause | NBI17 |
| TS 29.222 | 17.1.0 | 0202 | Corrections to the CAPIF_Publish_Service_API Data Model clause | NBI17 |
| TS 29.222 | 17.1.0 | 0203 | Corrections to the CAPIF_Security_API Data Model clause | NBI17 |
| TS 29.222 | 17.1.0 | 0204 | Miscellaneous corrections to the CAPIF_Discover_Service_API | NBI17 |
| TS 29.222 | 17.1.0 | 0205 | Miscellaneous corrections to the AEF_Security_API | NBI17 |
| TS 29.222 | 17.1.0 | 0206 | Support of 204 No content response code for service API definition update(NBI17) | NBI17 |
| TS 29.222 | 17.1.0 | 0207 | Support redirection and mandatory error codes for CAPIF APIs | NBI17 |
| TS 29.222 | 17.1.0 | 0208 | Update of OpenAPI version and TS version in externalDocs field | TEI17 |
| TS 23.222 | 17.2.0 | 0077 | Correction for API routing information | eCAPIF |
| TS 23.434 | 17.2.0 | 0037 | Network Slice Capability Management functional model | eSEAL |
| TS 23.434 | 17.2.0 | 0043 | Off-network Location Management | eSEAL |
| TS 23.434 | 17.2.0 | 0047 | Location report timestamp support | eSEAL, UASAPP |
| TS 23.434 | 17.2.0 | 0049 | Update to GMS APIs | eSEAL |
| TS 23.434 | 17.2.0 | 0051 | SEAL support for CoAP | eSEAL |
| TS 23.434 | 17.2.0 | 0052 | Resolve EN for group management | eSEAL |
| TS 23.434 | 17.2.0 | 0053 | Coordinated QoS/resource management for network-assisted UE-to-UE communications | eSEAL, UASAPP |
| TS 23.434 | 17.2.0 | 0054 | eSEAL-Group_Fetch | eSEAL |
| TS 23.434 | 17.2.0 | 0055 | Group Management Enhancements | eSEAL |
| TS 23.434 | 17.2.0 | 0056 | SEAL Location Deviation Service | UASAPP |
| TS 23.434 | 17.2.0 | 0057 | SEAL Event Monitoring Service | UASAPP |
| TS 23.434 | 17.2.0 | 0058 | Requirements for Location management service | eSEAL |
| TS 23.434 | 17.2.0 | 0059 | Supplementary location information to verticals | UASAPP, eSEAL |
| TS 23.434 | 17.2.0 | 0060 | add VAL UE Information to configuration management procedure | eSEAL |
| TS 23.434 | 17.2.0 | 0062 | Complete resource reservation with PCC procedure | SEAL |
| TS 23.434 | 17.2.0 | 0063 | QoS Monitoring support | eSEAL |
| TS 23.434 | 17.2.0 | 0064 | Unified support for TSC/TSN services | eSEAL |
| TS 23.434 | 17.2.0 | 0065 | SEAL enable 5G CN capabilties for SEAL groups | eSEAL |
| TS 23.434 | 17.2.0 | 0066 | SEAL Location Deviation Service Information flows and APIs | UASAPP |
| TS 23.434 | 17.2.0 | 0067 | API and information flow description for Temporary groups | eSEAL |
| TS 23.434 | 17.2.0 | 0069 | Fixing the descriptions of IEs in Information flows for location information | SEAL |
| TS 24.549 | 17.2.0 | 0012 | Added description and overview | eSEAL |
| TS 29.222 | 17.2.0 | 0209 | Correction of cardinality of InvocationLogs in POST request | TEI17, CAPIF-CT |
| TS 29.222 | 17.2.0 | 0210 | Resource URI correction on CAPIF APIs | NBI17 |
| TS 29.222 | 17.2.0 | 0211 | 204 No Content during modification procedure on CAPIF_API_Provider_Management_API | NBI17 |
| TS 29.222 | 17.2.0 | 0212 | Correction of some remaining invalid characters in OpenAPI specification files | NBI17 |
| TS 29.222 | 17.2.0 | 0213 | Updates 204 No Content in CAPIF_API_Invoker_Management_API | NBI17 |
| TS 29.222 | 17.2.0 | 0214 | Update of OpenAPI version and TS version in externalDocs field | TEI17 |
| TS 23.222 | 17.3.0 | 0078 | Support AEF location and API invoker interface for edge application | EDGEAPP |
| TS 23.434 | 17.3.0 | 0075 | Improved Event Monitoring Service | eSEAL |
| TS 23.434 | 17.3.0 | 0076 | Utilize NEF location service for SEAL LM | eSEAL |
| TS 23.434 | 17.3.0 | 0078 | Updates to Location based Group | eSEAL |
| TS 23.434 | 17.3.0 | 0079 | Support for TSC services procedures | eSEAL |
| TS 23.434 | 17.3.0 | 0080 | Support for TSN services procedures | eSEAL |
| TS 23.434 | 17.3.0 | 0081 | Unicast QoS monitoring data retrieval | eSEAL |
| TS 24.549 | 17.3.0 | 0013 | Requirements alignment and miscellaneous corrections | eSEAL |
| TS 29.222 | 17.3.0 | 0215 | AEF location support | EDGEAPP |
| TS 29.222 | 17.3.0 | 0216 | Alignment with SA3 supported TLS profiles | eCryptPr |
| TS 29.222 | 17.3.0 | 0217 | Update of OpenAPI version and TS version in externalDocs field | TEI17 |
| TS 23.222 | 17.4.0 | 0079 | Clarification of Service-based interfaces interaction within CAPIF | TEI17, CAPIF |
| TS 23.434 | 17.4.0 | 0082 | Corrections to network slice adaptation | eSEAL |
| TS 23.434 | 17.4.0 | 0083 | 5GMARCH_CR_SEAL Group Deletion procedure | 5GMARCH |
| TS 23.434 | 17.4.0 | 0084 | TS 23.434 Replace the NSCM with NSCE to align the terminologies | eSEAL |
| TS 23.434 | 17.4.0 | 0086 | Removal of PCP from TSC stream discovery | eSEAL |
| TS 23.434 | 17.4.0 | 0087 | Add missing location area monitoring API | eSEAL |
| TS 24.549 | 17.4.0 | 0045 | Avoid implementingthe methods from this release | eSEAL |
| TS 29.222 | 17.4.0 | 0218 | Clarify the query logic for API invoker id | NBI17 |
| TS 29.222 | 17.4.0 | 0221 | Correct inconsistencies | CAPIF-CT |
| TS 29.222 | 17.4.0 | 0222 | Obtain security info with API ID | NBI17 |
| TS 29.222 | 17.4.0 | 0223 | Clarification about building the apiRoot of a discovered API | NBI17 |
| TS 29.222 | 17.4.0 | 0224 | Support PATCH for the update of an API Provider Domain Registration resource. | NBI17 |
| TS 29.222 | 17.4.0 | 0225 | Support PATCH for the update of an On-boarded API resource | NBI17 |
| TS 29.222 | 17.4.0 | 0226 | Support PATCH for the update of an APF published API resource | NBI17 |
| TS 29.222 | 17.4.0 | 0227 | Update of info and externalDocs fields | TEI17 |
| TS 23.222 | 17.5.0 | 0082 | API provider management API | eCAPIF |
| TS 23.434 | 17.5.0 | 0089 | Clarify the VAL UE ID | eSEAL |
| TS 23.434 | 17.5.0 | 0092 | Correct QoS monitoring service | eSEAL |
| TS 23.434 | 17.5.0 | 0093 | Correct TSC stream availability discovery | eSEAL |
| TS 29.222 | 17.5.0 | 0230 | Resolving the naming convention issues | NBI17 |
| TS 29.222 | 17.5.0 | 0231 | Token request error | NBI17 |
| TS 29.222 | 17.5.0 | 0232 | CAPIF_Discover_Service_API: formatting of preferred-aef-loc query parameter | NBI17 |
| TS 29.222 | 17.5.0 | 0233 | Resource URI overview and apiVersion placeholder | NBI17 |
| TS 29.222 | 17.5.0 | 0234 | OpenAPI long descriptions | NBI17 |
| TS 29.222 | 17.5.0 | 0237 | Correcting the data type of the APF identifier | CAPIF-CT |
| TS 29.222 | 17.5.0 | 0240 | Correcting the data type of the service API Identifier | CAPIF-CT |
| TS 29.222 | 17.5.0 | 0243 | Correcting query parameters names in the CAPIF_Security_API | CAPIF-CT |
| TS 29.222 | 17.5.0 | 0244 | Missing definition of the AccessTokenErr data type in the main body | NBI17 |
| TS 29.222 | 17.5.0 | 0247 | Correct token request content type | CAPIF-CT |
| TS 29.222 | 17.5.0 | 0248 | Update of info and externalDocs fields | TEI17 |
| TS 23.222 | 17.6.0 | 0084 | Corrections to API invoker onboarding/offboarding in TS 23.222 | CAPIF |
| TS 23.434 | 17.6.0 | 0095 | Minor corrections on network resource management for 5G TSC | eSEAL |
| TS 23.434 | 17.6.0 | 0099 | Minor essential corrections to TS 23.434 | eSEAL |
| TS 23.434 | 17.6.0 | 0102 | QoS monitoring clarification | eSEAL |
| TS 29.222 | 17.6.0 | 0251 | Corrections to the references for URI structure from TS 29.501 to TS 29.122. | NBI17 |
| TS 29.222 | 17.6.0 | 0252 | Update of info and externalDocs fields | TEI17 |
| TS 23.222 | 17.7.0 | 0089 | Corrections to API invoker onboarding/offboarding in TS 23.222 | CAPIF |
| TS 23.434 | 17.7.0 | 0107 | EN resolution for network slice adaptation request | eSEAL |
| TS 23.434 | 17.7.0 | 0114 | Correction to location management information flow | eSEAL |
| TS 29.222 | 17.7.0 | 0262 | Corrections for CAPIF_API_Invoker_Management_API | CAPIF-CT |
| TS 29.222 | 17.7.0 | 0266 | Add the missing status code for CAPIF_API_Invoker_Management_API | NBI17 |
| TS 29.222 | 17.7.0 | 0267 | Corrections for data type of CAPIF services | CAPIF-CT |
| TS 29.222 | 17.7.0 | 0270 | Corrections on Enumeration Protocol for CAPIF_Publish_Service_API | CAPIF-CT |
| TS 29.222 | 17.7.0 | 0273 | Corrections on POST request body for CAPIF_Logging_API_Invocation_API | CAPIF-CT |
| TS 29.222 | 17.7.0 | 0276 | Corrections on resource URI for CAPIF_Discover_Service_API | CAPIF-CT |
| TS 29.222 | 17.7.0 | 0279 | Corrections on Time Range List for CAPIF_Access_Control_Policy_API | CAPIF-CT |
| TS 29.222 | 17.7.0 | 0284 | Update of info and externalDocs fields | TEI17 |
| TS 23.222 | 17.8.0 | 0121 | Editoral corrections | eCAPIF, TEI17 |
| TS 23.222 | 17.8.0 | 0135 | API Description Correction | eCAPIF |
| TS 23.222 | 17.8.0 | 0140 | Security API corrections | CAPIF |
| TS 23.434 | 17.8.0 | 0201 | Create_Group service operation in the SS_GroupManagement API | SEAL |
| TS 29.222 | 17.8.0 | 0293 | Corrections for CAPIF_Auditing_API | CAPIF-CT |
| TS 23.434 | 17.9.0 | 0240 | Notification service operation in the SS_LocationReporting API | SEAL |
| TS 23.434 | 17.9.0 | 0242 | Correction of the TSC stream creation request | eSEAL |
| TS 23.434 | 17.9.0 | 0249 | Corrections to Location-based group creation request Information flow | eSEAL |
| TS 23.434 | 17.9.0 | 0252 | Corrections to the Information flows and APIs for Group Management | SEAL |
| TS 23.434 | 17.9.0 | 0255 | Corrections to the information flows related to CM | SEAL |
| TS 23.434 | 17.9.0 | 0258 | Subscription procedure for group membership changes is missing | SEAL |
| TS 23.434 | 17.9.0 | 0279 | Group configuration data unsubscribe | SEAL |
| TS 23.434 | 17.9.0 | 0281 | Group configuration data subscription update | SEAL |
| TS 29.222 | 17.9.0 | 0369 | Corrections to feature negotiation support for the CAPIF_Discover_Service_API | eCAPIF |
| TS 29.222 | 17.9.0 | 0375 | Correction for Provider management API | eCAPIF |
| TS 29.222 | 17.9.0 | 0382 | Update of info and externalDocs fields | TEI17 |
| TS 23.434 | 17.10.0 | 0283 | UE identifiers correction in the SS_LocationAreaInfoRetrieval API | eSEAL |
| TS 23.434 | 17.10.0 | 0289 | Correct IE presence condition | eSEAL |
| TS 29.222 | 17.10.0 | 0464 | Correction of outputParameters attribute in Log data type | CAPIF-CT |
| TS 23.434 | 17.11.0 | 0294 | Solve EN in location info request | eSEAL |
| TS 29.222 | 17.11.0 | 0477 | Wrong service operation name in CAPIF_Auditing_API | CAPIF-CT |

</details>

### Release 16

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [5G_CIoT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830039) | CT3 aspects of 5G_CIoT | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.122, TS 29.522, TS 29.525, TS 29.512, TS 29.513, TS 29.514) | Complete, Mar 2020 | [CP-200147](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_87e/Docs/CP-200147.zip) |
| [eNAPIs](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=840013) | Enhancement of 3GPP Northbound APIs | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.122, TS 29.522, TS 29.116) | Complete, Mar 2020 | [CP-193175](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_86_Sitges/Docs/CP-193175.zip) |
| [eNAPIs](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=850053) | CT3 aspects of eNAPIs | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.122, TS 29.522, TS 29.116) | Complete, Mar 2020 | [CP-193175](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_86_Sitges/Docs/CP-193175.zip) |
| [eNAPIs](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=850059) | CT4 aspects of eNAPIs | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.122, TS 29.522, TS 29.116) | Complete, Mar 2020 | [CP-193175](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_86_Sitges/Docs/CP-193175.zip) |
| [eCAPIF](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830069) | Enhancements for Common API Framework for 3GPP Northbound APIs | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) | Complete, Mar 2020 | [SP-181137](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_82/Docs/SP-181137.zip) |
| [eCAPIF](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=790022) | Stage 2 for eCAPIF | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) | Complete, Jun 2019 | [SP-181137](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_82/Docs/SP-181137.zip) |
| [eCAPIF](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=850008) | CT aspects of eCAPIF | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) | Complete, Mar 2020 | [CP-192254](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_85_Newport_Beach/Docs/CP-192254.zip) |

<details>
<summary>161 change requests and 1 version without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.222 | 16.0.0 | 0012 | Architecture functional model to support multiple API providers | eCAPIF |
| TS 23.222 | 16.0.0 | 0015 | Service API publish and discovery requirements for 3rd party API providers | eCAPIF |
| TS 23.222 | 16.0.0 | 0016 | Charging requirements for 3rd party API providers | eCAPIF |
| TS 23.222 | 16.0.0 | 0017 | OAM requirements for 3rd party API providers | eCAPIF |
| TS 23.222 | 16.0.0 | 0018 | CAPIF interconnection requirements | eCAPIF |
| TS 23.222 | 16.0.0 | 0020 | CAPIF-Updating representation of deployment models | eCAPIF |
| TS 23.434 | 16.0.0 |  | MCC Editorial update for publication after TSG SA approval (SA#84) |  |
| TS 29.222 | 16.0.0 | 0093 | Northbound API registration and discovery | eNAPIs |
| TS 23.222 | 16.1.0 | 0021 | Integrated CAPIF with 3GPP EPS and 5GS network exposure | eCAPIF |
| TS 23.222 | 16.1.0 | 0022 | Enhancement to the functional model deployments | eCAPIF |
| TS 23.222 | 16.1.0 | 0023 | Enhancement to reference points for eCAPIF | eCAPIF |
| TS 23.222 | 16.1.0 | 0029 | Update API naming convention | CAPIF |
| TS 23.222 | 16.1.0 | 0030 | Alignment of APIs | CAPIF |
| TS 23.222 | 16.1.0 | 0031 | Alignment to SA3 CAPIF TS | CAPIF |
| TS 23.222 | 16.1.0 | 0032 | Alignment to SA3 authentication procedure | CAPIF |
| TS 23.222 | 16.1.0 | 0033 | Functional architecture for CAPIF interconnection | eCAPIF |
| TS 23.434 | 16.1.0 | 0001 | Architecture requirements group management | SEAL |
| TS 23.434 | 16.1.0 | 0002 | Group announcement and join | SEAL |
| TS 23.434 | 16.1.0 | 0003 | Corrections to network resource management procedures | SEAL |
| TS 23.434 | 16.1.0 | 0004 | N5 reference point description | SEAL |
| TS 23.434 | 16.1.0 | 0006 | Change of service-based interface representation of the functional model for SEAL | SEAL |
| TS 23.434 | 16.1.0 | 0007 | Remove EN on bearer type identification | SEAL |
| TS 23.434 | 16.1.0 | 0008 | Remove EN on granularity of decision of NRM server | SEAL |
| TS 29.222 | 16.1.0 | 0095 | Correct cardinality in event API | CAPIF-CT |
| TS 29.222 | 16.1.0 | 0096 | Detailed information in CAPIF event notification | eNAPIs |
| TS 29.222 | 16.1.0 | 0097 | Reference update: RFC 8259 | eNAPIs |
| TS 29.222 | 16.1.0 | 0101 | Updates to Service Architecture and functional entities | eCAPIF |
| TS 29.222 | 16.1.0 | 0103 | Clause reference corrections | CAPIF-CT |
| TS 29.222 | 16.1.0 | 0105 | Conventions for Open API specification files | CAPIF-CT |
| TS 29.222 | 16.1.0 | 0106 | Update-to-Service-Architecture | eCAPIF |
| TS 29.222 | 16.1.0 | 0107 | Update-to-Service-API-Publish | eCAPIF |
| TS 29.222 | 16.1.0 | 0108 | Interconnection-Service-API-Publish | eCAPIF |
| TS 29.222 | 16.1.0 | 0109 | Update-to-Discover-Service-API | eCAPIF |
| TS 29.222 | 16.1.0 | 0111 | Supported feature in API publish service | eNAPIs |
| TS 29.222 | 16.1.0 | 0112 | API invoker details update – Service Definition | eCAPIF |
| TS 29.222 | 16.1.0 | 0113 | API invoker details update – API Definition | eCAPIF |
| TS 29.222 | 16.1.0 | 0114 | API Provider Registration and Update – Service Definition | eCAPIF |
| TS 29.222 | 16.1.0 | 0115 | API Provider Registration and Update – API Definition | eCAPIF |
| TS 29.222 | 16.1.0 | 0116 | Support for 3rd party API provider domain | eCAPIF |
| TS 29.222 | 16.1.0 | 0118 | Correct the notificationDestination of ServiceSecurity object in yaml file | CAPIF-CT |
| TS 29.222 | 16.1.0 | 0120 | Align the API name of Initiate_Authentication | CAPIF-CT |
| TS 29.222 | 16.1.0 | 0121 | Update of API version and TS version in OpenAPI file | TEI16 |
| TS 23.222 | 16.2.0 | 0034 | Topology hiding enhancement | eCAPIF |
| TS 23.222 | 16.2.0 | 0035 | API publish and API discover for CAPIF interconnection | eCAPIF |
| TS 23.222 | 16.2.0 | 0036 | Architectural requirements for identities | eCAPIF |
| TS 23.222 | 16.2.0 | 0038 | Architectural requirements for provider domain entities interaction | eCAPIF |
| TS 23.222 | 16.2.0 | 0039 | Update API invoker API list | eCAPIF |
| TS 23.222 | 16.2.0 | 0043 | API invoker's onboarding response rel16 | CAPIF |
| TS 23.434 | 16.2.0 | 0009 | Corrections to naming and other fixes | SEAL |
| TS 23.434 | 16.2.0 | 0010 | Result element missing | SEAL |
| TS 23.434 | 16.2.0 | 0011 | Anonymous requests | SEAL |
| TS 23.434 | 16.2.0 | 0012 | No multicast resource management in 5GS | SEAL |
| TS 23.434 | 16.2.0 | 0013 | Mention of SA3 responsibility in a published TS is not relevant. | SEAL |
| TS 23.434 | 16.2.0 | 0014 | SEAL APIs corrections | SEAL |
| TS 23.434 | 16.2.0 | 0015 | Update to location configuration procedure | SEAL |
| TS 29.222 | 16.2.0 | 0123 | Published API path | eCAPIF |
| TS 29.222 | 16.2.0 | 0124 | API Invoker Udpate – Event Updates | eCAPIF |
| TS 29.222 | 16.2.0 | 0125 | API Provider Management – Open API | eCAPIF |
| TS 29.222 | 16.2.0 | 0126 | 29.222 Rel-16 Update of OpenAPI version and TS version in externalDocs field | TEI16 |
| TS 23.222 | 16.3.0 | 0044 | Update procedures with topology hidding | eCAPIF |
| TS 23.222 | 16.3.0 | 0045 | API sharing for CCF interconnection | eCAPIF |
| TS 23.222 | 16.3.0 | 0046 | API invocation request routing with topology hiding | eCAPIF |
| TS 23.222 | 16.3.0 | 0048 | Interactions between API exposing functions | eCAPIF |
| TS 23.222 | 16.3.0 | 0049 | Service API discovery involving multiple CCFs | eCAPIF |
| TS 23.222 | 16.3.0 | 0050 | Multiple CCFs deployment in a PLMN trust domain | eCAPIF |
| TS 23.222 | 16.3.0 | 0051 | Service API discover for CAPIF interconnection | eCAPIF |
| TS 23.222 | 16.3.0 | 0052 | Architectural requirements for registration of API provider domain functions | eCAPIF |
| TS 23.222 | 16.3.0 | 0053 | Procedures for registration of API provider domain functions | eCAPIF |
| TS 23.222 | 16.3.0 | 0054 | Updates to AEF procedures for 3rd party trust domain | eCAPIF |
| TS 23.222 | 16.3.0 | 0055 | Updates to APF procedures for 3rd party trust domain | eCAPIF |
| TS 23.222 | 16.3.0 | 0056 | Updates to AMF procedures for 3rd party trust domain | eCAPIF |
| TS 23.222 | 16.3.0 | 0057 | Updates to CAPIF events procedures for 3rd party trust domain | eCAPIF |
| TS 23.434 | 16.3.0 | 0016 | Complete SS_NetworkResourceAdaptation API | SEAL |
| TS 23.434 | 16.3.0 | 0017 | Correct dynamic MBMS bearer establishment | SEAL |
| TS 23.434 | 16.3.0 | 0019 | MBMS procedures alignment | SEAL |
| TS 29.222 | 16.3.0 | 0128 | Service description and operations for CAPIF_API_Routing_Policy_API | eCAPIF |
| TS 29.222 | 16.3.0 | 0129 | API definition for CAPIF_API_Routing_Policy_API | eCAPIF |
| TS 29.222 | 16.3.0 | 0130 | API Topology hiding | eCAPIF |
| TS 29.222 | 16.3.0 | 0131 | API Provider management API attribute name optimization | eCAPIF |
| TS 29.222 | 16.3.0 | 0133 | Correct API publish procedure | CAPIF-CT |
| TS 29.222 | 16.3.0 | 0135 | Correct ServiceAPIDescription | eCAPIF |
| TS 29.222 | 16.3.0 | 0136 | Correct service API discovery in interconnection | eCAPIF |
| TS 29.222 | 16.3.0 | 0137 | Correct shareable information | eCAPIF |
| TS 29.222 | 16.3.0 | 0138 | Correct the supported features in the published API | eNAPIs |
| TS 29.222 | 16.3.0 | 0139 | Update general subclause for OpenAPI specification | eNAPIs |
| TS 29.222 | 16.3.0 | 0140 | URI of the CAPIF APIs | eNAPIs |
| TS 29.222 | 16.3.0 | 0141 | Add API category in discovery | eCAPIF |
| TS 29.222 | 16.3.0 | 0142 | Optionality of ProblemDetails | eNAPIs |
| TS 29.222 | 16.3.0 | 0144 | Clause and reference point correction | CAPIF-CT |
| TS 29.222 | 16.3.0 | 0145 | Align interface names | eCAPIF |
| TS 29.222 | 16.3.0 | 0146 | Supported headers, Resource Data type, Operation Name and yaml mapping | eNAPIs |
| TS 29.222 | 16.3.0 | 0147 | Update of OpenAPI version and TS version in externalDocs field | TEI16 |
| TS 29.222 | 16.3.0 | 0149 | Required attribute corrections to CAPIF Open APIs | CAPIF-CT |
| TS 23.222 | 16.4.0 | 0058 | Clarification to routing rule of service API invocation | eCAPIF |
| TS 23.222 | 16.4.0 | 0059 | Functional model update with reference points | eCAPIF |
| TS 23.222 | 16.4.0 | 0060 | Update to Service API publish for CAPIF interconnection | eCAPIF |
| TS 23.222 | 16.4.0 | 0061 | Serving area and domain of service API for CAPIF interconnection | eCAPIF |
| TS 23.222 | 16.4.0 | 0062 | 3rd party trust domain with network exposure and charging aspects of 3GPP systems | eCAPIF |
| TS 23.222 | 16.4.0 | 0063 | Interface based representation of CAPIF architecture | eCAPIF |
| TS 23.434 | 16.4.0 | 0021 | Align the Group Management API operation name with CT3 | SEAL |
| TS 23.434 | 16.4.0 | 0022 | Clarification and correction on media direction mode | SEAL |
| TS 29.222 | 16.4.0 | 0151 | Missing and inconsistent “apiVersion” notations and Location header | eCAPIF |
| TS 29.222 | 16.4.0 | 0152 | CAPIF Routing Info API corrections | eCAPIF |
| TS 29.222 | 16.4.0 | 0153 | CAPIF topology hiding correction | eCAPIF |
| TS 29.222 | 16.4.0 | 0155 | Correct CAPIF security API | CAPIF-CT |
| TS 29.222 | 16.4.0 | 0157 | Correct api invoker certificate in onboarding | CAPIF-CT |
| TS 29.222 | 16.4.0 | 0158 | 29.222 Rel-16 Update of OpenAPI version and TS version in externalDocs field | TEI16 |
| TS 23.222 | 16.5.0 | 0064 | Clarification and alignment with publish request information flows | eCAPIF |
| TS 23.434 | 16.5.0 | 0023 | Multiple trigger configurations | SEAL |
| TS 23.434 | 16.5.0 | 0024 | Clarifications on MBMS listening status uage | SEAL |
| TS 23.434 | 16.5.0 | 0025 | Correct SEAL location API operations | SEAL |
| TS 23.434 | 16.5.0 | 0026 | Correction to NRM unicast procedures | SEAL |
| TS 29.222 | 16.5.0 | 0160 | TS 29.222 Essential Corrections and alignments | SBIProtoc16 |
| TS 29.222 | 16.5.0 | 0162 | Correct inconsistency in SecurityNotification | CAPIF-CT |
| TS 29.222 | 16.5.0 | 0163 | Storage of YAML files in 3GPP Forge | SBIProtoc16 |
| TS 23.222 | 16.6.0 | 0065 | Correction on usage of service API information in access control message | eCAPIF |
| TS 23.434 | 16.6.0 | 0029 | Clarification on group join notification | SEAL |
| TS 23.434 | 16.6.0 | 0030 | Resolution of ENs on security aspects | SEAL |
| TS 23.434 | 16.6.0 | 0033 | Clarifications for T8 interface | SEAL |
| TS 23.434 | 16.6.0 | 0036 | Correction to Location notification to VAL server | SEAL |
| TS 29.222 | 16.6.0 | 0164 | CAPIF_Security API externalDocs version correction | TEI16 |
| TS 23.222 | 16.7.0 | 0066 | Shared CAPIF provider domain info in interconnection | eCAPIF |
| TS 23.434 | 16.7.0 | 0068 | Fixing the descriptions of IEs in Information flows for location information | SEAL |
| TS 23.434 | 16.7.0 | 0072 | Complete resource reservation with PCC procedure | SEAL |
| TS 29.222 | 16.7.0 | 0184 | SecurityMethod data type incorrectly written some parts of the CAPIF_Publish_Service_API description clause | CAPIF-CT |
| TS 23.222 | 16.8.0 | 0068 | Add consumer for discover and publish service APIs | eCAPIF |
| TS 23.222 | 16.8.0 | 0070 | Add obtaining routing info service API | eCAPIF |
| TS 23.222 | 16.8.0 | 0072 | Correct API topology hiding | eCAPIF |
| TS 23.222 | 16.8.0 | 0074 | Correction for CAPIF interconnection Ies | eCAPIF |
| TS 23.434 | 16.8.0 | 0200 | Create_Group service operation in the SS_GroupManagement API | SEAL |
| TS 29.222 | 16.8.0 | 0220 | Correct inconsistencies | CAPIF-CT |
| TS 29.222 | 16.8.0 | 0229 | Update of the info and externalDocs fields | TEI16 |
| TS 23.222 | 16.9.0 | 0076 | Correction for API routing information | eCAPIF |
| TS 23.434 | 16.9.0 | 0239 | Notification service operation in the SS_LocationReporting API | SEAL |
| TS 23.434 | 16.9.0 | 0251 | Corrections to the Information flows and APIs for Group Management | SEAL |
| TS 23.434 | 16.9.0 | 0254 | Corrections to the information flows related to CM | SEAL |
| TS 23.434 | 16.9.0 | 0257 | Subscription procedure for group membership changes is missing | SEAL |
| TS 23.434 | 16.9.0 | 0278 | Group configuration data unsubscribe | SEAL |
| TS 23.434 | 16.9.0 | 0280 | Group configuration data subscription update | SEAL |
| TS 29.222 | 16.9.0 | 0236 | Correcting the data type of the APF identifier | CAPIF-CT |
| TS 29.222 | 16.9.0 | 0239 | Correcting the data type of the service API Identifier | CAPIF-CT |
| TS 29.222 | 16.9.0 | 0242 | Correcting query parameters names in the CAPIF_Security_API | CAPIF-CT |
| TS 29.222 | 16.9.0 | 0246 | Correct token request content type | CAPIF-CT |
| TS 29.222 | 16.9.0 | 0249 | Update of info and externalDocs fields | TEI16 |
| TS 23.222 | 16.10.0 | 0081 | API provider management API | eCAPIF |
| TS 29.222 | 16.10.0 | 0261 | Corrections for CAPIF_API_Invoker_Management_API | CAPIF-CT |
| TS 29.222 | 16.10.0 | 0269 | Corrections on Enumeration Protocol for CAPIF_Publish_Service_API | CAPIF-CT |
| TS 29.222 | 16.10.0 | 0272 | Corrections on POST request body for CAPIF_Logging_API_Invocation_API | CAPIF-CT |
| TS 29.222 | 16.10.0 | 0275 | Corrections on resource URI for CAPIF_Discover_Service_API | CAPIF-CT |
| TS 29.222 | 16.10.0 | 0278 | Corrections on Time Range List for CAPIF_Access_Control_Policy_API | CAPIF-CT |
| TS 29.222 | 16.10.0 | 0281 | Corrections for data type of CAPIF services | CAPIF-CT |
| TS 29.222 | 16.10.0 | 0283 | Update of info and externalDocs fields | TEI16 |
| TS 23.222 | 16.11.0 | 0083 | Corrections to API invoker onboarding/offboarding in TS 23.222 | CAPIF |
| TS 29.222 | 16.11.0 | 0292 | Corrections for CAPIF_Auditing_API | CAPIF-CT |
| TS 23.222 | 16.12.0 | 0088 | Corrections to API invoker onboarding/offboarding in TS 23.222 | CAPIF |
| TS 29.222 | 16.12.0 | 0368 | Corrections to feature negotiation support for the CAPIF_Discover_Service_API | eCAPIF |
| TS 29.222 | 16.12.0 | 0374 | Correction for Provider management API | eCAPIF |
| TS 29.222 | 16.12.0 | 0385 | Update of info and externalDocs fields | TEI16 |
| TS 23.222 | 16.13.0 | 0134 | API Description Correction | eCAPIF |
| TS 23.222 | 16.13.0 | 0139 | Security API corrections | CAPIF |
| TS 29.222 | 16.13.0 | 0463 | Correction of outputParameters attribute in Log data type | CAPIF-CT |
| TS 29.222 | 16.14.0 | 0476 | Wrong service operation names in CAPIF_Auditing_API | CAPIF-CT |

</details>

### Release 15

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [CAPIF](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=770049) | Common API Framework for 3GPP Northbound APIs | Normative | [TS 23.222](https://www.3gpp.org/dynareport/23222.htm) | Complete, Jun 2018 | [SP-170798](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_77/Docs/SP-170798.zip) |
| [CAPIF-CT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=790042) | Stage 3 of CAPIF | Normative | [TS 29.222](https://www.3gpp.org/dynareport/29222.htm) (with TS 29.122, TS 29.116) | Complete, Jun 2018 | [CP-180151](https://www.3gpp.org/ftp/tsg_ct/TSG_CT/TSGC_79_Chennai/Docs/CP-180151.zip) |

<details>
<summary>137 change requests and 2 versions without one</summary>

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TS 23.222 | 15.0.0 |  | MCC Editorial update for publication after TSG SA approval (SA#78) |  |
| TS 29.222 | 15.0.0 |  | TS approved by plenary |  |
| TS 23.222 | 15.1.0 | 0001 | Use of specific ETSI and OMA references | CAPIF |
| TS 23.222 | 15.1.0 | 0002 | Corrections for CAPIF-1e and CAPIF-2e | CAPIF |
| TS 23.222 | 15.1.0 | 0003 | Miscellaneous corrections to procedures and information flows | CAPIF |
| TS 23.222 | 15.1.0 | 0004 | Addition of offboarding to functional entities and reference points description | CAPIF |
| TS 23.222 | 15.1.0 | 0005 | Editorial corrections | CAPIF |
| TS 23.222 | 15.1.0 | 0006 | Solution to EN on revoking authorization based on access control | CAPIF |
| TS 23.222 | 15.1.0 | 0007 | Configuration items for CAPIF | CAPIF |
| TS 23.222 | 15.1.0 | 0008 | Update to CAPIF relationship with 3GPP EPS and 5GS | CAPIF |
| TS 23.222 | 15.1.0 | 0009 | Solution to EN on policy synchronization | CAPIF |
| TS 23.222 | 15.1.0 | 0010 | CAPIF utilization by service APIs | CAPIF |
| TS 23.222 | 15.1.0 | 0011 | Proposal for definition for PLMN trust domain | CAPIF |
| TS 29.222 | 15.1.0 | 0001 | 29222 Rel-15 clause 4 - Overview | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0003 | Editorial Changes to CAPIF Publish Service API subclause | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0004 | Changes to CAPIF Events API subclause | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0005 | Changes to CAPIF API Invoker Management API subclause | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0006 | Editorial Changes to CAPIF Authentication Authorization API subclause | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0007 | Update to data types for ServiceAPIDescription and APIQuery | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0008 | Definition of CAPIF_Access_Control_Policy_API, and OpenAPI schema | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0009 | CAPIF_Events_API OpenAPI schema | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0010 | AEF_Authentication_API OpenAPI schema | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0011 | CAPIF_Discover_Service API - Corrections | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0012 | CAPIF_Discover_Service API - OpenAPI file | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0013 | CAPIF_Publish_Service API - Corrections and OpenAPI file | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0014 | AEF_Authentication API - Editor's notes | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0015 | Corrections to data types | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0016 | API Invoker's Information in APIInvokerEnrolmentDetails | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0017 | Corrections to OnboardingInformation data type | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0018 | Security method preference | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0019 | Clarifications to Obtain_API_Invoker_Info service operation | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0020 | Subscribed and Subscribing functional entity | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0021 | Miscellaneous corrections | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0023 | Definitions and abbreviations | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0024 | Referenced data types and enumerations | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0025 | CAPIF_Security_API OpenAPI schema | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0026 | CAPIF discovery service API – API invoker retrieves API information using GET | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0028 | CAPIF_Auditing_API – API management function retrieves API information logs using GET – OpenAPI document | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0029 | API Names changes in clause 5 | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0030 | Change security-related API names in clause 8 and 10 | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0031 | Describe response code 202 for Onboard_API_Invoker POST method | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0032 | Correct cardinality for onboardingNotificationDestination | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0033 | Correct cardinality for securityNotificationDestination | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0034 | Correct protocol type in Interface Description | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0036 | Query parameter in retrieving access control | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0037 | Authorization endpoint and token request | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0038 | CAPIF events | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0040 | Resource figures | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0041 | CAPIF_Auditing_API - 'query' custom operation | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0042 | OpenAPI - CAPIF_API_Invoker_Management API | CAPIF-CT |
| TS 29.222 | 15.1.0 | 0043 | OpenAPI - CAPIF_Logging_API_Invocation API | CAPIF-CT |
| TS 23.222 | 15.2.0 | 0013 | Correction for the details of service API information | CAPIF |
| TS 23.222 | 15.2.0 | 0014 | Correction for usage of service API identification information | CAPIF |
| TS 23.222 | 15.2.0 | 0019 | editorial correction of TS 23.222 (CAPIF stage 2) | CAPIF |
| TS 29.222 | 15.2.0 | 0027 | Security adaptation for Nnef northbound APIs with CAPIF |  |
| TS 29.222 | 15.2.0 | 0045 | Correct security API name in subclause 5.6.2.1 | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0046 | Remove Event operations from CAPIF_Publish_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0047 | Correct server definition | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0048 | Correct CAPIF services | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0049 | Correct api name and service name for CAPIF_Publish_Service_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0050 | Correct api name and service name for CAPIF_Discover_Service_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0051 | Correct CAPIF_Publish_Service_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0052 | Correct CAPIF_Discover_Service_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0053 | Correct CAPIF_Logging_API_Invocation_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0054 | Correct CAPIF_Auditing_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0055 | Correct CAPIF_Security_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0057 | Correct CAPIF_Access_Control_Policy_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0058 | supportedFeatures - CAPIF_Discover_Service_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0059 | supportedFeatures 002 - CAPIF_Publish_Service_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0060 | supportedFeatures 003 - CAPIF_Events_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0061 | supportedFeatures 004 - CAPIF_API_Invoker_Management_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0062 | supportedFeatures 005 - CAPIF_Security_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0063 | supportedFeatures - CAPIF_Access_Control_Policy_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0064 | supportedFeatures 007 - CAPIF_Logging_API_Invocation_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0065 | supportedFeatures - CAPIF_Auditing_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0067 | Redundant Editor's note | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0068 | Correct CAPIF_API_Invoker_Management_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0070 | Missing general description in A.1 | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0071 | Update mandatory error status code | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0072 | Correct resource model and add missing functions in CAPIF_Security_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0073 | Obtaining access token in CAPIF | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0074 | Correct resource model and add missing function in AEF_Authentication_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0075 | externalDocs field in OpenAPI documents | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0076 | location header in OpenAPI documents | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0077 | version number in OpenAPI documents | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0078 | corrections to CAPIF_Access_Control_Policy_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0079 | corrections to CAPIF_Logging_API_Invocation_API | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0080 | corrections to EventNotification | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0081 | corrections to theSubscriber | CAPIF-CT |
| TS 29.222 | 15.2.0 | 0082 | remove 'OnboardingRequestAck' data type | CAPIF-CT |
| TS 23.222 | 15.3.0 | 0025 | Update API naming convention | CAPIF |
| TS 23.222 | 15.3.0 | 0026 | Alignment of APIs | CAPIF |
| TS 23.222 | 15.3.0 | 0027 | Alignment to SA3 CAPIF TS | CAPIF |
| TS 23.222 | 15.3.0 | 0028 | Alignment to SA3 authentication procedure | CAPIF |
| TS 29.222 | 15.3.0 | 0083 | Correct GET description for retrieving service API information | CAPIF-CT |
| TS 29.222 | 15.3.0 | 0084 | Correct PUT message for updating service APIs | CAPIF-CT |
| TS 29.222 | 15.3.0 | 0085 | Correct AEF operations related to obtaining security info or revoking API invokers | CAPIF-CT |
| TS 29.222 | 15.3.0 | 0086 | Clarification about obtaining the correct resource in Security APIs | CAPIF-CT |
| TS 29.222 | 15.3.0 | 0089 | Correct several descriptions in clause 8 tables | CAPIF-CT |
| TS 23.222 | 15.4.0 | 0042 | API invoker's onboarding response rel15 | CAPIF |
| TS 29.222 | 15.4.0 | 0090 | Correct CAPIF_Logging_API yaml file | CAPIF-CT |
| TS 29.222 | 15.4.0 | 0091 | Copyright notice in the YAML files | CAPIF-CT |
| TS 29.222 | 15.4.0 | 0092 | API version update | CAPIF-CT |
| TS 23.222 | 15.5.0 | 0085 | Corrections to API invoker onboarding/offboarding in TS 23.222 | CAPIF |
| TS 29.222 | 15.5.0 | 0094 | Correct cardinality in event API | CAPIF-CT |
| TS 29.222 | 15.5.0 | 0102 | Clause reference corrections | CAPIF-CT |
| TS 29.222 | 15.5.0 | 0104 | Conventions for Open API specification files | CAPIF-CT |
| TS 29.222 | 15.5.0 | 0117 | Correct the notificationDestination of ServiceSecurity object in yaml file | CAPIF-CT |
| TS 29.222 | 15.5.0 | 0119 | Align the API name of Initiate_Authentication | CAPIF-CT |
| TS 29.222 | 15.5.0 | 0122 | Update of OpenAPI version and TS version in externalDocs field | TEI15 |
| TS 23.222 | 15.6.0 | 0087 | Corrections to API invoker onboarding/offboarding in TS 23.222 | CAPIF |
| TS 29.222 | 15.6.0 | 0132 | Correct API publish procedure | CAPIF-CT |
| TS 29.222 | 15.6.0 | 0134 | Correct ServiceAPIDescription | CAPIF-CT |
| TS 29.222 | 15.6.0 | 0143 | Clause and reference point correction | CAPIF-CT |
| TS 29.222 | 15.6.0 | 0148 | Required attribute corrections to CAPIF Open APIs | CAPIF-CT |
| TS 29.222 | 15.6.0 | 0150 | Update of OpenAPI version and TS version in externalDocs field | CAPIF-CT |
| TS 23.222 | 15.7.0 | 0138 | Security API corrections | CAPIF |
| TS 29.222 | 15.7.0 | 0154 | Correct CAPIF security API | CAPIF-CT |
| TS 29.222 | 15.7.0 | 0156 | Correct api invoker certificate in onboarding | CAPIF-CT |
| TS 29.222 | 15.7.0 | 0159 | 29.222 Update of OpenAPI version and TS version in externalDocs field | 5GS_Ph1-CT |
| TS 29.222 | 15.8.0 | 0161 | Correct inconsistency in SecurityNotification | CAPIF-CT |
| TS 29.222 | 15.9.0 | 0183 | SecurityMethod data type incorrectly written some parts of the CAPIF_Publish_Service_API description clause | CAPIF-CT |
| TS 29.222 | 15.10.0 | 0219 | Correct inconsistencies | CAPIF-CT |
| TS 29.222 | 15.10.0 | 0228 | Update of the info and externalDocs fields | CAPIF-CT |
| TS 29.222 | 15.11.0 | 0235 | Correcting the data type of the APF identifier | CAPIF-CT |
| TS 29.222 | 15.11.0 | 0238 | Correcting the data type of the service API Identifier | CAPIF-CT |
| TS 29.222 | 15.11.0 | 0241 | Correcting query parameters names in the CAPIF_Security_API | CAPIF-CT |
| TS 29.222 | 15.11.0 | 0245 | Correct token request content type | CAPIF-CT |
| TS 29.222 | 15.11.0 | 0250 | Update of info and externalDocs fields | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0260 | Corrections for CAPIF_API_Invoker_Management_API | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0268 | Corrections on Enumeration Protocol for CAPIF_Publish_Service_API | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0271 | Corrections on POST request body for CAPIF_Logging_API_Invocation_API | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0274 | Corrections on resource URI for CAPIF_Discover_Service_API | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0277 | Corrections on Time Range List for CAPIF_Access_Control_Policy_API | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0280 | Corrections for data type of CAPIF services | CAPIF-CT |
| TS 29.222 | 15.12.0 | 0282 | Update of info and externalDocs fields | CAPIF-CT |
| TS 29.222 | 15.13.0 | 0291 | Corrections for CAPIF_Auditing_API | CAPIF-CT |
| TS 29.222 | 15.14.0 | 0462 | Correction of outputParameters attribute in Log data type | CAPIF-CT |
| TS 29.222 | 15.15.0 | 0475 | Wrong service operation names in CAPIF_Auditing_API | CAPIF-CT |

</details>

### TS 23.222 before change control

<details>
<summary>4 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Oct 2017 | SA6#19 | S6-171274 | TS skeleton | 0.0.0 |
| Oct 2017 | SA6#19 |  | Implementation of the following p-CRs approved by SA6: S6-171444; S6-171343; S6-171445; S6-171446; S6-171466; S6-171448; S6-171348; S6-171449; S6-171359; S6-171467; S6-171451; S6-171452; S6-171362; S6-171463; S6-171356; S6-171355; S6-171453; S6-171454; S6-171455; S6-171464; S6-171468; S6-171350; S6-171349; S6-171407. | 0.1.0 |
| Dec 2017 | SA6#20 |  | Implementation of the following p-CRs approved by SA6: S6-171630; S6-171631; S6-171633; S6-171648; S6-171650; S6-171658; S6-171659; S6-171692; S6-171693; S6-171694; S6-171695; S6-171698; S6-171699; S6-171700; S6-171702; S6-171704; S6-171705; S6-171706; S6-171711; S6-171712; S6-171713; S6-171819; S6-171820; S6-171821; S6-171822; S6-171823; S6-171848; S6-171855; S6-171865; S6-171876. | 0.2.0 |
| Dec 2017 | SA#78 | SP-170901 | Submitted to SA#78 for approval | 1.0.0 |

</details>

### TS 29.222 before change control

<details>
<summary>5 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Mar 2018 | CT3#95 | C3-181278 | TS skeleton of Common API Framework for 3GPP Northbound APIs | 0.0.0 |
| Mar 2018 | CT3#95 | C3-181378 | Inclusion of documents agreed in CT3#95: C3-181281, C3-181282, C3-181283, C3-181284, C3-181285, C3-181286, C3-181287, C3-181321, C3-181322, Rapporteur changes | 0.1.0 |
| Apr 2018 | CT3#96 | C3-182527 | Inclusion of documents agreed in CT3#96: C3-182204, C3-182387, C3-182393, C3-182395, C3-182468, C3-182469, C3-182470, C3-182483, C3-182484, C3-182485 | 0.2.0 |
| May 2018 | CT3#97 |  | Inclusion of documents agreed in CT3#97: C3-183271, C3-183274, C3-183275, C3-183372, C3-183376, C3-183377, C3-183378, C3-183379, C3-183598, C3-183599, C3-183602, C3-183603, C3-183604, C3-183798, C3-183799, C3-183809, C3-183841, C3-183842 | 0.3.0 |
| Jun 2018 | CT#80 | CP-181037 | TS sent to plenary for approval | 1.0.0 |

</details>

### TS 23.434 before change control

<details>
<summary>7 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Jan 2019 | SA6#28 |  | TS skeleton | 0.0.0 |
| Jan 2019 | SA6#28 |  | Implementation of the following pCRs approved by SA6: S6-190283, S6-190284, S6-190285, S6-190301, S6-190210, S6-190286, S6-190272, S6-190287, S6-190295, S6-190215, S6-190296, S6-190297 | 0.1.0 |
| Mar 2019 | SA6#29 |  | Implementation of the following pCRs approved by SA6: S6-190446, S6-190447, S6-190448, S6-190509, S6-190526, S6-190515, S6-190452, S6-190453, S6-190510, S6-190511, S6-190456, S6-190457, S6-190458 | 0.2.0 |
| Mar 2019 | SA#83 | SP-190063 | Presentation for information at SA#83 | 1.0.0 |
| Apr 2019 | SA6#30 |  | Implementation of the following pCRs approved by SA6: S6-190661, S6-190663, S6-190848, S6-190746, S6-190747, S6-190748, S6-190749, S6-190750, S6-190872 | 1.1.0 |
| May 2019 | SA6#31 |  | Implementation of the following pCRs approved by SA6: S6-191003, S6-191115, S6-191005, S6-191116, S6-191117, S6-191007, S6-191189, S6-191212, S6-191121, S6-191012, S6-191229, S6-191191, S6-191124, S6-191013, S6-191192, S6-191193 | 1.2.0 |
| May 2019 | SA#84 | SP-190473 | Presentation for Approval at SA#84 | 2.0.0 |

</details>

### TS 24.549 before change control

<details>
<summary>13 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Aug 2021 | CT1#131-e | C1-214994 | TS skeleton for Network slice capability management - Service Enabler Architecture Layer for Verticals (SEAL); Protocol specification | 0.0.0 |
| Aug 2021 | CT1#131-e | C1-214983 | Network slice capability management procedures | 0.1.0 |
| Aug 2021 | CT1#131-e | C1-214993 | Requirements for functional entities | 0.1.0 |
| Oct 2021 | CT1#132-e | C1-216124 | Correction of event triggered network slice adaptation procedure | 0.2.0 |
| Dec 2021 | CT#94e |  | Creation of version 1.0.0 for CT#94 for information | 1.0.0 |
| Jan 2022 | CT1#133-bis-e | C1-220187 | Definitions of terms and symbols for network slice capability enablement Spec. | 1.1.0 |
| Jan 2022 | CT1#133 | C1-220578 | Network slice adaptation | 1.1.0 |
| Jan 2022 | CT1#133 | C1-220579 | Resolving EN | 1.1.0 |
| Jan 2022 | CT1#133 | C1-220580 | General description for network slice capability enablement Spec | 1.1.0 |
| Jan 2022 | CT1#133 | C1-220581 | Scope for network slice capability enablement Spec | 1.1.0 |
| Jan 2022 | CT1#133 | C1-220618 | Replace management with enablement | 1.1.0 |
| Feb 2022 | CT1#134 | C1-221253 | Clarification on route selection descriptors | 1.2.0 |
| Mar 2022 | CT1#95e | CP-220315 | Specification presented for approval, v2.0.0 | 2.0.0 |

</details>
