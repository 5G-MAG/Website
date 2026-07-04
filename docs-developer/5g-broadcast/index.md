---
hide_title: true
sidebar_class_name: project-index-link
title: "5G Broadcast: Hybrid TV/Radio"
sidebar_position: -1
description: Overview of the 5G Broadcast reference tools (rt-mbms-tx, rt-mbms-modem and related repos) implementing ETSI TS 103 720 for TV and radio.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
  <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
  <path d="M9 21l3 -9l3 9" />
  <path d="M10 19h4" /></svg>
</div>
<div class="topic-banner__text">
<h1>5G Broadcast: Hybrid TV/Radio</h1>
</div>
</div>

<div class="topic-lead">
5G Broadcast delivers linear TV and radio to an unlimited number of devices over a free-to-air radio signal, with no SIM and no per-user connection or return channel.
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>


## Overview

5G Broadcast delivers linear TV and radio to an unlimited number of devices over a free-to-air radio signal, with no SIM and no per-user connection or return channel. It is built on LTE (Long Term Evolution, the 4G radio standard) and standardised by 3GPP, using the evolved Multimedia Broadcast Multicast Service (eMBMS) and its further-enhanced variant Further evolved Multimedia Broadcast Multicast Service (FeMBMS), also called LTE-based 5G Broadcast. This project provides the reference transmitter and receiver so anyone can test a complete broadcast chain, and it is aimed at broadcasters, network engineers and developers evaluating or deploying 5G Broadcast.

Reference transmitter (rt-mbms-tx) and receiver/modem (rt-mbms-modem) for LTE-based 5G Broadcast (FeMBMS), implementing ETSI TS 103 720. These tools enable end-to-end testing of 5G Broadcast systems for TV and radio distribution over dedicated broadcast carriers, without a return channel or SIM requirement on the receiver side. The project also covers hybrid broadcast/broadband delivery and integration with DVB-I service discovery.

**Implemented specifications:** ETSI TS 103 720 (5G Broadcast System for linear TV and radio), 3GPP [TR 36.976](https://www.3gpp.org/dynareport/36976.htm) (LTE-based 5G broadcast overview), [TS 26.346](https://www.3gpp.org/dynareport/26346.htm) (MBMS protocols and codecs), [TS 26.347](https://www.3gpp.org/dynareport/26347.htm) (MBMS application programming interface).

:::tip[Where to start]
* To understand what is in scope and which features are implemented, see [Scope](./scope).
* To run a receiver against a recorded signal, follow the [SDR - HLS Playback over 5G Broadcast](./tutorials/hls-playback-5gbc) tutorial.
* To build and run the transmitter, see the [Project Roadmap](./projects) and the transmitter repositories under [GitHub Repos](./repositories).
:::

### Tools at a glance

The tutorials refer to the following repositories by name. This table maps each to its role in the broadcast chain.

| Repository | Role |
|---|---|
| `rt-mbms-tx` | 5G Broadcast transmitter (FeMBMS waveform) |
| `rt-mbms-tx-for-qrd-and-crd` | Transmitter variant based on an MBMS-enabled eNodeB, tailored for QRD and CRD receiver devices |
| `rt-mbms-modem` | Receiver (modem) that demodulates the broadcast signal and outputs the delivered content |
| `rt-mbms-mw` | Middleware that decodes received files and exposes them to a media player |
| `rt-wui` | Web user interface for monitoring the modem and middleware |
| `rt-libflute` | FLUTE (File Delivery over Unidirectional Transport) library used to encode and decode delivered files |
| `flute-ffmpeg` | Helper that creates a live stream and FLUTE-encodes it for transmission |

## Project Overview

<iframe loading="lazy" width="60%" height="560" src="/docs/Reference_Tools_5G_Broadcast.pdf"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_5G_Broadcast.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

## Go deeper

| Area | Details |
|---|---|
| **Technical documentation** | Architecture, deployment profiles, and analysis: [5G Broadcast on the Tech portal](/tech/5g-broadcast) |
| **Standards** | ETSI TS 103 720 versions, 3GPP specs, and 5G-MAG contributions: [5G Broadcast on the Standards portal](/tech/standards/5g-broadcast) |

## Community Stats
<!-- STATS-TABLE-START:5G Broadcast TV Radio -->
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
<!-- STATS-TABLE-END:5G Broadcast TV Radio -->
