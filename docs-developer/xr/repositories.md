---
title: Repositories
hide_title: true
sidebar_position: 2
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
  <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
  <path d="M3 17v2a2 2 0 0 0 2 2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
</div>
<div class="topic-banner__text">
<h1>Software Repositories</h1>
<p>The following repositories make up the XR reference tools.</p>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="./tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

The following repositories make up the XR reference tools. Please refer to the [Scope](./scope) section for more context on what each implements.

The main repositories are:

- **rt-xr-unity-player**: the XR player itself, a Unity project that loads glTF scenes with MPEG glTF extensions and renders them on phones and head-mounted displays.
- **rt-xr-maf-native**: a C++ implementation of the Media Access Function (MAF) API, extensible with custom media pipeline plugins, used by the player to fetch and decode media.
- **rt-xr-glTFast**: the glTF parser that loads and instantiates 3D scenes in Unity.
- **rt-xr-content**: test content (sample scenes) implementing the scene description format.
- **rt-xr-blender-exporter**: a Blender add-on to author and export glTF assets with the MPEG extensions.

In the table below, auxiliary repositories (shown with a dashed border) are supporting libraries or helper tools rather than primary deliverables.

<!-- ARCH-TABLE-START:X1,X2,X3,X4,X5 -->

<!-- ARCH-TABLE-END:X1,X2,X3,X4,X5 -->

*Note: Auxiliary repositories are indicated with a dashed border.*

---

## Latest Releases

<!-- RELEASES-TABLE-START:XR Media -->
<table class="release-table">
  <thead>
    <tr>
      <th style="width: 40%;">Repository</th>
      <th style="width: 40%;">Version</th>
      <th style="width: 20%;">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="3"><em>Sync pending &mdash; run the update-data workflow.</em></td></tr>
  </tbody>
</table>
<!-- RELEASES-TABLE-END:XR Media -->
