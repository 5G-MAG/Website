---
hide_title: true
sidebar_class_name: project-index-link
title: DVB-I over 5G
sidebar_position: 7
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
  <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
  <path d="M16 3l-4 4l-4 -4" /></svg>
<h1>DVB-I over 5G</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference tools for delivering DVB-I (Digital Video Broadcasting Internet) services over 5G networks, including 5G Broadcast. DVB-I defines a common service discovery and selection framework that unifies IP-delivered TV services across access networks. The 5G-MAG implementation covers DVB-I service discovery lists, bootstrap procedures, and integration with both 5G unicast (via 5G Media Streaming, 5GMS) and 5G Broadcast (via Further evolved Multimedia Broadcast Multicast Service, FeMBMS) delivery paths, enabling a seamless hybrid broadcast/broadband TV experience.

**Implemented specifications:** DVB BlueBook A177 (DVB-I specification), ETSI TS 103 720 (5G Broadcast delivery path), 3GPP [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (5GMS unicast delivery path).

## Project Overview

The slide deck below introduces the DVB-I over 5G project: its goals, the delivery paths it covers, and the reference architecture.

<iframe width="60%" height="560" src="../../docs/Reference_Tools_DVB_I_over_5G.pdf"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_DVB_I_over_5G.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Technical documentation** | DVB-I over 5G analysis: [DVB-I on the Tech portal](/tech/dvb-i/dvb-i-5g) |
| **Standards** | DVB-I and 5G delivery specifications: [DVB-I on the Standards portal](/tech/standards/dvb-i) |
| **Related project** | Underlying broadcast transport: [5G Broadcast: Hybrid TV/Radio](../5g-broadcast) |

## Related

* [Scope](./scope) - specifications in scope and high-level architectures
* [Project Roadmap](./projects) - planned work
* [Software Repositories](./repositories) - the source repositories for these tools
* [Tutorials](./tutorials) - guides and examples

:::note
Refer to the [DVB-I repositories](https://github.com/5G-MAG) on GitHub to use or contribute to these Reference Tools.
:::

## Community Stats
<!-- STATS-TABLE-START:DVB-I -->
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
<!-- STATS-TABLE-END:DVB-I -->
