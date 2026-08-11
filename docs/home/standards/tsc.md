---
hide_title: true
title: Time Sensitive Communications
slug: /standards/tsc
description: 3GPP Time Sensitive Communications specifications for deterministic, low-latency 5G delivery in professional media production, and the related IEEE TSN and SMPTE standards.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 10l0 3l2 2"/><path d="M7 4l-2.75 2"/><path d="M17 4l2.75 2"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Time Sensitive Communications</h1>
</div>
</div>

<div class="topic-lead">
Deterministic, low-latency delivery over 5G for tightly synchronised professional media.
</div>

## Overview

5G-MAG monitors standardisation of Time Sensitive Communication (TSC) and its application to media production workflows, such as SMPTE ST 2110 essence transport. For the technical analysis of how TSC works, see the Tech page linked below.

TSC in a media context usually runs over a private 5G deployment. For the network foundations it depends on, see [Standards: Non-Public Networks](/standards/npn) first. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The 5G-as-TSN-bridge model, time synchronisation, and applying TSC to SMPTE ST 2110 production.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/tsc">Tech: Time Sensitive Communications</a></li>
</ul>
</div>
</div>

</div>

## Specifications by Release

- **Release 16**: 5G system as a TSN bridge, transparent forwarding of gPTP, DS-TT and NW-TT, TSN QoS to 5G QoS mapping. Architecture in TS 23.501, procedures in TS 23.502.
- **Release 17**: Generalised time synchronisation (multiple IEEE 802.1AS/1588 clock roles), the TSCTSF, exposure of deterministic QoS and time-sync control to Application Functions via NEF, and support for TSC independent of a full TSN bridge (deterministic QoS without requiring the wired TSN control plane).
- **Release 18 and later**: Further deterministic-networking and time-sync enhancements. Confirm the exact scope and placement against the 3GPP work plan.

## Key 3GPP Specifications

### Service Requirements

- [TS 22.104](https://www.3gpp.org/dynareport/22104.htm): Service requirements for cyber-physical control applications in vertical domains (includes TSC)
- [TR 22.804](https://www.3gpp.org/dynareport/22804.htm): Study on Communication for Automation in Vertical Domains

### System Architecture

- [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for the 5G System; TSN integration aspects
- [TS 23.502](https://www.3gpp.org/dynareport/23502.htm): Procedures for the 5G System; TSC bridge procedures

## IEEE Time-Sensitive Networking (TSN)

5G TSC is designed to interwork with IEEE 802.1 Time-Sensitive Networking (TSN) standards. The relevant IEEE standards are:

- **IEEE 802.1AS**: Timing and Synchronisation (gPTP)
- **IEEE 802.1Qbv**: Enhancements for Scheduled Traffic
- **IEEE 802.1Qcc**: Stream Reservation Protocol (SRP) Enhancements and Performance Improvements

## SMPTE Standards for IP Media Production

- **SMPTE ST 2110**: Professional Media Over Managed IP Networks (video, audio, metadata essences)
- **SMPTE ST 2059**: Synchronisation of Video Signals in IP Environments

## 5G-MAG tracking and contribution focus

5G-MAG tracks how these deterministic-delivery and time-synchronisation capabilities apply to professional media, in particular the transport of SMPTE ST 2110 essence over private 5G, the alignment of the 5G and PTP time domains, and the combination with Non-Public Networks.

## Related Standards Work

- [Standards: Non-Public Networks](/standards/npn)
- [Standards: Connectivity Quality with Network APIs](/standards/network-apis)
- [Tech: Time Sensitive Communications](/tech/tsc): analysis documents and reference material on the developer/technical side
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
