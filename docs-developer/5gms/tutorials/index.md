---
hide_title: true
title: Tutorials
sidebar_position: -1
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming</span>
<h1>Tutorials, Tests and Examples</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="../scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="../projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="../repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="../packages" style="margin: 2px 4px 2px 0">Packages</a> <a class="button button--outline button--primary" href="../releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="." style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

## Where to start

Start with the **5G MSd End-to-End deployment (with Docker)** tutorial. It sets up a working Application Function (AF) and Application Server (AS) and is the prerequisite for the feature tutorials that follow (Consumption Reporting, QoE Metrics Reporting, CMCD Reporting and the 5G Network deployment all build on it). The testing tutorials (AS, AF, Postman) are for developers who want to exercise individual interfaces in detail.

## Tutorial: 5G MSd End-to-End deployment (with Docker)

Covers: deploying a complete 5G Media Streaming setup with Docker. Start here.

<a class="button button--outline button--primary" href="./end-to-end" style="margin: 4px 0">Go to the Tutorial: 5G MSd End-to-End deployment (with Docker)</a>
## Tutorial: 5G MSd End-to-End deployment with 5G Network

Covers: deploying 5G Media Streaming with a 5G Network and a commercial off-the-shelf (COTS) User Equipment (UE). Builds on the Docker end-to-end tutorial.

<a class="button button--outline button--primary" href="./end-to-end-with-5g" style="margin: 4px 0">Go to the Tutorial: 5G MSd End-to-End deployment with 5G Network</a>
## Tutorial: 5G Media Streaming with Consumption Reporting

Covers: enabling and using Consumption Reporting for 5G Media Streaming. Builds on the Docker end-to-end tutorial.

<a class="button button--outline button--primary" href="./consumption-reporting" style="margin: 4px 0">Go to the Tutorial: 5G Media Streaming with Consumption Reporting</a>
## Tutorial: 5G Media Streaming with QoE Metrics Reporting

Covers: enabling and using Quality of Experience (QoE) Metrics Reporting for 5G Media Streaming. Builds on the Docker end-to-end tutorial.

<a class="button button--outline button--primary" href="./metrics-reporting" style="margin: 4px 0">Go to the Tutorial: 5G Media Streaming with QoE Metrics Reporting</a>
## Tutorial: CMCD Reporting

Covers: enabling Common Media Client Data (CMCD) collection in the 5GMS Application Server, deploying the cmcd-toolkit collector and Grafana dashboard, and verifying end-to-end CMCD metric delivery. Builds on the Docker end-to-end tutorial.

<a class="button button--outline button--primary" href="./CMCD-reporting" style="margin: 4px 0">Go to the Tutorial: CMCD Reporting</a>
## Tutorial: Developing and Testing the 5GMS Application Server

Covers: setting up the 5GMSd AS for development and testing; testing the AS with and without the AF (using an M3 client); configuring HTTP and HTTPS Application Servers; and testing the internal M3 Certificates and ContentHostingConfiguration APIs.

<a class="button button--outline button--primary" href="./testing-AS" style="margin: 4px 0">Go to the Tutorial: Developing and Testing the 5GMS Application Server</a>
## Tutorial: Testing the 5GMS Application Function

Covers: setting up the 5GMSd AF; testing the M1 interface APIs (Provisioning Sessions, Server Certificates, Content Protocol Discovery, Content Hosting, Consumption Reporting); testing the M3 interface APIs (simple HTTP configuration, HTTP configuration and certificate sending); and testing the M5 interface APIs (Service Access Information).

<a class="button button--outline button--primary" href="./testing-AF" style="margin: 4px 0">Go to the Tutorial: Testing the 5GMS Application Function</a>
## Tutorial: Testing M1 and M5 APIs with Postman

Covers: testing the M1 and M5 APIs of the 5GMSd AF with Postman.

<a class="button button--outline button--primary" href="./testing-postman" style="margin: 4px 0">Go to the Tutorial: Testing M1 and M5 APIs with Postman</a>
## Video Library
Our [YouTube channel](https://www.youtube.com/@5GMAG) hosts some practical videos provided by developers on the use of the Reference Tools.

## Videos from the developer community

### General end-to-end setup, components and features

<!-- YOUTUBE-GRID-START -->
<div class="yt-grid">
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/uEfBaTqh5vw"
        title="Overview of the latest updates to the 5G Media Streaming Project - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/SOA7OGF86Gg"
        title="Introducing the new 5GMS Application Provider Portal - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/AvjtVrTrWsA"
        title="5G Media Streaming at IBC 2025"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/vEhv0RYGbKo"
        title="5G Media Streaming at FOKUS Media Web Symposium 2024"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/hiHWE3DyhdM"
        title="5G Media Streaming QoE Metrics Reporting - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/qewsQhGi8aE"
        title="Introducing the 5GMS Application Provider Management Portal - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/fv_LoZXk5Oc"
        title="5GMS Consumption Reporting, Network Assistance and Dynamic Policies - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/lJG1hNty_AU"
        title="5G Media Streaming supported by Reference Tools - DEVELOPER XCHANGE"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/L5nGVf-WhNE"
        title="5G Media Streaming End-to-end setup with Android clients - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
  <div class="yt-item">
    <div class="yt-embed-wrapper">
      <iframe
        src="https://www.youtube.com/embed/2IU_18Dvhew"
        title="5G Media Streaming in the BBC R&D standalone testbed - Reference Tools"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
  </div>
</div>
<!-- YOUTUBE-GRID-END -->

