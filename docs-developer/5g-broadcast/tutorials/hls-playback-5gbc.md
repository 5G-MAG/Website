---
title: SDR - HLS over 5G Broadcast
hide_title: true
sidebar_position: 1
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
<span class="topic-banner__kicker">5G Broadcast: Hybrid TV/Radio</span>
<h1>HLS Playback over 5G Broadcast (Linux)</h1>
</div>
</div>

This tutorial provides the required steps to test the reception of an HTTP Live Streaming (HLS) stream processed by the [MBMS Modem](https://github.com/5G-MAG/rt-mbms-modem).

More information about HLS can be found in the IETF HLS specification: [RFC 8216 - HTTP Live Streaming](https://datatracker.ietf.org/doc/html/rfc8216)

**What you will build:** a receiver chain (modem, middleware and web interface) that plays an HLS stream received over 5G Broadcast, using either an SDR or a recorded sample file as the source.

## Prerequisites

* The MBMS Modem, MBMS Middleware and Web User Interface installed (Step 1 below).
* Either an SDR and a live signal, or a downloaded HLS [sample file](../additional/sample-files). For hardware details see [Requirements](./requirements).

## Basic workflow

This tutorial makes use of the rt-mbms-modem, rt-mbms-mw and a media player. The basic workflow of these components is illustrated in the Figure below:

![Simplified architecture: SDR or sample file feeds the MBMS Modem, which multicasts FLUTE-encoded content to the MBMS Middleware, which serves it to a media player via an nginx proxy](/assets/images/5gbc/simplified_architecture.png)

*Figure: the receiver chain, from radio input through to the media player.*

The output of the SDR or the sample file serves as the input for the MBMS Modem (also referred to as the Receive Process). The MBMS Modem exposes the FLUTE (File Delivery over Unidirectional Transport) encoded content via UDP multicast to the MBMS Middleware. The MBMS Middleware listens to the local tun interface. Received multicast packets from the modem are FLUTE-decoded using the [Reference Tools FLUTE library](https://github.com/5G-MAG/rt-libflute). Once the manifest files and media segments are FLUTE-decoded they are cached in the middleware and made available to the media player via an Nginx proxy. The media player itself is not aware that the content is provided via broadcast.

## Step 1: Installation

1. [Install the MBMS Modem](https://github.com/5G-MAG/rt-mbms-modem)
2. [Install the MBMS Middleware](https://github.com/5G-MAG/rt-mbms-mw)
3. [Install the Webinterface](https://github.com/5G-MAG/rt-wui)
4. [Download an HLS sample file](../additional/sample-files) or setup an HLS live stream on your transmitting infrastructure

## Step 2: Configure multicast routing

Follow the detailed instructions on how to configure multicast routing provided [here](https://github.com/5G-MAG/rt-mbms-modem?tab=readme-ov-file#running-the-mbms-modem).

Start and then stop the MBMS Modem service. Starting it generates or updates the required configuration files; stopping it frees the modem so you can run it in the foreground against a sample file in the next step. This may be needed again after a reboot.
    - `systemctl start 5gmag-rt-modem`
    - `systemctl stop 5gmag-rt-modem`

## Step 3: Start the MBMS Modem

Start the MBMS Modem with a sample as specified [here](https://github.com/5G-MAG/rt-mbms-modem?tab=readme-ov-file#run-a-sample-file). It is important to provide the right bandwidth to the MBMS Modem. Consequently, for a 5 MHz bandwidth sample file, the command looks like this: 

```
cd rt-mbms-modem/build
sudo ./modem -f "PathToSample/5MHz_MCS16_1kHz25_HLS_q6a.raw" -b 5
```
The final output on the terminal should now look similar to the output below:

```
modem[7891]: 5g-mag-rt modem v1.1.1 starting up
modem[7891]: Initialising SDR
modem[7891]: Launching phy thread with realtime scheduling priority 10
modem[7891]: Launching phy thread with realtime scheduling priority 10
modem[7891]: Launching phy thread with realtime scheduling priority 10
modem[7891]: Launching phy thread with realtime scheduling priority 10
modem[7891]: Launching phy thread with realtime scheduling priority 10
modem[7891]: Raising main thread to realtime scheduling priority 20
modem[7891]: GPS data stream started
modem[7891]: TUN file descriptor 6
modem[7891]: Starting RESTful API handler at http://0.0.0.0:3010/modem-api/
modem[7891]: Phy: PSS/SSS detected: Mode FDD, PCI 333, CFO 0.18315084 KHz, CP Extended
modem[7891]: Phy: MIB Decoded. Mode FDD, PCI 333, PRB 25, Ports 1, CFO 0.18315084 KHz, SFN 0
modem[7891]: Decoded MIB at target sample rate, TTI is 120. Subframe synchronized.
modem[7891]: CINR 16.13 dB
modem[7891]: PDSCH: MCS 5, BLER 0.0, BER 0.0
modem[7891]: MCCH: MCS 2, BLER 0.0, BER 0.0
modem[7891]: MCH 0: MCS 16, BLER 0.0, BER 0.05661512027491409
modem[7891]:     MTCH 0: LCID 1, TMGI 0x00000009f165, 238.1.1.95:40085
modem[7891]:     MTCH 1: LCID 2, TMGI 0x00001009f165, 238.1.1.111:40101
modem[7891]: -----
```

To tell a healthy decode from a failing one, look for this sequence in the log: `PSS/SSS detected` (the modem found the signal), `MIB Decoded` and `Subframe synchronized` (it locked onto the frame structure), a reasonable `CINR` value in dB (signal quality; higher is better), and low `BLER`/`BER` on the `PDSCH`, `MCCH` and `MCH` lines (block/bit error rates; near 0.0 is good). The final `MTCH` lines list the received services with their `TMGI` (service identity) and the multicast address and port. If you do not see PSS/SSS detected or MIB Decoded, the modem is not receiving the signal (check the SDR, frequency, or the `-b` bandwidth for a sample file).

## Step 4: Start the MBMS Middleware

In this example, we start the MBMS Middleware from the build folder to enable logging to the terminal.

Note: Depending on the format of the Service Announcement file you need to adjust the configuration in `/etc/5gmag-rt.conf`. Detailed information can be
found [here](../additional/rt-common-shared/MBMS-service-announcement-files).

Start the middleware:

```
cd rt-mbms-mw/build
sudo ./mw
```
The output should look like this, confirming the middleware has started a FLUTE receiver on the modem's multicast address:

```
mw[216090]: 5g-mag-rt mw v0.10.0 starting up
mw[216090]: Starting FLUTE receiver on 238.1.1.95:40085 for TSI 0
```

## Step 5: Start the Web User Interface

We use the Web User Interface to monitor the MBMS Modem and the MBMS Middleware. Moreover, we use the hls.js integration to playback the final HLS stream. In order to run the Webinterface perform the steps
described [here](https://github.com/5G-MAG/rt-wui?tab=readme-ov-file#running).

The Webinterface can also be started directly from its folder:

```
cd rt-wui
node app.js
```

In order to use the webinterface for playback perform the following steps:

1. Navigate to `http://localhost` in your browser
2. Click `Middleware` on the top right corner
3. Click on the play button below the stream information
4. An instance of hls.js is initialized playing the HLS stream

The output for step 3 and step 4 should look similar to this:

<img src="/assets/images/5gbc/rt-wui-mw-tab.jpg" width="800" alt="Web User Interface Middleware tab showing the received stream information">

*Figure: the Middleware tab of the Web User Interface, showing the received stream.*

<img src="/assets/images/5gbc/rt-wui-playback.jpg" width="800" alt="Web User Interface playing the HLS stream with hls.js">

*Figure: the HLS stream playing in the Web User Interface via hls.js.*

At this point the stream received over 5G Broadcast is playing in the browser. It is also possible to use other players like VLC. Simply paste the url to the `index.m3u8` into the VLC player. As an
example the URL can look the following: `http://localhost/f/00001009f165/index.m3u8`. Replace the `localhost` part with
the IP of the machine that is running the MBMS Middleware in order to access the stream from other machines in the same
network.

## Next steps

* To receive an RTP stream instead, see [SDR - RTP Playback over 5G Broadcast](./rtp-playback-5gbc).
* To adjust the Service Announcement configuration, see [Configuration of Service Announcement](./configuration-guide).
* Return to the [Tutorials index](./).
