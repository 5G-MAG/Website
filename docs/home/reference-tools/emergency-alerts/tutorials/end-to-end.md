---
title: CBS over 5G Broadcast
hide_title: true
sidebar_position: 1
description: Step-by-step tutorial to broadcast a CBS emergency alert via SDR using rt-mbms-tx-for-qrd-and-crd and receive it on a device.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
  <path d="M17 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" />
  <path d="M3 15c.345 .6 1.258 1 2 1a2 2 0 1 0 0 -4a2 2 0 1 1 0 -4c.746 0 1.656 .394 2 1" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Broadcast - Emergency Alerts</span>
<h1>Cell Broadcast emergency alerts over a 5G Broadcast transmitter</h1>
</div>
</div>

This tutorial describes a basic setup to deliver emergency alerts compliant with the Cell Broadcast Service (CBS) over the rt-mbms-tx-for-qrd-and-crd transmitter from Reference Tools.

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-mbms-tx-for-qrd-and-crd">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-mbms-tx-for-qrd-and-crd</span>
<span class="repo-card__role">5G Broadcast transmitter used throughout this tutorial, built from the <code>emergency-alerts</code> branch.</span>
</a>

:::tip[In short]
By the end of this tutorial, a real 5G Broadcast capable handset will display an emergency alert broadcast from your own Software Defined Radio (SDR). You will need the hardware listed under Prerequisites, in particular an SDR and a compatible receiving device.
:::

**What you will build:** an end-to-end emergency alert chain, where a 5G Broadcast transmitter driven by an SDR broadcasts a CBS alert that is received and shown on a device.

## Prerequisites

The following components are required to set up the end-to-end chain for emergency alerts:

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 5a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v16l-6 -4l-6 4z" /></svg>QRD/CRD device</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.616 13.924a5 5 0 1 0 -9.23 0" /><path d="M20.307 15.469a9 9 0 1 0 -16.615 0" /></svg>SDR (e.g. BladeRF) + antenna</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" /></svg>Host: Ubuntu 22.04</span>
</div>

- A QRD or CRD device. These are the 5G Broadcast capable receiving devices used with the transmitter (confirm the exact meaning of the QRD and CRD abbreviations against the [rt-mbms-tx-for-qrd-and-crd repository](https://github.com/5G-MAG/rt-mbms-tx-for-qrd-and-crd)).
- A Software Defined Radio (SDR) such as the [BladeRF](https://www.nuand.com/bladerf-2-0-micro/) with an antenna
  connected to the TX1 port.
- A Linux machine running Ubuntu 22.04.

## Architecture

The setup consists of a 5G Broadcast transmitter (rt-mbms-tx-for-qrd-and-crd running the `emergency-alerts` branch) connected to a Software Defined Radio (SDR). A QRD or CRD device receives the broadcast signal and decodes the Cell Broadcast Service (CBS) alert messages. The transmitter reads alert content from a configuration file and encodes it as CBS messages compliant with 3GPP TS 23.041.

## Installation

### Step 1: Install the 5G Broadcast Transmitter

Install the dependencies and SDR drivers for the transmitter as documented [here](https://github.com/5G-MAG/rt-mbms-tx-for-qrd-and-crd).

Next, clone the transmitter repository using the `emergency-alerts` branch:

```bash
git clone --recurse-submodules -b emergency-alerts https://github.com/5G-MAG/rt-mbms-tx-for-qrd-and-crd.git rt-mbms-tx-for-qrd-and-crd-emergency-alerts
```

Now build the transmitter running the following commands:

```bash
cd rt-mbms-tx-for-qrd-and-crd-emergency-alerts
git submodule update
mkdir build && cd build
cmake -GNinja ..
ninja
```

## Configuration

### Step 2: Configuration of the 5G Broadcast Transmitter

Follow the configuration instructions documented [here](https://github.com/5G-MAG/rt-mbms-tx-for-qrd-and-crd?tab=readme-ov-file#configuration-after-installation).
Make sure to adjust the `dl_freq` and the `dl_earfcn` in the `enb.conf` based on the frequency that your CRD or QRD device is operating on. To derive the right `dl_earfcn` you can use
this [tool](https://5g-tools.com/4g-lte-earfcn-calculator/). Note also that SoapySDR might detect the wrong output (e.g. an audio device instead of your SDR.). In that case make sure to use `device_name` and `device_args` to select the right output device.

Example configuration files are located under the configuration-template directory. These will be called when running.

Copy the `bytecode` file to a folder `/home/fivegmag`.

```bash
cd ~/rt-mbms-tx-for-qrd-and-crd-emergency-alerts/Config-Template
cp bytecode /home/fivegmag/bytecode
```

:::warning
This tutorial refers to the configuration-template directory as both `Config-Template` (singular) and `Config-Templates` (plural) in different steps, and later edits are described against both `Config-Templates/sib.conf.mbsfn` and `build/sib.conf.mbsfn`. These are the source template files and the build-time copies that the transmitter actually reads at runtime: the templates under the configuration-template directory are the originals, while the build directory holds the copies used when the transmitter runs. Confirm the exact directory name (singular or plural) against your checkout before editing, and edit the copy that your running transmitter loads.
:::

## Running

### Step 3: Running the 5G Broadcast Transmitter

The transmitter is made up of three components you start in separate terminals:

- **MBMS-GW** (Multimedia Broadcast Multicast Service Gateway): receives the multicast alert traffic and forwards it towards the radio.
- **EPC** (Evolved Packet Core): the LTE core network functions the transmitter relies on.
- **eNodeB** (the LTE base station): produces the broadcast radio signal via the SDR.

The MBMS-GW receives multicast packets on one tunnel interface, packages them to GTP-U packets and sends them to the eNodeB over another tunnel interface. The command below creates the sgi_mb interface used for that multicast traffic:

```bash
sudo route add -net 239.11.4.0 netmask 255.255.255.0 dev sgi_mb
```

Start the MBMS Gateway, EPC and eNodeB in different terminals, in that order (gateway first, then EPC, then eNodeB):

```bash
cd ~/rt-mbms-tx-for-qrd-and-crd-emergency-alerts/build
sudo ./srsepc/src/srsmbms ../Config-Template/mbms.conf
```

```bash
cd ~/rt-mbms-tx-for-qrd-and-crd-emergency-alerts/build
sudo ./srsepc/src/srsepc ../Config-Template/epc.conf
```

```bash
cd ~/rt-mbms-tx-for-qrd-and-crd-emergency-alerts/build
sudo ./srsenb/src/srsenb ../Config-Template/enb.conf
```

Note that some of these files point to directories which should be adapted for your own setup. For instance `user_db.csv` inside `epc.conf` points to `db_file = /home/fivegmag/rt-mbms-tx-for-qrd-and-crd-emergency-alerts/Config-Template/user_db.csv`

### Step 4: Start the UE

Now that the transmitter is running you can turn on your receiving device (the UE). You should receive an alert shortly after the device is
turned on. The screenshot below shows an example alert displayed on the device:

![Emergency alert message displayed on the receiving device](/assets/images/emergency-alerts/emergency-alert.jpg)

_Figure: an emergency alert shown on the receiving device._

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have a working end-to-end emergency alert chain.</strong> The transmitter is broadcasting a CBS alert over your SDR, and it is being received and displayed on the device.</div>
</div>

### Step 5: Changing the type of the alert

With the current implementation, the SIB 12 payload is static and defined in `Config-Templates/sib.conf.mbsfn` (see the path caveat above about templates versus build-time copies). To change the type
of the alert you need to open `Config-Templates/sib.conf.mbsfn` and change the `message_identifier`. A list of possible values is
defined in [3GPP TS 23.041](https://www.3gpp.org/dynareport/23041.htm) Section 9.4.1.2.2. The example below sets `message_identifier` to `0x1102`, which corresponds to the combined earthquake and tsunami warning row in the table that follows:

```ini
sib12 =
{
    message_identifier = 0x1102;
    serial_number = 0x0001;
    data_coding_scheme = 01;
    warning_msg_segment_type = "lastSegment";
    warning_msg_segment_num = 0;
    warning_msg_segment_r9 = "01C576597E2EBBC7F950A8D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D168341A8D46A3D1000A";
};
```

The table below lists the message identifiers and their meaning. ETWS is the Earthquake and Tsunami Warning System and CMAS is the Commercial Mobile Alert System; both are public warning message categories carried over CBS.

| message_identifier | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| 0x1100             | ETWS CBS Message Identifier for earthquake warning message                      |
| 0x1101             | ETWS CBS Message Identifier for tsunami warning message                         |
| 0x1102             | ETWS CBS Message Identifier for earthquake and tsunami combined warning message |
| 0x1104             | ETWS CBS Message Identifier for messages related to other emergency types       |
| 0x1112-1130        | CMAS CBS Message Identifier                                                     |
| 0x1131-113B        | Non-ETWS CBS Message Identifier                                                 |

### Step 6: Triggering multiple alerts

To trigger a new alert the `serial_number` needs to be changed. At this point, there is no interface to change
the `serial_number` while the eNodeB is still running. You will need to change the `serial_number`
in `build/sib.conf.mbsfn` manually (this is the build-time copy the running transmitter reads) and then restart the eNodeB.

## Wrapping up

You have set up an end-to-end emergency alert chain: building and configuring the 5G Broadcast transmitter, broadcasting a CBS alert carried in SIB12 over your SDR, and receiving and displaying it on a device. You also saw how to change the alert type through `message_identifier` and how to trigger repeat alerts by changing `serial_number`.

:::warning
Transmitting radio signals is subject to local regulation. Only transmit in a shielded environment or under an appropriate authorisation, and check the rules that apply to your frequency and location before running the transmitter.
:::

## Next steps

- Read the [Scope](../scope) page for the specifications and architecture behind this setup.
- See the related [5G Broadcast: Hybrid TV/Radio](../../5g-broadcast) project for the base transmitter and receiver tools.
