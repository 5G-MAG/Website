---
title: Scope
hide_title: true
sidebar_position: 0
description: Defines what the 5G MBS reference tools implement in the MBS User Services and 5GC layers, mapped against 3GPP specifications.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01" />
  <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
  <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
  <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
  <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Multicast Broadcast Services (MBS)</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/reference-tools/5g-mbs/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/reference-tools/5g-mbs/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/reference-tools/5g-mbs/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="/reference-tools/5g-mbs/tutorials#developer-exchange" style="margin: 2px 4px 2px 0">Developer Exchange</a></div>

These reference tools implement parts of the 3GPP 5G Multicast Broadcast Services (MBS) feature. They are aimed at developers and integrators who want to run and inspect MBS delivery over a 5G Core, using multicast and broadcast to send the same media to many devices at once. To try the tools hands-on, see the [Tutorials](./tutorials).

:::note[Key terms]

- **5GC**: 5G Core network. **NG-RAN**: the 5G radio access network. **UE**: User Equipment (the device).
- **MBSF / MBSTF**: MBS Function (control) and MBS Transport Function (media data plane), the two MBS User Services network functions.
- **MB-SMF / MB-UPF**: the multicast/broadcast versions of the Session Management Function and User Plane Function in the 5G Core.
- **AF / AS**: the Application Function and Application Server on the MBS Application Provider side.
- **TMGI**: Temporary Mobile Group Identifier, the identifier for an MBS session. **SSM**: Source-Specific Multicast address.
- **FLUTE / ALC**: File Delivery over Unidirectional Transport, carried in Asynchronous Layered Coding packets, used to send files one-way.
- **PFCP**: Packet Forwarding Control Protocol (control between MB-SMF and MB-UPF). **GTP-U**: the user-plane tunnelling protocol between core and RAN.
- **PTM**: Point-to-Multipoint delivery. **NTN**: Non-Terrestrial Network (satellite) access.
  :::

In the context of 3GPP standards, the Multicast Broadcast Services System, **MBS System**, is designed to support multicast and broadcast services in 5G networks. It introduces a flexible architecture that supports both Multicast (for specific groups with high reliability) and Broadcast (for wide-area distribution to all users), allowing the network to dynamically switch between point-to-point and point-to-multipoint delivery. While the MBS System handles the heavy lifting of moving data through the 5G core and radio, **MBS User Services** defines how that content is actually packaged, discovered, and consumed by the end-user's application.

Technical documentation providing context to this project can be found in the link below.

[Tech: Multicast and Broadcast Services in 5G Networks](/tech/5g-mbs)

Relevant specifications are listed below.

[Standards: 5G Multicast Broadcast Services](/tech/standards/5g-mbs)

[Standards: Multimedia Delivery Protocols](/tech/standards/multimedia)

## What is being implemented?

:::tip[In short]
Some of the functional entities of the MBS System and MBS User Services, including support in the application provider side, the 5GC, NG-RAN and UE.
:::

### MBS User Services

#### Features under implementation

The Reference Tools for **MBS User Services** add the following functionality:

- MBSTF Distribution Session management (e.g. by an MBSF) via reference point Nmb2.
- Ingest of objects by the MBSTF from the MBS Application Provider (AF/AS) via reference point Nmb8, using either a pull- or push-based object acquisition method.
- Delivery of ingested objects in a FLUTE Session, sent as multicast ALC packets from an MBSTF to an MB-UPF via a reference point Nmb9 unicast tunnel.

The following features are supported:

- `MB-SMF TMGI Service API` (Following 3GPP [TS 29.532](https://www.3gpp.org/dynareport/29532.htm) V17.4.0)
  - TMGI Allocate Service operation
  - TMGI Deallocate Service operation
- `MB-SMF MBS Session Service API` (Following 3GPP TS 29.532 - Release 17.4.0)
  - MBS Session Create Service operation
  - MBS Session Release Service operation
- `MB-SMF PFCP Session Establishment extensions` (Following 3GPP [TS 29.244](https://www.3gpp.org/dynareport/29244.htm) - Release 17.9.0)
  - PFCP Session Establishment Request extensions
- `MB-UPF PFCP Session Establishment extensions` (Following 3GPP TS 29.244 - Release 17.9.0)
  - PFCP Session Establishment Response extensions
- `Multicast/Broadcast Service Transport Services (MBSTF)` (Following 3GPP [TS 29.581](https://www.3gpp.org/dynareport/29581.htm) V18.5.0)
  - Object distribution method
    - **Single shot operating mode**: Individual objects are sent once in a FLUTE Session by the MBSTF
      - Pull-based object acquisition (MBSTF pulls objects from a media server)
      - Push-based object acquisition (objects are pushed into the MBSTF)
    - **Streaming operating mode**: Objects are scheduled and sent in real time according to a presentation manifest, such as a DASH MPD.
      - Pull-based object acquisition (MBSTF pulls a Service Entry Point object, such as a presentation manifest, and then schedules the pulling of further objects, such as media segments and updates of the presentation manifest)
      - Push-based object acquisition (MBSTF waits for a Service Entry Point object, such as a presentation manifest, to be pushed to it, and then schedules the pulling of media segment objects)
      - For this operating mode, the supported Service Entry Point formats are:
        - MPEG-DASH MPD (live profile only).

The following features are not yet supported:

- `AMF MBS Broadcast Service API` (Following 3GPP [TS 29.518](https://www.3gpp.org/dynareport/29518.htm) V17.11.0)
  - MBS Broadcast ContextCreate Service operation
  - MBS Broadcast ContextRelease Service operation
- `AMF NGAP extensions` (Following 3GPP [TS 38.413](https://www.3gpp.org/dynareport/38413.htm) - Release 17.6.0)
  - BROADCAST SESSION SETUP REQUEST
- `gNB NGAP extensions` (Following 3GPP TS 38.413 - Release 17.6.0)
  - BROADCAST SESSION SETUP RESPONSE
- `NRF NFDiscovery Service API extensions` (Following 3GPP [TS 29.510](https://www.3gpp.org/dynareport/29510.htm) - Release 17.11.0)
  - MB-SMF TMGI Service API extensions
  - MB-SMF MBS Session Service API extensions
  - AMF MBS Broadcast Service API extensions
- `MBSTF Distribution Session management` (Following 3GPP TS 29.581 V18.5.0)
  - **Packet distribution method**
    - Use direct multicast packet ingest by the MB-UPF at reference point N6mb instead for now.
  - **Object distribution method**
    - **Collection operating mode**: One or more objects described by a simple manifest are sent once in the FLUTE Session.
    - **Carousel operating mode**: One or more objects described by a simple manifest are repeatedly sent in the FLUTE Session according to a schedule.
    - **Streaming operating mode**: Objects are sent in a FLUTE Session in real time according to a schedule specified in a streaming presentation manifest.
      - Presentation manifest types other than MPEG-DASH MPD (live profile).
  - Status notification subscription

### MBS System

#### MBS development over Open5GS

The Reference Tools for MBS currently target:

- MBS Session provisioning in the MB-SMF (e.g. by an MBSF) via reference point Nmb1.
- Direct multicast data ingest by the MB-UPF from an AF/AS via reference point N6mb.
- Shared delivery of multicast packets from the MB-UPF via individual GTP-U tunnels to one or more gNodeBs in the 5G Core.
- Point-to-Multipoint (PTM) delivery of multicast packets from a gNodeB to UEs via the RAN.

## How the reference tools map to the standard

It helps to read the feature list above against the three-layer MBS architecture (covered in full on the [Tech portal](/tech/5g-mbs)):

- On the **user-service layer**, the reference tools provide the MBSTF: it ingests objects from the MBS Application Provider at reference point Nmb8 (pull or push) and delivers them as FLUTE/ALC packets towards the MB-UPF at reference point Nmb9. An MBSF-role client drives MBSTF distribution sessions over reference point Nmb2.
- On the **5G Core layer**, the tools provision MBS sessions and manage TMGIs on the MB-SMF over reference point Nmb1 (using the MB-SMF service consumer library), and the MB-SMF/MB-UPF pair is realised over Open5GS with the PFCP extensions listed above. Direct multicast ingest into the MB-UPF at reference point N6mb is available as an alternative to the MBSTF path.
- On the **NG-RAN layer**, the tools target shared delivery from the MB-UPF to one or more gNodeBs and point-to-multipoint (PTM) delivery from a gNodeB to UEs.

The feature list above marks which service operations and distribution modes are implemented today and which are not yet, so use it to check whether a given path (for example the packet distribution method, or broadcast session setup via the AMF) is covered before building on it.

## Getting started

To try the tools hands-on, follow the [Tutorials](./tutorials): they cover the two ways to provision the 5GC (direct MBS core functions, or via the [5GC Service Consumers](../5g-core) libraries), the [Docker-Compose deployment](./tutorials/docker-implementation), and the individual MBSF/MBSTF walkthroughs. For the source code, packages and releases behind each component, see [Resources](./resources); for the specification background, see [Standards: 5G Multicast Broadcast Services](/tech/standards/5g-mbs).

## NTN deployment context

The 5G MBS reference tools are also the relevant software for **Non-Terrestrial Network (NTN)** deployment scenarios. NTN extends 5G MBS coverage via GEO and LEO satellites and introduces specific challenges around propagation delay, Doppler effects, and satellite beam handover. The MBS Multicast and Broadcast delivery modes operate over NTN access without changes to the MBS service layer itself. Technical analysis of these scenarios is available on the Tech portal:

- [Tech: MBS Multicast over NTN](/tech/ntn/analysis-mbs-multicast-over-ntn)
- [Tech: MBS Broadcast over NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn)
- [Tech: Non-Terrestrial Networks (overview)](/tech/ntn)
