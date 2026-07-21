---
title: Advanced Media Delivery
sidebar_position: 2
hide_title: true
description: Overview of Advanced Media Delivery, the Release 19 5GMS extensions studied in TR 26.804, covering the CMCD and CMMF features.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>Advanced Media Delivery</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Advanced Media Delivery - Overview

:::note Prerequisite
This page assumes familiarity with the 5G Media Streaming (5GMS) architecture, its functional entities and its reference points. If you are new to 5GMS, read the [5GMS Overview](./overview-5gms) first.
:::

Advanced Media Delivery covers the Release 19 (and later) extensions to 5G Media Streaming (5GMS) studied in 3GPP [TR 26.804](https://www.3gpp.org/dynareport/26804.htm). These build on the 5GMS architecture to improve reporting, multi-source and multi-access delivery, and quality of service. The features and their normative specifications are listed on the [Standards page](/tech/standards/5gms). The reference-point and clause numbers below point to the Release 18 (or later) versions of [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) and TS 26.512; verify them against the specific specification release you are targeting.

**Note on labels:** the reference points below use the generalised TS 26.510 names (M1, M3, M4, M5), which correspond to the downlink-specific M1d, M3d, M4d and M5d used elsewhere in this documentation. M7d is the UE-internal Media Player API and M11d is the UE-internal Media Session Handler configuration API; R5 and R6 are the data-collection reference points used for event exposure (for example to NWDAF or an Event Consumer AF). Confirm these mappings against the specification release you are targeting.

## Common Media Client Data (CMCD)

Common Media Client Data (CMCD) is a standard set of client-side measurements (defined by the Consumer Technology Association in CTA-5004) that a media player attaches to its media requests, or reports separately, so that delivery infrastructure can correlate client behaviour with network and server data. 3GPP integrates CMCD into the 5GMS reporting framework through the following interactions.

- Metrics Reporting Provisioning API via M1 defined in TS 26.510, 8.11, with `scheme` property defined in [TS 26.512](https://www.3gpp.org/dynareport/26512.htm), 7.8. Service Access Information provided to Media Session Handler via M5.
- In-band client reporting on M4 (Media Session Handler - Application Server) defined in TS 26.512, 10.5
- Client data reporting on M3 (Application Server - Application Function) defined in TS 26.512, 11.4.3
- In-band client reporting in DASH, defined in TS 26.512, Annex G.5

### Alternatives

- Configuration of Reporting via Service URL defined in TS 26.512, 12.4
- Configurations and settings API for Media Player via M7d (5GMSd-Aware Application) and M11d (Media Session Handler) defined in clause 13.2.4 of TS 26.512

### Event exposure to NWDAF or Event Consumer AF

Collected client data can be exposed to consuming functions, such as the Network Data Analytics Function (NWDAF) or an Event Consumer Application Function (AF), over the data-collection reference points.

- Event exposure on R5/R6 defined in clause 18.3.3 of TS 26.512

## Coded Multisource Media Format (CMMF)

Coded Multisource Media Format (CMMF) is specified in ETSI TS 103 973. It applies erasure coding to media objects so that a client can retrieve a single object in parallel from multiple sources (for example several Content Delivery Networks (CDNs) or both unicast and broadcast paths) and reconstruct it from any sufficient subset of the coded data. This improves resilience and download throughput for multi-CDN and multi-access delivery. See the [Standards page](/tech/standards/5gms) for the specification link.

:::note Figure to add
A diagram would help here: show one media object erasure-coded into chunks, delivered in parallel from two or more sources (for example CDN A, CDN B and a broadcast path) to a single client that reconstructs the object from any sufficient subset of the received chunks.
:::

## Where AMD sits in the specifications

Advanced Media Delivery is not a new architecture. It extends the existing 5GMS reference points and the generalised media delivery APIs. The study phase is captured in TR 26.804 (informative); the resulting normative changes are folded into the media delivery specifications, principally TS 26.510 (provisioning and session handling), TS 26.512 (protocols) and, for multicast and broadcast delivery, the 5G Multicast and Broadcast Services (MBS) media specifications. Because AMD spans several specifications and releases, each feature below should be checked against the specific version you are targeting.

## Release-19 AMD topics

The two features above (CMCD and CMMF) are the ones with reference-tool relevance today. TR 26.804 studies a wider set of Advanced Media Delivery topics. The following summarises them at a level appropriate for an implementer deciding what to track; the normative detail belongs to the specifications that each topic feeds.

- **Client data reporting (CMCD).** Standardised client-side measurements attached to media requests or reported separately, integrated into the 5GMS reporting framework as described above.
- **Multi-source delivery (CMMF).** Erasure-coded retrieval of a single media object from several sources in parallel, for multi-CDN and mixed unicast/broadcast delivery, as described above.
- **Multi-access delivery.** Using more than one access path (for example two operator networks, or cellular plus Wi-Fi) for the same media session, including how the client and network coordinate the split.
- **Multicast and broadcast delivery.** Delivering 5GMS content over 5G Multicast and Broadcast Services (MBS) or eMBMS bearers, and switching between unicast and multicast, including in-session unicast repair for object distribution.
- **Improved QoS support.** Tighter interaction with the 5G Core policy and QoS functions so that a media session can request, monitor and adapt to the QoS it is granted.
- **Network slicing.** How a media streaming service is associated with a network slice, and what the Application Provider and AF need to express to place a session on a given slice.
- **Time synchronisation.** Aligning playback timing across clients and with a common reference, which matters for synchronised and interactive experiences.
- **Encrypted and high-value content.** Handling of protected content in the delivery path.

Not all of these have completed the move from study to normative text, and the release placement of individual items can change as 3GPP SA4 progresses the work. See the [Standards page](/tech/standards/5gms) for the specifications and technical reports, and confirm the status of a given feature against the 3GPP work plan.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the TS 26.510 clauses (8.11), the TS 26.512 clauses (7.8, 10.5, 11.4.3, 12.4, 13.2.4, 18.3.3 and Annex G.5), the M7d/M11d and R5/R6 reference-point mappings, and the release placement of the individual Release-19 AMD topics listed above. Verify against the specific specification version you are targeting.
:::
