---
title: Requirements
hide_title: true
sidebar_position: 1
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
  <path d="M12 12.5l4 -2.5" />
  <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" />
  <path d="M8 10v4.5l4 2.5" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">V3C Immersive Platform</span>
<h1>Requirements</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="../scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="../projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="../repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="../releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="." style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href=".#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

This page lists the device requirements for running the V3C Unity player on Android. Check these before following the build tutorial.

**See also:** [V3C Unity Player for Android with DASH Streaming Server](./v3c-immersive-platform-in-android-streaming), the tutorial these requirements support.

## Android devices

Please [open an issue](https://github.com/5G-MAG/Getting-Started/issues) to report support for new devices or problems with currently listed devices.

### Device requirements

The v3c player requires:
- OpenGL ES 320
- Hardware accelerated HEVC video decoding

Devices with Qualcomm Adreno GPUs are known to work. 

### Tested devices

The following devices OS/firmware versions have been reported to work: 

| Device | Android version | API level | GPU | 
|--------|-----------------|-----------|-----|
| OnePlus10T | Android 12 | API level 32 | Adreno 730 |
| Samsung S21 | Android 14 | API level 34 | Adreno 660 |
| Samsung Galaxy Tab | Android 14 | API level 34 | Adreno 740 |

