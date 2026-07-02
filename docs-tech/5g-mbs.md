---
hide_title: true
title: Multicast & Broadcast in 5G
sidebar_position: 4
---


<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
<h1>Multicast & Broadcast in 5G - Docs</h1>
</div>

5G Multicast and Broadcast Services (MBS) introduce native point-to-multipoint delivery into 5G New Radio (NR), standardised from 3GPP Release 17 onwards. Delivery can be point-to-multipoint (PTM), one transmission shared by many devices, or point-to-point (PTP), a separate copy per device, with the network choosing between them. Unlike LTE-based broadcast (evolved Multimedia Broadcast Multicast Service, eMBMS), 5G MBS is integrated directly into the 5G Core and Radio Access Network (RAN), enabling efficient distribution of identical content to many devices simultaneously, whether for live TV, emergency alerts, or software updates. 5G-MAG implements the MBS user service layer defined in 3GPP [TS 26.502](https://www.3gpp.org/dynareport/26502.htm), covering service announcement, session management, and media delivery.

**Key specifications:** 3GPP TS 26.502 (MBS user services), [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) (MBS architecture), [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) (5G Media Streaming, 5GMS, framework referenced for hybrid delivery), [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) / [TS 38.331](https://www.3gpp.org/dynareport/38331.htm) (RAN procedures for broadcast mode).

**Reference tools:** The 5G-MAG software implementation is on the developer portal under [5G Multicast Broadcast Services](/developer/5g-mbs).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The three-layer architecture (user service, 5G Core, NR/NG-RAN) and the mobility and RAN-procedure analysis pages.</p>
<ul class="godeeper-card__links">
<li><a href="./5g-mbs/overview-mbs">MBS Overview</a></li>
<li><a href="./5g-mbs/ran-aspects">RAN Aspects</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>The 3GPP specification list grouped by layer, and 5G-MAG's standards contributions.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/5g-mbs">Standards: 5G Multicast Broadcast Services</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference implementation for 5G-native multicast and broadcast delivery.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/5g-mbs">5G Multicast Broadcast Services</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/8)

The slide deck below summarises the 5G-MAG reference tools for 5G Multicast-Broadcast Services.

<iframe width="60%" height="520" src="/docs/Reference_Tools_5G_Multicast_Broadcast.pdf"></iframe>

[Download the Slidedeck](/docs/Reference_Tools_5G_Multicast_Broadcast.pdf)

## How the pieces fit together

An MBS session travels through three layers, and the technical pages below are organised to follow that path from the content provider down to the device.

* The **user-service layer** (TS 26.502) is where a content provider provisions a service, has it announced to clients, ingests content and optionally repairs lost data. It is realised by the Multicast/Broadcast Service Function (MBSF) on the control plane and the Multicast/Broadcast Service Transport Function (MBSTF) on the user plane. This layer is optional: a provider can also drive the core directly.
* The **5G Core layer** (TS 23.247) defines the multicast and broadcast communication services, the MBS sessions that carry them, and the two ways the core delivers packets towards the radio: the 5GC shared method (one copy per MBS-capable RAN node) and the 5GC individual method (a per-UE copy for MBS-incapable nodes). The MBS-specific core functions are the MB-SMF and the MB-UPF.
* The **NR / NG-RAN layer** (TS 38.300 family) is where the gNB (the 5G base station) chooses point-to-multipoint (PTM) or point-to-point (PTP) delivery and applies one of three Layer-2 delivery modes.

Two distinctions recur across the pages and are worth fixing early, since the terms sound alike but describe different layers:

| Term | Layer | Values | What it means |
|---|---|---|---|
| Delivery method | Radio (RAN) | PTM (point-to-multipoint) or PTP (point-to-point) | How the gNB (the 5G base station) physically sends the data over the air: one shared transmission, or a separate copy per device. |
| Delivery mode | Radio (RAN), Layer 2 | 1 (multicast), 2 (broadcast), or unicast | The Layer-2 configuration that carries the delivery method above — a separate setting from the method itself. |
| 5GC traffic delivery method | Core network | Shared or individual | How the 5G Core sends packets towards the radio: one copy per MBS-capable node (shared) or a per-UE copy for nodes that don't support MBS (individual). Describes the core, not the radio — don't confuse with the RAN delivery method row above. |

The [RAN Aspects](./5g-mbs/ran-aspects) page keeps these separate in more detail.

For the 3GPP specification list grouped by layer, see [Standards: 5G Multicast Broadcast Services](/tech/standards/5g-mbs). The [developer portal](https://developer.5g-mag.com/5g-multicast-broadcast-services/) covers what the reference software implements.

---

## Information related to Standards

[Standards: 5G Multicast Broadcast Services](/tech/standards/5g-mbs)

[Standards: Multimedia Delivery Protocols](/tech/standards/multimedia)

---

## Technical Documentation

The following resources are available. If you are new to MBS, start with the Overview, then read the architecture pages top to bottom (service layer, then service and system aspects, then RAN aspects); the analysis pages go deeper into specific radio procedures and can be read as needed.

### General information about 5G Multicast Broadcast Services

* [**MBS Overview**](./5g-mbs/overview-mbs): a plain-language introduction to multicast and broadcast services, delivery methods, and what MBS can be used for.

#### VideoTech

* [**User Services for the 5G Multicast-Broadcast Service (3GPP Release 17)**](./videos#user-services-for-the-5g-multicast-broadcast-service-3gpp-release-17)

### Architecture aspects of 5G Multicast Broadcast Services

* [**Summary of MBS Service Layer Aspects**](./5g-mbs/mbs-service-layer): the user-service layer (TS 26.502), covering MBS User Services, the MBSF and MBSTF functions, and how content providers provision sessions.
* [**Summary of MBS Service and System Aspects**](./5g-mbs/mbs-service-system-aspects): the 5G Core architecture (TS 23.247), covering MBS communication services, sessions, and the shared and individual traffic delivery methods.
* [**Summary of MBS RAN Aspects**](./5g-mbs/ran-aspects): the radio side, covering how the gNB chooses PTM or PTP delivery and the three RAN delivery modes.

### Analysis of MBS Multicast

* [**Analysis of Mobility aspects for MBS Multicast Services**](./5g-mbs/mobility-mbs-multicast): how multicast reception continues across handover between cells.
* [**Analysis of RAN Procedures for MBS Multicast Inactive**](./5g-mbs/analysis-mbs-multicast-inactive-ran): the Release 18 extension that lets a UE receive multicast in the RRC_INACTIVE state.

### Analysis of MBS Broadcast

* [**Analysis of RAN Procedures for MBS Broadcast**](./5g-mbs/analysis-mbs-broadcast-ran): the step-by-step radio acquisition of a broadcast service, with the relevant signalling.

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
