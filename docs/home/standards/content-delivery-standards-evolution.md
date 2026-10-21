---
hide_title: true
title: Content Delivery Protocols and Tools - Standards Evolution
slug: /standards/content-delivery/evolution
description: Release-by-release 3GPP work item and Change Request history behind Content Delivery Protocols and Tools.
sidebar_label: Release history
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12l0 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Content Delivery Protocols and Tools - Standards Evolution</h1>
</div>
</div>

This page is the release-by-release companion to [Standards: Content Delivery Protocols and Tools](/standards/content-delivery): when each document was published, and the Change Requests to TS 26.346 and TS 26.517 that touch FLUTE delivery.

## IETF documents

| Document | Published | Status |
| --- | --- | --- |
| RFC 3450 (ALC) and RFC 3451 (LCT) | December 2002 | Experimental |
| RFC 3926 (FLUTE version 1) | October 2004 | Experimental |
| RFC 5052 (FEC building block) and RFC 5053 (Raptor) | August and October 2007 | Standards Track |
| RFC 6726 (FLUTE version 2) | November 2012 | Standards Track, obsoletes RFC 3926 |
| RFC 9223 (ROUTE) | April 2022 | Informational, independent submission |

## 3GPP work items per release

The work items below are those that the 3GPP release descriptions (TR 21.915 to TR 21.919) say changed TS 26.346 or TS 26.517. Only some of them concern FLUTE delivery; the others are listed so that the TS 26.346 changes of each release can be told apart.

| Release | Work item | What it changed in these specifications | Release description |
| --- | --- | --- | --- |
| 15 | HDR | Media capabilities for High Dynamic Range added to MBMS in TS 26.346 | TR 21.915 clause 12.4.2 |
| 15 | VRStream | Virtual reality media profiles enabled in MBMS in TS 26.346 | TR 21.915 clause 12.4.3 |
| 15 | FRASE | Forward Error Correction and Robust Header Compression for the MBMS GC and Transport delivery methods, not for the download method | TR 21.915 clause 12.4.4 |
| 15 | SAND4M | Hybrid MBMS services, including unicast-supplemented services, in TS 26.346; a SAND mode in TS 26.247 | TR 21.915 clause 12.5.3 |
| 16 | CAPIF4xMB | The xMB stage 2 architecture and procedures moved from TS 26.346 to the new TS 26.348 | TR 21.916 clause 9.1 |
| 16 | MC_XMB | A "self-contained" service announcement mode added to TS 26.346, with the announcement metadata delivered in-band on the same MBMS bearer; reuse of the MBMS download delivery method for MCData file distribution | TR 21.916 clause 12.4.1 |
| 16 | SerInter | Service interactivity for DASH over MBMS added to TS 26.346 and TS 26.247 | TR 21.916 clause 20.1 |
| 17 | 5MBUSA | New TS 26.502 (MBS User Service architecture); stage 3 for the MBS user services in TS 26.517, TS 26.346, TS 26.347 and TS 26.348 | TR 21.917 clause 6.3.4.5 |
| 17 | 5MBP3 | New TS 26.517 for user service announcement (M5) and for the MBS distribution methods (M4): the Object distribution method, based on the MBMS download delivery method of TS 26.346, and the Packet distribution method, based on the transparent delivery method | TR 21.917 clause 6.3.4.3.3 |
| 18 | UEConfig5MBS | UE pre-configuration for 5MBS; the pre-configured user service description information refers to TS 26.517 | TR 21.918 clause 12.3 |
| 18 | 5GMS_Pro_Ph2 | Support for 5GMS over MBS and hybrid 5GMS services; updates to TS 26.247 among others | TR 21.918 clause 17.9 |
| 19 | AMD | In-session unicast repair for MBS object distribution (stage 2 in TS 26.502, stage 3 for MBS and MBMS sessions); the Coded Multi-Source Media Format (ETSI TS 103 973) listed among the stage 3 items | TR 21.919 clause 11.6 |

Release 20 (work plan of 28 September 2026): no work item lists TS 26.346, TS 26.347, TS 26.348 or TS 26.517. There is no TR 21.920 in the archive used for this page, so a Release 20 change that no work plan row lists is not excluded.

Not stated in the release descriptions: which clauses of TS 26.346 the Release 17 to Release 19 work items changed beyond the Change Requests listed below; for those, the change history of the specification is the source.

## TS 26.346: Change Requests on FLUTE delivery

Taken from the change history of TS 26.346 V19.3.0, which lists Change Requests from 2016 onwards.

| Date | CR | Subject | Version |
| --- | --- | --- | --- |
| 2016-09 | 0562 | Use of ETag for byte-range-based file repair request | 13.6.0 |
| 2018-12 | 0624 | Update of MBMS Download Delivery Profile | 16.0.0 |
| 2020-06 | 0632 | Correction of MBMS Download Profile | 16.5.0 |
| 2022-06 | 0661 | Feature reduced FLUTE FDT schema | 17.1.0 |
| 2025-09 | 0677 | In-session unicast repair for MBMS Object Distribution | 19.2.0 |

## TS 26.517: the Object Distribution Method

| Date | Change | Version |
| --- | --- | --- |
| 2022-04 | Object Distribution Method initial specification | 1.1.0 |
| 2022-06 | Under change control (Release 17) | 17.0.0 |
| 2023-06 | CR 0007: manifest format for Object Collection and Carousel | 17.3.0 |
| 2024-06 | CR 0020: essential object manifest schema update | 18.1.0 |
| 2025-10 | CR 0031: consolidated additions for Advanced Media Delivery | 19.0.0 |
| 2025-12 | CR 0036: OpenAPI YAML updates for in-session repair | 19.1.0 |

## ETSI TS 103 973 (CMMF)

| Version | Published |
| --- | --- |
| V1.1.1 | October 2024 |
| V1.2.1 | March 2026 |
| V1.2.2 | May 2026 |

<details>
<summary>Sources for this page</summary>

- **IETF documents:** the header of each RFC.
- **3GPP work items per release:** TR 21.915, TR 21.916, TR 21.917, TR 21.918 and TR 21.919 (V19.0.0, which may be an early version), at the clauses named in the table.
- **TS 26.346:** change history of TS 26.346 V19.3.0.
- **TS 26.517:** change history of TS 26.517 V19.3.0.
- **ETSI TS 103 973:** History of ETSI TS 103 973 V1.2.2.

</details>
