---
hide_title: true
title: Multimedia Delivery Protocols
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
| Unidirectional transport (files)             | FLUTE             | IETF [RFC 6726](https://datatracker.ietf.org/doc/rfc6726/)                                                                                                               |
| Unidirectional transport (real-time objects) | ROUTE             | IETF [RFC 9223](https://datatracker.ietf.org/doc/rfc9223/)                                                                                                               |
| Transport building blocks                    | LCT, ALC, FCAST   | IETF [RFC 5651](https://datatracker.ietf.org/doc/rfc5651/), [RFC 5775](https://datatracker.ietf.org/doc/rfc5775/), [RFC 6968](https://datatracker.ietf.org/doc/rfc6968/) |
| Adaptive streaming format                    | DASH              | [ISO/IEC 23009-1](https://www.iso.org/standard/83314.html)                                                                                                               |
| Adaptive streaming format                    | HLS               | IETF [RFC 8216](https://datatracker.ietf.org/doc/rfc8216/)                                                                                                               |
| Segmented media container                    | CMAF              | [ISO/IEC 23000-19](https://www.iso.org/standard/85623.html)                                                                                                              |
| 3GPP DASH profile                            | 3GP-DASH          | [TS 26.247](https://www.3gpp.org/dynareport/26247.htm)                                                                                                                   |
| DVB DASH profile                             | DVB-DASH          | [ETSI TS 103 285](https://www.etsi.org/deliver/etsi_ts/103200_103299/103285/)                                                                                            |
| 3GPP broadcast delivery (uses FLUTE)         | MBMS              | [TS 26.346](https://www.3gpp.org/dynareport/26346.htm)                                                                                                                   |

## Related IETF Specifications

This is a list of specifications in the scope of Multimedia Content Delivery Protocols: FLUTE is defined in [IETF RFC 6726](https://datatracker.ietf.org/doc/rfc6726/) and ROUTE in [IETF RFC 9223](https://datatracker.ietf.org/doc/rfc9223/). The table below summarises each transport.

| Protocol | Full name                                               | RFC      | Typical use                                       |
| -------- | ------------------------------------------------------- | -------- | ------------------------------------------------- |
| FLUTE    | File Delivery over Unidirectional Transport             | RFC 6726 | File delivery in MBMS-based systems               |
| ROUTE    | Real-time Object delivery over Unidirectional Transport | RFC 9223 | Real-time object delivery in ROUTE/DASH broadcast |

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the ISO/ETSI/3GPP portals block automated access): the specific ISO catalogue editions linked for ISO/IEC 23009-1 (DASH) and ISO/IEC 23000-19 (CMAF), and the current published version of ETSI TS 103 285 (DVB-DASH). The protocol-to-RFC mappings (FLUTE = RFC 6726, ROUTE = RFC 9223, HLS = RFC 8216, and the LCT/ALC/FCAST building blocks) were confirmed. Verify the edition and version numbers against the ISO and ETSI catalogues before publication.
:::

## 5G-MAG tracking and contribution focus

5G-MAG tracks these transport and format specifications and their use across its 5G Broadcast and 5G MBS work. See [Technical Documentation: Multimedia Delivery Protocols](/tech/multimedia/multimedia-content-delivery) for the implementer-facing analysis. Contributions to this documentation are made through the [5G-MAG Standards repository](https://github.com/5G-MAG/Standards/).

## Related Standards Work

- [Standards: 5G Broadcast](/tech/standards/5g-broadcast)
- [Standards: 5G Multicast & Broadcast Services](/tech/standards/5g-mbs)
- [Standards: DVB-I over 5G](/tech/standards/dvb-i)
- [Technical Documentation: Multimedia Delivery Protocols](/tech/multimedia/multimedia-content-delivery)
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
