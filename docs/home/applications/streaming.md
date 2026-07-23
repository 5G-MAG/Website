---
title: Media Streaming, Multicast & Real-Time Communications
sidebar_position: 0
hide_title: true
description: 'Real, assembled applications built on 5G-MAG’s streaming and multicast reference tools: live streaming over a real 5G network, native MBS delivery, and a live QoE analytics dashboard.'
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Applications</span>
<h1>Media Streaming, Multicast & Real-Time Communications</h1>
</div>
</div>

<div class="topic-lead">
Real applications built on 5G-MAG's streaming and multicast reference tools: live streaming over a real 5G network, native MBS delivery, and QoE analytics.
</div>

## Overview

An Application, on this site, is a real working scenario assembled from one or more Reference Tools, pointed at a concrete use case, rather than a single tool's own tutorial in isolation. This category covers three such scenarios built on 5G-MAG's streaming and multicast reference tools: media streamed over an actual 5G radio network rather than a local loopback, a native 5G multicast delivery chain, and a live quality-of-experience dashboard fed by real playback data. For acronyms used here, see the [Glossary](/tech/glossary).

## Live Streaming Over a Real 5G Network

5GMSd, the 5G-MAG Application Function (AF) and Application Server (AS) implementation for adaptive media delivery, deployed not over a local network but over an actual 5G Network: an Open5GS 5G Core and an srsRAN Radio Access Network (RAN), delivering an HLS/DASH stream (produced by ffmpeg and served from a local webserver acting as a CDN) to a commercial off-the-shelf (COTS) device. It is the same AF/AS pipeline used elsewhere on this site, but shows it running end-to-end across a real 5G radio link instead of a Docker-only setup, which is closer to what a field deployment looks like.

**Built from:** [5G Media Streaming (5GMS)](/reference-tools/5gms/).

Follow the [step-by-step guide](/reference-tools/5gms/tutorials/end-to-end-with-5g) to set up the 5G Network, deploy the AF/AS, and run this yourself.

## MBS End-to-End Delivery Demo

5G Multicast Broadcast Services (MBS) deliver the same content to many devices at once natively over the 5G Core and New Radio (NR), rather than opening a separate unicast session per user. This demo operates the MBS chain together: the MBS-capable 5G Core, the MB-SMF, MBSF and MBSTF functions that manage MBS sessions and Temporary Mobile Group Identities (TMGIs), through to the NG-RAN and a receiving User Equipment (UE).

**Built from:** [5G Multicast Broadcast Services (MBS)](/reference-tools/5g-mbs/).

A full written walkthrough is still in progress. In the meantime, follow the [demo video and component tutorials](/reference-tools/5g-mbs/tutorials/mbs-end-to-end) (5GC deployment, MBS session/TMGI management, MBSF/MBSTF) to reproduce each piece yourself.

## QoE Analytics Dashboard

A 5GMSd deployment where the Application Server extracts Common Media Client Data (CMCD, per [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf)) from media requests during normal playback and forwards it to a collector, so session quality, bitrate, buffer level and other metrics show up live on a Grafana dashboard rather than only in local logs.

**Built from:** [5G Media Streaming (5GMS)](/reference-tools/5gms/), together with the external [cmcd-toolkit](https://github.com/5G-MAG/cmcd-toolkit) collector and dashboard.

Follow the [step-by-step guide](/reference-tools/5gms/tutorials/CMCD-reporting) to enable CMCD on the Application Server and see it appear on the dashboard.

## Related

- [Reference Tools](/reference-tools) for the individual specification implementations.
- [Applications](/applications/) for the other end-to-end service scenarios.
- [Sample: Multi-Angle Replay Viewer (template)](./streaming/sample-multi-angle-replay), a structural sample for a future real showcase, not a working application yet.
