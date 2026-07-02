---
hide_title: true
title: Tutorials
sidebar_position: -1
---

<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01" />
  <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
  <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
  <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
  <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></svg>
<h1>Tutorials, Tests and Examples</h1>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="../scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="../projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="../repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="../packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="../releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="." style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

These tutorials cover the individual pieces of the 5G Multicast-Broadcast Services (MBS) reference tools. New to this area? Start with [Initial support of MBS in the 5GC](./mbs-in-5gc) to bring up the MBS-capable 5G Core, or with [MBS Transport Function (MBSTF) Testing](./mbstf) to exercise the media user service layer. The [End-to-End](./mbs-end-to-end) tutorial ties the pieces together.

## Tutorial: MBS Transport Function (MBSTF) Testing

This tutorial provides an overview on the initial implementation of the MBSTF.

<a class="button button--outline button--primary" href="./mbstf" style="margin: 4px 0">Go to the Tutorial: MBS Transport Function (MBSTF) Testing</a>

## Tutorial: MBS Function Operation and APIs

This tutorial provides an overview on the initial implementation of the MBSF.

<a class="button button--outline button--primary" href="./mbsf" style="margin: 4px 0">Go to the Tutorial: MBS Function Operation and APIs</a>

## Tutorial: Initial support of MBS in the 5GC

This tutorial provides an overview on the initial implementation of MBS in Open5GS Core.

<a class="button button--outline button--primary" href="./mbs-in-5gc" style="margin: 4px 0">Go to the Tutorial: Initial support of MBS in the 5GC</a>

## Tutorial: MBS support in the 5GC (Docker deployment)

This tutorial provides an overview on the Docker deployment implementation of MBS in Open5GS Core.

<a class="button button--outline button--primary" href="./docker-implementation" style="margin: 4px 0">Go to the Tutorial: MBS support in the 5GC (Docker deployment)</a>

## Tutorial: MBS End-to-End: Operating MBS User Services, MBS 5GC, NG-RAN and UE

This tutorial provides an overview on the implementation of MBS in Open5GS Core, srsRAN NG-RAN and srsRAN UE.

<a class="button button--outline button--primary" href="./mbs-end-to-end" style="margin: 4px 0">Go to the Tutorial: MBS End-to-End</a>

## MB-SMF: Managing MBS Sessions and TMGIs

This tutorial provides an overview on the management of MBS Session and TMGIs with the MBS 5GC implementation.

<a class="button button--outline button--primary" href="./managing-mbs-sessions-tmgi" style="margin: 4px 0">Go to the Tutorial: Managing MBS Sessions and TMGIs</a>

## Video Library
Our [YouTube channel](https://www.youtube.com/@5GMAG) hosts some practical videos provided by developers on the use of the Reference Tools.

<!-- YOUTUBE-GRID-START -->
<style>
  .yt-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
  }
  @media (max-width: 640px) {
    .yt-grid { grid-template-columns: 1fr; }
  }
  .yt-embed-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }
  .yt-embed-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
<div class="yt-grid">
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/e_xK_ckkhgc"
        title="Demonstrating MBS User Service Announcement mechanisms - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/MF9rhnaEEP8"
        title="Demonstrating the OBJECT_CAROUSEL operating mode - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/0re77KNmxYQ"
        title="TUTORIAL - Basic implementation of MBS Function (MBSF) - Multicast Broadcast Services (MBS)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/anrtRfPttmo"
        title="TUTORIAL - Basic implementation of MBS Transport Function - Multicast Broadcast Services (MBS)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/lJh2F0xXxpE"
        title="TUTORIAL - Initial support of 5MBS core network functions"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
</div>
<!-- YOUTUBE-GRID-END -->
