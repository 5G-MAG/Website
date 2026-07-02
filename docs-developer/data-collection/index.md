---
hide_title: true
sidebar_class_name: project-index-link
title: UE Data Collection, Reporting and Exposure
sidebar_position: 10
---

<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
  <path d="M9 17l0 -5" />
  <path d="M12 17l0 -1" />
  <path d="M15 17l0 -3" /></svg>
<h1>UE Data Collection, Reporting and Exposure</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference implementation of the User Equipment (UE) side data collection, reporting, and event exposure framework defined in 3GPP [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) and TS 26.532. The tools enable 5G devices to collect, aggregate, and report media performance metrics (playback quality, buffer events, network conditions, and consumption data) to the 5G Media Streaming Application Function (AF). This data feeds network-assisted Quality of Experience (QoE) optimisation, analytics dashboards, and adaptive policy decisions.

**Implemented specifications:** 3GPP TS 26.531 (data collection and reporting framework), [TS 26.532](https://www.3gpp.org/dynareport/26532.htm) (data collection client procedures), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (5GMS AF interfaces for data reporting submission). The interfaces these specifications define are referred to on the [Scope](./scope) page by their reference-point names R1 to R6.

:::tip[New here?]
Read the [Scope](./scope) page for what is being implemented, then follow the [DCAF Docker and Insomnia tutorial](./tutorials/docker-with-insomnia) to run it.
:::

## Project Overview

<iframe width="60%" height="560" src="../../docs/Reference_Tools_UE_data_collection.pdf"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_UE_data_collection.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Technical documentation** | Data collection architecture and event exposure interfaces: [UE Data Collection on the Tech portal](/tech/data-collection/data-collection-event-exposure) |
| **Standards** | TS 26.531/532 and event exposure specs: [UE Data Collection on the Standards portal](/tech/standards/data-collection) |

## Community Stats
<!-- STATS-TABLE-START:UE Data Collection -->
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
<!-- STATS-TABLE-END:UE Data Collection -->
