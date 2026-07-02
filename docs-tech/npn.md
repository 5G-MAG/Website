---
hide_title: true
title: Non-Public Networks
sidebar_position: 9
---


<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/></svg>
<h1>Non-Public Networks - Docs</h1>
</div>

Non-Public Networks (NPNs) are private 5G deployments operated for a specific organisation or use case, defined in 3GPP Release 16. In media production, NPNs allow broadcasters to deploy dedicated 5G infrastructure for live production workflows, replacing legacy contribution links (satellite, ISDN, fibre) with a programmable, low-latency wireless fabric. 5G-MAG's work covers deployment models, spectrum access strategies, User Equipment (UE) registration and on-boarding, and the specific requirements of live production environments such as time-sensitive communications.

There are two deployment models, and the plain-language names map to the 3GPP terms as follows: a standalone NPN is a fully independent private network (Stand-alone Non-Public Network, SNPN), while an NPN integrated with a public network reuses the operator's Public Land Mobile Network (PLMN) with private access control (Public Network Integrated NPN, PNI-NPN, which uses a Closed Access Group, CAG, to restrict which devices may connect).

**Key specifications:** 3GPP [TS 23.501](https://www.3gpp.org/dynareport/23501.htm) (NPN architecture, clauses on SNPN and PNI-NPN), [TS 33.501](https://www.3gpp.org/dynareport/33501.htm) (NPN security), [TS 22.261](https://www.3gpp.org/dynareport/22261.htm) (service requirements for NPNs).

**No dedicated reference tool exists for NPN.** This area is documented through analysis papers and explainer documents below. Live production over an NPN often needs deterministic timing, so for time-sensitive media transport over NPNs see also [Time-Sensitive Communications](./tsc).

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/11)

## Deployment models in detail

**SNPN (Stand-alone Non-Public Network).** The SNPN operates its own 5G core and is not dependent on any PLMN. It is identified by the pair (PLMN ID, NID). Two NID assignment models exist: a locally managed NID (chosen by the operator of the SNPN, not guaranteed unique) and a universally managed NID (coordinated to be globally unique). The UE performs SNPN-specific network selection: it reads the available SNPNs from broadcast system information and matches them against its configured list, using either automatic or manual selection mode. Because the organisation runs the core, it controls the Unified Data Management (UDM), Policy Control Function (PCF) and Session Management Function (SMF) configuration directly, which is what makes tight QoS and slicing policy for production traffic practical.

**PNI-NPN (Public Network Integrated NPN).** The NPN is realised through a PLMN. Isolation is achieved by one or more of: a dedicated DNN, a dedicated Network Slice instance (identified by an S-NSSAI), and a Closed Access Group (CAG). A CAG is advertised by cells in their broadcast information; a UE that is a member of the CAG (per its CAG configuration in the subscription) may camp on and access those cells, while non-members are barred. The CAG mechanism therefore provides cell-level access control, whereas slicing provides logical traffic separation inside the core. In practice a media PNI-NPN combines both: a CAG to keep unauthorised devices off the production cells, and a slice to isolate and dimension the production traffic.

## Identity, credentials and onboarding

The Release 16 baseline assumes the SNPN holds the subscription and credentials itself. Release 17 decoupled these:

* **Credentials Holder (CH).** The entity that owns the subscription credentials can be separate from the SNPN that provides access. The CH may be a 3GPP entity (an AUSF/UDM belonging to another SNPN or a PLMN) or a non-3GPP entity (an external AAA server reached for authentication). When the CH is an AUSF/UDM, the authentication flow resembles the roaming case; when it is an AAA server, key-generating EAP methods are used. This lets, for example, a broadcaster's central identity system authenticate devices onto a venue-operated SNPN.
* **UE onboarding.** A UE configured only with Default UE Credentials can attach to an Onboarding SNPN (ON) purely to be provisioned. The onboarding network authenticates the UE against a Default Credentials Server (DCS) and then hands off to a Provisioning Server, which installs the SNPN subscription credentials and configuration. After provisioning, the UE deregisters from the ON and registers on the target SNPN normally. This is aimed at bringing fleets of devices onto a private network without per-device manual configuration.

Security procedures for both the CH and onboarding cases are specified in the NPN security clauses of TS 33.501.

## Access over non-3GPP networks

An NPN device can reach the 5G core over untrusted or trusted non-3GPP access (for example a wired LAN, Wi-Fi, or a fixed backhaul). The stage 3 procedures for accessing the 5GC via non-3GPP access networks are defined in TS 24.502. This is relevant where production equipment is cabled but still needs to be a first-class subscriber of the private 5G core; note the scope caution on the standards page regarding this reference.

## QoS, slicing and dimensioning for production

Media production traffic is dominated by high-bitrate uplink (camera contribution) rather than the downlink-heavy profile of consumer networks. The NPN operator therefore has to dimension radio and transport for sustained aggregate uplink, and use 5G QoS Flows with appropriate 5QI values and Guaranteed Bit Rate (GBR) where a flow must not be starved. Network slicing (an S-NSSAI per production service class) provides isolation between, say, a critical camera contribution slice and a general crew-comms slice. Where deterministic timing is required on top of guaranteed bandwidth, the NPN is combined with Time-Sensitive Communications; see [Time-Sensitive Communications](./tsc).

## Spectrum

Spectrum access for NPNs is a national regulatory matter and varies by country. Broadly, options include locally licensed dedicated spectrum where a regulator has set aside bands for private/vertical use, spectrum leased from an operator, shared-access frameworks, and unlicensed bands. The specific bands, licence conditions and power limits differ between administrations, so any concrete spectrum plan should be checked against the relevant national regulator rather than assumed. This is an operational and regulatory question rather than a 3GPP specification question.

## Release timeline

* **Release 16**: SNPN and PNI-NPN models, NID, CAG. Architecture in TS 23.501; security in TS 33.501; requirements in TS 22.261 and (for professional media) [TS 22.263](https://www.3gpp.org/dynareport/22263.htm).
* **Release 17**: Credentials Holder, external AAA authentication, UE onboarding and remote provisioning, equivalent SNPNs.
* **Release 18 and later**: Enhancements to NPN mobility and service continuity, and localised services. Confirm the exact scope and placement against the 3GPP work plan.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the Release 18 and later NPN enhancement placements, and the specific NID/CAG sub-clause structure described above. Verify against the 3GPP work plan before publication.
:::

---

## Information related to Standards

[Standards: Non-Public Networks](/tech/standards/npn)

[Standards: Time Sensitive Communications](/tech/standards/tsc)

---

## Technical Documentation

There are no deeper NPN analysis pages on this portal yet: the content above is the full extent of 5G-MAG's current NPN documentation. As no dedicated reference tool exists for NPN either, this page will grow as analysis work is published; check back or watch the [Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/11) for progress.

## Related

* [Time-Sensitive Communications](./tsc): deterministic transport, often combined with an NPN for live production traffic.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::

---

