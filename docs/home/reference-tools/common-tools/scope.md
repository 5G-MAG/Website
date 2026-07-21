---
title: Scope
hide_title: true
sidebar_position: 0
description: Lists the shared helper tools in rt-common-shared (5GMS, MBMS, Simple Express Server, Open5GS Tools, Data Reporting, Avcodec) and what each one supports.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Common Tools</span>
<h1>Scope</h1>
</div>
</div>

<div style={{margin: '8px 0'}}><a class="button button--outline button--primary" href="/reference-tools/common-tools/scope" style={{margin: '2px 4px 2px 0'}}>Scope</a> <a class="button button--outline button--primary" href="/reference-tools/common-tools/resources" style={{margin: '2px 4px 2px 0'}}>Resources</a></div>

Common Tools are shared helper repositories (scripts, example configurations and build utilities) that support several Reference Tools rather than implementing a specification of their own. You normally arrive here from a specific tool's own setup steps, not by starting here — each entry below names the project it supports; refer to that project's own Scope page for more context.

All of the tools below live in a single repository, [rt-common-shared](https://github.com/5G-MAG/rt-common-shared), grouped by subdirectory.

## 5G Media Streaming (5GMS): [rt-common-shared/5gms](https://github.com/5G-MAG/rt-common-shared/blob/main/5gms/)

Includes example configurations and common scripts for the 5GMS (rt-5gms-*) Reference Tools.

In particular, the `5G_APIs-overrides` directory contains files that can be used with the `open5gs-tools/scripts/generate_openapi` script to override or supplement the OpenAPI YAML files from the 5G_APIs repository. OpenAPI is a standard, machine-readable format for describing REST APIs, from which client and server code can be generated.

## Multimedia Broadcast Multicast Service (MBMS) and LTE-based 5G Broadcast: [rt-common-shared/mbms](https://github.com/5G-MAG/rt-common-shared/tree/main/mbms)

Includes example configurations for the LTE-based 5G Broadcast (rt-mbms-*) Reference Tools.

In particular, it includes information about the `ServiceAnnouncement(SA)` file, also referred to as `bootstrap.multipart` in the context of Reference Tools. The Service Announcement file is the entry document a receiver reads first to discover which broadcast services are available and how to acquire them.

## Simple Express Server: [rt-common-shared/simple-express-server](https://github.com/5G-MAG/rt-common-shared/blob/main/simple-express-server/README.md)

Includes a simple HTTP server based on express.js that can be used to statically host files for streaming.

## Open5GS Tools: [rt-common-shared/open5gs-tools](https://github.com/5G-MAG/rt-common-shared/tree/main/open5gs-tools)

Includes scripts related to the OpenAPI generator.

## Data Reporting 5G_APIs overrides: [rt-common-shared/data-reporting/5G_APIs-overrides](https://github.com/5G-MAG/rt-common-shared/tree/main/data-reporting/5G_APIs-overrides)

Includes modified versions of the OpenAPI YAML files from the 5G_APIs repository specific to Data Reporting for use with a Data Collection Application Function.

## Avcodec build: [rt-common-shared/avcodec-build](https://github.com/5G-MAG/rt-common-shared/blob/main/avcodec-build/README.md)

Includes a helper script to build ffmpeg libraries for Android.

## Related

- [Resources](./resources)
