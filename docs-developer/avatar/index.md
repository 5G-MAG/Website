---
hide_title: true
sidebar_class_name: project-index-link
title: Avatar Communication with MPEG ARF
sidebar_position: 6
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
  <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" />
  <path d="M12 2v2" />
  <path d="M9 12v9" />
  <path d="M15 12v9" />
  <path d="M5 16l4 -2" />
  <path d="M15 14l4 2" />
  <path d="M9 18h6" />
  <path d="M10 8v.01" />
  <path d="M14 8v.01" /></svg>
<h1>Avatar Communication with MPEG ARF</h1>
</div>
<div style="margin: 8px 0"> <a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a></div>


Reference tools for real-time conversational avatar systems in 5G contexts, targeting the emerging MPEG standard for avatar-based communications. Avatars are synthesised digital representations of participants, animated in real time from audio and video input, enabling immersive video calls and virtual presence experiences. The 5G-MAG implementation provides codec, rendering, and streaming tools for avatar communications over 5G networks.

**Implemented specifications:** ISO/IEC 23090-39 (MPEG Avatar Representation Format, ARF), 3GPP [TR 26.813](https://www.3gpp.org/dynareport/26813.htm) (Study of Avatars in Real-Time Communication Services).

:::caution[Verify spec number]
The avatar study item number (TR 26.813) was revised by automated review and is not yet confirmed against the 3GPP portal. It was previously cited as TS 26.118 and then TR 26.955. Check it against the SA4 work plan before publication.
:::

## Project Overview

The slide deck below introduces the Avatar Communication reference tools: the MPEG Avatar Representation Format (ARF), how an avatar is captured, carried, and rendered over a 5G path, and how the components fit together. For scope, code, and releases, use the buttons above.

<iframe width="60%" height="560" src="../../docs/Reference_Tools_Avatar.pdf" title="Avatar Communication with MPEG ARF project overview slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_Avatar.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Technical documentation** | Avatar communications architecture and 3GPP analysis: [Avatar Communications on the Tech portal](/tech/avatar-communications) |
| **Standards** | XR and avatar-related specifications: [XR on the Standards portal](/tech/standards/xr) |
| **Related project** | MPEG-I Scene Description and XR delivery: [XR Media Integration in 5G](../xr) |

## Community Stats
<!-- STATS-TABLE-START:Conversational Avatar -->
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
<!-- STATS-TABLE-END:Conversational Avatar -->
