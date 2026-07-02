---
hide_title: true
title: 5G Broadcast
sidebar_position: 1
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<h1>5G Broadcast</h1>
<p>5G Broadcast delivers linear TV and radio to devices over a one-way, free-to-air signal, with no SIM, subscription or return channel required, reusing LTE/eMBMS radio technology (Long Term Evolution / evolved Multimedia Broadcast Multicast Service).</p>
</div>
</div>

## Overview

5G Broadcast delivers linear TV and radio to devices over a one-way, free-to-air signal, with no SIM, subscription or return channel required, reusing LTE/eMBMS radio technology (Long Term Evolution / evolved Multimedia Broadcast Multicast Service). It is distinct from 5G Multicast-Broadcast Services (MBS), which is native to the 5G core and NR; see [Standards: 5G MBS](/tech/standards/5g-mbs). 5G-MAG maintains the underlying ETSI specification and contributes the requirements and fixes that shape each new version. For acronyms used here, see the [Glossary](/tech/standards/glossary).

## About ETSI TS 103 720 - 5G Broadcast System for linear TV and radio services

ETSI TS 103 720 introduces the 5G Broadcast System and its associated features. LTE-based 5G Broadcast is a profile of existing 3GPP specifications that addresses all requirements of a 5G Broadcast System, defining the functions, reference points and receiver categories needed to deploy linear television and radio services, among others.

### Quick access
* [**Kanban - ETSI TS 103 720**](https://github.com/orgs/5G-MAG/projects/32)
* [**ETSI JTC Broadcast - Work Item towards v1.3.1**](https://portal.etsi.org/webapp/WorkProgram/Report_WorkItem.asp?WKI_ID=72978)
* [**ETSI TS 103 720 v1.2.1 06-2023**](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/01.02.01_60/ts_103720v010201p.pdf)
* [**ETSI JTC Broadcast - Work Item towards v1.2.1**](https://portal.etsi.org/webapp/workprogram/Report_WorkItem.asp?WKI_ID=58439)
* [**ETSI TS 103 720 v1.1.1 12-2020**](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/01.01.01_60/ts_103720v010101p.pdf)

### Version history at a glance

The table summarises the version-to-Release-to-status mapping; the sections below give the detailed changes for each version. The work-in-progress items for each new version are discussed and agreed among members on the [**Kanban - ETSI TS 103 720**](https://github.com/orgs/5G-MAG/projects/32) board (linked once here and under Quick access).

| Version | Date | 3GPP Release | Status |
|---------|------|--------------|--------|
| v1.1.1 | 12-2020 | Rel-16 baseline | Published |
| v1.2.1 | 06-2023 | Rel-17 | Published |
| v1.3.1 | in progress | Rel-18, extending to Rel-19 | Work item open |

### Updates towards ETSI TS 103 720 v1.3.1
5G-MAG is now conducting the updates towards the new version of the specification. In 2024, it kicked off the new work item to update the specification according to 3GPP Release 18, extending it to also cover Release 19.

The additions, discussed and agreed among members on the Kanban board, include:
* Extensions in 3GPP Rel-18 to address additional use cases and scenarios;
* Identified bugs or at least clarification questions from implementors of ETSI TS 103 720, in particular by 5G-MAG;
* New requirements identified by 5G-MAG;
* Extensions to DVB-I to support 5G Broadcast;
* Band support for receivers including Band 108 (UHF);
* 5G Broadcast as an improvement to the Public Warning System (PWS), e.g. delivery of warning messages from the Mobility Management Entity (MME) to the eNodeB (the LTE base station);
* Deployment Guidelines on concurrent support of 5G Broadcast and 5G Unicast;
* Support for 3GPP Service URLs;
* Deployment receiver profiles including a RAN-only profile;
* Low-latency distribution;
* Potential support of other improvements identified in the timeline of the work item.

### Updates towards ETSI TS 103 720 v1.2.1
5G-MAG completed the 3GPP Release 17 updates for ETSI TS 103 720 v1.2.1 in 2023. The additions, discussed and agreed among members on the Kanban board, included:
* Bug fixes, clarifications and upgrade to 3GPP Rel-17 specification
* Adding receiver requirements for consistent network planning including requirements on demodulation performance
* Adding bandwidth information, including 6/7/8 MHz, and broadcast UHF spectrum (based on 3GPP RAN work items)
* Support of 5GMS (5G Media Streaming) over eMBMS with reference to 3GPP TS 26.501 including hybrid use cases
* Codecs and Formats with reference to 5GMS in 3GPP TS 26.511
* Support for public warning and emergency alerts based on cell broadcast services.

ETSI TS 103 720 v1.2.1 defines three normative receiver categories, signalled through MBMS Feature Values in the User Service Description:

| Feature value | Category | Mandatory SCS |
|---|---|---|
| 27 | LTE-based 5G Broadcast **Base Receiver** | 1.25 kHz mandatory; other SCS optional |
| 28 | LTE-based 5G Broadcast **Main Receiver** | All SCS (15, 7.5, 2.5, 1.25, 0.37 kHz) |
| 30 | **5GMS** via LTE-based 5G Broadcast Receiver | Main Receiver plus 5GMS requirements |

The Base Receiver is the minimum profile, aimed at devices for fixed indoor reception using the 1.25 kHz numerology. The Main Receiver must support all five numerologies and is the target for mobile and portable devices. The 5GMS category adds the 5G Media Streaming requirements on top of the Main Receiver.

The v1.2.1 specification PDF and its work item are linked under Quick access above.

### Publication of ETSI TS 103 720 v1.1.1
5G-MAG undertook the maintenance of ETSI TS 103 720 in 2021. The initial version (v1.1.1) of this document addressed:
* Support of Free-to-Air (FTA) and Receive-Only Mode (ROM) services.
* Network dedicated to linear TV/radio, using supplemental downlink channels and spectrum.
* Single Frequency Network (SFN) deployments with distances larger than cellular sites
* Support for mobility scenarios (e.g. up to 250 km/h) for cars, with external antennas.
* Support for common streaming distribution formats such as Dynamic Streaming over HTTP (DASH), Common Media Application Format (CMAF) and HTTP Live Streaming (HLS).
* Support for IP-based services such as IPTV or ABR multicast.
* Support for different file delivery services such as scheduled delivery or file carousels.

* [**ETSI TS 103 720 v1.1.1 12-2020**](https://www.etsi.org/deliver/etsi_ts/103700_103799/103720/01.01.01_60/ts_103720v010101p.pdf)

---

## Related 3GPP Specifications

This is a list of specifications in the scope of Multimedia Broadcast/Multicast Service (MBMS) and LTE-based 5G Terrestrial Broadcast. LTE-based 5G Broadcast reuses the MBMS delivery framework over the LTE radio, including its further-enhanced variant (FeMBMS, Further enhanced Multimedia Broadcast/Multicast Service). The specifications are grouped below by function, following the same physical layer, RRC, RF and architecture split used on the [Standards Evolution](/tech/standards/5g-broadcast-standards-evolution) page; ETSI TS 103 720 (see "About ETSI TS 103 720" above) profiles a subset of these and adds broadcast-specific receiver requirements on top.

### Service requirements
* [TS 22.101](https://www.3gpp.org/dynareport/22101.htm) - Service aspects; Service principles
* [TS 22.261](https://www.3gpp.org/dynareport/22261.htm) - Service requirements for the 5G system

### Architecture and system description
* [TR 23.746](https://www.3gpp.org/dynareport/23746.htm) - Study on System Architecture Enhancements to eMBMS for Television Video Service
* [TS 23.246](https://www.3gpp.org/dynareport/23246.htm) - Multimedia Broadcast/Multicast Service (MBMS); Architecture and functional description
* [TS 36.300](https://www.3gpp.org/dynareport/36300.htm) - Evolved Universal Terrestrial Radio Access (E-UTRA) and Evolved UTRAN (E-UTRAN); Overall description, including the MBMS-dedicated cell mode used for broadcast
* [TR 36.976](https://www.3gpp.org/dynareport/36976.htm) - Overall description of LTE-based 5G broadcast (informative summary, produced by the normative Release 16 work item)
* [TR 36.776](https://www.3gpp.org/dynareport/36776.htm) - Study on LTE-based 5G terrestrial broadcast (the FS_LTE_terr_bcast study output that identified the gaps met by the Release 16 numerology enhancements)

### Radio protocol layer and MBMS network interfaces (physical layer, scheduling, RRC, MAC, M1/M2/M3)
* [TS 36.211](https://www.3gpp.org/dynareport/36211.htm) - Physical channels and modulation
* [TS 36.212](https://www.3gpp.org/dynareport/36212.htm) - Multiplexing and channel coding
* [TS 36.213](https://www.3gpp.org/dynareport/36213.htm) - Physical layer procedures (scheduler and link adaptation)
* [TS 36.321](https://www.3gpp.org/dynareport/36321.htm) - Medium Access Control (MAC) protocol specification, touched by the Release 19 PMCH Phase 2 work item
* [TS 36.331](https://www.3gpp.org/dynareport/36331.htm) - Radio Resource Control (RRC) protocol specification: MIB-MBMS, SIB1-MBMS, MBSFN-AreaInfo and the other broadcast system-information extensions
* [TS 36.440](https://www.3gpp.org/dynareport/36440.htm) - General aspects and principles for E-UTRAN interfaces supporting MBMS (the M1, M2 and M3 interfaces below)
* [TS 25.446](https://www.3gpp.org/dynareport/25446.htm) - MBMS synchronisation protocol (SYNC), used over M1 to keep content time-aligned across the eNBs of an MBSFN area
* [TS 36.443](https://www.3gpp.org/dynareport/36443.htm) - E-UTRAN M2 Application Protocol (M2AP), the MCE-to-eNB control-plane interface, carrying Release 19 PMCH Phase 2 time-interleaving parameters
* [TS 36.444](https://www.3gpp.org/dynareport/36444.htm) - E-UTRAN M3 Application Protocol (M3AP), the MME-to-MCE control-plane interface for MBMS session management signalling
* [TS 36.413](https://www.3gpp.org/dynareport/36413.htm) - S1 Application Protocol (S1AP), the eNB-to-MME control-plane interface, distinct from the M1/M2/M3 MBMS-specific interfaces above
* [TS 36.133](https://www.3gpp.org/dynareport/36133.htm) - Requirements for support of radio resource management
* [TS 36.304](https://www.3gpp.org/dynareport/36304.htm) - User Equipment (UE) procedures in idle mode, relevant to SIM-free and Receive-Only Mode reception without an RRC connection

MBMS has three named network interfaces, distinct from the M1-M8 reference points used in 5G Media Streaming (see [Standards: 5G Media Streaming](/tech/standards/5gms)). **M1** (MBMS-GW to eNB) is a pure user-plane interface: it carries the broadcast content itself via IP multicast, with no dedicated application protocol of its own; the SYNC protocol (TS 25.446) keeps content time-aligned across the eNBs in an MBSFN area. **M2** (MCE to eNB) and **M3** (MME to MCE) are control-plane interfaces, specified by M2AP (TS 36.443) and M3AP (TS 36.444) respectively.

### Core network and mobility
* [TS 23.003](https://www.3gpp.org/dynareport/23003.htm) - Numbering, addressing and identification
* [TS 23.122](https://www.3gpp.org/dynareport/23122.htm) - Non-Access-Stratum (NAS) functions related to Mobile Station (MS) in idle mode
* [TS 23.401](https://www.3gpp.org/dynareport/23401.htm) - GPRS enhancements for E-UTRAN access (the EPS/E-UTRAN architecture that MBMS and 5G Broadcast are built on)
* [TS 29.274](https://www.3gpp.org/dynareport/29274.htm) - Evolved Packet System (EPS); GPRS Tunnelling Protocol for Control plane (GTPv2-C)
* [TS 29.281](https://www.3gpp.org/dynareport/29281.htm) - General Packet Radio System (GPRS) Tunnelling Protocol User Plane (GTPv1-U)

### RF and device / network equipment requirements
* [TS 36.101](https://www.3gpp.org/dynareport/36101.htm) - User Equipment (UE) radio transmission and reception; defines operating Bands 107, 108, 112 and 113
* [TS 36.104](https://www.3gpp.org/dynareport/36104.htm) - Base Station (BS) radio transmission and reception; network-side counterpart to 36.101 for the same bands
* [TS 36.306](https://www.3gpp.org/dynareport/36306.htm) - User Equipment (UE) radio access capabilities, including the CAS-muting capability introduced in Release 19
* [TS 36.102](https://www.3gpp.org/dynareport/36102.htm) - User Equipment (UE) radio transmission and reception for satellite access, covering the Release 19 geosynchronous-satellite broadcast band
* [TS 36.108](https://www.3gpp.org/dynareport/36108.htm) - Satellite Access Node radio transmission and reception; satellite counterpart to 36.104
* [TS 36.181](https://www.3gpp.org/dynareport/36181.htm) - Satellite Access Node conformance testing
* [TS 36.307](https://www.3gpp.org/dynareport/36307.htm) - Requirements on UEs supporting a release-independent frequency band

### Content delivery and MBMS application layer
* [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) - Multimedia Broadcast/Multicast Service (MBMS); Protocols and codecs
* [TS 26.347](https://www.3gpp.org/dynareport/26347.htm) - Multimedia Broadcast/Multicast Service (MBMS); Application Programming Interface and URL
* [TS 26.348](https://www.3gpp.org/dynareport/26348.htm) - Northbound Application Programming Interface (API) for MBMS at the xMB reference point
* [TS 29.116](https://www.3gpp.org/dynareport/29116.htm) - Representational state transfer over the xMB reference point between content provider and BM-SC
* [TS 24.116](https://www.3gpp.org/dynareport/24116.htm) - Stage 3 aspects of system architecture enhancements for TV services
* [TS 24.117](https://www.3gpp.org/dynareport/24117.htm) - TV service configuration Management Object (MO)

### Public warning and emergency alerts
* [TS 23.041](https://www.3gpp.org/dynareport/23041.htm) - Technical realization of Cell Broadcast Service (CBS)
* [TS 29.168](https://www.3gpp.org/dynareport/29168.htm) - Cell Broadcast Centre interfaces with the Evolved Packet Core
* [ETSI TS 102 900](https://www.etsi.org/deliver/etsi_ts/102900_102999/102900/) - Emergency Communications (EMTEL); European Public Warning System (EU-ALERT) using the Cell Broadcast Service
* [OASIS CAP v1.2](http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2.doc) - Common Alerting Protocol, the alert message payload format carried over Cell Broadcast Service

### 5G Media Streaming (5GMS) integration
* [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) - 5G Media Streaming (5GMS); General description and architecture, for hybrid unicast/broadcast delivery
* [TS 26.511](https://www.3gpp.org/dynareport/26511.htm) - 5G Media Streaming (5GMS); Profiles, codecs and formats
* [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) - 5G Media Streaming (5GMS); Protocols

### Transport protocols and addressing
* [IANA IPv4 Multicast Address Space Registry](https://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml) - allocation of the IPv4 multicast addresses used for MBMS user-plane delivery over M1
* [IANA IPv6 Multicast Address Space Registry](https://www.iana.org/assignments/ipv6-multicast-addresses/ipv6-multicast-addresses.xhtml) - the IPv6 equivalent
* [IETF RFC 6335](https://www.rfc-editor.org/rfc/rfc6335) - IANA procedures for the management of the Service Name and Transport Protocol Port Number Registry
* [IETF RFC 9110](https://www.rfc-editor.org/rfc/rfc9110) - HTTP Semantics
* [IETF RFC 8446](https://www.rfc-editor.org/rfc/rfc8446) - The Transport Layer Security (TLS) Protocol Version 1.3
* [IETF RFC 793](https://www.rfc-editor.org/rfc/rfc793) - Transmission Control Protocol (TCP)
* [IETF RFC 7323](https://www.rfc-editor.org/rfc/rfc7323) - TCP Extensions for High Performance
* [IETF RFC 8200](https://www.rfc-editor.org/rfc/rfc8200) - Internet Protocol, Version 6 (IPv6) Specification

:::caution[References to verify]
The per-release 3GPP CR numbers, TS clause references, meeting placements, band frequency ranges and work-item verification notes have moved to the caution box on the [Standards Evolution](/tech/standards/5g-broadcast-standards-evolution) page, along with the detailed content they apply to. The ETSI TS 103 720 version-to-release mapping shown in "Version history at a glance" above has not been independently confirmed against the primary 3GPP or ETSI record.

The M1/M2/M3 interface descriptions and their specifications (TS 36.440, TS 25.446, TS 36.444) were added from web search results (3gpp.org and tech-invite.com both blocked direct fetch), cross-checked across two independent search queries that agreed on the interface roles and spec numbers. They have not been confirmed by reading the specifications themselves.

TR 36.776 (Architecture and system description list above) was confirmed to exist as a published document (ETSI TR 136 776 V16.0.0, November 2020), but its current withdrawal or maintenance status could not be confirmed against the primary 3GPP record (the "proposed for withdrawal" list on 3gpp.org returned a 403 to automated access). Confirm it is still current before citing it as an active reference.

The Service requirements, Core network and mobility, Public warning and emergency alerts, and Transport protocols and addressing sections, plus TS 24.117, TS 26.348, TS 26.512, TS 36.133, TS 36.304 and TS 36.413 in the sections above, were added directly from the normative reference clause (clause 2.1) of ETSI TS 103 720 V1.2.1, which a maintainer supplied as source text. This is a primary-source addition, not from the internal roadmap, but the titles and dynareport links were reconstructed from the 3GPP numbering convention (ETSI "1XX YYY" to 3GPP "XY.YYY") rather than fetched from each spec individually; a maintainer should spot-check a few, especially the less common ones (TS 22.101, TS 23.122, TS 29.274, TS 29.281). Separately, ETSI TS 103 720's own reference clause appears to have a titling error worth flagging to 5G-MAG or ETSI: the entries for TS 36.306 and TS 36.443 in its bibliography carry each other's titles (TS 36.306 is listed there as "RRC Protocol specification", which is TS 36.331's title; TS 36.443 is listed as "UE radio access capabilities", which is TS 36.306's title). This page uses the correct, independently-verified titles for both, not the swapped ones from that bibliography.

Individual 3GPP Change Requests (CRs) are not linked directly: the CR search portal (portal.3gpp.org/ChangeRequests.aspx) requires a 3GPP delegate login for record-level detail. A filtered-by-work-item search link (using the `workitem=` query parameter) does work without login to reach the search results page itself, but the CR table contents still require authentication, so no such links are included here.

Well-established references (DASH = ISO/IEC 23009-1; 5GMS = TS 26.501 / [TS 26.512](https://www.3gpp.org/dynareport/26512.htm)) do not need re-checking.
:::

## Related Standards Work

* [Standards: DVB-I over 5G](/tech/standards/dvb-i)
* [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs)
* [Standards: Multimedia Content Delivery](/tech/standards/multimedia)
* [Developer portal: 5G Broadcast reference tools](https://developer.5g-mag.com/5gbroadcast)
* [Technical Documentation: 5G Broadcast](/tech/5g-broadcast)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::

