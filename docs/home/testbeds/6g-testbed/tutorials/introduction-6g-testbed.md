---
title: Introduction 6G Testbed
hide_title: true
sidebar_position: 0
description: Video and step-by-step walkthrough introducing the 6G Testbed's Network Emulator and AI Traffic Characterization framework, with links to full documentation.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0" />
  <path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6" />
  <path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6" />
  <path d="M6 9h12" />
  <path d="M3 20h7" />
  <path d="M14 20h7" />
  <path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M12 15v3" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">AI Traffic Characterization</span>
<h1>Introduction to the 6G Testbed: Network Emulator and AI Traffic Characterization</h1>
</div>
</div>

:::tip[In short]
This tutorial introduces the 6G Testbed including the Network Emulator and the framework for AI Traffic Characterization
:::

The 6G Testbed has two parts: a **Network Emulator** that reproduces realistic network conditions (delay, jitter, loss, and bandwidth limits) on a single machine, and an **AI Traffic Characterization** framework that runs AI workloads over those conditions and logs how they behave. The video below walks through both parts and shows how they are used together.

For the full component breakdown, the profile format, and the emulator API, see the [Scope](../scope) page. The source code and setup instructions are in the [5G-MAG/6G-Testbed](https://github.com/5G-MAG/6G-Testbed) repository.

<div class="onair-kicker"><span class="onair-kicker__dot"></span>In Action</div>

## Developer Exchange

The following video introduces the testbed:

*By Thomas Stockhammer (Qualcomm)*

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/KtYMui-cRc0" title="Introduction to the 6G Testbed: Network Emulator and AI Traffic Characterization (video walkthrough)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

## Getting started

1. Clone the repository: [5G-MAG/6G-Testbed](https://github.com/5G-MAG/6G-Testbed).
2. Try the network emulator on its own first, using an example profile. Pre-defined profiles are in [netemu/examples/profiles.yaml](https://github.com/5G-MAG/6G-Testbed/blob/main/netemu/examples/profiles.yaml), and the profiles used by the AI testbed are in [aitestbed/configs/profiles.yaml](https://github.com/5G-MAG/6G-Testbed/blob/main/aitestbed/configs/profiles.yaml).
3. Run an AI scenario over an emulated profile using the orchestrator, then inspect the SQLite log and generated plots. To evaluate a self-hosted model without a commercial API key, use the vLLM client and a `chat_vllm`-style scenario.
4. Extend it: add a scenario by subclassing `BaseScenario` and registering it, or add a provider by subclassing `LLMClient` and registering it in the orchestrator client factory (see the extension notes on the [Scope](../scope) page).

Applying `tc` impairments requires the appropriate privileges on the network interface, so run the emulator on a machine where you can configure traffic control (typically with elevated privileges), and use `clear()` to return the interface to normal when finished.
