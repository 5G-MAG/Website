---
title: Multicast Broadcast Services
sidebar_position: 2
hide_title: true
description: Covers native 5G Multicast-Broadcast Services (MBS) over the 5G Core and NR, plus 5GC service consumers and multimedia delivery tools.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0"/><path d="M20 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0"/><path d="M8 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0"/><path d="M20 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0"/><path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0"/><path d="M7.5 7.5l3 3"/><path d="M7.5 16.5l3 -3"/><path d="M13.5 13.5l3 3"/><path d="M16.5 7.5l-3 3"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Applications</span>
<h1>Multicast and Broadcast Services in 5G Networks</h1>
</div>
</div>

## Overview

This application area covers 5G Multicast-Broadcast Services (MBS), the 5G System feature for delivering the same content to many devices at once natively over the 5G Core (5GC) and the New Radio (NR) access. It is distinct from LTE-based [5G Broadcast](./5gbroadcast), which reuses 4G/LTE radio and needs no 5G core; the two are easy to confuse because of the similar names. The building blocks here are the 5G MBS client and network functions, the 5GC Service Consumers, and multimedia content delivery tooling. An Application is a curated combination of existing Reference Tools assembled into a working end-to-end service, so the cards below open the underlying tool documentation.

<div class="project-grid">

  <div class="project-card">
    <a class="project-card__icon-band" href="../5g-mbs/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg>
      <span>5G Multicast Broadcast Services</span>
    </a>
    <div class="project-card__body"><p>5G MBS client and network functions for native multicast delivery.</p></div>
    <div class="project-card__footer">
      <a class="button button--outline button--primary" href="../5g-mbs/">Documentation</a>
      <a class="button button--outline button--primary" href="https://github.com/orgs/5G-MAG/projects/48/views/13">Roadmap</a>
      <a class="button button--outline button--primary" href="../5g-mbs/releases">Releases</a>
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
    <a class="project-card__icon-band" href="../multimedia/">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12l0 9"/></svg>
      <span>Multimedia Content Delivery</span>
    </a>
    <div class="project-card__body"><p>Multi-CDN tooling and protocol implementations for media delivery.</p></div>
    <div class="project-card__footer">
      <a class="button button--outline button--primary" href="../multimedia/">Documentation</a>
      <a class="button button--outline button--primary" href="https://github.com/orgs/5G-MAG/projects/48/views/14">Roadmap</a>
      <a class="button button--outline button--primary" href="../multimedia/releases">Releases</a>
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
