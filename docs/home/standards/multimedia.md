---
hide_title: true
title: Multimedia Delivery Protocols
slug: /standards/multimedia
description: Overview of FLUTE and ROUTE, the one-way transports carrying DASH, HLS and CMAF media over broadcast and multicast networks.
sidebar_position: 10
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12l0 9"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Multimedia Delivery Protocols</h1>
</div>
</div>

<div class="topic-lead">
FLUTE and ROUTE, the one-way transports behind broadcast and multicast media delivery.
</div>

## Overview

5G-MAG tracks FLUTE and ROUTE, the two unidirectional transport protocols that carry DASH, HLS and CMAF media over broadcast and multicast networks without a return channel. For the technical analysis of how these transports work, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The implementer-facing analysis of the FLUTE and ROUTE transports and how DASH, HLS and CMAF are carried over each.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/multimedia/multimedia-content-delivery">Tech: Multimedia Delivery Protocols</a></li>
</ul>
</div>
</div>

</div>

## Specifications by role

| Role                                         | Protocol / format | Defining specification                                                                                                                                                   |
| -------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unidirectional transport (files)             | FLUTE             | IETF [RFC 3926](https://www.rfc-editor.org/rfc/rfc3926) (version 1, 3GPP-mandated) / [RFC 6726](https://datatracker.ietf.org/doc/rfc6726/) (version 2, reference only)   |
| Unidirectional transport (real-time objects) | ROUTE             | IETF [RFC 9223](https://datatracker.ietf.org/doc/rfc9223/)                                                                                                               |
| Transport building blocks                    | LCT, ALC, FCAST   | IETF [RFC 3451](https://www.rfc-editor.org/rfc/rfc3451) / [RFC 5651](https://datatracker.ietf.org/doc/rfc5651/), [RFC 3450](https://www.rfc-editor.org/rfc/rfc3450) / [RFC 5775](https://datatracker.ietf.org/doc/rfc5775/), [RFC 6968](https://datatracker.ietf.org/doc/rfc6968/) |
| Adaptive streaming format                    | DASH              | [ISO/IEC 23009-1](https://www.iso.org/standard/83314.html)                                                                                                               |
| Adaptive streaming format                    | HLS               | IETF [RFC 8216](https://datatracker.ietf.org/doc/rfc8216/)                                                                                                               |
| Segmented media container                    | CMAF              | [ISO/IEC 23000-19](https://www.iso.org/standard/85623.html)                                                                                                              |
| 3GPP DASH profile                            | 3GP-DASH          | [TS 26.247](https://www.3gpp.org/dynareport/26247.htm)                                                                                                                   |
| DVB DASH profile                             | DVB-DASH          | [ETSI TS 103 285](https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/)                                                                                            |
| 3GPP broadcast delivery (uses FLUTE)         | MBMS              | [TS 26.346](https://www.3gpp.org/dynareport/26346.htm)                                                                                                                   |

## FLUTE: which version, and why

5G-MAG's FLUTE implementation (the [rt-libflute](https://github.com/5G-MAG/rt-libflute) library) targets **FLUTE version 1**, not the newer version 2, because 3GPP's own profile mandates it. The applicable version is reached through this dependency chain:

1. **TS 26.517, clause 6.2.1** &mdash; if FLUTE realises the Object Distribution Method, the MBS Distribution Session *shall conform to* the MBMS Download Profile of TS 26.346 clause L.4.
2. **TS 26.346, clause L.4** &mdash; the Download Profile constrains the FDT parameters of clause 7.2, defined by RFC 3926 and the 3GPP FDT extensions.
3. **TS 26.346, clause 7.2.0** &mdash; clients and servers *shall implement* RFC 3926 (FLUTE), RFC 3450 (ALC) and RFC 3451 (LCT).
4. **RFC 3926** &mdash; "This document specifies FLUTE version 1"; every FDT-carrying packet MUST set the version field to 1.

FLUTE version 1 (RFC 3926 and its companion RFCs 3450/3451) is normative for all 3GPP uses of rt-libflute. The revised IETF generation (RFC 6726 FLUTE v2, RFC 5651, RFC 5775) is reference material only for 3GPP purposes, tracked here because it's still the current IETF text for non-3GPP FLUTE deployments.

## IETF specifications: FLUTE, ALC, LCT and FEC

The table below is specific to the FLUTE/ALC/LCT/FEC stack (the rt-libflute library); see the general table above for ROUTE, DASH, HLS and CMAF.

Normative for 3GPP use, per the chain above:

| Specification | Title | Relevance |
| --- | --- | --- |
| [RFC 3926](https://www.rfc-editor.org/rfc/rfc3926) | FLUTE &ndash; File Delivery over Unidirectional Transport | Core protocol, FDT, version 1 |
| [RFC 3450](https://www.rfc-editor.org/rfc/rfc3450) | Asynchronous Layered Coding (ALC) Protocol Instantiation | Transport building block |
| [RFC 3451](https://www.rfc-editor.org/rfc/rfc3451) | Layered Coding Transport (LCT) Building Block | Header format, TSI/TOI, Close Session/Object flags |
| [RFC 5052](https://www.rfc-editor.org/rfc/rfc5052) | Forward Error Correction (FEC) Building Block | FEC OTI, EXT_FTI, source block partitioning |
| [RFC 3695](https://www.rfc-editor.org/rfc/rfc3695) | Compact No-Code FEC scheme | FEC Encoding ID 0 |
| [RFC 5053](https://www.rfc-editor.org/rfc/rfc5053) | Raptor FEC scheme | FEC Encoding ID 1; the MBMS FEC scheme per TS 26.346 clause 7.2.12 and Annex B |
| [RFC 1952](https://www.rfc-editor.org/rfc/rfc1952) | GZIP file format | Content encoding of files for transport (TS 26.346 clause 7.2.5) |
| [RFC 4607](https://www.rfc-editor.org/rfc/rfc4607) | Source-Specific Multicast (SSM) | Reception filtered on the announced source address |
| [RFC 4570](https://www.rfc-editor.org/rfc/rfc4570) | SDP Source Filters | How SSM sources are announced (SDP handled by consuming applications) |
| [RFC 5905](https://www.rfc-editor.org/rfc/rfc5905) | Network Time Protocol | Time base for FDT and Cache-Control expiry values |

Reference only for 3GPP profiles (still valid IETF text, just not what this library targets):

| Specification | Title | Why it's out of scope here |
| --- | --- | --- |
| [RFC 6726](https://www.rfc-editor.org/rfc/rfc6726) | FLUTE version 2 | Revises RFC 3926; not the 3GPP-mandated profile |
| [RFC 5651](https://www.rfc-editor.org/rfc/rfc5651) | LCT (revised) | Revises RFC 3451 |
| [RFC 5775](https://www.rfc-editor.org/rfc/rfc5775) | ALC (revised) | Revises RFC 3450 |
| [RFC 6330](https://www.rfc-editor.org/rfc/rfc6330) | RaptorQ FEC scheme | FEC Encoding ID 6; not part of the TS 26.346 FEC scheme set |

## 3GPP specifications for FLUTE-based delivery

- [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) &mdash; MBMS; Protocols and codecs. The central specification for FLUTE-based delivery:
  - clause 7.2 &mdash; FLUTE usage for MBMS download (header specializations, FDT schema and 3GPP FDT extensions, FEC schemes, content encoding)
  - clause 7.2.12 and Annex B &mdash; the MBMS FEC scheme (Raptor, RFC 5053)
  - clause 7.3 &mdash; SDP for the download delivery method (consumer scope)
  - clause 9 &mdash; associated delivery procedures, file repair, reception reporting (consumer scope)
  - Annex L &mdash; MBMS Download Profile and MBMS User Service profiles
- [TS 26.347](https://www.3gpp.org/dynareport/26347.htm) &mdash; MBMS URLs and APIs; MBMS client interface towards applications (consumer scope)
- [TS 23.246](https://www.3gpp.org/dynareport/23246.htm) &mdash; MBMS; Architecture and functional description (context)
- [TS 26.517](https://www.3gpp.org/dynareport/26517.htm) &mdash; 5G MBS; User Services and Protocols. Clause 6.2 defines the Object Distribution Method over FLUTE and binds it to the MBMS Download Profile of TS 26.346
- [TS 26.502](https://www.3gpp.org/dynareport/26502.htm) &mdash; 5G MBS; User service architecture
- [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) &mdash; Architectural enhancements for 5G MBS; defines the N3mb/GTP-U transport context served by rt-libflute's UDP tunnel mode
- [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) &mdash; 5G System; MBSTF services; the service APIs of rt-mbs-transport-function, the main 5G MBS consumer of rt-libflute

## Related IETF Specifications

This is a list of specifications in the scope of Multimedia Content Delivery Protocols: FLUTE is defined in [IETF RFC 3926](https://www.rfc-editor.org/rfc/rfc3926) (version 1) / [RFC 6726](https://datatracker.ietf.org/doc/rfc6726/) (version 2) and ROUTE in [IETF RFC 9223](https://datatracker.ietf.org/doc/rfc9223/). The table below summarises each transport.

| Protocol | Full name                                               | RFC      | Typical use                                       |
| -------- | ------------------------------------------------------- | -------- | ------------------------------------------------- |
| FLUTE    | File Delivery over Unidirectional Transport             | RFC 3926 (v1) / RFC 6726 (v2) | File delivery in MBMS-based systems               |
| ROUTE    | Real-time Object delivery over Unidirectional Transport | RFC 9223 | Real-time object delivery in ROUTE/DASH broadcast |

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the ISO/ETSI/3GPP portals block automated access): the specific ISO catalogue editions linked for ISO/IEC 23009-1 (DASH) and ISO/IEC 23000-19 (CMAF), and the current published version of ETSI TS 103 285 (DVB-DASH). The protocol-to-RFC mappings (FLUTE = RFC 3926/6726, ROUTE = RFC 9223, HLS = RFC 8216, and the LCT/ALC/FCAST building blocks), the TS 26.346/26.517 normative chain, and the FEC scheme identifiers were confirmed against primary spec text. Verify the ISO/ETSI edition and version numbers before publication.
:::

## 5G-MAG tracking and contribution focus

5G-MAG tracks these transport and format specifications and their use across its 5G Broadcast and 5G MBS work. See [Technical Documentation: Multimedia Delivery Protocols](/tech/multimedia/multimedia-content-delivery) for the implementer-facing analysis. Contributions to this documentation are made through the [5G-MAG Standards repository](https://github.com/5G-MAG/Standards/).

## Related Standards Work

- [Standards: 5G Broadcast](/standards/5g-broadcast)
- [Standards: 5G Multicast & Broadcast Services](/standards/5g-mbs)
- [Standards: DVB-I over 5G](/standards/dvb-i)
- [Technical Documentation: Multimedia Delivery Protocols](/tech/multimedia/multimedia-content-delivery)
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
