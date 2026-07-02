---
title:  Sample files
hide_title: true
sidebar_position: 2
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
<h1>Sample files</h1>
<p>In order to support application developers as well as 5G-MAG contributors for testing their improvements, ORS captured sample files ("raw data" = digitized I/Q (In-phase/Quadrature) samples at LimeSDR Mini 2 output) directly from a 5G BC transmitter.</p>
</div>
</div>
In order to support application developers as well as 5G-MAG contributors for testing their improvements, ORS captured sample files ("raw data" = digitized I/Q (In-phase/Quadrature) samples at [LimeSDR Mini 2](https://limemicro.com/products/boards/limesdr-mini-2-0/) output) directly from a 5G BC transmitter. You can also capture sample files using the [capture command of the Receive Process](https://github.com/5G-MAG/rt-mbms-modem#capture-and-running-of-sample-files).

### Understanding the filenames

Each filename encodes the capture parameters, for example `5MHz_MCS16_1kHz25_HLS_q6a`:

* **`5MHz`**: the signal bandwidth. This is the value you pass to the modem with the `-b` flag (here, `-b 5`).
* **`MCS16`**: Modulation Coding Scheme 16 (16QAM), the modulation and coding used.
* **`1kHz25`**: subcarrier spacing (SCS), the frequency gap between subcarriers (1.25 kHz; `7kHz5` means 7.5 kHz).
* **`HLS`** / **`RTP`** / **`DASH`**: the payload type, that is the streaming format carried in the broadcast.
* **`q6a`**: an internal quality/encoding label for the source content.

Other terms used below: SDR (Software Defined Radio); CAS (Common Access Signalling, the broadcast control signalling used in a cell).

:::caution
The I/Q sample files are large (several GB each). Check that you have enough free disk space before downloading, and note the `-b` value you must pass to the modem, which is the bandwidth in the filename.
:::

### Using a sample file

To run the modem against a sample file, follow the [MBMS Modem with Sample Files](../tutorials/modem-samplefiles) tutorial. The `-b` flag you pass to the modem must match the bandwidth in the filename (for example `-b 5` for a `5MHz...` file).

#### RTP payload

Payload 3.5 Mbit RTP, Modulation Coding Scheme 16 (16QAM):

| Bandwidth | SCS | File | Size |
|---|---|---|---|
| 3 MHz | 1.25 kHz | [3MHz_MCS16_1kHz25_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/3MHz_MCS16_1kHz25_RTP_3.5.raw) | 7.9 GB |
| 5 MHz | 1.25 kHz | [5MHz_MCS16_1kHz25_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/5MHz_MCS16_1kHz25_RTP_3.5.raw) | 14.5 GB |
| 5 MHz | 7.5 kHz | [5MHz_MCS16_7kHz5_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/5MHz_MCS16_7kHz5_RTP_3.5.raw) | 11.4 GB |
| 6 MHz | 1.25 kHz | [6MHz_MCS16_1kHz25_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/6MHz_MCS16_1kHz25_RTP_3.5.raw) | 33.7 GB |
| 7 MHz | 1.25 kHz | [7MHz_MCS16_1kHz25_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/7MHz_MCS16_1kHz25_RTP_3.5.raw) | 23.6 GB |
| 8 MHz | 1.25 kHz | [8MHz_MCS16_1kHz25_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/8MHz_MCS16_1kHz25_RTP_3.5.raw) | 23.5 GB |
| 10 MHz | 1.25 kHz | [10MHz_MCS16_1kHz25_RTP_3.5.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/10MHz_MCS16_1kHz25_RTP_3.5.raw) | 21.6 GB |

#### HLS payload

Payload HLS, Modulation Coding Scheme 16 (16QAM), subcarrier spacing 1.25 kHz:

| Bandwidth | File | Size |
|---|---|---|
| 3 MHz | [3MHz_MCS16_1kHz25_HLS_q6a.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/3MHz_MCS16_1kHz25_HLS_q6a.raw) | 5.9 GB |
| 5 MHz | [5MHz_MCS16_1kHz25_HLS_q6a.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/5MHz_MCS16_1kHz25_HLS_q6a.raw) | 12.2 GB |
| 8 MHz | [8MHz_MCS16_1kHz25_HLS_q6a.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/8MHz_MCS16_1kHz25_HLS_q6a.raw) | 25.4 GB |
| 10 MHz | [10MHz_MCS16_1kHz25_HLS_q6a.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/10MHz_MCS16_1kHz25_HLS_q6a.raw) | 17.6 GB |

#### DASH payload

Payload DASH, Modulation Coding Scheme 16 (16QAM), subcarrier spacing 1.25 kHz:

| Bandwidth | File | Size |
|---|---|---|
| 5 MHz | [5MHz_MCS16_1kHz25_DASH_q6a.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/5MHz_MCS16_1kHz25_DASH_q6a.raw) | 10.4 GB |

#### Sample files for rt-mbms-modem development Rel14/Rel16 only:
* Rel.14 CAS [5MHz_MCS16_1kHz25_HLS_q4a_Rel14.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/5MHz_MCS16_1kHz25_HLS_q4a_Rel14.raw) (5.4 GB)
* Rel.16 CAS [5MHz_MCS16_1kHz25_HLS_q4a_Rel16.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/5MHz_MCS16_1kHz25_HLS_q4a_Rel16.raw) (5.1 GB) (PBCH Repetition, Aggregation Level 16, CFI-Indicator in MIB-MBMS)
  * **Note**: Release 16 is currently not supported in the rt-mbms-modem. This stream can be used for development purposes.
* Rel.16 CAS [8MHz_MCS16_1kHz25_Rel16.raw](https://obeca-testdaten.s3.eu-central-1.amazonaws.com/8MHz_MCS16_1kHz25_Rel16.raw) (13.4 GB) (PBCH Repetition, Aggregation Level 16, CFI-Indicator in MIB-MBMS)
  * **Note**: Release 16 is currently not supported in the rt-mbms-modem. This stream can be used for development purposes.
> Note: The sample files were captured in Nov 2021. An mp4 file of the movie [Big Buck Bunny](https://www.bigbuckbunny.org) (published under the [Creative Commons Attribution 3.0 license](https://creativecommons.org/licenses/by/3.0/), (c) copyright 2008, Blender Foundation / [www.bigbuckbunny.org](https://www.bigbuckbunny.org)) was looped to create RTP and HLS streams. Play duration of each sample file is 3-5 minutes.

If you need any further sample files, please get in contact with us **[reference-tools@5g-mag.com](mailto:reference-tools@5g-mag.com)**.
