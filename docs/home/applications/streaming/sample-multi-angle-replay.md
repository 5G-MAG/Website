---
title: 'Sample: Multi-Angle Replay Viewer (Template)'
hide_title: true
sidebar_position: 1
description: A structural sample demonstrating the proposed layout for showcase-style tutorials — not a real, verified application.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Sample Showcase</span>
<h1>Multi-Angle Replay Viewer</h1>
</div>
</div>

<div class="topic-lead">
A structural sample showing the proposed layout for showcase-style tutorials — illustrative only, not a real, verified application.
</div>

:::danger[This is a structural sample, not a real showcase]
Every section below is illustrative placeholder content, written only to demonstrate the proposed page structure for "Showcase" tutorials. No application described here has actually been built or verified. This page should be replaced once a real showcase exists for this project.
:::

## The idea

It's the 82nd minute and the only camera you're watching is whichever one the broadcast director picked. <strong>What if the viewer picked instead?</strong> Pitch-side, tactical overhead, or locked on their favourite player — same live moment, their choice of angle, switched instantly during a replay.

_(Illustrative scenario — pick whatever real use case you want the actual showcase to demonstrate. The point of this section is one punchy paragraph that makes someone want to keep reading, not a requirements list.)_

## What you'll build

A small web viewer that plays a live 5GMS stream and lets the viewer switch between synchronized camera angles during a replay window, with every switch reported back as a consumption event.

<div class="showcase-hero-placeholder">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M9 9l6 3l-6 3z" /></svg>
<strong>Screenshot or short screen recording goes here</strong>
<span>A real showcase leads with this, above the fold — the payoff sells the build before the reader commits to it.</span>
</div>

:::note[Status]
Sample only — not built, not verified. A real showcase page should state the last-verified date and the exact component versions it was tested against, e.g. "Verified 2026-07-04 against AF 1.3.0 / AS 1.2.0."
:::

## Architecture

_(Placeholder for one diagram showing the components combined and how data flows between them — for a showcase this replaces several paragraphs of prose, since the point is "these N pieces work together," not the detail of any one piece. The cards below are illustrative navigation, not a substitute for that diagram.)_

<div class="community-tiles">
<a class="community-tile" href="/reference-tools/5gms/tutorials/end-to-end">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5a9 4 0 0 0 18 0a9 4 0 0 0 -18 0" /><path d="M3 5v14a9 4 0 0 0 18 0v-14" /></svg>
<strong>AF + AS</strong>
<span class="tile-desc">The end-to-end deployment already covers ingest and delivery.</span>
<span class="tile-cta">5GMSd (with Docker) →</span>
</a>
<a class="community-tile" href="/reference-tools/5gms/tutorials/consumption-reporting">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M20 18v3" /><path d="M16 16v5" /><path d="M12 13v8" /><path d="M8 16v5" /><path d="M3 11l6 -6l4 4l8 -8" /></svg>
<strong>Consumption Reporting</strong>
<span class="tile-desc">Logs which angle a viewer is watching, reused as-is.</span>
<span class="tile-cta">Consumption Reporting tutorial →</span>
</a>
<div class="community-tile" style={{cursor: 'default'}}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19v-8a2 2 0 0 1 2 -2h4v10m-6 0h16m-6 0v-6a2 2 0 0 1 2 -2h4v8" /></svg>
<strong>Web viewer</strong>
<span class="tile-desc">The new code this showcase actually adds — everything else is reused.</span>
</div>
</div>

## Prerequisites

- Complete the [5GMSd (with Docker) tutorial](/reference-tools/5gms/tutorials/end-to-end) — this showcase builds on that deployment rather than repeating its setup.
- Complete [5G Media Streaming with Consumption Reporting](/reference-tools/5gms/tutorials/consumption-reporting).
- _(Any showcase-specific requirement, e.g. a particular content set with multiple camera angles already encoded.)_

## Build it

### Step 1: (illustrative)

_(Real steps go here, in the same terse, code-block-heavy style already used in the existing Tutorials — that part of the format doesn't need to change.)_

### Step 2: (illustrative)

...

## What's next

Once it's running, this is where a showcase invites tinkering rather than just reproduction:

- _Swap the fixed camera set for a viewer-uploaded angle._
- _Add QoE Metrics Reporting alongside Consumption Reporting to compare rebuffering across angles._
- _Try it over a real 5G Broadcast path instead of unicast delivery._

## Related tutorials

- [5GMSd (with Docker)](/reference-tools/5gms/tutorials/end-to-end)
- [5G Media Streaming with Consumption Reporting](/reference-tools/5gms/tutorials/consumption-reporting)
- [Back to Media Streaming, Multicast & Real-Time Communications](../streaming)
