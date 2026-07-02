---
hide_title: true
sidebar_class_name: project-index-link
title: 5G Core Service Consumers
sidebar_position: 5
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6.657 16c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
  <path d="M12 16v5" />
  <path d="M16 16v4a1 1 0 0 0 1 1h4" />
  <path d="M8 16v4a1 1 0 0 1 -1 1h-4" /></svg>
</div>
<div class="topic-banner__text">
<h1>5G Core Service Consumers</h1>
<p>Reference implementation for media applications that consume 5G Core (5GC) network services directly, including policy authorisation, network event exposure, and content steering, using the interfaces defined for media applications in 3GPP Release 16 and 17.</p>
</div>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference implementation for media applications that consume 5G Core (5GC) network services directly, including policy authorisation, network event exposure, and content steering, using the interfaces defined for media applications in 3GPP Release 16 and 17. The tools demonstrate how a media application server interacts with the 5G Core (the Policy Control Function (PCF), Network Exposure Function (NEF) and Binding Support Function (BSF)) to request network resources dynamically and receive notifications about network events affecting media delivery.

This project ships as a set of reusable service consumer libraries, and each library comes with a runnable command-line tool that demonstrates it.

**Where to start:** read the [Scope](./scope), then follow the [Using libscPCF](./tutorials/using-libscPCF) tutorial, which is the most complete worked example (it also exercises the BSF along the way).

**Implemented specifications:** 3GPP [TS 29.214](https://www.3gpp.org/dynareport/29214.htm) (Policy and Charging Control Rx interface), [TS 29.522](https://www.3gpp.org/dynareport/29522.htm) (NEF northbound APIs), [TS 29.513](https://www.3gpp.org/dynareport/29513.htm) (Policy and Charging function interactions), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (5GMS AF interactions with the 5G Core).

## Project Overview

The slide deck below introduces the 5GC Service Consumer libraries and how a media application uses them.

<iframe width="60%" height="560" src="../../docs/Reference_Tools_5GC_Service_Consumers.pdf" title="5G Core Service Consumers reference tools overview slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_5GC_Service_Consumers.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Standards** | 5G Core service interfaces for media (BSF, PCF): [5G Media Streaming on the Standards portal](/tech/standards/5gms); for the MB-SMF interface, see [5G Multicast & Broadcast Services](/tech/standards/5g-mbs) |
| **Related project** | 5GMS Application Function (AF) tools: [5G Media Streaming](../5gms) |

## Community Stats
<!-- STATS-TABLE-START:5G Core Service Consumers -->
> **Last Synced:** -

<table class="health-table">
  <thead>
    <tr>
      <th style="width: 25%;">Repository</th>
      <th style="width: 10%;">Stars</th>
      <th style="width: 10%;">Forks</th>
      <th style="width: 15%;">Views (Total)</th>
      <th style="width: 20%;">Clones (Total)</th>
      <th style="width: 20%;">Activity</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="6"><em>Sync pending &mdash; run the update-data workflow.</em></td></tr>
  </tbody>
</table>
<!-- STATS-TABLE-END:5G Core Service Consumers -->
