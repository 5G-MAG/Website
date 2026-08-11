---
hide_title: true
title: Non-Public Networks
slug: /standards/npn
description: 3GPP Non-Public Network standards and deployment models (SNPN, PNI-NPN) for private 5G media production and contribution.
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

5G-MAG tracks 3GPP Non-Public Network (NPN) standards for private 5G media production and contribution. For the technical analysis of NPN deployment models, identity/onboarding and QoS considerations, see the Tech page linked below. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style="grid-template-columns: minmax(0, 380px);">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>Analysis documents and reference material on the developer/technical side.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/npn">Tech: Non-Public Networks</a></li>
</ul>
</div>
</div>

</div>

## NPN Deployment Models

Both deployment models are defined in the NPN clause of TS 23.501 (SNPN and PNI-NPN are described in the two sub-clauses of that clause).

- **Standalone NPN (SNPN)**: Independent 5G network with its own core, not relying on a public land mobile network (PLMN). Identified by the combination of a PLMN ID and a Network Identifier (NID).
- **Public Network Integrated NPN (PNI-NPN)**: NPN made available through a PLMN, for example by means of a dedicated Data Network Name (DNN) or one or more network slice instances allocated for the NPN, using a Closed Access Group (CAG) to control which subscribers may access the relevant cells.

## Specifications by Release

The NPN feature set has grown across releases. The following is an orientation, not a substitute for the 3GPP work plan.

- **Release 16**: Baseline NPN. Introduced the SNPN and PNI-NPN models, the NID for SNPN, and the CAG mechanism for PNI-NPN. Architecture in the NPN clause of TS 23.501.
- **Release 17**: SNPN enhancements. Credentials Holder support (credentials owned by a separate 3GPP or non-3GPP entity such as an AAA server), UE onboarding and remote provisioning, and equivalent-SNPN handling. Related VIAPA requirements work continued in TS 22.263.
- **Release 18 and later**: Continued refinements to NPN mobility, service continuity between SNPN and PLMN, and localised services. Confirm the specific enhancements and their release placement against the current 3GPP work plan.

## Key 3GPP Specifications

### Service Requirements

- [TS 22.263](https://www.3gpp.org/dynareport/22263.htm): Service requirements for Video, Imaging and Audio for Professional Applications (VIAPA); stage 1 requirements anchor most often cited when NPNs are discussed for broadcast use

### System Architecture

- [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for the 5G System; Non-Public Network aspects (clause 5.30)
- [TS 23.502](https://www.3gpp.org/dynareport/23502.htm): Procedures for the 5G System; NPN procedures

### Access and Authentication

- [TS 24.501](https://www.3gpp.org/dynareport/24501.htm): Non-Access-Stratum (NAS) protocol for 5GS; Stage 3 — carries the SNPN-specific registration and authentication procedures (credential-owner vs. separate credential-holder models, SUCI handling)
- [TS 24.502](https://www.3gpp.org/dynareport/24502.htm): Access to the 3GPP 5G Core Network (5GCN) via non-3GPP access networks; Stage 3
- [TS 33.501](https://www.3gpp.org/dynareport/33501.htm): Security architecture for 5GS; NPN security aspects

### Study Items

- [TR 23.700-07](https://www.3gpp.org/dynareport/23700-07.htm): Study on enhanced support of Non-Public Networks (Release 17)

## 5G-MAG tracking and contribution focus

5G-MAG tracks NPN standardisation as it applies to media production and contribution, in particular the VIAPA requirements, the SNPN and PNI-NPN deployment models, device onboarding at scale, and the combination of NPN with TSC for deterministic essence transport and with RTC for interactive contribution. See the [Tech: Non-Public Networks](/tech/npn) page for the detailed analysis.

<details>
<summary>References to verify</summary>

The Release 18 and later NPN enhancement placements described above were not confirmed against a primary source (the 3GPP/ETSI portals block automated access). Verify against the 3GPP work plan before publication. (TR 23.700-07 and TS 24.501, above, were confirmed via independent secondary trackers — see the audit notes for this page.)

</details>

## Related Standards Work

- [Standards: Connectivity Quality with Network APIs](/standards/network-apis)
- [Standards: Time Sensitive Communications](/standards/tsc): TSC for professional media production is typically deployed over an NPN
- [Standards: Real-Time Communications (RTC)](/standards/rtc): interactive, uplink-heavy contribution over an NPN
- [Tech: Non-Public Networks](/tech/npn): analysis documents and reference material on the developer/technical side
- [Feedback and Requirements](/standards): how 5G-MAG submits feedback and requirements to SDOs

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
