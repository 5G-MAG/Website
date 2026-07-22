---
title: Scope
hide_title: true
sidebar_position: 0
description: Describes the 6G Testbed's network emulator and AI traffic characterization framework, their architecture, and links to 3GPP standards.
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
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/testbeds/6g-testbed/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/testbeds/6g-testbed/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/testbeds/6g-testbed/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="/testbeds/6g-testbed/tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This project hosts an open-source testbed for AI/media traffic evaluation targeting 5G, 6G, and realistic UE-observed network conditions. It supports 3GPP SA4 studies and broader media delivery evaluations and may be extended and used for other purposes.

A list of relevant specifications can be found in the link below.

[Standards: 6G Media](/tech/standards/6g)

## What is being implemented?

:::tip[In short]
A testbed for 6G AI Traffic Characterization able to: Measure traffic characteristics of generative AI services (LLMs, image/video generation); Analyze agentic AI patterns such as multi-step tool calling and tool server workflows; Evaluate QoE under emulated network conditions like latency, loss, and bandwidth.
:::

The testbed has two building blocks: a **Network Emulator** that reproduces realistic network conditions on a machine, and an **AI Traffic Characterization** framework that runs AI workloads over those conditions and logs how they behave. The AI testbed reuses the network emulator rather than duplicating it. The diagram below shows how these two blocks fit together.

<img loading="lazy" src="/assets/images/6g-testbed/architecture.png" style="width: 70%" alt="6G Testbed architecture: an AI Traffic Characterization framework (orchestrator, scenarios, clients, capture, analysis) running on top of the shared Network Emulator, which applies impairments to the network interface." />

_Figure: high-level architecture. The AI Traffic Characterization framework runs on top of the shared Network Emulator._

This tutorial provides an introduction to the work:

[Go to the Tutorial: Introduction to the 6G Testbed](./tutorials/introduction-6g-testbed)

## Network emulator

In plain terms, the network emulator lets you make one machine behave as if it were on a slow, lossy, or congested network, so you can test how media and AI traffic hold up under realistic conditions without needing a real radio link. It does this by shaping the traffic on a network interface.

Under the hood it is built on Linux Traffic Control (`tc`, the kernel traffic-shaping subsystem) using the `netem` queueing discipline (qdisc, the component that decides how packets are queued and delayed). It supports one-way delay, jitter, loss, bandwidth shaping, and advanced netem controls (correlation, distributions, loss models, reordering, duplication, corruption, and queue limits). It can combine Hierarchical Token Bucket (HTB) rate limiting with netem impairments, and applies impairments to the reverse direction using an Intermediate Functional Block (IFB) device. It is controlled via YAML profiles.

Network conditions are applied at the interface level, enabling transparent emulation for any media delivery protocol without requiring modifications to the client or server implementations.

An example of the profile YAML is shown below.

```yaml
profiles:
  example_full_profile:
    # === DELAY PARAMETERS ===

    # One-way packet delay in milliseconds
    # Maps to: tc qdisc add dev eth0 root netem delay <delay_ms>ms
    delay_ms: 50

    # Delay variation (jitter) in milliseconds
    # Adds random variation to base delay using specified distribution
    # Maps to: tc qdisc ... delay 50ms 10ms (adds +/- jitter)
    jitter_ms: 10

    # Delay distribution model
    # Options: "normal", "pareto", "paretonormal"
    # - normal: Gaussian distribution (symmetric around mean)
    # - pareto: Heavy-tailed distribution (models bursty delays)
    # - paretonormal: Combination for realistic mobile networks
    # Maps to: tc qdisc ... delay 50ms 10ms distribution pareto
    delay_distribution: 'normal'

    # Correlation between consecutive packet delays (0-100%)
    # Higher values create smoother delay variations (less random)
    # Maps to: tc qdisc ... delay 50ms 10ms 25%
    delay_correlation_pct: 25

    # === LOSS PARAMETERS ===

    # Random packet loss percentage (0-100)
    # Maps to: tc qdisc ... loss 0.5%
    loss_pct: 0.5

    # Loss correlation for bursty loss patterns (0-100%)
    # Higher values create loss bursts rather than random drops
    # Maps to: tc qdisc ... loss 0.5% 25%
    loss_correlation_pct: 25

    # Gilbert-Elliott loss model for realistic loss simulation
    # Defines a two-state Markov model (Good/Bad states)
    # Maps to: tc qdisc ... loss gemodel p h 1-k
    loss_model:
      type: 'gemodel' # Gilbert-Elliott model
      p: 0.01 # Probability of transitioning Good -> Bad
      r: 0.10 # Probability of transitioning Bad -> Good
      h: 0.0 # Probability of loss in Good state (1-h)
      k: 0.95 # Probability of loss in Bad state (1-k)

    # === BANDWIDTH PARAMETERS ===

    # Bandwidth limit in Mbps
    # When set, enables HTB (Hierarchical Token Bucket) with netem as leaf
    # Maps to: tc qdisc add dev eth0 root handle 1: htb default 1
    #          tc class add dev eth0 parent 1: classid 1:1 htb rate 100mbit
    #          tc qdisc add dev eth0 parent 1:1 handle 10: netem ...
    rate_mbit: 100

    # Queue buffer size in packets
    # Controls how many packets can be queued before drops occur
    # Maps to: tc qdisc ... limit 1000
    limit_packets: 1000

    # === ADDITIONAL IMPAIRMENTS ===

    # Packet reordering percentage
    # Causes specified percentage of packets to be delayed further
    # Maps to: tc qdisc ... reorder 5% 50%
    reorder_pct: 0.0
    reorder_correlation_pct: 0

    # Packet duplication percentage
    # Causes specified percentage of packets to be sent twice
    # Maps to: tc qdisc ... duplicate 0.1%
    duplicate_pct: 0.0

    # Packet corruption percentage
    # Introduces bit errors in specified percentage of packets
    # Maps to: tc qdisc ... corrupt 0.01%
    corrupt_pct: 0.0

# === GLOBAL CONFIGURATION ===
defaults:
  # Default interface to apply impairments
  interface: 'eth0'

  # Default profile if none specified
  default_profile: 'ideal_6g'

  # Whether to apply impairments bidirectionally
  # (requires IFB device for ingress shaping)
  bidirectional: true
```

Example YAMLs with pre-defined profiles are available here: [netemu/examples/profiles.yaml](https://github.com/5G-MAG/6G-Testbed/blob/main/netemu/examples/profiles.yaml)

The emulator provides pre-defined network profiles derived from 3GPP 5QI specifications. The 5QI (5G QoS Identifier) is a standard value that maps to a set of quality-of-service characteristics for a traffic type. See for example 3GPP TS 23.501 Table 5.7.4-1, where the PDB (Packet Delay Budget) is mapped to `delay_ms` and the PER (Packet Error Rate) is mapped to `loss_pct`.

Example YAMLs with the pre-defined profiles used by the AI traffic characterization testbed are available here: [aitestbed/configs/profiles.yaml](https://github.com/5G-MAG/6G-Testbed/blob/main/aitestbed/configs/profiles.yaml)

The emulator supports multiple deployment configurations.

The following Python example shows how the network emulator is driven from a test script:

```python
# Apply a named profile for uplink and downlink
emulator.apply_profile("poor_cellular",
      ingress_profile="5g_urban")

# ... run tests ...

emulator.clear()
```

In this example, `apply_profile("poor_cellular", ...)` sets the downlink (egress) impairments from the `poor_cellular` profile, while `ingress_profile="5g_urban"` applies a different profile to the reverse (ingress) direction, so uplink and downlink can be shaped independently. After the tests run, `clear()` removes all impairments and returns the interface to normal.

## AI Traffic characterization testbed

The testbed provides an end-to-end framework to run scenarios, emulate network conditions, and log metrics in a reproducible manner.

Key capabilities include orchestration of scenarios, provider adapters for different commercial and self-hosted models, network-layer and transport-layer capture (L3/L4, via tcpdump), optional application-layer capture (L7, via mitmproxy), and SQLite-based logging for large-scale analysis.

The testbed architecture is orchestrator-centric with clear separation of scenarios, clients, network emulation, capture, and analysis:

- orchestrator.py coordinates scenario runs, applies network profiles, handles retries, and generates reports.
- scenarios/* implement traffic patterns (chat, agent, direct search, realtime, multimodal, image, video, computer use).
- clients/* provide provider adapters, including OpenAI, Gemini, DeepSeek (OpenAI-compatible), and vLLM for self-hosted models.
- netem: external dependency on the network emulator module that is proposed to be common to all studies.
- capture/* provides L3/L4 pcap capture and L7 capture via mitmproxy.
- analysis/* logs to SQLite, computes 3GPP-aligned metrics, and generates plots.

The testbed is designed to be easily usable and highly configurable. It can be extended in two main ways:

- **New scenarios** can be added by creating a class in `scenarios/` that extends `BaseScenario`, registering it in `scenarios/__init__.py`, and adding a YAML entry in `configs/scenarios.yaml`.
- **New providers** can be added by implementing a client in `clients/` that subclasses `LLMClient` and registering it in the orchestrator client factory.

The testbed includes a vLLM client (clients/vllm_client.py) and example scenarios in configs/scenarios.yaml (e.g., chat_vllm). This enables evaluation of self-hosted models via the OpenAI-compatible API provided by vLLM, supporting the same metrics and logging pipeline as hosted providers.

## How the testbed maps to the standards

The testbed is an evaluation harness, not an implementation of a 3GPP specification. Its value to standardisation is that it reproduces standardised network conditions and measures how AI and media workloads behave over them. Three touch points connect it to 3GPP work:

- **Network conditions are anchored in 3GPP QoS.** The emulator ships profiles derived from 3GPP 5QI values. The 5QI (5G QoS Identifier) maps a traffic type to a set of QoS characteristics; the standardised mapping is in [3GPP TS 23.501](https://www.3gpp.org/dynareport/23501.htm) (Table 5.7.4-1). As noted above, the Packet Delay Budget (PDB) maps to `delay_ms` and the Packet Error Rate (PER) maps to `loss_pct`, so a profile such as 5QI 7 or 5QI 80 reproduces a recognisable, standards-referenced condition rather than an arbitrary one. Candidate 6G conditions (for example a hyper-reliable low-latency profile derived from the ITU-R IMT-2030 HRLLC scenario) are provided alongside them.
- **The AI workloads reflect the SA4 media AI/ML study.** The scenario set (chat, agentic AI, image, video, multimodal, real-time) exercises the kinds of AI/ML media services examined in 3GPP [TR 26.927](https://www.3gpp.org/dynareport/26927.htm) (SA4, Study on AI/ML in 5G media services). The metrics the testbed computes (time-to-first-token, total latency, uplink/downlink ratios, token rates, agent loop factors) are the traffic characteristics that TR 26.927 and the model-transfer requirements study [TR 22.874](https://www.3gpp.org/dynareport/22874.htm) (SA1) care about.
- **Data collection is a separate, complementary project.** The testbed measures traffic; it does not implement the 3GPP Data Collection AF. That normative pipeline (3GPP [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) and [TS 26.532](https://www.3gpp.org/dynareport/26532.htm)) is implemented in the [Data Collection](/reference-tools/data-collection/scope) reference tool. The two are complementary: one collects standardised UE and media-client data, the other characterises AI/media traffic under controlled conditions.

The standards portal gives the full picture for these references: [6G Media](/tech/standards/6g) and [AI & ML in 5G Media](/tech/standards/ai-ml).

## Specifications and studies referenced

| Reference             | Group | Where it appears in the testbed                                                             |
| --------------------- | ----- | ------------------------------------------------------------------------------------------- |
| TS 23.501             | SA2   | Source of the 5QI to QoS-characteristics mapping used to derive emulator profiles           |
| TR 26.927             | SA4   | The AI/ML media scenarios and traffic characteristics the AI testbed is designed to measure |
| TR 22.874             | SA1   | Model-transfer traffic and performance requirements that motivate the metrics               |
| TS 26.531 / TS 26.532 | SA4   | Data Collection AF; implemented in the separate Data Collection project, not here           |

There is no normative 6G specification yet (6G is a Release-21 target, currently at the study stage in Release 20), so the 6G-oriented profiles are experimental and provisional. They are intended to inform requirement inputs, not to assert settled values.

## Getting started

For the step-by-step walkthrough (cloning the repository, running the network emulator and an AI scenario, and extending the testbed with new scenarios or providers), see the [Tutorials](./tutorials) page.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): TS 23.501 Table 5.7.4-1 (clause reference for the standardised 5QI to QoS-characteristics mapping). Verify against the 3GPP work plan before publication.
:::

## Related

- [Tutorials](./tutorials): the introductory walkthrough of the emulator and AI testbed
- [Resources](./resources): the source repositories
- Project [index](.): overview and slide deck
- [AI/ML Evaluation Framework](../ai-ml): the related project that shares this testbed
- [6G on the Standards portal](/tech/standards/6g): the standards context

:::note
Refer to the [6G-Testbed](https://github.com/5G-MAG/6G-Testbed) repository to contribute to this project.
:::
