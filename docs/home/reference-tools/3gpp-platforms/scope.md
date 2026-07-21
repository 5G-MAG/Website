---
title: Scope
hide_title: true
sidebar_position: 0
description: Explains which RAN and Core components 5G-MAG builds, and how the srsRAN and Open5GS forks split into MBS and 5G Broadcast branches.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M20 21l2 -2l-2 -2" />
  <path d="M17 17l-2 2l2 2" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">3GPP RAN and Core Platforms</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/reference-tools/3gpp-platforms/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/reference-tools/3gpp-platforms/repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="/reference-tools/3gpp-platforms/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a></div>

## Overview

This project provides the 5G network infrastructure that other 5G-MAG reference tools run against. 5G-MAG maintains forks of established open-source Radio Access Network (RAN) and Core software, adds the components needed for its media and broadcast work, and documents how to stand up a working network in a lab or testbed.

In 5G terminology the RAN can be split into a Central Unit (CU) and a Distributed Unit (DU); the network core is the 5G Core (5GC); and Software Defined Radio (SDR) hardware is used to transmit and receive the radio signal. The forks below add support for the different delivery technologies 5G-MAG works on.

A note on the delivery technologies referenced here:

- **MBS (Multicast-Broadcast Services)**, also written 5MBS, is the 3GPP feature for delivering the same content to many devices over the 5G Core and NR radio.
- **5G Broadcast** (LTE-based) delivers free-to-air TV and radio over LTE/eMBMS radio, without a 5G core or return channel. It reuses **Further evolved Multimedia Broadcast Multicast Service (FeMBMS)**.

These are distinct technologies; the branch names in the [GitHub Repos](./repositories) page follow this split.

## Upstream software we build on

Some Reference Tools Projects make use of software developed by other Open-Source Software initiatives.

In particular:

- [**srsRAN Project**](https://www.srsran.com/), in its two variants:
  - `srsran/srsRAN_Project`: Open source O-RAN 5G CU/DU solution from Software Radio Systems (SRS), used primarily as the NG-RAN to build Reference Tools demonstrators and PoCs and as the basis for the development of NG-RAN related components for MBS
  - `srsran/srsRAN_4G`: Open source SDR 4G software suite from Software Radio Systems (SRS), used primarily as the basis for the LTE-based 5G Broadcast components, emergency alerts over 5G Broadcast and the development of UE functionalities for MBS

- [**Open5GS Project**](https://www.open5gs.org), used primarily as the 5GC to build Reference Tools demonstrators and PoCs and as the basis for the development of 5GC related components for MBS

## What this project provides

This project does not deliver media itself; it provides a working radio access network and core so that MBS and 5G Broadcast components have something to attach to in a lab or testbed. The pieces map to 5G terminology as follows:

- **NG-RAN (gNB), split into CU and DU:** built from `rt-srsRAN_Project`, 5G-MAG's fork of the srsRAN Project (an O-RAN-native 5G CU/DU with a full L1/L2/L3 implementation from Software Radio Systems). This is the NR side used for MBS demonstrators and for developing NG-RAN components for MBS.
- **5G Core (5GC):** built from 5G-MAG's fork of Open5GS. For MBS this includes the multicast/broadcast core functions; published 5G-MAG material describes using Open5GS for functions including the AMF, MB-SMF and MB-UPF.
- **LTE-based radio and UE, for 5G Broadcast:** built from `srsRAN_4G` (the SDR 4G suite from SRS). This is the basis for the LTE-based 5G Terrestrial Broadcast transmitter and for developing UE-side functionality.
- **SDR hardware:** Software Defined Radio front-ends transmit and receive the radio signal that the software above generates and processes.

## The two delivery technologies, and why the forks split

The forks are organised around two distinct delivery technologies, and the branch names on the [GitHub Repos](./repositories) page follow that split.

|                    | MBS (5MBS)                                   | 5G Broadcast (LTE-based)                              |
| ------------------ | -------------------------------------------- | ----------------------------------------------------- |
| Radio              | 5G NR                                        | LTE / eMBMS (reuses FeMBMS)                           |
| Core               | 5G Core (multicast/broadcast functions)      | None; free-to-air, no return channel                  |
| RAN software basis | `rt-srsRAN_Project` (NR CU/DU)               | `srsRAN_4G` (eNodeB with MBMS)                        |
| Typical use        | Same content to many devices over 5GC and NR | Free-to-air TV and radio over broadcast, receive-only |

Further evolved Multimedia Broadcast Multicast Service (FeMBMS) is the LTE broadcast feature reused by 5G Broadcast. Published 5G-MAG material notes that the LTE-based 5G Broadcast transmitter builds on the MBMS implementation in the `srsRAN_4G` eNodeB, extended towards the 3GPP Release 17 LTE-based 5G Terrestrial Broadcast feature set (for example channel estimation and reference signals for the 1.25 kHz and 7.5 kHz subcarrier spacings used by dedicated broadcast). The dedicated 5G Broadcast transmitter and modem live in separate repositories (for example `rt-mbms-tx` and `rt-mbms-modem`), which depend on this project for the underlying radio software.

## How this relates to the media reference tools

The MBS and 5G Broadcast media stacks depend on a working network to run against. This project supplies that network so the media components do not each have to stand up a RAN and core. Because the RAN and core are forks of upstream open-source projects (srsRAN, Open5GS), 5G-MAG tracks the upstream projects and maintains the additions needed for its broadcast and multicast work on dedicated branches rather than in the mainline.

## Getting started

1. Decide which technology you are building for: MBS (5G NR plus 5GC) or LTE-based 5G Broadcast. This determines which fork and branch you need.
2. For MBS, build the NG-RAN from [5G-MAG/rt-srsRAN_Project](https://github.com/5G-MAG/rt-srsRAN_Project) and the core from [5G-MAG/open5gs](https://github.com/5G-MAG/open5gs), selecting the MBS-related branches.
3. For 5G Broadcast, use the LTE-based transmitter path built on `srsRAN_4G`; see the dedicated transmitter and modem repositories via the [GitHub Repos](./repositories) page.
4. Follow the [Tutorials](./tutorials) for the network and SDR setup guides, including SDR front-end configuration.

The [GitHub Repos](./repositories) page maps each fork and branch to its use case, which is the fastest way to find the exact branch for your scenario.

## Related

- [GitHub Repos](./repositories): the forks and their branch structure, mapped to use cases
- [Tutorials](./tutorials): setup guides for the network and SDR platforms
- Project [index](.): overview and slide deck

:::note
Refer to the [rt-srsRAN_Project](https://github.com/5G-MAG/rt-srsRAN_Project) and [open5gs](https://github.com/5G-MAG/open5gs) repositories to contribute to this project.
:::
