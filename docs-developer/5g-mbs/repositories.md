---
title: Repositories
hide_title: true
sidebar_position: 2
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01" />
  <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
  <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
  <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
  <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></svg>
</div>
<div class="topic-banner__text">
<h1>Software Repositories</h1>
<p>The following repositories are available.</p>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

The following repositories are available. Please refer to the "Scope" section of the different projects for more context.

The diagram below maps the MBS reference tools onto the architecture and links each one to its source repository. Auxiliary repositories are supporting libraries or helper tools rather than primary deliverables, and are indicated with a dashed border.

<!-- ARCH-TABLE-START:M1,M2,M3,M4,M5,M6 -->

<!-- ARCH-TABLE-END:M1,M2,M3,M4,M5,M6 -->

*Note: Auxiliary repositories are indicated with a dashed border.*

---

The forks below are branch-based work-in-progress implementations. They provide a basic MBS-capable radio and core, but some end-to-end functions are not yet complete: in particular, multicast reception on the gNB and UE is still under development, so traffic can be observed leaving the MB-UPF but is not yet received over the air. See the [tutorials](./tutorials) for what can currently be exercised.

## 5G UE (with MBS components)
[srsRAN_4G (5mbs branch)](https://github.com/5G-MAG/srsRAN_4G/tree/5mbs)

This is a branch of srsRAN_4G which contains a basic implementation of an MBS-capable UE.

Additional information:
* [Information and how to download, build, install and run](https://github.com/5G-MAG/srsRAN_4G/tree/5mbs)

## NG-RAN (with MBS components)
[rt-srsRAN_Project (5mbs branch)](https://github.com/5G-MAG/rt-srsRAN_Project/tree/5mbs)

This is a branch of srsRAN_Project which contains a basic implementation of an MBS-capable NG-RAN.

Additional information:
* [Information and how to download, build, install and run](https://github.com/5G-MAG/rt-srsRAN_Project/tree/5mbs)

## 5GC (with MBS components)
[open5gs/tree/5mbs (5mbs branch)](https://github.com/5G-MAG/open5gs/tree/5mbs)

This is a branch of Open5GS which contains implementations of 5GC NFs related to MBS.

Additional information:
* [Information and how to download, build, install and run](https://github.com/5G-MAG/open5gs/tree/5mbs)
* [Packages](https://github.com/orgs/5G-MAG/packages?repo_name=open5gs)

## MBS User Services: MBS Function (MBSF)
[https://github.com/5G-MAG/rt-mbs-function](https://github.com/5G-MAG/rt-mbs-function)

The MBS Function (MBSF) is the control point of the MBS User Services: an Application Provider uses it to set up MBS User Services and to tell the MB-SMF and the MBSTF what to distribute. This repository provides a 5G MBSF which forms part of the MBS User Services. This Network Function (NF) provides the interface designated as Nmb10 in the 3GPP [TS 29.580](https://www.3gpp.org/dynareport/29580.htm) specification. See the [MBSF Operation & APIs tutorial](./tutorials/mbsf).

Additional information:
* [Information and how to download, build, install and run](https://github.com/5G-MAG/rt-mbs-function)
* [Releases](https://github.com/5G-MAG/rt-mbs-function/releases)

## MBS User Services: MBS Transport Function (MBSTF)
[https://github.com/5G-MAG/rt-mbs-transport-function](https://github.com/5G-MAG/rt-mbs-transport-function)

The MBS Transport Function (MBSTF) is the data-plane worker of the MBS User Services: it ingests media objects from the Application Provider and packages them into a FLUTE session sent towards the MB-UPF. This repository provides a 5G MBSTF which forms part of the MBS User Services. This NF provides the interfaces designated as Nmb2, Nmb8 and Nmb9 in the 3GPP [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) V18.5.0 specification. See the [MBSTF Testing tutorial](./tutorials/mbstf).

Additional information:
* [Information and how to download, build, install and run](https://github.com/5G-MAG/rt-mbs-transport-function)
* [Releases](https://github.com/5G-MAG/rt-mbs-transport-function/releases)
* [Packages](https://github.com/orgs/5G-MAG/packages?repo_name=rt-mbs-transport-function)

---

## Auxiliary repositories:

### MBS Examples
[rt-mbs-examples](https://github.com/5G-MAG/rt-mbs-examples)

This repository contains Docker Compose components to deploy several network functions related to MBS.

Additional information:
* [Information and how to download, build, install and run](https://github.com/5G-MAG/rt-mbs-examples#readme)
* [Packages](https://github.com/orgs/5G-MAG/packages?repo_name=rt-mbs-examples)
* [Docker](https://github.com/5G-MAG/rt-mbs-examples/tree/development/images)

---

## Latest Releases

<!-- RELEASES-TABLE-START:5G Multicast Broadcast -->
<table class="release-table">
  <thead>
    <tr>
      <th style="width: 40%;">Repository</th>
      <th style="width: 40%;">Version</th>
      <th style="width: 20%;">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="3"><em>Sync pending &mdash; run the update-data workflow.</em></td></tr>
  </tbody>
</table>
<!-- RELEASES-TABLE-END:5G Multicast Broadcast -->
