---
hide_title: true
sidebar_label: Evolution by release
title: Real-time Media Communication (RTC) - Standards Evolution
slug: /standards/rtc/evolution
description: Release by release, the 3GPP work items and change requests behind TS 26.506 and TS 26.113, Release 18 to Release 19, and the Release 20 work items that list them.
pagination_prev: null
pagination_next: null
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 21v-6" /><path d="M20 6l-3 -3l-3 3" /><path d="M10 18l-3 3l-3 -3" /><path d="M7 3v2" /><path d="M7 9v2" /><path d="M17 3v6" /><path d="M17 21v-2" /><path d="M17 15v-2" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Real-time Media Communication (RTC) - Standards Evolution</h1>
</div>
</div>

:::tip[At a glance]

- **Release 18:** GA4RTAR creates the architecture (TS 26.506); iRTCW creates the protocols and APIs (TS 26.113); 5GMS_Pro_Ph2 creates the APIs shared with 5GMS (TS 26.510).
- **Release 19:** 5G_RTP_Ph2 adds PDU handling and marking enhancements to the Dynamic Policy API; iRTCW adds media capability and metadata support; AMD-ARCH-MED adds reference point M13 to the generalised architecture.
- **Release 20:** two work items on application energy consumption list TS 26.506 and TS 26.113, and a study looks at QUIC-based media delivery for real-time communication.

:::

Work items as listed in the 3GPP work plan of 28 September 2026. Change requests as listed in the change history of TS 26.506 V19.2.0 and V18.6.0 and TS 26.113 V19.2.0 and V18.4.0.

### Release 20

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [Energy_ARCH-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1120097) | System architecture for application energy consumption information collection and reporting Stage 2 | Normative | TS 26.506 (with TS 26.501, TS 23.367, TS 33.367) | Complete in the work plan, Sep 2026 | SP-260418 |
| [Energy_PRO-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1130006) | Protocols, network APIs and data types for application energy consumption information collection, reporting and exposure Stage 3 | Normative | TS 26.113 (with TS 26.510, TS 26.512, TS 26.527) | In progress, target Mar 2027 | SP-261003 |
| [FS_Q4RTC_MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1100007) | Study on QUIC-based Media Delivery for Real-time Communication | Study | TR 26.836 | In progress, target Mar 2027 | SP-251661 |

The Release 20 changes to TS 26.506 and TS 26.113 are not covered here.

### Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [5G_RTP_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060021) | 5G Real-time Transport Protocol Configurations, Phase 2 | Normative | TS 26.113 (with TS 26.510, TS 26.522) | Complete, Sep 2025 | SP-241961 |
| [AMD-ARCH-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1060069) | Stage 2 for Advanced Media Delivery | Normative | TS 26.501, TS 26.502; CR to TS 26.506 | Complete, Mar 2025 | SP-241963 |
| [AMD_PRO-MED](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1070057) | Stage 3 for Advanced Media Delivery | Normative | TS 26.510 (with TS 26.511, TS 26.512 and others) | Complete, Dec 2025 | SP-250265 |

5G_RTP_Ph2 extends the RTC provisioning feature to include PDU Set Importance values for PDUs that may be treated as lone PDUs in the UPF, and covers multiplexed RTP streams, burst size, time to next burst and data boosting indication. The other Release 19 change requests are tagged iRTCW, GA4RTAR and TEI19 ("(Small) Technical Enhancements and Improvements for Rel-19").

| Specification | Version | CR | Subject |
| --- | --- | --- | --- |
| TS 26.506 | 19.0.0 | 0009 | Alignment with TS 26.501 CR 103 to include reference point M13 (AMD-ARCH-MED) |
| TS 26.506 | 19.1.0 | 0010 | Application-specific PDU handling |
| TS 26.506 | 19.2.0 | 0012 | Correction on N6-unmarked PDUs |
| TS 26.113 | 19.0.0 | 0007 | Correction of PDU Set Marking in the scope of a Dynamic Policy |
| TS 26.113 | 19.0.0 | 0009 | Addition of Number of PDUs in the PDU Set to Dynamic Policy API |
| TS 26.113 | 19.1.0 | 0011 | Media capability enhancement for RTC endpoint |
| TS 26.113 | 19.1.0 | 0012 | Metadata support for RTC |
| TS 26.113 | 19.1.0 | 0013 | PDU handling and marking enhancements to Dynamic Policy API (5G_RTP_Ph2) |
| TS 26.113 | 19.2.0 | 0014 | CR on SWAP schema inconsistencies |
| TS 26.113 | 19.2.0 | 0015 | CR on handling of close operation in SWAP |

### Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [GA4RTAR](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960044) | Generic architecture for RT and AR/MR | Normative | [TS 26.506](https://www.3gpp.org/dynareport/26506.htm) | Complete, Jun 2023 | SP-220672 |
| [iRTCW](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=950014) | Immersive Real-time Communication for WebRTC | Normative | [TS 26.113](https://www.3gpp.org/dynareport/26113.htm) | Complete, Jun 2024 | SP-230977 |
| [5GMS_Pro_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000018) | 5G Media Streaming Protocols Phase 2 | Normative | [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) (with TS 26.512, TS 26.517, TS 26.532, TS 26.247) | Complete, Jun 2024 | SP-230976 |

TS 26.506 was approved at SA#100 in June 2023, and TS 26.113 in June 2024. The work plan does not list TS 26.506 for GA4RTAR; the change requests to TS 26.506 carry the GA4RTAR code.

| Specification | Version | CR | Subject |
| --- | --- | --- | --- |
| TS 26.506 | 18.1.0 | 0003 | New reference point RTC-11 in UE |
| TS 26.506 | 18.2.0 | 0001 | RTC Functions are general Media Functions |
| TS 26.506 | 18.3.0 | 0005 | Terminology alignment in RTC architecture |
| TS 26.506 | 18.4.0 | 0006 | Terminology correction |
| TS 26.506 | 18.4.0 | 0007 | Clarification on metrics and consumption collection and reporting procedures |
| TS 26.506 | 18.5.0 | 0008 | Clarification on consumption reporting |
| TS 26.506 | 18.6.0 | 0011 | Application-specific PDU handling |
| TS 26.113 | 18.1.0 | 0001 | Dynamic Policies API usage |
| TS 26.113 | 18.1.0 | 0002 | Clarification on Metrics collection |
| TS 26.113 | 18.1.0 | 0003 | Clarification on Metrics URIs |
| TS 26.113 | 18.2.0 | 0004 | Clarifications on consumption reporting |
| TS 26.113 | 18.3.0 | 0007 | Correction of PDU Set Marking in the scope of a Dynamic Policy |
| TS 26.113 | 18.4.0 | 0016 | CR on SWAP schema inconsistencies |
| TS 26.113 | 18.4.0 | 0017 | CR on handling of close operation in SWAP |
