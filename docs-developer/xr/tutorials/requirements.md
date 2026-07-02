---
title:  Requirements
hide_title: true
sidebar_position: 5
---

<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
  <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
  <path d="M3 17v2a2 2 0 0 0 2 2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
<h1>Requirements</h1>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="../scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="../projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="../repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="../releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="." style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href=".#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This page lists the device types the XR player currently supports, so you can check your hardware before following the build tutorials.

## Supported device types

Below is a list of supported platforms, grouped by the device types defined in 3GPP [TS 26.119](https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=4038) (device media capabilities for XR services).

See [the feature table](../scope#features-implemented-in-the-xr-unity-player) for details.

To suggest support for other platforms, [open a new issue](https://github.com/5G-MAG/rt-xr-unity-player/issues). 

### XR head mounted display

- [Meta Quest 3](./xr-player-metaquest3)
- Android OpenXR Headsets supporting "Khronos Simple Controller Profile"

### XR phone

- Android handheld devices (smartphones, tablets, ...) armv8 devices, Android API Level 24.
- Features on Android depend on XR runtime specific extensions (eg. ARCore) 

### AR glasses

Not available. These device types are defined in TS 26.119 but are not yet supported by the reference player. To request support, [open a new issue](https://github.com/5G-MAG/rt-xr-unity-player/issues).

### Thin AR glasses

Not available. As above, this device type is not yet supported; to request support, [open a new issue](https://github.com/5G-MAG/rt-xr-unity-player/issues).
