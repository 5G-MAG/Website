---
hide_title: true
title: 5G Media Streaming (5GMS)
sidebar_position: 2
description: Introduces the 3GPP 5G Media Streaming (5GMS) framework, its architecture, M1-M8 reference points, key specifications, and reference tools.
---

<header class="topic-hero">
<div class="topic-hero__icon">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8"/></svg>
</div>
<div>
<h1 class="topic-hero__title">5G Media Streaming (5GMS)</h1>
</div>
</header>

<div class="topic-lead">
The 3GPP framework for downlink and uplink video, audio and metadata delivery over 5G networks.
</div>

5G Media Streaming (5GMS) is a 3GPP-defined framework for delivering video, audio, and metadata over 5G networks, supporting both downlink (unicast to device) and uplink (device to network) flows. It introduces standardised interfaces between the content provider, the 5G network, and the client device. These interfaces cover session management, dynamic policies, and media consumption metrics. 5G-MAG implements the Application Function (AF), the control-plane entity that manages sessions and talks to the 5G core, and the Application Server (AS), the entity that hosts and delivers the media, enabling end-to-end validation of 5GMS-compliant pipelines. For the architecture and how these roles fit together, see the [5GMS Overview](./5gms/overview-5gms). For acronyms used here, see the [Glossary](/tech/glossary).

**Key specifications:** 3GPP [TS 26.501](https://www.3gpp.org/dynareport/26501.htm) (5GMS general description and architecture), [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) (5GMS protocols and APIs), [TS 26.510](https://www.3gpp.org/dynareport/26510.htm) (generalised media delivery provisioning and media session handling, from Release 18), [TS 26.511](https://www.3gpp.org/dynareport/26511.htm) (5GMS profiles, codecs and formats). Related UE data collection and reporting is specified in [TS 26.531](https://www.3gpp.org/dynareport/26531.htm) (architecture) and [TS 26.532](https://www.3gpp.org/dynareport/26532.htm) (protocols and formats). For the full list and links, see the [Standards page](/tech/standards/5gms).

**Reference tools:** The 5G-MAG software implementation is on the developer portal under [5G Media Streaming](/reference-tools/5gms).

## Go deeper

<div class="godeeper-grid">

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The 5GMS architecture, functional entities and reference points, plus the Release-19 extensions.</p>
<ul class="godeeper-card__links">
<li><a href="./5gms/overview-5gms">5GMS Overview</a></li>
<li><a href="./5gms/features-5gmsd">5GMSd Features</a></li>
<li><a href="./5gms/overview-amd">Advanced Media Delivery</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /></svg>
<h3>Standards Tracking</h3>
</div>
<div class="godeeper-card__body">
<p>The 5GMS specifications 5G-MAG tracks and contributes to, including the BSF/PCF core-network functions the AF consumes.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/standards/5gms">Standards: 5G Media Streaming</a></li>
</ul>
</div>
</div>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The Application Function (AF) and Application Server (AS) reference implementation.</p>
<ul class="godeeper-card__links">
<li><a href="/reference-tools/5gms">5G Media Streaming</a></li>
</ul>
</div>
</div>

</div>

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/6)

The slide deck below introduces the 5G-MAG 5G Media Streaming reference tools and how they map to the architecture.

<div class="pdf-embed-wrapper">
  <iframe loading="lazy" class="pdf-embed" src="pathname:///docs/Reference_Tools_5G_Media_Streaming.pdf" title="5G Media Streaming reference tools overview slide deck"></iframe>
</div>

[Download the Slidedeck](/docs/Reference_Tools_5G_Media_Streaming.pdf)

## How the pieces fit

5GMS separates control from media: the Application Function (AF) manages sessions and policy, while the Application Server (AS) actually delivers the content. The reference points below (M1-M8) are the named interfaces that connect these pieces together — most are 3GPP-standardised APIs, a few are intentionally left open for implementers.

| Reference point | Connects                                           | Standardised?          | Purpose                                                                                                 |
| --------------- | -------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| M1              | Application Provider &rarr; AF                     | Yes                    | Provisioning: the Application Provider configures the AF with content, policies and reporting settings. |
| M2              | Application Provider &rarr; AS                     | Yes                    | Content ingest: media is uploaded to the AS for delivery.                                               |
| M3              | AF &harr; AS                                       | No (internal)          | Internal AF-to-AS configuration; left to the implementer since it never crosses an operator boundary.   |
| M4              | AS &rarr; Media Player                             | Yes                    | Media delivery to the device, typically DASH or HLS over HTTP.                                          |
| M5              | Media Session Handler &harr; AF                    | Yes                    | Media session handling and reporting: consumption, metrics, network assistance, dynamic policies.       |
| M6 / M7         | Media Session Handler &harr; Media Player/Streamer | Yes (UE-internal)      | On-device APIs connecting the control and media components of the 5GMS Client.                          |
| M8              | Application Provider &harr; 5GMS-Aware Application | No (out of 3GPP scope) | Service-level information (for example the stream list), left to the application.                       |

The AF also bridges to the 5G Core (PCF, NEF, BSF) to obtain policy, QoS and binding information — see [5G Core service consumers](/tech/standards/5gms#5g-core-service-consumers-used-by-the-af) on the standards page for that interaction.

The downlink direction (5GMSd) uses a "d" suffix (M1d to M8d) and the uplink direction (5GMSu) a "u" suffix (M1u to M8u). The 5G-MAG reference tools implement the downlink direction. The [5GMS Overview](./5gms/overview-5gms) works through the entities and reference points in detail, the [5GMSd Features](./5gms/features-5gmsd) page maps each downlink feature to its reference points and APIs, and [Advanced Media Delivery](./5gms/overview-amd) covers the Release-19 extensions.

Two points on the specification structure are worth noting for implementers. First, from Release 18 the media session handling APIs were moved from TS 26.512 into TS 26.510 and generalised so that the 5GMS System and the Real-Time media Communication (RTC) System share the same Media Session Handler and AF provisioning. The current reference tools are based on the Release 17 layout, where those APIs still live in TS 26.512 and TS 26.510 does not exist. Second, 5GMS consumption and QoE metrics reporting can feed the generic UE data collection framework specified in TS 26.531 (architecture) and TS 26.532 (protocols and formats), which is where event exposure to consuming functions such as the Network Data Analytics Function (NWDAF) or an Event Consumer AF is defined.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the Release 18 move of the media session handling APIs from TS 26.512 into TS 26.510, and the Release 17 layout of the reference-tool baseline. Verify against the 3GPP work plan before publication.
:::

---

## Information related to Standards

- [Standards: 5G Media Streaming](/tech/standards/5gms): the primary standards view for this section, listing the 5GMS specifications 5G-MAG tracks and contributes to, including the BSF and PCF core-network functions the AF consumes.
- [Standards: UE Data Collection, Reporting and Event Exposure](/tech/standards/data-collection): how devices report consumption and quality data used by 5GMS reporting.
- [Standards: DVB-I Services over 5G Systems](/tech/standards/dvb-i): DVB-I service discovery and delivery over 5G, which reuses parts of 5GMS.
- [Standards: Real-Time Communications](/tech/standards/rtc): low-latency, interactive media delivery related to the uplink direction of 5GMS.

---

## Technical Documentation

The following resources are available. If you are new to 5GMS, read them in order: start with the Overview to understand the architecture, then the downlink Features, then Advanced Media Delivery for the Release-19 extensions.

### General information about 5G Media Streaming

- [**Overview on 5G Media Streaming**](./5gms/overview-5gms): the 5GMS architecture, functional entities and reference points.
- [**Key Features for 5G Media Streaming - Downlink**](./5gms/features-5gmsd): the downlink (5GMSd) features and the APIs that implement them.

#### VideoTech

- [**Introduction to 5G Media Streaming (3GPP Release 16)**](./videos#introduction-to-5g-media-streaming-3gpp-release-16)
- [**Dynamic Policies for 5G Media Streaming (3GPP Release 16)**](./videos#dynamic-policies-for-5g-media-streaming-3gpp-release-16)
- [**5G Media Streaming over eMBMS (3GPP Release 17)**](./videos#5g-media-streaming-over-embms-3gpp-release-17)
- [**Edge Media Processing in 5G Media Streaming (3GPP Release 17)**](./videos#edge-media-processing-in-5g-media-streaming-3gpp-release-17)

### Advanced Media Delivery

- [**Overview on Advanced Media Delivery**](./5gms/overview-amd)

#### VideoTech

- [**An Introduction**](./videos#advanced-media-delivery---an-introduction)
- [**Reminder on 5G Media Streaming**](./videos#advanced-media-delivery---reminder-on-5g-media-streaming)
- [**Common Client Metadata**](./videos#advanced-media-delivery---common-client-metadata)
- [**Multi-CDN Media Delivery**](./videos#advanced-media-delivery---multi-cdn-media-delivery)
- [**Multi-Access Media Delivery**](./videos#advanced-media-delivery---multi-access-media-delivery)
- [**Distributing encrypted and high-value content**](./videos#advanced-media-delivery---distributing-encrypted-and-high-value-content)
- [**Improved QoS support for Media Streaming services**](./videos#advanced-media-delivery---improved-qos-support-for-media-streaming-services)
- [**Media Streaming aspects of Network Slicing**](./videos#advanced-media-delivery---media-streaming-aspects-of-network-slicing)
- [**In-Session Unicast Repair for MBS/MBMS Obj. Distribution**](./videos#advanced-media-delivery---in-session-unicast-repair-for-mbsmbms-obj-distribution)
- [**Time Synchronization**](./videos#advanced-media-delivery---time-synchronization)
- [**Initial overview on Release 20**](./videos#advanced-media-delivery---initial-overview-on-release-20)

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::
