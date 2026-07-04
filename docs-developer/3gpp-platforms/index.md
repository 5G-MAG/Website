---
hide_title: true
sidebar_class_name: project-index-link
title: 3GPP RAN and Core Platforms
sidebar_position: -1
description: Reference platform tools for deploying a lab 5G RAN and Core network, built on Open5GS and srsRAN.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M20 21l2 -2l-2 -2" />
  <path d="M17 17l-2 2l2 2" /></svg>
</div>
<div class="topic-banner__text">
<h1>3GPP RAN and Core Platforms</h1>
</div>
</div>

<div class="topic-lead">
Reference platform tools for deploying 5G Radio Access Network (RAN) and Core network components in a lab or testbed environment.
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a></div>


Reference platform tools for deploying 5G Radio Access Network (RAN) and Core network components in a lab or testbed environment. The project provides configurations, scripts, and integration guides for standing up 3GPP-compliant RAN and Core (5G Core, 5GC) stacks, forming the network infrastructure layer on which the other 5G-MAG reference tools run. It is useful for developers who need a complete 5G system to validate end-to-end media delivery pipelines. 5G-MAG builds these platforms on established open-source projects (Open5GS for the core, srsRAN for the radio) so members can reproduce a working network without commercial equipment.

The specifications below are listed as background context, not as a prerequisite reading list.

**Relevant specifications:** 3GPP [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) (NR overall description), [TS 23.501](https://www.3gpp.org/dynareport/23501.htm) (5G System architecture), [TS 38.401](https://www.3gpp.org/dynareport/38401.htm) (NG-RAN architecture and interfaces).

:::tip[Where to start]
New to this project? Read the [Scope](./scope) to understand which RAN and Core components 5G-MAG builds, then follow the [5G Network with Open5GS, srsRAN and COTS UE](./tutorials/5gnetwork) tutorial to stand up a working network.
:::

## Overview

The slide deck below introduces the 3GPP RAN and Core Platforms project, its components, and how they fit together. In short: it packages an Open5GS-based 5G core and an srsRAN-based radio access network into a lab-ready 5G system that the other reference tools can run against.

<iframe loading="lazy" width="60%" height="560" src="/docs/Reference_Tools_3GPP_Platforms.pdf" title="3GPP RAN and Core Platforms: project overview slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_3GPP_Platforms.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

## Related

* [Scope](./scope): what is in scope and the upstream software the platforms build on
* [GitHub Repos](./repositories): the forks and branches, mapped to their use cases
* [Tutorials](./tutorials): step-by-step setup guides

:::note
Refer to the [rt-srsRAN_Project](https://github.com/5G-MAG/rt-srsRAN_Project) and [open5gs](https://github.com/5G-MAG/open5gs) repositories to contribute to this project.
:::