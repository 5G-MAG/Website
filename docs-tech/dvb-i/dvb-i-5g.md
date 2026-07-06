---
title: DVB-I Services over 5G
sidebar_position: 15
hide_title: true
description: Explains DVB-I service discovery and how DVB A178 deploys DVB-I services over 5G Broadcast, 5G Media Streaming, and hybrid delivery.
---


<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg>
</div>
<div class="topic-banner__text">
<h1>DVB-I Services over 5G</h1>
</div>
</div>

## DVB-I Services over 5G Systems - Tech Resources

## Overview

DVB-I (DVB internet, an ETSI-published DVB specification) lets a device discover and present linear TV and radio services delivered over IP, listing broadcast and broadband streams together in a single service list. This page covers how DVB-I service discovery works over 5G Systems, so that services carried by 5G Broadcast or 5G Media Streaming can appear alongside other IP-delivered content. 5G-MAG tracks this work and maintains related reference tooling. For acronyms used here, see the [Glossary](/tech/standards/glossary).

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/17)

The slide deck below introduces DVB-I service discovery over 5G Systems; download the file for the full detail.

<iframe width="60%" height="520" src="/docs/Reference_Tools_DVB_I_over_5G.pdf"></iframe>

[Download the slidedeck with more information](/docs/Reference_Tools_DVB_I_over_5G.pdf)

---

## DVB-I service discovery in detail

DVB-I service discovery is specified by DVB A177, published in identical technical form by ETSI as TS 103 770 (Digital Video Broadcasting (DVB); Service Discovery and Programme Metadata for DVB-I). It is an XML-based, delivery-agnostic layer: the client discovers services and their metadata, and the delivery of the actual media is handled by whatever bearer each service references.

### Data model

The relevant objects for an implementer are:

* **Service List**: the XML document a provider publishes. It contains one or more `Service` entries, each with a stable identifier, presentation metadata (names, logos), optional targeting, and one or more service instances.
* **Service Instance**: a concrete way to obtain a given service. Each instance carries a delivery parameter set that binds the service to a specific bearer and format. Multiple instances on one service is the mechanism used to describe the same channel over unicast, multicast, and broadcast at the same time.
* **Content Guide / Programme Metadata**: schedule (now/next and longer) and on-demand programme information, expressed with the DVB schemas aligned to the TV-Anytime data model, retrievable per service.

The delivery-parameter types inside a service instance are the extension point the 5G work relies on. The service instance can reference:

* a DASH delivery (a DVB-DASH presentation) for unicast,
* a DVB multicast (DVB-MABR) session for scalable delivery, or
* a broadcast source carried on a broadcast bearer.

The client evaluates the available instances against local capability and coverage, then selects one; this is where broadcast/unicast fallback is realised.

### Bootstrap and the Service List Registry

A client needs a starting point. TS 103 770 defines a Service List Registry (SLR) query API so a client can find service lists (for example filtered by country or provider) rather than relying on a hard-coded URL. The typical bootstrap sequence is: query the registry, obtain one or more service-list URLs, fetch the chosen service list, then resolve service instances and (on demand) content-guide data. In a 5G deployment the registry and service-list endpoints are ordinary HTTPS resources and can themselves be delivered over the unicast path.

## Delivery over 5G Systems

The deployment guidance for carrying DVB-I over 5G is DVB A178, published by ETSI as TR 103 972 (DVB-I service delivery over 5G Systems; Deployment Guidelines). It was produced by the DVB / 5G-MAG Joint Task Force, which mapped the commercial requirements captured in DVB C100 (Commercial Requirements for DVB-I over 5G, 2021) into a reference architecture and per-scenario workflows, and recorded the specification gaps it found. Because TR 103 972 is a technical report, its output is guidance and recommended changes rather than normative requirements.

### Reference architecture

The report proposes a single DVB-I-over-5G reference architecture that supports all three service scenarios. The consistent principle is a clean split between layers:

* **Service layer (DVB-I)**: discovery, selection, and programme metadata. Unchanged across scenarios.
* **Media format layer (DVB)**: DVB-DASH (ETSI TS 103 285) for the media presentation; DVB-MABR (ETSI TS 103 769) where multicast delivery is used. The media pipeline above the bearer is the same whether the segments arrived by unicast or by broadcast.
* **Transport layer (3GPP / ETSI)**: 5G Media Streaming for unicast, and the LTE-based 5G Broadcast system (ETSI TS 103 720) for broadcast.

### The three service scenarios

| Scenario | Bearer | DVB media | 3GPP / ETSI transport |
| -- | -- | -- | -- |
| Standalone DVB-I over 5G Broadcast | Broadcast only | DVB-MABR carrying DVB-DASH | ETSI TS 103 720 (LTE-based 5G Broadcast) |
| DVB-I over 5GMS | Unicast only | DVB-DASH | 3GPP 5GMS ([TS 26.501](https://www.3gpp.org/dynareport/26501.htm) and companions) |
| Concurrent / hybrid | Broadcast and unicast | DVB-DASH, DVB-MABR on the broadcast leg | Both of the above |

**Standalone DVB-I over 5G Broadcast.** The service list is delivered (or pre-provisioned) and the selected service instance references a broadcast source. The client receives a DVB-MABR-style multicast on the 5G Broadcast bearer and reconstructs the DVB-DASH presentation locally. There is no unicast return leg for the media itself; any interactivity depends on separate connectivity.

**DVB-I over 5GMS.** The service instance references a DASH source served through 5G Media Streaming. The 5GMS downlink architecture (3GPP TS 26.501) provides the Media Application Server, session handling, and reporting; the DVB-DASH presentation is fetched and rendered by a 5GMS-aware client. The DVB-I layer above is unchanged.

**Concurrent / hybrid.** Both a broadcast instance and a unicast instance are present for the same service. The client selects or switches between them based on coverage and capability, for example receiving popular linear channels over broadcast while using unicast for on-demand or out-of-coverage fallback.

### Service discovery meets 3GPP service announcement

A specific alignment question the report examines is the relationship between DVB-I service discovery and the 3GPP service announcement used on the broadcast/multicast path. On the 5G Broadcast side, 3GPP defines its own service announcement carrying the parameters a receiver needs to acquire a session. The report considers how a DVB-I service list can reference, or coexist with, that announcement rather than duplicating the same information in two places. This is one of the areas where recommended changes were fed back to the responsible bodies.

### Interfaces and reference points

The DVB-I layer itself exposes HTTP(S) interfaces: the Service List Registry query API, the service-list endpoint, and the content-guide/metadata endpoints, all defined in TS 103 770. On the transport side the reference points are those of the underlying 3GPP/ETSI systems rather than DVB:

* On the unicast path, the 5GMS reference points (for example the interfaces between the 5GMS-Aware Application, the Media Session Handler, the 5GMS AF, and the Media Application Server) apply as defined in 3GPP TS 26.501. See the [5GMS tech page](/tech/5gms) for the detail of those reference points.
* On the broadcast path, the reception and session-acquisition behaviour is defined by ETSI TS 103 720 and the underlying LTE terrestrial broadcast / MBMS procedures. See the [5G Broadcast tech page](/tech/5g-broadcast).

DVB-I contributes the delivery parameters that tell the client which of these transports to use for a given service instance; it does not redefine the transport reference points.

### Identified gaps and follow-up

Because A178 is a technical report, a substantial part of its value is the catalogue of gaps it identified and the recommended changes to specifications owned by DVB, 3GPP and ETSI. The follow-up on those recommendations happens in the respective bodies (DVB for the DVB-I and delivery-format specifications, 3GPP SA4 for 5GMS and MBS, ETSI JTC Broadcast for TS 103 720). Implementers should treat the report as a snapshot of the integration approach and check the current versions of the referenced specifications for the state of any given item.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the 3GPP TS 26.501 reference-point names summarised above, and the Release placement of the 5GMS and MBS work. The DVB and ETSI document numbers/titles (A177/TS 103 770, A178/TR 103 972, C100, TS 103 720, TS 103 285, TS 103 769) were confirmed against DVB/ETSI sources. Verify against the 3GPP/ETSI work plan before publication.
:::

## Information related to Standards

[Standards](/tech/standards/dvb-i)

## Information related to Reference Tools Projects

[Project: DVB-I Services over 5G Systems](/developer/dvb-i)
