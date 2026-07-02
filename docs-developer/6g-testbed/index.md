---
hide_title: true
sidebar_class_name: project-index-link
title: 6G Testbed and AI Traffic
sidebar_position: -1
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
  <path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" />
  <path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" />
  <path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" />
  <path d="M6 9h12" />
  <path d="M3 20h7" />
  <path d="M14 20h7" />
  <path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M12 15v3" /></svg>
<h1>6G Testbed and AI Traffic</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Experimental testbed platform for AI-driven media traffic characterization and optimisation over 5G networks. The project provides tools to measure, analyse, and evaluate AI traffic patterns and media delivery under emulated network conditions. It builds on a 3GPP RAN testbed infrastructure and is intended to inform 5G-MAG's contributions to 6G requirements for intelligent, media-aware networks. IMT-2030 is the ITU-R (the Radiocommunication Sector of the International Telecommunication Union) framework of requirements for 6G systems.

**Relevant standardisation context:** No normative 6G specifications exist yet. Aligned with 3GPP SA4 AI/ML study items ([TR 26.927](https://www.3gpp.org/dynareport/26927.htm)) and ITU-R IMT-2030 requirements for intelligent network management.

## Project Overview

The slide deck below introduces the 6G Testbed: its two building blocks, a configurable network emulator and an AI traffic characterisation framework, and how they are used to measure how AI and media traffic behave under emulated network conditions. To try it, see the [Scope](./scope) for the components and the [Introduction to the 6G Testbed](./tutorials/introduction-6g-testbed) tutorial for a walkthrough.

<iframe width="60%" height="560" src="../../docs/Reference_Tools_3GPP_Testbed_AI_Traffic.pdf" title="6G Testbed and AI Traffic: project overview slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_3GPP_Testbed_AI_Traffic.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Technical documentation** | 6G research context and 5G-MAG contributions: [6G on the Tech portal](/tech/6g) |
| **Standards** | 6G standardisation activities and study items: [6G on the Standards portal](/tech/standards/6g) |
| **Related project** | AI/ML modelling tools: [AI/ML Evaluation Framework](../ai-ml) |

## Community Stats
<!-- STATS-TABLE-START:6G Testbed -->
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
<!-- STATS-TABLE-END:6G Testbed -->
