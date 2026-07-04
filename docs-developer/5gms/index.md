---
hide_title: true
sidebar_class_name: project-index-link
title: 5G Media Streaming
sidebar_position: -1
description: Overview of the 5G-MAG 5GMS reference implementation, its AF/AS components, spec coverage, and links to project resources.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<h1>5G Media Streaming</h1>
</div>
</div>

<div class="topic-lead">
Reference implementation of the 5G Media Streaming (5GMS) framework defined by 3GPP.
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference implementation of the 5G Media Streaming (5GMS) framework defined by 3GPP. The tools cover two server-side roles: the Application Function (AF), which handles provisioning, configuration and reporting, and the Application Server (AS), which caches and delivers the media. Both target 5G Unicast Downlink Media Streaming (5GMSd), adaptive bitrate streaming from the network to user equipment (UE). The current AF and AS implementations are based on Release 17 ([TS 26.512](https://www.3gpp.org/dynareport/26512.htm)); see the [Scope](./scope) page for the exact feature and specification coverage. Use these tools to build, test, and validate 5GMSd-compliant pipelines on 5G networks.

:::tip[Where to start]
Start with the [End-to-End deployment (with Docker) tutorial](./tutorials/end-to-end). It is the quickest way to get a working AF and AS running, and the other tutorials build on it.
:::

**Key specifications:** 3GPP [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) (5GMS general description and architecture), TS 26.512 (5GMS protocols and APIs), [TS 26.511](https://www.3gpp.org/dynareport/26511.htm) (5GMS profiles, codecs and formats), and, from Release 18, [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) (generalised media delivery provisioning and media session handling). For the full normative list, see the [Standards portal](/tech/standards/5gms).

## Project Overview

The slide deck below introduces the 5G Media Streaming project, its components and the features covered by the Reference Tools.

<iframe loading="lazy" width="60%" height="560" src="../../docs/Reference_Tools_5G_Media_Streaming.pdf" title="5G Media Streaming Reference Tools slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_5G_Media_Streaming.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| Area | Details |
|---|---|
| **Technical documentation** | Architecture, protocols, and analysis: [5G Media Streaming on the Tech portal](/tech/5gms) |
| **Standards** | Normative specifications and 5G-MAG contributions: [5G Media Streaming on the Standards portal](/tech/standards/5gms) |

## Community Stats
<!-- STATS-TABLE-START:5G Media Streaming -->
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
<!-- STATS-TABLE-END:5G Media Streaming -->
