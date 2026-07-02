---
hide_title: true
title: Time-Sensitive Communications
sidebar_position: 15
---

<div class="topic-banner" style="--topic-accent: #f59e0b; --topic-accent-dark: #92400e;">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 10l0 3l2 2"/><path d="M7 4l-2.75 2"/><path d="M17 4l2.75 2"/></svg>
</div>
<div class="topic-banner__text">
<h1>Time-Sensitive Communications</h1>
<p>Deterministic, low-latency delivery over 5G for tightly synchronised professional media.</p>
</div>
</div>

## Overview

5G-MAG monitors standardisation of Time Sensitive Communication (TSC) and its application to media production workflows. TSC enables deterministic, low-latency data delivery over 5G, which is essential for professional media applications requiring tight synchronisation, such as media over 5G defined by the Society of Motion Picture and Television Engineers (SMPTE) in ST 2110. "Deterministic" here means the network delivers packets within a bounded, predictable latency (rather than best-effort), so essence streams stay in sync.

TSC in a media context usually runs over a private 5G deployment. For the network foundations it depends on, see [Standards: Non-Public Networks](/tech/standards/npn) first.

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The 5G-as-TSN-bridge model, time synchronisation, and applying TSC to SMPTE ST 2110 production.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/tsc">Tech: Time-Sensitive Communications</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>There is no dedicated 5G-MAG reference implementation for TSC; the area is followed through analysis.</p>
</div>
</div>

</div>

## Key 3GPP Specifications

### Service Requirements
* [TS 22.104](https://www.3gpp.org/dynareport/22104.htm): Service requirements for cyber-physical control applications in vertical domains (includes TSC)
* [TR 22.804](https://www.3gpp.org/dynareport/22804.htm): Study on Communication for Automation in Vertical domains

### System Architecture
* [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for the 5G System; TSN integration aspects
* [TS 23.502](https://www.3gpp.org/dynareport/23502.htm): Procedures for the 5G System; TSC bridge procedures

## IEEE Time-Sensitive Networking (TSN)

5G TSC is designed to interwork with IEEE 802.1 Time-Sensitive Networking (TSN) standards. To achieve this, the 5G system presents itself to the wired network as a single logical TSN bridge: the TSN control plane sees one bridge, while the 5G core and radio handle the wireless segment internally. The relevant IEEE standards are:

* **IEEE 802.1AS**: Timing and Synchronisation (gPTP)
* **IEEE 802.1Qbv**: Enhancements for Scheduled Traffic
* **IEEE 802.1Qcc**: Stream Reservation Protocol (SRP) Enhancements

## SMPTE Standards for IP Media Production

* **SMPTE ST 2110**: Professional Media Over Managed IP Networks (video, audio, metadata essences)
* **SMPTE ST 2059**: Synchronisation of Video Signals in IP Environments

## What TSC Adds Over Ordinary QoS

Ordinary 5G QoS can give a flow a guaranteed bit rate and a target latency. TSC goes further in two respects that matter for professional media:

* **Bounded latency and jitter, not just average latency.** Deterministic delivery means packets arrive within a tight window every time, which is what keeps synchronised essence streams (video, audio, ancillary data) aligned at the receiver.
* **Shared time.** Devices on the network are synchronised to a common clock so that timestamps and scheduled transmission windows are meaningful across the whole system. This is the basis for frame-accurate production and for the scheduled-traffic behaviour that TSN relies on.

## 5G System as a TSN Bridge

This bridge model is defined in the TSC clause of TS 23.501. Two translator functions terminate the bridge at its edges:

* **DS-TT (Device-side TSN Translator)**: sits at the UE side and connects the TSN endpoint (for example a camera) to the UE.
* **NW-TT (Network-side TSN Translator)**: sits at the User Plane Function (UPF) and connects to the wired TSN network.

Between DS-TT and NW-TT, the 5G core and radio carry the TSN traffic, mapping TSN stream QoS onto 5G QoS Flows. From the TSN control plane's point of view this whole path looks like a single bridge with ingress and egress ports, so existing TSN configuration tooling can treat the 5G system as just another bridge in the network graph.

## Time Synchronisation

Two time domains are involved and both must be handled:

* **5G internal clock**: the 5G system distributes its own reference time to UEs and to the DS-TT/NW-TT.
* **TSN / working clock**: the (g)PTP time carried across the bridge for the application, per IEEE 802.1AS.

Release 16 introduced the transparent-bridge model in which the 5G system relays gPTP time-synchronisation messages, adjusting for the residence time inside the 5G system. Release 17 generalised time synchronisation: the 5G system can act in different roles within an IEEE 802.1AS time-aware domain and can support IEEE 1588 boundary-clock and transparent-clock modes, and time synchronisation can be exposed to and controlled by an Application Function. This generalisation is what makes TSC useful beyond the original industrial TSN framing, including for media, where SMPTE ST 2059 defines how PTP time aligns video signals.

## Control Plane and the TSCTSF

For an application (or a media production controller) to ask the 5G system for deterministic behaviour, there has to be a control-plane path. Release 17 introduced the Time Sensitive Communication and Time Synchronization Function (TSCTSF). An Application Function in the same trust domain can talk to the TSCTSF directly; an Application Function in a different trust domain reaches it through the Network Exposure Function (NEF). Through this path the application can request QoS and traffic characteristics for scheduling optimisation and can activate or deactivate time synchronisation. The TSN control-plane interworking itself follows IEEE 802.1Qcc, with the 5G system exposing bridge configuration to the Centralized Network Configuration (CNC).

## Specifications by Release

* **Release 16**: 5G system as a TSN bridge, transparent forwarding of gPTP, DS-TT and NW-TT, TSN QoS to 5G QoS mapping. Architecture in TS 23.501, procedures in TS 23.502.
* **Release 17**: Generalised time synchronisation (multiple IEEE 802.1AS/1588 clock roles), the TSCTSF, exposure of deterministic QoS and time-sync control to Application Functions via NEF, and support for TSC independent of a full TSN bridge (deterministic QoS without requiring the wired TSN control plane).
* **Release 18 and later**: Further deterministic-networking and time-sync enhancements. Confirm the exact scope and placement against the 3GPP work plan.

## Applying TSC to Media Production

Media production was not the original target for TSC, but it is a natural fit. The core requirements resemble industrial TSC (bounded latency, tight synchronisation), but the traffic is high-bitrate, uplink-dominant media rather than small industrial control packets. In a studio or venue, an NPN carries the 5G system, the TSN bridge model connects it to the wired ST 2110 infrastructure, and PTP (IEEE 802.1AS / SMPTE ST 2059) provides the shared clock so that essence flows from wireless cameras stay aligned with the wired plant. Whether the full TSN bridge and control plane are used, or only the deterministic-QoS and time-sync features without a wired TSN CNC, depends on the production architecture.

## 5G-MAG Focus

5G-MAG tracks how these deterministic-delivery and time-synchronisation capabilities apply to professional media, in particular the transport of SMPTE ST 2110 essence over private 5G, the alignment of the 5G and PTP time domains, and the combination with Non-Public Networks. There is no dedicated 5G-MAG reference implementation for TSC; the area is followed through analysis and the standards work referenced here.

## Use Cases for 5G-MAG

* Transport of SMPTE ST 2110 essence streams over private 5G networks
* Sub-millisecond synchronisation for multi-camera live production
* Wireless camera links with deterministic latency guarantees
* Integration of 5G NPN with IEEE TSN for studio infrastructure

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TR 22.804, the TS 23.501 TSC clause number, the Release 17 TSCTSF placement, and the IEEE 802.1Qbv/802.1Qcc designations as cited. Verify against the 3GPP work plan and the IEEE 802.1 standards index before publication.
:::

## Related Standards Work

* [Standards: Non-Public Networks](/tech/standards/npn)
* [Standards: Network APIs](/tech/standards/network-apis)
* [Technical Documentation: Time-Sensitive Communications](/tech/tsc): analysis documents and reference material on the developer/technical side

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository for 5G-MAG contributions on Time Sensitive Communications.
:::
