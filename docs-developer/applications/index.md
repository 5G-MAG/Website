---
title: Applications
sidebar_position: -1
hide_title: true
description: "Overview of 5G-MAG's application areas: streaming, broadcast, multicast, XR, volumetric video, and network APIs."
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 4h6v6h-6z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6h-6z"/><path d="M17 14v6"/><path d="M14 17h6"/></svg>
</div>
<div class="topic-banner__text">
<h1>Applications</h1>
</div>
</div>

Each section below describes a complete end-to-end service scenario and the Reference Tool building blocks it is built on. An Application is a curated combination of existing Reference Tools assembled into a working service; the topic links open the underlying tool documentation. Start here if you want to understand what you can build and which tools to use; if you are looking for an individual specification implementation, see [Reference Tools](../projects) instead.

<div class="app-cat-columns">

<div class="app-cat-card">
  <div class="app-cat-header">
    <h3 class="app-cat-title">Streaming, Media Delivery &amp; Data Collection</h3>
    <p class="app-cat-desc">End-to-end 5G media streaming from network to client, including data collection and reporting.</p>
  </div>
  <div class="app-cat-topics">
    <a class="app-cat-topic-link" href="/developer/5gms">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16l13 -8l-13 -8"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">5G Media Streaming</span>
        <span class="app-cat-topic-text">Streaming Application Function (AF) and Application Server (AS), 3GPP TS 26.5xx</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/data-collection">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">UE Data Collection</span>
        <span class="app-cat-topic-text">Reporting and event exposure</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/multimedia">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12l0 9"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">Multimedia Content Delivery</span>
        <span class="app-cat-topic-text">Multi-CDN and protocol tooling</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/dvb-i">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9"/><path d="M16 3l-4 4l-4 -4"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">DVB-I over 5G</span>
        <span class="app-cat-topic-text">DVB-I service delivery over 5G</span>
      </span>
    </a>
  </div>
  <div class="project-card__footer">
    <a class="button button--outline button--primary button--sm" href="./streaming/">Explore Application</a>
  </div>
</div>

<div class="app-cat-card">
  <div class="app-cat-header">
    <h3 class="app-cat-title">5G Broadcast for TV, Radio &amp; Emergency Alerts</h3>
    <p class="app-cat-desc">LTE-based 5G broadcast for TV and radio services, plus standardised emergency alert delivery.</p>
  </div>
  <div class="app-cat-topics">
    <a class="app-cat-topic-link" href="/developer/5g-broadcast">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">5G Broadcast</span>
        <span class="app-cat-topic-text">LTE-based TV &amp; radio broadcast</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/emergency-alerts">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2"/><path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1"/><path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">Emergency Alerts</span>
        <span class="app-cat-topic-text">Broadcast-based public warning system</span>
      </span>
    </a>
  </div>
  <div class="project-card__footer">
    <a class="button button--outline button--primary button--sm" href="./5gbroadcast/">Explore Application</a>
  </div>
</div>

<div class="app-cat-card">
  <div class="app-cat-header">
    <h3 class="app-cat-title">Multicast &amp; Broadcast Services in 5G</h3>
    <p class="app-cat-desc">Full 5G-native multicast and broadcast services, including 5G MBS and related network functions.</p>
  </div>
  <div class="app-cat-topics">
    <a class="app-cat-topic-link" href="/developer/5g-mbs">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12l0 .01"/><path d="M14.828 9.172a4 4 0 0 1 0 5.656"/><path d="M17.657 6.343a8 8 0 0 1 0 11.314"/><path d="M9.168 14.828a4 4 0 0 1 0 -5.656"/><path d="M6.337 17.657a8 8 0 0 1 0 -11.314"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">5G Multicast Broadcast</span>
        <span class="app-cat-topic-text">5G Multicast-Broadcast Services (MBS) architecture and tooling</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/5g-core">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.657 16c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"/><path d="M12 16v5"/><path d="M16 16v4a1 1 0 0 0 1 1h4"/><path d="M8 16v4a1 1 0 0 1 -1 1h-4"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">5G Core Service Consumers</span>
        <span class="app-cat-topic-text">5G Core (5GC) consumer reference tools</span>
      </span>
    </a>
  </div>
  <div class="project-card__footer">
    <a class="button button--outline button--primary button--sm" href="./multicastbroadcast/">Explore Application</a>
  </div>
</div>

<div class="app-cat-card">
  <div class="app-cat-header">
    <h3 class="app-cat-title">eXtended Reality: 3D Scenes &amp; Avatar Communications</h3>
    <p class="app-cat-desc">MPEG-I Scene Description for immersive eXtended Reality (XR) experiences and avatar communications over 5G.</p>
  </div>
  <div class="app-cat-topics">
    <a class="app-cat-topic-link" href="/developer/xr">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"/><path d="M3 7v-2a2 2 0 0 1 2 -2h2"/><path d="M3 17v2a2 2 0 0 0 2 2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 21h2a2 2 0 0 0 2 -2v-2"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">XR Media Integration</span>
        <span class="app-cat-topic-text">XR and scene description over 5G</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/avatar">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4"/><path d="M12 2v2"/><path d="M9 12v9"/><path d="M15 12v9"/><path d="M5 16l4 -2"/><path d="M15 14l4 2"/><path d="M9 18h6"/><path d="M10 8v.01"/><path d="M14 8v.01"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">Avatar Communications</span>
        <span class="app-cat-topic-text">MPEG Avatar Representation Format (ARF) avatar communication</span>
      </span>
    </a>
  </div>
  <div class="project-card__footer">
    <a class="button button--outline button--primary button--sm" href="./xr/">Explore Application</a>
  </div>
</div>

<div class="app-cat-card">
  <div class="app-cat-header">
    <h3 class="app-cat-title">Volumetric Video &amp; Beyond 2D Experiences</h3>
    <p class="app-cat-desc">Visual Volumetric Video-based Coding (V3C) immersive platform and beyond-2D video quality evaluation frameworks.</p>
  </div>
  <div class="app-cat-topics">
    <a class="app-cat-topic-link" href="/developer/v3c">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8v-2a2 2 0 0 1 2 -2h2"/><path d="M4 16v2a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M16 20h2a2 2 0 0 0 2 -2v-2"/><path d="M12 12.5l4 -2.5"/><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5"/><path d="M8 10v4.5l4 2.5"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">V3C Immersive Platform</span>
        <span class="app-cat-topic-text">Volumetric 3D content platform</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/beyond-2d">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.338 5.53c5.106 1.932 10.211 1.932 15.317 0a1 1 0 0 1 1.345 .934v11c0 .692 -.692 1.2 -1.34 .962c-5.107 -1.932 -10.214 -1.932 -15.321 0c-.648 .246 -1.339 -.242 -1.339 -.935v-11.027a1 1 0 0 1 1.338 -.935l0 .001"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">Beyond-2D Evaluation</span>
        <span class="app-cat-topic-text">Video quality evaluation tools</span>
      </span>
    </a>
  </div>
  <div class="project-card__footer">
    <a class="button button--outline button--primary button--sm" href="./volumetric/">Explore Application</a>
  </div>
</div>

<div class="app-cat-card">
  <div class="app-cat-header">
    <h3 class="app-cat-title">Applications &amp; Services using Network APIs</h3>
    <p class="app-cat-desc">CAMARA-compliant network API integration, AI/ML evaluation, and next-generation testbeds. The AI/ML and 6G Testbed topics are hosted under <a href="../testbeds">Testbeds and Evaluation Tools</a>; "Explore Application" covers the Network APIs client tooling.</p>
  </div>
  <div class="app-cat-topics">
    <a class="app-cat-topic-link" href="/developer/network-apis">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">Network APIs</span>
        <span class="app-cat-topic-text">CAMARA QoS and device-aware apps</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/ai-ml">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">AI/ML Evaluation</span>
        <span class="app-cat-topic-text">AI/ML framework for media</span>
      </span>
    </a>
    <a class="app-cat-topic-link" href="/developer/6g-testbed">
      <span class="app-cat-topic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0"/><path d="M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6"/><path d="M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6"/><path d="M6 9h12"/><path d="M3 20h7"/><path d="M14 20h7"/><path d="M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M12 15v3"/></svg></span>
      <span class="app-cat-topic-body">
        <span class="app-cat-topic-name">6G Testbed &amp; AI Traffic</span>
        <span class="app-cat-topic-text">Next-gen network testbed</span>
      </span>
    </a>
  </div>
  <div class="project-card__footer">
    <a class="button button--outline button--primary button--sm" href="./networkapis/">Explore Application</a>
  </div>
</div>

</div>
