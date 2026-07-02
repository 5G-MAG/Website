---
title: Repositories
hide_title: true
sidebar_position: 1
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M20 21l2 -2l-2 -2" />
  <path d="M17 17l-2 2l2 2" /></svg>
</div>
<div class="topic-banner__text">
<h1>Software Repositories</h1>
<p>The following repositories are available.</p>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a></div>

The following repositories are available. Please refer to the "Scope" section of the different projects for more context. The table below lists the 5G-MAG forks of the upstream RAN and Core software; when the automation has run, it shows each repository with its links and status.

<!-- ARCH-TABLE-START:P1,P2,P3,P4 -->

<!-- ARCH-TABLE-END:P1,P2,P3,P4 -->

*Note: Auxiliary repositories (supporting libraries or helper tools rather than primary deliverables) are indicated with a dashed border.*

## Branches at a glance

Each fork carries a `main`/`master` branch tracking the upstream project, plus branches that add the delivery technology 5G-MAG works on. PWS (Public Warning System) is the cell-broadcast mechanism used for emergency alerts. The mapping below shows which branch to use for which purpose.

| Repository | Branch | Use case |
|---|---|---|
| open5gs | main | Regular 5G network (baseline core) |
| open5gs | 5mbs | 5MBS implementations (main line) |
| open5gs | 5mbs-development | 5MBS development branch |
| rt-srsRAN_Project | main | Regular 5G network (baseline NG-RAN) |
| rt-srsRAN_Project | 5mbs | 5MBS implementations (main line) |
| rt-srsRAN_Project | 5mbs-development | 5MBS development branch |
| srsRAN_4G | master | Baseline srsRAN_4G fork |
| srsRAN_4G | 5mbs | 5MBS implementations |
| srsRAN_4G | fembms | LTE-based 5G Broadcast / MBMS |
| srsRAN_4G | pws-enb | Emergency alerts (Public Warning System) |
| srsRAN | main_srsran_4g | Baseline srsRAN fork |
| srsRAN | fembms | LTE-based 5G Broadcast / MBMS |

---

## Fork of Open5GS
[open5gs](https://github.com/5G-MAG/open5gs)

The branches available under this repository are:
* **main** - A fork of the "main" branch of Open5GS primarily used for building a regular 5G Network.
* **5mbs** - Acts as the "main" branch for implementations related to 5MBS.
* **5mbs-development** - Acts as the "development" branch for the 5mbs branch.

## Fork of srsRAN Project
[rt-srsRAN_Project](https://github.com/5G-MAG/rt-srsRAN_Project)

The branches available under this repository are:
* **main** - A fork of the "main" branch of srsRAN Project primarily used for building a regular 5G Network.
* **5mbs** - Acts as the "main" branch for implementations related to 5MBS.
* **5mbs-development** - Acts as the "development" branch for the 5mbs branch.

## Fork of srsRAN_4G
[srsRAN_4G](https://github.com/5G-MAG/srsRAN_4G)

The branches available under this repository are:
* **master** - A fork of the "master" branch of srsRAN_4G.
* **5mbs** - Acts as the "main" branch for implementations related to 5MBS.
* **fembms** - Acts as the "main" branch for implementations related to 5G Broadcast / MBMS.
* **pws-enb** - Acts as the "main" branch for implementations related to Emergency Alerts.

## Fork of srsRAN (discontinued version prior to srsRAN_4G)
[srsRAN](https://github.com/5G-MAG/srsRAN)

The branches available under this repository are:
* **main_srsran_4g** - A fork of the "main" branch of srsRAN.
* **fembms** - Acts as the "main" branch for implementations related to 5G Broadcast / MBMS.
