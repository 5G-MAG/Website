---
hide_title: true
title: Non-Public Networks
description: 3GPP Non-Public Network standards and deployment models (SNPN, PNI-NPN) for private 5G media production and contribution.
sidebar_position: 12
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>Non-Public Networks</h1>
</div>
</div>

<div class="topic-lead">
3GPP Non-Public Network standards and deployment models (SNPN, PNI-NPN) for private 5G media production and contribution.
</div>

## Overview

5G-MAG investigates the use of Non-Public Networks (NPNs) for media production, focusing in particular on private 5G networks for live content acquisition, contribution and on-site production workflows. NPNs allow broadcasters and media companies to deploy dedicated 5G infrastructure with guaranteed quality of service (QoS), so a production can reserve bandwidth and latency for its own use without competing with public traffic. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>Analysis documents and reference material on the developer/technical side.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/npn">Technical Documentation: Non-Public Networks</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>There is no dedicated 5G-MAG reference implementation for NPN; the area is followed through analysis.</p>
</div>
</div>

</div>

## Key 3GPP Specifications

### System Architecture

- [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for the 5G System; Non-Public Network aspects (clause 5.30)
- [TS 23.502](https://www.3gpp.org/dynareport/23502.htm): Procedures for the 5G System; NPN procedures

### Access and Authentication

These specifications cover how a device gains access to an NPN and how that access is secured, including the case where the device reaches the 5G core over a non-3GPP access network.

- [TS 24.501](https://www.3gpp.org/dynareport/24501.htm): Non-Access-Stratum (NAS) protocol for 5GS; Stage 3 — carries the SNPN-specific registration and authentication procedures (credential-owner vs. separate credential-holder models, SUCI handling)
- [TS 33.501](https://www.3gpp.org/dynareport/33501.htm): Security architecture for 5GS; NPN security aspects

### Study Items

- [TR 23.700-07](https://www.3gpp.org/dynareport/23700-07.htm): Study on enhanced support of Non-Public Networks (Release 17)

## Why NPNs Matter for Media Production

Live production has traditionally relied on wired links (fibre, SDI, dedicated IP) and licensed wireless links (COFDM camera links, satellite uplinks, bonded cellular). Each has trade-offs in mobility, latency, spectrum coordination and cost. A private 5G network gives a production team a network it controls, with the ability to prioritise its own traffic and to reserve capacity for uplink-heavy contribution flows that public networks are not dimensioned for.

The service and performance targets that a media NPN has to meet are set out separately from the architecture. The most directly relevant stage 1 specification is [TS 22.263](https://www.3gpp.org/dynareport/22263.htm): Service requirements for Video, Imaging and Audio for Professional Applications (VIAPA). It defines latency, data rate, reliability and synchronisation requirements for professional content production and contribution (newsgathering, remote production, live event coverage and production facilities), and it is the requirements anchor most often cited when NPNs are discussed for broadcast use.

## NPN Deployment Models

The two models differ mainly in how independent the network is from a public operator. A Standalone NPN runs its own complete network; a Public Network Integrated NPN reuses a public operator's infrastructure but keeps its traffic and access logically separate. Both are defined in the NPN clause of TS 23.501 (SNPN and PNI-NPN are described in the two sub-clauses of that clause).

- **Standalone NPN (SNPN)**: Independent 5G network with its own core, not relying on a public land mobile network (PLMN, the network run by a public mobile operator). An SNPN is identified by the combination of a PLMN ID and a Network Identifier (NID). The UE reads a list of available SNPNs from the broadcast system information and selects one according to its configured SNPN selection information. Because the SNPN runs its own core, the production organisation controls the full policy, QoS and subscriber configuration.
- **Public Network Integrated NPN (PNI-NPN)**: NPN made available through a PLMN, for example by means of a dedicated Data Network Name (DNN) or one or more network slice instances allocated for the NPN, using a Closed Access Group (CAG, a mechanism that restricts which devices may use particular cells) to control which subscribers may access the relevant cells. This model reuses the operator's radio and core investment while keeping the NPN traffic isolated.

The choice between the two is largely operational. An SNPN offers maximum independence and control (useful for a facility or a recurring venue) but requires the organisation to run a core network. A PNI-NPN offloads the core and radio operation to a mobile operator and can be attractive where an operator already has coverage at the site, at the cost of depending on that operator's slicing and QoS handling.

## Access, Identity and Onboarding

Getting a device onto an NPN, and doing so securely, is a distinct body of work from the system architecture:

- **SNPN access and selection**: The UE uses SNPN-specific network selection based on the PLMN ID plus NID. Release 16 defined the baseline. Release 17 added the ability for a device to use credentials owned by an entity separate from the SNPN (a Credentials Holder), which can be another SNPN, a PLMN, or an external Authentication, Authorization and Accounting (AAA) server. This separation of the access network from the credential owner is useful where a broadcaster's identity provider is distinct from the venue's private network operator.
- **UE onboarding and provisioning**: Release 17 also introduced UE onboarding, where a device carrying only default credentials attaches to an Onboarding SNPN to be provisioned with the subscription credentials for the target SNPN. This reduces the manual configuration effort of bringing fleets of production devices onto a private network.
- **Non-3GPP access**: A device may reach the 5G core over non-3GPP access (for example wired or Wi-Fi backhaul). The stage 3 access specification for this is [TS 24.502](https://www.3gpp.org/dynareport/24502.htm) (see the caution above regarding its exact scope for NPN).
- **Security**: NPN-specific security aspects, including primary authentication for SNPN and the handling of Credentials Holder and onboarding scenarios, are specified in [TS 33.501](https://www.3gpp.org/dynareport/33501.htm).

## Specifications by Release

The NPN feature set has grown across releases. The following is an orientation, not a substitute for the 3GPP work plan.

- **Release 16**: Baseline NPN. Introduced the SNPN and PNI-NPN models, the NID for SNPN, and the CAG mechanism for PNI-NPN. Architecture in the NPN clause of TS 23.501.
- **Release 17**: SNPN enhancements. Credentials Holder support (credentials owned by a separate 3GPP or non-3GPP entity such as an AAA server), UE onboarding and remote provisioning, and equivalent-SNPN handling. Related VIAPA requirements work continued in TS 22.263.
- **Release 18 and later**: Continued refinements to NPN mobility, service continuity between SNPN and PLMN, and localised services. Confirm the specific enhancements and their release placement against the current 3GPP work plan.

## Media Production Use Cases

- Wireless camera feeds from studio floors or live event venues
- Low-latency contribution links over private 5G
- Coordinated multi-camera production workflows
- Collaborative on-site editing over a dedicated 5G slice
- Deterministic essence transport when the NPN is combined with Time Sensitive Communications (see below)

## How NPN Relates to TSC and RTC

An NPN is the network foundation on which the other two topics in this area sit:

- **NPN + TSC**: Deterministic, tightly synchronised media transport (for example SMPTE ST 2110 essence flows) is normally deployed over an NPN, because the production organisation needs to control QoS and timing end to end. See [Standards: Time Sensitive Communications](/tech/standards/tsc).
- **NPN + RTC**: Interactive and uplink-heavy real-time media (contribution, remote production, conferencing) benefits from the reserved capacity and QoS control of a private network. See [Standards: Real-Time Communications (RTC)](/tech/standards/rtc).

## 5G-MAG tracking and contribution focus

5G-MAG tracks NPN standardisation as it applies to media production and contribution, in particular the VIAPA requirements, the SNPN and PNI-NPN deployment models, device onboarding at scale, and the combination of NPN with TSC for deterministic essence transport and with RTC for interactive contribution. There is no dedicated 5G-MAG reference implementation for NPN; the area is followed through analysis and the standards work referenced here.

:::warning[References to verify]
The Release 18 and later NPN enhancement placements described above were not confirmed against a primary source (the 3GPP/ETSI portals block automated access). Verify against the 3GPP work plan before publication. (TR 23.700-07 and TS 24.501, above, were confirmed via independent secondary trackers — see the audit notes for this page.)
:::

## Related Standards Work

- [Standards: Network APIs](/tech/standards/network-apis)
- [Standards: Time Sensitive Communications](/tech/standards/tsc): TSC for professional media production is typically deployed over an NPN
- [Technical Documentation: Non-Public Networks](/tech/npn): analysis documents and reference material on the developer/technical side
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
