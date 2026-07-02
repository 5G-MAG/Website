---
title: Time-Sensitive Communications
sidebar_position: 11
---


## Time-Sensitive Communications - Tech Resources

## Overview

Time-Sensitive Communications (TSC) covers the 3GPP features that let a 5G network carry traffic with bounded, predictable latency and tight timing, rather than best-effort delivery. In media production this matters for live workflows, for example synchronising cameras, audio and control signals over a wireless link where jitter and timing drift are not acceptable. 5G-MAG tracks how these deterministic-delivery capabilities apply to professional media, in particular over the Non-Public Networks (see [Non-Public Networks](../npn)) that broadcasters use for on-site production.

No dedicated reference tool exists for TSC. This area is tracked through the standards work and pointers below.

[Execution Plan](https://github.com/orgs/5G-MAG/projects/44/views/12)

## The bridge model in detail

The integration point between 5G and wired IEEE 802.1 TSN is defined in the TSC clause of [TS 23.501](https://www.3gpp.org/dynareport/23501.htm). The 5G system is modelled as one or more virtual TSN bridges. Each bridge has ports realised by TSN Translators:

* **NW-TT (Network-side TSN Translator)** at the UPF. It terminates the wired TSN network, holds the bridge management information exposed to the TSN control plane, and translates between the TSN world and 5G QoS. A single NW-TT can host multiple ports.
* **DS-TT (Device-side TSN Translator)** at the UE. It terminates the TSN endpoint (for example a camera or an audio device) and applies hold-and-forward/gate behaviour for egress toward that endpoint.

A PDU Session between the UE and the UPF forms the internal path of the bridge. TSN streams are mapped onto 5G QoS Flows within that PDU Session, so a stream with a strict deadline is carried on a QoS Flow with a matching 5QI and, where needed, a Guaranteed Bit Rate. Because the whole 5G segment is abstracted as a bridge, the external TSN Centralized Network Configuration (CNC) can compute schedules across it using ordinary TSN tooling; the 5G system reports its bridge capabilities (including per-port propagation and processing delays) to the CNC.

## Time synchronisation architecture

Two clocks coexist:

* The **5G clock (5G GM)**, which the 5G system distributes internally to UEs and translators.
* The **TSN/working clock**, the (g)PTP time relevant to the application, carried across the bridge per IEEE 802.1AS.

In the Release 16 model the 5G system behaves as a time-aware relay: gPTP event messages entering at one translator are timestamped, carried across the 5G system, and corrected for the measured residence time before egress at the other translator, so the downstream clock stays accurate. Release 17 generalised this so the 5G system can take different roles in an IEEE 802.1AS time-aware domain and can operate as an IEEE 1588 boundary clock or transparent clock, and so that time-synchronisation service can be requested and controlled through the control plane rather than being purely a transparent forwarding behaviour. For media, the working clock is typically PTP as used by SMPTE ST 2059, which is the same IEEE 1588 base, so the 5G time-sync machinery maps onto the timing model the ST 2110 plant already uses.

## Control plane: TSCTSF, NEF and AF

Release 17 introduced the Time Sensitive Communication and Time Synchronization Function (TSCTSF). It is the network function through which deterministic QoS and time-synchronisation services are requested and coordinated:

* An **Application Function (AF)** in the operator's trust domain can interact with the TSCTSF directly.
* An **AF outside that trust domain** reaches the TSCTSF through the **Network Exposure Function (NEF)**.

Through this interface the AF can provide traffic characteristics (periodicity, burst size, direction, arrival time reference) that let the system optimise scheduling, request the associated QoS, and activate or deactivate time synchronisation for specified UEs/ports. The TSCTSF works with the PCF to install the corresponding policy and with the SMF/UPF to realise it. Toward the wired TSN network, the bridge-management and scheduling interworking follows IEEE 802.1Qcc (fully centralized model), with the NW-TT presenting the 5G bridge to the CNC.

## Scheduled traffic and gating

Deterministic egress toward a TSN endpoint uses gate behaviour aligned with IEEE 802.1Qbv (enhancements for scheduled traffic): the translator opens and closes transmission gates according to a schedule derived from the CNC configuration and the shared clock. Combined with the bounded latency of the 5G QoS Flow, this gives an end-to-end path where a frame leaves the wired network, crosses the 5G segment, and is delivered to the wireless endpoint within a known window.

## Deterministic QoS without a full TSN bridge

Not every media deployment wants to run a wired TSN control plane. A relevant Release 17 outcome is that deterministic QoS and time synchronisation can be requested via the TSCTSF/NEF without the 5G system having to be configured as part of a full IEEE 802.1 TSN bridge with a CNC. For a production that only needs bounded-latency, time-synchronised transport over its NPN (not integration into a plant-wide TSN schedule), this lighter path is often the practical one. Which approach is chosen depends on whether the wireless segment must participate in a network-wide TSN schedule or simply deliver deterministic transport to endpoints.

## Release timeline

* **Release 16**: 5G system as a TSN bridge; DS-TT/NW-TT; transparent forwarding of gPTP with residence-time correction; TSN-to-5G QoS mapping. TS 23.501 (architecture), [TS 23.502](https://www.3gpp.org/dynareport/23502.htm) (procedures).
* **Release 17**: TSCTSF; generalised time synchronisation (multiple IEEE 802.1AS / IEEE 1588 clock roles); exposure of deterministic QoS and time-sync control to AFs via NEF; deterministic QoS without a full TSN bridge.
* **Release 18 and later**: Further deterministic-networking, survivability and time-sync accuracy enhancements. Confirm scope and placement against the 3GPP work plan.

:::caution[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the TS 23.501 TSC clause number, the Release 17 TSCTSF placement, and the IEEE 802.1Qbv/802.1Qcc/802.1AS designations as cited. Verify against the 3GPP work plan and the IEEE 802.1 standards index before publication.
:::



---

## Information related to Standards

[Standards: Time-Sensitive Communications](/tech/standards/tsc)

## Related

* [Non-Public Networks](../npn): TSC media transport typically runs over an NPN

---
