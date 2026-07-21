---
title: Scope
hide_title: true
sidebar_position: 0
description: Explains the AI/ML Evaluation Framework's focus areas, repositories, and its relationship to 3GPP standards and the 6G Testbed.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
  <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
  <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
  <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
  <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
  <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">AI/ML Evaluation Framework</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/testbeds/ai-ml/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/testbeds/ai-ml/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/testbeds/ai-ml/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a></div>

This page sets out what the AI/ML Evaluation Framework covers: its current focus areas, the repositories it is built from, and how it relates to 5G-MAG's standards work.

## Overview

:::note
This introduction reflects 5G-MAG's current focus areas for AI/ML and may evolve as the work progresses.
:::

The AI/ML Evaluation Framework provides open-source reference tools for assessing how Artificial Intelligence and Machine Learning models behave in media-over-5G contexts. Rather than producing standards text, the project builds practical tooling (benchmarks, datasets, and traffic-evaluation harnesses) that lets researchers and engineers measure AI/ML performance for media use cases under realistic, reproducible conditions.

Current focus areas include:

- Evaluating ML models for media quality enhancement and content-aware encoding
- Adaptive bitrate (ABR) optimisation informed by network-side and UE-side data
- Traffic classification and characterisation for AI-driven media services
- UE data collection to support model training and inference in media applications

The hands-on traffic characterisation work (network emulation and an AI traffic testbed) currently lives in the 6G Testbed reference implementation, which the AI/ML activity shares and builds on. See [6G Testbed and AI Traffic](../6g-testbed/scope) for the testbed itself.

## Key GitHub repositories

The AI/ML reference tooling is currently developed across the following 5G-MAG repositories. The live, auto-generated list (including auxiliary repositories) is on the [Resources](./resources) page.

- [5G-MAG/6G-Testbed](https://github.com/5G-MAG/6G-Testbed): network emulator and AI traffic characterisation testbed used for AI/media traffic evaluation
- [5G-MAG/Standards](https://github.com/5G-MAG/Standards): tracking of 5G-MAG contributions to 3GPP, including AI/ML-related items

The data collection components that feed AI/ML training and inference (3GPP [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) and [TS 26.532](https://www.3gpp.org/dynareport/26532.htm)) are implemented in the separate [Data Collection](/reference-tools/data-collection/scope) project ([5G-MAG/rt-data-collection-application-function](https://github.com/5G-MAG/rt-data-collection-application-function)).

:::info
Some repositories may be private and under testing. [Request early access](/early-access).
:::

## Relationship to the standards work

These tools are complementary to, not a replacement for, the standardisation activity. 5G-MAG contributes media-specific AI/ML requirements and use cases to 3GPP (primarily SA4 for media aspects, with SA2 for network data analytics), while the reference tools provide an experimental platform to validate and inform that work. In practice the relationship is two-way: the studies and specifications (for example 3GPP [TR 26.927](https://www.3gpp.org/dynareport/26927.htm) on AI/ML in 5G media services, and the SA4 data collection specifications TS 26.531 / TS 26.532) define the scenarios and interfaces the tools evaluate, and results from the tools can feed back into 5G-MAG positions and future contributions.

A list of relevant specifications can be found in the link below.

[Standards: AI & ML in 5G Media Services](/tech/standards/ai-ml)

## What the tools implement, and what they do not

It helps to be precise about the boundary between this project and 3GPP.

- **This project does not implement a 3GPP specification.** It is an evaluation harness that measures how AI/ML models and AI-driven media services behave over realistic network conditions, so results can inform standards work.
- **The 3GPP data-collection pipeline is implemented elsewhere.** The normative Data Collection AF from SA4 (3GPP TS 26.531 and TS 26.532) is implemented in the separate [Data Collection](/reference-tools/data-collection/scope) project, not here. This project can consume or complement that data, but it does not reimplement the AF.
- **The network-conditioning and AI-traffic measurement lives in the 6G Testbed.** The hands-on tooling (network emulator plus AI traffic characterisation) is the [6G Testbed](../6g-testbed/scope), which this activity shares. That is the code you run.

In short: the standards define the scenarios and interfaces; the 6G Testbed lets you reproduce network conditions and measure behaviour; and this AI/ML activity is the framing that turns those measurements into evaluation of AI/ML for media.

## Specifications and studies this activity relates to

These are the 3GPP studies and specifications that define the scenarios and data this activity evaluates. They are covered in full on the standards portal ([AI & ML in 5G Media](/tech/standards/ai-ml)).

| Reference                                              | Group | Relevance to the tools                                                                                                            |
| ------------------------------------------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| TR 26.927                                              | SA4   | Study on AI/ML in 5G media services; the source of the media AI/ML scenarios and traffic-characterisation goals the tools address |
| [TR 22.874](https://www.3gpp.org/dynareport/22874.htm) | SA1   | Study on traffic characteristics and requirements for AI/ML model transfer; frames the latency and data-rate behaviour to measure |
| TS 26.531 / TS 26.532                                  | SA4   | Data Collection and Reporting; implemented in the separate Data Collection project that feeds training and inference data         |
| [TS 23.288](https://www.3gpp.org/dynareport/23288.htm) | SA2   | NWDAF (network-side analytics); context for how network data analytics would consume this kind of data                            |

## Getting started

Because the runnable code is the shared testbed, the quickest path is to start there:

1. Read the [6G Testbed scope](../6g-testbed/scope) to understand the two building blocks (network emulator and AI traffic characterisation framework).
2. Follow the [Tutorials](./tutorials), which walk through the shared 6G Testbed tooling.
3. Clone [5G-MAG/6G-Testbed](https://github.com/5G-MAG/6G-Testbed) and run a scenario against an emulated profile, then inspect the logged metrics.

For the data-collection components (TS 26.531 / TS 26.532), see the [Data Collection](/reference-tools/data-collection/scope) project and its repository [5G-MAG/rt-data-collection-application-function](https://github.com/5G-MAG/rt-data-collection-application-function).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TR 26.927, TR 22.874, TS 26.531 / TS 26.532, and TS 23.288. Verify against the 3GPP work plan before publication.
:::

## Related

- [Resources](./resources): the software repositories
- [Tutorials](./tutorials): where to try the shared 6G Testbed tooling
- Project [index](.): overview and slide deck
- [6G Testbed and AI Traffic](../6g-testbed/scope): the shared testbed this activity builds on
- [AI & ML on the Standards portal](/tech/standards/ai-ml): the standards context

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::
