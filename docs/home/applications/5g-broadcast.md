---
title: 5G Broadcast for TV, Radio and Emergency Alerts
sidebar_position: 1
hide_title: true
description: 'Real, assembled applications built on 5G-MAG’s 5G Broadcast reference tools: RTP/HLS stream playback, an emergency alert broadcast demo, and seamless unicast/broadcast switching on Android.'
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 19.364a9 9 0 1 0 -12.728 0"/><path d="M15.536 16.536a5 5 0 1 0 -7.072 0"/><path d="M11 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Applications</span>
<h1>5G Broadcast for TV, Radio and Emergency Alerts</h1>
</div>
</div>

<div class="topic-lead">
Real applications built on 5G-MAG's 5G Broadcast reference tools: stream playback, emergency alerts, and seamless unicast/broadcast switching.
</div>

## Overview

An Application, on this site, is a real working scenario assembled from one or more Reference Tools, pointed at a concrete use case, rather than a single tool's own tutorial in isolation. 5G Broadcast delivers TV and radio to an unlimited number of devices over a free-to-air radio signal, with no SIM and no per-user connection; it is built on LTE and standardised by 3GPP, reusing eMBMS/FeMBMS rather than the 5G core. This category covers three demonstrable scenarios built on 5G-MAG's 5G Broadcast reference tools: a receiver chain playing back a broadcast stream, an emergency alert broadcast, and an Android device that switches seamlessly between broadcast and unicast delivery. For acronyms used here, see the [Glossary](/tech/glossary).

## Broadcast Stream Playback (RTP/HLS)

A complete 5G Broadcast receiver chain: an SDR (or a recorded sample file) feeds the MBMS Modem, which FLUTE-encodes the content as multicast traffic for the MBMS Middleware; the Middleware decodes it and serves it to a media player through a Web User Interface built on hls.js. The media player itself has no idea the content arrived over broadcast rather than a normal HTTP connection.

**Built from:** [5G Broadcast, TV and Radio Services](/reference-tools/5g-broadcast/).

Follow the [step-by-step guide](/reference-tools/5g-broadcast/tutorials/hls-playback-5gbc) to play back an HLS stream this way; the same tutorial series also points to an RTP playback variant.

## Emergency Alert Broadcast Demo

A Cell Broadcast Service (CBS) emergency alert, compliant with 3GPP TS 23.041, transmitted over an SDR-driven 5G Broadcast transmitter and received and displayed on a real 5G Broadcast-capable device (a QRD or CRD receiver), the same public-warning mechanism (ETWS/CMAS alert types) used for earthquake, tsunami and other emergency notifications.

**Built from:** [5G Broadcast: Emergency Alerts](/reference-tools/emergency-alerts/).

Follow the [step-by-step guide](/reference-tools/emergency-alerts/tutorials/end-to-end) to build the transmitter and trigger an alert yourself. Transmitting radio signals is subject to local regulation; only transmit in a shielded environment or under appropriate authorisation.

## Seamless Unicast/Broadcast Switching

An Android device plays a live stream delivered over 5G Broadcast, and falls back automatically to regular unicast delivery the moment the broadcast signal disappears, with no visible interruption to the media player, since the Android Middleware exposes both delivery paths through the same local webserver.

**Built from:** [5G Broadcast, TV and Radio Services](/reference-tools/5g-broadcast/).

Follow the [step-by-step guide](/reference-tools/5g-broadcast/tutorials/android-mw-seamless-switching) to set up the transmitter, webserver and Android Middleware, and see the switch yourself.

## Related

- [Reference Tools](/reference-tools) for the individual specification implementations.
- [Applications](/applications/) for the other end-to-end service scenarios.
