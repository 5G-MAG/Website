---
title: Packages
hide_title: true
sidebar_position: 3
description: Lists the prebuilt GHCR container images for MBS, covering baseline Open5GS 5GC network functions, MBS-capable core NFs and the MBSTF.
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
<span class="topic-banner__kicker">5G Multicast Broadcast Services</span>
<h1>Packages</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

## Overview

This page lists the prebuilt container images (published to the GitHub Container Registry, GHCR) that this project provides or uses. Most developers do not pull these individually; the images are deployed together through the Docker Compose setups in the [rt-mbs-examples](https://github.com/5G-MAG/rt-mbs-examples) repository. Pull an image directly only if you are building a custom deployment.

## 5G Core Network Functions (3GPP [TS 23.501](https://www.3gpp.org/dynareport/23501.htm)) based on Open5GS

These are the standard 5G Core (5GC) Network Functions from Open5GS, without MBS-specific changes. They provide the baseline core network that the MBS functions build on.

These packages are compiled from the following repository: [https://github.com/5G-MAG/open5gs](https://github.com/5G-MAG/open5gs)

Components | Package
 --|--
 NRF | [https://github.com/5G-MAG/open5gs/pkgs/container/nrf](https://github.com/5G-MAG/open5gs/pkgs/container/nrf)
 UDM | [https://github.com/5G-MAG/open5gs/pkgs/container/udm](https://github.com/5G-MAG/open5gs/pkgs/container/udm)
 PCF | [https://github.com/5G-MAG/open5gs/pkgs/container/pcf](https://github.com/5G-MAG/open5gs/pkgs/container/pcf)
 WebUI | [https://github.com/5G-MAG/open5gs/pkgs/container/webui](https://github.com/5G-MAG/open5gs/pkgs/container/webui)
 BSF | [https://github.com/5G-MAG/open5gs/pkgs/container/bsf](https://github.com/5G-MAG/open5gs/pkgs/container/bsf)
 UDR | [https://github.com/5G-MAG/open5gs/pkgs/container/udr](https://github.com/5G-MAG/open5gs/pkgs/container/udr)
 NSSF | [https://github.com/5G-MAG/open5gs/pkgs/container/nssf](https://github.com/5G-MAG/open5gs/pkgs/container/nssf)
 AUSF | [https://github.com/5G-MAG/open5gs/pkgs/container/ausf](https://github.com/5G-MAG/open5gs/pkgs/container/ausf)
 SMF | [https://github.com/5G-MAG/open5gs/pkgs/container/smf](https://github.com/5G-MAG/open5gs/pkgs/container/smf)
 UPF | [https://github.com/5G-MAG/open5gs/pkgs/container/upf](https://github.com/5G-MAG/open5gs/pkgs/container/upf)
 AMF | [https://github.com/5G-MAG/open5gs/pkgs/container/amf](https://github.com/5G-MAG/open5gs/pkgs/container/amf)
 SCP | [https://github.com/5G-MAG/open5gs/pkgs/container/scp](https://github.com/5G-MAG/open5gs/pkgs/container/scp)
 SEPP | [https://github.com/5G-MAG/open5gs/pkgs/container/sepp](https://github.com/5G-MAG/open5gs/pkgs/container/sepp)

## Multicast–Broadcast Services (MBS)

Images and docker compose deployments for MBS are located in the following repository: [https://github.com/5G-MAG/rt-mbs-examples](https://github.com/5G-MAG/rt-mbs-examples)

### MBS Core Network Functions (3GPP [TS 23.247](https://www.3gpp.org/dynareport/23247.htm)) based on Open5GS

These are the MBS-capable versions of the core and radio functions (for example the MB-UPF, MB-SMF and an MBS-aware gNB, AMF and UE), used to move multicast and broadcast traffic through the 5G Core and radio.

Components | Package
 --|--
 UPF and MB-UPF | [https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/upf_mb-upf](https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/upf_mb-upf)
 Test AF/AS for MBS | [https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/test_mbs_af_as](https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/test_mbs_af_as)
 SMF and MB-SMF | [https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/smf_mb-smf](https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/smf_mb-smf)
 gNB with MBS | [https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/gnb_with_mbs](https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/gnb_with_mbs)
 AMF with MBS | [https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/amf_with_mbs](https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/amf_with_mbs)
 UE with MBS | [https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/ue_with_mbs](https://github.com/5G-MAG/rt-mbs-examples/pkgs/container/ue_with_mbs)

### MBS User Services Network Functions (3GPP [TS 26.502](https://www.3gpp.org/dynareport/26502.htm))

These are the user service layer functions that package and deliver media content over MBS. The MBS Transport Function (MBSTF) ingests media objects and sends them as a FLUTE session towards the MB-UPF.

Components | Package
 --|--
 MBSTF | [https://github.com/5G-MAG/rt-mbs-transport-function/pkgs/container/mbstf](https://github.com/5G-MAG/rt-mbs-transport-function/pkgs/container/mbstf)
