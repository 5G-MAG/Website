---
title: SDR - Requirements
hide_title: true
sidebar_position: 7
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
<h1>Requirements</h1>
<p>This page lists the hardware, Software Defined Radio (SDR), and operating-system requirements for running the 5G Broadcast Reference Tools, along with a reference setup and the configurations that have been validated.</p>
</div>
</div>

This page lists the hardware, Software Defined Radio (SDR), and operating-system requirements for running the 5G Broadcast Reference Tools, along with a reference setup and the configurations that have been validated.

## Hardware requirements
It is hard to define system requirements because these depend e.g. on bandwidth (e.g., 5, 8, 10 MHz), modulation coding
scheme and other parameters. Generally, a CPU with 4 cores and 8 threads, 16 GB RAM and - in case an SDR and not just
sample files are used - a USB 3.0 port is necessary. Furthermore, HDMI, Wifi, LAN and sufficient SSD space (for sample
files,...) is recommended.

> **Note** We would appreciate if you let us know about your setup to list it below. Drop us a mail [reference-tools@5g-mag.com](mailto:reference-tools@5g-mag.com).

## Supported SDR

Using these Reference Tools in a live setup requires an SDR (software defined radio) platform.

Reference Tools *[MBMS Modem](https://github.com/5G-MAG/rt-mbms-modem)* supports [SoapyAPI](https://github.com/pothosware/SoapySDR/wiki), thus any
supported SDR should work provided the hardware is sufficient for receiving a 5G Broadcast signal (e.g. bandwidth, sample rate...).

We recommend using a LimeSDR Mini 2 or [BladeRF 2.0 Micro xA4](https://www.nuand.com/product/bladeRF-xA4). A [HackRF One](https://greatscottgadgets.com/hackrf/one/) can also be used. Each has to be connected via USB to the computer and to your antenna via the SMA connector. USRPs known to work include Ettus USRP N310 and Ettus USRP B210.

> **Note** If you are using another SDR, please let us know that we can update the list above. Drop us a mail [reference-tools@5g-mag.com](mailto:reference-tools@5g-mag.com).

> **Note** If you only want to test with sample files, an SDR is NOT required.

## Operating System

We recommend using [Ubuntu 22.04 LTS (64 bit)](https://ubuntu.com/). Ubuntu 20.04 LTS also works; note that its standard security maintenance ended in May 2025 and it now requires Ubuntu Pro. Other versions of Ubuntu or Debian, Raspbian, and similar distributions should also work when building from source.

> **Note** We would appreciate if you let us know about your setup to list it below. Drop us a mail [reference-tools@5g-mag.com](mailto:reference-tools@5g-mag.com).

## Reference setup

<p align="center"><img src="/assets/images/5gbc/reference-ors.png" alt="Photo of the ORS reference setup: an Intel NUC with an integrated SDR and display"></p>

*Figure: the ORS reference hardware setup.*

| Component | Part | Approx. price (EUR) |
| ------------- |-------------|-------------|
| Intel NUC | <a href="https://www.amazon.de/gp/product/B08CNLFM1N/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1" target="_blank">Intel Provo Canyon BKNUC8V7PNH</a> | 600 |
| RAM | <a href="https://www.amazon.de/gp/product/B08C4VKYFG/ref=ppx_yo_dt_b_asin_title_o00_s01?ie=UTF8&psc=1" target="_blank">Crucial RAM CT16G4SFRA266 16GB DDR4 2666 MHz CL19</a> | 60 |
| SSD| <a href="https://www.amazon.de/gp/product/B07BSSFB4N/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1" target="_blank">SanDisk Extreme PRO M.2 NVMe 3D SSD 500 GB interne SSD</a> | 70 |
| Power cord| <a href="https://www.amazon.de/gp/product/B00K65JGUY/ref=ppx_yo_dt_b_asin_title_o09_s00?ie=UTF8&psc=1" target="_blank">LINDY 30406 - Power cord for notebooks (Schuko) 3m</a> | 10 |
| _Optional:_ | | |
| _Display_|  <a href="https://www.amazon.de/gp/product/B08B67KJ75/ref=ppx_yo_dt_b_asin_title_o00_s02?ie=UTF8&psc=1" target="_blank">Capacitive display 7" IPS 1024x600</a> | 70 |

The full specification of the Intel NUC 8 Pro Kit (NUC8V7PNH) can be found on the Intel ARK product database (search for NUC8V7PNH).

If you want to fully integrate the SDR into the NUC as seen on the picture above courtesy of Johann Mika: [https://github.com/johannmika/obeca-ors-casing](https://github.com/johannmika/obeca-ors-casing)

### Testcases

The configurations below are the ones that have been validated on this reference setup. The Reference Tools system was tested live, with sample files, with bandwidths 3, 5, 6, 7, 8 and 10 MHz, subcarrier spacing (SCS) 1.25 and 7.5 kHz and
modulation coding schemes (MCS) 1-26 with multiple services (RTP, HLS). Max CPU (2 services, 10 MHz, MCS26) was below
60%.

## Virtual Environment

We have tested Ubuntu 20 with Hyper-V on Windows 10.

### Testcases

The following was validated in a virtual environment: the build process and sample files (1 RTP service, 5 MHz).
