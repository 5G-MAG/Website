---
title: Scope
hide_title: true
sidebar_position: 0
description: Lists the CAMARA network API (Dedicated Networks) covered by the Network APIs reference implementation.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5" />
  <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
  <path d="M20 8v8" />
  <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">CAMARA Connectivity Quality Management APIs</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--primary" href="/reference-tools/network-apis/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/reference-tools/network-apis/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/reference-tools/network-apis/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="/reference-tools/network-apis/tutorials#developer-exchange" style="margin: 2px 4px 2px 0">Developer Exchange</a></div>

This page lists the specifications within the scope of the Network APIs reference implementation, and which CAMARA API each covered capability maps to.

The reference implementation targets CAMARA, an open-source project (Linux Foundation, in collaboration with GSMA) that standardises portable network APIs, so a media application can request network behaviour (for example a QoS boost for a live stream) through common interfaces rather than operator-specific ones. On the network side these interfaces build on 3GPP capability-exposure work such as the Service Enabler Architecture Layer (SEAL, [TS 23.434](https://www.3gpp.org/dynareport/23434.htm)).

**Implemented specifications:** [CAMARA Dedicated Networks API](https://github.com/camaraproject/DedicatedNetworks), 3GPP TS 23.434 (SEAL for network capability exposure to applications).

## CAMARA APIs covered

The following CAMARA API is covered by the reference implementation and technical documentation:

| API                     | Purpose                                                                                                                                                                                                                     | CAMARA repo                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Dedicated Networks** | Reserve network resources (dedicated network) for a defined service area and time window using a network profile, then assign specific devices. Includes sub-APIs for service area discovery and network profile listing. | [DedicatedNetworks](https://github.com/camaraproject/DedicatedNetworks) |

## Getting started

1. Skim the CAMARA API table above to see which capability you need.
2. Read the [Network APIs](/tech/network-apis) Tech page for how a CAMARA call maps onto the 5G Core (NEF, PCF, SMF/UPF).
3. Use the [Resources](./resources) page for the current, authoritative list of repositories.
4. Check the [Resources](./resources) page for tagged versions.

## Go deeper

Technical documentation providing context to this project can be found in the link below.

[Tech: Network APIs](/tech/network-apis)

A list of relevant specifications can be found in the link below.

[Standards: Network APIs](/tech/standards/network-apis)
