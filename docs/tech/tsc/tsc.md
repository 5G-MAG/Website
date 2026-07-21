---
title: Time Sensitive Communications
sidebar_position: 11
hide_title: true
description: Explains how 3GPP Time Sensitive Communications lets 5G carry deterministic, low-jitter traffic for live production over Non-Public Networks.
---

<header class="topic-hero">
<div class="topic-hero__icon">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 10l0 3l2 2"/><path d="M7 4l-2.75 2"/><path d="M17 4l2.75 2"/></svg>
</div>
<div>
<h1 class="topic-hero__title">Time Sensitive Communications</h1>
</div>
</header>

<div class="topic-lead">
Deterministic, low-jitter 5G transport for tightly synchronised professional media, typically over a Non-Public Network.
</div>

Time Sensitive Communications (TSC) covers the 3GPP features that let a 5G network carry traffic with bounded, predictable latency and tight timing, rather than best-effort delivery. In media production this matters for live workflows, for example synchronising cameras, audio and control signals over a wireless link where jitter and timing drift are not acceptable. 5G-MAG tracks how these deterministic-delivery capabilities apply to professional media, in particular over the Non-Public Networks (see [Non-Public Networks](../npn)) that broadcasters use for on-site production. For acronyms used here, see the [Glossary](/tech/glossary).

**Key specifications:** 3GPP [TS 23.501](https://www.3gpp.org/dynareport/23501.htm) (TSC clause: the 5G system modelled as a TSN bridge, NW-TT/DS-TT, time synchronisation), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm) (TSC procedures), [TS 38.331](https://www.3gpp.org/dynareport/38331.htm) (RRC support for time synchronisation), IEEE 802.1Qbv / 802.1Qcc / 802.1AS (scheduled traffic, centralized TSN configuration and time synchronisation, referenced by the 3GPP TSC model).

**No dedicated reference tool exists for TSC.** This area is tracked through the standards work and pointers below. TSC is commonly deployed over a [Non-Public Network](../npn) so a production can control QoS and timing end to end.

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The 5G-as-TSN-bridge model, time synchronisation architecture, the TSCTSF control plane, and deterministic QoS for live production, below.</p>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>Normative 3GPP specs (TS 23.501, TS 23.502) and 5G-MAG's contributions on TSC.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/tsc">Standards: Time Sensitive Communications</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 10l0 3l2 2"/><path d="M7 4l-2.75 2"/><path d="M17 4l2.75 2"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>No dedicated TSC reference tool exists yet — this area is analysis-only for now.</p>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/12)

## The bridge model in detail

The integration point between 5G and wired IEEE 802.1 TSN is defined in the TSC clause of [TS 23.501](https://www.3gpp.org/dynareport/23501.htm). The 5G system is modelled as one or more virtual TSN bridges. Each bridge has ports realised by TSN Translators:

- **NW-TT (Network-side TSN Translator)** at the UPF. It terminates the wired TSN network, holds the bridge management information exposed to the TSN control plane, and translates between the TSN world and 5G QoS. A single NW-TT can host multiple ports.
- **DS-TT (Device-side TSN Translator)** at the UE. It terminates the TSN endpoint (for example a camera or an audio device) and applies hold-and-forward/gate behaviour for egress toward that endpoint.

A PDU Session between the UE and the UPF forms the internal path of the bridge. TSN streams are mapped onto 5G QoS Flows within that PDU Session, so a stream with a strict deadline is carried on a QoS Flow with a matching 5QI and, where needed, a Guaranteed Bit Rate. Because the whole 5G segment is abstracted as a bridge, the external TSN Centralized Network Configuration (CNC) can compute schedules across it using ordinary TSN tooling; the 5G system reports its bridge capabilities (including per-port propagation and processing delays) to the CNC.

## Time synchronisation architecture

Two clocks coexist:

- The **5G clock (5G GM)**, which the 5G system distributes internally to UEs and translators.
- The **TSN/working clock**, the (g)PTP time relevant to the application, carried across the bridge per IEEE 802.1AS.

In the Release 16 model the 5G system behaves as a time-aware relay: gPTP event messages entering at one translator are timestamped, carried across the 5G system, and corrected for the measured residence time before egress at the other translator, so the downstream clock stays accurate. Release 17 generalised this so the 5G system can take different roles in an IEEE 802.1AS time-aware domain and can operate as an IEEE 1588 boundary clock or transparent clock, and so that time-synchronisation service can be requested and controlled through the control plane rather than being purely a transparent forwarding behaviour. For media, the working clock is typically PTP as used by SMPTE ST 2059, which is the same IEEE 1588 base, so the 5G time-sync machinery maps onto the timing model the ST 2110 plant already uses.

## Control plane: TSCTSF, NEF and AF

Release 17 introduced the Time Sensitive Communication and Time Synchronization Function (TSCTSF). It is the network function through which deterministic QoS and time-synchronisation services are requested and coordinated:

- An **Application Function (AF)** in the operator's trust domain can interact with the TSCTSF directly.
- An **AF outside that trust domain** reaches the TSCTSF through the **Network Exposure Function (NEF)**.

Through this interface the AF can provide traffic characteristics (periodicity, burst size, direction, arrival time reference) that let the system optimise scheduling, request the associated QoS, and activate or deactivate time synchronisation for specified UEs/ports. The TSCTSF works with the PCF to install the corresponding policy and with the SMF/UPF to realise it. Toward the wired TSN network, the bridge-management and scheduling interworking follows IEEE 802.1Qcc (fully centralized model), with the NW-TT presenting the 5G bridge to the CNC.

## Scheduled traffic and gating

Deterministic egress toward a TSN endpoint uses gate behaviour aligned with IEEE 802.1Qbv (enhancements for scheduled traffic): the translator opens and closes transmission gates according to a schedule derived from the CNC configuration and the shared clock. Combined with the bounded latency of the 5G QoS Flow, this gives an end-to-end path where a frame leaves the wired network, crosses the 5G segment, and is delivered to the wireless endpoint within a known window.

## Deterministic QoS without a full TSN bridge

Not every media deployment wants to run a wired TSN control plane. A relevant Release 17 outcome is that deterministic QoS and time synchronisation can be requested via the TSCTSF/NEF without the 5G system having to be configured as part of a full IEEE 802.1 TSN bridge with a CNC. For a production that only needs bounded-latency, time-synchronised transport over its NPN (not integration into a plant-wide TSN schedule), this lighter path is often the practical one. Which approach is chosen depends on whether the wireless segment must participate in a network-wide TSN schedule or simply deliver deterministic transport to endpoints.

## Release timeline

- **Release 16**: 5G system as a TSN bridge; DS-TT/NW-TT; transparent forwarding of gPTP with residence-time correction; TSN-to-5G QoS mapping. TS 23.501 (architecture), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm) (procedures).
- **Release 17**: TSCTSF; generalised time synchronisation (multiple IEEE 802.1AS / IEEE 1588 clock roles); exposure of deterministic QoS and time-sync control to AFs via NEF; deterministic QoS without a full TSN bridge.
- **Release 18 and later**: Further deterministic-networking, survivability and time-sync accuracy enhancements. Confirm scope and placement against the 3GPP work plan.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the TS 23.501 TSC clause number, the Release 17 TSCTSF placement, and the IEEE 802.1Qbv/802.1Qcc/802.1AS designations as cited. Verify against the 3GPP work plan and the IEEE 802.1 standards index before publication.
:::

## Related

- [Non-Public Networks](../npn): TSC media transport typically runs over an NPN.
- [Real-Time Communications (RTC)](/tech/rtc): the interactive WebRTC-based counterpart, for conversational and collaborative media rather than deterministic essence transport.
- [Standards: Time Sensitive Communications](/tech/standards/tsc): the standards-tracking view of this topic.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
