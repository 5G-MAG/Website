---
hide_title: true
sidebar_class_name: project-index-link
title: 5G Multicast Broadcast Services
sidebar_position: 4
description: Landing page for the 5G MBS reference tools (3GPP Rel-17/18), linking to scope, repositories, packages, releases, tutorials and community stats.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01" />
  <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
  <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
  <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
  <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></svg>
</div>
<div class="topic-banner__text">
<h1>5G Multicast Broadcast Services</h1>
</div>
</div>

<div class="topic-lead">
Reference implementation of the 5G Multicast Broadcast Services (MBS) user service layer targeting 3GPP Release 17 and 18.
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


Reference implementation of the 5G Multicast Broadcast Services (MBS) user service layer targeting 3GPP Release 17 and 18. Unlike LTE-based 5G Broadcast (evolved Multimedia Broadcast Multicast Service, eMBMS), 5G MBS is natively integrated into the 5G Core (5GC) and New Radio (NR) Radio Access Network (RAN), enabling efficient point-to-multipoint delivery of live TV, software updates, and emergency information. The tools cover MBS service announcements, session management, and media delivery over both multicast and broadcast modes as defined in [TS 26.502](https://www.3gpp.org/dynareport/26502.htm).

If you are looking for the LTE-based, free-to-air broadcast implementation (a separate, similarly named area), see the [5G Broadcast](../5g-broadcast) reference tools instead.

:::tip[Where to start]
Read the [Scope](./scope) to understand what is implemented, then follow the [Initial support of MBS in the 5GC](./tutorials/mbs-in-5gc) tutorial, or the [MBS Transport Function (MBSTF) Testing](./tutorials/mbstf) tutorial for the user service layer.
:::

**Implemented specifications:** 3GPP TS 26.502 (MBS user services), [TS 23.247](https://www.3gpp.org/dynareport/23247.htm) (MBS architecture and functional description), [TS 38.300](https://www.3gpp.org/dynareport/38300.htm) (NR overall description, RAN broadcast procedures).

## Project Overview

The slide deck below introduces the 5G MBS reference tools, their architecture and the specifications they implement.

<iframe loading="lazy" width="60%" height="560" src="../../docs/Reference_Tools_5G_Multicast_Broadcast.pdf" title="5G Multicast Broadcast Services reference tools overview slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_5G_Multicast_Broadcast.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| Area | Details |
|---|---|
| **Technical documentation** | Architecture, RAN aspects, and mobility analysis: [5G MBS on the Tech portal](/tech/5g-mbs) |
| **Standards** | Normative specs and 5G-MAG contributions: [5G MBS on the Standards portal](/tech/standards/5g-mbs) |

## Community Stats
<!-- STATS-TABLE-START:5G Multicast Broadcast -->
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
<!-- STATS-TABLE-END:5G Multicast Broadcast -->
