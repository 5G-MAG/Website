---
title: Roadmap
hide_title: true
sidebar_position: 1
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming</span>
<h1>Roadmap</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

## Overview

This page tracks the development roadmap for the 5G Media Streaming Reference Tools. The general roadmap board gives the overall picture; the developer Kanban boards below break the work into individual feature streams. Each stream is organised as a Minimum Viable Product (MVP), a self-contained increment that delivers one working capability. For the current status of any item, the linked Kanban board is always authoritative.

## General Project Roadmap
[Kanban board: Roadmap](https://github.com/orgs/5G-MAG/projects/48/views/6)

## Developer Kanban Boards

### 5GMS: Basic Media stream handling (MVP#1)
The main objective for MVP#1 is to implement a starting point for 5G Media Streaming with DASH-based media streaming using 5GMS formats and protocols as the basis. This includes a basic Media Player talking to a simple 5GMS Application Server.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/3)

### 5GMS: Media session handling (MVP#2)
The 5GMSd Media Session Handler retrieves Service Access Information from a 5GMSd Application Function (5GMSd AF) via reference point M5d.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/4)

### 5GMS: M1d Provisioning
Implementation of 5GMSd Provisioning (M1d) APIs
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/8)

### 5GMS: M3 Link (AF to AS RESTful OpenAPI)
Configuration of the 5GMS Application Server by the 5GMS Application Function via a RESTful OpenAPI interface.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/6)

### 5GMS: Network Assistance and Dynamic Policies features
Addition of Network Assistance and Dynamic Policies features to the 5GMS components, including integration with the BSF and PCF via new, reusable service consumer libraries.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/11)

### 5GMS: QoE metrics collection and reporting feature
Everything required for the provisioning of QoE metrics collection and reporting in the 5GMS AF as well as the collection of QoE by the 5GMS Client and the reporting of QoE metrics by the Media Session Handler to the 5GMS AF.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/12)

### 5GMS: Consumption collection and reporting feature
Everything required for the provisioning of media consumption collection and reporting in the 5GMS AF as well as the collection of consumption reports by the 5GMS Client and the reporting by the Media Session Handler to the 5GMS AF.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/16)

### 5GMS: Application Provider User Interface
Application Provider user interface to manage 5G Media Streaming operations.
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/40)

### 5GMS: [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) V17.5.0 uplift
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/18)

### 5GMS: Cloud infrastructure
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/21)

### 5GMS: DVB-I Service using 5G Media Streaming
* [**Kanban board**](https://github.com/orgs/5G-MAG/projects/23)

## Related

- [Scope](./scope)
- [GitHub Repositories](./repositories)
- [Tutorials](./tutorials)
