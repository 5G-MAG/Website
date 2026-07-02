---
title: SDR - Sample Files
hide_title: true
sidebar_position: 3
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
  <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
  <path d="M9 21l3 -9l3 9" />
  <path d="M10 19h4" /></svg>
</div>
<div class="topic-banner__text">
<h1>MBMS Modem with Sample Files</h1>
<p>The rt-mbms-modem can work with sample files (recorded I/Q signals) in two ways: capture, which records a signal from a Software Defined Radio (SDR) and therefore needs an SDR and a live 5G Broadcast signal; and run (replay), which plays back an existing sample file and needs no SDR.</p>
</div>
</div>

The rt-mbms-modem can work with sample files (recorded I/Q signals) in two ways: **capture**, which records a signal from a Software Defined Radio (SDR) and therefore needs an SDR and a live 5G Broadcast signal; and **run** (replay), which plays back an existing sample file and needs no SDR. See [Sample Files](/developer/5g-broadcast/additional/sample-files) for downloadable files and the filename convention.

Before capturing or running a sample file, make sure that *MBMS Modem* isn't running in the background. If it is, stop *MBMS Modem* with ``systemctl stop 5gmag-rt-modem``.

## Capture a sample file

Capturing needs an SDR and a live 5G Broadcast signal. Run the command below to record the raw I/Q data from the SDR to a file:

```
modem -w "PathToSample/samplefile.raw"
```

## Run a sample file

**Important**: For correct pre-configuring of the MBMS Modem at system startup, it has to be run through systemd once, see https://github.com/5G-MAG/rt-mbms-modem#configuration

Based on the structure of the Service Announcement file the configuration file in `/etc/5gmag-rt.conf` needs to be adjusted. For details refer to the corresponding [documentation](/developer/5g-broadcast/additional/rt-common-shared/MBMS-service-announcement-files). 

To start *MBMS Modem* with a downloaded sample file, run the following command (no SDR required):

```
modem -f "PathToSample/samplefile.raw" -b 10
```

> **Notice:** ``-b 10`` is the bandwidth (in MHz) that the sample file was captured at, which is encoded in the filename (see [Sample Files](/developer/5g-broadcast/additional/sample-files)). So for a 5 MHz bandwidth sample file you need to adjust the command to ``-b 5``.

## Next steps

* To play a received HLS stream end to end, see [SDR - HLS Playback over 5G Broadcast](./hls-playback-5gbc).
* Return to the [Tutorials index](./).
