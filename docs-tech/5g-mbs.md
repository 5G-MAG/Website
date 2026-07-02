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

**Reference tools:** The 5G-MAG software implementation is on the developer portal under [5G Multicast Broadcast Services](https://developer.5g-mag.com/5g-multicast-broadcast-services/).

:::caution
The developer-portal link above was corrected from a hub.5g-mag.com host to the developer portal (developer.5g-mag.com). Confirm the exact slug against the live developer portal before publishing.
:::

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/8)

The slide deck below summarises the 5G-MAG reference tools for 5G Multicast-Broadcast Services.

<iframe width="60%" height="520" src="/docs/Reference_Tools_5G_Multicast_Broadcast.pdf"></iframe>

[Download the Slidedeck](/docs/Reference_Tools_5G_Multicast_Broadcast.pdf)

## How the pieces fit together

An MBS session travels through three layers, and the technical pages below are organised to follow that path from the content provider down to the device.

* The **user-service layer** (TS 26.502) is where a content provider provisions a service, has it announced to clients, ingests content and optionally repairs lost data. It is realised by the Multicast/Broadcast Service Function (MBSF) on the control plane and the Multicast/Broadcast Service Transport Function (MBSTF) on the user plane. This layer is optional: a provider can also drive the core directly.
* The **5G Core layer** (TS 23.247) defines the multicast and broadcast communication services, the MBS sessions that carry them, and the two ways the core delivers packets towards the radio: the 5GC shared method (one copy per MBS-capable RAN node) and the 5GC individual method (a per-UE copy for MBS-incapable nodes). The MBS-specific core functions are the MB-SMF and the MB-UPF.
* The **NR / NG-RAN layer** (TS 38.300 family) is where the gNB chooses point-to-multipoint (PTM) or point-to-point (PTP) delivery and applies one of three Layer-2 delivery modes.

Two distinctions recur across the pages and are worth fixing early. First, *delivery method* (PTM vs PTP) is how the gNB sends over the air, while *delivery mode* (1 multicast, 2 broadcast, or unicast) is the Layer-2 configuration that carries it. Second, the *5GC* traffic delivery methods (shared vs individual) describe the core network, not the radio, and should not be confused with the RAN delivery methods. The [RAN Aspects](./5g-mbs/ran-aspects) page keeps these separate.

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
