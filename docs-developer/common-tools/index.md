---
hide_title: true
sidebar_class_name: project-index-link
title: Common Tools
sidebar_position: 5
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
  <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" /></svg>
<h1>Common Tools</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a></div>

## Overview

Common Tools are shared helper repositories (scripts, example configurations and build utilities) that support several Reference Tools rather than implementing a specification of their own. You normally arrive here from a specific tool's setup steps, not by starting here. Each entry below names the project it supports; refer to the "Scope" section of that project for more context.

The table below lists the repositories in this group. Auxiliary repositories, meaning supporting libraries or helper tools rather than primary deliverables, are indicated with a dashed border.

---

## Community Stats
<!-- STATS-TABLE-START:Auxiliary Tools -->
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
<!-- STATS-TABLE-END:Auxiliary Tools -->

---

## Auxiliary tools common to various projects
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="https://github.com/5G-MAG/rt-common-shared" style="margin: 2px 4px 2px 0">rt-common-shared</a> <a class="button button--outline button--primary" href="../common-tools/releases" style="margin: 2px 4px 2px 0">Releases</a></div>

The following tools are available:

### 5G Media Streaming (5GMS): [https://github.com/5G-MAG/rt-common-shared/blob/main/5gms/](https://github.com/5G-MAG/rt-common-shared/blob/main/5gms/)

Includes example configurations and common scripts for the 5GMS (rt-5gms-*) Reference Tools.

In particular, the `5G_APIs-overrides` directory contains files that can be used with the `open5gs-tools/scripts/generate_openapi` script to override or supplement the OpenAPI YAML files from the 5G_APIs repository. OpenAPI is a standard, machine-readable format for describing REST APIs, from which client and server code can be generated.

### Multimedia Broadcast Multicast Service (MBMS) and LTE-based 5G Broadcast: [https://github.com/5G-MAG/rt-common-shared/tree/main/mbms](https://github.com/5G-MAG/rt-common-shared/tree/main/mbms)

Includes example configurations for the LTE-based 5G Broadcast (rt-mbms-*) Reference Tools.

In particular, it includes information about the `ServiceAnnouncement(SA)` file, also referred to as `bootstrap.multipart` in the context of Reference Tools. The Service Announcement file is the entry document a receiver reads first to discover which broadcast services are available and how to acquire them.

### Simple Express Server: [https://github.com/5G-MAG/rt-common-shared/blob/main/simple-express-server/README.md](https://github.com/5G-MAG/rt-common-shared/blob/main/simple-express-server/README.md)

Includes a simple HTTP server based on express.js that can be used to statically host files for streaming.

### Open5GS Tools: [https://github.com/5G-MAG/rt-common-shared/tree/main/open5gs-tools](https://github.com/5G-MAG/rt-common-shared/tree/main/open5gs-tools)

Includes scripts related to the OpenAPI generator.

### Data Reporting 5G_APIs overrides: [https://github.com/5G-MAG/rt-common-shared/tree/main/data-reporting/5G_APIs-overrides](https://github.com/5G-MAG/rt-common-shared/tree/main/data-reporting/5G_APIs-overrides)

Includes modified versions of the OpenAPI YAML files from the 5G_APIs repository specific to Data Reporting for use with a Data Collection Application Function.

### Avcodec build: [https://github.com/5G-MAG/rt-common-shared/blob/main/avcodec-build/README.md](https://github.com/5G-MAG/rt-common-shared/blob/main/avcodec-build/README.md)

Includes a helper script to build ffmpeg libraries for Android.

---

## Latest Releases

<a class="button button--outline button--primary" href="./releases">View all Auxiliary Tools releases</a>

