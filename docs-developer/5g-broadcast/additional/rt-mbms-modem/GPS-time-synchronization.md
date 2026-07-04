---
title:  GPS Time Synchronization for rt-mbms-modem
hide_title: true
sidebar_position: 0
description: Guide to disciplining the rt-mbms-modem receiver's clock to GPS time using chrony and gpsd, for accurate drive-test timestamps.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
  <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
  <path d="M9 21l3 -9l3 9" />
  <path d="M10 19h4" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Broadcast: Hybrid TV/Radio</span>
<h1>GPS Time Synchronization for rt-mbms-modem</h1>
</div>
</div>

## Overview

This page configures the receiver's system clock to be disciplined by GPS time, using `chrony` fed by the GPS daemon (`gpsd`). This is useful when you need accurate, GPS-referenced timestamps, for example when recording drive-test measurements (see [MBMS Modem - Measurements & GPS](../../tutorials/modem-measurements)). It is optional: the modem runs without GPS time synchronization if you do not need GPS-referenced timing.

:::note
Precondition: install, configure and enable `gpsd` by following [this guide](https://github.com/5G-MAG/rt-mbms-modem#measurement-recording-and-gps).
:::

## Step 1: Install chrony

Install the `chrony` time daemon:

````
sudo apt install chrony
````

## Step 2: Add a GPS reference clock to the chrony configuration

Edit `/etc/chrony/chrony.conf` and add the following line at the end. It tells chrony to use the shared-memory (SHM) reference clock that `gpsd` publishes, labelled `NMEA`, with a small delay correction:

````
refclock SHM 0  delay 0.5 refid NMEA
````

## Step 3: Enable the gpsd options for chrony

Edit `/etc/default/gpsd` and add the options `-n -b` (which make `gpsd` poll the receiver without waiting for a client, and enable broken-device safety):

````
# Devices gpsd should collect to at boot time.
# They need to be read/writeable, either by user gpsd or the group dialout.
DEVICES="/dev/ttyACM0"
# Other options you want to pass to gpsd
GPSD_OPTIONS="-n -b"
````

## Step 4: Restart gpsd and chrony

Apply the changes by restarting both services:

````
sudo systemctl restart gpsd
sudo systemctl restart chrony
````

## Step 5: Verify

Check that chrony is receiving time data from your GPS device with `chronyc sources`.

After around 30 seconds, you should see recent sample data in the `NMEA` line, for example:

````
210 Number of sources = 9
MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
#- NMEA                          0   4   377    11    +73ms[  +73ms] +/-  251ms
^- pugot.canonical.com           2   6   377    53   +394us[ +394us] +/-   54ms
^+ chilipepper.canonical.com     2   6   377    54   +156us[ +185us] +/-   44ms
^- alphyn.canonical.com          2   6   377    52   +624us[ +624us] +/-  127ms
^+ golem.canonical.com           2   6   377    55   +324us[ +352us] +/-   53ms
^+ extern4.nemox.net             2   6   377    54   -177us[ -149us] +/-   48ms
^+ 194.112.182.172               2   6   377    55   -151us[ -123us] +/-   29ms
^* ntp.candystore.at             2   6   377    53   +132us[ +160us] +/-   23ms
^+ svn.mediainvent.at            2   6   377    55    -94us[  -66us] +/-   36ms
````

Success looks like an `NMEA` line that shows a recent `LastRx` value and a `Last sample` figure (as above), meaning chrony is reading time from the GPS device.

If the `NMEA` line stays empty or shows no recent sample, confirm that `gpsd` sees your receiver (for example with `cgps`, as described in [MBMS Modem - Measurements & GPS](../../tutorials/modem-measurements)), that the correct device is set in `/etc/default/gpsd`, and that the `gpsd` precondition steps above were completed.
