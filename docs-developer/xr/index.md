---
hide_title: true
sidebar_class_name: project-index-link
title: XR and MPEG-I Scene Description
sidebar_position: 12
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
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
  <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
  <path d="M3 17v2a2 2 0 0 0 2 2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
<h1>XR and MPEG-I Scene Description</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference player and server for eXtended Reality (XR) content delivered over 5G networks, implementing MPEG-I Scene Description (ISO/IEC 23090-14). The tools enable delivery of dynamic 3D scenes composed of [glTF](/developer/glossary) (GL Transmission Format) objects, spatial audio, and haptic elements, transported via the 5G Media Streaming ([5GMS](/developer/glossary)) framework ([TS 26.512](https://www.3gpp.org/dynareport/26512.htm)). Designed for developers exploring immersive media delivery and XR experiences on 5G devices and platforms.

**Implemented specifications:** ISO/IEC 23090-14 (MPEG-I Scene Description, the format that describes how 3D objects, media and audio are composed into a scene); 3GPP [TR 26.928](https://www.3gpp.org/dynareport/26928.htm) (Extended Reality (XR) in 5G, the study of XR use cases and requirements); TS 26.512 (the 5GMS transport layer used to deliver the scene and its media).

### Where to start

- **Scope** for the implemented features and the specifications in scope: see [Scope](./scope).
- **Repositories** for the source code of the player, server and content: see [GitHub Repos](./repositories).
- **Tutorials** to build and run the player and to author test content: see [Tutorials](./tutorials).

## Project Overview

The slide deck below introduces the project: what XR media with MPEG-I Scene Description is, the reference tools involved, and how they fit together over 5G.

<iframe width="60%" height="520" src="../../docs/Reference_Tools_XR_Media_MPEG_I_SD.pdf"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_XR_Media_MPEG_I_SD.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| | |
|---|---|
| **Technical documentation** | MPEG-I Scene Description overview and analysis: [XR on the Tech portal](/tech/xr) |
| **Standards** | ISO/IEC 23090-14, 3GPP XR work items: [XR on the Standards portal](/tech/standards/xr) |

## Community Stats
<!-- STATS-TABLE-START:XR MPEG-I -->
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
<!-- STATS-TABLE-END:XR MPEG-I -->
