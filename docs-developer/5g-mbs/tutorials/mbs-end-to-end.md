---
title: MBS End-to-End
hide_title: true
sidebar_position: 6
---

<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01" />
  <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
  <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
  <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
  <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></svg>
<h1>MBS End-to-End: Operating MBS User Services, MBS 5GC, NG-RAN and UE</h1>
</div>

The written walkthrough for this end-to-end tutorial is under development. In the meantime, the video below demonstrates the full flow, and the component tutorials below cover each piece in written form.

## Interim outline

Until the full write-up is ready, you can follow the individual pieces that together make up the end-to-end flow, in this order:

1. [MBS support in the 5GC (Docker deployment)](./docker-implementation): bring up the MBS-capable 5G Core.
2. [Initial support of MBS in the 5GC](./mbs-in-5gc): create an MBS session and send multicast traffic through the core.
3. [Managing MBS Sessions and TMGIs](./managing-mbs-sessions-tmgi): the MB-SMF session and TMGI operations.
4. [MBS Function (MBSF) Operation & APIs](./mbsf) and [MBS Transport Function (MBSTF) Testing](./mbstf): provision and deliver media over the MBS User Services layer.

## Tutorial videos

The recording below walks through operating the MBS User Services, MBS 5GC, NG-RAN and UE together.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cdYV99cDuJE" title="Operating MBS User Services, MBS 5GC, NG-RAN and UE end to end - 5G-MAG Reference Tools" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
