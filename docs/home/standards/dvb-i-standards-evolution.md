---
hide_title: true
title: DVB-I Services over 5G - Standards Evolution
slug: /standards/dvb-i/evolution
description: Revision history of DVB A177 (ETSI TS 103 770) and ETSI TR 103 972, the specifications behind DVB-I Services over 5G Systems.
sidebar_label: Release history
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>DVB-I Services over 5G - Standards Evolution</h1>
</div>
</div>

This page is the detailed, revision-by-revision companion to [DVB-I Services over 5G: Specifications](/standards/dvb-i). DVB-I is specified by DVB and published by ETSI; its history is the document history of each specification. The 3GPP parts that DVB-I uses over 5G follow the 3GPP release process and are covered on [Media Streaming and Advanced Media Delivery: Release history](/standards/5gms/evolution), [Media delivery over 5G Multicast Broadcast Services: Release history](/standards/5g-mbs/evolution) and [Media delivery over 5G Broadcast: Release history](/standards/5g-broadcast/evolution).

:::tip[At a glance]

- **ETSI TS 103 770:** V1.1.1 (November 2020) and V1.2.1 (September 2024) are published. V1.2.1 is the latest published version known to 5G-MAG; the publication of V1.3.1 by ETSI has not been verified.
- **DVB A177:** revisions r1 (July 2020) to r8 (30 June 2026). r8 is marked in its history as "Draft TS 103 770 v1.3.1". It is a draft, and it is the text the [DVB-I implementation audit](/reference-tools/dvb-i/implementation) is judged against.
- **ETSI TR 103 972:** V1.1.1 (July 2023) is the only version.

:::

## DVB A177 and ETSI TS 103 770

The History clauses of DVB BlueBook A177r8 (June 2026) give the revision history below, with the ETSI publication that each corresponds to. The text quoted for each revision is the first sentence of its entry; the History lists further changes for most of them.

| Revision | Date | ETSI publication | First entry in the History |
| --- | --- | --- | --- |
| A177r1 | July 2020 | TS 103 770 V1.1.1 | "Initial Version" |
| A177r2 | July 2021 |  | "Added extensibility signalling to the service instance delivery type allowing different delivery systems to be specified" |
| A177r3 | January 2022 |  | "Multilingual elements can inherit the natural language identifier from an ancestor element." |
| A177r4 | September 2022 |  | "The service list logo can be signalled either in-band or by reference in the service list registry response to aid UI design." |
| A177r5 | July 2023 |  | "Information related to implementation aspects is moved to DVB Bluebook A184." |
| A177r6 | January 2024 | TS 103 770 V1.2.1 | "Added the &lt;IdentifierBasedDeliveryParameters&gt; element for service instances whose delivery parameters can be expressed as a URI." |
| A177r7 | July 2025 |  | "Support for signalling of application to gain, renew and withdraw user consent of terms of service for the service list." |
| A177r7 2nd edition | December 2025 |  | "Replaces the callback URLs with a Websocket mechanism for communicating the completion state of a linked application towards the DVB-I client." |
| A177r8 | June 2026 | Draft TS 103 770 v1.3.1 | "Allows the integrity of linked resources to be verified using either content digests or signatures." |

The History of ETSI TS 103 770 V1.2.1 lists two publications: V1.1.1 (November 2020) and V1.2.1 (September 2024). The History of A177r8 lists no ETSI publication of V1.3.1; its last entry is marked as a draft.

### What the A177r7 and A177r8 drafts changed

V1.2.1 corresponds to A177r6. Everything below is therefore in the drafts that follow it. The sources are the History of A177r8 and the clause cited for each item. Two revisions are drafts: A177r7 (July 2025, second edition December 2025) is listed in the History without an ETSI publication, and A177r8 is marked "Draft TS 103 770 v1.3.1".

| Change | Revision | A177r8 clause |
| --- | --- | --- |
| Image requests and image data are two new interfaces, I1 and I2. The `image_variant` parameter, including 2:3 portrait variants, belongs to this clause; the parameter itself is not new (A177r3 and V1.2.1 have it). | r3 (parameter); r8 (portrait images, I1 and I2 in the interface list) | 4.1; 5.2.8.2.1 |
| Customised queries: an endpoint can describe its own query parameters with a `?querycapabilities` request, using schema based or identifier based extensibility. | r7 | 4.3.4 |
| Signature validation of responses that carry an `X-JWS-Signature` header, with an optional `Reporting-Endpoints` header for verification issues. | r8 | 4.3.5.1; 7.6.2.5; 7.7.1.2 |
| Versioning: a version number in the service list URL, `ServiceListURI@standardVersion` in a registry response, `ServiceList.StandardVersion` in the list, and a DVB-I `User-Agent` header from the client. Without a version, V1.2.1 (A177r6) is the default. | r7 | 4.6.1; 4.6.2; table 1c |
| Discovery of service lists and registries on the local network with mDNS and DNS-SD. | r8 | 5.1.3.9 |
| An installed service list can be removed and blocked from being installed again. | r7 or r8 (not stated in the History) | 5.1.3.10 |
| Linked applications: consent, renewal and withdrawal applications for a service list; an application in series with media; JSON messages between a linked application and the client; and a WebSocket mechanism in place of callback URLs. | r7; r7 second edition (WebSocket) | 5.2.3.2.4; 5.2.3.6; 5.2.3.8; I.2 |
| CMCD client reporting for DVB-DASH service instances, with version 2 client initialisation for request and event based reporting. | r7; r8 (version 2) | 5.5.30; 8.5.4.2 |
| A Licence Acquisition URL override (`@LAURL`) and `@certificateURL` for a DRM system in a service instance. | r8 | 5.5.20, table 35 |
| Integrity of linked resources: content digests in the `@integrity` attribute, signature policies, detached JWS signatures, and use of DNSSEC. | r8 | 7.4.1; 7.5; 7.6; 7.7 |
| `BroadcastEvent` replaces `ScheduleEvent` in the Programme Information response and can appear in the More Episodes response. | r8 | 4.6.3; 6.6; 6.7 |
| XML namespaces move from the 2024 form (V1.2.1) to the 2026 form, for example `urn:dvb:metadata:servicediscovery:2026`. The History does not list this change. | r8 | 5.4.1; annex A |

The A177r8 interoperability notes (clause 4.6.3) list the changes that can affect a client built for an earlier revision. The versioning rules in clause 4.6 govern how a client and a server tell which revision a list follows.

Two entries concern delivery over 5G. Revision r6 also lists: "Definition of service class identifiers for metadata elements conveyed in MBMS User Services." Revision r8 also lists: "Include support for announcing Service Lists using Multicast DNS."

## ETSI TR 103 972

The History of ETSI TR 103 972 V1.1.1 (2023-07) lists one publication: V1.1.1 (July 2023). It is a technical report, not a normative specification.

<details>
<summary>Sources for this page</summary>

- DVB BlueBook A177r8 (30 June 2026, draft), History, "Document history" (revision table), and the clauses cited in the table of changes.
- ETSI TS 103 770 V1.2.1 (2024-09), History, "Document history".
- ETSI TR 103 972 V1.1.1 (2023-07), History, "Document history".

</details>

## Related

- [DVB-I Services over 5G: Specifications](/standards/dvb-i)
- [DVB-I Services over 5G: Technical Analysis](/tech/dvb-i)
