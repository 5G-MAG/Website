---
hide_title: true
title: AI/ML in 5G Media
sidebar_position: 12
description: How 3GPP's two AI/ML tracks fit together for media — NWDAF network-side analytics (SA2) and UE-side data collection and reporting (SA4).
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Tech</span>
<h1>AI/ML in 5G Media</h1>
</div>
</div>

<div class="topic-lead">
How network-side analytics (NWDAF) and UE-side data collection fit together to make media delivery AI/ML-aware.
</div>

3GPP standardises AI/ML for 5G media along two complementary tracks, owned by different working groups. **SA2** (system architecture) defines the Network Data Analytics Function (NWDAF), which collects data from network functions in the 5G core and produces analytics and predictions that other functions can consume. **SA4** (media codecs and delivery) defines the Data Collection and Reporting framework, which standardises how data is gathered from User Equipment (UE) and media clients. The two tracks differ in where their data comes from and what they produce, but a media-aware AI/ML use case (for example, predicting a QoS drop before it affects a live stream) typically needs both: UE-side observations flowing in through SA4's framework, and network-side signals and inference flowing in through SA2's. For acronyms used here, see the [Glossary](/tech/glossary).

**Key specifications:** 3GPP [TS 23.288](https://www.3gpp.org/dynareport/23288.htm) (NWDAF architecture, SA2), [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) and [TS 26.532](https://www.3gpp.org/dynareport/26532.htm) (Data Collection and Reporting, SA4), [TR 26.847](https://www.3gpp.org/dynareport/26847.htm) (Evaluation of AI and ML in 5G media services).

**Reference tools:** the [AI/ML Evaluation Framework](/testbeds/ai-ml) provides benchmarks and datasets for evaluating AI/ML models applied to media processing, aligned with the SA4 study work below.

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>NWDAF's internal structure, how it relates to SA4 data collection, and the SA4 AI/ML media study, below.</p>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>Normative 3GPP specs (TS 23.288, TS 26.531, TS 26.532) and 5G-MAG's contributions on AI/ML.</p>
<ul class="godeeper-card__links">
<li><a href="/standards/ai-ml">Standards: AI/ML in 5G Media</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15 10l4.553 -2.069a1 1 0 0 1 1.447 .894v6.35a1 1 0 0 1 -1.447 .894l-4.553 -2.069v-4"/><path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8z"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>Benchmarks and datasets for evaluating AI/ML models for media quality, ABR and traffic classification.</p>
<ul class="godeeper-card__links">
<li><a href="/testbeds/ai-ml">AI/ML Evaluation Framework</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/16)

## NWDAF: network-side analytics (SA2)

The Network Data Analytics Function (NWDAF) is the 5G core function through which network functions and other data sources expose measurements, and through which consumers request analytics or predictions derived from that data. TS 23.288 splits the NWDAF's internal role in two:

- **AnLF (Analytics Logical Function)**: produces the analytics or prediction output that a consumer (for example the PCF, for QoS policy, or an Application Function such as the 5GMS AF) subscribes to or requests.
- **MTLF (Model Training Logical Function)**: trains the ML models that an AnLF uses for inference, and can expose those models to other NWDAF instances.

Splitting training from inference lets a model be trained once (potentially on a different NWDAF instance, closer to where the training data volume is largest) and reused for inference wherever it is needed. For a media session, a typical consumer-facing output is a load or QoS prediction that a function such as the 5GMS AF can act on ahead of time, for example by adjusting a bitrate ceiling before congestion actually hits. See [Standards: 5G Media Streaming](/standards/5gms) for where the 5GMS AF sits in that path.

## SA4 data collection: the UE-side input

The SA4 Data Collection and Reporting framework (TS 26.531, TS 26.532) standardises how a UE or media client reports consumption and quality-of-experience (QoE) data, and how that data is exposed as events to a consuming function. It is a generic framework, reused inside 5G Media Streaming for QoE reporting and available standalone. The full architecture (the Data Collection Application Function, its R1-R6 reference points, and how it exposes events to consumers including the NWDAF) is covered in detail on [Tech: UE Data Collection](/tech/data-collection/data-collection-event-exposure); this page does not repeat that detail.

For AI/ML purposes, the relevant point is where the two tracks meet: the Data Collection Application Function can expose its processed events to the NWDAF as one of its consumers (reference points R5/R6), so UE-side observations gathered under the SA4 framework can feed into SA2's network-side analytics rather than the two tracks running in isolation.

## The SA4 AI/ML media studies: TR 26.927 and TR 26.847

SA4's study of applying AI/ML techniques directly to media processing and delivery, as distinct from the network-analytics use of AI/ML in NWDAF above, is captured in two companion technical reports, both published at version 19.0.0 in June 2025 (Release 19):

- [TR 26.927](https://www.3gpp.org/dynareport/26927.htm) (Study on Artificial Intelligence and Machine Learning in 5G media services) covers the functional side: media-based AI/ML use cases (object recognition in image and video, video quality enhancement in streaming, crowd-sourced media capture, natural language processing on speech) and the media service architecture for AI/ML, including split-inference configurations and model delivery.
- [TR 26.847](https://www.3gpp.org/dynareport/26847.htm) (Evaluation of Artificial Intelligence and Machine Learning in 5G media services) is the evaluation companion: testbed architectures and anchors for split inferencing and model-data transmission, evaluation metrics, and scenarios such as compressed AI/ML model transfer for automatic speech recognition and video quality enhancement in streaming. The [AI/ML Evaluation Framework](/testbeds/ai-ml) reference tooling is aligned with this report.

## Related AI/ML studies that feed 6G

[TR 22.874](https://www.3gpp.org/dynareport/22874.htm) (SA1, Study on traffic characteristics and performance requirements for AI/ML model transfer in 5GS) is a companion study, on the network-transport side of AI/ML rather than the media-processing side: it looks at how model-transfer traffic itself behaves on the 5G system. Both this study and TR 26.847 feed 5G-MAG's early input to 6G, where AI-native traffic management is one of the new IMT-2030 usage scenarios; see [Towards 6G Media](/tech/6g) for that wider context.

## Related

- [Tech: UE Data Collection, Reporting and Event Exposure](/tech/data-collection/data-collection-event-exposure): the DCAF architecture and reference points in full.
- [Towards 6G Media](/tech/6g): how these AI/ML studies feed 5G-MAG's 6G requirements input.
- [Standards: AI/ML in 5G Media](/standards/ai-ml): the standards-tracking view of this topic.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
