---
title: 5GMSd + 5G Network
hide_title: true
sidebar_position: 4
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming</span>
<h1>5G MSd End-to-End deployment with 5G Network</h1>
<p>This guide describes how to setup and configure the Reference Tools to create an end to end setup consisting of the 5G Downlink Media Streaming components and a 5G Network based on Open5GS (the 5G core network) and srsRAN (the Radio Access Network, RAN).</p>
</div>
</div>

:::tip[In short]
This tutorial allows to: Deploy 5G Media Streaming with a 5G Network and COTS UE.
:::


This guide describes how to setup and configure the Reference Tools to create an end to end setup consisting of
the 5G Downlink Media Streaming components and a 5G Network based on Open5GS (the 5G core network) and srsRAN (the Radio Access Network, RAN).

**What you will build:** the same end-to-end 5GMSd deployment as the [Docker end-to-end tutorial](end-to-end), but with the stream delivered over a real 5G Network to a commercial off-the-shelf (COTS) User Equipment (UE) rather than over the local network.

## Prerequisites

This tutorial reuses the server-side and client-side setup from the [basic end-to-end guide](end-to-end); complete that first. The only 5G-specific difference is that you point the `ingestURL` in your `streams.json` at your own local webserver (see Step 6 below), and you run the whole setup over the 5G Network described next.

## 5G Network with COTS UE setup

To setup the 5G Network and connect a COTS device please refer to the [corresponding documentation](../../3gpp-platforms/tutorials/5gnetwork).

## 5G Media Streaming setup

## Server-side Setup

### Step 0: Using a local server (Skip if your content is hosted in the internet)

#### Install the express.js webserver

The express.js webserver acts as our CDN for unicast delivery. To install the webserver follow the
instructions [here](https://github.com/5G-MAG/rt-common-shared/tree/main/simple-express-server).

#### Configure ffmpeg

First we configure the `ffmpeg` output. Navigate to `flute-ffmpeg/files` and open `ffmpeg-hls.sh` or `ffmpeg-dash.sh`
depending on the output format you want to create. Change the following
two lines and point them to the path of the local webserver installed previously. If there is no `watchfolder/hls` or
`watchfolder/dash`folder
on your webserver yet create that as well.

````
-hls_segment_filename /home/dsi/5gmag/simple-express-server/public/watchfolder/hls/stream_%v_data%02d.ts \
-var_stream_map "v:0,a:0" /home/dsi/5gmag/simple-express-server/public/watchfolder/hls/stream_%v.m3u8
````

#### Run ffmpeg and the express.js webserver

Navigate to `flute-ffmpeg/files` and run `sh ffmpeg-hls.sh` or `sh ffmpeg-dash.sh`.

#### Start the express.js webserver

Run `npm start` in `simple-express-server`. Our files created by `ffmpeg` are now hosted and available via unicast. Try
to query the master manifest to check for the availability of the files. A successful response returns the HLS master playlist, as shown below:

````
curl http://192.168.11.1:3333/watchfolder/hls/manifest.m3u8
#EXTM3U
#EXT-X-VERSION:6
#EXT-X-STREAM-INF:BANDWIDTH=2305600,RESOLUTION=1280x720,CODECS="avc1.64001f,mp4a.40.2"
stream_0.m3u8
````

### Step 1: Install the Application Function

For details please refer to the [corresponding section](end-to-end#1-installing-the-application-function) in
the [basic end-to-end guide](end-to-end).

### Step 2: Install the Application Server

For details please refer to the [corresponding section](end-to-end#2-installing-the-application-server) in
the [basic end-to-end guide](end-to-end).

### Step 3: Start the Application Server

For details please refer to the [corresponding section](end-to-end#3-running-the-application-server) in
the [basic end-to-end guide](end-to-end).

### Step 4: Basic Configuration of the Application Function

Follow the [basic configuration steps](end-to-end) documented in
the [basic end-to-end guide](end-to-end).

### Step 5: Start the Application Function

Follow the [command](end-to-end) documented in the [basic end-to-end guide](end-to-end).

### Step 6: Create a Content Hosting Configuration and Provisioning Session

Follow the [steps](end-to-end) to create a content hosting configuration
and a provisioning session using the `msaf-configuration` tool.

Note that you need to point the `ingestURL` of your `streams.json` to the URL of your webserver.

## Client-side Setup

As we are all set on the server-side now we can focus on the client side.

### Step 1: Installation, Configuration and Running the 5GMSd Client

Please follow the [instructions](end-to-end#client-side-setup) documented in
the [basic end-to-end guide](end-to-end) setup guide.

## Next steps

- Add reporting features on top of this deployment: [Consumption Reporting](consumption-reporting), [QoE Metrics Reporting](metrics-reporting) or [CMCD Reporting](CMCD-reporting).
- Return to the [Tutorials index](.).
