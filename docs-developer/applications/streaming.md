---
title: Streaming & Media Delivery
sidebar_position: 0
hide_title: true
description: "Overview of the streaming application area: 5G Media Streaming, UE data collection, 5GC service consumers, and DVB-I delivery."
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Applications</span>
<h1>Streaming, Media Delivery and Data Collection</h1>
</div>
</div>

## Overview

This application area brings together the Reference Tools for delivering adaptive media over 5G and for collecting playback and quality data from devices. An Application is a curated combination of existing Reference Tools assembled into a working end-to-end service, so the cards below open the underlying tool documentation. It is aimed at developers who want to stand up a streaming service (network to client) and see how session handling, reporting and service discovery fit together. The building blocks are 5G Media Streaming (5GMS), UE Data Collection, the 5G Core (5GC) Service Consumers, and DVB-I over 5G.

<div class="project-grid">

  <div class="project-card">
    <a class="project-card__icon-band" href="../5gms/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16l13 -8l-13 -8"/></svg>
      <span>5G Media Streaming</span>
    </a>
    <div class="project-card__body"><p>3GPP AF/AS implementation for adaptive media delivery over 5G.</p></div>
    <div class="project-card__footer">
      <a class="button button--outline button--primary" href="../5gms/">Documentation</a>
      <a class="button button--outline button--primary" href="https://github.com/orgs/5G-MAG/projects/48/views/6">Roadmap</a>
      <a class="button button--outline button--primary" href="../5gms/releases">Releases</a>
    </div>
  </div>

  <div class="project-card">
    <a class="project-card__icon-band" href="../data-collection/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
      <span>UE Data Collection &amp; Reporting</span>
    </a>
    <div class="project-card__body"><p>On-device data collection and reporting per 3GPP [TS 26.531](https://www.3gpp.org/dynareport/26531.htm).</p></div>
    <div class="project-card__footer">
      <a class="button button--outline button--primary" href="../data-collection/">Documentation</a>
      <a class="button button--outline button--primary" href="https://github.com/orgs/5G-MAG/projects/48/views/8">Roadmap</a>
      <a class="button button--outline button--primary" href="../data-collection/releases">Releases</a>
    </div>
  </div>

  <div class="project-card">
    <a class="project-card__icon-band" href="../5g-core/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.657 16c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"/><path d="M12 16v5"/><path d="M16 16v4a1 1 0 0 0 1 1h4"/><path d="M8 16v4a1 1 0 0 1 -1 1h-4"/></svg>
      <span>5GC Service Consumers</span>
    </a>
    <div class="project-card__body"><p>Reference consumer implementations for 5GC capability exposure APIs.</p></div>
    <div class="project-card__footer">
      <a class="button button--outline button--primary" href="../5g-core/">Documentation</a>
      <a class="button button--outline button--primary" href="https://github.com/orgs/5G-MAG/projects/48/views/17">Roadmap</a>
      <a class="button button--outline button--primary" href="../5g-core/releases">Releases</a>
    </div>
  </div>

  <div class="project-card">
    <a class="project-card__icon-band" href="../dvb-i/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg>
      <span>DVB-I over 5G</span>
    </a>
    <div class="project-card__body"><p>DVB-I service discovery and delivery adapted for 5G hybrid networks.</p></div>
    <div class="project-card__footer">
      <a class="button button--outline button--primary" href="../dvb-i/">Documentation</a>
      <a class="button button--outline button--primary" href="https://github.com/orgs/5G-MAG/projects/48/views/11">Roadmap</a>
      <a class="button button--outline button--primary" href="../dvb-i/releases">Releases</a>
    </div>
  </div>

</div>

---

## Other Tools

These supporting tools are shared across several application areas. Auxiliary tools provide common scripts and configurations; the 3GPP Radio Access Network (RAN) and Core Platforms provide a test network to run against; External Tools are third-party utilities that work with the Reference Tools.

### Auxiliary tools common to various projects
<a class="button button--outline button--primary" href="../common-tools/" style="margin-right:6px">Documentation</a>
<a class="button button--outline button--primary" href="../common-tools/releases">Releases</a>

### 3GPP RAN and Core Platforms
<a class="button button--outline button--primary" href="../3gpp-platforms/">Documentation</a>

### External Tools
<a class="button button--outline button--primary" href="../external-tools/">Documentation</a>

## Related

- [Reference Tools](../projects) for the individual specification implementations.
- [Applications](../applications/) for the other end-to-end service scenarios.
- [Testbeds and Evaluation Tools](../testbeds) for shared test infrastructure.
