---
hide_title: true
title: 5G Multicast Broadcast Services (MBS)
slug: /standards/5g-mbs
sidebar_position: 3
description: Covers 5G Multicast-Broadcast Services architecture across user-service, 5G Core and NR/NG-RAN layers, and lists the related 3GPP specifications.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>5G Multicast Broadcast Services (MBS)</h1>
</div>
</div>

<div class="topic-lead">
5G MBS architecture across the user-service, 5G Core and NR/NG-RAN layers, and the 3GPP specifications behind it.
</div>

## Overview

5G Multicast Broadcast Services (MBS) is the 3GPP 5G System feature for delivering the same content to many devices at once over the 5G core and NR radio. The specifications below are grouped by the layer they define: user-service level, 5G Core network, and NR/NG-RAN. For the technical analysis of how MBS works, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The implementer-facing analysis of the MBS architecture across its three layers.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/5g-mbs">Technical Documentation: Multicast & Broadcast in 5G</a></li>
</ul>
</div>
</div>

</div>

## Specifications by release

- **Release 17** ("5MBS"): Stage 1 (TS 22.261), Stage 2 architecture (TS 23.247, preceded by TR 23.757), user-service layer (TS 26.502, TS 26.517, preceded by TR 26.802), Stage 3 core procedures (TS 29.532, TS 29.537, TS 29.580, TS 29.581), NR/NG-RAN support (TS 38.300 family). Security study: TR 33.850.
- **Release 18** ("5MBS Phase 2"): RAN extensions (`NR_MBS_enh` / `NR_MBS_enh-Core`, WI 940099/940199; see [MBS Multicast Inactive RAN procedures](/tech/5g-mbs/analysis-mbs-multicast-inactive-ran) for the technical detail). Architecture study: TR 23.700-47. Security study: TR 33.883.
- **Release 19**: NTN extensions to MBS broadcast (see [MBS Broadcast NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn) for the technical detail).

Check the version of each specification you are targeting for the exact release content.

## Related 3GPP Specifications

This is a list of specifications in the scope of 5G Multicast Broadcast Services.

### Stage 1

- [TS 22.261](https://www.3gpp.org/dynareport/22261.htm) - Service requirements for the 5G system (clause 6.13, "Flexible broadcast/multicast service")

### MBS User Services

- [TS 26.502](https://www.3gpp.org/dynareport/26502.htm) - 5G Multicast-Broadcast Services; User service architecture
- [TS 26.517](https://www.3gpp.org/dynareport/26517.htm) - 5G Multicast-Broadcast User Services; Protocols and Formats
- [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) - Media delivery; interactions and APIs for provisioning and media session handling
- [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) - Data Collection and Reporting; General Description and Architecture
- [TS 26.532](https://www.3gpp.org/dynareport/26532.htm) - Data Collection and Reporting; Protocols and Formats
- [TS 29.580](https://www.3gpp.org/dynareport/29580.htm) - 5G System; Multicast/Broadcast Service Function services; Stage 3
- [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) - 5G System; Multicast/Broadcast Service Transport Services; Stage 3
- [TS 29.522](https://www.3gpp.org/dynareport/29522.htm) - 5GS; NEF Northbound APIs (MBSSession, MBSUserService, MBSUserDataIngestSession and MBSGroupMsgDelivery APIs, at reference point Nmb5 - AF to MBSF via the NEF)

### 5G Core Network specifications

#### MBS architecture

- [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) - Architectural enhancements for 5G multicast-broadcast services
- [TS 23.501](https://www.3gpp.org/dynareport/23501.htm) - System architecture for the 5G System (5GS) (clause 5.8.2.11, "Support of 5G Multicast and Broadcast Service")
- [TS 23.502](https://www.3gpp.org/dynareport/23502.htm) - Procedures for the 5G System (5GS) (clause 4.3.2.2.1, PDU Session Establishment, reused by TS 23.247 for MBS session join)
- [TS 23.503](https://www.3gpp.org/dynareport/23503.htm) - Policy and charging control framework for the 5G System (5GS); Stage 2
- [TS 23.003](https://www.3gpp.org/dynareport/23003.htm) - Numbering, addressing and identification (TMGI allocation)
- [TS 23.122](https://www.3gpp.org/dynareport/23122.htm) - Non-Access-Stratum (NAS) functions related to Mobile Station (MS) in idle mode
- [TS 23.527](https://www.3gpp.org/dynareport/23527.htm) - 5G System; Restoration procedures

#### Security

- [TS 33.501](https://www.3gpp.org/dynareport/33501.htm) - Security architecture and procedures for 5G System

#### Charging

- [TS 32.279](https://www.3gpp.org/dynareport/32279.htm) - Charging management; 5G Multicast-broadcast Services charging (`5MBS_CH`, WI 1000010, Release 18)

#### Network Function services

- [TS 29.532](https://www.3gpp.org/dynareport/29532.htm) - 5G System; 5G Multicast-Broadcast Session Management Services; Stage 3
- [TS 29.537](https://www.3gpp.org/dynareport/29537.htm) - 5G System; Multicast/Broadcast Policy Control services; Stage 3

##### Supporting Network Function services

Generic 5GS Stage 3 NF service specifications that gained MBS-related operations or data types, rather than being MBS-specific themselves.

- [TS 29.303](https://www.3gpp.org/dynareport/29303.htm) - Domain Name System Procedures; Stage 3
- [TS 29.502](https://www.3gpp.org/dynareport/29502.htm) - 5G System; Session Management Services; Stage 3
- [TS 29.503](https://www.3gpp.org/dynareport/29503.htm) - 5G System; Unified Data Management Services; Stage 3
- [TS 29.504](https://www.3gpp.org/dynareport/29504.htm) - 5G System; Unified Data Repository Services; Stage 3
- [TS 29.505](https://www.3gpp.org/dynareport/29505.htm) - 5G System; Usage of the Unified Data Repository services for Subscription Data; Stage 3
- [TS 29.510](https://www.3gpp.org/dynareport/29510.htm) - 5G System; Network function repository services; Stage 3
- [TS 29.513](https://www.3gpp.org/dynareport/29513.htm) - 5G System; Policy and Charging Control signalling flows and QoS parameter mapping; Stage 3
- [TS 29.518](https://www.3gpp.org/dynareport/29518.htm) - 5G System; Access and Mobility Management Services; Stage 3
- [TS 29.519](https://www.3gpp.org/dynareport/29519.htm) - 5G System; Usage of the Unified Data Repository Service for Policy Data, Application Data and Structured Data for Exposure; Stage 3
- [TS 29.521](https://www.3gpp.org/dynareport/29521.htm) - 5G System; Binding Support Management Service; Stage 3
- [TS 29.561](https://www.3gpp.org/dynareport/29561.htm) - 5G System; Interworking between 5G Network and external Data Networks; Stage 3
- [TS 29.571](https://www.3gpp.org/dynareport/29571.htm) - 5G System; Common Data Types for Service Based Interfaces; Stage 3

#### Protocols

- [TS 29.244](https://www.3gpp.org/dynareport/29244.htm) - Interface between the Control Plane and the User Plane nodes
- [TS 38.413](https://www.3gpp.org/dynareport/38413.htm) - NG-RAN; NG Application Protocol (NGAP)
- [TS 24.501](https://www.3gpp.org/dynareport/24501.htm) - Non-Access-Stratum (NAS) protocol for 5G System (5GS); Stage 3
- [TS 29.281](https://www.3gpp.org/dynareport/29281.htm) - General Packet Radio System (GPRS) Tunnelling Protocol User Plane (GTPv1-U)
- [TS 29.274](https://www.3gpp.org/dynareport/29274.htm) - 3GPP Evolved Packet System (EPS); Evolved GPRS Tunnelling Protocol for Control plane (GTPv2-C); Stage 3 (adds the N19mb interface type in F-TEID for 5GS/EPS interworking of MBS)

#### UE configuration and control

- [TS 24.575](https://www.3gpp.org/dynareport/24575.htm) - 5G System; Multicast/Broadcast UE pre-configuration Management Object (MO) (`UEConfig5MBS`, WI 990078, Release 18)
- [TS 27.007](https://www.3gpp.org/dynareport/27007.htm) - AT command set for User Equipment (UE)

The following table maps each core-network plane to its protocol and the specification that defines it.

##### Control plane

| Protocol                                  | Defining spec |
| ----------------------------------------- | ------------- |
| Packet Forwarding Control Protocol (PFCP) | TS 29.244     |
| NG Application Protocol (NGAP)            | TS 38.413     |
| Non-Access Stratum (NAS)                  | TS 24.501     |

##### User plane

| Protocol                                    | Defining spec |
| -------------------------------------------- | ------------- |
| GPRS Tunnelling Protocol User Plane (GTP-U) | TS 29.281     |

### NR and NG-RAN specifications

- [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) - NR; NR and NG-RAN Overall Description
- [TS 38.401](https://www.3gpp.org/dynareport/38401.htm) - NG-RAN; Architecture description

#### NR

- [TS 38.331](https://www.3gpp.org/dynareport/38331.htm) - NR; Radio Resource Control (RRC) Protocol Specification
- [TS 38.306](https://www.3gpp.org/dynareport/38306.htm) - NR; User Equipment (UE) radio access capabilities (`maxMRB-Add-r17`, `multicastInactive-r18` and other MBS-related capability fields)
- [TS 38.321](https://www.3gpp.org/dynareport/38321.htm) - NR; Medium Access Control (MAC) Protocol Specification
- [TS 38.322](https://www.3gpp.org/dynareport/38322.htm) - NR; Radio Link Control (RLC) Protocol Specification
- [TS 38.323](https://www.3gpp.org/dynareport/38323.htm) - NR; Packet Data Convergence Protocol (PDCP) Specification
- [TS 37.324](https://www.3gpp.org/dynareport/37324.htm) - E-UTRA and NR; Service Data Adaptation Protocol (SDAP) Specification
- [TS 38.211](https://www.3gpp.org/dynareport/38211.htm) - NR; Physical channels and modulation
- [TS 38.212](https://www.3gpp.org/dynareport/38212.htm) - NR; Multiplexing and channel coding
- [TS 38.213](https://www.3gpp.org/dynareport/38213.htm) - NR; Physical layer procedures for control
- [TS 38.214](https://www.3gpp.org/dynareport/38214.htm) - NR; Physical layer procedures for data
- [TS 38.202](https://www.3gpp.org/dynareport/38202.htm) - NR; Services provided by the physical layer
- [TS 38.304](https://www.3gpp.org/dynareport/38304.htm) - NR; User Equipment (UE) procedures in Idle mode and in RRC Inactive state
- [TS 37.340](https://www.3gpp.org/dynareport/37340.htm) - E-UTRA and NR; Multi-connectivity; Overall description; Stage-2

The two tables below list the NR radio protocol layers per plane and the specification that defines each.

##### Control plane

| Layer | Protocol                         | Defining spec                     |
| ----- | --------------------------------- | ---------------------------------- |
| RRC   | Radio Resource Control           | TS 38.331                         |
| PDCP  | Packet Data Convergence Protocol | TS 38.323                         |
| RLC   | Radio Link Control               | TS 38.322                         |
| MAC   | Medium Access Control            | TS 38.321                         |
| PHY   | Physical layer                   | TS 38.211, 38.212, 38.213, 38.214 |

##### User plane

| Layer | Protocol                         | Defining spec                     |
| ----- | --------------------------------- | ---------------------------------- |
| SDAP  | Service Data Adaptation Protocol | TS 37.324                         |
| PDCP  | Packet Data Convergence Protocol | TS 38.323                         |
| RLC   | Radio Link Control               | TS 38.322                         |
| MAC   | Medium Access Control            | TS 38.321                         |
| PHY   | Physical layer                   | TS 38.211, 38.212, 38.213, 38.214 |

#### NG-RAN

- [TS 38.420](https://www.3gpp.org/dynareport/38420.htm) - NG-RAN; Xn general aspects and principles
- [TS 38.423](https://www.3gpp.org/dynareport/38423.htm) - NG-RAN; Xn Application Protocol (XnAP)
- [TS 38.410](https://www.3gpp.org/dynareport/38410.htm) - NG-RAN; NG general aspects and principles
- [TS 38.413](https://www.3gpp.org/dynareport/38413.htm) - NG-RAN; NG Application Protocol (NGAP)
- [TS 38.470](https://www.3gpp.org/dynareport/38470.htm) - NG-RAN; F1 general aspects and principles
- [TS 38.473](https://www.3gpp.org/dynareport/38473.htm) - NG-RAN; F1 application protocol (F1AP)
- [TS 38.472](https://www.3gpp.org/dynareport/38472.htm) - NG-RAN; F1 signalling transport
- [TS 38.460](https://www.3gpp.org/dynareport/38460.htm) - NG-RAN; E1 general aspects and principles
- [TS 38.463](https://www.3gpp.org/dynareport/38463.htm) - NG-RAN; E1 application protocol (E1AP) (gNB-only CU-CP/CU-UP split)
- [TS 37.483](https://www.3gpp.org/dynareport/37483.htm) - E1 application protocol (E1AP) (generalised, from Rel-17, also covers en-gNB/eNB/ng-gNB CU-CP/CU-UP splits)
- [TS 37.480](https://www.3gpp.org/dynareport/37480.htm) - E1 general aspects and principles (generalised counterpart to TS 38.460)
- [TS 37.482](https://www.3gpp.org/dynareport/37482.htm) - E1 signalling transport (generalised counterpart to TS 38.462)
- [TS 38.415](https://www.3gpp.org/dynareport/38415.htm) - NG-RAN; PDU Session User Plane Protocol
- [TS 38.425](https://www.3gpp.org/dynareport/38425.htm) - NG-RAN; NR user plane protocol

##### Interfaces

| Interface | Specifications | Connects |
| --- | --- | --- |
| Xn | TS 38.420, TS 38.423 | gNB to gNB |
| NG | TS 38.410, TS 38.413 | gNB to core (NG-c = N2 to AMF, NG-u = N3 to UPF) |
| F1 | TS 38.470, TS 38.473 | CU to DU |
| E1 | TS 38.460, TS 38.463 | CU-CP to CU-UP |

### Study reports

The normative specifications above were preceded by 3GPP study reports (TRs), kept here for traceability; they are not themselves normative.

- [TR 23.757](https://www.3gpp.org/dynareport/23757.htm) - Study on architectural enhancements for 5G multicast-broadcast services (Rel-17, preceded TS 23.247)
- [TR 23.700-47](https://www.3gpp.org/dynareport/23700-47.htm) - Study on architectural enhancements for 5G multicast-broadcast services; Phase 2 (Rel-18)
- [TR 26.802](https://www.3gpp.org/dynareport/26802.htm) - Multicast Architecture Enhancement for 5G Media Streaming (preceded TS 26.502 / TS 26.517)
- [TR 33.850](https://www.3gpp.org/dynareport/33850.htm) - Study on security aspects of enhancements for 5G Multicast-Broadcast Services (MBS) (Rel-17)
- [TR 33.883](https://www.3gpp.org/dynareport/33883.htm) - Study on security enhancements for 5G multicast-broadcast services phase 2 (Rel-18)

:::warning[References to verify]
This specification list was compiled by cross-referencing 3GPP's own Change Request records for the work items behind MBS &mdash; `5MBS` (900038), `NR_MBS` (860048) and `NR_MBS-Core` (860148), plus their CT1/CT3/CT4/SA4 sub-items &mdash; rather than compiled from spec titles or a keyword search alone. Checked directly against the official Release 17/18/19 Description reports (TR 21.917, TR 21.918, TR 21.919): the Release 17 `5MBS` CT sub-items, previously unnamed here, are CT1 (920043), CT3 (920044) and CT4 (910002); the SA4 sub-items are `5MBUSA` (920010, behind TS 26.502/26.517) and `5MBP3` (940008). Release 18's `5MBS_Ph2` (989999) has the equivalent CT1/CT3/CT4 set (990001/990076/990077), plus a dedicated charging work item, `5MBS_CH` (1000010, behind TS 32.279), and the RAN-side extension `NR_MBS_enh` / `NR_MBS_enh-Core` (940099/940199).

TS 29.116 was checked and excluded (concerns the legacy eMBMS bridge for 5G Media Streaming, not 5G-native MBS). TS 29.274 was checked and included (adds a genuine MBS-specific interface type, N19mb in F-TEID).

TS 38.463 and TS 37.483 were previously described as an old-vs-new (deprecated) pair; both are in fact actively maintained, covering different deployment scenarios. Corrected here; see the [MBS RAN procedures pages](/tech/5g-mbs/analysis-mbs-broadcast-ran) for the technical detail.

A handful of candidate specifications were checked and excluded for lack of confirmed MBS content: TS 23.288, TS 28.541, TS 33.535, TS 26.501, TS 26.512. Separately, the Release 17/18/19 Description reports also list MBS work items combining it with adjacent scope outside this page's remit, deliberately excluded here as out of scope rather than for lack of MBS content: interworking with non-3GPP Digital Terrestrial Broadcast networks (`DTT4MBS`, 970043, Release 19 SA1 study item, corrected here from a previous mistyping as "DTTB4MBS"), Mission Critical Services (`5MBS_eMC` and the `FS_MC5MBS` study in Release 17, `MCOver5MBS` in Release 18) and V2X (`TEI18_MBS4V2X` in Release 18).
:::

## 5G-MAG tracking and contribution focus

5G-MAG tracks and contributes to 5G MBS standardisation across all three layers described above (user-service, 5G Core, and NR/NG-RAN). For the current focus areas and the implementer-facing analysis of this architecture, see [Technical Documentation: Multicast & Broadcast in 5G](/tech/5g-mbs).

## Related Standards Work

- [Standards: 5G Media Streaming](/standards/5gms)
- [Standards: 5G Broadcast](/standards/5g-broadcast)
- [Technical Documentation: Multicast & Broadcast in 5G](/tech/5g-mbs)
- [Standards: Non-Terrestrial Networks (NTN)](/standards/ntn)
- [Meetings with 3GPP SA4](/standards/3gpp-issue-tracking): the live tracker for 3GPP feedback issues on this specification

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
