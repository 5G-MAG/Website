---
title: SDR Platforms srsRAN
hide_title: true
sidebar_position: 0
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M20 21l2 -2l-2 -2" />
  <path d="M17 17l-2 2l2 2" /></svg>
</div>
<div class="topic-banner__text">
<h1>SDR Platforms for srsRAN</h1>
<p>This page covers installing and verifying the Software Defined Radio (SDR) hardware used with the srsRAN-based 5G Broadcast tools, including the rt-mbms-modem receiver.</p>
</div>
</div>

This page covers installing and verifying the Software Defined Radio (SDR) hardware used with the srsRAN-based 5G Broadcast tools, including the `rt-mbms-modem` receiver. It walks through installing the SDR drivers, checking that the device is detected, and setting the right configuration for each supported board. The SDRs covered here are BladeRF, LimeSDR and HackRF One.

Recommended order: install the drivers, verify the device is detected (the "Check SDR availability" section below), and only then set the device-specific configuration.

The following instructions have been tested to work in Ubuntu 22.04 LTS.

## Install SDR drivers

````
sudo apt install libsoapysdr-dev soapysdr-tools
````

## Using BladeRF with Soapy

For BladeRF the relevant package is named *soapysdr-module-bladerf*. Install it by running:
````
sudo apt install soapysdr-module-bladerf
````
Finally, install the BladeRF firmware:
````
sudo add-apt-repository ppa:nuandllc/bladerf
sudo apt-get update
sudo apt-get install bladerf
````

## Using LimeSDR with Soapy

Lime Suite needs to be built from source at a specific commit. *Do not* use the package available through apt, as the version it packages does not seem to work reliably with LimeSDR Minis and causes calibration errors and unreliable reception. Please follow these steps:

```
cd ~
git clone https://github.com/myriadrf/LimeSuite.git
cd LimeSuite/
git checkout 28031bfcffe1e8fa393c7db88d4fe370fb4c67ea
mkdir buildir
cd buildir
cmake -G Ninja ..
ninja
sudo ninja install
sudo ldconfig
```

## Using HackRF One with Soapy
It should be noted that the HackRF One is a half-duplex SDR and has issues synchronising using the internal clock, documented [here](https://hackrf.readthedocs.io/en/latest/external_clock_interface.html). Synchronisation can be achieved by providing an external CLKIN signal using e.g. Keysight 33120A configured to output a 10 MHz sine wave with amplitude 1.5 Vpp and offset 0.75 V (as it is a high impedance input). Alternatively, a simpler option is to install [this component](https://www.nooelec.com/store/tiny-tcxo.html) following [these instructions](https://f1atb.fr/en/tcxo-installation-on-hackrf/). You may also want to install some [RF shielding](https://hackaday.io/project/158323/instructions).

For HackRF One , install by running:
````
sudo apt install hackrf soapysdr-module-hackrf
````
Plug in your HackRF and verify it is recognised using: 
````
hackrf_info
````
Example output:
```
hackrf_info version: unknown
libhackrf version: unknown (0.5)
Found HackRF
Index: 0
Serial number: 0000000000000000xxxxxxxxxxxxxxxx
Board ID Number: 2 (HackRF One)
Firmware Version: 2018.01.1 (API:1.02)
Part ID Number: 0xa000cb3c 0x0066435f
```

## Adjusting configuration for rt-mbms-modem
Note: After installing rt-mbms-modem (see the [rt-mbms-modem repository](https://github.com/5G-MAG/rt-mbms-modem) for build and install steps) you must modify the rt-mbms configuration parameter in `/etc/5gmag-rt.conf`:

Example for BladeRF:
```
device_args = "driver=bladerf";
antenna = "RX"
```

Example for LimeSDR:
```
device_args = "driver=lime";
antenna = "LNAW";
```

Example for HackRF:
```
device_args = "driver=hackrf";
antenna = "TX/RX";
```

## Check SDR availability
Check if the SDR can be found on your system

```
SoapySDRUtil --find
```

Example for BladeRF:
```
######################################################
##     Soapy SDR -- the SDR abstraction library     ##
######################################################
Found device 2
  backend = libusb
  device = 0x02:0x09
  driver = bladerf
  instance = 0
  label = BladeRF #0 [ANY]
  serial = ANY
```

Example for LimeSDR:
```
######################################################
##     Soapy SDR -- the SDR abstraction library     ##
######################################################

Found device 0
  addr = 24607:1027
  driver = lime
  label = LimeSDR Mini [USB 2.0] 1D587FCA09A966
  media = USB 2.0
  module = FT601
  name = LimeSDR Mini
  serial = 1D587FCA09A966
```

Example for HackRF One:
```
######################################################
##     Soapy SDR -- the SDR abstraction library     ##
######################################################

Found device 3
  device = HackRF One
  driver = hackrf
  label = HackRF One #0 75b068dc3_______
  part_id = a000cb3c0066435f
  serial = 000000000000000075b068dc3_______
  version = 2018.01.1
  
```

## Other SDRs

While we've only tested with Lime- and Blade-SDRs, Soapy supports a wide range of SDR devices, which should therefore also be usable with 5gmag-rt-modem if they support the high bandwidth/sample rates required for FeMBMS decoding.

You can find more info on device support at https://github.com/pothosware/SoapySDR/wiki

Running ``apt search soapysdr-module`` lists all available modules.

If you successfully (or unsuccessfully) try 5gmag-rt-modem with another SDR, please let us know! 


## Troubleshooting

When running the command ``SoapySDRUtil --find`` you might get a duplicate entry error:
```
######################################################
##     Soapy SDR -- the SDR abstraction library     ##
######################################################

[ERROR] SoapySDR::loadModule(/usr/local/lib/SoapySDR/modules0.7/libLMS7Support.so)
  duplicate entry for lime (/usr/lib/x86_64-linux-gnu/SoapySDR/modules0.7/libLMS7Support.so)
```
This is because a duplicate limesuite apt package has incorrectly been installed when installing the Soapy module and LimeSuite. You can identify this package by running the command:
```
$ sudo apt list --installed | grep lime
< ... >
liblimesuite20.01-1/focal,now 20.01.0+dfsg-2 amd64 [installed,automatic]
```
You can fix this issue by deleting this package:
```
sudo apt remove liblimesuite20.01-1
```
