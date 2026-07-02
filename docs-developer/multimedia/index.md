---
hide_title: true
sidebar_class_name: project-index-link
title: Multimedia Content Delivery
sidebar_position: 8
---

<style>
  /* Table Styles */
  .health-table {
    width: 100%; 
    border-collapse: collapse; 
    margin-top: 20px; 
    table-layout: fixed;
  }
  .health-table th {
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid var(--ifm-color-emphasis-300);
    font-size: 0.75em;
    color: var(--ifm-color-emphasis-700);
    text-transform: uppercase;
  }
  .health-table td {
    padding: 12px;
    border-bottom: 1px solid var(--ifm-color-emphasis-200);
    vertical-align: middle;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dot { height: 8px; width: 8px; border-radius: 50%; display: inline-block; margin-right: 5px; }
  .dot-green { background-color: #28a745; }
  .dot-orange { background-color: #fd7e14; }
  .dot-blue { background-color: var(--ifm-color-primary); }
  .stats-sub { font-size: 0.8em; color: var(--ifm-color-emphasis-600); display: block; }

</style>


<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
  <path d="M9 15l3 -3l3 3" />
  <path d="M12 12l0 9" /></svg>
<h1>Multimedia Content Delivery</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference tools for multimedia content delivery protocols, covering DASH (Dynamic Adaptive Streaming over HTTP), HLS (HTTP Live Streaming), and CMAF (Common Media Application Format). These tools address the application-layer delivery protocols that sit above the 5G transport, ensuring interoperability across content formats, packaging standards, and player implementations for both broadcast and unicast streaming scenarios. Useful for developers validating DASH/HLS players, packagers, and Content Delivery Network (CDN) integrations in 5G environments.

**Implemented specifications:** ISO/IEC 23009-1 (MPEG-DASH), IETF RFC 8216 (HLS), ISO/IEC 23000-19 (CMAF), 3GPP [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) (MBMS protocols and file delivery formats).

## Project Overview

The slide deck below introduces the multimedia content delivery protocols project: the protocols it covers and how they fit above the 5G transport.

<iframe width="60%" height="560" src="../../docs/Reference_Tools_Multimedia_delivery_protocols.pdf"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_Multimedia_delivery_protocols.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Technical documentation** | Delivery protocol analysis: [Multimedia Content Delivery on the Tech portal](/tech/multimedia/multimedia-content-delivery) |
| **Standards** | DASH, HLS, and CMAF specifications: [Multimedia Delivery on the Standards portal](/tech/standards/multimedia) |

## Related

* [Scope](./scope) - specifications in scope and high-level architectures
* [Project Roadmap](./projects) - planned work
* [Software Repositories](./repositories) - the source repositories for these tools
* [Tutorials](./tutorials) - guides and examples

:::note
Refer to the [multimedia delivery repositories](https://github.com/5G-MAG) on GitHub to use or contribute to these Reference Tools.
:::

## Community Stats
<!-- STATS-TABLE-START:Multimedia Delivery -->
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
<!-- STATS-TABLE-END:Multimedia Delivery -->
