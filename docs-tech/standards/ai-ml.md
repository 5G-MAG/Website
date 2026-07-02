---
hide_title: true
title: AI & ML in 5G Media
sidebar_position: 6
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/></svg>
</div>
<div class="topic-banner__text">
<h1>AI & ML in 5G Media</h1>
</div>
</div>

<div class="topic-lead">
Applying AI and machine learning to media delivery, network optimisation and quality of experience.
</div>

## Overview

5G-MAG investigates the application of Artificial Intelligence (AI) and Machine Learning (ML) to media delivery, network optimisation and quality of experience within 5G systems. This covers two complementary tracks in 3GPP, one working group focused on system architecture (SA2) and one on media (SA4):

* **Network-side analytics**, where the Network Data Analytics Function (NWDAF, defined by the 3GPP working group SA2) collects data from network functions and produces analytics and predictions that other functions can consume (for example to anticipate load or Quality of Service (QoS) changes affecting a media session).
* **UE-side data collection**, where the Data Collection and Reporting framework from SA4 (the media codec and delivery working group) standardises how data is gathered from User Equipment (UE) and media clients and exposed for analytics, training and inference.

Together these allow media-aware decisions (such as proactive session management or content-aware delivery) to be driven by measured data rather than static configuration.

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>Network-side analytics (NWDAF) versus UE-side data collection, and the SA4 AI/ML media study, below.</p>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>An evaluation framework for characterising AI and media traffic under controlled network conditions.</p>
<ul class="godeeper-card__links">
<li><a href="/developer/ai-ml">AI/ML Evaluation Framework</a></li>
</ul>
</div>
</div>

</div>

The two tracks differ in where the data comes from and what they produce, as summarised below.

| Track | Data source | 3GPP framework | Example output |
| -- | -- | -- | -- |
| Network-side analytics | Network functions in the 5G core | NWDAF (SA2) | Load and Quality of Service (QoS) predictions for a media session |
| UE-side data collection | User Equipment (UE) and media clients | Data Collection and Reporting (SA4) | Consumption, quality-of-experience (QoE) metrics and reports for analytics, model training and inference |

## Key 3GPP Specifications

### Network Data Analytics (SA2)
* [TS 23.288](https://www.3gpp.org/dynareport/23288.htm): Architecture enhancements for 5GS to support Network Data Analytics Services (NWDAF)
* [TS 23.501](https://www.3gpp.org/dynareport/23501.htm): System Architecture for the 5G System (NWDAF integration)

### UE Data Collection for AI/ML (SA4)

The SA4 Data Collection and Reporting framework provides a common way to collect data from UEs and media clients (events, metrics and reports) and make it available to consumers such as analytics functions. It underpins data-driven AI/ML for media by supplying the inputs used for monitoring, model training and inference.

* [TS 26.531](https://www.3gpp.org/dynareport/26531.htm): Data Collection and Reporting; General Description and Architecture
* [TS 26.532](https://www.3gpp.org/dynareport/26532.htm): Data Collection and Reporting; Protocols and Formats

### Study Items and Work Items

* [TR 26.927](https://www.3gpp.org/dynareport/26927.htm): Study on artificial intelligence and machine learning in 5G media services. This SA4 study examines media-specific AI/ML use cases (for example split inference between UE and network, model delivery to media clients, and AI-assisted media processing) and the data, traffic and architectural implications for 5G media services.
* [TR 22.874](https://www.3gpp.org/dynareport/22874.htm): Study on traffic characteristics and performance requirements for AI/ML model transfer in 5GS
* [TR 22.817](https://www.3gpp.org/dynareport/22817.htm): Study on scenarios and requirements for AI/ML model transfer in 5GS

:::caution[Verify spec titles]
The title shown for TR 22.817 closely mirrors TR 22.874 above and has not been confirmed against the 3GPP portal. Confirm against the 3GPP work plan before relying on it.
:::

## SA2 network-side analytics vs SA4 UE-side work

The two tracks are easy to conflate because both are "AI/ML for the network". They are distinct in ownership, location and purpose, and keeping them separate is the single most useful mental model for this topic.

**Network-side analytics (SA2, NWDAF).** The Network Data Analytics Function is a 5G core network function. It subscribes to events published by other network functions (and, indirectly, UE-related data), analyses them, and exposes statistics and predictions to consumers that can then adjust how the 5G system behaves. In [TS 23.288](https://www.3gpp.org/dynareport/23288.htm) the NWDAF is decomposed into an Analytics logical function (AnLF), which produces the analytics output, and a Model Training logical function (MTLF), which trains and provides the ML models the AnLF uses. NWDAF is defined and integrated in the core architecture ([TS 23.501](https://www.3gpp.org/dynareport/23501.htm)). For media, the value is proactive knowledge: for example a predicted QoS change or load condition that lets a media function adapt a session before quality degrades.

**UE-side data collection (SA4, Data Collection and Reporting).** SA4 owns media and its clients, not the core. Its Data Collection and Reporting framework standardises how data (events, metrics, consumption and QoE reports) is gathered from UEs, media clients and application servers and exposed to consumers such as analytics functions or application providers. It defines a Data Collection Application Function (Data Collection AF) and the interfaces around it. It is a general-purpose data pipeline, not an analytics engine: it supplies the inputs that analytics, model training and inference rely on.

The practical relationship: SA4's framework can be a source of the UE-side and application-side data, and SA2's NWDAF is one possible consumer and producer of analytics over data of this kind. Media-aware decisions can therefore be driven end to end by measured data (collected via the SA4 framework, analysed via NWDAF or application-level analytics) rather than by static configuration. The two are complementary layers, not competing designs.

| Aspect | NWDAF (SA2) | Data Collection and Reporting (SA4) |
| -- | -- | -- |
| Owning group | SA2 (system architecture) | SA4 (media codecs and delivery) |
| Where it lives | 5G core network function | Application/media layer (Data Collection AF), collecting from UE and media clients |
| Primary role | Produce analytics and predictions | Collect and expose data (events, metrics, reports) |
| Internal structure | AnLF (analytics) + MTLF (model training) | Data Collection AF plus reporting interfaces |
| Core specifications | TS 23.288, TS 23.501 | TS 26.531, TS 26.532 |
| Typical media output | Predicted load/QoS for a session | Consumption and QoE reports used for analytics, training and inference |

## The SA4 AI/ML media study (TR 26.927)

TR 26.927 is the SA4 study that looks specifically at AI/ML in 5G media services, as opposed to the generic network-side analytics of SA2. It examines media AI/ML use cases and the data, traffic and architectural implications of running them over 5G. Reported topics include split inference between the UE and the network, delivery of AI/ML models to media clients, and AI-assisted media processing. The study also covers data formats and protocols for the different AI/ML data components, the traffic characteristics of those components over 5G, associated KPIs, and candidate areas for later normative work. It introduces media-oriented logical functions (for example an AI inference engine, AI data access/delivery, and a federated-learning engine at the UE and at the media server) whose findings are intended to guide subsequent normative work.

This is the study most directly relevant to 5G-MAG, because it treats AI/ML as a media workload with concrete traffic behaviour, which is exactly what the 6G Testbed measures. The generic model-transfer requirements study TR 22.874 (SA1) sits behind it, characterising end-to-end latency, experienced data rate and communication service availability for moving models across 5GS.

## Use Cases Relevant to 5G-MAG

* Adaptive bitrate (ABR) optimisation using network-side QoS data
* QoE prediction and proactive session management
* AI-based content-aware encoding and delivery
* Network data analytics for media streaming session monitoring
* UE data collection for training and inference in media applications

## 5G-MAG tracking and contribution focus

5G-MAG tracks both tracks but contributes primarily on the media side (SA4), while following the SA2 analytics work for the parts that affect media sessions. The aim is to make media a concrete input to AI/ML standardisation: contributing media AI/ML use cases and, through the 6G Testbed, producing measured traffic characteristics and labelled datasets for AI workloads (generative and agentic AI as well as classic media) under controlled network conditions. Those measurements are intended to ground requirement inputs in evidence. See the [6G Testbed](https://developer.5g-mag.com/6g-testbed-ai-traffic/scope) and the [AI/ML Evaluation Framework](https://developer.5g-mag.com/ai-ml/scope) on the developer portal.

## Reference Tools

AI and media traffic characterisation tooling is developed in the 6G Testbed reference implementation. See [6G Testbed on the developer portal](https://developer.5g-mag.com/6g-testbed-ai-traffic/scope).

## Related Standards Work

* [Standards: UE Data Collection & Exposure](/tech/standards/data-collection)
* [Standards: 5G Media Streaming](/tech/standards/5gms)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository for 5G-MAG contributions related to AI/ML.
:::
