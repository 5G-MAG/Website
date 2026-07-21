---
hide_title: true
title: 5G Multicast Broadcast Services (MBS)
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

5G Multicast Broadcast Services (MBS) is the 3GPP 5G System feature for delivering the same content to many devices at once over the 5G core and NR radio, used for live media, software updates and mission-critical group communication. Unlike LTE-based 5G Broadcast (see [Standards: 5G Broadcast](/tech/standards/5g-broadcast)), MBS is native to the 5G core and New Radio (NR). Because MBS spans the whole stack, the specifications below are grouped by layer: user-service level, 5G core network, and NR / NG-RAN. 5G-MAG tracks and contributes to this work. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid">

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

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>5G-MAG's reference tools realising the MBS architecture.</p>
<ul class="godeeper-card__links">
<li><a href="/applications/multicast-broadcast">Developer portal: 5G MBS reference tools</a></li>
</ul>
</div>
</div>

</div>

## Why MBS, and what changed from eMBMS

The problem MBS solves is scale. Sending the same live stream to a large audience over conventional unicast means one copy per device, so radio and transport load grows linearly with the audience. Point-to-multipoint (PTM) delivery sends a single transmission that many devices decode, so the cost is decoupled from audience size. LTE already offered this through evolved Multimedia Broadcast Multicast Service (eMBMS), but eMBMS used a largely separate control and user plane and a distinct radio design, which made it costly to deploy alongside unicast.

5G MBS is designed to reuse the existing 5G System instead. It is integrated into the 5G Core service-based architecture and into the NR radio layer, reusing the Release 15/16 physical channels, reference signals, numerology and cyclic prefixes. The network can switch a multicast session between PTM and point-to-point (PTP) delivery per cell and per device, so a session behaves like unicast where that is more efficient (few receivers, poor channel) and like broadcast where PTM is more efficient (many receivers). This flexibility, and the shared control plane, are the main practical differences from eMBMS.

## Architecture in three layers

The specification list below is grouped to match the three layers a single MBS session passes through. Reading top down:

- **User-service layer.** The MBS User Services architecture (TS 26.502) is an optional abstraction designed in SA4. A content provider (the _MBS Application Provider_, playing the AF/AS role) uses it to provision services, announce them to clients, ingest content and, optionally, repair lost objects over unicast. It is realised by two functions delegated from SA2: the **Multicast/Broadcast Service Function (MBSF)** on the control plane and the **Multicast/Broadcast Service Transport Function (MBSTF)** on the user plane. The bit formats and protocols are in TS 26.517.
- **5G Core layer.** The MBS system architecture (TS 23.247, Stage 2) defines the multicast and broadcast _communication services_, the MBS _sessions_ that carry them, and the two ways the core moves MBS packets towards the radio: the _5GC shared_ method (one copy per MBS-capable RAN node over a shared GTP-U tunnel) and the _5GC individual_ method (a per-UE copy in a normal PDU session, used for MBS-incapable nodes). The MBS-specific core functions are the **MB-SMF** (session management) and **MB-UPF** (user plane); the AMF, PCF, NEF and NRF gain MBS extensions. Stage 3 procedures are in TS 29.532 (session management), TS 29.537 (policy control), TS 29.580 (MBSF services) and TS 29.581 (MBSTF transport services).
- **NR and NG-RAN layer.** Once packets reach the gNB, the radio side (TS 38.300 family) chooses PTM or PTP and applies one of three Layer-2 delivery modes: delivery mode 1 (multicast, HARQ feedback and retransmissions, RRC_CONNECTED), delivery mode 2 (broadcast, no feedback, receivable in any RRC state) and the default unicast mode. Broadcast configuration is carried on the MCCH (pointed to by SIB20), traffic on the MTCH, and sessions are addressed by a Group RNTI (G-RNTI).

The developer-facing view of what the 5G-MAG reference tools implement across these layers is on the [developer portal](/applications/multicast-broadcast).

## Specifications by release

MBS was introduced in **Release 17** as the "5MBS" work: the Stage 2 architecture (TS 23.247), the user-service layer (TS 26.502, TS 26.517), the core Stage 3 procedures (TS 29.532, TS 29.537, TS 29.580, TS 29.581) and the NR/NG-RAN support (TS 38.300 family, with SIB20, the MCCH/MTCH, G-RNTI and delivery modes 1 and 2). In Release 17, multicast reception (delivery mode 1) requires RRC_CONNECTED.

**Release 18** ("5MBS Phase 2") extends the feature rather than replacing it. The RAN work adds MBS multicast reception in the RRC_INACTIVE state, introducing SIB24 and a dedicated multicast MCCH carrying the multicast configuration (see [MBS Multicast Inactive RAN procedures](/tech/5g-mbs/analysis-mbs-multicast-inactive-ran)). Architecture and security study work for Phase 2 was captured in study reports before being folded into the normative specifications. Later releases continue to maintain and extend these specifications; check the version of each specification you are targeting for the exact release content.

The tables in the sections that follow list each specification with its 3GPP number and title. Where a specification applies at a specific reference point or protocol layer, that mapping is given alongside.

## Related 3GPP Specifications

This is a list of specifications in the scope of 5G Multicast Broadcast Services.

### MBS User Services

- [3GPP TS 26.502](https://www.3gpp.org/dynareport/26502.htm) - 5G Multicast-Broadcast Services; User service architecture
- [3GPP TS 26.517](https://www.3gpp.org/dynareport/26517.htm) - 5G Multicast-Broadcast User Services; Protocols and Formats
- [3GPP TS 29.580](https://www.3gpp.org/dynareport/29580.htm) - 5G System; Multicast/Broadcast Service Function services; Stage 3
- [3GPP TS 29.581](https://www.3gpp.org/dynareport/29581.htm) - 5G System; Multicast/Broadcast Service Transport Services; Stage 3

### 5G Core Network specifications

#### MBS architecture

- [3GPP TS 23.247](https://www.3gpp.org/dynareport/23247.htm) - Architectural enhancements for 5G multicast-broadcast services

#### Network Function services

- [3GPP TS 29.532](https://www.3gpp.org/dynareport/29532.htm) - 5G System; 5G Multicast-Broadcast Session Management Services; Stage 3
- [3GPP TS 29.537](https://www.3gpp.org/dynareport/29537.htm) - 5G System; Multicast/Broadcast Policy Control services; Stage 3

#### Protocols

- [3GPP TS 29.244](https://www.3gpp.org/dynareport/29244.htm) - Interface between the Control Plane and the User Plane nodes
- [3GPP TS 38.413](https://www.3gpp.org/dynareport/38413.htm) - NG-RAN; NG Application Protocol (NGAP)
- [3GPP TS 24.501](https://www.3gpp.org/dynareport/24501.htm) - Non-Access-Stratum (NAS) protocol for 5G System (5GS); Stage 3
- [3GPP TS 29.281](https://www.3gpp.org/dynareport/29281.htm) - General Packet Radio System (GPRS) Tunnelling Protocol User Plane (GTPv1-U)

The following table maps each core-network plane to its protocol and the specification that defines it.

##### Control plane

| Protocol                                  | Defining spec |
| ----------------------------------------- | ------------- |
| Packet Forwarding Control Protocol (PFCP) | TS 29.244     |
| NG Application Protocol (NGAP)            | TS 38.413     |
| Non-Access Stratum (NAS)                  | TS 24.501     |

##### User plane

| Protocol                                    | Defining spec |
| ------------------------------------------- | ------------- |
| GPRS Tunnelling Protocol User Plane (GTP-U) | TS 29.281     |

### NR and NG-RAN specifications

- [3GPP TS 38.300](https://www.3gpp.org/dynareport/38300.htm) - NR; NR and NG-RAN Overall Description
- [3GPP TS 38.401](https://www.3gpp.org/dynareport/38401.htm) - NG-RAN; Architecture description

#### NR

- [3GPP TS 38.331](https://www.3gpp.org/dynareport/38331.htm) - NR; Radio Resource Control (RRC) Protocol Specification
- [3GPP TS 38.321](https://www.3gpp.org/dynareport/38321.htm) - NR; Medium Access Control (MAC) Protocol Specification
- [3GPP TS 38.322](https://www.3gpp.org/dynareport/38322.htm) - NR; Radio Link Control (RLC) Protocol Specification
- [3GPP TS 38.323](https://www.3gpp.org/dynareport/38323.htm) - NR; Packet Data Convergence Protocol (PDCP) Specification
- [3GPP TS 37.324](https://www.3gpp.org/dynareport/37324.htm) - E-UTRA and NR; Service Data Adaptation Protocol (SDAP) Specification
- [3GPP TS 38.211](https://www.3gpp.org/dynareport/38211.htm) - NR; Physical channels and modulation
- [3GPP TS 38.212](https://www.3gpp.org/dynareport/38212.htm) - NR; Multiplexing and channel coding
- [3GPP TS 38.213](https://www.3gpp.org/dynareport/38213.htm) - NR; Physical layer procedures for control
- [3GPP TS 38.214](https://www.3gpp.org/dynareport/38214.htm) - NR; Physical layer procedures for data

The two tables below list the NR radio protocol layers per plane and the specification that defines each. Channel annotations follow each table as a note; the abbreviations are: PSS/SSS (Primary/Secondary Synchronisation Signal), PBCH (Physical Broadcast Channel) carrying the MIB (Master Information Block), PDCCH (Physical Downlink Control Channel), PDSCH (Physical Downlink Shared Channel) carrying SIB20/SIB21 (System Information Blocks) and MCCH (Multicast Control Channel), and MTCH (Multicast Traffic Channel).

##### Control plane

| Layer | Protocol                         | Defining spec                     |
| ----- | -------------------------------- | --------------------------------- |
| RRC   | Radio Resource Control           | TS 38.331                         |
| PDCP  | Packet Data Convergence Protocol | TS 38.323                         |
| RLC   | Radio Link Control               | TS 38.322                         |
| MAC   | Medium Access Control            | TS 38.321                         |
| PHY   | Physical layer                   | TS 38.211, 38.212, 38.213, 38.214 |

Channels: PSS/SSS/PBCH(MIB), PDCCH, PDSCH(SIB20/SIB21/MCCH).

##### User plane

| Layer | Protocol                         | Defining spec                     |
| ----- | -------------------------------- | --------------------------------- |
| SDAP  | Service Data Adaptation Protocol | TS 37.324                         |
| PDCP  | Packet Data Convergence Protocol | TS 38.323                         |
| RLC   | Radio Link Control               | TS 38.322                         |
| MAC   | Medium Access Control            | TS 38.321                         |
| PHY   | Physical layer                   | TS 38.211, 38.212, 38.213, 38.214 |

Channels: PDSCH(MTCH).

#### NG-RAN

- [3GPP TS 38.420](https://www.3gpp.org/dynareport/38420.htm) - NG-RAN; Xn general aspects and principles
- [3GPP TS 38.423](https://www.3gpp.org/dynareport/38423.htm) - NG-RAN; Xn Application Protocol (XnAP)
- [3GPP TS 38.410](https://www.3gpp.org/dynareport/38410.htm) - NG-RAN; NG general aspects and principles
- [3GPP TS 38.413](https://www.3gpp.org/dynareport/38413.htm) - NG-RAN; NG Application Protocol (NGAP)
- [3GPP TS 38.470](https://www.3gpp.org/dynareport/38470.htm) - NG-RAN; F1 general aspects and principles
- [3GPP TS 38.473](https://www.3gpp.org/dynareport/38473.htm) - NG-RAN; F1 application protocol (F1AP)
- [3GPP TS 38.460](https://www.3gpp.org/dynareport/38460.htm) - NG-RAN; E1 general aspects and principles
- [3GPP TS 38.463](https://www.3gpp.org/dynareport/38463.htm) - NG-RAN; E1 application protocol (E1AP) - deprecated from Rel-17
- [3GPP TS 37.483](https://www.3gpp.org/dynareport/37483.htm) - NG-RAN; E1 application protocol (E1AP) - from Rel-17 onwards
- [3GPP TS 38.415](https://www.3gpp.org/dynareport/38415.htm) - NG-RAN; PDU Session User Plane Protocol
- [3GPP TS 38.425](https://www.3gpp.org/dynareport/38425.htm) - NG-RAN; NR user plane protocol

##### Interfaces

NG-RAN can be split into a Central Unit (CU) and Distributed Unit (DU), with the CU further divided into control-plane (CU-CP) and user-plane (CU-UP) parts. The reference points below connect these elements and the 5G core; the gNB is the 5G base station, the AMF is the Access and Mobility Management Function, and the UPF is the User Plane Function.

- Xn (38.420, 38.423): connects two gNBs (5G base stations)
- NG (38.410, 38.413): NG-c = N2 (to the AMF, Access and Mobility Management Function); NG-u = N3 (to the UPF, User Plane Function)
- F1 (38.470, 38.473): F1-c (PDCP-c to RLC); F1-u (PDCP-u to RLC)
- E1 (38.460, 38.463): CU-CP (RRC + PDCP-c) to CU-UP (SDAP + PDCP-u)

:::warning[References to verify]
The release placement statements in "Specifications by release" were not all confirmed against a primary source: the "5MBS" / "5MBS Phase 2" work-item naming, the Release 17 introduction of the listed specifications, and the Release 18 placement of MBS multicast reception in RRC_INACTIVE (SIB24 and the dedicated multicast MCCH). Verify against the specific 3GPP release and specification versions you are targeting.
:::

## 5G-MAG tracking and contribution focus

5G-MAG tracks and contributes to 5G MBS standardisation, and maintains reference tools that implement the architecture across all three layers described above (user-service, 5G Core, and NR/NG-RAN). The current focus areas are:

- **Release 18 "5MBS Phase 2":** following the RAN extensions that add MBS multicast reception in the RRC_INACTIVE state, introducing SIB24 and a dedicated multicast MCCH (see [MBS Multicast Inactive RAN procedures](/tech/5g-mbs/analysis-mbs-multicast-inactive-ran)).
- **Cross-layer reference implementation:** the [developer portal](/applications/multicast-broadcast) documents how the reference tools realise the user-service (TS 26.502 / TS 26.517), 5G Core (TS 23.247 and the related Stage 3 specifications), and NR/NG-RAN (TS 38.300 family) layers described above.

For the implementer-facing analysis of this architecture, see [Technical Documentation: Multicast & Broadcast in 5G](/tech/5g-mbs).

## Related Standards Work

- [Standards: 5G Media Streaming](/tech/standards/5gms)
- [Standards: 5G Broadcast](/tech/standards/5g-broadcast)
- [Developer portal: 5G MBS reference tools](/applications/multicast-broadcast)
- [Technical Documentation: Multicast & Broadcast in 5G](/tech/5g-mbs)
- [Meetings with 3GPP SA4](/standards/3gpp-issue-tracking): the live tracker for 3GPP feedback issues on this specification

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
